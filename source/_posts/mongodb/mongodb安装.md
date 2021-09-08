---
title: mongodb安装
date: 2019/01/29 10:46:27
tags: mongodb
categories: mongodb
excerpt: mongodb安装记录
---


**1. 进入mongodb\bin目录 =>cmd**

**2. 在mongodb目录创建 \data\db**

**3. cmd执行`mongod.exe --dbpath=D:\mongodb\data\db`**

**4. 在mongodb目录创建 \data\log**

**5. cmd执行 `mongod.exe --logpath=D:\mongodb\data\log\mongodb.log`**

**6. 在mongodb目录创建配置文件（mongodb.config）**

**7. 配置文件内容 **

```bash
dbpath=D:\mongodb\data\db
logpath=D:\mongodb\data\log\mongodb.log
```
**8. 执行 `mongod.exe --config D:\mongodb\mongodb.config`**

**9. 添加到服务 （servies.msc）**

```bash
mongod.exe --dbpath=D:\mongodb\data\db --logpath=D:\mongodb\data\log\log.txt --install --serviceName "MongoDB"
```

**10. 开启关闭服务**

```bash
net start mongodb
net stop mongodb
sc delete "MongoDB"     # 删除服务
```