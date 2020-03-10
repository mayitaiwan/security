package com.sandnul.security;

import com.sandnul.config.PropertiesConstant;
import com.sandnul.domain.security.SysRolePermisson;
import com.sandnul.repository.SysUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:
 */
@Component
public class MyInvocationSecurityMetadataSourceService  implements
        FilterInvocationSecurityMetadataSource {
    /**
     * 角色权限缓存数据
     */
    @Autowired
    private UrlPermissionData urlPermissionData;
    /**
     * @param object
     * @return
     * @throws IllegalArgumentException
     */
    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
        Map<String, Collection<ConfigAttribute>> map=urlPermissionData.getMap();
        //object 中包含用户请求的request 信息
        HttpServletRequest request = ((FilterInvocation) object).getHttpRequest();
        for(Iterator<String> iter = map.keySet().iterator(); iter.hasNext(); ) {
            String patchString = iter.next();
            //System.out.println(patchString);
            if(new AntPathRequestMatcher(patchString).matches(request)) {
                return map.get(patchString);
            }
        }
        return null;
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }
}