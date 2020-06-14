const path = require("path");

module.exports = (config, env) => {
  config.resolve.alias.src = path.resolve(__dirname, "src/");
  return config
};
