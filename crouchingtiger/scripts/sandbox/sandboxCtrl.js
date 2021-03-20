
angular.module('sandboxing', [])
  .controller('whatever', ['$scope', function ($scope) {

    $scope.columnCollection = ['column1', 'column2', 'column3', 'column4', 'column5', 'column6'];

    $scope.rowCollection = Array
      .apply(null, { length: 200 })
      .map(function() {

        return $scope.columnCollection.map(function (v, n) {
          return 'foo ' + n;
        });

      });

      //any plugins here
      // $(document).ready(function () {
      //   $("#bottom").freezeHeader({offset : '40px'});
      //   $("#one").freezeHeader({offset : '40px'});
      // });

  }]);
