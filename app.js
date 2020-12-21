var myApp = angular.module('SqaureAppTask', ['SqaureAppTask.services', 'ui.router', 'otpInputDirective']);


myApp.controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope) 
{
    $scope.initCtrl = function()
    {
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

    };
    

    $scope.initCtrl();
    
  }]);
