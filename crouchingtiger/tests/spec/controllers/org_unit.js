/*
*       Jasmine unit test notes
*       spyOn(ouWebService, "infoAboutOuAndChildren") replaces the object with a spy
*       spyOn(ouWebService, "infoAboutOuAndChildren").and.callThrough is better in that it keeps the functionality it has before
*
*
*
*
*
* */

describe('Unit: OrgUnitController', function() {
    var $scope,
        $rootScope,
        $ctrl,
        ouCtrl,
        pinesNotifications,
        $bootbox,
        ouWebService,
        q,
        httpBackend,
        deferred,
        bootbox,
        route,
        orgunitlocal,
        BreadcrumbWebService
        ;

    beforeEach(module('org-unit'));

    beforeEach(inject(function ($injector) {
        q = $injector.get("$q");


        ouWebService = {
            infoAboutOuAndChildren: function () {
                var deferred = q.defer();
                //deferred.resolve({"one": "three"});
                return deferred.promise;
            },

            getIndustries: function () {
                var deferred = q.defer();
                deferred.resolve({"json": "three"});
                return deferred.promise;
            },

            getOrgUnitById: function () {
                var deferred = q.defer();
                deferred.resolve({
                    "data": {"json":["test"]}
                });
                return deferred.promise;
            },
            deleteOU: function () {
                var deferred = q.defer();
                deferred.resolve({
                    "data": {isTopLevelOU: false, parentOU: 1011}
                });
                return deferred.promise;
            },

            parseIndustries: function () {},
            updateSessData: function () {
                var deferred = q.defer();
                deferred.resolve("test");
                return deferred.promise;
            }
        };




        route = {reload: function () {}};


        $rootScope           = $injector.get("$rootScope");
        $scope               = $injector.get("$rootScope").$new();
        $ctrl                = $injector.get("$controller");
        pinesNotifications   = $injector.get("pinesNotifications");
        $bootbox             = $injector.get("$bootbox");
        httpBackend          = $injector.get("$httpBackend");
        orgunitlocal         = $injector.get("OrgUnitLocal");
        //BreadcrumbWebService = $injector.get("BreadcrumbWebService");

        $rootScope.url     = 'http://abc.com';
        $rootScope.port    = '80';


        ouCtrl = $ctrl("OrgUnitController", {
            $scope:               $scope,
            $rootScope:           {userAccess:{}},
            $routeParams:         {id: 12, add: false},
            $route:               route,
            OrgUnitWebService:    ouWebService,
            //$bootbox:          bootbox
            $bootbox:             $bootbox,
            OrgUnitLocal:         orgunitlocal,
            //BreadcrumbWebService: BreadcrumbWebService
        });
    }));


    
    describe("$scope.deleteThisOU", function () {

        it("Only ADMIN user can delete", function () {
            // Try non admin permission to delete OU
            $rootScope.userAccess = {orgunit:1};

            spyOn(ouWebService, "infoAboutOuAndChildren");
            $scope.deleteThisOU();

            // should not reach http request to get information about deleting OU
            expect(ouWebService.infoAboutOuAndChildren.calls.count()).toEqual(0);
        });



        it("User prohibited from deleting TOP OU while viewing it", function () {
            $rootScope.userAccess = {orgunit:7};
            $rootScope.currentOUId = 1234;
            $rootScope.highestOUId = 1234;

            spyOn(ouWebService, "infoAboutOuAndChildren").and.callThrough();
            $scope.deleteThisOU();

            expect(ouWebService.infoAboutOuAndChildren.calls.count()).toEqual(0);
        });



        //it("User can delete current OU if not viewing TOP OU", function () {
        //    $rootScope.userAccess = {orgunit:7};
        //    $rootScope.currentOUId = 1234;
        //    $rootScope.highestOUId = 4321;
        //
        //    deferred = q.defer();
        //    deferred.resolve({
        //        data: {
        //            users: 100,
        //            campaigns: 77,
        //            call_flows: 500
        //        }
        //    });
        //
        //    httpBackend.when("PUT", $rootScope.url + ":" +$rootScope.port + "/v1/session/").respond({test:'yay'});
        //
        //    spyOn(ouWebService, "infoAboutOuAndChildren").and.returnValue(deferred.promise);
        //
        //
        //    spyOn(orgunitlocal, "updateSessData").and.returnValue(deferred.promise);
        //
        //    var deferredDeleteOU = q.defer();
        //    deferredDeleteOU.resolve({
        //        data: {
        //            isTopLevelOU: false,
        //            parentOU: {
        //                ouId: 2222, ouName: "parent_ou", ouLevel: 2
        //            }
        //        }
        //    });
        //    spyOn(ouWebService, "deleteOU").and.returnValue(deferredDeleteOU.promise);
        //    spyOn(route, "reload");
        //    spyOn($bootbox, "prompt").and.callFake(function (respStr, cb) {
        //        cb('Yes');
        //    });
        //
        //    $scope.deleteThisOU();
        //    $scope.$digest();
        //    //httpBackend.flush();
        //
        //    expect(ouWebService.infoAboutOuAndChildren.calls.count()).toEqual(1);
        //    expect($bootbox.prompt).toHaveBeenCalled();
        //    expect($rootScope.currentOUId).toEqual(2222);
        //    expect(route.reload).toHaveBeenCalled();
        //    expect(orgunitlocal.updateSessData).toHaveBeenCalled();
        //
        //});




        it("Doesn't delete OU if incorrect user response", function () {
            $rootScope.currentOUId = 1234;
            $rootScope.highestOUId = 4321;
            $rootScope.userAccess = {orgunit:7};

            deferred = q.defer();
            deferred.resolve({
                data: {
                    isTopLevelOU: false,
                    parentOU: {
                        ouId: 2222, ouName: "parent_ou", ouLevel: 2
                    }
                }
            });
            spyOn(ouWebService, "infoAboutOuAndChildren").and.returnValue(deferred.promise);
            spyOn(ouWebService, "deleteOU");

            spyOn(pinesNotifications, "notify");
            spyOn($bootbox, "prompt").and.callFake(function (respStr, cb) {
                cb("I don't know.");
            });

            $scope.deleteThisOU();
            $scope.$digest();

            // displays "didnt type in yes response
            expect(pinesNotifications.notify).toHaveBeenCalled();

            // never reached ajax call to delete ou
            expect(ouWebService.deleteOU.calls.count()).toEqual(0);
        });


    });


});



















