//動態更新，Webpack-dev-server、打包分析工具
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const base = require('./webpack.base.conf');
// 配置檔合併
module.exports = merge(base,{
    mode:'development',
    output:{
        filename:'bundle.js'
    },
    devtool:'eval-source-map',
    devServer:{
        contentBase:'./dist',
        /*hot:true,////啟動HMR，不必重整瀏覽器就可以更新CSS*/
        open:true
    },
    //plugins： 放置輔助套件，像是套用與產出 HTML 樣板、從 JS 中分離 CSS 檔案、HMR 模組等等的功能
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//只在開發環境，不刷新 Browser 的情況下注入修改過後的代碼，達到不丟失應用狀態下即時更新畫面
        //新增一個process.env.NODE_ENV全域變數，非環境變數
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('<development>')
        })
    ]
})