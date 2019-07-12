package com.chuangyun.modules.sys.controller;

import com.chuangyun.common.annotation.SysLog;
import com.chuangyun.common.exception.RRException;
import com.chuangyun.common.utils.R;
import com.chuangyun.modules.sys.entity.SysDeptEntity;
import com.chuangyun.modules.sys.service.SysDeptService;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 部門管理
 *
 * @author Jerry Yu
 * @date 2017年11月8日 下午2:18:33
 */
@RestController
@RequestMapping("/sys/dept")
public class SysDeptController extends AbstractController {
    @Autowired
    private SysDeptService sysDeptService;

    /**
     * 部门列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:dept:list")
    public List<SysDeptEntity> list() {
        List<SysDeptEntity> deptList = sysDeptService.queryList(new HashedMap());

        return deptList;
    }

    /**
     * 数据权限列表
     *
     * @return
     */
    @RequestMapping("/permission")
    @RequiresPermissions("sys:dept:list")
    public List<SysDeptEntity> permissionList() {
        List<SysDeptEntity> deptList = sysDeptService.queryPermissionList(new HashedMap());

        return deptList;
    }

    /**
     * 选择部门(添加、修改部门)
     */
    @RequestMapping("/select")
    @RequiresPermissions("sys:dept:select")
    public R select() {

        //查询列表数据
        @SuppressWarnings("unchecked")
        List<SysDeptEntity> deptList = sysDeptService.queryList(new HashedMap());

        //添加顶级部门
        SysDeptEntity root = new SysDeptEntity();
        root.setDeptId(0L);
        root.setName("公司");
        root.setParentId(-1L);
        root.setOpen(true);
        deptList.add(root);

        return R.ok().put("deptList", deptList);
    }

    /**
     * 部门信息
     */
    @RequestMapping("/info/{deptId}")
    @RequiresPermissions("sys:dept:info")
    public R info(@PathVariable("deptId") Long deptId) {
        SysDeptEntity dept = sysDeptService.queryObject(deptId);
        return R.ok().put("dept", dept);
    }

    /**
     * 保存
     */
    @SysLog("保存部门")
    @RequestMapping("/save")
    @RequiresPermissions("sys:dept:save")
    public R save(@RequestBody SysDeptEntity dept) {
        //数据校验
        verifyForm(dept);

        //校验是否存在
        if (sysDeptService.checkOrgCode(dept.getOrgCode()) > 0) {
            throw new RRException("组织编码已存在!");
        }

        sysDeptService.save(dept);

        return R.ok();
    }

    /**
     * 修改
     */
    @SysLog("修改部门")
    @RequestMapping("/update")
    @RequiresPermissions("sys:dept:update")
    public R update(@RequestBody SysDeptEntity dept) {
        //数据校验
        verifyForm(dept);

        sysDeptService.update(dept);

        return R.ok();
    }

    /**
     * 删除
     */
    @SysLog("删除部门")
    @RequestMapping("/delete")
    @RequiresPermissions("sys:dept:delete")
    public R delete(long deptId) {
        //判断是否有下级部门
        List<SysDeptEntity> deptList = sysDeptService.queryListParentId(deptId);
        if (deptList.size() > 0) {
            return R.error("请先删除下级部门");
        }

        sysDeptService.deleteBatch(new Long[]{deptId});

        return R.ok();
    }

    /**
     * 验证参数是否正确
     */
    private void verifyForm(SysDeptEntity dept) {
        if (StringUtils.isBlank(dept.getName())) {
            throw new RRException("部门名称不能为空");
        }

        if (dept.getParentId() == null) {
            throw new RRException("上级部门不能为空");
        }
    }
}
