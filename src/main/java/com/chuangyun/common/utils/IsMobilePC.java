package com.chuangyun.common.utils;

import javax.servlet.http.HttpServletRequest;

/**
 * @auther: LaoJi
 * @date: 2019/4/4 17:09
 * @Description:
 */
public class IsMobilePC {
    public static boolean isMobileDevice(HttpServletRequest request) {
        String requestHeader = request.getHeader("user-agent");
        String[] deviceArray = new String[] {"android","mac os","windows phone"};
        if(requestHeader==null) {
            return false;
        }
        requestHeader = requestHeader.toLowerCase();
        for (String device:deviceArray) {
            if(requestHeader.indexOf(device)!=-1) {
                return true;
            }
        }
        return false;
    }
}
