package com.chuangyun.modules.sys.service;

import java.util.List;


/**
 * 用户与角色对应关系
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public interface SysUserRoleService {

    /**
     * 新增或更新用户与角色关系表
     *
     * @param userId
     * @param roleIdList
     */
    void saveOrUpdate(Long userId, List<Long> roleIdList);

    /**
     * 根据用户ID，获取角色ID列表
     *
     * @param userId
     * @return
     */
    List<Long> queryRoleIdList(Long userId);

    /**
     * 删除指定用户的角色权限
     *
     * @param userId
     */
    void delete(Long userId);

    /**
     * 根据用户id，批量删除用户角色对应关系信息
     *
     * @param userIds
     */
    void deleteBatch(Long[] userIds);

    /**
     * 根据角色id，批量删除用户角色对应关系信息
     *
     * @param roleIds
     */
    void deleteBatchByRoleIds(Long[] roleIds);
}
