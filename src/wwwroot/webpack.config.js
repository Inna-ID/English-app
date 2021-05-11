const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
    },
    devtool: 'inline-source-map', // enables react debug (i.e. source mapping for react bundled code)
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: 'ts-loader',
          }
        ]
    }
}