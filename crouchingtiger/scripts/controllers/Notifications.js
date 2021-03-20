angular
  .module('theme.notifications-controller', [])
  .controller('NotificationsController', ['$scope', '$filter', function ($scope, $filter) {
    'use strict';
    $scope.notifications = [
      { text: 'You are within 10% of your minutes usage', time: '4m', class: 'notification-warning', iconClasses: 'fa fa-warning', seen: false },
      { text: 'Call volume is 80% above your average', time: '10m', class: 'notification-success', iconClasses: 'fa fa-check', seen: false },
      { text: 'Conversion Rate for Online:Paid Search is 50% below last week', time: '22m', class: 'notification-danger', iconClasses: 'fa fa-exclamation', seen: true },
      { text: 'Lead Score for Mobile:Organic Search is 75% above last week', time: '30m', class: 'notification-success', iconClasses: 'fa fa-check', seen: true },
      //{ text: 'New order received', time: '1h', class: 'notification-order', iconClasses: 'fa fa-shopping-cart', seen: true },
      //{ text: 'Application error!', time: '9d', class: 'notification-danger', iconClasses: 'fa fa-times', seen: true },
      //{ text: 'Installation Succeeded', time: '1d', class: 'notification-success', iconClasses: 'fa fa-check', seen: true },
      //{ text: 'Account Created', time: '2d', class: 'notification-success', iconClasses: 'fa fa-check', seen: true },
    ];

    $scope.setSeen = function (item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.seen = true;
    };

    $scope.setUnseen = function (item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.seen = false;
    };

    $scope.setSeenAll = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      angular.forEach ($scope.notifications, function (item) {
        item.seen = true;
      });
    };

    $scope.unseenCount = $filter('filter')($scope.notifications, {seen:false}).length;

    $scope.$watch('notifications', function (notifications) {
      $scope.unseenCount = $filter('filter')(notifications, {seen:false}).length;
    }, true);
  }]);
