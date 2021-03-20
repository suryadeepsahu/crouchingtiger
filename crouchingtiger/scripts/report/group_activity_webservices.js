(function () {
   var app = angular.module("group_activity_webservices", ["api-param"]);
   app.factory("GroupActivitySettingsReportWebservices", GroupActivitySettingsReportWebservices);
   function GroupActivitySettingsReportWebservices($rootScope, $http, ApiParam) {
       //CallFlowSettingsReportWebService = {};


       GroupActivitySettingsReportWebservices.groupActivitySummary = function(qryStr) {
        //  console.log('GROUP ACTIVITY SUMMARY CALL', ApiParam.baseURL() + "/v1/report/groupActivities?" + "count=true&"+qryStr , ApiParam.headerConfig());
           return $http.get(ApiParam.baseURL() + "/v1/report/groupActivities?" + "count=true&"+qryStr , ApiParam.headerConfig());
       };

       GroupActivitySettingsReportWebservices.getDataTableInfo = function (qryStr) {
        //   console.log("export:", qryStr);
          //if (exportData === undefined) { exportData = false; }
          return $http.get(ApiParam.baseURL() + "/v1/report/groupActivities?" + qryStr, ApiParam.headerConfig());
       };

       GroupActivitySettingsReportWebservices.getAllOus = function () {
            //return $http.get(ApiParam.baseURL() + "/v1/orgUnit/all", ApiParam.headerConfig());
            return $http.get(ApiParam.baseURL() + "/v1/orgUnit/getGroupsByAccessLevel?" + "user_id=" + $rootScope.userId + "&role=" + $rootScope.roleId, ApiParam.headerConfig());
        };

       return GroupActivitySettingsReportWebservices;
   }
}());
