angular.module('theme.report_service', [])
    .factory('ReportDataWebService', function ($rootScope, $window, $http) {
        var ReportDataWebService = {};
        ReportDataWebService.getJsonConfig = function() {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return config;
        };


        // Retrieves "daily" data by default for past 7 days
        ReportDataWebService.getDashboardData = function(ouId, sd, ed) {


            var routeToHit = [
                "/v1/report?report=home",
                "&ou_id="      + ouId,
                "&start_date=" + sd,
                "&end_date="   + ed,
                "&role="       + $rootScope.roleId
            ].join("");
            return $http.get($rootScope.url + ':' + $rootScope.port + routeToHit, this.getJsonConfig());

        };

        //userid, startdate, enddate, secondary grouping
        //TODO refactor to use report query string instead of being its own
        ReportDataWebService.getCallFlowData = function (start_date, end_date, secondary_grouping, reportName) {
          // console.log('GET CALL FLOW DATA SD', start_date);
          // console.log('GET CALL FLOW DATA ED', end_date);
          // console.log('GET CALL FLOW DATA secondary_grouping', secondary_grouping);
          // console.log('GET CALL FLOW DATA reportName', reportName);

            ///v1/report ? report=acqCallFlow & user_id=1 & grouping=ring_to_number
            var apiPointToHit = [
                //"/v1/report?report=call_flow&user_id=", $rootScope.userId, "&grouping=", (secondary_grouping || "ring_to_number"), "&start_date=", start_date, "&end_date=", end_date
                "/v1/report?report="+ reportName +"&user_id=", $rootScope.userId, "&grouping=", (secondary_grouping || "ring_to_number"), "&start_date=", start_date, "&end_date=", end_date, "&role=", $rootScope.roleId
            ].join('');
            //console.log('API ENDPOINT HIT');
            //console.log($rootScope.url + ':' + $rootScope.port + apiDataPointToHit, this.getJsonConfig());

            return $http.get($rootScope.url + ':' + $rootScope.port + apiPointToHit, this.getJsonConfig());
        };



        // For the reports to display data it needs two primary objects
        // The "Report Definition Objects" (RDO), and the aggregated data to populate the data charts

        // There is a 1:1 RDO to chart relationship where each RDO defines the characteristics of the chart object
        // Some characteristics include, which type of chart it is (bar, line, summary), what primary and secondary
        // dimension to roll up with, if it used time etc.

        ReportDataWebService.reportAggregateDataAndRDO = function(start_date, end_date, secondary_grouping, reportName) {
            console.log('GET AGGREGATED DATA SD', start_date);
            console.log('GET AGGREGATED DATA ED', end_date);
            // console.log('GET AGGREGATED DATA secondary_grouping', secondary_grouping);
            // console.log('GET AGGREGATED DATA reportName', reportName);
            // console.log('GET AGGREGATED DATA timezone', $window.sessionStorage.timezone);
            // console.log('GET AGGREGATED DATA OUID', $rootScope.currentOUId);
            // console.log('GET AGGREGATED DATA ROLE ID', $rootScope.roleId);
            // console.log('GET AGGREGATED DATA URL ROOT SCOPE', $rootScope.url);
            if(secondary_grouping === 'none') {
                secondary_grouping = '';
            } else if(secondary_grouping === 'acq_callflow') {
                secondary_grouping = 'acq_call_flow';
            }

            var apiPointToHit = [
                "/v1/report?report=", reportName,"&user_id=", $rootScope.userId, "&secondary=", secondary_grouping,
                "&start_date=", start_date, "&end_date=", end_date, "&timezone=", encodeURIComponent($window.sessionStorage.timezone), "&role=", $rootScope.roleId, "&ouid=" + $rootScope.currentOUId
            ].join('');

            // console.log('GET AGGREGATED API POINT TO HIT', apiPointToHit);

            var fullRouteToHit = $rootScope.url + ':' + $rootScope.port + apiPointToHit;
            // console.log('GET AGGREGATED FULL ROUTE TO HIT', fullRouteToHit);
            return $http.get(fullRouteToHit, this.getJsonConfig());
        };

        // temp data RDOs (should be hitting the backend point for the aggregated data, RDO etc instead of just
        // this for getting the RDO
        //ReportDataWebService.temp_campaign_rdo = function (start_date, end_date, secondary_grouping) {
        //    return $http.get("../assets/demo/campaign_report_rdo.json");
        //};
        //ReportDataWebService.temp_group_rdo = function (start_date, end_date, secondary_grouping) {
        //    return $http.get("../assets/demo/group_report_rdo.json");
        //};
        //ReportDataWebService.temp_keyword_rdo = function (start_date, end_date, secondary_grouping) {
        //    return $http.get("../assets/demo/keyword_report_rdo.json");
        //};
        //ReportDataWebService.temp_page_rdo = function (start_date, end_date, secondary_grouping) {
        //    return $http.get("../assets/demo/page_report_rdo.json");
        //};

        //ReportDataWebService.tempAugmentCFWithCampaigns = function (cfObj) {
        //
        //    // create a unique list of prov_route_ids
        //    var listOfRouteId = _.unique( _.pluck(cfObj, "provisioned_route_id") );
        //
        //    // find indices for each quarter point of array
        //    var q1End = Math.floor(listOfRouteId.length / 4  );
        //    var q2End = Math.floor(listOfRouteId.length / 2  );
        //    var q3End = Math.floor(listOfRouteId.length * 0.75);
        //
        //    // create new arrays of each quarter portion of id's
        //    var routeIdGroups = [];
        //    routeIdGroups.push(listOfRouteId.slice(0,     q1End));
        //    routeIdGroups.push(listOfRouteId.slice(q1End, q2End));
        //    routeIdGroups.push(listOfRouteId.slice(q2End, q3End));
        //    routeIdGroups.push(listOfRouteId.slice(q3End       ));
        //
        //    // map a campName to each prov_route_id according to its quarter
        //    var keyMapList = {};
        //    var campNames = ["Black Friday", "Thanksgiving Tornado", "Xmas Bash", "Halloween Honolulu"];
        //    _.each(campNames, function (name, index) {
        //        _.each(routeIdGroups[index], function (id) {
        //            keyMapList[id] = name;
        //        });
        //    });
        //
        //    // add campaign name to each object according to its previous name mapping
        //    _.each(cfObj, function (cfAggregate) {
        //        cfAggregate.campaign_name = keyMapList[cfAggregate.provisioned_route_id];
        //    });
        //
        //    // all aggregated call flow objects should now be assigned a campaign name
        //    return cfObj;
        //};

        //ReportDataWebService.tempAugmentCFWithKeywords = function(cfObj){
        //    var randomKeywordsToAssign = ["sales", "schedule", "appointment", "great", "interested",
        //        "buy", "upset", "sell", "purchase", "conversation", "contract"
        //    ];
        //
        //    _.each(cfObj, function(cfAggregate){
        //        cfAggregate.keyword = randomKeywordsToAssign[ _.random(0, 10) ];
        //    });
        //
        //    // all aggregated objects should have a random keyword assigned
        //    return cfObj;
        //
        //};


        // on the RDO, page refers to the first_page
        //ReportDataWebService.tempAugmentCFWithPages = function(cfObj){
        //    var firstPages = [ "homePage", "contactPage", "salesPage", "widgetsPage" ];
        //    var lastPages =  [ "someEndPage1", "someEndPage2", "someEndPage3", "someEndPage4" ];
        //
        //    _.each(cfObj, function (cfAggregate) {
        //        cfAggregate.page      = firstPages[ _.random(0, 3) ];
        //        cfAggregate.last_page = lastPages[ _.random(0, 3) ];
        //    });
        //
        //    return cfObj;
        //};


        return ReportDataWebService;
    });
