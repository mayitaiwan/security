<input type="hidden" name="total"
	   value="${total}" />
<table
		style="LINE-HEIGHT: 1.4; margin: 0; padding: 0; BORDER-COLLAPSE: collapse; border: 0px solid red;"
		cellSpacing=0 cellPadding=0>
	<#list rolesList as role>
		<tr>
			<input type="hidden"
				   value="{'id':'${role.id}'}" />
			<td><div style="width: 15px;">
					<input type="checkbox"/>
				</div></td>
			<td><div style="text-align:center;width: 200px;">
					${role.name}
				</div></td>
			<td><div style="text-align:center;width: 400px;">
					<#if role.roleDesc??>
						${role.roleDesc}
					<#else>
						&nbsp;
					</#if>
				</div></td>
		</tr>
	</#list>
</table>