//jshint ignore:start
(function () {

    

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


    angular.module('campaign_list', [])

    .controller('CampaignsListController', ['$scope', '$http', '$routeParams','$compile','CampaignListWebservices', 'VoicePromptService','WhisperMessageService','$window', '$rootScope', 'GroupActivitySettingsReportWebservices', '$location', 'pinesNotifications', "DateRangeFiller", "$q", "paginationService","progressLoader","$bootbox",'$route',
    function ($scope, $http, $routeParams,$compile, CampaignListWebservices,voicePromptService, whispermessageService, $window, $rootScope,GroupActivitySettingsReportWebservices, $location, pinesNotifications, DateRangeFiller, $q, paginationService, progressLoader, $bootbox,$route) {
        'use strict';

        var showSpamIcon = false;
         $scope.isLoadingApi = true;

        if ($scope.userAccess && $scope.userAccess.spamguard) {
            showSpamIcon = true
        }
        if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true'){
            $scope.is_migrated = true;
        }else{
            $scope.is_migrated = false;
        }
        
        $scope.collasped = true;
        //$scope.expand = false;
        $scope.hidePaginationControls = false;
        $scope.currentPaginationId = 'campaign-list';
        $scope.hideDataTable = false;
        $scope.filterApplied = false;
        $scope.horsemanFlag = false;
        $scope.simpleSearchFilter = "";
        $scope.searchLoading = false;
        $scope.report = $location.search().report;
        $scope.CurrentOUName = $rootScope.currentOUName;
        if($rootScope.currentOUName.length > 50){
            $scope.reportName = $scope.CurrentOUName.slice(0,50) + " groups campaigns tracking numbers list "+ moment().format('YYYY-MM-DD');
        }else{
        $scope.reportName = $scope.CurrentOUName + " groups campaigns tracking numbers list "+ moment().format('YYYY-MM-DD');
        }
        $scope.CurrentOUNameCSV = $scope.reportName + ".csv";
        $scope.CurrentOUNameTSV = $scope.reportName + ".tsv";
        $scope.drp_start = moment().subtract(7, 'days').format('MMMM D, YYYY');
        $scope.drp_end = moment().subtract(1, 'days').endOf('day');
        $scope.preview = ($location.search().preview ? $location.search().preview : false);
        if ($location.search().preview) {
            $("#wrap").append('<div id="previewBlock">&nbsp;</div>');
        }
//        $rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);

        var sessionParams = {};
        var currentCampaign={};
        $scope.roleId = $rootScope.roleId;
        $scope.reportTitle = "Campaigns";
        $scope.groupActivityMapping = {};
        $scope.secondary;
        $scope.pageSize = 100;
        $scope.offset = 0;
        $scope.showActualEportLink = false;
        $scope.showExportErrorLink = true;
        $scope.ouList = [];
        $scope.whichScheduleReport = 'none';
        $scope.onGoingRequests = [];
        $scope.applyExpand = false;
        $scope.showMasterExpand = false;
        $scope.callflowDataInProcess = false;
        //$scope.totalDataRows = 0;
        $scope.resizeWindow = function () {
          setTimeout(function() {
            $(window).trigger('resize');
          }, 100);
        };
        var blkstr = {};

      
        $scope.currentPage  = 1;

        $scope.groupActivityMapping.hrefClickableMethod = function(secondary, org_unit_name, secondaryGroupingKey, secondaryGroupingValue) {
            var href = "#/calls-details?filtertype=a&filter=ou.org_unit_name,=,"+encodeURIComponent(org_unit_name)+",";
            console.log(secondary, secondaryGroupingKey, secondaryGroupingValue);
            if(secondary !== 'none'){
                href = href + "," + secondaryGroupingKey + ",=," + secondaryGroupingValue + ",AND";
            }
            $window.open(encodeURI(href));
        };

        $scope.groupActivityMapping.gridBackendPropertyNames = {
            //ouid:               "organizational_unit_id",
            camp_ext_id:        "camp_ext_id",
            camp_name:          "name",
            start_date:          "start_date",
            end_date:           "end_date",
            tracking_quantity:   "quantity",
            status:             "status",
            actions:            "actions",
            ad_source:          "ad_source",
            call_value:         "call_value",
            custom_parameters:  "custom_parameters",
            custom_source_1:    "custom_source_1",
            custom_source_2:    "custom_source_2",
            custom_source_3:    "custom_source_3",
            custom_source_4:    "custom_source_4",
            custom_source_5:    "custom_source_5",
            dni:                "dni",
            dni_type:           "dni_type",
            host_domain:        "host_domain",
            html_class:         "html_class",
            play_disclaimer:    "play_disclaimer",
            pre_call_webhook:   "pre_call_webhook",
            record_call:        "record_call",
            referring_website:  "referring_website",
            repeat_interval:    "repeat_interval",
            ring_to_number:     "ring_to_number",
            spam_guard:         "spam_guard",
            tracking:           "tracking",
            tracking_number_name:    "tracking_number_name",
            tracking_number_status:  "tracking_number_status",
            tracking_number_type:    "tracking_number_type",
            voice_prompt:            "voice_prompt",
            whisper_message:         "whisper_message",
            callflow_action:         "callflow_action",
	    action:                 "action",
            vm_enabled:		"vm_enabled",
            sms_enabled:		"sms_enabled"
        };

        // // values displayed at top of columns
        $scope.groupActivityMapping.dataTableHeaderValues = [
            //{key:"ouid",value:"" , disable : false},
            
            {key:"camp_name", value:"Campaign ", disable : false},
            {key:"camp_ext_id", value:"Campaign External ID" , disable : false},
            {key:"start_date", value:"Campaign Start", disable : false},
            {key:"end_date", value:  "Campaign End", disable : false},
            {key:"status", value: "Campaign Status", disable : false},
            {key:"tracking_quantity", value:"Tracking Number Quantity", disable : false},
            //{key:"actions", value:"Actions", disable : false},
            {key:"tracking_number_name", value:"Tracking Number Name", disable : false},
            {key:"ad_source", value:"Ad Source", disable : false},
            {key:"call_value", value:"Call Value", disable : false},
            {key:"custom_parameters", value:"Custom Parameters", disable : false},
            {key:"custom_source_1", value:"Custom Source 1", disable : false},
            {key:"custom_source_2", value:"Custom Source 2", disable : false},
            {key:"custom_source_3", value:"Custom Source 3", disable : false},
            {key:"custom_source_4", value:"Custom Source 4", disable : false},
            {key:"custom_source_5", value:"Custom Source 5", disable : false},
            {key:"dni", value:"DNI", disable : false},
            {key:"dni_type", value:"DNI Type", disable : false},
            {key:"host_domain", value:"Host Domain", disable : false},
            {key:"html_class", value:"HTML Class", disable : false},
            {key:"play_disclaimer", value:"Play Disclaimer", disable : false},
            {key:"pre_call_webhook", value:"Pre Call Webhook", disable : false},
            {key:"record_call", value:"Record Call", disable : false},
            {key:"referring_website", value:"Referring Website", disable : false},
            {key:"repeat_interval", value:"Repeat Interval", disable : false},
            {key:"ring_to_number", value:"Ring TO", disable : false},
            {key:"spam_guard", value:"Spam Guard", disable : false},
            {key: "tracking", value:"Tracking Number", disable : false},
            {key:"tracking_number_status", value:"Tracking Number Status", disable : false},
            {key:"tracking_number_type", value:"Tracking Number Type", disable : false},
            {key:"instant_insights", value:"Instant Insights", disable : false},
            {key:"instant_insights_config", value:"Instant Insights Config", disable : false},
            {key:"hunt_type", value:"Hunt Type", disable : false},
            {key:"voice_prompt", value:"Voice Prompt", disable : false},
            {key:"whisper_message", value:"Whisper Message" , disable : false},
            {key:"callflow_action", value:"Actions" , disable : true},
			{key:"action", value:"Actions", disable : true},
			{key:"vm_enabled", value:"vm_enabled", disable : false}
		];


        $scope.groupActivityMapping.callFlowdataTableHeaderValues = [
            {key:"tracking", value:"Tracking Number"},
            {key:"tracking_number_name", value:"Tracking Number Name"},
            {key:"ring_to_number", value:"Ring-to Phone Number"},
            {key:"tracking_number_type", value:"Tracking Number Type"},
            {key:"instant_insights", value:"Instant Insights"},
            {key:"instant_insights_config", value:"Instant Insights Config"},
            {key:"hunt_type", value:"Hunt Type"},
            {key:"spam_guard", value:"Spam Guard"},
            {key:"tracking_number_status", value:"Tracking Number Status"},
			{key:"call_value", value:"Call Value"},
            {key:"repeat_interval", value:"Repeat Interval"},
			{key:"ad_source", value:"Ad Source"},
			{key:"vm_enabled", value:"Voicemail"},
            {key:"custom_source_1", value:"Custom Source 1"},
            {key:"custom_source_2", value:"Custom Source 2"},
            {key:"custom_source_3", value:"Custom Source 3"},
            {key:"custom_source_4", value:"Custom Source 4"},
            {key:"custom_source_5", value:"Custom Source 5"},
            {key:"record_call", value:"Record Call"},
            {key:"play_disclaimer", value:"Play Disclaimer"},
            {key:"voice_prompt", value:"Voice Prompt"},
            {key:"whisper_message", value:"Whisper Message"},
            {key:"dni", value:"DNI"},
            {key:"dni_type", value:"DNI Type"},
            {key:"host_domain", value:"Host Domain"},
            {key:"referring_website", value:"Referring Website"},
            {key:"html_class", value:"HTML Class"},
            {key:"custom_parameters", value:"Custom Parameters"},
            {key:"pre_call_webhook", value:" Pre-call Webhook"},
			{key: "callflow_action", value:"Actions"}
            ];

            $scope.groupActivityMapping.visibleColumns = [
                
                //{ key: "ouid", visible: true, truncate: false , disable : true, callFlow : false, value:"OUID"  },
                { key: "ad_source", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Ad Source"},
				{ key: "call_value", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Call Value"},
                { key: "camp_name", visible: true, truncate: false , disable : false, callFlow : false, show: true, value:"Campaign "},
                { key: "camp_ext_id", visible: true, truncate: false , disable : false, callFlow : false, show: true, value:"Campaign External ID"},
                { key: "start_date", visible: true, truncate: false , disable : false, callFlow : false, show: true, value:"Campaign Start"},
                { key: "end_date", visible: true, truncate: false , disable : false , callFlow : false, show: true, value:  "Campaign End"},
                { key: "status", visible: true, truncate: false , disable : false, callFlow : false, show: true, value: "Campaign Status"},
                { key: "custom_parameters", visible: false, truncate: false , disable : false, callFlow : true,show: true,  value:"Custom Parameters"},
                { key: "custom_source_1", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Custom Source 1"},
                { key: "custom_source_2", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Custom Source 2"},
                { key: "custom_source_3", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Custom Source 3"},
                { key: "custom_source_4", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Custom Source 4"},
                { key: "custom_source_5", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Custom Source 5"},
                { key: "dni", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"DNI"},
                { key: "dni_type", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"DNI Type"},
                { key: "host_domain", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Host Domain"},
                { key: "html_class", visible: false, truncate: false , disable : false , callFlow : true, show: true, value:"HTML Class"},
                { key: "play_disclaimer", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Play Disclaimer"},
                { key: "pre_call_webhook", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Pre-call Webhook"},
                { key: "record_call", visible: false, truncate: false , disable : false , callFlow : true, show: true, value:"Record Call"},
                { key: "referring_website", visible: false, truncate: false , disable : false , callFlow : true, show: true, value:"Referring Website"},
				{ key: "repeat_interval", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Repeat Interval"},
                { key: "ring_to_number", visible: true, truncate: false , disable : false, callFlow : true, show: true, value:"Ring-to Phone Number" },
                { key: "spam_guard", visible: true, truncate: false , disable : false , callFlow : true, show: true, value:"Spam Guard" },
                { key: "tracking", visible: true, truncate: false , disable : false , callFlow : true, show: true, value:"Tracking Number" },
                { key: "tracking_number_name", visible: true, truncate: false , disable : false , callFlow : true, show: true, value:"Tracking Number Name"},
                { key: "tracking_quantity", visible: true, truncate: false , disable : false, callFlow : false, show: true, value:"Tracking Number Quantity"},
                { key: "tracking_number_status", visible: true, truncate: false , disable : false , callFlow : true, show: true, value:"Tracking Number Status"},
                { key: "tracking_number_type", visible: true, truncate: false , disable : false, callFlow : true, show: true, value:"Tracking Number Type"},
                { key: "instant_insights", visible: false, truncate: false , disable : false, callFlow : true, show: $scope.is_migrated, value:"Instant Insights" },
                { key: "instant_insights_config", visible: false, truncate: false , disable : false, callFlow : true, show: $scope.is_migrated, value:"Instant Insights Config" },
                { key: "hunt_type", visible: false, truncate: false , disable : false, callFlow : true, show: $scope.is_migrated, value:"Hunt Type" },
				{ key: "voice_prompt", visible: false, truncate: false , disable : false , callFlow : true, show: true, value:"Voice Prompt"},
                { key: "vm_enabled", visible: false, truncate: false , disable : false, callFlow : true, show: $scope.is_migrated, value:"Voicemail"},
                { key: "whisper_message", visible: false, truncate: false , disable : false, callFlow : true, show: true, value:"Whisper Message"},
                { key: "callflow_action", visible: true, truncate: false , disable : true, callFlow : true, show: true, value:"Actions"},
				{ key: "action", visible: true, truncate: false , disable : true, callFlow : false, show: true, value:"Actions" }
            ];
        
        if(($rootScope.is_migrated === true || $rootScope.is_migrated === 'true')){
            var spamIndexDataTable = $scope.groupActivityMapping.dataTableHeaderValues.findIndex(function(obj, index, arr){
                return obj.key === 'spam_guard';
            });
            if(spamIndexDataTable > -1){
                $scope.groupActivityMapping.dataTableHeaderValues.splice(spamIndexDataTable + 1,0,
                    {key:"sms_enabled", value:"SMS", disable : false}
                ); 
            }
            var spamIndexHeaderValues = $scope.groupActivityMapping.callFlowdataTableHeaderValues.findIndex(function(obj, index, arr){
                return obj.key === 'spam_guard';
            });
            if(spamIndexHeaderValues > -1){
                $scope.groupActivityMapping.callFlowdataTableHeaderValues.splice(spamIndexHeaderValues + 1,0,
                    {key:"sms_enabled", value:"SMS"}
                ); 
            }
            var spamIndexVisibleColumns = $scope.groupActivityMapping.visibleColumns.findIndex(function(obj, index, arr){
                return obj.key === 'spam_guard';
            });
            if(spamIndexVisibleColumns > -1){
                $scope.groupActivityMapping.visibleColumns.splice(spamIndexVisibleColumns + 1, 0,
                    { key: "sms_enabled", visible: true, truncate: false , disable : false , callFlow : true, show: true, value:"SMS" }
                ); 
            }
        }
            
        $scope.loadIntialReportData = function(page) {
            //progressLoader.set( 75 );
            $scope.paginationHeader = "";
            
            $scope.searchLoadingText = "Loading Data...";
            // console.log($scope.onGoingRequests.length);
            var summaryGridDataTemp, dataTableDataTemp;

            
            // $(".pageProgressLoader").show();
            // $("#progressLoader").css("opacity","0");
            // $(".table>tbody>tr>td").css("border-top","none");
            if($scope.onGoingRequests.length < 2){
                
                CampaignListWebservices.getCampaigns($rootScope.currentOUId ,  $scope.userAccess.campaign, $rootScope.timezone, page, $scope.simpleSearchFilter).then(function (result) {
        
                    $scope.searchLoading = false;
                    if(result.data.err === "No Data Found"){
                        
                            //$scope.paginationHeader = "No Data Found";
                           $scope.dataTableData = undefined;
                           $scope.totalDataRows = 0; 
                           //$(".topPagination").hide();
                           $scope.isLoadingApi = false;
                           // $(".pageProgressLoader").hide();
                           // $("#progressLoader").css("opacity","1");
                           // $(".table>tbody>tr>td").css("border-top","1px solid #e9ecf0");
                           
                       
                        

                    }else{
                        if(result.data.json.campaigns.length > 0){
                            $scope.dataTableData = result.data.json.campaigns;
                            var campWithCallFlow = _.find($scope.dataTableData, function(row){ return row.provisioned_route_ids.length > 0; });
                            campWithCallFlow !== undefined ? $scope.showMasterExpand = true : $scope.showMasterExpand = false;

                            $scope.totalDataRows = parseInt(result.data.json.total);
                            $scope.paginationHeader = "Showing " + parseInt($scope.offset + 1) + " - " + parseInt($scope.offset + $scope.dataTableData.length) + " of " + $scope.totalDataRows;
                            $scope.onGoingRequests = [];
                            $scope.isLoadingApi = false;
                        
                            if($scope.applyExpand){
                                setTimeout(function() {
                                    $scope.collasped = !$scope.collasped;
                                    $scope.masterexpand(true);
                                  }, 100);
                               
                            }
    
                        }

                    }
                    
                });    
            }
            //                $scope.isLoadingApi=false;

            // $(".pageProgressLoader").hide();
            //            $("#progressLoader").css("opacity","1");
            //            $(".table>tbody>tr>td").css("border-top","1px solid #e9ecf0");

           
        };
            

        $scope.loadIntialReportData(1);

        $scope.reseticon = function(){
            $scope.collasped = true;
            //$scope.expand = false;
        };

        

        $scope.checkVisibleColumns = function (key){
                    var vckey = _.find($scope.groupActivityMapping.visibleColumns,function(vc){
                    var vckey1 = _.find($scope.groupActivityMapping.visibleColumns,function(vc){
                        return vc.callFlow === false;
                    });
                        if(vckey1.callFlow === false){    
                            return vc.key == key ;
                    }   
                  
                     });
            if(vckey !== undefined && vckey.callFlow === false){

                return vckey.visible;
            }


        };
        
        $scope.checkpicklist = function(key){

            var vckey = _.find($scope.groupActivityMapping.dataTableHeaderValues,function(vc){

                        return vc.key === key;
            });

            
            if(vckey !== undefined && (vckey.disable === false)){
                
                return vckey.value;

            }


        };
        

        $scope.getClass = function(vc){
            var className = '';
 
            if (vc.truncate)
                className += ' trunc';
 
            if (vc.customClass)
                className += ' headerActions';
 
            return className;
        };
 


        $scope.masterexpand = function(manuallyTrigger){
            
            var campaignIds = [];
            var CampIdIndexs = [];
            var subDataIsPresent = false;
            var subrowsHeader =  [];
            var allIndex = [];
            $scope.callflowDataInProcess = true;
            
            $( ".expand" ).each(function() {
                var campDetails = $( this ).attr('id');
                var data = {
                    index : campDetails.split("_")[2],
                    routeableId : campDetails.split("_")[1]
                };
                CampIdIndexs.push(data);
                allIndex.push(data);
                campaignIds.push(campDetails.split("_")[1]);
                //$scope.showSubData(data);

            
            });
            if($scope.collasped){
                $scope.applyExpand = true;
                CampaignListWebservices.getAllCampaignsCallFlow({campaign_ids: campaignIds}).then(function (result) {
                    $scope.callflowDataInProcess = false;
                    var prompts = voicePromptService.getPrompts();
                    var whispers = whispermessageService.getWhispers();
                    var filenames = [];
                    var whisper_filenames = []
                for(var k = 0; k < prompts.length ; k++){
                    filenames.push(prompts[k].filename);
                }
                for(var a = 0; a < whispers.length ; a++){
                    whisper_filenames.push(whispers[a].filename);
                }
                    for (var i = 0; i < campaignIds.length; i++) {
                        subDataIsPresent = false;
                        var dataIndex = _.find(CampIdIndexs, function(camoIndex){ return camoIndex.routeableId == campaignIds[i]; });
                        var trackingNumber = [];

                        var data = {
                            data : dataIndex
                        };

                        subrowsHeader = $scope.visiblecallFlow(allIndex[i]);
                       
                       
                        for (var j = 0; j < result.data.json.length; j++) {
                            if(result.data.json[j].campaign_id == campaignIds[i]){
                                subDataIsPresent = true;

                                if(result.data.json[j].voice_prompt && result.data.json[j].voice_prompt!= null){

                                    if((result.data.json[j].voice_prompt).includes('file://')){
                                      var str1 = (result.data.json[j].voice_prompt).split("file://")[1];
                                      var str2 = (str1).split(".")[0];
                                      
                                      
                                      for(var x = 0; x < prompts.length ; x++){
                                      var flag = filenames.includes(str2)
                                      if(flag === true || flag === 'true'){
                                          
                                              if(str2 === prompts[x].filename){
                                                  result.data.json[j].voice_prompt = prompts[x].name;
                                              }
                                          
                                    }else{
                                      result.data.json[j].voice_prompt = ''
                                    }
                                  }
                                  }else{
                                      var str = (result.data.json[j].voice_prompt).split("tts://")[1];
                                      result.data.json[j].voice_prompt = str
                                  }
                              }


                       if(result.data.json[j].whisper_message && result.data.json[j].whisper_message != null){
                        if((result.data.json[j].whisper_message).includes('file://')){
                            var str3 = (result.data.json[j].whisper_message).split("file://")[1];
                            var str4 = (str3).split(".")[0];
                            for(var y = 0; y < whispers.length ; y++){
                            var flag = whisper_filenames.includes(str4)
                            if(flag === true || flag === 'true'){
                                
                                    if(str4 === whispers[y].filename){
                                        result.data.json[j].whisper_message = whispers[y].name;
                                    }
                                
                          }else{
                            result.data.json[j].whisper_message = ''
                          }
                        }
                        }else{
                            var str5 = (result.data.json[j].whisper_message).split("tts://")[1];
                            result.data.json[j].whisper_message = str5
                        }
                       
                       }


                                $scope.displayCallFlow(allIndex[i],result.data.json[j], result.data.json, trackingNumber);
                            }
                        }

                        $scope.subrows +="</table>";
                        $scope.subrows +="</div>" ;      
                        $scope.subrows += "</td>";
                        $scope.subrows += "<td class='colSpanHide2'></td>";
                        $scope.subrows +="</tr>";

                        if($(".subrowheader" + allIndex[i].routeableId).length > 0) {
                            $(".subrowheader" + allIndex[i].routeableId).remove();
                        }


                        if(subDataIsPresent){
                            $("#row_" + campaignIds[i] + "_" + dataIndex.index).children().removeClass("fa fa-caret-right");
                            $("#row_" + campaignIds[i] + "_" + dataIndex.index).children().addClass("fa fa-caret-down");
                            $("#rowdataitem" + dataIndex.index).after($scope.subrows);
                            
                        }
                    }

                    $(".disabled").prop('disabled', true);
                });        
            }else{
                $scope.applyExpand = false;
                $scope.callflowDataInProcess = false;
                for (var i = 0; i < campaignIds.length; i++) {
                    var dataIndex = _.find(CampIdIndexs, function(camoIndex){ return camoIndex.routeableId == campaignIds[i]; });
                    $("#row_" + campaignIds[i] + "_" + dataIndex.index).children().removeClass("fa fa-caret-down");
                    $("#row_" + campaignIds[i] + "_" + dataIndex.index).children().addClass("fa fa-caret-right");
                    if($(".subrowheader" + allIndex[i].routeableId).length > 0) {
                        $(".subrowheader" + allIndex[i].routeableId).remove();
                    }
                }
            }
            
           
                $scope.collasped = !$scope.collasped;
            
        };

        $scope.yell = function(key,visible,callFlow){ // Event call When picklist option is selected or Unselected 
            var colSpanCount = 0;
            
            if(callFlow){
                if(visible){
                    $("."+key+"").show();
                }else{
                    $("."+key+"").hide();
                }
            }
            _.map($scope.groupActivityMapping.visibleColumns, function(vc) {
                if(vc.callFlow === false && vc.visible){
                    colSpanCount++;
                }    
            }); 
          

        if(visible === false){

            var colSpanCountFlag = colSpanCount;

            colSpanCount = colSpanCountFlag-2;
            if(colSpanCount === 0){

                colSpanCount = 0;
                $(".colSpanHide2").hide();

            }
        
           

            if(colSpanCount <=5){

                
                $(".colSpanHide2").show();

            }
                
            
            
    
        } else{
           
            $(".colSpanHide2").show();
            colSpanCountFlag =  $(".colspan_class").attr('colspan');
            
            if(colSpanCountFlag<=6){
               
               
                colSpanCount = parseInt(colSpanCountFlag)+parseInt(1);
                if(callFlow){
                    
                    if(colSpanCountFlag==6){
                        //alert("colSpanCountFlag"+colSpanCountFlag)
                    $(".colSpanHide2").hide();
                   }else{
                    colSpanCount = colSpanCount - 1;
                    $(".colSpanHide2").show();
                   }
                }
                else{
                    //colSpanCount = 6;
                    $(".colSpanHide2").show();

                }
                
            }
            else{
               // alert("else ");
               $(".colSpanHide2").show();
                colSpanCount = 6;
                

            }
            

            //$(".colSpanHide2").show();



            
        } 

        $(".colspan_class").attr('colspan', '' + parseInt(colSpanCount) + '');
            
        };


        $scope.visiblecallFlow = function(data){   // Display CallFlow Header of campaign (Dynamic) 
            var subrowsHeader =  [];
            var callflowheader = [];
            _.each($scope.groupActivityMapping.callFlowdataTableHeaderValues, function(callflowheader){
                var vcCol = _.find($scope.groupActivityMapping.visibleColumns, function(vc){
                    return vc.key == callflowheader.key;
                });
                if(vcCol.visible === true){
                 callflowheader = [
                    {colHead:callflowheader.value},
                    {colKey:callflowheader.key},
                    {colFlag:true}

                ];
                    subrowsHeader.push(callflowheader);
                }else{
                     callflowheader = [
                        {colHead:callflowheader.value},
                        {colKey:callflowheader.key},
                        {colFlag:false}
    
                    ];
                        subrowsHeader.push(callflowheader);

                };    
            })


            $scope.subrows = "";
            $scope.subrows += "<tr class='subrowheader"+ data.routeableId+ "'>";
            $scope.subrows += "<td class='colSpanHide'> </td>";
            //$scope.subrows += "<td> </td>";
            //$scope.subrows += "<td> </td>";
            $scope.subrows += "<td class='colspan_class' colspan='6'>";
            $scope.subrows += "<div class='settingsstyle' >";
            $scope.subrows += "<table class='table'>";
            $scope.subrows +="<tr>"
            for (var j = 0; j < subrowsHeader.length; j++) {
                if(subrowsHeader[j][2].colFlag === true){
                    var css = '';
                    if(subrowsHeader[j][0].colHead == 'Actions'){
                        css = "style='text-align:right'";
                    }
                    $scope.subrows += "<th class='"+subrowsHeader[j][1].colKey+" CallFlowHeader' "+css+">" + subrowsHeader[j][0].colHead + " </th>";
                }else{                    
                    $scope.subrows += "<th class='"+subrowsHeader[j][1].colKey+" CallFlowHeader' style='display:none;'>" + subrowsHeader[j][0].colHead + " </th>";
                }
            }
            $scope.subrows += "</tr>";
            return subrowsHeader;
        }; 
        
        
        $scope.showSubData = function (data) {
            currentCampaign=data;
            if($scope.callflowDataInProcess) return false;
            $scope.callflowDataInProcess = true;
            var subrowsHeader =  [];
            var subDataIsPresent = false;

            
            if($(".subrowheader" + data.routeableId).length > 0) {
                
                $scope.callflowDataInProcess = false;
                $("#row_" + data.routeableId + "_" + data.index).children().removeClass("fa fa-caret-down");
                $("#row_" + data.routeableId + "_" + data.index).children().addClass("fa fa-caret-right");
             
                $(".subrowheader" + data.routeableId ).remove();
                return false;
            }

            var campaignIds = [];
            CampaignListWebservices.getCampaignsCallFlow(data.routeableId).then(function (result) {
                $scope.callflowDataInProcess = false;
                subrowsHeader = $scope.visiblecallFlow(data);
                var trackingNumber = [];
                var prompts = voicePromptService.getPrompts();
                var whispers = whispermessageService.getWhispers();
                var filenames = [];
                var whisper_filenames = []
                for(var k = 0; k < prompts.length ; k++){
                    filenames.push(prompts[k].filename);
                }
                for(var a = 0; a < whispers.length ; a++){
                    whisper_filenames.push(whispers[a].filename);
                }
                
                
                for (var i = 0; i < result.data.json.length; i++) {
                    if(result.data.json[i].tracking_number_type === 'PercentageBasedRoute'){
                        result.data.json[i].tracking_number_type = 'Percentage';
                    }
			        if(result.data.json[i].ring_to_number === 'hangup'){
                        result.data.json[i].tracking_number_type = 'Simple';
                    }
                    if(result.data.json[i].tracking_number_type == 'Outbound'){
                        result.data.json[i].repeat_interval = '';
					}
					if(result.data.json[i].tracking_number_type == 'Voicemail'){
                        result.data.json[i].ring_to_number = 'Voicemail';
                        result.data.json[i].vm_enabled = '';
                    }

                    if(result.data.json[i].voice_prompt && result.data.json[i].voice_prompt!= null){

                          if((result.data.json[i].voice_prompt).includes('file://')){
                            var str1 = (result.data.json[i].voice_prompt).split("file://")[1];
                            var str2 = (str1).split(".")[0];
                            
                            
                            for(var j = 0; j < prompts.length ; j++){
                            var flag = filenames.includes(str2)
                            if(flag === true || flag === 'true'){
                                
                                    if(str2 === prompts[j].filename){
                                        result.data.json[i].voice_prompt = prompts[j].name;
                                    }
                                
                          }else{
                            result.data.json[i].voice_prompt = ''
                          }
                        }
                        }else{
                            var str = (result.data.json[i].voice_prompt).split("tts://")[1];
                            result.data.json[i].voice_prompt = str
                        }
                    }
                    
                       if(result.data.json[i].whisper_message && result.data.json[i].whisper_message != null){
                        if((result.data.json[i].whisper_message).includes('file://')){
                            var str3 = (result.data.json[i].whisper_message).split("file://")[1];
                            var str4 = (str3).split(".")[0];
                            for(var j = 0; j < whispers.length ; j++){
                            var flag = whisper_filenames.includes(str4)
                            if(flag === true || flag === 'true'){
                                
                                    if(str4 === whispers[j].filename){
                                        result.data.json[i].whisper_message = whispers[j].name;
                                    }
                                
                          }else{
                            result.data.json[i].whisper_message = ''
                          }
                        }
                        }else{
                            var str5 = (result.data.json[i].whisper_message).split("tts://")[1];
                            result.data.json[i].whisper_message = str5
                        }
                       
                       }
                    var jsonResult = result.data.json[i];
                    
                    $scope.displayCallFlow(data,jsonResult, result.data.json, trackingNumber);
                };

                $scope.subrows +="</table>";
                $scope.subrows +="</div>";       
                $scope.subrows += "</td>";
               $scope.subrows += "<td class='colSpanHide2'></td>";
                
                $scope.subrows +="</tr>";
                
                
                $("#rowdataitem" + data.index).after($compile($scope.subrows)($scope));
                $("#row_" + data.routeableId + "_" + data.index).children().removeClass("fa fa-caret-right");
                $("#row_" + data.routeableId + "_" + data.index).children().addClass("fa fa-caret-down");

                
            });        
        };

        $scope.displayCallFlow = function(data,result, totalRes, trackingNumber){ // Display  CallFlow data of campaign (dynamic)

            var allcallflowheader = [];
            var callflowheader = [];
                var allvisiblecallflowheader = [];
                var campEditData = {
                    id : data.routeableId
                };
                $scope.subrows += "<tr id='callflowrow' class='subrows" + data.index + "'>";
            
                            _.each($scope.groupActivityMapping.callFlowdataTableHeaderValues, function(cf){

                                var vcCol = _.find($scope.groupActivityMapping.visibleColumns, function(vc){
                                    return vc.key == cf.key;
                                });

                                
                                if(vcCol.visible === true){
                                        callflowheader = [
                                        {callflowheader:cf.value},
                                        {callflowkey:cf.key},
                                        {callflowflag:vcCol.visible},
                                        
                    
                                    ];
                                    allvisiblecallflowheader.push(callflowheader);
                                    }else{
                                         callflowheader = [
                                            {callflowheader:cf.value},
                                            {callflowkey:cf.key},
                                            {callflowflag:vcCol.visible}
                        
                                        ];
                                        allvisiblecallflowheader.push(callflowheader);
                    
                                    }

                            });

                            

                            for (var k = 0; k < allvisiblecallflowheader.length; k++) {
                                var h = allvisiblecallflowheader[k][1].callflowkey;
                                
                                if(allvisiblecallflowheader[k][1].callflowkey === "callflow_action"){
                                    var lastIndex = 0;
                                    
              //                       if(result.tracking_number_type === 'Percentage' || result.tracking_number_type === 'Ivr'){
              //                           var selectedRes = _.where(totalRes, {tracking: result.tracking});
              //                           lastIndex = _.findLastIndex(selectedRes, {
              //                                             ring_to_number: result.ring_to_number
                                                        // });
              //                       }

                                    $scope.subrows += "<td class='subrowsActions'>" 
                                    if(trackingNumber.indexOf(result.tracking) === -1){
                                        trackingNumber.push(result.tracking)
                                        if(result.tracking_number_status === 'Referral'){
                                            $scope.subrows += "<span><button class='campaignbuttons btn btn-sm btn-primary disabled' onclick=angular.element(this).scope().editCampaign("+data.routeableId +"," + result.call_flow_id  +")>Edit </button>";
                                            $scope.subrows += "&nbsp;<button class='campaignbuttons btn btn-sm btn-danger disabled'  onclick=angular.element(this).scope().removeCallFlow("+ result.call_flow_id  + ")>Delete</button> </span>";
                                        }else{
                                            $scope.subrows += "<span><button class='campaignbuttons btn btn-sm btn-primary' onclick=angular.element(this).scope().editCampaign("+data.routeableId +"," + result.call_flow_id  +")>Edit </button>";
                                            $scope.subrows += "&nbsp;<button class='campaignbuttons btn btn-sm btn-danger'  onclick=angular.element(this).scope().removeCallFlow("+ result.call_flow_id  + ","+data.routeableId+","+data.index+")>Delete</button> </span>";  
                                        }
                                        
                                    }

                                    $scope.subrows += "</td>";

                                }
                                else if(allvisiblecallflowheader[k][1].callflowkey == "spam_guard"){
                                   
                                    if(allvisiblecallflowheader[k][2].callflowflag === true)
                                    {
                                        
                                            if(result[h] && showSpamIcon){
                                                
                                                $scope.subrows += "<td class='"+allvisiblecallflowheader[k][1].callflowkey+" CallFlowHeader'><img src='assets/img/spam.jpg' class='spam_gurad' > </td>";
                                            }
                                            else{
                                                $scope.subrows += "<td class='"+allvisiblecallflowheader[k][1].callflowkey+" CallFlowHeader'></td>";

                                            }
                                    }else{

                                    $scope.subrows += "<td class='"+allvisiblecallflowheader[k][1].callflowkey+" CallFlowHeader' style='display:none;'></td>";

                                    }        
                                } else if (allvisiblecallflowheader[k][1].callflowkey == "sms_enabled") {

                                    if (allvisiblecallflowheader[k][2].callflowflag === true) {

                                        if (result[h] && showSpamIcon) {

                                            $scope.subrows += "<td class='" + allvisiblecallflowheader[k][1].callflowkey + " CallFlowHeader'><img src='assets/img/spam.jpg' class='spam_gurad' > </td>";
                                        }
                                        else {
                                            $scope.subrows += "<td class='" + allvisiblecallflowheader[k][1].callflowkey + " CallFlowHeader'></td>";

                                        }
                                    } else {

                                        $scope.subrows += "<td class='" + allvisiblecallflowheader[k][1].callflowkey + " CallFlowHeader' style='display:none;'></td>";

                                    }
                                }else if(allvisiblecallflowheader[k][2].callflowflag === true){
                                    $scope.subrows += "<td class='"+allvisiblecallflowheader[k][1].callflowkey+" CallFlowHeader'>" + result[h]+ " </th>";
                                }else{
                                    
                                    $scope.subrows += "<td class='"+allvisiblecallflowheader[k][1].callflowkey+" CallFlowHeader' style='display:none;'>" + result[h]+ " </th>";
                                }
                            }

                 $scope.subrows +="</tr>";
                    
              };
        $scope.editCampaign = function (id, cfid) {
           if($rootScope.is_migrated){
            $location.path('/set-campaign-builder');
            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: ($("#addTrackingNumber").offset().top) -20
                }, 1000);
            }, 100);
           } else {
            $location.path('/set-legacy-campaign-builder');
            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: ($("#addTrackingNumber").offset().top) -20
                }, 1000);
            }, 100);
           }
           $location.search('id', id);
           $location.search('cfid', cfid);
           $rootScope.editClickId = id;

        }; 

        $scope.removeCallFlow = function (call_flow_id, routeableId, index) {
            var pr = {
                "provisioned_route": {
                    "ids": [call_flow_id]
                }
            };
            currentCampaign.routeableId = routeableId;
            currentCampaign.index = index;
            $bootbox.confirm("Are you sure you want to delete this Tracking Number?", function (clickedOK) {
                if (clickedOK) {
                    CampaignListWebservices.removeCallFlow(pr).then(function (result) {
                        if (result.data.err === '') {
                            pinesNotifications.notify({
                                title: 'Remove Tracking Number',
                                text:  'Tracking Number removed successfully.',
                                type:  'success'
                            });

                            //$route.reload();
                            CampaignListWebservices.getCampaignsCallFlow(currentCampaign.routeableId).then(function (result) {
                                $scope.callflowDataInProcess = false;
                                var trackingNumber = [];
                                if($(".subrowheader" + currentCampaign.routeableId).length > 0) {
                                    $scope.callflowDataInProcess = false;
                                    $("#row_" + currentCampaign.routeableId + "_" + currentCampaign.index).children().removeClass("fa fa-caret-down");
                                    $("#row_" + currentCampaign.routeableId + "_" + currentCampaign.index).children().addClass("fa fa-caret-right");
                                    $(".subrowheader" + currentCampaign.routeableId ).remove();
                                   
                                }
                                var subrowsHeader= $scope.visiblecallFlow(currentCampaign);
                                for (var i = 0; i < result.data.json.length; i++) {
                                    var jsonResult = result.data.json[i];
                                    $scope.displayCallFlow(currentCampaign,jsonResult, result.data.json, trackingNumber);
                                };
                                $scope.subrows +="</table>";
                                $scope.subrows +="</div>";       
                                $scope.subrows += "</td>";
                               $scope.subrows += "<td class='colSpanHide2'></td>";
                                $scope.subrows +="</tr>";
                                $("#rowdataitem" + currentCampaign.index).after($compile($scope.subrows)($scope));
                                $("#row_" + currentCampaign.routeableId + "_" + currentCampaign.index).children().removeClass("fa fa-caret-right");
                                $("#row_" + currentCampaign.routeableId + "_" + currentCampaign.index).children().addClass("fa fa-caret-down");
                            }); 
                            // $location.path('/setup-campaign-builder2');
                        }
                        else {
                            pinesNotifications.notify({
                                title: 'Remove Call Flow',
                                text:  result.data.err.data,
                                type:  'error'
                            });

                        }
                    });
                }
            });
        };

        $scope.archiveCampaign = function (dataItem) {
           console.log(camp_id);
             var campaignName = dataItem.name,
             camp_id = dataItem.campaign_id;
           //   campaignId   = index[0],
           //   list_ids     = index[8];
          

           var saveData = {
               "campaign": {
                   "id":     camp_id,
                   "status": 'deleted',
                   "org_unit_id":   $rootScope.currentOUId
               }
           };


           var message = '';
           //message += (list_ids != "" ? 'This campaign is assigned to distribution list. ' : '');
           message += 'Are you sure you want to archive campaign - ' + campaignName + '?';
           $bootbox.confirm(message, function (clickedOK) {
               if (clickedOK) {
                   CampaignListWebservices.setCampaignStatus(saveData).then(function (result) {
                       if (result.data.status === 'success') {
                           pinesNotifications.notify({
                               title: 'Campaign',
                               text:   campaignName + " has been archived.",
                               type:  'success'
                           });
                           $route.reload();
                       }
                       else {
                           $scope.error = result;
                       }
                   });
               }
           });
        };

       
        $scope.pageChanged = function(newPage) {

            //progressLoader.start();
            $scope.currentPage = newPage;
            $scope.onGoingRequests.push(true);
            $scope.isLoadingApi = true;
            $scope.loadIntialReportData(newPage);
            
        };

        $scope.changeReportParams = function (paramTypeToChange, extraData) {
            $scope.filterReset();
            $scope.loadIntialReportData(1);
        };

        if($scope.is_migrated === true || $scope.is_migrated === 'true'){
            $scope.getHeader = function () { return ["Account", "Account OUID","Account External ID", "Parent Group","Parent Group OUID","Parent Group External ID","Group", "Group OUID", "Group External ID",  "Campaign", "Campaign ID", "Campaign External ID", "Campaign Start", "Campaign End", "Campaign Status","Referral","Tracking Number Name", "Tracking Number ID", "Tracking Number","Tracking Number Type", "Tracking Number Status", "Ring-to Phone Number", "Call Value", "Repeat Interval (in Hours)", "Ad Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Spam Guard", "SMS", "Record Call", "Play Disclaimer", "Voice Prompt", "Whisper Message", "DNI", "Host Domain", "Referring Website", "HTML Class", "DNI Type", "Custom Parameters", "Pre-call Webhook","Instant Insights", "Instant Insights Config" , "Hunt Type" , "Voicemail"]; };
        }else{
            $scope.getHeader = function () { return ["Account", "Account OUID","Account External ID", "Parent Group","Parent Group OUID","Parent Group External ID","Group", "Group OUID", "Group External ID",  "Campaign", "Campaign ID", "Campaign External ID", "Campaign Start", "Campaign End", "Campaign Status","Referral","Tracking Number Name", "Tracking Number ID", "Tracking Number","Tracking Number Type", "Tracking Number Status", "Ring-to Phone Number", "Call Value", "Repeat Interval (in Hours)", "Ad Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Spam Guard", "Record Call", "Play Disclaimer", "Voice Prompt", "Whisper Message", "DNI", "Host Domain", "Referring Website", "HTML Class", "DNI Type", "Custom Parameters", "Pre-call Webhook" ]; };
        }
        $scope.getCSVData = function (formate) {

            progressLoader.start();
            var campIdReport = {};
            var campaignIdsRport = [];
            var campReportData = {};
            var callFlowData = {};
            var getCallFlowReport = {};
            var deferred = $q.defer();
            var response = CampaignListWebservices.getCampaignsCallFlowReport($scope.userAccess.campaign, $rootScope.currentOUId);
            response.then(function (result) {
                if (result.data.json != 'error') {
                    campReportData = result.data.json;
                    var campaignData = [];
                    for (var i = 0; i < campReportData.length; i++) {
                        //console.log(campReportData[i].record_call)
                    var ringToNumber = campReportData[i].ring_to_number;
                    var route = campReportData[i].tracking_number_type;
                    $scope.prompts = JSON.parse($window.sessionStorage.prompts);
                        var promptSubstring = campReportData[i].voice_prompt.substring(0, 7);
                            if (promptSubstring == "file://") {
                                var message = campReportData[i].voice_prompt.substring(campReportData[i].voice_prompt.lastIndexOf("/") + 1, campReportData[i].voice_prompt.length);
                                if($scope.prompts){
                                    for (var j = 0; j < $scope.prompts.length; j++) {
                                        var filename = $scope.prompts[j].filename + ".wav";
                                        if(filename == message)
                                        campReportData[i].voice_prompt = $scope.prompts[j].name.split(' ').join('_') + ".wav";
                                    }
                                }
                            } else {
                                campReportData[i].voice_prompt = campReportData[i].voice_prompt.substring(6, campReportData[i].voice_prompt.length);
                            }
                    $scope.whispers = JSON.parse($window.sessionStorage.whispers);
                        var whisperSubstring = campReportData[i].whisper_message.substring(0, 7);
                            if (whisperSubstring == "file://") {
                                var whisper_message = campReportData[i].whisper_message.substring(campReportData[i].whisper_message.lastIndexOf("/") + 1, campReportData[i].whisper_message.length);
                                if($scope.whispers){
                                    for (var j = 0; j < $scope.whispers.length; j++) {
                                        var whisperFilename = $scope.whispers[j].filename + ".wav";
                                        if(whisperFilename == whisper_message)
                                        campReportData[i].whisper_message = $scope.whispers[j].name.split(' ').join('_') + ".wav";
                                    }
                                }
                            } else {
                                campReportData[i].whisper_message = campReportData[i].whisper_message.substring(6, campReportData[i].whisper_message.length);
                            }
                            
                    $scope.prompts = JSON.parse($window.sessionStorage.prompts);
                        var promptSubstring = campReportData[i].voice_prompt.substring(0, 7);
                            if (promptSubstring == "file://") {
                                var message = campReportData[i].voice_prompt.substring(campReportData[i].voice_prompt.lastIndexOf("/") + 1, campReportData[i].voice_prompt.length);
                                if($scope.prompts){
                                    for (var j = 0; j < $scope.prompts.length; j++) {
                                        var filename = $scope.prompts[j].filename + ".wav";
                                        if(filename == message)
                                        campReportData[i].voice_prompt = $scope.prompts[j].name.split(' ').join('_') + ".wav";
                                    }
                                }
                            } else {
                                campReportData[i].voice_prompt = campReportData[i].voice_prompt.substring(6, campReportData[i].voice_prompt.length);
                            }
                    $scope.whispers = JSON.parse($window.sessionStorage.whispers);
                        var whisperSubstring = campReportData[i].whisper_message.substring(0, 7);
                            if (whisperSubstring == "file://") {
                                var whisper_message = campReportData[i].whisper_message.substring(campReportData[i].whisper_message.lastIndexOf("/") + 1, campReportData[i].whisper_message.length);
                                if($scope.whispers){
                                    for (var j = 0; j < $scope.whispers.length; j++) {
                                        var whisperFilename = $scope.whispers[j].filename + ".wav";
                                        if(whisperFilename == whisper_message)
                                        campReportData[i].whisper_message = $scope.whispers[j].name.split(' ').join('_') + ".wav";
                                    }
                                }
                            } else {
                                campReportData[i].whisper_message = campReportData[i].whisper_message.substring(6, campReportData[i].whisper_message.length);
                            }
                     var campObj = {
                        a: campReportData[i].account_name,
                        b: campReportData[i].account_id,
                        c: campReportData[i].account_exid,
                        d: campReportData[i].parent_group_name,
                        e: campReportData[i].parent_group_id,
                        f: campReportData[i].parent_group_external_id,
                        g: campReportData[i].group_name,
                        h: campReportData[i].group_id,
                        i: campReportData[i].group_external_id,
                        j: campReportData[i].campaign_name,
                        k: campReportData[i].campaign_id,
                        l: campReportData[i].campaign_external_id,
                        m: campReportData[i].start_date,
                        n: campReportData[i].end_date,
                        o: campReportData[i].campaign_status,
                        p: campReportData[i].referral_number,
                        q: campReportData[i].tracking_name,
                        r: campReportData[i].tracking_id,
                        s: campReportData[i].tracking_number,
                        t:(ringToNumber ==  'hangup') ? 'Hangup' : campReportData[i].tracking_number_type,
                        u: campReportData[i].tracking_number_status,
                        v: campReportData[i].ring_to_number,
                        w: campReportData[i].call_value,
                        x: (route ==  'Outbound' ) ? ' ' : campReportData[i].repeat_interval,
						y: campReportData[i].ad_source,
                        z: campReportData[i].custom_source_name1,
                        A: campReportData[i].custom_source_name2,
                        B: campReportData[i].custom_source_name3,
                        C: campReportData[i].custom_source_name4,
                        D: campReportData[i].custom_source_name5,
                        E: campReportData[i].spam_guard,
                        zz: campReportData[i].sms_enabled,
                        F: campReportData[i].record_call,
                        G: campReportData[i].play_disclaimer,
                        H: campReportData[i].voice_prompt,
                        I: campReportData[i].whisper_message,
                        J: campReportData[i].dni,
                        K: campReportData[i].host_domain,
                        L: campReportData[i].referring_website,
                        M: campReportData[i].html_class,
                        N: campReportData[i].dni_type,
                        O: campReportData[i].custom_parameters,
                        P: campReportData[i].pre_call_webhook,
                        Q: campReportData[i].post_call_ivr_status,
                        R: (campReportData[i].post_call_ivr == null || campReportData[i].post_call_ivr == undefined ) ? ' ' : campReportData[i].post_call_ivr,
                        S: (campReportData[i].hunt_type && campReportData[i].hunt_type !== undefined ) ? campReportData[i].hunt_type : '',
                        yy: campReportData[i].voicemail                      
                    };

                    if($scope.is_migrated === false || $scope.is_migrated === 'false'){
                        delete campObj.Q;
                        delete campObj.R;
                        delete campObj.S;
                        delete campObj.yy;
                        delete campObj.zz;
                    }
                    campaignData.push(campObj);
                    }
                    //console.log(campaignData);
                    //progressLoader.set(50);
                    deferred.resolve(campaignData);
                    //console.log(campaignData)
                   
                    if($rootScope.isSafari){
                        
                        deferred.resolve(JSONToCSVConvertor(campaignData,reportName,true,formate));
                        
                    }else{
                        progressLoader.end();
                        return deferred.promise;
                    }
                } 
            });
            if(!$rootScope.isSafari){
                
                return deferred.promise;
            }
            progressLoader.end();
        };
        // ***** begin NECESSARY CODE FOR ADV FILTER TO WORK *******************
        $scope.preloading = false;
        // $scope.showAdvFilter = false;
        // $scope.advancedFilterConfig = { maxQuantity: 5 };

        
        $scope.applyFilter = function() {
            progressLoader.start();


            if($scope.simpleSearchFilter !== '' && $scope.simpleSearchFilter !== undefined ){
                $scope.searchLoading = true;
            }
            else{
                $scope.searchLoading = false;
            }
            
            $scope.reseticon();
            $scope.loadIntialReportData($scope.currentPage);
        };

        $scope.filterReset = function() {
            progressLoader.start();
            $scope.reseticon();
            $scope.loadIntialReportData($scope.currentPage);
        };

        // $scope.removeFilterDefinition = function(i) {
        //     advFilSrvc.removeFilterDefinition(i);
        //     $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
        // };

        // $scope.validateInput = function(e) {
        //     advFilSrvc.validateInput(e);
        // };
        // ***** end NECESSRY CODE FOR ADV FILTER TO WORK ***************

    }]);
}());
