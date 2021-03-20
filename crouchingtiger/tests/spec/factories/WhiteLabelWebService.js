/**
 * Created by bschermerhorn on 11/16/15.
 */
/**
 * Created by bschermerhorn on 10/7/15.
 */

describe("WhiteLabelWebService", function () {
    var $rootScope, $window, $httpBackend, $http, WhiteLabelWebService;

    beforeEach(module("whitelabel"));

    beforeEach(inject(function($injector){
        $rootScope   = $injector.get('$rootScope');
        $rootScope.url = "http://test123";
        $rootScope.port = "8000";

        WhiteLabelWebService = $injector.get('WhiteLabelWebService');
        $window        = $injector.get('$window');
        $httpBackend   = $injector.get('$httpBackend');
        $http          = $injector.get('$http');
    }));

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


    describe("WhiteLabelWebService Web Service functions", function () {
        it("methods are present", function () {
            ["getAllButEmailWhiteLabelInfo"].forEach(function (methodName) {
                expect(typeof WhiteLabelWebService[methodName]).toEqual("function");
            });
        });
       it("methods are present", function () {
            ["getEmailTemplateInfo"].forEach(function (methodName) {
                expect(typeof WhiteLabelWebService[methodName]).toEqual("function");
            });
        });        

        it("getAllButEmailWhiteLabelInfo builds correct route to GET with passed in org unit id", function () {
            httpMock('GET', baseUrl + "/v1/whitelabel/" + 1);
            WhiteLabelWebService.getAllButEmailWhiteLabelInfo(1).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockResponse);
        });


        it("getAllButEmailWhiteLabelInfo builds correct route to GET with passed in org unit id", function () {
            httpMock('GET', baseUrl + "/v1/whitelabel/" + 1);
            WhiteLabelWebService.getAllButEmailWhiteLabelInfo(1).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockResponse);
        });

        it("getAllButEmailWhiteLabelInfo throws error if number type isn't passed", function () {
            expect(WhiteLabelWebService.getAllButEmailWhiteLabelInfo).toThrow();
        });
        // new EmailTemplateInfo section
        it("methods are present", function () {
            ["getEmailTemplateInfo"].forEach(function (methodName) {
                expect(typeof WhiteLabelWebService[methodName]).toEqual("function");
            });
        });        
        it("getEmailTemplateInfo builds correct route to GET with passed in org unit id", function () {
            httpMock('GET', baseUrl + "/v1/emailtemplate/" + 1 + "/"+1);
            WhiteLabelWebService.getEmailTemplateInfo(1,1).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockResponse);
        });
        it("getEmailTemplateInfo throws error if no parameters passed", function () {
            expect(WhiteLabelWebService.getEmailTemplateInfo).toThrow();
        });
        it("getEmailTemplateInfo throws error if emailId isn't passed", function () {
            expect( function(){ WhiteLabelWebService.getEmailTemplateInfo(1); } ).toThrow("non number for emailId passed into WhiteLabelWebService.getEmailTemplateInfo");
           // expect(function()WhiteLabelWebService.getEmailTemplateInfo).toThrow();
        });
        it("getEmailTemplateInfo throws error if emailId integer type isn't passed", function () {
            expect( function(){ WhiteLabelWebService.getEmailTemplateInfo(1,'eight'); } ).toThrow("non number for emailId passed into WhiteLabelWebService.getEmailTemplateInfo");
           // expect(function()WhiteLabelWebService.getEmailTemplateInfo).toThrow();
        });
        it("getEmailTemplateInfo throws error if orgUnitId isn't passed", function () {
            expect( function(){ WhiteLabelWebService.getEmailTemplateInfo(null,1); } ).toThrow("non number for orgUnitId passed into WhiteLabelWebService.getEmailTemplateInfo");
           // expect(function()WhiteLabelWebService.getEmailTemplateInfo).toThrow();
        });
        it("getEmailTemplateInfo throws error if orgUnitId integer type isn't passed", function () {
            expect( function(){ WhiteLabelWebService.getEmailTemplateInfo('eight',1); } ).toThrow("non number for orgUnitId passed into WhiteLabelWebService.getEmailTemplateInfo");
           // expect(function()WhiteLabelWebService.getEmailTemplateInfo).toThrow();
        });
        describe("getAllButEmailWhiteLabelInfo", function () {
            it("getAllButEmailWhiteLabelInfo builds correct route to GET with passed in org unit id", function () {
                httpMock('GET', baseUrl + "/v1/whitelabel/" + 1);
                WhiteLabelWebService.getAllButEmailWhiteLabelInfo(1).then(function (data) { returnedData = data; });
                $httpBackend.flush();
                expect(returnedData.data).toEqual(mockResponse);
            });


            it("getAllButEmailWhiteLabelInfo builds correct route to GET with passed in org unit id", function () {
                httpMock('GET', baseUrl + "/v1/whitelabel/" + 1);
                WhiteLabelWebService.getAllButEmailWhiteLabelInfo(1).then(function (data) { returnedData = data; });
                $httpBackend.flush();
                expect(returnedData.data).toEqual(mockResponse);
            });

            it("getAllButEmailWhiteLabelInfo throws error if number type isn't passed", function () {
                expect(WhiteLabelWebService.getAllButEmailWhiteLabelInfo).toThrow();
            });
        });







    });









});



































































































































































































































































































































































































































