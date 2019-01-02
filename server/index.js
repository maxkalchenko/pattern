import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import users from './routes/users';
import auth from './routes/auth';
import posts from './routes/posts';

let app = express();

const compiler = webpack(webpackConfig);

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/token', auth);
app.use('/server', express.static('server'));

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    info: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => console.log('Express server is running on localhost:3000'));
