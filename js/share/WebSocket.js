var login_params = '{"path":"12000","d":{"tk":"f211d4d20a6ee4821bf33eb98017d8c1"}}';

//实例化WebSocket对象，指定要连接的服务器地址与端口
socket = new WebSocket("ws://ateam.ticp.io:55151");

//打开事件
socket.onopen = function(){
    console.log("Socket 已打开");
    // socket.send(login_params);
    GetToken();
};
//获得消息事件
socket.onmessage = function(msg){
    console.log(msg.data);
    loginType(JSON.parse(msg.data));
    stakeType(JSON.parse(msg.data));
    chasingType(JSON.parse(msg.data));

};
//关闭事件
socket.onclose = function(){
    console.log("Socket 已关闭");
};
//发生了错误事件
socket.onerror = function(){
    console.log("发生了错误");
}
//发送
var sendSocket = function(data){
    socket.send(data);
}
//关闭
var closeSocket = function(){
    socket.close();
}
/******************----获取测试token-----******************/
function GetToken(){
	$.ajax({
        url: "http://ateam.ticp.io:9109/1?d={%22hi_uid%22:%223%22,%22phone%22:%2218711111111%22,%22nickname%22:%22%E5%BC%A0%E9%A3%9E1%22,%22icon%22:%221111%22,%22time%22:%221510726176%22,%22sign%22:%2268799b666137cdcc54baf0dfcde2a28e%22}",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            console.log(data);
            var token = data.ret[0].d.token;
			var login_params = '{"path":"12000","d":{"tk":"'+token+'"}}';
            sendSocket(login_params);
        }
    })
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
/******************----登录接口-----******************/
function loginType(data){
    switch(data.i){
        case 1://返回服务器当前时间戳
            console.log(data);
            break;
        case 2: //返回登录用户数据
            console.log(data);
            login_userData(data)
            break;
        case 3:
            console.log(data);
            break;
        case 4:
            console.log(data);
            break;
        case 5: //返回奖金池，押注倒计时
            console.log(data);
            login_stakeCountDown(data);
            break;
        case 6: //返回当前第几期，以及用户嗨币
            console.log(data);
            login_numberPeriodsAndMoney(data);
            break;
        case 7: //数字0到9，分别有几期没有出 
            console.log(data);
            break;      
        case 8: //返回用户在这一期有没有押注
            console.log(data);
            break;                      
    }    
}

//返回服务器当前时间戳
function login_serverTime(data){

}
//返回登录用户数据
function login_userData(data){
    //嗨币数
    $('a#dollar').html(data.d.hi_money);
    //用户头像
    $('img#user_image').attr('src',data.d.icon);    
}
//返回当前第几期，以及用户嗨币
function login_numberPeriodsAndMoney(data){
    //嗨币数
    $('a#dollar').html(data.d.hi_money);    
}
//数字0到9，分别有几期没有出 
function login_periodComeOut(data){

}
//返回用户在这一期有没有押注
function login_userIsStake(data){

}

//返回奖金池，押注倒计时
function login_stakeCountDown(data){
     //倒计时(秒)
    var countdown = data.d.countdown;
    DJS(countdown);
    //上一期的结果
    var last_result_param = data.d.last_result_param.split(',');
    $('div#last_result_param1').html(last_result_param[0]);
    $('div#last_result_param2').html(last_result_param[1]);
    $('div#last_result_param3').html(last_result_param[2]);
    $('span#pastcode-btn i').html(last_result_param[0]+" "+last_result_param[1]+" "+last_result_param[2]);   
}
/******************----投注接口-----******************/


function stakeType(data){
    if (data.i == 1) {
        console.log("投注成功");
    }
}
/******************----追投接口-----******************/
function chasingType(data){
    if (data.i == 1) {
        console.log("追投成功");
    }
}
/******************----往期密码接口-----******************/

