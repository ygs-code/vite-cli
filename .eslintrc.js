module.exports = {
    root: true, // 当前项目使用这个配置文件, 不会往父级目录找.eslintrc.js文件

    env: {
        // 指定eslint启动环境(node支持), browser: true也可以在浏览器设置
        node: true,
        commonjs: true,
        amd: true,
        es6: true,
        mocha: true,
        browser: true,
        es2021: true,
    },
    plugins: ['react', 'jsx-a11y', 'import',],
    extends: [
        // 扩展配置
        // 'plugin:vue/essential', // vue里必须的规则
        // '@vue/standard', // 使eslint继承@vue/cli脚手架里的 - standard标准
        // 'standard',
    ],
    parserOptions: {
        // 对新语法使用eslint
        parser: 'babel-eslint', // 使用babel-eslint 来解析新语法ES6
        sourceType: 'module',
    },
    // 这里可以进行自定义规则配置
    // key：规则代号
    // value：具体的限定方式
    //   "off" or 0 - 关闭规则
    //   "warn" or 1 - 将规则视为一个警告（不会影响退出码）,只警告，不会退出程序
    //   "error" or 2 - 将规则视为一个错误 (退出码为1)，报错并退出程序
    rules: {
        // // 自定义规则 - 其实上面集成后有很多内置的规则, 这里可以进行规则的一些修改
        // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 上线环境用打印就报警告, 开发环境关闭此规则
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger可以终止代码执行
        // 'no-multiple-empty-lines': 'off', // 不允许有连续多行空行(关闭规则)
        // 'no-undef': 1, //不能有未定义的变量
        eqeqeq: ['error', 'always'],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        // "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        // 'no-void': 2, //禁用void操作符
    },
};
