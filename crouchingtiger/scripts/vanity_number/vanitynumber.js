angular
    .module('vanity-number', ['ui.bootstrap', 'angularFileUpload', 'theme.services', "api-param", 'xeditable', "theme.form-directives"])
    .factory('VanityWebService', function ($timeout, $http, ApiParam) {
        'use strict';
        var VanityWebService = {};

        VanityWebService.getPrefix = function () {
            $http.defaults.useXDomain = true;
            var url = ApiParam.baseURL() + "/v10/prefix";
            return $http.get(url, ApiParam.headerConfig());
        };
        VanityWebService.getVanityNumber = function (areaCode, phraseCriteria, phrase) {
            console.log("ARea code ", areaCode, phraseCriteria, phrase);
            $http.defaults.useXDomain = true;
            var url = ApiParam.baseURL() + "/v10/getVanityNumber?areaCode=" + areaCode + "&phraseCriteria=" + phraseCriteria + "&phrase=" + phrase;
            return $http.get(url, ApiParam.headerConfig());
        };
        /*VanityWebService.sendCardInfoOnMail = function(){
            console.log("sending emaillll...")
        };*/
        return VanityWebService;
    })
    .factory('SendCardInfoOnMail', function ($timeout, $http, ApiParam, $cookieStore) {
        'use strict';
        var SendCardInfoOnMail = {};
        SendCardInfoOnMail.sendMail = function (formData) {
            console.log("sending emaillll to... ", formData.firstName, " ", formData.lastName, " ", formData.phoneNumber, " ", formData.contactReference, $cookieStore.get('cardCookierdList'));
            var personInfo = formData.firstName + "," + formData.lastName + "," + formData.phoneNumber + "," + formData.contactReference;
            $http.defaults.useXDomain = true;
            var url = ApiParam.baseURL() + "/v10/sendCardInfoMail?personInfo=" + personInfo + "&cardInfo=" + JSON.stringify($cookieStore.get('cardCookierdList'));
            return $http.get(url, ApiParam.headerConfig());
        };
        return SendCardInfoOnMail;
    })
    .controller('VanityNumberController', ['$scope', 'VanityWebService', '$cookieStore', '$rootScope',
        function ($scope, VanityWebService, $cookieStore, $rootScope) {
            'use strict';
            $scope.addToCart = function (a) {
                var today = new Date();
                var expiresValue = new Date(today);
                expiresValue.setMinutes(today.getMinutes() + 1);
                var storedCookieValue = [];
                storedCookieValue = $cookieStore.get('cardCookierdList');
                if ($cookieStore.get('cardCookierdList')) {
                    storedCookieValue.push({
                        toll_free_number: $scope.searchResults[a].toll_free_number,
                        vanity_number: $scope.searchResults[a].vanity_number
                    })
                } else {
                    storedCookieValue = [{
                        toll_free_number: $scope.searchResults[a].toll_free_number,
                        vanity_number: $scope.searchResults[a].vanity_number
                    }]
                }
                $cookieStore.put('cardCookierdList', storedCookieValue, { 'expires': expiresValue });
                console.log('============ $cookieStore.get========', $cookieStore.get('cardCookierdList'));
                setTimeout(function () {
                    console.log("1111111111111111111188888888888888888888888888888888888888")
                    console.log("cookieee expire ....");
                    console.log("2222222222222222");
                    if ($cookieStore.get('cardCookierdList')) {
                        console.log("9999999999999999999999999999")
                        storedCookieValue = 0;
                        $cookieStore.put('cardCookierdList', storedCookieValue, [{ 'expires': expiresValue }]);
                        console.log('4444444444444444444444444444',$cookieStore.get('cardCookierdList'))
                    }
                }, 3000);
                VanityWebService.getCardCount();
                VanityWebService.getCardCount();
            };
            $rootScope.showHeaderOnVanity = false;
            $scope.resultLength = 0;
            $scope.limit = 5;
            $scope.currentOffset = -1;
            $scope.searchVanityNumber = function () {
                var searchResults = [];
                $scope.wholeResultSet = [];
                $scope.paginationNumbers = [];
                VanityWebService.getVanityNumber($scope.araCodeNPA, $scope.phraseCriteria, $scope.phrase).then(function (result) {
                    console.log("Search result => ", result.data.json);
                    console.log("Search result => ", result.data.json);
                    $scope.currentOffset = 0;
                    for (var i = 0; i < result.data.json.length; i++) {
                        $scope.wholeResultSet.push({
                            toll_free_number: result.data.json[i].toll_free_number,
                            vanity_number: result.data.json[i].vanity_number
                        });
                    }
                    for (var i = 0; i < $scope.limit; i++) {
                        searchResults.push({
                            toll_free_number: result.data.json[i].toll_free_number,
                            vanity_number: result.data.json[i].vanity_number
                        });
                    }
                    $scope.searchResults = searchResults;
                    $scope.resultLength = result.data.json.length;
                    $scope.paginationSlots = parseInt(result.data.json.length / $scope.limit);
                    if (result.data.json.length % $scope.limit > 0) {
                        $scope.paginationSlots += 1;
                    }

                    console.log(" $scope.paginationSlots => ", $scope.paginationSlots);
                    for (var i = 0; i < $scope.paginationSlots; i++) {
                        $scope.paginationNumbers.push(i);
                    }
                })
            };
            $scope.viewData = function (offset) {
                console.log("offset --> ", offset, (offset * $scope.limit));
                offset = offset * $scope.limit;
                $scope.currentOffset = offset;
                $scope.searchResults = [];
                for (var i = offset; i < ($scope.limit) + offset; i++) {
                    $scope.searchResults.push({
                        toll_free_number: $scope.wholeResultSet[i].toll_free_number,
                        vanity_number: $scope.wholeResultSet[i].vanity_number
                    });
                }
                console.log("Rsult set after pagination => ", $scope.searchResults);
            };
            $scope.removeNumberFromcart = function (number) {
                console.log("number removed from cart", number);
            };
            VanityWebService.getPrefix().then(function (result) {
                var areaCode = [];
                console.log("Result length => ", result.data.json.length);
                for (var i = 0; i < result.data.json.length; i++) {
                    areaCode.push(result.data.json[i].prefix);
                }
                $scope.areacodes = areaCode;
                $scope.araCodeNPA = $scope.areacodes[0];
                VanityWebService.getCardCount();
            });
            $scope.getCardCount = 0;
            VanityWebService.getCardCount = function () {
                if ($cookieStore.get('cardCookierdList')) {
                    $scope.getCardCount = $cookieStore.get('cardCookierdList').length;
                }
            };
            $("[data-toggle=popover]").popover({ html: true });

            $scope.Numbers = $cookieStore.get('cardCookierdList');

        }
    ])
    .filter('NumberHTML', function () {
        return function (numbers) {
            var html = '';
            for (number in numbers) {
                html += '<tr>';
                html += '<td class="cart_tollfree"><i class="fa fa-phone mr-1 text-coral"></i><b>' + numbers[number].toll_free_number + '</b></td>';
                html += "<td id='cart_" + numbers[number].toll_free_number + "'>" + numbers[number].vanity_number + "<a href='javascript:angular.element(document.getElementById(`cart_" + numbers[number].toll_free_number + "`)).scope().removeNumberFromcart(" + numbers[number].toll_free_number + ");'>x</a></td>";
                html += '</tr>';
            }
            return html;
        };
    })
    .controller("requestQuoteController", ['$scope', 'SendCardInfoOnMail', '$rootScope', '$cookieStore', '$location',
        function ($scope, SendCardInfoOnMail, $rootScope, $cookieStore, $location) {
            'use strict';

            $rootScope.showHeaderOnVanity = false;
            console.log("cardCookie--- ", $cookieStore.get('cardCookierdList'), $cookieStore.get('cardCookierdList').length);
            $scope.cartNumbers = $cookieStore.get('cardCookierdList');
            $scope.cartNumbersLength = $cookieStore.get('cardCookierdList').length;
            $scope.sendCardInfoOnMail = function () {
                //var mailStatus = SendCardInfoOnMail.sendMail();
                //console.log("mailStatus => ",mailStatus)
                SendCardInfoOnMail.sendMail($scope).then(function (result) {
                    console.log("1234 ", result);
                    $cookieStore.remove('cardCookierdList');
                    $location.path('/vanity-number');
                });
                console.log("Emaillllllllllll");
                console.log("First name=> ", $scope.firstName, " LastName=> ", $scope.lastName, " Phonenumber=> ", $scope.phoneNumber, " ContactReference=> ", $scope.contactReference);

            }
        }
    ]);