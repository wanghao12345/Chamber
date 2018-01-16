// var login_params = '{"path":"12000","d":{"tk":"f211d4d20a6ee4821bf33eb98017d8c1"}}';
// http://www.xiaoyaoji.cn/share/1KMHocCKwE/1L6RofYqzX
//实例化WebSocket对象，指定要连接的服务器地址与端口
// addLoading();
socket = new WebSocket("ws://ateam.ticp.io:55151");
token = "";
//打开事件
socket.onopen = function(){
    console.log("Socket 已打开");
    GetToken();
};
//获得消息事件
socket.onmessage = function(msg){
    console.log(msg.data);
    var data = JSON.parse(msg.data);
    switch(data.i){
        case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: //登录
            loginType(data);
        break;
        case 13:
            isGetRedBagType(data);
        break;
        case 12001://投注
            stakeType(data);
        break;
        case 12002://追投
            chasingType(data);
        break;
        case 12003://过去一天的开奖结果
            pastcodeType(data);
        break;
        case 12004:
            StakeRecordType(data);
        break;
        case 12005:
            ChasingRecordType(data);
        break;
        case 12006:
            RankType(data);
        break;
        case 12007:
            StakeRecordDetailType(data);
        break;
        case 12008:
            RevocationChasingType(data);
        break;
        case 12010:
            grandPrixpasswordType(data);
        break;
        case 12011:
            grandPrixListType(data);
        break;
        case 12012:
            // horseLampType(data);
        break;
    }
};
//关闭事件
socket.onclose = function(){
    console.log("Socket 已关闭");
    socket = new WebSocket("ws://ateam.ticp.io:55151");
};
//发生了错误事件
socket.onerror = function(){
    console.log("发生了错误");
    socket = new WebSocket("ws://ateam.ticp.io:55151");
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
            token = data.ret[0].d.token;
			var login_params = '{"path":"12000","d":{"tk":"'+token+'"}}';
            sendSocket(login_params);
        }
    })

}
/*function GetToken(){
    var reg = new RegExp("(^|&)token=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){       
        console.log(unescape(r[2]));
        token = unescape(r[2]);
        var login_params = '{"path":"12000","d":{"tk":"'+token+'"}}';
        sendSocket(login_params);
    }
}*/




/***************----倒计时-----********************/
//截止时间
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
            openAndCloseDoor();
            DJS(3600);
            // document.location.reload();
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
            break;
        case 2: //返回登录用户数据
            login_userData(data)
            break;
        case 3:
            break;
        case 4:
            break;
        case 5: //返回奖金池，押注倒计时
            login_stakeCountDown(data);
            break;
        case 6: //返回当前第几期，以及用户嗨币
            login_numberPeriodsAndMoney(data);
            break;
        case 7: //数字0到9，分别有几期没有出 
            login_periodComeOut(data);
            break;      
        case 8: //返回用户在这一期有没有押注
            login_userIsStake(data)
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
    var arr = data.d;
    var time1 = window.setInterval(function(){
        removeMinTip();

        var time2 = window.setTimeout(function(){
            var num1 = Math.round(Math.random()*9);
            addMinTip(num1,arr[num1]);            
        },4000);



    },7000);   
}
//返回用户在这一期有没有押注
function login_userIsStake(data){
    //关闭loading
    var time = setTimeout(function(){
        clearLoading();
        openAndCloseDoor();
    },2000);

    var time1 = setTimeout(function(){
        addMaxTip('选择下方密码开启密室，就有机会赢取千万大奖！','0.8rem');
    },4000);  
    var time2 = setTimeout(function(){
        removeMaxTip();
    },7000); 
    //开启跑马灯
/*    var horseLamp_params = '{"path": "12012","d": {"tk": "'+token+'"}}';
    sendSocket(horseLamp_params);*/
}
//返回奖金池，押注倒计时
function login_stakeCountDown(data){
    //倒计时(秒)
    var countdown = data.d.countdown;
    DJS(countdown);
    //奖金池
    $('#GoldPool').html(data.d.bonus_pool);
    //上一期的结果
    var last_result_param = data.d.last_result_param.split(',');
    $('div#last_result_param1').html(last_result_param[0]);
    $('div#last_result_param2').html(last_result_param[1]);
    $('div#last_result_param3').html(last_result_param[2]);
    $('span#pastcode-btn i').html(last_result_param[0]+" "+last_result_param[1]+" "+last_result_param[2]);   
}
/******************----跑马灯-----******************/
function horseLampType(data){
    $('.marquee-content-items').html('');
    var item = data.d.data;
    var content = '';
    for (var i = 0; i < item.length; i++) {
        content += '<li>'+item.title+'</li>'
    }
        $('.marquee-content-items').append(content);
}

