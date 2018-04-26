const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
  if (env !== 'production') {
    config = injectBabelPlugin(['react-hot-loader/babel'], config);
  }

  return config;
};
