package com.sandnul.domain.security;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:角色权限entity
 */
public class SysRolePermisson extends SecurityBaseEntity{

    /**
     * 角色
     */
    private Long roleId;

    private String roleName;

    /**
     * 权限
     */
    private Long permissionId;
    /**
     * patchString:权限匹配url.
     */
    private String patchString;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Long getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Long permissionId) {
        this.permissionId = permissionId;
    }

    public String getPatchString() {
        return patchString;
    }

    public void setPatchString(String patchString) {
        this.patchString = patchString;
    }
}
