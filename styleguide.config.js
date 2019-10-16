const isArray = require('lodash/isArray');
const jsParse = require('react-docgen');
const jsParseHOC = require('react-docgen-annotation-resolver');
const path = require('path');
let themeVars = {};

module.exports = {
  require: [
    'babel-polyfill',
    path.join(__dirname, 'node_modules/prism-reactjs/dist/index.css')
  ],
  components: 'src/**/*.js',
  resolver: jsParse.resolver.findAllComponentDefinitions,
  propsParser(filePath, source, resolver, handlers) {
    let docs = {};
    try {
      docs = jsParse.parse(source, resolver, handlers);
      if (isArray(docs)) {
        if (docs.length === 0) {
          throw new Error('No suitable component definition found.');
        }
      }
    // If parse failed, check if component is High Order Component
    } catch (err) {
      let hocDocs = {};
      try {
        hocDocs = jsParse.parse(source, jsParseHOC, handlers);
        if (isArray(hocDocs)) {
          if (hocDocs.length === 0) {
            throw new Error('No suitable component definition found.');
          }
        }
      // If Failed, check if component is High Order Component
      } catch (err) {
        throw new Error('No suitable component definition found. If this is an HOC component please ensure the "* @component" comment tag has been added to the export.');
      }

      return hocDocs;
    }

    return docs;
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                modifyVars: themeVars
              }
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
      ],
    },
  }
};