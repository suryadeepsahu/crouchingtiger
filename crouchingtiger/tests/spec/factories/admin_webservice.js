/**
 * Created by bschermerhorn on 10/16/15.
 */



describe("SupportAdminWebService Web Service", function () {
    var $rootScope, $window, $httpBackend, $http, SupportAdminWebService;

    beforeEach( module("admin-session") );

    beforeEach(inject(function($injector){
        $rootScope      = $injector.get('$rootScope');
        $rootScope.url  = "http://test123";
        $rootScope.port = "8000";

        $window      = $injector.get('$window');
        $httpBackend = $injector.get('$httpBackend');
        $http        = $injector.get('$http');
        SupportAdminWebService = $injector.get('SupportAdminWebService');
    }));

    var baseUrl, mockData, headerCallback, httpMock, returnedData;
    beforeEach(function(){
        $window.sessionStorage.token = 'abc123';
        baseUrl                      = $rootScope.url +":"+ $rootScope.port;
        mockData                     = {'mock data': true};
        headerCallback               = function(headers){
            return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
        };

        httpMock = function(method, theUrl) {
            $httpBackend.when(method, theUrl, {}, headerCallback).respond(mockData);
        };
    });


    describe("SupportAdminWebService", function () {
        it("methods are functions", function () {
            ["getBillingNodes", "switchToSystemOUadmin"].forEach(function (methodName) {
                expect(typeof SupportAdminWebService[methodName]).toEqual("function");
            });
        });


        it(".getBillingNodes() GET request to /v1/support/billingnodes/", function () {
            httpMock('GET', baseUrl + "/v1/support/billingnodes/");
            SupportAdminWebService.getBillingNodes().then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });

    });

});
