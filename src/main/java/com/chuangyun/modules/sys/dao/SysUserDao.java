package com.chuangyun.modules.sys.dao;

import com.chuangyun.modules.sys.entity.SysUserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 系统用户
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
@Mapper
public interface SysUserDao extends BaseDao<SysUserEntity> {

    /**
     * 查询用户的所有权限
     *
     * @param userId 用户ID
     * @return
     */
    List<String> queryAllPerms(Long userId);

    /**
     * 查询用户的所有菜单ID
     *
     * @param userId
     * @return
     */
    List<Long> queryAllMenuId(Long userId);

    /**
     * 根据用户名，查询系统用户
     *
     * @param username
     * @return
     */
    SysUserEntity queryByUserName(String username);

    /**
     * 修改密码
     *
     * @param map
     * @return
     */
    int updatePassword(Map<String, Object> map);

    /**
     * 查询手机号是否已经被使用
     *
     * @param mobile
     * @return
     */
    int queryCountByMobile(String mobile);
}
