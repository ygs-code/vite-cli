import { defineConfig, loadEnv } from 'vite';
// 要想为传统浏览器提供支持，可以按下面这样使用官方插件 @vitejs/plugin-legacy：
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import pluginResolve from 'rollup-plugin-node-resolve';
import notify from 'rollup-plugin-notify';
import onError from 'rollup-plugin-onerror';
import { visualizer } from 'rollup-plugin-visualizer';
import eslint from '@rollup/plugin-eslint';
import eslintPlugin from 'vite-plugin-eslint';
import stylelint from 'rollup-plugin-stylelint';
import viteCompression from 'vite-plugin-compression';
import file from './file';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import ViteRestart from 'vite-plugin-restart'
import eslintrc from './.eslintrc.js';
const { resolve } = path;
// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  // console.log('command=', command);
//    console.log('mode=', mode);
  const ENV = loadEnv(mode, __dirname);
  const IS_DEV = ENV.VITE_APP_ENV !== 'production';

//   console.log(
//     'VITE_PROJECT_TITLE=',
//     loadEnv(mode, process.cwd()).VITE_PROJECT_TITLE
//   );
   
  // const data = await asyncFunction()
  return {
    // 打包静态资源路径
    base: './',
    mode:mode , // 'development', // 就是这里
    server: {
      open: true, //vite项目启动时自动打开浏览器
      port: 8080, //vite项目启动时自定义端口
      hmr: true, //开启热更新
      cors: true, // 允许跨域
      //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
      proxy: {
        '/api': {
          target: 'http://192.168.99.223:3000', //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // 设置resolver选项 别名
    // 比如图片资源都在src/assets/image目录下，不想在项目中每次都通过require("../assets/image/1.jpg")这样写一长串去引用。能否通过 类似nuxt中的快速引用？
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@c': resolve(__dirname, 'src/components'),
        '/images': 'src/assets/images/' //这里不能通过path模块解析路径的写法
      },
      // 省略后缀名引入
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      postcss: {
        plugins: [
          // 前缀追加
          require('autoprefixer')({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              '> 1%'
            ],
            grid: true
          }),
          require('postcss-flexbugs-fixes')
        ]
      }
    },

    plugins: [
      
      // ViteRestart({
      //   restart: [
      //     'my.config.[jt]s',
      //   ]
      // }),
      createHtmlPlugin({
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minify: true,
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.jsx
         */
        entry: '/src/main.jsx',

        template: '/index.html',
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            // 查找.env.test文件里面的VITE_PROJECT_TITLE，请以VITE_标识开头
            title: loadEnv(mode, process.cwd()).VITE_PROJECT_TITLE, 
            // injectScript: `<script src="/inject.js"></script>`
          },
          tags: [
            {
              injectTo: 'body-prepend',
              tag: 'div',
              attrs: {
                id: 'tag'
              }
            }
          ]
        }
      }),

      //编译报错
      notify(),
    //   viteCompression({
    //     // ext: '.gz', //gz br
    //     // algorithm: 'gzip', //brotliCompress gzip
    //     // deleteOriginFile: true
    //   }),
      onError((err) => {
        console.log('There was an Error with your rollup build');
        console.error(err);
      }),
      // eslint 校验
      eslintPlugin({
        emitError: true, //发现的错误将始终被触发，将禁用设置为false。
        emitWarning: true, //如果将disable设置为false，则发现的警告将始终被发出。
        failOnError: true, //如果有任何错误，将导致模块构建失败，禁用设置为false。
        failOnWarning: false, //如果有任何警告，如果设置为true，将导致模块构建失败。
        // quiet: false, //如果设置为true，将只处理和报告错误，而忽略警告。
        fix: true //自动修复
      }),
      // eslint({
      //   emitError: true, //发现的错误将始终被触发，将禁用设置为false。
      //   emitWarning: true, //如果将disable设置为false，则发现的警告将始终被发出。
      //   failOnError: true, //如果有任何错误，将导致模块构建失败，禁用设置为false。
      //   failOnWarning: false, //如果有任何警告，如果设置为true，将导致模块构建失败。
      //   quiet: false, //如果设置为true，将只处理和报告错误，而忽略警告。
      //   fix: true, //自动修复
      // }),
    //   stylelint({
    //     emitError: true, //发现的错误将始终被触发，将禁用设置为false。
    //     emitWarning: true, //如果将disable设置为false，则发现的警告将始终被发出。
    //     failOnError: true, //如果有任何错误，将导致模块构建失败，禁用设置为false。
    //     failOnWarning: false, //如果有任何警告，如果设置为true，将导致模块构建失败。
    //     quiet: false //如果设置为true，将只处理和报告错误，而忽略警告。
    //     // fix: true, //自动修复
    //   }),
      //如何设置开启生产打包分析文件大小功能
      visualizer({
        open: true, //注意这里要设置为true，否则无效
        gzipSize: true,
        brotliSize: true
      }),
      {
        // 自定义插件
        ...file(),
        enforce: 'pre'
      },
      react(),
      pluginResolve(),
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],
    build: {
      target: 'modules',
      outDir: 'dist', //指定输出路径
      assetsDir: 'assets', // 指定生成静态资源的存放路径
      minify: 'terser', // 混淆器，terser构建后文件体积更小
      // 构建后是否生成 source map 文件
      sourcemap: IS_DEV,
      // chunk 大小警告的限制
      // chunkSizeWarningLimit: 700,
      // 生产环境移除 console
      terserOptions: {
        compress: {
          drop_console: !IS_DEV,
          drop_debugger: !IS_DEV
        }
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
          index: resolve(__dirname, 'index.html')
        },
        // 出口
        output: {
          // 拆包，但是没有 webpack 拆的那么零碎和好用。
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/name-[hash].[ext]'
          // format: 'amd' // 动态导入不支持iife
        }

        // https://rollupjs.org/guide/en/#big-list-of-options
      }
    }
  };
});
