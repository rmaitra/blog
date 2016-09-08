angular.module('app')
    .controller('HomeCtrl', ['$scope', '$http', 'Post', 'Type', function ($scope, $http, Post, Type) {
        
    	$scope.get_posts = function(){
    		Post.list().then(function(posts){
                for(i in posts){
                    $scope.format_type(posts[i])
                }
    			$scope.posts = posts;
                $scope.filter_posts()
    		})
    	}

        $scope.filter_posts = function(type){
            if(type == null){
                $scope.filtered_posts = $scope.posts;
                $scope.sub_type = null
                return
            }
            if(type.parent == null){
                $scope.get_sub_types();
            }
            $scope.filtered_posts = [];
            for(i in $scope.posts){
                if(type.parent == null){
                    if($scope.posts[i].type_id == type.id){
                        $scope.filtered_posts.push($scope.posts[i])
                    }
                } else {
                    if($scope.posts[i].sub_type_id == type.id){
                        $scope.filtered_posts.push($scope.posts[i])
                    }
                }
            }
        }

        $scope.types = [];
        $scope.get_types = function(callback){
            Type.list().then(function(types){
                
                // this is for the posts type display
                $scope.types = types;

                // this is for the dropdown
                $scope.parent_types = [];
                for(i in types){
                    if(types[i].parent == null){
                        $scope.parent_types.push(types[i])
                    }
                }
                callback();
            })
        }

        $scope.get_sub_types = function(){
            if($scope.type == null){
                $scope.type = undefined
                $scope.filter_posts()
                return
            }
            var params = {parent:$scope.type.id}
            $scope.filter_posts()
            Type.list(params).then(function(types){
                $scope.sub_types = types;
            })
        }

        $scope.get_types(function(){
            $scope.get_posts()
        })


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

    }]);