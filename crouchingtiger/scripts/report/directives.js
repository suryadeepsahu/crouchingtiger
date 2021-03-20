(function() {
    var app = angular.module("report-components", []);
    app.directive("callflowSettingsReportTable", callflowSettingsReportTable)
    .directive("overflowRouting", overflowRouting);
   // .directive("scheduleRoute", scheduleRoute,['$http']);
    app.directive('thirdMultiLevelIvr', ['pinesNotifications','$uibModal','$bootbox','VoicePromptService','WhisperMessageService','CampaignWebService', function (pinesNotifications,$uibModal,$bootbox,voicePromptService, whispermessageService,CampaignWebService) {
        var link = function(scope,rootScope) {
            scope.idnum = scope.ivrActions.length;
             var message_type = "";
            var message = "";
            var isLocationIvr = false;
            if(!scope.byDefaultRing){
                scope.byDefaultRing = 3;
            }
            if(!scope.tcAction.ivrActions || !scope.tcAction.ivrActions.length){
                scope.tcAction.ivrActions = [];
                scope.tcAction.ivrActions = [{
                    id: 1,
                    action: "simple",
                    action_order: 1,
                    TTSIVRSelected: true,
                    voicepromptURL: '',
                    voicepromptId: '',
                    ringtoNum: "",
                    message_type:message_type,
                    message:message,
                    keypress: "",
                    destination:"",
                    previousmenu:"",
                    recordCall: false,
                    activateVoiceMail: false,
                    playDisclaimer: 'before',
                    geoRoute: {routeBy: "", geoList: "", radius: ""},
                    scheduleRoute: [{timezone:'',default_ringto:'',activate_voicemail:false,recordCall: false,playDisclaimer: 'before',disableRC:false}],
                    overflowNumbers :[{overflowNumber:'',rings: scope.byDefaultRing, overflow_order: 1}],
                    openOverflowBox :false,
                    isSimultaneousRing :false,
                    whisperPrompt : false,
                    TTSWhisperSelected: true,
                    whisperTTSText: '',
                    hasValidWhisperURL: '',
                    whisperURL:'',
                    isLocationIvr:isLocationIvr,
                    disableRC:false,
                    voicemailComponent:false
                }];
            }

            if(scope.tcAction.ringtoNum && scope.tcAction.ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '').length == 10){
                scope.tcAction.isValidRingTo = true;
            }else{
                scope.tcAction.isValidRingTo = false;
            }
            if(scope.tcAction.geoRoute !== undefined && scope.tcAction.geoRoute !== null && scope.tcAction.geoRoute !== ""){
            if(scope.tcAction.geoRoute.geoList && scope.tcAction.geoRoute.geoList !== undefined && scope.tcAction.geoRoute.geoList !== "" && scope.tcAction.geoRoute.geoList !== null){
                scope.georoutelocations.forEach(function(loc) {
                    if(loc.id === parseInt(scope.tcAction.geoRoute.geoList)){
                        scope.locObj=loc;
                    }
                });
            }else{
                scope.locObj={id:'',name:''};
            }
        }
            scope.changeLocId = function (locObj) {
                scope.tcAction.geoRoute.geoList = locObj.id;
            };
             scope.showSubmit = function(){
                scope.showSubmitFunction();
                if(scope.tcAction.ringtoNum && scope.tcAction.ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '').length == 10){
                    scope.tcAction.isValidRingTo = true;
                }else{
                    scope.tcAction.isValidRingTo = false;
                }
            };
            var validateKeyPress = function(action) {
                scope.keypressDuplicate = [];
                _.each( scope.ivrActions, function(action){
                    scope.keypressDuplicate.push(action.keypress);
                });
                scope.keypress = _.uniq(scope.keypressDuplicate);
                    if (scope.keypress.length !== scope.keypressDuplicate.length){
                        pinesNotifications.notify({
                            title: 'Multilevel IVR Form',
                            text: 'Duplicate Key Press Numbers are not allowed',
                            type: 'error'
                        });
                    }
                };

                scope.whisperIVRTextChange = function(tcAction) {
                    if (tcAction.whisperTTSText !== undefined || tcAction.whisperTTSText.length !== 0) {
                        scope.chkSpclChar(tcAction.whisperTTSText, '3rd Level Whisper Message',function(t){
                            tcAction.whisperTTSText = t;
                        });
                    }
                    if(scope.whisperAudio !== undefined){
                        scope.whisperAudio.pause();
                    }
                    scope.whisperAudio = undefined;
                    if (tcAction.whisperText === undefined || tcAction.whisperText.length === 0) {
                        tcAction.hasValidWhisperURL = false;
                        tcAction.TTSWhisperSelected = true;
                    } else {
                        tcAction.hasValidWhisperURL= true;
                        tcAction.TTSWhisperSelected = true;
                    }
                };

                scope.disableRecordCall = function(){
                    if(!scope.tcAction.activateVoiceMail){
                        scope.tcAction.disableRC = true;
                        scope.tcAction.recordCall = true;
                    }else{
                        scope.tcAction.disableRC = false;
                        scope.tcAction.recordCall = true;
                    }
                };

                scope.removeSelectedWhisperAudio = function(tcAction) {
                    if (scope.whisperAudio !== undefined)  
                        scope.whisperAudio.pause();
                        scope.whisperAudio = undefined;
                        tcAction.TTSWhisperSelected = true;
                        tcAction.whisperTTSText = '';
                        tcAction.hasValidWhisperURL = false;
                        tcAction.whisperURL ='';
                };      
                scope.showIVRWhisperModal = function(tcAction) {
                    scope.disableBtn = true;
                    stopAudio();
                    var modalInstance = $uibModal.open({
                        templateUrl: 'assets/partials/assignWhisper.html',
                        controller: 'whisperModal',
                        size: 'lg',
                        backdrop: 'static',
                        keyboard: false
                    });
    
                    modalInstance.result.then(function() {
                        for (var i = 0; i < whispermessageService.whispers.length; i++) {
                            if (whispermessageService.whispers[i].selectedwhisper === true) {
                                tcAction.whisperText = whispermessageService.whispers[i].name;
                                tcAction.whisperFileName = whispermessageService.whispers[i].filename;
                                tcAction.whisperId = whispermessageService.whispers[i].id;
                                tcAction.whisperURL = whispermessageService.whispers[i].url;
                                scope.whisperAudio = undefined ;
                                tcAction.hasValidWhisperURL = true;
                                tcAction.TTSWhisperSelected = true;
                            }
                            
                        }
                        // if((tcAction.whisperText).length > 15){
                        //     var str = (tcAction.whisperText).slice(0,10);
                        //     tcAction.whisperDisplay = str.concat('...')
                        // }else{
                        //     tcAction.whisperDisplay = tcAction.whisperText;
                        // }
                        tcAction.TTSWhisperSelected = false;
                        tcAction.hasValidWhisperURL = true;
                        tcAction.whisperTTSText = '';
                        scope.disableBtn = false;
                    }, function() {
                        console.log('Modal dismissed at: ' + new Date());
                        scope.disableBtn = false;
                    });
    
                };
                scope.playWhisperAudio = function(tcAction) {
                    if (scope.whisperAudio !== undefined && !scope.whisperAudio.paused) {
                        scope.whisperAudio.pause();
                    } else if (scope.whisperAudio !== undefined && scope.whisperAudio.paused) {
                        scope.whisperAudio.play();
                    } else {
                        if (tcAction.whisperTTSText.length > 0) {
                            scope.whisperAudio = new Audio();
                            scope.onTTS_IVR_Request = true;
                            CampaignWebService.getTTS(tcAction.whisperTTSText).then(function(result) {
                                if (result.data.json.length > 1) {
                                    var TTSData = result.data.json;
                                    var source = "data:audio/mp3;base64," + TTSData;
                                    scope.whisperAudio.src = source;
                                    if (scope.whisperAudio.paused) {
                                        scope.whisperAudio.play();
                                    } else {
                                        scope.whisperAudio.pause();
                                    }
                                }
                                 scope.onTTS_IVR_Request = undefined;
                            });
                        } else {
                            scope.whisperAudio = new Audio(tcAction.whisperURL);
                            scope.whisperAudio.play();
                        }
                    }
                };
    
                scope.whisperAudioIsPlaying = function() {
                    if (scope.whisperAudio !== undefined && !scope.whisperAudio.paused && !scope.whisperAudio.ended)
                        return true;
                    return false;
                };

                scope.removeSelectedIvrVoiceAudio = function(tcAction) {   
                    if (scope.ivrAudio !== undefined)  
                        scope.ivrAudio.pause();    
                    scope.ivrAudio = undefined;    
                    tcAction.voicepromptURL = undefined;    
                    tcAction.voicepromptTTSText = "";   
                    tcAction.voicepromptText = "";
                    tcAction.TTSIVRSelected = true; 
                    tcAction.hasValidTTSVoiceURL = false;   
                };
               
                scope.removeIvrAction = function(tcactionId) {
                    $bootbox.confirm("Are you sure you want to delete this IVR Action?", function(clickedOK) {
                        if (clickedOK) {
                            var allBtn = $('.playpadding');
                            allBtn.each(function(i, obj) {
                                obj.children[0].classList.remove("fa-pause");
                            });
                            scope.pauseCurrentPlayingAudio(); 
                            var keepLooking = true;
                            $.each(scope.ivrActions, function(index, value) {
                                if (keepLooking && value.id == tcactionId) {
                                    scope.ivrActions.splice(index, 1);
                                    keepLooking = false;
                                }
                            });
        
                            $.each(scope.ivrActions, function(index, value) {
                                if (value.id > tcactionId && tcactionId !== 0) {
                                    scope.ivrActions[index].id = (value.id - 1);
                                }
                                if (value.id === 0) {
                                    scope.ivrActions[index].id = (index + 1);
                                }
                            }); 
                            pinesNotifications.notify({
								title: 'Multilevel IVR Key Press',
								text: 'Deleted Successfully',
								type: 'success'
							});
                        }
                    });
                };
            var validateThirdLevel = function(){
                //_.each(scope.ivrActions, function(ivr){
                var messageText;
                var keycheck=false;
                var invalidFields = [];
                var overflow_error = false;
                for (var i = scope.ivrActions.length - 1; i >= 0; i--) {
                    //scope.ivrActions[i]
                    console.log("ivr =",  scope.ivrActions[i]);
                    // common input fileds
                    if( scope.ivrActions[i].keypress === '' || scope.ivrActions[i].keypress === undefined ||  scope.ivrActions[i].keypress === null){
                        invalidFields.push('Keypress');
                        }
                    if( scope.ivrActions[i].destination === '' || scope.ivrActions[i].destination === undefined || scope.ivrActions[i].destination === null){
                        invalidFields.push('Destination');
                        }
                    if((scope.ivrActions[i].voicepromptTTSText ==='' || scope.ivrActions[i].voicepromptTTSText === undefined || scope.ivrActions[i].voicepromptTTSText === null) && (scope.ivrActions[i].voicepromptURL === '' || scope.ivrActions[i].voicepromptURL === undefined || scope.ivrActions[i].voicepromptURL === null) && scope.ivrActions[i].action === "interactiveVoice"){
                        invalidFields.push('Voice Prompt');
                    }
                    if(i === scope.ivrActions.length - 1){
                        if( scope.ivrActions[i].previousmenu  === "" || scope.ivrActions[i].previousmenu === undefined || scope.ivrActions[i].previousmenu === null){
                            invalidFields.push('Go Back to the previous menu');
                        }
                    }
                    if( scope.ivrActions[i].action !== "interactiveVoice"){
                     // Rote type = simple and geo
                        if(scope.ivrActions[i].openOverflowBox===true && scope.ivrActions[i].overflowNumbers.length > 0){
                            angular.forEach(scope.ivrActions[i].overflowNumbers, function (overFlowNumber) {
                                if(overFlowNumber.overflowNumber === ""|| overFlowNumber.overflowNumber === undefined || overFlowNumber.overflowNumber === null|| overFlowNumber.overflowNumber.replace(/[^0-9]+/g, '').length !== 10){
                                    invalidFields.push('Overflow Ring to Phone Number');
                                }
                            });
                        }
                        if(  scope.ivrActions[i].recordCall){
                            if(scope.ivrActions[i].playDisclaimer === "true" || scope.ivrActions[i].playDisclaimer === "" || scope.ivrActions[i].playDisclaimer === undefined ||  scope.ivrActions[i].playDisclaimer === null){
                                invalidFields.push('Play call recording disclaimer');
                            }
                       }
                       if(scope.ivrActions[i].whisperPrompt){
                        if( (scope.ivrActions[i].whisperTTSText === undefined || scope.ivrActions[i].whisperTTSText === '' || scope.ivrActions[i].whisperTTSText === null) && (scope.ivrActions[i].whisperURL === '' || scope.ivrActions[i].whisperURL === undefined ||  scope.ivrActions[i].whisperURL === null)){
                            invalidFields.push('Play whisper message before connecting');
                         } 
                       }
                       // Rote type =simple
                        if( scope.ivrActions[i].action === 'simple'){
                            if( scope.ivrActions[i].ringtoNum === '' ||  scope.ivrActions[i].ringtoNum.replace(/[^0-9]+/g, '').length !== 10){
                                invalidFields.push('Ring to Phone Number');
                                 scope.ivrActions[i].isValidRingTo = false;
                            }
                           
                        }
                           // Rote type =geo
                        if( scope.ivrActions[i].action === "geo"){
                            //Route By
                            if( scope.ivrActions[i].geoRoute.routeBy === '' || scope.ivrActions[i].geoRoute.routeBy === undefined){
                                invalidFields.push('Route By');
                            }
                            //Location List
                             if( scope.ivrActions[i].geoRoute.geoList === '' || scope.ivrActions[i].geoRoute.geoList === undefined){
                                invalidFields.push('Location List');
                            }
                            if( scope.ivrActions[i].ringtoNum === '' ||  scope.ivrActions[i].ringtoNum.replace(/[^0-9]+/g, '').length !== 10){
                            invalidFields.push('Default Number');
                            }
                            if((scope.ivrActions[i].geoRoute.routeBy === 'Zipcode' || scope.ivrActions[i].geoRoute.routeBy === 'Npa') && (scope.ivrActions[i].geoRoute.radius === '' || scope.ivrActions[i].geoRoute.radius === undefined)){
                                invalidFields.push('Proximity Limit');    
                            }
                          
                        }
                        // Route type = schedule
                        if( scope.ivrActions[i].action === "schedule"){
                            if( scope.ivrActions[i].scheduleRoute.timezone ==='' || scope.ivrActions[i].scheduleRoute.timezone === undefined || scope.ivrActions[i].scheduleRoute.timezone === null){
                                invalidFields.push('Time Zone');
                            }
                            _.each(scope.ivrActions[i].scheduleRoute.scheduleInfo,function(scheduleInfo){
                                if(scheduleInfo.fromTime === '' || scheduleInfo.fromTime === undefined || scheduleInfo.fromTime === null){
                                    invalidFields.push('FromTime');
                                }
                                if(scheduleInfo.toTime === '' || scheduleInfo.toTime === undefined || scheduleInfo.toTime === null){
                                    invalidFields.push('ToTime');
                                }
                                if(scheduleInfo.days.length === 0){
                                    invalidFields.push('Days');
                                }
                                if(scheduleInfo.ringTo === '' || scheduleInfo.ringTo === undefined || scheduleInfo.ringTo === null || scheduleInfo.ringTo.replace(/[^0-9]+/g, '').length !== 10){
                                    invalidFields.push('Ring to Phone Number');
                                }
                               _.each(scheduleInfo.overflowNumbers, function (overFlowNumber) {
                                    if(scheduleInfo.openOverflowBox && (overFlowNumber.overflowNumber === ""|| overFlowNumber.overflowNumber === undefined || overFlowNumber.overflowNumber === null || overFlowNumber.overflowNumber.replace(/[^0-9]+/g, '').length !== 10)){
                                        invalidFields.push('Overflow Ring to Phone Number');
                                    }
                                });
                            });
                        }
                    }
                    
                  
                    if(invalidFields.length > 0){
                        i = 0;
                    }
                }    
                _.each(scope.ivrActions, function(action){
                    scope.overflowNumberDuplicateL3 = [];
                    scope.duplicateRingToOverflowL3 = [];
                    _.forEach(action.overflowNumbers,function(num){
                        if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                            var overflowNumber = num.overflowNumber.replace(/[^0-9]+/g, '').replace(/^0+/, '');
                            var  ringToNum = action.ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '');
                                if(overflowNumber === ringToNum){
                                    scope.duplicateRingToOverflowL3.push(overflowNumber);
                                }
                            scope.overflowNumberDuplicateL3.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                        }
                    });
                    if((scope.overflowNumberDuplicateL3.length != _.uniq(scope.overflowNumberDuplicateL3, 'unmaskNumber').length) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                        pinesNotifications.notify({
                           title: '3rd level IVR Form',
                           text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                           type: 'error'
                        });
                        overflow_error = true;
                    }
                    if(!_.isEmpty(scope.duplicateRingToOverflowL3) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                        pinesNotifications.notify({
                            title: '3rd level IVR Form',
                            text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                            type: 'error'
                        });
                        overflow_error = true;
                    }
                }); 
                
                //})
                //console.log("invalidFields ==",invalidFields);
                for(var z = 0; z< scope.ivrActions.length; z++){
                   if( scope.ivrActions[z].keypress==scope.ivrActions[z].previousmenu)
                        {
                            pinesNotifications.notify({
                                title: 'Third level IVR Key Press',
                                text: 'keypress and backpress value should not be same',
                                type: 'error'
                            });
                            keycheck=true;
                        }
                }
                if(invalidFields.length > 0){
                    messageText = ' field is required.';
                    if (invalidFields.length > 1) {
                        messageText = ' fields are required.';
                    }
                   pinesNotifications.notify({
                        title: '3rd level IVR Form',
                        text: invalidFields.toString()+messageText,
                        type: 'error'
                    }); 
                  return false; 
                }else if(overflow_error){
                    return false;   
                }
                else if(keycheck){
                    return false;   
                }else{
                    return true;
                }
                
            };

            scope.inheritKeyPress = function(){
                  scope.thirdkeyPress = scope.ivrActions.slice(-1)[0].previousmenu;
                  for(var i = 0; i< scope.ivrActions.length; i++){
                  scope.ivrActions[i].previousmenu=scope.thirdkeyPress;
                  }
            };

            scope.addAction = function() {
                scope.inheritKeyPress();
                if(validateThirdLevel()){

                var addedAction;
                //validateKeyPress();
                    var tempHash = {
                        id: scope.tcAction.id + 1,
                        action: "simple",
                        action_order: scope.ivrActions[scope.ivrActions.length - 1].action_order + 1,
                        voicepromptURL: '',
                        TTSIVRSelected: true,
                        voicepromptId: '',
                        ringtoNum: "",
                        keypress: "",
                        destination:"",
                        previousmenu:scope.thirdkeyPress,
                        message_type:message_type,
                        message:message,
                        recordCall: false,
                        playDisclaimer: 'before',
                        activateVoiceMail: false,
                        geoRoute: {routeBy:"",geoList:"",radius:""},
                        scheduleRoute: [{timezone:'',default_ringto:'',activate_voicemail:false,recordCall: false,playDisclaimer: 'before',disableRC:false}],
                        overflowNumbers :[{overflowNumber:'',rings: scope.byDefaultRing,overflow_order: 1}],
                        openOverflowBox :false,
                        isSimultaneousRing :false,
                        isLocationIvr:isLocationIvr,
                        whisperPrompt : false,
                        TTSWhisperSelected: true,
                        whisperTTSText: '',
                        hasValidWhisperURL: '',
                        whisperURL:'',
                        disableRC:false,
                        voicemailComponent:false
                    };
                    scope.ivrActions.push(tempHash);
                }
            };
            scope.chkSpclChar = function (text, prompt,cb){
                var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
                if(format.test(text)){
                    pinesNotifications.notify({
                        title: prompt,
                        text: 'Special characters are not allowed',
                        type: 'error'
                    });
                    cb(text.replace(format, "")) ;
                }else{
                    cb(text) ;
                }
            };
            scope.voiceTextIvrChange = function(cAction) {
                if(scope.ivrAudio !== undefined){
                    scope.ivrAudio.pause();
                }
                scope.ivrAudio = undefined;
                if (cAction.voicepromptTTSText === undefined || cAction.voicepromptTTSText.length === 0) {
                    cAction.hasValidTTSVoiceURL = false;
                    cAction.TTSIVRSelected = true;
                } else {
                    scope.chkSpclChar(cAction.voicepromptTTSText, '3rd Level Voice Prompt',function(t){
                        cAction.voicepromptTTSText = t;
                        cAction.hasValidTTSVoiceURL= true;
                        cAction.TTSIVRSelected = true;
                    });
                }
            };

            scope.showIvrVoiceModal = function(cAction) {
                scope.disableBtn = true;
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignPrompt.html',
                    controller: 'voiceModal',
                    size: 'lg'
                });

                modalInstance.result.then(function() {
                    for (var i = 0; i < voicePromptService.prompts.length; i++) {
                        if (voicePromptService.prompts[i].selectedprompt === true) {
                            cAction.voicepromptText = voicePromptService.prompts[i].name;
                            cAction.voicepromptFileName = voicePromptService.prompts[i].filename;
                            cAction.voicepromptURL = voicePromptService.prompts[i].url;
                            cAction.voicepromptId = voicePromptService.prompts[i].id;
                         
                        }
                    }
                    cAction.TTSIVRSelected = false;
                    cAction.hasValidTTSVoiceURL = true;
                    cAction.voicepromptTTSText = '';
                    scope.disableBtn = false;
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                    scope.disableBtn = false;
                });
            };
            scope.disablePlayBtn = function($event){
                var allBtn = $('.playpadding').not(this);
                var voicemail = angular.element( document.querySelector( '#voicemail' ) );
                var thisElm = $event.currentTarget;
                var icon = thisElm.children[0];
                icon.classList.add("fa-pause");
                var checkClass = setInterval(function(){ 
                    var elm = icon.classList.contains("fa-pause");
                    //thisElm.classList.contains('fa-pause');
                    if(elm){
                            allBtn.each(function(i, obj) {
                                if (obj.disabled === false){
                                    obj.classList.add("customDisabled");
                                    scope.disableBtn = true;
                                }
                            });
                            thisElm.classList.remove("customDisabled");
                            voicemail.removeClass("customDisabled");
                        }else{
                            allBtn.removeClass("customDisabled");
                            voicemail.removeClass("customDisabled");
                            scope.disableBtn = false;
                            clearInterval(checkClass);
                        }
                    }, 100);
        };
        
            var stopAudio = function() {
                if (scope.ivrAudio !== undefined) {
                    scope.ivrAudio.pause();
                    scope.ivrAudio = undefined;
                }
                if (scope.whisperAudio !== undefined) {
                    scope.whisperAudio.pause();
                    scope.whisperAudio = undefined;
                }
            };

            if(scope.tcAction.TTSIVRSelected){
                message_type = 'text';
                message = scope.tcAction.voicepromptTTSText;
            }
            else{
                message_type = 'file';
                message = scope.tcAction.voicepromptFileName;
            }

            scope.playTtsVoiceAudio = function(cAction) {
                if (scope.ivrAudio !== undefined && !scope.ivrAudio.paused) {
                    scope.ivrAudio.pause();
                } else if (scope.ivrAudio !== undefined && scope.ivrAudio.paused) {
                    scope.ivrAudio.play();
                } else {
                    if (cAction.voicepromptTTSText.length > 0) {
                        scope.ivrAudio = new Audio();
                        scope.onTTS_IVR_Request = true;
                        CampaignWebService.getTTS(cAction.voicepromptTTSText).then(function(result) {
                            if (result.data.json.length > 1) {
                                var TTSData = result.data.json;
                                var source = "data:audio/mp3;base64," + TTSData;
                                scope.ivrAudio.src = source;
                                if (scope.ivrAudio.paused) {
                                    scope.ivrAudio.play();
                                } else {
                                    scope.ivrAudio.pause();
                                }
                            }
                             scope.onTTS_IVR_Request = undefined;
                        });
                    } else {
                        scope.ivrAudio = new Audio(cAction.voicepromptURL);
                        scope.ivrAudio.play();
                    }
                }
            };
            scope.retainDataOnChange = function(){
				scope.tcAction.scheduleRoute.default_ringto = scope.tcAction.ringtoNum ;
				scope.tcAction.scheduleRoute.activate_voicemail = scope.tcAction.activateVoiceMail; 
				scope.tcAction.scheduleRoute.recordCall = scope.tcAction.recordCall;
				scope.tcAction.scheduleRoute.disableRC = scope.tcAction.disableRC;
			};	
            scope.getGeoLocationList = function(){
                CampaignWebService.getGeoLocations().then(function(result) {
                    if (result.data.result != 'error') {
                        scope.georoutelocations = [];
                        var locationData = result.data.json.locations;
                        locationData.forEach(function(loc) {
                            if (loc.count > 0) {
                                scope.georoutelocations.push({
                                    id: loc.id,
                                    name: loc.name
                                });
                            }
                        });
                        
                    }
                });
            };
        };

        return {
            restrict: "E",
            link: link,
            scope: {
                level: "=",
                ivrActions: "=",
                tcactionId: "=",
                tcAction: "=",
                georoutelocations: "=",
                removeSelectedIvrVoiceAudio: "&",
                audioIsDownloading: "&",
                audioIsPlaying :"&",
                showIvrVoiceModal: "&",
                playTtsVoiceAudio: "&",
                voiceTextIvrChange: "&",
                voicePrompts: "=",
                stopAudio: "&",
                showSubmitFunction : '&showSubmit',
                isLocationIvr: "=",
                byDefaultRing:"=",
                validateIvr: "&",
                defaultData:"=",
                showSubmitOverflow: "&",
                disableRC:"=",
                voicemailComponent:"=",
                disableSaveForSchedule:"="
            },
            controller: function($scope,$rootScope){
                if($scope.locObj === undefined || $scope.locObj===null || $scope.locObj===""){
                    $scope.locObj={id:'',name:''};
                }
                $scope.overflowValidationHeader = "3rd level IVR";
                if($scope.defaultData !== ''  && $scope.defaultData !== undefined ){
                    if($scope.defaultData.play_whisper_message === true){
                        $scope.tcAction.whisperTTSText = '';
                        $scope.whisperAudio = undefined;
                        var whisperMessage = $scope.defaultData.play_whisper_message_text;
                        var whisperSubstring = $scope.defaultData.play_whisper_message_text.substring(0, 7);
                        if (whisperSubstring == "file://") {
                            $scope.tcAction.TTSWhisperSelected = false;
                            $scope.tcAction.whisperPrompt = $scope.defaultData.play_whisper_message;
                    
                            $scope.tcAction.whisperText = $scope.defaultData.whisper_message_name;
                            $scope.tcAction.whisperFileName = whisperMessage.replace("file://", '');
                            $scope.tcAction.whisperURL = $scope.defaultData.whisper_message_url;
                            $scope.tcAction.whisperId = $scope.defaultData.whisper_id;
                            $scope.tcAction.hasValidWhisperURL = true;
                        }else {
                            $scope.tcAction.TTSWhisperSelected = true;
                            $scope.tcAction.whisperPrompt = $scope.defaultData.play_whisper_message;
                            $scope.tcAction.whisperTTSText = whisperMessage;
                            $scope.tcAction.whisperFileName = whisperMessage;
                        }
                    }
                    
                    if($scope.defaultData.play_voice_prompt_first === true){
                        $scope.ivrAudio = undefined;
                        $scope.tcAction.voicepromptTTSText = '';
                        var message = $scope.defaultData.play_voice_prompt_first_text;
                        var substring = message.substring(0, 7);
                        if (substring == "file://") {
                            $scope.tcAction.TTSIVRSelected = false;
                            $scope.tcAction.hasValidTTSVoiceURL = true;
                            $scope.tcAction.voicepromptText = $scope.defaultData.prompt_message_name;
                            $scope.tcAction.voicepromptFileName = message.replace("file://", '');
                            $scope.tcAction.voicepromptURL = $scope.defaultData.voice_prompt_url;
                            $scope.tcAction.voicepromptId = $scope.defaultData.voice_prompt_id;
                            $scope.tcAction.hasValidTTSVoiceURL = true;
                        } else {
                            $scope.tcAction.TTSIVRSelected = true;
                            $scope.tcAction.voicepromptTTSText = message;
                            $scope.tcAction.voicepromptFileName = message;
                        }
                    }
                    

                    //$scope.tcAction.recordCall = $scope.defaultData.record_call; 
                    $scope.tcAction.playDisclaimer = $scope.defaultData.play_disclaimer;
                    // $scope.tcAction.activateVoiceMail = $scope.defaultData.activate_voicemail;
                    $scope.tcAction.activateVoiceMail = $scope.voicemailComponent === false ? $scope.tcAction.activateVoiceMail = false :$scope.defaultData.activate_voicemail;
                    if($scope.tcAction.activateVoiceMail){
                        $scope.tcAction.recordCall = true;
                        $scope.tcAction.disableRC = true;
                    }else{
                        $scope.tcAction.recordCall = $scope.defaultData.record_call;
                    }
                }

                $scope.pauseCurrentPlayingAudio = function(){
                    var allBtn = $('.playpadding');
                        allBtn.each(function(i, obj) {
                            obj.children[0].classList.remove("fa-pause");
                        });
                    $rootScope.$emit("stopIvrAudios", {});
                };
                
                $rootScope.$on("stopIvrAudios", function(){
                    if($scope.ivrAudio){
                        $scope.ivrAudio.pause();  
                    }
                    if($scope.ivrAudio1)
                    {
                        $scope.ivrAudio1.pause();
                    }
                    if($scope.whisperAudio){
                        $scope.whisperAudio.pause();
                    }
                 });
                
              },
            templateUrl: "views/directives/third_multi_level_ivr.html"
        };
    }
    ]);  

    app.directive('secondMultiLevelIvr', ['pinesNotifications','$uibModal','$bootbox','VoicePromptService','WhisperMessageService','CampaignWebService', function (pinesNotifications,$uibModal,$bootbox,voicePromptService,whispermessageService,CampaignWebService) {
        var link = function(scope,rootScope) {
            scope.idnum = scope.ivrActions.length;
             var message_type = "";
            var message = "";
            var isLocationIvr=false;           
            if(!scope.byDefaultRing){
                scope.byDefaultRing = 3;
            }
            if(!scope.scAction.ivrActions || !scope.scAction.ivrActions.length){
                scope.scAction.ivrActions = [];
                scope.scAction.ivrActions = [{
                    id: 1,
                    action: "simple",
                    action_order: 1,
                    TTSIVRSelected: true,
                    voicepromptURL: '',
                    voicepromptId: '',
                    ringtoNum: "",
                    keypress: "",
                    destination:"",
                    previousmenu:"",
                    message_type:message_type,
                    message:message,
                    recordCall: false,
                    activateVoiceMail: false,
                    playDisclaimer: 'before',
                    geoRoute: {routeBy:"", geoList:"", radius:""},
                    scheduleRoute: [{timezone:'',default_ringto:'',activate_voicemail:false,recordCall: false,playDisclaimer: 'before',disableRC:false}],
                    overflowNumbers :[{overflowNumber:'', rings: scope.byDefaultRing ,overflow_order: 1}],
                    openOverflowBox :false,
                    isSimultaneousRing :false,
                    whisperPrompt : false,
                    TTSWhisperSelected: true,
                    whisperTTSText: '',
                    hasValidWhisperURL: '',
                    whisperURL:'',
                    isLocationIvr:isLocationIvr,
                    disableRC:false,
                    voicemailComponent:false
                }];
            }    
            if(scope.scAction.ringtoNum && scope.scAction.ringtoNum.replace(/[^0-9]+/g, '').length == 10){
                scope.scAction.isValidRingTo = true;
            }else{
                scope.scAction.isValidRingTo = false;
            }
            if(scope.scAction.geoRoute !== undefined && scope.scAction.geoRoute !== null && scope.scAction.geoRoute !== ""){
            if(scope.scAction.geoRoute.geoList && scope.scAction.geoRoute.geoList !== undefined && scope.scAction.geoRoute.geoList !== "" && scope.scAction.geoRoute.geoList !== null){
                scope.georoutelocations.forEach(function(loc) {
                    if(loc.id === parseInt(scope.scAction.geoRoute.geoList)){
                        scope.locObj=loc;
                    }
                });
            }else{
                scope.locObj={id:'',name:''};
            }
        }
            scope.changeLocId = function (locObj) {
                scope.scAction.geoRoute.geoList = locObj.id;
            };
            scope.removeIvrAction = function(scactionId) {
                $bootbox.confirm("Are you sure you want to delete this IVR Action?", function(clickedOK) {
                    if (clickedOK) {
                        var allBtn = $('.playpadding');
                        allBtn.each(function(i, obj) {
                            obj.children[0].classList.remove("fa-pause");
                        });
                        scope.pauseCurrentPlayingAudio();
                        var keepLooking = true;
                        $.each(scope.ivrActions, function(index, value) {
                            if (keepLooking && value.id == scactionId) {
                                scope.ivrActions.splice(index, 1);
                                keepLooking = false;
                            }
                        });

                        $.each(scope.ivrActions, function(index, value) {
                            if (value.id > scactionId && scactionId !== 0) {
                                scope.ivrActions[index].id = (value.id - 1);
                            }
                            if (value.id === 0) {
                                scope.ivrActions[index].id = (index + 1);
                            }
                        });
                        pinesNotifications.notify({
                            title: 'Multilevel IVR Key Press',
                            text: 'Deleted Successfully',
                            type: 'success'
                        });
                    }
                });
            };
             scope.showSubmit = function(){
                scope.showSubmitFunction();
                if(scope.scAction.ringtoNum && scope.scAction.ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '').length == 10){
                    scope.scAction.isValidRingTo = true;
                }else{
                    scope.scAction.isValidRingTo = false;
                }
            };
            var validateKeyPress = function(action) {
                scope.keypressDuplicate = [];
             _.each( scope.ivrActions, function(action){
                 console.log("action.keypress",action.keypress);
                scope.keypressDuplicate.push(action.keypress);
               
            });
            scope.keypress = _.uniq(scope.keypressDuplicate);
                 if (scope.keypress.length !== scope.keypressDuplicate.length){
                    pinesNotifications.notify({
                        title: 'Multilevel IVR Form',
                        text: 'Duplicate Key Press Numbers are not allowed',
                        type: 'error'
                    });
                 }
            };
            scope.chkSpclChar = function (text, prompt,cb){
                var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
                if(format.test(text)){
                    pinesNotifications.notify({
                        title: prompt,
                        text: 'Special characters are not allowed',
                        type: 'error'
                    });
                    cb(text.replace(format, "")) ;
                }else{
                    cb(text) ;
                }
            };
            scope.whisperIVRTextChange = function(scAction) {
                if(scAction.whisperTTSText !== undefined && scAction.whisperTTSText.length !== 0){
                    scope.chkSpclChar(scAction.whisperTTSText, '2nd Level Whisper Message', function(t){
                        scAction.whisperTTSText = t;
                    });
                }
                if(scope.whisperAudio !== undefined){
                    scope.whisperAudio.pause();
                }
                scope.whisperAudio = undefined;
                if (scAction.whisperText === undefined || scAction.whisperText.length === 0) {
                    scAction.hasValidWhisperURL = false;
                    scAction.TTSWhisperSelected = true;
                } else {
                    scope.chkSpclChar(scAction.voicepromptTTSText, '2nd Level Voice Prompt',function(t){
                        scAction.voicepromptTTSText = t;
                        scAction.hasValidWhisperURL= true;
                        scAction.TTSWhisperSelected = true;
                    });

                    
                }
            };
            scope.removeSelectedWhisperAudio = function(scAction) {
                if (scope.whisperAudio !== undefined)  
                    scope.whisperAudio.pause();
                    scope.whisperAudio = undefined;
                    scAction.TTSWhisperSelected = true;
                    scAction.whisperTTSText = '';
                    scAction.hasValidWhisperURL = false;
                    scAction.whisperURL ='';
            };      
            scope.showIVRWhisperModal = function(scAction) {
                scope.disableBtn = true;
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignWhisper.html',
                    controller: 'whisperModal',
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false
                });

                modalInstance.result.then(function() {
                    for (var i = 0; i < whispermessageService.whispers.length; i++) {
                        if (whispermessageService.whispers[i].selectedwhisper === true) {
                            scAction.whisperText = whispermessageService.whispers[i].name;
                            scAction.whisperFileName = whispermessageService.whispers[i].filename;
                            scAction.whisperId = whispermessageService.whispers[i].id;
                            scAction.whisperURL = whispermessageService.whispers[i].url;
                            scAction.whisperAudio = undefined;
                            scAction.hasValidWhisperURL = true;
                            scAction.TTSWhisperSelected = true;
                        }
                        
                    }
                    // if((scAction.whisperText).length > 15){
                    //     var str = (scAction.whisperText).slice(0,10);
                    //     scAction.whisperDisplay = str.concat('...')
                    // }else{
                    //     scAction.whisperDisplay = scAction.whisperText;
                    // }
                    scope.whisperAudio = undefined;
                    scAction.TTSWhisperSelected = false;
                    scAction.hasValidWhisperURL = true;
                    scAction.whisperTTSText = '';
                    scope.disableBtn = false;
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                    scope.disableBtn = false;
                });

            };
            scope.playWhisperAudio = function(scAction) {
                if (scope.whisperAudio !== undefined && !scope.whisperAudio.paused) {
                    scope.whisperAudio.pause();
                } else if (scope.whisperAudio !== undefined && scope.whisperAudio.paused) {
                    scope.whisperAudio.play();
                } else {
                    if (scAction.whisperTTSText.length > 0) {
                        scope.whisperAudio = new Audio();
                        scope.onTTS_IVR_Request = true;
                        CampaignWebService.getTTS(scAction.whisperTTSText).then(function(result) {
                            if (result.data.json.length > 1) {
                                var TTSData = result.data.json;
                                var source = "data:audio/mp3;base64," + TTSData;
                                scope.whisperAudio.src = source;
                                if (scope.whisperAudio.paused) {
                                    scope.whisperAudio.play();
                                } else {
                                    scope.whisperAudio.pause();
                                }
                            }
                             scope.onTTS_IVR_Request = undefined;
                        });
                    } else {
                        scope.whisperAudio = new Audio(scAction.whisperURL);
                        scope.whisperAudio.play();
                    }
                }
            };

            scope.whisperAudioIsPlaying = function() {
                if (scope.whisperAudio !== undefined && !scope.whisperAudio.paused && !scope.whisperAudio.ended)
					return true;
                return false;
            };

            scope.disableRecordCall = function(){
                if(!scope.scAction.activateVoiceMail){
                    scope.scAction.disableRC = true;
                    scope.scAction.recordCall = true;
                }else{
                    scope.scAction.disableRC = false;
                    scope.scAction.recordCall = true;
                }
            };

            var validateSecondLevel = function(){
                var messageText;
                var keycheck = false;
                //_.each(scope.ivrActions, function(ivr){
                var invalidFields = [];
                var overflow_error = false;
                for (var i = scope.ivrActions.length - 1; i >= 0; i--) {
                    //scope.ivrActions[i]
                    console.log("ivr =",  scope.ivrActions[i]);
                    // common input fileds
                    if( scope.ivrActions[i].keypress === '' || scope.ivrActions[i].keypress === undefined ||  scope.ivrActions[i].keypress === null){
                        invalidFields.push('Keypress');
                        }
                    if( scope.ivrActions[i].destination === '' || scope.ivrActions[i].destination === undefined || scope.ivrActions[i].destination === null){
                        invalidFields.push('Destination');
                        }
                    if((scope.ivrActions[i].voicepromptTTSText ==='' || scope.ivrActions[i].voicepromptTTSText === undefined || scope.ivrActions[i].voicepromptTTSText === null) && (scope.ivrActions[i].voicepromptURL === '' || scope.ivrActions[i].voicepromptURL === undefined || scope.ivrActions[i].voicepromptURL === null) && scope.ivrActions[i].action === "interactiveVoice"){
                        invalidFields.push('Voice Prompt');
                    }
                    if( scope.ivrActions[i].previousmenu  === "" || scope.ivrActions[i].previousmenu === undefined || scope.ivrActions[i].previousmenu === null){
                        invalidFields.push('Go Back to the previous menu');
                    }
                    if( scope.ivrActions[i].action !== "interactiveVoice"){
                     // Route type = simple and geo
                        if(scope.ivrActions[i].openOverflowBox===true && scope.ivrActions[i].overflowNumbers.length > 0){
                            angular.forEach(scope.ivrActions[i].overflowNumbers,function (overFlowNumber) {
                                if(overFlowNumber.overflowNumber === "" || overFlowNumber.overflowNumber === undefined || overFlowNumber.overflowNumber === null || overFlowNumber.overflowNumber.replace(/[^0-9]+/g, '').length !== 10){
                                    invalidFields.push('Overflow Ring to Phone Number');
                                }
                            });
                        }
                        if(  scope.ivrActions[i].recordCall){
                                if(scope.ivrActions[i].playDisclaimer === "true" || scope.ivrActions[i].playDisclaimer === "" || scope.ivrActions[i].playDisclaimer === undefined || scope.ivrActions[i].playDisclaimer === null){
                                    invalidFields.push('Play call recording disclaimer');
                                }
                        }
                       if(scope.ivrActions[i].whisperPrompt){
                         if( (scope.ivrActions[i].whisperTTSText === undefined || scope.ivrActions[i].whisperTTSText === '' || scope.ivrActions[i].whisperTTSText === null) && (scope.ivrActions[i].whisperURL === '' || scope.ivrActions[i].whisperURL === undefined ||  scope.ivrActions[i].whisperURL === null)){
                            invalidFields.push('Play whisper message before connecting');
                         } 
                       }
                       // Rote type =simple
                        if( scope.ivrActions[i].action === 'simple'){
                            if( scope.ivrActions[i].ringtoNum === '' ||  scope.ivrActions[i].ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '').length !== 10){
                                invalidFields.push('Ring to Phone Number');
                                scope.ivrActions[i].isValidRingTo = false;
                            }
                           
                        }
                           // Rote type =geo
                        if( scope.ivrActions[i].action === "geo"){
                            //Route By
                            if( scope.ivrActions[i].geoRoute.routeBy === '' || scope.ivrActions[i].geoRoute.routeBy === undefined){
                                invalidFields.push('Route By');
                            }
                            //Location List
                             if( scope.ivrActions[i].geoRoute.geoList === '' || scope.ivrActions[i].geoRoute.geoList === undefined){
                                invalidFields.push('Location List');
                            }
                            if( scope.ivrActions[i].ringtoNum === '' ||  scope.ivrActions[i].ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '').length !== 10){
                            invalidFields.push('Default Number');
                            scope.ivrActions[i].isValidRingTo = true;
                            }
                            if((scope.ivrActions[i].geoRoute.routeBy === 'Zipcode' || scope.ivrActions[i].geoRoute.routeBy === 'Npa') && (scope.ivrActions[i].geoRoute.radius === '' || scope.ivrActions[i].geoRoute.radius === undefined)){
                                invalidFields.push('Proximity Limit');    
                            }
                          
                        }
                        // Route type = schedule
                        if( scope.ivrActions[i].action === "schedule"){
                            if( scope.ivrActions[i].scheduleRoute.timezone ==='' || scope.ivrActions[i].scheduleRoute.timezone === undefined|| scope.ivrActions[i].scheduleRoute.timezone === null){
                                invalidFields.push('Time Zone');
                            }
                            _.each(scope.ivrActions[i].scheduleRoute.scheduleInfo,function(scheduleInfo){
                                if(scheduleInfo.fromTime === '' || scheduleInfo.fromTime === undefined || scheduleInfo.fromTime === null){
                                    invalidFields.push('FromTime');
                                }
                                if(scheduleInfo.toTime === '' || scheduleInfo.toTime === undefined || scheduleInfo.toTime === null){
                                    invalidFields.push('ToTime');
                                }
                                if(scheduleInfo.days.length === 0){
                                    invalidFields.push('Days');
                                }
                                if(scheduleInfo.ringTo === '' || scheduleInfo.ringTo === undefined || scheduleInfo.ringTo === null || scheduleInfo.ringTo.replace(/[^0-9]+/g, '').length !== 10){
                                    invalidFields.push('Ring to Phone Number');
                                }
                                _.each(scheduleInfo.overflowNumbers, function (overFlowNumber) {
                                    if(scheduleInfo.openOverflowBox && (overFlowNumber.overflowNumber === ""|| overFlowNumber.overflowNumber === undefined || overFlowNumber.overflowNumber === null || overFlowNumber.overflowNumber.replace(/[^0-9]+/g, '').length !== 10)){
                                        invalidFields.push('Overflow Ring to Phone Number');
                                    }
                                });
                            });
                        }
                    }
                    
                  
                    if(invalidFields.length > 0){
                        i = 0;
                    }
                }    
                _.each(scope.ivrActions, function(action){
                    scope.overflowNumberDuplicateL2 = [];
                    scope.duplicateRingToOverflowL2 = [];
                    _.forEach(action.overflowNumbers,function(num){
                        if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                            var overflowNumber = num.overflowNumber.replace(/[^0-9]+/g, '').replace(/^0+/, '');
                            var  ringToNum = action.ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '');
                                if(overflowNumber === ringToNum){
                                    scope.duplicateRingToOverflowL2.push(overflowNumber);
                                }
                            scope.overflowNumberDuplicateL2.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                        }
                    });
                    if((scope.overflowNumberDuplicateL2.length != _.uniq(scope.overflowNumberDuplicateL2, 'unmaskNumber').length) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                        pinesNotifications.notify({
                           title: '2nd level IVR Form',
                           text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                           type: 'error'
                        });
                        overflow_error = true;
                    }
                    if(!_.isEmpty(scope.duplicateRingToOverflowL2) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                        pinesNotifications.notify({
                            title: '2nd level IVR Form',
                            text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                            type: 'error'
                        });
                        overflow_error = true;
                    }
                });
                //})
                //console.log("invalidFields ==",invalidFields);
                for(var z = 0; z< scope.ivrActions.length; z++){
                    if( scope.ivrActions[z].keypress==scope.ivrActions[z].previousmenu)
                    {
                        pinesNotifications.notify({
                            title: 'Secong level IVR Key Press',
                            text: 'keypress and backpress value should not be same',
                            type: 'error'
                        });
                        keycheck=true;
                    }
                }
                if(invalidFields.length > 0){
                    messageText = ' field is required.';
                    if (invalidFields.length > 1) {
                        messageText = ' fields are required.';
                    }
                   pinesNotifications.notify({
                        title: '2nd level IVR Form',
                        text: invalidFields.toString()+messageText,
                        type: 'error'
                    }); 
                  return false;  
              }
              else if(keycheck){
                return false;   
              }
              else if(overflow_error){
                return false;   
              }else{
                return true;
              }
                
            };

            scope.inheritKeyPress = function(){
                scope.secondkeyPress = scope.ivrActions.slice(-1)[0].previousmenu;
                  for(var i = 0; i< scope.ivrActions.length; i++){
                  scope.ivrActions[i].previousmenu=scope.secondkeyPress;
                  }
            };
            scope.addAction = function() {
               // validateKeyPress();
               scope.inheritKeyPress();
               if(validateSecondLevel()){

                var addedAction;
                    var tempHash = {
                        id: scope.scAction.id + 1,
                        action: "simple",
                        action_order: scope.ivrActions[scope.ivrActions.length - 1].action_order + 1,
                        TTSIVRSelected: true,
                        voicepromptURL: '',
                        voicepromptId: '',
                        ringtoNum: "",
                        keypress: "",
                        destination:"",
                        previousmenu:scope.secondkeyPress,
                        message_type:message_type,
                        message:message,
                        recordCall: false,
                        activateVoiceMail: false,
                        playDisclaimer: 'before',
                        geoRoute: {routeBy:"", geoList:"", radius:""},
                        scheduleRoute: [{timezone:'',default_ringto:'',activate_voicemail:false,recordCall: false,playDisclaimer: 'before',disableRC:false}],
                        overflowNumbers :[{overflowNumber:'',rings: scope.byDefaultRing,overflow_order: 1}],
                        openOverflowBox :false,
                        isSimultaneousRing :false,
                        isLocationIvr:isLocationIvr,
                        whisperPrompt : false,
                        TTSWhisperSelected: true,
                        whisperTTSText: '',
                        hasValidWhisperURL: '',
                        whisperURL:'',
                        disableRC:false,
                        voicemailComponent:false
                    };
                    scope.ivrActions.push(tempHash);
               }
            };

            scope.removeSelectedIvrVoiceAudio = function(cAction) { 
                if (scope.ivrAudio !== undefined)  
                    scope.ivrAudio.pause();    
                scope.ivrAudio = undefined;    
                cAction.voicepromptURL = undefined;    
                cAction.voicepromptTTSText = "";   
                cAction.TTSIVRSelected = true; 
                cAction.voicepromptText = "";
                cAction.hasValidTTSVoiceURL = false;   
            };

            scope.voiceTextIvrChange = function(scAction) {
                if(scope.ivrAudio !== undefined){
                    scope.ivrAudio.pause();
                }
                scope.ivrAudio = undefined;
                if (scAction.voicepromptTTSText === undefined || scAction.voicepromptTTSText.length === 0) {
                    scAction.hasValidTTSVoiceURL = false;
                    scAction.TTSIVRSelected = true;
                } else {
                    scope.chkSpclChar(scAction.voicepromptTTSText, '2nd Level Voice Prompt',function(t){
                        scAction.voicepromptTTSText = t;
                        scAction.hasValidTTSVoiceURL= true;
                        scAction.TTSIVRSelected = true;   
                    });                    
                    
                }
            };
            scope.disablePlayBtn = function($event){
                var allBtn = $('.playpadding');
                var voicemail = angular.element( document.querySelector( '#voicemail' ) );
                var thisElm = $event.currentTarget;
                var icon = thisElm.children[0];
                icon.classList.add("fa-pause");
                var checkClass = setInterval(function(){ 
                    var elm = icon.classList.contains("fa-pause");
                    //thisElm.classList.contains('fa-pause');
                    if(elm){
                            allBtn.each(function(i, obj) {
                                if (obj.disabled === false){
                                    obj.classList.add("customDisabled");
                                    scope.disableBtn = true;
                                }
                            });
                            thisElm.classList.remove("customDisabled");
                            voicemail.removeClass("customDisabled");
                        }else{
                            allBtn.removeClass("customDisabled");
                            voicemail.removeClass("customDisabled");
                            scope.disableBtn = false;
                            clearInterval(checkClass);
                        }
                    }, 100);
        };
        
            scope.showIvrVoiceModal = function(scAction) {
                scope.disableBtn = true;
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignPrompt.html',
                    controller: 'voiceModal',
                    size: 'lg'
                });

                modalInstance.result.then(function() {
                    for (var i = 0; i < voicePromptService.prompts.length; i++) {
                        if (voicePromptService.prompts[i].selectedprompt === true) {
                            scAction.voicepromptText = voicePromptService.prompts[i].name;
                            scAction.voicepromptFileName = voicePromptService.prompts[i].filename;
                            scAction.voicepromptURL = voicePromptService.prompts[i].url;
                            scAction.voicepromptId = voicePromptService.prompts[i].id;
                         
                        }
                    }
                    scAction.TTSIVRSelected = false;
                    scAction.hasValidTTSVoiceURL = true;
                    scAction.voicepromptTTSText = '';
                    scope.disableBtn = false;
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                    scope.disableBtn = false;
                });
            };

            var stopAudio = function() {
                if (scope.ivrAudio !== undefined) {
                    scope.ivrAudio.pause();
                    scope.ivrAudio = undefined;
                }
                if (scope.whisperAudio !== undefined) {
                    scope.whisperAudio.pause();
                    scope.whisperAudio = undefined;
                }
            };

            scope.playTtsVoiceAudio = function(scAction) {
                if (scope.ivrAudio !== undefined && !scope.ivrAudio.paused) {
                    scope.ivrAudio.pause();
                } else if (scope.ivrAudio !== undefined && scope.ivrAudio.paused) {
                    scope.ivrAudio.play();
                } else {
                    if (scAction.voicepromptTTSText.length > 0) {
                        scope.ivrAudio = new Audio();
                        scope.onTTS_IVR_Request = true;
                        CampaignWebService.getTTS(scAction.voicepromptTTSText).then(function(result) {
                            if (result.data.json.length > 1) {
                                var TTSData = result.data.json;
                                var source = "data:audio/mp3;base64," + TTSData;
                                scope.ivrAudio.src = source;
                                if (scope.ivrAudio.paused) {
                                    scope.ivrAudio.play();
                                } else {
                                    scope.ivrAudio.pause();
                                }
                            }
                             scope.onTTS_IVR_Request = undefined;
                        });
                    } else {
                        scope.ivrAudio = new Audio(scAction.voicepromptURL);
                        scope.ivrAudio.play();
                    }
                }
            };
            scope.retainDataOnChange = function(){
				scope.scAction.scheduleRoute.default_ringto = scope.scAction.ringtoNum ;
				scope.scAction.scheduleRoute.activate_voicemail = scope.scAction.activateVoiceMail; 
				scope.scAction.scheduleRoute.recordCall = scope.scAction.recordCall;
				scope.scAction.scheduleRoute.disableRC = scope.scAction.disableRC;
			};	
            scope.getGeoLocationList = function(){
                CampaignWebService.getGeoLocations().then(function(result) {
                    if (result.data.result != 'error') {
                        scope.georoutelocations = [];
                        var locationData = result.data.json.locations;
                        locationData.forEach(function(loc) {
                            if (loc.count > 0) {
                                scope.georoutelocations.push({
                                    id: loc.id,
                                    name: loc.name
                                });
                            }
                        });
                        
                    }
                });
            };
            if(scope.scAction.TTSIVRSelected){
                message_type = 'text';
                message = scope.scAction.voicepromptTTSText;
            }
            else{
                message_type = 'file';
                message = scope.scAction.voicepromptFileName;
            }

        };

        return {
            restrict: "E",
            link: link,
            scope: {
                level: "=",
                ivrActions: "=",
                scactionId: "=",
                scAction: "=",
                georoutelocations: "=",
                removeSelectedIvrVoiceAudio: "&",
                audioIsDownloading: "&",
                audioIsPlaying :"&",
                showIvrVoiceModal: "&",
                playTtsVoiceAudio: "&",
                voiceTextIvrChange: "&",
                voicePrompts: "=",
                stopAudio: "&",
                showSubmitFunction : '&showSubmit',
                isLocationIvr:"=",
                byDefaultRing:"=",
                defaultData:"=",
                showSubmitOverflow: "&",
                disableRC: "=",
                voicemailComponent:"=",
                disableSaveForSchedule:"="
            },controller: function($scope,$rootScope){
                if($scope.locObj === undefined || $scope.locObj === null || $scope.locObj === ""){
                    $scope.locObj={id:'',name:''};
                }
                $scope.overflowValidationHeader = "2nd level IVR";
                if($scope.defaultData !== ''  && $scope.defaultData !== undefined ){
                    if($scope.defaultData.play_whisper_message === true){
                        $scope.scAction.whisperTTSText = '';
                        $scope.whisperAudio = undefined;
                        var whisperMessage = $scope.defaultData.play_whisper_message_text;
                        var whisperSubstring = $scope.defaultData.play_whisper_message_text.substring(0, 7);
                        if (whisperSubstring == "file://") {
                            $scope.scAction.TTSWhisperSelected = false;
                            $scope.scAction.whisperPrompt = $scope.defaultData.play_whisper_message;
                    
                            $scope.scAction.whisperText = $scope.defaultData.whisper_message_name;
                            $scope.scAction.whisperFileName = whisperMessage.replace("file://", '');
                            $scope.scAction.whisperURL = $scope.defaultData.whisper_message_url;
                            $scope.scAction.whisperId = $scope.defaultData.whisper_id;
                            $scope.scAction.hasValidWhisperURL = true;
                        }else {
                            $scope.scAction.TTSWhisperSelected = true;
                            $scope.scAction.whisperPrompt = $scope.defaultData.play_whisper_message;
                            $scope.scAction.whisperTTSText = whisperMessage;
                            $scope.scAction.whisperFileName = whisperMessage;
                        }
                    }
                    

                    if($scope.defaultData.play_voice_prompt_first === true){
                        $scope.ivrAudio = undefined;
                        $scope.scAction.voicepromptTTSText = '';
                        var message = $scope.defaultData.play_voice_prompt_first_text;
                        var substring = message.substring(0, 7);
                        if (substring == "file://") {
                            $scope.scAction.TTSIVRSelected = false;
                            $scope.scAction.hasValidTTSVoiceURL = true;
                            $scope.scAction.voicepromptText = $scope.defaultData.prompt_message_name;
                            $scope.scAction.voicepromptFileName = message.replace("file://", '');
                            $scope.scAction.voicepromptURL = $scope.defaultData.voice_prompt_url;
                            $scope.scAction.voicepromptId = $scope.defaultData.voice_prompt_id;
                            $scope.scAction.hasValidTTSVoiceURL = true;
                        } else {
                            $scope.scAction.TTSIVRSelected = true;
                            $scope.scAction.voicepromptTTSText = message;
                            $scope.scAction.voicepromptFileName = message;
                        }
                    }
                    

                    //$scope.scAction.recordCall = $scope.defaultData.record_call; 
                    $scope.scAction.playDisclaimer = $scope.defaultData.play_disclaimer;
                    // $scope.scAction.activateVoiceMail = $scope.defaultData.activate_voicemail;
                    $scope.scAction.activateVoiceMail = $scope.voicemailComponent === false ? $scope.scAction.activateVoiceMail = false :$scope.defaultData.activate_voicemail;
                    if($scope.scAction.activateVoiceMail){
                        $scope.scAction.recordCall = true;
                        $scope.scAction.disableRC = true;
                    }else{
                        $scope.scAction.recordCall = $scope.defaultData.record_call;
                    }
                }

                $scope.pauseCurrentPlayingAudio = function(){
                    var allBtn = $('.playpadding');
                        allBtn.each(function(i, obj) {
                            obj.children[0].classList.remove("fa-pause");
                        });
                    $rootScope.$emit("stopIvrAudios", {});
                };

                $rootScope.$on("stopIvrAudios", function(){
                    if($scope.ivrAudio){
                        $scope.ivrAudio.pause();  
                    }
                    if($scope.ivrAudio1)
                    {
                        $scope.ivrAudio1.pause();
                    }
                    if($scope.whisperAudio){
                        $scope.whisperAudio.pause();
                    }
                 });
              },
            templateUrl: "views/directives/second_multi_level_ivr.html"
        };
    }
    ]);
    app.factory("MaxNumbersService", [function(){

        /**
         * Contructor
         */
        function MaxInteger(val, allowedIntegerLength, allowedDecimalLength){
            this.val = val.toString();
            this.pointIndex = this.val.indexOf('.');
            this.integersLength = (this.pointIndex !== -1) ? (this.val.substring(0, this.pointIndex)).length : this.val.length;
            //TODO what if finishes by a point
            this.decimalsLength = (this.pointIndex !== -1) ? (this.val.substring(this.pointIndex + 1)).length : 0;
      
            this.allowedIntegerLength = allowedIntegerLength;
            this.allowedDecimalLength = allowedDecimalLength;
      
            this.hasChanged = false;
        }
      
        MaxInteger.prototype.isNotANumber = function(){
            return isNaN(Number(this.val));
        };
      
        MaxInteger.prototype.handleIsNaN = function(){
            while(true){
                if(isNaN(Number(this.val))){
                    this.val = this.val.substr(0, this.val.length - 1);
                } else{
                    break;
                }
            }
            this.hasChanged = true;
        };
      
        MaxInteger.prototype.throwDecimals = function(){
            var incrementer = (this.allowedDecimalLength) ? this.allowedDecimalLength + 1 : 0;
            this.val = this.val.substring(0, this.pointIndex + incrementer);
            this.hasChanged = true;
        };
      
        MaxInteger.prototype.hasDecimals = function(){
            return this.val.indexOf(".") !== -1;
        };
      
        MaxInteger.prototype.hasTooMuchDecimals = function(){
            return this.decimalsLength > this.allowedDecimalLength;
        };
      
        MaxInteger.prototype.hasTooMuchIntegers = function(){
            return this.integersLength > this.allowedIntegerLength;
        };
      
        MaxInteger.prototype.throwIntegers = function(){
            var integersLength = this.allowedIntegerLength;
            if(this.pointIndex !== -1){
                integersLength = (this.pointIndex <= this.allowedIntegerLength) ? this.pointIndex : this.allowedIntegerLength;
                this.val = this.val.substr(0, integersLength);
            } else{
                this.val = this.val.substr(0, integersLength);
            }
      
            this.hasChanged = true;
        };
      
        MaxInteger.prototype.didItChanged  = function(){
            return this.hasChanged;
        };
      
        return MaxInteger;
      
      
    }]);

    app.directive("maxNumbers", ["MaxNumbersService", function(MaxNumbersService){
        return {
            require : "ngModel",
            link : function(scope, element, attrs, modelCtrl){
      
      
                //parseInt removes spaces or ennucessary chars. To allow any falsy number
                var maxLength = parseInt(attrs.maxNumbers);
                var allowedIntegerLength = maxLength;
                var allowedDecimalLength = 0;
      
                if("decimals" in attrs){
                    allowedDecimalLength = parseInt(attrs.decimals);
                    allowedIntegerLength = maxLength - allowedDecimalLength;
                }
      
                if("min" in attrs){
                    var minimumValue = parseFloat(attrs.min);
                    modelCtrl.$validators.min = min;
                }
      
                if("max" in attrs){
                    var maximumValue = parseFloat(attrs.max);
                    modelCtrl.$validators.max = max;
                }
      
      
      
      
                modelCtrl.$parsers.unshift(function(val){
                    var maxInteger = new MaxNumbersService(val, allowedIntegerLength, allowedDecimalLength);
      
                    if(maxInteger.isNotANumber()){
                        maxInteger.handleIsNaN();
                    }
      
                    if(maxInteger.hasDecimals()){
                        if(allowedDecimalLength){
                            if(maxInteger.hasTooMuchDecimals()){
                                maxInteger.throwDecimals();
                            }
                        } else{
                            maxInteger.throwDecimals();
                        }
                    }
      
                    if(maxInteger.hasTooMuchIntegers()){
                        maxInteger.throwIntegers();
                    }
      
                    if(maxInteger.didItChanged()){
                        modelCtrl.$setViewValue(maxInteger.val);
                    }
      
                    modelCtrl.$render();
                    return maxInteger.val;
                });
      
                modelCtrl.$parsers.unshift(function(view){
                    return String(view);
                });
      
                modelCtrl.$parsers.push(function(view){
                    if(!view) return view;
                    return Number(view);
                });
      
                if(!("simpleLink" in attrs)){
                    modelCtrl.$formatters.unshift(function(val){
                        if(!val) return val;
                        return String(val);
                    });
      
                    modelCtrl.$formatters.push(function(val){
                        //On load, this pipeline is always called because view needs to has model
                        if(!val) return val;
      
                        var maxInteger = new MaxNumbersService(val, allowedIntegerLength, allowedDecimalLength);
      
                        if(maxInteger.isNotANumber()){
                            maxInteger.handleIsNaN();
                        }
      
                        if(maxInteger.hasDecimals()){
                            if(allowedDecimalLength){
                                if(maxInteger.hasTooMuchDecimals()){
                                    maxInteger.throwDecimals();
                                }
                            } else{
                                maxInteger.throwDecimals();
                            }
                        }
      
                        if(maxInteger.hasTooMuchIntegers()){
                            maxInteger.throwIntegers();
                        }
      
                        if(maxInteger.didItChanged()){
                            modelCtrl.$setViewValue(val);
                        }
                        return maxInteger.val;
                    });
                }
      
                function min(model){
                    return model ? model >= minimumValue : true;
                }
      
                function max(model){
                    return model ? model <= maximumValue  : true;
                }
      
            }
        };
    }]);
    app.directive('multiLevelIvr', ['pinesNotifications','WhisperMessageService','$uibModal','$bootbox','CampaignWebService','VoicePromptService', function (pinesNotifications, whispermessageService, $uibModal, $bootbox,CampaignWebService,voicePromptService) {
        var link = function(scope,rootScope) {
            scope.idnum = scope.ivrActions.length;
            var message_type = "";
            var message = "";
            var isLocationIvr=false;
            if(!scope.byDefaultRing){
                scope.byDefaultRing = 3;
            }
            scope.overflowValidationHeader = "1st level IVR";
            if(!scope.cAction.ivrActions || !scope.cAction.ivrActions.length){
                scope.cAction.ivrActions = [];
                scope.cAction.ivrActions = [{
                    id: 1,
                    action: "simple",
                    action_order: 1,
                    TTSIVRSelected: true,
                    voicepromptURL: '',
                    voicepromptId: '',
                    ringtoNum: "",
                    keypress: "",
                    destination:"",
                  /*  back_press:"",*/
                    message_type: message_type,
                    message: message,
                    recordCall: false,
                    activateVoiceMail: false,
                    playDisclaimer: 'before',
                    geoRoute: {routeBy:"", geoList:"", radius:""},
                    scheduleRoute: [{timezone:'',default_ringto:'',activate_voicemail:false,recordCall: false,playDisclaimer: 'before',disableRC:false}],
                    overflowNumbers :[{overflowNumber:'',rings: scope.byDefaultRing  ,overflow_order: 1}],
                    openOverflowBox :false,
                    isSimultaneousRing :false,
                    whisperPrompt : false,
                    TTSWhisperSelected: true,
                    whisperTTSText: '',
                    hasValidWhisperURL: '',
                    whisperURL:'',
                    isLocationIvr: isLocationIvr,
                    disableRC:false,
                    voicemailComponent:false
                }];
            }
            if(scope.cAction.ringtoNum && scope.cAction.ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '').length == 10){
                scope.cAction.isValidRingTo = true;
            }else{
                scope.cAction.isValidRingTo = false;
            }
            if(scope.cAction.geoRoute !== undefined && scope.cAction.geoRoute !== null && scope.cAction.geoRoute !== ""){
                if(scope.cAction.geoRoute.geoList && scope.cAction.geoRoute.geoList !== undefined && scope.cAction.geoRoute.geoList !== "" && scope.cAction.geoRoute.geoList !== null){
                    scope.georoutelocations.forEach(function(loc) {

                        if(loc.id === parseInt(scope.cAction.geoRoute.geoList)){
                            scope.locObj=loc;
                        }
                    });
                }else{
                    scope.locObj={id:'',name:''};
                }
            }
            scope.changeLocId = function (locObj) {
                scope.cAction.geoRoute.geoList = locObj.id;
            };
            scope.whisperIVRTextChange = function(cAction) {
                if (cAction.whisperTTSText !== undefined || cAction.whisperTTSText.length !== 0) {
                    scope.chkSpclChar(cAction.whisperTTSText, '1st Level Whisper Message', function(t){
                        cAction.whisperTTSText = t;
                    });
                }
                if(scope.whisperAudio !== undefined){
                    scope.whisperAudio.pause();
                }
                scope.whisperAudio = undefined;
                if (cAction.whisperText === undefined || cAction.whisperText.length === 0) {
                    cAction.hasValidWhisperURL = false;
                    cAction.TTSWhisperSelected = true;
                } else {
                    cAction.hasValidWhisperURL= true;
                    cAction.TTSWhisperSelected = true;
                }
            };
            scope.removeSelectedWhisperAudio = function(cAction) {
                if (scope.whisperAudio !== undefined)  
                    scope.whisperAudio.pause();
                    scope.whisperAudio = undefined;
                    cAction.TTSWhisperSelected = true;
                    cAction.whisperTTSText = '';
                    cAction.hasValidWhisperURL = false;
                    cAction.whisperURL ='';
            };
            scope.showIVRWhisperModal = function(cAction) {
                scope.disableBtn = true;
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignWhisper.html',
                    controller: 'whisperModal',
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false
                });

                modalInstance.result.then(function() {
                    for (var i = 0; i < whispermessageService.whispers.length; i++) {
                        if (whispermessageService.whispers[i].selectedwhisper === true) {
                            cAction.whisperText = whispermessageService.whispers[i].name;
                            cAction.whisperFileName = whispermessageService.whispers[i].filename;
                            cAction.whisperId = whispermessageService.whispers[i].id;
                            cAction.whisperURL = whispermessageService.whispers[i].url;
                            cAction.whisperAudio = undefined;
                            cAction.hasValidWhisperURL = true;
                            cAction.TTSWhisperSelected = true;
                        }
                        
                    }
                    // if((cAction.whisperText).length > 15){
                    //     var str = (cAction.whisperText).slice(0,10);
                    //     cAction.whisperDisplay = str.concat('...')
                    // }else{
                    //     cAction.whisperDisplay = cAction.whisperText;
                    // }
                    cAction.TTSWhisperSelected = false;
                    cAction.hasValidWhisperURL = true;
                    cAction.whisperTTSText = '';
                    scope.disableBtn = false;
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                    scope.disableBtn = false;
                });

            };

            scope.disablePlayBtn = function($event){
                    var allBtn = $('.playpadding').not(this);
                    var voicemail = angular.element( document.querySelector( '#voicemail' ) );
                    var thisElm = $event.currentTarget;
                    var icon = thisElm.children[0];
                    icon.classList.add("fa-pause");
                    var checkClass = setInterval(function(){ 
                        var elm = icon.classList.contains("fa-pause");
                        //thisElm.classList.contains('fa-pause');
                        if(elm){
                                allBtn.each(function(i, obj) {
                                    if (obj.disabled === false){
                                        obj.classList.add("customDisabled");
                                        scope.disableBtn = true;
                                    }
                                });
                                thisElm.classList.remove("customDisabled");
                                voicemail.removeClass("customDisabled");
                            }else{
                                allBtn.removeClass("customDisabled");
                                voicemail.removeClass("customDisabled");
                                scope.disableBtn = false;
                                clearInterval(checkClass);
                            }
                        }, 100);
            };
            

            scope.playWhisperAudio = function(cAction) {
                if (scope.whisperAudio !== undefined && !scope.whisperAudio.paused) {
                    scope.whisperAudio.pause();
                } else if (scope.whisperAudio !== undefined && scope.whisperAudio.paused) {
                    scope.whisperAudio.play();
                } else {
                    if (cAction.whisperTTSText.length > 0) {
                        scope.whisperAudio = new Audio();
                        scope.onTTS_IVR_Request = true;
                        CampaignWebService.getTTS(cAction.whisperTTSText).then(function(result) {
                            if (result.data.json.length > 1) {
                                var TTSData = result.data.json;
                                var source = "data:audio/mp3;base64," + TTSData;
                                scope.whisperAudio.src = source;
                                if (scope.whisperAudio.paused) {
                                    scope.whisperAudio.play();
                                } else {
                                    scope.whisperAudio.pause();
                                }
                            }
                             scope.onTTS_IVR_Request = undefined;
                        });
                    } else {
                        scope.whisperAudio = new Audio(cAction.whisperURL);
                        scope.whisperAudio.play();
                    }
                }
            };

            scope.whisperAudioIsPlaying = function() {
                if (scope.whisperAudio !== undefined && !scope.whisperAudio.paused && !scope.whisperAudio.ended)
					return true;
                return false;
            };

            var stopAudio = function() {
                if (scope.whisperAudio !== undefined) {
                    scope.whisperAudio.pause();
                    scope.whisperAudio = undefined;
                }
                if (scope.ivrAudio !== undefined) {
                    scope.ivrAudio.pause();
                    scope.ivrAudio = undefined;
                }
            };

            scope.removeIvrAction = function(cactionId) {
                $bootbox.confirm("Are you sure you want to delete this IVR Action?", function(clickedOK) {
                    if (clickedOK) {
                        var allBtn = $('.playpadding');
                        allBtn.each(function(i, obj) {
                            obj.children[0].classList.remove("fa-pause");
                        });
                        scope.pauseCurrentPlayingAudio();
                        var keepLooking = true;
                        $.each(scope.ivrActions, function(index, value) {
                            if (keepLooking && value.id == cactionId) {
                                scope.ivrActions.splice(index, 1);
                                keepLooking = false;
                            }
                        });
                        $.each(scope.ivrActions, function(index, value) {
                            if (value.id > cactionId && cactionId !== 0) {
                                scope.ivrActions[index].id = (value.id - 1);
                            }
                            if (value.id === 0) {
                                scope.ivrActions[index].id = (index + 1);
                            }
                        });
                        pinesNotifications.notify({
                            title: 'Multilevel IVR Key Press',
                            text: 'Deleted Successfully',
                            type: 'success'
                        });
                    }
                });
            };
            var validateKeyPress = function(action) {
                scope.keypressDuplicate = [];
                _.each( scope.ivrActions, function(action){
                    scope.keypressDuplicate.push(action.keypress);
                });
                
              scope.keypress = _.uniq(scope.keypressDuplicate);
                 if (scope.keypress.length !== scope.keypressDuplicate.length){
                    pinesNotifications.notify({
                        title: 'Multilevel IVR Form',
                        text: 'Duplicate Key Press Numbers are not allowed',
                        type: 'error'
                    });
                 }
            };
            scope.showSubmit = function(){
                scope.showSubmitFunction();
                if(scope.cAction.ringtoNum && scope.cAction.ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '').length == 10){
                    scope.cAction.isValidRingTo = true;
                }else{
                    scope.cAction.isValidRingTo = false;
                }
            };
            scope.showIvrVoiceModal = function(cAction) {
                scope.disableBtn = true;
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignPrompt.html',
                    controller: 'voiceModal',
                    size: 'lg'
                });

                modalInstance.result.then(function() {
                    for (var i = 0; i < voicePromptService.prompts.length; i++) {
                        if (voicePromptService.prompts[i].selectedprompt === true) {
                            cAction.voicepromptText = voicePromptService.prompts[i].name;
                            cAction.voicepromptFileName = voicePromptService.prompts[i].filename;
                            cAction.voicepromptURL = voicePromptService.prompts[i].url;
                            cAction.voicepromptId = voicePromptService.prompts[i].id;
                         
                        }
                    }
                    console.log(voicePromptService.prompts);
                    scope.prompts = voicePromptService.prompts;
                    cAction.TTSIVRSelected = false;
                    cAction.hasValidTTSVoiceURL = true;
                    cAction.voicepromptTTSText = '';
                    scope.ivrAudio = undefined;
                    scope.disableBtn = false;
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                    scope.disableBtn = false;
                });
            };
            scope.removeSelectedIvrVoiceAudio = function(cAction) {   
                if (scope.ivrAudio !== undefined)  
                    scope.ivrAudio.pause();    
                scope.ivrAudio = undefined;    
                cAction.voicepromptURL = undefined;    
                cAction.voicepromptTTSText = "";   
                cAction.TTSIVRSelected = true; 
                cAction.voicepromptText = "";
                cAction.hasValidTTSVoiceURL = false;   
            };
            scope.chkSpclChar = function (text, prompt,cb){
                var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
                if(format.test(text)){
                    pinesNotifications.notify({
                        title: prompt,
                        text: 'Special characters are not allowed',
                        type: 'error'
                    });
                    cb(text.replace(format, "")) ;
                }else{
                    cb(text) ;
                }
            };
            scope.voiceTextIvrChange = function(cAction) {
                if(scope.ivrAudio !== undefined){
                    scope.ivrAudio.pause();
                }
                scope.ivrAudio = undefined;
                if (cAction.voicepromptTTSText === undefined || cAction.voicepromptTTSText.length === 0) {
                    cAction.hasValidTTSVoiceURL = false;
                    cAction.TTSIVRSelected = true;
                } else {
                    scope.chkSpclChar(cAction.voicepromptTTSText, '1st Level Voice Prompt', function(t){
                        cAction.voicepromptTTSText = t;
                        cAction.hasValidTTSVoiceURL= true;
                        cAction.TTSIVRSelected = true;
                    });
                }
            };
            
            scope.playTtsVoiceAudio = function(cAction) {
                if (scope.ivrAudio !== undefined && !scope.ivrAudio.paused) {
                    scope.ivrAudio.pause();
                } else if (scope.ivrAudio !== undefined && scope.ivrAudio.paused) {
                    scope.ivrAudio.play();
                } else {
                    if (cAction.voicepromptTTSText.length > 0) {
                        scope.ivrAudio = new Audio();
                        scope.onTTS_IVR_Request = true;
                        CampaignWebService.getTTS(cAction.voicepromptTTSText).then(function(result) {
                            if (result.data.json.length > 1) {
                                var TTSData = result.data.json;
                                var source = "data:audio/mp3;base64," + TTSData;
                                scope.ivrAudio.src = source;
                                if (scope.ivrAudio.paused) {
                                    scope.ivrAudio.play();
                                } else {
                                    scope.ivrAudio.pause();
                                }
                            }
                             scope.onTTS_IVR_Request = undefined;
                        });
                    } else {
                        scope.ivrAudio = new Audio(cAction.voicepromptURL);
                        scope.ivrAudio.play();
                    }
                }
            };
            scope.disableRecordCall = function(){
                if(!scope.cAction.activateVoiceMail){
                    scope.cAction.disableRC = true;
                    scope.cAction.recordCall = true;
                }else{
                    scope.cAction.disableRC = false;
                    scope.cAction.recordCall = true;
                }
            };
            var validatefirstlevel = function(){
                var invalidFields = [];
                var messageText = "";
                var overflow_error = false;
                for (var i = scope.ivrActions.length - 1; i >= 0; i--) {
                    //scope.ivrActions[i]
                    console.log("ivr =",  scope.ivrActions[i]);
                    // common input fileds
                    if( scope.ivrActions[i].keypress === '' || scope.ivrActions[i].keypress === undefined ||  scope.ivrActions[i].keypress === null){
                        invalidFields.push('Keypress');
                        }
                    if( scope.ivrActions[i].destination === '' || scope.ivrActions[i].destination === undefined || scope.ivrActions[i].destination === null){
                        invalidFields.push('Destination');
                        }
                    if((scope.ivrActions[i].voicepromptTTSText ==='' || scope.ivrActions[i].voicepromptTTSText === undefined || scope.ivrActions[i].voicepromptTTSText === null) && (scope.ivrActions[i].voicepromptURL === '' || scope.ivrActions[i].voicepromptURL === undefined || scope.ivrActions[i].voicepromptURL === null) && scope.ivrActions[i].action === "interactiveVoice"){
                        invalidFields.push('Voice Prompt');
                    }
                    if( scope.ivrActions[i].action !== "interactiveVoice"){
                     // Route type = simple and geo
                        if(scope.ivrActions[i].openOverflowBox===true && scope.ivrActions[i].overflowNumbers.length > 0){
                            angular.forEach(scope.ivrActions[i].overflowNumbers, function (overFlowNumber) {
                                if(overFlowNumber.overflowNumber === ""|| overFlowNumber.overflowNumber === undefined || overFlowNumber.overflowNumber === null || overFlowNumber.overflowNumber.replace(/[^0-9]+/g, '').length !== 10){
                                    invalidFields.push('Overflow Ring to Phone Number');
                                }
                            });
                        }
                        if(  scope.ivrActions[i].recordCall){
                            if(scope.ivrActions[i].playDisclaimer === "true" || scope.ivrActions[i].playDisclaimer === "" || scope.ivrActions[i].playDisclaimer === undefined){
                                 invalidFields.push('Play call recording disclaimer');
                            }
                        }
                       if(scope.ivrActions[i].whisperPrompt){
                        if( (scope.ivrActions[i].whisperTTSText === undefined || scope.ivrActions[i].whisperTTSText === '' || scope.ivrActions[i].whisperTTSText === null) && (scope.ivrActions[i].whisperURL === '' || scope.ivrActions[i].whisperURL === undefined ||  scope.ivrActions[i].whisperURL === null)){
                            invalidFields.push('Play whisper message before connecting');
                         } 
                       }
                       // Rote type =simple
                        if( scope.ivrActions[i].action === 'simple'){                           
                            if( scope.ivrActions[i].ringtoNum === undefined || scope.ivrActions[i].ringtoNum === '' ||  scope.ivrActions[i].ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '').length !== 10){
                                invalidFields.push('Ring to Phone Number');
                                scope.ivrActions[i].isValidRingTo = false;
                            }
                           
                        }
                           // Rote type =geo
                        if( scope.ivrActions[i].action === "geo"){
                            //Route By
                            if( scope.ivrActions[i].geoRoute.routeBy ==='' || scope.ivrActions[i].geoRoute.routeBy === undefined){
                                invalidFields.push('Route By');
                            }
                            //Location List
                             if( scope.ivrActions[i].geoRoute.geoList === '' || scope.ivrActions[i].geoRoute.geoList === undefined){
                                invalidFields.push('Location List');
                            }
                            if( scope.ivrActions[i].ringtoNum === '' ||  scope.ivrActions[i].ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '').length !== 10){
                            invalidFields.push('Default Number');
                            scope.ivrActions[i].isValidRingTo = true;
                            }
                            if((scope.ivrActions[i].geoRoute.routeBy === 'Zipcode' || scope.ivrActions[i].geoRoute.routeBy === 'Npa') && (scope.ivrActions[i].geoRoute.radius === '' || scope.ivrActions[i].geoRoute.radius === undefined)){
                                invalidFields.push('Proximity Limit');    
                            }
                        }
                        // Route type = schedule
                        if( scope.ivrActions[i].action === "schedule"){
                            if( scope.ivrActions[i].scheduleRoute.timezone ==='' || scope.ivrActions[i].scheduleRoute.timezone === undefined || scope.ivrActions[i].scheduleRoute.timezone === null){
                                invalidFields.push('Time Zone');
                            }
                            _.each(scope.ivrActions[i].scheduleRoute.scheduleInfo,function(scheduleInfo){
                                if(scheduleInfo.fromTime === '' || scheduleInfo.fromTime === undefined || scheduleInfo.fromTime === null){
                                    invalidFields.push('FromTime');
                                }
                                if(scheduleInfo.toTime === '' || scheduleInfo.toTime === undefined || scheduleInfo.toTime === null){
                                    invalidFields.push('ToTime');
                                }
                                if(scheduleInfo.days.length === 0){
                                    invalidFields.push('Days');
                                }
                                if(scheduleInfo.ringTo === '' || scheduleInfo.ringTo === undefined || scheduleInfo.ringTo === null || scheduleInfo.ringTo.replace(/[^0-9]+/g, '').length !== 10){
                                    invalidFields.push('Ring to Phone Number');
                                }
                               _.each(scheduleInfo.overflowNumbers, function (overFlowNumber) {
                                    if(scheduleInfo.openOverflowBox && (overFlowNumber.overflowNumber === ""|| overFlowNumber.overflowNumber === undefined || overFlowNumber.overflowNumber === null || overFlowNumber.overflowNumber.replace(/[^0-9]+/g, '').length !== 10)){
                                        invalidFields.push('Overflow Ring to Phone Number');
                                    }
                                });
                            });
                        }
                    }
                    
                  
                    if(invalidFields.length > 0){
                        i = 0;
                    }
                }    
                _.each(scope.ivrActions, function(action){
                    scope.overflowNumberDuplicateL1 = [];
                    scope.duplicateRingToOverflowL1 = [];
                    _.forEach(action.overflowNumbers,function(num){
                        if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                            var overflowNumber = num.overflowNumber.replace(/[^0-9]+/g, '').replace(/^0+/, '');
                            var  ringToNum = action.ringtoNum.replace(/[^0-9]+/g, '').replace(/^0+/, '');
                                if(overflowNumber === ringToNum){
                                    scope.duplicateRingToOverflowL1.push(overflowNumber);
                                }
                            scope.overflowNumberDuplicateL1.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                        }
                    });
                    if((scope.overflowNumberDuplicateL1.length != _.uniq(scope.overflowNumberDuplicateL1, 'unmaskNumber').length) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                        pinesNotifications.notify({
                           title: '1st level IVR Form',
                           text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                           type: 'error'
                        });
                        overflow_error = true;
                    }
                    if(!_.isEmpty(scope.duplicateRingToOverflowL1) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                        pinesNotifications.notify({
                            title: '1st level IVR Form',
                            text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                            type: 'error'
                        });
                        overflow_error = true;
                    }
                });
                //})
                //console.log("invalidFields ==",invalidFields);
                if(invalidFields.length > 0){
                    messageText = ' field is required.';
                    if (invalidFields.length > 1) {
                        messageText = ' fields are required.';
                    }
                   pinesNotifications.notify({
                        title: '1st level IVR Form',
                        text: invalidFields.toString()+messageText,
                        type: 'error'
                    }); 
                  return false;  
                }else if(overflow_error){
                  return false;   
                }else{
                  return true;
                } 
            };
            scope.addAction = function() {
               // validateKeyPress();
              if(validatefirstlevel()){
                    var addedAction;
                    var tempHash = {
                        id: scope.cAction.id + 1,
                        action_order: scope.ivrActions[scope.ivrActions.length - 1].action_order + 1,
                        action: "simple",
                        value: "",
                        TTSIVRSelected: true,
                        voicepromptURL: '',
                        voicepromptId: '',
                        ringtoNum: "",
                        keypress: "",
                        destination:"",
                        /* back_press:"",*/
                        message_type: message_type,
                        message: message,
                        recordCall: false,
                        activateVoiceMail: false,
                        playDisclaimer: 'before',
                        geoRoute: {routeBy:"", geoList:"", radius:""},
                        scheduleRoute: [{timezone:'',default_ringto:'',activate_voicemail:false,recordCall: false,playDisclaimer: 'before',disableRC:false}],
                        overflowNumbers :[{overflowNumber:'', rings: scope.byDefaultRing, overflow_order: 1}],
                        openOverflowBox :false,
                        isSimultaneousRing :false,
                        isLocationIvr:false,
                        whisperPrompt : false,
                        TTSWhisperSelected: true,
                        whisperTTSText: '',
                        hasValidWhisperURL: '',
                        whisperURL:'',
                        disableRC:false,
                        voicemailComponent:false
                    };
                                    scope.ivrActions.push(tempHash);}
            };
            
			scope.retainDataOnChange = function(){
				scope.cAction.scheduleRoute.default_ringto = scope.cAction.ringtoNum ;
				scope.cAction.scheduleRoute.activate_voicemail = scope.cAction.activateVoiceMail; 
				scope.cAction.scheduleRoute.recordCall = scope.cAction.recordCall;
				scope.cAction.scheduleRoute.disableRC = scope.cAction.disableRC;
			};	
            scope.getGeoLocationList = function(){
                CampaignWebService.getGeoLocations().then(function(result) {
                    if (result.data.result != 'error') {
                        scope.georoutelocations = [];
                        var locationData = result.data.json.locations;
                        locationData.forEach(function(loc) {
                            if (loc.count > 0) {
                                scope.georoutelocations.push({
                                    id: loc.id,
                                    name: loc.name
                                });
                            }
                        });
                        
                    }
                });
            };
        };

        return {
            restrict: "E",
            link: link,
            scope: {
                level: "=",
                ivrActions: "=",
                cactionId: "=",
                cAction: "=",
                georoutelocations: "=",
                removeSelectedIvrVoiceAudio: "&",
                voicePrompts: "=",
                audioIsDownloading: "&",
                stopAudio: "&",
                showSubmitFunction : '&showSubmit',
                isLocationIvr:"=",
                byDefaultRing:"=",
                validateIvr: "&",
                defaultData:"=",
                showSubmitOverflow: "&",
                disableRC:"=",
                voicemailComponent:"=",
                disableSaveForSchedule:"="
            },
            controller: function($scope,$rootScope){
                if($scope.locObj === undefined || $scope.locObj===null || $scope.locObj===""){
                    $scope.locObj={id:'',name:''};
                }
                if($scope.defaultData !== ''  && $scope.defaultData !== undefined ){
                    if($scope.defaultData.play_whisper_message === true){
                        $scope.cAction.whisperTTSText = '';
                        $scope.whisperAudio = undefined;
                        var whisperMessage = $scope.defaultData.play_whisper_message_text;
                        var whisperSubstring = $scope.defaultData.play_whisper_message_text.substring(0, 7);
                        if (whisperSubstring == "file://") {
                            $scope.cAction.TTSWhisperSelected = false;
                            $scope.cAction.whisperPrompt = $scope.defaultData.play_whisper_message;
                    
                            $scope.cAction.whisperText = $scope.defaultData.whisper_message_name;
                            $scope.cAction.whisperFileName = whisperMessage.replace("file://", '');
                            $scope.cAction.whisperURL = $scope.defaultData.whisper_message_url;
                            $scope.cAction.whisperId = $scope.defaultData.whisper_id;
                            $scope.cAction.hasValidWhisperURL = true;
                        }else {
                            $scope.cAction.TTSWhisperSelected = true;
                            $scope.cAction.whisperPrompt = $scope.defaultData.play_whisper_message;
                            $scope.cAction.whisperTTSText = whisperMessage;
                            $scope.cAction.whisperFileName = whisperMessage;
                        }
                    }
                    
                    if($scope.defaultData.play_voice_prompt_first === true){
                        $scope.ivrAudio = undefined;
                        $scope.cAction.voicepromptTTSText = '';
                        var message = $scope.defaultData.play_voice_prompt_first_text;
                        var substring = message.substring(0, 7);
                        if (substring == "file://") {
                            $scope.cAction.TTSIVRSelected = false;
                            $scope.cAction.hasValidTTSVoiceURL = true;
                            $scope.cAction.voicepromptText = $scope.defaultData.prompt_message_name;
                            $scope.cAction.voicepromptFileName = message.replace("file://", '');
                            $scope.cAction.voicepromptURL = $scope.defaultData.voice_prompt_url;
                            $scope.cAction.voicepromptId = $scope.defaultData.voice_prompt_id;
                            $scope.cAction.hasValidTTSVoiceURL = true;
                        } else {
                            $scope.cAction.TTSIVRSelected = true;
                            $scope.cAction.voicepromptTTSText = message;
                            $scope.cAction.voicepromptFileName = message;
                        }
                    }
                    

                   // $scope.cAction.recordCall = $scope.defaultData.record_call; 
                    $scope.cAction.playDisclaimer = $scope.defaultData.play_disclaimer;
                    // $scope.cAction.activateVoiceMail = $scope.defaultData.activate_voicemail;
                    $scope.cAction.activateVoiceMail = $scope.voicemailComponent === false ? $scope.cAction.activateVoiceMail = false :$scope.defaultData.activate_voicemail;
                    if($scope.cAction.activateVoiceMail){
                        $scope.cAction.recordCall = true;
                        $scope.cAction.disableRC = true;
                    }else{
                        $scope.cAction.recordCall = $scope.defaultData.record_call;
                    }
                }
                
                $scope.pauseCurrentPlayingAudio = function(){
                    var allBtn = $('.playpadding');
                        allBtn.each(function(i, obj) {
                            obj.children[0].classList.remove("fa-pause");
                        });
                    $rootScope.$emit("stopIvrAudios", {});
                };

                $rootScope.$on("stopIvrAudios", function(){
                    if($scope.ivrAudio){
                        $scope.ivrAudio.pause();  
                    }
                    if($scope.ivrAudio1)
                    {
                        $scope.ivrAudio1.pause();
                    }
                    if($scope.whisperAudio){
                        $scope.whisperAudio.pause();
                    }
                 });
              },
            templateUrl: "views/directives/multilevel_ivr.html"
        };
    }    
    ]);

    //first level ivr-schedule
    app.directive("firstLevelScheduleRoute",['$http','UserWebService','pinesNotifications','$bootbox',function scheduleRoute($http, UserWebService, pinesNotifications, $bootbox){
        // body...
        var link = function(scope) {
            $http.get('assets/demo/schedule_data.json').then(function(res) {
                scope.timeZones = res.data.timeZones;
                scope.extendScheduleDays = res.data.extendScheduleDays;
                scope.scheduledDays = res.data.scheduledDays;
                scope.scheduleTimeSlots = res.data.scheduleTimeSlots;
                scope.scheduleEndTimeSlots = res.data.scheduleTimeSlots;
                $.each(scope.scheduleRoute.scheduleInfo, function (key, val) {
                    scope.scheduleTimeSlots = res.data.scheduleTimeSlots;
                    scope.formationscheduleTimeSlots(key);
                });
            });
            scope.settings = {
                enableSearch: false,
                scrollable: true,
                scrollableHeight: 200,
                smartButtonMaxItems:5,
                showCheckAll : false,
                showUncheckAll : false
            };
            if(!scope.scheduleRoute.scheduleInfo){
                scope.scheduleInfo =[];
                scope.scheduleRoute.scheduleInfo = scope.scheduleInfo;
                scope.scheduleRoute.default_ringto = scope.cAction.ringtoNum;
                scope.scheduleRoute.activate_voicemail = scope.cAction.activateVoiceMail;
                scope.scheduleRoute.playDisclaimer = 'before';
                scope.scheduleRoute.recordCall = scope.cAction.recordCall;
                scope.scheduleRoute.disableRC = scope.cAction.disableRC;
                scope.showAddSchedule = true;
                if(scope.scheduleRoute.default_ringto == undefined || scope.scheduleRoute.default_ringto == ""){
                    scope.activatevm = false;
                }else{
                    scope.activatevm = true;
                }
                scope.scheduleInfo.push({scheduleId:scope.scheduleInfo.length,days:[],fromTime:'',toTime:'',ringTo:'', isAddOverflow:true,openOverflowBox :false,overflowNumbers:[{overflowNumber:'',rings:3,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false});
            }else{
                scope.scheduleInfo = scope.scheduleRoute.scheduleInfo;
                _.each(scope.scheduleRoute.scheduleInfo, function(schedule){
                    if(schedule.activateVoicemail == true){
                        scope.scheduleRoute.disableRC = true;    
                    }
                });
                if(scope.scheduleRoute.activate_voicemail){
                    scope.scheduleRoute.disableRC = true;
                }
                if(scope.scheduleRoute.default_ringto == undefined || scope.scheduleRoute.default_ringto == ""){
                    scope.activatevm = false;
                }else{
                    scope.activatevm = true;
                }
            }
            scope.scheduleEvents = {
                onItemCustomSelect: function(schData) { scope.checkCurrentSchedule(schData); scope.showSubmitFunction();}
            };
            scope.showSubmit = function(){
                scope.showSubmitFunction();
            };
            scope.showAddOverflow = function(id){
                if(UserWebService.unMaskData(scope.scheduleInfo[id].ringTo) !== undefined && UserWebService.unMaskData(scope.scheduleInfo[id].ringTo).length == 10 && UserWebService.unMaskData(scope.scheduleInfo[id].ringTo).slice(0,1) !== "0"){
                    scope.scheduleInfo[id].isAddOverflow = false;
                    scope.checkCurrentSchedule(id);
                }else{
                    scope.scheduleInfo[id].isAddOverflow = true; 
                    scope.showAddSchedule = true;  
                }
            };
            scope.checkCurrentSchedule = function(id){
                _.each(scope.scheduleInfo ,function(scheduleData){
                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined  ){ 
                        scope.showAddSchedule = false;
                    }else{
                        scope.showAddSchedule = true ; 
                    }
                });
                if(validateSchedule(id)){
                    scope.showAddSchedule = true;
                    scope.disableSaveForSchedule.levelOne = true;
                    scope.invalidSchedules++;
                    var scid = scope.duplicateSchelduleID + 1;
                    if(scid == 1){
                        scid = scid + "st";
                    }
                    else if(scid == 2){
                        scid = scid + "nd";
                    }
                    else if(scid == 3){
                        scid = scid + "rd";
                    }
                    else if(scid >= 4){
                        scid = scid + "th";
                    }
                    scope.scheduleRoute.isValid = false;
                    scope.scheduleRoute.error = 'Check for Overlaping Schedule For ' + scid + " Schedule";
                   pinesNotifications.notify({
                         title: '1st level IVR Form',
                         text: 'Check for Overlaping Schedule For ' + scid + " Schedule",
                         type: 'error'
                     });
                }else{
                    scope.disableSaveForSchedule.levelOne = false;
                }
            };
            var validateSchedule = function(id){
                scope.duplicateScheldule = false;
                scope.duplicateSchelduleID = -1;
                scope.scheduleTimeSlots.push("End of Day");
                var lastSchedule = '';
                var currentIndex = '';
                var schFromTime = '';
                var schToTime = '';
                var matchedFromTime = '';
                var matchedToTime = '';
                scope.scheduleRoute.error = '';
                scope.scheduleRoute.isValid = true;
                if(scope.scheduleInfo.length < 1 ){
                    return false;
                }
                if(id == 9999){
                     lastSchedule = scope.scheduleInfo[$scope.scheduleInfo.length - 1];
                     currentIndex = scope.scheduleInfo.length - 1;
                }else{
                    lastSchedule = scope.scheduleInfo[id];
                    currentIndex = id;

                }
                if(scope.scheduleInfo.length > 1){
                    for(var i=0; i < scope.scheduleInfo.length ;i++){
                        if(scope.scheduleInfo[i].days && scope.scheduleInfo[i].days.length > 0){
                            for (var j = 0; j < scope.scheduleInfo[i].days.length; j++) {
                                for (var k = 0; k < lastSchedule.days.length; k++) {
                                    if(scope.extendScheduleDays[scope.scheduleInfo[i].days[j].id].indexOf(lastSchedule.days[k].id) > -1){
                                        schFromTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].fromTime);
                                        schToTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].toTime);
                                        matchedFromTime = scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        matchedToTime = scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){ 
                                           scope.duplicateScheldule = true;
                                           scope.duplicateSchelduleID = i;
                                        }
                                    }

                                    if(scope.extendScheduleDays[lastSchedule.days[k].id].indexOf(scope.scheduleInfo[i].days[j].id) > -1){
                                        schFromTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].fromTime);
                                        schToTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].toTime);
                                        matchedFromTime = scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        matchedToTime = scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){ 
                                           scope.duplicateScheldule = true;
                                           scope.duplicateSchelduleID = i;
                                          
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    scope.scheduleTimeSlots.splice(-1,1);
                    return false;

                }
                scope.scheduleTimeSlots.splice(-1,1);
                if(scope.duplicateScheldule){
                    scope.scheduleInfo[currentIndex].invalid = true;
                }else if(currentIndex !== undefined){
                   scope.scheduleInfo[currentIndex].invalid = false ;
                }
                return scope.duplicateScheldule;
            };
            scope.checkForValidSchedules = function(){
                var invalid = 0;
                for (var i = scope.scheduleInfo.length - 1; i >= 0; i--) {
                    validateSchedule(i);
                }
                _.each(scope.scheduleInfo ,function(scheduleData){
                    if((scheduleData.invalid || scheduleData.days.length === 0) && scope.scheduleInfo.length > 1){
                        invalid++;
                    }
                });
                return invalid;
            };
            scope.addSchedule=function(){
                scope.showAddSchedule = true ;
                var error = false;
                _.each(scope.scheduleInfo ,function(scheduleData){
                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined ){ 
                        error = false;
                    }else{
                        error = true;
                    }
                });
                if(!error){
                    scope.scheduleInfo.push({scheduleId:scope.scheduleInfo.length,days:[],fromTime:'',toTime:'',ringTo:'', isAddOverflow:true,overflowNumbers:[{overflowNumber:'',rings:3,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false});
                }else{

                    var invalid = scope.checkForValidSchedules();
                    if(invalid !== 0){
                        pinesNotifications.notify({
                            title: '1st level IVR Form',
                            text: 'Please check for invalid schedule',
                            type: 'error'
                        });
                    }
                }
            };

            scope.formationscheduleTimeSlots = function(id){
                scope.scheduleInfo[id].scheduleEndTimeSlots = scope.scheduleTimeSlots.slice(scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[id].fromTime) + 1, scope.scheduleTimeSlots.length);
                scope.scheduleInfo[id].scheduleEndTimeSlots.push("End of Day");

            };
            scope.checkRingToNumberSchedule = function(ringtonum){
                if(ringtonum){
                    var str = UserWebService.unMaskData(ringtonum);
                    if(str.charAt(0) == '0'){
                        return true;
                    }
                    if( UserWebService.unMaskData(ringtonum).length == 10){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            };
            scope.removeSchedule = function(id) {
                $bootbox.confirm("Are you sure you want to delete this Schedule?", function(clickedOK) {
                    if(validateSchedule(id)){
                       scope.invalidSchedules--;
                    }

                    if (clickedOK) {
                        scope.scheduleInfo.splice(id, 1);
                        angular.forEach(scope.scheduleInfo, function(value){
                        scope.disableRC = false;
                        if(value.activateVoicemail == true){
                            scope.disableRC = true;
                            scope.recordCall = true;
                        }
                        if(scope.scheduleRoute.activate_voicemail == true){
                            scope.disableRC = true;  
                        }
                        });
                    }
                    var invalid = scope.checkForValidSchedules();
                    if( invalid === 0){
                        scope.showAddSchedule = false;
                        scope.disableSaveForSchedule.levelOne = false;
                        scope.showSubmitFunction();
                    }else{
                        pinesNotifications.notify({
                            title: '1st level IVR Form',
                            text: 'Please check for invalid schedule',
                            type: 'error'
                        });
                        scope.showAddSchedule = true;
                    }
                });
            };
            scope.activateVoicemailSchedule = function(){
                if(scope.scheduleRoute.default_ringto && UserWebService.unMaskData(scope.scheduleRoute.default_ringto).length == 10){
                    scope.activatevm = true;
                }else{
                    scope.scheduleRoute.activate_voicemail = false;
                    scope.activatevm = false;
                }
			};
			scope.retainDataOnChange=function(){
				scope.cAction.ringtoNum = scope.scheduleRoute.default_ringto;
				scope.cAction.activateVoiceMail =  scope.scheduleRoute.activate_voicemail;
                scope.cAction.recordCall =  scope.scheduleRoute.recordCall;
				scope.cAction.disableRC =  scope.scheduleRoute.disableRC;
				};	
            scope.disableRecordCall = function(index){
                var activatedVMs = [];
                scope.scheduleRoute.disableRC = false;
                if(scope.scheduleRoute.scheduleInfo[index]){
                    scope.scheduleRoute.scheduleInfo[index].activateVoicemail = !scope.scheduleRoute.scheduleInfo[index].activateVoicemail;
                }else{
                    scope.scheduleRoute.activate_voicemail = !scope.scheduleRoute.activate_voicemail;
                }
                activatedVMs.push(scope.scheduleRoute.activate_voicemail);
                var scheduleVms = _.pluck(scope.scheduleRoute.scheduleInfo,'activateVoicemail');
                var trueVm = _.filter(scheduleVms.concat(activatedVMs), function(activevm){ return activevm  === true; });
                if(trueVm.length > 0){
                    scope.scheduleRoute.disableRC = true;
                    scope.scheduleRoute.recordCall = true;
                }
                if(scope.scheduleRoute.scheduleInfo[index])
                {
                    scope.scheduleRoute.scheduleInfo[index].activateVoicemail = !scope.scheduleRoute.scheduleInfo[index].activateVoicemail;
                }else{
                    scope.scheduleRoute.activate_voicemail = !scope.scheduleRoute.activate_voicemail;
                }
            };
        };
        return {
            restrict: "E",
            link: link,
            scope: {
               overflowValidationHeader:'=',
               scheduleRoute: '=',
               disableSaveForSchedule:"=",
               showSubmitOverflowMethod:'&',
               showSubmitFunction : '&showSubmit',
               voicemailComponent:"=",
	       	   cAction:'='
            },
            templateUrl: "views/directives/firstLevel_scheduleRoute.html"
        };
    }]);

    //second level ivr-schedule
    app.directive("secondLevelScheduleRoute",['$http','UserWebService','pinesNotifications','$bootbox',function scheduleRoute($http,UserWebService,pinesNotifications,$bootbox){
        // body...
        var link = function(scope) {
            $http.get('assets/demo/schedule_data.json').then(function(res) {
                scope.timeZones = res.data.timeZones;
                scope.extendScheduleDays = res.data.extendScheduleDays;
                scope.scheduledDays = res.data.scheduledDays;
                scope.scheduleTimeSlots = res.data.scheduleTimeSlots;
                scope.scheduleEndTimeSlots = res.data.scheduleTimeSlots;
                $.each(scope.scheduleRoute.scheduleInfo, function (key, val) {
                    scope.scheduleTimeSlots = res.data.scheduleTimeSlots;
                    scope.formationscheduleTimeSlots(key);
                });
            });
            scope.settings = {
                enableSearch: false,
                scrollable: true,
                scrollableHeight: 200,
                smartButtonMaxItems:5,
                showCheckAll : false,
                showUncheckAll : false
            };
            if(!scope.scheduleRoute.scheduleInfo){
                scope.scheduleInfo =[];
                scope.scheduleRoute.scheduleInfo = scope.scheduleInfo;
                scope.scheduleRoute.default_ringto = scope.scAction.ringtoNum;
                scope.scheduleRoute.activate_voicemail = scope.scAction.activateVoiceMail;
                scope.scheduleRoute.playDisclaimer = 'before';
                scope.scheduleRoute.recordCall = scope.scAction.recordCall;
                scope.scheduleRoute.disableRC = scope.scAction.disableRC;
                scope.showAddSchedule = true;
                if(scope.scheduleRoute.default_ringto == undefined || scope.scheduleRoute.default_ringto == ""){
                    scope.activatevm = false;
                }else{
                    scope.activatevm = true;
                }
                scope.scheduleInfo.push({scheduleId:scope.scheduleInfo.length,days:[],fromTime:'',toTime:'',ringTo:'', isAddOverflow:true,openOverflowBox :false,overflowNumbers:[{overflowNumber:'',rings:3,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false});
            }else{
                scope.scheduleInfo = scope.scheduleRoute.scheduleInfo;
                _.each(scope.scheduleRoute.scheduleInfo, function(schedule){
                    if(schedule.activateVoicemail == true){
                        scope.scheduleRoute.disableRC = true;    
                    }
                });
                if(scope.scheduleRoute.activate_voicemail){
                    scope.scheduleRoute.disableRC = true;
                }
                if(scope.scheduleRoute.default_ringto == undefined || scope.scheduleRoute.default_ringto == ""){
                    scope.activatevm = false;
                }else{
                    scope.activatevm = true;
                }
            }
            scope.scheduleEvents = {
                onItemCustomSelect: function(schData) { scope.checkCurrentSchedule(schData); scope.showSubmitFunction();}
            };
            scope.showSubmit = function(){
                scope.showSubmitFunction();
            };
            scope.showAddOverflow = function(id){
                if(UserWebService.unMaskData(scope.scheduleInfo[id].ringTo) !== undefined && UserWebService.unMaskData(scope.scheduleInfo[id].ringTo).length == 10 && UserWebService.unMaskData(scope.scheduleInfo[id].ringTo).slice(0,1) !== "0"){
                    scope.scheduleInfo[id].isAddOverflow = false;
                    scope.checkCurrentSchedule(id);
                }else{
                    scope.scheduleInfo[id].isAddOverflow = true; 
                    scope.showAddSchedule = true;  
                }
            };
            scope.checkCurrentSchedule = function(id){
                _.each(scope.scheduleInfo ,function(scheduleData){
                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined  ){ 
                        scope.showAddSchedule = false;
                    }else{
                        scope.showAddSchedule = true ; 
                    }
                });
                if(validateSchedule(id)){
                    scope.showAddSchedule = true;
                    scope.disableSaveForSchedule.levelTwo = true;
                    scope.invalidSchedules++;
                    var scid = scope.duplicateSchelduleID + 1;
                    if(scid == 1){
                        scid = scid + "st";
                    }
                    else if(scid == 2){
                        scid = scid + "nd";
                    }
                    else if(scid == 3){
                        scid = scid + "rd";
                    }
                    else if(scid >= 4){
                        scid = scid + "th";
                    }
                    scope.scheduleRoute.isValid = false;
                    scope.scheduleRoute.error = 'Check for Overlaping Schedule For ' + scid + " Schedule";
                   pinesNotifications.notify({
                         title: '2nd level IVR Form',
                         text: 'Check for Overlaping Schedule For ' + scid + " Schedule",
                         type: 'error'
                     });
                }else{
                    scope.disableSaveForSchedule.levelTwo = false;
                }
            };
            var validateSchedule = function(id){
                scope.duplicateScheldule = false;
                scope.duplicateSchelduleID = -1;
                scope.scheduleTimeSlots.push("End of Day");
                scope.scheduleRoute.error = '';
                scope.scheduleRoute.isValid = true;
                var lastSchedule = '';
                var currentIndex = '';
                var schFromTime = '';
                var schToTime = '';
                var matchedFromTime = '';
                var matchedToTime = '';
                if(scope.scheduleInfo.length < 1 ){
                    return false;
                }
                if(id == 9999){
                     lastSchedule = scope.scheduleInfo[$scope.scheduleInfo.length - 1];
                     currentIndex = scope.scheduleInfo.length - 1;
                }else{
                    lastSchedule = scope.scheduleInfo[id];
                    currentIndex = id;

                }
                if(scope.scheduleInfo.length > 1){
                    for(var i=0; i < scope.scheduleInfo.length ;i++){
                        if(scope.scheduleInfo[i].days && scope.scheduleInfo[i].days.length > 0){
                            for (var j = 0; j < scope.scheduleInfo[i].days.length; j++) {
                                for (var k = 0; k < lastSchedule.days.length; k++) {
                                    if(scope.extendScheduleDays[scope.scheduleInfo[i].days[j].id].indexOf(lastSchedule.days[k].id) > -1){
                                        schFromTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].fromTime);
                                        schToTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].toTime);
                                        matchedFromTime = scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        matchedToTime = scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){ 
                                           scope.duplicateScheldule = true;
                                           scope.duplicateSchelduleID = i;
                                        }
                                    }

                                    if(scope.extendScheduleDays[lastSchedule.days[k].id].indexOf(scope.scheduleInfo[i].days[j].id) > -1){
                                        schFromTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].fromTime);
                                        schToTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].toTime);
                                        matchedFromTime = scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        matchedToTime = scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){ 
                                           scope.duplicateScheldule = true;
                                           scope.duplicateSchelduleID = i;
                                          
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    scope.scheduleTimeSlots.splice(-1,1);
                    return false;

                }
                scope.scheduleTimeSlots.splice(-1,1);
                if(scope.duplicateScheldule){
                    scope.scheduleInfo[currentIndex].invalid = true;
                }else if(currentIndex !== undefined){
                   scope.scheduleInfo[currentIndex].invalid = false ;
                }
                return scope.duplicateScheldule;
            };
            scope.checkForValidSchedules = function(){
                var invalid = 0;
                for (var i = scope.scheduleInfo.length - 1; i >= 0; i--) {
                    validateSchedule(i);
                }
                _.each(scope.scheduleInfo ,function(scheduleData){
                    if((scheduleData.invalid || scheduleData.days.length === 0) && scope.scheduleInfo.length > 1){
                        invalid++;
                    }
                });
                return invalid;
            };
            scope.addSchedule=function(){
                scope.showAddSchedule = true ;
                var error = false;
                _.each(scope.scheduleInfo ,function(scheduleData){
                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined ){ 
                        error = false;
                    }else{
                        error = true;
                    }
                });
                if(!error){
                    scope.scheduleInfo.push({scheduleId:scope.scheduleInfo.length,days:[],fromTime:'',toTime:'',ringTo:'', isAddOverflow:true,overflowNumbers:[{overflowNumber:'',rings:3,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false});
                }else{

                    var invalid = scope.checkForValidSchedules();
                    if(invalid !== 0){
                        pinesNotifications.notify({
                            title: '2nd level IVR Form',
                            text: 'Please check for invalid schedule',
                            type: 'error'
                        });
                    }
                }
            };

            scope.formationscheduleTimeSlots = function(id){
                scope.scheduleInfo[id].scheduleEndTimeSlots = scope.scheduleTimeSlots.slice(scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[id].fromTime) + 1, scope.scheduleTimeSlots.length);
                scope.scheduleInfo[id].scheduleEndTimeSlots.push("End of Day");

            };
            scope.checkRingToNumberSchedule = function(ringtonum){
                if(ringtonum){
                    var str = UserWebService.unMaskData(ringtonum);
                    if(str.charAt(0) == '0'){
                        return true;
                    }
                    if( UserWebService.unMaskData(ringtonum).length == 10){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            };
            scope.removeSchedule = function(id) {
                $bootbox.confirm("Are you sure you want to delete this Schedule?", function(clickedOK) {
                    if(validateSchedule(id)){
                       scope.invalidSchedules--;
                    }

                    if (clickedOK) {
                        scope.scheduleInfo.splice(id, 1);
                        angular.forEach(scope.scheduleInfo, function(value){
                        scope.disableRC = false;
                        if(value.activateVoicemail == true){
                            scope.disableRC = true;
                            scope.recordCall = true;
                        }
                        if(scope.scheduleRoute.activate_voicemail == true){
                            scope.disableRC = true;  
                        }
                        });
                    }
                    var invalid = scope.checkForValidSchedules();
                    if( invalid === 0){
                        scope.showAddSchedule = false;
                        scope.disableSaveForSchedule.levelTwo = false;
                        scope.showSubmitFunction();
                    }else{
                        pinesNotifications.notify({
                            title: '2nd level IVR Form',
                            text: 'Please check for invalid schedule',
                            type: 'error'
                        });
                        scope.showAddSchedule = true;
                    }
                });
            };
            scope.activateVoicemailSchedule = function(){
                if(scope.scheduleRoute.default_ringto && UserWebService.unMaskData(scope.scheduleRoute.default_ringto).length == 10){
                    scope.activatevm = true;
                }else{
                    scope.scheduleRoute.activate_voicemail = false;
                    scope.activatevm = false;
                }
			};
			scope.retainDataOnChange=function(){
                     
				scope.scAction.ringtoNum = scope.scheduleRoute.default_ringto;
				scope.scAction.activateVoiceMail =  scope.scheduleRoute.activate_voicemail;
                scope.scAction.recordCall =  scope.scheduleRoute.recordCall;
				scope.scAction.disableRC =  scope.scheduleRoute.disableRC;
			};	
            scope.disableRecordCall = function(index){
                var activatedVMs = [];
                scope.scheduleRoute.disableRC = false;
                if(scope.scheduleRoute.scheduleInfo[index]){
                    scope.scheduleRoute.scheduleInfo[index].activateVoicemail = !scope.scheduleRoute.scheduleInfo[index].activateVoicemail;
                }else{
                    scope.scheduleRoute.activate_voicemail = !scope.scheduleRoute.activate_voicemail;
                }
                activatedVMs.push(scope.scheduleRoute.activate_voicemail);
                var scheduleVms = _.pluck(scope.scheduleRoute.scheduleInfo,'activateVoicemail');
                var trueVm = _.filter(scheduleVms.concat(activatedVMs), function(activevm){ return activevm  === true; });
                if(trueVm.length > 0){
                    scope.scheduleRoute.disableRC = true;
                    scope.scheduleRoute.recordCall = true;
                }
                if(scope.scheduleRoute.scheduleInfo[index])
                {
                    scope.scheduleRoute.scheduleInfo[index].activateVoicemail = !scope.scheduleRoute.scheduleInfo[index].activateVoicemail;
                }else{
                    scope.scheduleRoute.activate_voicemail = !scope.scheduleRoute.activate_voicemail;
                }
            };
        };
        return {
            restrict: "E",
            link: link,
            scope: {
               overflowValidationHeader:'=',
               scheduleRoute: '=',
               disableSaveForSchedule:"=",
               showSubmitOverflowMethod:'&',
               showSubmitFunction : '&showSubmit',
               voicemailComponent:"=",
			   scAction:'='
            },
            templateUrl: "views/directives/secondLevel_scheduleRoute.html"
        };
    }]);

    //third level ivr-schedule
    app.directive("thirdLevelScheduleRoute",['$http','UserWebService','pinesNotifications','$bootbox',function scheduleRoute($http,UserWebService,pinesNotifications,$bootbox){
        // body...
        var link = function(scope) {
            $http.get('assets/demo/schedule_data.json').then(function(res) {
                scope.timeZones = res.data.timeZones;
                scope.extendScheduleDays = res.data.extendScheduleDays;
                scope.scheduledDays = res.data.scheduledDays;
                scope.scheduleTimeSlots = res.data.scheduleTimeSlots;
                scope.scheduleEndTimeSlots = res.data.scheduleTimeSlots;
                $.each(scope.scheduleRoute.scheduleInfo, function (key, val) {
                    scope.scheduleTimeSlots = res.data.scheduleTimeSlots;
                    scope.formationscheduleTimeSlots(key);
                });
            });
            scope.settings = {
                enableSearch: false,
                scrollable: true,
                scrollableHeight: 200,
                smartButtonMaxItems:5,
                showCheckAll : false,
                showUncheckAll : false
            };
            if(!scope.scheduleRoute.scheduleInfo){
                scope.scheduleInfo =[];
                scope.scheduleRoute.scheduleInfo = scope.scheduleInfo;
                scope.scheduleRoute.default_ringto = scope.tcAction.ringtoNum;
                scope.scheduleRoute.activate_voicemail = scope.tcAction.activateVoiceMail;
                scope.scheduleRoute.playDisclaimer = 'before';
                scope.scheduleRoute.recordCall = scope.tcAction.recordCall;
                scope.scheduleRoute.disableRC = scope.tcAction.disableRC;
                scope.showAddSchedule = true;
                if(scope.scheduleRoute.default_ringto == undefined || scope.scheduleRoute.default_ringto == ""){
                    scope.activatevm = false;
                }else{
                    scope.activatevm = true;
                }
                scope.scheduleInfo.push({scheduleId:scope.scheduleInfo.length,days:[],fromTime:'',toTime:'',ringTo:'', isAddOverflow:true,openOverflowBox :false,overflowNumbers:[{overflowNumber:'',rings:3,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false});
            }else{
                scope.scheduleInfo = scope.scheduleRoute.scheduleInfo;
                _.each(scope.scheduleRoute.scheduleInfo, function(schedule){
                    if(schedule.activateVoicemail == true){
                        scope.scheduleRoute.disableRC = true;    
                    }
                });
                if(scope.scheduleRoute.activate_voicemail){
                    scope.scheduleRoute.disableRC = true;
                }
                if(scope.scheduleRoute.default_ringto == undefined || scope.scheduleRoute.default_ringto == ""){
                    scope.activatevm = false;
                }else{
                    scope.activatevm = true;
                }
            }
            scope.scheduleEvents = {
                onItemCustomSelect: function(schData) { scope.checkCurrentSchedule(schData); scope.showSubmitFunction();}
            };
            scope.showSubmit = function(){
                scope.showSubmitFunction();
            };
            scope.showAddOverflow = function(id){
                if(UserWebService.unMaskData(scope.scheduleInfo[id].ringTo) !== undefined && UserWebService.unMaskData(scope.scheduleInfo[id].ringTo).length == 10 && UserWebService.unMaskData(scope.scheduleInfo[id].ringTo).slice(0,1) !== "0"){
                    scope.scheduleInfo[id].isAddOverflow = false;
                    scope.checkCurrentSchedule(id);
                }else{
                    scope.scheduleInfo[id].isAddOverflow = true; 
                    scope.showAddSchedule = true;  
                }
            };
            scope.checkCurrentSchedule = function(id){
                _.each(scope.scheduleInfo ,function(scheduleData){
                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined  ){ 
                        scope.showAddSchedule = false;
                    }else{
                        scope.showAddSchedule = true ; 
                    }
                });
                if(validateSchedule(id)){
                    scope.showAddSchedule = true;
                    scope.disableSaveForSchedule.levelThird = true;
                    scope.invalidSchedules++;
                    var scid = scope.duplicateSchelduleID + 1;
                    if(scid == 1){
                        scid = scid + "st";
                    }
                    else if(scid == 2){
                        scid = scid + "nd";
                    }
                    else if(scid == 3){
                        scid = scid + "rd";
                    }
                    else if(scid >= 4){
                        scid = scid + "th";
                    }
                    scope.scheduleRoute.isValid = false;
                    scope.scheduleRoute.error = 'Check for Overlaping Schedule For ' + scid + " Schedule";
                   pinesNotifications.notify({
                         title: '3rd level IVR Form',
                         text: 'Check for Overlaping Schedule For ' + scid + " Schedule",
                         type: 'error'
                     });
                }else{
                    scope.disableSaveForSchedule.levelThird = false;
                }
            };
            var validateSchedule = function(id){
                scope.duplicateScheldule = false;
                scope.duplicateSchelduleID = -1;
                scope.scheduleTimeSlots.push("End of Day");
                var lastSchedule = '';
                var currentIndex = '';
                var schFromTime = '';
                var schToTime = '';
                var matchedFromTime = '';
                var matchedToTime = '';
                scope.scheduleRoute.error = '';
                scope.scheduleRoute.isValid = true;
                if(scope.scheduleInfo.length < 1 ){
                    return false;
                }
                if(id == 9999){
                     lastSchedule = scope.scheduleInfo[$scope.scheduleInfo.length - 1];
                     currentIndex = scope.scheduleInfo.length - 1;
                }else{
                    lastSchedule = scope.scheduleInfo[id];
                    currentIndex = id;

                }
                if(scope.scheduleInfo.length > 1){
                    for(var i=0; i < scope.scheduleInfo.length ;i++){
                        if(scope.scheduleInfo[i].days && scope.scheduleInfo[i].days.length > 0){
                            for (var j = 0; j < scope.scheduleInfo[i].days.length; j++) {
                                for (var k = 0; k < lastSchedule.days.length; k++) {
                                    if(scope.extendScheduleDays[scope.scheduleInfo[i].days[j].id].indexOf(lastSchedule.days[k].id) > -1){
                                        schFromTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].fromTime);
                                        schToTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].toTime);
                                        matchedFromTime = scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        matchedToTime = scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){ 
                                           scope.duplicateScheldule = true;
                                           scope.duplicateSchelduleID = i;
                                        }
                                    }

                                    if(scope.extendScheduleDays[lastSchedule.days[k].id].indexOf(scope.scheduleInfo[i].days[j].id) > -1){
                                        schFromTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].fromTime);
                                        schToTime = scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[i].toTime);
                                        matchedFromTime = scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        matchedToTime = scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){ 
                                           scope.duplicateScheldule = true;
                                           scope.duplicateSchelduleID = i;
                                          
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    scope.scheduleTimeSlots.splice(-1,1);
                    return false;

                }
                scope.scheduleTimeSlots.splice(-1,1);
                if(scope.duplicateScheldule){
                    scope.scheduleInfo[currentIndex].invalid = true;
                }else if(currentIndex !== undefined){
                   scope.scheduleInfo[currentIndex].invalid = false ;
                }
                return scope.duplicateScheldule;
            };
            scope.checkForValidSchedules = function(){
                var invalid = 0;
                for (var i = scope.scheduleInfo.length - 1; i >= 0; i--) {
                    validateSchedule(i);
                }
                _.each(scope.scheduleInfo ,function(scheduleData){
                    if((scheduleData.invalid || scheduleData.days.length === 0) && scope.scheduleInfo.length > 1){
                        invalid++;
                    }
                });
                return invalid;
            };
            scope.addSchedule=function(){
                scope.showAddSchedule = true ;
                var error = false;
                _.each(scope.scheduleInfo ,function(scheduleData){
                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined ){ 
                        error = false;
                    }else{
                        error = true;
                    }
                });
                if(!error){
                    scope.scheduleInfo.push({scheduleId:scope.scheduleInfo.length,days:[],fromTime:'',toTime:'',ringTo:'', isAddOverflow:true,overflowNumbers:[{overflowNumber:'',rings:3,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false});
                }else{

                    var invalid = scope.checkForValidSchedules();
                    if(invalid !== 0){
                        pinesNotifications.notify({
                            title: '3rd level IVR Form',
                            text: 'Please check for invalid schedule',
                            type: 'error'
                        });
                    }
                }
            };

            scope.formationscheduleTimeSlots = function(id){
                scope.scheduleInfo[id].scheduleEndTimeSlots = scope.scheduleTimeSlots.slice(scope.scheduleTimeSlots.indexOf(scope.scheduleInfo[id].fromTime) + 1, scope.scheduleTimeSlots.length);
                scope.scheduleInfo[id].scheduleEndTimeSlots.push("End of Day");

            };
            scope.checkRingToNumberSchedule = function(ringtonum){
                if(ringtonum){
                    var str = UserWebService.unMaskData(ringtonum);
                    if(str.charAt(0) == '0'){
                        return true;
                    }
                    if( UserWebService.unMaskData(ringtonum).length == 10){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            };
            scope.removeSchedule = function(id) {
                $bootbox.confirm("Are you sure you want to delete this Schedule?", function(clickedOK) {
                    if(validateSchedule(id)){
                       scope.invalidSchedules--;
                    }

                    if (clickedOK) {
                        scope.scheduleInfo.splice(id, 1);
                        angular.forEach(scope.scheduleInfo, function(value){
                        scope.disableRC = false;
                        if(value.activateVoicemail == true){
                            scope.disableRC = true;
                            scope.recordCall = true;
                        }
                        if(scope.scheduleRoute.activate_voicemail == true){
                            scope.disableRC = true;  
                        }
                        });
                    }
                    var invalid = scope.checkForValidSchedules();
                    if( invalid === 0){
                        scope.showAddSchedule = false;
                        scope.disableSaveForSchedule.levelThird = false;
                        scope.showSubmitFunction();
                    }else{
                        scope.showAddSchedule = true;
                        pinesNotifications.notify({
                            title: '3rd level IVR Form',
                            text: 'Please check for invalid schedule',
                            type: 'error'
                        });
                    }
                });
            };
            scope.activateVoicemailSchedule = function(){
                if(scope.scheduleRoute.default_ringto && UserWebService.unMaskData(scope.scheduleRoute.default_ringto).length == 10){
                    scope.activatevm = true;
                }else{
                    scope.scheduleRoute.activate_voicemail = false;
                    scope.activatevm = false;
                }
			};
			scope.retainDataOnChange=function(){
                     
				scope.tcAction.ringtoNum = scope.scheduleRoute.default_ringto;
				scope.tcAction.activateVoiceMail =  scope.scheduleRoute.activate_voicemail;
                scope.tcAction.recordCall =  scope.scheduleRoute.recordCall;
				scope.tcAction.disableRC =  scope.scheduleRoute.disableRC;
			};	
            scope.disableRecordCall = function(index){
                var activatedVMs = [];
                scope.scheduleRoute.disableRC = false;
                if(scope.scheduleRoute.scheduleInfo[index]){
                    scope.scheduleRoute.scheduleInfo[index].activateVoicemail = !scope.scheduleRoute.scheduleInfo[index].activateVoicemail;
                }else{
                    scope.scheduleRoute.activate_voicemail = !scope.scheduleRoute.activate_voicemail;
                }
                activatedVMs.push(scope.scheduleRoute.activate_voicemail);
                var scheduleVms = _.pluck(scope.scheduleRoute.scheduleInfo,'activateVoicemail');
                var trueVm = _.filter(scheduleVms.concat(activatedVMs), function(activevm){ return activevm  === true; });
                if(trueVm.length > 0){
                    scope.scheduleRoute.disableRC = true;
                    scope.scheduleRoute.recordCall = true;
                }
                if(scope.scheduleRoute.scheduleInfo[index])
                {
                    scope.scheduleRoute.scheduleInfo[index].activateVoicemail = !scope.scheduleRoute.scheduleInfo[index].activateVoicemail;
                }else{
                    scope.scheduleRoute.activate_voicemail = !scope.scheduleRoute.activate_voicemail;
                }
            };
        };
        return {
            restrict: "E",
            link: link,
            scope: {
               overflowValidationHeader:'=',
               scheduleRoute: '=',
               disableSaveForSchedule:"=",
               showSubmitOverflowMethod:'&',
               showSubmitFunction : '&showSubmit',
               voicemailComponent:"=",
			   tcAction:'='
            },
            templateUrl: "views/directives/thirdLevel_scheduleRoute.html"
        };
    }]);
    
    function overflowRouting() {
        var link = function(scope) {
            scope.currentOverFlowNumber = scope.overflowNumbers[0];
            scope.shownotification = false;
            if(!scope.byDefaultRing){
                scope.byDefaultRing = 3;
            }
            scope.addOtherOverflowNumber = function(){
                if((scope.overflowNumbers[scope.overflowNumbers.length - 1].overflow_order === undefined || scope.overflowNumbers[scope.overflowNumbers.length - 1].overflow_order === null || scope.overflowNumbers[scope.overflowNumbers.length - 1].overflow_order === "") && scope.overflowNumbers.length === 1){
                    scope.overflowNumbers[scope.overflowNumbers.length - 1].overflow_order = 1;
                }
                scope.overflowNumbers.push({overflowNumber:'', rings: scope.byDefaultRing, overflow_order : scope.overflowNumbers[scope.overflowNumbers.length - 1].overflow_order + 1});
                scope.currentOverFlowNumber = scope.overflowNumbers[scope.overflowNumbers.length - 1];
            };
            scope.removeOverflowNumber=function(overflowNumber,rings){
                bootbox.confirm("Are you sure you want to delete this Overflow Number?", function(clickedOK) {
                    if (clickedOK) {
                        scope.overflowNumbers=_.without(scope.overflowNumbers, _.findWhere(scope.overflowNumbers, { overflowNumber:overflowNumber,rings:rings}));
                        if(scope.overflowNumbers.length === 0){
                        scope.openOverflowBox = false;
                        scope.overflowNumbers=[{overflowNumber:'', rings: scope.byDefaultRing}];
                        scope.isSimultaneousRing=false;
                }
                    scope.currentOverFlowNumber = scope.overflowNumbers[scope.overflowNumbers.length - 1];
                    scope.shownotification = true;
                    scope.showSubmitFunction();
                    }
                });
                
            };
            scope.replaceMasking = function(){
                scope.currentOverFlowNumber = scope.overflowNumbers[scope.overflowNumbers.length - 1];
                scope.currentOverFlowNumber.unmaskNumber = scope.currentOverFlowNumber.overflowNumber.replace(/[^0-9]+/g, '');
                scope.showSubmitFunction();
            };

        };

        return {
            restrict: "E",
            link: link,
            scope: {
               overflowNumbers: "=",
               openOverflowBox: "=",
               isSimultaneousRing:"=",
               currentOverFlowNumber: "=", 
               byDefaultRing: "=", 
               fromDirectiveFn: '=method' ,
               shownotification :'=',
               showSubmitFunction : '&showSubmit',
               overflowValidationHeader:'='
            },
            templateUrl: "views/directives/overflow.html"
        };
    }
    
    function callflowSettingsReportTable() {
        var link = function(scope) {
            scope.pageSize = 100;
            scope.getType = function (recordType) {
                return typeof recordType;  
            };
        };

        return {
            restrict: "E",
            link: link,
            scope: {
                visibleColumns: "=",
                rowData: "=",
                totalRows: "=",
                dbFieldNames: "=",
                columnDefIndices: "=",
                currentPage: "=",
                secondaryGrouping: "=",
                currentPaginationId: "=",
                routeTypes: "=",
                geoTypes: "=",
                showSubData: "&"
            },
            templateUrl: function(tElement, tAttrs) {
                return tAttrs.templateUrl;
            }
        };
    }

    app.service('advFilSrvc', function($rootScope, $window, $http, $location, ApiParam, pinesNotifications, $q) {

        console.log('@@@@@@@@@@@@@@@@ Advanced Filter Service Loaded @@@@@@@@@@@@@@@@');

        // ----- *** START OF ADV FILTER DATA *** ----- //
        var getJsonConfig = function() {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return config;
        };

        var getFilterData = function(filter_id) {
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/report/filter/" + filter_id, getJsonConfig());
        };

        var getAdSources = function() {
            return $http.get(ApiParam.baseURL() + '/v1/report/channellist', ApiParam.headerConfig());
        };

       /* var getCustomSources = function() {
            return $http.get(ApiParam.baseURL() + "/v1/customSource/" + $rootScope.currentOUId, ApiParam.headerConfig());
        };*/
        //--new code for geting custom sources
         var getCustomSources = function() {
            return $http.get(ApiParam.baseURL() + "/v1/customSource/userAccess/"+$rootScope.userId , ApiParam.headerConfig());
        };

        var getWebhookList = function() {
            return $http.get(ApiParam.baseURL() + "/v1/webhook/webhooklist/" + $rootScope.currentOUId, ApiParam.headerConfig());
        };
        var getAllInactiveUsers = function() {
            return $http.get(ApiParam.baseURL() + "/v1/user/deleted/" + $rootScope.currentOUId, ApiParam.headerConfig());
        };
        // Columns
        // Shared columns between call_detail and call_back
        var cd_cb_columns = [
            { label: 'Call ID', value: 'call.call_id' }, { label: 'Date', value: 'call.call_started' },
            { label: 'Group Name', value: 'ou.org_unit_name' }, { label: 'Campaign Name', value: 'c.campaign_name' },
            { label: 'Ad Source', value: 'ch.channel_id' },
            { label: 'Custom Source 1', value: "cfcs1.custom_source_type = 'CS1' AND cs1.custom_source_id" }, { label: 'Custom Source 2', value: "cfcs2.custom_source_type = 'CS2' AND cs2.custom_source_id" },
            { label: 'Custom Source 3', value: "cfcs3.custom_source_type = 'CS3' AND cs3.custom_source_id" }, { label: 'Custom Source 4', value: "cfcs4.custom_source_type = 'CS4' AND cs4.custom_source_id" },
            { label: 'Custom Source 5', value: "cfcs5.custom_source_type = 'CS5' AND cs5.custom_source_id" }, { label: 'Caller ID', value: 'call.source' },
            { label: 'Tracking Number', value: 'call.tracking' },
            { label: 'Destination Name', value: 'cd.ring_to_name' },
            { label: 'Destination Number', value: 'call.ring_to' }, { label: 'Duration', value: 'call.duration' },
            { label: 'Route Name', value: 'pr.provisioned_route_name' }, { label: 'Tag', value: "t.tag_name" },
            { label: 'Caller/Company Name', value: "cext.call_data.name" }, { label: 'Address', value: "cext.call_data.address" },
            { label: 'City', value: "cext.call_data.city" }, { label: 'State/Province', value: "cext.call_data.state" },
            { label: 'Zip/Postal Code', value: "cext.call_data.zip" }, { label: 'Disposition', value: 'call.disposition' },
            { label: 'Line Type', value: "cext.call_data.line" }
        ];
        
        // Check If manualscorecard subscription available
        if ($rootScope.userAccess !== undefined && $rootScope.userAccess.manualscorecard !== undefined && $rootScope.userAccess.manualscorecard >= 4) {
            cd_cb_columns.push({ label: 'Identified Agent', value: 'call.ct_user_id' });
        }

        if ($rootScope.is_migrated !== undefined && ($rootScope.is_migrated === true || $rootScope.is_migrated === "true")) {
            cd_cb_columns.push( {label: 'Sent to Voicemail', value: "cds.is_voicemail"},
                                { label: 'Hunt Type', value: 'cds.hunt_type' },
                                { label: 'Tracking Number Type', value: 'cds.tracking_type' },
                                { label: 'Instant Insights', value: "pcir.call_id" },
                                { label: 'Instant Insight Config', value: "pcir.post_Call_ivr_option_name" });
        }
        
        var select_score = [
            { label: 'Duration', value: 'c.duration' },
            { label: 'Group', value: 'ou.org_unit_name' },
            { label: 'Identified Agent', value: 'c.ct_user_id' },
            { label: 'Scorecard', value: 'sc.score_card_id' },
            { label: 'Score', value: 'scc.final_score' },
            { label: 'Call Title', value: 'cf.call_title' },
            { label: 'Tag', value: 't.tag_name' },
            { label: 'Comments', value: 'cm.comment_text' },

        ];

        var call_flow_columns = [
            { label: 'Tracking Number ID', value: 'pr.provisioned_route_id' },
            { label: 'Tracking Number Name', value: 'pr.provisioned_route_name' },
            { label: 'Tracking Number', value: 'pn.number_str' }, 
            { label: 'Tracking Number Type', value: 'cf.routable_type' },
            { label: 'Ring to phone number', value: 'cf.default_ringto' }, 
            { label: 'Ad Source', value: 'ch.channel_id' },
            { label: 'Custom Source 1', value: "cfcs1.custom_source_type = 'CS1' AND cs1.custom_source_id" }, 
            { label: 'Custom Source 2', value: "cfcs2.custom_source_type = 'CS2' AND cs2.custom_source_id" },
            { label: 'Custom Source 3', value: "cfcs3.custom_source_type = 'CS3' AND cs2.custom_source_id" }, 
            { label: 'Custom Source 4', value: "cfcs4.custom_source_type = 'CS4' AND cs4.custom_source_id" },
            { label: 'Custom Source 5', value: "cfcs5.custom_source_type = 'CS5' AND cs3.custom_source_id" },
            { label: 'Tracking Number Status', value: 'pr.provisioned_route_status' }, 
            { label: 'Group name', value: 'ou.org_unit_name' },
            { label: 'Campaign Name', value: 'c.campaign_name' }, 
            { label: 'DNI Type', value: 'ds.dni_type' },
            { label: 'Host Domain', value: 'ds.destination_url' }, 
            { label: 'Referring Website', value: 'ds.referrer' },
            { label: 'Html Class', value: 'ds.dni_element' }, 
            { label: 'Custom Parameters', value: 'dou.custom_params' },
            { label: 'Play Disclaimer', value: 'cf.play_disclaimer' }, 
            { label: 'Voice Prompt', value: 'cf.message_enabled' },
            { label: 'Whisper Message', value: 'cf.whisper_enabled' }, 
            { label: 'Record Call', value: 'cf.record_until' },
            { label: 'Pre-call webhook', value: 'pr.webhook_id' } 
        ];
        if ($rootScope.is_migrated !== undefined && ($rootScope.is_migrated === true || $rootScope.is_migrated === "true")) {
            call_flow_columns.push({label: 'Hunt Type', value: 'pr.hunt_type' },
                                   { label: 'Voicemail', value: 'cf.vm_enabled' },
                                   { label: 'Instant Insights', value: 'cf.postcall_ivr_enabled' },
                                   { label: 'Instant Insights Config', value: 'pcio.post_Call_ivr_option_name' });
        }
        var group_activity_columns = [
            { label: 'Group ID', value: 'ou.org_unit_id' },
            { label: 'Group Name', value: 'ou.org_unit_name' },
            { label: 'Group Ext ID', value: 'ou.org_unit_ext_id' },
            { label: 'Calls (GMT)', value: 'COUNT(cd.call_id)' },
            { label: 'Billable Minutes (GMT)', value: 'COALESCE(SUM(cd.bill_second) - 0)::float/60' },
            { label: 'Leads', value: 'COUNT(CASE WHEN lead_score.score_value > 50 THEN 1 END)' },
            { label: 'Conversions', value: 'COUNT(CASE WHEN conversion.score_value > 50 THEN 1 END)' },
            { label: 'Call Value', value: 'COALESCE(SUM(cd.call_value)-0 )' },
            { label: 'Unique', value: 'COUNT(CASE WHEN call.repeat_call = false THEN 1 END)' },
            { label: 'Answered', value: "COUNT(CASE WHEN call.disposition = 'ANSWERED' THEN 1 END)" }
        ];
        if ($rootScope.is_migrated !== undefined && ($rootScope.is_migrated === true || $rootScope.is_migrated === "true")) {
            group_activity_columns.push({ label: 'Voicemail', value: "COUNT(CASE WHEN cd.is_voicemail = 't' THEN 1 END)" });
        }
        var acquisition_columns = [
            { label: 'Total Calls', value: 'total_calls' },
            { label: 'Total Leads', value: 'lead_count' }, { label: '% of Leads', value: 'percent_of_leads' },
            { label: 'Avg Lead Quality', value: 'avg_lead_quality' }, { label: 'Conversion', value: 'conversion_count' },
            { label: 'Conversion %', value: 'conversion_percent' }, { label: 'Avg Duration', value: 'average_duration' },
            { label: 'Unique calls', value: 'unique_calls' },
        ];

        var group_activity_acquisition_columns = {
            call_flow: [{ label: 'Tracking Number', value: 'pn.number' }],
            campaign: [{ label: 'Campaign', value: 'c.campaign_name' }, { label: 'Campaign Ext ID', value: 'c.campaign_ext_id' }]
        };

        var acq_sec_columns = [
            { label: 'Campaign', value: 'campaign_name', grouping_val: "acq_campaign" }, { label: 'Call Flow', value: 'call_flow_name', grouping_val: "acq_callflow" },
            { label: 'Keyword', value: 'keyword', grouping_val: "acq_keyword" }, { label: 'Ad Source', value: 'dynamicsource', grouping_val: "dynamicsource" },
            { label: 'Ad Source', value: 'channel', grouping_val: "channel" }, { label: 'Ring To Number', value: 'ring_to_number', grouping_val: "ring_to_number" },
            { label: 'Last Page', value: 'last_page', grouping_val: "last_page" }, { label: 'First Page', value: 'first_page', grouping_val: "first_page" },
            { label: 'Source', value: 'source', grouping_val: "source" }, { label: 'Medium', value: 'medium', grouping_val: "medium" },
            { label: 'Source/Medium', value: 'source_medium', grouping_val: "source_medium" }
        ];

        var select_ad_names = [];
        // ----- *** Columns *** ----- //

        // ----- *** Operators *** ----- //
        // Allowed operators based on type of user_input and column name
        var containsTextMatch = { type: 'text', options: [{ label: 'Contains', value: 'ILIKE' }, { label: 'Equals', value: '=' }] };
        var specificTextMatch = { type: 'text', options: [{ label: 'Equals', value: '=' }] };
        var flexibleTextMatch = { type: 'text', options: [{ label: 'Equals', value: '=' }, { label: 'Greater than and Equals', value: '>=' }, { label: 'Less than and Equals', value: '<=' }] };

        var selectMatchLarge = { type: 'select-large', options: [{ label: 'Equals', value: '=' }] };
        var selectMatchSmall = { type: 'select-small', options: [{ label: 'Equals', value: '=' }] };

        var calendarMatch = { type: 'calendar', options: [{ label: 'Equals', value: '=' }, { label: 'Greater than and Equals', value: '>=' }, { label: 'Less than and Equals', value: '<=' }] };

        var containsIntMatch = { type: 'int', options: [{ label: 'Contains', value: 'ILIKE' }, { label: 'Equals', value: '=' }] };
        var specificIntMatch = { type: 'int', options: [{ label: 'Equals', value: '=' }] };
        var flexibleIntMatch = { type: 'int', options: [{ label: 'Equals', value: '=' }, { label: 'Greater than and Equals', value: '>=' }, { label: 'Less than and Equals', value: '<=' }] };
        var booleanMatch = { type: 'boolean', options: [{ label: 'Equals', value: '=' }] };
        // ----- *** Operators *** ----- //
        // ----- *** END OF ADV FILTER DATA *** ----- //

        // ----- *** START OF ADV FILTER LOGIC *** ----- //
        var advFilterDefinitions , AFD_select_users = [];
        var AFD_inclusivity, AFD_columns, AFD_operators, AFD_select_ad_names, AFD_select_webhook_names, AFD_select_custom_source_names, AFD_select_options;
        var globalReportScope = {};

        // Update the global report scope from any outside controller
        this.updateGlobalReportScope = function(reportScope) {
            globalReportScope = reportScope;
        };

        // Get the advanced filter definitions from any outside controller
        this.getAdvFilterDefinitions = function() { return advFilterDefinitions; };

        // Update the advanced filter definitions from any outside controller
        this.updateAdvFilterDefinitions = function(definitions) { advFilterDefinitions = definitions; };

        // Set timezone if undefined (Used for CT-Report Engine)
        if (!$rootScope.timezone) { $window.sessionStorage.timezone = 'America/Chicago'; }

        // Send the parsed and formatted data to the requesting controller from scope.dataToVariable
        this.sanitizeDbFilterData = function(data) {
            var retData = dataToVariable(data);
            console.log('INSIDE sanitizeDbFilterData IN advFilSrvc.js: Sending back sanitized filter data:', retData);

            return retData;
        };

        // data is the return data from the API that contains the 'filter' object and 'filter_rule' array of objects
        var dataToVariable = function(data) {
            console.log('INSIDE dataToVariable IN advFilSrvc.js: Data:', data);
            angular.forEach(data.filter_rule, function(rule, key) {
                if (rule.filter_key === 'timezone') {
                    $rootScope.timezone = $window.sessionStorage.timezone = rule.filter_value;
                }
            });

            var ret = { vars: {} };
            if (!$rootScope.timezone) { $rootScope.timezone = $window.sessionStorage.timezone; }
            // set date values
            var yearmonth;
            var fd = data.filter;
            if (Array.isArray(fd)) { fd = fd[0]; }

			var start = '';
			var end = '';
            if (fd.filter_range !== null) {
                ret.vars.end_date = moment().tz($rootScope.timezone).endOf('day');

                // set the start time
                if (fd.filter_range === 'today') {
                    ret.vars.start_date = moment().tz($rootScope.timezone).startOf('day');

                } else if (fd.filter_range === 'yesterday') {
                    ret.vars.start_date = moment().tz($rootScope.timezone).subtract(1, 'days').startOf('day');
                    ret.vars.end_date = moment().tz($rootScope.timezone).subtract(1, 'days').endOf('day');

                } else if (fd.filter_range === 'last_week') {
                    ret.vars.start_date = moment().tz($rootScope.timezone).subtract(6, 'days').startOf('day');
                    ret.vars.end_date = moment().tz($rootScope.timezone).subtract(0, 'days').endOf('day');

                } else if (fd.filter_range === 'last_30') {
                    ret.vars.start_date = moment().tz($rootScope.timezone).subtract(29, 'days').startOf('day');
                    ret.vars.end_date = moment().tz($rootScope.timezone).subtract(0, 'days').endOf('day');

                } else if (fd.filter_range === 'this_month') {
                    ret.vars.start_date = moment().tz($rootScope.timezone).startOf('month').startOf('day');
                    ret.vars.end_date = moment().tz($rootScope.timezone).endOf('month').endOf('day');

                } else if (fd.filter_range === 'last_month') {
                    ret.vars.start_date = moment().tz($rootScope.timezone).subtract(1, 'month').startOf('month').startOf('day');
                    ret.vars.end_date = moment().tz($rootScope.timezone).subtract(1, 'month').endOf('month').endOf('day');
                }
            } else {
                date_start = fd.filter_start.split("T");
				date_end = fd.filter_end.split("T");
				ret.vars.start_date = moment.utc(date_start[0]).format();
                ret.vars.end_date = moment.utc(date_end[0]).format();
            }
			if(typeof ret.vars.start_date == 'object') {				
            ret.drp_start = moment(ret.vars.start_date).tz($rootScope.timezone).format('MMMM D, YYYY');
            ret.drp_end = moment(ret.vars.end_date).tz($rootScope.timezone).format('MMMM D, YYYY');
            ret.vars.start_date = moment(ret.vars.start_date).tz($rootScope.timezone).format('YYYY-MM-DD');
            ret.vars.end_date = moment(ret.vars.end_date).tz($rootScope.timezone).format('YYYY-MM-DD');
			}			
			else {
				date_start = ret.vars.start_date.split("T");
				date_end = ret.vars.end_date.split("T");
				ret.drp_start = moment(date_start[0]).format('MMMM D, YYYY');
				ret.drp_end = moment(date_end[0]).format('MMMM D, YYYY');
				ret.vars.start_date = moment(date_start[0]).format('YYYY-MM-DD');
				ret.vars.end_date = moment(date_end[0]).format('YYYY-MM-DD');
			}  
            ret.vars.filter_id = fd.filter_id;
            /*ret.vars.drp_options = {
                startDate   : moment(ret.vars.start_date),
                endDate     : moment(ret.vars.end_date)
            };
            */

            if (data.filter_rule !== undefined) {
                var filterDef = [];
                var filter = [];

                angular.forEach(data.filter_rule, function(rule, key) {
                    // console.log('parsing rule', (key + 1), rule.filter_key, rule.comparator, rule.filter_value);
                    if (rule.filter_type === 'advanced_filter' || rule.filter_type === 'having_advanced_filter') {
                        if (rule.filter_type === "advanced_filter") {
                            ret.vars.filtertype = "a";
                        } else {
                            ret.vars.filtertype = "ha";
                        }

                        var tmpDef = {
                            filter_key: rule.filter_key,
                            comparator: rule.comparator,
                            filter_value: rule.filter_value,
                            filter_join: rule.filter_join,
                            filter_type: rule.filter_type
                        };
                        filterDef.push(tmpDef);

                        filter.push(rule.filter_key);
                        filter.push(rule.comparator);
                        filter.push(rule.filter_value);
                        filter.push(rule.filter_join);

                    } else if (rule.filter_type === 'basic_filter') {
                        console.log('######### BASIC FILTER SPOTTED #########', rule, key);
                        ret.vars.filter = rule.filter_value;
                        ret.vars.filtertype = 's';

                    } else {
                        ret.vars[rule.filter_key] = rule.filter_value;
                    }
                });

                ret.filterRule = filterDef;
                if (filter.length > 0) { ret.vars.filter = filter.join(','); }
            }

            if (Array.isArray(data.filter)) {
                data.filter = data.filter[0];
            }

            if (data.filter !== undefined) {
                ret.filterData = data.filter;
                if (data.filter.report_used !== undefined) { ret.vars.report = data.filter.report_used; }
                this.reportScope = ret.vars;
            }
            if (data.schedule !== undefined) { ret.scheduleData = data.schedule; }
            if (data.report !== undefined) { ret.reportData = data.report; }

            console.log('INSIDE dataToVariable IN advFilSrvc.js: Returning:', ret);
            return ret;
        };
        this.dataToVariable = dataToVariable;

        // Get all dynamic lists options, filter them down to unique options only, arrange in alpha and numerical order, as soon as advanced filter loads in
        this.getAllDynamicLists = function() {
            getAdSources().then(function(r) {
                var uniqueNames = [];
                AFD_select_ad_names = [];

                for (var i in r.data.json) {
                    if (uniqueNames.indexOf(r.data.json[i].cat_combo) === -1) {
                        AFD_select_ad_names.push({
                            label: r.data.json[i].cat_combo,
                            value: r.data.json[i].channel_id
                        });
                        uniqueNames.push(r.data.json[i].cat_combo);
                    }
                }
            });
        }();

        // Get all dynamic lists options, filter them down to unique options only, arrange in alpha and numerical order, as soon as advanced filter loads in
        this.getAllCustomSources = function() {
            getCustomSources().then(function(r) {
                var uniqueNames = [];
                AFD_select_custom_source_names = [];
                for (var i in r.data.json) {

                    if (globalReportScope.report === 'callflow_setting') {
                        if (uniqueNames.indexOf(r.data.json[i].custom_source_name) === -1 && r.data.json[i].custom_source_active) {
                            AFD_select_custom_source_names.push({
                                label: r.data.json[i].custom_source_name,
                                value: r.data.json[i].custom_source_id,
                                custom_source_type: r.data.json[i].custom_source_type
                            });
                            uniqueNames.push(r.data.json[i].custom_source_name);
                        }
                    } else {
                        //if (uniqueNames.indexOf(r.data.json[i].custom_source_name) === -1) {
                            AFD_select_custom_source_names.push({
                                label: r.data.json[i].custom_source_name,
                                value: r.data.json[i].custom_source_id,
                                custom_source_type: r.data.json[i].custom_source_type
                            });
                            uniqueNames.push(r.data.json[i].custom_source_name);
                        //}

                    }
                }
            });
        };
        this.getAllWebhookList = function() {
            getWebhookList().then(function(r) {
                AFD_select_webhook_names = [];

                for (var i in r.data.json) {
                    AFD_select_webhook_names.push({
                        label: r.data.json[i].webhook_name,
                        value: r.data.json[i].webhook_id
                    });
                }
            });
        }();

        this.getAllInactiveUsers = function() {
            getAllInactiveUsers().then(function(r) {
                angular.forEach(r.data.json, function(user) {
                    AFD_select_users.push({
                        label: user.username,
                        value: user.ct_user_id
                    });
                });
            });
        }();

        // Set select options based on page
        var setSelectOptions = function() {
            console.log('INSIDE setSelectOptions IN advFilSrvc.js: Setting select options for', globalReportScope.report);
            AFD_inclusivity = [{ label: 'Include', value: 'include' }, { label: 'Exclude', value: 'exclude' }];
            var columns = [];
            switch (globalReportScope.report) {
                case 'call_detail':
                    AFD_columns = cd_cb_columns;
                    break;
                case 'set-select-score':
                    AFD_columns = select_score;
                    break;
                case 'call_back':
                    AFD_columns = cd_cb_columns;
                    break;
                case 'callflow_setting':
                    AFD_columns = call_flow_columns;
                    break;
                case 'group_activity':
                    AFD_columns = group_activity_columns;
                    if (globalReportScope.secondary !== undefined && globalReportScope.secondary !== "none") {
                        console.log(group_activity_acquisition_columns[globalReportScope.secondary]);
                        AFD_columns = group_activity_acquisition_columns[globalReportScope.secondary].concat(AFD_columns);
                    }
                    break;
                case 'set-schedule-builder':
                    // scope.columns get's defined when the user selects a report type. ( $rootScope.$on('schedule_builder_report_changed') )
                    break;
                case 'acq_group':
                    columns.push({ label: 'Group Name', value: 'org_unit_name' });
                    break;
                case 'acq_campaign':
                    columns.push({ label: 'Campaign', value: 'campaign_name' });
                    break;
                case 'acq_callflow':
                    columns.push({ label: 'Call Flow', value: 'call_flow_name' });
                    break;
                case 'acq_keyword':
                    columns.push({ label: 'Keyword', value: 'keyword' });
                    break;
                case 'acq_source':
                    columns.push({ label: 'Source', value: 'dynamicsource' });
                    break;
            }
            if (globalReportScope.secondary !== undefined && globalReportScope.secondary !== "none" && globalReportScope.report.split("_")[0] === "acq") {
                var sec_grp = globalReportScope.secondary;
                var sec_acq_col = _.find(acq_sec_columns, function(item) {
                    if (item.grouping_val == sec_grp)
                        return { "label": item.label, "value": item.grouping_val };
                });
                columns.push(sec_acq_col);
            } else if (globalReportScope.report !== undefined && globalReportScope.report.split("_")[0] === "acq")
                AFD_columns = acquisition_columns;

            if (columns.length > 0) {
                columns = columns.concat(acquisition_columns);
                AFD_columns = columns;
            }
        };
        this.setSelectOptions = setSelectOptions;

        // Add Advanced Filter Definition / Initialize Advanced Filter
        var addFilterDefinition = function(initialize) {
            // console.log('INSIDE addFilterDefinition IN advFilSrvc: Adding filter definition');
            // Set defaults for Date/Time picker
            var dateTime = {};
            dateTime.date = new Date();
            dateTime.dateOptions = { formatYear: 'yy', startingDay: 1 };
            dateTime.format = 'dd-MMMM-yyyy';
            dateTime.open = function(e, $index) {
                this.opened = true;
                for (var i in this.advFilterDefinitions) {
                    if (i != $index) {
                        advFilterDefinitions[i].dateTime.opened = false;
                    }
                }
            };
            dateTime.opened = false;

            if (initialize) {
                advFilterDefinitions.push({
                    inclusivity: AFD_inclusivity,
                    columns: AFD_columns,
                    operators: AFD_operators,
                    selected_inclusivity: AFD_inclusivity[0],
                    dateTime: dateTime
                });
            } else {
                // Check to see if a rule has been selected on the last rule - (true - add a new definition, false - display error pine notification)
                if (advFilterDefinitions[advFilterDefinitions.length - 1].rule || advFilterDefinitions.length == 1) {
                    advFilterDefinitions.push({
                        inclusivity: AFD_inclusivity,
                        columns: AFD_columns,
                        operators: AFD_operators,
                        selected_inclusivity: AFD_inclusivity[0],
                        dateTime: dateTime,
                        rule: 'AND'
                    });
                } else {
                    pinesNotifications.notify({
                        title: 'Advanced Filter',
                        text: 'Please complete the required join type before adding a new filter.',
                        type: 'error'
                    });
                }
            }
        };
        this.addFilterDefinition = addFilterDefinition;

        // Remove Advanced Filter Definition
        this.removeFilterDefinition = function($index) {
            advFilterDefinitions.splice($index, 1);
            advFilterDefinitions[0].rule = '';
        };

        // Update selectable operators based on which column is selected
        var updateOperators = function(preloading, selected, $index) {
            console.log('INSIDE updateOperators IN advFilSrvc.js: Updating:', preloading, selected, $index);
            var updatedOperators, switcher;

            if (preloading) {
                switcher = selected.value;
                $index = 0;
            } else {
                switcher = selected.selected_column.value;
            }

            var selectMatches = ['ch.cat_combo', 'cds.tracking_type','cf.routable_type', 'cds.is_voicemail', 'pr.provisioned_route_status', 'ds.dni_type', 'ch.channel_id', "cfcs1.custom_source_type = 'CS1' AND cs1.custom_source_id", "cfcs2.custom_source_type = 'CS2' AND cs2.custom_source_id", "cfcs3.custom_source_type = 'CS3' AND cs3.custom_source_id", "cfcs4.custom_source_type = 'CS4' AND cs4.custom_source_id", "cfcs5.custom_source_type = 'CS5' AND cs5.custom_source_id", 'cf.play_disclaimer', 'cf.message_enabled', 'cf.whisper_enabled', 'cf.record_until', 'call.disposition', 'pr.webhook_id', 'c.ct_user_id', 'sc.score_card_id','call.ct_user_id','pr.hunt_type','cds.hunt_type', 'pcir.call_id','cf.postcall_ivr_enabled', 'pcir.post_Call_ivr_option_name', 'pcio.post_Call_ivr_option_name', 'cf.vm_enabled'];
            var calendarMatches = ['call.call_started'];

            var specificIntMatches = ['pr.provisioned_route_id', 'cf.default_ringto', 'call.call_id'];
            // var specificTextMatches = ['call.source', 'cf.record_until', "t.tag_name", "cu.username"];
            var specificTextMatches = ['call.source', 'cf.record_until', "t.tag_name"];

            var containIntMatches = ['call.tracking', 'call.ring_to', 'pn.number_str'];
            var containTextMatches = ['ou.org_unit_name', 'org_unit_name', 'c.campaign_name',
                'cd.ring_to_name', 'ds.destination_url', 'ds.referrer', 'ds.dni_element', 'dou.custom_params',
                'ou.org_unit_ext_id', 'group', 'campaign_name', 'call_flow_name', 'keyword', 'dynamicsource', 'channel', 'source', 'medium',
                'source_medium', 'first_page', 'last_page', 'ring_to_number', 'c.campaign_name', 'c.campaign_ext_id', 'pr.provisioned_route_name','pr.hunt_type','cds.hunt_type',
                "cext.call_data.name",
                "cext.call_data.address",
                "cext.call_data.city",
                "cext.call_data.state",
                "cext.call_data.zip",
                "cext.call_data.line",
                "cf.call_title", "cm.comment_text",
                "cf.postcall_ivr_enabled",
                "pcir.call_id",
                "pcir.post_Call_ivr_option_name",
                "pcio.post_Call_ivr_option_name"
            ];

            var flexibleIntMatches = ['ou.org_unit_id', 'COUNT(cd.call_id)', 'COALESCE(SUM(cd.bill_second) - 0)::float/60', 'COUNT(CASE WHEN lead_score.score_value > 50 THEN 1 END)', 'COUNT(CASE WHEN conversion.score_value > 50 THEN 1 END)',
                'COALESCE(SUM(cd.call_value)-0 )', 'COUNT(CASE WHEN call.repeat_call = false THEN 1 END)',
                'total_calls', 'percent_of_leads', 'avg_lead_quality', 'conversion_count',
                'conversion_percent', 'COUNT(CASE WHEN call.repeat_call = false THEN 1 END)', "COUNT(CASE WHEN call.disposition = 'ANSWERED' THEN 1 END)",
                "COUNT(CASE WHEN cd.is_voicemail = 't' THEN 1 END)", 'pn.number'
            ];

            var flexibleTextMatches = ['scc.final_score', 'c.duration', 'call.duration', 'unique_calls', 'bill_minutes', 'lead_count', 'conversion', 'unique_calls', 'voicemail', 'answered', 'average_duration'];

            if (selectMatches.indexOf(switcher) !== -1) {
                switch (switcher) {
                    case 'ch.cat_combo':
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = AFD_select_ad_names;
                        break;
                    case 'scc.score_card_outcome_answer':
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = [
                            { label: 'Yes', value: 'True' }, { label: 'No', value: 'False' }
                        ];
                        break;
                    case 'ch.channel_id':
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = AFD_select_ad_names;
                        break;
                    case "cfcs1.custom_source_type = 'CS1' AND cs1.custom_source_id":
                        console.log(AFD_select_custom_source_names);
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = _.where(AFD_select_custom_source_names, { custom_source_type: "CS1" });
                        break;
                    case "cfcs2.custom_source_type = 'CS2' AND cs2.custom_source_id":
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = _.where(AFD_select_custom_source_names, { custom_source_type: "CS2" });
                        break;
                    case "cfcs3.custom_source_type = 'CS3' AND cs3.custom_source_id":
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = _.where(AFD_select_custom_source_names, { custom_source_type: "CS3" });
                        break;
                    case "cfcs4.custom_source_type = 'CS4' AND cs4.custom_source_id":
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = _.where(AFD_select_custom_source_names, { custom_source_type: "CS4" });
                        break;
                    case "cfcs5.custom_source_type = 'CS5' AND cs5.custom_source_id":
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = _.where(AFD_select_custom_source_names, { custom_source_type: "CS5" });
                        break;
                    case 'dynamicsource':
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = AFD_select_ad_names;
                        break;
                    case 'cf.routable_type':
                        updatedOperators = selectMatchLarge;
                        
                        if ($rootScope.is_migrated !== undefined && ($rootScope.is_migrated === true || $rootScope.is_migrated === "true")) {
                            AFD_select_options = [
                                { label: 'Simple', value: 'SimpleRoute' },{ label: 'Send directly to voicemail', value: 'VoicemailRoute' },
                                { value: "GeoRoute-claimedState", label: "GeoRoute - Claimed State"},
                                { value: "GeoRoute-Claimed", label: "GeoRoute - Claimed Zip-code"},
                                { value: "GeoRoute-Npa" , label: "GeoRoute - Caller Area Code Proximity"},
                                { value: "GeoRoute-Zipcode", label: "GeoRoute - Zip-code Proximity"}, { label: 'IVR', value: 'IvrRoute2' },
                                { label: 'Outbound', value: 'OutboundRoute' },
                                { label: 'Percentage', value: 'PercentageBasedRoute' },
                                { label: 'Schedule', value: 'ScheduleRoute' },
                                { label: 'Number Pool', value: 'number_pool'}, {label: 'Hang Up', value: 'Hangup'  },
                                { label: 'Toll Free', value: 'Toll_free'}
                            ];
                        }else{
                            AFD_select_options = [
                                { label: 'SimpleRoute', value: 'SimpleRoute' }, { label: 'TollFree', value: 'tollfree' },
                                { value: "GeoRoute-Claimed", label: "GeoRoute - Claimed Zip-code"},
                                { value: "GeoRoute-Npa" , label: "GeoRoute - Caller Area Code Proximity"},
                                { value: "GeoRoute-Zipcode", label: "GeoRoute - Zip-code Proximity"}, 
                                { label: 'IVR', value: 'IvrRoute2' },
                                { label: 'Percentage', value: 'PercentageBasedRoute' }, { label: 'Hang Up', value: 'Hangup' },
                                { label: 'Number Pool', value: 'number_pool' }, { label: 'Toll Free', value: 'Toll_free'}
                            ];
                        }
                        break;
                        case 'cds.is_voicemail':
                            updatedOperators = selectMatchSmall;
                            AFD_select_options = [
                                { label: 'Yes', value: '1' }, { label: 'No', value: '0' }
                            ];
                        break;
                        case 'cds.tracking_type':
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = [
                            { label: 'Simple', value: 'SimpleRoute' },
                            { value: "GeoRoute-claimedState", label: "GeoRoute - Claimed State"},
                            { value: "GeoRoute-Claimed", label: "GeoRoute - Claimed Zip-code"},
                            { value: "GeoRoute-Npa" , label: "GeoRoute - Caller Area Code Proximity"},
                            { value: "GeoRoute-Zipcode", label: "GeoRoute - Zip-code Proximity"}, { label: 'IVR', value: 'IvrRoute2' },
                            { label: 'Outbound', value: 'OutboundRoute' },
                            { label: 'Percentage', value: 'PercentageBasedRoute' },
                            { label: 'Schedule', value: 'ScheduleRoute' },
                            { label: 'Number Pool', value: 'number_pool' },
                            {label: 'Hang Up', value: 'Hangup'  }, { label: 'Toll Free', value: 'Toll_free'}
                        ];
                        if ($rootScope.is_migrated !== undefined && ($rootScope.is_migrated === true || $rootScope.is_migrated === "true")) {
                            AFD_select_options.push({ label: 'Voicemail', value: 'VoicemailRoute' });
                        }
                        break;    
                    case 'pr.provisioned_route_status':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }, { label: 'Referral', value: 'referral' }
                        ];
                        break;
                    case 'ds.dni_type':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Source', value: 'source' }, { label: 'Session', value: 'session' },
                            { label: 'Url', value: 'url' }
                        ];
                        break;
                    case 'cf.play_disclaimer':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Before', value: 'before' }, { label: 'After', value: 'after' }, { label: 'Never', value: 'never' }
                        ];
                        break;
                    case 'cf.message_enabled':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Yes', value: '1' }, { label: 'No', value: '0' }
                        ];
                        break;
                    case 'cf.whisper_enabled':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Yes', value: '1' }, { label: 'No', value: '0' }
                        ];
                        break;
                    case 'cf.vm_enabled': 
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Yes', value: '1' }, { label: 'No', value: '0' }
                        ];
                        break;
                    case 'cf.record_until':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Yes', value: true }, { label: 'No', value: false }
                        ];
                        break;
                    case 'call.disposition':
                        updatedOperators = selectMatchSmall;
                        if ($rootScope.is_migrated !== undefined && ($rootScope.is_migrated === true || $rootScope.is_migrated === "true")) {
                            AFD_select_options = [
                                { label: 'Answered', value: 'ANSWERED' }, { label: 'Referral', value: 'REFERRAL' },
                                { label: 'Busy', value: 'BUSY' },
                                { label: 'No Answer', value: 'NO ANSWER' },
                                { label: 'Caller Hangup', value: 'CALLER HANGUP' },
                                { label: 'Hang Up', value: 'HANGUP' }
                            ];
                        }else{
                            AFD_select_options = [
                                { label: 'Answered', value: 'ANSWERED' }, { label: 'Referral', value: 'REFERRAL' },
                                { label: 'Busy', value: 'BUSY' },
                                { label: 'No Answer', value: 'NO ANSWER' },
                                { label: 'Hang Up', value: 'HANGUP' }
                            ];
                        }
                        // if ($rootScope.is_migrated !== undefined && ($rootScope.is_migrated === true || $rootScope.is_migrated === "true")) {
                        //     AFD_select_options.push({ label: 'Voicemail', value: 'VOICEMAIL' });
                        // }
                        break;
                    case 'pr.hunt_type':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Rollover', value: 'rollover' }, { label: 'Overflow', value: 'overflow' },
                            { label: 'Simultaneous Ring', value: 'simultaneous' }
                            
                        ];
                        break;
                    case 'cds.hunt_type':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Rollover', value: 'rollover' }, { label: 'Overflow', value: 'overflow' },
                            { label: 'Simultaneous Ring', value: 'simultaneous' }
                            
                        ];
                        break;
                    case 'pcir.call_id':
                    case 'cf.postcall_ivr_enabled':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Yes', value: true }, { label: 'No', value: false }
                        ];
                        break;
                    case 'pcio.post_Call_ivr_option_name':
                    case 'pcir.post_Call_ivr_option_name':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Call Outcome and Agent ID', value: 'Call Outcome and Agent ID' }, { label: 'Call Outcome (Conversion type)', value: 'Call Outcome (Conversion type)' }, { label: 'Agent ID', value: 'Agent ID' }
                        ];
                        break;
                    case 'pr.webhook_id':
                        updatedOperators = selectMatchLarge;
                        AFD_select_options = AFD_select_webhook_names;
                        break;
                    case 'c.ct_user_id':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = AFD_select_users;
                        break;
                     case 'sc.score_card_id':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [];
                        angular.forEach(globalReportScope.advFilterScorecards, function(sc) {
                            AFD_select_options.push({
                                label: sc.score_card_title,
                                value: sc.score_card_id
                            });
                        });
                       
                        break;    
                    case 'call.ct_user_id':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = AFD_select_users;
                        break;
                    
                }
            } else if (calendarMatches.indexOf(switcher) !== -1) {
                updatedOperators = calendarMatch;
            } else if (specificIntMatches.indexOf(switcher) !== -1) {
                updatedOperators = specificIntMatch;
            } else if (specificTextMatches.indexOf(switcher) !== -1) {
                updatedOperators = specificTextMatch;
            } else if (containIntMatches.indexOf(switcher) !== -1) {
                updatedOperators = containsIntMatch;
            } else if (containTextMatches.indexOf(switcher) !== -1) {
                updatedOperators = containsTextMatch;
            } else if (flexibleIntMatches.indexOf(switcher) !== -1) {
                updatedOperators = flexibleIntMatch;
            } else if (flexibleTextMatches.indexOf(switcher) !== -1) {
                updatedOperators = flexibleTextMatch;
            }

            // Set operator options and pre-selected operator
            if (preloading) {
                return updatedOperators;
            } else {
                advFilterDefinitions[$index].selected_operator = updatedOperators.options[0];
                advFilterDefinitions[$index].operators = updatedOperators;
                advFilterDefinitions[$index].show_operators = true;
                advFilterDefinitions[$index].select_options = AFD_select_options;
            }
        };
        this.updateOperators = updateOperators;

        // Reset the Advanced Filter
        this.resetAdvFilter = function() {
            // Remove all definitions and add a default one
            advFilterDefinitions = [];
            setSelectOptions();
            addFilterDefinition(true);
        };

        // Validate the Advanced Filter
        var validateFilters = function() {
            console.log('INSIDE validateFilters IN advFilSrvc.js: Validating:', globalReportScope.advFilterDefinitions);
            var error = {};
            var labels = ['first', 'second', 'third', 'fourth', 'fifth'];

            for (var i = 0; i < globalReportScope.advFilterDefinitions.length; i++) {
                if (!globalReportScope.advFilterDefinitions[i].selected_inclusivity) {
                    error.title = 'Missing inclusivity';
                    error.text = 'Please make sure you have selected an inclusivity for your ' + labels[i] + ' filter.';
                    error.found = true;
                    break;
                } else if (!globalReportScope.advFilterDefinitions[i].selected_column) {
                    error.title = 'Missing column';
                    error.text = 'Please make sure you have selected a column for your ' + labels[i] + ' filter.';
                    error.found = true;
                    break;
                } else if (!globalReportScope.advFilterDefinitions[i].selected_operator) {
                    error.title = 'Missing comparator';
                    error.text = 'Please make sure you have selected an comparator for your ' + labels[i] + ' filter.';
                    error.found = true;
                    break;
                } else if (!globalReportScope.advFilterDefinitions[i].user_input) {
                    if (globalReportScope.advFilterDefinitions[i].user_input !== 0) {
                        error.title = 'Missing input';
                        error.text = 'Please make sure you have filled out the required input for your ' + labels[i] + ' filter.';
                        error.found = true;
                    }
                    break;
                } else if (!globalReportScope.advFilterDefinitions[i].rule && i !== 0) {
                    error.title = 'Missing filter rule';
                    error.text = 'Please make sure you have selected a join type for you ' + labels[i] + ' filter.';
                    error.found = true;
                    break;
                }
            }

            if (!error.found) {
                return true;
            } else {
                return {
                    title: error.title,
                    text: error.text
                };
            }
        };
        this.validateFilters = validateFilters;

        // Sanitize the Advanced Filter
        var sanitizeFilters = function() {
            var filters = [];
            var operator;
            var tmpHashIndex = null;

            console.log('INSIDE sanitizeFilters IN advFilSrvc.js: Sanitizing:', globalReportScope.advFilterDefinitions);
            // Inverse operator if exclude
            for (var i in globalReportScope.advFilterDefinitions) {
                operator = globalReportScope.advFilterDefinitions[i].selected_operator.value;
                if (globalReportScope.advFilterDefinitions[i].selected_inclusivity.value === 'exclude') {
                    console.log('INSIDE sanitizeFilters IN advFilSrvc.js: Inversing operator:', globalReportScope.advFilterDefinitions[i]);
                    switch (globalReportScope.advFilterDefinitions[i].selected_operator.value) {
                        case '=':
                            operator = '!=';
                            break;
                        case '!=':
                            operator = "=";
                            break;
                        case 'ILIKE':
                            operator = "NOT ILIKE";
                            break;
                        case 'NOT ILIKE':
                            operator = "ILIKE";
                            break;
                        case '>=':
                            operator = "<=";
                            break;
                        case '<=':
                            operator = '>=';
                            break;
                    }
                }

                // Check to see if input type is int. ParseInt user input.
                if (globalReportScope.advFilterDefinitions[i].operators.type === "int") {
                    var regObj = /^\(?\d{3}\)?[\s\-]\d{3}[\s\-]\d{4}\$/;
                    if (regObj.test(globalReportScope.advFilterDefinitions[i].user_input)) {
                        console.log('@@@@@@@@@ PHONE NUMBER SPOTTED @@@@@@@@@');
                    }
                    // // (999)-999-9999
                    // if (.test(globalReportScope.advFilterDefinitions[i].user_input) ) {
                    //
                    // }
                    globalReportScope.advFilterDefinitions[i].user_input = parseInt(globalReportScope.advFilterDefinitions[i].user_input);
                }
                // if (typeof(globalReportScope.advFilterDefinitions[i].user_input) === "string") {
                //     tmpHashIndex = globalReportScope.advFilterDefinitions[i].user_input.indexOf(",");

                //     if (tmpHashIndex > -1){
                //         j = globalReportScope.advFilterDefinitions[i].user_input.replace(/,/g,"#");
                //     }
                   
                // }
              
                // if(!angular.isUndefined(globalReportScope.advFilterDefinitions[i].selected_column)){
                //     if((globalReportScope.advFilterDefinitions[i].selected_column.label == 'Group Name')&&(!angular.isUndefined(globalReportScope.advFilterDefinitions[i].user_input))){
                //         globalReportScope.advFilterDefinitions[i].user_input = globalReportScope.advFilterDefinitions[i].user_input.trim();
                //     }
                // }
                // Sanitize advFilterDefinitions into what the backend is looking for.
                // console.log("===========",tmpHashIndex);
                filters.push({
                    "filter_key": globalReportScope.advFilterDefinitions[i].selected_column.value,
                    "comparator": operator,
                    "filter_value": globalReportScope.advFilterDefinitions[i].user_input,
                    "filter_join": (!globalReportScope.advFilterDefinitions[i].rule ? 'NONE' : globalReportScope.advFilterDefinitions[i].rule),
                    "filter_type": globalReportScope.report !== "group_activity" ? "advanced_filter" : "having_advanced_filter"
                });
            }

            console.log('INSIDE sanitizeFilters IN advFilSrvc.js: Sanitized Definitions:', filters);
            return filters;
        }.bind(this);
        this.sanitizeFilters = sanitizeFilters;

        this.urlStringToData = function() {
            var qstr = $location.search();
            console.log('INSIDE urlStringToData IN directives.js: Qstr:', qstr);
            if (Object.keys(qstr).length < 1) {
                qstr.filter = decodeURIComponent(qstr.filter);
            }
        };

        // Request scope variables needed for query string and set to an object
        var setUrlParams = function(sanitizedDefinitions) {
            console.log("INSIDE setUrlParams IN advFilSrvc.js: Using report scope", globalReportScope);

            // This depends on the return value being populated with this
            var sv = globalReportScope;
            var parseAdv = false;
            var params = {};
            var advRule = [];
            var filterRule = [];
            var tmp = "";
            var comIndex = "";
            // set advanced / basic filter vars
            if (angular.isDefined(globalReportScope.advFilterDefinitions) && globalReportScope.advFilterDefinitions.length > 0 && validateFilters() === true) {
                // console.log('filter is using advanced filter');

                var adv = false;
                var filtertype = "a";
                //console.log('setting adv filter rules');
                // cycle through filter rules
                angular.forEach(globalReportScope.advFilterDefinitions, function(rule, key) {
                    if (rule.selected_column !== undefined) {
                        adv = true;
                        tmp = rule.user_input;
                        if (typeof(rule.user_input) == "string"){
                            var hashIndex = rule.user_input.indexOf(",");
                            if (hashIndex > -1){
                                comIndex = rule.user_input;
                                rule.user_input = comIndex.replace(/,/g,"`");
                            }
                        }
                        if (sanitizedDefinitions) {
                            advRule.push(sanitizedDefinitions[key].filter_key);
                            advRule.push(sanitizedDefinitions[key].comparator);

                            if (sanitizedDefinitions[key].filter_type === 'advanced_filter') {
                                filtertype = 'a';
                            } else {
                                filtertype = 'ha';
                            }
                        } else {
                            advRule.push(rule.selected_column.value);
                            advRule.push(rule.selected_operator.value);
                        }
                        if (rule.operators.type === "calendar") {
                            rule.user_input = moment(rule.user_input).format('YYYY-MM-DD');
                        }
                        advRule.push(rule.user_input);
                        advRule.push(rule.rule);

                        filterRule.push(rule);
                        rule.user_input = tmp ;
                    }
                });
                if (adv) {
                    params.filtertype = filtertype;
                    params.filter = advRule.join(',');
                }

            } else if (sv.filter !== undefined && sv.filter !== '') {
                console.log('filter is set in scope');
                // check if we need to parse advanced filters
                if (sv.filtertype !== undefined && (sv.filtertype === 'a' || sv.filtertype === 'ha')) {
                    params.filter = decodeURIComponent(sv.filter);
                    parseAdv = true;
                    params.filtertype = sv.filtertype;
                } else {
                    params.filtertype = 's';
                }
            } else if ($location.search().filter) {
                console.log('filter is set in query string');
                if ($location.search().filtertype === 'a') {
                    params.filter = unescape($location.search().filter);
                    parseAdv = true;
                    params.filtertype = 'a';
                } else {
                    params.filtertype = 's';
                }
            } else { //if (this.simpleSearchFilter !== '') {
                console.log('SIMPLE FILTER DEFAULT', globalReportScope.simpleSearchFilter);
                params.filtertype = 's';
            }

            // handle conversion of filter rules into array of objects
            if (parseAdv) {
                // params.filtertype = sv.filtertype;
                advRule = params.filter.split(',');

                while (advRule.length >= 4) {
                    var rule = {};
                    rule.filter_key = advRule.shift();
                    rule.comparator = advRule.shift();
                    rule.filter_value = advRule.shift();
                    rule.filter_join = advRule.shift();
                    filterRule.push(rule);
                }
            } else if (params.filtertype === 's') {
                params.filter = (globalReportScope.simpleSearchFilter !== '' ? globalReportScope.simpleSearchFilter : '');
                if (typeof(params.filter) == "string"){
                    tmp = params.filter;
                    var hashIndex = params.filter.indexOf(",");
                    if (hashIndex > -1){
                        comIndex = params.filter;
                        params.filter = comIndex.replace(/,/g,"`");
                    }
                    if( globalReportScope.simpleSearchFilter === '') {
                        globalReportScope.simpleSearchFilter = tmp;
                    }
                }
                // console.log('Have simple filter', params.filter, this.simpleSearchFilter);

            }

            // set the other URL params
            //params.filterRule = filterRule;
            // console.log('filterRule in setUrlParams in directive', filterRule);
            // console.log('FILTER', params.filter, 'FILTERTYPE', params.filtertype);

            // set 'secondary',  'exportData' 'filtertype', 'filter'
            if (angular.isDefined(sv.exportData)) { params.exportData = sv.exportData; }
            //if (angular.isDefined(sv.filtertype)) {  params.filtertype = sv.filtertype; }
            //if (angular.isDefined(sv.filter)) { params.filter = sv.filter; }
            params.secondary = (angular.isDefined(sv.secondary) ? sv.secondary : 'none');

            // set start_date
            if (angular.isDefined(sv.drp_start)) {
                params.start_date = moment(sv.drp_start, "MMMM D, YYYY").format('YYYY-MM-DD');
                // console.log('start date from drp_start', params.start_date);
            } else if ($location.search().start_date) {
                params.start_date = $location.search().start_date;
                // console.log('start date from query string', params.start_date);
            } else if ($window.sessionStorage.report_start_date) {
                params.start_date = moment($window.sessionStorage.report_start_date, 'MMMM D, YYYY').format('YYYY-MM-DD');
            } else {
                params.start_date = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
                // console.log('start date set to default', params.start_date);
            }
            // set end_date
            if (angular.isDefined(sv.drp_end)) {
                params.end_date = moment(sv.drp_end, "MMMM D, YYYY").format('YYYY-MM-DD');
            } else if ($location.search().end_date) {
                params.end_date = $location.search().end_date;
            } else if ($window.sessionStorage.report_end_date) {
                params.end_date = moment($window.sessionStorage.report_end_date).format('MMMM D, YYYY');
            } else {
                params.end_date = moment().format('YYYY-MM-DD');
            }
            // set report
            if (angular.isDefined(sv.report)) {
                params.report = sv.report;
            } else if ($location.search().report) {
                params.report = $location.search().report;
            }

            // set timezone
            if (angular.isDefined(sv.timezone)) {
                // console.log('FROM VARIABLE', sv.timezone);
                params.timezone = sv.timezone;
            } else if ($location.search().timezone) {
                params.timezone = decodeURIComponent($location.search().timezone);
                // console.log('FROM QSTR', params.timezone);
            } else if (angular.isDefined($rootScope.timezone)) {
                params.timezone = $rootScope.timezone;
                // console.log('ROOTSCOPE', params.timezone);
            }

            // set limit
            if (angular.isDefined(sv.limit)) {
                params.limit = sv.limit;
            } else if ($location.search().limit) {
                params.limit = $location.search().limit;
            } else {
                params.limit = 100;
            }
            // set offset
            if (angular.isDefined(sv.offset)) {
                params.offset = sv.offset;
            } else if ($location.search().offset) {
                params.offset = $location.search().offset;
            } else {
                params.offset = 0;
            }

            /*params.drp_options = {
                startDate   : moment(params.start_date),
                endDate     : moment(params.end_date),
                ranges: {
                    'Today': [ moment().startOf('day'), moment().endOf('day') ],
                    'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                    'Last 7 Days': [moment().subtract(7, 'days').startOf('day'), moment().endOf('day')],
                    'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
                    'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day')]
                },
                opens: 'left'
            };
            */
            params.drp_start = moment(params.start_date).format('MMMM D, YYYY');
            params.drp_end = moment(params.end_date).format('MMMM D, YYYY');
            var ret = {
                drp_start: moment(params.start_date).format('MMMM D, YYYY'),
                drp_end: moment(params.end_date).format('MMMM D, YYYY'),
                vars: params,
                filterRule: filterRule
            };

            this.reportScope = ret.vars;
            // if (params.filtertype == "s"){
            //     if (tmp != null || tmp != undefined){
            //         //$scope.simpleSearchFilter = tmp;
            //     }
            // }
            console.log('return from setUrlParams', ret.vars);
            
            return ret;
        };
        this.setUrlParams = setUrlParams;

        // Apply basic or advanced filter
        this.applyFilter = function(reportScope) {
            globalReportScope = reportScope;
            if (globalReportScope.advFilterDefinitions.length > 0 && globalReportScope.advFilterDefinitions[0].selected_column && globalReportScope.showAdvFilter) {
                var validated = validateFilters();
                if (validated === true) {
                    var sanitizedDefinitions = sanitizeFilters();
                    return setUrlParams(sanitizedDefinitions);
                } else {
                    pinesNotifications.notify({
                        title: validated.title,
                        text: validated.text,
                        type: 'error'
                    });
                    return false;
                }
            } else if (globalReportScope.advFilterDefinitions.length > 0 && globalReportScope.showAdvFilter) {
                var error = validateFilters();
                pinesNotifications.notify({
                    title: error.title,
                    text: error.text,
                    type: 'error'
                });
                return false;
            } else {
                return setUrlParams();
            }
        };

        // Initialize Advanced Filter
        var initializeAdvFil = function(filters) {
            if (filters) { console.log('INSIDE initializeAdvFil IN advFilSrvc.js: Initializing filter with', filters); }

            advFilterDefinitions = [];
            setSelectOptions();

            if (!filters) {
                addFilterDefinition(true);
            } else if (Array.isArray(filters) && filters.length > 0) {
                // console.log('PRELOADING FILTER IN INITIALIZE FILTER', filters);
                // console.log('AFD_columns', AFD_columns)
                for (var i = 0; i < filters.length; i++) {
                    var selected_column, operators, selected_operator, rule, selected_inclusivity = AFD_inclusivity[0];

                    // Determine which column should be selected
                    for (var j in AFD_columns) {
                        // console.log(scope.columns[j]);
                        if (AFD_columns[j].value === filters[i].filter_key) {
                            selected_column = AFD_columns[j];
                        }
                    }

                    if (!selected_column) {
                        console.log('No match found for', filters[i].filter_key, JSON.stringify(AFD_columns));
                        break;
                    } else {
                        operators = updateOperators(true, selected_column);
                    }

                    switch (filters[i].comparator) {
                        case '!=':
                            filters[i].comparator = "=";
                            selected_inclusivity = AFD_inclusivity[1];
                            break;
                        case 'NOT ILIKE':
                            filters[i].comparator = "ILIKE";
                            selected_inclusivity = AFD_inclusivity[1];
                            break;
                    }

                    for (var l in operators.options) {
                        if (operators.options[l].value === filters[i].comparator) {
                            selected_operator = operators.options[l];
                        }
                    }

                    advFilterDefinitions.push({
                        inclusivity: AFD_inclusivity,
                        columns: AFD_columns,
                        operators: operators,
                        show_operators: true,
                        select_options: (AFD_select_options ? AFD_select_options : ''),
                        selected_inclusivity: selected_inclusivity,
                        selected_column: selected_column,
                        selected_operator: selected_operator,
                        user_input: filters[i].filter_value,
                        rule: (i !== 0 ? filters[i].filter_join : '')
                    });
                }
            } else {
                addFilterDefinition(true);
            }

            console.log('INSIDE initializeAdvFil IN advFilSrvc.js: advFilterDefinitions:', advFilterDefinitions);
        }.bind(this);

        // Determine whether to preload or normal load the advanced filter
        this.determineInitializationMethod = function(reportScope) {
            if (reportScope) { globalReportScope = reportScope; } else { console.log('INSIDE determineInitializationMethod IN advFilSrvc.js: No reportScope found.'); }
            var defferedObj = $q.defer();
            if ($location.search().filter_id) {
                console.log('INSIDE determineInitializationMethod IN advFilSrvc.js: Loading using filter_id method:', $location.search().filter_id);
                // make call to API for filter data
                getFilterData($location.search().filter_id).then(function(result) {
                    if (result.data.result === 'success') {
                        // call function to convert the data to variables format
                        console.log('got filter data', result.data.json);

                        var retData = dataToVariable(result.data.json);
                        var filters = [];
                        if (retData.vars.secondary)
                            globalReportScope.secondary = retData.vars.secondary;
                        if (retData.filterRule.length >= 1) {
                            console.log('############# AdvFilterDefinitions spotted');
                            initializeAdvFil(retData.filterRule);
                        } else {
                            initializeAdvFil();
                        }

                        console.log('INSIDE determineInitializationMethod IN advFilSrvc.js: Returning retData', retData);
                        defferedObj.resolve(retData);
                    } else {
                        pinesNotifications.notify({
                            title: 'Filter data',
                            text: 'Failed to load filter data',
                            type: 'error'
                        });
                    }
                });

                return defferedObj.promise;
            } else {
                console.log('INSIDE determineInitializationMethod IN advFilSrvc.js: Loading using scope and qstr');
                var retData = setUrlParams();
                defferedObj.resolve(retData);

                if (angular.isDefined(retData.filterRule) && retData.filterRule.length > 0) {
                    initializeAdvFil(retData.filterRule);
                } else {
                    initializeAdvFil();
                }

                return defferedObj.promise;
            }
        };

        // Only allow 0 - 9 and backspace on user int inputs
        this.validateInput = function(e) {
            var key = e.which || e.charCode;

            if (e.keyCode != 8 && (key < 48 || key > 57)) {
                e.preventDefault();
            }
        };
    });


    app.controller('advFilterController', function($scope, $rootScope, $location, $window, pinesNotifications, advFilSrvc, createDialog) {
        // NOTE: 10/25/16 - James Lemire: This file is extremely important, removing any pieces can result in numerous errors. Please contact me before removing code. I had to re-do schedule builder due to some code being removed.
        console.log('@@@@@@@@@@@@@@@@ Advanced Filter Loaded @@@@@@@@@@@@@@@@');
        console.log('@@@@@@@@@@@@@@@@ ACTIVE LISTENERS @@@@@@@@@@@@@@@@', $rootScope.$$listeners);
        $scope.preloading = false;
        $scope.showAdvFilter = false;

        // Set timezone if undefined (Used for CT-Report Engine)
        if (!$rootScope.timezone) { $window.sessionStorage.timezone = 'America/Chicago'; }

        // Change display of advanced filter if loaded on set-schedule-builder page
        if ($location.$$path.substring(1) === 'set-schedule-builder') {
            $scope.previewMode = true;
            $scope.hideApplyButton = true;
        } else {
            $scope.previewMode = false;
            $scope.hideApplyButton = false;
        }

        // Send the parsed and formatted data to the requesting controller from scope.dataToVariable
        $rootScope.$on('send_db_filter_data', function(e, data) {
            var retData = $scope.dataToVariable(data);
            $rootScope.$broadcast('return_db_filter_data', retData);
            // Preloads the advanced filter for schedule builder page
            if (retData.filterRule.length >= 1) {
                $scope.initializeAdvFil(retData.filterRule);
            }
        });

        // data is the return data from the API that contains the 'filter' object and 'filter_rule' array of objects
        $scope.dataToVariable = function(data) {
            var ret = { vars: {} };

            // set date values
            var yearmonth;
            var fd = data.filter;
            if (Array.isArray(fd)) { fd = fd[0]; }

            if (fd.filter_range !== null) {
                ret.vars.drp_end = moment().tz($rootScope.timezone).endOf('day');

                // set the start time
                if (fd.filter_range === 'today') {
                    ret.vars.drp_start = moment().tz($rootScope.timezone).startOf('day');

                } else if (fd.filter_range === 'yesterday') {
                    ret.vars.drp_start = moment().tz($rootScope.timezone).subtract(1, 'days').startOf('day');
                    ret.vars.drp_end = moment().tz($rootScope.timezone).subtract(1, 'days').endOf('day');

                } else if (fd.filter_range === 'last_week') {
                    ret.vars.drp_start = moment().tz($rootScope.timezone).subtract(7, 'days').startOf('day');

                } else if (fd.filter_range === 'last_30') {
                    ret.vars.drp_start = moment().tz($rootScope.timezone).subtract(29, 'days').startOf('day');

                } else if (fd.filter_range === 'this_month') {
                    ret.vars.drp_start = moment().tz($rootScope.timezone).startOf('month').startOf('day');
                    ret.vars.drp_end = moment().tz($rootScope.timezone).endOf('month').endOf('day');
                } else if (fd.filter_range === 'last_month') {
                    ret.vars.drp_start = moment().tz($rootScope.timezone).subtract(1, 'month').startOf('month').startOf('day');
                    ret.vars.drp_end = moment().tz($rootScope.timezone).subtract(1, 'month').endOf('month').endOf('day');
                }
            } else {
                ret.vars.drp_start = moment(fd.filter_start).tz($rootScope.timezone).format('YYYY-MM-DD');
                ret.vars.drp_end = moment(fd.filter_end).tz($rootScope.timezone).format('YYYY-MM-DD');
            }
            ret.vars.filter_start = moment(ret.vars.drp_start).tz($rootScope.timezone);
            ret.vars.filter_end = moment(ret.vars.drp_end).tz($rootScope.timezone);

            ret.vars.drp_start = moment(ret.vars.drp_start).tz($rootScope.timezone).format('MMMM D, YYYY');
            ret.vars.drp_end = moment(ret.vars.drp_end).tz($rootScope.timezone).format('MMMM D, YYYY');
            ret.vars.filter_id = fd.filter_id;

            if (data.filter_rule !== undefined) {
                var filterDef = [];
                var filter = [];

                angular.forEach(data.filter_rule, function(rule, key) {
                    // console.log('parsing rule', (key + 1), rule.filter_key, rule.comparator, rule.filter_value);
                    if (rule.filter_type === 'advanced_filter') {
                        ret.vars.filtertype = 'a';
                        var tmpDef = {
                            filter_key: rule.filter_key,
                            comparator: rule.comparator,
                            filter_value: rule.filter_value,
                            filter_join: rule.filter_join,
                            filter_type: rule.filter_type
                        };
                        filterDef.push(tmpDef);

                        filter.push(rule.filter_key);
                        filter.push(rule.comparator);
                        filter.push(rule.filter_value);
                        filter.push(rule.filter_join);

                    } else if (rule.filter_type === 'basic_filter') {
                        ret.vars.filter = rule.filter_value;
                        ret.vars.filtertype = 's';

                    } else {
                        ret.vars[rule.filter_key] = rule.filter_value;
                    }
                });

                ret.filterRule = filterDef;
                if (filter.length > 0) { ret.vars.filter = filter.join(','); }
            }

            if (Array.isArray(data.filter)) {
                data.filter = data.filter[0];
            }

            if (data.filter !== undefined) {
                ret.filterData = data.filter;
                if (data.filter.report_used !== undefined) { ret.vars.report = data.filter.report_used; }
                $scope.reportScope = ret.vars;
            }
            if (data.schedule !== undefined) { ret.scheduleData = data.schedule; }
            if (data.report !== undefined) { ret.reportData = data.report; }

            console.log('INSIDE $scope.dataToVariable IN directives.js: Sending back formatted data', ret);
            return ret;
        };

        // Get all dynamic lists options, filter them down to unique options only, arrange in alpha and numerical order, as soon as advanced filter loads in
        $scope.getAllDynamicLists = function() {
            advFilSrvc.getAdSources().then(function(r) {
                var uniqueNames = [];
                $scope.select_ad_names = [];

                for (var i in r.data.json) {
                    if (uniqueNames.indexOf(r.data.json[i].cat_combo) === -1) {
                        $scope.select_ad_names.push({
                            label: r.data.json[i].cat_combo,
                            value: r.data.json[i].channel_id
                        });
                        uniqueNames.push(r.data.json[i].cat_combo);
                    }
                }
            });
        }();

        // Set select options based on page
        $scope.setSelectOptions = function() {
            $scope.inclusivity = [{ label: 'Include', value: 'include' }, { label: 'Exclude', value: 'exclude' }];
            var columns = [];
            switch ($scope.reportScope.report) {
                case 'call_detail':
                    $scope.columns = advFilSrvc.cd_cb_columns;
                    break;
                case 'call_back':
                    $scope.columns = advFilSrvc.cd_cb_columns;
                    break;
                case 'callflow_setting':
                    $scope.columns = advFilSrvc.call_flow_columns;
                    break;
                case 'group_activity':
                    $scope.columns = advFilSrvc.group_activity_columns;
                    break;
                case 'set-schedule-builder':
                    // scope.columns get's defined when the user selects a report type. ( $rootScope.$on('schedule_builder_report_changed') )
                    break;
                case 'acq_group':
                    $scope.columns = advFilSrvc.acquisition_columns;
                    break;
                case 'acq_campaign':
                    columns.push({ label: 'Campaign', value: 'campaign_name' });
                    break;
                case 'acq_callflow':
                    columns.push({ label: 'Call Flow', value: 'call_flow_name' });
                    break;
                case 'acq_keyword':
                    columns.push({ label: 'Keyword', value: 'keyword' });
                    break;
                case 'acq_source':
                    columns.push({ label: 'Ad Source', value: 'dynamicsource' });
                    break;
            }
            if (columns.length > 0) {
                columns = columns.concat(advFilSrvc.acquisition_columns);
                $scope.columns = columns;
            }
        };

        // Set/Initialize/Reset select options based on report used
        $rootScope.$on('schedule_builder_report_changed',
            function(e, report) {
                var acquisition, columns = [];
                $scope.resetAdvFilter();
                switch (report) {
                    case 'call_detail':
                        $scope.advFilterDefinitions[0].columns = advFilSrvc.cd_cb_columns;
                        $scope.columns = advFilSrvc.cd_cb_columns;
                        break;
                    case 'call_back':
                        $scope.advFilterDefinitions[0].columns = advFilSrvc.cd_cb_columns;
                        $scope.columns = advFilSrvc.cd_cb_columns;
                        break;
                    case 'group_activity':
                        $scope.advFilterDefinitions[0].columns = advFilSrvc.group_activity_columns;
                        $scope.columns = advFilSrvc.group_activity_columns;
                        break;
                    case 'callflow_setting':
                        $scope.advFilterDefinitions[0].columns = advFilSrvc.call_flow_columns;
                        $scope.columns = advFilSrvc.call_flow_columns;
                        break;
                    case 'acq_campaign':
                        columns.push({ label: 'Campaign', value: 'campaign' });
                        acquisition = true;
                        break;
                    case 'acq_callflow':
                        columns.push({ label: 'Call Flow', value: 'call_flow_name' });
                        acquisition = true;
                        break;
                    case 'acq_keyword':
                        columns.push({ label: 'Keyword', value: 'keyword' });
                        acquisition = true;
                        break;
                    case 'acq_group':
                        $scope.columns = advFilSrvc.acquisition_columns;
                        break;
                    case 'acq_source':
                        columns.push({ label: 'Ad Source', value: 'dynamicsource' });
                        acquisition = true;
                        break;
                }

                if (acquisition) {
                    columns = columns.concat(advFilSrvc.acquisition_columns);
                    $scope.advFilterDefinitions[0].columns = columns;
                    $scope.columns = columns;
                }
            });

        // Add Advanced Filter Definition / Initialize Advanced Filter
        $scope.addFilterDefinition = function(initialize) {
            // Set defaults for Date/Time picker
            var dateTime = {};
            dateTime.date = new Date();
            dateTime.dateOptions = { formatYear: 'yy', startingDay: 1 };
            dateTime.format = 'dd-MMMM-yyyy';
            dateTime.open = function(e, $index) {
                this.opened = true;
                for (var i in $scope.advFilterDefinitions) {
                    if (i != $index) {
                        $scope.advFilterDefinitions[i].dateTime.opened = false;
                    }
                }
            };
            dateTime.opened = false;

            if (initialize) {
                $scope.advFilterDefinitions.push({
                    inclusivity: $scope.inclusivity,
                    columns: $scope.columns,
                    operators: $scope.operators,
                    selected_inclusivity: $scope.inclusivity[0],
                    dateTime: dateTime
                });
            } else {
                // Check to see if a rule has been selected on the last rule - (true - add a new definition, false - display error pine notification)
                if ($scope.advFilterDefinitions[$scope.advFilterDefinitions.length - 1].rule ||
                    $scope.advFilterDefinitions.length == 1) {
                    $scope.advFilterDefinitions.push({
                        inclusivity: $scope.inclusivity,
                        columns: $scope.columns,
                        operators: $scope.operators,
                        selected_inclusivity: $scope.inclusivity[0],
                        dateTime: dateTime,
                        rule: 'AND'
                    });

                    // Check to see if maximum filters have been added - (true - hide add an advanced filter button)
                    if ($scope.advFilterDefinitions.length == $scope.advancedFilterConfig.maxQuantity) {
                        $scope.advFilterMax = true;
                    }
                } else {
                    pinesNotifications.notify({
                        title: 'Advanced Filter',
                        text: 'Please complete the required join type before adding a new filter.',
                        type: 'error'
                    });
                }
            }
        };

        // Remove Advanced Filter Definition
        $scope.removeFilterDefinition = function($index) {
            // Check to see filter defintions is greator than the minQuantity - (true - remove definition)
            if ($scope.advFilterDefinitions.length > $scope.advancedFilterConfig.minQuantity) {
                $scope.advFilterDefinitions.splice($index, 1);
                $scope.advFilterMax = false;
            }

            $scope.resizeWindow();
        };

        // Show operators when column is selected
        $scope.showOperatorSelect = function($index) {
            $scope.advFilterDefinitions[$index].show_operators = true;
        };

        // Update selectable operators based on which column is selected
        $scope.updateOperators = function(preloading, selected, $index) {
            var updatedOperators, switcher;
            if (preloading) {
                switcher = selected.value;
            } else {
                switcher = selected.selected_column.value;
            }

            var selectMatches = ['ch.cat_combo', 'cds.tracking_type','cf.routable_type','cds.is_voicemail', 'pr.provisioned_route_status', 'ds.dni_type', 'cs.custom_source_id', 'pr.hunt_type','cds.hunt_type', 'pcir.call_id', 'cf.postcall_ivr_enabled', 'pcir.post_Call_ivr_option_name', 'pcio.post_Call_ivr_option_name'];
            var calendarMatches = ['call.call_started'];

            var specificIntMatches = ['call.call_id', 'pr.provisioned_route_id'];
            var specificTextMatches = ['call.source', 'pr.provisioned_route_name', 'cf.record_until'];

            var containIntMatches = ['call.tracking', 'call.ring_to', 'pn.number_str', 'cf.default_ringto'];
            var containTextMatches = ['ou.org_unit_id', 'ou.org_unit_name', 'org_unit_name', 'c.campaign_name', 'cd.ring_to_name', 'ds.destination_url', 'ds.referrer', 'ds.dni_element', 'dou.custom_params', 'cf.play_disclaimer', 'cf.message', 'cf.whisper_message', 'group', 'campaign_name', 'call_flow_name', 'keyword', 'dynamicsource', 'pn.number_type', 'pr.hunt_type','cds.hunt_type', 'cf.postcall_ivr_enabled', 'pcir.call_id', 'pcir.post_Call_ivr_option_name', 'pcio.post_Call_ivr_option_name'];
            var flexibleIntMatches = ['call.duration', 'total_calls', 'percent_of_leads', 'avg_lead_quality', 'conversion_count', 'conversion_percent', 'unique_calls', ];
            var flexibleTextMatches = ['unique_calls', 'average_duration', 'bill_minutes', 'lead_count', 'conversion', 'call_value', 'voicemail', 'answered'];

            if (selectMatches.indexOf(switcher) !== -1) {
                switch (switcher) {
                    case 'ch.cat_combo':
                        updatedOperators = advFilSrvc.selectMatch;
                        $scope.advFilterDefinitions[$index].select_options = $scope.select_ad_names;
                        break;
                    case 'cf.routable_type':
                        updatedOperators = advFilSrvc.selectMatch;
                        $scope.advFilterDefinitions[$index].select_options = [
                            { label: 'GeoRoute', value: 'GeoRoute' }, { label: 'IvrRoute', value: 'IvrRoute' },
                            { label: 'IvrRoute2', value: 'IvrRoute2' }, { label: 'OutboundRoute', value: 'OutboundRoute' },
                            { label: 'PercentageBasedRoute', value: 'PercentageBasedRoute' }, { label: 'ScheduleRoute', value: 'ScheduleRoute' },
                            { label: 'SimpleRoute', value: 'SimpleRoute' },{ label: 'Toll Free', value: 'Toll_free'}
                        ];
                        break;
                    case 'cds.tracking_type':
                        updatedOperators = advFilSrvc.selectMatch;
                        $scope.advFilterDefinitions[$index].select_options = [
                            { label: 'GeoRoute', value: 'GeoRoute' }, { label: 'IvrRoute', value: 'IvrRoute' },
                            { label: 'IvrRoute2', value: 'IvrRoute2' }, { label: 'OutboundRoute', value: 'OutboundRoute' },
                            { label: 'PercentageBasedRoute', value: 'PercentageBasedRoute' }, { label: 'ScheduleRoute', value: 'ScheduleRoute' },
                            { label: 'SimpleRoute', value: 'SimpleRoute' }
                        ];
                        break;
                    case 'cds.is_voicemail':
                        updatedOperators = advFilSrvc.selectMatch;
                        $scope.advFilterDefinitions[$index].select_options = [
                            { label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' },
                        ];
                        break;
                    case 'pr.hunt_type':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Rollover', value: 'rollover' }, { label: 'Overflow', value: 'overflow' },
                            { label: 'Simultaneous Ring', value: 'simultaneous' }

                        ];
                        break;
                    case 'cds.hunt_type':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Rollover', value: 'rollover' }, { label: 'Overflow', value: 'overflow' },
                            { label: 'Simultaneous Ring', value: 'simultaneous' }

                        ];
                        break;
                    case 'pcir.call_id':
                    case 'cf.postcall_ivr_enabled':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Yes', value: true }, { label: 'No', value: false }
                        ];
                        break;
                    case 'pcio.post_Call_ivr_option_name':
                    case 'pcir.post_Call_ivr_option_name':
                        updatedOperators = selectMatchSmall;
                        AFD_select_options = [
                            { label: 'Call Outcome and Agent ID', value: 'Call Outcome and Agent ID' }, { label: 'Call Outcome (Conversion type)', value: 'Call Outcome (Conversion type)' }, { label: 'Agent ID', value: 'Agent ID' }
                        ];
                        break;
                    case 'pr.provisioned_route_status':
                        updatedOperators = advFilSrvc.selectMatch;
                        $scope.advFilterDefinitions[$index].select_options = [
                            { label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' },
                            { label: 'Deleted', value: 'deleted' }, { label: 'Suspended', value: 'suspended' }
                        ];
                        break;
                    case 'ds.dni_type':
                        updatedOperators = advFilSrvc.selectMatch;
                        $scope.advFilterDefinitions[$index].select_options = [
                            { label: 'Source', value: 'source' }, { label: 'Session', value: 'session' },
                            { label: 'Url', value: 'url' }
                        ];
                        break;
                }
            } else if (calendarMatches.indexOf(switcher) !== -1) {
                updatedOperators = advFilSrvc.calendarMatch;
            } else if (specificIntMatches.indexOf(switcher) !== -1) {
                updatedOperators = advFilSrvc.specificIntMatch;
            } else if (specificTextMatches.indexOf(switcher) !== -1) {
                updatedOperators = advFilSrvc.specificTextMatch;
            } else if (containIntMatches.indexOf(switcher) !== -1) {
                updatedOperators = advFilSrvc.containsIntMatch;
            } else if (containTextMatches.indexOf(switcher) !== -1) {
                updatedOperators = advFilSrvc.containsTextMatch;
            } else if (flexibleIntMatches.indexOf(switcher) !== -1) {
                updatedOperators = advFilSrvc.flexibleIntMatch;
            } else if (flexibleTextMatches.indexOf(switcher) !== -1) {
                updatedOperators = advFilSrvc.flexibleTextMatch;
            }

            // Set operator options and pre-selected operator
            if (preloading) {
                return updatedOperators;
            } else {
                $scope.advFilterDefinitions[$index].selected_operator = updatedOperators.options[0];
                $scope.advFilterDefinitions[$index].operators = updatedOperators;
            }
        };

        // Not sure what this does
        $scope.resizeWindow = function() {
            setTimeout(function() {
                $(window).trigger('resize');
            }, 100);
        };

        // Toggle the Advanced Filter - Event catcher needs to be added to each page
        $scope.toggleAdvFil = function(reset) {
            if (reset) {
                $scope.resetAdvFilter();
            }

            var page = $location.$$path.substring(1);
            if ($location.$$path.substring(1) === 'calls-details' ||
                $location.$$path.substring(1) === 'calls-callback') {
                page = 'call-log';
            }

            $rootScope.$broadcast('toggleAdvFil-' + page);
        };

        // Reset the Advanced Filter
        $scope.resetAdvFilter = function() {
            // Remove all definitions and add a default one & hide operators by setting showOperators = to false
            $scope.showAdvFilter = false;
            $scope.advFilterDefinitions = [];
            $scope.showOperators = false;
            $scope.setSelectOptions();
            $scope.addFilterDefinition(true);
        };

        // Validate the Advanced Filter
        $scope.validateFilters = function() {
            var error = {};
            var labels = ['first', 'second', 'third', 'fourth', 'fifth'];

            for (var i = 0; i < $scope.advFilterDefinitions.length; i++) {
                if (!$scope.advFilterDefinitions[i].selected_inclusivity) {
                    error.title = 'Missing inclusivity';
                    error.text = 'Please make sure you have selected an inclusivity for your ' + labels[i] + ' filter.';
                    error.found = true;
                    break;
                } else if (!$scope.advFilterDefinitions[i].selected_column) {
                    error.title = 'Missing column';
                    error.text = 'Please make sure you have selected a column for your ' + labels[i] + ' filter.';
                    error.found = true;
                    break;
                } else if (!$scope.advFilterDefinitions[i].selected_operator) {
                    error.title = 'Missing comparator';
                    error.text = 'Please make sure you have selected an comparator for your ' + labels[i] + ' filter.';
                    error.found = true;
                    break;
                } else if (!$scope.advFilterDefinitions[i].user_input) {
                    if ($scope.advFilterDefinitions[i].user_input !== 0) {
                        error.title = 'Missing input';
                        error.text = 'Please make sure you have filled out the required input for your ' + labels[i] + ' filter.';
                        error.found = true;
                    }
                    break;
                } else if (!$scope.advFilterDefinitions[i].rule && i !== 0) {
                    error.title = 'Missing filter rule';
                    error.text = 'Please make sure you have selected a join type for you ' + labels[i] + ' filter.';
                    error.found = true;
                    break;
                }
            }

            if (!error.found) {
                return true;
            } else {
                return {
                    title: error.title,
                    text: error.text
                };
            }
        };

        // Sanitize the Advanced Filter
        $scope.sanitizeFilters = function() {
            var filters = [];
            var operator;

            // Inverse operator if exclude
            for (var i in $scope.advFilterDefinitions) {
                operator = $scope.advFilterDefinitions[i].selected_operator.value;
                if ($scope.advFilterDefinitions[i].selected_inclusivity.value === 'exclude') {
                    switch ($scope.advFilterDefinitions[i].selected_operator.value) {
                        case '=':
                            operator = '!=';
                            break;
                        case '!=':
                            operator = "=";
                            break;
                        case 'ILIKE':
                            operator = "NOT ILIKE";
                            break;
                        case 'NOT ILIKE':
                            operator = "ILIKE";
                            break;
                        case '>=':
                            operator = "<=";
                            break;
                        case '<=':
                            operator = '>=';
                            break;
                    }
                }

                // Check to see if input type is int. ParseInt user input.
                if ($scope.advFilterDefinitions[i].operators.type === "int") {
                    $scope.advFilterDefinitions[i].user_input = parseInt(
                        $scope.advFilterDefinitions[i].user_input);
                }

                // Sanitize advFilterDefinitions into what the backend is looking for.
                filters.push({
                    "filter_key": $scope.advFilterDefinitions[i].selected_column.value,
                    "comparator": operator,
                    "filter_value": $scope.advFilterDefinitions[i].user_input,
                    "filter_join": (!$scope.advFilterDefinitions[i].rule ? 'NONE' : $scope.advFilterDefinitions[i].rule),
                    "filter_type": 'advanced_filter'
                });
            }

            return filters;
        };

        // Receive scope variables
        $rootScope.$on('receive_scope_' + $location.$$path.slice(1), function(e, reportScope) {
            $scope.reportScope = reportScope;
            console.log("INSIDE 'receive_scope_" + $location.$$path.slice(1) + "' IN directives.js: Setting $scope.reportScope", $scope.reportScope);
        });

        $rootScope.$on('start_url_assembly', function(e, blank) {
            console.log('INSIDE start_url_assembly IN directives.js: Invoking setUrlParams');
            var urlParams = $scope.setUrlParams();
            $rootScope.$broadcast('return_url_params', urlParams);
        });

        $scope.urlStringToData = function() {
            var qstr = $location.search();
            console.log('INSIDE urlStringToData IN directives.js: Qstr:', qstr);
            if (Object.keys(qstr).length < 1) {
                qstr.filter = decodeURIComponent(qstr.filter);
            }
        };

        // Request scope variables needed for query string and set to an object
        $scope.setUrlParams = function() {
            console.log("INSIDE setUrlParams IN directives.js: Broadcasting 'request_scope_" + $location.$$path.slice(1) + "'");
            $rootScope.$broadcast('request_scope_' + $location.$$path.slice(1));

            // This depends on the return value being populated with $scope
            var sv = $scope.reportScope;
            console.log('INSIDE setUrlParams IN directives.js: Requested scope:', sv);
            var parseAdv = false;
            var params = {};
            var advRule = [];
            var filterRule = [];
            // set advanced / basic filter vars
            if (angular.isDefined($scope.advFilterDefinitions) && $scope.advFilterDefinitions.length > 0 && $scope.validateFilters() === true) {
                // console.log('filter is using advanced filter');
                var adv = false;
                //console.log('setting adv filter rules');
                // cycle through filter rules
                angular.forEach($scope.advFilterDefinitions, function(rule, key) {
                    if (rule.selected_column !== undefined) {
                        adv = true;
                        // console.log('RULE', rule);
                        advRule.push(rule.selected_column.value);
                        advRule.push(rule.selected_operator.value);
                        advRule.push(rule.user_input);
                        advRule.push(rule.rule);

                        filterRule.push(rule);
                    }
                });
                if (adv) {
                    params.filtertype = 'a';
                    params.filter = advRule.join(',');
                }

            } else if (sv.filter !== undefined && sv.filter !== '') {
                // console.log('filter is set in scope');
                // check if we need to parse advanced filters
                if (sv.filtertype !== undefined && sv.filtertype === 'a') {
                    params.filter = decodeURIComponent(sv.filter);
                    parseAdv = true;
                } else {
                    params.filtertype = 's';
                }
            } else if ($location.search().filter) {
                // console.log('filter is set in query string');
                if ($location.search().filtertype === 'a') {
                    params.filter = decodeURIComponent($location.search().filter);
                    parseAdv = true;
                } else {
                    params.filtertype = 's';
                }
            } else { //if ($scope.simpleSearchFilter !== '') {
                // console.log('SIMPLE FILTER DEFAULT', $scope.simpleSearchFilter);
                params.filtertype = 's';
            }

            // handle conversion of filter rules into array of objects
            if (parseAdv) {
                params.filtertype = 'a';
                advRule = params.filter.split(',');

                while (advRule.length >= 4) {
                    var rule = {};
                    rule.filter_key = advRule.shift();
                    rule.comparator = advRule.shift();
                    rule.filter_value = advRule.shift();
                    rule.filter_join = advRule.shift();
                    filterRule.push(rule);
                }
            } else if (params.filtertype === 's') {
                params.filter = ($scope.simpleSearchFilter !== '' ? $scope.simpleSearchFilter : '');
                // console.log('Have simple filter', params.filter, $scope.simpleSearchFilter);
            }

            // set the other URL params
            //params.filterRule = filterRule;
            // console.log('filterRule in setUrlParams in directive', filterRule);
            // console.log('FILTER', params.filter, 'FILTERTYPE', params.filtertype);

            // set 'secondary',  'exportData' 'filtertype', 'filter'
            if (angular.isDefined(sv.exportData)) { params.exportData = sv.exportData; }
            //if (angular.isDefined(sv.filtertype)) {  params.filtertype = sv.filtertype; }
            //if (angular.isDefined(sv.filter)) { params.filter = sv.filter; }
            params.secondary = (angular.isDefined(sv.secondary) ? sv.secondary : 'none');

            // set start_date
            if (angular.isDefined(sv.drp_start)) {
                params.start_date = moment(sv.drp_start, "MMMM D, YYYY").format('YYYY-MM-DD');
                // console.log('start date from drp_start', params.start_date);
            } else if ($location.search().start_date) {
                params.start_date = $location.search().start_date;
                // console.log('start date from query string', params.start_date);
            } else if ($window.sessionStorage.report_start_date) {
                params.start_date = moment($window.sessionStorage.report_start_date, 'MMMM D, YYYY').format('YYYY-MM-DD');
            } else {
                params.start_date = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
                // console.log('start date set to default', params.start_date);
            }
            // set end_date
            if (angular.isDefined(sv.drp_end)) {
                params.end_date = moment(sv.drp_end, "MMMM D, YYYY").format('YYYY-MM-DD');
            } else if ($location.search().end_date) {
                params.end_date = $location.search().end_date;
            } else if ($window.sessionStorage.report_end_date) {
                params.end_date = moment($window.sessionStorage.report_end_date).format('MMMM D, YYYY');
            } else {
                params.end_date = moment().format('YYYY-MM-DD');
            }
            // set report
            if (angular.isDefined(sv.report)) {
                params.report = sv.report;
            } else if ($location.search().report) {
                params.report = $location.search().report;
            }
            // set timezone
            if (angular.isDefined(sv.timezone)) {
                // console.log('FROM VARIABLE', sv.timezone);
                params.timezone = sv.timezone;
            } else if ($location.search().timezone) {
                params.timezone = decodeURIComponent($location.search().timezone);
                // console.log('FROM QSTR', params.timezone);
            } else if (angular.isDefined($rootScope.timezone)) {
                params.timezone = $rootScope.timezone;
                // console.log('ROOTSCOPE', params.timezone);
            }
            // set limit
            if (angular.isDefined(sv.limit)) {
                params.limit = sv.limit;
            } else if ($location.search().limit) {
                params.limit = $location.search().limit;
            } else {
                params.limit = 100;
            }
            // set offset
            if (angular.isDefined(sv.offset)) {
                params.offset = sv.offset;
            } else if ($location.search().offset) {
                params.offset = $location.search().offset;
            } else {
                params.offset = 0;
            }

            var ret = {
                drp_start: moment(params.start_date).format('MMMM D, YYYY'),
                drp_end: moment(params.end_date).format('MMMM D, YYYY'),
                vars: params,
                filterRule: filterRule
            };

            $scope.reportScope = ret.vars;
            // console.log('@@@@@@@@ GOT URL PARAMS @@@@@@@@', params);
            return ret;
        };

        // Apply the Advanced Filter
        $scope.applyAdvFil = function() {
            console.log('INSIDE applyAdvFil IN directives.js: Applying advanced filter with the following definitions:', $scope.advFilterDefinitions);
            var validated = $scope.validateFilters();

            // Validate user errors
            if (validated === true) {
                $scope.sanitizeFilters();
                var urlParams = $scope.setUrlParams();
                //$location.url($location.path()+'?'+$.param(urlParams.vars));
                $rootScope.$broadcast('load_filter_params-' + $scope.reportScope.report, urlParams);

            } else {
                pinesNotifications.notify({
                    title: validated.title,
                    text: validated.text,
                    type: 'error'
                });
            }
        };

        // Apply the Basic Filter
        $scope.applyBasicFil = function() {
            var urlParams = $scope.setUrlParams();
            $rootScope.$broadcast('load_filter_params-' + $scope.reportScope.report, urlParams);
        };

        // Initialize Advanced Filter
        $scope.initializeAdvFil = function(filters) {
            if (filters) {
                console.log('INSIDE $scope.initializeAdvFil IN directives.js: Initializing filter with', filters);
            }
            $scope.advFilterDefinitions = [];
            $scope.setSelectOptions();
            $scope.advancedFilterConfig = { 'minQuantity': 1, 'maxQuantity': 5 };
            if (!filters) {
                $scope.addFilterDefinition(true);
            } else if (Array.isArray(filters) && filters.length > 0) {
                // console.log('PRELOADING FILTER IN INITIALIZE FILTER', filters);
                for (var i = 0; i < filters.length; i++) {
                    var selected_column, operators, selected_operator, rule, selected_inclusivity = $scope.inclusivity[0];
                    // Determine which column should be selected
                    for (var j in $scope.columns) {
                        // console.log(scope.columns[j]);
                        if ($scope.columns[j].value === filters[i].filter_key) {
                            selected_column = $scope.columns[j];
                        }
                    }

                    if (!selected_column) {
                        console.log('No match found for', filters[i].filter_key, $scope.columns);
                        break;
                    } else {
                        operators = $scope.updateOperators(true, selected_column);
                    }

                    switch (filters[i].comparator) {
                        case '!=':
                            filters[i].comparator = "=";
                            selected_inclusivity = $scope.inclusivity[1];
                            break;
                        case 'NOT ILIKE':
                            filters[i].comparator = "ILIKE";
                            selected_inclusivity = $scope.inclusivity[1];
                            break;
                    }

                    for (var l in operators.options) {
                        if (operators.options[l].value === filters[i].comparator) {
                            selected_operator = operators.options[l];
                        }
                    }

                    $scope.advFilterDefinitions.push({
                        inclusivity: $scope.inclusivity,
                        columns: $scope.columns,
                        operators: operators,
                        show_operators: true,
                        selected_inclusivity: selected_inclusivity,
                        selected_column: selected_column,
                        selected_operator: selected_operator,
                        user_input: filters[i].filter_value,
                        rule: (i !== 0 ? filters[i].filter_join : '')
                    });
                }
                $scope.showAdvFilter = true;
                $scope.preloading = false;
            } else {
                $scope.addFilterDefinition(true);
            }
        };

        // Determine whether to preload or normal load the advanced filter
        //$scope.determineInitializationMethod = function() {
        if ($location.search().filter_id) {
            console.log('INSIDE determineInitializationMethod IN directives.js: Loading using filter_id method:', $location.search().filter_id);
            // make call to API for filter data
            $scope.preloading = true;
            advFilSrvc.getFilterData($location.search().filter_id).then(function(result) {
                if (result.data.result === 'success') {
                    // call function to convert the data to variables format
                    // console.log('got filter data', result.data.json);
                    var retData = $scope.dataToVariable(result.data.json);
                    var filters = [];
                    if (retData.filterRule.length >= 1) {
                        $scope.initializeAdvFil(retData.filterRule);
                    } else {
                        $scope.initializeAdvFil();
                    }

                    console.log('INSIDE determineInitializationMethod IN directives.js: Broadcasting "load_filter_params-' + $scope.reportScope.report + '" with', retData);
                    $rootScope.$broadcast('load_filter_params-' + $scope.reportScope.report, retData);
                } else {
                    pinesNotifications.notify({
                        title: 'Filter data',
                        text: 'Failed to load filter data',
                        type: 'error'
                    });
                }
            });
        } else {
            console.log('INSIDE determineInitializationMethod IN directives.js: Loading using scope and qstr');
            var retData = $scope.setUrlParams();

            if (angular.isDefined(retData.filterRule) && retData.filterRule.length > 0) {
                $scope.initializeAdvFil(retData.filterRule);
            } else {
                $scope.initializeAdvFil();
            }

            console.log('INSIDE determineInitializationMethod IN directives.js: Broadcasting "load_filter_params-' + $scope.reportScope.report + '" with', retData);
            $rootScope.$broadcast('load_filter_params-' + $scope.reportScope.report, retData);
        }
        //}();

        // Only allow 0 - 9 and backspace on user int inputs
        $scope.validateInput = function(e) {
            var key = e.which || e.charCode;

            if (e.keyCode != 8 && (key < 48 || key > 57)) {
                e.preventDefault();
            }
        };

        // Send advanced filter definitions to schedule report builder
        $rootScope.$on('get_advanced_filter_definitions', function() {
            if ($scope.advFilterDefinitions.length === 1 && !$scope.advFilterDefinitions[0].selected_column) {
                $rootScope.$broadcast('receive_advanced_filter_definitions', false);
                $scope.showAdvFilter = false;
            } else {
                var validated = $scope.validateFilters();
                if (validated === true) {
                    $rootScope.$broadcast('receive_advanced_filter_definitions', $scope.sanitizeFilters());
                } else {
                    $rootScope.$broadcast('receive_advanced_filter_definitions', validated);
                }
            }
        });

        // Preview a report
        $scope.previewReport = function(dataVars) {
            // console.log('dataVars', dataVars);
            var urlParams = $scope.setUrlParams({});

            var reportPageMap = {
                acq_group: 'views/acq-call-flows4.html?report=acq_group',
                acq_campaign: 'views/acq-call-flows4.html?report=acq_campaign',
                acq_callflow: 'views/acq-call-flows4.html?report=acq_callflow',
                acq_keyword: 'views/acq-call-flows4.html?report=acq_keyword',
                acq_source: 'views/acq-call-flows4.html?report=acq_source',
                call_detail: 'views/calls-details.html?report=call_detail',
                call_back: 'views/calls-callback.html?report=call_back',
                activity_stream: 'views/activity-stream.html?report=activity_stream',
                group_activity: 'views/activity-group.html?report=group_activity',
                callflow_setting: 'views/settings-call-flow.html?report=callflow_setting'
            };

            // console.log('PREVIEW urlParams', urlParams);
            delete urlParams.drp_start;
            delete urlParams.drp_end;
            delete urlParams.filterRule;
            var template = reportPageMap[$scope.filterData.report_used] + '&' + $.param(urlParams);
            // console.log('template URL', template);


            createDialog(template, {
                id: 'preview-modal',
                title: 'Preview',
                backdrop: true,
                footerTemplate: '<br>',
                controller: 'advFilterController',
                cancel: {
                    label: 'close',
                    fn: function() {
                        var importantListeners = ['$destroy', '$locationChangeStart', '$locationChangeSuccess'];
                        for (var i in $rootScope.$$listeners) {
                            if (importantListeners.indexOf(i) === -1) {
                                $rootScope.$$listeners[i] = [$rootScope.$$listeners[i].shift()];
                            }
                        }
                        console.log('@@@@@@@@@@@@@@@@ ACTIVE LISTENERS @@@@@@@@@@@@@@@@', $rootScope.$$listeners);
                    }
                }
            });
        };

        // Destroy all event listeners on scope $destroy. Necessary for speed.
        $scope.$on("$destroy", function() {
            // Kill all event listeners on leave
            var importantListeners = ['$destroy', '$locationChangeStart', '$locationChangeSuccess'];
            for (var i in $rootScope.$$listeners) {
                if (importantListeners.indexOf(i) === -1) {
                    delete $rootScope.$$listeners[i];
                }
            }
        });
    });

    app.directive("advancedFilter", function() {
        return {
            restrict: "E",
            controller: "advFilterController",
            templateUrl: "views/directives/advanced-filter.html"
        };
    });
}());

