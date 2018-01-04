/**
 * loading需求
 *
 * 1.导入spin.min.js
 * 2.导入jquery.min.js
 */

$(function(){

    // 测试添加
    addLoading();

    //测试移除loading
    setTimeout(function(){
        clearLoading();
    },5000);
})

//添加loading
function addLoading(){
    //添加loadingDOM
    $("body").append('<div id="foo" style="width:100%; height:100%; position:fixed;top:0px;left:0px;background: rgba(0, 0, 0, 0.6);"></div>');
    var opts = {
         lines: 9, // loading小块的数量
         length: 0, // 小块的长度
         width: 10, // 小块的宽度
         radius: 15, // 整个圆形的半径
         corners: 1, // 小块的圆角，越大则越圆
         rotate: 0, // loading动画的旋转度数，貌似没什么实际作用
         color: '#fff', // 颜色
         speed: 1, // 变换速度
         trail: 60, // 余晖的百分比
         shadow: false, // 是否渲染出阴影
         hwaccel: false, // 是否启用硬件加速
         className: 'spinner', // 给loading添加的css样式名
         zIndex: 2e9, // The z-index (defaults to 2000000000)
         top: 'auto', // Top position relative to parent in px
         left: 'auto' // Left position relative to parent in px
    };
    var target = document.getElementById('foo');
    var spinner = new Spinner(opts).spin(target);    
}
//移除loading
function clearLoading(){
    $("#foo").remove();
}
