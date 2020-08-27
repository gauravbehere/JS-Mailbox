const path = require('path');

module.exports = {
  entry: './index.jsx',
  devtool: 'sourcemap',
  output: {
    path: path.resolve(__dirname, './')
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};
