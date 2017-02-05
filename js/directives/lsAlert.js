angular.module('lsalert', [])

.controller('UibAlertController', ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
    $scope.closeable = !!$attrs.close;

    if (angular.isDefined($attrs.dismissOnTimeout)) {
        $timeout(function() {
            $scope.close();
        }, parseInt($attrs.dismissOnTimeout, 10));
    }
}])

.directive('lsUibAlert', function() {
    return {
        controller: 'UibAlertController',
        controllerAs: 'lsAlert',
        templateUrl: function(element, attrs) {
            return attrs.templateUrl || './template/alert/alert.html';
        },
        transclude: true,
        replace: true,
        scope: {
            type: '@',
            close: '&'
        }
    };
});
