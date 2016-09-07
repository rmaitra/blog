angular.module('app')
    .controller('AdminCtrl', ['$scope', '$http', '$location', 'Post', function ($scope, $http, $location, Post) {
        $scope.get_posts = function(){
            Post.list().then(function(posts){
                $scope.posts = posts;
            })
        }
        $scope.get_posts()

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
        }

        $scope.delete_post = function(post){
            var response = confirm("Are you sure you want to delete " + post.title);
            if(!response){
                return
            }
            Post.delete(post).then(
                function(post){
                    $scope.get_posts()
                }, function(response){
                    console.log(response)
                })
        }

        $scope.add_post = function(){
            var post = {title:"test"}
            $scope.posts.unshift(post);
        }

    }]);