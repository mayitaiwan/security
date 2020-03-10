$(function() {
	// 放置按钮
	var configBtns = {
		containerDiv : "btns",
		position : "center",
		buttons : [ {
			title : "提交",// button显示文字
			clickFun : submitMe
		}]
	};
	new $.ui.button(configBtns);
});
// 提交
function submitMe() {
	var result = checkForm();
	if (result) {
		$("#permissionForm").submit();
	}
}
// 校验
function checkForm() {
	var nameVal = $("#name").val();
	var descriptionVal = $("#description").val();
	var patchStringVal = $("#patchString").val();
	var urlStringVal = $("#url").val();
	var orderNumberVal = $("#orderNumber").val();
	var hn = 0;
	var result = true;
	var message = "";
	if (nameVal == "" || $.trim(nameVal).length == 0) {
		message = message + "权限名称不能为空！<br/>"
		result = false;
		hn += 1;
	} else if (nameVal.length > 20) {
		message = message + "权限名称长度不能大于20！<br/>"
		result = false;
		hn += 1;
	}
	if (patchStringVal.length > 50) {
		message = message + "权限匹配字符串长度不能大于50！<br/>"
		result = false;
		hn += 1;
	}
	if (urlStringVal.length > 50) {
		message = message + "权限链接字符串长度不能大于50！<br/>"
		result = false;
		hn += 1;
	}
	if (orderNumberVal == "" || $.trim(orderNumberVal).length == 0) {
		message = message + "顺序号不能为空！<br/>"
		result = false;
		hn += 1;
	}else if(orderNumberVal.length>0){
		if(!/^\d{0,3}$/.test(orderNumberVal)){  
			message = message + "顺序号请输入1-3位的数字！<br/>"
			result = false;
			hn += 1;
		 }  
	}
	if (descriptionVal.length > 50) {
		message = message + "权限描述长度不能大于50！<br/>"
		result = false;
		hn += 1;
	}

	// 如果有校验不通过，弹出对话框看
	if (!result) {
		var msgconfig = {
			width : 300,
			height : hn,
			message : message,// 消息内容
			type : "warning",// 消息窗口类型
			triggerWin : window
		};
		parent.parent.createMsgBox(msgconfig);
	}
	return result;
}