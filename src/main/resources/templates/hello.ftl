<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity4">
<head>
    <meta charset="UTF-8" />
    <title>Title</title>
</head>
<body>
<h1>hello spring boot with security</h1>
<form action="${request.getContextPath()}/logout" method="post">
    <input type="submit" class="btn btn-primary" value="注销"/>
</form>
</body>
</html>