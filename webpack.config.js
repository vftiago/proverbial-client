const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    // enable source maps for debugging
    devtool: "source-map",
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".json" ]
    },
    module: {
        rules: [ {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.js?$/,
                loader: "source-map-loader"
            }
        ]
    },
    externals: {
        // avoid bundling all our dependencies, which allows browsers to cache libraries between builds
        react: "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new HtmlWebpackPlugin( {
            title: 'Proverbial App',
            filename: './index.html'
        } )
    ]
};
