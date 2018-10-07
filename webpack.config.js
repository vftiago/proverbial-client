const DotenvWebpackPlugin = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "bundle.js",
		path: __dirname + "/dist",
	},
	// enable source maps for debugging
	devtool: "source-map",
	devServer: {
		port: 3000,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	mode: "none",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
			{
				enforce: "pre",
				test: /\.js?$/,
				loader: "source-map-loader",
			},
		],
	},
	plugins: [
		new DotenvWebpackPlugin({
			path: `./.env`,
			systemvars: true,
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};
