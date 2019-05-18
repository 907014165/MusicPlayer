//封装渲染模块
(function($,root){
    
    var $scope = $(document.body);
    //渲染歌曲性信息
    function renderInfo(data){
        var html = "<h1 class='song-name'>"+data.song+"</h1>"+
                    "<h3 class='singer-name'>"+data.singer+"</h3>"+
                    "<h3 class='ablum-name'>"+data.album+"</h3>";
        $scope.find('.song-info').html(html);
    }
    //渲染歌曲图片
    function renderImage(src){
        var img = new Image();
        img.onload = function(){
            $scope.find(".song-img img").attr("src",src);
            root.blurImg(img,$scope);
        }
        img.src=src;
       
    }
    //渲染喜欢按钮
    function renderLikedBtn(isliked){
        if(isliked){
            $scope.find(".like-btn").addClass("liked");
        }else{
            $scope.find(".like-btn").removeClass("liked");
        }
        console.log(isliked)
    }
    root.render = function(data){
        renderInfo(data);
        renderImage(data.image);
        renderLikedBtn(data.islike);
    }
}(window.Zepto,window.player|| (window.player={})))
