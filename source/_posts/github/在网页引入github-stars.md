---
title: 网页引入github-stars和显示fork me on github
date: 2019/4/10 14:34:25
tags: 
    - github
categories: github
description: 逛网站的时候经常可以看到别人在页面嵌入自己的github项目的stars，和网页右上角显示fork me on github，并链接到项目，所以搜了一下记录下来。
---

#### 页面引入github-stars
1. 直接访问地址[https://img.shields.io/github/stars/hsiangleev/layuiExtend.svg](https://img.shields.io/github/stars/hsiangleev/layuiExtend.svg)，就可以看到图标了。
2. 其中把hsiangleev/layuiExtend字段换成自己的github名和仓库名就能看到自己的仓库stars数量了，stars换成forks，可以看到forks数量。
3. 地址后面还可以添加参数控制样式颜色之类的，具体配置可以看下网站[shields.io](https://shields.io/)

示例：<a class="no-line" href="https://github.com/hsiangleev/layuiExtend"><img class="no-increase inline" src="https://img.shields.io/github/stars/hsiangleev/layuiExtend.svg?style=social"/></a><a class="no-line" href="https://github.com/hsiangleev/layuiExtend"><img class="no-increase inline" src="https://img.shields.io/github/forks/hsiangleev/layuiExtend.svg?style=social"/></a>

------

#### 网站左上角或者右上角显示fork me on github

1. 使用：
```javascript
<a href="https://github.com/hsiangleev/layuiExtend">
    <img width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1">
</a>
```

2. 示例：<a href="https://github.com/hsiangleev/layuiExtend"><img width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149" class="attachment-full size-full no-increase" alt="Fork me on GitHub" data-recalc-dims="1"></a>

3. 更多使用可以看下[GitHub Ribbons](https://github.blog/2008-12-19-github-ribbons/)