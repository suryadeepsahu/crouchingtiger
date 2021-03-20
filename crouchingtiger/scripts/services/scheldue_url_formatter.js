(function () {
	/* jshint expr: true */
    var ap = angular.module("scheldue_url_formatter", []);

	ap.factory("ScheldueUrlFormatter", ["$window", "$rootScope","$location","ScheduledReportWebService", function ($window, $rootScope, $location, ScheduledReportWebService) {
		var ScheldueUrlFormatter = {};
		var adFilters = [], basicFilters = [];
		var filtersFromFilterId = {};

		var advFilterRportMapping = {
			acq_campaign    : "with_aggreation",
			acq_callflow    : "with_aggreation",
			acq_keyword     : "with_aggreation",
			acq_group       : "with_aggreation",
			acq_source      : "with_aggreation",
			call_detail     : "with_aggreation",
			call_back       : "with_aggreation",
			activity_stream : ".html",
			group_activity  : "without_aggreation",
			callflow_setting: "without_aggreation"
		};

        var filterUIMappingToDatabase = {
	        contains: "ILIKE",
	        eq      : "=",
	        gthan   : ">",
	        lthan   : "<",
	        include : "include",
	        exclude : "exclude"
        };

        var ranges = {
			'today':        [moment(),                                       moment().endOf('day')],
			'yesterday':    [moment().subtract('days', 1),                   moment().subtract('days', 1).endOf('day')],
			'last_week':  [moment().subtract('days', 7),                   moment().endOf('day')],
			'last_30': [moment().subtract('days', 29),                  moment().endOf('day')],
			'this_month':   [moment().startOf('month'),                      moment().endOf('month').endOf('day')],
			'last_month':   [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month').endOf('day')]
		};

		var backendScheldueReportName = {
			acq_campaign : "acq_campaign",
            acq_callflow : "acq_callflow",
            acq_keyword : "acq_keyword",
            acq_group : "acq_group",
            acq_source : "acq_source",
            call_detail : "call_detail",
            call_back : "call_back",
            activity_stream : "activity_stream",
            group_activity : "group_activity",
            callflow_setting : "callflow_setting"
		};

		var advFiltersColumns = {
			with_aggreation : {
				inc : "inclusivity",
				col : "column",
				compOp : "comparativeOperator",
				userInput : "text"
			},
			without_aggreation : {
				inc : "inc",
				col : "col",
				compOp : "compOp",
				userInput : "userInput"
			},
			group_activity_callflow : {
				inc : "inclusivity",
				col : "column",
				compOp : "compOperator",
				userInput : "userInput"
			}
		};

		ScheldueUrlFormatter.createBaseUrl = function(start_date, end_date, grouping, advFilters, basic_filter, report) {
			var baseUrl = "/#set-scheduled-editor", url, filters = [], urlParams;
			url = baseUrl + "?report=" + report + "&start_date=" + start_date + "&end_date=" + end_date ;
			if (grouping !== undefined && grouping !== '' && grouping !== "none") { url += "&grouping=" + grouping; }
			if (basic_filter !== undefined && basic_filter.length > 0) { url += "&basicFilter=" + basic_filter; }

            if (ScheldueUrlFormatter.convertAdvancedFilters(report, advFilters).length > 0) {
	            url = url+"&advfilters="+ScheldueUrlFormatter.convertAdvancedFilters(report, advFilters);
            }
			return url;
		};

		ScheldueUrlFormatter.createScheldulerBaseUrl = function(report, report_id, filters, filter_rules) {
			var grouping = "", basicFilter = "", advfilters = "", filterLength, baseUrl = "/#set-scheduled-editor";
			var start_date, end_date;

			var filterRelatedData = ScheldueUrlFormatter.getFilterRelatedData(filters, filter_rules, report);
			var url = baseUrl + "?id=" + report_id + "&report=" + backendScheldueReportName[report] +"&start_date=" + filterRelatedData.start_date + "&end_date=" + filterRelatedData.end_date;

			if (filterRelatedData.grouping) { url += "&grouping=" + filterRelatedData.grouping; }
			if (filterRelatedData.basicFilter.length > 0) { url += "&basicFilter=" + filterRelatedData.basicFilter; }

            if (filterRelatedData.advfilters.length > 0) {
            	advfilters = advfilters;
            	url += "&advfilters=" + filterRelatedData.advfilters;
            }

			return url;
		};

		ScheldueUrlFormatter.convertAdvancedFilters = function(report, advFilters) {
			var filters = "";
			var advFilterreport = advFilterRportMapping[report];
			if (advFilters !== undefined && advFilters.length > 0)
	            _.each(advFilters, function (advf) {
	                var tempArray = [
	                    advf[advFiltersColumns[advFilterreport].inc],
	                    advf[advFiltersColumns[advFilterreport].col],
	                    advf[advFiltersColumns[advFilterreport].compOp],
	                    advf[advFiltersColumns[advFilterreport].userInput]
	                ];
	                filters = filters + tempArray.join(",");
	            });

			return filters;
		};

		ScheldueUrlFormatter.getFilterRulesFromUrl = function() {
			var grouping, schelFilters = [];

			schelFilters.push({
				filter_inc: "include",
				filter_key: "timezone",
				comparator: "=",
				filter_value : $rootScope.timezone
			});

			if($location.search().grouping !== undefined){
				schelFilters.push({
					filter_inc: "include",
					filter_type: "grouping",
					filter_key: "grouping",
					comparator: "=",
					filter_value : $location.search().grouping
				});
			}

			if($location.search().basicFilter !== undefined){
				schelFilters.push({
					filter_inc: "include",
					filter_type: "basic_filter",
					filter_value : $location.search().basicFilter
				});
			}

			if($location.search().advfilters !== undefined){
				var size = 4, advfilters = [];
				var urlAdvFilter = $location.search().advfilters.split(",");
				while (urlAdvFilter.length > 0)
				    advfilters.push(urlAdvFilter.splice(0, size));
				_.each(advfilters, function (advf) {
					/*if(advf[2] === "gt")
						advf[2] = "gthan";

					if(advf[2] === "lt")
						advf[2] === "lthan";
					*/

				 	schelFilters.push({
						filter_type: "advanced_filter",
						filter_inc: filterUIMappingToDatabase[advf[0]],
						filter_key: advf[1],
						comparator: advf[2],
						filter_value : advf[3]
					});
	            });
			}
			return schelFilters;
		};

		ScheldueUrlFormatter.getFiltesFromUrl = function() {
			var range = '';
			if($location.search().start_date !== undefined && $location.search().end_date !== undefined){
				var start_date = moment($location.search().start_date);
				var end_date = moment($location.search().end_date);
				_.each(ranges, function(value, key) {
					if(moment(value[0].format('YYYY-MM-DD')).isSame(start_date.format('YYYY-MM-DD'))
						&& moment(value[1].format('YYYY-MM-DD')).isSame(end_date.format('YYYY-MM-DD')) ){
						range = key;
						return;
					}
				});
			}

			return [range, moment($location.search().start_date).format('YYYY-MM-DD'), moment($location.search().end_date).format('YYYY-MM-DD')];
		};

		ScheldueUrlFormatter.getFilterData = function (filterId, cb) {
			if(Object.keys(filtersFromFilterId).length === 0){
				var grouping = "", basicFilter = "", advfilters = "", filterLength = 0;
				var start_date, end_date;

				ScheduledReportWebService.filterRulesBasesOnId(filterId).then(function (response) {
					var data = response.data.json;
                    _.each(data, function(res){
                        adFilters.push({
                            filter_key: res.filter_key,
                            comparator: res.comparator,
                            filter_value: res.filter_value,
                            filter_type: res.filter_type,
                            filter_inc: res.filter_inc
                        });
                    });

                    basicFilters.push({
                        filter_start_date: data[0].filter_start,
                        filter_end_date: data[0].filter_end,
                        filter_range: data[0].filter_range,
                    });

					var filterRelatedData = ScheldueUrlFormatter.getFilterRelatedData(basicFilters, adFilters, data[0].report_used);

                    filtersFromFilterId.report = data[0].report_used;
                    filtersFromFilterId.start_date = filterRelatedData.start_date;
                    filtersFromFilterId.end_date = filterRelatedData.end_date;
                    filtersFromFilterId.advanced_filters = filterRelatedData.advfilters;
                    filtersFromFilterId.basic_filters = filterRelatedData.basicFilter;
                    filtersFromFilterId.grouping = filterRelatedData.grouping;
					cb(filtersFromFilterId);
				});
			}
		};

		ScheldueUrlFormatter.getFilterRelatedData = function(filters, filter_rules, report) {
			var basicFilter = "", advfilters = "", start_date, end_date, grouping;
			var dbToUIMapping = _.invert(filterUIMappingToDatabase);
			report = backendScheldueReportName[report];

			_.each(filters, function(filter){
				if(filter.filter_range !== null){
					start_date = ranges[filter.filter_range][0].format('YYYY-MM-DD');
					end_date = ranges[filter.filter_range][1].format('YYYY-MM-DD');
				}else{
					start_date = moment(filter.filter_start_date).format('YYYY-MM-DD');
					end_date = moment(filter.filter_end_date).format('YYYY-MM-DD');
				}
			});

			_.each(filter_rules, function(filter_rule){
				if(filter_rule.filter_type === "grouping")
					grouping = filter_rule.filter_value;

				if(filter_rule.filter_type === "basic_filter")
					basicFilter = filter_rule.filter_value;

				if(filter_rule.filter_type === "advanced_filter"){
					//filter_rule.filter_inc = dbToUIMapping[filter_rule.filter_inc];
					//filter_rule.comparator = dbToUIMapping[filter_rule.comparator];

					//if((report === "group_activity" || report === "callflow_setting") && filter_rule.comparator === "gthan")
					//	filter_rule.comparator = "gt";

					//if((report === "group_activity" || report === "callflow_setting") &&  filter_rule.comparator === "lthan")
					//	filter_rule.comparator === "lt";


					advfilters = advfilters +  filter_rule.filter_inc + "," + filter_rule.filter_key + "," + filter_rule.comparator + "," + filter_rule.filter_value;
				}
			});

			return { start_date: start_date, end_date: end_date, grouping: grouping, basicFilter: basicFilter, advfilters: advfilters};
		};

		ScheldueUrlFormatter.reportSpecficAdvancedFilter = function(filterData) {
			var reportAdvFilter = [], advfilters, report;

			filterData === null ? advfilters = $location.search().advfilters : advfilters = filterData.advanced_filters;
			filterData === null ? report =  $location.search().report : report = backendScheldueReportName[filterData.report];
			var advFilterreport = advFilterRportMapping[report];

			if (report === "group_activity" || report === "callflow_setting")
				advFilterreport = "group_activity_callflow";

			if (advfilters !== undefined && advfilters.length > 0){
				var size = 4, advfiltersArr = [];
				var urlAdvFilter = advfilters.split(",");

				while (urlAdvFilter.length > 0)
				    advfiltersArr.push(urlAdvFilter.splice(0, size));
				_.each(advfiltersArr, function (advf) {
					var tempHash = {};
					tempHash[advFiltersColumns[advFilterreport].inc] =  advf[0];
					tempHash[advFiltersColumns[advFilterreport].col] =  advf[1];
					tempHash[advFiltersColumns[advFilterreport].compOp] =  advf[2];
					tempHash[advFiltersColumns[advFilterreport].userInput]  =  advf[3];
				 	reportAdvFilter.push(tempHash);
	            });
			}
			return reportAdvFilter;
		};

		ScheldueUrlFormatter.reportSpecficBasicFilter = function(filterData) {

			console.log("In Method");
			console.log(filterData);
			var basicFilter = '' , report, filter;

			filterData === null ? filter = $location.search().basicFilter : filter = filterData.basic_filters;
			filterData === null ? report =  $location.search().report : report = backendScheldueReportName[filterData.report];
			console.log(filter);
			if(filter !== undefined)
				basicFilter = filter;

			return basicFilter;
		};

		return ScheldueUrlFormatter;
	}]);
}());
