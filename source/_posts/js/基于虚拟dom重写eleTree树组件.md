---
title: 基于虚拟dom重写eleTree树组件
date: 2020/07/08 14:23:05
tags: 
    - snabbdom
    - js
categories: js
description: 相较于1.0版本，eleTree2.0移除了jquery和layui的依赖，采用snabbdom插件重写树组件；采用webpack的方式，代码结构分离更清晰，并支持直接引入，layui模块引入，和npm的方式引入；采用后渲染的方式，即初始渲染时，只渲染展开的树节点，上万条数据无压力渲染。功能方面移除了节点拖拽功能，使用节点复制粘贴替换，新增单选功能，新增图标自定义功能。
---

**插件使用webpack构建，整体思路如下：**

1. build文件夹下为webpack配置目录，包含开发环境和生产环境的配置，即开发环境需要启动本地测试，生产环境直接生成代码，所以入口也不相同，开发环境入口为src/dev/index.js，里面包含测试代码
2. src/entry.js为插件入口，包含layui引入和设置全局遍历，通过es6的import引入可以在webpack的配置环境的output参数添加`libraryTarget: 'umd'`
3. src/index.js为树组件的定义目录，定义了thisTree类，然后通过`const eleTree = (opts) => methods.call(new thisTree(opts))`，向外暴漏唯一的变量，这段代码同时包含方法的调用，通过call修改methods对象中的this对象为当前thisTree类的实例
4. 在methods对象中调用不同的方法，再次修改方法中的this为当前thisTree类的实例，方法中的第一个参数为当前methods对象，这个是为了在该方法中返回当前methods对象，通过这个操作可以实现方法的链式调用，方法中的后续参数为调用时传入的参数，部分代码如下：
```javascript
// /src/index.js
const eleTree = (opts) => methods.call(new thisTree(opts))
// /src/methods/index.js
export default function() {
    //函数内部第一个参数为当前methods方法，后续参数为传入的参数，函数内部返回methods方法即可实现链式调用
    let methods = {
        on: (...args)=>on.call(this, methods, ...args),
        // ...
    }
    return methods
}
// /src/methods/其它js
export default function(methods, opts = {}) {
    // ...
    return methods
}
```
5. **自定义事件的处理**，首先通过methods方法on，获取需要监听的方法，保存到实例的eventList数组里面，然后在需要触发方法的地方执行emit触发相应的方法即可，例如`emit.call(thisTree, {v, type: 'checkbox', event})`（/src/event/nodeClick.js），emit内部的this依然为当前thisTree类的实例，然后传入不同的参数，on方法中的回调函数便可以使用这些参数
```javascript
// /src/dev/index.js
ele.on('checkbox', function(data) {
    console.log(this)
    console.log(data)
})
// /src/event/customEvent.js
export function on(methods, type, callback) {
    // 事件保存
    this.eventList[type] = callback
    return methods
}
export function emit({v, type, event, otherOpt}) {
    // 事件触发
    if(this.eventList[type]){
        let data = getCurrentNodeData.call(this, v)
        this.eventList[type].call(event, Object.assign({}, otherOpt, {data, type}))
    }
}
```
6. 其他文件夹，mock生成后台数据，方便测试，opera包含树的各种方法操作目录，public为公共文件夹，vnode为虚拟dom目录
7. 文档通过vuepress插件构建，代码在/docsBuild文件夹，/docs文件夹为文档生成目录


[在线文档](https://eletree.hsianglee.cn/)
[github源码](https://github.com/hsiangleev/eleTree)
