var mygrid = null;
$(function() {
	var fixwd = 5, fixht = 65;// 表格宽度高度调整值
	$("#gridContainer").css({
		"width" : window.document.documentElement.clientWidth - fixwd,
		"height" : window.document.documentElement.clientHeight - fixht
	});
	mygrid = new grid({
		containerDiv : "gridDiv",
		url : contextPath + "/user/page",
		rp : 20,
		param : {
			userAccount : "",
			userName : ""
		},
		selectType : "multiple",// 单选single，多选multiple
		animate : true,// 是否可以交换列，改变列宽度
		callback : {//刷新时，关闭掉所有弹框
			afterloaded : function(mygrid) {
				parent.closeAllWin();
			}
		}
	});
	/* 放置各个按钮 start */
	// 放置表格上面的按钮
	var configBtnGrid = null;
//	if (role == 'superAdmin') {
		configBtnGrid = {
			containerDiv : "gridButtons",
			position : "left",
			buttons : [ {
				title : "增加",// button显示文字
				clickFun : addUserWin
			// 点击后事件
			}, {
				title : "修改",// button显示文字
				clickFun : modifyUserWin
			}, {
				title : "删除",// button显示文字
				clickFun : deleteUsers
			}, {
				title : "设置角色",// button显示文字
				clickFun : setRoles
			} ]
		};
/*	} else if (role == 'admin') {
		configBtnGrid = {
			containerDiv : "gridButtons",
			position : "left",
			buttons : [ {
				title : "增加",// button显示文字
				clickFun : addUserWin
			// 点击后事件
			}, {
				title : "修改",// button显示文字
				clickFun : modifyUserWin
			}, {
				title : "删除",// button显示文字
				clickFun : deleteUsers
			} ]
		};
	}
	*/
	if (configBtnGrid) {
		new $.ui.button(configBtnGrid);
	}
	// 放置表格上面的按钮
	var configBtnSearch = {
		containerDiv : "searchBtn",
		position : "left",
		buttons : [ {
			title : "查询",// button显示文字
			clickFun : function() {
				var userAccountVal = $("#userAccount").val();
				var userNameVal = $("#userName").val();
				mygrid.reload({
					userAccount : userAccountVal,
					userName : userNameVal
				});
			}// 点击后事件
		} ]
	};
	new $.ui.button(configBtnSearch);
	/* 放置各个按钮 end */
});
// 新增用户按钮弹出窗口
function addUserWin() {
	var config = {
		name : "userWin",
		title : "新增用户",// 窗口标题
		width : 500,// 宽度
		height : 160,// 高度
		min : false,// 是否显示最小按钮
		max : false,// 是否显示最大按钮
		close : true,// 是否显示关闭按钮
		module : true,// 是否以模态窗口方式打开
		loader : {
			iframeflag : true,
			url : contextPath + "/user/toAddUser"
		},
		triggerWin : window
	// 触发弹窗的window对象
	};

	parent.createWin(config);
}

// 修改用户
function modifyUserWin() {
	// 取得选择行的数据
	var selectRowdata = mygrid.getSelectedRowdata();
	// 没有选择或者选择了多行数据
	if (selectRowdata.length != 1) {
		// 弹出消息对话框
		var msgconfig = {
			width : 250,
			height : 1,
			message : "请选择一行数据!",// 消息内容
			type : "warning",// 消息窗口类型
			triggerWin : window
		};
		parent.createMsgBox(msgconfig);
		return;
	}
	// 弹出修改用户数据对话框
	var config = {
		name : "userWin",
		title : "修改用户",// 窗口标题
		width : 500,// 宽度
		height : 160,// 高度
		min : false,// 是否显示最小按钮
		max : false,// 是否显示最大按钮
		close : true,// 是否显示关闭按钮
		module : true,// 是否以模态窗口方式打开
		loader : {
			iframeflag : true,
			url : contextPath + "/user/toModifyUser?id="
					+ selectRowdata[0]['id']
		},
		triggerWin : window
	// 触发弹窗的window对象
	};
	parent.createWin(config);
}

// 删除用户数据
function deleteUsers() {
	// 取得选择行的数据
	var selectRowdata = mygrid.getSelectedRowdata();
	// 选择数据的总行数
	var dl = selectRowdata.length;
	// 没有选择数据
	if (dl == 0) {
		// 弹出消息对话框
		var msgconfig = {
			width : 250,
			height : 1,
			message : "请选择数据!",// 消息内容
			type : "warning",// 消息窗口类型
			triggerWin : window
		};
		parent.createMsgBox(msgconfig);
		return;
	}

	var confirmConfig = {
		width : 250,
		height : 1,
		message : "确定删除该数据？",// 消息内容
		type : "confirm",// 消息窗口类型
		triggerWin : window,
		clickFun : "confirmFun"
	};
	parent.createMsgBox(confirmConfig);

}

// confirm回调
function confirmFun(result) {
	if (result) {
		// 取得选择行的数据
		var selectRowdata = mygrid.getSelectedRowdata();
		// 选择数据的总行数
		var dl = selectRowdata.length;
		var ids = "";
		for (var i = 0; i < dl; i++) {
			if (i == 0) {
				ids += "'" + selectRowdata[i]['id'] + "'";
			} else {
				ids += ",'" + selectRowdata[i]['id'] + "'";
			}
		}

		$.ajax({
			type : 'post',// ajax提交方式
			url : contextPath + "/user/ajax/deleteUser",// 提交的url
			data : {
				"ids" : ids
			},// 参数
			dataType : 'text',// 数据返回的形式，默认为text即文本
			cache : false,
			async : false,
			success : function(msg) {
				var message;
				var delCount = parseInt(msg);
				if (delCount > 0) {
					message = "删除数据成功!"
				} else {
					message = "删除数据不成功!"
				}

				// 弹出消息对话框
				var msgconfig = {
					width : 250,
					height : 1,
					message : message,// 消息内容
					type : "alert",// 消息窗口类型
					triggerWin : window,
					clickFun :  delCount > 0 ? "refreshGrid" : null
				};
				parent.createMsgBox(msgconfig);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert('data error');
			}
		});
	}
}

// 设置角色
function setRoles() {
	// 取得选择行的数据
	var selectRowdata = mygrid.getSelectedRowdata();
	// 没有选择或者选择了多行数据
	if (selectRowdata.length != 1) {
		// 弹出消息对话框
		var msgconfig = {
			width : 250,
			height : 1,
			message : "请选择一行数据!",// 消息内容
			type : "warning",// 消息窗口类型
			triggerWin : window
		};
		parent.createMsgBox(msgconfig);
		return;
	}
	var config = {
		name : "setRoles",
		title : "设置用户角色",// 窗口标题
		width : 850,// 宽度
		height : 600,// 高度
		min : false,// 是否显示最小按钮
		max : false,// 是否显示最大按钮
		close : true,// 是否显示关闭按钮
		module : true,// 是否以模态窗口方式打开
		loader : {
			iframeflag : true,
			url : contextPath + "/role/userRoleIndex?userId="
					+ selectRowdata[0]['id']
		},
		triggerWin : window
	// 触发弹窗的window对象
	};
	parent.createWin(config);
}
// 刷新数据列表
function refreshGrid() {
	mygrid.load();
}