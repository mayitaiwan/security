package com.sandnul.controller;

import com.sandnul.domain.security.SysPermission;
import com.sandnul.intf.security.IPermissionService;
import com.sandnul.service.security.SysPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:登录后首页及欢迎页面
 */
@Controller
@RequestMapping("main")
public class MainController {
    /**
     * 权限service
     */
    @Autowired
    private IPermissionService permissionService;

    /**
     * 登录后首页
     * @param model
     * @return
     */
    @GetMapping(value = {"main"})
    public String main(Model model){
        // 用spring security提供的类取得用户数据
        UserDetails userDetails= null;
        Object userObject = SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        if (userObject instanceof UserDetails) {
            userDetails = (UserDetails) userObject;
        }

        // 根据用户账号查询资源
        List<SysPermission> sysResources = permissionService.findPermissionsByUserAcccount(userDetails.getUsername());

        JSONArray resourceJson = new JSONArray();
        resourceJson.addAll(sysResources);
        model.addAttribute("resourceJson", resourceJson.toString());
        return "main/main";
    }

    /**
     * 欢迎页面
     * @return
     */
    @GetMapping(value = {"welcome"})
    public String welcome() {
        return "main/welcome";
    }
}
