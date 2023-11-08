---
title: crontab
date: 2023-11-08 14:21:53
tags: crontab
categories: Linux
excerpt: "linux crontab 计划任务"
---

linux crontab 计划任务



**安装crontab**

```shell
yum install crontabs 
```

<!--more-->

查看定时任务

```shell
crontab -l
```

**设置定时任务**

```shell
crontab -e
```



**查看crontab状态**

```shell
systemctl status crond.service
```

**启动crontab**

```shell
systemctl start crond.service
```

**关闭crontab**

```shell
systemctl stop crond.service
```

**重启crontab**

```shell
systemctl restart crond.service
```



每分钟执行一次

```shell
# 修改/添加定时任务
crontab -e
# 每分钟把hello world字符串写入/home/string.txt文件中
* * * * * echo "hello world" >> /home/string.txt
更多案例
# 修改/添加定时任务
crontab -e

# 每天3点执行
* 3 * * * 执行的语句

# 每天18点30分执行
30 18 * * * 执行的语句

# 每个月的1号的12点15分执行
15 12 1 * *  执行的语句

# 每年的3月1号的11点45分执行
45 11 1 3 * 执行的语句

# 每周三的16点30分执行
30 16 * * 3 执行的语句


# 第1列表示分钟1～59 每分钟用或者 /1表示 
# 第2列表示小时1～23（0表示0点） 
# 第3列表示日期1～31 
# 第4列表示月份1～12 
# 第5列标识号星期0～6（0表示星期天） 
# 第6列要运行的命令
```
