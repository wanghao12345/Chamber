//开门动画过后马上关门动画
function openAndCloseDoor(){
	openDoorAnimation();
	var t = window.setTimeout(function(){
		closeDoorAnimation();	
	},5000);
}

//开门动画
function openDoorAnimation(){
	transform1();
}
//关门动画
function closeDoorAnimation(){
	closeDoor();
}
//顺时针旋转
function transform1(){
	var rotate = 0;
	var t = window.setInterval(function(){
		rotate += 30;
		$('.round').css({
			"transform":"rotate("+rotate+"deg)",
			"-ms-transform":"rotate("+rotate+"deg)", /* IE 9 */
			"-webkit-transform":"rotate("+rotate+"deg)", /* Safari and Chrome */
		});
		// console.log(rotate);
		if (rotate == 360) {
			//去掉定时器的方法 
			window.clearInterval(t); 
			var t1 = window.setTimeout(function(){
				$('.round').css('display','none');
				$('.cipher').css('display','block');
				openDoor();							
			},1000);
		}
	},100); 
}

// 逆时针旋转
function transform2(){
	var rotate = 0;
	var t = window.setInterval(function(){
		rotate -= 30;
		$('.round').css({
			"transform":"rotate("+rotate+"deg)",
			"-ms-transform":"rotate("+rotate+"deg)", /* IE 9 */
			"-webkit-transform":"rotate("+rotate+"deg)", /* Safari and Chrome */
		});
		// console.log(rotate);
		if (rotate == -360) {
			//去掉定时器的方法 
			window.clearInterval(t); 
			

		}
	},100); 
}

//开门
function openDoor() {

	$(".door-left").animate({width: '0%'}, "slow");
	$(".door-right").animate({width: '0%'}, "slow");
}
//关门
function closeDoor() {

	$(".door-left").animate({width: '50%'}, "slow");
	$('.cipher').css('display','none');
	$(".door-right").animate({width: '50%'}, "slow",function(){
		var t = window.setTimeout(function(){

			$('.round').css('display','block');	
			transform2();				
		},1000);

	
	});
}

/**************************------押注的动画------************************/
//开始
function startFly(){
	var index = getStakeCode();
	//获取坐标
	getOptionAndAppend(index);



}
//寻找押注的密码
function getStakeCode(){
	var index = 0;
	for (var i = 1; i <= 10; i++) {
		var value = parseInt($('#selectList ul li:nth-child('+i+') .list-bottom').html());
		if (value != 0) {
			index = parseInt($('#selectList ul li:nth-child('+i+') .list-top').html());
			break;
		}
	}	
	return index;
}
//获取押注密码的坐标已经将fly放进body
function getOptionAndAppend(index){
	var X = parseInt($('#selectList ul li:nth-child('+(index+1)+') .list-top').offset().top)/20;
	var Y = parseInt($('#selectList ul li:nth-child('+(index+1)+') .list-top').offset().left)/20+0.3;
	$('body').append('<div class="flyCode flyCode2">'+index+'</div>');	
	var time = window.setTimeout(function(){
		$('.flyCode2').animate({
			top:"14rem",
		},1000);

		addCodeFlyThree(index);

	},100);

}
//一个code变3个
function addCodeFlyThree(index){
	var time = window.setTimeout(function(){
		$('body').append('<div class="flyCode flyCode1" style="top:14rem;left:7rem">'+index+'</div>');	
		$('body').append('<div class="flyCode flyCode3" style="top:14rem;left:7rem">'+index+'</div>');
		$('.flyCode1').animate({
			top:"14rem",
			left:"4rem"
		},"slow");		
		$('.flyCode3').animate({
			top:"14rem",
			left:"10rem"
		},"slow");	
		codeFlyDoor();
	},1000)	
}
//code飞到对应的门上
function codeFlyDoor(){
	var time = window.setTimeout(function(){
		$('.flyCode1').animate({
			top:"8.4rem",
			left:"2rem"
		},"slow");		
		$('.flyCode2').animate({
			top:"6.7rem",
			left:"7rem"
		},"slow");	
		$('.flyCode3').animate({
			top:"8.4rem",
			left:"12rem"
		},"slow");
		$('.flyCode').fadeOut("slow");
		
	},1000);
	var time1 = window.setTimeout(function(){
		$('.flyCode').remove();
	},2000);
}
/**************************------提示框------************************/
function addAndRemoveTip(num,arr){
    addMinTip(num,arr[num]);
    var time = window.setTimeout(function(){	
    	 removeMinTip();
    },1000)
}



//插入小提示框
function addMinTip(index,num){
	var top = "1rem";
	var left = "-0.6rem";
	switch(index){
		case 0:
			top = "1.2rem";
			left = "-0.6rem";
		break;
		case 1:
			top = "1.2rem";
			left = "2.4rem";
		break;
		case 2:
			top = "1.2rem";
			left = "5.4rem";
		break;
		case 3:
			top = "1.2rem";
			left = "8.4rem";
		break;
		case 4:
			top = "1.2rem";
			left = "11.4rem";
		break;
		case 5:
			top = "4.8rem";
			left = "-0.6rem";
		break;
		case 6:
			top = "4.8rem";
			left = "2.4rem";
		break;
		case 7:
			top = "4.8rem";
			left = "5.4rem";
		break;
		case 8:
			top = "4.8rem";
			left = "8.4rem";
		break;
		case 9:
			top = "4.8rem";
			left = "11.4rem";
		break;
	}
	var content = '<div class="tooltips" style="top:'+top+';left:'+left+'">';
	content += '<div class="tooltips-content">"'+index+'"已有'+num+'期未出';
	content += '<div class="arrow arrow-border"></div>';
	content += '<div class="arrow arrow-bg"></div>';
	content += '</div>';
	content += '</div>';
	$('.selectList ul li:nth-child('+(index+1)+')').append(content);	
}
//清除小提示框
function removeMinTip(){
	$('.selectList ul li .tooltips').remove();
}

//插入大提示框
function maxTip(content,line_hight){
    addMaxTip(content,line_hight); 
    var time = setTimeout(function(){
        removeMaxTip();
    },2000); 	
}

//插入大提示框
function addMaxTip(content,line_hight){
	$('body').append('<div class="maxtooltip" style="line-height:'+line_hight+'">'+content+'</div>');
}
//清除大提示框
function removeMaxTip(){
	$('.maxtooltip').remove();
}
/**************************------无记录页面------************************/
function addNoRecordData(){
	var content = '<div class="noRecordFrame">';
	content +='<div class="img"><img src="img/record/nodata.png" alt="无数据"></div>';
	content +='<p>暂无解密，快来抢夺宝藏吧</p>';
	content +='<div class="back-btn"><button id="noRecord-back-btn">去解密</button></div>';
	content +='</div>';
	return content;
}



