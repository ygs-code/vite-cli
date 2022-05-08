

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
