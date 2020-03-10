package com.sandnul.service.security;

import com.sandnul.domain.security.SysRole;
import com.sandnul.domain.security.SysRole;
import com.sandnul.intf.security.IRoleService;
import com.sandnul.repository.SysRoleMapper;
import com.sandnul.repository.SysRolePermissionMapper;
import com.sandnul.repository.SysUserRoleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/9
 * Description:角色接口实现
 */
@Component
public class SysRoleService extends BaseService  implements  IRoleService {

    /**
     * logger
     */
    private final static Logger logger = LoggerFactory.getLogger(SysRoleService.class);
    /**
     * 角色mapper
     */
    @Autowired
    private SysRoleMapper sysRoleMapper;

    /**
     * 用户角色mapper
     */
    @Autowired
    private SysUserRoleMapper sysUserRoleMapper;
    /**
     * 角色权限mapper
     */
    @Autowired
    private SysRolePermissionMapper sysRolePermissionMapper;


    /**
     * selectByRoleId:根据角色id返回Roles实例对象。 <br/>
     *
     * @author Jimmy
     * @param id
     * @return
     */
    @Override
    public SysRole selectByRoleId(Long id) {
        Map<String,Object>param=new HashMap<>();
        param.put("id",id);
        param.put("tableprefix",propertiesConstant.getTableprefix());
        return  sysRoleMapper.selectByRoleId(param);
    }
    /**
     * selectRolesByPage:分页查询角色. <br/>
     *
     * @author Jimmy
     * @param sysRole
     * @return
     */
    @Override
    public List<SysRole> selectRolesByPage(SysRole sysRole) {
        sysRole.setTableprefix(propertiesConstant.getTableprefix());
       return sysRoleMapper.selectRoleByPage(sysRole);
    }


    /**
     * selectCount:根据相关条件查询角色总数. <br/>
     *
     * @author Jimmy
     * @param sysRole
     * @return
     */
    @Override
    public Integer selectCount(SysRole sysRole) {
        sysRole.setTableprefix(propertiesConstant.getTableprefix());
        return sysRoleMapper.selectCount(sysRole);
    }

    /**
     * 新增角色
     * @param sysRole
     * @return
     */
    @Override
    public int insertRole(SysRole sysRole) {
        sysRole.setTableprefix(propertiesConstant.getTableprefix());
        return sysRoleMapper.insertRole(sysRole);
    }


    /**
     * updateRole:修改角色. <br/>
     *
     * @author Jimmy
     * @param sysRole
     * @return
     */
    @Override
    public int updateRole(SysRole sysRole) {
        sysRole.setTableprefix(propertiesConstant.getTableprefix());
        return sysRoleMapper.updateRole(sysRole);
    }

    /**
     * deleteRoles:删除角色. <br/>
     *
     * @author Jimmy
     * @param ids
     * @return
     */
    @Override
    @Transactional
    public int deleteRoles(String ids) {
        Map<String,Object>param=new HashMap<>();
        param.put("ids",ids);
        param.put("tableprefix",propertiesConstant.getTableprefix());
        //删除角色权限表
        sysRolePermissionMapper.deleteRolePermissionByRoleId(param);
        //删除用户角色表
        sysUserRoleMapper.deleteUserRoleByRoleId(param);
        return   sysRoleMapper.deleteRoles(param);
    }
    /**
     * selectCountByRoleName:根据角色名称查询总数，校验是否有相同角色名称. <br/>
     * @param name
     * @param id
     * @return
     */
    @Override
    public int selectCountByRoleName(String name, Long id) {
        Map<String,Object>param=new HashMap<>();
        param.put("name",name);
        param.put("id",id);
        param.put("tableprefix",propertiesConstant.getTableprefix());
        return  sysRoleMapper.selectCountByRoleName(param);
    }
    /**
     * selectUserRoleByPage:根据用户id分页查询用户角色 . <br/>
     *
     * @author Jimmy
     * @param sysRole
     * @return
     */
    @Override
    public List<SysRole> selectUserRoleByPage(SysRole sysRole) {
        sysRole.setTableprefix(propertiesConstant.getTableprefix());
        return sysRoleMapper.selectUserRoleByPage(sysRole);
    }
}
