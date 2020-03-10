package com.sandnul.intf.security;

import com.sandnul.domain.security.SysRole;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * Role: Jimmy
 * Date: 2020/3/4
 * Description:角色接口
 */
public interface IRoleService {
    /**
     * selectByRoleId:根据角色id返回Role实例对象。 <br/>
     *
     * @author Jimmy
     * @param id
     * @return
     */
    public SysRole selectByRoleId(Long id);
    

    /**
     * selectRolesByPage:分页查询角色. <br/>
     *
     * @author Jimmy
     * @param sysRole
     * @return
     */
    public List<SysRole> selectRolesByPage(SysRole sysRole);

    /**
     * selectCount:根据相关条件查询角色总数. <br/>
     *
     * @author Jimmy
     * @param sysRole
     * @return
     */
    public Integer selectCount(SysRole sysRole);

    /**
     * insertRole:新增角色. <br/>
     *
     * @author Jimmy
     * @param sysRole
     * @return
     */
    public int insertRole(SysRole sysRole);

    /**
     * updateRole:修改角色. <br/>
     *
     * @author Jimmy
     * @param sysRole
     * @return
     */
    public int updateRole(SysRole sysRole);

    /**
     * deleteRoles:删除角色. <br/>
     *
     * @author Jimmy
     * @param ids
     * @return
     */
    public int deleteRoles(String ids);

    /**
     * selectCountByRoleName:根据角色名称查询总数，校验是否有相同角色名称. <br/>
     * @param name
     * @param id
     * @return
     */
    public int selectCountByRoleName(String name, Long id);
    /**
     * selectUserRoleByPage:根据用户id分页查询用户角色 . <br/>
     *
     * @author Jimmy
     * @param sysRole
     * @return
     */
    public List<SysRole> selectUserRoleByPage(SysRole sysRole);


}
