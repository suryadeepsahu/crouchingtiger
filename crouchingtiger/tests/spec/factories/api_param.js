/**
 * Created by bschermerhorn on 9/23/15.
 */
describe("API Param Factory", function () {

	beforeEach(module("api-param"));
	var ApiParam, $window, $rootScope;

	beforeEach(inject(function (_$window_, _ApiParam_, _$rootScope_) {
		ApiParam = _ApiParam_;

		$window = _$window_;
		$window.sessionStorage.token = "!@#$%";

		$rootScope = _$rootScope_;
		$rootScope.url = "http://localhost";
		$rootScope.port = 8000;

	}));

	describe("headerConfig method", function () {
		it("headerConfig is a function", function () {
		    expect(ApiParam.headerConfig.constructor).toBe(Function);
		});

		it("headerConfig methd returns object", function () {
			expect(ApiParam.headerConfig().constructor).toEqual(Object);
		});

		it("headerConfig methd returns object with authorization of bearer and token", function () {
			expect(ApiParam.headerConfig().headers.Authorization).toEqual("bearer !@#$%");
		});
	});

	describe("baseURL method", function () {
		it("baseURL is a function", function () {
			expect(typeof ApiParam.baseURL).toBe("function");
		});

		it("baseURL returns a string", function () {
			expect(typeof ApiParam.baseURL()).toEqual("string");
		});

		it("baseURL returns url and point with : inbetween", function () {
			expect(ApiParam.baseURL()).toEqual("http://localhost:8000");
		});
	});
});



















