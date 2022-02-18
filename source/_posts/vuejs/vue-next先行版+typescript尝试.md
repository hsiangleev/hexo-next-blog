---
title: vue-next先行版+typescript尝试
date: 2020/04/08 13:45:56
tags: 
    - vue-next
    - typescrip
categories: vue
description: vue3先行版已经出来很久了，今天尝试了一下与typescript结合使用，记录下来
---

### 获取项目

+ `git clone git@github.com:vuejs/vue-next-webpack-preview.git`
+ `cd vue-next-webpack-preview`
+ `npm install`

### 添加typescript依赖

+ `npm install typescript ts-loader --save-dev`

### 修改项目

#### 1. 创建tsconfig.json文件
```javascript
{
    "compilerOptions": {
        "target": "ES5",
        "module": "CommonJS",
        "strict": true,
        "importHelpers": true,
        "moduleResolution": "node",
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "sourceMap": true,
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "include": [
        "src/**/*.ts",
        "src/**/*.vue"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

#### 2. 修改webpack.config.js文件
+ entry项把`path.resolve(__dirname, './src/main.js')`改为`path.resolve(__dirname, './src/main.ts')`
+ resolve项添加`extensions: [".ts", ".js", ".json"]`
+ rules添加
```javascript
{
    test: /\.ts$/,
    exclude: /node_modules/,
    loader: "ts-loader",
    options: {
        appendTsSuffixTo: [/\.vue$/]
    }
}
```
#### 3. src文件夹下修改
+ main.js改为main.ts
+ 新建文件shims-vue.d.ts
```javascript
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const component: ComponentOptions
    export default component
}
```
+ App.vue文件修改
    1. script添加`lang="ts"`
    2. 引入模块defineComponent，即`import { defineComponent } from 'vue'`
    3. js代码放到`export default defineComponent ({})`中

### 测试项目
+ 新建test.ts的测试文件
```javascript
import { ref } from 'vue'
interface param {
    count: number;
}
export const test = (param: param) => {
    const count = ref(param.count)
    const inc = () => {
        count.value++
    }
    return { count, inc }
}
```
+ App.vue中引入
```javascript
import { defineComponent } from 'vue'
import { test } from './test'
export default defineComponent ({
    setup() {
        const { count, inc } = test({count: 3})
        return { count, inc }
    }
})
```
+ 当把`test({count: 3})`修改为`test({count: ""})`时，可以看到vscode已经提示报错<img data-src="/images/vue-next先行版+typescript尝试/1.jpg" class="lozad"/>