angular.module('app')
    .controller('HomeCtrl', ['$scope', '$http', 'Post', function ($scope, $http, Post) {
        
    	$scope.get_posts = function(){
    		Post.list().then(function(posts){
    			$scope.posts = posts;
                $scope.select_post(posts[0])
    		})
    	}
        $scope.get_posts()


        $scope.select_post = function(post){
            $scope.selected_post = post;
        }

    }]);