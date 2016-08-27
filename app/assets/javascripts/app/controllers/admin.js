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
                    function(post){
                        console.log('success')
                    }, function(response){
                        console.log(response)
                    })
            } else if(typeof post.id != "undefined"){
                Post.update(post.id, {post:post}).then(
                    function(post){
                        console.log('success')
                    }, function(response){
                        console.log(response)
                    })
            } 
        }

        $scope.select = function(post){
            post.tab = "preview";
            $scope.selected_post = post;
        }

        $scope.add_post = function(){
            var post = {title:"test"}
            $scope.posts.unshift(post);
        }

    }]);