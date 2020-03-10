package com.sandnul.intf.security;

import com.sandnul.domain.security.SysUser;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/4
 * Description:用户接口
 */
public interface IUserService {
    /**
     * selectByUserId:根据用户id返回Users实例对象。 <br/>
     *
     * @author Jimmy
     * @param id
     * @return
     */
    public SysUser selectByUserId(Long id);

    /**
     * selectUsersByPage:分页查询用户. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    public List<SysUser> selectUsersByPage(SysUser sysUser);

    /**
     * selectUsersByPage:根据相关信息分页查询角色用户. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    public List<SysUser> selectRoleUserByPage(SysUser sysUser);
    /**
     * selectCount:根据相关条件查询用户总数. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    public Integer selectCount(SysUser sysUser);

    /**
     * insertUsers:新增用户. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    public int insertUser(SysUser sysUser);

    /**
     * selectCountByUserAccount:根据用户账号查询总数，校验是否有相同账号. <br/>
     *
     * @author Jimmy
     * @param userAccount
     * @param id
     * @return
     */
    public int selectCountByUserAccount(String userAccount, Long id);

    /**
     * updateUser:修改用户. <br/>
     *
     * @author Jimmy
     * @param sysUser
     * @return
     */
    public int updateUser(SysUser sysUser);

    /**
     * deleteUsers:删除用户. <br/>
     *
     * @author Jimmy
     * @param ids
     * @return
     */
    public int deleteUsers(String ids);
}
