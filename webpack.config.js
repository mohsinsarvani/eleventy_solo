const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
// const HtmlWebpackPlugin = require('html-webpack-plugin') 
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
// const devMode = process.env.NODE_ENV !== 'production'

const mainConfig = {
  entry: {
    index: './src/assets/js/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '_site'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/css/[name].css',
      chunkFIlename: '[id].css',
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            }
          },
        ],
      },
    ],
  },
  watch: true,
}

const eleventyConfig = {
  entry: {
    index: './src/assets/js/index-eleventy.js',
  },
  output: {
    filename: 'bundle-eleventy.js',
    path: path.resolve(__dirname, '_site'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/css/[name].css',
      chunkFIlename: '[id].css',
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new ImageminPlugin(
      {
        test: /\.(jpe?g|png|gif)$/i,
      },
    ),
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'responsive-loader',
        options: {
          adapter: require('responsive-loader/sharp'),
          sizes: [300],
          placeholder: true,
          placeholderSize: 50,
          name: '/src/assets/images/[name]-[width].ext',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        }
      }
    ],
  },
  watch: true,
}

module.exports = [
  mainConfig, 
  eleventyConfig
]