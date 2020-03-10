<input type="hidden" name="total"
	value="${total}" />
<table
	style="LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; border: 0px solid red;"
	cellSpacing=0 cellPadding=0>
		<#list usersList as user>
			<tr>
				<input type="hidden"
					value="{'id':'${user.id}','userAccount':'${user.userAccount}','userName':'${user.userName}'}" />
				<td><div style="width: 15px;">
						<input type="checkbox"/>
					</div></td>
				<td><div style="text-align:center;width: 200px;">
						${user.userAccount}
					</div></td>
				<td><div style="text-align:center;width: 200px;">
						${user.userName}
					</div></td>
				<td><div style="width: 400px;">
						<#if user.userDesc??>
							${user.userDesc}
						<#else>
							&nbsp;
						</#if>
					</div></td>
			</tr>
	    </#list>
</table>