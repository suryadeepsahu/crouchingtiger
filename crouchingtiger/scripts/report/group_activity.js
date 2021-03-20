(function () {

    /*jshint -W030 */

    // display should just be what's visible to user
    // fieldName should be what the database uses for its name
    // filterType determines the compartive operators available to the user as well as the type of input/dropdown they get to use
    // options is an optional key/value type only dropdownMisc
    function Column(display, fieldName, filterType, options) {
        this.display    = display;
        this.fieldName  = fieldName;
        this.filterType = filterType;
        this.options    = options;
    } // end Column constructor

    function ComparativeOperator(operatorShorthand, displayValue) {
        this.operator = operatorShorthand;
        this.display  = displayValue;
    }// end ComparativeOperator constructor

    angular.module('group_activity', [])
    .filter("megaNumber", function() {
        return function(number, fractionSize) {

            if(number === null) return null;
            if(number === 0) return "0";

            if(!fractionSize || fractionSize < 0)
                fractionSize = 2;

            var abs = Math.abs(number);
            var rounder = Math.pow(10,fractionSize);
            var isNegative = number < 0;
            var key = '';
            var powers = [
                {key: "Q", value: Math.pow(10,15)},
                {key: "T", value: Math.pow(10,12)},
                {key: "B", value: Math.pow(10,9)},
                {key: "M", value: Math.pow(10,6)}
            ];

            for(var i = 0; i < powers.length; i++) {

                var reduced = abs / powers[i].value;
                reduced = Math.round(reduced * rounder) / rounder;
                if(reduced >= 1){
                    abs = reduced;
                    key = powers[i].key;
                    break;
                }
            }

            return (isNegative ? '-' : '') + abs + key;
        };
    })
    .filter('noFractionCurrency',
      [ '$filter', '$locale',
      function(filter, locale) {
        var currencyFilter = filter('currency');
        var formats = locale.NUMBER_FORMATS;
        return function(amount, currencySymbol) {
          var value = currencyFilter(amount, currencySymbol);
          if(amount >= 0 && value !== null) {
			var sep = value.indexOf(formats.DECIMAL_SEP);
			return value.substring(0, sep);
          }
          return "$" + amount;
        };
      }])

    .controller('groupActivityController', ['$scope', '$http', '$routeParams', '$window', '$rootScope', 'GroupActivitySettingsReportWebservices', '$location', 'pinesNotifications', "DateRangeFiller", "$q", "CallFlowSettingsReportWebService", "paginationService", "advFilSrvc","progressLoader",
    function ($scope, $http, $routeParams, $window, $rootScope, GroupActivitySettingsReportWebservices, $location, pinesNotifications, DateRangeFiller, $q, CallFlowSettingsReportWebService, paginationService, advFilSrvc, progressLoader) {
        'use strict';
        var download_audio_setting = $window.localStorage.download_audio_enabled;
        download_audio_setting = (typeof download_audio_setting === "boolean") ? download_audio_setting : (download_audio_setting ==undefined || download_audio_setting =='undefined' || $window.localStorage.download_audio_enabled.toLowerCase() === 'true');
        if($rootScope.download_audio_enabled!==download_audio_setting){
            $rootScope.download_audio_enabled=download_audio_setting;
            $rootScope.$broadcast('download_audio_setting_changed');
        }
        $scope.isLoadingApi=true;
		$scope.hidePaginationControls = false;
		$scope.currentPaginationId = 'gaReport';
		$scope.hideDataTable = false;
		$scope.filterApplied = false;
		$scope.horsemanFlag = false;
		$scope.simpleSearchFilter = "";
        $scope.report = $location.search().report;
        $scope.drp_start = moment().subtract(7, 'days').format('MMMM D, YYYY');
        $scope.drp_end = moment().subtract(1, 'days').endOf('day');
        $scope.preview = ($location.search().preview ? $location.search().preview : false);
        if ($location.search().preview) {
            $("#wrap").append('<div id="previewBlock">&nbsp;</div>');
        }
        $rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
        if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true'){
            $scope.is_migrated = true;
        }else{
            $scope.is_migrated = false;
        }
        var sessionParams = {};
        $scope.roleId = $rootScope.roleId;
        $scope.reportTitle = "Group Activity";
        $scope.groupActivityMapping = {};
        $scope.secondary;
        $scope.pageSize = 100;
        $scope.offset = 0;
        $scope.showActualEportLink = false;
        $scope.showExportErrorLink = true;
        $scope.ouList = [];
        $scope.whichScheduleReport = 'none';
        $scope.resizeWindow = function () {
          setTimeout(function() {
            $(window).trigger('resize');
          }, 100);
        };
        var blkstr = {};

        $scope.drp_options = {
            ranges:    {
                'Today':        [moment(),                                       moment().endOf('day')],
                'Yesterday':    [moment().subtract(1, 'days'),                   moment().subtract(1, 'days').endOf('day')],
                'Last 7 Days':  [moment().subtract(6, 'days'),                   moment().subtract(0, 'days').endOf('day')],
                'Last 30 Days': [moment().subtract(29, 'days'),                  moment().subtract(0, 'days').endOf('day')],
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

        $scope.redirectScheduledEditor = function(){
            //calculateReportParams();
            $scope.applyFilterParams();
            $scope.loadIntialReportData();
            //$location.url($location.path()+'?'+$.param($scope.urlParams));
        };

        $scope.currentPage  = 1;

        $scope.groupActivityMapping.summaryGridMapping = {
            total_calls:  "Total Calls (GMT)",
            bill_minutes: "Billable Minutes (GMT)",
            total_leads:  "Total Leads",
            conversion:   "Conversions",
            call_value:   "Total Call Value",
            unique_calls: "Unique Calls"
        };

        $scope.groupActivityMapping.secondaryGrouping = [
            { label: "none",   val: "None" },
            { label: "call_flow", val: "Tracking Number" },
            { label: "campaign", val: "Campaign" }
        ];

        $scope.groupActivityMapping.secondaryGroupingColumn = {
            call_flow: ["call_flow", "tracking_num"],
            campaign: ["campaign", "camp_ext_id"]
        };

        $scope.groupActivityMapping.secondaryGroupingAdFiter = {
            call_flow: "inputText",
            tracking_num: "inputText",
            campaign: "inputText",
            camp_ext_id: "inputText"
        };

        // $scope.groupActivityMapping.visibleColumns = $scope.groupActivityMapping.cloneVisibleColumns;
        $scope.groupActivityMapping.secondaryGroupingHref = {
           none: '',
           call_flow: "pr.provisioned_route_name",
           campaign: "c.campaign_name"
        };

        $scope.emptyAsZero = function(number){
            if(number === undefined || number === null) { return 0 ;}
            return number;
        };

        $scope.groupActivityMapping.hrefClickableMethod = function(secondary, org_unit_name, secondaryGroupingKey, secondaryGroupingValue) {
            var href = "#/calls-details?filtertype=a&filter=ou.org_unit_name,=,"+encodeURIComponent(org_unit_name)+",";
            console.log(secondary, secondaryGroupingKey, secondaryGroupingValue);
            if(secondary !== 'none'){
                href = href + "," + secondaryGroupingKey + ",=," + secondaryGroupingValue + ",AND";
            }
            $window.open(encodeURI(href));
        };
        if($scope.is_migrated === true || $scope.is_migrated === 'true'){     
            $scope.groupActivityMapping.gridBackendPropertyNames = {
                ouid:               "org_unit_id",
                group:              "org_unit_name",
                ext_id:             "org_unit_ext_id",
                call_flow:          "call_flow",
                tracking_num:       "tracking_number",
                calls:              "total_calls",
                call_value:         "call_value",
                unique:             "unique_calls",
                voice_mail:         "voicemail",
                answered:           "answered",
                billable_mintes:    "billable_mintes",
                conversion:         "conversion",
                campaign:           "campaign_name",
                camp_ext_id:        "campaign_ext_id",
                leads:              "leads"
            };
            $scope.groupActivityMapping.dataTableHeaderValues = {
                ouid:               "ID",
                group:              "Group",
                ext_id:             "Ext ID",
                // call_flow:          "Tracking Number",
                tracking_num:       "Tracking Number",
                calls:              "Calls (GMT)",
                billable_mintes:    "Billable Minutes (GMT)",
                conversion:         "Conversions",
                call_value:         "Call Value",
                unique:             "Unique",
                voice_mail:         "Voicemail",
                answered:           "Answered",
                campaign:           "Campaign",
                camp_ext_id:        "Campaign Ext ID",//campaign external id
                leads:              "Leads"
            };
            $scope.columnDefinitions = [
                new Column($scope.groupActivityMapping.dataTableHeaderValues.ouid, "ouid", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.group, "group", "dropdown"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.ext_id, "ext_id", "inputText"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.calls, "calls", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.billable_mintes, "billable_mintes", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.leads, "leads", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.conversion, "conversion", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.call_value, "call_value", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.unique, "unique", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.voice_mail, "voice_mail", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.answered, "answered", "inputNumber")
            ];
        }else{
            $scope.groupActivityMapping.gridBackendPropertyNames = {
                ouid:               "org_unit_id",
                group:              "org_unit_name",
                ext_id:             "org_unit_ext_id",
                call_flow:          "call_flow",
                tracking_num:       "tracking_number",
                calls:              "total_calls",
                call_value:         "call_value",
                unique:             "unique_calls",
                answered:           "answered",
                billable_mintes:    "billable_mintes",
                conversion:         "conversion",
                campaign:           "campaign_name",
                camp_ext_id:        "campaign_ext_id",
                leads:              "leads"
            };
    
            // // values displayed at top of columns
            $scope.groupActivityMapping.dataTableHeaderValues = {
                ouid:               "ID",
                group:              "Group",
                ext_id:             "Ext ID",
                // call_flow:          "Tracking Number",
                tracking_num:       "Tracking Number",
                calls:              "Calls (GMT)",
                billable_mintes:    "Billable Minutes (GMT)",
                conversion:         "Conversions",
                call_value:         "Call Value",
                unique:             "Unique",
                answered:           "Answered",
                campaign:           "Campaign",
                camp_ext_id:        "Campaign Ext ID",//campaign external id
                leads:              "Leads"
            };
    
    
            $scope.columnDefinitions = [
                new Column($scope.groupActivityMapping.dataTableHeaderValues.ouid, "ouid", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.group, "group", "dropdown"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.ext_id, "ext_id", "inputText"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.calls, "calls", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.billable_mintes, "billable_mintes", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.leads, "leads", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.conversion, "conversion", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.call_value, "call_value", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.unique, "unique", "inputNumber"),
                new Column($scope.groupActivityMapping.dataTableHeaderValues.answered, "answered", "inputNumber")
            ];
        }
        GroupActivitySettingsReportWebservices.getAllOus().then(function (response) {
            if (response.data.result != 'error') {
               var a = JSON.stringify(response.data.json);
               _.each(response.data.json,function(ous){
                    var temphash = {};
                    temphash.key = ous.org_unit_id;
                    temphash.value = ous.org_unit_name;
                    $scope.ouList.push(temphash);
               });
            } else {
                return console.log("Error in ", "CallFlowSettingsReportWebService.getAllOus SUCCESS callback");
            }
        });

        $scope.$watch('ouList', function(newVal) {
            if(newVal) {
                 $scope.columnDefinitions[1].options = $scope.ouList;
            }
        },true);

        $scope.loadIntialReportData = function() {
            if($rootScope.download_audio_enabled === false){
                return;
            }
			progressLoader.set( 50 );
            var summaryGridDataTemp, dataTableDataTemp;
            if($scope.is_migrated === true || $scope.is_migrated === 'true'){
                $scope.groupActivityMapping.visibleColumns = [
                    { key: "ouid", visible: true, disabled: false},
                    { key: "group", visible: true, disabled: false},
                    { key: "ext_id", visible: true, disabled: false},
                    { key: "campaign", visible: false, disabled: true},
                    { key: "camp_ext_id", visible: false, disabled: true},
                    { key: "tracking_num", visible: false, disabled: true},
                    { key: "calls", visible: true, disabled: false},
                    { key: "billable_mintes", visible: true, disabled: false},
                    { key: "leads", visible: true, disabled: false},
                    { key: "conversion", visible: true, disabled: false},
                    { key: "call_value", visible: true, disabled: false},
                    { key: "unique", visible: true, disabled: false},
                    { key: "voice_mail", visible: true, disabled: false},
                    { key: "answered", visible: true, disabled: false}
                ];
            }else{
                $scope.groupActivityMapping.visibleColumns = [
                    { key: "ouid", visible: true, disabled: false},
                    { key: "group", visible: true, disabled: false},
                    { key: "ext_id", visible: true, disabled: false},
                    { key: "campaign", visible: false, disabled: true},
                    { key: "camp_ext_id", visible: false, disabled: true},
                    { key: "tracking_num", visible: false, disabled: true},
                    { key: "calls", visible: true, disabled: false},
                    { key: "billable_mintes", visible: true, disabled: false},
                    { key: "leads", visible: true, disabled: false},
                    { key: "conversion", visible: true, disabled: false},
                    { key: "call_value", visible: true, disabled: false},
                    { key: "unique", visible: true, disabled: false},
                    { key: "answered", visible: true, disabled: false}
                ];
            }

            if ($scope.urlParams.secondary !== "none"){
                var secVcCol;
                var secColumns = $scope.groupActivityMapping.secondaryGroupingColumn[$scope.urlParams.secondary];

                _.map(secColumns, function(secCol){
                    secVcCol = _.find($scope.groupActivityMapping.visibleColumns, function(vcCol){ return vcCol.key === secCol; });
                    $scope.groupActivityMapping.visibleColumns[_.findLastIndex($scope.groupActivityMapping.visibleColumns, secVcCol)].visible = true;
                    $scope.groupActivityMapping.visibleColumns[_.findLastIndex($scope.groupActivityMapping.visibleColumns, secVcCol)].disabled = false;
                    var newColumn = new Column($scope.groupActivityMapping.dataTableHeaderValues[secCol], secCol, $scope.groupActivityMapping.secondaryGroupingAdFiter[secCol]);
                    if(secCol === "call_flow" || secCol === "campaign")
                        $scope.columnDefinitions.splice(3, 0, newColumn);
                    else
                        $scope.columnDefinitions.splice(4, 0, newColumn);
                });
            }

            GroupActivitySettingsReportWebservices.groupActivitySummary($.param($scope.urlParams)).then(function (response) {
				if (dataTableDataTemp) {
					$scope.summaryGridData = response.data.json[0];
					$scope.dataTableData = dataTableDataTemp;
					$scope.finishLoadingDataSet();
				} else {
					summaryGridDataTemp = response.data.json[0];
				}
            });

            GroupActivitySettingsReportWebservices.getDataTableInfo($.param($scope.urlParams)).then(function (response) {
                $scope.totalDataRows = response.data.json.length === 0 ? 0 : response.data.json[0].totalrecords;
				if (summaryGridDataTemp) {
					$scope.dataTableData = numberPoolFiltering(response.data.json);
					$scope.summaryGridData = summaryGridDataTemp;
                    $scope.finishLoadingDataSet();
                    $scope.isLoadingApi=false;
				} else {
                    dataTableDataTemp = numberPoolFiltering(response.data.json);
                    $scope.isLoadingApi=false;
				}
            });
        };

        $scope.updateTheDataTableBasedOnQuertString = function() {
			progressLoader.set( 75 );
			var summaryGridDataTemp, dataTableDataTemp;

            console.log('starting updateTheDataTableBasedOnQuertString');
			GroupActivitySettingsReportWebservices.groupActivitySummary($.param($scope.urlParams)).then(function (response) {
				if (dataTableDataTemp) {
					$scope.summaryGridData = response.data.json[0];
					$scope.dataTableData = dataTableDataTemp;
					$scope.finishLoadingDataSet();
				} else {
					summaryGridDataTemp = response.data.json[0];
				}
            });

            GroupActivitySettingsReportWebservices.getDataTableInfo($.param($scope.urlParams)).then(function (response) {
                $scope.totalDataRows = response.data.json.length === 0 ? 0 : response.data.json[0].totalrecords;
				if (summaryGridDataTemp) {
					$scope.dataTableData = numberPoolFiltering(response.data.json);
					$scope.summaryGridData = summaryGridDataTemp;
					$scope.finishLoadingDataSet();
				} else {
					dataTableDataTemp = numberPoolFiltering(response.data.json);
				}
            });
        };

		$scope.finishLoadingDataSet = function() {
			$scope.hideDataTable = false;
			$scope.hidePaginationControls = false;
			progressLoader.end();

			setTimeout(function() {
				$scope.horsemanFlag = true;
			}, 1000);

			if ($scope.totalDataRows > 0) {
				$scope.showActualEportLink = true;
				$scope.showExportErrorLink = false;
			} else {
				$scope.showActualEportLink = false;
				$scope.showExportErrorLink = true;
			}

			if ($scope.showAdvFilter === true && $scope.advFilterDefinitions.length > 0) {
				if ($scope.advFilterDefinitions[0].user_input || $scope.advFilterDefinitions[0].user_input === 0) {
					$scope.filterApplied = true;
				}
			} else if ($scope.simpleSearchFilter.length > 0) {
				$scope.filterApplied = true;
			}
		};

        function numberPoolFiltering(data){
            _.map(data, function(dt) {
                if (dt.tracking_number === null)
                    dt.tracking_number = "Number Pool";
            });
            return data;
        }

        $scope.changeDateRange = function () {
			progressLoader.start();
			$scope.horsemanFlag = false;
			$scope.filterApplied = false;
			$scope.filterReset();
			$window.sessionStorage.report_start_date = $scope.drp_start;
			$window.sessionStorage.report_end_date = $scope.drp_end;
			setTimeout(function() {
				progressLoader.set( 25 );
				$scope.applyFilter();
			}, 1);
        };

        $scope.changeSecondaryGrouping = function (secGroup) {
            advFilSrvc.resetAdvFilter();
            $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
            $scope.showAdvFilter = false;
            $scope.simpleFilterText = '';
            $scope.filtertype = 's';
            $scope.applyFilter();
        };

        $scope.pageChanged = function(newPage) {
			progressLoader.start();
			$scope.horsemanFlag = false;
			$scope.filterApplied = false;
			$scope.filterReset();
            $scope.urlParams.offset = ($scope.pageSize * (newPage - 1));
			setTimeout(function() {
				$scope.updateTheDataTableBasedOnQuertString();
				progressLoader.set( 50 );
			}, 1);
        };

        $scope.changeReportParams = function (paramTypeToChange, extraData) {
			$scope.horsemanFlag = false;
			$scope.filterApplied = false;
			$scope.filterReset();
            $scope.applyFilter();
			setTimeout(function() {
				$scope.updateTheDataTableBasedOnQuertString();
			}, 1);
        };

        function calculateReportParams() {
            console.log('starting calculateReportParams');
            $scope.applyFilterParams();
            //$scope.urlParams = {}; // reset the variable to blank
            //$rootScope.$broadcast('start_url_assembly', 'blank');

            return $scope.urlParams;
        }

        $scope.notSorted = function(obj){
            if (!obj) { return []; }
            return Object.keys(obj);
        };

        $scope.getCSVData = function (formate) {
            $scope.limit = 100000;
            $scope.exportData = true;
            var rowsOfData = [];

            var columnsToUse = _.filter($scope.groupActivityMapping.visibleColumns, function (vc) { return vc.disabled === false; });
            $scope.headerNames = _.map(columnsToUse, function (ctu) { return $scope.groupActivityMapping.dataTableHeaderValues[ctu.key] === "ID" ? "'ID" : $scope.groupActivityMapping.dataTableHeaderValues[ctu.key]; });

            var deferred = $q.defer();
            var result = generateExportData();

            result.then(function (response){
                rowsOfData = finalizaDataToExport(response.data.json);
                deferred.resolve(rowsOfData);
                if($rootScope.isSafari){
          		    var reportName = "csv_groupActivityReport";
          		    if(formate === 'tsv'){ reportName = "tsv_groupActivityReport";}
          		    deferred.resolve(JSONToCSVConvertor(rowsOfData,reportName,true,formate));
          		  }
            });
      		if(!$rootScope.isSafari){
      		    return deferred.promise;
      		}

        };

        $scope.getCSVDataReports = function () {
            $scope.limit = 50000;
            $scope.exportData = true;
            var rowsOfData = [];

            var columnsToUse = _.filter($scope.groupActivityMapping.visibleColumns, function (vc) { return vc.disabled === false; });
            $scope.csvHeaderNames = _.map(columnsToUse, function (ctu) { return $scope.groupActivityMapping.dataTableHeaderValues[ctu.key] === "ID" ? "'ID" : $scope.groupActivityMapping.dataTableHeaderValues[ctu.key]; });

            var deferred = $q.defer();
            var result = generateExportData();

            result.then(function (response){
                rowsOfData = finalizaDataToExport(response.data.json);
                deferred.resolve(rowsOfData);
                $scope.csvDataScheduleReport = rowsOfData;
            });
            return deferred.promise;
        };

        $scope.getExcelData = function () {
            var rowsOfData = [];

            var columnsToUse = _.filter($scope.groupActivityMapping.visibleColumns, function (vc) { return vc.disabled === false; });

            $scope.headerNames = _.map(columnsToUse, function (ctu) { return $scope.groupActivityMapping.dataTableHeaderValues[ctu.key] === "ID" ? "'ID" : $scope.groupActivityMapping.dataTableHeaderValues[ctu.key]; });

            var deferred = $q.defer();
            var result = generateExportData();

            result.then(function (response){
                rowsOfData = finalizaDataToExport(response.data.json);
                alasql('SELECT * INTO XLSX("xls_data_table.xlsx",{sheetid:"Sheet name",headers:true}) FROM ?',[rowsOfData]);
                deferred.resolve();
                deferred.resolve(rowsOfData);
            });
            return deferred.promise;
        };

        function finalizaDataToExport(rawData) {
            var rowsOfData = [];

            var finalizeFunctions = {
                none:finalizeDataForPrimaryGrouping,
                call_flow: finalizeDataForCallFlows,
                campaign: finalizeDataForCampaigns
            };
            var grouping = ($scope.secondary === undefined || $scope.secondary.length === 0) ? "none" : $scope.secondary;
            rowsOfData = finalizeFunctions[grouping](rawData);
            return rowsOfData;
        }

        function generateExportData(){
            //var urlParams = calculateReportParams();
            // $scope.applyFilterParams();
            $scope.urlParams.exportData = true;
            $scope.urlParams.limit = 100000;
            return GroupActivitySettingsReportWebservices.getDataTableInfo($.param($scope.urlParams));
        }

        function finalizeDataForPrimaryGrouping(rawData) {
            var rowsOfData = [];
            _.each(rawData, function (data) {
                if($scope.is_migrated === true || $scope.is_migrated === 'true'){  
                    rowsOfData.push({
                        "'ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ouid],
                        "Group" : data[$scope.groupActivityMapping.gridBackendPropertyNames.group],
                        "Ext ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ext_id],
                        "Calls (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.calls],
                        "Billable Minutes (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.billable_mintes],
                        "Leads" : data[$scope.groupActivityMapping.gridBackendPropertyNames.leads],
                        "Conversions" : data[$scope.groupActivityMapping.gridBackendPropertyNames.conversion],
                        "Call Value" : data[$scope.groupActivityMapping.gridBackendPropertyNames.call_value],
                        "Unique" : data[$scope.groupActivityMapping.gridBackendPropertyNames.unique],
                        "Voicemail" : data[$scope.groupActivityMapping.gridBackendPropertyNames.voice_mail],
                        "Answered" : data[$scope.groupActivityMapping.gridBackendPropertyNames.answered],
                    });
                }else{
                    rowsOfData.push({
                        "'ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ouid],
                        "Group" : data[$scope.groupActivityMapping.gridBackendPropertyNames.group],
                        "Ext ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ext_id],
                        "Calls (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.calls],
                        "Billable Minutes (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.billable_mintes],
                        "Leads" : data[$scope.groupActivityMapping.gridBackendPropertyNames.leads],
                        "Conversions" : data[$scope.groupActivityMapping.gridBackendPropertyNames.conversion],
                        "Call Value" : data[$scope.groupActivityMapping.gridBackendPropertyNames.call_value],
                        "Unique" : data[$scope.groupActivityMapping.gridBackendPropertyNames.unique],
                        "Answered" : data[$scope.groupActivityMapping.gridBackendPropertyNames.answered],
                    });
                }
            });
            return rowsOfData;
        }

        function finalizeDataForCallFlows(rawData) {
            var rowsOfData = [];
            _.each(rawData, function (data) {
                if($scope.is_migrated === true || $scope.is_migrated === 'true'){ 
                    rowsOfData.push({
                        "'ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ouid],
                        "Group" : data[$scope.groupActivityMapping.gridBackendPropertyNames.group],
                        "Ext ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ext_id],
                        "Traking Number" : (data[$scope.groupActivityMapping.gridBackendPropertyNames.tracking_num] === null ? "Number Pool" : data[$scope.groupActivityMapping.gridBackendPropertyNames.tracking_num]),
                        "Calls (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.calls],
                        "Billable Minutes (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.billable_mintes],
                        "Leads" : data[$scope.groupActivityMapping.gridBackendPropertyNames.leads],
                        "Conversions" : data[$scope.groupActivityMapping.gridBackendPropertyNames.conversion],
                        "Call Value" : data[$scope.groupActivityMapping.gridBackendPropertyNames.call_value],
                        "Unique" : data[$scope.groupActivityMapping.gridBackendPropertyNames.unique],
                        "Voicemail" : data[$scope.groupActivityMapping.gridBackendPropertyNames.voice_mail],
                        "Answered" : data[$scope.groupActivityMapping.gridBackendPropertyNames.answered],
                    });
                }else{
                    rowsOfData.push({
                        "'ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ouid],
                        "Group" : data[$scope.groupActivityMapping.gridBackendPropertyNames.group],
                        "Ext ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ext_id],
                        "Traking Number" : (data[$scope.groupActivityMapping.gridBackendPropertyNames.tracking_num] === null ? "Number Pool" : data[$scope.groupActivityMapping.gridBackendPropertyNames.tracking_num]),
                        "Calls (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.calls],
                        "Billable Minutes (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.billable_mintes],
                        "Leads" : data[$scope.groupActivityMapping.gridBackendPropertyNames.leads],
                        "Conversions" : data[$scope.groupActivityMapping.gridBackendPropertyNames.conversion],
                        "Call Value" : data[$scope.groupActivityMapping.gridBackendPropertyNames.call_value],
                        "Unique" : data[$scope.groupActivityMapping.gridBackendPropertyNames.unique],
                        "Answered" : data[$scope.groupActivityMapping.gridBackendPropertyNames.answered],
                    });
                }
            });
            return rowsOfData;
        }

        function finalizeDataForCampaigns(rawData) {
            var rowsOfData = [];
            _.each(rawData, function (data) {
                if($scope.is_migrated === true || $scope.is_migrated === 'true'){ 
                    rowsOfData.push({
                        "'ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ouid],
                        "Group" : data[$scope.groupActivityMapping.gridBackendPropertyNames.group],
                        "Ext ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ext_id],
                        "Campaign" : data[$scope.groupActivityMapping.gridBackendPropertyNames.campaign],
                        "Campaign Ext ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.camp_ext_id],
                        "Calls (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.calls],
                        "Billable Minutes (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.billable_mintes],
                        "Leads" : data[$scope.groupActivityMapping.gridBackendPropertyNames.leads],
                        "Conversions" : data[$scope.groupActivityMapping.gridBackendPropertyNames.conversion],
                        "Call Value" : data[$scope.groupActivityMapping.gridBackendPropertyNames.call_value],
                        "Unique" : data[$scope.groupActivityMapping.gridBackendPropertyNames.unique],
                        "Voicemail" : data[$scope.groupActivityMapping.gridBackendPropertyNames.voice_mail],
                        "Answered" : data[$scope.groupActivityMapping.gridBackendPropertyNames.answered]
                    });
                }else{
                    rowsOfData.push({
                        "'ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ouid],
                        "Group" : data[$scope.groupActivityMapping.gridBackendPropertyNames.group],
                        "Ext ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.ext_id],
                        "Campaign" : data[$scope.groupActivityMapping.gridBackendPropertyNames.campaign],
                        "Campaign Ext ID" : data[$scope.groupActivityMapping.gridBackendPropertyNames.camp_ext_id],
                        "Calls (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.calls],
                        "Billable Minutes (GMT)" : data[$scope.groupActivityMapping.gridBackendPropertyNames.billable_mintes],
                        "Leads" : data[$scope.groupActivityMapping.gridBackendPropertyNames.leads],
                        "Conversions" : data[$scope.groupActivityMapping.gridBackendPropertyNames.conversion],
                        "Call Value" : data[$scope.groupActivityMapping.gridBackendPropertyNames.call_value],
                        "Unique" : data[$scope.groupActivityMapping.gridBackendPropertyNames.unique],
                        "Answered" : data[$scope.groupActivityMapping.gridBackendPropertyNames.answered]
                    });
                }
            });
            return rowsOfData;
        }

        // ***** begin NECESSARY CODE FOR ADV FILTER TO WORK *******************
        $scope.preloading = false;
        $scope.showAdvFilter = false;
        $scope.advancedFilterConfig = { maxQuantity: 5 };

        $scope.extendUrlParams = function(urlParams) {
            if (urlParams.vars.filtertype === 's' && $scope.simpleSearchFilter === '') {
                $scope.simpleSearchFilter = urlParams.vars.filter;
            }
            $scope.urlParams = urlParams.vars;
            angular.extend($scope, urlParams.vars);
            delete urlParams.vars;
            angular.extend($scope, urlParams);
        };

        $scope.getInitialUrlParams = function() {
            advFilSrvc.determineInitializationMethod($scope).then(function(r) {
                $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
                if ($scope.advFilterDefinitions.length > 0 && $scope.advFilterDefinitions[0].selected_column) {
                    $scope.showAdvFilter = true;
                }
				$scope.extendUrlParams(r);
                $scope.loadIntialReportData();
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
            var urlParams = advFilSrvc.applyFilter($scope);
			if (urlParams) {
				$scope.extendUrlParams(urlParams);
                return true;
			}

            return false;
        };

        $scope.applyFilter = function() {
            $scope.horsemanFlag = false;
            var noErrors = $scope.applyFilterParams();
            if (noErrors) {
                $scope.loadIntialReportData();
            }
        };

        $scope.filterReset = function() {
            advFilSrvc.resetAdvFilter();
            $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
            $scope.showAdvFilter = false;
            $scope.simpleFilterText = '';
            $scope.filtertype = 's';
            $scope.filter = '';
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

    }]);
}());
