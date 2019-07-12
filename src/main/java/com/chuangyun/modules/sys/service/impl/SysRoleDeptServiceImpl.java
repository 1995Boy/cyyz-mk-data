package com.chuangyun.modules.sys.service.impl;

import com.chuangyun.modules.sys.dao.SysRoleDeptDao;
import com.chuangyun.modules.sys.service.SysRoleDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Jerry Yu
 * @date 2018/7/11 下午4:10
 */
@Service("sysRoleDeptService")
public class SysRoleDeptServiceImpl implements SysRoleDeptService {
    @Autowired
    SysRoleDeptDao sysRoleDeptDao;


    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void saveOrUpdate(Long roleId, List<Long> deptIdList) {
        //先删除角色与部门关系
        deleteBatch(new Long[]{roleId});

        if (deptIdList.size() == 0) {
            return;
        }

        //保存角色与部门关系
        Map<String, Object> map = new HashMap<>(3);
        map.put("roleId", roleId);
        map.put("deptIdList", deptIdList);
        sysRoleDeptDao.save(map);
    }

    @Override
    public List<Long> queryDeptIdList(Long roleId) {
        return sysRoleDeptDao.queryDeptIdList(roleId);
    }

    @Override
    public int deleteBatch(Long[] roleIds) {
        return sysRoleDeptDao.deleteBatch(roleIds);
    }
}
