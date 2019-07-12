package com.chuangyun.modules.sys.dao;

import com.chuangyun.modules.sys.entity.SysRoleEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 角色管理
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
@Mapper
public interface SysRoleDao extends BaseDao<SysRoleEntity> {
	
	/**
	 * 查询用户创建的角色ID列表
	 * @param createUserId
	 * @return
	 */
	List<Long> queryRoleIdList(Long createUserId);
}
