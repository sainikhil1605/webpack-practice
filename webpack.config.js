const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // Concatinates this to src of the images or resources in the html file
    // publicPath: "http://some-cdn.com/",
    publicPath: "dist/",
  },
  mode: "none",
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        //Css loader just loads the css files
        // Style loader takes the css and injects it into the html file
        // Loaders need to be installed seperately
        //Loaders are applied from right to left
        use: ["style-loader", "css-loader", "sass-loader"],
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
    ],
  },
};
