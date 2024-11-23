const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          }
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    hot: true,
    open: true,
    port: 8080,
    watchFiles: ['src/**/*']
  },
  devtool: 'source-map'
};
