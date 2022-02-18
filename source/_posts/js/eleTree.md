---
title: 基于layui的tree组件
date: 2019/2/28 14:23:05
tags: 
    - layui
    - js
categories: js
description: 仿照elementUI接口实现的基于layui的树组件
---

<p style="font-size: 18px;font-weight: 500;text-indent:2em;">因公司使用的是layui框架，而layui的树组件实现的功能太少，所以便想着自己实现一个，顺便练练手，期间因逻辑混乱代码重构过一次。</p>

#### 插件整体思路
1. 对外仅暴漏出eleTree接口，eleTree有两个方法，on方法是layui封装的事件机制，render方法为初始化，调用render方法时，初始化树,生成实例对象
2. thisTree为实例对象上对外的方法
3. Class为真正的构造函数，主体结构如下：
```javascript
var eleTree={
    on: function(events, callback){
        return layui.onevent.call(this, MOD_NAME, events, callback);
    },
    render: function(options) {
        var inst = new Class(options);
        return thisTree.call(inst);
    }
}

var thisTree=function() {
    var _self=this;
    var options = _self.config;

    // 暴漏外面的方法
    return {
        append: function(key,data) {
            if(options.data.length===0) return;
            return _self.append.call(_self,key,data);
        },
        // ...
    }
}

var Class=function(options) {
    // ...
};
Class.prototype={
    constructor: Class,
    append: function(key,data) {
        // ...
    }
    // ...
}
```

#### 代码执行过程
1. 当调用`var el=eleTree.render({})`的时候调用Class构造函数初始化树，执行`thisTree.call(inst);`，即执行thisTree函数，函数内部的this为inst实例对象，然后返回一个包含多个方法的对象
2. 所以返回值el为包含多个方法的对象
2. 当调用`el.append()`方法时，执行inst实例对象的append方法，即执行Class原型链上的append方法，append方法内部this还是inst实例对象

[在线文档](https://layuiextend.hsianglee.cn/eletree/)
[在线示例](https://layuiextend.hsianglee.cn/eletree/test.html)
[github源码](https://github.com/hsiangleev/layuiExtend)
