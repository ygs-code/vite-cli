# vite 脚手架配置

##  webpack和vite的比较

### 一、webpack和vite

都是现代化打包工具

### 二、为什么Vite启动快

#### 2.1 底层语言

从底层原理上来说，Vite是基于esbuild预构建依赖。而esbuild是采用go语言编写，因为go语言的操作是纳秒级别，而js是以毫秒计数，所以vite比用js编写的打包器快10-100倍。

#### 2.2 webpack和vite的启动方式

 

webpack: 分析依赖=> 编译打包=> 交给本地服务器进行渲染。首先分析各个模块之间的依赖，然后进行打包，在启动webpack-dev-server，请求服务器时，直接显示打包结果。webpack打包之后存在的问题：随着模块的增多，会造成打出的 bundle 体积过大，进而会造成热更新速度明显拖慢。

vite: 启动服务器=> 请求模块时按需动态编译显示。是先启动开发服务器，请求某个模块时再对该模块进行实时编译因为现代游览器本身支持ES-Module，所以会自动向依赖的Module发出请求。所以vite就将开发环境下的模块文件作为浏览器的执行文件，而不是像webpack进行打包后交给本地服务器。意思就是vite不会在打包业务代码而是利用浏览器的兼容性支持ES-Module模式下直接运行js，这样就可以大大减少打包时间

分析了webpack和vite的打包方式后，也就明白了为什么vite比webpack打包快，因为它在启动的时候不需要打包，所以不用分析模块与模块之间的依赖关系，不用进行编译。这种方式就类似于我们在使用某个UI框架的时候，可以对其进行按需加载。同样的，vite也是这种机制，当浏览器请求某个模块时，再根据需要对模块内容进行编译。按需动态编译可以缩减编译时间，当项目越复杂，模块越多的情况下，vite明显优于webpack.
热更新方面，效率更高。当改动了某个模块的时候，也只用让浏览器重新请求该模块，不需要像webpack那样将模块以及模块依赖的模块全部编译一次。



举例，我们看react源码为

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

```

vite编译之后源码

```
var _jsxFileName = "K:\\vite-cli\\src\\main.jsx";
import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=f424ab44"; const React = __vite__cjsImport0_react.__esModule ? __vite__cjsImport0_react.default : __vite__cjsImport0_react;
import __vite__cjsImport1_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=f424ab44"; const ReactDOM = __vite__cjsImport1_reactDom_client.__esModule ? __vite__cjsImport1_reactDom_client.default : __vite__cjsImport1_reactDom_client;
import App from "/src/App.jsx";
import "/src/index.css";
import __vite__cjsImport4_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=f424ab44"; const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ _jsxDEV(React.StrictMode, {
  children: /* @__PURE__ */ _jsxDEV(App, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 5
  }, this)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 7,
  columnNumber: 3
}, this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBQSxTQUFTQyxXQUFXQyxTQUFTQyxlQUFlLE1BQXhCLENBQXBCLEVBQXFEQyxPQUNuRCx3QkFBQyxNQUFNLFlBQVA7QUFBQSxZQUNFLHdCQUFDLEtBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFERiIsIm5hbWVzIjpbIlJlYWN0RE9NIiwiY3JlYXRlUm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwic291cmNlcyI6WyJLOi92aXRlLWNsaS9zcmMvbWFpbi5qc3giXSwiZmlsZSI6Iks6L3ZpdGUtY2xpL3NyYy9tYWluLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20vY2xpZW50J1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCdcbmltcG9ydCAnLi9pbmRleC5jc3MnXG5cblJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSkucmVuZGVyKFxuICA8UmVhY3QuU3RyaWN0TW9kZT5cbiAgICA8QXBwIC8+XG4gIDwvUmVhY3QuU3RyaWN0TW9kZT5cbilcbiJdfQ==
```

我们看出他并没有把代码转换成es5去执行，而是直接将es6代码去执行。这样效率就大大提高了。

### 三、优缺点

vite开发阶段，打包快。
vite相关生态没有webpack完善，vite可以作为开发的辅助。

## 四、配置

### 基本配置

vite 配置有很多地方和webpack相同之处 我们来看看他的配置

在项目目录中建立一个vite.config.js配置文件，和webpack类似

```
import { defineConfig, loadEnv } from 'vite';
// 要想为传统浏览器提供支持，可以按下面这样使用官方插件 @vitejs/plugin-legacy：
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import file from './file';
import path from 'path';
const { resolve } = path;
export default defineConfig(async ({ command, mode }) => {
    console.log('command=', command); // 获取是build 还是 dev
    console.log('mode=', mode); // 获取是development 还是 production
    
});
```



### plugins配置

vite编译配置，和webpack类似，有plugins，但是他没有load。

比如我们需要编译react 则需要安装一个react插件



```
       import react from '@vitejs/plugin-react';
       plugins: [
     
            react(),
            
        ],
