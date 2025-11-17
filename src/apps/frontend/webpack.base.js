const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

// Read config directly from YAML to avoid config package initialization errors
// This bypasses the problematic config package that causes Utils.isRegExp errors
let webpackBuildConfig = '{}';
try {
  // Try to read from default.yml first, then check environment-specific files
  const configDir = path.resolve(__dirname, '../../../../config');
  const env = process.env.NODE_ENV || process.env.APP_ENV || 'development';
  
  let configPath = path.join(configDir, `${env}.yml`);
  if (!fs.existsSync(configPath)) {
    configPath = path.join(configDir, 'default.yml');
  }
  
  if (fs.existsSync(configPath)) {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(fileContents);
    if (config && config.public) {
      webpackBuildConfig = JSON.stringify(config.public);
    }
  } else {
    // Fallback to hardcoded defaults if config file doesn't exist
    webpackBuildConfig = JSON.stringify({
      authenticationMechanism: 'EMAIL',
      datadog: { enabled: 'false' }
    });
  }
} catch (e) {
  // If config fails to load, use default values
  console.warn('Config file failed to load, using default config:', e.message);
  webpackBuildConfig = JSON.stringify({
    authenticationMechanism: 'EMAIL',
    datadog: { enabled: 'false' }
  });
}

module.exports = {
  target: 'web',
  entry: {
    index: path.resolve(__dirname, 'index.tsx'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: 'style.css',
    }),
    new webpack.DefinePlugin({
      'window.Config': webpackBuildConfig,
    }),
  ],
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 2 versions'],
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      frontend: path.resolve(__dirname),
    },
  },
};
