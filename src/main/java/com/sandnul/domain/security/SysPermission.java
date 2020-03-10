package com.sandnul.domain.security;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:权限管理entity
 */
public class SysPermission extends SecurityBaseEntity {

    private static final long serialVersionUID = 1L;
    /**
     * rightIframe:target的iframe
     */
    private static final String RIGHT_IFRAME = "rightIframe";
    /**
     * id
     */
    private Long id;
    /**
     * 父id
     */
    private Long pid;
    /**
     * 权限名称
     */
    private String name;
    /**
     * 权限对应的url
     */
    private String url;
    /**
     * patchString:权限匹配url.
     */
    private String patchString;
    /**
     * 权限描述
     */
    private String description;
    /**
     * menuFlag:是否在菜单中显示.
     */
    private Integer menuFlag;
    /**
     * orderNumber:同目录下顺序号.
     */
    private Integer orderNumber;
    /**
     * 角色id，在设置的时候用到，判断该权限是否被选中
     */
    private Long roleId;
    public Long getId() {
        return id;
    }


    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPid() {
        return pid;
    }
    public Long getpId() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPatchString() {
        return patchString;
    }

    public void setPatchString(String patchString) {
        this.patchString = patchString;
    }

    public Integer getMenuFlag() {
        return menuFlag;
    }

    public void setMenuFlag(Integer menuFlag) {
        this.menuFlag = menuFlag;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    /**
     * js组件ztree的getTarget需要<br/>
     * @author Administrator
     * @return
     */
    public String getTarget() {
        return RIGHT_IFRAME;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    /**
     * 在为角色设置权限时，判断权限是否已被选中
     * @return
     */
    public boolean isChecked() {
        if (null == roleId ) {
            return false;
        }
        return true;
    }
}
