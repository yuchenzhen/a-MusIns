var audio = $('#player1');

var rightScroll = $('.comment_right').children('.col-sm-10');
var leftScroll = $('.geci_left_text_lyr')
$(rightScroll).perfectScrollbar({
});
$(leftScroll).perfectScrollbar({
});



// 喜欢歌曲
(function loveThisSong () {
	var loveBtn = $('.musicList_btn_love');
	$(loveBtn).click(function () {
		var a = $(loveBtn).hasClass('loved');
		if(!a){
			$(loveBtn).addClass('loved');
		}else{
			$(loveBtn).removeClass('loved');
		}
		
	})
})()



// function readlrc () {
// 	var xhr = new XMLHttpRequest(); 
// 	xhr.open('GET','/lrc/fushishanxia.lrc',true);
// 	xhr.responseType = 'text';
// 	xhr.onload = function() {
// 		var lyric = xhr.response;
// 	};

// 	xhr.send();

// };

function readlrc () {
    $.ajax({
        url:'/lrc/fushishanxia.lrc',
        headers:{
            contentType:"text"
        },
        success:function(lrc){
            // var	lyric = parseLyric(lrc);
            // if(success)success(lyric);
			var lyricc = parseLyric_a(lrc);
			// console.log(lyric)
			// console.log(lyricc);
            	
            setlyr(lyricc);


        },
        error:function(e){
            if(error)error(e);
        }
    });
};

readlrc ();

function parseLyric_a(text) {
    //将文本分隔成一行一行，存入数组
    var lines = text.split('\n'),
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        //保存最终结果的数组
        result = [];
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
    };
    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
        //提取出时间[xx:xx.xx]
        var time = v.match(pattern),
            //提取歌词
            value = v.replace(pattern, '');
        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
        time.forEach(function(v1, i1, a1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function(a, b) {
        return a[0] - b[0];
    });
    return result;
}

function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');

        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}



function setlyr (lyr) {
    var lrcc=[];
    var b = $('.square');  
    for(var i=0; i<lyr.length;i++){   
        lrcc[i] = lyr[i]
        $(b).append($("<div lyrnum="+i+" lyrtime='"+Math.round(lrcc[i][0])+"' lyrdeg='"+Math.round(i*20+90)+"'><p>"+lrcc[i][1]+"</p></div>"));
        $(b).children('div').addClass('NoneDisplay');
    }

    cdrorate (lyr.length*20+90,lrcc[lyr.length-1    ][0]);
}   

// 由matrix计算角度  
function matrix2deg (s,c) {
    var PI= Math.PI;
        var hudu = Math.asin(s);
    if(s >= 0){
        
        if (c >= 0) {
            var deg = Math.round(hudu*180/PI);
            // console.log('1')
        }else{
            var deg = Math.round(180-hudu*180/PI);
        }
    }
    else{

        if(c >= 0){
            var deg = Math.round(360+hudu*180/PI) ;
        }else{
            var deg = Math.round(180-hudu*180/PI);  
        }
    }
    return deg;
}

function getMatrix () {
    var a = $('.lyrics_Component');
    var b = $(a).css('transform');

    var c = {};
    c = b;
    c = c.slice(7,-1);
    c = c.split(',');
    var sin = c[1];
    var cos = c[0];

    // console.log(sin+','+cos);

    var d = matrix2deg(sin,cos);
    // console.log(d)
}

getMatrix();


function cdrorate (deg,time) {
    var a = $('.lyrics_Component');
    
    var b = $('.square').children('div');

        $(b[0]).removeClass('NoneDisplay');

    $(a).css({
        'transform':'rotate(-'+deg+'deg)',
        'transition-duration':time+'s'
    });
}

