<#assign ctxpath=request.getContextPath()>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<link rel="stylesheet"
	  href="${ctxpath}/js/ztree/zTreeStyle/zTreeStyle.css"
	  type="text/css"/>

<link rel="stylesheet"
	  href="${ctxpath}/js/button/css/button.css"
	  type="text/css"/>

<script type="text/javascript"
		src="${ctxpath}/js/jquery.min.js"></script>
<script type="text/javascript"
		src="${ctxpath}/js/ztree/jquery.ztree.core.min.js"></script>
<script type="text/javascript"
		src="${ctxpath}/js/ztree/jquery.ztree.excheck.min.js"></script>
<script type="text/javascript"
		src="${ctxpath}/js/button/z_button.js"></script>
<script type="text/javascript"
		src="${ctxpath}/js/permission/rolePermissionIndex.js"></script>
<script>
	var zNodes =${permissionJson};
			$(function() {
				//权限设置后，返回本窗口，弹出消息
				<#if result??&&result!=''>
				var successConfig = {
					width : 250,
					height : 1,
					message : '权限配置成功！',//消息内容
					type : "alert",//消息窗口类型
					triggerWin : window,
					clickFun : "closeMe"
				};
				parent.createMsgBox(successConfig);
				</#if>
			});
</script>

<body>
<div id="divLeft"
	 style="width: 500px; border: 1px solid #99BBE8; overflow: auto;">
	<ul id="treeDemo" class="ztree"></ul>
</div>


<form id="setRolePermissionForm"
	  action="${ctxpath}/permission/setRolePermission"
	  style="display: none" method="post">
	<input id="roleId" name="roleId"
		   value="${roleId}" type="hidden" /> <input
			id="addPermissionIds" name="addPermissionIds" type="hidden" /> <input
			id="delPermissionIds" name="delPermissionIds" type="hidden" />
</form>
<div id="buttons"></div>
</body>
</html>
