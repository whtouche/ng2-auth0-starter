module.exports = {
    entry: './app/boot',
    output: {
        path: __dirname,
        filename: './dist/bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                // exclude: [/\.(spec)\.ts$/]
                exclude: [/\.e2e\.ts$/]
            }
            // {
            //     test: /\.ts/,
            //     loaders: ['ts-loader'],
            //     exclude: /node_modules/
            // }
        ]
    }
};