$(function(){
	//获取token
	// var token = GetQueryString('token');
	// GetToken();
	//跑马灯
	// createMarquee({});
	/*******************----参数设置-----**********************/	
	//充值路径
	var Recharge_Path = "";
	//娱乐大厅路径
	var Entertainment_Hall = "";
	$('#entertainmentHall').attr('href',Entertainment_Hall);

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
	//追投按钮
	$("#sendChasing").on('click',function(){
		if ($(this).html() != '至少选择一个密码') {//已经下注了
			//判断金币够不够
			var dollor = parseInt($('.bottomSelect a#dollar').html());
			var cost = parseInt($('#numberList ul li a.active').html());
			if (dollor<cost) {//跳往充值界面
				window.location.href = Recharge_Path;
			} else {
				//押注请求
				chasingRequest();
			}

		} else {//没有下注
			//投注密码按钮改变
			var index = Math.floor(Math.random()*10);
			$('#selectList ul li:nth-child('+index+') .list-top').css('background','url(img/index/list-top-1.png)');
			$('#selectList ul li:nth-child('+index+') .list-top').css('background-size','100% 100%');
			var txt = $('#numberList ul li a.active').html();
			$('#selectList ul li:nth-child('+index+') .list-bottom').html(txt);
			//本按钮文字改变
			$(this).html('立即消耗'+txt+'嗨币');
			$('.select-bottom #sendBetting').html('立即消耗'+txt+'嗨币');
			//追投密码列表
			$('div#programme').append('<i>'+index+'</i>');
			//是否有追投方案
			isGrammer();
		}
	})

	/*********---------无记录--------*********/
	$('.recordFrame').on('click','#noRecord-back-btn',function(){
		$('.recordFrame').css('display','none');
		document.location.reload();
	})
	/*********---------投注按钮--------*********/
	$('#sendBetting').on('click',function(){
		if ($(this).html() != '至少选择一个密码') {//已经下注了
			//判断金币够不够
			var dollor = parseInt($('.bottomSelect a#dollar').html());
			var cost = parseInt($('#numberList ul li a.active').html());
			if (dollor<cost) {//跳往充值界面
				window.location.href = Recharge_Path;
			} else {
				//押注请求
				stakeRequest();
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
	/*********---------金豆大奖 --------*********/
	//tab
	$('.goldBean-content .tab-btn').on('click',function(){
		$('.goldBean-content .tab-btn').removeClass('active');
		$(this).addClass('active');
	})
	//大奖密码
	$('.goldBean-content .tab-btn1').on('click',function(){
		addLoading();
		grandPrixpasswordRequest();
	})
	//大奖名单
	$('.goldBean-content .tab-btn2').on('click',function(){
		addLoading();
		grandPrixListRequest();
	})

	$('#gold-bean').on('click',function(){
		addLoading();
		grandPrixpasswordRequest();
		$('.goldBeanFrame').css('display','block');
	})
	//关闭
	$('#goldBean-close-btn-1').on('click',function(){
		$('.goldBeanFrame').css('display','none');
	})
	$('#goldBean-close-btn-2').on('click',function(){
		$('.goldBeanFrame').css('display','none');
	})

	/*********---------规则说明--------*********/
	//打开
	$('#menu-rule-btn').on('click',function(){
		$('.ruleFrame').css('display','block');
	})
	$('#rank-openrule-btn').on('click',function(){
		$('.ruleFrame').css('display','block');
	})
	//关闭
	$('#rule-close-btn-1').on('click',function(){
		$('.ruleFrame').css('display','none');
	})	
	$('#rule-close-btn-2').on('click',function(){
		$('.ruleFrame').css('display','none');
	})	

	/*********---------排行榜--------*********/
	$('#menu-rank-btn').on('click',function(){
		addLoading();
		RankYesterdayRequest();
		$('.rankFrame').css('display','block');
		// $('.box').css('display','none');
	})
	$('#rank-goback-btn').on('click',function(){
		// $('.box').css('display','block');
		// $('.rankFrame').css('display','none');
		document.location.reload();
	})
	//昨日今日切换
	$('#rank-tag-btn').on('click',function(){
		var id = $(this).attr('value');
		if (id == "yesterday") {
			addLoading();
			RankTodayRequest();
			$(this).attr('value','today');
			$(this).html('今日排行');
		} else if (id == "today") {
			addLoading();
			RankYesterdayRequest();
			$(this).attr('value','yesterday');
			$(this).html('昨日排行');
		} 
	})


	/*********---------解密记录--------*********/
	$('#menu-record-btn').on('click',function(){
		addLoading();
		StakeRecordRequest();
		$('.recordFrame').css('display','block');
	})
	$('#rank-goback-btn').on('click',function(){
		$('.recordFrame').css('display','none');
		document.location.reload();
	})
	// tab
	$("#record-tab .tab-btn span").on('click',function(){
		//tab
		$("#record-tab .tab-btn span").removeClass('active');
		$(this).addClass('active');
	})
	//投注记录
	$("#record-tab .tab1 span").on('click',function(){
		addLoading();
		StakeRecordRequest();
	})
	//追投记录
	$("#record-tab .tab2 span").on('click',function(){
		addLoading();
		ChasingRecordRequest();
	})	
	/*********---------投注记录详情--------*********/
	$('.recordFrame').on('click','ul#bett-record li',function(){
		addLoading();
		StakeRecordDetailRequest(this);
		$('.stakeRecordDetail').css('display','block');
		$('.recordFrame').css('display','none');
	})
	$('.stakeRecordDetail').on('click','#stakeRecordDetail-btn',function(){
		// $('.recordFrame').css('display','none');
		// $('.stakeRecordDetail').css('display','none');
		document.location.reload();
	})
	/*********---------追投记录详情--------*********/
	//显示分类
	$('.recordFrame').on('click','ul#catch-record li',function(){
		if ($(this).find('span.p_right')=="等待开奖" && $(this).find('i#chase')!="已撤单") {
			var cost_coin = $(this).find('span#cost_coin').html();
			var get_coin = 0;
			var content = $(this).find('span#content').html();
			var passwordSetting = "共"+$(this).find('span#passwordSetting').html()+"个密码";
			var creat_at = $(this).find('span#creat_at').html();
			var updated_at = $(this).find('span#updated_at').html();
			var qihao = "第"+$(this).find('span#qihao').html()+"期";
			var stake_type = $(this).find('span#stake_type').html();
			var ran = $(this).find('span#ran').html();
			$('.chasingRecordDetail #param1').html(cost_coin);
			$('.chasingRecordDetail #param2').html(get_coin);
			$('.chasingRecordDetail #param3').html(content);
			$('.chasingRecordDetail #param4').html(passwordSetting);
			$('.chasingRecordDetail #param5').html(creat_at);
			$('.chasingRecordDetail #param6').html(updated_at);
			$('.chasingRecordDetail #param7').html(qihao);
			$('.chasingRecordDetail #param8').html(cost_coin+"嗨币");


			$('.chasingRecordDetail #stake_type').html(stake_type);
			$('.chasingRecordDetail #ran').html(ran);

			$('.chasingRecordDetail').css('display','block');
			$('.recordFrame').css('display','none');

		} else {
			var grandprix = $(this).find('span#grandprix').html();
			var cost_coin = $(this).find('span#cost_coin').html();
			var get_coin = 0;
			var content = $(this).find('span#content').html();
			var passwordSetting = "共"+$(this).find('span#passwordSetting').html()+"个密码";
			var creat_at = $(this).find('span#creat_at').html();
			var updated_at = $(this).find('span#updated_at').html();
			var qihao = $(this).find('span#qihao').html()+"期";

			if ($(this).find('span.p_right')=="等待开奖") {
				$('.stakeRecordDetail #param1').html('等待开奖');
			}else{
				if (grandprix=="0") {
					$('.stakeRecordDetail #param1').html('寻宝失败');
					
				} else {
					$('.stakeRecordDetail #param1').html('寻宝成功');
				}				
			}

			$('.stakeRecordDetail #param2').html(qihao);
			$('.stakeRecordDetail #param3').html('+'+grandprix+'嗨币');	
			$('.stakeRecordDetail #param4').html(cost_coin+'嗨币');
			$('.stakeRecordDetail #param5').html(content);
			$('.stakeRecordDetail #param6').html(passwordSetting);
			$('.stakeRecordDetail #param7').html(creat_at);
			$('.stakeRecordDetail #param8').html(updated_at);


			$('.stakeRecordDetail #isParam').css('display','none');
			$('.stakeRecordDetail').css('display','block');
			$('.recordFrame').css('display','none');
		}
	})
	//
	$('.chasingRecordDetail div#item').on('click',function(){

			var qihao = $('.chasingRecordDetail span#param7').html();
			var cost_coin = $('.chasingRecordDetail span#param8').html();
			var content = $('.chasingRecordDetail span#param3').html();
			var passwordSetting = $('.chasingRecordDetail span#param4').html();
			var creat_at = $('.chasingRecordDetail span#param5').html();
			var updated_at = $('.chasingRecordDetail span#param6').html();

			$('.stakeRecordDetail #param1').html('等待开奖');
			$('.stakeRecordDetail #param2').html(qihao);
			$('.stakeRecordDetail #param3').html('+0嗨币');	
			$('.stakeRecordDetail #param4').html(cost_coin);
			$('.stakeRecordDetail #param5').html(content);
			$('.stakeRecordDetail #param6').html(passwordSetting);

			$('.stakeRecordDetail #param7').html(creat_at);
			$('.stakeRecordDetail #param8').html(updated_at);


			$('.stakeRecordDetail #isParam').css('display','none');
			$('.stakeRecordDetail').css('display','block');
			$('.chasingRecordDetail').css('display','none')
			$('.recordFrame').css('display','none');
	})
	//撤销追投
	$('.chasingRecordDetail button#btn-1').on('click',function(){

		var stake_type = $('.chasingRecordDetail span#stake_type').html();
		var ran = $('.chasingRecordDetail span#stake_type').html();
		var RevocationChasing_params = '{"path":"12008","d":{"tk":"'+token+'","stake_type":"'+stake_type+'","ran":"'+ran+'"}}'
		sendSocket(RevocationChasing_params);	

	})
	//继续追投
	$('.chasingRecordDetail button#btn-2').on('click',function(){
		document.location.reload();
	})





	/*********---------往期密码--------*********/
	//打开
	$('#pastcode-btn').on('click',function(){
		//请求往期密码
		addLoading();
		pastcodeRequest();
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
	//获取投注数据
	var data = [];
	for (var i = 1; i <= 10; i++) {
		var p = {};
		p.stake_param= $('#selectList ul li:nth-child('+i+') .list-top').html()
		p.coin = $('#selectList ul li:nth-child('+i+') .list-bottom').html();
		if (p.coin != "0") {
			data.push(p)
		}
	}
	//押注请求
	//var stake_params = '{"path": "12001","d": {"tk": "a55972b482093de8b8eb6d08a24cb478","data": [{"stake_param": "1","coin": "100"},{"stake_param": "7","coin": "700"}]}}';
	var dataJSON = JSON.stringify(data);
	var stake_params = '{"path": "12001","d": {"tk": "'+token+'","data": '+dataJSON+'}}';
	sendSocket(stake_params);
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
//追投请求
function chasingRequest(){
	//获取投注数据
	var data = [];
	for (var i = 1; i <= 10; i++) {
		var p = {};
		p.stake_param= $('#selectList ul li:nth-child('+i+') .list-top').html()
		p.coin = $('#selectList ul li:nth-child('+i+') .list-bottom').html();
		if (p.coin != "0") {
			data.push(p)
		}
	}
	//追多少期
	num = $('input#period-value').val();
	//押注请求
	var dataJSON = JSON.stringify(data);
	var chasing_params = '{"path": "12002","num":"'+num+'","d": {"tk": "'+token+'","data": '+dataJSON+'}}';
	sendSocket(chasing_params);
}
/******************----请求往期密码-----******************/
function pastcodeRequest(){
	var pastcode_params = '{"path":"12003","d":{"tk":"'+token+'"}}';
	sendSocket(pastcode_params);

}
/******************----排行榜-----******************/
function RankTodayRequest(){
	var RankToday_params = '{"path": "12006","d": {"tk": "'+token+'","type":"today"}}';
	sendSocket(RankToday_params);
}
function RankYesterdayRequest(){
	var RankYesterday_params = '{"path": "12006","d": {"tk": "'+token+'","type":"yesterday"}}';
	sendSocket(RankYesterday_params);
}

/******************----投注记录数据请求-----******************/
function StakeRecordRequest(){
	var StakeRecord_params = '{"path": "12004","d": {"tk": "'+token+'"}}';
	sendSocket(StakeRecord_params);
}
//追投记录数据请求
function ChasingRecordRequest(){
	var ChasingRecord_params = '{"path": "12005","d": {"tk": "'+token+'"}}';
	sendSocket(ChasingRecord_params);	
}
/******************----投注记录详细数据请求-----******************/
function StakeRecordDetailRequest(_this){
	// var _this = this;
	var index = $(_this).children('a').children('.right').children('span.index').html();
	var ran = $(_this).children('a').children('.right').children('span.ran').html();
	var StakeRecordDetail_params = '{"path": "12007","d": {"tk": "'+token+'","index":"'+index+'","ran":"'+ran+'"}}';
	sendSocket(StakeRecordDetail_params);	
}
/******************----金豆大奖-----******************/
function  grandPrixpasswordRequest(){
	var grandPrixpassword_params = '{"path": "12010","d": {"tk": "'+token+'"}}';
	sendSocket(grandPrixpassword_params);
}
function  grandPrixListRequest(){
	var grandPrixList_params = '{"path": "12011","d": {"tk": "'+token+'"}}';
	sendSocket(grandPrixList_params);
}

/******************----追投记录详情-----******************/






/******************----获取url参数-----******************/
/*function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}*/



