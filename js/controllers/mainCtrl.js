app.controller('MainCtroller', ["$rootScope", "$scope", "AUTH_EVENTS", "AlertService", 'localStorageService', '$state',

    function($rootScope, $scope, AUTH_EVENTS, AlertService, localStorageService, $state) {
        $rootScope.alertsShow = false;

        //added main controller to better organize notfication
        $scope.$on('handleAlertBroadcast', function() {
            $rootScope.alertsShow = AlertService.getAlertShowState();
            $rootScope.alerts = AlertService.getAlerts();

        });

        $scope.showNotification = function(type, msg) {
            AlertService.addAlert(type, msg, 10000);
        };

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
            AlertService.alertsShow = true;
            $scope.showNotification('success', 'You are logged in.');
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event, args){
        	AlertService.alertsShow = true;
            $scope.showNotification('danger', 'You are logged out.');
        });

        $rootScope.$on(AUTH_EVENTS.loginFailed, function(event, args){
        	AlertService.alertsShow = true;
            $scope.showNotification('danger', 'Login failed.');
        });

        
        //logout function
        $scope.Logout = function() {
            console.log("Logout");
            localStorageService.set('token', '');
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            $state.go('login');
        }

    }
]);
