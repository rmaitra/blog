angular.module('app')
    .controller('PostCtrl', ['$scope', '$http', 'Post', 'Type', '$routeParams', '$location', function ($scope, $http, Post, Type, $routeParams, $location) {
        $scope.get_posts = function(){
            Post.list().then(function(posts){
                for(i in posts){
                    if(posts[i].id == $routeParams.id){
                        $scope.selected_post = posts[i]
                        break
                    }
                }

                $scope.posts = posts;
                $scope.format_type($scope.selected_post)
            })
        }

        $scope.types = [];
        $scope.get_types = function(callback){
            Type.list().then(function(types){
                $scope.types = types;
                callback();
            })
        }
        $scope.get_types(function(){
            $scope.get_posts()
        })

        $scope.select_post = function(post){
            $location.search('id', post.id)
        }

        $scope.format_type = function(post){
            for(i in $scope.types){
                if(post.type_id == $scope.types[i].id){
                    post.type = $scope.types[i].name
                }
                if(post.sub_type_id == $scope.types[i].id){
                    post.sub_type = $scope.types[i].name
                }
            }
        }

}])