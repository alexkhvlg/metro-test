const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const webpack = require('webpack')

var path = require('path');

var source_folder = 'src';
var destination_folder = 'dist';

module.exports = {
    entry: path.resolve(__dirname, source_folder, 'index.js'),
    output: {
        path: path.resolve(__dirname, destination_folder),
        // publicPath: '/' + destination_folder + '/',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: [
            __dirname,
            path.join(__dirname, destination_folder, "images"),
            path.join(__dirname, destination_folder, "fonts")
        ],
        contentBasePublicPath: [
            "/",
            "/images",
            "/fonts",
        ],
        // open: true,
        publicPath: '/',
        watchContentBase: true,
        compress: true,
        hot: true,
        inline: true,
        port: 8081
    },
    target: 'web',
    watchOptions: {
        poll: true,
        ignored: '/node_modules/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, source_folder, 'template.html'), // шаблон
            filename: 'index.html',
            cache: false,
            // inlineSource: '.(js|css)$' // embed all javascript and css inline
        }),
        new CleanWebpackPlugin(),
        //   new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
        new webpack.HotModuleReplacementPlugin(),
    ]
};