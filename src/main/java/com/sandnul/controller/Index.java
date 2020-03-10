package com.sandnul.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/8
 * Description:index
 */
@Controller
public class Index {

    @GetMapping(value = {"/","index"})
    public String index(){

        return "index";
    }

    /**
     * 登录
     * @return
     */
    @GetMapping(value = "login")
    public String login(){

        return "login";
    }

    /**
     * 没有权限
     * @return
     */
    @GetMapping(value = "/noPermission")
    public String noPermission(){
        return "noPermission";
    }
}
