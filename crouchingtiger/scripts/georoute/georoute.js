/*jshint loopfunc: true */
/*jshint esnext: true */

angular
    .module('georoute-builder', ['angularFileUpload', 'ngSanitize', 'ngCsv',"theme.form-directives"])

    .factory('GeoRouteWebService', function ($q, $timeout, $http, $window, $rootScope, $upload, ApiParam) {
        'use strict';
        var GeoRouteWebService = {};
        GeoRouteWebService.getLocations = function () {
            console.log($window.sessionStorage.token);
            var config = {
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/location/ouid/" + $rootScope.currentOUId+ "/" + encodeURIComponent($rootScope.timezone), config);

        };
        GeoRouteWebService.getLocationRoutes = function (id,page) {
            console.log($window.sessionStorage.token);
            var config = {
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/location/" + id  + "?page=" + page, config);

        };
        GeoRouteWebService.saveLocation = function (locdata) {
            var req = {
                method:  'POST',
                url:     $rootScope.url + ":" + $rootScope.port + "/v1/location",
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data:    locdata
            };
            return $http(req);
        };
        GeoRouteWebService.updateLocation = function (locdata) {
            var req = {
                method:  'PUT',
                url:     $rootScope.url + ":" + $rootScope.port + "/v1/location",
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data:    locdata
            };
            return $http(req);
        };
        GeoRouteWebService.deleteLocation = function (locdata) {
            var req = {
                method:  'PUT',
                url:     $rootScope.url + ":" + $rootScope.port + "/v1/location/delete",
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data:    locdata
            };
            return $http(req);
        };
        GeoRouteWebService.deleteLocationById = function (id) {
            var req = {
                method:  'DELETE',
                url:     $rootScope.url + ":" + $rootScope.port + "/v1/location/delete_location/"+id,
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
            };
            return $http(req);
        };
        GeoRouteWebService.updateLocationRoute = function (locdata) {
            var req = {
                method:  'PUT',
                url:     $rootScope.url + ":" + $rootScope.port + "/v1/locationroute",
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data:    locdata
            };
            return $http(req);
        };
        GeoRouteWebService.createLocationRoute = function (locdata) {
            var req = {
                method:  'POST',
                url:     $rootScope.url + ":" + $rootScope.port + "/v1/locationroute",
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data:    locdata
            };
            return $http(req);
        };
        GeoRouteWebService.unMaskData = function (data) {
            if (data) {
                return data.replace(/[^0-9]+/g, '');
            }
        };
        GeoRouteWebService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };
        //callflowrecording/upload
        GeoRouteWebService.uploadCSVFile = function (files, location_id) {
            var result, req;
            var lname = files[0].name;

            $rootScope.percentage = 0;
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    req = $upload.upload({
                        url:     $rootScope.url + ":" + $rootScope.port + "/v1/locationroute/import",
                        headers: {
                            'Authorization': 'bearer ' + $window.sessionStorage.token
                        },
                        fields:  {'org_unit_id': $rootScope.currentOUId, name: lname, location_id: location_id}, //"org_unit_id" : $rootScope.currentOUId,
                        file:    file,
                    }).progress(function (evt) {
                        // get upload percentage
                        console.log($rootScope);
                        $rootScope.percentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    });
                }
            }

            return req;
        };
        
        GeoRouteWebService.saveLocationIVR = function(data){
            var req = {
                method:  'POST',
                url:     $rootScope.url + ":" + $rootScope.port + "/v1/location/ivr",
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data:    data
            };
            return $http(req);
        };
        GeoRouteWebService.getLocationIvrRoutes = function (id) {
            var config = {
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/location/ivr/" + id, config);

        };
        GeoRouteWebService.deleteLocationIVR = function (locIvrRouteId) {
            var req = {
                method:  'DELETE',
                url:     $rootScope.url + ":" + $rootScope.port + "/v1/location/ivr/"+locIvrRouteId,
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
            };
            return $http(req);
        };
        GeoRouteWebService.checkLDM = function(body) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/ldm",
                headers: ApiParam.headerConfig().headers,
                data: body
            };
            return $http(req);
        };
        return GeoRouteWebService;
    })

    .filter('tel', function () {
        return function (tel) {
            if (!tel) {
                return '';
            }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    city = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country == 1) {
                country = "";
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + " (" + city + ") " + number).trim();
        };
    })


    .run(function (editableOptions) {
        editableOptions.theme = 'bs3';
    })
    .controller('GeoRouteTableController', ['$uibModal','$scope', '$http', '$filter', 'GeoRouteWebService', '$location', '$routeParams', '$rootScope',"$q", 'UserWebService', 'progressLoader','pinesNotifications','$bootbox','$route',
        function ($uibModal,$scope, $http, $filter, GeoRouteWebService, $location, $routeParams, $rootScope,$q,UserWebService,progressLoader, pinesNotifications,$bootbox,$route) {
            'use strict';
            // if ($scope.userAccess.campaign > 6)
            if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true' ){
                $scope.ivrButton = true;
            }else{
                $scope.ivrButton = false;
            }    
                $scope.canModify = true;
            $scope.fileIsUploading   = false;
            $scope.georoutelocations = [];
            $scope.dupSubmit         = false;
            $scope.dupGeoLocation    = false;
            $scope.disError          = false;
            $scope.isSaved           = false;
            $scope.disGeoError       = false;
            $scope.arrInvalid        = [];
            $scope.arrRequired       = [];
            $scope.isEdit            = false;
            $scope.disEdit           = false;
            $scope.disEditLocation   = false;
            $scope.disableAddIvrBtn  = false;
            $scope.disableDelLocation  = false;
            $scope.isLoadingApi = true;
            $scope.geoRouteHeaders   = ['Name', 'Location', 'Created', 'Modified'];
            $scope.locationHeaders   = ['Location', 'Address', 'City', 'State/Province', 'Zip/Postal Code', 'Phone','Claimed States/Provinces', 'Claimed Zip/Postal Code'];
            $scope.actionHeader      = ['Action'];
             var allStates =[];
	        var currentGeoID ='';
            $scope.triggerBoth = false;

            if($rootScope.is_migrated === false || $rootScope.is_migrated === 'false'){
                var path = $location.url().split('?');
                if($location.path() == '/set-legacy-location'){
                    location.href = '#/set-location?'+ path[1];
                }else{
                    $location.path('/set-legacy-location');
                    if($rootScope.editClickId != undefined){
                    $location.search('id',$rootScope.editClickId);
                    }
                }
            }
            $http.get('assets/demo/states_province.json').then(function(res) {
                allStates = _.pluck(res.data ,'abbr');
            });
            GeoRouteWebService.getLocations().then(function (result) {
                if (result.data.result != 'error') {
                    var locationData = result.data.json.locations;
                    locationData.forEach(function (loc) {
                        $scope.georoutelocations.push({
                            id:       loc.id,
                            name:     loc.name,
                            num_loc:  loc.count,
                            created:  (loc.created !== null) ? moment(loc.created).format("YYYY-MM-DD h:mm:ss a") : '',
                            modified: (loc.modified !== null) ? moment(loc.modified).format("YYYY-MM-DD h:mm:ss a") : ''
                        });
                    });
                    $scope.isLoadingApi = false;
                    $scope.canModify = false;
                    $scope.totalDataRows=$scope.georoutelocations.length;
                }
            });

            $scope.resizeWindow = function () {
                setTimeout(function() {
                  $(window).trigger('resize');
                }, 50);
            };

            $(window).scroll(function() {
              var yoda = window.pageYOffset;
              var scroll_position = 500;

              if(yoda > scroll_position) {
                $(window).trigger('resize');
              }
            });


//    $scope.georoutelocations.push({id:1212,name:"GeoList1",num_loc:10,created:"02/13/2015 08:12:29",modified:"02/13/2015 12:12:46"});
//    $scope.georoutelocations.push({id:1213,name:"GeoList2",num_loc:5,created:"02/13/2015 08:12:29",modified:"02/13/2015 12:12:46"});
            $scope.selectedGeoRouteList = null;
            //  $scope.fileSelected = false;
            $scope.enableSave = function() {
                $scope.disError = false;
                $scope.isSaved = false;
            };
            $scope.enableGeoSave = function() {
                $scope.disGeoError = false;
            };
            $scope.saveGeoList = function (data, id) {
                $scope.fileSelected = function () {
                    if (!$scope.files)
                        return false;
                    else
                        return true;
                };
                $scope.disEdit = true;
                var saveData = {
                    "location": {
                        "org_unit_id": $rootScope.currentOUId,
                        "name":        data.name
                    }
                };
                if (id) { //edit existing user
                    saveData = {
                        "location": {
                            "id":   id,
                            "name": data.name
                        }
                    };
                    GeoRouteWebService.updateLocation(saveData).then(function (result) {
                        if (result.data.err === '') {
                            angular.extend(data, {id: id});
                            $scope.dupGeoLocation = false;
                            GeoRouteWebService.notify({
                                title: 'Geo Location List',
                                text:  'Successfully updated location.',
                                type:  'success'
                            });

                            $scope.georoutelocations = [];
                            GeoRouteWebService.getLocations().then(function (result) {
                                if (result.data.result != 'error') {
                                    var locationData = result.data.json.locations;
                                    locationData.forEach(function (loc) {
                                        $scope.georoutelocations.push({
                                            id:       loc.id,
                                            name:     loc.name,
                                            num_loc:  loc.count,
                                            created:  (loc.created !== null) ? moment(loc.created).format("YYYY-MM-DD h:mm:ss a") : '',
                                            modified: (loc.modified !== null) ? moment(loc.modified).format("YYYY-MM-DD h:mm:ss a") : ''
                                        });
                                    });
                                }
                            });
                            $scope.disEdit = false;
                        }
                        else {
                            GeoRouteWebService.notify({
                                title: 'Geo Location List',
                                text:  result.data.err,
                                type:  'error'
                            });
                            $scope.disEdit = false;
                        }
                    });
                }
                else // it is a new location
                {
                    console.log(saveData);
                    GeoRouteWebService.saveLocation(saveData).then(function (result) {
                        if (result.data.status === 'success') {
				$scope.totalDataRows++;
                            angular.extend(data, {id: result.data.json.insertId});
                            $scope.dupGeoLocation = false;
                            GeoRouteWebService.notify({
                                title: 'Create Location',
                                text:  'Successfully added location.',
                                type:  'success'
                            });

                            $scope.georoutelocations = [];
                            GeoRouteWebService.getLocations().then(function (result) {
                                if (result.data.result != 'error') {
                                    var locationData = result.data.json.locations;
                                    locationData.forEach(function (loc) {
                                        $scope.georoutelocations.push({
                                            id:       loc.id,
                                            name:     loc.name,
                                            num_loc:  loc.count,
                                            created:  (loc.created !== null) ? moment(loc.created).format("YYYY-MM-DD h:mm:ss a") : '',
                                            modified: (loc.modified !== null) ? moment(loc.modified).format("YYYY-MM-DD h:mm:ss a") : ''
                                        });
                                    });
                                }
                            });
                            $scope.disEdit = false;
                        }
                        else {
                            $scope.disEdit = false;
                            GeoRouteWebService.notify({
                                title: 'Geo Location List',
                                text:  result.data.err,
                                type:  'error'
                            });
                        }
                    });
                }

            };

            $scope.cancelUploading = function(){
                $scope.files = '';
            };
            $scope.removeGeoList = function (index, id) {
                var ids = [];
                ids.push(id);
                var saveData = {
                    "location": {
                        "ids": ids
                    }
                };
                $bootbox.confirm("Are you sure you want to delete this list?", function (clickedOK) {
                    if (clickedOK) {
                        GeoRouteWebService.deleteLocation(saveData).then(function (result) {
                            console.log(result);
                            $scope.isEdit = false;
                            if (result.data.status === 'success') {
							$scope.totalDataRows--;
                                $scope.georoutelocations.splice(index, 1);
                                GeoRouteWebService.notify({
                                    title: 'Geo Location List',
                                    text:  'Successfully deleted the list',
                                    type:  'success'
                                });
                            } else {
                                GeoRouteWebService.notify({
                                    title: 'Geo Location List',
                                    text:  result.data.err,
                                    type:  'error'
                                });
                                $scope.error = result;
                            }
                        });
                    }
                });

            };
            $scope.cancelGeoAdd = function (index, id, rowform) {
				
                if (!id)
                    $scope.georoutelocations.splice(index, 1);
                else
                    rowform.$cancel();
                $scope.dupGeoLocation = false;
            };
            $scope.addGeoList = function () {
				$scope.totalDataRows++;
				var lastAddedGeoRoute;
                if($scope.georoutelocations.length > 0) {
                    lastAddedGeoRoute = $scope.georoutelocations[$scope.georoutelocations.length - 1];
                    if ( !lastAddedGeoRoute.name) {
                        GeoRouteWebService.notify({
                            title: "Add GeoRoute",
                            text:  "You must save the current Georoute List before adding another.",
                            type:  "warning"
                        });
                        $scope.dupGeoLocation = true;
                        return;
                    }
                }
                $scope.inserted = {
                    name: ''
                };
                $scope.georoutelocations.push($scope.inserted);
            };

            $scope.ok = function (){
                $scope.isEdit = false;
            };
              $scope.pageChanged = function(newPage) {
                 $scope.currentPage = newPage;
                 getLocationsForID (currentGeoID, $scope.currentPage);
            }; 

            // this is for the locations of each geoList
            $scope.editGeoLocations = function (index, geoid) {
                $scope.geoIndex = index;
                $scope.geoid = geoid;
                $scope.isEdit = true;
                $scope.dupSubmit = false;
                $scope.selectedGeoRouteList = geoid;
                currentGeoID = geoid;
                $scope.locations = [];
                $scope.files = '';
               $scope.currentPage = 1;
               getLocationsForID (geoid, $scope.currentPage);
                /*GeoRouteWebService.getLocationRoutes(geoid, $scope.currentPage).then(function (result) {
                    if (result.data.result != 'error') {
                        $scope.locations = [];
                        var locationData = result.data.json.locations[0].routes;
                        $scope.totalDataRows = result.data.json.totalRows;
                        locationData.forEach(function (loc) {
                            $scope.locations.push({
                                id:       loc.id,
                                location_ivr_route_id: loc.location_ivr_route_id,
                                location: loc.location,
                                address:  loc.address,
                                city:     loc.city,
                                state:    loc.state,
                                zip:      loc.zip,
                                phone:    loc.target,
                                claimed:  loc.claimed_zip,
                                clamiedStates: loc.clamied_states,
                                ivr_status: 'old'
                            });
                        });
                    }
				setTimeout(function () {
                    $('html, body').animate({
                        scrollTop: ($("#locationeditor").offset().top) - 50
                    }, 1000);
                }, 100);
                });
*/
                $scope.headerName = $scope.georoutelocations[index].name;
                $scope.currentLocationid = $scope.georoutelocations[index].id;
                if ($scope.locations.length < 1) {
                    $scope.inserted = {
                        id:       '',
                        location: '',
                        address:  '',
                        city:     '',
                        state:    '',
                        zip:      '',
                        phone:    '',
                        claimed:  ''
                    };
                    // $scope.locations.push($scope.inserted);
                }
            };
            var getLocationsForID = function(geoid, currentPage){
                 $scope.isLoadingApi = true;
                GeoRouteWebService.getLocationRoutes(geoid, currentPage).then(function (result) {
                    if (result.data.result != 'error') {
                        $scope.locations = [];
                        var locationData = result.data.json.locations[0].routes;
                        $scope.totalDataRows = result.data.json.totalRows;
                        locationData.forEach(function (loc) {
                            $scope.locations.push({
                                id:       loc.id,
                                location_ivr_route_id: loc.location_ivr_route_id,
                                location: loc.location,
                                address:  loc.address,
                                city:     loc.city,
                                state:    loc.state,
                                zip:      loc.zip,
                                phone:    loc.target,
                                claimed:  loc.claimed_zip,
                                clamiedStates: loc.clamied_states,
                                ivr_status: 'old'
                            });
                        });
                    }  
                      $scope.isLoadingApi = false;
                setTimeout(function () {
                    $('html, body').animate({
                        scrollTop: ($("#locationeditor").offset().top) - 50
                    }, 1000);
                }, 100);
                });

            };
            
            $scope.removeNewLocation = function(rowform) {
                var lastAddedLocation = $scope.locations[$scope.locations.length - 1];
                var lastAddedLocationIndex = $scope.locations.length - 1;
                if(!lastAddedLocation.address || !lastAddedLocation.city || !lastAddedLocation.state || !lastAddedLocation.zip){
                    $scope.cancellocationAdd(lastAddedLocationIndex, null, rowform);
                }
            };

            $scope.addLocation = function () {
                $scope.search = undefined;
                if($scope.locations.length > 0) {
                    var lastAddedLocation;
                    lastAddedLocation = $scope.locations[$scope.locations.length - 1];
                    if ( !lastAddedLocation.address || !lastAddedLocation.city || !lastAddedLocation.state || !lastAddedLocation.zip) {
                        GeoRouteWebService.notify({
                            title: "Add Location",
                            text:  "You must save the current location before adding another.",
                            type:  "warning"
                        });
                        $scope.dupSubmit = true;
                        return;
                    }
                }
                $scope.inserted = {
                    // id:$scope.locations.length+1,
                    location: '',
                    address:  '',
                    city:     '',
                    state:    '',
                    zip:      '',
                    phone:    '',
                    claimed:  '',
                    clamiedStates: ''
                };
                $scope.locations.push($scope.inserted);
            };
            $scope.locIVROptions=function (locId,locIvrRouteId,locName) {
                var locIVRmodal = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: './views/location-ivr-model.html',
                    controller: 'LocationIvrModelController',
                    scope: $scope,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'xlg',
                    resolve: {
                        locId: function () {
                            return locId;
                        },
                        locName:function () {
                            return locName;
                        },
                        locIvrRouteId:function(){
                            return locIvrRouteId;
                        },
                        geoid:function(){
                            return $scope.geoid;
                        }
                    }
                });
            };

            $scope.getLocationRoutesOnReq=function(geoid){
                GeoRouteWebService.getLocationRoutes(geoid,$scope.currentPage).then(function (result) {
                    if (result.data.status != 'error') {
                        $scope.locations = [];
                        var locationData = result.data.json.locations[0].routes;
                        locationData.forEach(function (loc) {
                            $scope.locations.push({
                                id:       loc.id,
                                location_ivr_route_id: loc.location_ivr_route_id,
                                location: loc.location,
                                address:  loc.address,
                                city:     loc.city,
                                state:    loc.state,
                                zip:      loc.zip,
                                phone:    loc.target,
                                clamiedStates: loc.clamied_states,
                                claimed:  loc.claimed_zip
                            });
                        });
                    }
                });
            };
            var validateClaimedStates = function(data){
                data = ( data === undefined ) ? '' : data ;
                var  valid = true;
                if(data !== '' ){
                    var allClaimedStates = data.replace(/\s/g, "").split(",");
                    for (var i = allClaimedStates.length - 1; i >= 0; i--) {
                        var STATE_REGEXP = /(^[A-Za-z]+$)/;
                        if(!STATE_REGEXP.test(allClaimedStates[i])){
                            i = 0;
                            valid = false; 
                        }
                        if(allClaimedStates[i] && allClaimedStates[i].length !== 2  ){
                            i = 0;
                            valid = false;
                        }
                    }
                    if(!valid){
                        GeoRouteWebService.notify({
                            title: 'Location Editor',
                            text:  'Please enter Claimed State/Province in 2 letter abbreviated form',
                            type:  'error'
                        });
                    return valid;
                    }else{
			// checking for json validation
                        var invalidStates=[];
                        _.each(allClaimedStates,function(state){
                            if(!_.contains(allStates,state.toUpperCase())){
                                invalidStates.push(state);
                            }
                        });
                        if(invalidStates.length > 0){
                            var msglastpart = invalidStates.length == 1 ? ' in "Claimed States/Provinces" is invalid':' in "Claimed States/Provinces" are invalid';
                            GeoRouteWebService.notify({ 
                                title: 'Location Editor',
                                text:  invalidStates.toString() + msglastpart,
                                type:  'error'
                            });
                            return false;
                        }else{
                            return true;
                        }
                    }
                    
                }else{
                     return valid;
                }
            };
            $scope.saveLocation = function (data, id, location_ivr_route_id, rowform) {
                GeoRouteWebService.checkLDM({trackingNumber: '', ringToNumbers: [GeoRouteWebService.unMaskData(data.phone)]}).then(function(res) {
					if(res.data.isLDM) {
						var msg = "The ring to number you have selected belongs to " + res.data.rateCenter + " rate center. " + 
						"If a call is answered on this number, the minutes would be charged as long distance minutes. Click OK to continue.";
						$bootbox.confirm(msg, function(result) {
							if(result === true) $scope.saveLocation_(data, id, location_ivr_route_id, rowform);
						});
					} else {
                        $scope.saveLocation_(data, id, location_ivr_route_id, rowform);
                    }
                });
            };
            $scope.saveLocation_ = function (data, id, location_ivr_route_id, rowform) {
                $scope.isSaved =true;
                $scope.dupSubmit = true;
                var phone_val = GeoRouteWebService.unMaskData(data.phone);
                
                if(data.clamiedStates[data.clamiedStates.length -1] == ","){
                    data.clamiedStates = data.clamiedStates.substr(0, data.clamiedStates.length -1);
                }
                
                if(validateClaimedStates(data.clamiedStates)){
                    
                    // Check duplicate Claimed Zip
                    var zip = data.claimed;
                    var zipArr = zip.split(',');
                    var zipDuplicate = false;
                    $scope.claimedInvalid = [];
                    console.log(zipArr);
                    if(data.claimed !== ""){
                        _.each(zipArr,function(zipArr){
                            var CLAIMED_REGEXP = /^[0-9][0-9][0-9][0-9][0-9]$/;
                            console.log(zipArr);
                            if (!CLAIMED_REGEXP.test(zipArr)) {
                                $scope.claimedInvalid.push(zipArr);
                            }
                        });
                    }
                    for(var i=0;i<zipArr.length;i++){
                        var temp = zipArr[i];
                        var tempArr = zipArr;
                        tempArr.splice(i, 1);
                        for(var j=0;j<tempArr.length;j++){
                            if(tempArr[j] == temp){
                                zipDuplicate = true;
                            }
                        }
                    }
                    if($scope.claimedInvalid.length > 0){
                        setTimeout(function () {
                            rowform.$show();
                        }, 100);
                        GeoRouteWebService.notify({
                            title: 'Geo route',
                            text:  'Entered Claimed ZipCode is invalid.',
                            type:  'error'
                        }); 
                        return;  
                    }
                    if(zipDuplicate){
                        setTimeout(function () {
                            rowform.$show();
                        }, 100);
                        GeoRouteWebService.notify({
                            title: 'Geo route',
                            text:  'Please enter unique Claimed Zip',
                            type:  'error'
                        }); 
                        return;
                    }
                    if(data.state)
                    { 
                        if(!_.contains(allStates,data.state.toUpperCase())){
                            GeoRouteWebService.notify({
                                title: 'Location Editor',
                                text:  data.state +' in "State/Province" is invalid',
                                type:  'error'
                            }); 
                                setTimeout(function () {
                                rowform.$show();
                            }, 100);
                        return;
                            }
                       
                    }
                $scope.disEditLocation = true;
                $scope.disableAddIvrBtn  = true;
				$scope.disableDelLocation  = true;
                if(data.clamiedStates === undefined){
                    data.clamiedStates = "";
                }
				var claimedStates = data.clamiedStates.replace(/\s+/g, '');
				    claimedStates = claimedStates.split(',');
					claimedStates = claimedStates.map(function(x){ return x.toUpperCase(); });

					claimedStates = claimedStates.filter(function(elem, index, self) {
					return index === self.indexOf(elem);
				});
                if (id) { //edit existing locationroute
                    var did = id;
                    var saveData = {
                        "location_route": {
                            id:          did,
                            location:    data.location,
                            address:     data.address,
                            city:        data.city,
                            state:       data.state,
                            zip:         data.zip,
                            phone:       phone_val,
                            location_ivr_route_id: location_ivr_route_id,
                            claimed_states: claimedStates.toString(),
                            claimed_zip: data.claimed,
                            location_id: $scope.currentLocationid
                        }
                    };
                    console.log(JSON.stringify(saveData));
                    GeoRouteWebService.updateLocationRoute(saveData).then(function (result) {
                        $scope.disEditLocation = false;
                        $scope.disableAddIvrBtn  = false;
                        $scope.disableDelLocation  = false;
                        var messageText;
                        if (result.data.status === 'success') {
                            messageText = 'added';
                            if(id) {
                                messageText = 'updated';
                        }
                            GeoRouteWebService.notify({
                                title: 'Geo Location',
                                text:  'Successfully updated the location',
                                type:  'success'
                            });
                            $scope.dupSubmit = false;
                            $scope.getLocationRoutesOnReq($scope.geoid);
                            $scope.isSaved =false;
                        } else {
                            setTimeout(function () {
                            	rowform.$show();
                            }, 100);
                            GeoRouteWebService.notify({
                                title: 'Geo Location',
                                text:  _.isObject(result.data.err) ? result.data.err[0].location_route[0].errors[0] : result.data.err,
                                type:  'error'
                            });
                            $scope.error = result;
                        }
                    });
                }
                else { //new locationroute

                    var newData = {
                        "location_route": {

                            location:    data.location,
                            address:     data.address,
                            city:        data.city,
                            state:       data.state,
                            zip:         data.zip,
                            phone:       phone_val,
                            claimed_states: claimedStates.toString(),
                            claimed_zip: data.claimed,
                            location_id: $scope.currentLocationid
                        }
                    };
                    console.log(JSON.stringify(newData));
                    GeoRouteWebService.createLocationRoute(newData).then(function (result) {
                        $scope.disEditLocation = false;
                        $scope.disableAddIvrBtn  = false;
                        $scope.disableDelLocation  = false;
                        if (result.data.status === 'success') {
                            GeoRouteWebService.notify({
                                title: 'Geo Location',
                                text:  'Successfully created location',
                                type:  'success'
                            });
                            $scope.dupSubmit = false;
                                    $scope.georoutelocations = [];
                                    GeoRouteWebService.getLocations().then(function (result) {
                                        if (result.data.result != 'error') {
                                            var locationData = result.data.json.locations;
                                            locationData.forEach(function (loc) {
                                                $scope.georoutelocations.push({
                                                    id:       loc.id,
                                                    name:     loc.name,
                                                    num_loc:  loc.count,
                                                    created:  (loc.created !== null) ? moment(loc.created).format("YYYY-MM-DD h:mm:ss a") : '',
                                                    modified: (loc.modified !== null) ? moment(loc.modified).format("YYYY-MM-DD h:mm:ss a") : ''
                                                });
                                            });
                                }

                                    });
                            GeoRouteWebService.getLocationRoutes($scope.currentLocationid, $scope.currentPage).then(function (result) {
                                if (result.data.status != 'error') {
                                    var locationData = result.data.json.locations[0].routes;
                                    $scope.locations = [];
                                    locationData.forEach(function (loc) {
                                        $scope.locations.push({
                                            id:       loc.id,
                                            location_ivr_route_id: loc.location_ivr_route_id,
                                            location: loc.location,
                                            address:  loc.address,
                                            city:     loc.city,
                                            state:    loc.state,
                                            zip:      loc.zip,
                                            phone:    loc.target,
                                            claimed:  loc.claimed_zip,
                                            clamiedStates : loc.claimed_states,

                                        });
                                        $scope.isSaved =false;
                                    });
                            	}
                            });
                            $scope.getLocationRoutesOnReq($scope.geoid);
                        }
                        else {
                            setTimeout(function () {
                                rowform.$show();
                            }, 100);
                            GeoRouteWebService.notify({
                                title: 'Geo Location',
                                text:  _.isObject(result.data.err) ? result.data.err[0].location_route[0].errors[0] : result.data.err,
                                type:  'error'
                            });
                        }
                        });
                    }
                }else{
                     setTimeout(function () {
                                    rowform.$show();
                                }, 1000);
                     
                }

            };
            $scope.cancellocationAdd = function (index, id, rowform) {
                if (!id)
                    $scope.locations.splice(index, 1);
                else
                    rowform.$cancel();
                    $scope.dupSubmit = false;
                //$scope.getLocationRoutesOnReq($scope.geoid);
                $scope.$dismiss();
            };
            $scope.removeLocation = function (index, id) {
                if(id) {
                    $bootbox.confirm("Are you sure you want to delete this location?", function (clickedOK) {
                        if (clickedOK) {
                            GeoRouteWebService.deleteLocationById(id).then(function(result) {
                                if(result.data.status === 'success'){
                                    $scope.georoutelocations = [];
                                     GeoRouteWebService.getLocations().then(function (result) {
                                        if (result.data.result != 'error') {
                                            var locationData = result.data.json.locations;
                                            locationData.forEach(function (loc) {
                                                $scope.georoutelocations.push({
                                                    id:       loc.id,
                                                    name:     loc.name,
                                                    num_loc:  loc.count,
                                                    created:  loc.created,
                                                    modified: loc.modified
                                                });
                                            });
                                        }
                                    });
                                    GeoRouteWebService.notify({
                                        title: 'Location Editor',
                                        text:  'Location Deleted successfully.',
                                        type:  'success'
                                    });
                                    $scope.locations.splice(index, 1);
                                } else {
                                    GeoRouteWebService.notify({
                                        title: 'Location Editor',
                                        text:  result.data.err,
                                        type:  'error'
                                    });
                                }
                            });
                        }
                    });
                }
            };
            //validate blank data before save.
            $scope.validateData = function (data, name) {
                var messageText;

                if (!data) {
                    $scope.arrRequired.push(name);
                    if (name === 'Geolocation') {
                        GeoRouteWebService.notify({
                            title: 'Geo Route',
                            text:  'Name field is required.',
                            type:  'error'
                        });
                        $scope.disGeoError = true;
                        return ' ';
                    } else if (name !== 'Phone') {
                        return '  ';
                    }
                }

                if(name === 'State') {
                    if(data.length < 2) {
                        $scope.arrInvalid.push('State');
                        return ' ';
                    }

                    var STATE_REGEXP = /(^[A-Za-z]+$)/;
                    if (!STATE_REGEXP.test(data)) {
                        $scope.arrInvalid.push(name);
                        return ' ';
                    }
                }

                if (name === 'Zip') {
                    //var ZIP_REGEXP = /(^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$)|(^\d{5}(-\d{4})?$)/;
                    var ZIP_REGEXP = /^[a-z0-9 ]+$/i;
                    if (!ZIP_REGEXP.test(data)) {
                        $scope.arrInvalid.push('Zip');
                        return '  ';
                    }else if(_.uniq(data.split("")).length === 1 && _.uniq(data.split(""))[0] === "0"){
                        $scope.arrInvalid.push('Zip');
                        return '  ';
                    }
                }
                if (name === 'Phone') {
                    var zipExist;
                    if ($scope.arrRequired.length) {
                        messageText = 'field is required.';
                        if ($scope.arrRequired.length > 1) {
                            messageText = 'fields are required.';
                        }
                        GeoRouteWebService.notify({
                            title: 'Location Editor',
                            text:  '\'' + $scope.arrRequired.join(', ') + '\' ' + messageText,
                            type:  'error'
                        });
                        $scope.disError = true;
                        zipExist = $scope.arrRequired.indexOf("Phone");
                        $scope.arrInvalid = [];
                        $scope.arrRequired = [];
                        if (zipExist > 0) {
                            return '   ';
                        } else {
                            return '';
                        }
                    }
                    var phone = GeoRouteWebService.unMaskData(data);
                    if (phone.length < 10) {
                        $scope.arrInvalid.push('Phone');
                    }else{
                        var longDistanceMins = {
                            "Alaska": ["907", "250"]
                        };

                        _.each(longDistanceMins, function(npas, rateCenter){
                            if(npas.indexOf(phone.substring(0,3)) > -1){
                                GeoRouteWebService.notify({
                                    title: 'Location Editor',
                                    text: "You are using " + rateCenter + " rate center. If a call is answered on this number, the minutes would be charged as long distance minutes.",
                                    type: 'info'
                                });
                            }
                        });
                    }

                    if ($scope.arrInvalid.length) {
                        messageText = 'field is invalid.';
                        if ($scope.arrInvalid.length > 1) {
                            messageText = 'fields are invalid.';
                        }
                        GeoRouteWebService.notify({
                            title: 'Location Editor',
                            text:  '\'' + $scope.arrInvalid.join(', ') + '\' ' + messageText,
                            type:  'error'
                        });
                        $scope.disError = true;
                        zipExist = $scope.arrInvalid.indexOf("Phone");
                        $scope.arrRequired = [];
                        $scope.arrInvalid = [];
                        if (zipExist > -1) {
                            return '   ';
                        }
                        else {
                            return '';
                        }
                    } else {
                        $scope.dupSubmit = false;
                        $scope.dupGeoLocation = false;
                    }
                }
            };

            $scope.validateClaimedZip = function(data) {
                var arrInvalid = [];
                if(data) {
                    var arrZip = data.split(',');
                    _.each(arrZip, function(zip, key) {
                        if( zip.length < 5 || isNaN(zip) || zip.length > 5 ) {
                            arrInvalid.push(zip);
                        }
                    });
                    if(arrInvalid.length > 0 ){
                        var messageText = 'is invalid Zip/Postal Code.';

                        if (arrInvalid.length > 1) {
                            messageText = 'are invalid Zip/Postal Code.';
                        }

                        GeoRouteWebService.notify({
                            title: 'Geo Location',
                            text:  '\'' + arrInvalid.join(', ') + '\' ' + messageText,
                            type:  'error'
                        });
                        return ' ';
                    }
                }
            };
            $scope.getHeader = function () { return ["Location (Required)", "Address (Required)", "City (Required)", "State/Province (Required)", "Zip/Postal Code (Required)", "10-Digit Phone (Required)","Claimed States/Province (Optional)" , "Claimed Zip (Optional)"]; };
            $scope.getExportHeader = function () { return  ["Location (Required)", "Address (Required)", "City (Required)", "State/Province (Required)", "Zip/Postal Code (Required)", "10-Digit Phone (Required)","Claimed States/Province (Optional)", "Claimed Zip (Optional)"]; };
           //            $scope.getExportHeader = function () { return ["Location", "Address", "City", "State/Province", "Zip/Postal Code", "Phone", "Claimed Zip"]; };
            $scope.downloadTemplate = function () {
                console.log("inside downloadTemplate");
                var templateData = [{
                    a: "your address location",
                    b: "address",
                    c: "city",
                    d: "state",
                    e: "zip",
                    f: "##########",
                    g: "[##,##,##,##,##]",
                    h: "[#####,#####]"
                }, {
                    a: "your address location",
                    b: "address",
                    c: "city",
                    d: "state",
                    e: "zip",
                    f: "##########",
                    g: "[##,##,##,##,##]",
                    h: "[#####,#####]"
                }];

				// if there is existing location data availble then instead of focal data get actual data to rplace
               /* if($scope.locations.length > 0) {
                    templateData = [];
                    $scope.locations.forEach(function (location) {
                        templateData.push({
                            a: location.location,
                            b: location.address,
                            c: location.city,
                            d: location.state,
                            e: location.zip,
                            f: location.phone,
                            g: "[" + location.clamiedStates + "]",
                            h: "[" + location.claimed + "]"
                        });
                    });
                }*/
                return templateData;
            };

            $scope.downloadGeoData = function () {
                //console.log("inside downloadTemplate");
                 //console.log($scope.triggerBoth);
                if (!$scope.triggerBoth)
                    pinesNotifications.notify({
                        title: 'Export Users',
                        text: "Download is in process, it will be completed in few minutes",
                        type: 'info'
                    });
                $scope.triggerBoth = false;
                var formate = "csv";
                 progressLoader.start();
                $scope.usersReportFileName =  $scope.headerName  + "." + formate;
                var geoData = [];
                 var deferred = $q.defer();
                var myRedObjects =[];// $filter('filter')($scope.locations, $scope.search);
                 GeoRouteWebService.getLocationRoutes(currentGeoID, 0).then(function (result) {
                    if (result.data.result != 'error') {
                        var locationData = result.data.json.locations[0].routes;
                        $scope.totalDataRows = result.data.json.totalRows;
                        locationData.forEach(function (loc) {
                           myRedObjects.push({
                                id:       loc.id,
                                location_ivr_route_id: loc.location_ivr_route_id,
                                location: loc.location,
                                address:  loc.address,
                                city:     loc.city,
                                state:    loc.state,
                                zip:      loc.zip,
                                phone:    loc.target,
                                claimed:  loc.claimed_zip,
                                clamiedStates: loc.clamied_states,
                                ivr_status: 'old'
                            });
                        });
                    }  
                for (var i = 0; i < myRedObjects.length; i++) {
                    if(myRedObjects[i].location && myRedObjects[i].location!==undefined && myRedObjects[i].location !== "" && myRedObjects[i].location !== null){
                        geoData.push({
                            a: myRedObjects[i].location,
                            b: myRedObjects[i].address,
                            c: myRedObjects[i].city,
                            d: myRedObjects[i].state,
                            e: myRedObjects[i].zip,
                            f: myRedObjects[i].phone,
                            g: "[" + myRedObjects[i].clamiedStates + "]",
                            h: "[" + myRedObjects[i].claimed + "]"
                        });
                    }
                }
                progressLoader.set(50);
                    deferred.resolve(geoData);

                    if ($rootScope.isSafari) {
                        deferred.resolve(JSONToCSVConvertor(geoData,  $scope.headerName , true, formate));
                    } else {
                        progressLoader.end();
                        return deferred.promise;
                    }
                });
                 

                    if (!$rootScope.isSafari) {
                        progressLoader.end();
                        return deferred.promise;
                    }
               // return geoData;
            };
            $scope.uploadFile = function (file) {
                var errors;
                var error_string;
                console.log(file);
                var extension = file[0].name.substring(file[0].name.lastIndexOf('.')+1);
                console.log(extension);
                if(extension.toUpperCase() === "CSV")
                {
                $scope.fileIsUploading = true;
                GeoRouteWebService.uploadCSVFile(file, $scope.currentLocationid).then(function (result) {
                    $scope.fileIsUploading = false;
                    if (result.data.status != 'error') {
                        $route.reload();
                        GeoRouteWebService.notify({
                            title: 'Geo Location',
                            text:  "Locations uploaded successfully",
                            type:  'success'
                        });
                    }
                    else {
                        if (!Array.isArray(result.data.err)){
                             error_string = result.data.err.err ? result.data.err.err : result.data.err;
                        } else {
                            if(result.data.err[0].other_params){
                            errors = result.data.err[0].other_params;
                            error_string = errors[0].errors;
                        }else if(result.data.err[0][0].location_route !== undefined){
                            errors = result.data.err[0][0].location_route;
                            error_string = "";
                            var temp_data = [];

                            for(var i = 0; i < errors.length; i++){
                                if(!angular.isUndefined(errors[i].missing_params)){
                                    error_string = errors[i].missing_params.join(",") + " is required";
                                }else if(!angular.isUndefined(errors[i].errors)){
                                    error_string = error_string + "," + errors[i].errors.join(",");
                                }
                            }
                        }else{
                            error_string = result.data.err[0];
                            }                            
                        }
                        $scope.files = '';
                        // $scope.fileIsUploading = true;
                        setTimeout(function () {
                            GeoRouteWebService.notify({
                                title: 'Geo Location',
                                text:  "Error in uploading file: " + error_string,
                                type:  'error'
                            });
                        }, 1000);
                       
                        $scope.error = "Invalid email or password";
                    }

                });
                }
                else
                {
                    GeoRouteWebService.notify({
                        title: 'Geo Location',
                        text:  "File extension must be a CSV extension",
                        type:  'error'
                    });
                    $scope.error = "Invalid email or password";
                }
            };

        }])
    .controller('LocationIvrModelController', ['$uibModal','$scope', '$window', '$filter', 'GeoRouteWebService', '$location', '$routeParams', '$rootScope', 'UserWebService', 'pinesNotifications','$bootbox','$route','locId','locIvrRouteId','locName','geoid',"CampaignWebService", "VoicePromptService",'WhisperMessageService',
        function ($uibModal, $scope, $window, $filter, GeoRouteWebService, $location, $routeParams, $rootScope, UserWebService, pinesNotifications,$bootbox,$route,locId,locIvrRouteId,locName,geoid, CampaignWebService , voicepromptService,whispermessageService) {
        'use strict';
        if ($scope.userAccess.voicemail === undefined || $scope.userAccess.voicemail < 4) {
            $scope.voicemailComponent = false;
        } else {
            $scope.voicemailComponent = true;
        }
        $scope.selectedCallFlow = {};
        $scope.cAction={};
        $scope.ivrActions = [];
        $scope.locName=locName;
        $scope.locIvrRouteId=locIvrRouteId;
        $scope.canModify = false;
        $scope.TTSIVRSelected = true;
        $scope.selectedCallFlow.activateVoiceMail = false;
        var message_type = "";
        var message = "";
        $scope.overflow = "3";
        $scope.defaultsRings = 3;
        $scope.selectedCallFlow.Overflow = "3";
        $scope.hasValidTTSVoiceURL = false;
        var j =0;
        var filename ="";
        $scope.multlevelivr = {
            ivr : {
                // ivr : {
                //     ivr : {}
                // }
            }
        };
        if ($scope.promptAudio !== undefined)
        $scope.promptAudio.pause();
        if ($scope.ivrAudio !== undefined)
            $scope.ivrAudio.pause();
        if ($scope.ivrAudio1 !== undefined)
            $scope.ivrAudio1.pause();    
        if ($scope.whisperAudio !== undefined)
            $scope.whisperAudio.pause();
        if ($scope.greetingAudio !== undefined)
            $scope.greetingAudio.pause();
        if ($scope.calloutcomeAudio !== undefined)
            $scope.calloutcomeAudio.pause();
        if ($scope.agentidAudio !== undefined)
            $scope.agentidAudio.pause();
        if ($scope.saleAudio !== undefined)
            $scope.saleAudio.pause();
        if ($scope.leadAudio !== undefined)
            $scope.leadAudio.pause();

        $scope.disablePlayBtn = function($event){
                var allBtn = $('.playpadding').not(this);
                var thisElm = $event.currentTarget;
                var icon = thisElm.children[0];
                icon.classList.add("fa-pause");
                var checkClass = setInterval(function(){ 
                    var elm = icon.classList.contains("fa-pause");
                    //thisElm.classList.contains('fa-pause');
                    if(elm){
                            allBtn.each(function(i, obj) {
                                if (obj.disabled === false){
                                    obj.classList.add("customDisabled");
                                }
                            });
                            thisElm.classList.remove("customDisabled");
                        }else{
                            allBtn.removeClass("customDisabled");
                            clearInterval(checkClass);
                        }
                    }, 100);
            };
            $scope.pauseCurrentPlayingAudio = function(){
                $rootScope.$emit("stopIvrAudios", {});
            };
    
            $rootScope.$on("stopIvrAudios", function(){
                if($scope.ivrAudio){
                    $scope.ivrAudio.pause();  
                }
                if($scope.ivrAudio1)
                {
                    $scope.ivrAudio1.pause();
                }
                if($scope.whisperAudio){
                    $scope.whisperAudio.pause();
                }
             });
        // $scope.ivrActions = [{
        //     action_order: 1,
        //     voicepromptText : "",
        //     voicepromptFileName : "",
        //     voicepromptURL : "",
        //     voicepromptId : "",
        //     TTSIVRSelected : true,
        //     hasValidTTSVoiceURL : "",
        //     voicepromptTTSText : "",
        //     action: 'simple',
        //     message_type: message_type,
        //     message:message,
        //     ringtonum: "",
        //     overflowNumbers :[{overflowNumber:'',rings: $scope.overflow, overflow_order: 1}],
        //     openOverflowBox :false,
        //     isSimultaneousRing :false,
        //     geoRoute: {
        //         routeBy:"",
        //         geoList:"",
        //         radius:""
        //     },
        //     back_press:"",
        //     whisperPrompt : false,
        //     TTSWhisperSelected: true,
        //     whisperTTSText: '',
        //     hasValidWhisperURL: '',
        //     whisperURL:''
        // }];
        $scope.ivrActions = [{
            id: 1,
            action_order: 1,
            voicepromptText : "",
            voicepromptFileName : "",
            voicepromptURL : "",
            voicepromptId : "",
            TTSIVRSelected : true,
            hasValidTTSVoiceURL : "",
            voicepromptTTSText : "",
            action: 'simple',
            message_type: message_type,
            message:message,
            ringtoNum: "",
            recordCall: false,
            playDisclaimer: 'before',
            overflowNumbers :[{overflowNumber:'',rings: $scope.overflow, overflow_order: 1}],
            openOverflowBox :false,
            isSimultaneousRing :false,
            geoRoute: {
                routeBy:"",
                geoList:"",
                radius:""
            },
            back_press:"",
            whisperPrompt : false,
            TTSWhisperSelected: true,
            whisperTTSText: '',
            hasValidWhisperURL: '',
            whisperURL:''
        }];

        $scope.prompts = $rootScope.prompts;
        $scope.whispers = $rootScope.whispers;

        $scope.getLocIvr=function(){
            $scope.isLoadingApi = true;
            $scope.canModify = false;
            GeoRouteWebService.getLocationIvrRoutes(locIvrRouteId).then(function (result) {
                if (result.data.status != 'error') {
                    var message = result.data.json[0].voice_prompt_message;
                    var substring = message.substring(0, 7);

                    if (substring == "file://") {
                        var selectedprompt = '';
                        message = message.substring(message.lastIndexOf("/") + 1, message.lastIndexOf("."));
                        if($scope.prompts){
                            for (var j = 0; j < $scope.prompts.length; j++) {
                                var filename=$scope.prompts[j].filename.toString();
                                if(message === filename){
                                    selectedprompt = $scope.prompts[j];
                                }
                            }
                        }
                        $scope.selectedCallFlow.selectedprompt = selectedprompt;
                        $scope.selectedCallFlow.voicepromptURL = selectedprompt.url;
                        $scope.selectedCallFlow.voicepromptId = selectedprompt.id;
                        $scope.selectedCallFlow.voicepromptText = selectedprompt.name;
                        $scope.selectedCallFlow.voicepromptFileName = selectedprompt.filename;
                        $scope.TTSIVRSelected = false;
                        $scope.hasValidTTSVoiceURL = true;
                    } else {
                        $scope.TTSIVRSelected = true;
                        $scope.selectedCallFlow.voicepromptTTSText = message.substring(message.lastIndexOf("/") + 1, message.length);
                        $scope.hasValidTTSVoiceURL = true;
                    }
                    var multiIvrs = [];
                    _.each(result.data.json, function(ivr){
                        var message_type = 'file';
                        var whisper_type = 'file';
                        var message = ivr.message;
                        var whisper_message = ivr.whisper_message;
                        var whisper_enabled = ivr.whisper_enabled;
                        var isSimultaneousRing = false;
                        var overflowNumbers = [];
                        var openOverflowBox  = false;
                        var selectedprompt = {};
                        var TTSIVRSelected = false;
                        var voicepromptURL = '';
                        var voicepromptTTSText = '';
                        var voicepromptId ='';
                        var voicepromptText = '';
                        var hasValidTTSVoiceURL = true;
                        var voicepromptFileName = '';
                        var whisperPrompt = '';
                        var whisperText ='';
                        var whisperTTSText= '';
                        var whisperURL ='';
                        var whisperId ='';
                        var whisperFileName ='';
                        var TTSWhisperSelected = false;
                        var hasValidWhisperURL = false;

                        if(ivr.message && ivr.message.substring(0, 4) != 'file'){
                            message_type = 'text';
                        }
                        if(ivr.whisper_message && ivr.whisper_message.substring(0, 4) != 'file'){
                            whisper_type = 'text';
                        }
                        if (message_type == "file") {
                            message = message.substring(message.lastIndexOf("/") + 1, message.length);
                            if($scope.prompts){
                                for (j = 0; j < $scope.prompts.length; j++) {
                                    filename = $scope.prompts[j].filename + ".wav";
                                    if(filename == message)
                                        selectedprompt = $scope.prompts[j];
                                        voicepromptURL = selectedprompt.url;
                                        voicepromptId = selectedprompt.id;
                                        voicepromptText = selectedprompt.name;
                                        voicepromptFileName = selectedprompt.filename;
                                        TTSIVRSelected = false;
                                        hasValidTTSVoiceURL = true;
                                }
                            }
                        } else {
                            TTSIVRSelected = true;
                            if(message == "blank://")
                            {
                                message = '';
                            }else{
                                message = message.substring(6, message.length);
                            }
                            voicepromptTTSText = message;
                            hasValidTTSVoiceURL = false;
                        }
                        if(whisper_enabled){
                            if (whisper_type == "file") {
                                whisper_message = whisper_message.substring(whisper_message.lastIndexOf("/") + 1, whisper_message.length);
                                if($scope.whispers){
                                    for (j = 0; j < $scope.whispers.length; j++) {
                                        filename = $scope.whispers[j].filename + ".wav";
                                        if(filename == whisper_message){
                                            whisperPrompt = $scope.whispers[j];
                                            whisperText = whisperPrompt.name;
                                            whisperURL = whisperPrompt.url;
                                            whisperId = whisperPrompt.id;
                                            whisperFileName = whisperPrompt.filename;
                                            TTSWhisperSelected = false;
                                            hasValidWhisperURL = true;
                                        }
                                    }
                                }
                            } else {
                                TTSWhisperSelected = true;
                                whisper_message = whisper_message.substring(6, whisper_message.length);
                                whisperTTSText = whisper_message;
                                hasValidWhisperURL = false;
                            }
                        }else{
                            TTSWhisperSelected = true;
                        }
                        _.each(ivr.overflowNumbers, function(num){
                            var number ={
                                "overflowNumber": num.target_did,
                                "rings": num.ring_delay/6,
                                "overflow_order": num.overflow_order
                            };
                            if(num.hunt_type === 'Simultaneous'){
                                isSimultaneousRing = true;
                            }
                            overflowNumbers.push(number);
                        });
                        if(overflowNumbers.length){
                            openOverflowBox = true;
                        }else{
                            overflowNumbers = [{overflowNumber:'', rings: 3, overflow_order: 1}];
                        }
                        if(ivr.target_did === 'hangup'){
                            ivr.ivr_option_type = 'hangup';
                        }
                        var obj={
                            'action': ivr.ivr_option_type,
                            'action_order': ivr.action_order,
                            'activateVoiceMail' : ivr.vm_enabled,
                            'destination' : ivr.destination,
                            'id' :ivr.location_ivr_option_id,
                            'level' : ivr.level,
                            'parentid' : ivr.parentid,
                            'previousmenu' : ivr.back_press,
                            'message':message,
                            'keypress':ivr.key_press,
                            'message_type' : message_type,
                            'ringtoNum':ivr.target_did,
                            'overflowNumbers': overflowNumbers,
                            'openOverflowBox': openOverflowBox,
                            'isSimultaneousRing':isSimultaneousRing,
                            'back_press':ivr.back_press,
                            'voicepromptURL': voicepromptURL,
                            'voicepromptId': voicepromptId,
                            'voicepromptText': voicepromptText,
                            'recordCall': ivr.record_enabled,
                            'playDisclaimer': ivr.play_disclaimer,
                            'voicepromptTTSText': voicepromptTTSText,
                            'TTSIVRSelected': TTSIVRSelected,
                            'hasValidTTSVoiceURL': hasValidTTSVoiceURL,
                            'voicepromptFileName': voicepromptFileName,
                            'whisperPrompt' : whisper_enabled,
                            'TTSWhisperSelected': TTSWhisperSelected,
                            'whisperTTSText': whisperTTSText,
                            'hasValidWhisperURL': hasValidWhisperURL,
                            'whisperText' : whisperText,
                            'whisperURL':whisperURL,
                            'whisperFileName': whisperFileName
                        };
                        multiIvrs.push(obj);
                    });

                    $scope.ivrActions = jsonIvrOption(multiIvrs);
                    $scope.ivrActions = _.sortBy($scope.ivrActions, 'action_order');
                    $scope.selectedCallFlow.routetype = 'ivr';
                    $scope.isLoadingApi = false;

                }else{
                    pinesNotifications.notify({
                        title: 'Location IVR',
                        text: result.data.err,
                        type: 'error'
                    });
                    $scope.isLoadingApi = false;
                }
            });
        };
        function jsonIvrOption(arr){
            var tree = [],
                mappedArr = {},
                arrElem,
                mappedElem;
        
            // First map the nodes of the array to an object -> create a hash table.
            for(var i = 0, len = arr.length; i < len; i++) {
                arrElem = arr[i];
                mappedArr[arrElem.id] = arrElem;
                mappedArr[arrElem.id].ivrActions = [];
                    }
                    for (var id in mappedArr) {
                if (mappedArr.hasOwnProperty(id)) {
                mappedElem = mappedArr[id];
                // If the element is not at the root level, add it to its parent array of children.
                if (mappedElem.parentid) {
                    mappedArr[mappedElem.parentid].ivrActions.push(mappedElem);
                }
                // If the element is at the root level, add it to first level elements array.
                else {
                    tree.push(mappedElem);
                }
                }
            }
            return tree;
        }

        if(locIvrRouteId){
            $scope.getLocIvr();
        }

        $scope.chkSpclChar = function (text, prompt,cb){
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
            if(format.test(text)){
                pinesNotifications.notify({
                    title: prompt,
                    text: 'Special characters are not allowed',
                    type: 'error'
                });
                cb(text.replace(format, "")) ;
            }else{
                cb(text) ;
            }
        };

        $scope.voiceTextIVRChange=function(){
            var obj={};
            // obj.selectedCallFlow={};
            // obj.selectedCallFlow.voicepromptTTSText = $scope.selectedCallFlow.voicepromptTTSText;
            if($scope.ivrAudio1 !== undefined){
                $scope.ivrAudio1.pause();
            }
            $scope.ivrAudio1 = undefined;
            if ($scope.selectedCallFlow.voicepromptTTSText === undefined || $scope.selectedCallFlow.voicepromptTTSText.length === 0) {
                console.log($scope.selectedCallFlow.voicepromptTTSText,"voicepromptTTSText");
                $scope.hasValidTTSVoiceURL = false;
                $scope.TTSIVRSelected = true;
            } else {
                $scope.chkSpclChar($scope.selectedCallFlow.voicepromptTTSText, 'Voice Prompt', function(t){
                    $scope.selectedCallFlow.voicepromptTTSText = t;
                    $scope.hasValidTTSVoiceURL = true;
                    $scope.TTSIVRSelected = true;  
                });
            }
            // obj = IvrCommonMethods.voiceTextIVRChange(obj);
            // $scope.TTSIVRSelected = obj.TTSIVRSelected;
            // $scope.hasValidTTSVoiceURL=obj.hasValidTTSVoiceURL;
            // $scope.ivrAudio1=obj.ivrAudio1;
            // $scope.selectedCallFlow.voicepromptTTSText=obj.selectedCallFlow.voicepromptTTSText;
        };

         $scope.showIVRVoiceModal = function(size) {
                $scope.disableBtn = true;
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignPrompt.html',
                    controller: 'voiceModal',
                    size: size
                });

                modalInstance.result.then(function() {
                    for (var i = 0; i < voicepromptService.prompts.length; i++) {
                        if (voicepromptService.prompts[i].selectedprompt === true) {
                            $scope.selectedCallFlow.voicepromptText = voicepromptService.prompts[i].name;
                            $scope.selectedCallFlow.voicepromptFileName = voicepromptService.prompts[i].filename;
                            $scope.selectedCallFlow.voicepromptURL = voicepromptService.prompts[i].url;
                            $scope.selectedCallFlow.voicepromptId = voicepromptService.prompts[i].id;
                        }
                    }
                    $scope.prompts = $rootScope.prompts;
                    $scope.TTSIVRSelected = false;
                    $scope.hasValidTTSVoiceURL = true;
                    $scope.selectedCallFlow.voicepromptTTSText = '';
                    $scope.disableBtn = false;
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                    $scope.disableBtn = false;
                });
            };


        var stopAudio = function() {
            if ($scope.whisperAudio !== undefined) {
                $scope.whisperAudio.pause();
                $scope.whisperAudio = undefined;
            }
            if ($scope.promptAudio !== undefined) {
                $scope.promptAudio.pause();
                $scope.promptAudio = undefined;
            }
            if ($scope.ivrAudio !== undefined) {
                $scope.ivrAudio.pause();
                $scope.ivrAudio = undefined;
            }
            if ($scope.ivrAudio1 !== undefined) {
                $scope.ivrAudio1.pause();
                $scope.ivrAudio1 = undefined;
            }
             if ($scope.greetingAudio !== undefined) {
                $scope.greetingAudio.pause();
                $scope.greetingAudio = undefined;
            }
            if ($scope.calloutcomeAudio !== undefined) {
                $scope.calloutcomeAudio.pause();
                $scope.calloutcomeAudio = undefined;
            }
            if ($scope.agentidAudio !== undefined) {
                $scope.agentidAudio.pause();
                $scope.agentidAudio = undefined;
            }
             if ($scope.saleAudio !== undefined) {
                $scope.saleAudio.pause();
                $scope.saleAudio = undefined;
            }
            if ($scope.leadAudio !== undefined) {
                $scope.leadAudio.pause();
                $scope.leadAudio = undefined;
            }
        };

        $scope.audioIsPlaying = function(origin) {
            if (origin != 'whisper' && $scope.whisperAudio !== undefined && !$scope.whisperAudio.paused && !$scope.whisperAudio.ended)
                return true;
            if (origin != 'prompt' && $scope.promptAudio !== undefined && !$scope.promptAudio.paused && !$scope.promptAudio.ended)
                return true;
            if (origin != 'ivr' && $scope.ivrAudio !== undefined && !$scope.ivrAudio.paused && !$scope.ivrAudio.ended)
                return true;
            if (origin != 'greeting' && $scope.greetingAudio !== undefined && !$scope.greetingAudio.paused && !$scope.greetingAudio.ended)
                return true;
            if (origin != 'calloutcome' && $scope.outComePromtAudio !== undefined && !$scope.outComePromtAudio.paused && !$scope.outComePromtAudio.ended)
                return true;
            if (origin != 'agentid' && $scope.AgentIDVoicePromptAudio !== undefined && !$scope.AgentIDVoicePromptAudio.paused && !$scope.AgentIDVoicePromptAudio.ended)
                return true;
            if (origin != 'sale' && $scope.salesAmountVoiceAudio !== undefined && !$scope.salesAmountVoiceAudio.paused && !$scope.salesAmountVoiceAudio.ended)
                return true;
            return false;
        };

        $scope.removeSelectedIVRVoiceAudio = function() {
            if ($scope.ivrAudio1 !== undefined)
            $scope.ivrAudio1.pause();
            $scope.ivrAudio1 = undefined;
            $scope.selectedCallFlow.voicepromptURL = undefined;
            $scope.selectedCallFlow.voicepromptTTSText = "";
            $scope.TTSIVRSelected = true;
            $scope.hasValidTTSVoiceURL = false;
        };


        $scope.playTTSVoiceAudio = function(url) {
            if($scope.selectedCallFlow.voicepromptTTSText === undefined){
                $scope.selectedCallFlow.voicepromptTTSText = "";
            }
            if ($scope.ivrAudio1 !== undefined && !$scope.ivrAudio1.paused) {
                $scope.ivrAudio1.pause();
            } else if ($scope.ivrAudio1 !== undefined && $scope.ivrAudio1.paused) {
                $scope.ivrAudio1.play();
            } else {
                if ($scope.selectedCallFlow.voicepromptTTSText.length > 0) {
                    $scope.ivrAudio1 = new Audio();
                    $scope.onTTS_IVR_Request = true;
                    CampaignWebService.getTTS($scope.selectedCallFlow.voicepromptTTSText).then(function(result) {
                        if (result.data.json.length > 1) {
                            var TTSData = result.data.json;
                            var source = "data:audio/mp3;base64," + TTSData;
                            $scope.ivrAudio1.src = source;
                            if ($scope.ivrAudio1.paused) {
                                $scope.ivrAudio1.play();
                            } else {
                                $scope.ivrAudio1.pause();
                            }
                        }
                        $scope.onTTS_IVR_Request = undefined;
                    });
                } else {
                    $scope.ivrAudio1 = new Audio($scope.selectedCallFlow.voicepromptURL);
                    $scope.ivrAudio1.play();
                }
            }
        };
        $scope.playTtsVoiceAudio = function(cAction) {
            if ($scope.ivrAudio !== undefined && !$scope.ivrAudio.paused) {
                $scope.ivrAudio.pause();
            } else if ($scope.ivrAudio !== undefined && $scope.ivrAudio.paused) {
                $scope.ivrAudio.play();
            } else {
                if (cAction.voicepromptTTSText.length > 0) {
                    $scope.ivrAudio = new Audio();
                    $scope.onTTS_IVR_Request = true;
                    CampaignWebService.getTTS(cAction.voicepromptTTSText).then(function(result) {
                        if (result.data.json.length > 1) {
                            var TTSData = result.data.json;
                            var source = "data:audio/mp3;base64," + TTSData;
                            $scope.ivrAudio.src = source;
                            if ($scope.ivrAudio.paused) {
                                $scope.ivrAudio.play();
                            } else {
                                $scope.ivrAudio.pause();
                            }
                        }
                         $scope.onTTS_IVR_Request = undefined;
                    });
                } else {
                    $scope.ivrAudio = new Audio(cAction.voicepromptURL);
                    $scope.ivrAudio.play();
                }
            }
        };
        $scope.audioIsDownloading = function() {
            if ($scope.whisperAudio !== undefined && $scope.onTTS_WH_Request !== undefined)
                return true;
            if ($scope.promptAudio !== undefined && $scope.onTTS_VP_Request !== undefined)
                return true;
            if ($scope.ivrAudio !== undefined && $scope.onTTS_IVR_Request !== undefined)
                return true; 
            if ($scope.greetingAudio !== undefined && $scope.onTTS_WH_Request !== undefined)
                return true;
            if ($scope.calloutcomeAudio !== undefined && $scope.onTTS_VP_Request !== undefined)
                return true;
            if ($scope.agentidAudio !== undefined && $scope.onTTS_IVR_Request !== undefined)
                return true;
            if ($scope.saleAudio !== undefined && $scope.onTTS_VP_Request !== undefined)
                return true;
            if ($scope.leadAudio !== undefined && $scope.onTTS_IVR_Request !== undefined)
                return true;
            
            return false;
        };
        $scope.keycheck =false;
        var validateIVR = function(cActions ,level){
            var invalidFields =[];
            //for level =1      
            for (var i = cActions.length - 1; i >= 0; i--) {
                if( cActions[i].keypress === '' || cActions[i].keypress === undefined || cActions[i].keypress === null){
                    invalidFields.push('Keypress');
                    }
                if( cActions[i].destination === '' || cActions[i].destination === undefined || cActions[i].destination === null){
                    invalidFields.push('Destination');
                    }
                if((cActions[i].voicepromptTTSText ==='' || cActions[i].voicepromptTTSText === undefined) && (cActions[i].voicepromptURL === '' || cActions[i].voicepromptURL === undefined) && cActions[i].action === "interactiveVoice"){
                    invalidFields.push('Voice Prompt');
                }
                if( level !== 1 && (cActions[i].previousmenu  === "" ||   cActions[i].previousmenu === undefined ||   cActions[i].previousmenu === null)){
                    invalidFields.push('Go Back to the previous menu');
                }
                 if( cActions[i].action !== "interactiveVoice"){
                 // Rote type = simple and geo
                    if(  cActions[i].recordCall){
                        if(cActions[i].playDisclaimer === "true" || cActions[i].playDisclaimer === undefined || cActions[i].playDisclaimer === null){
                            invalidFields.push('Play call recording disclaimer');
                        }
                   }
                   if(cActions[i].whisperPrompt){
                     if( (cActions[i].whisperTTSText === undefined || cActions[i].whisperTTSText === "" || cActions[i].whisperTTSText === null) && ( cActions[i].whisperURL === '' || cActions[i].whisperURL === null)){
                        invalidFields.push('Play whisper message before connecting');
                     } 
                   }
                   // Rote type =simple
                    if( cActions[i].action === 'simple'){
                        if(  cActions[i].ringtoNum === undefined || cActions[i].ringtoNum === '' ||  cActions[i].ringtoNum.replace(/[^0-9]+/g, '').length !== 10){
                            invalidFields.push('Ring to Phone Number');
                        }
                       
                    }
                }else{ 
                    var newLevel = level +1;
                     validateIVR(cActions[i].ivrActions ,newLevel); 
                }
              
            }
            for(var j = 0; j < cActions.length; j++){
                    if( cActions[j].keypress===cActions[j].previousmenu)
                    {
                        if(level==2){
                        pinesNotifications.notify({
                            title: '2nd Level IVR',
                            text: 'keypress and backpress value should not be same',
                            type: 'error'
                        });
                    }
                    if(level==3){
                        pinesNotifications.notify({
                            title: '3rd Level IVR',
                            text: 'keypress and backpress value should not be same',
                            type: 'error'
                        });
                    }
                    $scope.keycheck=true;
                    }
                }
                if(invalidFields.length > 0){
                    i = 0;
                   showMsg(invalidFields,level);
                }else{
            }
        };
        function findDuplicates(arra1) {
            var object = {};
            var result = [];                    
            arra1.forEach(function (item) {
              if(!object[item])
                object[item] = 0;
                object[item] += 1;
            });                    
            for (var prop in object) {
               if(object[prop] >= 2) {
                   result.push(prop);
               }
            }                    
            return result;
        }
        var showMsg = function(invalidFields, level){
            var duplicatesinvalidFields = findDuplicates(invalidFields);
            if(invalidFields.length > 0){
                var msglastpart = (invalidFields.length === 1 && duplicatesinvalidFields.length === 0) ? ' field is required.':' fields are required.';
                invalidFields = _.uniq(invalidFields);
                $scope.IVRInvalidFields.push(invalidFields);
                var  msg = level == 1 ? '1st' : (level === 2 ? "2nd" : "3rd" );
                pinesNotifications.notify({
                    title: msg +' level IVR Form',
                    text: invalidFields.toString()+ msglastpart,
                    type: 'error'
                }); 
              
          }
        };

        $scope.saveLocIVR=function(){
            $scope.IVRInvalidFields = [];
            var overflow_error = false;
            $scope.pauseCurrentPlayingAudio();
            validateIVR($scope.ivrActions,1);
            if($scope.IVRInvalidFields.length > 0){
               return;
               }
               if($scope.keycheck){
                $scope.keycheck=false; 
                return;
            }
            var cnt = 0;
            var message_type;
            if(!$scope.selectedCallFlow.voicepromptTTSText){
                if(!$scope.selectedCallFlow.voicepromptURL){
                    pinesNotifications.notify({
                        title: 'Location IVR',
                        text: "'Play a voice prompt first' field is required",
                        type: 'error'
                    });
                    return;
                }
            }

            $scope.isLoadingApi = true;
            var ivrs = {};
            if($scope.TTSIVRSelected){
                ivrs.message_type= 'text';
                ivrs.message = $scope.selectedCallFlow.voicepromptTTSText;
            }else{
                ivrs.message_type= 'file';
                ivrs.message = $scope.selectedCallFlow.voicepromptFileName;
            }
            $scope.keypressDuplicateL1 = [];
            $scope.keypressDuplicateL2 = [];
            $scope.keypressDuplicateL3 = [];
            var duplicateKeyPress = false;
            _.each($scope.ivrActions, function(action){
                $scope.keypressDuplicateL1.push(action.keypress);
                _.each(action.ivrActions, function(action1){
                    if(action1.keypress !== ''){
                        $scope.keypressDuplicateL2.push(action1.keypress);
                    }
                    _.each(action1.ivrActions, function(action2){
                        if(action2.keypress !== ''){
                            $scope.keypressDuplicateL3.push(action2.keypress);
                        }
                    });
                });
                $scope.keypressL2 = _.uniq($scope.keypressDuplicateL2);
                $scope.keypressL3 = _.uniq($scope.keypressDuplicateL3);
                if ($scope.keypressL2.length !== $scope.keypressDuplicateL2.length || $scope.keypressL3.length !== $scope.keypressDuplicateL3.length){
                    duplicateKeyPress = true;
                }
                $scope.keypressDuplicateL2 = [];
                $scope.keypressDuplicateL3 = [];
                $scope.keypressL2 = [];
                $scope.keypressL3 = [];

            });
            $scope.keypressL1 = _.uniq($scope.keypressDuplicateL1);
            if($scope.keypressL1.length !== $scope.keypressDuplicateL1.length){
                duplicateKeyPress = true;
            }    
            if(duplicateKeyPress){
                pinesNotifications.notify({
                    title: 'Multilevel IVR Form',
                    text: 'Duplicate Key Press Numbers are not allowed',
                    type: 'error'
                });
                return;
            }
               
            _.each($scope.ivrActions, function(action){
                $scope.duplicateRingToOverflowL1 = [];
                $scope.overflowNumberDuplicateL1 = [];
                _.forEach(action.overflowNumbers,function(num){
                        if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                            var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                            var  ringToNum = UserWebService.unMaskData(action.ringtoNum);
                                if(overflowNumber === ringToNum){
                                    $scope.duplicateRingToOverflowL1.push(overflowNumber);
                                }
                                $scope.overflowNumberDuplicateL1.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                        }
                        
                    });
                    if(($scope.overflowNumberDuplicateL1.length != _.uniq($scope.overflowNumberDuplicateL1, 'unmaskNumber').length) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                        pinesNotifications.notify({
                            title: '1st level IVR Form',
                            text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                            type: 'error'
                        });
                        overflow_error = true;
                    }
                    if(!_.isEmpty($scope.duplicateRingToOverflowL1) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                        pinesNotifications.notify({
                            title: '1st level IVR Form',
                            text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                            type: 'error'
                        });
                        overflow_error = true;
                    }
                    _.each(action.ivrActions, function(action1){
                        $scope.overflowNumberDuplicateL2 = [];
                        $scope.duplicateRingToOverflowL2 = [];
                         _.forEach(action1.overflowNumbers,function(num){
                            if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                var  ringToNum = UserWebService.unMaskData(action1.ringtoNum);
                                if(overflowNumber === ringToNum){
                                    $scope.duplicateRingToOverflowL2.push(overflowNumber);
                                }
                                $scope.overflowNumberDuplicateL2.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                            }
                        });
                        if(($scope.overflowNumberDuplicateL2.length != _.uniq($scope.overflowNumberDuplicateL2, 'unmaskNumber').length) && action1.isSimultaneousRing === true && action1.action !== 'interactiveVoice'){
                            pinesNotifications.notify({
                                title: '2nd level IVR Form',
                                text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                type: 'error'
                            });
                            overflow_error = true;
                        }
                        if(!_.isEmpty($scope.duplicateRingToOverflowL2) && action1.isSimultaneousRing === true && action1.action !== 'interactiveVoice'){
                            pinesNotifications.notify({
                                title: '2nd level IVR Form',
                                text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                type: 'error'
                            });
                            overflow_error = true;
                        }
                        _.each(action1.ivrActions, function(action2){
                            $scope.overflowNumberDuplicateL3 = [];
                            $scope.duplicateRingToOverflowL3 = [];
                            _.forEach(action2.overflowNumbers,function(num){
                                if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                    var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                    var  ringToNum = UserWebService.unMaskData(action2.ringtoNum);
                                    if(overflowNumber === ringToNum){
                                        $scope.duplicateRingToOverflowL3.push(overflowNumber);
                                    }
                                    $scope.overflowNumberDuplicateL3.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                }
                            });
                            if(($scope.overflowNumberDuplicateL3.length != _.uniq($scope.overflowNumberDuplicateL3, 'unmaskNumber').length) && action2.isSimultaneousRing === true && action2.action !== 'interactiveVoice'){
                                pinesNotifications.notify({
                                    title: '3rd level IVR Form',
                                    text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                    type: 'error'
                                });
                                overflow_error = true;
                            }
                            if(!_.isEmpty($scope.duplicateRingToOverflowL3) && action2.isSimultaneousRing === true && action2.action !== 'interactiveVoice'){
                                pinesNotifications.notify({
                                    title: '3rd level IVR Form',
                                    text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                    type: 'error'
                                });
                                overflow_error = true;
                            }
                        });
                });
            });

            if(overflow_error)
            return;
            ivrs.ivrActions = jsonFormationIvr($scope.ivrActions);
            var data={};
            data.location_id=locId;
            data.ivrs=ivrs;
            data.sendingRouteType="ivr";
            data.location = {
                'org_unit_id':$rootScope.currentOUId,
                'name':locName
            };

            // CT-32500 : Start
            var ivrActions = _.sortBy($scope.ivrActions, 'action_order');
            var body = { };

            body.trackingNumber = '';
            body.ringToNumbers = [];

            _.each(ivrActions,function(item){
                if(item.ringtoNum) {
                    body.ringToNumbers.push(item.ringtoNum.replace(/[^0-9]+/g, '').substring(0, 3));
                }

                if(item.overflowNumbers) {
                    item.overflowNumbers.forEach(function(overflowNumber__) {
                        body.ringToNumbers.push(overflowNumber__.overflowNumber.replace(/[^0-9]+/g, '').substring(0, 3));
                    });
                }

                if(item.ivrActions.length > 0){
                    _.each(item.ivrActions,function(item1){
                        if(item1.ringtoNum){
                            body.ringToNumbers.push(item1.ringtoNum.replace(/[^0-9]+/g, '').substring(0, 3));
                        }

                        if(item1.overflowNumbers) {
                            item1.overflowNumbers.forEach(function(overflowNumber__) {
                                body.ringToNumbers.push(overflowNumber__.overflowNumber.replace(/[^0-9]+/g, '').substring(0, 3));
                            });
                        }

                        if(item1.ivrActions && item1.ivrActions.length > 0){
                            _.each(item1.ivrActions,function(item2){ 
                                body.ringToNumbers.push(item2.ringtoNum.replace(/[^0-9]+/g, '').substring(0, 3)); 

                                if(item2.overflowNumbers) {
                                    item2.overflowNumbers.forEach(function(overflowNumber__) {
                                        body.ringToNumbers.push(overflowNumber__.overflowNumber.replace(/[^0-9]+/g, '').substring(0, 3));
                                    });
                                }
                            });   
                        }
                    });
                }
            });

            GeoRouteWebService.checkLDM(body).then(function(res) {
                if(res.data.isLDM) {
                    var msg = "The ring to number you have selected belongs to " + res.data.rateCenter + " rate center. " + 
                    "If a call is answered on this number, the minutes would be charged as long distance minutes. Click OK to continue.";
                    $bootbox.confirm(msg, function(result) {
                        if(result === true) {
                            GeoRouteWebService.saveLocationIVR(data).then(function (result) {
                                if (result.data.status != 'error') {
                                    pinesNotifications.notify({
                                        title: 'Location IVR',
                                        text: 'Location IVR saved successfully',
                                        type: 'success'
                                    });
                                    $scope.isLoadingApi = false;
                                    $scope.getLocationRoutesOnReq(geoid);
                                    $scope.$dismiss();
                                }else{
                                    pinesNotifications.notify({
                                        title: 'Location IVR',
                                        text: result.data.err,
                                        type: 'error'
                                    });
                                }
                                });
                        }
                    });
                } else {
                    GeoRouteWebService.saveLocationIVR(data).then(function (result) {
                        if (result.data.status != 'error') {
                            pinesNotifications.notify({
                                title: 'Location IVR',
                                text: 'Location IVR saved successfully',
                                type: 'success'
                            });
                            $scope.isLoadingApi = false;
                            $scope.getLocationRoutesOnReq(geoid);
                            $scope.$dismiss();
                        }else{
                            pinesNotifications.notify({
                                title: 'Location IVR',
                                text: result.data.err,
                                type: 'error'
                            });
                        }
                        });
                }
            });
            // CT-32500 : End            
           

        };
        var IVRte = function(ivrs){
            return jsonFormationIvr(ivrs.ivrActions);
        };
        var HungupRte = function(ivrs){
            var HungupData = {
                ringtoNum: 'hangup'
            };
            return HungupData;
        };
        var SimpleRte = function(ivrs){
            var ovrFlowNumbs = [];
            _.forEach(ivrs.overflowNumbers,function(num){
                if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                    var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                    if(!overflowNumber || overflowNumber.length < 10){
                        isOverflowNumbersValid = true;
                    }
                    ovrFlowNumbs.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                }
            });
            ivrs.overflowNumbers = ovrFlowNumbs;
            var simpleData = {
                openOverflowBox: ivrs.openOverflowBox,
                overflowNumbers: ivrs.overflowNumbers,
                ringtoNum: UserWebService.unMaskData(ivrs.ringtoNum),
                isSimultaneousRing: ivrs.isSimultaneousRing 
            };
            return simpleData;
        };
        var jsonFormationIvr = function(ivrs){
            var Dataarray = [];
            _.each(ivrs, function(ivr){
                if(ivr.TTSIVRSelected === true){
                    ivr.message_type = "text";
                    ivr.message = ivr.voicepromptTTSText;
                }else{
                    ivr.message_type = "file";
                    ivr.message = ivr.voicepromptFileName;
                }

                if(ivr.TTSWhisperSelected === true){
                    ivr.whisper_message_type = "text";
                    ivr.whisper_message = ivr.whisperTTSText;
                }else{
                    ivr.whisper_message_type = "file";
                    ivr.whisper_message = ivr.whisperFileName;
                }

                var objData = {
                    action :  ivr.action,
                    activateVoiceMail: ivr.activateVoiceMail,
                    destination: ivr.destination,
                    id:ivr.id ,
                    ouid: $rootScope.currentOUId,
                    level: ivr.level,
                    back_press:ivr.previousmenu,
                    keypress: ivr.keypress,
                    message: ivr.message,
                    message_type: ivr.message_type,
                    action_order : ivr.action_order,
                    record_enabled: ivr.recordCall,
                    play_disclaimer: ivr.playDisclaimer

                };

                if(ivr.action == 'simple'){
                    objData.whisper_message = ivr.whisper_message;
                    objData.whisper_message_type =  ivr.whisper_message_type;
                    if(angular.isDefined(ivr.whisperPrompt)){
                        objData.whisper_enabled = ivr.whisperPrompt;   
                    }else{
                        objData.whisper_enabled =false;
                    }
                }else{
                    objData.whisper_message = '';
                    objData.whisper_message_type =  'text';
                    objData.whisper_enabled = false;
                }

                if(ivr.action == 'interactiveVoice'){
                        var ivrActions = IVRte(ivr);
                        objData.ivrActions = ivrActions;
                }
                else if(ivr.action == 'simple'){
                        var ringToData = SimpleRte(ivr);
                        objData.ringToData = ringToData;
                }else if(ivr.action == 'hangup'){
                    var hungupData = HungupRte(ivr);
                    objData.ringToData = hungupData;
                }
                Dataarray.push(objData);
            });
            return Dataarray;
        };
        $scope.removeIvr= function(){
            $scope.pauseCurrentPlayingAudio();
            var tagMsg = "Are you sure, you want to remove this IVR configuration?";
            //if form is dirty then cancel
            $bootbox.confirm(tagMsg, function (clickedOK) {
                if (clickedOK) {
                    GeoRouteWebService.deleteLocationIVR(locIvrRouteId).then(function (result) {
                        if (result.data.status != 'error') {
                            pinesNotifications.notify({
                                title: 'Location IVR',
                                text: 'Location IVR removed successfully',
                                type: 'success'
                            });
                            $scope.getLocationRoutesOnReq(geoid);
                            $scope.$close();
                        }else{
                            pinesNotifications.notify({
                                title: 'Location IVR',
                                text: result.data.err,
                                type: 'error'
                            });
                        }
                        });
                       $scope.getLocationRoutesOnReq(geoid);
                }
            });
            
        };
        $scope.cancel=function(){
            $scope.pauseCurrentPlayingAudio();
            var isDirty = $scope.locationIvrForm.$dirty;
            if(isDirty){
                var tagMsg = "You are leaving the IVR creation page. If you continue you will lose any IVR configuration settings that have been set. Press 'Ok' to continue and discard all IVR settings, or press 'Cancel' to continue editing IVR settings.";
                //if form is dirty then cancel
                $bootbox.confirm(tagMsg, function (clickedOK) {
                    if (clickedOK) {
                        $scope.$dismiss();
                        } else{
                    }
                });
            }else{
                $scope.$dismiss();
            }
            
        };
        }]);
