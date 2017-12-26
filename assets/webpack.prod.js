const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    app: [
      path.join(__dirname, 'app/app.tsx'),
    ],
    // vendor: ['react', 'react-dom', 'office-ui-fabric-react']
  },
  output: {
    path: path.join(__dirname, '../priv/static'),
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }] },
      { test: /\.png$/, loader: 'url-loader?limit=20480&name=images/[hash].[ext]' },
      { test: /\.jpg|\.svg$/, loader: 'file-loader?name=images/[hash].[ext]' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: ['.webpack.js', '.tsx', '.ts', '.js'],
    modules: [
      path.join(__dirname, "app/"),
      path.join(__dirname, "node_modules/")
    ]
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, "node_modules/")
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '[name].js' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true
    })
  ]
}
