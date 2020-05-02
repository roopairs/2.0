const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.

  config.performance = {
    ...config.performance,
    maxAssetSize: 2650000,
  };

  return config;
};
