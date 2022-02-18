---
title: uipath下载安装
date: 2019/11/07 09:05:30
tags: 
    - uipath
categories: uipath
description: 最近接到一个任务是通过程序简化重复录入流程。实际场景为财务需要向系统录入单子，流程是固定的，但是到年底是单子很多，人工录入非常耗时并且容易出错。主管让我看一个名为uipath的机器人流程自动化软件。
---


首先是下载软件我便下载了好久，因为我一开始进的是[中文官网](https://www.uipath.com.cn/)，中文官网和英文的好像有些区别，在中文官网点击试用的时候先选择的是社区版本，然后需要填写个人信息包括邮箱地址，软件下载方式发送到邮箱，但是我提交之后一直收不到邮箱，又试了一下企业试用版的也是一样收不到邮箱。

无奈之下进入[英文的网站](https://www.uipath.com)，，点击Start Trial之后，选择Community版本发现和中文不同的地方是需要登录，然后使用office账户登录之后在这里发现下载地址，**[社区版下载](https://download.uipath.com/beta/UiPathStudioSetup.exe)**<img data-src="/images/uipath下载安装/1.png" class="lozad"/>

下载完成双击安装，但是没有提示安装的路径，因为需要选择版本，我直接选择社区版，然后选择第一个先行版，然后就直接自动打开了软件，然后用win10的搜索uipath发现除了uipath studio还有一个uipath robot，到这里便安装完成了。

需要注意的是
1. 这个下载下来的是64位的软件，无法安装到32位的电脑
2. 安装的时候需要联网
3. 电脑的framework版本最低为4.6.1
4. 软件默认安装到了用户目录，即`C:\Users\...\AppData\Local\UiPath`