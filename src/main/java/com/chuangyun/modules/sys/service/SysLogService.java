package com.chuangyun.modules.sys.service;


import com.chuangyun.modules.sys.entity.SysLogEntity;

import java.util.List;
import java.util.Map;

/**
 * 系统日志
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public interface SysLogService {

    /**
     * 根据id查询日志信息
     * @param id
     * @return
     */
    SysLogEntity queryObject(Long id);

    /**
     * 根据条件查询日志信息
     * @param map
     * @return
     */
    List<SysLogEntity> queryList(Map<String, Object> map);

    /**
     * 根据条件查询日志条数
     * @param map
     * @return
     */
    int queryTotal(Map<String, Object> map);

    /**
     * 新增日志
     * @param sysLog
     */
    void save(SysLogEntity sysLog);

    /**
     * 根据id删除日期
     * @param id
     */
    void delete(Long id);

    /**
     * 批量删除日志
     * @param ids
     */
    void deleteBatch(Long[] ids);
}
