package com.chuangyun.modules.sys.service;


import com.chuangyun.modules.sys.entity.SysMenuEntity;

import java.util.List;
import java.util.Map;


/**
 * 菜单管理
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public interface SysMenuService {

    /**
     * 根据父菜单，查询子菜单
     *
     * @param parentId   父菜单ID
     * @param menuIdList 用户菜单ID
     * @return
     */
    List<SysMenuEntity> queryListParentId(Long parentId, List<Long> menuIdList);

    /**
     * 根据父菜单，查询子菜单
     *
     * @param parentId 父菜单ID
     * @return
     */
    List<SysMenuEntity> queryListParentId(Long parentId);

    /**
     * 获取不包含按钮的菜单列表
     *
     * @return
     */
    List<SysMenuEntity> queryNotButtonList();

    /**
     * 获取用户菜单列表
     *
     * @param userId
     * @return
     */
    List<SysMenuEntity> getUserMenuList(Long userId);

    /**
     * 查询菜单
     *
     * @param menuId
     * @return
     */
    SysMenuEntity queryObject(Long menuId);

    /**
     * 查询菜单列表
     *
     * @param map
     * @return
     */
    List<SysMenuEntity> queryList(Map<String, Object> map);

    /**
     * 查询总数
     *
     * @param map
     * @return
     */
    int queryTotal(Map<String, Object> map);

    /**
     * 保存菜单
     *
     * @param menu
     */
    void save(SysMenuEntity menu);

    /**
     * 修改
     *
     * @param menu
     */
    void update(SysMenuEntity menu);

    /**
     * 删除
     *
     * @param menuIds
     */
    void deleteBatch(Long[] menuIds);

    /**
     * 查询用户的权限列表
     *
     * @param userId
     * @return
     */
    List<SysMenuEntity> queryUserList(Long userId);
}
