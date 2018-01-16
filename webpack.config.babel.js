import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({template: './app/index.html'})

const APP_PATH = path.join(__dirname, 'app')
const BUILD_PATH = path.join(__dirname, 'dist')

const config = {
  output: {
    path: BUILD_PATH,
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  entry: [
    APP_PATH
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]' }
    ]
  },
  resolve: {
    modules: [path.resolve('./app'), 'node_modules']
  },
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: BUILD_PATH,
    inline: true,
    progress: true
  },
  plugins: [htmlWebpackPluginConfig]
}

export default config
