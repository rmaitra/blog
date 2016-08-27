angular.module('app')
    .controller('IndexCtrl', ['$scope', '$location', 'Session', function($scope, $location, Session) {
        $scope.current_user = null
        $scope.get_session = function(){
            Session.get().then(function(response){
                if(response.user == "rmaitra"){
                    $scope.current_user = response.user
                }
            })
        }
        $scope.get_session();

        $scope.login = function(password){
            var params = {pass:password}
            Session.create(params).then(
                function(response){
                    if(response.user == "rmaitra"){
                        $scope.current_user = response.user
                    } else {
                        console.log(response)
                    }
                }, function(response){
                    console.log(response)
                })
        }

        $scope.go_profile = function(){
            $location.path('/admin')
        }

        $scope.format_date = function(date){
            format_date = new Date(date)
            return moment(format_date).format('MMMM Do YYYY'); 
        }

    	
    }]);

angular.module('app')
    .controller('ProfileCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
}]);






