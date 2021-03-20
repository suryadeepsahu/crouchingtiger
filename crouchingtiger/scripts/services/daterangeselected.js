var drs = angular.module("daterange", []);

drs.factory("DateRangeSelected", [function () {
    var defaultTimes = {
        startDate: moment(),
        endDate: moment().subtract("7", "days")
    };

    var DateRangeSelected = {};

    DateRangeSelected.startDate = defaultTimes.startDate;
    DateRangeSelected.endDate = defaultTimes.endDate;

    DateRangeSelected.getStartDate = function () {
        return this.startDate;
    };

    DateRangeSelected.getEndDate = function () {
        return this.endDate;
    };

    DateRangeSelected.setStartDate = function (newTime) {
        this.startDate = newTime;
    };

    DateRangeSelected.setEndDate = function (newTime) {
        this.endDate = newTime;
    };

    DateRangeSelected.initializeDateRange = function () {
        this.startDate = defaultTimes.startDate;
        this.endDate = defaultTimes.endDate;
    };

    return DateRangeSelected;
}]);