$(function(){
	//获取token
	var token = GetQueryString('token');
	//登录请求
	var login_params = '{"path":"12000","d":{"tk":"a55972b482093de8b8eb6d08a24cb478"}}';
	// var login_params = '{"path":"12000","d":{"tk":'+token+'}}';
    var login_socket = new LoginWebSocket(login_params);
    // login_socket.init();

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
		isBetting();
	})
	//撤销
	$('#chexiao').on('click',function(){
		//恢复0
		$('#selectList ul li .list-top').css('background','url(img/index/list-top.png)');
		$('#selectList ul li .list-top').css('background-size','100% 100%');
		$('#selectList ul li .list-bottom').html('0');
		//金币基数重置
		$('#numberList ul li a').removeClass('active');
		$('#numberList ul li:first-child a').addClass('active');
		//总金币
		isBetting();

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
		isBetting();
	})
	/*********---------追投--------*********/
	//显示追投框
	$('#zhuitou').on('click',function(){
		$('.chasingFrame').css('display','block');
		//是否有追选方案
		isGrammer();
		// 初始化期数
		$('#period-value').val(1);
	})
	//关闭追投框
	$('#chasing-back').on('click',function(){
		$('.chasingFrame').css('display','none');
		$('#period-value').val(1);
	})
	//选择倍数
	$('#period-selec-2 ul li').on('click',function(){
		var value = $(this).children('i').html();
		$('#period-value').val(value);
		consumeCoin();
	})
	//增加
	$('#add').on('click',function(){
		var value = parseInt($('#period-value').val())+1;
		$('#period-value').val(value);
		consumeCoin();
	})
	//减少
	$('#reduce').on('click',function(){
		var value = parseInt($('#period-value').val())>1?parseInt($('#period-value').val())-1:1;
		$('#period-value').val(value);
		consumeCoin();
	})
	//监听输入
	$('#period-value').bind('input propertychange', function(){
    	var value = parseInt($('#period-value').val());
    	if (value<1) {
    		$('#period-value').val(1);
    	}else if (value>500) {
    		$('#period-value').val(500);
    	}else if (value>=1 && value<=500) {
    		$('#period-value').val(value);
    	}else{
    		$('#period-value').val(1);
    	}
    	consumeCoin();
	})
	/*********---------投注按钮--------*********/
	$('#sendBetting').on('click',function(){
		if ($(this).html() != '至少选择一个密码') {//已经下注了
			//判断金币够不够
			var dollor = parseInt($('.bottomSelect a#dollar').html());
			var cost = parseInt($('#numberList ul li a.active').html());
			if (dollor<cost) {//跳往充值界面
				// window.location.href = "www.baidu.com";
			} else {//动画
				//押注请求
				stakeRequest();



				//动画
				
				//密码设定成功
				$('.bettingFrame').css('display','block');
			}

		} else {//没有下注
			var index = Math.floor(Math.random()*10);
			$('#selectList ul li:nth-child('+index+') .list-top').css('background','url(img/index/list-top-1.png)');
			$('#selectList ul li:nth-child('+index+') .list-top').css('background-size','100% 100%');
			var txt = $('#numberList ul li a.active').html();
			$('#selectList ul li:nth-child('+index+') .list-bottom').html(txt);
			$(this).html('立即消耗'+txt+'嗨币');
		}
	})
	/*********---------投注成功弹窗 --------*********/
	//关闭
	$('.bettingFrame .bettingFrame-content .button .btn-2').on('click',function(){
		$('.bettingFrame').css('display','none');
	})

	/*********---------规则说明--------*********/
	//打开
	$('#menu-rule-btn').on('click',function(){
		$('.ruleFrame').css('display','block');
	})
	//关闭
	$('#rule-close-btn-1').on('click',function(){
		$('.ruleFrame').css('display','none');
	})	
	$('#rule-close-btn-2').on('click',function(){
		$('.ruleFrame').css('display','none');
	})	
	/*********---------往期密码--------*********/
	//打开
	$('#pastcode-btn').on('click',function(){
		$('.pastcodeFrame').css('display','block');
	})
	//关闭
	$('#pastcode-close-btn-1').on('click',function(){
		$('.pastcodeFrame').css('display','none');
	})	
	$('#pastcode-close-btn-2').on('click',function(){
		$('.pastcodeFrame').css('display','none');
	})	

})

