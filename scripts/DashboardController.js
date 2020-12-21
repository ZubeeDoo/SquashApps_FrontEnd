myApp.controller('DashboardController', ['$scope', '$rootScope', 'DBService', '$location',
  function ($scope, $rootScope, DBService, $location) {
    $scope.initCtrl = function () {
      DBService.getAllData($scope.GetAllDataHandler);
    };

    $scope.GetAllDataHandler = function (objResponse) {
      if (objResponse.length > 0) {
        $scope.AllData = objResponse;

        $scope.$apply();
      }
    }

    $scope.initCtrl();
  }
]);