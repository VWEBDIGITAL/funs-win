 if (process.env.NODE_ENV === 'production' || process.env.UNI_PLATFORM !== 'h5') {
	 }

// // #ifdef H5
module.exports = {
		//自定义插件在编译后的文件中删除uniapp cdn资源引用
		configureWebpack: (config) => {
 			// 编译后删除css文件里自带的uni-app资源引用  
			config.plugins.push(function(compiler) {
				const pathReg = /\s*background(-image)?:\s*url\(\S*?\/\/[\w\.-]*?dcloud.net.cn\S*?\);?[ \t]*/gi
				const fs = require('fs');
				const path = require('path');
				const eachReplace = (dirPath) => {
					fs.readdirSync(dirPath, {
						withFileTypes: true
					}).forEach(dirent => {
						const filePath = path.join(dirPath, dirent.name)
						if (dirent.isDirectory()) {
							eachReplace(filePath)
						} else if (dirent.isFile() && /.(c|ac|wx)ss$/.test(dirent.name)) {
							try {
 								const fileData = fs.readFileSync(filePath, 'utf8')
								if (pathReg.test(fileData)) {
 									fs.writeFileSync(filePath, fileData.replace(pathReg,''), 'utf8') 								}
 							} catch (e) {}
 						}
					})
				}
				compiler.hooks.done.tap('removeUniCdnPath', eachReplace.bind(null, process.env.UNI_OUTPUT_DIR))
			})
		}
 	}
 	// #endif