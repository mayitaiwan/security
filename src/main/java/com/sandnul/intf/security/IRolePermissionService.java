package com.sandnul.intf.security;

import com.sandnul.domain.security.SysPermission;
import com.sandnul.domain.security.SysRolePermisson;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:角色权限接口
 */
public interface IRolePermissionService {
    /**
     * 根据角色id设置权限
     * @param sysRolePermissonList
     * @param roleId
     * @param permissionIds
     * @return
     */
    int setRolePermission(List<SysRolePermisson> sysRolePermissonList, Long roleId, String permissionIds);
}