// NOTE:
/* Documentation for callflowSettingsReportTable
 // scope variable parameters

 * // purpose - to keep track of which columns should be visible
 * scope.visibleColumns:
 *  - an array of objects with keys of
 *  {visible: boolean, label: string (what is displayed in header of table columns, col: string (string mapping to the names of the columns in the Postgres database without the table prefix))}
 *  - objects should be placed at the indices according to scope.dbFieldNames
 *
 *  // purpose - creating a mapping for what the names of the columns will be from the DB
 *  // this allows one location for keeping track of what column names are being accessed
 *  // I didnt know what names the columns will actually be ahead of time
 *  scope.dbFieldNames
 *  - object with keys being the in controller named columns,
 *  - values being what the column names in the postgres DB actually are
 *
 *  // purpose - gotta have data to display in the table
 *  scope.rowData
 *  - array of objects
 *    keys are the actual postgres column names (not the mapped names being used as keys in scope.dbFieldNames)
 *  - values are the actual values to determine what is displayed in the column rows
 *
 * // purpose to know the index numbers ahead of time of where each column's visiblity attribute
 * // is stored so doing ng-if doesnt have to loop through an array to find it
 * scope.columnDefIndices
 * - object containing keys of the actual database names for the columns
 * - values being the index numbers at which each visibleColumn object is at
 * */
