package com.chuangyun.modules.sys.service;

import java.util.List;


/**
 * 角色与菜单对应关系
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public interface SysRoleMenuService {

    /**
     * 新增或更新角色与菜单权限关系
     *
     * @param roleId
     * @param menuIdList
     */
    void saveOrUpdate(Long roleId, List<Long> menuIdList);

    /**
     * 根据角色ID，获取菜单ID列表
     *
     * @param roleId
     * @return
     */
    List<Long> queryMenuIdList(Long roleId);

    /**
     * 批量删除角色对应的菜单
     *
     * @param roleIds
     */
    void deleteBatch(Long[] roleIds);

    /**
     * 根据菜单id，批量删除角色、菜单对应信息
     *
     * @param menuIds
     */
    void deleteBatchByMenuIds(Long[] menuIds);
}
