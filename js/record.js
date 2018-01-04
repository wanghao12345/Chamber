$(function(){

	// tab
	$(".tab .tab-btn span").on('click',function(){
		//tab
		$(".tab .tab-btn span").removeClass('active');
		$(this).addClass('active');
		//显示区域
		$(".content").empty();
	})
	//投注记录
	$(".tab .tab1 span").on('click',function(){

	})
	//追投记录
	$(".tab .tab2 span").on('click',function(){

	})	

})


//投注记录数据请求
function askForData1(){
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
	$.ajax({
	        url: "",
	        type: "get",
	        data: {},
	        dataType: "json",
	        success: function(data) {

	        
	        }
	})	
}

