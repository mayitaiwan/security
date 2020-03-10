<#assign ctxpath=request.getContextPath()>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<link rel="stylesheet" href="${ctxpath}/css/index.css" type="text/css">
<link rel="stylesheet"
	href="${ctxpath}/js/button/css/button.css"
	type="text/css">
<link rel="stylesheet"
	href="${ctxpath}/js/win/css/win.css" type="text/css">
<link rel="stylesheet"
	href="${ctxpath}/js/ztree/zTreeStyle/zTreeStyle.css"
	type="text/css">
<script type="text/javascript"
	src="${ctxpath}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${ctxpath}/js/button/z_button.js"></script>
<script type="text/javascript"
	src="${ctxpath}/js/win/z_win.js"></script>
<script type="text/javascript"
	src="${ctxpath}/js/ztree/jquery.ztree.core.min.js"></script>
<script type="text/javascript"
	src="${ctxpath}/js/index/index.js"></script>
<script>
	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		}
	};

	var zNodes = ${resourceJson};
	$(function() {
		var ztree=$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		ztree.expandAll(true);
	});
</script>

<body>
	<table id="tableLayout"
		style="width: 1234px; LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px; border: 0px solid red;"
		cellSpacing=0 cellPadding=0>
		<tr>
			<td colspan="5"
				style="height: 50px; background: #D6E2F3; border: 0px solid red;">页面头部，可根据需要修改</td>
		</tr>
		<tr>
			<td style="width: 5px; background: #D6E2F3; border: 0;"></td>
			<td>
				<div id="divLeft"
					style="width: 133px; border: 1px solid #99BBE8; overflow: auto;">
					<ul id="treeDemo" class="ztree"></ul>
				</div>
			</td>
			<td id="tdLine" style="width: 4px; background: #D6E2F3; border: 0;"></td>
			<td>
				<div id="divRight"
					style="width: 131px; height: 100%; border: 1px solid #99BBE8; overflow: hidden;">
					<iframe id="rightIframe" name="rightIframe" src="/main/welcome"
						width="100%" height="100%" frameborder="0"></iframe>
				</div>
			</td>
			<td style="width: 5px; background: #D6E2F3; border: 0;"></td>
		</tr>
		<tr>
			<td colspan="5"
				style="height: 5px; background: #D6E2F3; border: 0px solid red;"></td>
		</tr>
	</table>


	<div id="dragDiv" class="x-splitbar-proxy"></div>
	<div id="dragOverDiv" class="x-drag-overlay"></div>
	<div id="debugDiv"
		style="position: absolute; display: none; top: 0px; left: 0px; width: 300px; height: 300px; background: #eee; border: 1px solid #eee;"></div>

</body>
</html>
