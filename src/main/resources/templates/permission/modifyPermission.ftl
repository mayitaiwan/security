<#assign ctxpath=request.getContextPath()>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<script type="text/javascript"
	src="${ctxpath}/js/jquery.min.js"></script>
<link rel="stylesheet"
	href="${ctxpath}/js/button/css/button.css"
	type="text/css">
<script type="text/javascript"
	src="${ctxpath}/js/button/z_button.js"></script>

<script type="text/javascript">
	var contextPath="${ctxpath}";
</script>
<script type="text/javascript"
	src="${ctxpath}/js/permission/modifyPermissionInfo.js"></script>
<body>
	<form id="permissionForm" name="permissionForm"
		action="${ctxpath}/permission/modifyPermission"
		method="post">
		<input type="hidden" id="id" name="id"
			value="${sysPermission.id}" />
		<input type="hidden" id="pid" name="pid"
			   value="<#if sysPermission.pid??>${sysPermission.pid}</#if>" />
		<div style="height: 22px; background: #D6E2F3; border: 0px solid red;">修改资源</div>
		<table id="tableLayout"
			style="LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px; border: 0px solid red;"
			cellSpacing=0 cellPadding=0>
			<tr style="height: 32px; border: 0px solid red">
				<td>资源名称</td>
				<td><input id="name" type='text' name="name"
					value="${sysPermission.name}" /></td>
				<td>权限匹配字符串</td>
				<td><input id="patchString" type='text' name="patchString"
					value="${sysPermission.patchString}" /></td>
			</tr>
			<tr style="height: 32px; border: 0px solid red">
				<td>资源链接字符串</td>
				<td colspan="3"><input id="url" type='text'
					name="url" style="width: 300px"
					value="${sysPermission.url}" /></td>
			</tr>
			<tr style="height: 32px; border: 0px solid red">
				<td>是否显示在菜单中</td>
				<td>
					<#if sysPermission.menuFlag==1>
						<input type="radio" name="menuFlag" value="1" checked="checked"/>是
						<input type="radio" name="menuFlag" value="0"/>否</div>
					</#if>
					<#if sysPermission.menuFlag==0>
						<input type="radio" name="menuFlag" value="1" />是
						<input type="radio" name="menuFlag" value="0" checked="checked"/>否</div>
					</#if>
        	 	</td>
        	 	<td>同目录下菜单显示顺序</td>
				<td><input id="orderNumber" type='text' name="orderNumber"
					value="${sysPermission.orderNumber}" /></td>
			</tr>
			<tr style="height: 32px; border: 0px solid red">
				<td>资源描述</td>
				<td colspan="3"><input id="description" type='text'
					name="description" style="width: 300px"
					value="${sysPermission.description}" /></td>
			</tr>
			<tr style="height: 32px; border: 0px solid red">
				<td colspan="4">
					<div id="btns"></div>
				</td>
			</tr>
		</table>
	</form>
	<form id="deleteForm" name="deleteForm"
		action="${ctxpath}/permission/deletePermission"
		method="post" style="visibility:hidden">
		<input id="deleteId" name="id" value=""/>
	</form>
</body>
</html>