var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageminAvifWebpackPlugin= require =("imagemin-avif-webpack-plugin");

module.exports = {

  entry: {
    app: "./src/index.js",
  },

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "main.js",
    publicPath: '/',

  },


  mode: "development",

  
  
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
        ],
      },
      {

        test: /\.(png|svg|jpe?g|gif|avif)$/,

        use: [

          {

            loader: "file-loader", 

            options: {

              name: '[name].[ext]',
              minimize:true,


              outputPath: "images",

            }

          }

        ]

      },

    ],

  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new OptimizeCssAssetsPlugin({}),
    new MiniCssExtractPlugin({
        filename:"css/style.css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html", 
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "cairo.html", 
      template: "./src/cairo.html",
    }),
    new HtmlWebpackPlugin({
      filename: "istanbul.html", 
      template: "./src/istanbul.html",
    }),
    new HtmlWebpackPlugin({
      filename: "login.html", 
      template: "./src/login.html",
    }),
    new HtmlWebpackPlugin({
      filename: "signup.html", 
      template: "./src/signup.html",
    }),
  ],
};