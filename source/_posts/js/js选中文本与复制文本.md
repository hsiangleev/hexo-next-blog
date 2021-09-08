---
title: js选中文本和复制文本
date: 2019/3/1 16:16:12
tags: js
categories: js
description: 通过js代码选中页面的dom元素，和复制页面选中的文本
---

### Selection
------

`var selection = window.getSelection();`
selection 是一个 Selection 对象。 如果想要将 selection 转换为字符串，可通过连接一个空字符串（""）或使用 String.toString() 方法。即`selection+""`或者`selection.toString()`会返回页面中选中的文本

### Range
------

被选中的文字会对应一个range对象，代表选中的区域，通过`window.getSelection().getRangeAt(0)`代表第一个被选中的区域，也可以通过`document.createRange()`创建一个选中区域，`range.selectNodeContents(el)`将dom节点添加到range对象，`selection.addRange(range)`将range添加到文本选中区，`selection.removeAllRanges()`为取消选中的文本。执行下面的代码会选中页面的第一个p元素。
```javascript
var el = document.querySelector("p");
var selection = window.getSelection();
var range = document.createRange();
range.selectNodeContents(el);
selection.addRange(range);
```

### execCommand 方法允许运行命令来操纵可编辑内容区域的元素。
------

`bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument);`
1. aCommandName: 一个 DOMString ，命令的名称。
2. aShowDefaultUI: 一个 Boolean， 是否展示用户界面，一般为 false。
3. aValueArgument: 一些命令（例如insertImage）需要额外的参数（insertImage需要提供插入image的url），默认为null。
4. 返回值bool为布尔值，如果是 false 则表示操作不被支持或未被启用，执行`document.execCommand('Copy', 'false', null);`会复制页面选中的文本


### 示例（点击按钮复制p文本内容）
------

```javascript
// 页面dom元素
<p>aaa</p>
<button>复制</button>

// js代码
document.querySelector("button").onclick=function() {
    var el = document.querySelector("p");
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('Copy', 'false', null);
    selection.removeAllRanges();
}
```