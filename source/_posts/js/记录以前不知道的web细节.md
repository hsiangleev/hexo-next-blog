---
title: 记录以前不知道的web细节
date: 2019/6/13 9:44:23
tags: 
    - js
    - css
categories: js
description: 滚动条中移除event.preventDefault()的方法，css设置margin百分比，line-height百分比和数字值的区别
---

### 移除event.preventDefault()
---
1. 如果一个事件中有时需要调用`event.preventDefault()`取消浏览器默认事件，有时又不需要调用
2. 比如自定义滚动条，当滚动条还没有滚动到最顶端或者最底端时，需要调用`event.preventDefault()`取消浏览器默认事件，不然会出现自定义滚动条和最外层document的滚动条同时滚动
3. 而当滚动条滚动到最顶端或者最底端时，自定义滚动条已经不能滚动了，则需要让最外层document的滚动条滚动，便需要移除`event.preventDefault()`
4. 解决方法便是取消当前事件的绑定，示例代码：
```javascript
var f=function(e) {
    // ...
    // 滚动到最大最小时，重新绑定事件，相当于移除preventDefault
    if(that.current >= that.maxCurrent || that.current <= 0){
        that.wrapEl.off("mousewheel DOMMouseScroll", f).on("mousewheel DOMMouseScroll", f);
    }else{
        e.preventDefault();
    }
}
this.wrapEl.on("mousewheel DOMMouseScroll", f);         // 给dom添加滚动事件
```

5. [滚动条示例](https://layuiextend.hsianglee.cn/scrollbar/)

### css margin百分比
---
1. 可以对margin设置百分比，但是是相对于父元素的宽度的百分比，示例代码：
```javascript
// div {width: 400px;height: 200px;outline: 1px solid #ccc}
// p{margin: 10%;display: inline-block;padding: 10%}
<div>
    <p>aaa</p>
</div>
```
2. 设置如上则可以看到p的margin全部为40px，而不是左右40px上下20px，padding同理
<img data-src="/images/记录以前不知道的web细节/1.png" class="lozad" style="margin: 0 auto;"/>


### css line-height百分比和数字值的区别
---
1. line-height设置数字值时，子元素会继承这个数字，所以子元素的line-height值为这个数字乘以子元素的font-size
2. line-height设置百分比时，元素会先计算出值，即百分比乘以元素的font-size，然后把这个值继承给子元素
3. 示例：
```javascript
// div {width: 400px;height: 200px;outline: 1px solid #ccc;font-size: 30px;}
// p{margin: 0;display: inline-block;padding: 0;background: #ddd;font-size:15px;}
// .test1{line-height: 150%;}
// .test2{line-height: 1.5;}

// p的line-height为：150% * 30
<div class="test1">
    <p>aaa</p>
</div>
// p的line-height为：1.5 * 15
<div class="test2">
    <p>aaa</p>
</div>
```
4. 结果如图：
<img data-src="/images/记录以前不知道的web细节/2.png" class="lozad" style="margin: 0 auto;"/>


### js判断进入当前页面的方式
---
`performance.navigation.type`
1. 如果等于0，则为直接进入页面
2. 如果等于1，则是在本页面刷新进入的
3. 如果等于2，则是通过后退进入本页面的


### 表格边框css属性
---
`border-collapse`：CSS 属性是用来决定表格的边框是分开的还是合并的。
1. separate: 分隔模式(默认)，在分隔模式下，相邻的单元格都拥有独立的边框。
2. collapse: 合并模式，在合并模式下，相邻单元格共享边框。

`border-spacing`：指定相邻单元格边框之间的距离（只适用于 separate分隔模式 ）。


### 解决ios使用history.back()后退页面不刷新的bug
---
```javascript
var browserRule = /^.*((iPhone)|(iPad)|(Safari))+.*$/;
if (browserRule.test(navigator.userAgent)) {
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload()
        }
    };
}
```

### 解决ios使用fixes定位，input失去焦点时无法再次选中的bug
---
直接给input添加一个blur事件，执行window.scroll(0, 0)，手动把浏览器滚动到最上面