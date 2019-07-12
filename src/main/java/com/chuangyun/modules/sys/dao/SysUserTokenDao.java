package com.chuangyun.modules.sys.dao;

import com.chuangyun.modules.sys.entity.SysUserTokenEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 系统用户Token
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
@Mapper
public interface SysUserTokenDao extends BaseDao<SysUserTokenEntity> {

    /**
     * 根據用戶id，获取token信息
     * @param userId
     * @return
     */
    SysUserTokenEntity queryByUserId(Long userId);

    /**
     * 根据token，获取用户token信息
     * @param token
     * @return
     */
    SysUserTokenEntity queryByToken(String token);
	
}
