
if(_ !== undefined){
    (function(_){
        var methodNamesHere = ["replaceAll", "remove", "zeroIfNaN"];
        _.each(methodNamesHere, function(newMethodName){
            if(_[newMethodName] !== undefined){
                console.log("whoops, " + newMethodName + " is replacing a function in the underscore.js library!");
            }
        });

        // String functions


        // iterates over a string and replaces a given character with a diff value
        _.replaceAll = function(targetStr, strToFind, strToReplaceWith){
            if(targetStr === null) return;

            return _.map(targetStr.split(""), function (char) {
               return char.replace(strToFind, strToReplaceWith);
            }).join("");
        };


        //returns a new array with only the element chosen by index removed
        _.remove = function(targetArr, indexToRemoveElement){
            var newArr = _.map(targetArr, function(d){ return d; });
            newArr.splice(indexToRemoveElement, 1);
            return newArr;
        };
        // Number functions
        // Object function
        // Function functions

        _.zeroIfNaN = function(value) {
            return isNaN(value) ? 0 : value;
        };



    }(_));
} else {
    console.log("put underscore_augment after underscore.js");
}




