var root = window.player;
var $ = window.Zepto;
var $scope = $(document.body);
var songList;
var contromanager;
var audiomanager = new root.audioManager();
var processor = root.processor;
var playlist = root.playlist;
//自定义函数
$scope.on("play:change",function(e,index,flag){
    root.render(songList[index]);
    processor.render(songList[index].duration);
    audiomanager.setAudioSource(songList[index].audio);
    if(audiomanager.status=="play"||flag){
        audiomanager.play();
        processor.start(null,contromanager);
        console.log(processor);
    }
})
//绑定事件
$scope.on('click','.next-btn',function(){
    $scope.trigger("play:change",[contromanager.next()]);
    
})
$scope.on('click','.prev-btn',function(){
    $scope.trigger("play:change",[contromanager.prev()]);
   
})
$scope.on('click','.play-btn',function(){
    if(audiomanager.status=="play"){
        audiomanager.pause();
        processor.stop();
    }else{
        audiomanager.play();
        processor.start(null,contromanager);
    }
})
$scope.on('click','.list-btn',function(){
   playlist.show(contromanager);
})
//绑定touch事件
function bindTouch(){
    var $slidePoint = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var s_left = offset.left;
    var s_width = offset.width;
    console.log(offset)
    $slidePoint.on('touchstart',function(e){
        console.log(e);
        processor.stop();
        audiomanager.pause();
    }).on("touchmove",function(e){
        var percent = (e.changedTouches[0].clientX-s_left)/s_width;
        if(percent>1||percent<0){
            percent=0;
        }
        processor.updata(percent);
    }).on("touchend",function(e){
        console.log('why?')
        var percent = (e.changedTouches[0].clientX-s_left)/s_width;
        if(percent>1||percent<0){
            percent=0;
        }
        processor.start(percent);
        var allDuration = songList[contromanager.index].duration;
        var curDuration = percent*allDuration;
        audiomanager.jumptoPlay(curDuration);
    })
}
bindTouch();
//获得歌曲信息
function getData(url){

    $.ajax({
        url:url,
        type:"GET",
        success:successedFn,
        error:function(){
            console.log("error")
        }
        
    })
}
function successedFn(data){
    songList=data;
    contromanager = new root.controlManager(data.length);
    $scope.trigger("play:change",[0]);
    playlist.render(songList);
}
getData("/mock/data.json");
console.log(root)