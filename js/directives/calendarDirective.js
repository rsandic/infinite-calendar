angular.module('CalendarData', [])
.directive('calendarDirective', [function($timeout) {
    return {
        //controller: 'CalendarControler',
        //controllerAs: 'calendarCtrl',
        replace: true,
        restrict: 'AE',
        templateUrl: './template/calendarDirective/calendarDirective.html',
        scope: {
            calendarData: "=",
            addCalendarNewData :"&",
            currentPositionOfScroll : "=" 
        },
        link: function(scope, element, attrs) {
            console.log(element);
            var raw = element[0];
            raw.scrollTop = 500;
            element.bind('scroll', function() { 
                console.log(scope.currentPositionOfScroll);
                //memory for current position of scope
                scope.currentPositionOfScroll = raw.scrollTop + raw.offsetHeight;               
                if(raw.scrollTop == 0){
                     scope.addCalendarNewData({"time" : "old"});
                } 
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) { //at the bottom
                    scope.$apply(attrs.scrolly);
                    scope.addCalendarNewData({"time" : "new"});
                }

            });

            //need to set current date with scroll
            element.animate({scrollTop: scope.currentPositionOfScroll}, "fast");

        }
    };
}]);
