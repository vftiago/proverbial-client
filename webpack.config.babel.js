import { EnvironmentPlugin } from 'webpack';
import DotenvWebpackPlugin from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const plugins = isProduction
  ? [new EnvironmentPlugin(['BASE_URL', 'GOOGLE_CLIENT_ID'])]
  : [
      new DotenvWebpackPlugin({
        path: `./.env`,
      }),
    ];

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    contentBase: __dirname + '/dist',
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true,
      minify: true,
    }),
  ].concat(plugins),
};
