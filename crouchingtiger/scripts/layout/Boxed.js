angular
.module('theme.layout-boxed', [])
.controller('BoxedPageController', ['$scope', '$global', function ($scope, $global) {
	'use strict';
$global.set('layoutBoxed', true);

$scope.$on('$destroy', function () {
  $global.set('layoutBoxed', false);
});
}]);
