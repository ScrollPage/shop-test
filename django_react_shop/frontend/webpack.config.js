const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
 
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './static/frontend')
  },
  performance: {
    hints: false
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/favicon.ico'),
          to:  path.resolve(__dirname, './static/frontend')
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}, isDev ? 'eslint-loader' : '']
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        },
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hrm: isDev,
              reloadAll: true
            },
          },
          'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  }
};