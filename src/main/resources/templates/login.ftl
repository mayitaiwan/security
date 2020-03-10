<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8"/>
    <title>登录</title>
    <link rel="stylesheet" href="${request.getContextPath()}/css/bootstrap.min.css"/>
    <style type="text/css">
        body {
            padding-top: 50px;
        }

        .starter-template {
            padding: 40px 15px;
            text-align: center;
        }
    </style>
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Spring Security演示</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a>首页</a></li>
            </ul>
        </div>
    </div>
</nav>
<div class="container">
    <div class="starter-template">
        <#if SPRING_SECURITY_LAST_EXCEPTION??>
            ${SPRING_SECURITY_LAST_EXCEPTION}
        </#if>
        <h2>使用账号密码登录</h2>
        <form name="form"  action="${request.getContextPath()}/login" method="post">
            <!--input type="hidden" name="%%{_csrf.parameterName}" value="%%{_csrf.token}"/-->
            <div class="form-group">
                <label for="username">账号</label>
                <input type="text" class="form-control" name="username" value="" placeholder="账号"/>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" class="form-control" name="password" placeholder="密码"/>
            </div>
            <input type="submit" id="login" value="Login" class="btn btn-primary"/>
        </form>
    </div>
</div>
</body>
</html>