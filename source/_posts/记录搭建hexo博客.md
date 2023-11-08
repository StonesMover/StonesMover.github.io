---
title: 记录搭建hexo博客
date: 2023-11-08 09:03:56
categories: 笔记
tags: hexo
---

# 前言
希望搭建此博客，记录每次所经之事

# 使用 Hexo
家里有一台矿渣我家云，我用docker部署了halo博客，无奈1G内存的机器，一会就跑满了，而且还要内网穿透，算了还是只把它当成下载机吧。
Hexo 虽然有点麻烦，但是可以放到Githu上。就选它了

# Github
## 新建仓库

在Github 中新建仓库，仓库名称  **xxx.github.io**  xxx是自己的github账号
<!--more-->
## 创建新的分支

由于上班回家两台终端，所以创建一个新的分支 hexo 存放博客源文件
master 分支 存放生成的网页文件

{% asset_img newbranch.jpg This is an test image %}

# 安装 Node.js

下载地址：[这里](https://nodejs.org/en/download/)

配置环境变量

命令行 node -v  检查是否安装成功

命令行 npm -v  检查是否安装成功

# 安装 Git



# 安装Hexo

## 搭建hexo



新建一个空的文件夹，进入文件夹，右键 Git Bash Here

```js
npm install -g hexo-cli
```

初始化

```js
Hexo init
```

新建一篇博客

```
hexo new "First"   # 新建一个名为First的博客
```

生成网页

```js
hexo clean
hexo g
hexo s
```

浏览器打开 localhost:4000 就可以看到博客了



## 主题配置美化

[参考链接](https://blog.csdn.net/sywdebug/article/details/113942047?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522169942639516800182710783%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=169942639516800182710783&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~sobaiduend~default-2-113942047-null-null.nonecase&utm_term=hexo%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE%E7%BE%8E%E5%8C%96&spm=1018.2226.3001.4450)











