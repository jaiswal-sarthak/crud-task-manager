const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

const devServerOpen = process.env.WEBPACK_DEV_DISABLE_OPEN !== 'true';
const devServerPort = 3000;
const devServerAPIProxyPort = 8080;

// Clone baseConfig properly without breaking plugins
// Don't use JSON.parse/stringify as it breaks plugin objects
const cleanBaseConfig = { ...baseConfig };
if (cleanBaseConfig.devServer) {
  delete cleanBaseConfig.devServer;
}

// Define devServer config separately - will be added after merge
// Webpack Dev Server v5 requires proxy to be an array, not an object
const devServerConfig = {
  historyApiFallback: true,
  hot: true,
  open: devServerOpen,
  port: devServerPort,
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  proxy: [
    {
      context: ['/api', '/assets'],
      target: `http://localhost:${devServerAPIProxyPort}`,
      changeOrigin: true,
    },
  ],
};

const devConfig = {
  mode: 'development',
  output: {
    pathinfo: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devtool: 'inline-source-map',
};

// Merge base config with dev config (without devServer)
const mergedConfig = merge(cleanBaseConfig, devConfig);

// Add devServer AFTER merge to avoid webpack-merge adding internal properties
mergedConfig.devServer = devServerConfig;

module.exports = mergedConfig;
