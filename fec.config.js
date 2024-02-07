const path = require('path');

module.exports = {
  appUrl: ['/staging/dashboard-frontend'],
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [],
  _unstableHotReload: process.env.HOT === 'true',
  routes: {
    ...(process.env.CONFIG_PORT && {
      '/api/chrome-service/v1/static': {
        host: `http://localhost:${process.env.CONFIG_PORT}`,
      },
    }),
  },
  moduleFederation: {
    exposes: {
      './RootApp': path.resolve(__dirname, './src/AppEntry.tsx'),
    },
    shared: [
      {
        'react-router-dom': { singleton: true, requiredVersion: '*' },
      },
    ],
  },
};
