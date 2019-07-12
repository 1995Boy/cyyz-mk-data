package com.chuangyun.modules.sys.service;

import java.util.List;

/**
 * @author Jerry Yu
 * @date 2018/7/11 下午4:09
 */
public interface SysRoleDeptService {

    /**
     * 新增或修改
     *
     * @param roleId
     * @param deptIdList
     */
    void saveOrUpdate(Long roleId, List<Long> deptIdList);

    /**
     * 根据角色ID，获取部门ID列表
     *
     * @param roleId
     * @return
     */
    List<Long> queryDeptIdList(Long roleId);

    /**
     * 根据角色ID数组，批量删除
     *
     * @param roleIds
     * @return
     */
    int deleteBatch(Long[] roleIds);
}
