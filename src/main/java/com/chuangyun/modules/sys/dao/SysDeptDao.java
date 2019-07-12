package com.chuangyun.modules.sys.dao;

import com.chuangyun.modules.sys.entity.SysDeptEntity;
import com.chuangyun.modules.sys.entity.vo.DeptVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
@Mapper
public interface SysDeptDao extends BaseDao<SysDeptEntity> {
    /**
     * 查询上级部门deptId的部门列表
     *
     * @param deptId
     * @return
     */
    List<SysDeptEntity> queryDeptListParentId(long deptId);

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
