var grid = null;
var oldData = [];
$(function() {
	var fixwd = 5, fixht = 65;// 表格宽度高度调整值
	$("#gridContainer").css({
		"width" : window.document.documentElement.clientWidth - fixwd,
		"height" : window.document.documentElement.clientHeight - fixht
	});
	grid = new grid({
		containerDiv : "gridDiv",
		url : contextPath + "/authorities/setRoleAuthorityPage.htm",
		rp : 20,
		param : {
			roleId : roleId,
			authorityName : ""
		},
		selectType : "multiple",// 单选single，多选multiple
		animate : true,
		callback : {
			afterloaded : function(grid) {
				var $allRow=grid.getAllRow();
				var rowLength=$allRow.size();
				var rowData=null;
				for (var i = 0; i < rowLength; i++) {
					rowData=grid.getRowdataByRowNumber(i);
					if(rowData['checked']>0){
						oldData.push(rowData['authorityId']);
						grid.setRowToSelect($($allRow[i]),true);
					}
				}
			}
		}
	// 是否可以交换列，改变列宽度
	});
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
	var selectData = grid.getSelectedRowdata();
	var dl = selectData.length;
	var addData = [];
	var delData = [];
	var odl = oldData.length;
	var j = 0;
	// 新增数据
	for (var i = -0; i < dl; i++) {
		j = 0;
		for (; j < odl; j++) {
			if (selectData[i]['authorityId'] == oldData[j]) {
				break;
			}
		}
		if (j == odl) {
			addData.push(selectData[i]['authorityId']);
		}
	}
	// 删除数据
	for (var i = -0; i < odl; i++) {
		j = 0;
		for (; j < dl; j++) {
			if (oldData[i] == selectData[j]['authorityId']) {
				break;
			}
		}
		if (j == dl) {
			delData.push(oldData[i]);
		}
	}
	var addAuthorityIds='';
	var delAuthorityIds='';
	if(addData.length>0){
		addAuthorityIds=addData.join(",");
	}
	if(delData.length>0){
		delAuthorityIds=delData.join(",");
	}
	$("#addAuthorityIds").val(addAuthorityIds);
	$("#delAuthorityIds").val(delAuthorityIds);
	$("#setRoleAuthoritiesForm").submit();
}