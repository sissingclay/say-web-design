// webpack.config.js

module.exports = {
    
    entry: {
        './app/js/swd.general': './src/js/swd.general.js'
    },
    
    // output tells webpack where to put the bundle it creates
    
    output: {
        libraryTarget: 'umd',
        // the destination file name
        filename: '[name].min.js'
    },
    
    devtool: 'source-map',
    // externals let you tell webpack about external dependencies
    // that shouldn't be resolved by webpack.
    
    module: {
        
        loaders: [
            // babel loader, testing for files that have a .js extension
            // (except for files in our node_modules folder!).
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/],
                query: {
                    presets: ['es2015'],
                    cacheDirectory: true,
                    compact: false // because I want readable output
                }
            }
        ]
    }
};
