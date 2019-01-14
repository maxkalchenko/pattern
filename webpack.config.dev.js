import path from 'path';
import webpack from 'webpack';

export default {
    entry: [
        '@babel/polyfill',
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '/client/index.js')
    ],
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: '/'
    },
    mode: 'development',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.js$/,
            include: path.join(__dirname, 'client'),
            loaders: ['react-hot-loader/webpack', 'babel-loader']
        }]
    },
    resolve: {
        extensions: ['.js']
    },
    devServer: {
      contentBase: './dist',
      hot: true
    }
}
