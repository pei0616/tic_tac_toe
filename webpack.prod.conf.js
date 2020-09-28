//壓縮、打包的相關設定
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const base = require('./webpack.base.conf');
const terserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports=merge(base,{
    mode:'production',
    devtool:'source-map',
    module:{
        rules:[
            {
                test:/\.(png|jpg|gif|jpe?g|svg)$/i,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[name].[ext]',
                        }
                    },
                    {
                        loader:'image-webpack-loader',//壓縮圖片
                        options:{
                            bypassOnDebug:true
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('<production>')
        }),
        new HtmlWebpackPlugin({
            title:'井字遊戲',
            template:'src/index.pug',
            filename:'index.html',
            favicon:'src/images/tic-tac-toe.png',
            minify:{
                removeComments:true,//刪除註釋
                collapseWhitespace:true//刪除空格
            }
        }),
        new CleanWebpackPlugin() 
    ],
    optimization:{
        minimizer:[
            new terserPlugin(),
            new optimizeCssAssetsPlugin()
        ]
    }
})