<#assign ctxpath=request.getContextPath()>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<link rel="stylesheet" href="${ctxpath}/css/index.css" type="text/css">
<link rel="stylesheet"
	href="${ctxpath}/js/button/css/button.css"
	type="text/css">
<link rel="stylesheet"
	href="${ctxpath}/js/grid/css/grid.css"
	type="text/css">
<script type="text/javascript"
	src="${ctxpath}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${ctxpath}/js/button/z_button.js"></script>
<script type="text/javascript"
	src="${ctxpath}/js/grid/z_grid.js"></script>

<script type="text/javascript">
var contextPath="${ctxpath}";
var userId="${userId}";
$(function() {
	//设置角色后，返回本窗口，弹出消息
	<#if result??>
		var successConfig = {
			width : 250,
			height : 1,
			message : '角色配置成功！',//消息内容
			type : "alert",//消息窗口类型
			triggerWin : window,
			clickFun : "closeMe"
		};
		parent.createMsgBox(successConfig);
	</#if>
});
</script>
<script type="text/javascript"
	src="${ctxpath}/js/role/userRoleIndex.js"></script>
<body>
	<table id="tableLayout"
		style="width: 100%; LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px; border: 0px solid red;"
		cellSpacing=0 cellPadding=0>
		<tr>
			<td>
				<div id="gridContainer" style="width: 800px; height: 535px;">
					<div id="gridDiv" class="grid">
						<div class="hDiv">
							<table
								style="LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; border: 0px solid red;"
								cellSpacing=0 cellPadding=0>
								<tr>
									<th><div style="width: 15px;">
											<input type="checkbox" />
										</div></th>
									<th><div style="width: 200px;">角色名称</div></th>
									<th><div style="width: 400px;">描述</div></th>
								</tr>
							</table>
						</div>
						<div class="bDiv"></div>
						<div class="pDiv">
							<table>
								<tr>
									<td>
										<div class="pFirst pButton"></div>
									</td>
									<td>
										<div class="pPrev pButton"></div>
									</td>
									<td>
										<div class="btnseparator"></div>
									</td>
									<td><span class="pcontrol"> 第 <input type="text"
											size="4" value="1">页 共 <span> 1 </span>页
									</span></td>
									<td>
										<div class="btnseparator"></div>
									</td>
									<td>
										<div class="pNext pButton"></div>
									</td>
									<td>
										<div class="pLast pButton"></div>
									</td>
									<td>
										<div class="btnseparator"></div>
									</td>
									<td>
										<div class="pReload pButton"></div>
									</td>
									<td>
										<div class="btnseparator"></div>
									</td>
									<td><span class="pPageStat">Processing, please wait
											...</span></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</td>
		</tr>
		<tr>
		<td>
		<div id="buttons"></div>
			</td>
		</tr>
	</table>
	<form id="setUserRolesForm" 
		action="${ctxpath}/role/setUserRole"
		style="display:none" method="post">
		<input id="userId" name="userId" value="${userId}" type="hidden" />
		<input id="addRoleIds" name="addRoleIds" type="hidden" />
		<input id="delRoleIds" name="delRoleIds" type="hidden" />
	</form>
</body>
</html>