app.controller('EventController', ["$rootScope", "$scope", '$stateParams', 'CalendarServices','$sce',
    function($rootScope, $scope, $stateParams, CalendarServices, $sce) {
        $scope.logOutShow = true;
        var dayId = $stateParams.id
        CalendarServices.GetEventDetails(dayId).then(function(response) {
            $scope.id = response.data.id;
            $scope.id_user = response.data.id_user;
            $scope.duration = response.data.data.duration;
            $scope.description = $sce.trustAsHtml(response.data.data.description);
            $scope.event_type = response.data.event_type;
        });
    }
]);
