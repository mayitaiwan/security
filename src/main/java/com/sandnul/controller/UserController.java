package com.sandnul.controller;

import com.sandnul.domain.security.SysPermission;
import com.sandnul.domain.security.SysUser;
import com.sandnul.domain.security.SysUserRole;
import com.sandnul.intf.security.IPermissionService;
import com.sandnul.intf.security.IUserRoleService;
import com.sandnul.intf.security.IUserService;
import com.sandnul.service.security.SysPermissionService;
import com.sandnul.util.Md5Util;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:用户管理
 */
@Controller
@RequestMapping("user")
public class UserController {
    /**
     * 用户service
     */
    @Autowired
    private IUserService userService;

    /**
     * 用户角色service
     */
    @Autowired
    private IUserRoleService userRoleService;

    /**
     * 首页
     * @return
     */
    @GetMapping(value = "index")
    public String index() {
        return "user/index";
    }

    /**
     * 分页查询用户
     * @param startIndex
     * @param maxCount
     * @param userAccount
     * @param userName
     * @param model
     * @return
     */
    @RequestMapping(value = "/page")
    public String page(@RequestParam("startIndex") int startIndex,
                       @RequestParam("maxCount") int maxCount,
                       @RequestParam(value = "userAccount",defaultValue ="") String userAccount,
                       @RequestParam(value = "userName",defaultValue ="") String userName, Model model) {
        SysUser user = new SysUser();
        user.setStartIndex(startIndex);
        user.setMaxCount(maxCount);
        user.setUserAccount(userAccount);
        user.setUserName(userName);
        Integer total = userService.selectCount(user);
        List<SysUser> usersList = userService.selectUsersByPage(user);
        model.addAttribute("total", total);
        model.addAttribute("usersList", usersList);
        return "user/table";
    }

    /**
     * 跳转到新增用户页面
     * @return
     */
    @RequestMapping(value = "/toAddUser")
    public String toAddUser() {
        return "user/newUser";
   }

    /**
     * 新增用户
     * @param sysUser
     * @param model
     * @return
     */
    @RequestMapping(value = "/addUser")
    public String addUser(@ModelAttribute SysUser sysUser, Model model) {
        sysUser.setPassword(Md5Util.MD5("123456"));
        int result = userService.insertUser(sysUser);
        model.addAttribute("result", result);
        return "user/newUser";
    }

    /**
     * 校验账号重复
     * @param userAccount
     * @param id
     * @param response
     */
    @RequestMapping(value = "/ajax/checkUserAccount")
    public void checkUserAccount(
            @RequestParam("userAccount") String userAccount,
            @RequestParam("id") Long id, HttpServletResponse response) {
        int result = userService.selectCountByUserAccount(userAccount,
                id);
        try {
            // 设置页面不缓存
            response.setContentType("text/html;charset=UTF-8");
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = null;
            out = response.getWriter();
            out.print(result);
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * modifyUser:修改用户 <br/>
     *
     * @author Administrator
     * @param model
     * @return
     */
    @RequestMapping(value = "/modifyUser")
    public String modifyUser(@ModelAttribute SysUser sysUser,Model model) {
        int result = userService.updateUser(sysUser);
        model.addAttribute("result", result);
        model.addAttribute("sysUser", sysUser);
        return "user/modifyUser";
    }

    /**
     * 跳转到修改用户页面
     * @param id
     * @param model
     * @return
     */
    @RequestMapping(value = "/toModifyUser")
    public String toModifyUser(@RequestParam("id") Long id,
                               Model model) {
        SysUser sysUser= userService.selectByUserId(id);
        model.addAttribute("sysUser", sysUser);
        return "user/modifyUser";
    }

    /**
     * 删除用户
     * @param ids
     * @param response
     */
    @RequestMapping(value = "/ajax/deleteUser")
    public void deleteUsers(@RequestParam("ids") String ids,
                            HttpServletResponse response) {
        int result = userService.deleteUsers(ids);
        try {
            // 设置页面不缓存
            response.setContentType("text/html;charset=UTF-8");
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = null;
            out = response.getWriter();
            out.print(result);
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 在角色管理页面中，点击设置用户时的跳转页面
     * @param roleId
     * @param model
     * @return
     */
    @RequestMapping(value = "/roleUserIndex")
    public String roleUserIndex(@RequestParam("roleId") Long roleId,
                                   Model model) {
        model.addAttribute("roleId", roleId);
        return "user/roleUserIndex";
    }

    /**
     * 根据角色id查询该角色拥有的用户
     * @param startIndex
     * @param maxCount
     * @param roleId
     * @param userAccount
     * @param userName
     * @param model
     * @return
     */
    @RequestMapping(value = "/roleUserPage")
    public String roleUserPage(@RequestParam("startIndex") int startIndex,
                                  @RequestParam("maxCount") int maxCount,
                                  @RequestParam("roleId") Long roleId,
                                  @RequestParam("userAccount") String userAccount,
                                  @RequestParam("userName") String userName, Model model) {
        SysUser user = new SysUser();
        user.setStartIndex(startIndex);
        user.setMaxCount(maxCount);
        user.setRoleId(roleId);
        user.setUserAccount(userAccount);
        user.setUserName(userName);
        Integer total = userService.selectCount(user);
        List<SysUser> userList = userService.selectRoleUserByPage(user);
        model.addAttribute("total", total);
        model.addAttribute("userList", userList);
        return "user/roleUserTable";
    }

    /**
     * 根据角色id设置用户
     * @param delUserIds
     * @param addUserIds
     * @param roleId
     * @param model
     * @return
     */
    @RequestMapping(value = "/setRoleUser")
    public String setRoleUser(@RequestParam("delUserIds") String delUserIds,
                               @RequestParam("addUserIds") String addUserIds,
                               @RequestParam("roleId") Long roleId, Model model) {
        StringBuilder delSb = new StringBuilder();
        // 如果字符串不为空
        if (!delUserIds.equals("")) {
            String[] delArr = delUserIds.split(",");
            for (int i = 0; i < delArr.length; i++) {
                if (i == 0) {
                    delSb.append("'").append(delArr[i]).append("'");
                } else {
                    delSb.append(",'").append(delArr[i]).append("'");
                }
            }
        }

        ArrayList<SysUserRole> userRoleList = new ArrayList<SysUserRole>();
        SysUserRole sysUserRole = null;

        // 如果字符串不为空
        if (!addUserIds.equals("")) {
            String[] addArr = addUserIds.split(",");
            for (int i = 0; i < addArr.length; i++) {
                sysUserRole = new SysUserRole();
                sysUserRole.setRoleId(roleId);
                sysUserRole.setUserId(Long.valueOf(addArr[i]));
                userRoleList.add(sysUserRole);
            }
        }
        // 如果有数据改变则数据存储
        if (userRoleList.size() > 0 || delSb.length() > 0) {
            userRoleService.setRoleUsers(userRoleList, roleId,
                    delSb.toString());
            model.addAttribute("result", "success");
        }

        model.addAttribute("roleId", roleId);
        return "user/roleUserIndex";
    }

}
