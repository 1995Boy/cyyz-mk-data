package com.chuangyun.modules.sys.service.impl;

import com.alibaba.fastjson.JSON;
import com.chuangyun.common.exception.RRException;
import com.chuangyun.modules.sys.dao.SysConfigDao;
import com.chuangyun.modules.sys.entity.SysConfigEntity;
import com.chuangyun.modules.sys.service.SysConfigService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
@Service("sysConfigService")
public class SysConfigServiceImpl implements SysConfigService {
    @Autowired
    private SysConfigDao sysConfigDao;

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void save(SysConfigEntity config) {
        sysConfigDao.save(config);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void update(SysConfigEntity config) {
        sysConfigDao.update(config);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void updateValueByKey(String key, String value) {
        sysConfigDao.updateValueByKey(key, value);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void deleteBatch(Long[] ids) {
        sysConfigDao.deleteBatch(ids);
    }

    @Override
    public List<SysConfigEntity> queryList(Map<String, Object> map) {
        return sysConfigDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return sysConfigDao.queryTotal(map);
    }

    @Override
    public SysConfigEntity queryObject(Long id) {
        return sysConfigDao.queryObject(id);
    }

    @Override
    public String getValue(String key) {
        SysConfigEntity config = sysConfigDao.queryByKey(key);

        return config == null ? null : config.getValue();
    }

    @Override
    public <T> T getConfigObject(String key, Class<T> clazz) {
        String value = getValue(key);
        if (StringUtils.isNotBlank(value)) {
            return JSON.parseObject(value, clazz);
        }

        try {
            return clazz.newInstance();
        } catch (Exception e) {
            throw new RRException("获取参数失败");
        }
    }

    @Override
    public String getValueByUserIdAndKey(Map<String, Object> map) {
        return sysConfigDao.getValueByUserIdAndKey(map);
    }

    @Override
    public boolean checkExist(SysConfigEntity config) {
        int count = sysConfigDao.checkExist(config);
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }
}
