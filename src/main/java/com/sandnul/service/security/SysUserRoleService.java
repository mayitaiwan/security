package com.sandnul.service.security;

import com.sandnul.domain.security.SysUserRole;
import com.sandnul.intf.security.IUserRoleService;
import com.sandnul.repository.SysUserRoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/8
 * Description:用户角色接口实现
 */
@Component
public class SysUserRoleService  extends BaseService  implements IUserRoleService {
    /**
     * 用户角色mapper
     */
    @Autowired
    private SysUserRoleMapper sysUserRoleMapper;
    /**
     * 根据用户id设置用户角色
     * @param userRoleList
     * @param userId
     * @param delRoleIds
     * @return
     */
    @Override
    @Transactional
    public int setUserRoles(List<SysUserRole> userRoleList, Long userId, String delRoleIds) {
        int result = 0;
        if (!delRoleIds.equals("")) {
            Map<String,Object> param=new HashMap<>();
            param.put("userId",userId);
            param.put("tableprefix",propertiesConstant.getTableprefix());
            param.put("delRoleIds",delRoleIds);
            result += sysUserRoleMapper.deleteUserRoleByUserIdRoleIds(param);
        }
        for (int i = 0; i < userRoleList.size(); i++) {
            SysUserRole sysUserRole=userRoleList.get(i);
            sysUserRole.setTableprefix(propertiesConstant.getTableprefix());
            result += sysUserRoleMapper.insertSysUserRole(sysUserRole);
        }
        return result;
    }
    /**
     * 根据角色id设置用户角色
     * @param userRoleList
     * @param roleId
     * @param delUserIds
     * @return
     */
    @Override
    public int setRoleUsers(List<SysUserRole> userRoleList, Long roleId, String delUserIds) {
        int result = 0;
        if (!delUserIds.equals("")) {
            Map<String,Object> param=new HashMap<>();
            param.put("roleId",roleId);
            param.put("tableprefix",propertiesConstant.getTableprefix());
            param.put("delUserIds",delUserIds);
            result += sysUserRoleMapper.deleteUserRoleByRoleIdUserIds(param);
        }
        for (int i = 0; i < userRoleList.size(); i++) {
            SysUserRole sysUserRole=userRoleList.get(i);
            sysUserRole.setTableprefix(propertiesConstant.getTableprefix());
            result += sysUserRoleMapper.insertSysUserRole(sysUserRole);
        }
        return result;
    }

}