/******************----投注接口-----******************/
function stakeType(data){
    if (data.i == 12001) {
        console.log("投注成功");
        var dollar = parseInt($('a#dollar').html());
        var cost = $('span#sumcoin').html();
        $('a#dollar').html(dollar-cost);
        //动画
        $('.bettingFrame').css('display','block');
        startFly();
    }else{
        maxTip('投注失败！','1.4rem');
    }
}
/******************----追投接口-----******************/
function chasingType(data){
    if (data.i == 12002) {
        console.log("追投成功");
        var dollar = parseInt($('a#dollar').html());
        var cost = $('span#sumcoin').html();
        $('a#dollar').html(dollar-cost);
        // 动画
        $('.bettingFrame').css('display','block');
        startFly();
    }else{
        maxTip('追投失败！','1.4rem');
    }
}
/******************----往期密码接口-----******************/
function pastcodeType(data){

    $('div#pastcode-item').html('');
    //清除loading
    var time = window.setTimeout(function(){
        clearLoading();
    },1000)
    for (var i = 0; i < data.d.length; i++) {
        var content = "<div class=item><ul>";
        content += "<li>"+data.d[i].index+"号密室</li>";
        content += "<li>"+data.d[i].result_param[0]+"</li>";
        content += "<li>"+data.d[i].result_param[1]+"</li>";
        content += "<li>"+data.d[i].result_param[2]+"</li>";
        content +="</ul></div>"
        $('div#pastcode-item').append(content);   
    }

}
/******************----排行榜-----******************/
function RankType(data){
    $('#self-cost-coin').html(data.d.self.coin);
    $('#self-rank').html(data.d.self.ranking);


    $('#rank-content').html('');
        //清除loading
    var time = setTimeout(function(){
        clearLoading();
    },1000);
    for (var i = 0; i < data.d.data.length; i++) {
        var content = "<div class=item><ul>"
        if (data.d.data[i].ranking<=3) {
            content += "<li><img src=img/rank/number"+data.d.data[i].ranking+".png></li>";
            content +="<li><div class=head><img src="+data.d.data[i].icon+" alt=头像 /></div></li>";
            content +="<li>"+data.d.data[i].nickname+"</li>";
            content +="<li>"+data.d.data[i].coin+"</li>";
        }else{
            content += "<li><span>"+data.d.data[i].ranking+"</span></li>";
            content +="<li><div class=head><img src="+data.d.data[i].icon+" alt=头像 /></div></li>";
            content +="<li>"+data.d.data[i].nickname+"</li>";
            content +="<li>"+data.d.data[i].coin+"</li>";
        }
        content +="</ul></div>";
        $('#rank-content').append(content);    
    }

}
/******************----投注记录数据请求-----******************/
function StakeRecordType(data){
    var item = data.d.data;
    $('#record-content').html('');
    //清除loading
    var time = setTimeout(function(){
        clearLoading();
    },1000);
    if (item.length != 0) {
        var content = "<ul id=bett-record>"
        for (var i = 0; i < item.length; i++) {
            content +='<li><a>';
            content +='<div class="left"><p>';
            content +='<span class="p_left">第'+item[i].index+'号密室</span>';
            if (item[i].stake_type != '0') {//追投
                content +='<i class="p_left" id="chase">追投</i>';
            } 
            if (item[i].flag == 0) {//未开奖
                content +='<span class="p_right">等待解密</span>';
            }else if (item[i].flag == 1) {//已开奖
                if (item[i].get_coin == 0) {//未猜中
                    content +='<span class="p_right">未猜中</span>';
                } else {//已猜中
                    content +='<span class="p_right" id="coin">+'+item[i].get_coin+'嗨币</span>';
                }
            }
            content +='</p>';
            content +='<p>';
            content +='<span class="p_left">'+item[i].created_at+'</span>';
            content +='<span class="p_right">消耗'+item[i].coin+'嗨币</span>';
            content +='</p></div>';
            content +='<div class="right"><img src="img/record/right.png" alt="向右" /><span class="index" style="display:none">'+item[i].index+'</span><span class="ran" style="display:none">'+item[i].ran+'</span></div>';
            content +='</a></li>';
        }
        content +='</ul>';
        $('#record-content').append(content);
    } else {
        var content1 = addNoRecordData();
         $('#record-content').append(content1);
    }



}
/******************----追投记录数据请求-----******************/
function ChasingRecordType(data){
    $('#record-content').html('');
        //消除loading
    var time = setTimeout(function(){
        clearLoading();
    },1000);
    var item = data.d.data;

    if (item.length != 0) {
        var rest = 0;
        var content = '<ul id="catch-record">';
        for (var i = 0; i < item.length; i++) {
            content += '<li><a href="#">';

            content +='<span style="display:none" id="grandprix">'+item[i].grandprix+'</span>';
            content +='<span style="display:none" id="qihao">'+item[i].index+'</span>';
            content +='<span style="display:none" id="cost_coin">'+item[i].coin+'</span>';
            content +='<span style="display:none" id="content">'+item[i].content+'</span>';
            content +='<span style="display:none" id="passwordSetting">'+item[i].num+'</span>';
            content +='<span style="display:none" id="creat_at">'+item[i].created_at+'</span>';
            content +='<span style="display:none" id="updated_at">'+item[i].updated_at+'</span>';

            content +='<span style="display:none" id="stake_type">'+item[i].stake_type+'</span>';
            content +='<span style="display:none" id="ran">'+item[i].ran+'</span>';


            content +='<div class="left">';
            if (item[i].flag==0) {
                content += '<p><span class="p_left">第'+item[i].index+'号密室</span>';
            } else {        
                content += '<p><span class="p_left">已完成</span>';
            }
            if (item[i].status == 1) {
                content += '<i class="p_left" id="chase">已撤单</i>';
            }

            if (item[i].flag == 0) {//未开奖
                content += '<span class="p_right">等待开奖</span></p>';
            }else{//已开奖
                if (item[i].grandprix == 0) {//未中奖
                    content += '<span class="p_right">未中奖</span></p>';
                } else {//中奖
                    content += '<span class="p_right">中奖'+item[i].grandprix+'嗨币</span></p>';
                }
            }

            content += '<p><span class="p_left">'+item[i].created_at+'</span>';
            content += '<span class="p_right">消耗'+item[i].coin+'嗨币</span></p>';
            content += '</div>';
            content += '<div class="right"><img src="img/record/right.png" alt="向右" /><span class="index" style="display:none">'+item[i].index+'</span><span class="ran" style="display:none">'+item[i].ran+'</span></div>';
            content +='</a></li>';
        }
        content +='</ul>';
        $('#record-content').append(content);
    } else {
        var content1 = addNoRecordData();
         $('#record-content').append(content1);        
    }


}
/******************----投注记录详情数据请求-----******************/
function StakeRecordDetailType(data){
    //清除loading
    var time = window.setTimeout(function(){
        clearLoading();
    },1000)
    var item = data.d.data[0];
    if (item.flag == 0) {//等待开奖
        $('.stakeRecordDetail .top-title').html('等待开奖'); 
    } else {//已开奖（寻宝成功/寻宝失败）
        if (item.get_coin == 0) {
            $('.stakeRecordDetail .top-title').html('寻宝失败');      
        }else{
            $('.stakeRecordDetail .top-title').html('寻宝成功');
        }
    }
    $('.stakeRecordDetail .top-content .top-period span:nth-child(1)').html(item.index+'期');
    $('.stakeRecordDetail .top-content .top-period span:nth-child(2) i').html('+'+item.get_coin+'嗨币');

    $('.stakeRecordDetail .top-content ul li:nth-child(1) span').html(item.coin+'嗨币');
    $('.stakeRecordDetail .top-content ul li:nth-child(2) span').html(item.content);
    $('.stakeRecordDetail .top-content ul li:nth-child(3) span').html('共'+item.num+'组密码');
    $('.stakeRecordDetail .top-content ul li:nth-child(4) span').html(item.created_at);
    $('.stakeRecordDetail .top-content ul li:nth-child(5) span').html(item.updated_at);

    if (item.flag == 0 || data.d.result_param.length== 0 ) {
        $('.stakeRecordDetail .top-content ul li:nth-child(6)').css('display','none');
    }else if (item.flag != 0 && data.d.result_param.length!= 0){
        $('.stakeRecordDetail .top-content ul li:nth-child(6)').css('display','block');

        $('.stakeRecordDetail .top-content ul li:nth-child(6) div span:nth-child(1) i').html(data.d.result_param[0][0]);
        var img_url1 = data.d.result_param[0][1]==0?'img/record/cha.png':'img/record/gou.png';
        var win_price1 = data.d.result_param[0][1]==0? ' ': '+'+data.d.result_param[0][1];
        $('img#isWinPrize1').attr('src',img_url1);
        $('label#isWinPrize1-content').html(win_price1);

        $('.stakeRecordDetail .top-content ul li:nth-child(6) div span:nth-child(2) i').html(data.d.result_param[1][0]);
        var img_url2 = data.d.result_param[1][1]==0?'img/record/cha.png':'img/record/gou.png';
        var win_price2 = data.d.result_param[1][1]==0? ' ': '+'+data.d.result_param[1][1];
        $('img#isWinPrize2').attr('src',img_url2);
        $('label#isWinPrize2-content').html(win_price2);

        $('.stakeRecordDetail .top-content ul li:nth-child(6) div span:nth-child(3) i').html(data.d.result_param[2][0]);        
        var img_url3 = data.d.result_param[2][1]==0?'img/record/cha.png':'img/record/gou.png';
        var win_price3 = data.d.result_param[2][1]==0? ' ': '+'+data.d.result_param[2][1];
        $('img#isWinPrize3').attr('src',img_url3);
        $('label#isWinPrize3-content').html(win_price3);
    }   
}

