const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  devtool: 'source-map', 
};

// webpack.config.js
module.exports = {
  module: {
      rules: [
          {
              test: /\.css$/,
              use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
          {
              test: /\.(png|jpg|gif|svg)$/,
              use: [
                  {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: 'assets/img',
                          publicPath: 'assets/img',
                      },
                  },
              ],
          },
      ],
  },
};

