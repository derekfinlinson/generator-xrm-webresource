var webpack = require('webpack');
var entries = require('./config.json').entries;

module.exports = function (env) {
    var config = {
        entry: entries,

        output: {
            filename: './dist/js/[name].js',
            library: '<%= prefix %>'
        },

        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"]
        },

        module: {
            rules: [{
                    test: /\.tsx?$/,
                    use: ['ts-loader'],
                    exclude: /node_modules/,
                },
                {
                    enforce: 'pre',
                    test: /\.jsx$/,
                    use: ["source-map-loader"]
                },
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    use: ["source-map-loader"]
                }
            ]
        },

        plugins: [
            new webpack.ProvidePlugin({
                Promise: 'es6-promise-promise'
            })
        ]
    }

    if (env === "prod") {
        config.plugins = (config.plugins || []).concat([
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('prod')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                sourceMap: false,
                compress: {
                    warnings: false
                },
                comments: false
            }),
            new 
        ]);
    } else {
        config.devtool = "eval-source-map";
        config.watch = true;
    }

    return config;
}