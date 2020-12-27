myApp.controller('LoginController', ['$scope', '$rootScope', 'DBService', '$location', 'toaster',
    function ($scope, $rootScope, DBService, $location, toaster) {
        $scope.CheckandLogin = function (objForm) {
            if(objForm != null)
                var IsCompleted = objForm.$valid;

            if(IsCompleted == true)
                DBService.checkCredentials($scope.LoginUser, $scope.fnSuccessfull);
            else
                toaster.pop('warning', "Missing values", "Please fill up the required fields");
        };

        $scope.fnSuccessfull = function (iAvailableCount) {
            if (iAvailableCount > 0)
                $location.path('/Dashboard');
            else
                toaster.pop('warning', "Incorrect credentials", "EmailId or Experience is incorect");

        }

    }
]);