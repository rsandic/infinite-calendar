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
            currentScrollPosition : "=" 
        },
        link: function(scope, element, attrs) {
            var raw = element[0]; 
            if(scope.currentScrollPosition == null){
                //if user just loaded dataq scroll position will be null
                //then set sroll on the middle - today date
                scope.currentScrollPosition = 500;
            }
            element.bind('scroll', function() { 
                //memory for current position of scope              
                if(raw.scrollTop == 0){
                     scope.addCalendarNewData({"time" : "old"});
                } 
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) { //at the bottom
                    scope.$apply(attrs.scrolly);
                    scope.addCalendarNewData({"time" : "new"});
                }

                scope.currentScrollPosition = raw.scrollTop + raw.offsetHeight;
            });

                  
            //need to set current date with scroll
            element.animate({scrollTop: scope.currentScrollPosition}, "fast");

        }
    };
}]);
