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
		$("#bett").css("display","block");
	})
	//追投记录
	$(".tab .tab2 span").on('click',function(){
		$(".content ul").css("display","none");
		$("#catch").css("display","block");
	})	

})


//投注记录数据请求
function askForData1(){
	//显示区域
	$(".content").empty();
	$.ajax({
	        url: "",
	        type: "get",
	        data: {},
	        dataType: "json",
	        success: function(data) {

	        
	    	}
	})
}
//追投记录数据请求
function askForData2(){
	//显示区域
	$(".content").empty();
	$.ajax({
	        url: "",
	        type: "get",
	        data: {},
	        dataType: "json",
	        success: function(data) {

	        
	        }
	})	
}

