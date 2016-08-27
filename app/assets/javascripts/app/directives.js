angular.module('app').directive('videoLink', ['$compile', function($compile) {//
    var vimeoTemplateLazy = '<div class="video"><img ng-style="element_style" data-lazy="{{video.thumbnail}}" ></img><a class="clickable img" ng-click="open_video(video)"></a><span class="borders"></span></div>'
    var youtubeTemplateLazy = '<div class="video"><img ng-style="element_style" data-lazy="http://img.youtube.com/vi/{{video.url}}/0.jpg" ></img><a class="clickable img" ng-click="open_video(video)"></a><span class="borders"></span></div>'
    var liveStreamTemplateLazy = '<div class="video"><img ng-style="element_style" data-lazy="{{video.thumbnail}}" ></img><a class="clickable img" ng-click="open_video(video)"></a><span class="borders"></span></div>'

    var vimeoTemplate = '<div class="video"><img ng-style="element_style" ng-src="{{video.thumbnail}}" ></img><a class="clickable img" ng-click="open_video(video)"></a><span class="borders"></span></div>'
    var youtubeTemplate = '<div class="video"><img ng-style="element_style" ng-src="http://img.youtube.com/vi/{{video.url}}/0.jpg" ></img><a class="clickable img" ng-click="open_video(video)"></a><span class="borders"></span></div>'
    var liveStreamTemplate = '<div class="video"><img ng-style="element_style" ng-src="{{video.thumbnail}}" ></img><a class="clickable img" ng-click="open_video(video)"></a><span class="borders"></span></div>'


    var getTemplate = function(contentType, is_lazy) {
        var template = '';

        switch(contentType) {
            case 'vimeo':
                if(is_lazy){
                    template = vimeoTemplateLazy;
                } else{
                    template = vimeoTemplate;
                }
                break;
            case 'youtube':
                if(is_lazy){
                    template = youtubeTemplateLazy;
                } else{
                    template = youtubeTemplate;
                }
                break;
            case 'livestream':
                if(is_lazy){
                    template = liveStreamTemplateLazy;
                } else{
                    template = liveStreamTemplate;
                }
                break;
        }

        return template;
    }

    

    var linker = function(scope, element, attrs) {
        if(scope.video != undefined){
            var url;
            if(scope.video.url != undefined){
                url = scope.video.url
            }
            if(scope.video.is_youtube == true){
                contentType = "youtube"
            } else if(scope.video.is_vimeo){
                contentType = "vimeo"

            }else if(scope.video.is_livestream){
                contentType = "livestream"

            // invalid video type
            } else {
                return ''
            }
            element.html(getTemplate(contentType, scope.is_lazy)).show();
            $compile(element.contents())(scope);
        }
        
    }

    return {
                //list of IDs
        link: linker,
                //list of IDs
        scope: {
                video:'=video',
                element_style:'=?elementStyle',
                is_lazy:'=?isLazy',
                //open_video:"=openVideo"
                },
        restrict: 'A',
        controller: ['$scope', '$element', '$attrs', '$transclude', '$location', 'VideoControl',function($scope, $element, $attrs, $transclude, $location, VideoControl) { 
            
            // if the video is vimeo, then we need to get its thumbnail
            if($scope.video.is_vimeo){
                VideoControl.vimeo_thumbnail($scope.video.url).then(function(result){
                    $scope.video.thumbnail = result;
                })
            }

            $scope.open_video = function(video){
                if(IS_MOBILE){
                    if(video.is_vimeo){
                        window.open("https://www.vimeo.com/" + video.url) 
                    } else if(video.is_youtube){
                        window.open("https://www.youtube.com/watch?v=" + video.url) 
                    }
                } else {
                    $location.path('/videos/'+video.id+'/show')   
                    if(typeof $scope.$parent.$parent.$parent.$parent.reset_search != 'undefined'){
                        $scope.$parent.$parent.$parent.$parent.reset_search()   
                    }
                }
            }

        }]
    } // directiveDefinitionObject

}]);

