app.controller('HomeController', ["$rootScope", "$window", "$location", "$anchorScroll", "$scope", "$http", "AUTH_EVENTS", '$state', 'localStorageService', '$filter', 'CalendarServices',
    function($rootScope, $window, $location, $anchorScroll, $scope, $http, AUTH_EVENTS, $state, localStorageService, $filter, CalendarServices) {
        //today date
        $scope.currentDate = new Date();
        //$scope.newCalendarData = [];
        $rootScope.logOutShow = true;


        $scope.GetCalendarData = function(year, week, direction) {
            CalendarServices
                .GetCalendarData(year, week, direction)
                .then(function(response) {
                    $scope.calendarData = response.data.calendar.events;
                    var endTime = response.data.calendar.end_week
                        //year must be added here
                        //if init state or new data
                    if (direction == 0 || direction == 1) {
                        //storing last week 
                        $rootScope.endWeek = endTime.substr(endTime.length - 2);
                        $scope.newCalendarData.push($scope.ArangeCalendarData($scope.calendarData));
                    } else if (direction == -1) {
                        var week = response.data.calendar.start_week;
                        //storing new first week, wheen user add new data start changes
                        $rootScope.week = week.substr(week.length - 2);
                        $scope.newCalendarData.unshift($scope.ArangeCalendarData($scope.calendarData));
                    }

                });
        }

        $scope.ArangeCalendarData = function(data) {
            var dataArray = {};
            angular.forEach(data, function(value, key) {
                var weekNumber = key.substr(key.length - 2); //get week number
                var year = key.substr(0, 4); //get year number
                var daysInWeek = $scope.GetDaysInWeek(year, weekNumber);
                angular.forEach(daysInWeek, function(value1, key1) {
                    var keepGoing = true; //when find vale for date break the for each loop
                    angular.forEach(value, function(value2, key2) {
                        if (keepGoing) {
                            if (value1 == key2) {
                                dataArray[value1] = value2;
                                keepGoing = false;
                            } else {
                                var tmpArray = [];
                                dataArray[value1] = [];
                                tmpArray[2] = "No Data";
                                dataArray[value1][0] = tmpArray;
                            }
                        }
                    });
                });

            });
            return dataArray;
        }


        function DateTimeToString(objDate) {
            return objDate.getFullYear() + '-' + (((objDate.getMonth() + 1) < 10) ? '0' : '') + (objDate.getMonth() + 1) + '-' + ((objDate.getDate() < 10) ? '0' : '') + objDate.getDate();
        }

        $scope.MakeArrayOfWeekDays = function(year, month, day) {
            //console.log(year, month, day);
            var week = [];
            var date = new Date(year, month - 1, day, 0, 0, 0, 0); //number of month 0 -11
            const DAY = 1000 * 60 * 60 * 24;
            var i;
            for (i = 0; i < 7; i++) {
                //console.log(date.toString());
                week.push(DateTimeToString(date).slice(0, 10));
                date.setTime(date.getTime() + DAY);
            }
            return week;
        }

        //getting week
        Date.prototype.getWeek = function() {
            var date = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((((this - date) / 86400000) + date.getDay() + 1) / 7);
        }

        $scope.GetDaysInWeek = function(year, weekNo) {
            var d1 = new Date(year + '-1-1'); //
            numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
            d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
            var weekNoToday = d1.getWeek();
            var weeksInTheFuture = eval(weekNo - weekNoToday);
            d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
            var startDate = d1.getFullYear() + "-" + eval(d1.getMonth() + 1) + "-" + d1.getDate();

            return $scope.MakeArrayOfWeekDays(d1.getFullYear(), eval(d1.getMonth() + 1), d1.getDate());
        }

        $scope.GetEventDetails = function(dayId) {
            if (dayId != undefined) {
                $state.go('event', { id: dayId });
            }

        }

        //remember sroll position
        $scope.$watch('currentPositionOfScroll', function(newValue, oldValue) {
            $rootScope.currentPositionOfScroll = newValue;
        });

        $scope.GetMoreData = function(time) {
            console.log("More data", time);
            if (time == 'new') {
                $scope.GetCalendarData($rootScope.year, $rootScope.endWeek, 1);
            } else if (time == 'old') {
                $scope.GetCalendarData($rootScope.year, $rootScope.week, -1);
            }
        }

        //if we have array of data in root scope we know tahat user is been here
        if ($scope.newCalendarData.length == 0) {
            //get week number
            $rootScope.week = $filter('date')($scope.currentDate, "ww");
            $rootScope.year = $filter('date')($scope.currentDate, "yyyy");
            
            $scope.GetCalendarData($rootScope.year, $rootScope.week, 0);
        }


    }
]);
