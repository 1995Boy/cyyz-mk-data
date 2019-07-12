package com.chuangyun.modules.sys.service;


import com.chuangyun.modules.sys.entity.SysRoleEntity;

import java.util.List;
import java.util.Map;


/**
 * 角色
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public interface SysRoleService {

    /**
     * 根據id查詢角色信息
     *
     * @param roleId
     * @return
     */
    SysRoleEntity queryObject(Long roleId);

    /**
     * 根據條件查詢角色列表信息
     *
     * @param map
     * @return
     */
    List<SysRoleEntity> queryList(Map<String, Object> map);

    /**
     * 查询满足条件的角色列表总行数
     *
     * @param map
     * @return
     */
    int queryTotal(Map<String, Object> map);

    /**
     * 保存角色
     *
     * @param role
     */
    void save(SysRoleEntity role);


    /**
     * 更新角色
     *
     * @param role
     */
    void update(SysRoleEntity role);

    /**
     * 批量删除角色
     *
     * @param roleIds
     */
    void deleteBatch(Long[] roleIds);

    /**
     * 查询用户创建的角色ID列表
     *
     * @param createUserId
     * @return
     */
    List<Long> queryRoleIdList(Long createUserId);
}