/******************----金豆大奖-----******************/
function grandPrixpasswordType(data){
    $('.goldBeanFrame .main-content').html('');
    //清除loading
    var time = window.setTimeout(function(){
        clearLoading();
    },1000)
    var item = data.d;
    var content = '<div class="content grandPrixpassword">';
    content +='<div class="title">';
    content +='<ul><li>期号</li><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li></ul>';
    content +='</div>';
    content +='<div class="middle-content" id="pastcode-item">';
    for (var i = 0; i < item.length; i++) {
        content += '<div class="item">';
        content += '<ul>';
        content += '<li>'+item[i].index+'</li>';
        for (var j = 0; j < 10; j++) {
            if (j==parseInt(item[i].param)) {
                content += '<li><span>'+item[i].param+'</span></li>';
            }else{
                content +='<li></li>';
            }
        }

        content += '</ul>';  
        content += '</div>';  
    }
    content += '</div>';  
    content += '<div class="bottom-tip">';  
    content += '<p>代表三个密室同时开出对的密码</p>';  
    content += '</div>';  
    content += '</div>';  
    $('.goldBeanFrame .main-content').append(content);
}
function grandPrixListType(data){
    $('.goldBeanFrame .main-content').html('');
    //清除loading
    var time = window.setTimeout(function(){
        clearLoading();
    },1000)
    var item = data.d.data;
    var content = '<div class="content grandPrixList">';
    for (var i = 0; i < item.length; i++) {
        content += '<div class="item">';
        content +='<div class="item-img"><span><img src="'+item[i].icon+'" alt="头像" /></span></div>'
        content +='<div class="item-title">'+item[i].nickname+'</div>';
        content +='<div class="item-coin">';
        content +='<p>'+item[i].grandprix_sum+'嗨币<img src="img/index/icon-bean.png" alt="嗨币"></p>';
        content +='<p>'+item[i].updated_at+'</p>';
        content +='</div>';
        content +='</div>';
    }
    content +='</div>';
    $('.goldBeanFrame .main-content').append(content);
}
// 撤销追投
function RevocationChasingType(data){
    if (data.d.errcode == 0) {//正确
        document.location.reload();
    } else {
        maxTip('撤销失败！','1.4rem');

        var time = window.setTimeout(function(){
            document.location.reload();
        },1000)

    }
}
/******************----查看当前投注详情记录-----******************/

function viewSetPasswordType(data){
    var item = data.d;
    $('.stakeRecordDetail param1').html('等待开奖');
    $('.stakeRecordDetail param2').html(item.index+'期');
    $('.stakeRecordDetail param3').html('+0嗨币');
    $('.stakeRecordDetail param4').html(item.coin+'嗨币');
    $('.stakeRecordDetail param5').html(item.content);
    $('.stakeRecordDetail param6').html('共'+item.num+'组密码');
    $('.stakeRecordDetail param7').html(item.created_at);
    $('.stakeRecordDetail param8').html(item.updated_at);
    $('.stakeRecordDetail isParam').css('display','none');

}
/******************----是否获得红包碎片-----******************/
function isGetRedBagType(data){
    if (data.d.errcode == 0) {
        maxTip('恭喜您获得了红包碎片','1.4rem');
    } 
    if (data.d.errcode == -1) {
        maxTip('本次开奖您没有获得红包碎片','1.4rem');
    }
}

