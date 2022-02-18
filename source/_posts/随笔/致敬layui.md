---
title: 致敬layui
date: 2021/09/27 14:12:30
tags: 随笔
categories: 随笔
excerpt: 今天登上layui官网逛了一逛，然后看到了layui即将关闭官网的公告，思虑良久。
---

<img data-src="/images/致敬layui/1.png" class="lozad" style="margin: 0 auto;width: 80%;"/>

<p style="text-indent:2em;">还记得第一次接触layui还是2018年5月份，当时我还未毕业，公司正在技术选型，因为公司绝大部分都是后端人员，我便推荐了layui。然后在5月底，公司买了layuiadmin，我们便开始看文档，学习layui。</p>

<p style="text-indent:2em;">后来发现layui有些功能还未开发，领导便让我去阅读源码，然后扩展layui的功能，比如一开始的表格只有复选框，没有单选框；比如离开当前页面时，记录表格的状态（搜索条件，滚动条位置等）；添加字体大小缩放功能，这个是使用rem替换所有的px实现的，替换的也很麻烦，所以后来我们也就很少升级了。</p>

<p style="text-indent:2em;">做完这些功能的时候感觉自己的能力也提升了不少，然后大概在18年9月份的时候开始尝试做树组件eleTree，第一个版本只是把功能做出来了，但是很多方法都没有向外暴漏，然后开始重写，根据elementUI的树组件文档功能对应到自己的组件，这时候从设计组件的使用方式到编写代码到完成功能一套走完感觉非常有成就感，之后不久layui推出了扩展组件，我便把eleTree发布上去了。随着用户使用的越来越多，bug也暴漏出来了，然后维护了两年多，这时候自己的能力也得到了很大的提升，便想着能不能移除layui和jquery的依赖，使用webpack打包的方式重写一次，然后我搜到了虚拟dom（snabbdom）插件，之后便开始再一次的重构。</p>

<p style="text-indent:2em;">这一次的代码重构可能是进步最快的一次，之前虽然学习了ES6和webpack的语法功能，但很少真正的用到项目中，这一次从webpack的配置到ES6 api的使用，到npm打包模块，vuepress编写文档，腾讯云cos加CDN部署页面等等。</p>

<p style="text-indent:2em;">在这期间我也修改了我们项目的layuiadmin框架，包括侧边栏导航添加切换子系统功能和添加横向导航栏功能等等。</p>

<p style="text-indent:2em;">layui是我真正使用的第一个UI框架，可以在当年bootstrap盛行的时候闯出一番天地，如今却在vue,react大环境下之下暗淡，可悲可敬。</p>