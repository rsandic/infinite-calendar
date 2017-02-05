app.controller('LoginController', ["$rootScope", "$scope", "localStorageService", 'AUTH_EVENTS', '$state', 'AlertService', '$http', 'CalendarServices',
    function($rootScope, $scope, localStorageService, AUTH_EVENTS, $state, AlertService, $http, CalendarServices) {
        $scope.disableLoginBtn = false;
        $rootScope.logOutShow = false;
        //if user is log
        if (localStorageService.get("token")) {
            $rootScope.token = localStorageService.get("token");
            $state.go('home')
        }

        //radovan@digitalcube.rs&password=test2017
        $scope.login = function(credentials) {
            //added disabled property on button when service is called that user
            //can not click multiple times
            $scope.disableLoginBtn = true;
            CalendarServices.Login(credentials)
                .then(function(response) {
                    //storing token in local storage
                    localStorageService.set("token", response.data.token);
                    $rootScope.token = response.data.token;
                    //fire login notification 
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //enable login buttton
                    $scope.disableLoginBtn = false;
                    //go to home page to see user details
                    $state.go('home');
                    //return response.data;
                }, function(result) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    $scope.disableLoginBtn = false;
                });

        };
    }
]);
