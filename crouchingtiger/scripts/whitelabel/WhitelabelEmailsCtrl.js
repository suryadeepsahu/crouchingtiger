//WhitelabelEmailsCtrl
(function() {
    var app = angular.module("whitelabel");


    app.controller("WhitelabelEmailsCtrl", function($scope, $rootScope, WhiteLabelWebService, pinesNotifications) {
        //$scope.newemailfrom = "no-reply@messages.services";
        //$scope.newemailreplyto = "no-reply";
        //$scope.newemailsubject = "Welcome User";
        $scope.manualScoreCardEmail = false;
        // check that user is authorized for page
        if ($rootScope.highestOUId !== $rootScope.billingId || $scope.userAccess.white < 6) {
            location.href = '#/access-denied';
            return;
        }

        if ($scope.userAccess && ($scope.userAccess.manualscorecard !== undefined && $scope.userAccess.manualscorecard >= 4)) {
                $scope.manualScoreCardEmail = true;
            }
        /*
            Matthew 7:1-3
            
            I hate myself for this but it's the only thing that works thus far to fix this issue
            after about 9 collective hours debugging

            CKEDITOR seems to suck at cleaning up its own instances. Tried every SO solution
            with various combinations at the .directive('wysiwygCkeditor') level
            using .removeEventListeners(), .remove() .destroy(true) + others and there
            is always an error indicating that it wont work because it already has
            an instance existing, as well as it doesnt have an instance existing in a different
            location its using it
        */

        if (Object.keys(CKEDITOR.instances).length) {
            CKEDITOR = undefined;

            // wrapped a global function around the CKEDITOR library code.
            // this will set it all back up phresh

            if (window.loadUpCkEditor) { window.loadUpCkEditor(); }
            if (window.strInsPluginReload) { window.strInsPluginReload(); }
            if (window.loadCkEditorLang) { window.loadCkEditorLang(); }
        }

        // invoked at bottom
        $scope.initialize = function() {
            $scope.selectedTabName = 'newUser';
            $scope.fillFormValues(1);
        };

        $scope.onTabSelect = function(tabName, template_id) {
            $scope.selectedTabName = tabName;
            $scope.fillFormValues(template_id);
            // console.log("Changed tab to " + tabName);
        };

        $scope.fillFormValues = function(template_id) {

            //api call to get values
            WhiteLabelWebService.getEmailTemplateInfo($rootScope.currentOUId, template_id).then(function(result) {

                // if there's valid data, use it
                if (result && result.data && result.data.json && result.data.json[0] && result.data.json[0].master_id > 0) {
                    //console.log(result.data.json[0]);
                    $scope[$scope.selectedTabName] = result.data.json[0];
                    $scope[$scope.selectedTabName].fetched = true;
                    //  CKEDITOR.config.strinsert_strings =  [];

                    CKEDITOR.config.strinsert_strings.splice(0, CKEDITOR.config.strinsert_strings.length);
                    for (var i = 0; i < result.data.json[0].dynamic_field.length; i++) {
                        CKEDITOR.config.strinsert_strings.push(['[[' + result.data.json[0].dynamic_field[i] + ']]', result.data.json[0].field_display[i], result.data.json[0].field_display[i]]);
                    }

                    if (result.data.json[0].html_copy) {
                        CKEDITOR.instances[$scope.selectedTabName].setData(result.data.json[0].html_copy, null);
                    } else {
                        CKEDITOR.instances[$scope.selectedTabName].setData(result.data.json[0].html_template, null);
                    }
                    if (!$scope[$scope.selectedTabName].email_from) { $scope.getDefaultEmailFrom(); }
                    if (!$scope[$scope.selectedTabName].reply_to) { $scope.getDefaultReplyTo(); }
                    if (!$scope[$scope.selectedTabName].subject) { $scope.getDefaultSubject(); }

                    if ($scope.selectedTabName === 'notifications') {
                        // if ($scope[$scope.selectedTabName].ga_id) { $scope.notifications.showGA = true; }
                        if (!$scope.notifications.event_label) { $scope.notifications.event_label = 'provisioned_route_name'; }
                        if (!$scope.notifications.campaign_name) { $scope.notifications.campaign_name = 'campaign_name'; }
                        if (!$scope.notifications.campaign_source) { $scope.notifications.campaign_source = 'channel'; }
                    }
                } else {
                    if (result.data.json && result.data.json[0])
                        CKEDITOR.instances[$scope.selectedTabName].setData(result.data.json[0].html_template, null);
                    $scope.getDefaultEmailTemplateData();
                }
            });
        };
        $scope.getDefaultEmailTemplateData = function() {
            if (!$scope[$scope.selectedTabName])
                $scope[$scope.selectedTabName] = {};
            $scope.getDefaultEmailFrom();
            $scope.getDefaultReplyTo();
            $scope.getDefaultSubject();
            if ($scope.selectedTabName === 'notifications') {

                $scope[$scope.selectedTabName].event_label = 'provisioned_route_name'; // default value
                $scope[$scope.selectedTabName].campaign_name = 'campaign_name';
                $scope[$scope.selectedTabName].campaign_source = 'channel';
            }

            // if ($scope.selectedTabName === 'ScoreCompleted') {

            //     $scope[$scope.selectedTabName].org_unit_name = 'org_unit_name'; // default value
            //     $scope[$scope.selectedTabName].call_title = 'call_title';
            //     $scope[$scope.selectedTabName].scored_on = new Date();
            //     $scope[$scope.selectedTabName].scored_by = new Date();
            //     $scope[$scope.selectedTabName].score_value = null;
            //     $scope[$scope.selectedTabName].score_card_outcomelabel = 'score_card_outcomelabel';
            //     $scope[$scope.selectedTabName].least_score_criteria = null;
            //     $scope[$scope.selectedTabName].source = null;
            // }

            // if ($scope.selectedTabName === 'ScoreReviwed') {
            //     $scope[$scope.selectedTabName].org_unit_name = 'org_unit_name'; // default value
            //     $scope[$scope.selectedTabName].call_title = 'call_title';
            //     $scope[$scope.selectedTabName].scored_on = new Date();
            //     $scope[$scope.selectedTabName].scored_by = new Date();
            //     $scope[$scope.selectedTabName].score_value = null;
            //     $scope[$scope.selectedTabName].score_card_outcomelabel = 'score_card_outcomelabel';
            //     $scope[$scope.selectedTabName].least_score_criteria = null;
            // }
        };
        $scope.getDefaultEmailFrom = function() {
            $scope[$scope.selectedTabName].email_from = "no-reply@messages.services";
        };
        $scope.getDefaultReplyTo = function() {
            $scope[$scope.selectedTabName].reply_to = "no-reply@messages.services";
        };
        $scope.getDefaultSubject = function() {
            $scope[$scope.selectedTabName].subject = "Welcome User";
            if ($scope.selectedTabName === 'updatePass') $scope[$scope.selectedTabName].subject = "Password Updated";
            if ($scope.selectedTabName === 'notifications') {
                $scope[$scope.selectedTabName].subject = "Convirza Notification";
            }
            if ($scope.selectedTabName === 'recordings') $scope[$scope.selectedTabName].subject = "Call Recording";

            if ($scope.selectedTabName === 'ScoreCompleted') $scope[$scope.selectedTabName].subject = "Score Completed Notification";

            if ($scope.selectedTabName === 'ScoreReviwed') $scope[$scope.selectedTabName].subject = "Score Reviewed Notification";
        };
        $scope.notifications = {};
        $scope.eventLabeloptions = [
            { name: 'Group Name', value: 'org_unit_name' },
            { name: 'Campaign Name', value: 'campaign_name' },
            { name: 'Call Flow Name', value: 'provisioned_route_name' },
            { name: 'Event Criteria', value: 'event_criteria' },
            { name: 'Ad Source', value: 'channel' },
        ];


        //save email template_id
        $scope.saveEmailTemplate = function(master_id) {
            var EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|ca|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|services|aaaaaaa[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            var errorMessages = [];

            if (!EMAIL_REGEXP.test($scope[$scope.selectedTabName].reply_to)) {
                errorMessages.push("Reply To email address");
            }
            if ($scope[$scope.selectedTabName].ga_active) {
                var GAID_REGEXP = /^ua-\d{4,9}-\d{1,4}$/i;
                if (!GAID_REGEXP.test($scope[$scope.selectedTabName].tracking_id)) {
                    errorMessages.push("Tracking ID");
                }
            }
            /*if (!EMAIL_REGEXP.test($scope[$scope.selectedTabName].email_from)) {
    			 errorMessages.push("From email address");
			}*/

            if (errorMessages.length) {
                pinesNotifications.notify({
                    title: "Email Validation Error",
                    //text:   "The " + errorMessages.join(",\n") + "\nfield" + (errorMessages.length > 1 ? "s are" : " is") + " invalid.",
                    text: "Please enter a valid " + errorMessages.join(", and  "),
                    type: "error"
                });
                return;
            }

            $scope[$scope.selectedTabName].html_copy = CKEDITOR.instances[$scope.selectedTabName].getData();
            // assign values for the e-mail template values
            var data = {
                "email_template": {
                    "master_id": master_id,
                    "org_unit_id": $rootScope.currentOUId,
                    "subject": $scope[$scope.selectedTabName].subject,
                    "reply_to": $scope[$scope.selectedTabName].reply_to,
                    "email_from": ($scope[$scope.selectedTabName].email_from !== '' ? $scope[$scope.selectedTabName].email_from : null),
                    "html_copy": $scope[$scope.selectedTabName].html_copy,
                    "ga_active": ($scope.notifications.ga_active !== null && $scope.notifications.ga_active !== undefined) ? $scope.notifications.ga_active : false
                }
            };
            // on 'notifications' e-mail - also add GA data
            if ($scope.selectedTabName === 'notifications') {
                data.email_template.ga_id = $scope.notifications.ga_id;
                data.org_google_analytic = {
                    "org_unit_id": $rootScope.currentOUId,
                    "tracking_id": $scope.notifications.tracking_id,
                    "event_label": $scope.notifications.event_label,
                    "campaign_source": $scope.notifications.campaign_source,
                    "campaign_name": $scope.notifications.campaign_name,
                    "custom_metric": $scope.notifications.custom_metric,
                    "ga_active": ($scope.notifications.ga_active !== null && $scope.notifications.ga_active !== undefined) ? $scope.notifications.ga_active : false,
                    "static_string": "v=1&t=event&ec=email&cm=email&ea=open&ni=1"
                };
                // add primary key if from existing record
                if ($scope.notifications.ga_id) {
                    data.org_google_analytic.ga_id = $scope.notifications.ga_id;
                }
            }

            // on 'scorecompleted' e-mail - also add GA data
            // if ($scope.selectedTabName === 'ScoreCompleted') {
            //     data.email_template.ga_id = $scope.ScoreCompleted.ga_id;
            //     data.score_complete_data = {
            //         "org_unit_name": $rootScope.org_unit_name,
            //         "call_title": $scope.ScoreCompleted.call_title,
            //         "created_on": $scope.ScoreCompleted.created_on,
            //         "created_by": $scope.ScoreCompleted.created_by,
            //         "score_value": $scope.ScoreCompleted.score_value,
            //         "score_card_outcomelabel": $scope.ScoreCompleted.score_card_outcomelabel,
            //         "least_score_criteria": $scope.ScoreCompleted.least_score_criteria,
            //         "source": $scope.ScoreCompleted.source
            //     };
            //     // add primary key if from existing record
            //     if ($scope.ScoreCompleted.ga_id) {
            //         data.score_complete_data.ga_id = $scope.ScoreCompleted.ga_id;
            //     }
            // }



            // on 'ScoreReviwed' e-mail - also add GA data
            // if ($scope.selectedTabName === 'ScoreReviwed') {
            //     data.email_template.ga_id = $scope.ScoreReviwed.ga_id;
            //     data.score_reviewed_data = {
            //         "org_unit_name": $rootScope.org_unit_name,
            //         "call_title": $scope.ScoreReviwed.call_title,
            //         "created_on": $scope.ScoreReviwed.created_on,
            //         "created_by": $scope.ScoreReviwed.created_by,
            //         "score_value": $scope.ScoreReviwed.score_value,
            //         "score_card_outcomelabel": $scope.ScoreReviwed.score_card_outcomelabel,
            //         "source": $scope.ScoreReviwed.source
            //     };
            //     // add primary key if from existing record
            //     if ($scope.ScoreReviwed.ga_id) {
            //         data.score_complete_data.ga_id = $scope.ScoreReviwed.ga_id;
            //     }
            // }
            var request_type = 'POST';
            if ($scope[$scope.selectedTabName].email_id > 0) {
                data.email_template.email_id = $scope[$scope.selectedTabName].email_id;
                request_type = 'PUT';
            }

            //console.log(data);
            WhiteLabelWebService.saveEmailWhitelabelSettings(data, request_type).then(function(result) {
                //console.log(result);
                if (result.data.result === 'success') {
                    pinesNotifications.notify({
                        title: "Email Template",
                        text: "Email Template saved successfully.",
                        type: "success"
                    });
                    //update form with newly saved db values so we can update now instead of save a new record
                    $scope[$scope.selectedTabName] = undefined;
                    $scope.fillFormValues(master_id);
                } else {
                    pinesNotifications.notify({
                        title: "Email Template Error",
                        text: "Error: Email Template not saved successfully.",
                        type: "error"
                    });
                }
            });
        };
        //save email template_id
        $scope.resetDefaultEmailTemplate = function(tabName, template_id) {

            if ($scope[$scope.selectedTabName]) {
                WhiteLabelWebService.getEmailTemplateInfo($rootScope.currentOUId, template_id).then(function(result) {
                    //console.log(result);
                    // if there's valid data, use it

                    CKEDITOR.instances[$scope.selectedTabName].setData(result.data.json[0].html_template, null);
                    $scope[$scope.selectedTabName].email_id = result.data.json[0].email_id;
                    $scope.getDefaultEmailTemplateData();
                    //         _.extend($scope, $scope.getDefaultEmailTemplateNewUserInfoData());
                    if ($scope.selectedTabName == 'notifications') {
                        $scope[$scope.selectedTabName].ga_active = false;
                        $scope[$scope.selectedTabName].tracking_id = null;
                        $scope[$scope.selectedTabName].custom_metric = null;
                        $scope[$scope.selectedTabName].event_label = 'provisioned_route_name';
                        $scope[$scope.selectedTabName].campaign_name = 'campaign_name';
                        $scope[$scope.selectedTabName].campaign_source = 'channel';
                    }
                });
            }

        };

        //for some unknown reason we have to initialize this before we wan use it ;
        CKEDITOR.config.strinsert_strings = [];
        CKEDITOR.config.strinsert_strings.push(['[[First Name]]', 'First Name', 'First Name']);

        $scope.initialize();
    });

}());