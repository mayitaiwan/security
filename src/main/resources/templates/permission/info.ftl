<#assign ctxpath=request.getContextPath()>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<script type="text/javascript"
	src="${ctxpath}/js/jquery.min.js"></script>
<script type="text/javascript">
$(function(){
	<#if msg??>
		<#if msg=='delete'>
			parent.deleteCallBack('${id}');
		</#if>
		<#if msg=='modify'>
			parent.modifyCallBack('${id}','${name}');
		</#if>
		<#if msg=='addNew'>
			parent.addNewCallBack('${id}','${name}','<#if pid??>${pid}</#if>');
		</#if>
	</#if>

});
</script>
<body>
<!--创建用户后，返回本窗口，弹出消息-->
<#if msg??>
	<#if msg=='delete'>
		删除成功
	</#if>
	<#if msg=='modify'>
		修改成功
	</#if>
	<#if msg=='addNew'>
		新增成功
	</#if>
</#if>
</body>
</html>