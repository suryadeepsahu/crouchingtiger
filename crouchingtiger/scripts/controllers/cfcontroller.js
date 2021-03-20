angular.module('theme.cfcontroller', [])
.service('CFModel', ['$rootScope', '$http', function($rootScope, $http) {
    'use strict';
    /**
     * Creates an instance of Model.
     *
     * @constructor
     * @this {Model}
     */
    var CFModel = function() {
        this.all = [];
        this.dimensions = [];
        this.format = d3.time.format('%x');
    };

    /**
     * Fetch uses the url set on the class to $http.get a response from the API
     * We call the parse function on the response which returns a list of unfiltered data
     *
     * @return {object} A promise object?
     */
    CFModel.prototype.fetch = function() {
        var self = this;
        if (!this.url) { throw new Error('You must specify a url on the class'); }
        return $http.get(self.url).success(function(response) { self.all = self.parse(response); });
    };

    /**
     * Get object of a specified ID
     *
     * @param {string} value to lookup
     * @return {object} with associated ID
     */
    CFModel.prototype.get = function(id) {
        return _.find(this.all, function(item) {
            return item.id === id;
        });
    };

    /**
     * A function called on the response object that returns the raw model data
     * This is overridden for each subclass of model for different paths to the data
     *
     * @param {object} response The response returned from the API
     * @return {array} A list of models extracted from the response
     */
    CFModel.prototype.parse = function(response) {
        return response;
    };

    /**
     * Loop through all of the model's crossfilter dimensions and reset their filters
     */
    CFModel.prototype.resetAllDimensions = function() {
        _.each(this.dimensions, function (dimension) {
            dimension.filterAll();
        });
    };

    /**
     * Loop through the Model's dataSet hash
     * Each key/value pair corresponds to a data set name/exclusion list
     * Create and set a data list for each key/value pair in the hash
     *
     * @param {object} filterData A hash data required by the filters
     */
    CFModel.prototype.runFilters = function(filterData) {
        var self = this;
        this.filterData = filterData;
        _.each(this.dataSets, function(exclusions, setName) {
            self.resetAllDimensions();
            self.applyFilters(exclusions);
            self[setName] = self.byName.bottom(Infinity);
        });

        _.each(this.groups, function(group, groupName){
            self[groupName] = group.all();
        });
    };

    /**
     * Apply all the filters attached to the Model except those specified in exlusions
     *
     * @param {array} exclusions An array of filters we do not want to be applied to a data set
     */
    CFModel.prototype.applyFilters = function(exclusions) {
        var self = this;
        exclusions = exclusions || [];
        _.each(this.filters, function(filterFunction, filterName) {
            if(!_.contains(exclusions, filterName)) {
                filterFunction.bind(self)();
            }
        });
    };

    /**
     * Returns a count of objects in the model
     *
     * @return {number} A count of all, unfiltered, objects
     */
    CFModel.prototype.count = function() {
        return this.all.length;
    };

    /**
    * Returns whether any entry of an array of items falls within a number range.
    *
    * @param {array} list of numbers to check with
    * @param {array} a number range to check against
    * @return {boolean} whether the number list contains a value within the range
    */
    CFModel.prototype.anyItemFallsWithinRange = function(items, range) {
        if(range.length === 0) { return true; }
        if(items.length === 0) { return false; }


        for(var i = 0; i < items.length; i++) {
            if(this.fallsWithinRange(items[i], range)) {
                return true;
            }
        }

        return false;
    };
    
    /**
    * Returns whether any single item falls within a number range.
    *
    * @param {object} an item to check
    * @param {array} a number range to check against
    * @return {boolean} whether the item is within the range
    */
    CFModel.prototype.fallsWithinRange = function(item, range) {
        return item >= range[0] && item <= range[1];
    };

    return new CFModel();
}])
.service('CFCallFlow', ['CFModel', function(CFModel, API_BASE_URL) {
    'use strict';
    var CFCallFlow = function() {
        this.url = API_BASE_URL + '/assets/demo/call_flow.json';
    };

    CFCallFlow.prototype = Object.create(CFModel);

    CFCallFlow.prototype.constructor = CFCallFlow;
    return CFCallFlow;
}])
.controller('CFController', ['$scope', '$rootScope', '$location', '$q', 'CFCallFlow',
    function ($scope, $rootScope, $location, $q, CFCallFlow) {
        'use strict';
        $scope.cfcallflow = CFCallFlow;
        return $scope.cfcallflow;
/*
        $scope.shouldScroll = false;

        //ComponentData.updateDataSets();

        //Create the initial empty filter data for every filter
        $scope.filterData = {
            callflowname: [],
            destinationnumber: [],
            callerid: [],
            calltick: [],
            startdate: [],
            answered: []
        };

        $scope.selectedRanges = [];

        //Bind models to the scope, so we can use the calls in the views
        $scope.cfcallflow = CFCallFlow;

        //Fetch the data for each model, then set up its dimensions and run its filters.
        var modelCount = 0;
        var models = [CFCallFlow];
        _.each(models, function(CFModel) {
            CFModel.fetch().then(function() {
                modelCount++;
                if(modelCount === models.length) {
                    var cfcallflowname = _.indexBy(CFCallFlow.all, 'call_flow');
                    
                    if($location.search().filters) {
                        $scope.filterData = JSON.parse(decodeURIComponent($location.search().filters));
                        var toDate = function(dateString){
                            return new Date(dateString);
                        };
                        $scope.filterData.startdate = _.map($scope.filterData.startdate, toDate);
                    }

                    _.each(models, function(CFModel) {
                        CFModel.setupDimensions();
                        CFModel.runFilters($scope.filterData);
                    });
                    //ComponentData.updateDataSets();

                    $scope.initiated = true;
                    $rootScope.initiated = true;
                }
            });
        });



        //Bind component data services to the scope, so we can use them in the views
        //$scope.ComponentData = ComponentData;

        //All of our filters broadcast 'filterAction' when they've been operated on
        //When a filter receives input we set up filterData and run each model's filters
        //This should automatically update all the graph displays
        $scope.$on('filterAction', function() {
            //Analytics.event('Graphs', 'Interaction', 'Filter Action');
            var deferred = $q.defer();
            function applyFilters() {
                _.delay(function(){
                    $scope.$apply(function() {
                        $location.search({filters: encodeURIComponent(JSON.stringify($scope.filterData))});
                        CFCallFlow.runFilters($scope.filterData);
                        //ComponentData.updateDataSets();

                        deferred.resolve('Finished filters');
                    });
                }, 250);

                return deferred.promise;
            }

            $scope.loading = true;

            applyFilters().then(function(){
                $scope.loading = false;
            });
        });
*/
    }
]);