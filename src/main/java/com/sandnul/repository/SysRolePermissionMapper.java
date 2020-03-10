package com.sandnul.repository;

import com.sandnul.domain.security.SysRole;
import com.sandnul.domain.security.SysRolePermisson;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:角色权限mapper
 */
@Mapper
public interface SysRolePermissionMapper {
    /**
     * deleteRolePermissionByRoleId:根据角色id删除角色权限. <br/>
     *
     * @author Jimmy
     * @param param
     * @return
     */
    Integer deleteRolePermissionByRoleId(Map param);
    /**
     * deleteRolePermissionByPermissionId:根据权限id删除角色权限. <br/>
     *
     * @author Jimmy
     * @param param
     * @return
     */
    Integer deleteRolePermissionByPermissionId(Map param);
    /**
     * deleteUserRoleByRoleIdPermissionIds:根据角色id权限id(权限id可以多个)删除角色权限. <br/>
     *
     * @author Jimmy
     * @param param
     * @return
     */
    Integer deleteUserRoleByRoleIdPermissionIds(Map param);

    /**
     * 添加角色权限
     * @param sysRolePermisson
     * @return
     */
    Integer insertSysRolePermisson(SysRolePermisson sysRolePermisson);

    /**
     * 查询所有的权限
     * @param param
     * @return
     */
    List<SysRolePermisson> findAllRolePermissoin(Map param);

}
