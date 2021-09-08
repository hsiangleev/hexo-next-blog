---
title: mongodb数据导入导出
date: 2019/01/29 10:46:26
tags: mongodb
categories: mongodb
excerpt: mongodb数据导入导出记录
---


**进入mongodb的bin目录**

**1. 数据导出**
+ -d: 数据库名称
+ -c: 表名
+ -o: 存储路径
+ --type: 导出类型
+ -f: 导出的数据
`mongoexport -d test -c blog -o G:\users.json --type json -f  "_id,data,user"`

**2. 数据导入**
+ -d: 数据库名称
+ -c: 表名
+ --file: 路径
+ --type: 导出类型
`mongoimport -d test -c us --file G:\users.json --type json`