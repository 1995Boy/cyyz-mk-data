package com.chuangyun.modules.sys.service;


import com.chuangyun.common.utils.R;
import com.chuangyun.modules.sys.entity.SysUserTokenEntity;

/**
 * 用户Token
 *
 * @author Jerry Yu
 * @date 2017-11-2 15:22:07
 */
public interface SysUserTokenService {

    /**
     * 根據用戶id，獲取token信息
     *
     * @param userId
     * @return
     */
    SysUserTokenEntity queryByUserId(Long userId);

    /**
     * 保存token信息
     *
     * @param token
     */
    void save(SysUserTokenEntity token);

    /**
     * 更新token信息
     *
     * @param token
     */
    void update(SysUserTokenEntity token);

    /**
     * 生成token
     *
     * @param userId 用户ID
     * @return
     */
    R createToken(long userId);

    /**
     * 退出，修改token值
     *
     * @param userId 用户ID
     */
    void logout(long userId);

}
