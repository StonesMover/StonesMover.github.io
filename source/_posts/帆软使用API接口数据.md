---
title: 帆软使用API接口数据
date: 2023-11-08 11:59:53
tags: FineReport
categories: FineReport
---



1、[使用ecilpse 打开FineReport工程 ](https://help.fanruan.com/finereport/doc-view-745.html)

2、[程序数据集](https://help.fanruan.com/finereport/doc-view-650.html)



<!--more-->

```java
package com.fr.data;

import java.util.ArrayList;
import java.util.List;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

public class WeatherInfo extends SimpleTableData {

	/**
	 * 初始化列头
	 * 
	 * @return
	 */
	@Override
	public String[] initColumnNames() {
		return new String[] { "wea", "win", "win_speed", "tem_day", "tem_night" };
	}

    
	/**
	 * 加载行列数据
	 * 
	 * @return
	 */
	@Override
	public List<Object[]> loadData() {

		/**
		 * 访问免费天气API 接口 获取天气数据
		 * 
		 */
		String url = "https://v0.yiketianqi.com/free/day?appid=36978295&appsecret=4tAvI4fv&unescape=1";
		/**
		 * 获取返回值
		 * 
		 */
		String Content = HttpUtil.get(url);
		JSONObject jsonObject = JSONUtil.parseObj(Content);

		String wea = jsonObject.getStr("wea");
		String win = jsonObject.getStr("win").toString();
		String win_speed = jsonObject.getStr("win_speed");
		String tem_day = jsonObject.getStr("tem_day");
		String tem_night = jsonObject.getStr("tem_night");

		ArrayList<Object[]> valueList = new ArrayList();
		valueList.add(new Object[] { wea, win, win_speed, tem_day, tem_night });
		return valueList;
	}
}
```

