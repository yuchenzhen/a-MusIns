$(document).ready(function () {
	// 播放暂停
	var audio = document.querySelector('#player1')


	$('#audio_control').on({
		'click':function () {
			var b = $(this).children('span');
			var a = $(b).hasClass('glyphicon-stop');
			
			if(!a){
				$(b).removeClass('glyphicon-play').addClass('glyphicon-stop');
				audio.play();
				ProcessGo ();
				var TimeWhole = timeDispose(audio.duration);
				// console.log(TimeWhole)
				$('.process_Component_songTime').html(TimeWhole);

			}
			else{
				$(b).removeClass('glyphicon-stop').addClass('glyphicon-play');
				audio.pause();
				clearInterval(nInterval);

				
			}
		}
		
	})


	// 静音调节
	var audioVolume;

	$('.voice_Component_voice').click(function () {
		var b = $('.voice_Component_voice');
		var d = $(b).children('span')[0];
		var a = $(b).hasClass('DisEmp');
		var c ;
		if(!a){
			audioVolume = audio.volume;
			audio.volume = 0;
			$('.voice_Component_processYet').css('width','0');
			$(b).addClass('DisEmp').removeClass('Emp');
			$(d).addClass('glyphicon-volume-up').removeClass('glyphicon-volume-off');
		}else{
			
			audio.volume = audioVolume;
			c = audioVolume * 100
			$('.voice_Component_processYet').css('width',c+'%');
			$(b).addClass('Emp').removeClass('DisEmp');
			$(d).addClass('glyphicon-volume-off').removeClass('glyphicon-volume-up');
		}
	});

	// var voiceEmp = document.querySelector('.voice_Component_voiceEmp')
	// 声音调节
	(function voiceChange() {
		var voiceYet = $('.voice_Component_processYet');
		var voiceWhole = $('.voice_Component_process');
		

		function clickX(agr) {
			var clickX = agr.offsetX;
			var width = $(voiceWhole)[0].clientWidth;
			
			
			var a = (clickX/width*100).toFixed(2)
			
			$(voiceYet).css('width',a+'%');

			audio.volume = clickX/width;

			if($('.voice_Component_voice').hasClass('DisEmp')){
				$('.voice_Component_voice').addClass('Emp').removeClass('DisEmp')
			}
		};

		$(voiceYet).click(function (e) {
			var evt = e||event;
			clickX(evt)
		});
		$(voiceWhole).click(function (e) {
			var evt = e||event;
			clickX(evt)
		})

	})();
	// 初始音量设置


	// 进度条
	(function process() {
		var processYet = document.querySelector('.process_Component_processYet');
		var process = document.querySelector('.process_Component_process');
		var processBack = document.querySelector('.process_Component_processBack');
		var b = document.querySelector('.process_Component_songTime');

		function clickXM (agr) {
			var clickXM = agr.offsetX;
			var width = processBack.clientWidth;
			var a = (clickXM/width*100).toFixed(2);
			

			$(processYet).css('width',a+'%');
			$(process).css('left', a-2 +'%');

			// console.log(audio.currentTime)
			// console.log(audio.duration)

			audio.currentTime = a*audio.duration/100;
			audio.play();
			proLyrcs(a);


			ProcessGo ();



			$('#audio_control').children('span').removeClass('glyphicon-play').addClass('glyphicon-stop');
			var c = $(b).html().indexOf(' ');
			if(c){
				var TimeWhole = timeDispose(audio.duration);
				$(b).html(TimeWhole);
			}


		}

		$(processYet).click(function (e) {
			var evt = e||event;


			clickXM(evt);
		})
		$(processBack).click(function (e) {
			var evt = e|| event;

			clickXM(evt);
		})

		
		 	

		


		


	})()
	var nInterval;
	// 
	function ProcessGo () {
		var processYet = document.querySelector('.process_Component_processYet');
		var process = document.querySelector('.process_Component_process');		
		var timeGo = $('.process_Component_songPresentTime');

		var a = $('.square').children('div')
		var b = {};
		var c = [];
			for(var i=0; i<a.length;i++){
				// b[i] = $(a[i]).attr(lyrdeg);
				c[i] = $(a[i]).attr('lyrtime');
				b[c[i]] = parseInt($(a[i]).attr('lyrdeg'));
			}

		var processNow = 0;

			 nInterval = setInterval(function () {

				var processNow = (audio.currentTime/audio.duration)*100;
				var TimeGo = timeDispose(audio.currentTime);
				
				$(processYet).css('width',processNow+'%');
				$(process).css('left', processNow-2 +'%');
				$(timeGo).html(TimeGo);

				var d = parseInt(audio.currentTime);
				// console.log('d:'+d)

				if(b.hasOwnProperty(d)){

					lyrrotate (d,b[d])
					

					

				}



				// console.log(processNow)
			},500);
	};	

	function timeDispose (num) {
		var minute = parseInt(num/60);
		var second = parseInt(num%60);

		minute = minute >= 10? minute: "0"+minute;
		second = second >= 10? second: "0"+second;

		return minute+":"+second
	};


	// 展开列表
	(function (argument) {
		var listOpen = $('.musicList_btn_list');
		var musicListMesg = $('.musicList_ablum');
		var musicListBtn = $('.musicList_btn');
		var musicList = $('.musicList_select_list');
		var musicListCom = $('.musicList_Component ');
		var musicListClose = $('.select_list_head_shutdown');

		$(listOpen).click(function () {
			$(musicListBtn).addClass('NoneDisplay');	
			$(musicListMesg).addClass('NoneDisplay');	
			$(musicList).removeClass('NoneDisplay');	
			$(musicListCom).addClass('detail');
		});

		$(musicListClose).click(function  () {
			$(musicListBtn).removeClass('NoneDisplay');	
			$(musicListMesg).removeClass('NoneDisplay');	
			$(musicList).addClass('NoneDisplay');	
			$(musicListCom).removeClass('detail');
		})
	})()
})



