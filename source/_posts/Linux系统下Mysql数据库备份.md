---
title: Linux系统下Mysql数据库备份
date: 2023-11-08 15:32:56
categories: Linux
tags: 
- Linux
- Mysql
---

-- 备份Linux系统mysql数据库数据到Windows共享盘中

# 1、挂载Windows共享文件夹

确保两台机器能够ping通

##　1.1 创建挂载目录

```shell
mkdir /data/winback/POS
```

## 1.2 挂载windows共享文件夹

```shell
sudo mount -t cifs -o username=username,password=password //192.168.3.12/bk/pos /data/winback/POS
```

```
cifs是Common Internet File System，通用internet文件系统
username是windows用户名
password是windows密码
//192.168.3.12/bk/pos
/data/winback/POS/是linux上挂载的目录
```





# 2、修改mysql配置文件

注：小于5.6 版本请忽略

​	mysql5.6 以后密码不能写在命令行里，要配置在mysql配置文件里

```
在my.ini 或my.cnf中添加
[mysql]
user=root
password='root'

[mysqldump]
user=root
password='root'
```



# 3、创建备份脚本

这是网上找的，原链接找不到了

```shell
#!/bin/bash

#一：导出备份文件
#保存备份个数，备份7天数据
number=7
#挂载备份盘

#备份保存路径
backup_dir=/data/winback/POS
#日期
dd=`date +%Y-%m-%d-%H-%M-%S`
#备份工具
tool=mysqldump
#用户名
#username=root
#密码
#password=123456
#mysql5.6以后不允许在命令行里使用明文密码
#将要备份的数据库
database_name=dbname

#如果文件夹不存在则创建
if [ ! -d $backup_dir ];
then     
    mkdir -p $backup_dir;
fi

#导出备份文件
$tool --defaults-extra-file=/etc/my.cnf $database_name -R -E > $backup_dir/$database_name-$dd.sql

#写创建备份日志
echo "create $backup_dir/$database_name-$dd.dupm" >> $backup_dir/log.txt

#找出需要删除的备份
delfile=`ls -l -crt $backup_dir/*.sql | awk '{print $9 }' | head -1`

#判断现在的备份数量是否大于$number
count=`ls -l -crt $backup_dir/*.sql | awk '{print $9 }' | wc -l`

if [ $count -gt $number ]
then
  #删除最早生成的备份，只保留number数量的备份
  rm $delfile
  #写删除文件日志
  echo "delete $delfile" >> $backup_dir/log.txt
fi


```

# 4、开启计划任务自动执行

```
crontab -e
插入
00 23 *** /bin /sh  /data/winback/POS/PosBackup.sh
```

