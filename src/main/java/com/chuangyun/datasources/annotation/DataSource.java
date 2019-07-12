package com.chuangyun.datasources.annotation;

import java.lang.annotation.*;

/**
 * 多数据源注解
 *
 * @author Jerry Yu
 * @date 2017/10/16 22:16
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataSource {
    String name() default "";
}
