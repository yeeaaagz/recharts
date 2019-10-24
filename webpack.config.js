const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env.NODE_ENV;

const config = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'umd'),
    library: 'Recharts',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
          query: {
            plugins: [
              'lodash', 
              ["@nutanix-ui/babel-plugin-prism-import", {
                "libraryName": "prism-reactjs",
                "style": "less"
              }]
            ],
          },
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
        // For loading fonts.
        {
          test: /\.(woff|woff2|eot|eot\?iefix|ttf|svg|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
    ]
  },

  externals: [
    'react',
    'react-dom',
    'core-js',
    'd3-interpolate',
    'd3-scale',
    'd3-shape',
    'lodash',
    'prism-reactjs',
    'prop-types',
    'react-resize-detector',
    'react-smooth',
    'recharts-scale',
    'reduce-css-calc'
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'analyse') {
  config.plugins.push(
    new BundleAnalyzerPlugin()
  );
}

if (env === 'development') {
  config.mode = 'development';
  config.devtool = 'source-map';
}

if (env === 'production') {
  config.mode = 'production';
}

module.exports = config;
