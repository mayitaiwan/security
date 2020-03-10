package com.sandnul.repository;

import com.sandnul.domain.security.SysRole;
import com.sandnul.domain.security.SysRolePermisson;
import com.sandnul.domain.security.SysUser;
import com.sandnul.domain.security.SysUserRole;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:用户角色mapper
 */
@Mapper
public interface SysUserRoleMapper {
    /**
     * deleteUserRoleByUserId:根据用户id删除用户角色. <br/>
     *
     * @author Jimmy
     * @param param
     * @return
     */
    Integer deleteUserRoleByUserId(Map param);
    /**
     * deleteUserRoleByRoleId:根据角色id删除用户角色. <br/>
     *
     * @author Jimmy
     * @param param
     * @return
     */
    Integer deleteUserRoleByRoleId(Map param);

    /**
     * 根据用户id和角色id（角色id可多个）删除用户角色表
     * @param param
     * @return
     */
    Integer deleteUserRoleByUserIdRoleIds(Map param);

    /**
     * 添加用户角色
     * @param sysUserRole
     * @return
     */
    Integer insertSysUserRole(SysUserRole sysUserRole);
    /**
     * 根据角色id和用户id（用户id可多个）删除用户角色表
     * @param param
     * @return
     */
    Integer deleteUserRoleByRoleIdUserIds(Map param);

}
