/*
*
* even though this is called call_flow.js, it's actually the code that is reused for
* all of the acquisition reports. It's not a good time to refactor that right now
* as it could introduce new bugs
*
* */

angular.module('theme.call_flow', ['theme.report_service'])
.controller('CallFlowsReportController', ['$scope', '$http', '$routeParams', '$window', '$rootScope', 'ReportDataWebService', '$location', 'pinesNotifications', "DateRangeFiller", "ReportParam", "advFilSrvc", "progressLoader",
function ($scope, $http, $routeParams, $window, $rootScope, ReportDataWebService, $location, pinesNotifications, DateRangeFiller, ReportParam, advFilSrvc, progressLoader) {
    'use strict';

	$scope.hideDataTable = false;
    $scope.filterApplied = false;
    $scope.simpleSearchFilter = "";
    $scope.horsemanFlag = false;
    $scope.roleId = $rootScope.roleId;
    var group;
    $scope.parseInt = parseInt;
    $scope.advFiltersAreApplied = false;
    $scope.simpleSearchApplied  = true;
    $scope.URLbase = $window.location.origin;
	$scope.report = $location.search().report;
	$scope.showAdvFilter = false;
    $scope.preview = ($location.search().preview ? $location.search().preview : false);
    if ($location.search().preview) {
        $("#wrap").append('<div id="previewBlock">&nbsp;</div>');
    }
    $rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);

    if($rootScope.isFromReportCampagnName){
      $scope.simpleSearchFilter = $rootScope.isFromReportCampagnName;
      $rootScope.isFromReportCampagnName = false;
    }

    // For filling in the options for Date Range Picker
    $scope.drp_options = {
        ranges:    {
            'Today':        [moment(),                                       moment().endOf('day')],
            'Yesterday':    [moment().subtract(1, 'days'),                   moment().subtract(1, 'days').endOf('day')],
            'Last 7 Days':  [moment().subtract(7, 'days'),                   moment().subtract(1, 'days').endOf('day')],
            'Last 30 Days': [moment().subtract(30, 'days'),                  moment().subtract(1, 'days').endOf('day')],
            'This Month':   [moment().startOf('month'),                      moment().endOf('month').endOf('day')],
            'Last Month':   [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month').endOf('day')]
        },
        opens:     'left',
        startDate: moment().subtract(7, 'days'),
        endDate:   moment().subtract(1, 'days').endOf('day')
    };


	// Set datepicker on load
	if($window.sessionStorage.report_start_date) {
		$scope.drp_start = moment($window.sessionStorage.report_start_date).format('MMMM D, YYYY');
	} else {
		$scope.drp_start = $scope.drp_options.ranges['Last 7 Days'][0].format('MMMM D, YYYY');
	}
	if($window.sessionStorage.report_end_date) {
		$scope.drp_end = moment($window.sessionStorage.report_end_date).format('MMMM D, YYYY');
	} else {
		$scope.drp_end = $scope.drp_options.ranges['Last 7 Days'][1].format('MMMM D, YYYY');
	}
	$scope.drp_options.startDate = moment($scope.drp_start);
	$scope.drp_options.endDate = moment($scope.drp_end);

    /*$scope.$on('load_filter_params-'+$scope.report, function(e, urlParams) {
        $scope.urlParams = urlParams.vars;
        $scope.urlParams.filterRule = urlParams.filterRule;
        angular.extend($scope, urlParams.vars);
        delete urlParams.vars;
        angular.extend($scope, urlParams);
        loadReportBasedOnQueryStringFlexible();
    });

    $scope.$on('return_url_params', function(e, urlParams) {
        console.log('INSIDE return_url_params IN callsdetails.js: Received filter params:', urlParams);
        $scope.urlParams = urlParams.vars;
        $scope.urlParams.filterRule = urlParams.filterRule;
        delete urlParams.vars;
        angular.extend($scope, urlParams);
    });

    $rootScope.$on('request_scope_acq-call-flows4', function() {
        $rootScope.$broadcast('receive_scope_acq-call-flows4', $scope);
    });
    */


    $scope.resizeWindow = function () {
        setTimeout(function() {
            $(window).trigger('resize');
        }, 100);
    };


    // advanced calls_details mapping
    // &filtertype=a
    // &filter=2,
    // campaign_name,equals,include,Suraj,category,equals,include,Offline:Direct%20Mail
    // prim_key
    // call_flow      -> provisioned_route_name
    // campaign       -> campaign_name
    // group          -> org_unit_name
    // keyword        -> ???????????

    // sec_key
    // ad_source      -> category
    // ring_to_number -> ring_to_name
    // keyword        -> ????????
    // This is used for buidling the redirect "drill down" link from any of the Acquisition Report
    // pages over to the Call Details page.
    // this maping is needed because the values used over in Calls details are not the same as here
    // the values used in the Advanced filter in Call Details uses a CSV format of the query string
    $scope.callDetailRedirectUrlBuilder = function (primKey, secKey, primVal, secVal) {
        if(secVal === undefined) {
            secVal = 'none';
        }
        function acqReportToCallDetailsMapping(keyName) {
            return {
                // primary keys
                "acq_callflow":    "pr.provisioned_route_name",
                "acq_campaign":   "c.campaign_name",
                "campaign_name":  "c.campaign_name",
                "acq_group":      "ou.org_unit_name",
                "keyword":        "keyword",
                "source":         "dynamicsource",
                "acq_keyword":    "ck.keyword",

                // sec keys
                "call_flow_name": "pr.provisioned_route_name",
                // channel is for ad source
                "channel":        "category",
                "ring_to_number": "cd.ring_to_name",
                "last_page":      "last_page",
                "first_page":     "first_page",
                //"source":         "source",
                "medium":         "medium",
                "source_medium":  "source_medium"
            }[keyName];
        }
        var callDetailPrimKeyMapped = acqReportToCallDetailsMapping(primKey);
        var callDetailSecKeyMapped = acqReportToCallDetailsMapping(secKey);

        // anything hardcoded is just a static value that doesn't need to change
        // NOTE: these query string values are not being generated correctly.  The only source of truth is using the advanced filter directive which already
        // has a method in which query string values can be grabbed and used - Davey 2016-11-02
        var url2 = [
            $window.location.origin + "/#/calls-details?filtertype=a",

            "&filter=" + (callDetailPrimKeyMapped+",=,"+encodeURIComponent(primVal))+",",
            //In backend we are spilting by , so to avoid confusion we are replacing , with **
          //  ","+callDetailPrimKeyMapped+",equals,include,"+ primVal.replace(/,/g , "**"),
            (callDetailSecKeyMapped !== undefined ? ","+callDetailSecKeyMapped + ",=," + secVal.replace(/,/g , "**") + "," + "AND" : "")

            //,"&start_date=" + $scope.start_date + "&end_date=" + $scope.end_date
        ].join("");
        return url2;
    };



	// Holds the dcChart objects created within each of the directives
	$scope.dcCharts = [];


    $scope.getSimplyFilteredData = function () {
        var userTxt = $scope.urlParams.filter.toLowerCase(),
            primaryGroupingText,
            secondaryGroupingText,
            textToCheck;

        var sFiltered = _.filter($scope.dataTableValues, function (row) {
            primaryGroupingText = row.value.primaryGrouping.toLowerCase();

            if ($scope.hasSecondaryGrouping) {
                secondaryGroupingText = row.value.secondaryGrouping.toLowerCase();
                textToCheck = primaryGroupingText + " " + secondaryGroupingText;
            } else {
                textToCheck = primaryGroupingText;
            }
            return textToCheck.indexOf(userTxt) !== -1;
        });

        if($scope.primaryGrouping === 'source')
                $scope.primaryGrouping = "dynamicsource";
           var filtVal =  $scope.backEndNameToAggKey[$scope.report];
           if($scope.primaryGrouping === 'dynamicsource' && filtVal === 'source')
                filtVal = "dynamicsource";

        var secFiltVal;
        if($scope.hasSecondaryGrouping) {
            secFiltVal = $scope.secondaryGrouping;
        }
        var ds = [], tempData = [];
        if(sFiltered.length) {
            _.each(sFiltered, function(nds){
                tempData = _.filter($scope.original.aggregated_data, function (obj) {
                    var pval = nds.value.primaryGrouping;
                    var sval;
                    if($scope.hasSecondaryGrouping) {
                        sval = nds.value.secondaryGrouping;
                    }
                    if(sval == 'null') {
                        sval = null;
                    }
                    if(secFiltVal !== undefined && sval !== undefined) {
                        return obj[filtVal] == pval && obj[secFiltVal] == sval;
                    } else {
                        return obj[filtVal] == pval;
                    }
                });
                _.each(tempData,function(d) {
                    ds.push(d);
                });
            });
        }

        ds = _.uniq(ds);
        var finalData = [];
        $scope.ShowChart = true;
        console.log(finalData);
        $scope.original.aggregated_data = ds;
        console.log('CREATE DC OBJECTS DATA', $scope.original);
        createDCObjects($scope.original);
    };

    $scope.getErrorsAndAdvFilters = function () {
        var advFilterDefn = [];
        $scope.advFDef = [];
        _.each($scope.advFilterDefinitions,function(rule){
            var fltr = {};
            fltr.column              = rule.selected_column.value;
            fltr.comparativeOperator = internalMappedNames.operators[rule.selected_operator.value];
            fltr.text                = rule.user_input;
            fltr.rule                = rule.rule;
            fltr.inclusivity         = rule.selected_inclusivity.value;
            $scope.advFDef.push(fltr);
        });
        var filter = [],filterObject = [];
        _.each($scope.advFDef, function(flt,i){
            if(flt.rule === "OR"){
                filterObject.push(filter);
                filter = [];
                filter.push(flt);
            } else {
                filter.push(flt);
            }

            if(i === $scope.advFDef.length-1) {
                filterObject.push(filter);
            }
        });
        var ds = [], da = [];
        _.each($scope.dataTableValues,function(val){
            da.push(val.value);
        });
        _.each(filterObject,function(filterObj){
           if($scope.primaryGrouping === 'source')
                $scope.primaryGrouping = "dynamicsource";
           var filtVal =  $scope.backEndNameToAggKey[$scope.report];
           if($scope.primaryGrouping === 'dynamicsource' && filtVal === 'source')
                filtVal = "dynamicsource";
           var secFiltVal;
            if($scope.hasSecondaryGrouping) {
                secFiltVal = $scope.secondaryGrouping;
           }
            var newDS = $scope.getFilteredData(da,filterObj);
            var tempData = [];
            if(newDS.length) {
                _.each(newDS, function(nds){
                    tempData = _.filter($scope.original.aggregated_data, function (obj) {

                        var pval = nds.primaryGrouping;
                        var sval;
                        if($scope.hasSecondaryGrouping) {
                            sval = nds.secondaryGrouping;
                        }
                        if(sval == 'null') {
                            sval = null;
                        }
                        if(secFiltVal !== undefined && sval !== undefined) {
                            return obj[filtVal] == pval && obj[secFiltVal] == sval;
                        } else {
                            return obj[filtVal] == pval;
                        }

                    });
            _.each(tempData,function(d) {
                ds.push(d);
            });
                });
            }
        });
        ds = _.uniq(ds);
        var finalData = [];
        $scope.ShowChart = true;
        console.log(finalData);
        $scope.original.aggregated_data = ds;
        console.log('CREATE DC OBJECTS DATA', $scope.original);
        createDCObjects($scope.original);
    };

    $scope.getFilteredData = function (dsWithNoAdvFilters, advFilterDefn) {
        var row_value;
        var userTxt, passedTest, newDS;
        return  _.reduce(advFilterDefn, function (filteredDS, advFilterDef) {
            advFilterDef.text = (advFilterDef.text).toString();
            if (!advFilterDef.text) { return; }
            newDS = _.filter(filteredDS, function (row) {
                userTxt = advFilterChecks.scrubUserText(advFilterDef.text);
                //console.log(row);
                row_value = row[advFilterDef.column];
                if(row[advFilterDef.column] === undefined){
                    if(advFilterDef.column === $scope.primaryGrouping)
                        row_value = row.primaryGrouping;
                    if(advFilterDef.column === $scope.secondaryGrouping)
                        row_value = row.secondaryGrouping;
                }
                if(advFilterDef.column === "average_duration" && advFilterDef.comparativeOperator !== "contains"){
                    row_value = hmsToSecondsOnly(row_value);
                    userTxt = hmsToSecondsOnly(userTxt);
                }
                passedTest = advFilterChecks[advFilterDef.comparativeOperator](row_value, userTxt);
                return applyInclusivityToFilterResult(advFilterDef.inclusivity, passedTest);
            });
            return newDS;
        }, dsWithNoAdvFilters);
    };







    $scope.exportPDF = function () {
        // Hide the drop down for "Export as", otherwise it will appear in the PDF
        $("ul[role=menu]")[0].style.display = "none";


        // If we don't temporarily set this field to empty string, then it will
        // appear as text inside the box, sometimes "undefined"
        var temp = $scope.secondaryGrouping;
        $scope.secondaryGrouping = "";

        var pdf = new jsPDF('p', 'pt', 'a4');

        //pdf.addHTML(document.body, function () {
        //    var string = pdf.output('datauristring');
        //    //$('.preview-pane').attr('src', string);
        //});
        pdf.addHTML($("#dataTableReport"), function () {
            var string = pdf.output('datauristring');
            //$('.preview-pane').attr('src', string);
        });

        setTimeout(function () {
            pdf.save($scope.report + "_datatable" + '.pdf');
            $scope.secondaryGrouping = temp;

            // Dropdown menu for "Export as" is put back
            $("ul[role=menu]")[0].style.display = "";

        }, 2000);


    };



    // It's necessary to keep track of the various key words used for accessing
    // data in a particular location. The backend uses "report=call_flow", for example
    // to request the data for the call flow report. The data returned, however, will
    // have objects that have been pre-aggregated, and the call_flow property wont
    // map to the call flow NAME of that record, but instead fo the ID (which we wont use)
    // BUT if you request to the backend report=keyword, then the keyword property on the
    // aggregate objects do map to the keyword string names and not any IDs. To keep your
    // sanity, this hash object will keep track of the differeny key names in their
    // appropriate category. it will be used to create various hash tables that map one thing
    // to another
    var internalMappedNames = {};
    // used for REST calls
    internalMappedNames.reportNames = {
        acq_campaign:  "acq_campaign",
        acq_keyword:   "acq_keyword",
        acq_callflow: "acq_callflow",
        acq_group:     "acq_group",
        acq_source:    "acq_source"
    };
    internalMappedNames.operators = {
        'ILIKE':   "contains",
        '=':    "equals",
        '>=':   "gthan",
        '<=':   "lthan",
        'NOT ILIKE':  "contains",
        '!=':  "equals"
    };
    // used for REST calls
    internalMappedNames.secondaryGroupNames = {
        campaign:       "campaign",
        keyword:        "keyword",
        call_flow:      "call_flow",
        channel:        "channel",
        ring_to_number: "ring_to_number",
        last_page:      "last_page",
        first_page:     "first_page",
        source:         "source",
        medium:         "medium",
        source_medium:  "source_medium"
    };
    // reference keys on the aggregated data objects
    internalMappedNames.aggregate_property_keys = {
        call_flow_id:       "provisioned_route_id",
        call_flow:          "call_flow_name",
        campaign:           "campaign_name",
        campaign_id:        "campaign",
        group:              "org_unit_name",
        group_id:           "org_unit_id",
        keyword:            "keyword",
        channel:            "channel",
        ring_to_number:     "ring_to_number",
        last_page:          "last_page",
        first_page:         "first_page",
        total_calls:        "total_calls",
        //total_leads:        "total_leads",
        total_leads:        "lead_count",
        percent_of_leads:   "percent_of_leads",
        avg_lead_quality:   "avg_lead_quality",
        conversion_percent: "conversion_percent",
        avg_duration:       "average_duration",
        unique_calls:       "unique_calls",
        unique_percent:     "unique_percent",
        leads:              "lead_count",
        lead_score:         "lead_sum",
        converted:          "conversion_count",
        conversion_score:   "conversion_sum",
        date:               "date",
        duration:           "duration_sum",
        sales_inquiries:    "sales_inquiry_count",
        sales_score_sum:    "sales_inquiry_score_sum",
        source:             "source",
        dynamicsource:      "dynamicsource",
        medium:             "medium",
        source_medium:      "source_medium",

        simpleSearchFilterTxt: "simpleSearch",
        secondaryGroupCFDimension: "secGroupDimension",
        reducedPrimGroup: "primaryGrouping",
        reducedSecGroup:  "secondaryGrouping"
    };
    // values displayed at top of columns
    internalMappedNames.dataTableHeaderValues = {
        call_flow:        "Call Flow",
        campaign:         "Campaign",
        group:            "Group",
        keyword:          "Keyword",
        channel:          "Ad Source",
        ring_to_number:   "Ring To Number",
        last_page:        "Last Page",
        first_page:       "First Page",
        source:           "Source",
        dynamicsource:    "dynamicsource",
        medium:           "Medium",
        source_medium:    "Source/Medium",
        total_calls:      "Total Calls",
        total_leads:      "Total Leads",
        percent_of_leads: "% of Leads",
        avg_lead_quality: "Avg Lead Quality",
        converted:        "Conversion",
        conversion_percent:  "Conversion %",
        avg_duration:     "Avg Duration",
        total_unique:     "Unique Calls"
    };
    // displayed near top of page in big font
    internalMappedNames.reportTitleValues = {
        call_flow: internalMappedNames.dataTableHeaderValues.call_flow + "s",
        campaign:  internalMappedNames.dataTableHeaderValues.campaign  + "s",
        group:     internalMappedNames.dataTableHeaderValues.group     + "s",
        keyword:   internalMappedNames.dataTableHeaderValues.keyword   + "s",
        //source:   internalMappedNames.dataTableHeaderValues.source   + "s",
        dynamicsource:   internalMappedNames.dataTableHeaderValues.source   + "s"

    };
    // used as title values at top of chart objects
    internalMappedNames.callVolumeChartTitle = {
        call_flow: "Call Volume by " + internalMappedNames.dataTableHeaderValues.call_flow,
        campaign:  "Call Volume by " + internalMappedNames.dataTableHeaderValues.campaign,
        group:     "Call Volume by " + internalMappedNames.dataTableHeaderValues.group,
        keyword:   "Call Volume by " + internalMappedNames.dataTableHeaderValues.keyword,
        source:   "Call Volume by " + internalMappedNames.dataTableHeaderValues.source,
        channel:   "Call Volume by " + internalMappedNames.dataTableHeaderValues.channel
        //page:      "Call Volume by Page",
        //overview:  "Overview of Call Volume"
    };

    function aggKeyToReportTitle() {
        var aggPropKeys = internalMappedNames.aggregate_property_keys;
        var reportNames = internalMappedNames.reportTitleValues;

        var hashObj = {};
        hashObj[aggPropKeys.call_flow] = reportNames.call_flow;
        hashObj[aggPropKeys.campaign]  = reportNames.campaign;
        hashObj[aggPropKeys.group]     = reportNames.group;
        hashObj[aggPropKeys.keyword]   = reportNames.keyword;
        hashObj[aggPropKeys.source]   = reportNames.source;
        hashObj[aggPropKeys.dynamicsource]   = reportNames.dynamicsource;
        return hashObj;
    }

    // NOT SURE IF NEEDED
    // $scope.redirectScheduledEditor = function(){
    //     var currentParams = determineReportQueryParams();
    //     var scheldueAdvFilterDefinitions = $scope.advFiltersAreApplied === true ? $scope.advFilterDefinitions : [];
    //     var secondaryGrouping = (currentParams.grouping !== null) && (currentParams.grouping !== "none")
    //                                  ? currentParams.grouping
    //                                : "none";
    //     $window.location.href = ScheldueUrlFormatter.createBaseUrl(currentParams.start_date, currentParams.end_date, secondaryGrouping,
    //                             scheldueAdvFilterDefinitions, $scope.simpleSearchFilter, $scope.report);
    // };

    // create a hash table object that the property names on the aggregate
    // objects are paired to the header values displayed at the top of the
    // data grid
    function aggKeyToHeaderMapping () {
        var aggPropKeys    = internalMappedNames.aggregate_property_keys;
        var headerVals     = internalMappedNames.dataTableHeaderValues;

        var aggKeyToHeader = {};
        aggKeyToHeader[aggPropKeys.call_flow]      = headerVals.call_flow;
        aggKeyToHeader[aggPropKeys.campaign]       = headerVals.campaign;
        aggKeyToHeader[aggPropKeys.group]          = headerVals.group;
        aggKeyToHeader[aggPropKeys.keyword]        = headerVals.keyword;
        aggKeyToHeader[aggPropKeys.channel]        = headerVals.channel;
        aggKeyToHeader[aggPropKeys.ring_to_number] = headerVals.ring_to_number;
        aggKeyToHeader[aggPropKeys.last_page]      = headerVals.last_page;
        aggKeyToHeader[aggPropKeys.first_page]     = headerVals.first_page;
        aggKeyToHeader[aggPropKeys.source]         = headerVals.source;
        aggKeyToHeader[aggPropKeys.dynamicsource]  = headerVals.dynamicsource;
        aggKeyToHeader[aggPropKeys.medium]         = headerVals.medium;
        aggKeyToHeader[aggPropKeys.source_medium]  = headerVals.source_medium;

        return aggKeyToHeader;
    }


    /*  Creates a hashtable that maps the keys used for retrieving data from
     *  the backend to the keys used to access data in the aggregate data
     *  returned from the backend. This is necessary since they aren't
     *  always consistent with each other */
    function backendNamesToAggKey () {
        var reportNames   = internalMappedNames.reportNames;
        var secGroupNames = internalMappedNames.secondaryGroupNames;
        var aggPropKeys   = internalMappedNames.aggregate_property_keys;
        var backEndNamesToAggKey = {};

        // use for mapping the report=<blah> names to the agg prop keys
        backEndNamesToAggKey[reportNames.acq_callflow] = aggPropKeys.call_flow;
        backEndNamesToAggKey[reportNames.acq_keyword]   = aggPropKeys.keyword;
        backEndNamesToAggKey[reportNames.acq_source]   = aggPropKeys.source;
        backEndNamesToAggKey[reportNames.acq_group]     = aggPropKeys.group;
        backEndNamesToAggKey[reportNames.acq_campaign]  = aggPropKeys.campaign;

        // use for mapping the grouping=<blah> names to the agg prop keys
        backEndNamesToAggKey[secGroupNames.channel]        = aggPropKeys.channel;
        backEndNamesToAggKey[secGroupNames.ring_to_number] = aggPropKeys.ring_to_number;
        backEndNamesToAggKey[secGroupNames.last_page]      = aggPropKeys.last_page;
        backEndNamesToAggKey[secGroupNames.first_page]     = aggPropKeys.first_page;
	    backEndNamesToAggKey[secGroupNames.source]         = aggPropKeys.source;
	    backEndNamesToAggKey[secGroupNames.medium]         = aggPropKeys.medium;
	    backEndNamesToAggKey[secGroupNames.source_medium]  = aggPropKeys.source_medium;

        return backEndNamesToAggKey;
    }

    function aggKeyToBackendNames () {
        var backendNamesToAggKeyHash = backendNamesToAggKey();
        var aggKeyToBackendNameHash = {};

        _.each(backendNamesToAggKeyHash, function (aggKey, backendName) {
            aggKeyToBackendNameHash[aggKey] = backendName;
        });

        return aggKeyToBackendNameHash;
    }

    // hash table mapping the header values to their agg key name,
    // used in the advanced filter creation
    function createHeaderValueToAggKeyName () {
        var headerValues = internalMappedNames.dataTableHeaderValues;
        var aggKeyNames  = internalMappedNames.aggregate_property_keys;

        var headerValueToAggKeyName = {};
        headerValueToAggKeyName[headerValues.call_flow]          = aggKeyNames.call_flow;
        headerValueToAggKeyName[headerValues.campaign]           = aggKeyNames.campaign;
        headerValueToAggKeyName[headerValues.group]              = aggKeyNames.group;
        headerValueToAggKeyName[headerValues.keyword]            = aggKeyNames.keyword;
        headerValueToAggKeyName[headerValues.channel]            = aggKeyNames.channel;
        headerValueToAggKeyName[headerValues.ring_to_number]     = aggKeyNames.ring_to_number;
        headerValueToAggKeyName[headerValues.last_page]          = aggKeyNames.last_page;
        headerValueToAggKeyName[headerValues.first_page]         = aggKeyNames.first_page;
        headerValueToAggKeyName[headerValues.source]             = aggKeyNames.source;
        headerValueToAggKeyName[headerValues.dynamicsource]      = aggKeyNames.dynamicsource;
        headerValueToAggKeyName[headerValues.medium]             = aggKeyNames.medium;
        headerValueToAggKeyName[headerValues.source_medium]      = aggKeyNames.source_medium;
        headerValueToAggKeyName[headerValues.total_calls]        = aggKeyNames.total_calls;
        headerValueToAggKeyName[headerValues.total_leads]        = aggKeyNames.total_leads;
        headerValueToAggKeyName[headerValues.percent_of_leads]   = aggKeyNames.percent_of_leads;
        headerValueToAggKeyName[headerValues.avg_lead_quality]   = aggKeyNames.avg_lead_quality;
        headerValueToAggKeyName[headerValues.converted]          = aggKeyNames.converted;
        headerValueToAggKeyName[headerValues.conversion_percent] = aggKeyNames.conversion_percent;
        headerValueToAggKeyName[headerValues.avg_duration]       = aggKeyNames.avg_duration;
        headerValueToAggKeyName[headerValues.total_unique]       = aggKeyNames.unique_calls;
        return headerValueToAggKeyName;
    }

    /* params - primaryGrouping - a string that is the keyname on the aggregate data,
                                   which represents the primary dimension to group by
    *           secondaryGrouping - a string that is the keyname on the aggregate data,
                                    which represents the secondary dimension to group by
    *
    *  output - an array of string names that are used at the top of the data grid columns
    *
    *  */
    function getDataGridHeaderValues (primaryGrouping, secondaryGrouping) {
        var dataTableHVs = internalMappedNames.dataTableHeaderValues;
        var aggKeyToHV = aggKeyToHeaderMapping();

        var valuesToDisplayInDataGridHeaders = [

            // first column based on the name of the primary grouping used
            aggKeyToHV[primaryGrouping],

            // These can be manually added in since they're static
            dataTableHVs.total_calls,
            dataTableHVs.total_leads,
            dataTableHVs.percent_of_leads,
            dataTableHVs.avg_lead_quality,
            dataTableHVs.converted,
            dataTableHVs.conversion_percent,
            dataTableHVs.avg_duration,
            dataTableHVs.total_unique
        ];

        // We only need a secondary grouping column if one is selected, and if it is, add it to the
        // second column, and push the current second column to the right, into the third column's place
        if ($scope.hasSecondaryGrouping) {
            valuesToDisplayInDataGridHeaders.splice(1, 0, aggKeyToHV[secondaryGrouping]);
        }

        // array of string names of the header values that go at the top of the data grid
        return valuesToDisplayInDataGridHeaders;
    }


    // Creates a data structure that is used for the select drop down Secondary Group:... which allows
    // the user to change the secondary group of the data set
    // the "label" is the value send from the select if the user clicks on it, and the "val" is used for what is displayed
    // in the dropdown box for that value
    function createSecondaryGroupSelectOptionValues () {
        var noneOption = {label: "none", val: "None"};
        var optionVals = {};
        var secGroupAggKeyVals = internalMappedNames.aggregate_property_keys;
        var dataTableHV = internalMappedNames.dataTableHeaderValues;
        optionVals[internalMappedNames.reportNames.acq_callflow] = [
            noneOption,
            {label: secGroupAggKeyVals.keyword,        val: dataTableHV.keyword},
            {label: secGroupAggKeyVals.channel,        val: dataTableHV.channel},
            {label: secGroupAggKeyVals.first_page,     val: dataTableHV.first_page},
            {label: secGroupAggKeyVals.last_page,      val: dataTableHV.last_page},
            {label: secGroupAggKeyVals.ring_to_number, val: dataTableHV.ring_to_number}
        ];

        optionVals[internalMappedNames.reportNames.acq_campaign] = [
            noneOption,
            {label: secGroupAggKeyVals.call_flow, val: dataTableHV.call_flow},
            {label: secGroupAggKeyVals.channel,   val: dataTableHV.channel}
        ];

        optionVals[internalMappedNames.reportNames.acq_group] = [
            noneOption,
            {label: secGroupAggKeyVals.campaign,  val: dataTableHV.campaign},
            {label: secGroupAggKeyVals.call_flow, val: dataTableHV.call_flow},
            {label: secGroupAggKeyVals.keyword,   val: dataTableHV.keyword},
            {label: secGroupAggKeyVals.channel,   val: dataTableHV.channel},
            {label: secGroupAggKeyVals.source,        val: dataTableHV.source},
            {label: secGroupAggKeyVals.medium,        val: dataTableHV.medium},
            {label: secGroupAggKeyVals.source_medium, val: dataTableHV.source_medium}

        ];

        optionVals[internalMappedNames.reportNames.acq_keyword] = [
            noneOption,
            {label: secGroupAggKeyVals.source,        val: dataTableHV.source},
            {label: secGroupAggKeyVals.medium,        val: dataTableHV.medium},
            {label: secGroupAggKeyVals.source_medium, val: dataTableHV.source_medium}
        ];

        optionVals[internalMappedNames.reportNames.acq_source] = [
            noneOption,
            {label: secGroupAggKeyVals.call_flow,     val: dataTableHV.call_flow},
            {label: secGroupAggKeyVals.keyword,       val: dataTableHV.keyword},
            {label: secGroupAggKeyVals.first_page,     val: dataTableHV.first_page},
            {label: secGroupAggKeyVals.last_page,      val: dataTableHV.last_page},
            {label: secGroupAggKeyVals.medium,        val: dataTableHV.medium}
        ];

        return optionVals;
    }

	////////////////////////////////////////////////////
	// Start - For Filling in empty days in Dataset
	////////////////////////////////////////////////////
	var reportFillersToUse = {
        acq_campaign: createEmptyCampaignsFiller,
        acq_keyword : createEmptyKeywordsFiller,
        acq_callflow: createEmptyCallFlowsFiller,
        acq_group   : createEmptyGroupsFiller,
        acq_source  : createEmptySourceFiller
    };
	function useSpecificReportTypeFiller (firstItem, date, whichReport) {
        return reportFillersToUse[whichReport](firstItem, date);
	}

	function createEmptyCampaignsFiller(firstObjectInDS, date) {
    // console.log('firstObjectInDS', firstObjectInDS);
		return {
			"average_duration":    0,
			"avg_lead_quality":    0,
			"call_flow":           firstObjectInDS.call_flow,
			"call_flow_name":      firstObjectInDS.call_flow_name,
			"call_group":          1,
			"campaign_id":         firstObjectInDS.campaign_id,
			"campaign_name":       firstObjectInDS.campaign_name,
			"channel":             firstObjectInDS.channel,
			"conversion_count":    0,
			"conversion_percent":  0,
			"conversion_sum":      null,
			"d3datetime":          firstObjectInDS.d3datetime,
			"date":                date + " 00:00:00",
			"duration_sum":        0,
			"lead_count":          0,
			"lead_sum":            null,
			"percent_of_leads":    0,
			"sales_inquiry_count": 0,
			"sales_inquiry_sum":   null,
			"secGroupDimension":   firstObjectInDS.secGroupDimension,
			"simpleSearch":        firstObjectInDS.simpleSearch,
			"total_calls":         0,
			"unique_calls":        0,
			"unique_percent":      0,
            "keyword":             null
		};
	}

	function createEmptyCallFlowsFiller(firstItem, date) {
		var temp =  createEmptyCampaignsFiller(firstItem, date);
		temp.keyword = firstItem.keyword;
		temp.source = firstItem.source;
		temp.first_page = firstItem.first_page;
		temp.last_page = firstItem.last_page;
		temp.ring_to_number = firstItem.ring_to_number;
		return temp;
	}

	//TODO, for consistency, switch keywords "sales_inquiry_score_sum" -> "sales_inquiry_sum" like campaign and call_flows
	function createEmptyKeywordsFiller(firstItem, date) {
		var temp = createEmptyCampaignsFiller(firstItem, date);
		//console.log("temp", temp);
		//delete temp.call_flow;
		//delete temp.call_flow_name;
		//delete temp.campaign_name;
		temp.keyword = firstItem.keyword;
		temp.sales_inquiry_score_sum = firstItem.sales_inquiry_sum;// TODO CHANGE after Aaron makes fix
		//delete temp.sales_inquiry_sum;
		temp.source = firstItem.source;
		temp.medium = firstItem.medium;
		temp.source_medium = firstItem.source_medium;

		return temp;
	}

    function createEmptySourceFiller(firstItem, date) {
        return {
            "average_duration":    0,
            "avg_lead_quality":    0,
            "call_flow":           firstItem.call_flow,
            "call_flow_name":      firstItem.call_flow_name,
            "call_group":          1,
            "campaign_id":         firstItem.campaign_id,
            "conversion_count":    0,
            "conversion_percent":  0,
            "conversion_sum":      null,
            "date":                date + " 00:00:00",
            "duration_sum":        0,
            "dynamicsource":       firstItem.dynamicsource,
            "medium" :             firstItem.medium,
            "keyword" :            firstItem.keyword,
            "first_page" :         firstItem.first_page,
            "last_page" :          firstItem.last_page,
            "lead_count":          0,
            "lead_sum":            null,
            "percent_of_leads":    0,
            "sales_inquiry_count": 0,
            "sales_inquiry_sum":   null,
            "secGroupDimension":   firstItem.secGroupDimension,
            "simpleSearch":        firstItem.simpleSearch,
            "total_calls":         0,
            "unique_calls":        0,
            "unique_percent":      0
        };
    }

	function createEmptyGroupsFiller(firstItem, date) {
		var temp = createEmptyCampaignsFiller(firstItem, date);
        // console.log('CAMPAIGNS FILLER', firstItem);
		//delete temp.campaign_id;
		//delete temp.campaign_name;
        temp.source = firstItem.source;
        temp.medium = firstItem.medium;
        temp.source_medium = firstItem.source_medium;
		temp.org_unit_id = firstItem.org_unit_id;
		temp.org_unit_name = firstItem.org_unit_name;

		return temp;
	}

	////////////////////////////////////////////////////
	// End - For Filling in empty days in Dataset
	////////////////////////////////////////////////////


    /* Initializes the advanced filter form objects and the mapping of those drop down select values
     *  to the property names in the data set to filter by
     * */
    /*function createAdvancedFilterConfig(headerNames, mappedNamesToAggregatedRows) {
        var advancedFilterConfig = {};

        advancedFilterConfig.maxQuantity = 5;
        advancedFilterConfig.minQuantity = 1;

        advancedFilterConfig.inclusivity = [
            {label: "include", val: "Include"},
            {label: "exclude", val: "Exclude"}
        ];

        // must be an array with column names as the value, and
        // key name on the aggregatedObjs as the label
        advancedFilterConfig.columns = _.map(headerNames, function (columnName) {
            var advancedValue = columnName;
            if(columnName === "dynamicsource")
                advancedValue =  "Source";

            return {"label": mappedNamesToAggregatedRows[columnName], "val": advancedValue};
        });


        return advancedFilterConfig;
    }
    */

    $scope.advFiltersAreApplied = false;
    $scope.simpleSearchApplied  = true;

    // Handles making charts responsive
    function renderChartsWithNewWidth() {
        _.each($scope.dcCharts, function (chartAndSelector) {
            var newWidth = $(chartAndSelector.selector).closest('div .panel-body').innerWidth() * 0.95;
            chartAndSelector.chart.width(newWidth);
        });

        if ($scope.dc1) {
            $scope.dc1.renderAll();
        }
    }

    var efficientReRender = _.debounce(renderChartsWithNewWidth, 50);
    $window.onresize = function () {
        efficientReRender();
    };

    /*$scope.$on('$destroy', function () {
        $window.onresize = null;
        // Kill all event listeners on leave
        var importantListeners = ['$destroy', '$locationChangeStart', '$locationChangeSuccess'];
        for(var i in $rootScope.$$listeners) {
            if(importantListeners.indexOf(i) === -1) {
                delete $rootScope.$$listeners[i];
            }
        }
    });
    */

    // Used with query string parameter and default for choosing
    // which dataset to load into report
    // These MUST MATCH with <option> values in the dropdown
    // just above the datatable

    function determineReportQueryParams() {
        console.log('starting determineReportQueryParams');
        //$scope.urlParams = {}; // reset the variable to blank
        //$rootScope.$broadcast('start_url_assembly', 'blank');
        $scope.applyFilterParams();

        var defaultReportParams = $scope.urlParams;
	    /*var defaultReportParams = {
            "secondary":   null,
		    "start_date": moment().subtract('days', 7).format('YYYY-MM-DD'),
		    "end_date":   moment().endOf('day').format('YYYY-MM-DD'),
            'filter' : null,
            'filtertype' : null,
	    };

       /* // you would think that moment().isValid() would be sufficient, but apparently it doesnt check against undefined
        //var sd = moment($routeParams.start_date).isValid() && ($routeParams.start_date !== undefined) ? $routeParams.start_date : defaultReportParams.start_date;

		var sessionParams = {}, grouping, filter, filtertype;
		sessionParams.report_start_date = ReportParam.getParams('report_start_date');

		var sd = null;
		if (moment($routeParams.start_date).isValid() && ($routeParams.start_date !== undefined)) {
		    sd = $routeParams.start_date;
            if(!$scope.whichScheldueReport)
		        ReportParam.setParams('report_start_date', sd);
		}
		else if(sessionParams.report_start_date) {
				//console.log('sessionParam');
				sd = sessionParams.report_start_date;
		}else {
			sd = defaultReportParams.start_date;
		}
		$scope.drp_options.startDate = moment(sd);
        //var ed = moment($routeParams.end_date).isValid() && ($routeParams.end_date !== undefined) ? $routeParams.end_date : defaultReportParams.end_date;
		sessionParams.report_end_date = ReportParam.getParams('report_end_date');
		var ed = null;

		if($location.search().filterId){
            ed = $scope.filterData.end_date;
        }else if(moment($routeParams.end_date).isValid() && ($routeParams.end_date !== undefined)) {
			ed = $routeParams.end_date;
            if(!$scope.whichScheldueReport)
			 ReportParam.setParams('report_end_date', ed);
		}
		else if(sessionParams.report_end_date) {
				//console.log('sessionParam');
				ed = sessionParams.report_end_date;
			}
		else {
			ed = defaultReportParams.end_date;
		}
		$scope.drp_options.endDate = moment(ed);

        if($location.search().filterId){
            grouping = ($scope.filterData.grouping === '' || $scope.filterData.grouping === undefined )  ? defaultReportParams.grouping : $scope.filterData.grouping;
        }else{
            grouping = $routeParams.grouping ? $routeParams.grouping : defaultReportParams.grouping;
            filter = $routeParams.filter ? $routeParams.filter : defaultReportParams.filter;
            filtertype = $routeParams.filtertype ? $routeParams.filtertype : defaultReportParams.filtertype;

        }
        */
        //$scope.secondary = $routeParams.secondary ? $routeParams.secondary : defaultReportParams.secondary;

        //$scope.drp_options.startDate = moment($scope.start_date);
        //$scope.drp_options.endDate = moment($scope.end_date);
        console.log('RETURNING start_date, end_date, secondary, filter, filtertype', $scope.start_date, $scope.end_date, $scope.secondary, $scope.filter, $scope.filtertype);
        return {start_date: $scope.start_date, end_date: $scope.end_date, grouping: $scope.secondary, filter: $scope.filter, filtertype: $scope.filtertype};
        //return {start_date: sd, end_date: ed, grouping: grouping, filter: filter, filtertype:filtertype};
    }

    // Scope methods used when user uses filter that requires a new data-set from backend
    $scope.changeDateRange = function() {
		progressLoader.start();
		$scope.filterReset();
		$scope.applyFilter();
        $window.sessionStorage.report_start_date = $scope.drp_start;
        $window.sessionStorage.report_end_date = $scope.drp_end;
    };

    $scope.changeSecondaryGrouping = function(secGroup) {
        $scope.disableAdvFilterBtn= true;
        $scope.secondary = $scope.aggKeyToBackendName[secGroup];
        advFilSrvc.resetAdvFilter();
        $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
        $scope.simpleSearchFilter = '';
        $scope.filter = undefined;
        $scope.filtertype = 's';
        $scope.showAdvFilter = false;
        $scope.ShowChart = true;
        $scope.applyFilter();
    };

    $scope.changeReportParams = function (paramTypeToChange, extraData) {
        console.log('starting changeReportParams');
        $scope.applyFilterParams();

        $location.url($location.path()+'?'+$.param($scope.urlParams));

        /*if (paramTypeToChange === 'date') {
            currentParams.start_date = moment($scope.drp_start, "MMMM D, YYYY").format('YYYY-MM-DD');
            currentParams.end_date = moment($scope.drp_end, "MMMM D, YYYY").format('YYYY-MM-DD');
        } else if (paramTypeToChange === 'grouping') {
            currentParams.secondary = $scope.aggKeyToBackendName[extraData];
        }
        else {
            throw Error("no param given to change on report");
        }

	    // Grab the URL up to the point before query string parameters
        var baseUrl;
        if ($window.location.href.indexOf("?") !== -1) {
            var index = $window.location.href.indexOf("?");
            baseUrl = $window.location.href.substring(0, index);
        }
        else {
            baseUrl = $window.location.href;
        }

        // reloads page with new query string params
        $scope.drp_start = moment(currentParams.start_date, "YYYY-MM-DD").format("MMMM D, YYYY");
        $scope.drp_end = moment(currentParams.end_date, "YYYY-MM-DD").format("MMMM D, YYYY");

        var newUrlToGo = [
			baseUrl,
			"?grouping=",   currentParams.grouping,
			"&report=",     $scope.report,
			"&start_date=", currentParams.start_date,
			"&end_date=",   currentParams.end_date
        ].join('');

        $window.location.href = newUrlToGo ;
        */
    };


    /*var advFiltValidations = {};
    advFiltValidations.emptyBox = function (advFiltDef) {
        // this '!!' syntax checks truthiness
        return {
            passed: !!advFiltDef.text,
            errMsg: "Can\'t have an empty text box\n"
        };
    };
    advFiltValidations.greaterOrLessThan = function (advFiltDef) {
        var NUMBER_REGEXP = /^[0-9]+$/;
        if (!(advFiltDef.comparativeOperator === "gthan" || advFiltDef.comparativeOperator === "lthan")) {
            return true;
        }

        if (advFiltDef.column !== "average_duration") {
            return {
                passed: NUMBER_REGEXP.test(advFiltDef.text),
                errMsg: "Greater/Less than requires a number\n"
            };
        }else{
            return true;
        }
    };

    // returns an error of errors, if no errors, return array will be empty
    $scope.validateAdvFilterDefinitions = function (advFilterDefinitions) {

        var advFiltErrors = [],
            validationResult;
        _.each(advFilterDefinitions, function (advFiltDef) {
            _.each(advFiltValidations, function (filtValidTest) {
                validationResult = filtValidTest(advFiltDef);
                if (!validationResult.passed) {
                    if(validationResult.errMsg !== undefined)
                        advFiltErrors.push(validationResult.errMsg);
                }
            });
        });
        return _.uniq(advFiltErrors);
    };
    */



    $scope.loadReportBasedOnQueryStringFlexible = function() {
        console.log('starting loadReportBasedOnQueryStringFlexible');
        $scope.backEndNameToAggKey = backendNamesToAggKey();
        $scope.aggKeyToBackendName = aggKeyToBackendNames();

        if($scope.urlParams.secondary !== undefined && $scope.urlParams.secondary !== null && $scope.urlParams.secondary !== "none" ) {
            $scope.secondary = $scope.aggKeyToBackendName[$scope.urlParams.secondary];
        }

        if($scope.secondary === undefined) {
            $scope.secondary = $scope.urlParams.secondary;
        }

        ReportDataWebService.reportAggregateDataAndRDO($scope.start_date, $scope.end_date, $scope.secondary, $scope.report, $scope.filter, $scope.filtertype).then(function (result) {
        // ReportDataWebService.reportAggregateDataAndRDO(params.start_date, params.end_date, params.grouping, $scope.report).then(function (result) {
            console.log("inside ReportDataWebService.reportAggregateDataAndRDO");

            //$scope.drp_start = moment(params.start_date).format("MMMM D, YYYY");
            //$scope.drp_end   = moment(params.end_date).format("MMMM D, YYYY");

            // hash table that maps the keys used to get data from backend, to the keys used on
            // the data returned in the aggregate data objects

            $scope.aggKeyValues = internalMappedNames.aggregate_property_keys;

            // is the primary agg key value to aggregate by using crossfilter
            $scope.primaryGrouping = $scope.backEndNameToAggKey[$scope.report];
            if($scope.primaryGrouping === 'source')
                $scope.primaryGrouping = "dynamicsource";

            // is the secodary agg key value to aggregate by using crossfilter
            $scope.secondary = ($scope.urlParams.secondary !== null) && ($scope.urlParams.secondary !== "none") ? $scope.backEndNameToAggKey[$scope.urlParams.secondary] : "none";
            if($scope.urlParams.secondary !== null && $scope.urlParams.secondary !== "none" && $scope.secondary === undefined) {
                $scope.secondary = $scope.urlParams.secondary;
            }

            $scope.secondaryGrouping = $scope.secondary;
            $scope.original = result.data.json;

            if($scope.urlParams.filter === undefined) {
            	$scope.ShowChart = true;
            }

            createDCObjects(result.data.json);

            if($scope.urlParams.filtertype !== undefined && $scope.urlParams.filtertype === 's' && $scope.urlParams.filter !== undefined && $scope.urlParams.filter !== '') {
                $scope.getSimplyFilteredData();
                $scope.simpleSearchFilter = $scope.urlParams.filter;
            } else if($scope.urlParams.filtertype !== undefined && $scope.urlParams.filtertype === 'a' && $scope.urlParams.filter !== undefined) {
                $scope.getErrorsAndAdvFilters();
            } else {
                $scope.ShowChart = false;
            }

			if ($scope.showAdvFilter === true && $scope.advFilterDefinitions.length > 0) {
				if ($scope.advFilterDefinitions[0].user_input || $scope.advFilterDefinitions[0].user_input === 0) {
					$scope.filterApplied = true;
				}
			} else if ($scope.simpleSearchFilter.length > 0) {
				$scope.filterApplied = true;
			}

      			$scope.disableAdvFilterBtn = false;
			$scope.hideDataTable = false;
			progressLoader.end();
        });
    };

    /*function checkForFilterID(cb){
      console.log('CHECK FOR FILTER ID');
        if($location.search().filterId){
            ScheldueUrlFormatter.getFilterData($location.search().filterId, function(filterData){
                $scope.filterData = filterData;
                cb(true);
            });
        }else{
            $scope.filterData = null;
            cb(false);
        }
    }
    */

    $scope.filterData = null;

    // Used with "Reset Charts" button
    var searchBarDimension;
    // NOTE: it is unlikely that the query string will hold any values for fields, but the same fields should be available in the $scope
    //      so for example below uses $location.search('filter') which should be available as $scope.filter
    $scope.resetCharts = function () {
		console.log('@@@@@@@@@ ResetCharts Triggered @@@@@@@@@');
        $scope.clearSimpleFilterText();
        $scope.urlParams.filterRule = [];
        $scope.urlParams.filter = undefined;
        $scope.urlParams.filtertype = undefined;
        //$scope.emptyAdvFilterDefinitions();
        if (searchBarDimension) { searchBarDimension.filterAll(); }
        $scope.dc1.filterAll();
        $scope.dc1.redrawAll();
        $scope.filterReset();
    };

    // NOTE:  this method should not be used
    $scope.clearSimpleFilterText = function () {
        if ($scope.simpleSearchApplied) {
            $scope.simpleSearchApplied = false;
        }
        if ($scope.simpleSearchFilter) {
            $scope.simpleSearchFilter = "";

            $scope.urlParams.filter = '';
            $scope.urlParams.filtertype = '';
            // need to use jquery because it wont allow $digest to update the textbox in time
            jQuery("#simpleChart").val("");
        }
    };

    /*$scope.emptyAdvFilterDefinitions = function () {
        if ($scope.advFiltersAreApplied) {
            $scope.advFiltersAreApplied = false;
        }

        if ($scope.advFilterDefinitions) {
            $scope.initializeAdvFilterDefinitions();
        }
    };
    */

    function createDCObjects(dataResult) {


        // contains an array of aggregated objects that usually represent multiple records in one
        var dataSet = dataResult.aggregated_data;

        $scope.isEmptyDataSet = false;
	    // we need at least one item in the dataset for the charts to render anything
	    // if we don't have at least 1 item then the charts will just be completely white
	    if (dataSet.length < 1) {
        // console.log('Data Set has a length');
		    $scope.isEmptyDataSet = true;
		    var universalEmptyItem = {
			    call_flow:         0,
			    call_flow_name:    "n/a",
			    campaign_id:       0,
			    campaign_name:     "n/a",
			    d3datetime:        null,
			    secGroupDimension: "n/a",
			    simpleSearch:      "n/a undefined",
			    date:              moment($scope.drp_start.toString(), "MMMM D, YYYY").format("YYYY-MM-DD")
		    };
		    dataSet.push(useSpecificReportTypeFiller(
			    universalEmptyItem,
			    moment($scope.drp_start.toString(), "MMMM D, YYYY").format("YYYY-MM-DD"),
			    $scope.report
		    ));
	    }

		//console.log("dataSet after handling no items", dataSet);

	    ///////////////////////////////
	    // START - FILL IN WITH EMPTIES
	    ///////////////////////////////
	    // the dataset we get most likely will have days missing from it, which creates problems with the graphs
	    // it will be simpler to simply fill in those missing days with zeroed out stub data which shouldn't have
	    // a negative impact since it will just get rolled up anyway for most charts
	    var uniqueSortedDaysInOriginalDS = _.chain(dataSet)
		                                    .pluck("date") // just get the date strings
		                                    .map(function (d) {return d.split(" ")[0];})// remove HH:MM:SS portion of the date
		                                    .uniq() // only use unique date values
		                                    .sortBy(function (d) { return moment(d, "YYYY-MM-DD").unix(); }) // sort by their unix values, but it wont change the dates from what they are
	                                        .value();

		// console.log("uniqueSortedDaysInOriginalDS", uniqueSortedDaysInOriginalDS);


		var missingDaysFromDS = DateRangeFiller.fillInDays(
			uniqueSortedDaysInOriginalDS,
			moment($scope.drp_start.toString(), "MMMM D, YYYY").format("YYYY-MM-DD"),
			moment($scope.drp_end.toString(), "MMMM D, YYYY").format("YYYY-MM-DD"),
			"YYYY-MM-DD"
		);

        // console.log('STILL ALIVE');

	    var missingObjectDaysFromMissingDays = _.map(missingDaysFromDS, function (date) {
		    return useSpecificReportTypeFiller(_.clone(dataSet[0]), date, $scope.report);
	    });
	    // console.log("missingDaysFromDS", missingDaysFromDS);
	    // console.log("missingObjectDaysFromMissingDays", missingObjectDaysFromMissingDays);

	    // console.log("dataSet.length before", dataSet.length);
	    dataSet = dataSet.concat(missingObjectDaysFromMissingDays);


		// This looks kind of crazy but really we're just adding one more empty day to the dataset. Any of the charts that allow the "brush" selection will not let you select the
	    // last datapoint. If we add an empty day at the end, this pushes the last day to the left, and simultaneously making it selectable.
	    // We will also hide the last day's x axis tick label so as to "hide" the fact that we have a day past the date range selection
	    dataSet.push(useSpecificReportTypeFiller(_.clone(dataSet[0]), moment($scope.drp_end.toString(), "MMMM D, YYYY").add(1, "day").format("YYYY-MM-DD"), $scope.report));


      // console.log('STILL ALIVE');

	    //console.log("dataSetTOFIX", dataSet);
	    //_.each(dataSet, function (v) {
		 //   v.conversion_count = 0;
	    //});


	    //console.log("dataSet.length after", dataSet.length);
	    /////////////////////////////
	    // END - FILL IN WITH EMPTIES
	    /////////////////////////////







        $scope.reportTitle = aggKeyToReportTitle()[$scope.primaryGrouping];


        // why is another variable being set just to determine whether $scope.secondary has a value or not?
        $scope.hasSecondaryGrouping = ($scope.secondary !== null) && ($scope.secondary !== "none") && ($scope.secondary !== undefined);

        // used at the top of the datagrid for its table's header values
        $scope.headerNames = getDataGridHeaderValues($scope.primaryGrouping, $scope.secondary);
        $scope.csvHeaderNames = getDataGridHeaderValues($scope.primaryGrouping, $scope.secondary);

        // $scope.headerNames[_.indexOf($scope.headerNames, "dynamicsource")] = "Source";
        // Hash table for mapping header value to the aggregate key names on the data sets
        // will be used with the advanced filter to know which of the aggregate key names to
        // filter out based on the column chosen
        $scope.mappedHeaderValues = createHeaderValueToAggKeyName();
        //$scope.mappedHeaderValues[$scope.primaryGrouping]   = "primaryGrouping";
        //$scope.mappedHeaderValues[$scope.secondaryGrouping] = "secondaryGrouping";


        // mappedHeaderValues needs the display header name, and its object property accessor key
        //$scope.advancedFilterConfig = createAdvancedFilterConfig($scope.headerNames, $scope.mappedHeaderValues);

        // used for the Secondary Group: select dropdown form
        $scope.secondaryGroupSelectOptions = createSecondaryGroupSelectOptionValues()[$scope.report];

        // when use clicks add, will call this function to add an empty advanced filter with empty values
       /* $scope.createAdvFiltDefinition = function () {
            return {
                inclusivity:         null,
                column:              null,
                comparativeOperator: null,
                text:                null
            };
        };



        $scope.initializeAdvFilterDefinitions = function () {

            // start with one, empty, advanced filter form item
            $scope.advFilterDefinitions = [$scope.createAdvFiltDefinition()];
        }; */

        //$scope.initializeAdvFilterDefinitions();



        // Sumary widgets from DC library (in the dcChart directive they're "number" type)
        // work more easily with pre reduced values, so even though this calculation would be better off
        // in a reduce function, it was working better to do it here
        // TODO might need to change this to account for aggregating by hour
        var timeFormat2 = d3.time.format('%Y-%m-%d');
        var aggKeyNames = internalMappedNames.aggregate_property_keys;
        // adding property values to each aggregated object on backend's dataset


        var extraWorkForSpecificReport = {};
        extraWorkForSpecificReport[aggKeyNames.keyword] = function(dataSet, dataRecord){
            dataRecord.keyword = dataRecord.keyword === null ? "(no keywords)" : dataRecord.keyword === "" ? "Not Provided" : dataRecord.keyword;
        };

        var runReportSpecificExtra =  angular.isDefined(extraWorkForSpecificReport[$scope.primaryGrouping]);

        _.each(dataSet, function (data) {
            // For data grid

            // having a property on the items where they are universally the same, allows crossfilter to create a "dimension"
            // that groups them all together
            data.call_group = 1;
            data.d3datetime = timeFormat2.parse(data[aggKeyNames.date]);

            data[aggKeyNames.unique_percent]        = zeroIfNanOrNull(data[aggKeyNames.unique_calls], data[aggKeyNames.total_calls]);
            data[aggKeyNames.percent_of_leads]      = zeroIfNanOrNull(data[aggKeyNames.total_leads] , data[aggKeyNames.total_calls]);
            data[aggKeyNames.avg_lead_quality]      = zeroIfNanOrNull(data[aggKeyNames.lead_score]  , data[aggKeyNames.total_calls]);
            data[aggKeyNames.avg_duration]          = zeroIfNanOrNull(data[aggKeyNames.duration]    , data[aggKeyNames.total_calls]);
            data[aggKeyNames.conversion_percent]    = zeroIfNanOrNull(data[aggKeyNames.converted]   , data[aggKeyNames.total_calls]);
            data[aggKeyNames.simpleSearchFilterTxt] = (data[$scope.primaryGrouping] + " " + data[$scope.secondary]).toLowerCase();


            if (runReportSpecificExtra) {
                extraWorkForSpecificReport[$scope.primaryGrouping](dataSet, data);

            }
        });

	    // TODO DEBUG


        // Cross filter can't do a "double" group by like in sql where it separates the two easily,
        // but doing this concatenation between the primary and secondary will enable the rows in
        // the data table to be separated as such

        // No secondary grouping
        // name: Aarons Car Wash, totalCalls: 10

        //secondary grouping
        // [
        // name: Aarons Car Wash, totalCalls: 7, keyword: happy
        // name: Aarons Car Wash, totalCalls: 3, keyword: sad
        // ]

        _.each(dataSet, function (d) {
            if ($scope.hasSecondaryGrouping) {
                //console.log("-----------------");
                d[aggKeyNames.secondaryGroupCFDimension] = d[$scope.primaryGrouping] + "---" + d[$scope.secondary];
                //console.log("D", d);
                //console.log("[$scope.secondaryGrouping]", d[$scope.secondaryGrouping]);
            }
            else {
                d[aggKeyNames.secondaryGroupCFDimension] = d[$scope.primaryGrouping];
            }
        });


        // Each Report Definition Object (RDO) contains the configurations for an  individual chart or summary widget
        var reportDefinitionObjects = dataResult.rdo[0].data.chartobjs;

        // the cross filter object will mostly be used in the DC object, if we we're using it with the DC library,
        // then we would use cross filter to filter, manipulate, reduce the virtual data sets we want to output
        $scope.xf1 = crossfilter(dataSet);


        // the DC library piggy backs and cross filter and augments it with functions to create data visualization items
        // and also binds the data filtered between all the items created an a DC instance
        $scope.dc1 = dc;

        // Each RDO configuration item will be used for creating an individual data chart or summary widget
        if($scope.ShowChart) {
	        $scope.chartsConfigs = reportDefinitionObjects;
	        $scope.chartsConfigs[13].dimension = $scope.primaryGrouping;
        }

        // User can be redirected from Campaigns list page and if so, automatically apply simple filter to datagrid on page load
        // based on campaign name in filter query string value
        // NOTE: the query string should never have a variable called 'sfilter' - what it will have is 'filter' and 'filtertype' = 's'
        // if ($location.search().sfilter) {
        //     $scope.dataTableValues = getDSSimplyFiltered();
        /* }else if(ScheldueUrlFormatter.reportSpecficAdvancedFilter($scope.filterData).length > 0){
            $scope.advFiltersAreApplied = true;
            $scope.advFilterDefinitions = ScheldueUrlFormatter.reportSpecficAdvancedFilter($scope.filterData);
            $scope.dataTableValues = $scope.getDsWithAppliedAdvFilters();
        }else if(ScheldueUrlFormatter.reportSpecficBasicFilter($scope.filterData).length > 0){
            $scope.advFiltersAreApplied = false;
            $scope.simpleSearchApplied = true;
            $scope.simpleSearchFilter = ScheldueUrlFormatter.reportSpecficBasicFilter($scope.filterData);
            $scope.dataTableValues = getDSSimplyFiltered();
        }
        else { */
            $scope.dataTableValues = getNonAdvFilteredDSForDataGrid($scope.xf1, incrementReduce, decrementReduce, initialReduce);

			// Show horsemanFlag element on dom which means data is loaded in DO NOT CODE STOMP
			setTimeout(function() {
				$scope.horsemanFlag = true;
			}, 1000);
        // }
        //$scope.dc1.redrawAll();
    }


    // Updates the datagrid data after an implied filter is made from modifying dc chart objects
    // cleanUpDS should just be a bool passed in
    $scope.updateDataTableWithNewFilteredDS = function (cleanUpDS) {
        //if adv filters are applied, always update $scope.dataTableValues with dcfilters && advFilters
        // otherwise, only update the $scope.dataTableValues with dcfilters
        // Using adv filter to update DS
        if (cleanUpDS) {
            $scope.dataTableValues = getNonAdvFilteredDSForDataGrid($scope.xf1, incrementReduce, decrementReduce, initialReduce);
        }

        // Advanced search filter
        else if ($scope.advFiltersAreApplied) {
            $scope.dataTableValues = $scope.getDsWithAppliedAdvFilters();
        }

        // Simple search filter
        else if ($scope.simpleSearchApplied && $scope.simpleSearchFilter) {
            $scope.dataTableValues = getDSSimplyFiltered();
        }

        // No extra filters applied (simple or advanced)
        else {
            $scope.dataTableValues = getNonAdvFilteredDSForDataGrid($scope.xf1, incrementReduce, decrementReduce, initialReduce);
        }

    };


    function getDSSimplyFiltered() {
        var userTxt = $scope.simpleSearchFilter.toLowerCase(),
            dsWithNoFilters = getNonAdvFilteredDSForDataGrid($scope.xf1, incrementReduce, decrementReduce, initialReduce),
            primaryGroupingText,
            secondaryGroupingText,
            textToCheck;

        return _.filter(dsWithNoFilters, function (row) {
            primaryGroupingText = row.value.primaryGrouping.toLowerCase();

            if ($scope.hasSecondaryGrouping) {
                secondaryGroupingText = row.value.secondaryGrouping.toLowerCase();
                textToCheck = primaryGroupingText + " " + secondaryGroupingText;
            } else {
                textToCheck = primaryGroupingText;
            }


            return textToCheck.indexOf(userTxt) !== -1;
        });
    }

    // 'simple' string argument is passed thru the view on the attribute


    // will have "filters" applied from clicking on chart columns, date range, etc, but does NOT have our "advanced"
    // custom filters
    var primaryDimension, rolledUpGroup, filteredButWithEmpties, emptyRowsGone, formattedDSForView;

    function getNonAdvFilteredDSForDataGrid(xf, incReduce, decReduce, initReduce) {
        var aggKeyNames  = internalMappedNames.aggregate_property_keys;
        // Crossfilter has a limit of 32 dimensions and we'll go over the limit if we keep creating new dimensions
        if (primaryDimension) {
            primaryDimension.dispose();
        }
        primaryDimension = xf.dimension(function (d) { return d[aggKeyNames.secondaryGroupCFDimension]; });
        rolledUpGroup = primaryDimension.group().reduce(incReduce, decReduce, initReduce);
        filteredButWithEmpties = _.sortBy(rolledUpGroup.top(Infinity), "key");
        emptyRowsGone = _.filter(filteredButWithEmpties, function (reducedObj) { return reducedObj.value.count > 0; });
        formattedDSForView = formatDatatableValues(emptyRowsGone);
        return formattedDSForView;
    }

    $scope.applyAdvancedFiltersToDataGrid = function () {
        var advFilterErrors = $scope.validateAdvFilterDefinitions($scope.advFilterDefinitions);
        if (advFilterErrors.length !== 0) {
            pinesNotifications.notify({
                title: 'Advanced Filter Error(s)',
                text:  advFilterErrors.join(''),
                type:  'error'
            });
        }else{
            $scope.advFiltersAreApplied = true;
            $scope.updateDataTableWithNewFilteredDS();
        }
    };


    $scope.getCSVData = function (formate) {
        console.log("$scope.headerNames", $scope.headerNames);
        $scope.headerNames[_.indexOf($scope.headerNames, "Source")] = "dynamicsource";
        //use headers and use $scope.dataTableValues
        var dataTable = _.pluck($scope.dataTableValues, "value");


        var keyToAccessValue;
        var res = _.map(dataTable, function (row) {
            var csvData = {};

            _.each($scope.headerNames, function (headerName) {
                if ($scope.mappedHeaderValues[headerName] !== $scope.primaryGrouping   &&
                    $scope.mappedHeaderValues[headerName] !== $scope.secondaryGrouping) {
                    keyToAccessValue = $scope.mappedHeaderValues[headerName];
                }
                else if ($scope.mappedHeaderValues[headerName] === $scope.primaryGrouping) {
                    keyToAccessValue = "primaryGrouping";
                }
                else if ($scope.mappedHeaderValues[headerName] === $scope.secondaryGrouping) {
                    keyToAccessValue = "secondaryGrouping";
                }



                csvData[headerName] = row[keyToAccessValue];
            });

            return csvData;
        });
        $scope.headerNames[_.indexOf($scope.headerNames, "dynamicsource")] = "Source";
        if($rootScope.isSafari){
          var reportName = "csv_data_table";
          if(formate === 'tsv'){ reportName = "tsv_data_table";}
          JSONToCSVConvertor(res,reportName,true,formate);
        }else{
          return res;
        }
    };

    $scope.changeOptions = function(columnVal){
        if(columnVal === "Greater than and Equals")
            return "Greater than";
        if(columnVal === "Less than and Equals")
            return "Less than";
        return columnVal;
    };

    $scope.getCSVDataReports = function () {
		console.log($scope.csvHeaderNames);
		//   $scope.csvHeaderNames[_.indexOf($scope.csvHeaderNames, "Source")] = "dynamicsource";
		  //use headers and use $scope.dataTableValues
		  var dataTable = _.pluck($scope.dataTableValues, "value");


		  var keyToAccessValue;
		  var res = _.map(dataTable, function (row) {
		      var csvData = {};

		      _.each($scope.csvHeaderNames, function (headerName) {
		          if ($scope.mappedHeaderValues[headerName] !== $scope.primaryGrouping && $scope.mappedHeaderValues[headerName] !== $scope.secondaryGrouping) {
		              keyToAccessValue = $scope.mappedHeaderValues[headerName];
		          }
		          else if ($scope.mappedHeaderValues[headerName] === $scope.primaryGrouping) {
		              keyToAccessValue = "primaryGrouping";
		          }
		          else if ($scope.mappedHeaderValues[headerName] === $scope.secondaryGrouping) {
		              keyToAccessValue = "secondaryGrouping";
		          }
		          csvData[headerName] = row[keyToAccessValue];
		      });

              if (csvData.dynamicsource) {
                  var temp = csvData.dynamicsource;
                  delete csvData.dynamicsource;
                  csvData.Source = temp;
              }
		      return csvData;
		  });

		  $scope.csvHeaderNames[_.indexOf($scope.csvHeaderNames, "dynamicsource")] = "Source";
		  console.log($scope.csvHeaderNames);
          $scope.csvDataScheduleReport = res;
		  return res;
      };

    $scope.unApplyAdvancedFiltersToDataGrid = function () {
        $scope.advFiltersAreApplied = false;
        // $scope.initializeAdvFilterDefinitions();
        $scope.updateDataTableWithNewFilteredDS();
    };

    $scope.toggleFilterUsed = function () {
        $scope.advFiltersAreApplied = !$scope.advFiltersAreApplied;
        $scope.simpleSearchApplied = !$scope.simpleSearchApplied;

        // $scope.initializeAdvFilterDefinitions();


        $scope.updateDataTableWithNewFilteredDS(true);
    };


    //$scope.updateSimpleSearchFlag = function() {
    //    if($scope.searchBoxFilter === undefined) return;
    //    $scope.simpleSearchApplied = ($scope.searchBoxFilter.length > 0 && !$scope.advFiltersAreApplied)
    //};


    function secondsToHHMMSS(seconds) {
        return moment().startOf('day').seconds(seconds).format('H:mm:ss');
    }


    function formatDatatableValues(dt) {

        // 0.5432 -> 54
        var aggKeyVals = internalMappedNames.aggregate_property_keys;


        function decimalToPercentInt(dec) { return Math.round(dec * 100); }
        _.each(dt, function (row) {
            row.value[aggKeyVals.avg_duration]       = secondsToHHMMSS(Math.round(row.value[aggKeyVals.avg_duration]));
            row.value[aggKeyVals.avg_lead_quality]   = Math.round(row.value[aggKeyVals.avg_lead_quality]);
            row.value[aggKeyVals.conversion_percent] = decimalToPercentInt(row.value[aggKeyVals.conversion_percent]);
            row.value[aggKeyVals.percent_of_leads]   = decimalToPercentInt(row.value[aggKeyVals.percent_of_leads]);
        });

        return dt;
    }

    var advFilterChecks = {};
    advFilterChecks.gthan = function (columnVal, userTxt) {
        userTxt = parseInt(userTxt);
        if (!isNaN(columnVal) && !isNaN(userTxt)) {
            return columnVal > userTxt;
        }
        else {
            return false;
        }
    };

    advFilterChecks.lthan = function (columnVal, userTxt) {
        userTxt = parseInt(userTxt);
        if (!isNaN(columnVal) && !isNaN(userTxt)) {
            return columnVal < userTxt;
        }
        else {
            return false;
        }
    };

    advFilterChecks.contains = function (columnVal, userText) {
        return columnVal.toString().toLowerCase().indexOf(userText) !== -1;
    };

    advFilterChecks.equals = function (columnVal, userText) {
        return columnVal.toString().toLowerCase() === userText.toString().toLowerCase();
    };

    advFilterChecks.scrubUserText = function (userTxt) {
        userTxt = userTxt.toString();
        return _.replaceAll(userTxt.trim().toLowerCase(), "%", "");
    };


    // if user selects include, then we let the filter work as is,
    // however, if user wants "exclude", it's as simple as returning the opposite of "include"
    function applyInclusivityToFilterResult(inclusivityStr, passedInclusiveTest) {
        if (inclusivityStr === "include") {
            return passedInclusiveTest;
        }
        else if (inclusivityStr === "exclude") {
            return !passedInclusiveTest;
        }
        else {
            //console.log("error with filterDef");
            return false;
        }
    }


    // puts the dataset (given by the the dc chart objects) into a reducing function which with each pass, will go through
    // a filter. After it goes through a filter, the result of that filter gets sent to the next filter, and repeats until
    // the final result is a dataset that has been passed through each (of the) filter(s)
    $scope.getDsWithAppliedAdvFilters = function () {
        var row_value;
        var userTxt, passedTest, newDS, dsWithNoAdvFilters;
        dsWithNoAdvFilters = getNonAdvFilteredDSForDataGrid($scope.xf1, incrementReduce, decrementReduce, initialReduce);

        return _.reduce($scope.advFilterDefinitions, function (filteredDS, advFilterDef) {
            if (!advFilterDef.text){ return; }

            newDS = _.filter(filteredDS, function (row) {
                userTxt = advFilterChecks.scrubUserText(advFilterDef.text);
                row_value = row.value[advFilterDef.column];
                if(row.value[advFilterDef.column] === undefined){
                    if(advFilterDef.column === $scope.primaryGrouping)
                        row_value = row.value.primaryGrouping;
                    if(advFilterDef.column === $scope.secondaryGrouping)
                        row_value = row.value.secondaryGrouping;
                }
                if(advFilterDef.column === "average_duration" && advFilterDef.comparativeOperator !== "contains"){
                    row_value = hmsToSecondsOnly(row_value);
                    userTxt = hmsToSecondsOnly(userTxt);
                }
                passedTest = advFilterChecks[advFilterDef.comparativeOperator](row_value, userTxt);
                return applyInclusivityToFilterResult(advFilterDef.inclusivity, passedTest);
            });
            return newDS;
        }, dsWithNoAdvFilters);
    };

    //commenting this out since we don't need to throttle how many times it is called
    //$scope.applySearchTextFilter = _.debounce($scope.updateDataTableWithNewFilteredDS, 1200);
    $scope.applySearchTextFilter = _.debounce($scope.updateDataTableWithNewFilteredDS, 0);

    $scope.validateSimpleTextFilter = function (simpleFilterText) {
        //console.log("inside validate simple text");
        if (simpleFilterText === undefined) {
            $scope.simpleSearchApplied = false;
            return;
        }

        $scope.simpleSearchApplied = true;
        $scope.simpleSearchFilter = simpleFilterText;
        $scope.applyFilter();
    };


    // divide two values, if result is NaN, return 0, if not, return result
    function zeroIfNanOrNull(numerator, denominator) {
        var result = numerator / denominator;
        return (isNaN(result) || (result === null)) ? 0 : result;
    }

    function hmsToSecondsOnly(str) {
        str = str.toString().split(':');
        return (+str[0]) * 60 * 60 + (+str[1]) * 60 + (+str[2]);
    }

    var primAndSecondaryValues;
    var aggKeyVals = internalMappedNames.aggregate_property_keys;
    function incrementReduce(reducedFact, currFact) {

        primAndSecondaryValues = currFact[aggKeyVals.secondaryGroupCFDimension].split("---");

        //reducedFact.primaryGrouping   = primAndSecondaryValues[0];
        reducedFact[aggKeyVals.reducedPrimGroup] = primAndSecondaryValues[0];
        if(reducedFact[aggKeyVals.reducedPrimGroup]==="Online"){
            reducedFact[aggKeyVals.reducedPrimGroup]="Online (Generic)";
        }
        reducedFact[aggKeyVals.reducedSecGroup]  = primAndSecondaryValues[1];


        reducedFact[aggKeyVals.converted]    += currFact[aggKeyVals.converted];
        reducedFact[aggKeyVals.total_calls]  += currFact[aggKeyVals.total_calls];
        reducedFact[aggKeyVals.duration]     += currFact[aggKeyVals.duration];
        reducedFact[aggKeyVals.total_leads]  += currFact[aggKeyVals.total_leads];
        reducedFact[aggKeyVals.lead_score]   += currFact[aggKeyVals.lead_score];
        reducedFact[aggKeyVals.unique_calls] += currFact[aggKeyVals.unique_calls];
        reducedFact.count                    += 1;


        reducedFact[aggKeyVals.percent_of_leads]   = zeroIfNanOrNull(reducedFact[aggKeyVals.total_leads], reducedFact[aggKeyVals.total_calls]);
        reducedFact[aggKeyVals.avg_lead_quality]   = zeroIfNanOrNull(reducedFact[aggKeyVals.lead_score],  reducedFact[aggKeyVals.total_calls]);
        reducedFact[aggKeyVals.avg_duration]       = zeroIfNanOrNull(reducedFact[aggKeyVals.duration],    reducedFact[aggKeyVals.total_calls]);
        reducedFact[aggKeyVals.conversion_percent] = zeroIfNanOrNull(reducedFact[aggKeyVals.converted],   reducedFact[aggKeyVals.total_calls]);
        return reducedFact;
    }

    function decrementReduce(reducedFact, currFact) {
        primAndSecondaryValues = currFact[aggKeyVals.secondaryGroupCFDimension].split("---");


        //reducedFact.primaryGrouping   = primAndSecondaryValues[0];
        reducedFact[aggKeyVals.reducedPrimGroup] = primAndSecondaryValues[0];
        reducedFact[aggKeyVals.reducedSecGroup]  = primAndSecondaryValues[1];


        reducedFact[aggKeyVals.converted]    -= currFact[aggKeyVals.converted];
        reducedFact[aggKeyVals.total_calls]  -= currFact[aggKeyVals.total_calls];
        reducedFact[aggKeyVals.duration]     -= currFact[aggKeyVals.duration];
        reducedFact[aggKeyVals.total_leads]  -= currFact[aggKeyVals.total_leads];
        reducedFact[aggKeyVals.lead_score]   -= currFact[aggKeyVals.lead_score];
        reducedFact[aggKeyVals.unique_calls] -= currFact[aggKeyVals.unique_calls];
        reducedFact.count                    -= 1;


        reducedFact[aggKeyVals.percent_of_leads]   = zeroIfNanOrNull(reducedFact[aggKeyVals.total_leads], reducedFact[aggKeyVals.total_calls]);
        reducedFact[aggKeyVals.avg_lead_quality]   = zeroIfNanOrNull(reducedFact[aggKeyVals.lead_score],  reducedFact[aggKeyVals.total_calls]);
        reducedFact[aggKeyVals.avg_duration]       = zeroIfNanOrNull(reducedFact[aggKeyVals.duration],    reducedFact[aggKeyVals.total_calls]);
        reducedFact[aggKeyVals.conversion_percent] = zeroIfNanOrNull(reducedFact[aggKeyVals.converted],   reducedFact[aggKeyVals.total_calls]);

        return reducedFact;
    }

    function initialReduce() {


        var initialReduceObj = {};
        initialReduceObj[aggKeyVals.converted]            = 0;
        initialReduceObj[aggKeyVals.total_leads]          = 0;
        initialReduceObj[aggKeyVals.total_calls]          = 0;
        initialReduceObj[aggKeyVals.duration]             = 0;
        initialReduceObj[aggKeyVals.unique_calls]         = 0;
        initialReduceObj[aggKeyVals.lead_score]           = 0;
        initialReduceObj[aggKeyVals.conversion_percent]   = 0;
        initialReduceObj.count             = 0;

        return initialReduceObj;
    }


	$scope.reducers = {
		initial:initialReduce,
		increment: incrementReduce,
		decrement: decrementReduce
	};
    $scope.showAdvUi = function(){
        $scope.secondary = $scope.aggKeyToBackendName[$scope.secondaryGrouping];
        advFilSrvc.resetAdvFilter();
        $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
        $scope.showAdvFilter = true;
    };

    // ***** begin NECESSARY CODE FOR ADV FILTER TO WORK *******************
    $scope.preloading = false;
    $scope.showAdvFilter = false;
    $scope.advancedFilterConfig = { maxQuantity: 5 };

    $scope.extendUrlParams = function(urlParams) {
        $scope.urlParams = urlParams.vars;
        angular.extend($scope, urlParams.vars);
        delete urlParams.vars;
		delete urlParams.showAdvFilter;
        angular.extend($scope, urlParams);
    };

    $scope.getInitialUrlParams = function() {
        advFilSrvc.determineInitializationMethod($scope).then(function(r) {
            $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
			if ($scope.advFilterDefinitions[0].selected_column) {
				$scope.showAdvFilter = true;
			}
            $scope.extendUrlParams(r);
			$scope.ShowChart = true;
            $scope.loadReportBasedOnQueryStringFlexible();
        });
    }();

    $scope.addFilterDefinition = function() {
        advFilSrvc.addFilterDefinition(false);
        $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
    };

    $scope.updateOperators = function(preloading, af, $index) {
        advFilSrvc.updateOperators(preloading, af, $index);
        $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
    };

    $scope.applyFilterParams = function() {
		progressLoader.set( 75 );
        var urlParams = advFilSrvc.applyFilter($scope);
        if (urlParams) {
            $scope.extendUrlParams(urlParams);
            return true;
        }

        return false;
    };

    $scope.applyFilter = function() {
		progressLoader.set( 50 );
        var noErrors = $scope.applyFilterParams();
        if (noErrors) {
            $scope.loadReportBasedOnQueryStringFlexible();
        }
    };

    $scope.filterReset = function() {
		progressLoader.set( 25 );
		advFilSrvc.resetAdvFilter();
		$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
		$scope.simpleSearchFilter = '';
		$scope.filter = undefined;
		$scope.filtertype = 's';
		$scope.showAdvFilter = false;
		$scope.ShowChart = true;
		if ($scope.filterApplied) {
			$scope.applyFilter();
			$scope.filterApplied = false;
		}
    };

    $scope.removeFilterDefinition = function(i) {
        advFilSrvc.removeFilterDefinition(i);
        $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
    };

    $scope.validateInput = function(e) {
        advFilSrvc.validateInput(e);
    };
    // ***** end NECESSRY CODE FOR ADV FILTER TO WORK ***************

    // load the data for the page
}]);
