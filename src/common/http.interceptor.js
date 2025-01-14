import Vue from 'vue'

//引入uview插件
import uView from "uview-ui";
Vue.use(uView);
import {
	websocetObj
} from '@/utils/socket.js';
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: Vue.prototype.$baseUrl,
		loadingText: 'loading',
		showLoading: false, // 是否显示请求中的loading
		loadingTime: 800,
		originalData: true,
		dataType: 'json',
		header: {
			'content-type': 'application/json'
		},
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		let token = uni.getStorageSync("token");
		
		//#ifdef H5 || WEB
		let is_lang = uni.getLocale();
		//判断一下手机语言设置的菲律宾语言是fi开头
		// if (is_lang == 'tw') {
		// 	is_lang = 'zh-hk'
		// } else {
		// 	is_lang = is_lang
		// }
		// #endif
		
		//#ifdef APP-PLUS
		let is_systemInfo = uni.getSystemInfoSync();
		let is_lang = ''
		let Loclanguage = uni.getStorageSync("language");
		if(Loclanguage){
			is_lang = uni.getStorageSync("language");
			//console.log('app内设置语言存在',is_lang);
		} else {
			is_lang = is_systemInfo.language;
			if (is_lang == 'fil') {
				is_lang = 'tl'
			} else if(is_lang == 'zh-CN') {
				is_lang = 'zh'
			} else {
				is_lang = is_lang
			}
			//console.log('app内设置语言不存在',is_lang);
		}
		// #endif
		
		config.header.Authorization = token;
		config.header.lang = is_lang;
		return config;
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		//console.log('请求拦截',res)
		//判断code101维护系统
		if (res.data.code == 101){
			uni.setStorageSync('SystemMaintenanceData',res);
			uni.removeStorageSync('token');
			uni.removeStorageSync("userinfo");
			uni.reLaunch({
				url: '/pages/SystemMaintenance/SystemMaintenance'
			})
			return false
		} else if (res.data.code == 0) {
			return res.data;
		} else if (res.data.code == 7 || res.data.code == 8) {
			
			//先关闭wss链接
			//websocetObj.stop();
			uni.$emit('StartGuanBiWss', 1);
			
			setTimeout(()=>{
				uni.removeStorageSync('token');
				uni.removeStorageSync("userinfo");
				uni.$emit('getinspectToken', 1);
			},300);
			
			//刷新一下navbar组件的获取token方法
			//uni.$emit('OpenLogin', 1)

			uni.reLaunch({
				url: '/pages/index/index'
			})

			return false
		} else {
			uni.showToast({
				title: res.data.message,
				icon: 'none',
				duration: 3000
			})
			return false
		}
	}
}

export default {
	install
}