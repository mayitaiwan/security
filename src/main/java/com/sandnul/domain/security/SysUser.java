package com.sandnul.domain.security;

import com.sandnul.domain.base.BaseEntity;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:用户entity
 */
public class SysUser extends SecurityBaseEntity {
    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 1L;
    /**
     * id
     */
    private Long id;
    /**
     * 用户账号，唯一
     */
    private String userAccount;
    /**
     * 用户中文名称
     */
    private String userName;
    /**
     * 用户密码
     */
    private String password;
    /**
     * 用户备注
     */
    private String userDesc;
    /**
     * 角色id，在为角色设置用户时查询用
     */
    private Long roleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserDesc() {
        return userDesc;
    }

    public void setUserDesc(String userDesc) {
        this.userDesc = userDesc;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
