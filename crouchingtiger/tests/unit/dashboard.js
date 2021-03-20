describe("A suite", function() {

	var ctrl, scope;

    // inject module controller is attached to
	beforeEach(module("dashboard_report_widgets"));

	// Inject required dependancies for the controller
    beforeEach(inject(function($controller, $rootScope){
        // create a new child of $rootScope
        scope = $rootScope.$new();

        // create the controller
        ctrl = $controller("DashboardWidgetController", {
            $scope: scope
        });
    }));


    // it("scope.getZeroedDataSet() returns a function with 7 days and correct property names", function () {

    //     var ds = scope.getZeroedDataSet();

    //     // should have 7 days worth of fill in data
    //     expect(ds.length).toBe(7);

    //     // only check first and last day to be correct date and format
    //     expect(ds[0].date).toBe(moment().subtract('days', 7).format("YYYY-MM-DD"));
    //     expect(ds[6].date).toBe(moment().subtract('days', 1).format("YYYY-MM-DD"));

    //     var keyNamesShouldHave = [
    //         "answered_count", "conversion_count", "conversion_sum", "duration_sum", "lead_count",
    //         "lead_sum", "sales_inquiry_count", "sales_inquiry_sum", "total_calls", "unique_calls"
    //     ];


    //     _.each(keyNamesShouldHave, function (keyNameShouldHave) {
    //         expect(ds[0][keyNameShouldHave]).toBe(0);
    //     });
    // });


});




