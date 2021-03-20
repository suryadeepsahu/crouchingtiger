angular.module('theme.cf-models')
  .service('CFCallFlow', ['CFModel', function(CFModel, API_BASE_URL) {
    'use strict';
    /**
     * Creates an instance of CallFlow.
     *
     * @constructor
     * @this {CallFlow}
     */
    // return;
    var CFCallFlow = function() {
        this.url = API_BASE_URL + '/assets/demo/call_flow.json';
    };

    CFCallFlow.prototype = Object.create(Model);

    CFCallFlow.prototype.constructor = CallFlow;

    /**
     * A function called on the response object that returns the raw model data
     * This is overridden for each subclass of model for different paths to the data
     *
     * @override
     * @param {object} response The response returned from the API
     * @return {array} A list of call flow names extracted from the response
     */
    CFCallFlow.prototype.parse = function(response) {
        return response.call_flow;
    };

    /**
     * Sets up a crossfilter object on all of the model's data
     * Sets up a list of named dimensions used in the filter list to filter datasets
     */
    CFCallFlow.prototype.setupDimensions = function() {
        var crossCallFlow = crossfilter(this.all);
        var parse = this.format.parse;

        this.dimensions = {
            byCallFlowName: crossCallFlow.dimension(function(d) { return d.call_flow; }),
            byDestinationNumber: crossCallFlow.dimension(function(d) { return d.phone_number; }),
            byCallerID: crossCallFlow.dimension(function(d) { return d.source; }),
            byCallTick: crossCallFlow.dimension(function(d) { return d.call; }),
            byStartDate: crossCallFlow.dimension(function(d){
                return d.start_date ? parse(d.start_date) : null;
            }),
            byUniqueCall: crossCallFlow.dimension(function(d) { return d.unique; }),
            byAnswered: crossCallFlow.dimension(function(d){ return d.answered; }),
            byCallMinSec: crossCallFlow.dimension(function(d){ return d.call_time; }),
            byCallDuration: crossCallFlow.dimension(function(d){ return d.duration; })
        };

        this.byName = crossCallFlow.dimension(function(d) { return d.call_flow; });

        var allCallFlows = this.all;

        var duration = _.pluck(allCallFlows, 'duration');
        var startDate = _.pluck(allCallFlows, 'start_date');

        this.maxCallDuration = parseInt(_.max(duration, function(n){ return parseInt(n); }));
        this.maxStartDate = parseInt(_.max(startDate, function(n){ return parseInt(n); }));
        
    };

    /**
     * A mapping of dataset names to the exclusions used when building the dataset
     * A dataset with a value of ['byId'] will have every filter applied except the one named 'byId'
     */
    CFCallFlow.prototype.dataSets = {
        dataForCallFlowsList: ['byCallFlowName'],
        dataForDestinationNumberList: ['byDestinationNumber'],
        dataForCallerIDList: ['byCallerID'],
        dataForTotalCallsSummaryChart: ['byCallTick'],
        dataForCallVolumeByDateBarChart: ['byStartDate'],
        dataForUniquePieChart: ['byUniqueCall'],
        dataForAnsweredDonutChart: ['byAnswered'],
        dataForFoundedOnAreaChart: ['byCallMinSec'],
        dataForFundingPerRound: ['byCallDuration']
    };

    /**
    * A list of functions that filter on a single dimension
    * When building datasets every filter is applied to that dataset except what's in the exclusion list
    * Adding a new filter here will apply the filter to every dataset unless its excluded
    */
    CFCallFlow.prototype.filters = {
        byCallFlowName: function() {
            var ids = this.filterData.callflowname;

            if (ids.length > 0) {
                this.dimensions.byCallFlowName.filter(function(callflowname) {
                    return (ids.indexOf(callflowname) > -1);
                });
            }
        },
        byDestinationNumber: function() {
            var ids = this.filterData.destinationnumber;

            if (ids.length > 0) {
                this.dimensions.byDestinationNumber.filter(function(destinationnumber) {
                    return (_.intersection(destinationnumber, ids).length > 0);
                });
            }
        },
        byCallerID: function() {
            var ids = this.filterData.callerid;

            if (ids.length > 0) {
                this.dimensions.byCallerID.filter(function(callerid) {
                    return (ids.indexOf(callerid) > -1);
                });
            }
        },
        byCallTick: function() {
            var range = this.filterData.calltick;

            if (range.length > 0) {
                var self = this;
                this.dimensions.byCallTick.filter(function(calltick) {
                    return self.fallsWithinRange(calltick, range);
                });
            }
        },
        byStartDate: function() {
            var range = this.filterData.startdate;

            if (range.length > 0) {
                var self = this;
                this.dimensions.byStartDate.filter(function(startdate) {
                    return self.fallsWithinRange(startdate, range);
                });
            }
        },
        byAnswered: function() {
            var range = this.filterData.answered;

            if (range.length > 0) {
                this.dimensions.byAnswered.filter(function(answered) {
                    return (_.contains(answered, range));
                });
            }
        }
    };

    return new CFCallFlow();
}]);