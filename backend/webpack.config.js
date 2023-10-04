const nodeExternals = require("webpack-node-externals")
const path = require("path")
const slsw = require("serverless-webpack")

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries, // see https://github.com/serverless-heaven/serverless-webpack/issues/241
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  target: "node",
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
  externals: [
    // node modules は対象外にする
    nodeExternals(),
    function(context, request, callback) {
    if (/^cdk\//.test(request)){
      return callback(null, 'commonjs ' + request);
    }
    callback();
  }],
}
