import pt from './pt-Hans.json' // 葡萄牙

import en from './en.json' //英语语言包

//繁体和简体调换一下，因为涉及的地方太多
import zh from './zh-Hans.json' // 中文繁体
import hkHans from './zh-Hant-manual.json' // 中文简体

import tl from './ph-Hans.json' // 菲律宾
import bnHans from './bn-Hans.json' // 孟加拉
import jaHans from './ja-Hans.json' // 日语
import thHans from './th-Hans.json' // 泰语
import esHans from './es-Hans.json' // 西班牙
import idHans from './id-Hans.json' // 印度尼西亚
import viHans from './vi-Hans.json' // 越南
import hiHans from './hi-Hans.json' // 印地语
import koHans from './ko-Hans.json' // 韩语

import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

//#ifdef H5
let is_lang = navigator.language.substring(0, 2);
//先独立出简体zh-CN
let is_langs = navigator.language;
if (is_langs == 'zh-CN') {
	is_lang = 'zh'
} else if (is_langs == 'zh-HK' || is_langs == 'zh-TW' || is_langs == 'zh-MO') {
	is_lang = 'zh-HK'
} else if (is_langs == 'fil') {
	is_lang = 'tl'
} else {
	is_lang = is_lang
}
// let is_lang = navigator.language;
// if (is_lang == 'fil') {
// 	is_lang = 'tl'
// } else if (is_lang == 'zh-CN') {
// 	is_lang = 'zh'
// } else {
// 	is_lang = is_lang
// }
// #endif

//#ifdef APP-PLUS
let is_systemInfo = uni.getSystemInfoSync();
let is_lang = is_systemInfo.language;
// #endif

const lang = uni.getStorageSync('language') || is_lang; //获取缓存中的语言
// VueI18n构造函数所需要的配置
const i18nConfig = {
	locale: lang, //当前语言
	// 所需要用的语言包
	messages: {
		zh, //简体
		'tl': tl, //菲律宾
		'en': en, //英语
		'pt': pt, //葡萄牙
		'bn': bnHans, //孟加拉
		'ja': jaHans, //日本
		'th': thHans, //泰语
		'es': esHans, //西班牙
		'id': idHans, //印度尼西亚
		'vi': viHans, //越南
		'hi': hiHans, //印地语
		'zh-HK': hkHans, //香港
		'ko': koHans //韩国
	}
}
const i18n = new VueI18n(i18nConfig)
export default i18n