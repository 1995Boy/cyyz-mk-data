package com.chuangyun.modules.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.chuangyun.modules.sys.dao.SysRoleMenuDao;
import com.chuangyun.modules.sys.service.SysRoleMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 角色与菜单对应关系
 *
 * @author Jerry Yu
 * @date 2017年10月18日 上午9:44:35
 */
@Service("sysRoleMenuService")
public class SysRoleMenuServiceImpl implements SysRoleMenuService {
    @Autowired
    private SysRoleMenuDao sysRoleMenuDao;

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void saveOrUpdate(Long roleId, List<Long> menuIdList) {
        //先删除角色与菜单关系
        deleteBatch(new Long[]{roleId});

        if (menuIdList.size() == 0) {
            return;
        }

        //保存角色与菜单关系
        Map<String, Object> map = new HashMap<>(3);
        map.put("roleId", roleId);
        map.put("menuIdList", menuIdList);
        sysRoleMenuDao.save(map);
    }

    @Override
    public List<Long> queryMenuIdList(Long roleId) {
        return sysRoleMenuDao.queryMenuIdList(roleId);
    }

    @Override
    public void deleteBatch(Long[] roleIds) {
        sysRoleMenuDao.deleteBatch(roleIds);
    }

    @Override
    public void deleteBatchByMenuIds(Long[] menuIds) {
        sysRoleMenuDao.deleteBatchByMenuIds(menuIds);
    }

}
