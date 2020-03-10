package com.sandnul.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:配置常量
 */
@Component
@PropertySource(value="classpath:constant.properties")
public class PropertiesConstant {
    /**
     * 考虑到有前后端用同一个数据库的情况，
     * 前端一套权限管理，后端一套权限管理，彼此独立互不干扰，
     * 需要以表的前缀作为区分来使用这个权限管理系统，使用时只需要
     * 设置一下constant.properties文件的database.tableprefix的值即可
     */
    @Value("${database.tableprefix}")
    private String tableprefix;
    public String getTableprefix(){
        return tableprefix;
    }
}