angular.module('app').directive('videoEmbed',['$compile',function($compile) {

    return {
        scope: {
                videoId:'=videoId',
                video:'=video',
                width:'=width',
                height:'=height',
                },
        restrict: 'A',
        controller: ['$scope', '$element', '$attrs', '$transclude', '$location', 'VideoControl', 'Video', function($scope, $element, $attrs, $transclude, $location, VideoControl, Video) { 
            $scope.open_video = function(video){
                $location.path('/videos/'+video.id+'/show')
            }
            $scope.get_video = function(){
                Video.get($scope.videoId).then(function(results){
                    if (results.length == 0){
                        $scope.video = {};
                    } else{
                        $scope.video = results[0];
                        $scope.videoUrl = $scope.get_video_url(results[0])
                        $scope.create_element()
                    }
                })
            }
            $scope.get_video();

            $scope.get_video_url = function(video){
                var url = VideoControl.determine_url(video)
                return url
            }

            $scope.create_element = function() {
                var url;
                if($scope.video.url != undefined){
                    url = $scope.video.url
                }
                if($scope.video.is_youtube == true || $scope.video.is_livestream){
                    content = '<iframe ng-src="{{videoUrl}}" class="iframe_video" frameborder="0" allowfullscreen></iframe>'
                } else if($scope.video.is_vimeo){
                    content = '<iframe ng-src="{{videoUrl}}" class="iframe_video" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'

                // invalid video type
                } else {
                    return ''
                }
                $element.html(content).show();
                $compile($element.contents())($scope);
            }
        }]
    } // directiveDefinitionObject

}]);

angular.module('app').directive('videoThumbnail',['$compile',function($compile) {

    return {
        scope: {
                video:'=video',
                is_lazy:'=?isLazy'
                },
        restrict: 'A',
        controller: ['$scope', '$element', '$attrs', '$transclude', '$location', 'VideoControl', 'Video', '$rootScope', function($scope, $element, $attrs, $transclude, $location, VideoControl, Video, $rootScope) { 
            
            if($scope.video.is_youtube){
                $scope.element_style = {width:'100%',height:"250px"}
            } else{
                $scope.element_style = {width:'100%',height:"250px"}//, "border-top":"32px solid black", "border-bottom":"32px solid black"}
            }

            $scope.open_video = function(video){
                if(IS_MOBILE){
                    if(video.is_vimeo){
                        window.open("https://www.vimeo.com/" + video.url) 
                    } else if(video.is_youtube){
                        window.open("https://www.youtube.com/watch?v=" + video.url) 
                    }
                } else {
                    $location.path('/videos/'+video.id+'/show')
                    if(typeof $scope.$parent.$parent.$parent.reset_search != 'undefined'){
                        $scope.$parent.$parent.$parent.reset_search()   
                    }
                }
            }
        }],
        template:'<div class="videoPanel">'+
             '<span video-link video="video" element-style="element_style" open-video="open_video" is-lazy="is_lazy"></span>'+
              '<div class="caption">'+
                '<h3 class="video-title"><a class="clickable" ng-click="open_video(video)">{{video.name}}</a></h3>'+
                '<p class="videoPanelDescription">{{video.description}}</p>'+
                '<span ng-show="video.is_callahan != true" team-badge team-one="video.team_id" team-two="video.team_two_id"></span>'+
              '</div>'+
            '</div>',
    } // directiveDefinitionObject

}]);


