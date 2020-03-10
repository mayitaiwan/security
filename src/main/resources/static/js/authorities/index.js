var grid = null;
$(function() {
	var fixwd = 5, fixht = 65;// 表格宽度高度调整值
	$("#gridContainer").css({
		"width" : window.document.documentElement.clientWidth - fixwd,
		"height" : window.document.documentElement.clientHeight - fixht
	});
	
	
	grid = new grid({
		containerDiv : "gridDiv",
		url : contextPath + "/authorities/page.htm",
		rp : 20,
		param : {
			authorityName : ""
		},
		selectType : "multiple",// 单选single，多选multiple
		animate : true,	// 是否可以交换列，改变列宽度
		callback : {//刷新时，关闭掉所有弹框
			afterloaded : function(grid) {
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
			clickFun : addAuthorityWin
		// 点击后事件
		}, {
			title : "修改",// button显示文字
			clickFun : modifyAuthorityWin
		}, {
			title : "删除",// button显示文字
			clickFun : deleteAuthorties
		}, {
			title : "设置角色",// button显示文字
			clickFun : setAuthorities
		}, {
			title : "设置资源",// button显示文字
			clickFun : setResources
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
				var authorityNameVal=$("#authorityName").val();
				grid.reload({authorityName:authorityNameVal});
			}// 点击后事件
		} ]
	};
	new $.ui.button(configBtnSearch);
	/* 放置各个按钮 end */
});

//设置资源
function setResources(){
	// 取得选择行的数据
	var selectRowdata = grid.getSelectedRowdata();
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
			name : "setResources",
			title : "设置权限资源",// 窗口标题
			width : 550,// 宽度
			height : 540,// 高度
			min : false,// 是否显示最小按钮
			max : false,// 是否显示最大按钮
			close : true,// 是否显示关闭按钮
			module : true,// 是否以模态窗口方式打开
			loader : {
				iframeflag : true,
				url : contextPath + "/resources/setAuthorityResourceIndex.htm?result=&authorityId="
					+ selectRowdata[0]['authorityId']
			},
			triggerWin : window
		// 触发弹窗的window对象
		};
	parent.createWin(config);
}
//设置角色
function setAuthorities(){
	// 取得选择行的数据
	var selectRowdata = grid.getSelectedRowdata();
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
			name : "setAuthorities",
			title : "设置权限角色",// 窗口标题
			width : 950,// 宽度
			height : 600,// 高度
			min : false,// 是否显示最小按钮
			max : false,// 是否显示最大按钮
			close : true,// 是否显示关闭按钮
			module : true,// 是否以模态窗口方式打开
			loader : {
				iframeflag : true,
				url : contextPath + "/roles/setAuthorityRoleIndex.htm?authorityId="
					+ selectRowdata[0]['authorityId']
			},
			triggerWin : window
		// 触发弹窗的window对象
		};
	parent.createWin(config);
}
// 新增权限按钮弹出窗口
function addAuthorityWin() {
	var config = {
		name : "authorityWin",
		title : "新增权限",// 窗口标题
		width : 500,// 宽度
		height : 160,// 高度
		min : false,// 是否显示最小按钮
		max : false,// 是否显示最大按钮
		close : true,// 是否显示关闭按钮
		module : true,// 是否以模态窗口方式打开
		loader : {
			iframeflag : true,
			url : contextPath + "/authorities/toAddAuthority.htm"
		},
		triggerWin : window
	// 触发弹窗的window对象
	};

	parent.createWin(config);
}

// 修改权限
function modifyAuthorityWin() {
	// 取得选择行的数据
	var selectRowdata = grid.getSelectedRowdata();
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
	// 弹出修改权限数据对话框
	var config = {
		name : "authorityWin",
		title : "修改权限",// 窗口标题
		width : 500,// 宽度
		height : 160,// 高度
		min : false,// 是否显示最小按钮
		max : false,// 是否显示最大按钮
		close : true,// 是否显示关闭按钮
		module : true,// 是否以模态窗口方式打开
		loader : {
			iframeflag : true,
			url : contextPath + "/authorities/toModifyAuthority.htm?authorityId="
					+ selectRowdata[0]['authorityId']
		},
		triggerWin : window
	// 触发弹窗的window对象
	};
	parent.createWin(config);
}

// 删除权限数据
function deleteAuthorties() {
	// 取得选择行的数据
	var selectRowdata = grid.getSelectedRowdata();
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


//confirm回调
function confirmFun(result) {
	if (result) {
		// 取得选择行的数据
		var selectRowdata = grid.getSelectedRowdata();
		// 选择数据的总行数
		var dl = selectRowdata.length;
		var authorityIds = "";
		for (var i = 0; i < dl; i++) {
			if (i == 0) {
				authorityIds += "'" + selectRowdata[i]['authorityId'] + "'";
			} else {
				authorityIds += ",'" + selectRowdata[i]['authorityId'] + "'";
			}
		}

		$.ajax({
			type : 'post',// ajax提交方式
			url : contextPath + "/authorities/ajax/deleteAuthority.htm",// 提交的url
			data : {
				"authorityIds" : authorityIds
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
	grid.load();
}