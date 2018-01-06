$(function(){

	open();

	var t = window.setTimeout(function(){
		close();			
	},3000);



})

//开门动画
function open(){
	transform1();
}
//关门动画
function close(){
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