const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: "development",
    entry: './src/index.js',
    devtool: 'eval-source-map',
    target: "node",
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: "main.js"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            }
        ]
    }
}
