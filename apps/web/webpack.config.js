// const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// module.exports = async function (env, argv) {
//   const config = await createExpoWebpackConfigAsync(env, argv);
//   // Customize the config before returning it.
//   return config;
// };


const createExpoWebpackConfigAsync = require("@expo/webpack-config");

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: [
        "puckee-common"
      ]
    }
  }, argv);

  config.resolve.symlinks = true;
  
  return config;
};