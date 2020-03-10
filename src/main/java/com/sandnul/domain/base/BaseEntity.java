/**
 * Project Name:intf
 * File Name:BaseEntity.java
 * Package Name:com.entity
 * Date:2017年5月5日上午8:37:17
 * Copyright (c) 2017, 505074122@qq.com All Rights Reserved.
 *
 */

package com.sandnul.domain.base;

/**
 * ClassName:BaseEntity <br/>
 * Function: entity基类，放置分页查询的属性. <br/>
 * Date: 2017年5月5日 上午8:37:17 <br/>
 * 
 * @author Administrator
 */
public class BaseEntity {
	/**
	 * startIndex:数据查询起始行数.
	 */
	private int startIndex;
	/**
	 * maxCount:数据查询多少条.
	 */
	private int maxCount;
	/**
	 * sortorder:数据查询顺查询 逆查询 asc desc.
	 */
	private String sortorder;



	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getMaxCount() {
		return maxCount;
	}

	public void setMaxCount(int maxCount) {
		this.maxCount = maxCount;
	}

	public String getSortorder() {
		return sortorder;
	}

	public void setSortorder(String sortorder) {
		this.sortorder = sortorder;
	}

}
