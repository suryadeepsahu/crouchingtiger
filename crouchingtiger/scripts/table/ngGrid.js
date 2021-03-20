angular
  .module('theme.tables-ng-grid', [])
  .controller('TablesAdvancedController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
    'use strict';
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [25, 50, 100],
        pageSize: 25,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
	$scope.jsonFile2 = 'assets/demo/ng-data-copy.json';
	$scope.$watch('jsonFile2', function (newVal, oldVal) {
        if (newVal !== oldVal) {
			if($scope.jsonFile2 == 'assets/demo/ng-data-by-phone.json') {
				$scope.selectedColumns = [
					{field:'Name', displayName:'Name'}, 
					{field:'PhoneNumber', displayName:'Phone Number'}, 
					{field:'Total', displayName:'Total'},
					{field:'Unique', displayName:'Unique'}, 
					{field:'Answered', displayName:'Answered'}, 
					{field:'Missed', displayName:'Missed'}, 
					{field:'AvgCallTime', displayName:'Avg. Call Time'}, 
					{field:'TotalMinutes', displayName:'Total Minutes'}
				];
			}
			else {
				$scope.selectedColumns = [
					{field:'Name', displayName:'Name'},  
					{field:'Total', displayName:'Total'},
					{field:'Unique', displayName:'Unique'}, 
					{field:'Answered', displayName:'Answered'}, 
					{field:'Missed', displayName:'Missed'}, 
					{field:'AvgCallTime', displayName:'Avg. Call Time'}, 
					{field:'TotalMinutes', displayName:'Total Minutes'}
				];
			}
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		  
        }
    }, true);
	
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get($scope.jsonFile2).success(function (largeLoad) {        
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get($scope.jsonFile2).success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
	
    $scope.selectedColumns = [
		{field:'Name', displayName:'Name'}, 
		{field:'Total', displayName:'Total'},
		{field:'Unique', displayName:'Unique'}, 
		{field:'Answered', displayName:'Answered'}, 
		{field:'Missed', displayName:'Missed'}, 
		{field:'AvgCallTime', displayName:'Avg Call Time'}, 
		{field:'TotalMinutes', displayName:'Total Minutes'}
	];
			
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
		columnDefs: 'selectedColumns',
        filterOptions: $scope.filterOptions,
		showGroupPanel: false
    };
	//console.log($scope.gridOptions.columnDefs);
  }]);
