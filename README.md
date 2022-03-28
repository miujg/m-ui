# m-ui
仿element-ui，使用vue3 + typescript做的个人脚手架。目前供自己学习，以后争取能应用到工作中！

### 文件目录结构

```
├── Readme.md                   
├── package.json                  // 主项目
├── build                      
│   ├── rollup.config.bundle.js   // 打包全部组件
│   ├── rollup.config.js          // 打包各个组件，供按需引入
│   └── rollup.umd.js             // 打包umd格式，通过script引入
|
├── packages                      
|   ├── button                    // 组件
|   |   ├── src                   // 组件项目文件
|   |   └── index.ts              // 组件导出
|   |   └── package.json          // 子项目的配置文件
|   └── m-ui                      // 统一组件出口
|       └── index.ts              // 组件导出
|
├── example                       // webpack项目，使用组件的示例
|
└── .gitignore                  
```
### 使用方法
当前组件库还没有发布到npm，可以下载项目来运行。运行步骤如下：
1. 在项目目录下安装依赖：yarn install。```一定要使用yarn，yarn提供了monorepo依赖管理机制```
2. 打包项目css文件。执行命令： npm run build:theme

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f9e8fa129224907b76c647ca1e6385f~tplv-k3u1fbpfcp-watermark.image?)
2. 执行命令：npm run demo-dev。浏览器访问: http://localhost:8080/
3. example/index.ts里面有组件引入使用方法：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a946f085d6af43edb7bd1aacac13bfba~tplv-k3u1fbpfcp-watermark.image?)
