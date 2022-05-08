import { defineConfig, loadEnv } from 'vite';
// 要想为传统浏览器提供支持，可以按下面这样使用官方插件 @vitejs/plugin-legacy：
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import pluginResolve from 'rollup-plugin-node-resolve';
import { visualizer } from 'rollup-plugin-visualizer';
import eslint from '@rollup/plugin-eslint';
import file from './file';
import path from 'path';
import eslintrc from './.eslintrc.js';
const { resolve } = path;
// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
    // console.log('command=', command);
    // console.log('mode=', mode);
    const ENV = loadEnv(mode, __dirname);
    const IS_DEV = ENV.VITE_APP_ENV !== 'production';
    // const data = await asyncFunction()
    return {
        // 打包静态资源路径
        base: './',
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
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
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
        plugins: [
            // eslint 校验
            eslint(eslintrc),
            //如何设置开启生产打包分析文件大小功能
            visualizer({
                open: true, //注意这里要设置为true，否则无效
                gzipSize: true,
                brotliSize: true,
            }),
            {
                // 自定义插件
                ...file(),
                enforce: 'pre',
            },
            react(),
            pluginResolve(),
            legacy({
                targets: ['defaults', 'not IE 11'],
            }),
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
    };
});
