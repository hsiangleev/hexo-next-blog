---
title: 记录未留心的vue细节
date: 2019/3/6 13:34:26
tags: 
    - vue
    - js
categories: js
description: 再次阅读vue文档,看到了许多以前忽略的细节,这次把它们记录下来
---

#### vue模板语法

------
1. v-once指令
    通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。
    `<span v-once>这个将不会改变: {{ msg }}</span>`

2. 动态参数（2.6.0 新增）
    可以用方括号括起来的 JavaScript 表达式作为一个指令的参数，即节点属性可以动态设置
    `<a v-bind:[attributeName]="url"> ... </a>`
    `<a v-on:[eventName]="doSomething"> ... </a>`

#### 计算属性和侦听器

------
1. 计算属性（对于任何复杂逻辑，都应当使用计算属性）
    + 如果计算属性的依赖属性发生改变，则计算属性也会相应改变
    + 计算属性是基于它们的依赖进行缓存的，只在相关依赖发生改变时它们才会重新求值

#### 条件渲染

------
1. 在 template 元素上使用 v-if 条件渲染分组，而不需要多加一层div
因为 v-if 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素，此时可以把一个 template 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 template 元素。
```html 
<template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
</template>
```
2. 用 key 管理可复用的元素
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。所以使用v-if切换input的时候已经输入的input值不会清除，所以添加一个具有唯一值的 key 属性代表这两个元素是完全独立的，不要复用它们。
```html 
<template v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
    <label>Email</label>
    <input placeholder="Enter your email address" key="email-input">
</template>
```

#### 列表渲染

------
1. v-for遍历对象
```html 
<!-- value, key, index分别代表 值, 键, 索引 -->
<div v-for="(value, key, index) in object">
    {{ index }}. {{ key }}: {{ value }}
</div>
```

2. 数组更新检测
    由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
    + 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
    + 当你修改数组的长度时，例如：vm.items.length = newLength
    ```javascript
    var vm = new Vue({
    data: {
        items: ['a', 'b', 'c']
    }
    })
    vm.items[1] = 'x' // 不是响应性的
    vm.items.length = 2 // 不是响应性的
    ```
    + 为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将触发状态更新：
    `Vue.set(vm.items, indexOfItem, newValue)`
    `vm.items.splice(indexOfItem, 1, newValue)`
    + 为了解决第二类问题，你可以使用 splice：
    `vm.items.splice(newLength)`

3. 对象更改检测注意事项
    由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：
    ```javascript
    var vm = new Vue({
        data: {
            person: {
                a: 1
            }
        }
    })
    // `vm.person.a` 现在是响应式的

    vm.person.b = 2
    // `vm.person.b` 不是响应式的
    ```
    可以使用 vm.$set 实例方法，它只是全局 Vue.set 的别名：
    `vm.$set(vm.person, 'b', 2)`

#### 表单输入绑定(值绑定)

------
1. 复选框
    ```html
    <input
        type="checkbox"
        v-model="toggle"
        true-value="yes"
        false-value="no"
    >
    ```
    被选中时toggle为yes, 即`vm.toggle === 'yes'`, 未被选中时为no, 即`vm.toggle === 'no'`

2. 单选按钮
    `<input type="radio" v-model="pick" v-bind:value="a">`
    即`vm.pick===vm.a`

3. 选择框的选项
    ```html
    <select v-model="selected">
        <option v-bind:value="{ number: 123 }">123</option>
    </select>
    ```
    ```javascript
    // 当选中时
    typeof vm.selected // => 'object'
    vm.selected.number // => 123
    ```