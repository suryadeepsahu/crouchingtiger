

/*

* SubscriptionWebService.getInvoicePdfFile
*
* */

describe("Subscription Web Service", function () {
    var SubscriptionWebService, $httpBackend, $rootScope, $window, $http, baseUrl, mockData,
        headerCallback, httpMock, returnedData;



    beforeEach( module('subscriptions') );


    beforeEach(inject(function($injector){
        $rootScope           = $injector.get('$rootScope');
        $window              = $injector.get('$window');

        $window.sessionStorage.token = 'abc123';
        $rootScope.url  = 'http://test123';
        $rootScope.port = '8000';

        $httpBackend = $injector.get('$httpBackend');
        $http = $injector.get('$http');
        SubscriptionWebService = $injector.get('SubscriptionWebService');


        baseUrl = $rootScope.url +":"+ $rootScope.port;
        mockData = {'mock data': true};
        headerCallback = function(headers){
            return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
        };

        httpMock = function(method, theUrl, jsonBody) {
            $httpBackend.when(method, theUrl, (jsonBody || {}), headerCallback).respond(mockData);
        };
    }));

    describe("Subscription Web Service methods", function () {

        it('its methods exist', function() {
            ["getUsages", "getSummary", "getBilling", "upBilling", "getSubscriptionInformation", "getBillingHistory",
            "getInvoicePdfFile"].forEach(function(methodName){
                    expect(typeof SubscriptionWebService[methodName]).toEqual("function");
                });
        });

        it('getUsages passing ouId', function() {
            httpMock('GET', baseUrl + '/v1/billing/usage/' + 1);

            SubscriptionWebService.getUsages({ouId: 1}).then(function(data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it('getSummary passing ouid', function() {
            httpMock('GET', baseUrl + '/v1/billing/summary/' + 1);

            SubscriptionWebService.getSummary(1).then(function(data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it('getBilling', function() {
            httpMock('GET', baseUrl + '/v1/billing/' + 1);

            SubscriptionWebService.getBilling(1).then(function(data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });

        it('upBilling', function() {
            httpMock('PUT', baseUrl + "/v1/billing", {a:1});

            SubscriptionWebService.upBilling({a:1}).then(function(data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it('getSubscriptionInformation', function() {
            httpMock('GET', baseUrl + "/v1/zuora/getSubscriptionInformationAction/" + 1);

            SubscriptionWebService.getSubscriptionInformation(1).then(function(data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it('getBillingHistory', function() {
            httpMock('GET', baseUrl + "/v1/zuora/getBillingHistoryAction/" + 1);

            SubscriptionWebService.getBillingHistory(1).then(function(data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });

    });

});


















