const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  devServer: {
    port: 3001,
  },
  webpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "Shell",
        remotes: {
          menu: "menu@http://localhost:3002/menuRemoteEntry.js",
        },
        shared: ["react", "react-dom"],
      }),
    ],
  },
};
