const path = require('path');

module.exports = {
  entry: '**/__tests__/**/*.test.(jsx)', // Entry point for your test files
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.test.js', // Output bundle name
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: "html-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|otf|svg|cur)(\?|$)/,
        type: "asset/resource",
      },
    ],
  },
};
