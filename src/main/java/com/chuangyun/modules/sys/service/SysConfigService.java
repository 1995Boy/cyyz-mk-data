package com.chuangyun.modules.sys.service;


import com.chuangyun.modules.sys.entity.SysConfigEntity;

import java.util.List;
import java.util.Map;

/**
 * 系统配置信息
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public interface SysConfigService {


    /**
     * 保存配置信息
     *
     * @param config
     */
    public void save(SysConfigEntity config);

    /**
     * 更新配置信息
     *
     * @param config
     */
    public void update(SysConfigEntity config);

    /**
     * 根据key，更新value
     *
     * @param key
     * @param value
     */
    public void updateValueByKey(String key, String value);

    /**
     * 删除配置信息
     *
     * @param ids
     */
    public void deleteBatch(Long[] ids);

    /**
     * 获取List列表
     *
     * @param map
     * @return
     */
    public List<SysConfigEntity> queryList(Map<String, Object> map);

    /**
     * 获取总记录数
     *
     * @param map
     * @return
     */
    public int queryTotal(Map<String, Object> map);

    /**
     * 根据id查询
     *
     * @param id
     * @return
     */
    public SysConfigEntity queryObject(Long id);

    /**
     * 根据key，获取配置的value值
     *
     * @param key key
     * @return
     */
    public String getValue(String key);

    /**
     * 根据key，获取value的Object对象
     *
     * @param key   key
     * @param clazz Object对象
     * @return
     */
    public <T> T getConfigObject(String key, Class<T> clazz);

    /**
     * 获取当前用户拥有的数据权限
     *
     * @param map
     * @return
     */

    public String getValueByUserIdAndKey(Map<String, Object> map);

    /**
     * 检查是否重复
     *
     * @param config
     * @return
     */
    boolean checkExist(SysConfigEntity config);
}
