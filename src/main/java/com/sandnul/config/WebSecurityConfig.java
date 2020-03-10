package com.sandnul.config;

import com.sandnul.security.MyAccessDeniedHandler;
import com.sandnul.service.security.SysUserService;
import com.sandnul.util.Md5Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:
 */
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final static Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);

    /**
     * 通过 实现UserDetailService 来进行验证
     */
    @Autowired
    private SysUserService myCustomUserService;
    /**
     * 没有权限处理handler
     */
    @Autowired
    private MyAccessDeniedHandler myAccessDeniedHandler;

    /**
     * @param auth
     * @throws Exception
     */
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        //校验用户
        auth.userDetailsService(myCustomUserService)
                //校验密码
                .passwordEncoder(new PasswordEncoder() {

                    @Override
                    public String encode(CharSequence rawPassword) {
                        return Md5Util.MD5(String.valueOf(rawPassword));
                    }

                    @Override
                    public boolean matches(CharSequence rawPassword, String encodedPassword) {
                        return encodedPassword.equals(Md5Util.MD5(String.valueOf(rawPassword)));
                    }
                });

    }


    /**
     * 创建自定义的表单
     * <p>
     * 页面、登录请求、跳转页面等
     *
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //设置请求头，否则无法访问iframe
        http.headers().frameOptions().sameOrigin();
        //设置csrf禁用，否则每次post提交都要这个
        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/", "index", "/login", "/css/**", "/js/**")//允许访问
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")//拦截后get请求跳转的页面
                .defaultSuccessUrl("/main/main")
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .and().exceptionHandling().accessDeniedHandler(myAccessDeniedHandler);
    }
//    /**
//     * 设置匹配.do后缀的请求
//     * @param dispatcherServlet
//     * @return
//     */
//    @Bean
//    public ServletRegistrationBean servletRegistrationBean(DispatcherServlet dispatcherServlet) {
//        ServletRegistrationBean bean = new ServletRegistrationBean(dispatcherServlet);
//        bean.addUrlMappings("*.html","*.htm");
//        return bean;
//    }
}
