/**
 * Created by bschermerhorn on 9/2/15.
 */
;(function (angular) {
	var ap = angular.module("numForm", []);
	ap.factory("NumberFormat", function () {
		var NumberFormat = {};

		// Takes a number and shortens it to 'k' form if it's a thousand or more
		// returns number as string
		// 888 -> 888
		// 1234 -> 1.2
		// 1021 -> 1
		// 43211 -> 43.2
		NumberFormat.kShortener = function(num) {
			if (isNaN(num)) { return 0; }
			if (num < 1000) { return num.toString(); }

			var tempNum = (num / 1000).toString();
			if (tempNum.indexOf(".") === -1) {
				return tempNum;
			}

			var re = /(\d+\.\d)/;
			var match = re.exec(tempNum);
			if (match[0].indexOf(".0") !== -1) {
			    return match[0];
			} else {
				return  match[0].replace(/\.0/, "");
			}
		};


		//// Takes a number and shortens it to 'k' form if it's a thousand or more
		//// returns number as string
		//// 888 -> 888
		//// 1234 -> 1.2
		//// 1021 -> 1
		//// 43211 -> 43.2
		//NumberFormat.kShortener = function(num) {
		//	if (isNaN(num)) { return 0; }
		//	if (num < 1000) { return num.toString(); }
		//
		//	// put decimal in thousand's place
		//	// ex 1000 -> 1.000
		//	var res = (num / 1000);
		//	res = res.toString();
		//
		//	// cut off anything past the tenths position
		//	// ex 1.000 -> 1.0
		//	// ex 1.241 -> 1.2
		//	res = res.substring(0, res.indexOf(".")+2);
		//
		//	// if the snipped off result has a 0 for tenths place, just use
		//	// the whole number
		//	// ex 1.0 -> 1
		//	if (res.charAt(res.length-1) === "0") {
		//		var blah =  res.substring(0, res.indexOf("."));
		//		return blah;
		//	}
		//
		//	// otherwise return it as is
		//	return res;
		//};

		return NumberFormat;
	});
}(angular));
