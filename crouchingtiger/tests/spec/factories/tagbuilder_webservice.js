/**
 * Created by bschermerhorn on 9/29/15.
 */
describe("Tag Builder", function () {
    var $rootScope, $window, $httpBackend, $http, TagWebService, ApiParam,
    pinesNotifications;

    beforeEach( module("tag-builder") );

    beforeEach(inject(function($injector){
        $rootScope      = $injector.get('$rootScope');
        $rootScope.url  = "http://test123";
        $rootScope.port = "8000";

        $window         = $injector.get('$window');
        $httpBackend    = $injector.get('$httpBackend');
        $http           = $injector.get('$http');
        TagWebService   = $injector.get('TagWebService');
    }));

    var baseUrl, mockData, headerCallback, getConfig, httpMock, returnedData;
    beforeEach(function(){
        $window.sessionStorage.token = 'abc123';
        baseUrl                      = $rootScope.url +":"+ $rootScope.port;
        mockData                     = {'mock data': true};
        headerCallback               = function(headers){
            return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
        };

        httpMock = function(method, theUrl, jsonParam) {
            $httpBackend.when(method, theUrl, (jsonParam || {}), headerCallback).respond(mockData);
        };
    });

    describe("TagWebService", function () {
        it("has its methods", function () {
            ["getTags", "createTag", "deleteTag", "unMaskData"].forEach(function (m) {
                expect(typeof TagWebService[m]).toEqual("function");
            });
        });


        it(".getTags() makes get to //v1/tag/ouid/", function () {
            $rootScope.currentOUId = 1;
            $rootScope.userAccess = {campaign: 3};
            httpMock('GET', baseUrl + "/v1/tag/ouid/" + 1 + "/userAccess/" + 3);
            TagWebService.getTags().then(function (data) { returnedData = data; });

            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".createTag() makes POST to /v1/tag/ with tag data", function () {
            httpMock('POST', baseUrl + "/v1/tag", {a:1});
            TagWebService.createTag({a:1}).then(function (data) { returnedData = data; });

            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it(".deleteTag() makes DELETE to /v1/tag/ with tag data", function () {
            httpMock('PUT', baseUrl + "/v1/tag/delete", {a:1});
            TagWebService.deleteTag({a:1}).then(function (data) { returnedData = data; });

            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });
    });


    






});























