```

#### 自定义plugins

自定义plugins定义一个函数返回 name和  transform接受两个参数 对象，name是插件名称，transform是编译回调函数，transform接受两个参数 一个是src插件名称，第二个是id 文件路径，因为这里回调函数是很多个文件的，这个时候我们需要写正则去配置需要编译转换的文件，这个方式有点类似webpack中的test配置，我们通过写fileRegex去匹配需要的文件，然后进行转义返回一个对象  code 和map  ，code 就是转移后的代码map  就是source-map 。

```


export default function myPlugin() {
    return {
        name: 'transform-file',
        transform(
            src, // 文件内容
            id // 文件路径
        ) {
           const fileRegex = /\.(graphql)$/;
            // console.log('src=',src)
            console.log('id=', id);
            if (fileRegex.test(id)) {
                console.log('src=',src)
                return {
                    // 转义
                    code: src,
                    map: null, // 如果可行将提供 source map
                };
            }
        },
    };
}

```





### 静态输出路径   base: './',

设置resolver选项 别名

```
        // 设置resolver选项 别名
        // 比如图片资源都在src/assets/image目录下，不想在项目中每次都通过require("../assets/image/1.jpg")这样写一长串去引用。能否通过 类似nuxt中的快速引用？
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@c': resolve(__dirname, 'src/components'),
                '/images': 'src/assets/images/', //这里不能通过path模块解析路径的写法
            },
            // 省略后缀名引入
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
```

### 编译打包输出配置build

```
   build: {
            target: 'modules',
            outDir: 'dist', //指定输出路径
            assetsDir: 'assets', // 指定生成静态资源的存放路径
            minify: 'terser', // 混淆器，terser构建后文件体积更小
            // 构建后是否生成 source map 文件
            sourcemap: IS_DEV,
            // chunk 大小警告的限制
            chunkSizeWarningLimit: 700,
            // 生产环境移除 console
            terserOptions: {
                compress: {
                    drop_console: !IS_DEV,
                    drop_debugger: !IS_DEV,
                },
            },

            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                //cdn抽离
                // external: ['vue'],
                // output: {
                //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                //     globals: {
                //         vue: 'Vue',
                //     },
                // },
                //cdn抽离
                // 入口
                input: {
                    index: resolve(__dirname, 'index.html'),
                },
                // 出口
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/name-[hash].[ext]',
                    // format: 'amd' // 动态导入不支持iife
                },

                // https://rollupjs.org/guide/en/#big-list-of-options
            },
        },
```



### 全局变量配置

在项目中创建.env

```
#全局变量
VITE_SOME_KEY=123
```

在js中即可访问到该变量    console.log("env", import.meta.env.VITE_SOME_KEY) 一定要VITE开头否则访问不到该变量

### 环境变量配置

如果一个项目有三个不同的环境不同的环境域名前缀不同，这个时候我们可以通过配置来实现建立三个不同环境的配置文件

#### 开发环境 创建 .env.development 文件在根目录中配置内容

```
#环境变量
NODE_ENV="development"
VITE_APP_BASEAPI="https://www.dev.com"
```

#### 测试环境 创建 .env.test文件在根目录中配置内容

```
#环境变量
NODE_ENV="test"
VITE_APP_BASEAPI="https://www.test.com"
```

#### 生产环境 创建.env.production文件在根目录中配置内容

```
#环境变量
NODE_ENV="test"
VITE_APP_BASEAPI="https://www.test.com"
```



开源不易，请多多支持，给我git点赞谢谢了

[git地址](https://github.com/qq281113270/vite-cli)

 

 



