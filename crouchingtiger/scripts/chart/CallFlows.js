angular.module('call-flows', [])
  .controller('CallFlowsController', ['$scope', '$timeout', '$uibModal', '$bootbox', '$log', function ($scope, $timeout, $uibModal, $bootbox, $log) {
	'use strict';	
	
	$scope.callsByDay = {
      data: [		  
          { y: 'Sun', a: 55 },
          { y: 'Mon', a: 22 },
          { y: 'Tues', a: 175 },
          { y: 'Wed', a: 50},
          { y: 'Thurs', a: 75},
          { y: 'Fri', a: 150 },
          { y: 'Sat', a: 75 }
      ],
	  parseTime: false,
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Calls'],
	  xLabels: 'day'
    };
	$scope.uniqueRepeatCallFlow = {
        data: [
            { y: 'Yellow Pages', a: 100, b: 11 },
            { y: 'Google', a: 75,  b: 12 },
            { y: 'Bing', a: 50,  b: 5 },
        ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Unique', 'Repeat']
    };
	
	$scope.callsByCallFlow = {
        data: [
            { y: 'Sunday', a: 100, b: 90 },
            { y: 'Monday', a: 75,  b: 65 },
            { y: 'Tuesday', a: 50,  b: 40 },
            { y: 'Wednesday', a: 75,  b: 65 },
            { y: 'Thursday', a: 50,  b: 40 },
            { y: 'Friday', a: 75,  b: 65 },
            { y: 'Saturday', a: 50, b: 90 }
        ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Yellow Pages', 'Google']
    };
	
    $scope.totalUniqueRepeat = {
        data: [
            {label: "Unique", value: 125},
            {label: "Repeat", value: 30}
        ]
    };
	
	$scope.totalAnsweredMissed = {
        data: [
            {label: "Answered", value: 144},
            {label: "Missed", value: 11}
        ]
    };	
	
	$scope.callsByDayByCallFlow = {
      data: [
          { y: 'Sun', a: 100, b: 90 },
          { y: 'Mon', a: 75,  b: 65 },
          { y: 'Tues', a: 50,  b: 40 },
          { y: 'Wed', a: 75,  b: 65 },
          { y: 'Thurs', a: 50,  b: 40 },
          { y: 'Fri', a: 75,  b: 65 },
          { y: 'Sat', a: 100, b: 90 }
      ],
	  parseTime: false,
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Yellow Pages', 'Google']
    };
	
	$scope.cfCharts = [
		{ heading: 'Calls By Day', source: $scope.callsByDay, type: 'Line' },
		{ heading: 'Calls by Call Flow', source: $scope.callsByCallFlow, type: 'Bar' },
		{ heading: 'Total Unique/Repeat', source: $scope.totalUniqueRepeat, type: 'Donut' },
	];
	
	$scope.items = [
		{ heading: 'Unique/Repeat by Call Flow', source: $scope.uniqueRepeatCallFlow, type: 'Bar', status: false },
		{ heading: 'Total Unique/Repeat', source: $scope.totalUniqueRepeat, type: 'Donut', status: true },
		{ heading: 'Total Answered/Missed', source: $scope.totalAnsweredMissed, type: 'Donut', status: false },
		{ heading: 'Calls By Day', source: $scope.callsByDay, type: 'Line', status: true },
		{ heading: 'Calls by Call Flow', source: $scope.callsByCallFlow, type: 'Bar', status: true },
		{ heading: 'Calls by Day by Call Flow', source: $scope.callsByDayByCallFlow, type: 'Area', status: false }
	];
	$scope.selectedChart = null;
			
	$scope.open = function (size, locationIndex) {
		//console.log($scope.items);
		  var modalInstance = $uibModal.open({
			templateUrl: 'myModalContent.html',
			controller: function ($scope, $uibModalInstance, items, cfCharts) {
			  $scope.items = items;
			  $scope.cfCharts = cfCharts;
			  $scope.selected = {
				item: $scope.items[0].heading
			  };
			  
			  $scope.setChart = function(reportIndex) {
				var duplicate = false;
				$.each($scope.cfCharts, function(index, value) {
					if(value.heading == $scope.items[reportIndex].heading) duplicate = true;
				});
				if(duplicate)  {
					alert('That report is already being displayed');
				}
				else {
					$.each($scope.items, function(index, value) {
						if(value.heading == $scope.cfCharts[locationIndex].heading) {
							$scope.items[index].status = false;
						}
					});
					$scope.items[reportIndex].status = true;
					$scope.cfCharts[locationIndex] = $scope.items[reportIndex];
					
					$uibModalInstance.close($scope.selected.item);
				}
			  };

			  $scope.ok = function () {
				$uibModalInstance.close($scope.selected.item);
			  };

			  $scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			  };
			},
			size: size,
			resolve: {
			  items: function () {
				return $scope.items;
			  },
			  cfCharts: function () {
				return $scope.cfCharts;
			  }
			}
		  });

		  modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		  }, function () {
			$log.info('Modal dismissed at: ' + new Date());
		  });
    };
	
	
  }]);
