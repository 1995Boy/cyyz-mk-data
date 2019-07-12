package com.chuangyun.modules.sys.controller;

import com.chuangyun.modules.sys.entity.SysUserEntity;
import com.chuangyun.modules.sys.service.SysConfigService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller公共组件
 *
 * @author Jerry YU
 * @date 2017年11月9日 下午9:42:26
 */
public abstract class AbstractController {
    @Autowired
    private SysConfigService sysConfigService;

    protected SysUserEntity getUser() {
        return (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
    }

    protected Long getUserId() {
        return getUser().getUserId();
    }

    /**
     * 获取阈值
     *
     * @return
     */
    protected String getThreshold(String THRESHOLD_KEY) {
        Map<String, Object> params = new HashMap<>(2);
        //添加部门信息
        params.put("deptId", getUser().getDeptId());

        params.put("key", THRESHOLD_KEY);

        //根据userId、参数的key查询阈值
        return sysConfigService.getValueByUserIdAndKey(params);
    }
}
