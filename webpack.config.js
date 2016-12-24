const webpack = require('webpack');

module.exports = {
    entry: './app/main',
    output: {
        filename: './app/bundle.js'
    },
    module: {
        loader: [
            {test: /\.ts?$/, loader: 'ts-loader'}
        ]
    }
}