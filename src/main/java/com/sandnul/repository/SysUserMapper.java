package com.sandnul.repository;

import com.sandnul.domain.security.SysPermission;
import com.sandnul.domain.security.SysRole;
import com.sandnul.domain.security.SysRolePermisson;
import com.sandnul.domain.security.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:用户mapper
 */
@Mapper
public interface SysUserMapper {

    /**
     * 通过userAccount查找 user
     * userAccount是唯一的前提
     *
     * @param param
     * @return SysUser
     */
    SysUser findUserByUserAcccount(Map param);

    /**
     * 通过用户账号 查找·
     * @param param
     * @return List<SysRole>
     */
    List<SysRole> findRolesByUserAcccount(Map param);

    /**
     * 分页查询用户
     * @param sysUser
     * @return
     */
    List<SysUser> selectUsersByPage(SysUser sysUser);

    /**
     * 查询总数
     * @param sysUser
     * @return
     */
    Integer selectCount(SysUser sysUser);

    /**
     * 添加用户
     * @param sysUser
     * @return
     */
    Integer insertUser(SysUser sysUser);
    /**
     * 根据用户账号查询总数，校验是否有相同账号
     * @param param
     * @return
     */
    Integer selectCountByUserAccount(Map param);
    /**
     * selectByUserId:根据用户id返回SysUser实例对象。 <br/>
     *
     * @author Jimmy
     * @param param
     * @return
     */
    SysUser selectByUserId(Map param);
    /**
     * updateUser:修改用户. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    Integer updateUser(SysUser sysUser);

    /**
     * deleteUsers:删除用户. <br/>
     *
     * @author Jimmy
     * @param param
     * @return
     */
    Integer deleteUsers(Map param);

    /**
     * 根据角色id查询用户
     * @param sysUser
     * @return
     */
    List<SysUser> selectRoleUserByPage(SysUser sysUser);

}
