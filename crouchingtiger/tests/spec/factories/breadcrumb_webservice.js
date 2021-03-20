/**
 * Created by brians on 10/1/15.
 */
/**
 * Created by bschermerhorn on 9/23/15.
 */
describe("Breadcrumb Web Service", function () {

    beforeEach(module("breadcrumb"));
    var BreadcrumbWebService, $window, $rootScope, baseUrl, $httpBackend, mockData, $q;

    beforeEach(inject(function (_$window_, _BreadcrumbWebService_, _$rootScope_, _$httpBackend_, _$q_) {
        BreadcrumbWebService = _BreadcrumbWebService_;
        $q = _$q_;
        $window = _$window_;
        $window.sessionStorage.token = "!@#$%";
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $rootScope.url = "http://localhost";
        $rootScope.port = 8000;

    }));

    beforeEach(function () {
        baseUrl        = $rootScope.url + ":" + $rootScope.port;
        mockData       = {'mock data': true};
        headerCallback = function(headers){
            return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
        };

        getConfig = function() {
            var config =  {
                headers: {
                    'content-type':  'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return config;
        };

        httpMock = function(method, theUrl, jsonInput) {
            $httpBackend.when(method, theUrl, (jsonInput || {}), headerCallback).respond(mockData);
        };
    });


    describe("BC tests", function () {

        it("Has methods", function () {
            ["getChildrenOUs", "getOUData",
                "updateUser", "loadLevel1", "loadLevel2"].forEach(function (methodName) {
                expect(typeof BreadcrumbWebService[methodName]).toEqual("function");
            });
        });


        it("BreadcrumbWebservice factory initializes some values on $rootScope after factory is instantiated", function () {
            expect($rootScope.showLevel1).toEqual(false);
            expect($rootScope.showLevel2).toEqual(false);
            var bc_ous = [
                {"id": $rootScope.highestOUId, "name": $rootScope.highestOUName},
                {"id": null, "name": null},
                {"id": null, "name": null}
            ];
            expect(_.isEqual($rootScope.bc_ous, bc_ous)).toEqual(true);
        });


        it("getChildrenOUs works with id", function () {
            httpMock('GET', baseUrl + "/v1/orgUnit?org_unit_parent_id="+ 123);
            BreadcrumbWebService.getChildrenOUs(123).then(function (data) {
                returnedData = data;
            });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it("getOUData with id input", function () {
            httpMock('GET', baseUrl + "/v1/orgUnit/" + 123);
            BreadcrumbWebService.getOUData(123).then(function (data) {
                returnedData = data;
            });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it("updateUser with object of k/v changes", function () {
            httpMock('PUT', baseUrl + "/v1/user", {abc:"123"});
            BreadcrumbWebService.updateUser({abc:"123"}).then(function (data) {
                returnedData = data;
            });
            $httpBackend.flush();
            expect(returnedData.data).toEqual(mockData);
        });


        it("loadLevel1, variables on rootScope are set to values after invocation", function () {
            $rootScope.showOUInput1 = "blah";
            $rootScope.showLevel1   = "blah";
            $rootScope.showLevel2   = "blah";

            BreadcrumbWebService.loadLevel1();
            expect($rootScope.showOUInput1).toEqual(false);
            expect($rootScope.showLevel1).toEqual(true);
            expect($rootScope.showLevel2).toEqual(false);
        });


        it("loadLevel1, getChildrenOUs is invoked with an id", function () {
            var deferred = $q.defer();
            spyOn(BreadcrumbWebService, "getChildrenOUs").and.returnValue(deferred.promise);
            BreadcrumbWebService.loadLevel1(1);
            expect(BreadcrumbWebService.getChildrenOUs).toHaveBeenCalledWith(1);
        });


        it("loadLevel2, variables on rootScope are set to values after invocation", function () {
            $rootScope.showOUInput2 = "blah";
            $rootScope.showLevel2   = "blah";
            $rootScope.level3Parent = "blah";

            BreadcrumbWebService.loadLevel2(1);
            expect($rootScope.showOUInput2).toEqual(false);
            expect($rootScope.showLevel2).toEqual(true);
            expect($rootScope.level3Parent).toEqual(1);
        });


        it("loadLevel2, getChildrenOUs is invoked with an id", function () {
            var deferred = $q.defer();
            spyOn(BreadcrumbWebService, "getChildrenOUs").and.returnValue(deferred.promise);
            BreadcrumbWebService.loadLevel2(1);
            expect(BreadcrumbWebService.getChildrenOUs).toHaveBeenCalledWith(1);
        });


    });
});



