/***************----投注-----********************/
//确认投注按钮框的变化
function isBetting(){
	var result = getGrammer();
	if (result.sum != 0) {
		haveBetting(result);
	} else {
		noBetting();
	}	
}
//有投注
function haveBetting(result){
	$('.bottomSelect .select-bottom .query a').html('立即消耗<span id="sumcoin" style="margin: 0rem 0.1rem">'+result.sum+'</span>嗨币');
}
//无投注
function noBetting(){
	$('.bottomSelect .select-bottom .query a').html('至少选择一个密码');	
}
//押注请求
function stakeRequest(){
	//押注请求
	var stake_params = '{"path": "12001","d": {"tk": "a55972b482093de8b8eb6d08a24cb478","data": [{"stake_param": "1","coin": "100"},{"stake_param": "7","coin": "700"}]}}';
    var stake_socket = new StakeWebSocket(stake_params);
    // stake_socket.init();	
}

/***************----追投-----********************/
//判断有没有追投方案
function isGrammer(){
	var result = getGrammer();
	if (result.sum != 0) {
		haveGrammer(result);
	} else {
		noGrammer();
	}
}
//获取追选方案
function getGrammer(){
	var result = {},sum = 0,arr = [];

	for (var i = 1; i <= 10; i++) {
		var va2 = parseInt($('#selectList ul li:nth-child('+i+') .list-bottom').html());
		if (va2 != 0) {
			sum +=va2;
			arr.push((i-1));
		}
	}
	result.sum = sum;
	result.arr = arr;	
	return result;
}
//有追投方案
function haveGrammer(result){
	//显示框的变化
	haveGrammerProgramme();
	var str = "";
	for (var i = 0; i < result.arr.length; i++) {
		str +='<i>'+result.arr[i]+'</i>';
	}
	$('#programme').html('追选方案'+str);
	$('.recharge .query a').html('立即消耗<span id="sumcoin" style="margin: 0rem 0.1rem">'+result.sum+'</span>嗨币');
}
//有追投方案programme变化
function haveGrammerProgramme(){
	$('#programme').css('display','block');
	$('.chasing-content').css('height','7rem');
	$('.chasingFrame .chasing-content .chasing-bottom').css('height','6rem');
	$('.chasing-bottom .chasing-period').css('height','4rem');
	$('.chasing-bottom .chasing-period').css('box-sizing','border-box');
	$('.chasing-bottom .chasing-period').css('padding-top','0rem');	
}
//没有追投方案
function noGrammer(){
	// 显示框的变化
	noGrammerProgramme();
	$('.recharge .query a').html('至少选择一个密码');	
}
//没有追投方案programme变化
function noGrammerProgramme(){
	$('#programme').css('display','none');
	$('.chasing-content').css('height','6rem');
	$('.chasingFrame .chasing-content .chasing-bottom').css('height','5rem');
	$('.chasing-bottom .chasing-period').css('height','3rem');
	$('.chasing-bottom .chasing-period').css('box-sizing','border-box');
	$('.chasing-bottom .chasing-period').css('padding-top','0.5rem');
}
//追选方案消耗的嗨币
function consumeCoin(){
	var result = getGrammer();	
	var num = parseInt($('#period-value').val());
	$('.recharge .query a span#sumcoin').html(parseInt(result.sum)*num);
	$('.bottomSelect .select-bottom .query a span#sumcoin').html(parseInt(result.sum)*num);
}

/******************----获取url参数-----******************/
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}





