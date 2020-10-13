const path = require('path');
const webpack = require('webpack');
//html-webpack-plugin 可以幫助我們指定任意的 HTML 模板，並透過傳遞選項方式，生成對應的 HTML 文件，同時也會將 entry 內的所有靜態文件做引入動作
const HtmlWebpackPlugin = require('html-webpack-plugin');//解析html template 頁面，把相關js、css路徑自動引入html頁面
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//將css單獨抽離出來，在dist資料夾中產生
module.exports={
    mode:'development',
    entry:['./src/index.js','./src/index.jsx'],
    resolve:{
        modules:['node_modules']
    },
    devtool:'eval-source-map',
    output:{
        path:path.resolve(__dirname,'dist'),
    },
    //module：放置解析與轉譯之類的工具 (webpack 稱這些工具為 loader)
    module:{
        rules:[
            {
                test:/\.pug$/i,
                use:[
                    {
                        loader:'html-loader',
                        options:{
                            minimize:false//不壓縮HTML
                        }
                    },
                    {
                        loader:'pug-html-loader',
                        options:{
                            pretty:true//美化HTML的編排(不壓縮的一種)
                        }
                    }
                ]
            },
            {
                test:/\.scss$/i,
                // sass-loader 能讓 sass/scss 轉譯成 css，又由於相依性的關係，所以也一併安裝 node-sass。
                use:[MiniCssExtractPlugin.loader, 
                    {
                        loader:"css-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader: 'postcss-loader',

                    },
                    {
                        loader:"sass-loader",
                        options:{
                            sourceMap:true
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test:/\.(png|jpg|gif|jpe?g|svg)$/i,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[name].[ext]',
                            //outputPath:'images/',
                            //publicPath:'images',//會影響到css、html讀取路徑檔
                            emitFile: true
                        }
                    }
                ]
            }

        ]
    },
    //plugins:放置輔助套件，像是套用與產出html樣板、從js中分離出css檔案、HMR模組
    plugins:[
        new MiniCssExtractPlugin({
            path:path.resolve(__dirname,'dist'),
            filename:'css/all.css'
        }),
        new HtmlWebpackPlugin({
            title:'井字遊戲',
            template:'src/index.pug',//模板文件
            filename:'index.html',//生成文件名稱
            favicon:'src/images/tic-tac-toe.png'
        })
    ]

}