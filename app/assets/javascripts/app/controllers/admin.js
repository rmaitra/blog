angular.module('app')
    .controller('AdminCtrl', ['$scope', '$http', '$location', 'Post', 'Type', function ($scope, $http, $location, Post, Type) {
        $scope.tab = "posts"

        /* posts */
        $scope.get_posts = function(){
            $scope.posts = [];
            Post.list().then(function(posts){
                $scope.posts = posts;
                $scope.select($scope.posts[0])
            })
        }

        $scope.update_post = function(post){
            if(typeof post.id == "undefined"){
                Post.create({post:post}).then(
                    function(result){
                        post.id = result.id;
                        $scope.success_alert();
                    }, function(response){
                        console.log(response)
                    })
            } else if(typeof post.id != "undefined"){
                Post.update(post.id, {post:post}).then(
                    function(post){
                        $scope.success_alert();
                    }, function(response){
                        console.log(response)
                    })
            } 
        }

        $scope.select = function(post){
            post.tab = "preview";
            $scope.selected_post = post;
            $scope.find_type_then_get_sub_types();
        }

        $scope.delete_post = function(post){
            var response = confirm("Are you sure you want to delete " + post.title);
            if(!response){
                return
            }
            if(typeof post.id != "undefined"){
                Post.delete(post).then(
                    function(post){
                        $scope.get_posts()
                    }, function(response){
                        console.log(response)
                    })
            } else {
                $scope.get_posts()
            }
            
        }

        $scope.add_post = function(){
            var post = {title:"test"}
            $scope.posts.unshift(post);
        }


        /* types */
        $scope.add_type = function(){
            var type = {name:"test"}
            $scope.types.unshift(type);
        }

        $scope.add_sub_type = function(){
            if(typeof $scope.selected_type == "undefined"){
                alert('Please select a type first!')
                return
            }
            var type = {name:"test", parent:$scope.selected_type.id}
            $scope.sub_types.unshift(type);
        }

        $scope.update_type = function(type){
            if(typeof type.id == "undefined"){
                Type.create({type:type}).then(
                    function(result){
                        type.id = result.id;
                        $scope.success_alert();
                        $scope.get_types();
                    }, function(response){
                        console.log(response)
                    })
            } else if(typeof type.id != "undefined"){
                Type.update(type.id, {type:type}).then(
                    function(type){
                        $scope.success_alert();
                    }, function(response){
                        console.log(response)
                    })
            } 
        }

        $scope.get_types = function(callback){
            var params = {parent__isnull:true}
            Type.list(params).then(function(types){
                $scope.types = types;
                if(typeof callback != "undefined"){
                    callback()
                }
            })
        }
        $scope.get_types(function(){
            $scope.get_posts()
        })

        $scope.find_type_then_get_sub_types = function(){
            for(i in $scope.types){
                if($scope.types[i].id == $scope.selected_post.type_id){
                    $scope.get_sub_types($scope.types[i])
                    break
                }
            }
        }

        $scope.get_sub_types = function(type){
            var params = {parent:type.id}
            $scope.selected_type = type;
            Type.list(params).then(function(types){
                $scope.sub_types = types;
            })
        }

        $scope.remove_type = function(type){
            var response = confirm("Are you sure you want to delete " + type.name);
            if(!response){
                return
            }
            if(typeof type.id != "undefined"){
                Type.delete(type).then(
                    function(type){
                        $scope.get_types()
                    }, function(response){
                        console.log(response)
                    })
            } else {
                $scope.get_types()
            }
        }

    }]);