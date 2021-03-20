(function () {
    var app = angular.module("distribution_list_webservices", ["api-param"]);
    app.factory("distributionListWebservices", distributionListWebservices);
    function distributionListWebservices($rootScope, $http, ApiParam) {
      
        distributionListWebservices.getDistributionList = function () {
            return $http.get(ApiParam.baseURL() + "/v1/distributionlist/list/" + $rootScope.currentOUId, ApiParam.headerConfig());
        };
       
        distributionListWebservices.getDistributionListData = function (listId) {
            return $http.get(ApiParam.baseURL() + "/v1/distributionlist/listData/" + listId, ApiParam.headerConfig());
        };

        distributionListWebservices.addDistributionList = function (listData) {
            var req = {
                method:  'POST',
                url:     ApiParam.baseURL() + "/v1/distributionlist",
                headers: ApiParam.headerConfig().headers,
                data:    listData
            };
            return $http(req);
        };

        distributionListWebservices.updateDistributionList = function (listData) {
            var req = {
                method:  'PUT',
                url:     ApiParam.baseURL() + "/v1/distributionlist",
                headers: ApiParam.headerConfig().headers,
                data:    listData
            };
            return $http(req);
        };

        distributionListWebservices.removeDistributionList = function (listId) {
            return $http.delete(ApiParam.baseURL() + "/v1/distributionlist/" + listId, ApiParam.headerConfig());
        };

        distributionListWebservices.getcampaignAndAssignedUser = function () {
            return $http.get(ApiParam.baseURL() + "/v1/distributionlist/campaignAndAssignedUser/" + $rootScope.currentOUId, ApiParam.headerConfig());
        };

        distributionListWebservices.selectList = function () {
            return $http.get(ApiParam.baseURL() + "/v1/distributionlist/selectlist", ApiParam.headerConfig());
        };

        distributionListWebservices.getAssignedUserOfCampaign = function (campaignId) {
            return $http.get(ApiParam.baseURL() + "/v1/distributionlist/assignedUsers/" + campaignId, ApiParam.headerConfig());
        };

        distributionListWebservices.getSelectedUserOfCampaign = function (listDetails) {
            var req = {
                method:  'POST',
                url:     ApiParam.baseURL() + "/v1/distributionlist/selectedUsers",
                headers: ApiParam.headerConfig().headers,
                data:    listDetails
            };
            return $http(req);
        };

        distributionListWebservices.campaignUsers = function (campId) {
            return $http.get(ApiParam.baseURL() + "/v1/distributionlist/campaignUsers?ouid=" + $rootScope.currentOUId+"&campaignId="+campId, ApiParam.headerConfig());
        };
       return distributionListWebservices;
    }
}());
