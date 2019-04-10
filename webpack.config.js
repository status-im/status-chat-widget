const path = require("path");

module.exports = {
  entry: "./src/index.js",
  target: "web",
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "statuswidget.js"
  },
  resolve: {
    extensions: [".js"]
  },
  node: {
    net: 'empty'
  }
};
