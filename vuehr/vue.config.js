let proxyObj = {};
const CompressionPlugin = require("compression-webpack-plugin");
const vhrserverhost = process.env.vhrserverhost != undefined ? process.env.vhrserverhost : 'localhost'; 
const mailserverhost = process.env.mailserverhost != undefined ? process.env.mailserverhost : 'localhost';
proxyObj['/ws'] = {
    ws: true,
    target: `ws://${mailserverhost}:8081`
};
proxyObj['/'] = {
    ws: false,
    target: `http://${mailserverhost}:8081`,
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}
module.exports = {
    devServer: {
        host: vhrserverhost,
        port: 8080,
        proxy: proxyObj
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 1024,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
    }
}