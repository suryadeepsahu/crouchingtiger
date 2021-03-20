/**
 * Created by bschermerhorn on 9/23/15.
 */
describe("Report Param Factory", function () {
	beforeEach(module("report-param"));


	describe("DateRangeFiller fillInDays", function () {
		var ReportParam;
		beforeEach(inject(function ($injector) {
			ReportParam = $injector.get('ReportParam');
		}));


		it("CAN'T store complex data types with setParams", function () {
			ReportParam.setParams("my_dog", {dog:"Bingo"});

			// isEqual can compare complex data types, where normal javascript == or === can't.
			expect(_.isEqual(ReportParam.getParams("my_dog"), {dog:"Bingo"})).toEqual(false);
		});

		it("Can set and get a normal value stored", function () {
			ReportParam.setParams("name", "Tim");
			expect(ReportParam.getParams("name")).toEqual("Tim");
		});


	});
});



















