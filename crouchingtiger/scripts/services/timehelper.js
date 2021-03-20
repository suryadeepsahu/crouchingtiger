/**
 * Created by bschermerhorn on 8/5/15.
 */
;(function (angular) {

	if (!angular) {
	    throw "timehelper.js needs angular loaded before itself to function.";
	}

    var mod = angular.module("timehelper", []);

	/* -Purpose-
	* A lot of the data from the backend based around a date range
	* doesn't always given every day with values, which can screw up
	* data vis charts and skip days or skip values for those days
	*
	* This factory is to fill in any missing days for a given set of data
	* */

	mod.factory("DateRangeFiller", function () {



		// ** IMPORTANT **
		// requires, an array of SORTED (from earlier to later), (ex ["2015-01-01", "2015-01-02", "2015-02-05"])
		//                       UNIQUE dates (ex no duplicate days),
		// only being as specific as to the DAY (doesn't work for hours/minutes/seconds) ex "2015-01-01"

		// all parameters are REQUIRED
		// unfilledDateSet {array of strings as dates} -> ex ["2015-01-01", "2015-01-05", "2015-01-10"] (can be an empty array, and function will generate dates from start to end)
		// intendedStartDate {date in string form}     -> ex "2015-01-01" (the intended START doesn't have to be included in unfilledDataset either, it can be generated)
		// intendedEndDate {date in string}            -> ex "2015-01-01" (the intended END doesn't have to be included in unfilledDataset either it can be generated)
		// dateFormat {string}                         -> ex "YYYY-DD-MM" (the date formatting according to Moment.js's standard)

		// returns an array of strings in desired date format, of the filled in dates (BY DAY) NOT included in the unfilled date set
		var DateRangeFiller = {};
		DateRangeFiller.fillInDays = function (unFilledDateSet, intendedStartDate, intendedEndDate, dateFormat) {

			// console.log('unFilledDateSet', unFilledDateSet);
			// console.log('intendedStartDate', intendedStartDate);
			// console.log('intendedEndDate', intendedEndDate);
			// console.log('dateFormat', dateFormat);

			if (!Array.isArray(unFilledDateSet)){
				throw "incorrect DateRangeFiller first param";
			}
			// Verify other params
			if (!moment(intendedStartDate, dateFormat).isValid || !moment(intendedEndDate, dateFormat).isValid) {
			    var errStr = "inside DateRangeFiller, one of these are invalid... " +
				        "intendedStartDate " + intendedStartDate.toString() + " " +
				        "intendedEndDate " + intendedEndDate.toString() + " " +
					    "dateForm " + dateFormat.toString();
				throw errStr;
			}

            // intended start date is coming after the end date... maybe they're reversed by accident?
			if (moment(intendedStartDate, dateFormat) > moment(intendedEndDate, dateFormat)) {
				throw "TimeHelperJs: ERROR, why is your end date previous to your start date? - error in DateRangeFiller invocation";
			}

            // make sure the unfilled dateset has dates within the range of the given start and end dates
            var isOutOfBounds = _.any(unFilledDateSet, function (d) {
                var dataSetP = moment(d, dateFormat);
								// console.log('dataSetP: ', dataSetP);
								// console.log('intendedstartDate', moment(intendedStartDate, dateFormat));
								// console.log('intendedEndDate', moment(intendedEndDate, dateFormat));
								// console.log('True or False', (dataSetP < moment(intendedStartDate, dateFormat)), (dataSetP > moment(intendedEndDate, dateFormat)));
                return (dataSetP < moment(intendedStartDate, dateFormat)) || (dataSetP > moment(intendedEndDate, dateFormat));
            });
            if (isOutOfBounds) {
                throw "TimeHelperJs: ERROR, your given date set is out of bounds of the intended start date for filling in";
            }



			var originalGivenDataSet = _.map(unFilledDateSet, function(d){return d;});// make a copy of what's given, so as to use it to compare at end
			var filledDateSet = [];
			var manipulatingDateSet = unFilledDateSet;


			// Don't bother creating anything if we start and end are the same
			if (intendedStartDate === intendedEndDate) {
				filledDateSet.push(intendedStartDate);
				return filledDateSet;
			}

			// Algorithm requires that at least both the start and end date exist
			if (!_.contains(manipulatingDateSet, intendedStartDate)) {
				manipulatingDateSet.unshift(intendedStartDate);
			}
			if (!_.contains(manipulatingDateSet, intendedEndDate)) {
				manipulatingDateSet.push(intendedEndDate);
			}


			// assumptions thus far, we at least have 2 days, including the first day at start position
			// and the end day at the last position of unFilledDataSet



			// Initialize some values before process begins
			// We need a normal loop to control 'i' so we can possibly repeat some loop indices
			var currentContextDay = manipulatingDateSet[0];
			var subsequentContextDay = manipulatingDateSet[1];
			var sCDIndex = 1;
			var newFilledDay;

			//var counterToPreventInfiniteLoop = 0;
			//var countToDeclareInfiniteLoopOccurring = 10000;
			for (var i = 0; i < manipulatingDateSet.length; i++) {

				//initial pseudo code
				// is subsequentContextDay === currentContextDays's tomorrow?
					//yes
					//push currentContextDay to filledDataSet
					//make currentContextDay = subsequentContextDay
					//is subsequentContextDay last item in loop? subsequentContextDay === intendedEndDate
						//yes
						//push subsequentContextDay to filledDataSet
						//GET OUT of this function while returning filledDataSet
					//no
					//make SCD the next item in unfilled set sCDIndex = sCDIndex + 1;
					//make subsequentContextDay = unFilledDataSet[sCDIndex]
					//proceed with loop

				//no, we need to fill in a day
				//add CCD to filledSet, filledDataSet,push(currentContextDay)
				//create tomorrow newFilledDay = moment(currentContextDay).add(1, "day")
				//make CCD the tomorrow just barely created, currentContextDay = newFilledDay;
				//set i to i-1, so we maintain SCD's index, and we can stay in the loop

				if (moment(currentContextDay, dateFormat).add(1, "day").format(dateFormat) === subsequentContextDay) {
				    filledDateSet.push(currentContextDay);
					currentContextDay = subsequentContextDay;

					if (subsequentContextDay === intendedEndDate) {
						filledDateSet.push(subsequentContextDay);
						//return _.difference(filledDateSet, unFilledDateSet);
						return _.difference(filledDateSet, originalGivenDataSet);
					}

					sCDIndex = sCDIndex + 1;
					subsequentContextDay = manipulatingDateSet[sCDIndex];
				}
				else {
					filledDateSet.push(currentContextDay);
					newFilledDay = moment(currentContextDay, dateFormat).add(1, "day").format(dateFormat);
					currentContextDay = newFilledDay;
					i = i - 1;
				}
			}
		};


		return DateRangeFiller;
	});//end .factory("DateRangeFiller"
}(angular));
