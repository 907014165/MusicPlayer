(function($,root){
    //控制歌曲切换
    function controlManager(length){
        this.index = 0;
        this.length = length;
    }
    controlManager.prototype = {
        //下一首
        next:function(){
            return this.getIndex(1);
        },
        //上一首
        prev:function(){
            return this.getIndex(-1);
        },
        //获得当前索引
        getIndex:function(val){
            var index = this.index;
            var len = this.length;
            var curIndex = (index+val+len)%len;
            this.index = curIndex;
            return curIndex;
        }
    }
    //控制歌曲播放
    function audioManager(){
        this.audio = new Audio();
        this.status = "pause";
    }
    audioManager.prototype = {
        play:function(){
            this.audio.play();
            this.status="play";
        },
        pause:function(){
            this.audio.pause();
            this.status="pause";
            console.log('ll')
        },
        setAudioSource:function(src){
            this.audio.src=src;
            this.audio.load();
        },
        jumptoPlay:function(duration){
            this.audio.currentTime = duration;
            this.play();
        }
    }
    root.controlManager = controlManager;
    root.audioManager = audioManager;
    
}(window.Zepto,window.player || (window.player={})))