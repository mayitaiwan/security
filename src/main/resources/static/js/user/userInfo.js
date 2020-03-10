$(function() {
	// 放置按钮
	var configBtns = {
		containerDiv : "btns",
		position : "center",
		buttons : [ {
			title : "提交",// button显示文字
			clickFun : submitMe
		},// 点击后事件
		{
			title : "关闭",// button显示文字
			clickFun : function() {
				parent.getWin("userWin").closeMe();
			}
		} ]
	};
	new $.ui.button(configBtns);
});
// 提交
function submitMe() {
	var result = checkForm();
	if (result) {
		$("#userForm").submit();
	}
}
// 校验
function checkForm() {
	var userIdVal = -1;
	var userAccountVal = $("#userAccount").val();
	var userNameVal = $("#userName").val();
	var userDescVal = $("#userDesc").val();
	var hn = 0;
	var result = true;
	var message = "";
	if (userAccountVal == "" || $.trim(userAccountVal).length == 0) {
		message = "用户账号不能为空！<br/>"
		result = false;
		hn += 1;
	} else if (userAccountVal.length > 20) {
		message = "用户账号长度不能大于20！<br/>"
		result = false;
		hn += 1;
	}
	if (userNameVal == "" || $.trim(userNameVal).length == 0) {
		message = message + "用户姓名不能为空！<br/>"
		result = false;
		hn += 1;
	} else if (userNameVal.length > 20) {
		message = message + "用户姓名长度不能大于20！<br/>"
		result = false;
		hn += 1;
	}
	if (userDescVal.length > 20) {
		message = message + "用户描述长度不能大于20！<br/>"
		result = false;
		hn += 1;
	}
	// ajax校验用户账号是否重复
	var $userId=$("#id");
	if($userId.size()>0){
		userIdVal=$userId.val();	
	}
	var param = {
		userAccount : userAccountVal,
		id:userIdVal
	};
	if (result) {
		$.ajax({
			type : 'post',// ajax提交方式
			url : contextPath + "/user/ajax/checkUserAccount",// 提交的url
			data : param,// 参数
			dataType : 'text',// 数据返回的形式，默认为text即文本
			cache : false,
			async : false,
			success : function(msg) {
				if (parseInt(msg) > 0) {
					message = "用户账号不能重复!"
					result = false;
					hn += 1;
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert('data error');
			}
		});
	}
	// 如果有校验不通过，弹出对话框看
	if (!result) {
		var msgconfig = {
			width : 250,
			height : hn,
			message : message,// 消息内容
			type : "warning",// 消息窗口类型
			triggerWin : window
		};
		parent.createMsgBox(msgconfig);
	}
	return result;
}
// 创建用户后，返回本窗口，弹出消息,按钮点击事件
function closeMe() {
	// 找到新增窗口对象
	var win = parent.getWin("userWin");
	// 调用列表窗口上的刷新数据列表
	win.config.triggerWin['refreshGrid']();
}