// 歌词随歌曲进度



function lyrrotate (t,lyrdeg) {
	var t = parseInt(t);

    var a = $('.square').children('div[lyrtime='+t+']');
    

    var c = $(a).attr('lyrnum');
    	c = parseInt(c);

    var s = c-1;	
	var e = $('.square').children('div[lyrnum='+s+']');

    	// console.log('c:'+c)
    	// var d = c+6;
    	// for( var i=c; i <=d ;i++){
    	// 	// console.log(i);
    	// 	$('.square').children('div[lyrnum='+i+']').removeClass('NoneDisplay');
    	// } 
    	// var e = c-6;
    	// for(var i=0 ; i<=e; i++){
    	// 	$('.square').children('div[lyrnum='+i+']').addClass('NoneDisplay');
    	// 	console.log('e:'+i)
    	// }
    	// var f = $('.square').children('div').length
    	// for(var i= d;i <= f; i++){
    	// 	$('.square').children('div[lyrnum='+i+']').addClass('NoneDisplay');
    	// 	console.log('f:'+i)
    	// }

    	showAndNone(c);

    // console.log(a);
    $(a).addClass('active');
    $(e).removeClass('active');

    var b = $('.lyrics_Component');

    lyrdeg = lyrdeg+110;
    $(b).css({
        'transform':'rotate(-'+lyrdeg+'deg)',
        'transition-duration': '10s'
    })



    // console.log('2')
}


function showAndNone(c) {
    	var d = c+6;
    	for( var i=c; i <=d ;i++){
    		// console.log(i);
    		$('.square').children('div[lyrnum='+i+']').removeClass('NoneDisplay');
    	} 
    	var e = c-6;
    	for(var i=0 ; i<=e; i++){
    		$('.square').children('div[lyrnum='+i+']').addClass('NoneDisplay');
    		// console.log('e:'+i)
    	}
    	var f = $('.square').children('div').length
    	for(var i= d;i <= f; i++){
    		$('.square').children('div[lyrnum='+i+']').addClass('NoneDisplay');
    		// console.log('f:'+i)
    	}
}

function proLyrcs (a) {
	var lyrWholeNum = $('.square').children('div').length;
	var c = parseInt(lyrWholeNum*a/100)
	var b =$('.square').children('div');

		showAndNone(c);


	 	e =$(b[c]).attr('lyrdeg');
	var d = $('.lyrics_Component');

	e = parseInt(e)+110;
	$(d).css({
        'transform':'rotate(-'+e+'deg)',
        'transition-duration': '.002s'		
	})

	// console.log(b);
}