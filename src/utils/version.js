// import * as utils from '@/uni_modules/hic-upgrade/utils/index.js';
// import { toast } from '@/uni_modules/hic-plugin';

// /**
//  * @description 版本更新
//  * @param {Boolean} tip 是否显示提示信息
//  *  app初始化进行版本判断, 不显示提示信息   -> false
//  *  关于页面 手动点击版本更新, 显示提示信息   -> true
//  */
// export async function versionUpdate(tip) {
// 	// 1 请求返回服务端版本信息
// 	const res = await getLatestVersion({
// 		platform: utils.platform // 运行平台
// 	});
// 	if (!res) {
// 		if (tip) toast('暂无更新');
// 		return;
// 	}
// 	// 2 存储服务端版本信息
// 	utils.setServerInfo({
// 		version: res.versionName,
// 		versionCode: res.versionCode,
// 		downloadUrl: res.downloadUrl,
// 		wgtUrl: res.wgtUrl,
// 		forceUpdate: res.forceUpdate,
// 		isSilently: res.isSilently,
// 		desc: res.versionDesc
// 	});
// 	// 3 判断是否更新
// 	if (!utils.isUpdate()) {
// 		if (tip) toast('已是最新版本');
// 		return;
// 	}
// 	const updateInfo = utils.getUpdateInfo();
// 	const info = utils.getServerVersion();
// 	// 4 wgt 静默更新
// 	if (updateInfo.type == 'wgt' && info.isSilently) {
// 		const path = await utils.downloadFile(updateInfo.url);
// 		// 下载完成 直接安装 下次启动生效
// 		await utils.installForAndroid(path);
// 		return;
// 	}
// 	// 提示更新
// 	uni.$emit('ExamineAppUp',tip)
// }

// /**
//  * 模拟服务端请求
//  */
// function getLatestVersion(data) {
// 	return new Promise((resolve, reject) => {
// 		const wgtUrl = 'https://test.hftxhs.com/apk/pt5_1.0.6.wgt';
// 		setTimeout(function() {
// 			resolve({
// 				versionName: '1.0.5',
// 				versionCode: 105,
// 				downloadUrl: 'https://test.hftxhs.com/apk/pt5_1.0.5.apk',
// 				wgtUrl,
// 				forceUpdate: 0,
// 				isSilently: 0,
// 				versionDesc: '1.主版本号不同进行整包更新, 其余进行热更新\n2.子版本号不同进行整包更新, 其余进行热更新\n3.补丁版本号不同进行整包更新, 其余进行热更新'
// 			});
// 		}, 500);
// 	});
// }

// /*
// 哪个版本号不同进行整包更新 ('1.0.0'：主版本号.子版本号.补丁版本号.日期版本号)
// 值	说明
// 1	主版本号不同进行整包更新, 其余进行热更新
// 2	子版本号不同进行整包更新, 其余进行热更新
// 3	补丁版本号不同进行整包更新, 其余进行热更新
// 4	日期版本号不同进行整包更新, 其余进行热更新

// versionName	向用户展示的版本号，如：1.2.3
// versionCode	内部版本号（整型），如：123
// downloadUrl	新版本下载地址，apk（ios为App Store跳转地址）
// wgtUrl	新版本下载地址，wgt
// forceUpdate	是否强制更新 1是 0否
// isSilently	是否静默更新（wgt）1是 0否
// versionDesc	更新内容
// */