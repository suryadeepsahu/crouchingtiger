/**
 * Created by brians on 9/3/15.
 */
describe("Timehelper factory", function () {
    beforeEach(module("timehelper"));


    describe("DateRangeFiller fillInDays", function () {
        var DateRangeFiller, startDateRange, filledIn;
        beforeEach(inject(function ($injector) {
            DateRangeFiller = $injector.get('DateRangeFiller')
        }));

        it("fills missing end dates for same month with different date format", function () {
            startDateRange = ["2014-01-02"];
            filledIn = DateRangeFiller.fillInDays(startDateRange, "2014-01-01", "2014-01-03", "YYYY-MM-DD");
            expect(filledIn).toEqual(["2014-01-01", "2014-01-03"]);
        });

        it("returns nothing if all are present", function () {
            startDateRange = ["2014-01-01", "2014-02-01", "2014-03-01"];
            filledIn = DateRangeFiller.fillInDays(startDateRange, "2014-01-01", "2014-03-01", "YYYY-DD-MM");
            expect([]).toEqual(filledIn);
        });

        it("fills missing end dates for same month", function () {
            startDateRange = ["2014-02-01"];
            filledIn = DateRangeFiller.fillInDays(startDateRange, "2014-01-01", "2014-03-01", "YYYY-DD-MM");
            expect(filledIn).toEqual(["2014-01-01", "2014-03-01"]);
        });

        it("fills missing end dates for separate months", function () {
            startDateRange = ["2015-31-08", "2015-01-09"];
            filledIn = DateRangeFiller.fillInDays(startDateRange, "2015-30-08", "2015-02-09", "YYYY-DD-MM");
            expect(filledIn).toEqual(["2015-30-08", "2015-02-09"]);
        });

        it("fills in an entirely empty date range for days in same months", function () {
            startDateRange = [];
            filledIn = DateRangeFiller.fillInDays(startDateRange, "2014-01-01", "2014-09-01", "YYYY-DD-MM");
            expect(filledIn).toEqual(_.range(1, 10).map(function(d){ return "2014-0"+d+"-01"; }));
        });

        it("fills in an entirely empty date range for days in separate months", function () {
            startDateRange = [];
            filledIn = DateRangeFiller.fillInDays(startDateRange, "2015-30-08", "2015-02-09", "YYYY-DD-MM");
            expect(filledIn).toEqual([
                "2015-30-08", "2015-31-08", "2015-01-09",  "2015-02-09"
            ]);
        });

        it("gets unhappy when the 'end date' comes before the 'start date''", function () {
            startDateRange = [];

            // must be inside a function like so if you expect to catch an error thrown
            expect(function () {
                filledIn = DateRangeFiller.fillInDays(startDateRange, "2015-30-08", "2014-02-09", "YYYY-DD-MM");
            }).toThrow();
        });

        it("gets unhappy when passed incorrect data type for date range", function () {
            startDateRange = [];

            expect(function () {
                filledIn = DateRangeFiller.fillInDays(123, "2015-30-08", "2015-02-09", "YYYY-DD-MM");
            }).toThrow();
        });

        it("gets unhappy when any of given dates in the incomplete date range are outside the boundaries " +
            "of the given start and end date", function () {
            startDateRange = ["1999-01-01"];
            expect(function () {
                filledIn = DateRangeFiller.fillInDays(startDateRange, "2015-30-08", "2015-02-09", "YYYY-DD-MM");
            }).toThrow();

            startDateRange = ["2050-01-01"];
            expect(function () {
                filledIn = DateRangeFiller.fillInDays(startDateRange, "2015-30-08", "2015-02-09", "YYYY-DD-MM");
            }).toThrow();

        });
    });
});



















