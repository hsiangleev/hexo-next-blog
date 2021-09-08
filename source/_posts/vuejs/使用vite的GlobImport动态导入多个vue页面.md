---
title: 使用vite的GlobImport动态导入多个vue页面
date: 2021/03/19 15:50:11
tags: 
    - vue-next
    - typescrip
    - element-plus
    - vite
categories: vue
description: 在使用vite实现后台管理系统的时候，有个需求是动态导入views文件夹下面的所有页面，在vite1.0版本的时候只能手动写映射关系，升级到vite2.0之后，vite提供了一个Glob Import方法，使用该方法之后，添加页面可以自动生成映射关系，而不用手动添加
---

**如果直接使用`import.meta.glob`，vscode会报`类型“ImportMeta”上不存在属性“glob”`的错误，需要在tsconfig文件下添加类型定义`vite/client`**

```javascript
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

在之前的代码如下：
```ts
const components = {
    Workplace: () => import('/@/views/Dashboard/Workplace.vue'),
    Login: () => import('/@/views/User/Login.vue'),
    // ...
}
```

使用**Glob Import**改写代码
```ts
const modules = import.meta.glob('../views/**/**.vue')
const components = {}
Object.keys(modules).forEach(key => {
    const nameMatch = key.match(/^\.\.\/views\/(.+)\.vue/)
    if(!nameMatch) return
    // 如果页面以Index命名，则使用父文件夹作为name
    const indexMatch = nameMatch[1].match(/(.*)\/Index$/i)
    let name = indexMatch ? indexMatch[1] : nameMatch[1];
    [name] = name.split('/').splice(-1)
    components[name] = modules[key]
})
```

改完之后即可把views文件夹下的所有vue文件自动生成映射关系

[vite官网](https://vitejs.dev/guide/features.html#glob-import)
[项目地址](https://github.com/hsiangleev/element-plus-admin/blob/master/src/router/asyncRouter.ts)