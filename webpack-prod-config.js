const  webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:['babel-polyfill', './app/index.jsx'],
    output:{
        path: __dirname + '/server/public/bundle',
        filename: 'bundle-v.0.0.1.js',
    },
    worker: {
      output: {
        filename: "hash.worker.js",
        chunkFilename: "[id].hash.worker.js"
      }
    },
    resolve:{
        alias:{
            //...
        }
    },
    module: {
        loaders: [
            {
                test: /\.js|\.jsx?$/,
                exclude: function(input){
                    if(input.match(/(node_modules|bower_components)/)){
                        if(input.indexOf("chat-room-plugin")!==-1||input.indexOf("jquery-image-explode")!==-1){
                           return false;
                        }
                        return true;
                    }
                    return false;                       
                },
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0', 'stage-1'],
                    plugins: ["transform-decorators-legacy"]
                }
            },{
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader?strictMath&noIeCompat"
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    

}
