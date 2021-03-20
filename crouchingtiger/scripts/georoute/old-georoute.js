/*jshint loopfunc: true */
angular
    .module('old-georoute-builder', ['angularFileUpload', 'ngSanitize', 'ngCsv'])

    .factory('OldGeoRouteWebService', function ($q, $timeout, $http, $window, $rootScope, $upload, ApiParam) {
        'use strict';
        var OldGeoRouteWebService = {};
        OldGeoRouteWebService.getLocations = function () {
            var config = {
                headers: {
                    'content-type':   'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/location/ouid/" + $rootScope.currentOUId+ "/" + encodeURIComponent($rootScope.timezone), config);

        };
        OldGeoRouteWebService.getLocationRoutes = function (id,page) {
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
        OldGeoRouteWebService.saveLocation = function (locdata) {
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
        OldGeoRouteWebService.updateLocation = function (locdata) {
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
        OldGeoRouteWebService.deleteLocation = function (locdata) {
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
        OldGeoRouteWebService.deleteLocationById = function (id) {
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
        OldGeoRouteWebService.updateLocationRoute = function (locdata) {
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
        OldGeoRouteWebService.createLocationRoute = function (locdata) {
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
        OldGeoRouteWebService.unMaskData = function (data) {
            if (data) {
                return data.replace(/[^0-9]+/g, '');
            }
        };
        OldGeoRouteWebService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };
        //callflowrecording/upload
        OldGeoRouteWebService.uploadCSVFile = function (files, location_id) {
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
                        $rootScope.percentage = parseInt(100.0 * evt.loaded / evt.total);
                    });
                }
            }

            return req;
        };
        OldGeoRouteWebService.checkLDM = function(body) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/ldm",
                headers: ApiParam.headerConfig().headers,
                data: body
            };
            return $http(req);
        };

        return OldGeoRouteWebService;
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
    .controller('OldGeoRouteTableController', ['$scope', '$filter', 'OldGeoRouteWebService', '$location', '$routeParams', '$rootScope',"$q", 'UserWebService','progressLoader', 'pinesNotifications','$bootbox','$route',
        function ($scope, $filter, OldGeoRouteWebService, $location, $routeParams, $rootScope,$q, UserWebService,progressLoader, pinesNotifications,$bootbox,$route) {
            'use strict';
            // if ($scope.userAccess.campaign > 6)
            //     $scope.canModify = true;
            $scope.fileIsUploading   = false;
            $scope.georoutelocations = [];
            $scope.dupSubmit         = false;
            $scope.dupGeoLocation    = false;
            $scope.disError          = false;
            $scope.disGeoError       = false;
            $scope.arrInvalid        = [];
            $scope.arrRequired       = [];
            $scope.isEdit            = false;
            $scope.disEdit           = false;
            $scope.disEditLocation   = false;
            $scope.geoRouteHeaders   = ['Name', 'Location', 'Created', 'Modified'];
            $scope.locationHeaders   = ['Location', 'Address', 'City', 'State/Province', 'Zip/Postal Code', 'Phone', 'Claimed Zip/Postal Code'];
            $scope.actionHeader      = ['Action'];
            var currentGeoID ='';
            $scope.triggerBoth = false;
            $scope.isLoadingApi = true;

            if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true' ){
                var path = $location.url().split('?');
                if($location.path() == '/set-location'){
                    location.href = '#/set-legacy-location?'+ path[1];
                }else{
                    $location.path('/set-location');
                }
            }
            OldGeoRouteWebService.getLocations().then(function (result) {
                if (result.data.result != 'error') {
                    var locationData = result.data.json.locations;
                    locationData.forEach(function (loc) {
                        $scope.georoutelocations.push({
                            id:       loc.id,
                            name:     loc.name,
                            num_loc:  loc.count,
                            created:  moment(loc.created).format("YYYY-MM-DD h:mm:ss a"),
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
            };
            $scope.enableGeoSave = function() {
                $scope.disGeoError = false;
            };
            $scope.pageChanged = function(newPage) {
                 $scope.currentPage = newPage;
                 getLocationsForID (currentGeoID, $scope.currentPage);
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
                    OldGeoRouteWebService.updateLocation(saveData).then(function (result) {
                        if (result.data.err === '') {
                            angular.extend(data, {id: id});
                            $scope.dupGeoLocation = false;
                            OldGeoRouteWebService.notify({
                                title: 'Geo Location List',
                                text:  'Successfully updated location.',
                                type:  'success'
                            });

                            $scope.georoutelocations = [];
                            OldGeoRouteWebService.getLocations().then(function (result) {
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
                            $scope.disEdit = false;
                            // $scope.totalDataRows=$scope.georoutelocations.length;
                        }
                        else {
                            OldGeoRouteWebService.notify({
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
                    OldGeoRouteWebService.saveLocation(saveData).then(function (result) {

                        if (result.data.status === 'success') {
                            $scope.totalDataRows++;
                            angular.extend(data, {id: result.data.json.insertId});
                            $scope.dupGeoLocation = false;
                            OldGeoRouteWebService.notify({
                                title: 'Create Location',
                                text:  'Successfully added location.',
                                type:  'success'
                            });

                            $scope.georoutelocations = [];
                            OldGeoRouteWebService.getLocations().then(function (result) {
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
                            $scope.disEdit = false;
                        }
                        else {
                            $scope.disEdit = false;
                            OldGeoRouteWebService.notify({
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
                        OldGeoRouteWebService.deleteLocation(saveData).then(function (result) {
                            $scope.isEdit = false;
                            if (result.data.status === 'success') {
                                $scope.totalDataRows--;
                                $scope.georoutelocations.splice(index, 1);
                                OldGeoRouteWebService.notify({
                                    title: 'Geo Location List',
                                    text:  'Successfully deleted the list',
                                    type:  'success'
                                });
                            } else {
                                OldGeoRouteWebService.notify({
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
                if (!id){
                    $scope.totalDataRows--;
                    $scope.georoutelocations.splice(index, 1);
                }else{
                    rowform.$cancel();
                    $scope.dupGeoLocation = false;
                }
            };
            $scope.addGeoList = function () {
                var lastAddedGeoRoute;
                if($scope.georoutelocations.length > 0) {
                    $scope.totalDataRows++;
                    lastAddedGeoRoute = $scope.georoutelocations[$scope.georoutelocations.length - 1];
                    if ( !lastAddedGeoRoute.name) {
                        OldGeoRouteWebService.notify({
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
                $scope.isEdit = true;
                $scope.dupSubmit = false;
                $scope.selectedGeoRouteList = geoid;
                $scope.locations = [];
                $scope.files = '';
                $scope.geoIndex = index;
                $scope.geoid = geoid;
                  $scope.currentPage = 1;
                   currentGeoID = geoid;
                   getLocationsForID (geoid, $scope.currentPage);
               /* OldGeoRouteWebService.getLocationRoutes(geoid).then(function (result) {
                    if (result.data.result != 'error') {
                        $scope.locations = [];
                        var locationData = result.data.json.locations[0].routes;
                         $scope.totalDataRows= result.data.json.totalRows;

                        locationData.forEach(function (loc) {
                            $scope.locations.push({
                                id:       loc.id,
                                location: loc.location,
                                address:  loc.address,
                                city:     loc.city,
                                state:    loc.state,
                                zip:      loc.zip,
                                phone:    loc.target,
                                claimed:  loc.claimed_zip
                            });
                        });
                    }
				setTimeout(function () {
                    $('html, body').animate({
                        scrollTop: ($("#locationeditor").offset().top) - 50
                    }, 1000);
                }, 100);
                });*/

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
                OldGeoRouteWebService.getLocationRoutes(geoid, currentPage).then(function (result) {
                    if (result.data.result != 'error') {
                        $scope.locations = [];
                        var locationData = result.data.json.locations[0].routes;
                        $scope.totalDataRows = result.data.json.totalRows;
                        locationData.forEach(function (loc) {
                            $scope.locations.push({
                                 id:       loc.id,
                                location: loc.location,
                                address:  loc.address,
                                city:     loc.city,
                                state:    loc.state,
                                zip:      loc.zip,
                                phone:    loc.target,
                                claimed:  loc.claimed_zip
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
                        OldGeoRouteWebService.notify({
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
                    claimed:  ''
                };
                $scope.locations.push($scope.inserted);
            };
            $scope.saveLocation = function (data, id, rowform) {
                OldGeoRouteWebService.checkLDM({trackingNumber: '', ringToNumbers: [OldGeoRouteWebService.unMaskData(data.phone)]}).then(function(res) {
					if(res.data.isLDM) {
						var msg = "The ring to number you have selected belongs to " + res.data.rateCenter + " rate center. " + 
						"If a call is answered on this number, the minutes would be charged as long distance minutes. Click OK to continue.";
						$bootbox.confirm(msg, function(result) {
							if(result === true) $scope.saveLocation_(data, id, rowform);
						});
					} else {
                        $scope.saveLocation_(data, id, rowform);
                    }
                });
            };
            $scope.saveLocation_ = function (data, id, rowform) {
                var phone_val = OldGeoRouteWebService.unMaskData(data.phone);
                $scope.disEditLocation = true;
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
                            claimed_zip: data.claimed,
                            location_id: $scope.currentLocationid
                        }
                    };
                    OldGeoRouteWebService.updateLocationRoute(saveData).then(function (result) {
                        $scope.disEditLocation = false;
                        var messageText;
                        if (result.data.status === 'success') {
                            messageText = 'added';
                            if(id) {
                                messageText = 'updated';
                        }
                            OldGeoRouteWebService.notify({
                                title: 'Geo Location',
                                text:  'Successfully updated the location',
                                type:  'success'
                            });
                        } else {
                            setTimeout(function () {
                            	rowform.$show();
                            }, 100);
                            OldGeoRouteWebService.notify({
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
                            claimed_zip: data.claimed,
                            location_id: $scope.currentLocationid
                        }
                    };
                    OldGeoRouteWebService.createLocationRoute(newData).then(function (result) {
                        $scope.disEditLocation = false;
                        if (result.data.status === 'success') {
                            OldGeoRouteWebService.notify({
                                title: 'Geo Location',
                                text:  'Successfully created location',
                                type:  'success'
                            });
                                    $scope.georoutelocations = [];
                                    OldGeoRouteWebService.getLocations().then(function (result) {
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
                            OldGeoRouteWebService.getLocationRoutes($scope.currentLocationid).then(function (result) {
                                if (result.data.status != 'error') {
                                    var locationData = result.data.json.locations[0].routes;
                                    $scope.locations = [];
                                    locationData.forEach(function (loc) {
                                        $scope.locations.push({
                                            id:       loc.id,
                                            location: loc.location,
                                            address:  loc.address,
                                            city:     loc.city,
                                            state:    loc.state,
                                            zip:      loc.zip,
                                            phone:    loc.target,
                                            claimed:  loc.claimed_zip
                                        });
                                    });
                            	}
                            });
                        }
                        else {
                            setTimeout(function () {
                                rowform.$show();
                            }, 100);
                            OldGeoRouteWebService.notify({
                                title: 'Geo Location',
                                text:  _.isObject(result.data.err) ? result.data.err[0].location_route[0].errors[0] : result.data.err,
                                type:  'error'
                            });
                        }
                    });
                }

            };
            $scope.cancellocationAdd = function (index, id, rowform) {
                if (!id)
                    $scope.locations.splice(index, 1);
                else
                    rowform.$cancel();
                $scope.dupSubmit = false;
            };
            $scope.removeLocation = function (index, id) {
                if(id) {
                    $bootbox.confirm("Are you sure you want to delete this location?", function (clickedOK) {
                        if (clickedOK) {
                            OldGeoRouteWebService.deleteLocationById(id).then(function(result) {
                                if(result.data.status === 'success'){
                                    OldGeoRouteWebService.notify({
                                        title: 'Location Editor',
                                        text:  'Location Deleted successfully.',
                                        type:  'success'
                                    });
                                    $scope.locations.splice(index, 1);
                                } else {
                                    OldGeoRouteWebService.notify({
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
                        OldGeoRouteWebService.notify({
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
                        OldGeoRouteWebService.notify({
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
                    var phone = OldGeoRouteWebService.unMaskData(data);
                    if (phone.length < 10) {
                        $scope.arrInvalid.push('Phone');
                    }
                    if ($scope.arrInvalid.length) {
                        messageText = 'field is invalid.';
                        if ($scope.arrInvalid.length > 1) {
                            messageText = 'fields are invalid.';
                        }
                        OldGeoRouteWebService.notify({
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

                        OldGeoRouteWebService.notify({
                            title: 'Geo Location',
                            text:  '\'' + arrInvalid.join(', ') + '\' ' + messageText,
                            type:  'error'
                        });
                        return ' ';
                    }
                }
            };
            $scope.getHeader = function () { return ["Location (Required)", "Address (Required)", "City (Required)", "State/Province (Required)", "Zip/Postal Code (Required)", "10-Digit Phone (Required)", "Claimed Zip (Optional)"]; };
            $scope.getExportHeader = function () { return ["Location", "Address", "City", "State/Province", "Zip/Postal Code", "Phone", "Claimed Zip Codes"]; };
            $scope.downloadTemplate = function () {
                var templateData = [{
                    a: "your address location",
                    b: "address",
                    c: "city",
                    d: "state",
                    e: "zip",
                    f: "##########",
                    g: "[#####,#####]"
                }, {
                    a: "your address location",
                    b: "address",
                    c: "city",
                    d: "state",
                    e: "zip",
                    f: "##########",
                    g: "[#####,#####]"
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
                            g: "[" + location.claimed + "]"
                        });
                    });
                }*/
                return templateData;
            };

            $scope.downloadGeoData = function () {
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
                var myRedObjects = [];//$filter('filter')($scope.locations, $scope.search);
                OldGeoRouteWebService.getLocationRoutes(currentGeoID, 0).then(function (result) {
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

                    geoData.push({
                        a: myRedObjects[i].location,
                        b: myRedObjects[i].address,
                        c: myRedObjects[i].city,
                        d: myRedObjects[i].state,
                        e: myRedObjects[i].zip,
                        f: myRedObjects[i].phone,
                        g: "[" + myRedObjects[i].claimed + "]"
                    });
                    // ({ id: '3', location: "Convirza", address: "TBD", city: "Salt Lake City", state: "UT", zip: "84067", phone: 4357788989});
               
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
                //   var templateData = [{a: "your address location", b:"address",c:"city",d:"state",e:"zip",f:"phone",g:"claimed zip"}, {a: "your address location", b:"address",c:"city",d:"state",e:"zip",f:"phone",g:"claimed zip"}];

                // templateData.push("Here")
                return geoData;
            };
            $scope.uploadFile = function (file) {
                var errors;
                var error_string;
                var extension = file[0].name.substring(file[0].name.lastIndexOf('.')+1);
                if(extension.toUpperCase() === "CSV")
                {
                $scope.fileIsUploading = true;
                OldGeoRouteWebService.uploadCSVFile(file, $scope.currentLocationid).then(function (response) {
                    $scope.fileIsUploading = false;
                    if (response.data.status != 'error') {
                        $route.reload();
                        OldGeoRouteWebService.notify({
                            title: 'Geo Location',
                            text:  "Locations uploaded successfully",
                            type:  'success'
                        });
                    }
                    else {
                        if (!Array.isArray(response.data.err)){
                             error_string = response.data.err.err[0];
                        } else {
                            if(response.data.err[0].other_params){
                            errors = response.data.err[0].other_params;
                            error_string = errors[0].errors;
                        }else if(response.data.err[0][0].location_route !== undefined){
                            errors = response.data.err[0][0].location_route;
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
                            error_string = response.data.err[0];
                            }                            
                        }
                        $scope.files = '';
                        // $scope.fileIsUploading = true;
                        OldGeoRouteWebService.notify({
                            title: 'Geo Location',
                            text:  "Error in uploading file: " + error_string,
                            type:  'error'
                        });
                        $scope.error = "Invalid email or password";
                    }

                });
                }
                else
                {
                    OldGeoRouteWebService.notify({
                        title: 'Geo Location',
                        text:  "File extension must be a CSV extension",
                        type:  'error'
                    });
                    $scope.error = "Invalid email or password";
                }
            };

        }]);
// .filter('highlight', function ($sce) {
//     return function (text, phrase) {
//         if (phrase)
//         	if(text) {
//             	text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
//                 	'<span class="highlighted">$1</span>');
//             }
//         return $sce.trustAsHtml(text);
//     }
// });
