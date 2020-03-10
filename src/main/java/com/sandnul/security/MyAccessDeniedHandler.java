package com.sandnul.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:无权限处理器
 */
@Component
public class MyAccessDeniedHandler implements AccessDeniedHandler {
    private static final String noPermission = "/noPermission";

    /**
     *
     * @param httpServletRequest
     * @param httpServletResponse
     * @param e
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {
        //返回json形式的错误信息
//        httpServletResponse.setCharacterEncoding("UTF-8");
//        httpServletResponse.setContentType("application/json");
//        httpServletResponse.getWriter().println("{\"code\":403,\"message\":\"小弟弟，你没有权限访问呀！\",\"data\":\"\"}");
//        httpServletResponse.getWriter().flush();
        RequestDispatcher dispatcher = httpServletRequest.getRequestDispatcher(noPermission);
        dispatcher.forward(httpServletRequest, httpServletResponse);
    }
}
