package com.chuangyun.modules.sys.service.impl;

import com.chuangyun.modules.sys.dao.SysDeptDao;
import com.chuangyun.modules.sys.entity.SysDeptEntity;
import com.chuangyun.modules.sys.entity.vo.DeptVO;
import com.chuangyun.modules.sys.service.SysDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 部门
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
@Service("SysDeptService")
public class SysDeptServiceImpl implements SysDeptService {
    @Autowired
    private SysDeptDao sysDeptDao;

    @Override
    public List<SysDeptEntity> queryList(Map<String, Object> map) {
        return sysDeptDao.queryList(map);
    }

    @Override
    public SysDeptEntity queryObject(Long deptId) {
        return sysDeptDao.queryObject(deptId);
    }

    @Override
    public void save(SysDeptEntity dept) {
        sysDeptDao.save(dept);
    }

    @Override
    public void update(SysDeptEntity dept) {
        sysDeptDao.update(dept);
    }

    @Override
    public List<SysDeptEntity> queryListParentId(long deptId) {
        return sysDeptDao.queryDeptListParentId(deptId);
    }

    @Override
    public void deleteBatch(Long[] deptIds) {
        sysDeptDao.deleteBatch(deptIds);
    }

    @Override
    public int checkOrgCode(String orgCode) {
        return sysDeptDao.checkOrgCode(orgCode);
    }

    @Override
    public List<SysDeptEntity> queryPermissionList(Map<String, Object> map) {
        return sysDeptDao.queryPermissionList(map);
    }

    @Override
    public List<DeptVO> queryAllPermissionList(Long userId) {
        return sysDeptDao.queryAllPermissionList(userId);
    }


}
