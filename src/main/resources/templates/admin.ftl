<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity4">
<head>
    <meta charset="UTF-8"/>
    <title sec:authentication="name"></title>
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
                <li><a >首页</a></li>
            </ul>
        </div>
    </div>
</nav>
<div class="container">
    <div class="starter-template">
        <h1 >${title}</h1>
        <p class="bg-primary" >${content}</p>
        <div sec:authorize="hasRole('ROLE_ADMIN')">
            <p class="bg-info" >${extraInfo}</p>
        </div>
        <div sec:authorize="hasRole('ROLE_USER')">
            <p class="bg-info">无更多显示信息</p>
        </div>
        <form action="${request.getContextPath()}/logout" method="post">
            <input type="submit" class="btn btn-primary" value="注销"/>
        </form>
    </div>
</div>
</body>
</html>