package com.sandnul.service.security;


import com.sandnul.config.PropertiesConstant;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:
 */
public class BaseService {
    /**
     * 配置数据常量，目前取数据库表前缀
     */
    @Autowired
    protected PropertiesConstant propertiesConstant;
}
