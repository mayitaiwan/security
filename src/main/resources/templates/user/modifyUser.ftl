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
	$(function() {
		//创建用户后，返回本窗口，弹出消息
		<#if result??>
			var successConfig = {
					width : 250,
					height : 1,
					message : '用户修改成功！',//消息内容
					type : "alert",//消息窗口类型
					triggerWin : window,
					clickFun:"closeMe"
				};
			parent.createMsgBox(successConfig);
		</#if>
	});
	
</script>
<script type="text/javascript"
	src="${ctxpath}/js/user/userInfo.js"></script>
<body>
	<form id="userForm" name="userForm"
		action="${ctxpath}/user/modifyUser" method="post">
		<input type="hidden" id="id" name="id" value="${sysUser.id}"/>
		<input type="hidden" id="userAccount" name="userAccount" value="${sysUser.userAccount}"/>
		<table id="tableLayout"
			style="LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px; border: 0px solid red;"
			cellSpacing=0 cellPadding=0>
			<tr style="height: 32px; border: 0px solid red">
				<td>用户账号</td>
				<td><input type='text'  value="${sysUser.userAccount}" disabled/></td>
				<td>用户姓名</td>
				<td><input id="userName" type='text' name="userName" value="${sysUser.userName}"/></td>
			</tr>
			<tr style="height: 60px; border: 0px solid red">
				<td>用户描述</td>
				<td colspan="3">
					<textarea id="userDesc" name="userDesc" rows="2" cols="20" style="width:300px;height:50px;"><#if sysUser.userDesc??>${sysUser.userDesc}<#else>&nbsp;</#if></textarea>
				</td>
			</tr>
			<tr style="height: 32px; border: 0px solid red">
				<td colspan="4">
					<div id="btns"></div>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>