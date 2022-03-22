const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'swc-loader',
        options: {
          /* Options ripped off from https://gist.github.com/bo01ean/532c33e20c0c79c5b6d1541fa3c9c4e9 */
          jsc: {
            parser: {
              syntax: 'ecmascript',
              jsx: true,
            },
            transform: {
              react: {
                pragma: 'React.createElement',
                pragmaFrag: 'React.fragment',
                throwIfNamespace: true,
                development: true,
                useBuiltins: false,
              },
            },
          },
        },
      },
    ],
  },
};