angular.module('app').directive('videoSlider',['$compile','$timeout', function($compile,$timeout) {

    return {
        scope: {
                params:'=?params',
                sliderAttrs:'=?sliderAttrs',
                no_shuffle:'=?noShuffule',
                },
        restrict: 'A',
        controller: ['$scope', '$element', '$attrs', '$transclude', '$location', 'VideoControl', 'Video', function($scope, $element, $attrs, $transclude, $location, VideoControl, Video) { 
                
                $element.hide()

                $scope.count_videos = function(){
                    var params = $.extend({}, $scope.params, {count:true});
                    Video.list(params).then(function(count){
                        $scope.total_videos = parseInt(count);
                        $scope.get_videos(true);
                    });
                }
                $scope.count_videos();

                $scope.get_videos = function(do_initialize, index){
                    var params = $scope.params;
                    Video.list(params).then(function(results){
                        if($scope.no_shuffle){
                            $scope.videos = results
                        } else{
                            $scope.videos = $scope.shuffle(results);
                        }
                        $scope.select_videos = $scope.videos.slice(0,$scope.indexEnd)
                        $scope.initialize_slick();
                    })
                }

                $scope.shuffle = function(array) {
                    var m = array.length, t, i;

                    // While there remain elements to shuffle…
                    while (m) {

                    // Pick a remaining element…
                    i = Math.floor(Math.random() * m--);

                    // And swap it with the current element.
                    t = array[m];
                        array[m] = array[i];
                        array[i] = t;
                    }

                    return array;
                }

                $scope.add_video = function(){
                    var newElem = angular.element('<div video-thumbnail class="padding_5" video="added_videos[' + ($scope.added_videos.length - 1).toString() + ']"></div>')
            
                    // compile and add to the scope
                    $compile(newElem)($scope);
                    console.log(index)
                    $element.slick('slickAdd', newElem, index);
                }

                $scope.initialize_slick = function(){
                    $timeout(function() {
                        if(IS_MOBILE){
                            $element.show().slick({"slidesToShow": 1, "slidesToScroll": 1, arrows: true}).hide().css('visibility','visible').fadeIn('slow');
                        } else{
                            // attributes
                            var slider_attributes = $scope.sliderAttrs
                            slider_attributes.lazyLoad = 'ondemand'

                            $element.show().slick(slider_attributes).hide().css('visibility','visible').fadeIn('slow')
                        }
                    },100)
                }
        }],
        template:'<div class="padding_5" ng-repeat="video in videos">'+
                    '<span video-thumbnail video="video" is-lazy="true"></span>'+
                '</div>',
    }

}]);

angular.module('app').directive('searchVideoResults', function ($compile) {
    
  return {
        scope: {
            params: "=params",
            get_videos: "=search",
        },
        controller: ['$scope', '$element', '$attrs', '$location', 'Video', function ($scope, $element, $attrs, $location, Video) {
                
                $scope.searching = false;
                $scope.get_videos = function(){
                    $scope.searching = true;
                    $scope.videos = [];
                    var params = {name:$scope.params}
                    Video.list(params).then(function(results){
                        $scope.searching = false;
                        $scope.videos = {}

                        row = 0;
                        $scope.videos[row] = [];
                        for(i=0; i<results.length; i++){
                            if((i + 1) % 4 == 0){
                                $scope.videos[row].push(results[i])
                                row = row + 1;
                                $scope.videos[row] = [];   
                            } else {
                                $scope.videos[row].push(results[i])
                            }
                        }
                    })
                }
        }],
        template:'<div class="section" ng-show="searching">'+
                    '<div class="row">'+
                        '<h1>Thinking...</h1>'+
                    '</div>'+
                '</div>'+
                '<div class="section" ng-show="!searching">'+
                    '<div ng-repeat="row in videos" class="row">'+
                        '<div ng-repeat="video in row" class="col-md-3">'+
                            '<span video-thumbnail video="video"></span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="section" ng-show="!searching && videos.length == 0">'+
                    '<div class="row">'+
                        '<h1>0 Results</h1>'+
                    '</div>'+
                '</div>',
    }
});

