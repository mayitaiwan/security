package com.sandnul.repository;

import com.sandnul.domain.security.SysRole;
import com.sandnul.domain.security.SysRolePermisson;
import com.sandnul.domain.security.SysRole;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:角色mapper
 */
@Mapper
public interface SysRoleMapper {


    /**
     * 分页查询角色
     *
     * @param sysRole
     * @return
     */
    List<SysRole> selectRoleByPage(SysRole sysRole);

    /**
     * 查询总数
     *
     * @param sysRole
     * @return
     */
    Integer selectCount(SysRole sysRole);

    /**
     * 添加角色
     *
     * @param sysRole
     * @return
     */
    Integer insertRole(SysRole sysRole);

    /**
     * selectByRoleId:根据角色id返回SysRole实例对象。 <br/>
     *
     * @param param
     * @return
     * @author Jimmy
     */
    SysRole selectByRoleId(Map param);

    /**
     * updateRole:修改角色. <br/>
     *
     * @param sysRole
     * @return
     * @author Jimmy
     */
    Integer updateRole(SysRole sysRole);

    /**
     * deleteRoles:删除角色. <br/>
     *
     * @param param
     * @return
     * @author Jimmy
     */
    Integer deleteRoles(Map param);

    /**
     * selectCountByRoleName:根据角色名称查询总数，校验是否有相同角色名称. <br/>
     *
     * @param param
     * @return
     */
    Integer selectCountByRoleName(Map param);

    /**
     * 根据用户id分页查询用户角色
     *
     * @param sysRole
     * @return
     */
    List<SysRole> selectUserRoleByPage(SysRole sysRole);

}
