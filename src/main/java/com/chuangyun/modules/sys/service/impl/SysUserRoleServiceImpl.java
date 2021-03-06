package com.chuangyun.modules.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.chuangyun.modules.sys.dao.SysUserRoleDao;
import com.chuangyun.modules.sys.service.SysUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 用户与角色对应关系
 *
 * @author Jerry Yu
 * @date 2017年10月18日 上午9:45:48
 */
@Service("sysUserRoleService")
public class SysUserRoleServiceImpl implements SysUserRoleService {
    @Autowired
    private SysUserRoleDao sysUserRoleDao;

    @Override
    public void saveOrUpdate(Long userId, List<Long> roleIdList) {
        //先删除用户与角色关系
        sysUserRoleDao.delete(userId);

        if (roleIdList.size() == 0) {
            return;
        }

        //保存用户与角色关系
        Map<String, Object> map = new HashMap<>(3);
        map.put("userId", userId);
        map.put("roleIdList", roleIdList);
        sysUserRoleDao.save(map);
    }

    @Override
    public List<Long> queryRoleIdList(Long userId) {
        return sysUserRoleDao.queryRoleIdList(userId);
    }

    @Override
    public void delete(Long userId) {
        sysUserRoleDao.delete(userId);
    }

    @Override
    public void deleteBatch(Long[] userIds) {
        sysUserRoleDao.deleteBatch(userIds);
    }

    @Override
    public void deleteBatchByRoleIds(Long[] roleIds) {
        sysUserRoleDao.deleteBatchByRoleIds(roleIds);
    }
}
