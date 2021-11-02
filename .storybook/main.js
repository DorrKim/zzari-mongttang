const path = require("path");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "webpackFinal": async (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "../src/");
    config.resolve.alias["@assets"] = path.resolve(__dirname, "../src/assets");
    config.resolve.alias["@components"] = path.resolve(__dirname, "../src/components");
    config.resolve.alias["@base"] = path.resolve(__dirname, "../src/components/base");
    config.resolve.alias["@context"] = path.resolve(__dirname, "../src/context");
    config.resolve.alias["@domains"] = path.resolve(__dirname, "../src/domains");
    config.resolve.alias["@hooks"] = path.resolve(__dirname, "../src/hooks");
    config.resolve.alias["@pages"] = path.resolve(__dirname, "../src/pages");
    config.resolve.alias["@utils"] = path.resolve(__dirname, "../src/utils");
    config.resolve.alias["@api"] = path.resolve(__dirname, "../src/utils/api");
    config.resolve.alias["@constants"] = path.resolve(__dirname, "../src/utils/constants");
    config.resolve.alias["@library"] = path.resolve(__dirname, "../src/utils/library");
    return config;
    
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ]
}