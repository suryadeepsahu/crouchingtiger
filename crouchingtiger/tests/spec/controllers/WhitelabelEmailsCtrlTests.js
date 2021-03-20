/**
 * Created by bschermerhorn on 11/10/15.
 */
describe('WhitelabelEmailsCtrl', function(){
    var $scope, $rootScope, ctrl, $rootScope, $location, WhiteLabelWebService;
    var $rootScope, $window, $httpBackend, $http, WhiteLabelWebService, pinesNotifications, $q;
    beforeEach( function(){
        module('whitelabel');
        module('theme.services');
        module("config");
        inject(function($injector){
            $rootScope   = $injector.get('$rootScope');
            $rootScope.url = "http://test123";
            $rootScope.port = "8000";


            $window        = $injector.get('$window');
            $q             = $injector.get('$q');
            $httpBackend   = $injector.get('$httpBackend');
            $http          = $injector.get('$http');
            pinesNotifications = {
                notify: function () {}
            };


            $location  = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope     = $injector.get('$rootScope').$new();
            $scope.selectedTabName ='newUser';
            $scope.userAccess = {"edigest":7,"campaign_total":"157","campaign_threshold":"99999999","campaign":"7","user_total":"203","user_threshold":"99999999","user":"7","settingsreports":7,"report":7,"callrec":7,"callflow":7,"dni":7,"callaction_total":"940","callaction_threshold":"9999999","callaction":"7","webhook":6,"api":6,"googleua":6,"doubleclick":6,"marin":6,"orgunit":7,"advrouting":7,"number_total":"764","number_threshold":"3000","number":"7","ca":7,"menu":7,"tag":7,"billing":7,"white":7}
          //  $scope.userAccess.white = 7;

            //CKEDITOR.instances = {'notifications':{'setData':function(){}} };
            //WhiteLabelWebService = $injector.get('WhiteLabelWebService');
            //var result = {
            //    data:{
            //        json:
            //        [
            //            {
            //                'html_template':'<HEAD>'
            //             }
            //
            //        ]
            //    }
            //};

            //spyOn($location, "path");
            //spyOn(WhiteLabelWebService, "getEmailTemplateInfo").and.callFake(function () {
            //    var deferred = $q.defer();
            //    deferred.resolve(result);
            //    return deferred.promise;
            //});


            $rootScope.currentOUId = 8;

            ctrl = $injector.get('$controller')('WhitelabelEmailsCtrl', {
                $scope:    $scope,
                $location: $location,
                $rootScope: $rootScope
            });
        })
    });

    var baseUrl, mockResponse, headerCallback, httpMock, returnedData,cteditorMock;
    beforeEach(function(){
        $window.sessionStorage.token = 'abc123';
        baseUrl                      = $rootScope.url +":"+ $rootScope.port;
       // mockResponse                 = {'mockResponse': true};
       // headerCallback               = function(headers){
       //     return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
      //  };

  //      httpMock = function(method, theUrl, jsonArg) {
  //          $httpBackend.when(method, theUrl, (jsonArg || {}), headerCallback).respond(mockResponse);
  //      };

    });


    describe("When newUserTab is selected ", function () {
        it("sets valid scope variables for newUser tab when valid data is returned from getEmailTemplateInfo", function () {
            $scope.selectedTabName ='newUser';
            CKEDITOR.instances = {'newUser':{'setData':function(){}} };
            var result = {
                data:{
                    json:
                        [
                            {
                                campaign_name: null,
                                campaign_source: null,
                                custom_metric: null,
                                email_code: "new_user",
                                email_active: true,
                                email_created: "2015-11-17T00:00:00.000Z",
                                email_desc: "For new users",
                                email_from: "boss@bigcompany.net",
                                email_id: 21,
                                email_name: "New User",
                                email_subject: null,
                                event_label: null,
								fetched: true,
                                ga_active: false,
                                ga_id: 20,
                                html_copy: "<p>[[First Name]],</p>↵↵<p>Welcome to Convirza!</p>↵↵<p>Some text here</p>↵",
                                html_template: "<h1>Testing</h1>",
                                master_id: 1,
                                org_unit_id: 8,
                                reply_to: "no-reply@bigcompany.net",
                                static_string: "v=1&t=event&ec=email&cm=email&ea=open&ni=1",
                                subject: "Welcome Big Company User",
                                tracking_id: null,
                                dynamic_field:
                                    [
                                        {
                                           0:"test" ,
                                            1:"test2"
                                        }

                                    ],
                                field_display:
                                    [
                                        {
                                            0:"test" ,
                                            1:"test2"
                                        }

                                    ]
                            }

                        ]
                }
            };
            $httpBackend.when("GET", baseUrl + "/v1/emailtemplate/8/1", {}, headerCallback).respond(
                result.data
            );
          //  expect($scope.white_label_active).toEqual(undefined);
            $scope.fillFormValues(1);
            $httpBackend.flush();
            expect($scope[$scope.selectedTabName]).toEqual(result.data.json[0]);
            expect($scope[$scope.selectedTabName].email_name).toEqual('New User');
            expect($scope[$scope.selectedTabName].subject).toEqual('Welcome Big Company User');
           // expect($scope.html_template).toEqual('<HEAD>');
        });


        it("sets Default scope variables for newUser tab when no master_id is returned from getEmailTemplateInfo", function () {
            $scope.selectedTabName ='newUser';
            CKEDITOR.instances = {'newUser':{'setData':function(){}} };
            var result1 = {
                data:{
                    json:
                        [
                            {
                                campaign_name: null,
                                campaign_source: null,
                                custom_metric: null,
                                email_code: "new_user",
                                email_active: true,
                                email_created: "2015-11-17T00:00:00.000Z",
                                email_desc: "For new users",
                                email_from: "boss@bigcompany.net",
                                email_name: "New User",
                                email_subject: null,
                                event_label: null,
                                ga_active: false,
                                ga_id: 20,
                                html_copy: "<p>[[First Name]],</p>↵↵<p>Welcome to Convirza!</p>↵↵<p>Some text here</p>↵",
                                html_template: "<h1>Testing</h1>",
                                org_unit_id: 8,
                                reply_to: "no-reply@bigcompany.net",
                                static_string: "v=1&t=event&ec=email&cm=email&ea=open&ni=1",
                                subject: "I am A NEW USER",
                                tracking_id: null,
                                dynamic_field:
                                    [
                                        {
                                            0:"test" ,
                                            1:"test2"
                                        }

                                    ],
                                field_display:
                                    [
                                        {
                                            0:"test" ,
                                            1:"test2"
                                        }

                                    ]
                            }

                        ]
                }
            };
            $httpBackend.when("GET", baseUrl + "/v1/emailtemplate/8/1", {}, headerCallback).respond(
                result1.data
            );
            //  expect($scope.white_label_active).toEqual(undefined);
            $scope.fillFormValues(1);
            $httpBackend.flush();

            expect($scope[$scope.selectedTabName].subject).toEqual('Welcome User');
            // expect($scope.html_template).toEqual('<HEAD>');
        });
        it("sets Default scope variables for newUser tab when no data is returned from getEmailTemplateInfo", function () {
            $scope.selectedTabName ='newUser';
            CKEDITOR.instances = {'newUser':{'setData':function(){}} };
            var result1 = {data:{}

                };

            $httpBackend.when("GET", baseUrl + "/v1/emailtemplate/8/1", {}, headerCallback).respond(
                result1.data
            );
            //  expect($scope.white_label_active).toEqual(undefined);
            $scope.fillFormValues(1);
            $httpBackend.flush();

            expect($scope[$scope.selectedTabName].subject).toEqual('Welcome User');
            // expect($scope.html_template).toEqual('<HEAD>');
        });
        it("sets Default scope variables for notifications tab when no master_id is returned from getEmailTemplateInfo", function () {
            $scope.selectedTabName ='notifications';
            CKEDITOR.instances = {'notifications':{'setData':function(){}} };
            var result1 = {
                data:{
                    json:
                        [
                            {
                                campaign_name: "campaign_name",
                                campaign_source: "campaign_name",
                                custom_metric: null,
                                email_code: "action alert",
                                email_active: true,
                                email_created: "2015-11-17T00:00:00.000Z",
                                email_desc: "For new users",
                                email_from: "boss@bigcompany.net",
                                email_name: "New User",
                                email_subject: null,
                                event_label: null,
                                ga_active: false,
                                ga_id: 20,
                                html_copy: "<p>[[First Name]],</p>↵↵<p>Welcome to Convirza!</p>↵↵<p>Some text here</p>↵",
                                html_template: "<h1>Testing</h1>",

                                org_unit_id: 8,
                                reply_to: "no-reply@bigcompany.net",
                                static_string: "v=1&t=event&ec=email&cm=email&ea=open&ni=1",
                                subject: "I am A NEW USER",
                                tracking_id: null,
                                dynamic_field:
                                    [
                                        {
                                            0:"test" ,
                                            1:"test2"
                                        }

                                    ],
                                field_display:
                                    [
                                        {
                                            0:"test" ,
                                            1:"test2"
                                        }

                                    ]
                            }

                        ]
                }
            };

            $httpBackend.when("GET", baseUrl + "/v1/emailtemplate/8/1", {}, headerCallback).respond(
                result1.data
            );
            //  expect($scope.white_label_active).toEqual(undefined);
            $scope.fillFormValues(1);
            $httpBackend.flush();

            expect($scope[$scope.selectedTabName].subject).toEqual('Convirza Notification');
            expect($scope[$scope.selectedTabName].event_label).toEqual('provisioned_route_name');
            // expect($scope.html_template).toEqual('<HEAD>');
        });
        it("sets saved variables for notifications tab when no valid data is returned from  notifications getEmailTemplateInfo", function () {
            $scope.selectedTabName ='notifications';
            CKEDITOR.instances = {'notifications':{'setData':function(){}} };
            var result1 = {
                data:{
                    json:
                        [
                            {
                                campaign_name: "campaign_name",
                                campaign_source: "campaign_name",
                                custom_metric: 5,
                                email_code: "action alert",
                                email_active: true,
                                email_created: "2015-11-17T00:00:00.000Z",
                                email_desc: "For new users",
                                email_from: "boss@bigcompany.net",
                                email_name: "New User",
                                email_subject: null,
                                event_label: "campaign_name",
                                ga_active: true,
                                ga_id: 20,
                                html_copy: "<p>[[First Name]],</p>↵↵<p>Notify of event</p>↵↵<p>Some text here</p>↵",
                                html_template: "<h1>Testing</h1>",
                                master_id :4,
                                org_unit_id: 8,
                                reply_to: "no-reply@bigcompany.net",
                                static_string: "v=1&t=event&ec=email&cm=email&ea=open&ni=1",
                                subject: "An event occured",
                                tracking_id: null,
                                dynamic_field:
                                    [
                                        {
                                            0:"test" ,
                                            1:"test2"
                                        }

                                    ],
                                field_display:
                                    [
                                        {
                                            0:"test" ,
                                            1:"test2"
                                        }

                                    ]
                            }

                        ]
                }
            };

            $httpBackend.when("GET", baseUrl + "/v1/emailtemplate/8/1", {}, headerCallback).respond(
                result1.data
            );
            //  expect($scope.white_label_active).toEqual(undefined);
            $scope.fillFormValues(1);
            $httpBackend.flush();

            expect($scope[$scope.selectedTabName].subject).toEqual('An event occured');
            expect($scope[$scope.selectedTabName].event_label).toEqual('campaign_name');
            // expect($scope.html_template).toEqual('<HEAD>');
        });




    });




});
