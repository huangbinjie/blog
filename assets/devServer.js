var path = require('path');
var express = require('express');
var webpack = require('webpack');
var cors = require('cors')
var config = require('./webpack.dev');

var app = express();
var compiler = webpack(config);

app.use(cors())
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.listen(4001, 'localhost', (err, result) => {
  console.log('http://localhost:4001/');
});