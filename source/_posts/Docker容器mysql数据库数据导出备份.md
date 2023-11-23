---
title: Docker容器mysql数据库数据导出备份
date: 2023-11-23 09:17:13
categories: 笔记
tags: Linux
---

#### 查找mysql容器id

```shell
docker ps -aqf "name=mysql"
```

<!--more-->

#### 自动备份脚本

```shell

#!/bin/bash
 

#获取容器id
container_id=`/usr/bin/docker ps -aqf "name=mysql"`
 
echo "mysql的镜像ID is $container_id"
 
#登录用户名
mysql_user="xxx"
#登录密码(注意 如果密码包含特殊符号 前面要用'\')
mysql_password="xxx"
mysql_port="xxx"
#备份的数据库名
#mysql_database="db1"
#要备份的数据库名称，多个用空格分开隔开 如("db1" "db2" "db3")
backup_db_arr=("nacos_devtest" "tw_tm_dev_cloudt_auth" "tw_tm_dev_system" "tw_tm_dev_tw5" "tw_tm_dev_workflow") 
#backup_db_arr=("nacos_devtest")
# 是否删除过期数据
expire_backup_delete="true"
#过期天数
expire_days=7
 
# 备份文件存放地址(根据实际情况填写)
backup_location="/mnt/CRM/DB"
#定义备份详细时间
backup_time=`date +%Y%m%d%H%M`
#定义备份目录中的年月日时间
backup_Ymd=`date +%Y-%m-%d` 
#3天之前的日期
backup_3ago=`date -d '4 days ago' +%Y-%m-%d` 
#备份文件夹全路径
backup_dir=$backup_location/$backup_Ymd  
 
flag=`echo $?`
# 判断有没有定义备份的数据库，如果定义则开始备份，否则退出备份
if [ "$backup_db_arr" != "" ];then
 
		for dbname in ${backup_db_arr[@]}
		do
				echo "开始执行数据库 $dbname 备份..."
				`mkdir -p $backup_dir`
				# 备份指定数据库中数据

				`docker exec  $container_id mysqldump -uroot -pXXXXX -F -B  --default-character-set=utf8 $dbname > $backup_dir/bak-$dbname-$backup_time.sql`

				flag=`echo $?`
				if [ $flag == "0" ];then
						echo "数据库 $dbname 成功备份到 $backup_dir/bak-$dbname-$backup_time.sql"

				else
						echo "数据库 $dbname 备份失败!"
				fi

		done
else
		echo "没有待备份的数据库，停止数据库备份"
		exit
fi
 
 
# 删除过期数据
if [ "$expire_backup_delete" == "true" -a "$backup_dir"!="" ];then
        `find $backup_dir/ -type f -mtime +$expire_days | xargs rm -rf`
        echo "删除失效的数据库备份信息!"
fi
 
echo "所有的数据库已完成备份"
exit
fi
```

设置计划任务

```shell
crontab -e
30 23 * * * /mnt/CRM/DB/mysqlbackup.sh
```
