angular.module('theme.cf-services', [])
  .service('ComponentData', function(CFCallFlow) {
    'use strict';
    /**
     * Collection of data used as datasources for dashboard widgets (list-select, bar-charts, area-charts, etc).
     */
    this.dataSets ={};

    /**
     * Updates the state of all data sets exposed to other facets of the system
     */
    this.updateDataSets = function() {
        var data = this.dataSets;
        //Run each data function
        //data.callFlowListData = this.callFlowListData(Category.dataForCategoryList, Company.dataForCategoriesList);
    };

    /**
     * Creates checksum based on object ids. Used primarily for memoization state checking.
     *
     * @param {object} items to create checksum from.
     * @return {string} a string of joined object ids delimited by '|'.
     */
    var idListMemoFunction = function(items) {
        var current_hash = _.pluck(items, 'id').join('|');
        return current_hash;
    };

    /**
     * Constructs data necessary for the round code list display
     *
     * @param {array} [companies] A filtered list of companies to construct a list of displayed round codes
     * @return {array} A list of round codes
     */
    this.roundCodeListData = _.memoize(function(rounds, roundHash) {
        if(typeof rounds === 'undefined') { return []; }

        var codeNames = _.unique(_.pluck(rounds, 'round_code'));
        var sortedRoundCodes = _.sortBy(_.map(codeNames, function(roundCode){
            return roundHash[roundCode];
        }), function(round){ return round.name; });

        return sortedRoundCodes;

    }, idListMemoFunction);

    /**
     * Constructs data necessary for the category list display
     *
     * @param {array} [categories] A filtered list of categories to display in the category list display
     * @param {array} [companies] A list of companies that have categories
     *                that are displayed in the category list display
     * @return {array} A list of categories ordered by the companies they belong to.
     */
    this.callFlowListData = function(categories, companies) {
        if(typeof categories === 'undefined' || typeof companies === 'undefined') { return []; }

        _.each(categories, function(category) {
            var companyCount = _.select(companies, function(company) {
                return company.category_id === category.id;
            }).length;
            category.model_count = companyCount;
        });
        return categories;
    };

    /**
     * Log(n)b
     *
     * @param {number} [n]
     * @param {number} [b]
     * @return {number}
     */
    function logN(n, b) {
        return (Math.log(n)) / (Math.log(b));
    }

    /**
     * Returns a graph index when given a number to index, the min graph value and the log base used
     *
     * @param {number} [num] The number we're determining the index of.
     * @param {number} [min] The minimum value of the first graph bar (usually 10,000)
     * @param {number} [base] The logarithmic base used in the graph (usually 2)
     * @return {num}
     */
    function rangeIndex(num, min, base) {
        return num < min ? 0 : Math.ceil(logN(num/min, base));
    }

    /**
    * Creates logarithmic ranges used in bar charts
    *
    * @param {array} collection of data to operate on
    * @param {string} property to calculate with
    * @param {int} maximum range
    * @param {int} number base
    * @param {int} upper bound of first range
    * @param {int} lower bound of first range
    * @return {array} of ranges and their counts
    */
    function setupRanges(collection, property, max, base, min, start) {
        min = min || 10000;
        base = base || 2;
        start = start || 1;

        var propertyList = _.pluck(collection, property);
        var ranges = [{start: start, end: min, label: ToolBox.labelfy(min), count: 0}];

        for(var i = min; i < max; i *= base) {
            ranges.push(
                {start: i, end: i * base, label: ToolBox.labelfy(i * base), count: 0}
            );
        }

        _.each(propertyList, function(property) {
            if(!isNaN(property) && property > 0) {
                var index = rangeIndex(property, min, base);
                ranges[index].count++;
            }
        });

        return ranges;
    }

    /**
    * @param {array} collection of data to operate on
    * @param {string} property to calculate with
    * @param {string} D3 time format
    * @param {extent} starting date
    # @return {array} of ranges and their counts group by date
    */
    function clusterByDate(collection, property, format, extent) {
        extent = extent || 1992;

        var parseDate = d3.time.format('%x').parse;
        var dateFormat = d3.time.format(format);
        var parsedFormat = dateFormat.parse(extent);
        var now = new Date();

        var date = {};
        if(format === '%Y') {
            for(var i = parsedFormat.getFullYear(); i <= now.getFullYear(); i++) {
                date[i.toString()] = 0;
            }
        } else {
            for(var j = dateFormat.parse(extent); j <= now; j.setMonth(j.getMonth() + 1)) {
                date[dateFormat(j)] = 0;
            }
        }

        _.each(collection, function(item) {
            if(item[property]) {
                var propertyDate = parseDate(item[property]);
                if(propertyDate >= parsedFormat) {
                    date[dateFormat(propertyDate)]++;
                }
            }
        });

        return _.reduce(date, function(o, v, k){
            o.push({
                date: k,
                count: v
            });
            return o;
        }, []);
    }
});