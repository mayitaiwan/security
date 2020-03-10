package com.sandnul.repository;

import com.sandnul.domain.security.SysPermission;
import com.sandnul.domain.security.SysRole;
import com.sandnul.domain.security.SysRolePermisson;
import com.sandnul.domain.security.SysUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:权限mapper
 */
@Mapper
public interface SysPermissionMapper {
    /**
     * 通过用户账号 查找权限
     * @param userAccountParam
     * @return List<SysPermission>
     */
    List<SysPermission> findPermissionsByUserAcccount(Map userAccountParam);
    /**
     * 查找所有权限
     * @param param
     * @return List<SysPermission>
     */
    List<SysPermission> selectAllPermissions(Map param);
    /**
     * 根据id查询权限
     * @param param
     * @return SysPermission
     */
    SysPermission selectByPermissionId(Map param);

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
     * @param param
     * @return
     */
    int deleteSysPermission(Map param);

    /**
     * 根据角色id左连接查询所有权限
     * @param param
     * @return
     */
    List<SysPermission> selectRolePermission(Map param);
}
