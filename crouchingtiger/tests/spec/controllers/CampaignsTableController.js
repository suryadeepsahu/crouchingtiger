/**
 * Created by brian on 6/9/15.
 */

describe("CampaignsTableController", function () {
    var scope,
        rootScope,
        campaign_web_service,
        pines_notification,
        boot_box,
        q,
        ctrl
        ;

    boot_box = {
        confirm: function (confirmQuestion, resultCB) {}
    };

    pines_notification = {
        notify: function () {}
    };

    beforeEach(module("campaigns-builder"));
    beforeEach(inject(function ($injector) {
        scope                 = $injector.get("$rootScope").$new();
        scope.userAccess = {campaign: 7};

        q                     = $injector.get("$q");
        //pines_notification    = $injector.get("pinesNotifications");
        //boot_box              = $injector.get("$bootbox");;
        ctrl                  = $injector.get("$controller");
        campaign_web_service  = $injector.get("CampaignWebService");

        ctrl("CampaignsTableController", {
            $scope: scope,
            $bootbox: boot_box,
            pinesNotifications: pines_notification
        });


    }));
    
    
    describe("$scope.archiveCampaign", function () {

        it("is a function", function () {
            expect(typeof scope.archiveCampaign === "function").toBe(true);
        });

        describe("prompts user about delete", function () {

            beforeEach(function () {
                var deferred = q.defer();
                deferred.resolve({"test": "abc"});
                spyOn(campaign_web_service, "setCampaignStatus").and.returnValue(deferred.promise);
            });

            it("If user clicks ok, then makes ajax request", function () {
                spyOn(boot_box, "confirm").and.callFake(function (strQuestion, resCB) {
                    resCB("ok");
                });

                scope.archiveCampaign([101, "test_campaign_name"]);
                expect(campaign_web_service.setCampaignStatus).toHaveBeenCalled();
            });

            it("if user clicks cancel, then doesn't make ajax request", function () {
                spyOn(boot_box, "confirm").and.callFake(function (strQuestion, resCB) {
                    resCB(null);
                });

                scope.archiveCampaign([101, "test_campaign_name"]);
                expect(campaign_web_service.setCampaignStatus.calls.count()).toEqual(0);
            });
        });// end describe "prompts user about delete"
    });// end describe $scope.archiveCampaign"






});// end describe "CampaignsTableController"