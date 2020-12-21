myApp.controller('LoginController', ['$scope', '$rootScope', 'DBService', '$location',
    function ($scope, $rootScope, DBService, $location) {
        $scope.CheckandLogin = function () {
            DBService.checkCredentials($scope.LoginUser, $scope.fnSuccessfull);
        };

        $scope.fnSuccessfull = function (iAvailableCount) {
            if (iAvailableCount > 0)
                $location.path('/Dashboard');
        }

    }
]);