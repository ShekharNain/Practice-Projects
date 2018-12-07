const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        renderer: "./src/renderer.ts"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "awesome-typescript-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use: ["style-loader", "css-loader"], //for css files first run through css loader & then through style-loader
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "md-2-html",
            filename: 'index.html',
            path: path.resolve(__dirname, "./dist"),
            template: './src/index.ejs'
        })
    ]
}