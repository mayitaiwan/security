var mygrid = null;
$(function() {
	var fixwd = 5, fixht = 65;// 表格宽度高度调整值
	$("#mygridContainer").css({
		"width" : window.document.documentElement.clientWidth - fixwd,
		"height" : window.document.documentElement.clientHeight - fixht
	});
	mygrid = new grid({
		containerDiv : "gridDiv",
		url : contextPath + "/role/page",
		rp : 20,
		param : {
			roleName : ""
		},
		selectType : "multiple",// 单选single，多选multiple
		animate : true,	// 是否可以交换列，改变列宽度
		callback : {//刷新时，关闭掉所有弹框
			afterloaded : function(mygrid) {
				parent.closeAllWin();
			}
		}
	});
	/* 放置各个按钮 start */
	// 放置表格上面的按钮
	var configBtnGrid = {
		containerDiv : "gridButtons",
		position : "left",
		buttons : [ {
			title : "增加",// button显示文字
			clickFun : addRoleWin
		// 点击后事件
		}, {
			title : "修改",// button显示文字
			clickFun : modifyRoleWin
		}, {
			title : "删除",// button显示文字
			clickFun : deleteRoles
		} , {
			title : "设置用户",// button显示文字
			clickFun : setUsers
		} , {
			title : "设置权限",// button显示文字
			clickFun : setPermission
		} ]
	};
	new $.ui.button(configBtnGrid);
	// 放置表格上面的按钮
	var configBtnSearch = {
		containerDiv : "searchBtn",
		position : "left",
		buttons : [ {
			title : "查询",// button显示文字
			clickFun : function() {
				var roleNameVal=$("#roleName").val();
				mygrid.reload({name:roleNameVal});
			}// 点击后事件
		} ]
	};
	new $.ui.button(configBtnSearch);
	/* 放置各个按钮 end */
});
//设置用户
function setUsers(){
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
			name : "setUsers",
			title : "设置用户角色",// 窗口标题
			width : 850,// 宽度
			height : 600,// 高度
			min : false,// 是否显示最小按钮
			max : false,// 是否显示最大按钮
			close : true,// 是否显示关闭按钮
			module : true,// 是否以模态窗口方式打开
			loader : {
				iframeflag : true,
				url : contextPath + "/user/roleUserIndex?roleId="
					+ selectRowdata[0]['id']
			},
			triggerWin : window
		// 触发弹窗的window对象
		};
	parent.createWin(config);
}
//设置权限
function setPermission(){
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
			name : "setPermission",
			title : "设置角色权限",// 窗口标题
			width : 850,// 宽度
			height : 600,// 高度
			min : false,// 是否显示最小按钮
			max : false,// 是否显示最大按钮
			close : true,// 是否显示关闭按钮
			module : true,// 是否以模态窗口方式打开
			loader : {
				iframeflag : true,
				url : contextPath + "/permission/setRolePermissionIndex?roleId="
					+ selectRowdata[0]['id']
			},
			triggerWin : window
		// 触发弹窗的window对象
		};
	parent.createWin(config);
}

// 新增角色按钮弹出窗口
function addRoleWin() {
	var config = {
		name : "roleWin",
		title : "新增角色",// 窗口标题
		width : 500,// 宽度
		height : 160,// 高度
		min : false,// 是否显示最小按钮
		max : false,// 是否显示最大按钮
		close : true,// 是否显示关闭按钮
		module : true,// 是否以模态窗口方式打开
		loader : {
			iframeflag : true,
			url : contextPath + "/role/toAddRole"
		},
		triggerWin : window
	// 触发弹窗的window对象
	};

	parent.createWin(config);
}

// 修改角色
function modifyRoleWin() {
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
	// 弹出修改角色数据对话框
	var config = {
		name : "roleWin",
		title : "修改角色",// 窗口标题
		width : 500,// 宽度
		height : 160,// 高度
		min : false,// 是否显示最小按钮
		max : false,// 是否显示最大按钮
		close : true,// 是否显示关闭按钮
		module : true,// 是否以模态窗口方式打开
		loader : {
			iframeflag : true,
			url : contextPath + "/role/toModifyRole?id="
					+ selectRowdata[0]['id']
		},
		triggerWin : window
	// 触发弹窗的window对象
	};
	parent.createWin(config);
}

// 删除角色数据
function deleteRoles() {
	// 取得选择行的数据
	var selectRowdata = mygrid.getSelectedRowdata();
	// 选择数据的总行数
	var dl = selectRowdata.length;
	// 没有选择或者选择了多行数据
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
		var roleIds = "";
		for (var i = 0; i < dl; i++) {
			if (i == 0) {
				roleIds += "'" + selectRowdata[i]['id'] + "'";
			} else {
				roleIds += ",'" + selectRowdata[i]['id'] + "'";
			}
		}

		$.ajax({
			type : 'post',// ajax提交方式
			url : contextPath + "/role/ajax/deleteRole",// 提交的url
			data : {
				"ids" : roleIds
			},// 参数
			dataType : 'text',// 数据返回的形式，默认为text即文本
			cache : false,
			async : false,
			success : function(msg) {
				var message;
				var delCount = parseInt(msg);
				if (parseInt(msg) > 0) {
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
					clickFun : delCount > 0 ? "refreshGrid" : null
				};
				parent.createMsgBox(msgconfig);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert('data error');
			}
		});
	}
}
// 刷新数据列表
function refreshGrid() {
	mygrid.load();
}