package com.sandnul.security;

import com.sandnul.config.PropertiesConstant;
import com.sandnul.domain.security.SysRolePermisson;
import com.sandnul.repository.SysRolePermissionMapper;
import com.sandnul.repository.SysUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/9
 * Description:角色权限缓存数据
 */
@Component
public class UrlPermissionData {
    /**
     * 角色权限mapper
     */
    @Autowired
    private SysRolePermissionMapper sysRolePermissionMapper;
    /**
     * 配置常量类
     */
    @Autowired
    protected PropertiesConstant propertiesConstant;
    /**
     * 每一个资源所需要的角色
     */
    private static HashMap<String, Collection<ConfigAttribute>> map =null;
    public void loadResourceDefine(){
        map = new HashMap<>();
        Map<String,Object> param=new HashMap<>();
        param.put("tableprefix",propertiesConstant.getTableprefix());
        //权限资源 和 角色对应的表  也就是 角色 权限中间表
        List<SysRolePermisson> rolePermissons = sysRolePermissionMapper.findAllRolePermissoin(param);

        //每个资源 所需要的权限
        for (SysRolePermisson rolePermisson : rolePermissons) {
            String patchString = rolePermisson.getPatchString();
            String roleName = rolePermisson.getRoleName();
            ConfigAttribute role = new SecurityConfig(roleName);
            if(map.containsKey(patchString)){
                map.get(patchString).add(role);
            }else{
                map.put(patchString,new ArrayList<ConfigAttribute>(){{
                    add(role);
                }});
            }
        }
    }
    public Map<String, Collection<ConfigAttribute>> getMap(){
        if(map==null){
            loadResourceDefine();
        }
        return map;
    }
}
