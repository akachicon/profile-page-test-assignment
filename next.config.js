const globals = require('./globals');

const getDefinePluginConfig = (isDev, isServer) => ({
  [globals.__IS_DEV__]: isDev,
  [globals.__IS_SERVER__]: isServer,
});

const nextConfig = {
  webpack: (config, { dev, isServer, webpack }) => {
    // Setting up DefinePlugin.
    const definePlugin = config.plugins.find(
      (plugin) => plugin instanceof webpack.DefinePlugin
    );
    let definePluginConfig = getDefinePluginConfig(dev, isServer);

    if (definePlugin) {
      definePluginConfig = {
        ...definePlugin.definitions,
        ...definePluginConfig,
      };
      config.plugins = config.plugins.filter(
        (plugin) => plugin !== definePlugin
      );
    }
    config.plugins.push(new webpack.DefinePlugin(definePluginConfig));

    return config;
  },
};

module.exports = nextConfig;
