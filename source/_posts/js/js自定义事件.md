---
title: js自定义事件
date: 2019/5/13 14:34:56
tags: 
    - js
categories: js
description: 仿照layui的自定义事件封装框架，需求是给一个dom节点添加子节点input和button，点击按钮，如果前一个input的值是数字，则执行回调函数，否则，不执行回调函数。
---

**1. html如下：**

---
```javascript
<div class="test1" lay-filter="data1"></div>
<div class="test2" lay-filter="data2"></div>
```

**2. 创建构造函数InitClass，options参数包含传过来的选择器el，render函数为生成dom，evt函数为绑定的事件**

---
```javascript
function InitClass(options) {
    this.options=options;
    this.filter=document.querySelector(options.el).getAttribute("lay-filter");
    this.render();
}
InitClass.prototype.render=function() {
    document.querySelector(this.options.el).innerHTML='<input type="text"><button>获取</button>';
    this.evt();
}
InitClass.prototype.evt=function() {
    var that=this;
    var childs=document.querySelector(this.options.el).children;
    childs[1].onclick=function() {
        var val=childs[0].value;
        // 如果input为空或不是数字，则不返回数据
        if(val && !isNaN(val)){
            // testModule: 对外暴漏的变量，getNumberInp: 自定义事件名，filter: 不同的dom对象，最后一个参数为回调函数的参数，并且返回的this为当前按钮对象
            InitClass.event.call(this, "testModule", 'getNumberInp('+that.filter+')', {
                value: Number(val)
            });
        }
    }
}
```

**3. 添加自定义事件**

---
```javascript
// 事件存储的变量
InitClass.config={
    event: {}
}
InitClass.onevent=function(modName, events, callback) {
    if (typeof modName !== 'string' || typeof callback !== 'function') return this;
    return InitClass.event(modName, events, null, callback);
}
InitClass.event=function(modName, events, params, fn) {
    var that = this
    ,filter = events.match(/\((.*)\)$/) || [] //提取事件过滤器字符结构，如：select(xxx)
    ,eventName = (modName + '.' + events).replace(filter[0], '') //获取事件名称，如：form.select
    ,filterName = filter[1] || ''; //获取过滤器名称,，如：xxx

    //添加事件
    if (fn) {
        InitClass.config.event[eventName] = InitClass.config.event[eventName] || {};
        InitClass.config.event[eventName][filterName] = fn;
        return this;
    }

    //执行事件回调
    for(var key in InitClass.config.event[eventName]){
        //执行指定事件
        key === filterName && InitClass.config.event[eventName][key].call(that, params);
    }
}

```

**4. 对外暴漏的变量**

---
```javascript
var testModule = {
    on: function(events, callback) {
        return InitClass.onevent.call(this, 'testModule', events, callback);
    },
    render: function(options) {
        new InitClass(options);
    }
}
```

**5. 框架使用代码为：**

---
```javascript
testModule.render({
    el: ".test1"
});
testModule.render({
    el: ".test2"
});

testModule.on("getNumberInp(data1)", function(d) {
    console.log("第一个对象返回的数据："+d.value)
})
testModule.on("getNumberInp(data2)", function(d) {
    console.log("第二个对象返回的数据："+d.value)
})
```

**6. 执行结果：**

---
第一个input输入为数字时，点击第一个按钮，结果如下图：
<img data-src="/images/js自定义事件/1.png" class="lozad" style="margin: 0 auto;"/>

输入非数字，则不执行回调，如下图：
<img data-src="/images/js自定义事件/2.png" class="lozad" style="margin: 0 auto;"/>

第二个input输入为数字时，点击第二个按钮，结果如下图：
<img data-src="/images/js自定义事件/3.png" class="lozad" style="margin: 0 auto;"/>

**7. 完整js代码**

---
```javascript
<div class="test1" lay-filter="data1"></div>
<div class="test2" lay-filter="data2"></div>

<script>
    (function(window) {
        function InitClass(options) {
            this.options=options;
            this.filter=document.querySelector(options.el).getAttribute("lay-filter");
            this.render();
        }
        InitClass.prototype.render=function() {
            document.querySelector(this.options.el).innerHTML='<input type="text"><button>获取</button>';
            this.evt();
        }
        InitClass.prototype.evt=function() {
            var that=this;
            var childs=document.querySelector(this.options.el).children;
            childs[1].onclick=function() {
                var val=childs[0].value;
                if(val && !isNaN(val)){
                    InitClass.event.call(this, "testModule", 'getNumberInp('+that.filter+')', {
                        value: Number(val)
                    });
                }
            }
        }

        InitClass.config={
            event: {}
        }
        InitClass.onevent=function(modName, events, callback) {
            if (typeof modName !== 'string' || typeof callback !== 'function') return this;
            return InitClass.event(modName, events, null, callback);
        }
        InitClass.event=function(modName, events, params, fn) {
            var that = this
            ,filter = events.match(/\((.*)\)$/) || [] //提取事件过滤器字符结构，如：select(xxx)
            ,eventName = (modName + '.' + events).replace(filter[0], '') //获取事件名称，如：form.select
            ,filterName = filter[1] || ''; //获取过滤器名称,，如：xxx

            //添加事件
            if (fn) {
                InitClass.config.event[eventName] = InitClass.config.event[eventName] || {};
                InitClass.config.event[eventName][filterName] = fn;
                return this;
            }

            //执行事件回调
            for(var key in InitClass.config.event[eventName]){
                //执行指定事件
                key === filterName && InitClass.config.event[eventName][key].call(that, params);
            }
        }

        var testModule = {
            on: function(events, callback) {
                return InitClass.onevent.call(this, 'testModule', events, callback);
            },
            render: function(options) {
                new InitClass(options);
            }
        }
        window.testModule=testModule;
    })(window)

    // 使用
    testModule.render({
        el: ".test1"
    });
    testModule.render({
        el: ".test2"
    });


    testModule.on("getNumberInp(data1)", function(d) {
        console.log("第一个对象返回的数据："+d.value)
    })
    testModule.on("getNumberInp(data2)", function(d) {
        console.log("第二个对象返回的数据："+d.value)
    })
</script>
```