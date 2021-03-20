(function () {
    angular
    .module('distributionList', [ "isteven-multi-select" ])
    .controller('distributionListController', ['$scope', '$rootScope', '$uibModal','$routeParams', 'pinesNotifications', 'OrgUnitLocal', '$location', '$filter', 'distributionListWebservices', '$bootbox','$q', '$timeout',
        function ($scope, $rootScope, $uibModal, $routeParams, pinesNotifications, OrgUnitLocal, $location, $filter, distributionListWebservices, $bootbox, $q, $timeout) {
            $scope.campaignAndAssignedUsers = [];
            $scope.selectList = [];
            $scope.recipientList = [];
            $scope.listData = {};
            $scope.isLoadingApi = true;
            $scope.roleId = $rootScope.roleId;
            $scope.userId = parseInt($rootScope.userId);
            $scope.isAdmin = (parseInt($scope.roleId) === 1) ? true : false;
            $scope.isDataLoaded = true;
            $scope.setDistHeaders = ['Name', 'Usage'];
            $scope.setDistBuildHeaders = ['Name', 'Frequency', 'Format'];
            $scope.actionHeader = ['Actions'];
            $rootScope.isSafari= /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);

            $scope.openDistributionListModal = function (size, listId) {
                $scope.isModelOpened = true;
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/addDistList.html',
                    controller: 'distributionListModalController',
                    size: size,
                    backdrop : 'static',
                    resolve: {
                        listIdAndData: function () {
                            if (listId === undefined) {
                                $scope.listData = {};
                            }
                            return [listId, $scope.listData];
                        }
                    }
                });

                modalInstance.opened.then(function() {
                    $scope.isModelOpened = false;
                });

                modalInstance.result.then(function (selectedItem) {
                    distributionListWebservices.getDistributionList().then(function (response) {
                        $scope.distributionList = response.data.json;
                    });
                });
            };

            distributionListWebservices.getDistributionList().then(function (response) {
                if (response.data.status === 'error') {
                    pinesNotifications.notify({
                        title: 'Error in getting distribution list',
                        text: response.err,
                        type: 'error'
                    });
                } else {
                    $scope.distributionList = response.data.json;
                    $scope.isLoadingApi = false;
                    $scope.totalDataRows=$scope.distributionList.length;

                    // distributionListWebservices.getcampaignAndAssignedUser().then(function (response2) {
                    //     $scope.selectList = response2.data.json;
                    //     $scope.isDataLoaded = false;
                    // });
                }
            });

            $scope.deleteDistributionList = function(list, index) {
                var message = "";
                if (list.report_name !== "") { message = "This distribution list is associated with schedule report,"; }
                message += " Are you sure you want to delete this Distribution List?";

                $bootbox.confirm(message, function (clickedOK) {
                    if (clickedOK) {
                        distributionListWebservices.removeDistributionList(list.list_id).then(function (response) {
                            if (response.data.status === 'success') {
                                $scope.distributionList.splice(index, 1);
                                pinesNotifications.notify({
                                    title: 'Distribution List',
                                    text: 'Successfully deleted the distribution list',
                                    type: 'success'
                                });
                            } else {
                                pinesNotifications.notify({
                                    title: 'Distribution List',
                                    text: response.data.err,
                                    type: 'error'
                                });
                            }
                        });
                    }
                });
            };

            $scope.editDistributionList = function(size, listId) {
                $scope.isModelOpened = true;
                distributionListWebservices.getDistributionListData(listId).then(function (response) {
                    if (response.data.status === 'error') {
                        pinesNotifications.notify({
                            title: 'Error in getting distribution list data',
                            text: response.err,
                            type: 'error'
                        });
                        $scope.listData = {};
                    } else {
                       $scope.listData = response.data.json;
                       var selectedCampaigns = [];
                       _.each($scope.listData.recipientlist, function(list) {
                            if(list.recipientType === "campaign")
                                selectedCampaigns.push(list.recipientTypeValue);
                        });
                       if(selectedCampaigns.length > 0) {
                            distributionListWebservices.campaignUsers(selectedCampaigns).then(function (response) {
                                if(response.data.status === "success") {
                                    $scope.listData.selectedCampaignUsers = response.data.json;
                                    $scope.openDistributionListModal(size, listId);
                                }
                            });
                       } else {
                        $scope.openDistributionListModal(size, listId);
                       }

                    }
                });
            };

            $scope.getCSVData = function (formate) {
                var rowsOfData = [];
                $scope.headerNames = ["Name","Usage"];

                var deferred = $q.defer();
                rowsOfData = finalizaDataToExport($scope.distributionList);
                deferred.resolve(rowsOfData);
                if($rootScope.isSafari){
          		    var reportName = "csv_distribution_list";
          		    if(formate === 'tsv'){ reportName = "tsv_distribution_list";}
          		    deferred.resolve(JSONToCSVConvertor(rowsOfData,reportName,true,formate));
          		  }
                if(!$rootScope.isSafari){
            		    return deferred.promise;
            		}
            };

            $scope.getExcelData = function () {
                var rowsOfData = [];
                $scope.headerNames = ["Name","Usage"];

                var deferred = $q.defer();
                rowsOfData = finalizaDataToExport($scope.distributionList);
                alasql('SELECT * INTO XLSX("xls_distribution_list.xlsx",{sheetid:"Sheet name",headers:true}) FROM ?',[rowsOfData]);
                deferred.resolve(rowsOfData);

                return deferred.promise;
            };

            function finalizaDataToExport(rawData) {
                var rowsOfData = [];
                _.each(rawData, function (data) {
                    rowsOfData.push({
                        "Name" : data.list_name,
                        "Usage" : data.report_name
                    });
                });
                return rowsOfData;
            }
        }
    ])
    .controller('distributionListModalController', ['$scope', '$rootScope', '$uibModalInstance','$routeParams', 'pinesNotifications', 'OrgUnitLocal', '$location', '$filter', 'listIdAndData', 'distributionListWebservices',
        function ($scope, $rootScope, $uibModalInstance, $routeParams, pinesNotifications, OrgUnitLocal, $location, $filter, listIdAndData, distributionListWebservices, $) {
            $scope.distributionListHeadingText = "Create a Distribution List";
            $scope.campaignAndAssignedUsers = listIdAndData[1];
            $scope.listData = {};
            $scope.distributionActive = false;
            $scope.campaignUsers    = [];
            if (listIdAndData[0] !== undefined) {
                $scope.distributionListHeadingText = "Edit a Distribution List";
                makeListData(listIdAndData[1]);
                if(listIdAndData[1].selectedCampaignUsers !== undefined) {
                    $scope.campaignUsers = getCampaignUsers(listIdAndData[1].selectedCampaignUsers);
                }
            }

            $scope.dropdownListData = getDropdownOptions($scope.campaignAndAssignedUsers, listIdAndData);

            $scope.saveDistributionList = function() {
                $scope.distributionActive = true;
                var saveData = {
                    distributionlist : {
                        org_unit_id : $rootScope.currentOUId,
                        list_name: $scope.listData.list_name,
                        from_label: '', //this is not used
                        recipientlist:[],
                        additionalemails : $scope.listData.additionalEmails
                    }
                };

                if(($scope.listData.additionalEmails === undefined || $scope.listData.additionalEmails === '')){
                    $scope.distributionActive = false;
                    pinesNotifications.notify({
                        title: 'Distribution List',
                        text: 'Please enter Emails.',
                        type: 'error'
                    });
                    return;
                }
				 _.each($scope.distributionMultiselect, function(list){
                    saveData.distributionlist.recipientlist.push({
                        recipientType: list.type,
                        recipientTypeValue : list.id.toString()
                    });
                });

                if (listIdAndData[0] !== undefined) {
                    saveData.distributionlist.list_id = listIdAndData[0];
                    distributionListWebservices.updateDistributionList(saveData).then(function (response) {
                        if (response.data.status === 'error') {
							              $scope.distributionActive = false;
                            pinesNotifications.notify({
                                title: 'Distribution List',
                                text: 'Error in updating distribution list data',
                                type: 'error'
                            });
                        } else {
                            $scope.distributionActive = false;
                            pinesNotifications.notify({
                                title: 'Distribution List',
                                text: 'Distribution List is updated Successfully',
                                type: 'success'
                            });
                            $uibModalInstance.close();
                        }
                    });
                } else {
                    distributionListWebservices.addDistributionList(saveData).then(function (response) {
                        if (response.data.status === 'error') {
							$scope.distributionActive = false;
                            pinesNotifications.notify({
                                title: 'Distribution List',
                                text: 'Error in saving distribution list data',
                                type: 'error'
                            });
                        } else {
                            $scope.distributionActive = false;
                            pinesNotifications.notify({
                                title: 'Distribution List',
                                text:  'Distribution List is saved Successfully',
                                type:  'success'
                            });
                            $uibModalInstance.close();
                        }
                    });
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            function makeListData(data){
                $scope.listData.from_label = data.listData.from_label;
                $scope.listData.list_name = data.listData.list_name;
                $scope.listData.additionalEmails = data.additionalEmails;
            }

            function getDropdownOptions(campaignAndAssignedUsers, listData) {
              console.log('LIST DATA IN DL DROPDOWN', listData);
                var selectedCampaigns = [];
                var selectedUsers = [];
                var focusedUsers = [];
                if (listData[0] !== undefined) {
                    _.each(listData[1].recipientlist, function(list) {
                        if(list.recipientType === "campaign")
                            selectedCampaigns.push(list.recipientTypeValue);
                        else
                            selectedUsers.push(list.recipientTypeValue);
                    });

                     _.each(listData[1].selectedCampaignUsers, function(user) {
                        _.each(user.usersid.split(","), function(id) {
                            focusedUsers.push(parseInt(id.replace("user-","")));
                        });
                    });
                }

                var allOptions = [{
                    name: '<strong>Campaign Users</strong>',
                    msGroup: true
                }];

                if(campaignAndAssignedUsers !== undefined && campaignAndAssignedUsers.campList !== undefined) {
                    _.each(campaignAndAssignedUsers.campList, function(data) {
                        var tempHash = {
                            icon: '',
                            name: data.campaign_name,
                            type: data.type,
                            ticked: selectedCampaigns.indexOf(data.id) === -1 ? false : true,
                            id: data.id,
                            isCampaign:true,
                            class:''
                        };
                        if(data.campaign_name && data.campaign_name.trim() !== "")
                            allOptions.push(tempHash);
                    });
                }

                allOptions.push({msGroup: false});
                allOptions.push({name: '<strong>Users</strong>',msGroup: true});

                if(campaignAndAssignedUsers !== undefined && campaignAndAssignedUsers.userList !== undefined) {
                    _.each(campaignAndAssignedUsers.userList, function(data) {
                        var tempHash = {
                            icon: '',
                            name: data.user_name + " - " + data.email,
                            type: data.type,
                            ticked: selectedUsers.indexOf(data.id) === -1 ? false : true,
                            id: data.id,
                            isCampaign:false,
                            class:focusedUsers.indexOf(data.id) === -1 ? '' : 'focused'
                        };
                        if(data.user_name && data.user_name.trim() !== "")
                            allOptions.push(tempHash);
                    });
                }

                allOptions.push({msGroup: false});
                return allOptions;
            }

            function getCampaignUsers(campaignAndAssignedUsers) {
                var usersHash = [];
                var usersString = "";
                var nameHash = [];
                if(campaignAndAssignedUsers !== undefined) {
                    _.each(campaignAndAssignedUsers, function(data) {
                        var usersIds = data.usersid.split(",");
                        var index = _.indexOf(usersIds, "user-" + data.owner_id);
                        var tempHash = {
                            id: data.campaignid,
                            users: "",
                            user_ids: (data.usersid !== "" ? data.usersid + (index !== -1 && data.usersid !== "" ? "," : "") :"") + (index === -1 ? "user-" + data.owner_id : "")
                        };

                        if(data.usersname !== "") {
                            nameHash = data.usersname.split(",");
                        }
                        if(index === -1)
                            nameHash.push(data.ownername);

                        usersString = nameHash.map(function(name){
                            return "<div>" + name+"</div>";
                        }).join("");

                        tempHash.users = usersString;
                        usersHash.push(tempHash);
                    });
                }
                return usersHash;
            }
        }
    ]);
}());
