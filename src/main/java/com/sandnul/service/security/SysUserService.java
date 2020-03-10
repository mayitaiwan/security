package com.sandnul.service.security;

import com.sandnul.domain.security.SysRole;
import com.sandnul.domain.security.SysUser;
import com.sandnul.intf.security.IUserService;
import com.sandnul.repository.SysUserMapper;
import com.sandnul.repository.SysUserRoleMapper;
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
 * Date: 2020/3/8
 * Description:用户接口实现
 */
@Component
public class SysUserService extends BaseService  implements UserDetailsService, IUserService {

    /**
     * logger
     */
    private final static Logger logger = LoggerFactory.getLogger(SysUserService.class);
    /**
     * 用户mapper
     */
    @Autowired
    private SysUserMapper sysUserMapper;
    /**
     * 用户角色mapper
     */
    @Autowired
    private SysUserRoleMapper sysUserRoleMapper;

    /**
     * 通过验证 将用的所有角色 用户信息中
     * @param userAccount
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String userAccount) throws UsernameNotFoundException {

        logger.info("根据名称获取用户信息： userAccount is {}",userAccount);
        Map<String,Object> param=new HashMap<>();
        param.put("tableprefix",propertiesConstant.getTableprefix());
        param.put("userAccount",userAccount);
        param.put("userAccount1",userAccount);
        SysUser user = sysUserMapper.findUserByUserAcccount(param);
        if(user == null)
            throw new UsernameNotFoundException(String.format("No user found with userAccount '%s'.", userAccount));

        //获取所有请求的url
        //List<SysPermission> sysPermissions = sysUserMapper.findPermissionsByUsername(user.getUsername());
        List<SysRole> sysRoles = sysUserMapper.findRolesByUserAcccount(param);

        logger.info("用户角色个数为{}",sysRoles.size());
        logger.info("--------------all Roles--------------");
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
//        SecurityContextHolder.getContext().getAuthentication().getAuthorities()
        for (SysRole sysRole : sysRoles) {
            //封装用户信息和角色信息 到 SecurityContextHolder全局缓存中
            logger.info("name--->{}",sysRole.getName());
            grantedAuthorities.add(new SimpleGrantedAuthority(sysRole.getName()));
        }
        logger.info("--------------all Roles--------------");
        return new User(user.getUserAccount(), user.getPassword(), grantedAuthorities);
    }

    /**
     * selectByUserId:根据用户id返回Users实例对象。 <br/>
     *
     * @author Jimmy
     * @param id
     * @return
     */
    @Override
    public SysUser selectByUserId(Long id) {
        Map<String,Object>param=new HashMap<>();
        param.put("id",id);
        param.put("tableprefix",propertiesConstant.getTableprefix());
        return  sysUserMapper.selectByUserId(param);
    }

    /**
     * selectUsersByPage:分页查询用户. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    @Override
    public List<SysUser> selectUsersByPage(SysUser sysUser) {
        sysUser.setTableprefix(propertiesConstant.getTableprefix());
       return sysUserMapper.selectUsersByPage(sysUser);
    }
    /**
     * selectUsersByPage:根据相关信息分页查询角色用户. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    @Override
    public List<SysUser> selectRoleUserByPage(SysUser sysUser) {
        sysUser.setTableprefix(propertiesConstant.getTableprefix());
        return sysUserMapper.selectRoleUserByPage(sysUser);
    }
    /**
     * selectCount:根据相关条件查询用户总数. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    @Override
    public Integer selectCount(SysUser sysUser) {
        sysUser.setTableprefix(propertiesConstant.getTableprefix());
        return sysUserMapper.selectCount(sysUser);
    }
    /**
     * insertUsers:新增用户. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    @Override
    public int insertUser(SysUser sysUser) {
        sysUser.setTableprefix(propertiesConstant.getTableprefix());
        return sysUserMapper.insertUser(sysUser);
    }

    /**
     * 根据用户账号查询总数，校验是否有相同账号
     * @param userAccount
     * @param id
     * @return
     */
    @Override
    public int selectCountByUserAccount(String userAccount, Long id) {
        Map<String,Object>param=new HashMap<>();
        param.put("userAccount",userAccount);
        param.put("id",id);
        param.put("tableprefix",propertiesConstant.getTableprefix());
       return  sysUserMapper.selectCountByUserAccount(param);
    }
    /**
     * updateUser:修改用户. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    @Override
    public int updateUser(SysUser sysUser) {
        sysUser.setTableprefix(propertiesConstant.getTableprefix());
        return sysUserMapper.updateUser(sysUser);
    }

    /**
     * deleteUsers:删除用户. <br/>
     *
     * @author Jimmy
     * @param ids
     * @return
     */
    @Override
    @Transactional
    public int deleteUsers(String ids) {
        Map<String,Object>param=new HashMap<>();
        param.put("ids",ids);
        param.put("tableprefix",propertiesConstant.getTableprefix());
        //删除用户角色表
        sysUserRoleMapper.deleteUserRoleByUserId(param);
        return   sysUserMapper.deleteUsers(param);
    }
}
