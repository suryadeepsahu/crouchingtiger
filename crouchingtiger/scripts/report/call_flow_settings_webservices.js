/**
 * Created by bschermerhorn on 1/26/16.
 */

(function () {
    var app = angular.module("callflow-report-settings-webservices", ["api-param"]);
    app.factory("CallFlowSettingsReportWebService", CallFlowSettingsReportWebService);
    function CallFlowSettingsReportWebService($rootScope, $http, ApiParam) {
        //CallFlowSettingsReportWebService = {};


        CallFlowSettingsReportWebService.getDataTableInfo = function(json) {
            //var URLParam=qs(json);
			console.log('GET DATA TABLE INFO CALLED WITH:', json);
            var URLParam = $.param(json);
            console.log ('URLParam: ', URLParam);
            //json.limit = 100;
            var encodedJSONString = encodeURIComponent(JSON.stringify(json));
            console.log(encodedJSONString);
            return $http.get(ApiParam.baseURL() + "/v1/report/callFlowSettings?" + URLParam, ApiParam.headerConfig());
        };
        CallFlowSettingsReportWebService.ivrSettings = function (routableId) {
            return $http.get(ApiParam.baseURL() + "/v1/report/ivrSettings/" + routableId, ApiParam.headerConfig());
        };

        CallFlowSettingsReportWebService.percentSettings = function (routableId) {
            return $http.get(ApiParam.baseURL() + "/v1/report/percentSettings/" + routableId, ApiParam.headerConfig());
        };

        CallFlowSettingsReportWebService.getAllOus = function () {
            return $http.get(ApiParam.baseURL() + "/v1/orgUnit/getGroupsByAccessLevel?" + "user_id=" + $rootScope.userId + "&role=" + $rootScope.roleId, ApiParam.headerConfig());
        };

        return CallFlowSettingsReportWebService;
    }
    var qs = function(obj, prefix){
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push(angular.isObject(v) ? qs(v, k) : (k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    };
}());
