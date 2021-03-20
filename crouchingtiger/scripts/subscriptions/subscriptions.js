angular.module('subscriptions', [
	    'disableAll',
        "api-param"
	])
	.factory('SubscriptionWebService', function($q, $rootScope, $http, $window, ApiParam) {
	    'use strict';
	    var SubscriptionWebService = {};

	    /* Helper function for getting default config object */
	    SubscriptionWebService.getJsonConfig = function() {
	        var config = {
		        headers: {
			        'content-type': 'application/json',
			        'Authorization': 'bearer ' + $window.sessionStorage.token
		        }
	        };
	        return config;
	    };

	    // new function to get the usages all together
	    SubscriptionWebService.getUsages = function(data) {
	        return $http({
                methods: "GET",
                url:     ApiParam.baseURL() + '/v1/billing/usage/' + data.ouId,
                headers: ApiParam.headerConfig().headers
	        });
	    };

		SubscriptionWebService.getSummary = function(ouid) {
			return $http({
				methods: "GET",
				url:     ApiParam.baseURL() + '/v1/billing/summary/' + ouid,
				headers: ApiParam.headerConfig().headers
			});
		};

		SubscriptionWebService.getBilling = function(ouid) {
			return $http({
				methods: "GET",
				url:     ApiParam.baseURL() + '/v1/billing/' + ouid,
				headers: ApiParam.headerConfig().headers
			});
		};

		SubscriptionWebService.upBilling = function(jsondata) {
			var req = {
				method:  'PUT',
				url:     ApiParam.baseURL() + "/v1/billing",
				headers: ApiParam.headerConfig().headers,
				data:    jsondata
			};
			return $http(req);
		};

	    SubscriptionWebService.getSubscriptionInformation = function(accountId) {
	        return $http.get(ApiParam.baseURL() + '/v1/zuora/getSubscriptionInformationAction/' + accountId, ApiParam.headerConfig());
	    };

	    SubscriptionWebService.getBillingHistory = function(accountId) {
	        return $http.get(ApiParam.baseURL() + '/v1/zuora/getBillingHistoryAction/' + accountId, ApiParam.headerConfig());
	    };

	    SubscriptionWebService.getInvoicePdfFile = function(urlPath) {
	        return $http({
	            method:       "GET",
	            url:          ApiParam.baseURL() + '/v1/zuora/getInvoiceFileAction/' + urlPath,
	            responseType: "arraybuffer",
	            headers: ApiParam.headerConfig().headers
	        }).success(function(data) {
		        var file = new Blob([
			        data
		        ], {
			        type: 'application/pdf'
		        });
		        var fileURL = URL.createObjectURL(file);
		        window.open(fileURL);
	        });
	    };

	    return SubscriptionWebService;
	})
    .controller('SubscriptionController', [
    '$scope', 'SubscriptionWebService', '$rootScope', '$global', function($scope, SubscriptionWebService, $rootScope, $global) {
        'use strict';

        $scope.isReadonly = ($rootScope.userAccess && $rootScope.userAccess.user < 5 ? true : false);
        $scope.zohoId = 'cp-14040';
	$scope.callTotal = 0;
        $scope.campTotal = 0;
        $scope.campActive = 0;
        $scope.trkNumTotal = 0;
        $scope.trkNumActive = 0;
        $scope.minTotal = 0;
		$scope.preNumTotal = 0;
        $scope.preNumActive = 0;
		$scope.trkNumReserved = 0;
        $scope.minPreTotal = 0;
		$scope.anaNumTotal = 0;
		$scope.usrTotal = 0;
		$scope.resNum = 0;
		$scope.showresNum=false;
		$scope.longDistanceMinutes = 0;
		$scope.longDistanceComponentIds = [932,934,936,938];
		
        $rootScope.$watch('rightbar', function(newToggleVal) {
	        //console.log('userAccess', $rootScope.userAccess);
	        if (newToggleVal) { // only process on toggle boolean being on

		        // in theory this should be enough to set the viewability of the toggle support block
		        $scope.billing_node = ($rootScope.billing_id === $rootScope.currentOUId); // set viewability of admin toggle
		        $scope.admin = ($rootScope.userAccess && $rootScope.userAccess.billing >= 7 ? true : false); // set viewability of billing info
				
		        // getUsages
		        SubscriptionWebService.getSummary($rootScope.currentOUId)
			        .success(function (result) {
						$scope.longDistanceMinutes = 0;
				        if (result.result !== 'error') {
					        $scope.allow_admin = (result.json.allow_admin === false ? result.json.allow_admin : true); // set viewability of admin toggle
					        if(result.json.billing_id !== undefined) {
					        	$scope.billing_node = (result.json.org_unit_id === result.json.billing_id ? true : false);
					        }
					        $scope.si = result.json;
							//After 15 character split the name & append ... in account name
							 if($scope.si.account_name && $scope.si.account_name.length > 20){
							 	$scope.si.account_name = $scope.si.account_name.substring(0,17) + '...';
							}
							// check for profile information included - re-format the dates
					        if ($scope.si.billing_account_id) {
						        $scope.si.activation_date = ($scope.si.activation_date ? moment($scope.si.activation_date).format('MMM D, YYYY') : 'N/A');
						        //$scope.si.billing_date = ($scope.si.billing_date ? moment($scope.si.billing_date).format('MMM D, YYYY') : 'N/A');
						        $scope.si.prev_invoice_date = ($scope.si.prev_invoice_date ? moment($scope.si.prev_invoice_date).format('MMM D, YYYY') : 'N/A');
						        $scope.si.payment_date = ($scope.si.payment_date ? moment($scope.si.payment_date).format('MMM D, YYYY') : 'N/A');
						        $scope.si.cycle_end = ($scope.si.cycle_end ? moment($scope.si.cycle_end).format('MMM D, YYYY') : 'N/A');
							}
							
							// check to set count totals
					        if (result.json.count) {
						        for (var i = 0; i < result.json.count.length; i++) {
							        var fld = result.json.count[i];
							        switch (fld.component_name) {
								        case "Calls":
								            { $scope.callTotal = fld.count_total; }
									        break;

								        case "Campaign":
									        {
										        $scope.campTotal = (parseInt(fld.count_total) + parseInt(fld.secondary_total));
										        $scope.campActive = fld.count_total;
									        }
									        break;

								        case "Numbers":
								            { $scope.trkNumActive = fld.count_total ;
									      $scope.trkNumReserved = fld.secondary_total; }
									        break;

								        case "Users":
								            { $scope.usrTotal = fld.count_total; }
									        break;

								        case "Minutes":
								            { $scope.minTotal = fld.count_total; }
									        break;

										case "Premium Numbers":
											{ $scope.preNumActive = fld.count_total;
											$scope.preNumTotal = (parseInt(fld.count_total) + parseInt(fld.secondary_total)); }
											break;

										case "Premium Minutes":
											{ $scope.minPreTotal = fld.count_total; }
											break;

										case "Analyzed Numbers":
											{$scope.anaNumTotal = (parseInt(fld.count_total) + parseInt(fld.secondary_total)); }
											break;
											
										case "Reserved Numbers":
											{
												$scope.showresNum=true;
												$scope.resNum = (parseInt(fld.count_total)); 
											}
											break;
									}
									//calculation for LDM
									if($scope.longDistanceComponentIds.indexOf(fld.component_id) > -1){
										$scope.longDistanceMinutes = $scope.longDistanceMinutes + parseFloat(fld.count_total);
									}
								}
								
						        $scope.trkNumTotal = parseInt($scope.trkNumActive) + parseInt($scope.trkNumReserved);
						        if (parseInt($scope.usrTotal) < 0) { $scope.usrTotal = 0; }
					        } else {
						        console.log('no count totals');
					        }

				        }
			        }).error(function (err) {
				        console.log('Error', err);
			        });


		        /* Changed to use information from summary call data
		        $scope.subscriptionInformation = [];
		        if ($scope.zohoId) {
			        // getSubscriptionInformation
			        SubscriptionWebService
				        .getSubscriptionInformation($scope.zohoId)
				        .success(function (result) {
					        $scope.si = result.json;
				        }).error(function (err) {
					        console.log(err);
				        });
		        }
		        */
	        }
	        /*$scope.billingHistory = [];
	        if ($scope.zohoId) {
		        // getBillingHistory
		        SubscriptionWebService.getBillingHistory($scope.zohoId)
			        .success(function (result) {
				        $scope.billingHistory = result.json;
			        }).error(function (err) {
				        console.log(err);
			        });
	        }

	        $scope.getInvoicePdfFile = function (urlPath) {
		        SubscriptionWebService.getInvoicePdfFile(urlPath);
	        };
	        */
        });


        $scope.toggleAdmin = function(allow) {
	        var jsondata = {'billing':{
		        'org_unit_id' : $rootScope.currentOUId,
		        'allow_admin' : allow
			    }
	        };

	        SubscriptionWebService.upBilling(jsondata).then(function (result) {
		        if (result.data.result !== 'error') {
			        console.log('Successfully updated access restriction');
		        } else {
			        console.log('Failed to update access restriction');
		        }
	        });
        };
    }
    ]);
