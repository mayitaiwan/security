package com.sandnul.controller;

import com.sandnul.domain.security.SysPermission;
import com.sandnul.domain.security.SysRolePermisson;
import com.sandnul.intf.security.IPermissionService;
import com.sandnul.intf.security.IRolePermissionService;
import com.sandnul.security.UrlPermissionData;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/7
 * Description:权限管理
 */
@Controller
@RequestMapping("permission")
public class PermissionController {
    /**
     * 权限service
     */
    @Autowired
    private IPermissionService permissionService;
    /**
     * 角色权限service
     */
    @Autowired
    private IRolePermissionService rolePermissionService;
    /**
     * urlpermission缓存
     */
    @Autowired
    private UrlPermissionData urlPermissionData;
    /**
     * 权限首页
     * @param model
     * @return
     */
    @GetMapping(value = "index")
    public String index(Model model) {
        // 查询所有资源
        List<SysPermission> sysPermission = permissionService.selectAllPermissions();
        JSONArray resourceJson = new JSONArray();
        resourceJson.addAll(sysPermission);
        model.addAttribute("permissionJson", resourceJson.toString());
        return "permission/index";
    }

    /**
     * 初始空白页面及增加修改删除消息页 <br/>
     * @param msg
     * @param id
     * @param pid
     * @param name
     * @param model
     * @return
     */
    @RequestMapping(value = "/info")
    public String info(@RequestParam("msg") String msg,
                        @RequestParam("id") String id,
                        @RequestParam("pid") String pid,
                        @RequestParam("name") String name, Model model) {
        model.addAttribute("msg", msg);
        model.addAttribute("id", id);
        model.addAttribute("pid", pid);
        model.addAttribute("name", name);
//        try {
//            model.addAttribute("name",
//                    new String(name.getBytes("iso-8859-1"), "utf-8"));
//        } catch (UnsupportedEncodingException e) {
//
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//
//        }
        return "permission/info";
    }

    /**
     * 跳转到新增页面
     * @param pid
     * @param model
     * @return
     */
    @RequestMapping(value = "/toAddPermission")
    public String toAddPermission(@RequestParam("pid") String pid,
                                Model model) {
        model.addAttribute("pid", pid);
        return "permission/newPermission";
    }

    /**
     * toModifyPermission:跳转到修改页面 <br/>
     * @param id
     * @param model
     * @return
     */
    @RequestMapping(value = "/toModifyPermission")
    public String toModifyPermission(
            @RequestParam("id") Long id, Model model) {
        SysPermission sysPermission = permissionService
                .selectByPermissionId(id);
        model.addAttribute("sysPermission", sysPermission);
        return "permission/modifyPermission";
    }

    /**
     * 新增权限
     * @param sysPermission
     * @param attr
     * @return
     */
    @RequestMapping(value = "/addPermission")
    public String addPermission(@ModelAttribute SysPermission sysPermission,
                              RedirectAttributes attr) {
        permissionService.insertSysPermission(sysPermission);
        attr.addAttribute("id", sysPermission.getId());
        if(sysPermission.getPid()==null){
            attr.addAttribute("pid", "");
        }else {
            attr.addAttribute("pid", sysPermission.getPid());
        }
        attr.addAttribute("name", sysPermission.getName());
        attr.addAttribute("msg", "addNew");
        return "redirect:/permission/info";
    }

    /**
     * 修改权限
     * @param sysPermission
     * @param attr
     * @return
     */
    @RequestMapping(value = "/modifyPermission")
    public String modifyPermission(@ModelAttribute SysPermission sysPermission,
                                 RedirectAttributes attr) {
        permissionService.updateSysPermission(sysPermission);
        attr.addAttribute("id", sysPermission.getId());
        if(sysPermission.getPid()==null){
            attr.addAttribute("pid", "");
        }else {
            attr.addAttribute("pid", sysPermission.getPid());
        }
        attr.addAttribute("name", sysPermission.getName());
        attr.addAttribute("msg", "modify");
        return "redirect:/permission/info";
    }

    /**
     * 删除权限
     * @param id
     * @param attr
     * @return
     */
    @RequestMapping(value = "/deletePermission")
    public String deletePermission(
            @RequestParam("id") Long id,
            RedirectAttributes attr) {
        permissionService.deleteSysPermission(id);
        attr.addAttribute("id", id);
        attr.addAttribute("pid", "");
        attr.addAttribute("name", "");
        attr.addAttribute("msg", "delete");
        return "redirect:/permission/info";
    }

    /**
     * 设置角色权限首页
     * @param roleId
     * @param result
     * @param model
     * @return
     */
    @RequestMapping(value = "/setRolePermissionIndex")
    public String setRolePermissionIndex(
            @RequestParam("roleId") Long roleId,@RequestParam(value = "result",defaultValue ="" ) String result, Model model) {
        // 查询所有权限
        List<SysPermission> sysPermissions = permissionService
                .selectRolePermission(roleId);
        JSONArray permissionJson = new JSONArray();
        permissionJson.addAll(sysPermissions);
        model.addAttribute("permissionJson", permissionJson.toString());
        model.addAttribute("roleId", roleId);
        model.addAttribute("result",  result);
        return "permission/rolePermissionIndex";
    }

    /**
     * 设置角色权限<br/>
     *
     * @author Administrator
     * @param model
     * @return
     */

    @RequestMapping(value = "/setRolePermission")
    public String setRolePermission(
            @RequestParam("roleId") Long roleId,
            @RequestParam("addPermissionIds") String addPermissionIds,
            @RequestParam("delPermissionIds") String delPermissionIds,
            RedirectAttributes attr, Model model) {
        StringBuilder delSb = new StringBuilder();
        // 如果字符串不为空
        if (!delPermissionIds.equals("")) {
            String[] delArr = delPermissionIds.split(",");
            for (int i = 0; i < delArr.length; i++) {
                if (i == 0) {
                    delSb.append("'").append(delArr[i]).append("'");
                } else {
                    delSb.append(",'").append(delArr[i]).append("'");
                }
            }
        }

        ArrayList<SysRolePermisson> sysRolePermissonList = new ArrayList<SysRolePermisson>();
        SysRolePermisson sysRolePermisson = null;
        // 如果字符串不为空
        if (!addPermissionIds.equals("")) {
            String[] addArr = addPermissionIds.split(",");
            for (int i = 0; i < addArr.length; i++) {
                sysRolePermisson = new SysRolePermisson();
                sysRolePermisson.setPermissionId(Long.valueOf(addArr[i]));
                sysRolePermisson.setRoleId(roleId);
                sysRolePermissonList.add(sysRolePermisson);
            }
        }
        // 如果有数据改变则数据存储
        if (sysRolePermissonList.size() > 0 || delSb.length() > 0) {
            rolePermissionService.setRolePermission(
                    sysRolePermissonList, roleId, delSb.toString());
            //刷新urlpermission缓存数据
            urlPermissionData.loadResourceDefine();
            attr.addAttribute("result", "success");
        }else{
            attr.addAttribute("result", "");
        }
        attr.addAttribute("roleId", roleId);

        return "redirect:/permission/setRolePermissionIndex";
    }
}
