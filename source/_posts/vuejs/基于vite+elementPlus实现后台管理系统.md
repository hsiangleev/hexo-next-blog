---
title: 基于vite+elementPlus实现后台管理系统
date: 2020/12/11 17:52:10
tags: 
    - vue-next
    - typescrip
    - element-plus
    - vite
categories: vue
description: vue3正式版已经发布一段时间了，elementUI新版本element-plus也已经在测试了，由于我之前没怎么使用过typescript，想找一个项目试试手，所以本文通过一个后台管理系统记录vite + elementPlus + typescript踩坑过程
---

## 通过vite新建项目

1. 创建项目名称为element-plus-admin的项目 `npm init vite-app element-plus-admin`
2. 进入项目 `cd element-plus-admin`
3. 安装依赖 `npm install`
4. 运行项目 `npm run dev`
5. 然后浏览器访问[http://localhost:3000/](http://localhost:3000/)便可以看到项目了

## 引入依赖

1. 引入vue-router-next `npm install vue-router@4 -D`
2. 引入vuex `npm install vuex@next -D`
3. 引入element-plus `npm install element-plus -D`
4. 引入typescript并且使用eslint检查代码 `npm install eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue -D`

## 使用typescript改写项目

1. index.html`<script type="module" src="/src/main.js"></script>`中的js写为ts
2. src/main.js文件名改为main.ts
3. 打开/src/main.ts会发现`'./App.vue'`报错，新建文件src/shims-vue.d.ts
    ```javascript
    declare module '*.vue' {
        import { defineComponent } from 'vue'
        const Component: ReturnType<typeof defineComponent>
        export default Component
    }
    ```
4. 发现还是报错，需要添加typescript配置，在主目录新建tsconfig.json，添加下面代码就可以了
    ```javascript
    {
        "compilerOptions": {
            "outDir": "./dist/",
            "sourceMap": true,
            "module": "commonjs",
            "target": "ESNext",
            "baseUrl": "."
        },
        "include": [
            "./src/**/*"
        ]
    }
    ```

## eslint配置

```js
// 新建.eslintrc.js
module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
    ],
    rules: {
        'vue/html-indent': ['error', 4],
        indent: ['error', 4],                                 // 4行缩进
        'vue/script-indent': ['error', 4],
        quotes: ['error', 'single'],                          // 单引号
        'vue/html-quotes': ['error', 'single'],
        semi: ['error', 'never'],                             // 禁止使用分号
        'space-infix-ops': ['error', { int32Hint: false }],     // 要求操作符周围有空格
        'no-var': 'error',
        'prefer-destructuring': ['error', {                     // 优先使用数组和对象解构
            array: true,
            object: true
        }, {
            enforceForRenamedProperties: false
        }],
        'no-whitespace-before-property': 'error',               // 禁止属性前有空白
        'quote-props': ['error', 'as-needed'],                     // 对象字面量属性名称使用引号
        'object-curly-spacing': ['error', 'always'],            // 强制在花括号中使用一致的空格
        'no-unneeded-ternary': 'error',                         // 禁止可以表达为更简单结构的三元操作符
        'no-restricted-syntax': ['error', 'WithStatement', 'BinaryExpression[operator="in"]'],  // 禁止with/in语句
        'no-lonely-if': 'error',                // 禁止 if 语句作为唯一语句出现在 else 语句块中
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],       // 要求方法链中每个调用都有一个换行符
    }
}
```

## vite配置项

```js
// 新建vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
        port: 3002
    },
    plugins: [vue()],
})
```

## vue文件模板多个根节点报错

1. vue3单文件已经支持多个根节点，如果报错，应该是vetur插件的问题
2. 点击左上角 文件=》首选项=》设置，搜索`vetur.validation.template`，把前面的对号点掉
3. **可以使用johnsoncodehk.volar插件替代vetur插件，该插件支持在template模板中有type提示**

## 别名设置

**需要修改3个地方，设置完成之后如果没有成功，需要重启vscode应该就可以了**
1. 修改vite.config.ts的配置，注意别名必须以 **/** 开头和结尾
    ```ts
    resolve: {
        alias: [
            { find: '/@', replacement: path.resolve(__dirname, 'src') }
        ]
    },
    ```
2. 修改tsconfig.json的配置，compilerOptions里面添加path参数
    ```ts
    "paths": {
        "/@/*": ["src/*"]
    }
    ```
3. 修改.eslintrc.js配置，添加两条rules
    ```ts
    'no-submodule-imports': ['off', '/@'],
    'no-implicit-dependencies': ['off', ['/@']]
    ```

## vuex中的state属性提示

**直接使用vuex的useStore方法，没有state属性提示，需要改写useStore添加返回类型**
1. 在src/store/index.ts中添加代码，给state定义接口
    ```ts
    import { createStore, Store, useStore as baseUseStore } from 'vuex'
    interface IState {
        count: number
    }
    const state:IState = {
        count: 0
    }
    const mutations = {
        add(state:IState) {
            state.count++
        },
        sub(state:IState) {
            state.count--
        }
    }
    export const store = createStore<IState>({
        state,
        mutations
    })
    export function useStore(): Store<IState> {
        return baseUseStore()
    }

    ```
2. src/main.ts引入vuex(模块引入已经使用上面设置的别名)
    ```ts
    import { createApp } from 'vue'
    import App from '/@/App.vue'
    import '/@/index.css'
    import { store } from '/@/vuex/index'
    const app = createApp(App)
    app.use(store)
    app.mount('#app')
    ```
3. 在src/components/HelloWorld.vue中测试，在setup方法中输入`store.state.`的时候就会出现前面定义的属性
    ```ts
    <template>
        count is: {{ count }}
        <button @click='add'>
            增加
        </button>
        <button @click='sub'>
            减少
        </button>
    </template>
    <script lang="ts">
    import { defineComponent, toRef } from 'vue'
    import { useStore } from '/@/vuex/index'
    export default defineComponent({
        name: 'HelloWorld',
        setup() {
            const store = useStore()
            const count = toRef(store.state, 'count')
            const add = () => store.commit('add')
            const sub = () => store.commit('sub')

            return {
                count,
                add,
                sub
            }
        }
    })
    </script>
    ```

## 引入axios等插件时报错

1. ~~vite2.0版本已经不需要添加了~~
2. 报错信息为: Uncaught SyntaxError: The requested module '/@modules/axios/index.js' does not provide an export named 'default'
3. 需要在vite.config.ts配置文件添加
    ```ts
    optimizeDeps: {
        include: ['axios']
    }
    ```

## 生成的文件体积过大

1. 添加build参数配置
    ```ts
    build: {
        sourcemap: true,    // 生成sourcemap文件
        rollupOptions: {
            output: {
                manualChunks: {
                    'element-plus': ['element-plus'],
                    echarts: ['echarts']
                }
            }
        },
        chunkSizeWarningLimit: 600,     // 文件大小超出配置时警告
    },
    ```

## 添加postcss插件

1. 添加css参数配置
    ```ts
    css: {
        postcss: {
            plugins: [
                require('autoprefixer'),
                require('tailwindcss'),
                require('postcss-nested'),
                require('postcss-simple-vars'),
                require('postcss-import')
            ]
        }
    }
    ```

## 更多细节代码就不一一贴了，可以查看仓库代码

1. [详细代码](https://github.com/hsiangleev/element-plus-admin)
2. [示例链接](https://element-plus-admin.hsianglee.cn)