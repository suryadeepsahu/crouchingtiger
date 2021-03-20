/**
 * Created by brians on 10/15/15.
 */
describe("Calls Details Web Service", function () {
    var $rootScope, $window, $httpBackend, $http, CallsDetailsWebService;

    beforeEach(module("theme.callsdetails"));

    beforeEach(inject(function($injector){
        $rootScope   = $injector.get('$rootScope');
        $rootScope.url = "http://test123";
        $rootScope.port = "8000";

        //ApiParam     = $injector.get('ApiParam');
        $window      = $injector.get('$window');
        $httpBackend = $injector.get('$httpBackend');
        $http        = $injector.get('$http');
        CallsDetailsWebService    = $injector.get('CallsDetailsWebService');
    }));

    var baseUrl, mockData, headerCallback, getConfig, httpMock, returnedData;
    beforeEach(function(){
        $window.sessionStorage.token = 'abc123';
        baseUrl                      = $rootScope.url +":"+ $rootScope.port;
        mockData                     = {'mock data': true};
        headerCallback               = function(headers){
            return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
        };


        httpMock = function(method, theUrl, json) {
            $httpBackend.when(method, theUrl, (json || {}), headerCallback).respond(mockData);
        };
    });


    describe("stuff", function () {
        it("methods are functions", function () {
            ["getCallsSummaryList", "getCallsDetailsList", "getCallsDetailsInfo", "getCallsComments", "setCallsComments", "deleteCallsComments",
            "getCallsTags", "getTags", "setCallsTags", "getCallBlacklist", "setCallBlacklist", "unsetCallBlacklist", "emailRecording"].forEach(function (methodName) {
                expect(typeof CallsDetailsWebService[methodName]).toEqual("function");
            });
        });


        xit(".getCallsSummaryList() makes GET with filter", function () {
            $window.sessionStorage.role_id = 7;
            $rootScope.timezone = "America/Denver";
            var params = [
                "&limit="      + 100,
                "&offset="     + 0,
                "&start_date=" + "2017-01-04",
                "&end_date="   + "2017-01-09",
                "&filtertype=" + "s",
                "&filter="     + "",
                "&timezone="   + encodeURIComponent("America/Chicago")
            ].join("");
            httpMock('GET', baseUrl + "/v1/report/callDetail?report=call_detail" + params);
			console.log('MOCK HTTP', baseUrl + "/v1/report/callDetail?report=call_detail");
			console.log('PARAMS', params);
			CallsDetailsWebService.getCallsSummaryList(params).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        xit(".getCallsDetailsList() makes GET w/ filter and w/ filtertype", function () {
            $window.sessionStorage.role_id = 7;
            $rootScope.timezone = "America/Denver";
            var params = [
                "/v1/report/callDetail?report=" + 1,
                "&user_id="    + 2,
                "&limit="      + 3,
                "&offset="     + 4,
                "&start_date=" + "2015-01-30",
                "&end_date="   + "2015-01-31",
                "&filtertype=" + "s",
                "&filter="     + "Blingy",
                "&timezone="   + encodeURIComponent("America/Denver"),
                "&weNeedMoreDataScotty=" + "true",
                "&role="       + 7
            ].join("");
            httpMock('GET', baseUrl + params);

            CallsDetailsWebService.getCallsDetailsList(1, "2015-01-30", "2015-01-31", 4, 3, "s", "Blingy", 2, true).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });

        xit(".getCallsDetailsList() makes GET w/o filter and w/o filtertype", function () {
            $window.sessionStorage.role_id = 7;
            $rootScope.timezone = "America/Denver";
            var params = [
                "/v1/report/callDetail?report=" + 1,
                "&user_id="    + 2,
                "&limit="      + 3,
                "&offset="     + 4,
                "&start_date=" + "2015-01-30",
                "&end_date="   + "2015-01-31",
                "&timezone="   + encodeURIComponent("America/Denver"),
                "&weNeedMoreDataScotty=" + "true",
                "&role="       + 7
            ].join("");
            httpMock('GET', baseUrl + params);

            CallsDetailsWebService.getCallsDetailsList(1, "2015-01-30", "2015-01-31", 4, 3, null, null, 2, true).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".getCallsDetailsInfo() makes GET request", function () {
            var params = [
                "/v1/call/Info/" + 1,
                "/?report="      + 2,
                "&user_id="      + 3
            ].join("");
            httpMock('GET', baseUrl + params);

            CallsDetailsWebService.getCallsDetailsInfo(2, 3, 1).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".setCallsComments() makes GET request", function () {
            var params = [
                "/v1/call/Comment/",
                "?report="  + 1,
                "&user_id=" + 2
            ].join("");
            httpMock("POST", baseUrl + params, 3);

            CallsDetailsWebService.setCallsComments(1, 3, 2).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".deleteCallsComments() makes DELETE request", function () {
            var params = [
                "/v1/call/Comment/" + 1,
                "/?report=" + 2,
                "&user_id=" + 3
            ].join("");
            httpMock("DELETE", baseUrl + params);

            CallsDetailsWebService.deleteCallsComments(2, 1, 3).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".getCallsTags() makes GET request", function () {
            var params = [
                "/v1/call/Tag/" + 3,
                "/?report=" + 1,
                "&user_id=" + 2
            ].join("");
            httpMock("GET", baseUrl + params);

            CallsDetailsWebService.getCallsTags(1, 2, 3).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".getTags() makes GET request", function () {
            $rootScope.currentOUId = 1;
            $rootScope.userAccess = {tag:2};
            var params = [
                "/v1/tag/ouid/"+ 1,
                "/userAccess/" + 2,
                "/?report=" + 3
            ].join("");
            httpMock("GET", baseUrl + params);

            CallsDetailsWebService.getTags(3, null, null).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".setCallsTags() makes POST request", function () {
            var params = "/v1/call/Tag/?user_id=" + 2;
            httpMock("POST", baseUrl + params, {a:1});

            CallsDetailsWebService.setCallsTags({a:1}, 2).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".getCallBlacklist() makes GET request", function () {
            var params = [
                "/v1/blacklist/ouid/" + 2,
                "/" + "?report="      + 1,
                "&user_id="           + 3
            ].join("");
            httpMock("GET", baseUrl + params);

            CallsDetailsWebService.getCallBlacklist(1, 2, 3).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".setCallBlacklist() makes POST request", function () {
            $rootScope.currentOUId = 77;
            var blockedCallsMock = {
                "blacklist": {
                    "org_unit_id":77,
                    "numbers":    88
                }
            };
            var params = [
                "/v1/blacklist/append"
            ].join("");
            httpMock("POST", baseUrl + params, blockedCallsMock);

            CallsDetailsWebService.setCallBlacklist(null, null, null, 88).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".emailRecording() makes POST request", function () {
            var params = [
                "/v1/call/email"
            ].join("");
            httpMock("POST", baseUrl + params, {a:1});

            CallsDetailsWebService.emailRecording({a:1}).then(function (data) { returnedData = data; });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });
    });
});
