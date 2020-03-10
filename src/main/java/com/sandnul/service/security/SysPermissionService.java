package com.sandnul.service.security;

import com.sandnul.domain.security.SysPermission;
import com.sandnul.domain.security.SysRole;
import com.sandnul.domain.security.SysUser;
import com.sandnul.intf.security.IPermissionService;
import com.sandnul.intf.security.IUserService;
import com.sandnul.repository.SysPermissionMapper;
import com.sandnul.repository.SysRolePermissionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:权限接口实现
 */
@Component
public class SysPermissionService extends BaseService  implements IPermissionService {
    /**
     * 权限mapper
     */
    @Autowired
    private SysPermissionMapper sysPermissionMapper;
    /**
     * 角色权限mapper
     */
    @Autowired
    private SysRolePermissionMapper sysRolePermissionMapper;
    /**
     * 通过用户账号 查找权限
     * @param userAccount
     * @return List<SysPermission>
     */
    @Override
    public List<SysPermission> findPermissionsByUserAcccount(String userAccount) {
        Map<String,Object> userAccountParam=new HashMap();
        userAccountParam.put("tableprefix",propertiesConstant.getTableprefix());
        userAccountParam.put("userAccount",userAccount);
        return sysPermissionMapper.findPermissionsByUserAcccount(userAccountParam);
    }
    /**
     * 查询所有的权限
     * @return List<SysPermission>
     */
    @Override
    public List<SysPermission> selectAllPermissions() {
        Map<String,Object> param=new HashMap();
        param.put("tableprefix",propertiesConstant.getTableprefix());
        return sysPermissionMapper.selectAllPermissions(param);
    }

    /**
     * 根据id查询权限
     * @param id
     * @return
     */
    @Override
    public SysPermission selectByPermissionId(Long id) {
        Map<String,Object> param=new HashMap();
        param.put("id",id);
        param.put("tableprefix",propertiesConstant.getTableprefix());
        return sysPermissionMapper.selectByPermissionId(param);
    }
    /**
     * 添加权限
     * @param sysPermission
     * @return
     */
    @Override
    public int insertSysPermission(SysPermission sysPermission) {
        sysPermission.setTableprefix(propertiesConstant.getTableprefix());
        return sysPermissionMapper.insertSysPermission(sysPermission);
    }
    /**
     * 修改权限
     * @param sysPermission
     * @return
     */
    @Override
    public int updateSysPermission(SysPermission sysPermission) {
        sysPermission.setTableprefix(propertiesConstant.getTableprefix());
        return sysPermissionMapper.updateSysPermission(sysPermission);
    }
    /**
     * 删除权限
     * @param id
     * @return
     */
    @Override
    @Transactional
    public int deleteSysPermission(Long  id) {
        Map<String,Object> param=new HashMap();
        param.put("id",id);
        param.put("tableprefix",propertiesConstant.getTableprefix());
        sysRolePermissionMapper.deleteRolePermissionByPermissionId(param);
        return sysPermissionMapper.deleteSysPermission(param);
    }
    /**
     * 根据角色id左连接查询所有权限
     * @param roleId
     * @return
     */
    @Override
    public List<SysPermission> selectRolePermission(Long roleId) {
        Map<String,Object> param=new HashMap();
        param.put("roleId",roleId);
        param.put("tableprefix",propertiesConstant.getTableprefix());
        return  sysPermissionMapper.selectRolePermission(param);
    }
}
