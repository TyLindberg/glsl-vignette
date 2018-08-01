const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(glsl|frag|vert)$/,
                include: path.resolve(__dirname, 'src', 'shaders'),
                loader: [
                    'raw-loader',
                    'glslify-loader'
                ],
            }
        ]
    }
};
