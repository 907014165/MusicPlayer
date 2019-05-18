//管理进度条功能
(function($,root){
    var $scope = $(document.body);
    var durationTime=0;
    var timer=null;
    var lastPercentage = 0;
    var startTime=0;
    var controlmanager;
    //转换时间
    function formatTime(time){
        time = Math.round(time);
        var minute = Math.floor(time/60);
        var second = time- minute*60;
        if(minute<10){
            minute="0"+minute;
        }
        if(second<10){
            second="0"+second;
        }
        return minute+":"+second;
    }
    //渲染总时间
    function renderDuration(duration){
        processor.updata(0);
        processor.init();
        durationTime = duration;
        var allTime  = formatTime(duration);
        $scope.find('.all-time').text(allTime);
    }
    //渲染当前时间和精度
    function start(percent,control){
       
        if(control){
            controlmanager = control;
            console.log(control,percent);
        }
        $scope.find('.play-btn').addClass('playing');
        if(percent){
            lastPercentage = percent;
            console.log('yes')
        }
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percentage = lastPercentage+(curTime-startTime)/(durationTime*1000);
            //console.log(percentage);
            if(percentage<1){
                updata(percentage);
                timer = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(timer);
                $scope.trigger("play:change",[controlmanager.next(),true]);
            }
        }
        frame();
    }
    //更新当前时间和精度条
    function updata(percentage){
        var curTime = formatTime(percentage*durationTime);
        $scope.find('.cur-time').text(curTime);
        setProcess(percentage);
    }
    //暂停
    function stop(){
        $scope.find('.play-btn').removeClass('playing');
        var curTime = new Date().getTime();
        lastPercentage = lastPercentage + (curTime-startTime)/(durationTime*1000);
        cancelAnimationFrame(timer);
    }
    //渲染精度条
    function setProcess(percentage){
       var move = (percentage-1)*100+"%";
       //console.log(move);
       $scope.find('.pro-top').css({
           "transform":"translateX("+move+")",
       })
    }
    //初始化基本样式
    function init(){
        durationTime=0;
        cancelAnimationFrame(timer);
        lastPercentage = 0;
        startTime=0;
    }
    root.processor = {
        render:renderDuration,
        start:start,
        stop:stop,
        init:init,
        updata:updata
    }
}(window.Zepto,window.player||(window.player={})))