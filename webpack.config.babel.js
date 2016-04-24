import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

export default {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss-loader!sass'),
        exclude: /flexboxgrid/,
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
  resolve: {
    extensions: ['', '.js', '.scss'],
  },
  output: {
    path: 'dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true,
  },
  watchOptions: {
    poll: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/bundle.css'),
  ],
};
