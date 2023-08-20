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
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
