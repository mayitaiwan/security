var zTree = null;
var setting = {
	check : {
		enable : true
	},
	data : {
		simpleData : {
			enable : true
		}
	}
};
var oldData=[];
$(function() {

	var fixht = 50;// 宽度高度调整值
	$("#divLeft").css({
		"height" : window.document.documentElement.clientHeight - fixht
	});
	// 生成树
	zTree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	// 展开所有节点
	zTree.expandAll(true);
	
	/* 放置各个按钮 start */
	var configBtnGrid = {
		containerDiv : "buttons",
		position : "center",
		buttons : [ {
			title : "确定",// button显示文字
			clickFun : submitMe
		// 点击后事件
		} ]
	};
	new $.ui.button(configBtnGrid);
	
	var nodes = zTree.getCheckedNodes(true);
	var nl=nodes.length;
	for(var i=0;i<nl;i++){
		oldData.push(nodes[i]['id']);
	}
});
function submitMe() {
	var selectData = zTree.getCheckedNodes(true);
	var dl = selectData.length;
	var addData = [];
	var delData = [];
	var odl = oldData.length;
	var j = 0;
	// 新增数据
	for (var i = -0; i < dl; i++) {
		j = 0;
		for (; j < odl; j++) {
			if (selectData[i]['id'] == oldData[j]) {
				break;
			}
		}
		if (j == odl) {
			addData.push(selectData[i]['id']);
		}
	}
	// 删除数据
	for (var i = -0; i < odl; i++) {
		j = 0;
		for (; j < dl; j++) {
			if (oldData[i] == selectData[j]['id']) {
				break;
			}
		}
		if (j == dl) {
			delData.push(oldData[i]);
		}
	}
	var addPermissionIds='';
	var delPermissionIds='';
	if(addData.length>0){
		addPermissionIds=addData.join(",");
	}
	if(delData.length>0){
		delPermissionIds=delData.join(",");
	}
	$("#addPermissionIds").val(addPermissionIds);
	$("#delPermissionIds").val(delPermissionIds);
	$("#setRolePermissionForm").submit();
}
