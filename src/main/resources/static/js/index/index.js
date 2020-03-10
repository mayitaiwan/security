function getElementOffset(element) {
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	var actualTop = element.offsetTop;
	while (current !== null) {
		actualLeft += current.offsetLeft;
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return {
		top : actualTop,
		left : actualLeft
	};
}
var _x = 0;
var _clientX = 0;
$(function() {
	var fixwd = 5, fixht =60 ;// 左边栏及右边60栏宽度高度调整值
	$("#tableLayout")
			.width(window.document.documentElement.clientWidth - fixwd);
	$("#divLeft").css({
		"width" : 190,
		"height" : window.document.documentElement.clientHeight - fixht
	});
	$("#divRight").css({
		"width" : $("#tableLayout").width() - $("#divLeft").width() - 18,
		"height" : window.document.documentElement.clientHeight - fixht
	});

	$("#tdLine").mousedown(function(e) {
		e = e || window.event;
		var originalWDiv = document.getElementById("divLeft");
		if (originalWDiv.setCapture) {
			originalWDiv.setCapture();
		} else if (window.captureEvents) {
			window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
		}
		var tdLine = document.getElementById("tdLine");
		var tdOffset = getElementOffset(tdLine);
		$("#dragDiv").css({
			top : tdOffset.top + "px",
			left : tdOffset.left + "px",
			width : "4px",
			height : $("#tdLine").height() + "px"
		});
		_x = e.clientX - parseInt(tdOffset.left);
		_clientX = e.clientX;
		$("#dragDiv").show();
		$("#dragOverDiv").show();

		document.onmousemove = function(e) {
			e = e || window.event;
			var left = e.clientX - _x;
			if (left > 190 && left < 500) {
				$("#dragDiv").css("left", (e.clientX - _x) + "px");
			}
		}
		document.onmouseup = function(e) {
			e = e || window.event;
			// 鼠标移动的距离
			var diffX = e.clientX - _clientX;
			$("#dragDiv").hide();
			$("#dragOverDiv").hide();
			// 原来左边的div宽度
			var oldLeftW = $("#divLeft").width();
			// 新的左边div宽度
			var leftW = $("#divLeft").width() + diffX;
			// 超出范围
			if (leftW < 190) {
				leftW = 190;
				diffX = 190 - oldLeftW;
			}
			// 超出范围
			if (leftW > 500) {
				leftW = 500;
				diffX = 500 - oldLeftW;
			}
			$("#divLeft").width(leftW);
			$("#divRight").width($("#divRight").width() - diffX);
			// 作废捕获局限
			if (originalWDiv.releaseCapture) {
				originalWDiv.releaseCapture();
			} else if (window.captureEvents) {
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			}
			document.onmousemove = null;
			document.onmouseup = null;
		}

		// 如果提供了事件对象，则这是一个非IE浏览器
		if (e && e.preventDefault) {
			// 阻止默认浏览器动作(W3C)
			e.preventDefault();
		} else {
			// IE中阻止函数器默认动作的方式
			window.event.returnValue = false;
		}
		return false;
	});
});

// 创建窗口
function createWin(config) {
	var winConfig = {
		title : config.title,// 窗口标题
		name : config.name,// 窗口名字
		width : config.width,// 宽度
		height : config.height,// 高度
		min : config.min,// 是否显示最小按钮
		max : config.max,// 是否显示最大按钮
		close : config.close,// 是否显示关闭按钮
		module : config.module,// 是否以模态窗口方式打开
		buttons : config.buttons,// 按钮
		/*
		 * [ { value : btnSaveVal, returnFun :
		 * "returnFun",//点击后调用iframe页面的returnFun方法 click : function(win, v)
		 * {//生成窗口的主页面的方法 // getValue(v); // alert('index.js') // win.closeMe(); } }, {
		 * value : "关闭", returnFun : "beforeClose",//点击后调用iframe页面的beforeClose方法
		 * click : function(win) { win.closeMe(); } } ]
		 */
		closeFun : config.closeFun,// 关闭按钮点击后事件
		/*
		 * { selfFun:function(win,value){//本窗口方法 },
		 * returnFun:"returnFun"}//弹出页面的返回方法
		 */
		resize : config.resize,// 是否可以更改窗口大小
		loader : config.loader,
		triggerWin : config.triggerWin
	// 触发弹窗的window对象
	};

	new $.ui.win(winConfig);

}


//简单消息弹框
function createMsgBox(config){
  	var msgconfig=  {
  		width:config.width,
  		height:config.height*22+90,
	  	message:config.message,//消息内容
	  	type:config.type,//消息窗口类型
	  	triggerWin:config.triggerWin,
	  	closedFun:config.clickFun//窗口上按钮点击后的事件方法，prompt类型的参数为text内容，其他:是，确定的参数为1，否为-1，取消为0
  	};
 	  $.ui.win.msgBox(msgconfig);
}