angular
.module('theme.pages-support',[])
.factory('supportWebService', function($http, ApiParam, $q, $rootScope, $window, $location) {
	'use strict';
	var supportWebService = {};


	supportWebService.sendRequest = function (data) {
		var req = {
			method  : 'POST',
			url     : ApiParam.baseURL() + "/v1/support/ticket",
			headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
			data    : data
		};
		return $http(req);
	};
	return  supportWebService;
})

.controller('supportController', ['$scope','$rootScope','$global','$window','supportWebService','pinesNotifications','$location','UserWebService', function($scope,$rootScope,$global,$window,supportWebService,pinesNotifications, $location, UserWebService) {
	'use strict';
	$global.set('fullscreen', true);

    $scope.$on('$destroy', function() {
        $global.set('fullscreen', false);
    });
  
  	$scope.email_regex = /^[_a-zA-Z0-9]*['a-zA-Z0-9]*[-a-zA-Z0-9]*[\.a-zA-Z0-9]*@[a-zA-Z0-9-]+(\.a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})*(\.[a-zA-Z]{2,4})/;

    $scope.supportRequest = {
    	email: $rootScope.userEmail
    };
    console.log($rootScope);
    $scope.sendSupportRequest = function(){
    	if($scope.supportRequest.email.trim().split(" ").length > 1){
    		pinesNotifications.notify({
				title: 'Support Form',
				text: "'Email' field is invalid.",
				type: 'error'
			});
    	}else{
	    	$scope.supportRequest.account_id = $scope.supportRequest.account_id === undefined ? "" : $scope.supportRequest.account_id;
	    	$scope.supportRequest.phone_number = $scope.supportRequest.phone_number === undefined ? "" : UserWebService.unMaskData($scope.supportRequest.phone_number.toString());
	    	supportWebService.sendRequest($scope.supportRequest).then(function(result){
	    	$scope.supportRequest = {
	    		name: " ",
		    	email: $rootScope.userEmail,
		    	message: " "
		    };
				if(result.data.status === "success"){
					pinesNotifications.notify({
						title: 'Support',
						text: "Thank You for contacting Convirza. We will get back to you soon.",
						type: 'success'
					});
				} else {
					pinesNotifications.notify({
						title: 'Support',
						text: result.data,
						type: 'error'
					});
				}
		  	});
    	}
	};
	
}]);
