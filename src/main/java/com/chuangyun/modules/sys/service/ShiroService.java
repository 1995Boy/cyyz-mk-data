package com.chuangyun.modules.sys.service;


import com.chuangyun.modules.sys.entity.SysUserEntity;
import com.chuangyun.modules.sys.entity.SysUserTokenEntity;

import java.util.Set;

/**
 * shiro相关接口
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public interface ShiroService {
    /**
     * 获取用户权限列表
     * @param userId
     * @return
     */
    Set<String> getUserPermissions(long userId);

    /**
     * 查詢token是否存在
     * @param token
     * @return
     */
    SysUserTokenEntity queryByToken(String token);

    /**
     * 根据用户ID，查询用户
     * @param userId
     * @return
     */
    SysUserEntity queryUser(Long userId);
}
