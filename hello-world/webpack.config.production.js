const path = require("path");
// Comes with webpack
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  // Two entry points need to be specified for two bundles
  entry:
    // This is the key for the bundle and the value is the path to the file
    "./src/hello-world.js",

  output: {
    // Browser caches js and css files by file name so if we make changes to code it will not reflect in browser
    // So we need to change the file name when we make changes to code so that browser will not use the cached file
    // We can use contenthash to generate a unique hash for the file name
    // New file is only generated when there is a change in the code
    // [name] is used to get the name of the bundle from the entry pointx`x
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    // Concatinates this to src of the images or resources in the html file
    // publicPath: "http://some-cdn.com/",
    // Hello world app is running on port 9001 so we need to specify this port here
    publicPath: "http://localhost:9001/",
    // Gives same function as a cleanwebpackplugin
    // clean: {
    // Dry is used to test the clean plugin if true it will not delete the files but tells us which files will be deleted
    //   dry: true,
    // Tells which files to keep
    //   keep: /\.css/,
    // },
  },
  mode: "production",
  // We are using lodash in both the bundles so webpack includes this in both the bundles which is not good
  // So we can tell webpack to include this in a seperate bundle and use it in both the bundles
  // This is called code splitting
  optimization: {
    splitChunks: {
      chunks: "all",
      // This is the minimum size of the file to be included in the seperate bundle
      minSize: 30000,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        //Css loader just loads the css files
        // Style loader takes the css and injects it into the html file
        // Loaders need to be installed seperately
        //Loaders are applied from right to left
        // use: ["style-loader", "css-loader", "sass-loader"],
        // Mini css plugin is replaced with style loader
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
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
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    // Makes the bundle size smaller
    new TerserPlugin(),
    // Extracts the css into a seperate file which helps in not loading css with js and bundle.js size decreases
    // We can load multiple small files with this
    new MiniCssExtractPlugin({
      // [contenthash] is used to generate a unique hash for the file name
      // New file is only generated when there is a change in the code
      // [name] is used to get the name of the bundle from the entry points
      filename: "[name].[contenthash].css",
    }),
    // Cleans the dist folder before generating new files so that we dont have any old files
    new CleanWebpackPlugin(),
    // // {
    // //   cleanOnceBeforeBuildPatterns: [
    // //     "**/*",
    // //     path.join(process.cwd(), "build/**/*"),
    // //   ],
    // // }
    // If need need muiltiple html files we can use this plugin multiple times
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      title: "Hello World",
      template: "src/page-template.hbs",
      description: "Hello world",
    }),
    // Module federation helps us to share code between two different applications here we are sharing the button component
    new ModuleFederationPlugin({
      // This is the name of the remote app
      name: "HelloWorldApp",
      // This is the file name which will be used to load the remote app
      filename: "remoteEntry.js",
      exposes: {
        // This is the url at which kiwi app can use the button component
        "./HelloWorldButton":
          "./src/components/hello-world-button/hello-world-button.js",
        "./HelloWorldPage":
          "./src/components/hello-world-page/hello-world-page.js",
      },
    }),
  ],
};
