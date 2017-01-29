var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'target');
var APP_DIR = path.resolve(__dirname, 'extension/js');

var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: true
});

var config = {
    entry: APP_DIR + '/popup.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        devFlagPlugin
    ]
};

module.exports = config;
