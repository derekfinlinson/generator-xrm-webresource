module.exports = {
    entry: {
        '<%= prefix %>.FormScript': './src/scripts/FormScript.ts'
    },

    output: {
        filename: './dist/js/[name].js',
        library: '<%= prefix %>'
    },

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [ 'ts-loader' ],
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.jsx$/,
                use: [ "source-map-loader" ]
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: [ "source-map-loader" ]
            }
        ]
    },
    
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    }
}