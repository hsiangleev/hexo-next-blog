---
title: uipath studio编辑器介绍与使用
date: 2019/11/07 10:17:15
tags: 
    - uipath
categories: uipath
# description: 
excerpt: uipath初学记录
---

打开编辑器默认为英文，可以改为中文，点击`settings=>general=>language`，选择中文简体，改完之后需要重启编辑器，但是改为中文之后里面所有的activities都会变成中文的，搜索的时候不太好搜，所以我便没有改。

在start的右边new process下面的process，选择项目名称和路径就可以创建了项目了，编辑器对应的功能如下图<img data-src="/images/uipath studio编辑器介绍与使用/1.png" class="lozad"/>

[studio官方文档](https://docs.uipath.com/studio/lang-zh_CN/docs)，所有的活动在文档里面基本都能搜到，列举一些常用的活动：
1. Assign: 变量赋值，例如把某个值赋给某个变量
2. Click: 鼠标单击操作
3. Double Click: 鼠标双击操作
4. Type Into: input框输入
5. Delay: 延时
6. Send HotKey: 键盘按键
7. Message Box: 编辑器弹窗，测试使用

excel相关常用活动：
1. Excel Application Scope: 类似一个包装，excel的相关操作都要放到这个里面，需要填写的是excel路径
2. Read Range: 读取excel的某个表，输出的数据类型为DataTable类型
3. For Each Row: 遍历DataTable类型的数据取值，如row("表头")
4. Write Range: 数据写入excel