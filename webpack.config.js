require('babel-polyfill');
const path=require('path');
const webpack=require('webpack');

const DEV=!process.argv.includes('--env.production');

const plugins=[
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
];

if(!DEV){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    );
}

module.exports={
    // entry: path.join(__dirname, 'src/app.js'),
    entry:'./src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    //publicファイルをlocalhost:3000でブラウザに表示できるように設定
    devServer:{
        contentBase:path.join(__dirname,'public'),
        port:3000,
        inline:true,
        hot:true
    },
    plugins:plugins,
    devtool: DEV ? 'cheap-module-eval-source-map':false,

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};