angular.module('app').directive('teamLogo', function ($compile) {
  return {
        scope: {
            object: "=",
        },
        controller: ['$scope', '$element', '$attrs', '$location', function ($scope, $element, $attrs, $location) {
                $scope.get_logo_url = function(){
                    $scope.logo  = "/api/v1/photos/" + $scope.object.logo;
                }
                $scope.$watch('object',function(){
                    if($scope.object != undefined){
                        $scope.get_logo_url()
                    }
                })
        }],
        template:'<img class="rounded" ng-show="logo != \'https://s3-us-west-2.amazonaws.com/ultiflixphotos/null\'" ng-src="{{logo}}" data-lazy="{{logo}}" width="50px"></img>',
    }
});

angular.module('app').directive('teamBadge', function ($compile) {
  return {
        scope: {
            team_one: "=teamOne",
            team_two: "=teamTwo",
        },
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                $scope.format_teams = function(){
                    for(i in $scope.teams){
                        if($scope.team_one == $scope.teams[i].id){
                            $scope.obj1 = $scope.teams[i]
                        } else if($scope.team_two == $scope.teams[i].id){
                            $scope.obj2 = $scope.teams[i]
                        }
                    }
                }
                $scope.$parent.$parent.$parent.$parent.$watch('teams',function(){
                    if($scope.$parent.$parent.$parent.$parent.teams != undefined){
                        $scope.teams = $scope.$parent.$parent.$parent.$parent.teams;
                        $scope.format_teams()
                    }
                })
                $scope.$parent.$parent.$parent.$parent.$parent.$watch('teams',function(){
                    if($scope.$parent.$parent.$parent.$parent.$parent.teams != undefined){
                        $scope.teams = $scope.$parent.$parent.$parent.$parent.$parent.teams;
                        $scope.format_teams()
                    }
                })
        }],
        template:'<div><table class="table">'+
                    '<tr><td><a ng-href="/teams/{{obj1.id}}/show"><div team-logo object="obj1"></div><span class="title">{{obj1.name}}</span></a></td>'+
                    '<td><p class="title">vs</p></td>'+
                    '<td><a ng-href="/teams/{{obj2.id}}/show"><div team-logo object="obj2"></div><span class="title">{{obj2.name}}</span></a></td></tr>'+
                '</table></div>',
                                   
    }
});


angular.module('app').directive('fileInput', function ($compile) {
  return {
        scope: {
            object: "=",
            isFile: "=?",
            key: "=key",
            save: "=save"
        },
        controller: ['$scope', '$element', '$attrs', 'Photo', '$http', function ($scope, $element, $attrs, Photo, $http) {

            $scope.save = function(callback){
                if($scope.key == undefined){
                    alert('Team must have key!');
                }
                var data = $element[0].files[0];
                if(typeof data != 'undefined'){
                    var objKey = 'ultiflix-' + $scope.key + '-' + data.name;
                    $scope.object.logo = objKey;

                    var fd = new FormData();
                    fd.append('file', data);
                    fd.append('key', objKey);
                    $http.post('/api/v1/photos', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function(response){
                        callback()
                    })
                } else{
                    callback()
                }
            }
        }]
    }
});

angular.module('app').directive('messageModal', function ($compile) {
  return {
        scope: {
            trigger: "=trigger",
        },
        controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
               $scope.trigger = function(message, modal_class, color, message_body){
                    $scope.message = message;
                    $scope.modal_class = modal_class;
                    $scope.color = color;
                    $scope.text_body = message_body;

                    $('#messageModal').modal('show')

                    if(message.toLowerCase().indexOf('success') != -1){
                        $timeout(function(){
                            $('#messageModal').modal('hide')
                        }, 1000)
                    }
               }
        }],
        template:'<div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
                      '<div class="modal-dialog" role="document">'+
                        '<div class="modal-content">'+
                          '<div class="modal-header" ng-style="{\'background-color\':color}">'+
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                            '<h2 class="brand">{{message}}</h2>'+
                          '</div>'+
                          '<div class="modal-body">'+
                                '<span ng-class="modal_class" style="font-size:35px;color:{{color}};"></span>'+
                                '{{text_body}}'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>',
                                   
    }
});