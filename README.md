## myblog设计文档

### 概述
 ```
    <p>啊啊</p>
 ```
***

node版本： **v8.11.3**

npm版本 ： **v5.6.0**

使用框架 ： **vue**

构建工具 ： **vue-cli(webpack)2**

页面UI     ： **iview**

项目描述 ：基于vue的个人博客

使用插件 ：详见**package.json**

启动项目 ：**npm run dev**

打包项目 ：**npm run build**


### 项目详述

***
本项目是一个个人博客项目，主要实现了博客的发布、评论等功能。

##### 技术栈

本项目使用的主要技术栈包括：

- less
- es6相关（主要是`promise`、`箭头函数`）
- vue
- axios

##### 业务登录流程

用户通过注册登录进入发布博客页面进行博客发布，评论博客时，游客也可评论 信息名称显示游客，若登录用户评论显示登录用户信息。admin管理员可以对博客、博客评论进行删除操作


### 目录结构

***
```
│  App.vue  
│  main.js
│  
├─admin
│      blogEdit.vue                     // 博客编辑页面
│      index.vue                        // 容器页面
│      pageEdit.vue                     // 页面编辑页面（一些展示在页面上的信息，如：轮播图图片，页面标题等）
│      userEdit.vue                     // 用户编辑页面
│      
├─assets
│      avator.jpg
│      car.jpg
│      logo.png
│      logo1.png
│      swiper1.jpg
│      swiper2.jpg
│      swiper3.jpg
│     
│      
├─mock
│  └─store                              // 模拟数据接口
├─router
│      index.js                         // 路由
│      
├─style
│      editor.css
│      editor1.css
│      index.css
│      
└─views
        about.vue                       // 关于页面
        blog.vue                        // 博客列表
        blogDetail.vue                  // 博客详情
        footer.vue                      // 页尾组件
        index.vue                       // 首页

```


### main.js

*****

项目 js 的主入口文件，主要负责了以下事项

- 引入路由
- 引入vuex
- 引入Ui
- 引入全局组件
- 引入axios
- 引入公共方法模块

