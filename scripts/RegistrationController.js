
  
myApp.controller('RegistrationController', ['$scope', '$rootScope', '$q', 'DBService', '$state', '$location', function($scope, $rootScope, $q, DBService, $state, $location) 
{
    $scope.initCtrl = function()
    {
        $scope.Header = [
            {Name: "Personal details", IsActivated : true, IsCompleted : false, UrlState: "Registration.PersonalDetails"},
            {Name: "Company details", IsActivated : false, IsCompleted : false, UrlState : "Registration.CompanyDetails"},
            {Name: "Email verification", IsActivated : false, IsCompleted : false, UrlState :"Registration.EmailVerification"},
        ];

        $scope.User = {};

        $scope.CurrentState = 0;
        $scope.OTPDigits = 5;
        $state.go('Registration.PersonalDetails', {});

        $scope.otpInput={
            size:$scope.OTPDigits,
            type:"text",
            onDone: function(value){
                console.log(value);
            },
            onChange: function(value){
                console.log(value);
            }
        }
        
    };

    $scope.NextPageIfValid = function(objForm)
    {

        if(objForm != null && objForm.$valid)
        {
            $scope.Navigate(true);
        }
    };

    $scope.Back = function(objForm)
    {
        if(objForm != null)
            var IsCompleted = objForm.$valid;

        $scope.Navigate(false, IsCompleted);
    };

    $scope.Navigate = function(IsForward, IsCompleted = true)
    {
        if($scope.Header.length == $scope.CurrentState + 1)
        {
            $scope.AddToDB();

            return null;
        }

        if($scope.Header.length > $scope.CurrentState)
        {
            var objCurrentPage = $scope.Header[$scope.CurrentState];
            objCurrentPage.IsActivated = false;
            objCurrentPage.IsCompleted = IsCompleted;

            if(IsForward)
                $scope.CurrentState = $scope.CurrentState + 1;
            else
                $scope.CurrentState = $scope.CurrentState - 1;


            var objPage = $scope.Header[$scope.CurrentState];
            objPage.IsActivated = true;
            objPage.IsCompleted = false;

            if(objPage.hasOwnProperty("UrlState") == true)
                $state.go(objPage.UrlState, {});

            setTimeout(function()
            {
                $scope.$apply();
                $rootScope.$apply();
            }, 10);
        }
    }
    
    $scope.AddToDB = function() {
      DBService.add($scope.User)
        .then(function(objResponse) {
            $location.path("/Thankyou");
            console.log(objResponse);
        })
        .then(function() {
        })
    };

    $scope.initCtrl();
    
  }]);