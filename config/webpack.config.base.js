//基本 配置文件

const path = require("path");
// 引入插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 清理dist文件夹
const CleanWebpackPlugin = require("clean-webpack-plugin");
// 抽取css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpack = require('webpack');
// 自动生成html的配置
// 引入多页面文件列表
const config = require("./config");
// 通过html-webpack-plugin 生成html集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {}

// 生成多页面的集合
config.HTMLDirs.forEach((page) => {
	const htmlPlugin = new HTMLWebpackPlugin({
		filename: `${page}.html`,
		template: path.resolve(__dirname, `../app/html/${page}.html`),
		chunks: [page, 'commons'],
	});
	HTMLPlugins.push(htmlPlugin);
	Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
})

// 主配置
module.exports = {
	//入口文件
	entry: Entries,
	//启用sourceMap
	devtool: "cheap-module-source-map",
	//输出文件
	output: {
		filename: "js/[name].bundle.[hash].js",
		path: path.resolve(__dirname, "../dist")
	},
	//加载器
	module: {
		rules:[
			{
				test: /\.css$/,
				// 不处理node_modules文件css
				exclude: /node_modules/,
				//抽取css文件到单独的文件夹
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					//在 css 中设置背景图像的 url 时，经常会找不到图片
					//（默认会在 css 文件所在的文件夹中寻找），这里设置 extract-text-webpack-plugin 插件的
					// publicPath 为图片文件夹所在的目录，就可以顺利找到图片了
					publicPath: config.cssPublicPath,
					use: [{
						loader: "css-loader",
						options: {
							// 开启css压缩
							minimize: true,
						}
					},{
						loader: "postcss-loader",
					}]
				})
			},
			{
				test: /\.scss$/,
				// 不处理node_modules文件css
				exclude: /node_modules/,
				//抽取css文件到单独的文件夹
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					//在 css 中设置背景图像的 url 时，经常会找不到图片
					//（默认会在 css 文件所在的文件夹中寻找），这里设置 extract-text-webpack-plugin 插件的
					// publicPath 为图片文件夹所在的目录，就可以顺利找到图片了
					publicPath: config.cssPublicPath,
					use: [{
						loader: "css-loader",
						options: {
							// 开启css压缩
							minimize: true,
						}
					},{
						loader: "postcss-loader",
					},{
						loader: "sass-loader"
					}]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						// 打包生成图片名字
						name: "[name].[ext]",
						// 图片生成的路劲 默认与htmlcssjs打包在意啊
						outputPath: config.imgOutputPath
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"]
			}
		],
	},
	//插件
	plugins: [
		// 自动清除dist文件夹
		new CleanWebpackPlugin(["dist"]),
		//将css抽取到牧歌文件夹
		new ExtractTextPlugin(config.cssOutputPath),
		// 自动生成HTML插件
		...HTMLPlugins,
		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jQuery",
			"window.jQuery": "jquery"
		})
	],
}