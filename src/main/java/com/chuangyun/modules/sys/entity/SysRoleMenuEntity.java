package com.chuangyun.modules.sys.entity;


import java.io.Serializable;

/**
 * 角色与菜单对应关系
 *
 * @author Jerry Yu
 * @date 2017年11月1日 上午9:31:36
 */
public class SysRoleMenuEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 角色ID
     */
    private Long roleId;

    /**
     * 菜单ID
     */
    private Long menuId;

    /**
     * 设置：角色ID
     *
     * @param roleId 角色ID
     */
    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    /**
     * 获取：角色ID
     *
     * @return Long
     */
    public Long getRoleId() {
        return roleId;
    }

    /**
     * 设置：菜单ID
     *
     * @param menuId 菜单ID
     */
    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    /**
     * 获取：菜单ID
     *
     * @return Long
     */
    public Long getMenuId() {
        return menuId;
    }

}
