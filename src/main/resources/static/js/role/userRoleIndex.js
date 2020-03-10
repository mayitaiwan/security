var mygrid = null;
var oldData = [];
$(function() {
	var fixwd = 5, fixht = 35;// 表格宽度高度调整值
	$("#gridContainer").css({
		"width" : window.document.documentElement.clientWidth - fixwd,
		"height" : window.document.documentElement.clientHeight - fixht
	});
	mygrid = new grid({
		containerDiv : "gridDiv",
		url : contextPath + "/role/userRolePage",
		rp : 20,
		param : {
			userId : userId
		},
		selectType : "multiple",// 单选single，多选multiple
		animate : true,
		callback : {
			afterloaded : function(pgrid) {
				var $allRow=pgrid.getAllRow();
				var rowLength=$allRow.size();
				var rowData=null;
				for (var i = 0; i < rowLength; i++) {
					rowData=pgrid.getRowdataByRowNumber(i);
					if(rowData['userId']){
						oldData.push(rowData['id']);
						pgrid.setRowToSelect($($allRow[i]),true);
					}
				}
			}
		}
	});
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
	/* 放置各个按钮 end */
});

function submitMe() {
	var selectData = mygrid.getSelectedRowdata();
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
	var addRoleIds='';
	var delRoleIds='';
	if(addData.length>0){
		addRoleIds=addData.join(",");
	}
	if(delData.length>0){
		delRoleIds=delData.join(",");
	}
	$("#addRoleIds").val(addRoleIds);
	$("#delRoleIds").val(delRoleIds);
	$("#setUserRolesForm").submit();
}