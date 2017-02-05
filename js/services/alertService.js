app.factory('AlertService', function ($rootScope, $timeout) {
    var factory = {};
    
    factory.alerts = null;
    factory.alertsShow = false;
    
    factory.getAlertShowState = function(){
      return factory.alertsShow;  
    };
    
    factory.getAlerts = function(){
        return factory.alerts;
    }
    
    factory.prepForBroadcastAlert = function (state) {
        factory.alertsShow = state;
        factory.broadcastItemAlert();
    };

    factory.broadcastItemAlert = function () {
        $rootScope.$broadcast('handleAlertBroadcast');
    };
    
    factory.addAlert = function (type,msg) {
        factory.alerts = {type: type, msg: msg};
        factory.prepForBroadcastAlert(true);
        $timeout( function(){ factory.prepForBroadcastAlert(false); }, 3000);
    };

    factory.addAlertWithTime = function (type,msg,time) {
        factory.alerts = {type: type, msg: msg};
        factory.prepForBroadcastAlert(true);
        $timeout( function(){ factory.prepForBroadcastAlert(false); }, time);
    };

    factory.close = function () {
        factory.prepForBroadcastAlert(false);
    };

    return factory;
});