
  
myApp.controller('RegistrationController', ['$scope', '$rootScope', '$q', 'DBService', '$state', '$location', 'toaster', function($scope, $rootScope, $q, DBService, $state, $location, toaster) 
{
    $scope.initCtrl = function()
    {
       
    
          $scope.availableState = [
            {Country: "India", Name: "TamilNadu"},
            {Country: "India", Name: "Kerala"},
            {Country: "Japan", Name: "Tokyo"},
            {Country: "Japan", Name: "Alkiaba"},
            {Country: "UK", Name: "England"},
            {Country: "UK", Name: "IceLand"},
          ];
        $scope.OTPDigits = 5;

        if($rootScope.User.hasOwnProperty("Name") == false)
        {
            $state.go('Registration.PersonalDetails', {});
        }

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
        else
        {
            toaster.pop('warning', "Missing or incorrect value", "Please fill up the required fields");
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
        if($rootScope.Header.length == $rootScope.CurrentState + (IsForward ? 1 : 0))
        {
            $scope.AddToDB();

            return null;
        }

        if($rootScope.Header.length > $rootScope.CurrentState)
        {
            var objCurrentPage = $rootScope.Header[$rootScope.CurrentState];
            objCurrentPage.IsActivated = false;
            objCurrentPage.IsCompleted = IsCompleted;

            if(IsForward)
                $rootScope.CurrentState = $rootScope.CurrentState + 1;
            else
                $rootScope.CurrentState = $rootScope.CurrentState - 1;


            var objPage = $rootScope.Header[$rootScope.CurrentState];
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
            $location.path("/Dashboard");
            toaster.pop('success', "success", "User has been created successfully.");

            console.log(objResponse);
            $rootScope.User = {};
        })
        .then(function() {
        })
    };

    $scope.uploadedFile = function(element, sFolderName) {
        var getFile = element.files[0];
        uploadedFile = {
            file: getFile,
            size: getFile.size,
            type: getFile.type,
            name: getFile.name
        };

        $rootScope.User.CompanyLogo = uploadedFile;
        
        let reader = new FileReader();
        
        reader.readAsDataURL(element.files[0]);

        reader.onload = function(e) {
            $rootScope.CompanyLogo = e.target.result;

            $scope.$apply();
        };
    }

    $scope.onCountrySelection = function (ObjSelectedCountry) {
        
        if(ObjSelectedCountry != null)
            $scope.User.CountryCode = ObjSelectedCountry.dial_code;
    };

    $scope.initCtrl();
    
  }]);