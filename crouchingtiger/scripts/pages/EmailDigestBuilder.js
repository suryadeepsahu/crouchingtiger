angular.module('email-digest-builder', [])
  .controller('EmailDigestBuilderController', ['$scope', '$uibModal', function ($scope, $uibModal ) {
  		'use strict';
		$scope.tempTest = "alert('test');";
		$scope.open = function (size) {
		  $scope.captainModalInstance = $uibModal.open({
		  templateUrl: 'addWidgetModal.html',
		  controller: 'captainModalInstanceCtrl',
		  size: size
		  });
		};
				
  }])
  	.controller('captainModalInstanceCtrl', ['$scope', '$uibModalInstance', 'selectedTitle', 'boxWidth',function ($scope, $uibModalInstance,selectedTitle, boxWidth) {
		  $scope.ok = function () {
		    console.log(selectedTitle);
				$uibModalInstance.close();
				addBox(selectedTitle, boxWidth);
			  };

			  $scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			  };
	
	
  }])
  .directive('ngSparkline', function() {
  	'use strict';
  return {
    restrict: 'A',
    template: '<div class="sparkline"></div>'
  };
});
  

function addBox(selectedTitle, boxWidth) {
	var temp = gridster.add_widget('<li class="new" id="'+idIndex+'">'+selectedTitle+'<a href="javascript:delBox('+idIndex+')"> X</a></li>', boxWidth, 1);
	idIndex++;
}

function delBox(passedId) {
	gridster.remove_widget( $('#'+passedId) );
}

function addElement(text) {
	alert(text);
}