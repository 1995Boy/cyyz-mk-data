package com.chuangyun.modules.sys.service;

import com.chuangyun.modules.sys.entity.SysDeptEntity;
import com.chuangyun.modules.sys.entity.vo.DeptVO;

import java.util.List;
import java.util.Map;

/**
 * 部门
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public interface SysDeptService {

    /**
     * 查询部门列表
     *
     * @param map
     * @return
     */
    List<SysDeptEntity> queryList(Map<String, Object> map);

    /**
     * 查询部門
     *
     * @param deptId
     * @return
     */
    SysDeptEntity queryObject(Long deptId);

    /**
     * 保存部门信息
     *
     * @param dept
     */
    void save(SysDeptEntity dept);

    /**
     * 修改部门信息
     *
     * @param dept
     */
    void update(SysDeptEntity dept);

    /**
     * 查询是否是上级部门单位
     *
     * @param deptId
     * @return
     */
    List<SysDeptEntity> queryListParentId(long deptId);

    /**
     * 删除部门
     *
     * @param deptIds
     */
    void deleteBatch(Long[] deptIds);

    /**
     * 检查组织编码
     *
     * @param orgCode
     * @return
     */
    int checkOrgCode(String orgCode);

    /**
     * 获取数据权限的组织单位
     *
     * @param map
     * @return
     */
    List<SysDeptEntity> queryPermissionList(Map<String, Object> map);

    /**
     * 获取全部数据权限
     *
     * @param userId
     * @return
     */
    List<DeptVO> queryAllPermissionList(Long userId);
}
