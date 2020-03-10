package com.sandnul.domain.security;

import com.sandnul.domain.base.BaseEntity;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:security的entity基础类
 */
public class SecurityBaseEntity extends BaseEntity {
    /**
     * 表前缀
     */
    private String tableprefix;
    public String getTableprefix() {
        return tableprefix;
    }

    public void setTableprefix(String tableprefix) {
        this.tableprefix = tableprefix;
    }
}
