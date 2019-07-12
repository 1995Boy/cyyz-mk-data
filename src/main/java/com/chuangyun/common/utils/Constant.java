package com.chuangyun.common.utils;

/**
 * 常量
 *
 * @author Jerry Yu
 * @date 2017-10-29 23:30
 */
public class Constant {
	/**
	 * 超级管理员ID
	 */
	public static final int SUPER_ADMIN = 1;

	/**
	 * 用户ID
	 */
	public static final String USER_KEY = "userId";

	/**
	 * 菜单类型
	 *
	 * @author Jerry Yu
	 * @date 2017年10月15日 下午1:24:29
	 */
	public enum MenuType {
		/**
		 * 目录
		 */
		CATALOG(0),
		/**
		 * 菜单
		 */
		MENU(1),
		/**
		 * 按钮
		 */
		BUTTON(2);

		private int value;

		MenuType(int value) {
			this.value = value;
		}

		public int getValue() {
			return value;
		}
	}

	/**
	 * 定时任务状态
	 * 
	 * @author jerry
	 *
	 */
	public enum ScheduleStatus {
		/**
		 * 正常
		 */
		NORMAL(0),
		/**
		 * 暂停
		 */
		PAUSE(1);

		private int value;

		private ScheduleStatus(int value) {
			this.value = value;
		}

		public int getValue() {
			return value;
		}
	}
}
