app.controller('HomeController', ["$rootScope", "$scope", "$http", "AUTH_EVENTS", '$state', 'localStorageService', '$filter', 'CalendarServices',
    function($rootScope, $scope, $http, AUTH_EVENTS, $state, localStorageService, $filter, CalendarServices) {
        //today date
        $scope.currentDate = new Date();
        $scope.newCalendarData = {};
        $rootScope.logOutShow = true;
        //get week number
        $scope.week = $filter('date')($scope.currentDate, "ww");
        $scope.year = $filter('date')($scope.currentDate, "yyyy");
        $scope.direction = 0; //init state

        $scope.GetCalendarData = function() {
            // CalendarServices.GetCalendarData($scope.year, $scope.week, $scope.direction)
            //     .then(function(response) {
            //         console.log(JSON.stringify(response));
            //         $scope.calendarData = response.data.calendar.events;
            //         console.log($scope.calendarData);
            //     });
            $http.get('responses/calendar.json').success(function(data) {
                //console.log(data);
                $scope.calendarData = data.calendar.events;
                $scope.ArangeCalendarData($scope.calendarData);
            });
        }

        $scope.ArangeCalendarData = function(data) {
            angular.forEach(data, function(value, key) {
                var weekNumber = key.substr(key.length - 2); //get week number
                var year = key.substr(0, 4); //get year number
                //$scope.newCalendarData[key] = $scope.GetDaysInWeek(year, weekNumber);
                var daysInWeek = $scope.GetDaysInWeek(year, weekNumber);
                //prepakovati podatke za svaki datum
                $scope.newCalendarData[key] = {};
                angular.forEach(daysInWeek, function(value1, key1) {
                    var keepGoing = true; //when find vale for date break the for each loop
                    angular.forEach(value, function(value2, key2) {
                        if (keepGoing) {
                            if (value1 == key2) {
                                $scope.newCalendarData[key][value1] = value2;
                                keepGoing = false;
                            } else {
                                var tmpArray = [];
                                $scope.newCalendarData[key][value1] = [];
                                tmpArray[2] = "No Data";
                                $scope.newCalendarData[key][value1][0] = tmpArray;
                            }
                        }
                    });
                });
            });

            //console.log($scope.newCalendarData);
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

        $scope.GetCalendarData();

    }
]);
