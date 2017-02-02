var webpack = require('webpack');

module.exports = function (env) {
    var config = {
        entry: {
            '<%= prefix %>.FormScript': './src/scripts/FormScript.ts'
        },

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
        }
    }

    if (env === "prod") {
        config.plugins = [
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
                sourceMap: false,
                compress: {
                    warnings: false
                },
                comments: false
            })
        ];
    } else {
        config.devtool = "eval-source-map";
    }

    return config;
}