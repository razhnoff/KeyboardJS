const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const express = require("express");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.(mp3|wav|ogg|mpeg)$/, use: ["file-loader"] },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: ["url-loader"]
      },
      { test: /\.(woff|ttf|eot)$/, use: ["file-loader"] },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
    port: 9000,
    compress: true,
    before: function(app, server) {
      app.use("/api", express.static(path.join(__dirname, "src")));
    }
  }
};
