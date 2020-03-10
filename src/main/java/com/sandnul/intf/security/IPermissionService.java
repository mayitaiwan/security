package com.sandnul.intf.security;

import com.sandnul.domain.security.SysPermission;
import com.sandnul.domain.security.SysUser;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:权限接口
 */
public interface IPermissionService {

    /**
     * 通过用户账号 查找权限
     * @param userAccount
     * @return List<SysPermission>
     */
    List<SysPermission> findPermissionsByUserAcccount(String userAccount);

    /**
     * 查询所有的权限
     * @return List<SysPermission>
     */
    List<SysPermission> selectAllPermissions();
    /**
     * 根据id查询权限
     * @param id
     * @return
     */
    SysPermission selectByPermissionId(Long id);

    /**
     * 添加权限
     * @param sysPermission
     * @return
     */
    int insertSysPermission(SysPermission sysPermission);

    /**
     * 修改权限
     * @param sysPermission
     * @return
     */
    int updateSysPermission(SysPermission sysPermission);

    /**
     * 删除权限
     * @param id
     * @return
     */
    int deleteSysPermission(Long  id);

    /**
     * 根据角色id左连接查询所有权限
     * @param roleId
     * @return
     */
    List<SysPermission>    selectRolePermission(Long  roleId);
}
