import webpack from "webpack";
const DotenvWebpackPlugin = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const devPlugins = [
    new DotenvWebpackPlugin({
        path: `./.env`
    })
];

const prodPlugins = [
    new webpack.EnvironmentPlugin(["BASE_URL", "GOOGLE_CLIENT_ID"])
];

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    // enable source maps for debugging
    devtool: "source-map",
    devServer: {
        port: 3000
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader"
            },
            {
                enforce: "pre",
                test: /\.js?$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ].concat(devPlugins)
};
