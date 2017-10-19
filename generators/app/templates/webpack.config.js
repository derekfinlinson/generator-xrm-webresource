const webpack = require('webpack');
const WebpackEventPlugin = require('webpack-event-plugin');
const webResource = require('node-webresource');
const creds = require('./creds.json');
const config = require('./config.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = function (env) {
    let webpackConfig = {
        entry: config.entries,

        output: {
            filename: './dist/js/[name].js',
            library: '[name]'
        },

        resolve: { extensions: [".tsx", ".ts", ".js", ".jsx"] },

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
            new CopyWebpackPlugin([
                { 
                  context: "./src",
                  from: "**/*.{html,css}",
                  to: "./dist"
                }
            ]),
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
                                path: path.relative(__dirname.replace(path.join("node_modules", "node-webresource"), ""), asset),
                                content: compilation.assets[asset].source().toString('utf8')
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