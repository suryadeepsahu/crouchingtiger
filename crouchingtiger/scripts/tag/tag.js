angular
    .module('tag-builder', ['angularFileUpload', 'theme.services', "api-param", 'xeditable',"theme.form-directives"])

    .factory('TagWebService', function ($q, $timeout, $http, $window, $rootScope, $upload, pinesNotifications, ApiParam) {
        'use strict';
        var TagWebService = {};


        TagWebService.getTags = function () {
            $http.defaults.useXDomain = true;
            var url = ApiParam.baseURL() +
                "/v1/tag/ouid/"+ $rootScope.currentOUId + "/userAccess/" + $rootScope.userAccess.campaign;
            return $http.get(url, ApiParam.headerConfig());
        };

        TagWebService.createTag = function (tag) {
            return $http.post(ApiParam.baseURL() + "/v1/tag", tag, ApiParam.headerConfig());
        };


        TagWebService.deleteTag = function (tag) {
            return $http.put(ApiParam.baseURL() + "/v1/tag/delete", tag, ApiParam.headerConfig());
        };


        TagWebService.unMaskData = function (data) {
            if (data) {
                return data.replace(/[^0-9]+/g, '');
            }
        };

        TagWebService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };

        return TagWebService;
    })


    .run(function (editableOptions) {
        editableOptions.theme = 'bs3';
    })
    .factory('CustomSourceWebService', function ($q, $timeout, $http, $window, $rootScope, $upload, pinesNotifications, ApiParam) {
        'use strict';
        var CustomSourceWebService = {};


        CustomSourceWebService.getCustomSources = function () {
            $http.defaults.useXDomain = true;
            var url = ApiParam.baseURL() +
                "/v1/customSource/ouid/"+ $rootScope.currentOUId + "/userAccess/" + $rootScope.userAccess.campaign + "/isFromCustomSources/"+true;
            return $http.get(url, ApiParam.headerConfig());
        };

        CustomSourceWebService.createCustomSource = function (customSource) {
            return $http.post(ApiParam.baseURL() + "/v1/customSource", customSource, ApiParam.headerConfig());
        };


        CustomSourceWebService.deleteCustomSource = function (customSource) {
            return $http.put(ApiParam.baseURL() + "/v1/customSource/delete", customSource, ApiParam.headerConfig());
        };


        CustomSourceWebService.unMaskData = function (data) {
            if (data) {
                return data.replace(/[^0-9]+/g, '');
            }
        };

        CustomSourceWebService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };

        return CustomSourceWebService;
    })

    .controller('TagController', ['$scope', '$filter', 'TagWebService', '$location', '$routeParams', '$rootScope', 'pinesNotifications','$bootbox',
        function ($scope, $filter, TagWebService, $location, $routeParams, $rootScope, pinesNotifications,$bootbox) {
            'use strict';
            $scope.isLoadingApi = true;
            if ($scope.userAccess.campaign >= 6)
                $scope.canModify = false;
            $scope.OU_Name = $rootScope.currentOUName;
            $scope.OUtags = [];
            $scope.selected = 0;
            $scope.selTags = [];
            $scope.ALLOUtags = [];
            $scope.NonOUtags = [];
            $scope.isClicked =false;
            //  $scope.OUtags.push({id:1,name:"my Campaign",selected:false});
            //   $scope.OUtags.push({id:2,name:"Coolness",selected:false});
            //    $scope.OUtags.push({id:3,name:"Money Maker",selected:false});
            TagWebService.getTags().then(function (result) {
                console.log(result);
                if (result.data.err === '') {
                    for (var i = 0; i < result.data.json.length; i++) {
                        if (result.data.json[i].editable)
                            $scope.OUtags.push({
                                id:       result.data.json[i].tag_id,
                                name:     result.data.json[i].tag_name,
                                OU:       result.data.json[i].org_unit_id,
                                selected: false,
                                systemTag: (result.data.json[i].tag_name === 'callback') ? true : false
                            });
                        else
                            $scope.NonOUtags.push({
                                id:       result.data.json[i].tag_id,
                                name:     result.data.json[i].tag_name,
                                OU:       result.data.json[i].org_unit_id,
                                selected: false,
                                systemTag: (result.data.json[i].tag_name === 'callback') ? true : false
                            });

                    }
                    //$location.path('/setup-campaigns');
                    $scope.totalOUtagsRows=$scope.OUtags.length;
                    $scope.totalNonOUtagsRows=$scope.NonOUtags.length;
                    $scope.isLoadingApi = false;
                    $scope.canModify = true;
                }
                else {
                    pinesNotifications.notify({
                        title: 'Create tag',
                        text:  result.data.err,
                        type:  'error'
                    });

                }
            });
            $scope.ischecked = function (index, tag) {
                console.log(tag.selected);
                if (tag.selected) {
                    $scope.selected++;
                    $scope.selTags.push(tag.id);
                }
                else {
                    var arrindex = $scope.selTags.indexOf(tag.id);
                    if (arrindex > -1) {
                        $scope.selTags.splice(arrindex, 1);
                        $scope.selected--;
                    }
                }
            };

            $scope.deleteSelectedTags = function () {
                var errors = [];
                var tags = {};
                var tagMsg = "Are you sure you want to delete this Tag?";
                if($scope.selTags.length > 1){
                    tagMsg = "Are you sure you want to delete these Tags?";
                }
                if($scope.selected > 0){
                    $bootbox.confirm(tagMsg, function (clickedOK) {
                        if (clickedOK) {
                            // $scope.selTags.forEach(function (seltag) {
                            $scope.deltag = {
                                tag:{
                                    id: $scope.selTags
                                }
                            };

                            TagWebService.deleteTag($scope.deltag).then(function (response) {
                                if (response.data.result !== 'error') {
                                    $scope.deltag.tag.id.forEach(function (tag) {
                                        for (var i = 0; i < $scope.OUtags.length; i++) {
                                            if ($scope.OUtags[i].id === tag){
                                                $scope.OUtags.splice(i, 1);
                                                $scope.selected--;
                                            }
                                        }
                                    });
                                    var deleteTag = "Tag deleted successfully";
                                    if($scope.selTags.length > 1){
                                                deleteTag = "Tags deleted successfully";
                                            }
                                    pinesNotifications.notify({
                                        title: 'Tag',
                                        text:  deleteTag,
                                        type:  'success'
                                    });
                                    $scope.deltag = [];
                                    $scope.selTags = [];
                                }
                                else {
                                    pinesNotifications.notify({
                                        title: 'Tag',
                                        text:  "Error in deleting Tag" + response.data.err,
                                        type:  'error'
                                    });
                                }
                            });
                        }
                    });
                }
            };
            $scope.clearSelectedTags = function () {
                for (var i = 0; i < $scope.OUtags.length; i++) {
                    if ($scope.OUtags[i].selected) {
                        $scope.OUtags[i].selected = false;
                        $scope.selected--;
                    }
                }

                $scope.selTags = [];
                console.log('delete');
            };
            $scope.addTag = function () {
              $scope.isClicked =true;
                var tag = {
                    "tag": {
                        "tag_name":    $scope.tagText,
                        "org_unit_id": $rootScope.currentOUId
                    }


                };
                TagWebService.createTag(tag).then(function (result) {
                    console.log(result);
                    $scope.isClicked =false;
                    if (result.data.err === '') {
                        $scope.OUtags.push({id: result.data.json.tag_id, name: $scope.tagText, selected: false});
                        $scope.tagText = "";
                        pinesNotifications.notify({
                            title: 'Create Tag',
                            text:  'Successfully created tag',
                            type:  'success'
                        });

                        return;
                        //alert("Successfully updated campaign");

                        //$location.path('/setup-campaigns');
                    }
                    else {
                        pinesNotifications.notify({
                            title: 'Create tag',
                            text:  result.data.err,
                            type:  'error'
                        });

                    }
                });
                // $scope.OUtags.push({id:$scope.OUtags.length+1,name:$scope.tagText,selected:false});
            };

        }])

        .controller('CustomSourceController', ['$scope', '$filter', 'CustomSourceWebService', '$location', '$routeParams', '$rootScope', 'pinesNotifications','$bootbox',
        function ($scope, $filter, CustomSourceWebService, $location, $routeParams, $rootScope, pinesNotifications,$bootbox) {
            'use strict';
            if ($scope.userAccess.campaign >= 6)
                $scope.canModify = true;
            $scope.OU_Name = $rootScope.currentOUName;
            $scope.OUcustomSources = [];
            $scope.selected = 0;
            $scope.selCustomSources = [];
            $scope.ALLOUCustomSources = [];
            $scope.NonOUCustomSources = [];
            $scope.isClicked =false;
            $scope.isAssociated = 0;


            //  $scope.OUtags.push({id:1,name:"my Campaign",selected:false});
            //   $scope.OUtags.push({id:2,name:"Coolness",selected:false});
            //    $scope.OUtags.push({id:3,name:"Money Maker",selected:false});
            CustomSourceWebService.getCustomSources().then(function (result) {
                console.log(result);
                if (result.data.err === '') {
                    for (var i = 0; i < result.data.json.length; i++) {
                        if (result.data.json[i].editable)
                            $scope.OUcustomSources.push({
                                id:       result.data.json[i].custom_source_id,
                                name:     result.data.json[i].custom_source_name,
                                OU:       result.data.json[i].org_unit_id,
                                isAssociated :       result.data.json[i].isAssociated,
                                selected: false,
                                systemTag: (result.data.json[i].custom_source_name === 'callback') ? true : false
                            });
                        else
                            $scope.NonOUCustomSources.push({
                                id:       result.data.json[i].custom_source_id,
                                name:     result.data.json[i].custom_source_name,
                                OU:       result.data.json[i].org_unit_id,
                                isAssociated :       result.data.json[i].isAssociated,
                                selected: false,
                                systemTag: (result.data.json[i].custom_source_name === 'callback') ? true : false
                            });

                    }
                    //$location.path('/setup-campaigns');
                }
                else {
                    pinesNotifications.notify({
                        title: 'Create Custom Source',
                        text:  result.data.err,
                        type:  'error'
                    });

                }
            });
            $scope.ischecked = function (index, customSource) {
                console.log(customSource.selected);
                if (customSource.selected) {
                    $scope.selected++;
                    $scope.selCustomSources.push(customSource.id);
                    if(customSource.isAssociated){$scope.isAssociated++ ;}
                }
                else {
                    var arrindex = $scope.selCustomSources.indexOf(customSource.id);
                    if (arrindex > -1) {
                        $scope.selCustomSources.splice(arrindex, 1);
                        $scope.selected--;
                    }
                    if(customSource.isAssociated){$scope.isAssociated--;}
                }
            };

            $scope.deleteSelectedCustomSources = function () {
                var errors = [];
                var customSource = {};
                var msg = "Are you sure you want to delete this Custom Source?";
                if($scope.selCustomSources.length > 1){
                    msg = "Are you sure you want to delete these Custom Sources?";
                }
                if($scope.isAssociated > 0 && $scope.selCustomSources.length > 1){ msg = "Some of the custom sources are associated with callflows, Are you sure you want to delete this Custom Sources?"; }
                if($scope.isAssociated == 1 && $scope.selCustomSources.length == 1){ msg = "Some of the custom sources are associated with callflows, Are you sure you want to delete these Custom Source?"; }
                if($scope.selected > 0){
                    $bootbox.confirm(msg , function (clickedOK) {
                        if (clickedOK) {
                            // $scope.selTags.forEach(function (seltag) {
                            $scope.delcustomSource = {
                                customSource:{
                                    id: $scope.selCustomSources
                                }
                            };

                            CustomSourceWebService.deleteCustomSource($scope.delcustomSource).then(function (response) {
                                if (response.data.result !== 'error') {
                                    $scope.delcustomSource.customSource.id.forEach(function (customSource) {
                                        for (var i = 0; i < $scope.OUcustomSources.length; i++) {
                                            if ($scope.OUcustomSources[i].id === customSource){
                                                $scope.OUcustomSources.splice(i, 1);
                                                $scope.selected--;
                                            }
                                        }
                                    });
                                    var deleteMsg = "successfully deleted the custom source";
                                    if($scope.selCustomSources.length > 1){
                                        deleteMsg = "successfully deleted the custom sources";
                                    }
                                    pinesNotifications.notify({
                                        title: 'Custom Source',
                                        text:  deleteMsg,
                                        type:  'success'
                                    });
                                    $scope.delcustomSource = [];
                                    $scope.selCustomSources = [];
                                }
                                else {
                                    pinesNotifications.notify({
                                        title: 'Custom Source',
                                        text:  "Error in deleting Custom Source" + response.data.err,
                                        type:  'error'
                                    });
                                }
                            });
                        }
                    });
                }
            };
            $scope.clearSelectedCustomSources = function () {
                for (var i = 0; i < $scope.OUcustomSources.length; i++) {
                    if ($scope.OUcustomSources[i].selected) {
                        $scope.OUcustomSources[i].selected = false;
                        $scope.selected--;
                    }
                }

                $scope.selCustomSources = [];
                console.log('delete');
            };
            $scope.addCustomSource = function () {
              $scope.isClicked =true;
                var customSource = {
                    "customSource": {
                        "custom_source_name":    $scope.customSourceText,
                        "org_unit_id": $rootScope.currentOUId
                    }


                };
                CustomSourceWebService.createCustomSource(customSource).then(function (result) {
                    $scope.isClicked =false;
                    console.log(result);
                    if (result.data.err === '') {
                        $scope.OUcustomSources.push({id: result.data.json.custom_source_id, name: $scope.customSourceText, selected: false});
                        $scope.customSourceText = "";
                        pinesNotifications.notify({
                            title: 'Create Custom Source',
                            text:  'Successfully created custom source',
                            type:  'success'
                        });

                        return;
                        //alert("Successfully updated campaign");

                        //$location.path('/setup-campaigns');
                    }
                    else {
                        pinesNotifications.notify({
                            title: 'Create Custom Source',
                            text:  result.data.err,
                            type:  'error'
                        });

                    }
                });
                // $scope.OUtags.push({id:$scope.OUtags.length+1,name:$scope.tagText,selected:false});
            };

        }]);
