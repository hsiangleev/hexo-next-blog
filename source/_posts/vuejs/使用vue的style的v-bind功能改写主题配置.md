---
title: 使用vue的style的v-bind功能实现切换主题和修改主题色的功能
date: 2021/08/19 10:00:33
tags: 
    - vue-next
categories: vue
description: 最近看了vue3.2版本更新了一个style的功能v-bind，可以在style中获取js变量，动态配置css样式。由于我之前做的管理系统的框子需要一个切换主题的功能，但是苦于无法在css中获取js变量，所以直接使用js代码生成css并添加到head中。
---

### 使用v-bind实现切换主题的功能

1. 首先在store中保存一个主题色primary和当前使用的是哪个主题，保存其索引，切换主题的时候修改索引
```ts
state: ():ILayout => ({
    setting: {
        theme: setting.theme !== undefined ? setting.theme : 0,
        color: {
            primary: setting.color !== undefined ? setting.color.primary : '#409eff'
        }
    }
})
```
2. 定义不同的主题
```ts
import { ITheme } from '/@/type/config/theme'
import { useLayoutStore } from '/@/store/modules/layout'
const theme:() => ITheme[] = () => {
    const { color } = useLayoutStore().getSetting
    return [
        {
            tagsActiveColor: '#fff',
            tagsActiveBg: color.primary,
            mainBg: '#f0f2f5',
            sidebarColor: '#fff',
            sidebarBg: '#001529',
            sidebarChildrenBg: '#000c17',
            sidebarActiveColor: '#fff',
            sidebarActiveBg: color.primary,
            sidebarActiveBorderRightBG: '#1890ff'
        },
        {
            tagsActiveColor: '#fff',
            tagsActiveBg: color.primary,
            navbarColor: '#fff',
            navbarBg: '#393D49',
            mainBg: '#f0f2f5',
            sidebarColor: '#fff',
            sidebarBg: '#001529',
            sidebarChildrenBg: '#000c17',
            sidebarActiveColor: '#fff',
            sidebarActiveBg: color.primary,
            sidebarActiveBorderRightBG: '#1890ff'
        }
    ]
}
export default theme
```
3. 修改主题色具体代码[changeThemeColor.ts](https://github.com/hsiangleev/element-plus-admin/blob/master/src/utils/changeThemeColor.ts)，实现过程及部分代码参考的是[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/ThemePicker/index.vue)，实现思路是 **需要拿到通过 package.json 拿到 element-plus 的版本号，根据该版本号去请求相应的样式。拿到样式之后将样色，通过正则匹配和替换，将颜色变量替换成你需要的，之后动态添加 style 标签来覆盖原有的 css 样式。**
4. 在`/src/app.vue`文件中初始调用一次changeThemeDefaultColor方法，判断是否修改默认主题色
5. 在`/src/app.vue`文件中定义一个变量保存当前的主题，当主题色改变的时候或者主题切换的时候，再重新赋值
```ts
const { getSetting } = useLayoutStore()
// 重新获取主题色
const f = () => {
    let themeArray = theme()
    return getSetting.theme >= themeArray.length ? themeArray[0] : themeArray[getSetting.theme]
}
let themeStyle:Ref<ITheme> = ref(f())
watch(() => getSetting.theme, () => themeStyle.value = f())
watch(() => getSetting.color.primary, () => themeStyle.value = f())
```
6. 然后在style中使用上面定义的主题即可获取，这样当主题改变的时候，下面的style中的样式也会跟着改变
```scss
.layout-sidebar-sidesetting > i {
    background-color: v-bind(themeStyle.sidebarActiveBg);
    color: v-bind(themeStyle.sidebarColor);
}

.layout-sidebar {
    background-color: v-bind(themeStyle.sidebarBg);

    .layout-sidebar-logo {
        background-color: v-bind(themeStyle.logoBg || themeStyle.sidebarBg);
        color: v-bind(themeStyle.logoColor || themeStyle.sidebarColor);
    }
}
// ...
```
7. 如需在其他文件中使用该主题色
    + 先从store中获取主题色，再在js中定义变量保存主题色
    ```ts
    import { useLayoutStore } from '/@/store/modules/layout'
    export default defineComponent({
        name: '...',
        setup() {
            const { color } = useLayoutStore().getSetting
            return {
                color
            }
        }
    })
    ```
    + 在style中使用
    ```scss
    p {
        color: v-bind(color.primary);
    }
    ```

[项目地址](https://github.com/hsiangleev/element-plus-admin)
[项目示例](https://element-plus-admin.hsianglee.cn/)