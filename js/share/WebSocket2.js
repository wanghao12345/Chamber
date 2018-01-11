


/**
 * 登录
 * @param 登录参数
 */
var LoginWebSocket = function(params){
	this.params = params;
	this.init();
}
LoginWebSocket.prototype={
	init:function(){
		if (typeof(WebSocket) == "undefined") {
			alert("您的浏览器不支持WebSocket,请换浏览器！")
		}else{
			this.creat(this.params);
		}
	},
	//创建WebSocket对象
	creat:function(params){
		//创建对象
		this.socket = new WebSocket("ws://ateam.ticp.io:55151");
		var loginType = new LoginType();
		//打开事件
        this.socket.onopen = function() {
            console.log("login WebSocket已打开");
            this.send(params);
        };
        //获得消息事件
        this.socket.onmessage = function(msg) {
        	// console.log(JSON.parse(msg.data));
        	loginType.login(JSON.parse(msg.data));
        };
        //关闭事件
        this.socket.onclose = function() {
            console.log("login WebSocket已关闭");
        };
        //发生了错误事件
        this.socket.onerror = function() {
            console.log("login WebSocket发生了错误");
        }
	},
	send:function(data){
		this.socket.send(data);
	},
	close:function(){
		this.socket.close();
	}
}

var LoginType = function(){}
LoginType.prototype = {
	login:function(data){
		switch(data.i){
			case 1://返回服务器当前时间戳
				console.log(data);
				break;
			case 2:	//返回登录用户数据
				console.log(data);
				this.userData(data);
				break;
			case 3:
				console.log(data);
				break;
			case 4:
				console.log(data);
				break;
			case 5:	//返回奖金池，押注倒计时
				console.log(data);
				this.stakeCountDown(data);
				break;
			case 6:	//返回当前第几期，以及用户嗨币
				console.log(data);
				this.numberPeriodsAndMoney(data);
				break;
			case 7:	//数字0到9，分别有几期没有出 
				console.log(data);
				break;		
			case 8:	//返回用户在这一期有没有押注
				console.log(data);
				break;						
		}
	},
	//返回服务器当前时间戳
	serverTime:function(data){

	},
	//返回登录用户数据
	userData:function(data){
		//嗨币数
		$('a#dollar').html(data.d.hi_money);
		//用户头像
		$('img#user_image').attr('src',data.d.icon);
	},
	//返回当前第几期，以及用户嗨币
	numberPeriodsAndMoney:function(data){
		//嗨币数
		$('a#dollar').html(data.d.hi_money);
	},
	//数字0到9，分别有几期没有出 
	periodComeOut:function(data){

	},
	//返回用户在这一期有没有押注
	userIsStake:function(data){

	},
	//返回奖金池，押注倒计时
	stakeCountDown:function(data){
		//倒计时(秒)
		var countdown = data.d.countdown;
		DJS(countdown);
		//上一期的结果
		var last_result_param = data.d.last_result_param.split(',');
		$('div#last_result_param1').html(last_result_param[0]);
		$('div#last_result_param2').html(last_result_param[1]);
		$('div#last_result_param3').html(last_result_param[2]);
		$('span#pastcode-btn').html(last_result_param[0]+" "+last_result_param[1]+" "+last_result_param[2]);
	}
}

/**
 * 投注
 * @param 参数
 */
var StakeWebSocket = function(params){
	this.params = params;	
	this.init();
}
StakeWebSocket.prototype={
	init:function(){
		if (typeof(WebSocket) == "undefined") {
			alert("您的浏览器不支持WebSocket,请换浏览器！")
		}else{
			this.creat(this.params);
		}
	},
	//创建WebSocket对象
	creat:function(params){
		//创建对象
		this.socket = new WebSocket("ws://ateam.ticp.io:55151");
		var stakeType = new StakeType();
		//打开事件
        this.socket.onopen = function() {
            console.log("stake WebSocket已打开");
            this.send(params);
        };
        //获得消息事件
        this.socket.onmessage = function(msg) {
        	console.log(msg.data);
        	stakeType.stake(JSON.parse(msg.data))
        };
        //关闭事件
        this.socket.onclose = function() {
            console.log("stake WebSocket已关闭");
        };
        //发生了错误事件
        this.socket.onerror = function() {
            console.log("stake WebSocket发生了错误");
        }
	},
	send:function(data){
		this.socket.send(data);
	},
	close:function(){
		this.socket.close();
	}
}

var StakeType = function(){}
StakeType.prototype={
	stake:function(data){
		if (data.i == -1) {
			alert(data.d);
		}else{
			alert("success");
		}
	}
}

/**
 * 追投
 * @param 追投参数
 */
var ChasingWebSocket = function(params){
	this.params = params;	
	this.init();
}
ChasingWebSocket.prototype={
	init:function(){
		if (typeof(WebSocket) == "undefined") {
			alert("您的浏览器不支持WebSocket,请换浏览器！")
		}else{
			this.creat(this.params);
		}
	},
	//创建WebSocket对象
	creat:function(params){
		//创建对象
		this.socket = new WebSocket("ws://ateam.ticp.io:55151");
		var chasingType = new ChasingType();
		//打开事件
        this.socket.onopen = function() {
            console.log("chasing WebSocket已打开");
            this.send(params);
        };
        //获得消息事件
        this.socket.onmessage = function(msg) {
        	console.log(msg.data);
        	chasingType.chasing(JSON.parse(msg.data));
        };
        //关闭事件
        this.socket.onclose = function() {
            console.log("chasing WebSocket已关闭");
        };
        //发生了错误事件
        this.socket.onerror = function() {
            console.log("chasing WebSocket发生了错误");
        }
	},
	send:function(data){
		this.socket.send(data);
	},
	close:function(){
		this.socket.close();
	}		
}

var ChasingType = function(){}
ChasingType.prototype = {
	chasing:function(data){
		if (data.i == 1) {
			alert("成功");
		} else if (data.i == -1) {
			alert("失败");
		}
	}
}












/***************----倒计时-----********************/
//截止时间
// DJS();
function DJS(countTime) {
	var maxtime = countTime; //一个小时，按秒计算，自己调整! 
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
			// alert("时间到，结束!"); 
			DJS(3600);
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