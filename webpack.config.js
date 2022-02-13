const path = require('path')
const sass = require('sass')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    mode: 'development',
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html'
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            /** Babel **/
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            /** VUE **/
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }, 
            /** Files **/
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      limit: 5000,
                      name: 'img/[hash].[ext]'
                    }
                  }
                ]
            },
            /** Styles **/
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, 
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                        }
                    }
                ]
            }
        ],
    }
}