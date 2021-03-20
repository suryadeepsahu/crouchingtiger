/**
 * Created by bschermerhorn on 11/10/15.
 */
describe('WhitelabelColorsLogoController', function(){
    var $scope, $rootScope, ctrl, $rootScope, $location, WhiteLabelWebService;
    var $rootScope, $window, $httpBackend, $http, WhiteLabelWebService, pinesNotifications, $q;

    beforeEach( function(){
        module('whitelabel');
		module('org-unit');
        module('theme.services');
        module("config");
        inject(function($injector){
            $rootScope   = $injector.get('$rootScope');
            $rootScope.url = "http://test123";
            $rootScope.port = "8000";
          //  $scope   = $injector.get('$scope');
          //  $scope.userAccess = {"edigest":7,"campaign_total":"102","campaign_threshold":"99999999","campaign":"7","user_total":"157","user_threshold":"99999999","user":"7","report":7,"callrec":7,"callflow":7,"dni":7,"callaction_total":"-5","callaction_threshold":"9999999","callaction":"7","webhook":6,"api":6,"googleua":6,"doubleclick":6,"marin":6,"orgunit":7,"advrouting":7,"number_total":"331","number_threshold":"3000","number":"7","ca":7,"menu":7,"tag":7,"billing":7,"white":7};


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
            $scope.userAccess = {"edigest":7,"campaign_total":"102","campaign_threshold":"99999999","campaign":"7","user_total":"157","user_threshold":"99999999","user":"7","report":7,"callrec":7,"callflow":7,"dni":7,"callaction_total":"-5","callaction_threshold":"9999999","callaction":"7","webhook":6,"api":6,"googleua":6,"doubleclick":6,"marin":6,"orgunit":7,"advrouting":7,"number_total":"331","number_threshold":"3000","number":"7","ca":7,"menu":7,"tag":7,"billing":7,"white":7};

            WhiteLabelWebService = $injector.get('WhiteLabelWebService');


            spyOn($location, "path");
            spyOn(WhiteLabelWebService, "saveAllButEmailWhitelabelSettings").and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve("woot");
                return deferred.promise;
            });


            $rootScope.currentOUId = 1;

            ctrl = $injector.get('$controller')('WhitelabelColorsLogoController', {
                $scope:    $scope,
                $location: $location,
                $rootScope: $rootScope
            });
        })
    });

    var baseUrl, mockResponse, headerCallback, httpMock, returnedData;
    beforeEach(function(){
        $window.sessionStorage.token = 'abc123';
        baseUrl                      = $rootScope.url +":"+ $rootScope.port;
        mockResponse                 = {'mockResponse': true};
        headerCallback               = function(headers){
            return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
        };

        httpMock = function(method, theUrl, jsonArg) {
            $httpBackend.when(method, theUrl, (jsonArg || {}), headerCallback).respond(mockResponse);
        };
    });


    describe("$scope methods", function () {
        //it("Hops out of the controller if user isn't credentialed to be on this page", function () {
        //    $scope.isAllPowerful = false;
        //
        //    //check if user value is set to true
        //    //if not, lets call $location.path("/")
        //    expect($location.path).toHaveBeenCalledWith("/");
        //});

        //
        it("Active status is set on $scope if data comes in correct format from GET to backend", function () {

            $httpBackend.when("GET", baseUrl + "/v1/whitelabel/" + 1, {}, headerCallback).respond({
                json: [
                    {
                        white_label_active: true
                    }
                ]
            });
            expect($scope.white_label_active).toEqual(undefined);
            $scope.fillFormValues();
            $httpBackend.flush();
            expect($scope.white_label_active).toEqual(true);
        });


        it("Default Color theme stuff gets set on $scope.white_label_css if the object is empty", function () {
            $httpBackend.when("GET", baseUrl + "/v1/whitelabel/" + 1, {}, headerCallback).respond({
                json: [
                    {
                        white_label_css: {}
                    }
                ]
            });
            expect($scope.white_label_css).toEqual(undefined);
            $scope.fillFormValues();
            $httpBackend.flush();

            expect($scope.white_label_css).toEqual({
                fonts: [
                    { formName: "Font", value: "Helvetica" }
                ],
                colors: [
                    { formName: "Header Background",     value: "#575757"},
                    { formName: "Header Text",           value: "#aaaaaa"},
                    { formName: "Navigation Background", value: "#575757"},
                    { formName: "Navigation Text",       value: "#f4f3ea"},
                    { formName: "Navigation Highlight",  value: "#e36c25"},
                    { formName: "Navigation Text Hover", value: "#e0e0e0"},
                    { formName: "Sub Nav Background",    value: "#494949"},
                    { formName: "Accent 1 Background",   value: "#1f407d"},
                    { formName: "Accent 1 Text",         value: "#ffffff"}
                ]
            });
        });


        xit("Defaults get set on $scope if the json array is empty", function () {
            $httpBackend.when("GET", baseUrl + "/v1/whitelabel/" + 1, {}, headerCallback).respond({
                json: []
            });
            expect($scope.white_label_css).toEqual(undefined);
            $scope.fillFormValues();
            $httpBackend.flush();

            expect($scope.white_label_css).toEqual({
                fonts: [
                    { formName: "Font", value: "Helvetica" }
                ],
                colors_one: [
                    { formName: "Header Background",     value: "#4b8661"},
                    { formName: "Header Text",           value: "#e22f4a"},
                    { formName: "Accent 1 Background",   value: "#1d4b2b"},
                    { formName: "Accent 1 Text",         value: "#ffffff"}
                ],
                colors_two: [
                    { formName: "Navigation Background", value: "#7eb989"},
                    { formName: "Navigation Text",       value: "#256a22"},
                    { formName: "Navigation Highlight",  value: "#ffffff"},
                    { formName: "Navigation Text Hover", value: "#00ffc9"},
                    { formName: "Sub Nav Background",    value: "#652a2a"}
                ]
            });
            // check some of what should be there
            expect($scope.chat_active).toEqual(false);
            expect($scope.domain_name).toEqual(null);
        });


        it("scope variables get set from full set of data", function () {
            $httpBackend.when("GET", baseUrl + "/v1/whitelabel/" + 1, {}, headerCallback).respond({
                json: [{
                    chat_active:        true,
                    chat_url:           "http://googlechat.com",
                    domain_name:        "cfa.mudlickin.com",
                    org_logo:           "https://aws3.somephoto.com/img1.jpg",
                    support_url:        "http://somesupportsite.com",
                    white_label_active: true,
                    white_label_css:    {
                        fonts: [
                            { formName: "Font", value: "Times New Roman" }
                        ],
                        colors_one: [
                            { formName: "Header Background",     value: "#4b8661"},
                            { formName: "Header Text",           value: "#e22f4a"},
                            { formName: "Accent 1 Background",   value: "#1d4b2b"},
                            { formName: "Accent 1 Text",         value: "#ffffff"}
                        ],
                        colors_two: [
                            { formName: "Navigation Background", value: "#7eb989"},
                            { formName: "Navigation Text",       value: "#256a22"},
                            { formName: "Navigation Highlight",  value: "#ffffff"},
                            { formName: "Navigation Text Hover", value: "#00ffc9"},
                            { formName: "Sub Nav Background",    value: "#652a2a"}
                        ]
                    }
                }]
            });
            expect($scope.white_label_css).toEqual(undefined);
            $scope.fillFormValues();
            $httpBackend.flush();

            expect($scope.white_label_css).toEqual({
                fonts: [
                    { formName: "Font", value: "Times New Roman" }
                ],
                colors_one: [
                    { formName: "Header Background",     value: "#4b8661"},
                    { formName: "Header Text",           value: "#e22f4a"},
                    { formName: "Accent 1 Background",   value: "#1d4b2b"},
                    { formName: "Accent 1 Text",         value: "#ffffff"}
                ],
                colors_two: [
                    { formName: "Navigation Background", value: "#7eb989"},
                    { formName: "Navigation Text",       value: "#256a22"},
                    { formName: "Navigation Highlight",  value: "#ffffff"},
                    { formName: "Navigation Text Hover", value: "#00ffc9"},
                    { formName: "Sub Nav Background",    value: "#652a2a"}
                ]
            });
            // check some of what should be there
            expect($scope.chat_active).toEqual(true);
            expect($scope.domain_name).toEqual("cfa.mudlickin.com");
            expect($scope.org_logo).toEqual("https://aws3.somephoto.com/img1.jpg");
            expect($scope.support_url).toEqual("http://somesupportsite.com");
            expect($scope.white_label_active).toEqual(true);
        });


        it("Saving white label color themes doesn't trigger if any of the forms are invalid", function () {
            $scope.themeSettingsForm = {
                $valid: false
            };
            $scope.saveColorsLogoTheme();
            expect(WhiteLabelWebService.saveAllButEmailWhitelabelSettings).not.toHaveBeenCalled();
        });


        it("Saving white label color themes triggers a save if the form values are valid", function () {
            $scope.themeSettingsForm = {
                $valid: true
            };
            $scope.saveColorsLogoTheme();
            expect(WhiteLabelWebService.saveAllButEmailWhitelabelSettings).toHaveBeenCalled();
        });

        it("saving domain and support doesn't trigger if subdomain or support portal aren't valid", function () {
            $scope.domainSupportForm = {
                $valid: false
            };

            $scope.saveDomainAndSupport();
            expect(WhiteLabelWebService.saveAllButEmailWhitelabelSettings).not.toHaveBeenCalled();

        });


        it("saving domain and support does trigger if subdomain or support portal valid", function () {
            $scope.domainSupportForm = {
                $valid: true
            };
            $scope.domain_name = 'Test';
            $scope.saveDomainAndSupport();
            expect(WhiteLabelWebService.saveAllButEmailWhitelabelSettings).toHaveBeenCalled();
            expect( $scope.domain_name).toEqual('test');
        });



    });




});
