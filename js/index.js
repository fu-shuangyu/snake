$(function(){
    var start = $('#start');
    var continues = $('#continue');
    var stop = $('#stop');
    var ceng = $('#ceng');
    var time;
    var x;
    var snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
    var data = {'0_0':true,'0_1':true,'0_2':true};
    var cw = $(window).width();
    console.log(cw)
    var fangxiang = 39;
    if(cw<=768){
        ceng.style.display = 'none';
        touch.on(document, 'touchstart', function(ev){
            ev.preventDefault();
        });

        var target = document.getElementById("sence");

        touch.on(document, 'swipeleft', function(){
            fangxiang = 37;
        });
        touch.on(document, 'swiperight', function(){
            fangxiang = 39;
        });
        touch.on(document, 'swipeup', function(){
            fangxiang = 38;
        });
        touch.on(document, 'swipedown', function(){
            fangxiang = 40;
        });
        touch.on(start, 'tap', function(ev){
            aa();
        });
        touch.on(stop, 'tap', function(ev){
            clearInterval(time);
            continues.css({'display':'block'});
            start.css({'display':'none'});
        });
        touch.on(continues, 'tap', function(ev){
            continues.css({'display':'none'});
            start.css({'display':'block'});
            time = setInterval(move,x);
        });
    }
    var s = '';
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            var id = i + '_' + j;
            s += '<div class="block" id="'+id+'"></div>'
        }
    }
    $('#sence').html(s);

    var huashe = function(){
        $.each(snake,function(index,value){
            $('#'+value.x+'_'+value.y).css({background:'#c2185b'});
        })
    }
    huashe();
    var dropFood = function(){
        var x = Math.floor(Math.random()*20);
        var y = Math.floor(Math.random()*20);
        while( data[x+'_'+y] ){
            x = Math.floor(Math.random()*20);
            y = Math.floor(Math.random()*20);
        }
        $('#'+x+'_'+y).css({background:'#00c853'});
        return {x:x,y:y};
    }
    var food = dropFood();
    function move(){
        var oldTou = snake[snake.length-1];
        if(fangxiang == 39){
            var newTou = {x:oldTou.x,y:oldTou.y+1};
        }
        if(fangxiang == 37){
            var newTou = {x:oldTou.x,y:oldTou.y-1};
        }
        if(fangxiang == 40){
            var newTou = {x:oldTou.x+1,y:oldTou.y};
        }
        if(fangxiang == 38){
            var newTou = {x:oldTou.x-1,y:oldTou.y};
        }
        if(newTou.x<0 ||newTou.y<0 || newTou.x>19 || newTou.y>19 || data[newTou.x+'_'+newTou.y]){
            alert('好可惜，撞死了。。');
            clearInterval(time);
            if( confirm("是否重新开始呀？") ){
                history.go(0);
            }else{
                return;
            }
            $(document).bing('keydown',function(){
                return false;
            })
            return false;
        }
        if( newTou.x == food.x && newTou.y == food.y){
            food = dropFood();
        }else{   
            var weiba = snake.shift();
            delete data[weiba.x+'_'+weiba.y];
            $('#'+weiba.x+'_'+weiba.y).css({background:'#1b5e20'});
        }

        snake.push(newTou);
        data[newTou.x + '_' + newTou.y] = true;
        $('#'+newTou.x+'_'+newTou.y).css({background:'#c2185b'});
    }

    $(document).keydown(function(e){
        if( Math.abs(fangxiang - e.keyCode) == 2 ){
            return;
        }
        if( !(e.keyCode >= 37 && e.keyCode <= 40) ){
            return;
        }
        fangxiang = e.keyCode;
    })

function aa() {
    if(snake.length < 50 || ceng.val() == '一级' ){
        x = 250;
        time = setInterval(move,x);
    }
    if( ( snake.length >= 50 && snake.length < 100 ) || ceng.val() == '二级'){
        x = 210;
        time = setInterval(move,x);
    }
    if( ( snake.length >= 100 && snake.length < 150 ) || ceng.val() == '三级'){   
        x = 170;
        time = setInterval(move,x);
    }
    if( ( snake.length >= 150 && snake.length < 200 ) || ceng.val() == '四级'){   
        x = 140;
        time = setInterval(move,x);
    }
    if( ( snake.length >= 200 && snake.length < 250 ) || ceng.val() == '五级'){   
        x = 100;
        time = setInterval(move,x);
    }
    if( ( snake.length >= 250 ) || ceng.val() == '六级'){   
        x = 80;
        time = setInterval(move,x);
    }
}
start.click(function(){
    aa();
});
stop.click(function(){
    clearInterval(time);
    continues.css({'display':'block'});
    start.css({'display':'none'});
})
continues.click(function(){
    continues.css({'display':'none'});
    start.css({'display':'block'});
    time = setInterval(move,x);
});


})