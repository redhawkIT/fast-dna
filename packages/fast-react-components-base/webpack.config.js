const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDir = path.resolve(__dirname, "./app");
const outDir = path.resolve(__dirname, "./www");

module.exports = {
    entry: path.resolve(appDir, "index.tsx"),
    output: {
        path: outDir,
        filename: "[name].js"
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            contentBase: outDir,
        })
    ],
    devServer: {
        port: 7000,
        compress: false,
        open: true,
        overlay: true 
    }
}
