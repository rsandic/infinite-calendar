app.factory('CalendarServices', function($rootScope, $http) {
    var factory = {};

    factory.Login = function(credentials) {
        return $http({
                method: 'POST',
                url: "http://staging-api.avalonactive.com/user/login",
                params: {
                    username: credentials.username,
                    password: credentials.password
                }
            })
            .then(function(response) {
                return response;
            });
    };

    factory.GetCalendarData = function(year, week, direction) {
        return $http.get('http://staging-api.avalonactive.com/avl/events/get', {
                params: {
                    year: year,
                    week: week,
                    direction: 0
                }

            })
            .success(function(response) {
                return response.data;
            });
    }

    factory.GetEventDetails = function(eventId) {
        return $http.get('http://staging-api.avalonactive.com/avl/event', {
                params: {
                    id_event : eventId
                }

            })
            .success(function(response) {
                return response.data;
            });
    }

    return factory;
});
