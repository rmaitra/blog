angular.module('app')
    .factory('Post', ['$http', '$q', function($http, $q) {
    return  create_basic_services('/api/v1/posts/', $http, $q);
}]);
angular.module('app')
    .factory('Session', ['$http', '$q', function($http, $q) {
    return  create_basic_services('/api/v1/sessions/', $http, $q);
}]);

angular.module('app')
    .factory('Type', ['$http', '$q', function($http, $q) {
    return  create_basic_services('/api/v1/types/', $http, $q);
}]);

