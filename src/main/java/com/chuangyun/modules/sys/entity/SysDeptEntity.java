package com.chuangyun.modules.sys.entity;

import java.io.Serializable;
import java.util.List;

/**
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public class SysDeptEntity implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = -8125713848147773363L;

    /**
     * 部門Id
     */
    private Long deptId;

    /**
     * 父节点Id
     */
    private Long parentId;

    /**
     * 组织编码
     */
    private String orgCode;

    /**
     * 上级部门名称
     */
    private String parentName;

    /**
     * 部门名称
     */
    private String name;

    /**
     * ztree属性
     */
    private Boolean open;

    private List<?> list;

    public Long getDeptId() {
        return deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getOpen() {
        return open;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

    public List<?> getList() {
        return list;
    }

    public void setList(List<?> list) {
        this.list = list;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }
}
