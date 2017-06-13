var webpack = require('webpack');
var WebpackEventPlugin = require('webpack-event-plugin');
var webResource = require('node-webresource');
var creds = require('./creds.json');
var config = require('./config.json');

module.exports = function (env) {
    var webpackConfig = {
        entry: config.entries,

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
            }),
            new WebpackEventPlugin([
                {
                    hook: 'after-emit',
                    callback: (compilation, callback) => {
                        var uploadConfig = {
                            tenant: creds.tenant,
                            server: creds.server,
                            clientId: creds.clientId,
                            clientSecret: creds.clientSecret,
                            username: creds.username,
                            password: creds.password,
                            webResources: config.webResources,
                            solution: creds.solution
                        };

                        var assets = Object.keys(compilation.assets).filter(asset => {
                            return compilation.assets[asset].emitted;
                        }).map(asset => {
                            return {
                                name: asset,
                                source: compilation.assets[asset].source()
                            };
                        });
                        
                        webResource.upload(uploadConfig, assets).then(() => {
                            callback();
                        }, (error) => {
                            console.log(error);
                            callback();
                        });
                    }
                }                
            ])
        ]
    }

    if (env === "prod") {
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
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
            })             
        ]);
    } else {
        webpackConfig.devtool = "eval-source-map";
        webpackConfig.watch = true;
    }

    return webpackConfig;
}