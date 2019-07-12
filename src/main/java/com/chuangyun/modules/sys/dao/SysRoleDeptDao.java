package com.chuangyun.modules.sys.dao;

import com.chuangyun.modules.sys.entity.SysRoleDeptEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author Jerry Yu
 * @date 2018/7/11 下午4:13
 */
@Mapper
public interface SysRoleDeptDao extends BaseDao<SysRoleDeptEntity> {
    /**
     * 根据角色id查询数据权限
     *
     * @param roleId
     * @return
     */
    List<Long> queryDeptIdList(Long roleId);
}
