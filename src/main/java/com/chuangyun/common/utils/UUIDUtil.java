package com.chuangyun.common.utils;

import java.util.UUID;

/**
 * @author Jerry
 * Created by jerry on 6/27/17.
 */
public class UUIDUtil {
    public static String generateId() {
        return UUID.randomUUID().toString().replace("-", "").toUpperCase();
    }

    public static String dateTime() {
        String datePath = DateUtils.formatToString(new java.util.Date(), "yyyy-MM-dd");
        String timePath = DateUtils.formatToString(new java.util.Date(), "HHmmssSSS");

        return datePath.replaceAll("-", "") + timePath;

    }
}
