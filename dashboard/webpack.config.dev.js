const path = require("path");
// Comes with webpack
// const TerserPlugin = require("terser-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  entry:
    // This is the key for the bundle and the value is the path to the file
    "./src/dashboard.js",

  output: {
    // Browser caches js and css files by file name so if we make changes to code it will not reflect in browser
    // So we need to change the file name when we make changes to code so that browser will not use the cached file
    // We can use contenthash to generate a unique hash for the file name
    // New file is only generated when there is a change in the code
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // Concatinates this to src of the images or resources in the html file
    // publicPath: "http://some-cdn.com/",
    publicPath: "http://localhost:9002/",
    // Gives same function as a cleanwebpackplugin
    // clean: {
    // Dry is used to test the clean plugin if true it will not delete the files but tells us which files will be deleted
    //   dry: true,
    // Tells which files to keep
    //   keep: /\.css/,
    // },
  },
  mode: "development",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "dashboard.html",
      writeToDisk: true,
    },
    historyApiFallback: {
      index: "dashboard.html",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // Excluder node moduless
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // Compiles the code to es5 from es6
            presets: ["@babel/preset-env"],
            // Allows us to use class properties
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.scss$/,
        //Css loader just loads the css files
        // Style loader takes the css and injects it into the html file
        // Loaders need to be installed seperately
        //Loaders are applied from right to left
        // use: ["style-loader", "css-loader", "sass-loader"],
        // Mini css plugin is replaced with style loader
        // use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    // Makes the bundle size smaller
    // new TerserPlugin(),
    // Extracts the css into a seperate file which helps in not loading css with js and bundle.js size decreases
    // We can load multiple small files with this
    // new MiniCssExtractPlugin({
    // [contenthash] is used to generate a unique hash for the file name
    //   filename: "styles.[contenthash].css",
    // }),
    // Cleans the dist folder before generating new files so that we dont have any old files
    // new CleanWebpackPlugin(),
    // // {
    // //   cleanOnceBeforeBuildPatterns: [
    // //     "**/*",
    // //     path.join(process.cwd(), "build/**/*"),
    // //   ],
    // // }
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      title: "Dashboard",
    }),
    new MiniCssExtractPlugin({
      // [contenthash] is used to generate a unique hash for the file name
      // New file is only generated when there is a change in the code
      // [name] is used to get the name of the bundle from the entry points
      filename: "[name].[contenthash].css",
    }),
    new ModuleFederationPlugin({
      name: "App",
      remote: {
        HelloWorldApp: "HelloWorldApp@http://localhost:9001/remoteEntry.js",
        KiwiApp: "KiwiApp@http://localhost:9002/remoteEntry.js",
      },
    }),
  ],
};
