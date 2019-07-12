package com.chuangyun.modules.sys.dao;

import java.util.List;
import java.util.Map;

/**
 * 基础Dao(还需在XML文件里，有对应的SQL语句)
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public interface BaseDao<T> {

    /**
     * 新增
     *
     * @param t
     */
    void save(T t);

    /**
     * 根据map选择性新增
     *
     * @param map
     */
    void save(Map<String, Object> map);

    /**
     * 批量新增
     *
     * @param list
     */
    void saveBatch(List<T> list);

    /**
     * 更新
     *
     * @param t
     * @return
     */
    int update(T t);

    /**
     * 选择性更新
     *
     * @param map
     * @return
     */
    int update(Map<String, Object> map);

    /**
     * 更具主键id删除
     *
     * @param id
     * @return
     */
    int delete(Object id);

    /**
     * 选择性删除
     *
     * @param map
     * @return
     */
    int delete(Map<String, Object> map);

    /**
     * 根据主键id集合，批量删除
     *
     * @param id
     * @return
     */
    int deleteBatch(Object[] id);

    /**
     * 查询
     *
     * @param id
     * @return
     */
    T queryObject(Object id);


    /**
     * 选择性查询
     *
     * @param map
     * @return
     */
    List<T> queryList(Map<String, Object> map);

    /**
     * 查询
     *
     * @param id
     * @return
     */
    List<T> queryList(Object id);

    /**
     * 根据条件查询行数
     *
     * @param map
     * @return
     */
    int queryTotal(Map<String, Object> map);

    /**
     * 查询全部行数
     *
     * @return
     */
    int queryTotal();
}
