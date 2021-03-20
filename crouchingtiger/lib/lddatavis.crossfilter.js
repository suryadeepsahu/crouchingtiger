//Data Vis Library
//Copyright @ 2014, Jeff Hall
//Author: Jeff Hall

//"use strict";

var lddatavis = lddatavis || {};

//Initialize lddatavis library
lddatavis.Crossfilter = function (div) {
    var that = this;
    this.divContainer = div;
    this.dateFormat = d3.time.format("%Y-%m-%d");
    this.timeFormat = d3.time.format("%M:%S");
    this.numberFormat = d3.format(".2f");
    this.currencyFormat = d3.format("$,.2f");
    this.headerBarOffset = 40;//px

    //Chart Type Object Arrays
    this.bubbleChart = [];
    this.lineChart = [];
    this.trendlineChart = [];
    this.pieChart = [];
    this.barChart = [];
    this.ChartObj = [];
    this.dataCountChart = [];
    this.datatableChart = [];
    this.numberDisplay = [];
    this.idxDimension = [];
    this.idxFilter = [];
    this.idxGroup = [];
    that.idxFunction = [];

    // Enable/Disable Controls for debugging purposes
    this.showbubbleChart = true;
    this.showlineChart = true;
    this.showtrendlineChart = true;
    this.showpieChart = true;
    this.showbarChart = true;
    this.showChartObj = true;
    this.showDataCountChart = true;
    this.showDataTableChart = true;
    this.showNumberDisplay = true;

    //Main Div Relative Height & Width (Percentage)
    this.crossfilterContainerH = 1;//0.87; //%
    this.crossfilterContainerW = 1;//0.92; //%

    //Chart Controls Relative Height (Percentage)
    this.bubbleChartH = []; //read from config file
    this.lineChartH = []; //read from config file
    this.trendlineChartH = []; //read from config file
    this.barChartH = []; //read from config file
    this.pieChartH = []; //read from config file
    this.ChartObjH = []; //read from config file
    this.dataCountChartH = []; //read from config file
    this.datatableChartH = []; //read from config file
    this.numberDisplayH = []; //read from config file

    //Chart Controls Relative Width (Percentage)
    this.bubbleChartW = []; //read from config file
    this.lineChartW = []; //read from config file
    this.trendlineChartW = []; //read from config file
    this.barChartW = []; //read from config file
    this.pieChartW = []; //read from config file
    this.ChartObjW = []; //read from config file
    this.dataCountChartW = []; //read from config file
    this.datatableChartW = []; //read from config file
    this.numberDisplayW = []; //read from config file

    that.ChartObjTop = []; //read from config file

    //Bar Chart - Gap Between Bars
    this.barChartGap = 5; //px

    //Pie Chart - Pie Radius Size
    this.pieRadiusSize = []; //read from config file //circle node radius size as a % of height & width, whichever is smaller

    //Bubble Chart - Circle Radius Size
    this.bubbleRadiusSize = []; //read from config file

    //Chart Control Time Transitions
    this.transitionTime = 1000; //time in milliseconds for transition animation

    //Chart Labels;
    this.barChartGroupLabel = []; //read from config file
    this.bubbleChartxAxisLabel = []; //read from config file
    this.bubbleChartyAxisLabel = []; //read from config file
    this.lineChartGroup1Label = []; //read from config file
    this.lineChartGroup2Label = []; //read from config file 
    this.lineChartyAxisLabel = []; //read from config file
    this.barChartyAxisLabel = []; //read from config file

    $(this.divContainer).height(($(document).height() - this.headerBarOffset) * this.crossfilterContainerH);
    $(this.divContainer).width(($(document).width() * this.crossfilterContainerW) - $('#toolbox').width());

    //Main Function
    //This reads the report definition config file and maps the settings to the chart controls
    this.loadConfig = function (configfile) {
        that = this;
        $.ajax({
            url: configfile,
            dataType: "json"
        }).success(function (data) {
            that.config = data;

            //Load Page Title
            if (that.config.page_title !== undefined && that.config.page_title !== "") {
                if ($('#pageTitle') !== undefined) {
                    $('#pageTitle').text(that.config.page_title);
                }
            }
            //Load Report Title
            if (that.config.report_title !== undefined && that.config.report_title !== "") {
                if ($('#reportTitle') !== undefined) {
                    var div = document.getElementById('reportTitle');
                    div.innerHTML = that.config.report_title + div.innerHTML;
                    //div.innerHTML = div.innerHTML;
                }
            }

            //Supported Charts
            if (that.config.bubblecharts === undefined) { that.showbubbleChart = false; }
            if (that.config.linecharts === undefined) { that.showlineChart = false; }
            if (that.config.trendlinecharts === undefined) { that.showtrendlineChart = false; }
            if (that.config.piecharts === undefined) { that.showpieChart = false; }
            if (that.config.barcharts === undefined) { that.showbarChart = false; }
            if (that.config.chartobjs === undefined) { that.showChartObj = false; }
            if (that.config.datatablecharts === undefined) { that.showDataTableChart = false; }
            if (that.config.numberdisplays === undefined) { that.showNumberDisplay = false; }
            
            //Load Bubble Chart Configuration File Settings
            if (that.showbubbleChart == true && that.config.bubblecharts !== undefined) {
                $.each(that.config.bubblecharts, function (index, value) {
                    that.bubbleChartH[index] = that.config.bubblecharts[index].heightpercent;
                    that.bubbleChartW[index] = that.config.bubblecharts[index].widthpercent;
                    that.bubbleRadiusSize[index] = that.config.bubblecharts[index].radiussizepixels;
                    that.bubbleChartxAxisLabel[index] = that.config.bubblecharts[index].xaxislabel;
                    that.bubbleChartyAxisLabel[index] = that.config.bubblecharts[index].yaxislabel;
                    that.bubbleChart[index] = dc.bubbleChart(that.config.bubblecharts[index].div);
                });
            }

            //Load Line Chart Configuration File Settings
            if (that.showlineChart == true && that.config.linecharts !== undefined) {
                $.each(that.config.linecharts, function (index, value) {
                    that.lineChartH[index] = that.config.linecharts[index].heightpercent;
                    that.lineChartW[index] = that.config.linecharts[index].widthpercent;
                    that.lineChartGroup1Label[index] = that.config.linecharts[index].group1label;
                    that.lineChartGroup2Label[index] = that.config.linecharts[index].group2label;
                    that.lineChartyAxisLabel[index] = that.config.linecharts[index].yaxislabel;
                    that.lineChart[index] = dc.lineChart(that.config.linecharts[index].div);
                });
            }

            //Load Trendline Chart Configuration File Settings
            if (that.showtrendlineChart == true && that.config.trendlinecharts !== undefined) {
                $.each(that.config.trendlinecharts, function (index, value) {
                    that.trendlineChartH[index] = that.config.trendlinecharts[index].heightpercent;
                    that.trendlineChartW[index] = that.config.trendlinecharts[index].widthpercent;
                    that.trendlineChart[index] = dc.seriesChart(that.config.trendlinecharts[index].div);
                });
            }

            //Load Pie Chart Configuration File Settings
            if (that.showpieChart == true && that.config.piecharts !== undefined) {
                $.each(that.config.piecharts, function (index, value) {
                    that.pieChartH[index] = that.config.piecharts[index].heightpercent;
                    that.pieChartW[index] = that.config.piecharts[index].widthpercent;
                    that.pieRadiusSize[index] = that.config.piecharts[index].radiussizepercent;
                    that.pieChart[index] = dc.pieChart(that.config.piecharts[index].div);
                });
            }

            //Load Bar Chart Configuration File Settings
            if (that.showbarChart == true && that.config.barcharts !== undefined) {
                $.each(that.config.barcharts, function (index, value) {
                    that.barChartH[index] = that.config.barcharts[index].heightpercent;
                    that.barChartW[index] = that.config.barcharts[index].widthpercent;
                    that.barChartGroupLabel[index] = that.config.barcharts[index].grouplabel;
                    that.barChart[index] = dc.barChart(that.config.barcharts[index].div);
                });
            }

            //Load Row Chart Configuration File Settings
            if (that.showChartObj == true && that.config.chartobjs !== undefined) {
                var data = [{"id" : 0, "type" : "", "title" : "", "item" : "", "heightpercent" : 0, "widthpercent" : 0, "groupid" : 0, "top" : 0, "x" : 0, "y" : 0}];
                $.each(that.config.chartobjs, function (index, value) {
                    var ch = $('#chart' + count);
                    prop
                    //Row Charts
                    if (that.config.chartobjs[index].type == "row"){
                        $("#dimension").append('<option id="opt' + that.config.chartobjs[index].title + '" value="' + that.config.chartobjs[index].div + '">' + that.config.dimensions[that.config.groups[that.config.chartobjs[index].groupid].dimensionid].datafield + '</option>');
                        that.ChartObjH[index] = that.config.chartobjs[index].heightpercent;
                        that.ChartObjW[index] = that.config.chartobjs[index].widthpercent;
                        that.ChartObjTop[index] = that.config.chartobjs[index].top;
                        that.ChartObj[index] = dc.rowChart(that.config.chartobjs[index].div);
                    }
                    //Bubble Charts
                    if (that.config.chartobjs[index].type == "bubble"){
                        that.bubbleChartH[index] = that.config.bubblecharts[index].heightpercent;
                        that.bubbleChartW[index] = that.config.bubblecharts[index].widthpercent;
                        that.bubbleRadiusSize[index] = that.config.bubblecharts[index].radiussizepixels;
                        that.bubbleChartxAxisLabel[index] = that.config.bubblecharts[index].xaxislabel;
                        that.bubbleChartyAxisLabel[index] = that.config.bubblecharts[index].yaxislabel;
                        that.bubbleChart[index] = dc.bubbleChart(that.config.bubblecharts[index].div);
                    }
                    //Line Charts
                    if (that.config.chartobjs[index].type == "line"){
                        that.lineChartH[index] = that.config.linecharts[index].heightpercent;
                        that.lineChartW[index] = that.config.linecharts[index].widthpercent;
                        that.lineChartGroup1Label[index] = that.config.linecharts[index].group1label;
                        that.lineChartGroup2Label[index] = that.config.linecharts[index].group2label;
                        that.lineChartyAxisLabel[index] = that.config.linecharts[index].yaxislabel;
                        that.lineChart[index] = dc.lineChart(that.config.linecharts[index].div);
                    }
                    //Trendline Charts
                    if (that.config.chartobjs[index].type == "trendline"){
                        that.trendlineChartH[index] = that.config.trendlinecharts[index].heightpercent;
                        that.trendlineChartW[index] = that.config.trendlinecharts[index].widthpercent;
                        that.trendlineChart[index] = dc.seriesChart(that.config.trendlinecharts[index].div);
                    }
                    //Pie Charts
                    if (that.config.chartobjs[index].type == "pie"){
                        that.pieChartH[index] = that.config.piecharts[index].heightpercent;
                        that.pieChartW[index] = that.config.piecharts[index].widthpercent;
                        that.pieRadiusSize[index] = that.config.piecharts[index].radiussizepercent;
                        that.pieChart[index] = dc.pieChart(that.config.piecharts[index].div);
                    }
                    //Bar Charts
                    if (that.config.chartobjs[index].type == "bar"){
                        that.barChartH[index] = that.config.barcharts[index].heightpercent;
                        that.barChartW[index] = that.config.barcharts[index].widthpercent;
                        that.barChartGroupLabel[index] = that.config.barcharts[index].grouplabel;
                        that.barChart[index] = dc.barChart(that.config.barcharts[index].div);
                    }
                    //Data Count Charts
                    if (that.config.chartobjs[index].type == "datacount"){
                        that.dataCountChartH[index] = that.config.datacountcharts[index].heightpercent;
                        that.dataCountChartW[index] = that.config.datacountcharts[index].widthpercent;
                        that.dataCountChart[index] = dc.dataCount(that.config.datacountcharts[index].div);
                    }
                    //Data Table Charts
                    if (that.config.chartobjs[index].type == "datatable"){
                        that.datatableChartH[index] = that.config.datatablecharts[index].heightpercent;
                        that.datatableChartW[index] = that.config.datatablecharts[index].widthpercent;
                        that.datatableChart[index] = dc.dataTable(that.config.datatablecharts[index].div);
                    }
                    //Number Display Charts
                    if (that.config.chartobjs[index].type == "numberdisplay"){
                        that.numberDisplayH[index] = that.config.numberdisplays[index].heightpercent;
                        that.numberDisplayW[index] = that.config.numberdisplays[index].widthpercent;
                        that.numberDisplay[index] = dc.numberDisplay(that.config.numberdisplays[index].div);
                    }
                });
            }

            //TODO: JH - still need to add Data Count Chart to config file
            //Load Data Count Chart Configuration File Settings
            if (that.showDataCountChart == true && that.config.datacountcharts !== undefined) {
                $.each(that.config.datacountcharts, function (index, value) {
                    that.dataCountChartH[index] = that.config.datacountcharts[index].heightpercent;
                    that.dataCountChartW[index] = that.config.datacountcharts[index].widthpercent;
                    that.dataCountChart[index] = dc.dataCount(that.config.datacountcharts[index].div);
                });
            }

            //Load Data Table Chart Configuration File Settings
            if (that.showDataTableChart == true && that.config.datatablecharts !== undefined) {
                $.each(that.config.datatablecharts, function (index, value) {
                    that.datatableChartH[index] = that.config.datatablecharts[index].heightpercent;
                    that.datatableChartW[index] = that.config.datatablecharts[index].widthpercent;
                    that.datatableChart[index] = dc.dataTable(that.config.datatablecharts[index].div);
                });
            }

            if (that.showNumberDisplay == true && that.config.numberdisplays !== undefined) {
                $.each(that.config.numberdisplays, function (index, value) {
                    that.numberDisplayH[index] = that.config.numberdisplays[index].heightpercent;
                    that.numberDisplayW[index] = that.config.numberdisplays[index].widthpercent;
                    that.numberDisplay[index] = dc.numberDisplay(that.config.numberdisplays[index].div);
                });
            }

            //Load the Data
            that.chartTheData();

        }).fail(function (err) {
            alert("error loading config.json");
            that.message(err)
        })
    };

    this.update = function (obj) {
        for (var key in obj) {
            this[key] = obj[key];
        }
    };

    this.init = function (obj) {
        if (obj != undefined) {
            this.update(obj);
        }
    };

    this.debug = false;

    this.message = function (x) {
        if (this.debug && console && console.log) {
            console.log(x)
        }
	return data;
    };

    //Loads the Data from the Web Service Endpoint (or static JSON file)
    //Specified in the report definition configuration file, ("url" : "/data/sustainingdefects.json" or "url" : "/api/sustainingdefects")
    this.chartTheData = function () {
        var that = this;
        var testData = [];
        $.ajax({
            url: that.config.data.url,
            type: 'GET',
            dataType: "json",
            crossDomain: true
        }).success(function (data) {
            if (data.record !== undefined) {
                testData = data.record;
            }
            else {
                testData = data;
            }

            testData.forEach(function (d) {
                //TODO: JH - Fix the parsing for time and date
                var ItemDate1 = "";
                if (d[that.config.data.datefield].search("T") > -1) {
                    ItemDate1 = d[that.config.data.datefield].split("T", 1);
                    ItemDate1 = ItemDate1[0].toString();
                    d.dd = that.dateFormat.parse(ItemDate1);
                    d.month = d3.time.month(d.dd); // pre-calculate month for better performance
                }
                else if (d[that.config.data.datefield].search(":") > -1) {
                    ItemDate1 = d[that.config.data.datefield];
                    d.dd = that.timeFormat.parse(ItemDate1);
                    d.minutes = d3.time.minutes(d.dd);
                }
                else {
                    ItemDate1 = d[that.config.data.datefield];
                    d.dd = that.dateFormat.parse(ItemDate1);
                    d.month = d3.time.month(d.dd); // pre-calculate month for better performance
                }
                //d.dd = that.dateFormat.parse(ItemDate1);
                //d.month = d3.time.month(d.dd); // pre-calculate month for better performance
                //d.created = ItemDate1;
                d.AvgSize = +d[that.config.data.sizefield]; // coerce to number
                d.Item2 = +d[that.config.data.sizefield];
            });

            that.ndx = crossfilter(testData);
            that.all = that.ndx.groupAll();
        
            //Read in all of the Dimensions from the report definition configuration file
            loadDimensions(that);

            //Read in all of the Filters from the report definition configuration file
            loadFilters(that);

            //Read in all of the Groups from the report definition configuration file
            loadGroups(that);

            //Read in all of the Functions from the report definition configuration file
            loadFunctions(that);

            //Load Each Chart
            for (var index = 0; index < that.ChartObj.length; index++){
                that.enableChartObj(that.ChartObj[index]);
            }
            that.enablebubbleChart(that.showbubbleChart);
            that.enablelineChart(that.showlineChart);
            that.enabletrendlineChart(that.showtrendlineChart);
            that.enablepieChart(that.showpieChart);
            that.enableChartObj(that.showChartObj);
            that.enablebarChart(that.showbarChart);
            that.enableDataCountChart(that.showDataCountChart);
            that.enableDataTableChart(that.showDataTableChart);
            that.enableNumberDisplay(that.showNumberDisplay);
            that.redraw();
        }).fail(function (err) {
            alert("error loading config.json");
            that.message(err)
        })
    };

    //TODO: JH - Add the ability to turn off the toolbox
    //The Toolbox is a div on the right pane of the window. This can be used for various toolbox utilities/controls.
    this.enableToolbox = function (enable) {
        var that = this;
        if (enable) {
            //document.write
        }
    };

    //Load all Bubble Charts - specified in the report definition configuration file
    this.enablebubbleChart = function (enable) {
        var that = this;
        if (enable && that.config.bubblecharts !== undefined) {
            
            $.each(that.config.bubblecharts, function (index, value) {

                that.maxIncidents = d3.max(that.idxGroup[that.config.bubblecharts[index].groupid].all(), function (p) {
                    return p.value.count;
                });

                that.bubbleChart[index]
                .width($(that.divContainer).width() * that.bubbleChartW[index])
                .height($(that.divContainer).height() * that.bubbleChartH[index])
                .transitionDuration(that.transitionTime)
                .dimension(that.idxDimension[that.config.groups[that.config.bubblecharts[index].groupid].dimensionid])

                .group(that.idxGroup[that.config.bubblecharts[index].groupid])  //yearlyPerformanceGroup

                //.colors(["#D73027","#F46D43","#FDAE61","#FEE08B","#FFFFBF","#D9EF8B","#A6D96A", "#66BD63", "#1A9850"]) //RED -> YELLOW -> GREEN
                .colors(["#1A9850", "#66BD63", "#A6D96A", "#D9EF8B", "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D73027"]) //GREEN -> YELLOW -> RED

                .colorDomain([0, that.maxIncidents])

                .colorAccessor(function (p) {
                    return p.value.count;
                })

                //x-axis value
                .keyAccessor(function (p) {
                    return p.value.count;
                })

                //y-axis value
                .valueAccessor(function (p) {
                    return p.value.avgAvgSize;
                })
                .radiusValueAccessor(function (p) {
                    if (that.bubbleRadiusSize[index] !== null && that.bubbleRadiusSize[index] !== undefined) {
                        return that.bubbleRadiusSize[index];
                    }
                    return 10 + (p.value.avgAvgSize * p.value.count * 1);//1 = 100%; Use a smaller percentage to scale appropriately
                })
                .maxBubbleRelativeSize(0.2)
                .x(d3.scale.linear().domain([1, 10]))
                .y(d3.scale.linear().domain([0, 20]))
                .r(d3.scale.linear().domain([0, 500]))

                .elasticY(true)
                .elasticX(true)
                .yAxisPadding(5)
                .xAxisPadding(0)
                .renderHorizontalGridLines(true)
                .renderVerticalGridLines(true)
                .xAxisLabel(that.bubbleChartxAxisLabel[index])
                .yAxisLabel(that.bubbleChartyAxisLabel[index])

                .renderLabel(true)
                .label(function (p) {
                    return p.key;
                })
                .renderTitle(true)
                .title(function (p) {
                    return [p.key + "\n\n" + that.bubbleChartyAxisLabel[index] + ": " + that.numberFormat(p.value.avgAvgSize) + "\n" + that.bubbleChartxAxisLabel[index] + ": " + that.numberFormat(p.value.count) + "%" + "\nFluctuation Percentage: " + that.numberFormat(p.value.fluctuationPercentage)];
                })

                .xAxis().tickFormat(function (v) {
                    return v;
                });
            });
        }
    };

    //Load all Line Charts - specified in the report definition configuration file
    this.enablelineChart = function (enable) {
        var that = this;
        if (enable && that.config.linecharts !== undefined) {
            var minMonth = 0;
            var maxMonth = 0;
            $.each(that.config.linecharts, function (index, value) {
                minMonth = d3.min(that.idxGroup[that.config.linecharts[index].grouptimedomainid].all(), function (d) {
                    return d.key;
                });

                maxMonth = d3.max(that.idxGroup[that.config.linecharts[index].grouptimedomainid].all(), function (d) {
                    return d.key;
                });

                that.lineChart[index]
                .renderArea(true)
                .width($(that.divContainer).width() * that.lineChartW[index])
                .height($(that.divContainer).height() * that.lineChartH[index])
                .transitionDuration(that.transitionTime)
                //.margins({ top: 0, right: 0, bottom: 0, left: 0 })
                .dimension(that.idxDimension[that.config.groups[that.config.linecharts[index].groupid].dimensionid])
                //.colors(["#1A9850", "#66BD63", "#A6D96A", "#D9EF8B", "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D73027"]) //GREEN -> YELLOW -> RED
                //.colors(["#1f77b4", "#D73027", "#1A9850", "#FFFFBF"]) //GREEN -> YELLOW -> RED
                //.colors(["#1f77b4", "#ff661b"]) //GREEN -> YELLOW -> RED
                .colors(["#1f77b4"])
                //.colorDomain([0, maxIncidents])
                .colorDomain([0, 0])
                .mouseZoomable(false)
                .x(d3.time.scale().domain([new Date(minMonth), new Date(maxMonth)]))
                .y(d3.scale.linear().domain([0, 60]))
                .yAxisPadding(0)
                .round(d3.time.month.round)
                .xUnits(d3.time.months)
                .elasticY(true)
                .elasticX(false)
                .renderHorizontalGridLines(true)
                .brushOn(false)
                //base stack = stack 1
                //.group(that.volumeByMonthGroup, that.lineChartGroup2Label)
                .group(that.idxGroup[that.config.linecharts[index].groupid], that.lineChartGroup1Label[index])
                .yAxisLabel(that.lineChartyAxisLabel[index])
                //Y-axis value
                .valueAccessor(function (d) {
                    return d.value.sumAvgSize;
                })
                .legend(dc.legend().x(52).y(0).itemHeight(10).gap(5))
                .colorAccessor(function (d, i) {
                    if (d.points === undefined) {
                        if (d.data !== undefined) {
                            return d.data.value.avgAvgSize;
                        }
                        else {
                            return d[i].data.value.avgAvgSize;
                        }
                    }
                    else {
                        return d.points[i].data.value.avgAvgSize;
                    }
                })
                //stack 2
                //.stack(this.totItem1Group, this.lineChartGroup2Label[index], function (d) {
                //    return d.value.sumItem1;
                //})
                //return [p.key + "\n\n" + that.bubbleChartyAxisLabel + ": " + that.numberFormat(p.value.avgAvgSize) + "\n" + that.bubbleChartxAxisLabel + ": " + that.numberFormat(p.value.count) + "%" + "\nFluctuation Percentage: " + that.numberFormat(p.value.fluctuationPercentage)];
                .title(function (p) {
                    if (p.data !== undefined) {
                        var value = p.data.value.sumAvgSize ? p.data.value.sumAvgSize : p.data.value.sumItem1;
                    }
                    else {
                        var value = p.value.sumAvgSize ? p.value.sumAvgSize : p.value.sumItem1;
                    }
                    if (isNaN(value)) { value = 0; }
                    return "\n\n " + that.currencyFormat(value);
                });
                if (that.showbarChart == true) {
                    that.lineChart[index].rangeChart(that.barChart[0]);
                }
            });
        }
    };

    //Load all Trendline Charts - specified in the report definition configuration file
    this.enabletrendlineChart = function (enable) {
        var that = this;
        if (enable && that.config.trendlinecharts !== undefined) {
            var minMonth = 0;
            var maxMonth = 0;
            $.each(that.config.trendlinecharts, function (index, value) {
                minMonth = d3.min(that.idxGroup[that.config.trendlinecharts[index].grouptimedomainid].all(), function (d) {
                    return d.key;
                });

                maxMonth = d3.max(that.idxGroup[that.config.trendlinecharts[index].grouptimedomainid].all(), function (d) {
                    return d.key;
                });

                //var addT = function(p, d){ return +d[that.config.groups[that.config.trendlinecharts[index].groupid].datafield];};
                //var remT = function (p, d) { return +d[that.config.groups[that.config.trendlinecharts[index].groupid].datafield]; };
                //var ini = function(){ return 0;}

                //var dimmer = that.ndx.dimension(function (d) {
                //    return [d[that.config.dimensions[4].datafield], d[that.config.dimensions[4].datafield2]];
                //});

                //var group1 = dimmer.group().reduce(addT, remT, ini);
                
                that.trendlineChart[index]
                .width($(that.divContainer).width() * that.trendlineChartW[index])
                .height($(that.divContainer).height() * that.trendlineChartH[index])
                .dimension(that.idxDimension[that.config.groups[that.config.trendlinecharts[index].groupid].dimensionid])
                //that.idxDimension[that.config.groups[that.config.linecharts[index].groupid].dimensionid]
                //.dimension(dimmer)
                //.group(group1)
                .group(that.idxGroup[that.config.trendlinecharts[index].groupid])
                //that.idxGroup[that.config.linecharts[index].groupid], that.lineChartGroup1Label[index]
                .seriesAccessor(function (d) {
                    return d.key[1];
                })
                .keyAccessor(function (d) {
                    return d.key[0];
                })
                .valueAccessor(function (d) { return d.value.AvgSize; })
                .x(d3.time.scale().domain([new Date(minMonth), new Date(maxMonth)]))
                .yAxisLabel(that.config.trendlinecharts[index].yaxislabel);

                that.trendlineChart[index]
                //.legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
                //.colors(["#1A9850", "#66BD63", "#A6D96A", "#D9EF8B", "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D73027"])
                .colorDomain([0,100])
                .colorAccessor(function (d, i) {
                    return i;
                });

                that.trendlineChart[index]
                .legend(dc.legend().x(350).y(10).itemHeight(23).gap(4).horizontal(1).legendWidth(180).itemWidth(100))
                .brushOn(false)
                .elasticY(true)
                .elasticX(false)
                .renderHorizontalGridLines(true);
                
                //that.trendlineChart[index].filter(that.barChart[0]);
                if (that.showbarChart == true) {
                    //that.trendlineChart[index].rangeChart(that.barChart[0]);
                }
                //_chart.focusChart = function (c) {
                //    if (!arguments.length) return _focusChart;
                //    _focusChart = c;
                //    _chart.on("filtered", function (chart) {
                //        if (!rangesEqual(chart.filter(), _focusChart.filter())) {
                //            dc.events.trigger(function () {
                //                _focusChart.focus(chart.filter());
                //            });
                //        }
                //    });
                //    return _chart;
                //};

            });
        }
    };

    //Load all Bar Charts - specified in the report definition configuration file
    this.enablebarChart = function (enable) {
        var that = this;
        if (enable && that.config.barcharts !== undefined) {
            //
            var minMonth = 0;
            var maxMonth = 0;

            $.each(that.config.barcharts, function (index, value) {
                minMonth = d3.min(that.idxGroup[that.config.barcharts[index].grouptimedomainid].all(), function (d) {
                    return d.key;
                });

                maxMonth = d3.max(that.idxGroup[that.config.barcharts[index].grouptimedomainid].all(), function (d) {
                    return d.key;
                });

                that.barChart[index]
                .width($(that.divContainer).width() * that.barChartW[index])
                .height($(that.divContainer).height() * that.barChartH[index])
                .transitionDuration(that.transitionTime)
                .dimension(that.idxDimension[that.config.groups[that.config.barcharts[index].groupid].dimensionid])
                .group(that.idxGroup[that.config.barcharts[index].groupid], that.barChartGroupLabel[index])
                .centerBar(false)
                .elasticY(true)
                .gap(that.barChartGap)
                .legend(dc.legend().x(52).y(0).itemHeight(10).gap(5))
                .x(d3.time.scale().domain([new Date(minMonth), d3.time.day.offset(new Date(maxMonth), 1)]))
                .yAxisLabel(that.config.barcharts[index].yaxislabel)
                .round(d3.time.month.round)
                .xUnits(d3.time.months);
            });
        }
    };

    //Load all Pie Charts - specified in the report definition configuration file
    this.enablepieChart = function (enable) {
        var that = this;
        if (enable && that.config.piecharts !== undefined) {
            $.each(that.config.piecharts, function (index, value) {
                var width = $(that.divContainer).width() * that.pieChartW[index];
                var height = $(that.divContainer).height() * that.pieChartH[index];
                var radius = that.pieRadiusSize[index];
                if (width > height) {
                    radius = height / 2;
                }
                else {
                    radius = width / 2;
                }
                that.pieChart[index]
                .width($(that.divContainer).width() * that.pieChartW[index])
                .height($(that.divContainer).height() * that.pieChartH[index])
                .radius(radius)
                .innerRadius(radius * 0.30)
                .dimension(that.idxDimension[that.config.groups[that.config.piecharts[index].groupid].dimensionid])
                .group(that.idxGroup[that.config.piecharts[index].groupid]);
            });
        }
    };

    //Load all Row Charts - specified in the report definition configuration file
    this.enableChartObj = function (enable) {
        var that = this;
        if (enable && that.config.chartobjs !== undefined) {
            $.each(that.config.chartobjs, function (index, value) {
                var test = index;
                var test2 = value;
                that.ChartObj[index]
                .width($(that.divContainer).width() * that.ChartObjW[index])
                .height($(that.divContainer).height() * that.ChartObjH[index])
                .dimension(that.idxDimension[that.config.groups[that.config.chartobjs[index].groupid].dimensionid])
                .group(that.idxGroup[that.config.chartobjs[index].groupid])
                .label(function (d) {
                    if (d.key.toString().split(".")[1] !== undefined)
                        return d.key.split(".")[1];
                    else
                        return d.key.toString();
                })
                // title sets the row text
                .title(function (d) {
                    return d.value;
                })
                .elasticX(true)
                .xAxis().ticks(4);
                that.ChartObj[index].data(function(d){return d.top(that.config.chartobjs[index].top);});
            });
        }
    };

    //Load all Data Count Charts - specified in the report definition configuration file
    this.enableDataCountChart = function (enable) {
        var that = this;
        if (enable && that.config.datacountcharts !== undefined) {
            $.each(that.config.datacountcharts, function (index, value) {
                that.dataCountChart[index]
                .dimension(that.ndx)
                .group(that.all);
            });
        }
    };

    //Load all Data Table Charts - specified in the report definition configuration file
    this.enableDataTableChart = function (enable) {
        var that = this;
        if (enable && that.config.datatablecharts !== undefined) {
            //var dateDim = that.ndx.dimension(function(d) {return d.dd;});
            //var dateYear = dateDim.group().all;
            $.each(that.config.datatablecharts, function (index, value) {
                that.datatableChart[index]
                .size(50)
                .width(500)
                .height(200)
                .dimension(that.ndx.dimension(function(d) {return d.dd;}))
                .group(function(d){return d.Year;})
                .columns([
                    function(d) {
                        return (d.dd.getMonth() + 1 ) + "/" + d.dd.getDate() + "/" + d.dd.getFullYear();
                    },
                    function(d) {
                        return d.Indicator;
                    },
                    function(d) {
                        return d.Score;
                    },
                    function(d) {
                        return d.Source;
                    },
                    function(d) {
                        return 0;
                    },
                    function(d) {
                        return 0;
                    }
                ]);
                /*that.datatableChart[index]
                .size(10)
                .width($(that.divContainer).width() * that.datatableChartW[index])
                .height($(that.divContainer).height() * that.datatableChartH[index])
                .dimension(that.idxDimension[that.config.groups[that.config.datatablecharts[index].groupid].dimensionid])
                .group(that.idxGroup[that.config.datatablecharts[index].groupid]);

                that.datatableChart[index]
                .columns([
                    function (d) { 
                        return d.ID; 
                    },
                    function (d) { 
                        return d.Score; 
                    },
                    function (d) { 
                        return d.Indicator; 
                    },
                    function (d) { 
                        return d.Created; 
                    },
                    function (d) { 
                        return d.Source; 
                    },
                    function (d) { 
                        return d.Target; 
                    },
                ]);*/
/*
                .label(function (d) {
                    if (d.key.split(".")[1] !== undefined)
                        return d.key.split(".")[1];
                    else
                        return d.key;
                })
*/
                // title sets the row text
                //.title(function (d) {
                //    return d.key;
                //})
                //.elasticX(true)
                //.xAxis().ticks(4);
            });
        }
    };

    //Load all Row Charts - specified in the report definition configuration file
    this.enableNumberDisplay = function (enable) {
        var that = this;
        if (enable && that.config.numberdisplays !== undefined) {
            $.each(that.config.numberdisplays, function (index, value) {
                var test = index;
                var test2 = value;
                that.numberDisplay[index]
                .width($(that.divContainer).width() * that.numberDisplayW[index])
                .height($(that.divContainer).height() * that.numberDisplayH[index])
                //.dimension(that.idxDimension[that.config.groups[that.config.numberdisplays[index].groupid].dimensionid])
                //.valueAccessor(that.idxFunction[that.config.numberdisplays[index].functionid])
                .valueAccessor(function(d){
                    return d.value.count ? d.value.sumAvgSize / d.value.count : 0;}
                    )
                .group(that.idxGroup[that.config.numberdisplays[index].groupid]);
                /*
                .label(function (d) {
                    if (d.key.toString().split(".")[1] !== undefined)
                        return d.key.split(".")[1];
                    else
                        return d.key.toString();
                })
                // title sets the row text
                .title(function (d) {
                    return d.value;
                })
                .elasticX(true)
                .xAxis().ticks(4);
                */
            });
        }
    };

    //Handles Redraw of all charts
    this.redraw = function () {
        that = this;
        dc.renderAll();
        setYLabelPadding(that);
    };
    
    //Handles Resizing charts relative to the main div when a resize event occurs
    this.resize = function (event) {
        that = this;
        //if (this.showbarChart) { this.barChart.brushOn(false); }
        if (event.type == 'resize' && event.target.id != 'crossfilter') {
            $(that.divContainer).height(($(document).height() - that.headerBarOffset) * that.crossfilterContainerH);
            $(that.divContainer).width(($(document).width() * that.crossfilterContainerW) - $('#toolbox').width());
        }

        //Set the relative height and width for each control
        setChartControlHeightWidth(that, that.showbubbleChart, that.config.bubblecharts, that.bubbleChart, that.bubbleChartH, that.bubbleChartW);
        setChartControlHeightWidth(that, that.showlineChart, that.config.linecharts, that.lineChart, that.lineChartH, that.lineChartW);
        setChartControlHeightWidth(that, that.showtrendlineChart, that.config.trendlinecharts, that.trendlineChart, that.trendlineChartH, that.trendlineChartW);
        setChartControlHeightWidth(that, that.showpieChart, that.config.piecharts, that.pieChart, that.pieChartH, that.pieChartW);
        setChartControlHeightWidth(that, that.showChartObj, that.config.chartobjs, that.ChartObj, that.ChartObjH, that.ChartObjW);
        setChartControlHeightWidth(that, that.showbarChart, that.config.barcharts, that.barChart, that.barChartH, that.barChartW);
        setChartControlHeightWidth(that, that.showDataCountChart, that.config.datacountcharts, that.dataCountChart, that.dataCountChartH, that.dataCountChartW);
        setChartControlHeightWidth(that, that.showDataTableChart, that.config.datatablecharts, that.datatableChart, that.datatableChartH, that.datatableChartW);

//TODO: JH - Still need to add support for Data Tables
        //setChartControlHeightWidth(that, that.showDataTableChart, that.config.datatablecharts, that.datatableChart, that.datatableChartH, that.datatableChartW);
        if (that.showDataTableChart == true && that.config.datatablecharts !== undefined) {
            $.each(that.config.datatablecharts, function (index, value) {
                $(that.config.datatablecharts[index].div).height($(that.divContainer).height() * that.datatableChartH[index]);
                $(that.config.datatablecharts[index].div).width($(that.divContainer).width() * that.datatableChartW[index]);
                that.datatableChart[index].height($(that.config.datatablecharts[index].div).height());
                that.datatableChart[index].width($(that.config.datatablecharts[index].div).width());
            });
        }

        //provides support for rendering, rescaling, turning the brush on/off
        prerenderChartControl(that, that.showlineChart, that.config.linecharts, that.lineChart);
        prerenderChartControl(that, that.showtrendlineChart, that.config.trendlinecharts, that.trendlineChart);
        prerenderChartControl(that, that.showtrendlineChart, that.config.trendlinecharts, that.trendlineChart);
        prerenderChartControl(that, that.showChartObj, that.config.chartobjs, that.ChartObj);
        prerenderChartControl(that, that.showbarChart, that.config.barcharts, that.barChart);
        prerenderChartControl(that, that.showDataTableChart, that.config.datatablecharts, that.datatableChart);
        prerenderChartControl(that, that.showbubbleChart, that.config.bubblecharts, that.bubbleChart);
        prerenderChartControl(that, that.showNumberDisplay, that.config.numberdisplays, that.numberDisplay)

        dc.renderAll();

        //reposition the Y axis labels to allow for larger Y Axis numbers
        setYLabelPadding(that);
    };

    //Handles a Resize Stop event. Allows for turning the brush off and clearing the brush buffer.
    this.resizeStop = function () {
        that = this;

        if (that.showbarChart == true && that.config.barcharts !== undefined) {
            $.each(that.config.barcharts, function (index, value) {
                var brush3 = that.barChart[index].brush();

                if (brush3.empty() != true) {
                    brush3.clear();
                }

                that.barChart[index].brushOn(true);
                that.barChart[index].render();
            });
        }

        dc.renderAll();

        //reposition the Y axis labels to allow for larger Y Axis numbers
        setYLabelPadding(that);
    };

    //Handles resizing the chart controls when the toolbox is toggled open/closed
    this.toolboxResize = function () {
        that = this;
        $('#toolDiv').toggle();
        $(that.divContainer).width(($(document).width() * chart.crossfilterContainerW) - $('#toolbox').width());

        //if (this.showbarChart) { this.barChart.brushOn(false); }

        //Set the relative height and width for each control
        setChartControlHeightWidth(that, that.showbubbleChart, that.config.bubblecharts, that.bubbleChart, that.bubbleChartH, that.bubbleChartW);
        setChartControlHeightWidth(that, that.showlineChart, that.config.linecharts, that.lineChart, that.lineChartH, that.lineChartW);
        setChartControlHeightWidth(that, that.showtrendlineChart, that.config.trendlinecharts, that.trendlineChart, that.trendlineChartH, that.trendlineChartW);
        setChartControlHeightWidth(that, that.showpieChart, that.config.piecharts, that.pieChart, that.pieChartH, that.pieChartW);
        setChartControlHeightWidth(that, that.showChartObj, that.config.chartobjs, that.ChartObj, that.ChartObjH, that.ChartObjW);
        setChartControlHeightWidth(that, that.showbarChart, that.config.barcharts, that.barChart, that.barChartH, that.barChartW);
        setChartControlHeightWidth(that, that.showDataCountChart, that.config.datacountcharts, that.dataCountChart, that.dataCountChartH, that.dataCountChartW);
        setChartControlHeightWidth(that, that.showNumberDisplay, that.config.numberdisplays, that.numberDisplay, that.numberDisplayH, that.numberDisplayW);

//TODO: JH - Still need to add support for Data Tables
        //setChartControlHeightWidth(that, that.showDataTableChart, that.config.datatablecharts, that.datatableChart, that.datatableChartH, that.datatableChartW);
        if (that.showDataTableChart == true && that.config.datatablecharts !== undefined) {
            $.each(that.config.datatablecharts, function (index, value) {
                $(that.config.datatablecharts[index].div).height($(that.divContainer).height() * that.datatableChartH[index]);
                $(that.config.datatablecharts[index].div).width($(that.divContainer).width() * that.datatableChartW[index]);
                that.datatableChart[index].height($(that.config.datatablecharts[index].div).height());
                that.datatableChart[index].width($(that.config.datatablecharts[index].div).width());
            });
        }

        //Pre Render Charts to allow for rendering, rescaling, and turning the brush on/off
        prerenderChartControl(that, that.showlineChart, that.config.linecharts, that.lineChart);
        prerenderChartControl(that, that.showtrendlineChart, that.config.trendlinecharts, that.trendlineChart);
        prerenderChartControl(that, that.showpieChart, that.config.piecharts, that.pieChart);
        prerenderChartControl(that, that.showChartObj, that.config.chartobjs, that.ChartObj);
        prerenderChartControl(that, that.showbarChart, that.config.barcharts, that.barChart);
        prerenderChartControl(that, that.showDataTableChart, that.config.datatablecharts, that.datatableChart);
        prerenderChartControl(that, that.showbubbleChart, that.config.bubblecharts, that.bubbleChart);
        prerenderChartControl(that, that.showNumberDisplay, that.config.numberdisplays, that.numberDisplay);
        
        //Adjust the Y Axis Labels based on larger Y values
        setYLabelPadding(that);
    };

    //Loads all Dimensions from the report definition configuration file
    function loadDimensions(that) {
        //Load the Dimensions used by the report definition
        if (that.config.dimensions !== undefined) {
            $.each(that.config.dimensions, function (index, value) {
                that.idxDimension[index] = chart.ndx.dimension(function (d) {
/*
                    //Dimension based on the Data Object
                    if (that.config.dimensions[index].context === "context:object") {
                        return d;
                    }
*/
                    //Dimension based on a specific field like Category
                    if (that.config.dimensions[index].context === "context:field") {
                        return d[that.config.dimensions[index].datafield];
                    }

                    //Dimension based on a specific field like Category
                    if (that.config.dimensions[index].context === "context:2field") {
                        return [d[that.config.dimensions[index].datafield], d[that.config.dimensions[index].datafield2]];
                    }

                    //Dimension based on date
                    if (that.config.dimensions[index].context === "context:date") {
                        return d.dd;
                    }

                    //Dimension based on day of week
                    if (that.config.dimensions[index].context === "context:day") {
                        var day = d.dd.getDay();
                        var name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                        return day + "." + name[day];
                    }

                    //Dimension based on month
                    if (that.config.dimensions[index].context === "context:month") {
                        return d3.time.month(d.dd);
                    }

                    //Dimension based on Quarter of the year
                    if (that.config.dimensions[index].context === "context:quarter") {
                        var month = d.dd.getMonth() + 1;
                        if (month <= 3)
                            return "Q1";
                        else if (month > 3 && month <= 6)
                            return "Q2";
                        else if (month > 6 && month <= 9)
                            return "Q3";
                        else
                            return "Q4";
                    }

                    //Dimension based on Range
                    if (that.config.dimensions[index].context === "context:range") {
                        var number = d.AvgSize;
                        if (number <= (that.config.dimensions[index].highrange * 0.25))
                            return "<25%";
                        else if (number > (that.config.dimensions[index].highrange * 0.5) && number <= (that.config.dimensions[index].highrange * 0.75))
                            return "<50%";
                        else if (number > (that.config.dimensions[index].highrange * 0.75) && number <= (that.config.dimensions[index].highrange * 1))
                            return "<75%";
                        else
                            return "100%";
                    }
                });
            });
        }
    };

    //Loads all Filters from the report definition configuration file
    function loadFilters(that) {
        if (that.config.filters !== undefined) {
            $.each(that.config.filters, function (index, value) {
                //Filter function
                if (that.config.filters[index].context === "context:dimension") {
                    that.idxFilter[index] = that.idxDimension[that.config.filters[index].dimensionid].filter(function(d){
                          if(eval(Math.abs(d) + that.config.filters[index].condition))
                               return d;
                    });
                }
            });
        }
    };

    //Loads all Groups from the report definition configuration file
    function loadGroups(that) {
        if (that.config.groups !== undefined) {
            $.each(that.config.groups, function (index, value) {
                //Group reducing function by Size
                if (that.config.groups[index].context === "context:reduce") {
                    that.idxGroup[index] = that.idxDimension[that.config.groups[index].dimensionid].group().reduce(
                        function (p, v) {
                            ++p.count;
                            p.AvgSize = v.AvgSize;
                            p.sumAvgSize += v[that.config.groups[index].datafield];
                            p.avgAvgSize = p.sumAvgSize / p.count;
                            p.fluctuation += v[that.config.groups[index].datafield] - p.lastAvgSize;
                            p.lastAvgSize = v[that.config.groups[index].datafield];
            			    if(p.avgAvgSize == 0){
            				p.fluctuationPercentage = (Math.abs(p.fluctuation) / 1) * 100;
            			    }
            			    else{
                            	p.fluctuationPercentage = (Math.abs(p.fluctuation) / p.avgAvgSize) * 100;
                            }
                            return p;
                        },
                        function (p, v) {
                            --p.count;
                            p.AvgSize = v.AvgSize;
                            p.sumAvgSize -= v[that.config.groups[index].datafield];
                            p.avgAvgSize = p.sumAvgSize / p.count;
                            p.fluctuation -= v[that.config.groups[index].datafield] - p.lastAvgSize;
                            p.lastAvgSize = v[that.config.groups[index].datafield];
                            if(p.avgAvgSize == 0){
                				p.fluctuationPercentage = (Math.abs(p.fluctuation) / 1) * 100;
            			    }
            			    else{
            				    p.fluctuationPercentage = (Math.abs(p.fluctuation) / p.avgAvgSize) * 100;
            			    }
                            return p;
                        },
                        function () {
                            return { count: 0, AvgSize: 0, sumAvgSize: 0, avgAvgSize: 0, fluctuation: 0, lastAvgSize: 0, fluctuationPercentage: 0 };
                        }
                    );
                }

                //Group function
                if (that.config.groups[index].context === "context:groupkey") {
                    //that.idxGroup[index] = that.idxDimension[that.config.groups[index].dimensionid].group(function(d){return d[that.config.groups[index].datafield];});
                    that.idxGroup[index] = that.idxDimension[that.config.groups[index].dimensionid].group(function(d){
                        console.log(d[that.config.groups[index].datafield]);
                        return d[that.config.groups[index].datafield];
                    });
                }

                //Group function
                if (that.config.groups[index].context === "context:group") {
                    that.idxGroup[index] = that.idxDimension[that.config.groups[index].dimensionid].group();
                }

                //Group Reduce Count function
                if (that.config.groups[index].context === "context:reducecount") {
                    that.idxGroup[index] = that.idxDimension[that.config.groups[index].dimensionid].group().reduceCount(function (d) {
                        return d3.time.month(d.dd);
                    });
                }

                //Group Reduce Count function
                if (that.config.groups[index].context === "context:reducecountkey") {
                    that.idxGroup[index] = that.idxDimension[that.config.groups[index].dimensionid].group().reduceCount();
                }

                //Group Reduce Sum function
                if (that.config.groups[index].context === "context:reducesum") {
                    that.idxGroup[index] = that.idxDimension[that.config.groups[index].dimensionid].group().reduceSum(function (d) {
                        return d[that.config.groups[index].datafield];
                    });
                }
            });
        }
    };

    //Loads all Functions from the report definition configuration file
    function loadFunctions(that) {
        if (that.config.functions !== undefined) {
            $.each(that.config.functions, function (index, value) {
                //Functions
                if (that.config.functions[index].context === "context:average") {
                    that.idxFunction[index] = that.idxGroup[that.config.functions[index].groupid].all();//.function(d, i){
                          //return d.value.count ? d.value.sumAvgSize / d.value.count : 0;
                    //};
                }
            });
        }
    };

    //TODO: JH - Consolidate some of the chart setting routines into this function.
    //Placeholder for loading configuration file settings
    //function setChartConfigParams(that, chartShowControl, chartConfigItem, chartObj, iHeight, iWidth) {
    //    if (chartShowControl == true && chartConfigItem !== undefined) {
    //        $.each(chartConfigItem, function (index, value) {
    //            iHeight[index] = chartConfigItem[index].heightpercent;
    //            iWidth[index] = chartConfigItem[index].widthpercent;

    //            //Bubble Chart Settings
    //            if (chartOjb === that.bubbleChart) {
    //                that.bubbleChartxAxisLabel[index] = chartConfigItem[index].xaxislabel;
    //                that.bubbleChartyAxisLabel[index] = chartConfigItem[index].yaxislabel;
    //                that.bubbleRadiusSize[index] = chartConfigItem[index].radiussizepixels;
    //                that.chartObj[index] = dc.bubbleChart(chartConfigItem[index].div);
    //            }
    //        });
    //    }
    //};

    //Resizes Chart Height and Width relative to the main div when the window is resized.
    function setChartControlHeightWidth(that, chartShowControl, chartConfigItem, chartObj, iHeight, iWidth) {
        if (chartShowControl && chartConfigItem !== undefined) {
            $.each(chartConfigItem, function (index, value) {
                $(chartConfigItem[index].div).height($(that.divContainer).height() * iHeight[index]);
                $(chartConfigItem[index].div).width($(that.divContainer).width() * iWidth[index]);
                chartObj[index].height($(chartConfigItem[index].div).height());
                chartObj[index].width($(chartConfigItem[index].div).width());

                //exception for radius of pie charts
                if (chartObj === that.pieChart) {
                    if (chartObj[index].width() > chartObj[index].height()) {
                        chartObj[index].radius(chartObj[index].height() / 2);
                        chartObj[index].innerRadius((chartObj[index].height() / 2) * 0.3);
                    }
                    else {
                        chartObj[index].radius(chartObj[index].width() / 2);
                        chartObj[index].innerRadius((chartObj[index].width() / 2) * 0.3);
                    }
                }
            });
        }
    };

    //Handles rescaling, rendering, turning brush on/off when first loaded and redrawn
    function prerenderChartControl(that, chartShowControl, chartConfigItem, chartObj) {
        if (chartShowControl == true && chartConfigItem !== undefined) {
            $.each(chartConfigItem, function (index, value) {
                if (chartObj === that.bubbleChart) {
                    chartObj[index]._doRender();
                    chartObj[index].brushOn(true);
                }
                if (chartObj !== that.pieChart && chartObj !== that.ChartObj && chartObj !== that.numberDisplay) {
                    chartObj[index].rescale();
                }
                if (chartObj === that.barChart) {
                    chartObj[index].brushOn(true);
                }
                chartObj[index].render();
            });
        }
    };

    //Handles repositioning the Y Axis Label to allow for more padding when Y Axis values are large
    function setYLabelPadding(that) {
        if (that.showbubbleChart == true && that.config.bubblecharts !== undefined) {
            $.each(that.config.bubblecharts, function (index, value) {
                setYAxisLabelPadding(that.bubbleChart[index]);
            });
        }
        if (that.showlineChart == true && that.config.linecharts !== undefined) {
            $.each(that.config.linecharts, function (index, value) {
                setYAxisLabelPadding(that.lineChart[index]);
            });
        }
        if (that.showtrendlineChart == true && that.config.trendlinecharts !== undefined) {
            $.each(that.config.trendlinecharts, function (index, value) {
                //setYAxisLabelPadding(that.trendlineChart[index]);
            });
        }
        if (that.showbarChart == true && that.config.barcharts !== undefined) {
            $.each(that.config.barcharts, function (index, value) {
                setYAxisLabelPadding(that.barChart[index]);
            });
        }
    };

    //Called from setYLabelPadding(that)
    function setYAxisLabelPadding(chart) {
        setXAxisChart(chart, ".grid-line.horizontal", 4);
        setXAxisChart(chart, ".grid-line.vertical", 4);
        setXAxisChart(chart, ".chart-body", 4);
        setXAxisChart(chart, ".axis.x", 4);
        setXAxisChart(chart, ".axis.y", 4);

        var ylabel = chart.selectAll(".y-axis-label").attr("transform").split('(')[1].split(')')[0].split(' ')[1];
        if (ylabel === undefined) {
            ylabel = chart.selectAll(".y-axis-label").attr("transform").split('(')[1].split(')')[0].split(',')[1];
        }
        chart.selectAll(".y-axis-label").attr("transform", "translate(8 " + ylabel + ") rotate(-90)");
        return;
    };

    //Called from setYAxisLabelPadding(chart), used for moving the entire chart on the x-axis when needed.
    function setXAxisChart(chart, element, x) {
        if (!chart.selectAll(element).empty()) {
            var xval = chart.selectAll(element).attr("transform").split('(')[1].split(')')[0].split(' ')[0];
            if (xval === undefined) { xval = chart.selectAll(element).attr("transform").split('(')[1].split(')')[0].split(',')[0]; }
            else {
                xval = xval.split(',')[0];
            }
            var yval = chart.selectAll(element).attr("transform").split('(')[1].split(')')[0].split(' ')[1];
            if (yval === undefined) { yval = chart.selectAll(element).attr("transform").split('(')[1].split(')')[0].split(',')[1]; }
            xval = Number(xval) + Number(x);
            chart.selectAll(element).attr("transform", "translate(" + xval.toString() + " " + yval + ")");
        }
    };
}
