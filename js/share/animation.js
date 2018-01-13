//开门动画过后马上关门动画
function openAndCloseDoor(){
	openDoorAnimation();
	var t = window.setTimeout(function(){
		closeDoorAnimation();			
	},3000);	
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
			top:"8.8rem",
			left:"2rem"
		},"slow");		
		$('.flyCode2').animate({
			top:"7.3rem",
			left:"7rem"
		},"slow");	
		$('.flyCode3').animate({
			top:"8.9rem",
			left:"12rem"
		},"slow");
		$('.flyCode').fadeOut("slow");
		
	},1000);
	var time1 = window.setTimeout(function(){
		$('.flyCode').remove();
	},2000);

}