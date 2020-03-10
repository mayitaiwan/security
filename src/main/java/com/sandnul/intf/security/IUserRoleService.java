package com.sandnul.intf.security;

import com.sandnul.domain.security.SysUserRole;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/8
 * Description:用户角色接口
 */
public interface IUserRoleService {
     /**
      * 根据用户id设置用户角色
      * @param userRoleList
      * @param userId
      * @param delRoleIds
      * @return
      */
     int setUserRoles(List<SysUserRole> userRoleList, Long userId, String delRoleIds) ;

     /**
      * 根据角色id设置用户角色
      * @param userRoleList
      * @param roleId
      * @param delUserIds
      * @return
      */
     int setRoleUsers(List<SysUserRole> userRoleList, Long roleId, String delUserIds) ;

}

