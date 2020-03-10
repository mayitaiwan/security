<#assign ctxpath=request.getContextPath()>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<link rel="stylesheet" href="${ctxpath}css/index.css" type="text/css">
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
</script>
<script type="text/javascript"
	src="${ctxpath}/js/user/index.js"></script>
<body>
	<table id="tableLayout"
		style="width: 100%; LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px; border: 0px solid red;"
		cellSpacing=0 cellPadding=0>
		<tr style="border: 0px solid red">
			<td style="height: 32px; border: 0px solid red;">
				<table id="tableLayout"
					style="LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px; border: 0px solid red;"
					cellSpacing=0 cellPadding=0>
					<tr style="border: 0px solid red">
						<td>用户账号<input id="userAccount" type='text' />用户姓名<input
							id="userName" type='text' />
						</td>
						<td align="left"><div id="searchBtn"></div></td>
					</tr>

				</table>
			</td>
		</tr>
		<tr style="border: 0px solid red">
			<td style="height: 32px; border: 0px solid red;">
				<div id="gridButtons"></div>
			</td>
		</tr>
		<tr>
			<td>
				<div id="gridContainer" style="width: 800px; height: 500px;">
					<div id="gridDiv" class="grid">
						<div class="hDiv">
							<table
								style="LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; border: 0px solid red;"
								cellSpacing=0 cellPadding=0>
								<tr>
									<th><div style="width: 15px;">
											<input type="checkbox" />
										</div></th>
									<th><div style="width: 200px;">账号</div></th>
									<th><div style="width: 200px;">姓名</div></th>
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
	</table>

</body>
</html>