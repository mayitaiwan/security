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
				parent.getWin("roleWin").closeMe();
			}
		} ]
	};
	new $.ui.button(configBtns);
});
// 提交
function submitMe() {
	var result = checkForm();
	if (result) {
		$("#roleForm").submit();
	}
}
// 校验
function checkForm() {
	var roleIdVal = -1;
	var nameVal = $("#name").val();
	var roleDescVal = $("#roleDesc").val();
	var hn = 0;
	var result = true;
	var message = "";
	if (nameVal == "" || $.trim(nameVal).length == 0) {
		message = message + "角色名称不能为空！<br/>"
		result = false;
		hn += 1;
	} else if (nameVal.length > 20) {
		message = message + "角色名称长度不能大于20！<br/>"
		result = false;
		hn += 1;
	}
	if (roleDescVal.length > 20) {
		message = message + "角色描述长度不能大于20！<br/>"
		result = false;
		hn += 1;
	}
	var $roleId = $("#id");
	if ($roleId.size() > 0) {
		roleIdVal = $roleId.val();
	}
	// ajax校验角色名称是否重复
	var param = {
		name : nameVal,
		id : roleIdVal
	};
	if (result) {
		$.ajax({
			type : 'post',// ajax提交方式
			url : contextPath + "/role/ajax/checkRoleName",// 提交的url
			data : param,// 参数
			dataType : 'text',// 数据返回的形式，默认为text即文本
			cache : false,
			async : false,
			success : function(msg) {
				if (parseInt(msg) > 0) {
					message = "角色名称不能重复!";
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
// 创建角色后，返回本窗口，弹出消息,按钮点击事件
function closeMe() {
	// 找到新增窗口对象
	var win = parent.getWin("roleWin");
	// 调用列表窗口上的刷新数据列表
	win.config.triggerWin['refreshGrid']();
}