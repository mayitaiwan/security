<#assign ctxpath=request.getContextPath()>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<link rel="stylesheet" href="css/index.css" type="text/css">
<link rel="stylesheet"
	href="${ctxpath}/js/ztree/zTreeStyle/zTreeStyle.css"
	type="text/css">
<style type="text/css">
div#rMenu {
	position: absolute;
	visibility: hidden;
	top: 0;
	background-color: #D6E2F3;
	text-align: left;
	padding: 0px;
}

div#rMenu table div {
	margin: 5px 0;
	padding: 0px;
	cursor: pointer;
	list-style: none outside none;
	background-color: #ffffff;
}
</style>
<script type="text/javascript"
	src="${ctxpath}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${ctxpath}/js/ztree/jquery.ztree.core.min.js"></script>
<script type="text/javascript"
	src="${ctxpath}/js/permission/index.js"></script>
<script>
	var zNodes =${permissionJson};
</script>

<body>
	<table id="tableLayout"
		style="width: 100%; LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px; border: 0px solid red;"
		cellSpacing=0 cellPadding=0>
		<tr>
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
					<iframe id="right" name="right"
						src="${ctxpath}/permission/info?msg=&id=&pid=&name="
						width="100%" height="100%" frameborder="0"></iframe>
				</div>
			</td>
		</tr>
	</table>


	<div id="dragDiv" class="x-splitbar-proxy"></div>
	<div id="dragOverDiv" class="x-drag-overlay"></div>
	<form id="tempModifyForm"
		action="${ctxpath}/permission/toModifyPermission"
		target="right" style="visibility: hidden" method="post">
		<input id="id" name="id" type="hidden" />
	</form>
	<form id="tempNewForm"
		action="${ctxpath}/permission/toAddPermission"
		target="right" style="visibility: hidden" method="post">
		<input id="pid" name="pid" type="hidden" />
	</form>
	<form id="tempDeleteForm"
		action="${ctxpath}/permission/deletePermission"
		target="right" style="visibility: hidden" method="post">
		<input id="deletePermissionId" name="id" type="hidden" />
	</form>
	<div id="rMenu">
		<table
			style="LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px; border: 0px solid red;"
			cellSpacing=5 cellPadding=5>
			<tr>
				<td>
					<div id="m_add" onclick="addTreeNode();">增加权限</div>
					<div id="m_del" onclick="removeTreeNode();">删除权限</div>
					<div id="m_cancel" onclick="hideRMenu();">取消</div>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>
