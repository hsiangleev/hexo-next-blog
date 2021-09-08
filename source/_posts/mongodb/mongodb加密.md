---
title: mongodb加密
date: 2019/01/29 10:46:25
tags: mongodb
categories: mongodb
excerpt: mongodb加密过程记录
---


**1. 切换到admin数据库**

`use admin`

**2. 管理员设置密码**

`db.createUser({user: "root",pwd: "123",roles: ["root"]})`

**3. 验证是否成功**

`db.auth("root","123")`

**4. 给其它数据库添加用户**

```bash
use test
db.createUser({user: "hsianglee",pwd: "123",roles: [{role: "readWrite",db: "test"}]})
```

**5. mongodb.config内容修改**

```bash
dbpath=F:\mongodb\data\db --auth
logpath=F:\mongodb\data\log\mongodb.log
```

**6. 重启服务**

`mongodb.exe --dbpath F:\mongodb\data\db --auth`

**7. node连接**

`mongodb://root:123@127.0.0.1:27017/test`

**8. 其它命令**

```bash
db.system.users.find()          # 查询已添加用户（切换到admin）
db.auth("root","123")           # 登录认证
db.dropUser("lee")              # 删除用户（先切换到当前数据库）
db.updateUser("test",{user: "",pwd: "", roles: [{role: "read",db: "test"}]})    # 修改权限
```