var myApp = angular.module('SqaureAppTask', ['SqaureAppTask.services', 'ui.router', 'toaster', 'ngCountries']);

myApp.controller('MainController', ['$scope', '$rootScope', 'pouchdb', function ($scope, $rootScope, pouchdb) {

    $rootScope.User = {};
    $scope.ToasterOptions ={
        timeOut: 3000,
    }

    $rootScope.Header = [
        {Name: "Personal details", IsActivated : true, IsCompleted : false, UrlState: "Registration.PersonalDetails"},
        {Name: "Company details", IsActivated : false, IsCompleted : false, UrlState : "Registration.CompanyDetails"},
        {Name: "Email verification", IsActivated : false, IsCompleted : false, UrlState :"Registration.EmailVerification"},
    ];
    $rootScope.CurrentState = 0;
}]);