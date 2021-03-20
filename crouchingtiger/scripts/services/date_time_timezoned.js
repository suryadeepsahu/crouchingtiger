/**
 * Created by bschermerhorn on 10/12/15.
 */
(function () {
	var a = angular.module("datetime-timezoned", []);

	a.factory("DateTimeTimeZoned", [function () {
		var DateTimeTimeZoned = {};
		var frmt = "YYYY-MM-DD HH:mm:ss";


		DateTimeTimeZoned.createFakeDateNowInTimezone = function (timezone) {
			var nowReal = moment.tz(timezone);
			var nowTimeZoneStrippedStr = nowReal.format(frmt);
			return new Date(nowTimeZoneStrippedStr);
		};

		// javascript's Date's version of what UTC should be while in JSON
		DateTimeTimeZoned.fakeLocalDateToRealGMT_JSONformat = function (_Date, timezone) {
			if (!_Date) {
				console.log("parameter null in DateTimeTimeZoned.fakeLocalDateToRealGMT_JSONformat");
				if (!timezone) { throw "Missing timezone in DateTimeTimeZoned.fakeLocalDateToRealGMT_JSONformat"; }
				return null;
			}
			var dateStrWithoutTZ = moment(_Date).format(frmt);
			var momentObjTimezoned = moment.tz(dateStrWithoutTZ, timezone);
			return new Date(momentObjTimezoned.toString()).toJSON();
		};

		DateTimeTimeZoned.createFakeDateFromAlreadyTimeZonedStr = function (dateStr) {
			return moment(dateStr).toDate();
		};


		return DateTimeTimeZoned;
	}]);
}());