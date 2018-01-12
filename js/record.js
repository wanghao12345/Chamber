$(function(){

	// tab
	$(".tab .tab-btn span").on('click',function(){
		//tab
		$(".tab .tab-btn span").removeClass('active');
		$(this).addClass('active');
	})
	//投注记录
	$(".tab .tab1 span").on('click',function(){
		$(".content ul").css("display","none");
		$("#bett-record").css("display","block");
	})
	//追投记录
	$(".tab .tab2 span").on('click',function(){
		$(".content ul").css("display","none");
		$("#catch-record").css("display","block");
	})	

	//投注记录数据请求
	/*var time = window.setInterval(function(){
		StakeRecordRequest();
	},2000)*/


})

/******************----投注记录数据请求-----******************/
function StakeRecordRequest(){
	var StakeRecord_params = '{"path": "12004","d": {"tk": "'+token+'"}}';
	sendSocket(StakeRecord_params);
}
//追投记录数据请求
function ChasingRecordRequest(){
	
}



