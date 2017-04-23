const config = require("./webpack.common.config");
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(config, {
    node: {
        net: true,
        tls: true,
    },
});
