// import RemarkHTML from 'remark-html'
// const RemarkHTML = import('remark-html')
const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = function () {
  return import('remark-html').then(({ default: RemarkHTML }) => {
    return {
      mode: 'production',
      entry: {
        index: './src/index.js',
      },
      output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
      },
      plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'src/assets'), to: 'assets' },
          { from: path.resolve(__dirname, 'src/styles'), to: 'styles' }
        ]
      })

      ],
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
          {
            test: /\.(s[a|c]|c)ss$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                },
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
          {
            test: /\.md$/,
            use: [
              {
                loader: 'html-loader',
              },
              {
                loader: 'remark-loader',
                options: {
                  remarkOptions: {
                    plugins: [RemarkHTML],
                  },
                },
              },
            ],
          },
        ],
      },
    }
  })
}
