/**
 * Created by bschermerhorn on 11/16/15.
 */
(function () {
    var app = angular.module("whitelabel");

    app.factory("WhiteLabelWebService", function ($http, ApiParam, $window) {
        var WhiteLabelWebService = {};

        WhiteLabelWebService.getAllButEmailWhiteLabelInfo = function (orgUnitId) {
            if (!orgUnitId || isNaN(orgUnitId)) { throw "non number type passed into WhiteLabelWebService.getAllButEmailWhiteLabelInfo"; }

            return $http.get(ApiParam.baseURL() + "/v1/whitelabel/" + orgUnitId, ApiParam.headerConfig());
        };

        // accepts a new FormData object
        WhiteLabelWebService.saveAllButEmailWhitelabelSettings = function (formData) {
            var config = {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    Authorization: 'bearer ' + $window.sessionStorage.token
                }
            };

            return $http.post(ApiParam.baseURL() + "/v1/whitelabel", formData, config);
        };

        WhiteLabelWebService.getEmailTemplateInfo = function (orgUnitId,emailId) {
            if (!orgUnitId || isNaN(orgUnitId)) { throw "non number for orgUnitId passed into WhiteLabelWebService.getEmailTemplateInfo"; }
             if (!emailId || isNaN(emailId)) { throw "non number for emailId passed into WhiteLabelWebService.getEmailTemplateInfo"; }
            return $http.get(ApiParam.baseURL() + "/v1/emailtemplate/" + orgUnitId + "/" + emailId, ApiParam.headerConfig());
        };

        WhiteLabelWebService.getStyle = function(ouid) {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return $http.get(ApiParam.baseURL() + "/v1/useraccess/styleou/" + ouid, config);
        };

        WhiteLabelWebService.getDefaultStyle = function() {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return $http.get(ApiParam.baseURL() + "/v1/useraccess/style", config);
        };
		
		// saves email template data
        WhiteLabelWebService.saveEmailWhitelabelSettings = function (formData, request_type) {			
			var req = {
				method: request_type,
				url: ApiParam.baseURL() + "/v1/emailtemplate",
				headers: {
					'content-type': 'application/json',
					'Authorization': 'bearer ' + $window.sessionStorage.token
				},
				data: formData
			};
			return $http(req);
        };

        return WhiteLabelWebService;
    });

}());

