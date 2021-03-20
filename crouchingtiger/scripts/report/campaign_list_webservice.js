(function () {
   var app = angular.module("campaign_list_webservices", ["api-param"]);
   app.factory("CampaignListWebservices", CampaignListWebservices);
   function CampaignListWebservices($rootScope, $http, ApiParam) {
       //CallFlowSettingsReportWebService = {};
       CampaignListWebservices.getCampaigns = function (currentOUId , userAccess, timezone, page, basicFilter) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/campaign/ouid/" + currentOUId + "/userAccess/" + userAccess + "/" + encodeURIComponent(timezone) + "?page=" + page + "&filter=" + basicFilter , ApiParam.headerConfig());

        };


      CampaignListWebservices.getCampaignsCallFlowReport = function (userAccess, ouid){
        $http.defaults.useXDomain = true;
        return $http.get(ApiParam.baseURL() + "/v1/campaign/reportData/ouid/" + ouid + "/userAccess/" + userAccess + "/" + encodeURIComponent($rootScope.timezone) , ApiParam.headerConfig());
      };
       CampaignListWebservices.getCampaignsCallFlow = function(campaign_id) {
        //  console.log('GROUP ACTIVITY SUMMARY CALL', ApiParam.baseURL() + "/v1/report/groupActivities?" + "count=true&"+qryStr , ApiParam.headerConfig());
           return $http.get(ApiParam.baseURL() + "/v1/campaignCallflow?campaign_id=" + campaign_id , ApiParam.headerConfig());
       };

      CampaignListWebservices.getAllCampaignsCallFlow = function (campaignIds) {
        var req = {
            method:  'POST',
            url:     ApiParam.baseURL() + "/v1/campaignCallflow/all",
            headers: ApiParam.headerConfig().headers,
            data:    campaignIds
        };
        return $http(req);
      };

      CampaignListWebservices.removeCallFlow = function (pnumber) {
        var req = {
            method:  'PUT',
            url:     ApiParam.baseURL() + "/v1/provisionedroute/delete",
            headers: ApiParam.headerConfig().headers,
            data:    pnumber
        };
        return $http(req);
      };

      CampaignListWebservices.setCampaignStatus = function (nc) {
            var req = {
                method:  'PUT',
                url:     ApiParam.baseURL() + "/v1/campaign/status",
                headers: ApiParam.headerConfig().headers,
                data:    nc
            };
            return $http(req);
        };
        //saveBlackList
       // CampaignListWebservices.getDataTableInfo = function (qryStr) {
       //  //   console.log("export:", qryStr);
       //    //if (exportData === undefined) { exportData = false; }
       //    return $http.get(ApiParam.baseURL() + "/v1/report/groupActivities?" + qryStr, ApiParam.headerConfig());
       // };

       // CampaignListWebservices.getAllOus = function () {
       //      //return $http.get(ApiParam.baseURL() + "/v1/orgUnit/all", ApiParam.headerConfig());
       //      return $http.get(ApiParam.baseURL() + "/v1/orgUnit/getGroupsByAccessLevel?" + "user_id=" + $rootScope.userId + "&role=" + $rootScope.roleId, ApiParam.headerConfig());
       //  };

       return CampaignListWebservices;
   }
}());
