const path = require("path");
// Comes with webpack
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // Two entry points need to be specified for two bundles
  entry: "./src/index.js",
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
    publicPath: "/static/",
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
        test: /\.(png|jpg)$/,
        // type: "asset/resource",
        // resource type asset is used to import images and other resources
        // Inline is used to import small images or svgs for inline image size is 2.66 MiB for resource it is 42 bytes only so import only small images with inline
        //When using resource type all the images are generated in dist folder so should make more http requests
        // type: "asset/inline",
        // When using asset type webpack will automatically decide whether to use inline or resource
        // If file size is less then 8kb then it will use inline else resource
        type: "asset",
        // When using asset type we can specify the max size of the file to be inline
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3kb
          },
        },
      },
      {
        test: /\.txt/,
        // This type imports the file as a string without any processing and returns the string without modification
        type: "asset/source",
      },
      {
        test: /\.css$/,
        //Css loader just loads the css files
        // Style loader takes the css and injects it into the html file
        // Loaders need to be installed seperately
        // use: ["style-loader", "css-loader"],
        // Mini css plugin is replaced with style loader
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
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
      title: "Hello world",
      description: "Hello world",
      template: "src/page-template.hbs",
    }),
  ],
};
