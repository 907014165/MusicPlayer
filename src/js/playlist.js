

(function($,root){
    var $scope = $(document.body);
    var controlmanager;
    var $playList = $('<div class="play-list">'+
                        '<div class="line-head">播放列表</div>'+
                        '<ul class="play-list-wrap"></ul>'+
                        '<div class="close-btn">关闭</div>'+
                    '</div>');
    $scope.on('click','.close-btn',function(){
        close();
    })
    $playList.on('click','li',function(){
        var index = $(this).index();
        controlmanager.index=index;
        signSong(index);
        $scope.trigger("play:change",[index,true]);
        close();
    })
    function render(data){
        var html = '';
        var len = data.length;
        for(var i=0;i<len;i++){
            html+='<li><h3>'+data[i].song+'-<span>'+data[i].singer+'</span>'+'</h3></li>'
        }
        $playList.find('ul').html(html);
        $scope.append($playList);
    }
    function show(control){
        controlmanager=control;
        $scope.find('.play-list').addClass('show');
        var index = controlmanager.index;
        signSong(index);
    }
    function close(){
        $scope.find('.play-list').removeClass('show');
    }
    function signSong(index){
        
        $scope.find('.play-list-wrap li').removeClass('playing');
        $scope.find('.play-list-wrap li').eq(index).addClass('playing');
    }
    root.playlist = {
        render:render,
        show:show,
    }
}(window.Zepto,window.player||(window.player={})))
