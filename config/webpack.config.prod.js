// 生产环境
const webpackBase = require("./webpack.config.base.js");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge")

const webpack = require("webpack");
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
	plugins: [
		// 代码压缩
		new webpack.optimize.UglifyJsPlugin({
			// 开启sourceMap
			sourceMap: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			// chunk名为commons
			name: "commons",
			filename: "js/commons.bundle.[hash].js"
		})
	]
})