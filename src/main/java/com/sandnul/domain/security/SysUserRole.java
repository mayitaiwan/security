package com.sandnul.domain.security;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/8
 * Description:用户角色entity
 */
public class SysUserRole extends SecurityBaseEntity {
    /**
     * 用户id
     */
    private Long userId;
    /**
     *  角色id
     */
    private Long roleId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
