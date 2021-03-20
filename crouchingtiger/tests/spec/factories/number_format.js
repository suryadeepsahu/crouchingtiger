/**
 * Created by bschermerhorn on 9/23/15.
 */
describe("Number Format factory", function () {
	beforeEach(module("numForm"));


	describe("kShortener", function () {
		var NumberFormat;
		beforeEach(inject(function ($injector) {
			NumberFormat = $injector.get("NumberFormat");
		}));

		it("Doesn't shorten number if less than 1000", function () {
			expect(NumberFormat.kShortener(999)).toEqual("999");
			expect(NumberFormat.kShortener(400)).toEqual("400");
			expect(NumberFormat.kShortener(5)).toEqual("5");
		});

		it("Can shorten a number in thousands", function () {
			expect(NumberFormat.kShortener(1000)).toEqual("1");
			expect(NumberFormat.kShortener(2000)).toEqual("2");
			expect(NumberFormat.kShortener(3000)).toEqual("3");
		});

		it("Can shorten a number in thousands w decimal, and only shows the tenth dec spot", function () {
			expect(NumberFormat.kShortener(1234)).toEqual("1.2");
			expect(NumberFormat.kShortener(2345)).toEqual("2.3");
			expect(NumberFormat.kShortener(3456)).toEqual("3.4");
		});

		it("Can shorten a number in ten thousands", function () {
			expect(NumberFormat.kShortener(10000)).toEqual("10");
			expect(NumberFormat.kShortener(20000)).toEqual("20");
			expect(NumberFormat.kShortener(30000)).toEqual("30");
			expect(NumberFormat.kShortener(31000)).toEqual("31");
		});

		it("Can shorten a number in ten thousands w decimal, and only shows the tenth dec spot", function () {
			expect(NumberFormat.kShortener(12345)).toEqual("12.3");
			expect(NumberFormat.kShortener(12345)).toEqual("12.3");
			expect(NumberFormat.kShortener(23456)).toEqual("23.4");
			expect(NumberFormat.kShortener(34567)).toEqual("34.5");
		});

		it("Can shorten a number in hundred thousands", function () {
			expect(NumberFormat.kShortener(100000)).toEqual("100");
			expect(NumberFormat.kShortener(200000)).toEqual("200");
			expect(NumberFormat.kShortener(300000)).toEqual("300");
			expect(NumberFormat.kShortener(320000)).toEqual("320");
			expect(NumberFormat.kShortener(321000)).toEqual("321");
		});

		it("Can shorten a number in hundred thousands w decimal, and only shows the tenth dec spot", function () {
			expect(NumberFormat.kShortener(123456)).toEqual("123.4");
			expect(NumberFormat.kShortener(234567)).toEqual("234.5");
			expect(NumberFormat.kShortener(345678)).toEqual("345.6");
		});

		it("Returns 0 for NaN input", function () {
			expect(NumberFormat.kShortener(0/0)).toEqual(0);
			expect(NumberFormat.kShortener({})).toEqual(0);
			expect(NumberFormat.kShortener("abc")).toEqual(0);
		});

		it("Returns 0 for input of 0", function () {
			expect(NumberFormat.kShortener(0)).toEqual("0");
		});
	});
});



















