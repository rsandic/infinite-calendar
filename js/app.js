var app = angular.module("Calendar", [
    'ui.router',
    'LocalStorageModule',
    'lsalert'
]);

//-------------------------------------------------
//defining app constant

app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success'
});

//-------------------------------------------------
//routing

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.when('', '/login');

    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'views/login.view.html',

        })
        .state('home', {
            url: '/home',
            controller: 'HomeController',
            templateUrl: 'views/home.view.html',

        })
        .state('event', {
            url: '/event/:id',
            controller: 'EventController',
            templateUrl: 'views/event.view.html',

        })


}]);

//add token in header
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope, $window, $location, localStorageService) {
        return {
            request: function(config) {
                config.headers['authorization'] = localStorageService.get('token');
                return config;
            }
        };

    });
}]);


app.run(['$rootScope', '$location', 'localStorageService', function($rootScope, $location, localStorageService) {

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        if (localStorageService.get("token") == '' || localStorageService.get("token") == null) {
            $location.path("login");
        }

    })
}]);
