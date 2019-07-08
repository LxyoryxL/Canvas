var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var extractCss = new ExtractTextWebpackPlugin("css/[name].css"); //这里的参数是配置编译后的css路径和文件名,相对于output里的path选项
var path = require('path');
module.exports = {
    resolve: {
        extentions: ["", ".scss"]
    },
    entry: {
        main: __dirname + '/app/main.js',
        index: __dirname + '/app/index.js'
    },
    output: {
        path: __dirname + '/public', //通过HtmlWebpackPlugin插件生成的html文件存放在这个目录下面
        filename: '/js/[name].js', //编译生成的js文件存放到根目录下面的js目录下面,如果js目录不存在则自动创建
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: extractCss.extract(['css', 'sass'])
        }]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './app/css')]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'custom title2',
            template: __dirname + '/public/tempIndex.html'
        }),
        extractCss
    ]
}