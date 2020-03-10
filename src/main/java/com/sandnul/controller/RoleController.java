package com.sandnul.controller;

import com.sandnul.domain.security.SysRole;
import com.sandnul.domain.security.SysUserRole;
import com.sandnul.intf.security.IRoleService;
import com.sandnul.intf.security.IUserRoleService;
import com.sandnul.security.UrlPermissionData;
import org.springframework.beans.factory.annotation.Autowired;
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
 * Role: Jimmy
 * Date: 2020/3/4
 * Description:角色管理
 */
@Controller
@RequestMapping("role")
public class RoleController {
    /**
     * 角色service
     */
    @Autowired
    private IRoleService roleService;
    /**
     * 用户角色service
     */
    @Autowired
    private IUserRoleService userRoleService;
    /**
     * urlpermission缓存
     */
    @Autowired
    private UrlPermissionData urlPermissionData;

    /**
     * 首页
     * @return
     */
    @GetMapping(value = "index")
    public String index() {
        return "role/index";
    }

    /**
     * 分页查询
     * @param startIndex
     * @param maxCount
     * @param name
     * @param model
     * @return
     */
    @RequestMapping(value = "/page")
    public String page(@RequestParam("startIndex") int startIndex,
                       @RequestParam("maxCount") int maxCount,
                       @RequestParam(value = "name",defaultValue ="") String name, Model model) {
        SysRole role = new SysRole();
        role.setStartIndex(startIndex);
        role.setMaxCount(maxCount);
        role.setName(name);
        Integer total = roleService.selectCount(role);
        List<SysRole> rolesList = roleService.selectRolesByPage(role);
        model.addAttribute("total", total);
        model.addAttribute("rolesList", rolesList);
        return "role/table";
    }

    /**
     * 跳转到新增角色
     * @return
     */
    @RequestMapping(value = "/toAddRole")
    public String toAddRole() {
        return "role/newRole";
   }

    /**
     * 新增角色
     * @param sysRole
     * @param model
     * @return
     */
    @RequestMapping(value = "/addRole")
    public String addRole(@ModelAttribute SysRole sysRole, Model model) {
        int result = roleService.insertRole(sysRole);
        model.addAttribute("result", result);
        return "role/newRole";
    }


    /**
     * modifyRole:修改角色 <br/>
     *
     * @author Administrator
     * @param model
     * @return
     */
    @RequestMapping(value = "/modifyRole")
    public String modifyRole(@ModelAttribute SysRole sysRole,Model model) {
        int result = roleService.updateRole(sysRole);
        //刷新urlpermission缓存数据
        urlPermissionData.loadResourceDefine();
        model.addAttribute("result", result);
        model.addAttribute("sysRole", sysRole);
        return "role/modifyRole";
    }

    /**
     * 跳转到修改角色
     * @param id
     * @param model
     * @return
     */
    @RequestMapping(value = "/toModifyRole")
    public String toModifyRole(@RequestParam("id") Long id,
                               Model model) {
        SysRole sysRole= roleService.selectByRoleId(id);
        model.addAttribute("sysRole", sysRole);
        return "role/modifyRole";
    }

    /**
     * 删除角色
     * @param ids
     * @param response
     */
    @RequestMapping(value = "/ajax/deleteRole")
    public void deleteRoles(@RequestParam("ids") String ids,
                            HttpServletResponse response) {
        int result = roleService.deleteRoles(ids);
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
     * 校验角色重名
     * @param name
     * @param id
     * @param response
     */
    @RequestMapping(value = "/ajax/checkRoleName")
    public void checkRoleName(@RequestParam("name") String name,
                              @RequestParam("id") Long id, HttpServletResponse response) {
        int result = roleService.selectCountByRoleName(name, id);
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
     * 设置用户角色主页面
     * @param userId
     * @param model
     * @return
     */
    @RequestMapping(value = "/userRoleIndex")
    public String userRoleIndex(@RequestParam("userId") String userId,
                                Model model) {
        model.addAttribute("userId", userId);
        return "role/userRoleIndex";
    }
    /**
     * 设置用户角色时，显示角色列表
     * @param startIndex
     * @param maxCount
     * @param userId
     * @param model
     * @return
     */
    @RequestMapping(value = "/userRolePage")
    public String userRolePage(@RequestParam("startIndex") int startIndex,
                               @RequestParam("maxCount") int maxCount,
                               @RequestParam("userId") Long userId, Model model) {
        SysRole role = new SysRole();
        role.setStartIndex(startIndex);
        role.setMaxCount(maxCount);
        role.setUserId(userId);
        Integer total = roleService.selectCount(role);
        List<SysRole> rolesList = roleService.selectUserRoleByPage(role);
        model.addAttribute("total", total);
        model.addAttribute("rolesList", rolesList);
        return "role/userRoleTable";
    }

    /**
     * setUserRole:将新的用户角色数据更新到数据库 <br/>
     * @param delRoleIds
     * @param addRoleIds
     * @param userId
     * @param model
     * @return
     */
    @RequestMapping(value = "/setUserRole")
    public String setUserRole(@RequestParam("delRoleIds") String delRoleIds,
                               @RequestParam("addRoleIds") String addRoleIds,
                               @RequestParam("userId") Long userId, Model model) {
        StringBuilder delSb = new StringBuilder();
        // 如果字符串不为空
        if (!delRoleIds.equals("")) {
            String[] delArr = delRoleIds.split(",");
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
        if (!addRoleIds.equals("")) {
            String[] addArr = addRoleIds.split(",");
            for (int i = 0; i < addArr.length; i++) {
                sysUserRole = new SysUserRole();
                sysUserRole.setRoleId(Long.valueOf(addArr[i]));
                sysUserRole.setUserId(userId);
                userRoleList.add(sysUserRole);
            }
        }
        // 如果有数据改变则数据存储
        if (userRoleList.size() > 0 || delSb.length() > 0) {
            userRoleService.setUserRoles(userRoleList, userId,
                    delSb.toString());
            model.addAttribute("result", "success");
        }

        model.addAttribute("userId", userId);
        return "role/userRoleIndex";
    }
}
