// 自动欠佳css前缀和美化
module.exports = {
	plugins: {
		'autoprefixer': {
			browsers: ['last 5 version', 'Android >= 4.0'],
			// 是否美化属性值
			cascade: true,
			// 是否去掉不必要的前缀
			remove: true
		}
	}
}