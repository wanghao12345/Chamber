$(function(){


	/****************************------点击事件-----******************************/
	//menu
	$('.back1-right').on('click',function(){
		var menu_display =  $(".menu").css('display');
		$('.menu').css('display',menu_display == 'none'?menu_display='block':menu_display='none');
	})
	//选择金币基数
	$('#numberList ul li a').on('click',function(){
		$('#numberList ul li a').removeClass('active');
		$(this).addClass('active');
	})
	//选择密码
	$('#selectList ul li .list-top').on('click',function(){
		//变背景
		$(this).css('background','url(img/index/list-top-1.png)');
		$(this).css('background-size','100% 100%');
		//变金币
		var va1 = parseInt($('#numberList ul li a.active').html());
		var va2 = parseInt($(this).siblings('.list-bottom').html())+va1;
		$(this).siblings('.list-bottom').html(va2);
		//总金币数
		var va = parseInt($('#sumcoin').html())+va1;
		$('#sumcoin').html(va);
	})
	//撤销
	$('#chexiao').on('click',function(){
		//恢复0
		$('#selectList ul li .list-top').css('background','url(img/index/list-top.png)');
		$('#selectList ul li .list-top').css('background-size','100% 100%');
		$('#selectList ul li .list-bottom').html('0');
		//总金币
		$('#sumcoin').html('0');

	})
	//全选
	$('#quanxuan').on('click',function(){
		//背景
		$('#selectList ul li .list-top').css('background','url(img/index/list-top-1.png)');
		$('#selectList ul li .list-top').css('background-size','100% 100%');
		//基数
		var va1 = parseInt($('#numberList ul li a.active').html());
		for (var i = 1; i <= 10; i++) {
			var va2 = parseInt($('#selectList ul li:nth-child('+i+') .list-bottom').html())+va1;
			$('#selectList ul li:nth-child('+i+') .list-bottom').html(va2);
		}
		//总金币数
		var va = parseInt($('#sumcoin').html())+va1*10;
		$('#sumcoin').html(va);
	})

})


/**
 *  倒计时
**/
//截止时间
DJS();
function DJS() {
	var maxtime = 60*60 //一个小时，按秒计算，自己调整! 
	var timer = setInterval(function(){
		if(maxtime>=0){ 
		minutes = Math.floor(maxtime/60); 
		seconds = Math.floor(maxtime%60); 
		// msg = "距离结束还有"+checkTime(minutes)+"分"+checkTime(seconds)+"秒"; 
		$('#cutdown').html('00:'+checkTime(minutes)+':'+checkTime(seconds));
		// console.log(msg);
		--maxtime; 
		} 
		else{ 
		clearInterval(timer); 
			alert("时间到，结束!"); 
		} 
	},1000); 
}
function checkTime(time){
	if (time>=0 && time <10) {
		return '0'+time;
	}else{
		return time;
	}
}






