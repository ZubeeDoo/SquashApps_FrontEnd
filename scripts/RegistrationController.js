
  
myApp.controller('RegistrationController', ['$scope', '$rootScope', '$q', 'DBService', '$state', '$location', function($scope, $rootScope, $q, DBService, $state, $location) 
{
    $scope.initCtrl = function()
    {
        $scope.Header = [
            {Name: "Personal details", IsActivated : true, IsCompleted : false, UrlState: "Registration.PersonalDetails"},
            {Name: "Company details", IsActivated : false, IsCompleted : false, UrlState : "Registration.CompanyDetails"},
            {Name: "Email verification", IsActivated : false, IsCompleted : false, UrlState :"Registration.EmailVerification"},
        ];

        $scope.availableContries = [
            {Name: "India", symbol: "images/CountryIcons/india.png", Code: "+91"},
            {Name: "Japan", symbol: "images/CountryIcons/japan.png", Code: "+81"},
            {Name: "UK", symbol: "images/CountryIcons/uk.png", Code: "+44"},
          ];
    
          $scope.availableState = [
            {Country: "India", Name: "TamilNadu"},
            {Country: "India", Name: "Kerala"},
            {Country: "Japan", Name: "Tokyo"},
            {Country: "Japan", Name: "Alkiaba"},
            {Country: "UK", Name: "England"},
            {Country: "UK", Name: "IceLand"},
          ];

        $scope.User = {};

        $scope.CurrentState = 0;
        $scope.OTPDigits = 5;
        $state.go('Registration.PersonalDetails', {});

        $scope.otpInput={
            size:$scope.OTPDigits,
            type:"text",
            value: 0,
            onDone: function(value){
            },
            onChange: function(value){
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
        if($scope.Header.length == $scope.CurrentState + (IsForward ? 1 : 0))
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
            // $location.path("/Thankyou");
            console.log(objResponse);
        })
        .then(function() {
        })
    };

    $scope.initCtrl();
    
  }]);