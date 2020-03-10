package com.sandnul.domain.security;

import java.io.Serializable;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:角色entity
 */
public class SysRole extends SecurityBaseEntity {

    private static final long serialVersionUID = 1L;
    /**
     * id
     */
    private Long id;
    /**
     * 角色名称
     */
    private String name;
    /**
     * 角色描述
     */
    private String roleDesc;
    /**
     * 用户id，在为用户设置角色时查询用
     */
    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoleDesc() {
        return roleDesc;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }


}
