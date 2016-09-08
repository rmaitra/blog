angular
    .module('app', [
        'ngRoute',
        'templates',
        'google.places',
        'ngSanitize',
        'btford.markdown',
    ]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl'
            })
            .when('/admin', {
                templateUrl: 'admin.html',
                controller:'AdminCtrl'
            })
            .when('/posts/', {
                templateUrl: 'post.html',
                controller:'PostCtrl'
            })
        $locationProvider.html5Mode(true);
    }]);