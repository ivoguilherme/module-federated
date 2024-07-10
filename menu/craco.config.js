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
        shared: ["react", "react-dom"],
      }),
    ],
    configure: {
      output: {
        publicPath: "auto",
      },
    },
  },
};
