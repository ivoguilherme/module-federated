const { dependencies } = require("./package.json");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  devServer: {
    port: 3002,
  },
  webpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "menu",
        filename: "menuRemoteEntry.js",
        exposes: {
          "./Menu": "./src/App",
        },
        shared: {
          ...dependencies,
          react: {
            singleton: true,
            import: "react",
            shareScope: "default",
            requiredVersion: dependencies.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: dependencies["react-router-dom"],
          },
        },
      }),
    ],
    configure: {
      output: {
        publicPath: "auto",
      },
    },
  },
};
