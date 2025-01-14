import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import i18n from '@/locale/index.js'

// 将store挂载到Vue原型上，方便全局访问
import store from './store';
Vue.prototype.$store = store;

//主题配色
import mixin from '@/mixin/themeMixin.js'
Vue.use(mixin)
//初始化主题，从本地存储中获取之前保存的主题
const savedTheme = uni.getStorageSync('currentTheme');
if (savedTheme && store.state.themes[savedTheme]) {
	store.commit('changeTheme', savedTheme);
}

//引入uview插件
import uView from "uview-ui";
Vue.use(uView);

//设置统一的区号和网站名称
/*
	各个平台 
	1-聚豪娱乐(区号86)JUHAO.VIP
	2-菲律宾(区号63)FUNS.WIN
	3-日本(区号81)SHINUN.NET
	5-新葡京(区号86)K77.IO
	
	6-Q3.COM(区号855) 
	7-Q3.COM(区号63)
	8-Q3.COM(区号855)
	9-3Q(区号63)
	10-Bet18(区号63)
	11-3PJ.COM(区号86)
*/

/*
2-3-7-8-9使用老首页
1-5-6 使用新首页
*/

//设置是否开发环境或者生产环境来修改API接口域名  0开发 1生产
//打包正式改成1
const development = 0;

//设置所属平台ID
const currentPid = 8;

//生产环境中去掉console打印
if (development == 1) {
	console.log = () => {}
}

//设置环境
uni.setStorageSync('development',development);

//根据平台定义默认区号和默认站点名称
let platformAreaCode = '';
let platformName = '';
if (currentPid == 1) {

	platformAreaCode = '86';
	platformName = 'JUHAO.VIP';

} else if (currentPid == 2) {

	platformAreaCode = '63';
	platformName = 'FUNS.WIN';

} else if (currentPid == 3) {

	platformAreaCode = '81';
	platformName = 'SHINUN.NET';

} else if (currentPid == 5) {

	platformAreaCode = '86';
	platformName = 'K77.IO';

} else if (currentPid == 6) {

	platformAreaCode = '855';
	platformName = 'Q3.COM';

} else if (currentPid == 7) {

	platformAreaCode = '63';
	platformName = 'Q3.COM';

} else if (currentPid == 8) {

	platformAreaCode = '855';
	platformName = 'FUNS.WIN';

} else if (currentPid == 9) {

	platformAreaCode = '63';
	platformName = '3Q';

} else if (currentPid == 10) {

	platformAreaCode = '63';
	platformName = 'Bet18';

} else if (currentPid == 11) {

	platformAreaCode = '86';
	platformName = '3PJ.COM';

}
Vue.prototype.AreaCode = platformAreaCode;
Vue.prototype.WebsiteName = platformName;

let defaultPid = uni.getStorageSync('userinfo').platformId || currentPid;
let pid = defaultPid;
Vue.prototype.PID = pid;
Vue.prototype.OPERATORID = pid;


//判断开发环境还是生产环境来设置API域名 0开发 1生产
let baseUrl1 = '';
let baseUrl2 = '';
if (development == 0) {
	//https://lhtest1.gmscry.com:8443/p8
	baseUrl1 = 'https://www.iszhk.com:8443/p' + pid;
	baseUrl2 = 'https://www.iszhk.com:8443/p' + pid;
} else if (development == 1) {
	if (currentPid == 1) {
		baseUrl1 = 'https://game2.ckoghengg.com';
		baseUrl2 = 'https://game2.ckoghengg.com';
	} else if (currentPid == 2) {
		baseUrl1 = 'https://game.mzbxdt.com';
		baseUrl2 = 'https://game.mzbxdt.com';
	} else if (currentPid == 3) {
		baseUrl1 = 'https://gamejp.mzbxdt.com';
		baseUrl2 = 'https://gamejp.mzbxdt.com';
	} else if (currentPid == 5) {
		baseUrl1 = 'https://game5.mzbxdt.com';
		baseUrl2 = 'https://game5.mzbxdt.com';
	} else if (currentPid == 6) {
		baseUrl1 = 'https://game' + pid + '.mzbxdt.com';
		baseUrl2 = 'https://game' + pid + '.mzbxdt.com';
	} else if (currentPid == 7) {
		baseUrl1 = 'https://game' + pid + '.mzbxdt.com';
		baseUrl2 = 'https://game' + pid + '.mzbxdt.com';
	} else if (currentPid == 8) {
		baseUrl1 = 'https://game' + pid + '.mzbxdt.com';
		baseUrl2 = 'https://game' + pid + '.mzbxdt.com';
	} else if (currentPid == 9) {
		baseUrl1 = 'https://game' + pid + '.mzbxdt.com';
		baseUrl2 = 'https://game' + pid + '.mzbxdt.com';
	} else if (currentPid == 10) {
		baseUrl1 = 'https://game' + pid + '.mzbxdt.com';
		baseUrl2 = 'https://game' + pid + '.mzbxdt.com';
	} else if (currentPid == 11) {
		baseUrl1 = 'https://game' + pid + '.mzbxdt.com';
		baseUrl2 = 'https://game' + pid + '.mzbxdt.com';
	}
}
//API域名设置
Vue.prototype.$baseUrl = baseUrl1;
uni.$baseUrl = baseUrl2;

import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);
Vue.config.productionTip = false;

//公共方法
import $PublicFunction from '@/utils/Public.js';
Vue.prototype.$PublicFunction = $PublicFunction;

App.mpType = 'app'
const app = new Vue({
	...App,
	i18n
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif