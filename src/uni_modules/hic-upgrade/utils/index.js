import config from '../config.js';
import { compareVersion } from '@/uni_modules/hic-plugin/js_sdk/tools/tools.js';

// 当前信息
const currentInfo = {
	platform: '',
	version: '',
	versionCode: 0
}
// 服务端信息
const serverInfo = {
	version: '',
	versionCode: 0,
	downloadUrl: '',
	wgtUrl: '',
	forceUpdate: false,
	isSilently: false,
	desc: ''
}

// 获取当前应用版本信息
getVersionInfo();

/**
 * @description 获取当前应用版本信息
 */
export function getVersionInfo () {
	const system = uni.getSystemInfoSync();	// 获取系统信息
	currentInfo.platform = system.platform;	// 客户端平台
	plus.runtime.getProperty(plus.runtime.appid, (res) => {
		// 获取当前 APP 版本号
		currentInfo.version = res.version;						// '1.0.0' 程序中显示的版本号
		currentInfo.versionCode = parseInt(res.versionCode);	// '100' 应用版本号(整数值), 升级判断
		// console.log('--- appVersion --->', plus.runtime.version);
		console.log('--- wgtVersion --->', res.version);
		console.log('--- wgtCode --->', res.versionCode);
	});
}

/**
 * @description 设置服务端信息
 * @param {String} version 向用户展示的版本号(字符串) (主版本号.子版本号.补丁版本号.日期版本号)
 * @param {Number, String} versionCode 内部版本号(整型), 仅用于应用市场、程序内部识别，判断新旧的用途(默认+1)
 * @param {String} downloadUrl 新版本下载地址 apk (ios为应用商店跳转地址)
 * @param {String} wgtUrl 新版本下载地址 wgt
 * @param {Boolean} forceUpdate 是否强制更新
 * @param {Boolean} isSilently 是否静默更新(只wgt有)
 * @param {String} desc 更新内容
 */
export function setServerInfo ({ version, versionCode, downloadUrl, wgtUrl, forceUpdate = 0, isSilently = 0, desc } = {}) {
	if (!version) {
		throw new Error('version is required');
	}
	serverInfo.version = version;
	const code = parseInt(versionCode);
	if (isNaN(code)) {
		throw new Error('versionCode must be number');
	}
	serverInfo.versionCode = code;
	serverInfo.downloadUrl = downloadUrl;
	serverInfo.wgtUrl = wgtUrl;
	serverInfo.forceUpdate = Boolean(forceUpdate);
	serverInfo.isSilently = Boolean(isSilently);
	serverInfo.desc = desc
}

/**
 * @description 判断是否有新版本
 * @param {Object} current 当前版本信息
 * @param {Object} server 服务器版本信息
 * @return {Boolean}
 */
export function isUpdate (current = currentInfo, server = serverInfo) {
	if (server.versionCode) {
		return current.versionCode < server.versionCode;
	}
	return compareVersion(current.version, server.version);
}

/**
 * @description 获取更新版本信息
 * @return {Object}
 * 	@param {Boolean} update 是否有新版本
 * 	@param {String} type 更新类型 wgt-热更新, apk-整包升级
 * 	@param {String} url 下载地址
 */
export function getUpdateInfo () {
	const result = {
		update: isUpdate(),
		type: '',
		url: ''
	};
	if (result.update) {
		const updatePosition = config.updatePosition;
		const cv = currentInfo.version.split('.');
		const sv = serverInfo.version.split('.');
		const c = [], s = [];
		for (let i = 0; i < updatePosition; i++) {
			c.push(cv[i] || '0');
			s.push(sv[i] || '0');
		}
		if (serverInfo.wgtUrl && c.every((item, i) => (parseInt(c[i]) === parseInt(s[i]))) ) {
			// 热更新 (前updatePosition个版本号一致)
			result.type = 'wgt';
			result.url = serverInfo.wgtUrl;
		} else {
			// 整包更新 涉及5+模块的修改 - 更新主版本号 || 没有wgt下载地址
			result.type = 'apk';
			result.url = serverInfo.downloadUrl;
		}
	}
	return result;
}

/**
 * @description 获取服务端版本信息
 * @return {Object}
 */
export function getServerVersion() {
	return {
		...serverInfo
	};
}

/**
 * @description 获取当前应用版本信息
 * @return {Object}
 */
export function getCurrentVersion () {
	return {
		...currentInfo
	};
}

/**
 * @description 跳转版本升级页面
 * @param {String} url 页面路径
 */
export function toUpgradePage (url = '/uni_modules/hic-upgrade/pages/upgrade') {
	return new Promise((resolve, reject) => {
		// 获取当前打开过的页面路由数组
		let routes = getCurrentPages();
		// 获取当前页面路由
		let curRoute = routes[routes.length - 1].route;
		if (curRoute === url) {
			// 已在页面 不跳转
			return resolve();
		}
		uni.navigateTo({
			url,
			success: (res) => {
				resolve();
			},
			fail: (err) => {
				console.log(err);
				reject(err);
			}
		})
	});
}

/**
 * @description 下载文件
 * @param {Object} url
 * @return {Promise} 临时文件路径
 */
export function downloadFile (url) {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url,
			success: (res) => {
				if (res.statusCode !== 200) {
					return reject(res);
				}
				resolve(res.tempFilePath);
			},
			fail: (err) => {
				console.log(err);
				reject(err);
			}
		});
	});
}

/**
 * @description 安装应用
 * @param {String} filePath 要安装的文件路径
 * @param {Boolean} force 是否强制安装
 */
export function installForAndroid (filePath, force = serverInfo.forceUpdate) {
	return new Promise((resolve, reject) => {
		plus.runtime.install(
			filePath,
			{ force },			// 应用安装设置的参数
			function () {
				// 安装完成 获取当前应用版本信息
				getVersionInfo();
				resolve();
			},
			function (err) {
				// 安装失败
				console.log(err);
				reject(err);
			}
		);
	});
}

/**
 * @description 重启当前的应用
 */
export function restartForAndroid () {
	plus.runtime.restart();
}

/**
 * @description iOS更新
 * ios 端，点击更新，直接跳入app store
 * 程序的操作行为:
 * 	Android平台上与系统的action值一致
 * 	iOS平台为要调用程序的URLScheme格式字符串
 */
export function updateForIOS () {
	// const appleId = 'xxx';
	// 调用第三方程序
	plus.runtime.launchApplication({
		// action: `itms-appss://apps.apple.com/app/id${appleId}?mt=8`
		action: serverInfo.downloadUrl
	}, (err) => { // 失败回调
		console.log(err);
		console.log('Open system default browser failed: ' + err.message);
	});
}

export const platform = currentInfo.platform;
