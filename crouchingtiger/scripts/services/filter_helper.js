(function () {
	/* jshint expr: true */
    var ap = angular.module("filter_helper", []);

	ap.factory("filterHelper", ["$window", "$rootScope","$location","ScheduledReportWebService","$http", function ($window, $rootScope, $location, ScheduledReportWebService,$http) {
		var filterHelper = {};
		var adFilters = [], basicFilters = [];
		var filtersFromFilterId = {};
		filterHelper.columnInfo;
		$http.get('assets/demo/filter_helper_column.json').then(function (res) {
           	filterHelper.columnInfo = res.data;
		});

        filterHelper.ranges = {
			'today':        [moment(),                                       moment().endOf('day')],
			'yesterday':    [moment().subtract('days', 1),                   moment().subtract('days', 1).endOf('day')],
			'last_week':  [moment().subtract('days', 7),                   moment().endOf('day')],
			'last_30': [moment().subtract('days', 29),                  moment().endOf('day')],
			'this_month':   [moment().startOf('month'),                      moment().endOf('month').endOf('day')],
			'last_month':   [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month').endOf('day')]
		};

		filterHelper.backendScheldueReportName = {
			acq_campaign : "campaign",
            acq_callflow : "call_flow",
            acq_keyword : "keyword",
            acq_group : "group",
            acq_source : "source",
            call_detail : "calls_detail",
            call_back : "calls_callback",
            activity_stream : "activity_stream",
            group_activity : "group_activity",
            callflow_setting : "callflow_setting"
		};

		filterHelper.comparitiveOperators = [
			{ label: "contains", val: "Contains"},
            { label: "eq",   val: "Equals"},
            { label: "gt",    val: "Greater than"},
            { label: "lt",    val: "Less than"}
		];

		filterHelper.comparitiveOperatorsHash = {
			contains: "Contains",
            eq: "Equals",
            gt: "Greater than",
            lt: "Less than"
		};

		filterHelper.advFilterDefinations = {
			inclusivity:         null,
            column:              null,
            comparativeOperator: null,
            text:                null
		};

		filterHelper.filterUIMappingToDatabase = {
        	contains: "ILIKE",
        	eq: "=",
        	gt: ">",
        	lt: "<",
        	include: "include",
        	exclude: "exclude"
        };

        filterHelper.extraFilterValues = [{
				text:"timezone",
				value:$rootScope.timezone
			},{
				text:"role_id",
				value:$rootScope.roleId
			},{
				text:"user_id",
				value:$rootScope.userId
			},{
				text:"ouid",
				value:$rootScope.currentOUId
			},{
				text:"report",
				value:_.invert(filterHelper.backendScheldueReportName)[$location.search().report]
		}];

		filterHelper.createBaseUrl = function(start_date, end_date, grouping, advFilters, basic_filter, report, limit, offset) {

			var baseUrl = "/#set-schedule-builder", url, filters = [], urlParams;
			url = baseUrl + "?report=" + report;

			if(grouping !== "" && grouping!== undefined && grouping !== "none")
				url = url + "&grouping=" + grouping;

			url = url + "&start_date=" + start_date + "&end_date=" + end_date ;


			if(basic_filter !== undefined && basic_filter.length > 0)
				url = url + "&basicFilter=" + basic_filter;

            if(filterHelper.convertAdvancedFilters(report, advFilters).length > 0)
            	url = url +  "&advfilters=" + filterHelper.convertAdvancedFilters(report, advFilters);

            if(limit)
            	url = url +  "&limit=" + limit;

            if(offset !== undefined)
            	url = url +  "&offset=" + offset;
			return url;
		};

		filterHelper.createScheldulerBaseUrl = function(report, report_id, filters, filter_rules) {
			var grouping = "", basicFilter = "", advfilters = "", filterLength, baseUrl = "/#set-schedule-builder";
			var start_date, end_date;

			var filterRelatedData = filterHelper.getFilterRelatedData(filters, filter_rules, report);
			url = baseUrl + "?id=" + report_id + "&report=" + filterHelper.backendScheldueReportName[report] +"&start_date=" + filterRelatedData.start_date + "&end_date=" + filterRelatedData.end_date;

			if(filterRelatedData.grouping)
				url = url + "&grouping=" + filterRelatedData.grouping;

			if(filterRelatedData.basicFilter.length > 0)
				url = url + "&basicFilter=" + filterRelatedData.basicFilter;

            if(filterRelatedData.advfilters.length > 0){
            	advfilters = advfilters;
            	url = url +  "&advfilters=" + filterRelatedData.advfilters;
            }

			return url;
		};

		filterHelper.convertAdvancedFilters = function(report, advFilters) {
			var filters = "", tempArray;
			if(advFilters !== undefined && advFilters.length > 0)
	            _.each(advFilters, function (advf) {
	            	if(report === "calls_callback" || report === "calls_detail")
		                tempArray = [
		                    advf.column,
		                    advf.comparativeOperator,
		                    advf.inclusivity,
		                    advf.text
		                ];
		            else
		            	tempArray = [
		                    advf.inclusivity,
		                    advf.column,
		                    advf.comparativeOperator,
		                    advf.text
		                ];
	                filters = filters + (filters !== "" ? "," : "") + tempArray.join(",");
	            });

			return filters;
		};

		filterHelper.getFilterRulesFromUrl = function() {
			var grouping, schelFilters = [], columnInfo;


			_.each(filterHelper.extraFilterValues, function(row) {
				schelFilters.push({
					filter_inc: "include",
					filter_type: "variable",
					filter_key: row.text,
					comparator: "=",
					filter_value : row.value,
				});
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

			if($location.search().limit !== undefined){
				schelFilters.push({
					filter_inc: "include",
					filter_type: "variable",
					filter_key: "limit",
					comparator: "=",
					filter_value : $location.search().limit,
				});
			}

			if($location.search().offset !== undefined){
				schelFilters.push({
					filter_inc: "include",
					filter_type: "variable",
					filter_key: "offset",
					comparator: "=",
					filter_value : $location.search().offset,
				});
			}
			if($location.search().advfilters !== undefined){

					var size = 4, advfilters = [];
					var urlAdvFilter = $location.search().advfilters.split(",");
					while (urlAdvFilter.length > 0)
					    advfilters.push(urlAdvFilter.splice(0, size));
					_.each(advfilters, function (advf) {
						advf = filterHelper.convertFiltesFromUrl(advf, $location.search().report);

						if($location.search().report === "calls_detail" || $location.search().report === "calls_callback"
							|| $location.search().report === "group_activity" || $location.search().report === "callflow_setting"){
							var reportName = $location.search().report;
							// if(reportName === "calls_callback")
							// 	reportName = "calls_detail";
							advf[1] = filterHelper.columnInfo.json[reportName][advf[1]] + "/" + advf[1];
						}else{
							advf[1] = "acq/" + advf[1];
						}
					 	schelFilters.push({
							filter_type: "advanced_filter",
							filter_inc: filterHelper.filterUIMappingToDatabase[advf[0]],
							filter_key: advf[1],
							comparator: filterHelper.filterUIMappingToDatabase[advf[2]],
							filter_value : advf[3]
						});
		            });

			}

			return schelFilters;
		};
		filterHelper.convertFiltesFromUrl = function(advf, reportName){
			var tempAdvf = [];
			if(reportName === "calls_detail" || reportName === "calls_callback"){
				tempAdvf[0] = advf[2];
				tempAdvf[1] = advf[0];
				tempAdvf[2] = advf[1];
				tempAdvf[3] = advf[3];
				return tempAdvf;
			}else{
				return advf;
			}
		};

		filterHelper.getFiltesFromUrl = function() {
			var range = '';
			if($location.search().start_date !== undefined && $location.search().end_date !== undefined){
				var start_date = moment($location.search().start_date);
				var end_date = moment($location.search().end_date);
				_.each(filterHelper.ranges, function(value, key) {
					if(moment(value[0].format('YYYY-MM-DD')).isSame(start_date.format('YYYY-MM-DD'))
						&& moment(value[1].format('YYYY-MM-DD')).isSame(end_date.format('YYYY-MM-DD')) ){
						range = key;
						return;
					}
				});
			}

			return [range, moment($location.search().start_date).format('YYYY-MM-DD'), moment($location.search().end_date).format('YYYY-MM-DD')];
		};

		filterHelper.getFilterData = function (filter_id, cb) {
			if(Object.keys(filtersFromFilterId).length === 0){
				var grouping = "", basicFilter = "", advfilters = "", filterLength = 0;
				var start_date, end_date;
				ScheduledReportWebService.filterRulesBasesOnId(filter_id).then(function (response) {
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

					var filterRelatedData = filterHelper.getFilterRelatedData(basicFilters, adFilters, data[0].report_used);

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

		filterHelper.getFilterRelatedData = function(filters, filter_rules, report){
			$http.get('assets/demo/filter_helper_column.json').then(function (res) {
               	filterHelper.columnInfo = res;
			});

			var basicFilter = "", advfilters = "", start_date, end_date, grouping;
			var dbToUIMapping = _.invert(filterHelper.filterUIMappingToDatabase);
			report = filterHelper.backendScheldueReportName[report];

			_.each(filters, function(filter){
				if(filter.filter_range !== null){
					start_date = filterHelper.ranges[filter.filter_range][0].format('YYYY-MM-DD');
					end_date = filterHelper.ranges[filter.filter_range][1].format('YYYY-MM-DD');
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
					var tempFilterString = "";
					filter_rule.filter_inc = dbToUIMapping[filter_rule.filter_inc];
					filter_rule.comparator = dbToUIMapping[filter_rule.comparator];
					if(report === "calls_detail" || report === "calls_callback")
						tempFilterString = filter_rule.filter_key.split("/")[1] + "," + filter_rule.comparator + "," + filter_rule.filter_inc + "," + filter_rule.filter_value;
					else
						tempFilterString = filter_rule.filter_inc + "," + filter_rule.filter_key.split("/")[1] + "," + filter_rule.comparator + "," + filter_rule.filter_value;

					advfilters = advfilters + (advfilters !== "" ? "," : "") + tempFilterString;
				}
			});

			return { start_date: start_date, end_date: end_date, grouping: grouping, basicFilter: basicFilter, advfilters: advfilters};
		};

		filterHelper.reportSpecficAdvancedFilter = function(filterData) {
			var reportAdvFilter = [], advfilters, report;

			filterData === null ? advfilters = $location.search().advfilters : advfilters = filterData.advanced_filters;
			filterData === null ? report =  $location.search().report : report = filterHelper.backendScheldueReportName[filterData.report];


			if(advfilters !== undefined && advfilters.length > 0){
				var size = 4, advfiltersArr = [];
				var urlAdvFilter = advfilters.split(",");

				while (urlAdvFilter.length > 0)
				    advfiltersArr.push(urlAdvFilter.splice(0, size));
				_.each(advfiltersArr, function (advf) {
					var tempHash = {};
					tempHash.inclusivity         =  advf[0];
					tempHash.column              =  advf[1];
					tempHash.comparativeOperator =  advf[2];
					tempHash.text                =  advf[3];
				 	reportAdvFilter.push(tempHash);
	            });
			}
			return reportAdvFilter;
		};

		filterHelper.reportSpecficBasicFilter = function(filterData) {
			var basicFilter = '' , report, filter;

			filterData === null ? filter = $location.search().basicFilter : filter = filterData.basic_filters;
			filterData === null ? report =  $location.search().report : report = filterHelper.backendScheldueReportName[filterData.report];

			if(filter !== undefined)
				basicFilter = filter;

			return basicFilter;
		};

		return filterHelper;
	}]);
}());
