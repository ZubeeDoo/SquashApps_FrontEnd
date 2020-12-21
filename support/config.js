myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/otherwise');
    $stateProvider
        .state("Login", {
            url: "/Login",
            templateUrl: "view/Login.html",
            controller: 'LoginController'
        })
        .state("TeamsAndConditions", {
            url: "/TeamsAndConditions",
            templateUrl: "view/TeamsAndConditions.html",
            controller: 'TeamsAndConditionsController'
        })
        .state("Registration", {
            url: "/Registration",
            templateUrl: "view/Registration/Registration.html",
            controller: 'RegistrationController'
        })
        .state("Registration.PersonalDetails", {
            url: "/PersonalDetails",
            templateUrl: "view/Registration/Registration.PersonalDetails.html",
        })
        .state("Registration.EmailVerification", {
            url: "/EmailVerification",
            templateUrl: "view/Registration/Registration.EmailVerification.html",
        })
        .state("Registration.CompanyDetails", {
            url: "/CompanyDetails",
            templateUrl: "view/Registration/Registration.CompanyDetails.html",
        })
        .state("Thankyou", {
            url: "/Thankyou",
            templateUrl: "view/Thankyou.html",
        })
  /*      .state("Dashboard", {
            url: "/Dashboard",
            templateUrl: "view/Dashboard.html",
            controller: "DashboardController",
        })*/
        .state("otherwise", {
            url: "*path",
            templateUrl: "view/Error/NotFound.html"
        });
}]);