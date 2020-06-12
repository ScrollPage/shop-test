const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './static/frontend'),
    publicPath: '/',
  },
  performance: {
    hints: false
  },
  devtool: isDev ? 'source-map' : '',
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/favicon.ico'),
          to: path.resolve(__dirname, './static/frontend')
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
        use: [{ loader: 'babel-loader' }, isDev ? 'eslint-loader' : '']
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
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        },
        {
          loader: 'css-loader' // translates CSS into CommonJ
        },
        {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            javascriptEnabled: true
          }
        }]
      },
      {
        test: /antd.*\.less$/,
        ...(isProd ? {
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?importLoaders=1', 'postcss-loader', 'less-loader']
          })
        } : { use: ["style-loader", { loader: 'css-loader', options: { sourceMap: 1 } }, "postcss-loader", "less-loader"] })
      }
    ]
  }
};