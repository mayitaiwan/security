package com.sandnul.service.security;

import com.sandnul.domain.security.SysRolePermisson;
import com.sandnul.domain.security.SysUserRole;
import com.sandnul.intf.security.IRolePermissionService;
import com.sandnul.repository.SysRolePermissionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/9
 * Description:角色权限接口实现
 */
@Component
public class SysRolePermissionService extends BaseService implements IRolePermissionService {
    /**
     * 角色权限mapper
     */
    @Autowired
    private SysRolePermissionMapper sysRolePermissionMapper;

    /**
     * 设置角色权限
     * @param sysRolePermissonList
     * @param roleId
     * @param permissionIds
     * @return
     */
    @Override
    public int setRolePermission(List<SysRolePermisson> sysRolePermissonList, Long roleId, String permissionIds) {
        int result = 0;
        if (!permissionIds.equals("")) {
            Map<String,Object> param=new HashMap<>();
            param.put("roleId",roleId);
            param.put("tableprefix",propertiesConstant.getTableprefix());
            param.put("permissionIds",permissionIds);
            result += sysRolePermissionMapper.deleteUserRoleByRoleIdPermissionIds(param);
        }
        for (int i = 0; i < sysRolePermissonList.size(); i++) {
            SysRolePermisson sysRolePermisson=sysRolePermissonList.get(i);
            sysRolePermisson.setTableprefix(propertiesConstant.getTableprefix());
            result += sysRolePermissionMapper.insertSysRolePermisson(sysRolePermisson);
        }
        return result;
    }
}
