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
var zTree = null;
var setting = {
	data : {
		simpleData : {
			enable : true
		}
	},
	callback : {
		onClick : zTreeOnClick,
		onRightClick : onRightClick
	}
};
$(function() {
	var fixwd = 10, fixht = 20;// 左边栏及右边栏宽度高度调整值
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
	// 生成树
	zTree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	// 展开所有节点
	zTree.expandAll(true);
});
// 节点点击事件，将数据显示在右边
function zTreeOnClick(event, treeId, treeNode) {
	$("#id").val(treeNode['id']);
	$("#tempModifyForm").submit();
}
// 节点右键点击事件,弹出菜单
function onRightClick(event, treeId, treeNode) {
	if (!treeNode && event.target.tagName.toLowerCase() != "button"
			&& $(event.target).parents("a").length == 0) {
		zTree.cancelSelectedNode();
		showRMenu("root", event.clientX, event.clientY);
	} else if (treeNode && !treeNode.noR) {
		zTree.selectNode(treeNode);
		showRMenu("node", event.clientX, event.clientY);
	}
}
// 弹出菜单
function showRMenu(type, x, y) {
	$("#rMenu").css({
		"top" : y + "px",
		"left" : x + "px",
		"visibility" : "visible"
	});
	$("body").bind("mousedown", onBodyMouseDown);
}
// 隐藏菜单
function hideRMenu() {
	$("#rMenu").css({
		"visibility" : "hidden"
	});
	$("body").unbind("mousedown", onBodyMouseDown);
}

function onBodyMouseDown(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		$("#rMenu").css({
			"visibility" : "hidden"
		});
	}
}
// 添加节点
function addTreeNode() {
	hideRMenu();
	var node = zTree.getSelectedNodes()[0];
	if (node) {
		$("#pid").val(node['id']);
	} else {
		$("#pid").val("");
	}
	$("#tempNewForm").submit();
}
// 删除节点
function removeTreeNode() {
	// 隐藏菜单
	hideRMenu();
	// 选择的节点
	var node = zTree.getSelectedNodes()[0];
	if (node) {
		// 父目录不能删除
		if (node.isParent) {
			var msgconfig = {
				width : 250,
				height : 1,
				message : "父目录不能被删除",// 消息内容
				type : "warning",// 消息窗口类型
				triggerWin : window
			};
			parent.createMsgBox(msgconfig);
			return;
		}

		var confirmConfig = {
			width : 250,
			height : 1,
			message : "确定删除该节点？",// 消息内容
			type : "confirm",// 消息窗口类型
			triggerWin : window,
			clickFun : "confirmFun"
		};
		parent.createMsgBox(confirmConfig);
	}
}
//confirm回调
function confirmFun(result) {
	if (result) {
		// 选择的节点
		var node = zTree.getSelectedNodes()[0];
		// 设置id，form提交删除
		$("#deletePermissionId").val(node['id']);
		$("#tempDeleteForm").submit();
	}
}
// 数据库删除数据后，页面上删除节点
function deleteCallBack(id) {
	var node = zTree.getNodeByParam("id", id, null);
	if (node) {
		zTree.removeNode(node);
	}
}
// 数据库修改数据后，页面上修改节点
function modifyCallBack(id, name) {
	var node = zTree.getNodeByParam("id", id, null);
	node.name = name;
	zTree.updateNode(node);
}
// 数据库新增数据后，页面上新增节点
function addNewCallBack(id, name, pid) {
	var parentNode = null;
	var node = zTree.getNodeByParam("id", id, null);
	// 已经有了这个节点了
	if (node) {
		return;
	}
	if (pid && pid != '') {
		parentNode = zTree.getNodeByParam("id", pid, null);
	}
	var newNode = {
		id : id,
		name : name,
		pid : pid
	};
	zTree.addNodes(parentNode, newNode);
}
// 根据id判断是否为父节点
function checkParentNode(id) {
	var node = zTree.getNodeByParam("id", id, null);
	return node.isParent;
}
