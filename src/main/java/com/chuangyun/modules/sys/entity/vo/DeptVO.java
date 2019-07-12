package com.chuangyun.modules.sys.entity.vo;

import java.io.Serializable;

/**
 * @author Jerry Yu
 * @date 2018/7/18 下午10:54
 */
public class DeptVO implements Serializable {
    private String orgCode;

    private String orgName;

    private String rights;

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getRights() {
        return rights;
    }

    public void setRights(String rights) {
        this.rights = rights;
    }

    @Override
    public String toString() {
        return "DeptVO{" +
                "orgCode='" + orgCode + '\'' +
                ", orgName='" + orgName + '\'' +
                ", rights='" + rights + '\'' +
                '}';
    }
}
