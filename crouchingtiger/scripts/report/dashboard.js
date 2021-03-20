angular.module("dashboard_report_widgets", ['theme.report_service', "timehelper"])
    .controller("DashboardWidgetController", ["$scope", "ReportDataWebService","$rootScope", "DateRangeFiller", "NumberFormat",
        function ($scope, ReportDataWebService, $rootScope, DateRangeFiller, NumberFormat) {

	        $scope.kShortener = NumberFormat.kShortener;

	        // HELPER
	        // if there is no aggregated data available from backend, data set in display looks
	        // ugly and it would be better to just feed it
	        $scope.getZeroedDataSet = function() {
		        return _.map(_.range(1, 8).reverse(), function (daysAgo) {
			        return $scope.createEmptyDay(moment().subtract('days', daysAgo).format("YYYY-MM-DD"));
		        });
	        };

	        // HELPER
	        $scope.createEmptyDay = function(date) {
		        return {
			        answered_count:      0,
			        conversion_count:    0,
			        conversion_sum:      0,
			        duration_sum:        0,
			        lead_count:          0,
			        lead_sum:            0,
			        sales_inquiry_count: 0,
			        sales_inquiry_sum:   0,
			        total_calls:         0,
			        unique_calls:        0,
			        date: date
		        };
	        };


            $scope.isReadonly = true;
            if ($scope.userAccess && $scope.userAccess.campaign > 5) {
                $scope.isReadonly = false;
            }
            var cnt = 0;
            $scope.$watch('userAccess', function(newValue, oldValue) {
                if(oldValue !== newValue && cnt === 0) {
                    cnt = 1;
                    if ($scope.userAccess && $scope.userAccess.campaign > 5) {
                        $scope.isReadonly = false;
                    }
                }
            });


	        var dateFormat = "YYYY-MM-DD";
	        var sd = moment().subtract(7, 'day').format("YYYY-MM-DD");
	        var ed = moment().subtract(1, 'days').endOf('day').format("YYYY-MM-DD");
            ReportDataWebService.getDashboardData($rootScope.currentOUId, sd, ed).then(function (result) {

	            if( result.err ) {
                    console.log("no dashboard widget data avail");
                    return;
                }
                if (!result.data.json.aggregated_data.length) {
                    // get data to fill in chart with zeroed data otherwise chart has no values
                    // and looks ugly
                    result.data.json.aggregated_data = $scope.getZeroedDataSet();
                }



                // Postgres sends up strings instead of numbers, but we need numbers
                // for arithmetic
                var aggregatedData = result.data.json.aggregated_data;
                _.each(aggregatedData, function (reducedObj) {
                    reducedObj.total_calls      = parseInt(reducedObj.total_calls);
                    reducedObj.unique_calls     = parseInt(reducedObj.unique_calls);
                    reducedObj.answered_count   = parseInt(reducedObj.answered_count);
                    reducedObj.duration_sum     = parseInt(reducedObj.duration_sum);
                    reducedObj.conversion_count = parseInt(reducedObj.conversion_count);
                    reducedObj.lead_count       = parseInt(reducedObj.lead_count);

                    // all_marker is for having a property that we can use crossfilter to roll up all values
                    // into one object, since they will all have all_marker = 1
                    reducedObj.all_marker = 1;
                });
                var xf = crossfilter(aggregatedData);


                function reduceInitial() {
                    var reducedObj = {
                        total_calls: 0, unique_calls: 0, answered: 0, total_converted: 0,
                        total_leads: 0, total_duration:  0 // seconds
                    };
                    return reducedObj;
                }

                function reduceIncrement(reducedObj, currentItem) {
                    reducedObj.total_calls     += currentItem.total_calls;
                    reducedObj.unique_calls    += currentItem.unique_calls;
                    reducedObj.answered        += currentItem.answered_count;
                    reducedObj.total_duration  += currentItem.duration_sum;
                    reducedObj.total_converted += currentItem.conversion_count;
                    reducedObj.total_leads     += currentItem.lead_count;
                    return reducedObj;
                }

                function reduceDecrement(reducedObj, currentItem) {
                    reducedObj.total_calls     -= currentItem.total_calls;
                    reducedObj.unique_calls    -= currentItem.unique_calls;
                    reducedObj.answered        -= currentItem.answered_count;
                    reducedObj.total_duration  -= currentItem.duration_sum;
                    reducedObj.total_converted -= currentItem.conversion_count;
                    reducedObj.total_leads     -= currentItem.lead_count;
                    return reducedObj;
                }




                ////////////////////////////
                // for SUMMARY DATA WIDGETS
                ////////////////////////////
                var allDim = xf.dimension(function (d) {
                    return d.all_marker;
                });

                // For the summary widgets we need the data all rolled up unto one object
                var group = allDim.group().reduce(reduceIncrement, reduceDecrement, reduceInitial);


                // Grab the one object that has all the other days rolled up into one, since the summary widgets
                // are a grand total of all the days
                $scope.dataWidgetVals = group.top(1)[0].value;
                $scope.dataWidgetVals.avg_call_duration         = {};
                $scope.dataWidgetVals.avg_call_duration.seconds = _.zeroIfNaN(Math.round(($scope.dataWidgetVals.total_duration / $scope.dataWidgetVals.total_calls) % 60));
                $scope.dataWidgetVals.avg_call_duration.minutes = _.zeroIfNaN(Math.floor(($scope.dataWidgetVals.total_duration / $scope.dataWidgetVals.total_calls) / 60));
                $scope.dataWidgetVals.conversion_rate           = Math.floor(_.zeroIfNaN($scope.dataWidgetVals.total_converted / $scope.dataWidgetVals.total_calls) * 100);
                $scope.dataWidgetVals.perc_leads_of_calls       = Math.floor(_.zeroIfNaN($scope.dataWidgetVals.total_leads     / $scope.dataWidgetVals.total_calls) * 100);




                //////////////////////
                // for DATA CHART GRAPHS
                //////////////////////

                // Need to roll up data according to days since we're getting it from the backend rolled up into
                // hours
                var dayDim = xf.dimension(function (d) {
                    return moment(d.date).format("MMMM D, YYYY");

                });
                var rolledIntoHourly = dayDim.group().reduce(reduceIncrement, reduceDecrement, reduceInitial);


	            // Convert data structure from aggregated form to one that works better for jflot widget
                var rolledIntoHourlyForChartFormat = _.map(rolledIntoHourly.top(Infinity), function (dataForDay) {
                    return {
                        date:            dataForDay.key,
                        answered:        dataForDay.value.answered,
                        total_calls:     dataForDay.value.total_calls,
                        total_converted: dataForDay.value.total_converted,
                        total_duration:  dataForDay.value.total_duration,
                        total_leads:     dataForDay.value.total_duration,
                        unique_calls:    dataForDay.value.unique_calls
                    };
                });


	            // Sort whatever objects we've just rolled up, we could have missing days (days that didn't get any calls)
	            // and data vis widget renders weird when it has days skipped
                var sortedAggregatedData = _.sortBy(rolledIntoHourlyForChartFormat, function (dayData) {
                    return moment(dayData.date).unix();
                });


	            // If we have 7 days then we're set to display in chart, otherwise
	            // fill in missing days

	            // DateRangeFiller.fillInDays needs an array of available dates
	            var datesOfReceivedData = _.chain(sortedAggregatedData)
		            .pluck("date")
		            .map(function (val) { return moment(val, "MMMM D, YYYY").format("YYYY-MM-DD"); })
		            .value();

	            // returns array of missing dates
	            var daysToFillIn = DateRangeFiller.fillInDays(datesOfReceivedData, sd, ed, "YYYY-MM-DD");

	            // create mock objects for missing dates
	            var filledinAggObjects = _.map(daysToFillIn, function (v) {
		            var newDateFormat = moment(v, dateFormat).format("MMMM D, YYYY");
		            return $scope.createEmptyDay(newDateFormat);
	            });


			    // resort objects again since we don't know where to put the new items specifically
	            sortedAggregatedData = sortedAggregatedData.concat(filledinAggObjects);
	            sortedAggregatedData = _.sortBy(sortedAggregatedData, function (v) {
		            return moment(v.date).unix();
	            });




                // plotCharts need a data set (array of arrays) like so
                // the first value in the sub array will be the x axis TICK (in this case we want it to be the
                // day number) and the second value in that same sub array is the y value
                //  [
                //    [1, firstDayQuantity]
                //    [2, secondDayQuantity],
                //    [3, thirdDayQuantity],
                //    ...etc
                //  ]
                var callsByDayDataset = _.map(sortedAggregatedData, function (dayData) {
                    return [
                        moment(dayData.date).unix() * 1000,
                        parseInt(dayData.total_calls)
                    ];
                });

                var uniqueCallsByDayDataset = _.map(sortedAggregatedData, function (dayData) {
                    return [
                        moment(dayData.date).unix() * 1000,
                        parseInt(dayData.unique_calls)
                    ];
                });

                var customTicksDataToMakeFlotHappyLine = _.map(callsByDayDataset, function (val) {
                    return [
                        val[0],
                        moment.unix(val[0] / 1000).format("MMM-D")
                    ];
                });

                var customTicksDataToMakeFlotHappyBar = _.map(uniqueCallsByDayDataset, function (val) {
                    return [
                        val[0],
                        moment.unix(val[0] / 1000).format("MMM-D")
                    ];
                });




                $scope.plotStatsData = [{
                    data: callsByDayDataset,
                    label: 'Calls by Day'
                }];


                $scope.plotStatsOptions = {
                    series: {
                        lines: {
                            show:      true,
                            lineWidth: 1.5,
                            fill:      0.1
                        },
                        points: {
                            show: true
                        }
                    },
                    colors: ["#b3bcc7"],
                    xaxis: {
                        autoscaleMargin: 0.10,
                        mode: "time",
                        timeformat: "%b-%d",
                        ticks: customTicksDataToMakeFlotHappyLine
                    },
	                yaxis:{
		                min: 0
	                },
                    legend : {
                        labelBoxBorderColor: 'transparent'
                    },
                    tooltip: true,
                    tooltipOpts: {
                        defaultTheme: false,
                        content: "Count: %y"
                    },
                    grid: {
                        labelMargin: 10,
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0
                    }
                };


                //$scope.plotStatsOptions =  {
                //    series: {
                //        lines: {
                //            show: true,
                //            lineWidth: 1.5,
                //            fill: 0.1
                //        },
                //        points: {
                //            show: true
                //        },
                //        shadowSize: 0
                //    },
                //    grid: {
                //        labelMargin: 10,
                //        hoverable: true,
                //        clickable: true,
                //        borderWidth: 0
                //    },
                //    tooltip: true,
                //    tooltipOpts: {
                //        defaultTheme: false,
                //        content: "Count: %y"
                //    },
                //    colors: ["#b3bcc7"],
                //    xaxis: {
                //        tickColor: 'transparent',
                //        tickDecimals: 0,
                //        autoscaleMargin: 0.10,
                //        font: {
                //            color: 'rgba(0,0,0,0.4)',
                //            size: 11
                //        },
                //        mode: "time",
                //        timeformat: "%b-%d",
                //
                //    },
                //    yaxis: {
                //        ticks: 4,
                //        tickDecimals: 0,
                //        tickColor: "rgba(0,0,0,0.04)",
                //        font: {
                //            color: 'rgba(0,0,0,0.4)',
                //            size: 11
                //        },
                //        tickFormatter: function (val, axis) {
                //            if (val>999) {return (val/1000) + "K";} else {return val;}
                //        }
                //    },
                //    legend : {
                //        labelBoxBorderColor: 'transparent'
                //    }
                //};


                //$scope.plotRevenueData = [{
                //    data: uniqueCallsByDayDataset,
                //    label: 'Unique Calls'
                //}];






                $scope.plotRevenueData = [{
                    data: uniqueCallsByDayDataset,
                    label: 'Unique Calls'
                }];

                $scope.plotRevenueOptions = {
                    series: {
                        bars: {
                            show: true,
                            barWidth: 76400000,
                            //barWidth: 76400,
                            lineWidth: 1,
                            align: "center"
                        }
                    },
                    colors: ["#b3bcc7"],
                    xaxis: {
                        //autoscaleMargin: 0.05,
                        mode:   "time",
                        format: "%b-%d",
                        ticks: customTicksDataToMakeFlotHappyBar

                    },
	                yaxis:{
		                min: 0
	                },
                    legend : {
                        labelBoxBorderColor: 'transparent'
                    },
                    tooltip: true,
                    tooltipOpts: {
                        defaultTheme: false,
                        content: "Count: %y"
                    },
                    grid: {
                        labelMargin: 10,
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0
                    }
                };


                //$scope.plotRevenueOptions =  {
                //    series: {
                //        bars: {
                //            show:true,
                //            fill: 1,
                //            lineWidth: 4,
                //            barWidth: 76400000, // width in milliseconds (86400000 is equiv to a day)
                //            align: 'center'
                //        },
                //        points: {
                //            show: false
                //        },
                //        shadowSize: 0
                //    },
                //    grid: {
                //        labelMargin: 10,
                //        hoverable: true,
                //        clickable: true,
                //        borderWidth: 0
                //    },
                //    tooltip: true,
                //    tooltipOpts: {
                //        defaultTheme: false,
                //        content: "Count: %y"
                //    },
                //    colors: ["#b3bcc7"],
                //    xaxis: {
                //        tickColor: 'transparent',
                //        //tickSize: [1,"day"],
                //        ticks: uniqueCallsByDayDataset.length,
                //        tickDecimals: 0,
                //        autoscaleMargin: 0.10,
                //        font: {
                //            color: 'rgba(0,0,0,0.4)',
                //            size: 11
                //        },
                //        mode: "time",
                //        timeformat: "%b-%d"
                //    },
                //    yaxis: {
                //        ticks: 4,
                //        tickDecimals: 0,
                //        tickColor: "rgba(0,0,0,0.04)",
                //        font: {
                //            color: 'rgba(0,0,0,0.4)',
                //            size: 11
                //        },
                //        tickFormatter: function (val, axis) {
                //            if (val>999) {return "" + (val/1000) + "K";} else {return "" + val;}
                //        }
                //    },
                //    legend : {
                //        labelBoxBorderColor: 'transparent'
                //    }
                //};


            });





	        // REPLACED BY DateRangeFiller
	        // Even though we requested a range for 7 days, some of the days may not be present,
	        // so we need to fill those in
	        //$scope.fillInBlanks = function(arrDays, startDate, endDate) {
		     //   // We need to have the first day in arr
		     //   if (arrDays[0] !== startDate) {
			 //       arrDays.unshift(startDate);
		     //   }
	        //
		     //   // We need to have the last day in arr
		     //   if (arrDays[arrDays.length-1] !== endDate) {
			 //       arrDays.push(endDate);
		     //   }
	        //
		     //   if (arrDays.length === 7) {
			 //       return arrDays;
		     //   }
	        //
	        //
		     //   // At this point we have at least the ends of the arr complete,
		     //   // now we can fill in the blanks
	        //
		     //   // completeDaysArr will have the current days added, and the filled in days added to it
		     //   var completeDaysArr = [];
		     //   var nextDay, thisMonth;
		     //   _.each(arrDays, function (day, index, arr) {
	        //
			 //       try {
				//        nextDay = arr[index+1];
			 //       }
			 //       catch(e) {
				//        if (e instanceof TypeError) { nextDay = null; }
				//        else { throw e; }
			 //       }
	        //
			 //       // we have iterated up until the last day, so no extra logic for filling days in
			 //       if (!nextDay) {
				//        completeDaysArr.push(day);
				//        return;
			 //       }
	        //
			 //       // if the next day is tomorrow
			 //       // push today, since everything is OK and doesn't need to be filled
			 //       var tomorrow = moment(day, dateFormat).add(1, "day").format(dateFormat);
			 //       if (nextDay === tomorrow) {
				//        completeDaysArr.push(day);
				//        return;
			 //       }
	        //
	        //
	        //
			 //       // nextDay is leaving a gap inbetween today and nextDay
			 //       // either next day is part of this OR next month - perform accordingly
			 //       var monthOfToday = moment(day, dateFormat).month();
			 //       var monthOfNextDay = moment(nextDay, dateFormat).month();
				//
	        //
			 //
			 //       // next day is part of this month
			 //       if (monthOfToday === monthOfNextDay) {
				//        var lastDayToFill = moment(nextDay, dateFormat).subtract(1).format(dateFormat);
				//        var filledInDays = createMultipleDays(tomorrow, lastDayToFill);
				//        completeDaysArr.push(day);
				//        completeDaysArr = completeDaysArr.concat(filledInDays);
				//        return;
			 //       }
			 //       else if (monthOfToday !== monthOfNextDay) {
				//        // next day is part of next month
	        //
				//        var fillInsThisMonth = [];
				//        if (moment(day, dateFormat).format(dateFormat) === moment(day, dateFormat).endOf("month").format(dateFormat)) {
				//	        fillInsThisMonth = [day];
				//        } else {
				//	        var lastDayThisMonth = moment(tomorrow, dateFormat).endOf("month");
				//	        fillInsThisMonth = createMultipleDays(tomorrow, lastDayThisMonth);
				//        }
	        //
	        //
				//        var firstDayOfNextMonth = moment(nextDay, dateFormat).startOf("month").format(dateFormat);
				//        var fillInsNextMonth = createMultipleDays(firstDayOfNextMonth, nextDay);
	        //
	        //
	        //
	        //
				//        completeDaysArr = completeDaysArr.concat(fillInsThisMonth).concat(fillInsNextMonth);
			 //       }
		     //   });//end _.each
	        //
		     //   return completeDaysArr;
	        //
	        //
	        //
	        //
		     //   // Helper
		     //   function createMultipleDays(firstDate, lastDate) {
			 //       var dateFormat = "YYYY-MM-DD";
	        //
			 //       //if (moment(firstDate, dateFormat).date() < moment(lastDate, dateFormat).date()) {
			 //       //    // we've spilled into next month, just return today
				//     //   return [moment(lastDate, dateFormat).format(dateFormat)];
			 //       //
			 //       //}
	        //
			 //       if (firstDate === lastDate) {
				//        return [moment(firstDate, dateFormat).format(dateFormat)];
			 //       }
			 //       else {
	        //
	        //
				//        var firstDayDate = moment(firstDate, dateFormat).date();
				//        var secondDayDate = moment(lastDate, dateFormat).date();
				//        var dayDatesToCreate = _.range(firstDayDate, secondDayDate); // +1 because it ends before the # you give it
	        //
				//        var yearToCreateWith = moment(startDate, dateFormat).year();
				//        var monthToCreateWith = moment(startDate, dateFormat).month() + 1; // +1 because it counts months starting from 0
	        //
				//        var dateCreateFormat = "YYYY-M-D";
				//        var datesToCreate = _.map(dayDatesToCreate, function (dayDate) {
				//	        var tempDateStr = yearToCreateWith + "-" + (monthToCreateWith+1) + "-" + dayDate;
				//	        return moment(tempDateStr, dateCreateFormat).format(dateFormat);
				//        });
	        //
				//        //datesToCreate = _.map(datesToCreate, function (date) {
				//	     //   return $scope.createEmptyDay(date);
				//        //});
				//        //console.log("datesToCreate", datesToCreate);
	        //
	        //
				//        return datesToCreate;
			 //       }//end else
		     //   }//end createMultipleDays
	        //};


        }
    ]);