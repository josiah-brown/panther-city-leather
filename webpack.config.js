// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  webpack: {
    extractCSS: {
      filename: "[name].css",
    },
    extra: {
      output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
      },
    },
    rules: {
      graphics: { name: "[name].[ext]" },
      svg: { name: "[name].[ext]" },
      jpeg: { name: "[name].[ext]" },
      fonts: { name: "[name].[ext]" },
      video: { name: "[name].[ext]" },
      audio: { name: "[name].[ext]" },
    },
  },
};

// module.exports = {
//   entry: "./src/index.js",
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: "Caching",
//     }),
//   ],
//   output: {
//     filename: "[name].[contenthash].js",
//     path: path.resolve(__dirname, "dist"),
//     clean: true,
//   },
// };
