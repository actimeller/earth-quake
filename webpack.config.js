
module.exports = {
    entry: './app/main.ts',
    output:{
        filename: './app/bundle.js'
    },
    module:{
        loader: [
            {test:/\.ts?$/,loader:'ts-loader'}
        ]
    }
}