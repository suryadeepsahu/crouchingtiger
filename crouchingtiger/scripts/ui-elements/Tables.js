angular
  .module('theme.ui-tables-basic', [])
  .factory('getCampaignWebService', function($q, $timeout, $http,$window, $rootScope) {
  	'use strict';
  return {
    getCampaigns: function() {
	console.log($window.sessionStorage.token);
	 var config = {headers:  {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + $window.sessionStorage.token 
                }
            };
		$http.defaults.useXDomain = true;
	return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/campaign",config);
   }
  };
})
	.factory('locationWebService', function($q, $timeout, $http,$window, $rootScope) {
	  	'use strict';
	  	var data = [
		 	{ id: '1', location: "LogMyCalls", address: "1664 S. Dixie Dr.", city: "Saint George", state: "UT", zip: "84770", phone: "6809909123"}
		 ];
	  	return {
		    getLocations: function() {
		    	return data;
		   },
		   saveLocations: function(location) {
		   	data.push(location);
		   }
	  	};
	})   
  .controller('TablesBasicController', ['$scope', '$filter','getCampaignWebService','locationWebService','UserWebService', function ($scope, $filter,getCampaignWebService,locationWebService,UserWebService) {
  	'use strict';
  var retData;
  		getCampaignWebService.getCampaigns().then(function(result)
		{
			if(result.data.status != 'error')
			{
				console.log(result);
				//retData = result;
				var campData = [];
					for (var i=0; i< result.data.json.length; i++)
					{
						campData.push([result.data.json[i].id,result.data.json[i].name,"","",result.data.json[i].status,'Edit - Reports - Archive']);
					
					}
				   $scope.data = {
					  headings: ['Id','Name', 'Schedule', 'Call Flows', 'Status', 'Actions'],
					  rows:  campData
						// ['1', 'My First Campaign', '9am to 6pm', '4', 'Active', 'Edit - Reports - Archive'],
						// ['2', 'Another Campaign', '12pm to 4pm', '4', 'Active', 'Edit - Reports - Archive'],
						// ['3', 'Winter Campaign', '10am to 4pm', '4', 'Inactive', 'Edit - Reports - Archive']
					  
					};
			}
			else
			{
				 $scope.error = "Invalid email or password";
			}
		});

		var locations = locationWebService.getLocations();
		$scope.locations = locations;
		
		$scope.addLocation = function() {
            $scope.inserted = {
		    };
      		$scope.locations.push($scope.inserted);
        };

        $scope.saveLocation = function(data, id) {

   //      	console.log(locationWebService.getLocations());
   //          var saveData = {
			// 	"location":   data.location,
			// 	"address": data.address,
			// 	"city":  data.city,
			// 	"state":   data.state,
			// 	"zip":   data.zip,
			// 	"phone":   UserWebService.unMaskData(data.phone)
			// };	
			// if(id) { //edit existing location

			// }
		 //  	else { //new location
		 //  		locationWebService.saveLocations(saveData)
	  //       }
	    };    

        $scope.removeLocation = function(index) {
        	$scope.locations.splice(index, 1);
        };
 
  }]);
