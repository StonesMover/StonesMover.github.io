---
title: Linux备份文件夹
date: 2023-11-22 16:16:32
categories: Linux
tags: Linux
---
#### 1、创建备份目标文件夹

```shell
mkdir /mnt/CRM
```

<!--more-->


#### 2、创建备份脚本

```shell
vim backup.sh
```

```shell
#!/bin/bash
#创建/root/bbb目录 用户存放备份文件
SOURCE_DIR=/home/pv/crm
DEST_DIR=/mnt/CRM/Files
#mkdir ${DEST_DIR}
#当前时间作为文件名
DATETIME=$(date +%Y-%m-%d_%H-%M-%S)
#将要备份的文件夹中内容复制到目标目录/home/bbb目录下
cp -r ${SOURCE_DIR} ${DEST_DIR}
#将复制过来的文件打包 并删除文件
cd ${DEST_DIR}
tar -zcvf ${DATETIME}.tar.gz ./
rm -rf ${DEST_DIR}/examxx
#删除该文件夹下超过2天的文件
find ${DEST_DIR} -mtime +2 -name "*.tar.gz" -exec rm -rf {} \;

```

[参考文章](https://blog.csdn.net/wangqing84411433/article/details/129632447?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522170062530416800186563739%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=170062530416800186563739&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-4-129632447-null-null.nonecase&utm_term=linux%E6%89%93%E5%8C%85%E5%A4%87%E4%BB%BD%E6%96%87%E4%BB%B6%E5%A4%B9&spm=1018.2226.3001.4450)

3、赋予执行权限

```shell
chmod 700 backup.sh
```

4、设置计划任务每天自动备份

```shell
crontab -e
插入
00 23 *** /bin /sh  /mnt/CRM/Files/backup.sh
```
