import Vue from 'vue'
import Vuex from 'vuex'

// vuex 和持久化储存 vuex-persistedstate
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

//Vuex 的核心概念
//1、state 存储共享数据
//2、actions 接收组件发过来的请求（中转站）
//3、mutations 接受actions发过来的请求，对状态进行处理。
//4、getters 修改过后的状态
//5、modules 对不同的状态进行分类

import themes from './theme.js'
const store = new Vuex.Store({
	// plugins: [createPersistedState({
	// 	storage: window.localStorage, // 或者 sessionStorage
	// })],
	state: {
		currentTheme: "defaultTheme",
		themes: themes,
		url: '', //地址
		max: 0, //总时长
		schedule: 0, //进度
		list: [], //目录
		music: uni.createInnerAudioContext(), //创建播放器对象
		is_bf: false, //当前播放状态
		index: 0, //索引

	},
	actions: {
	
	},
	modules: {
	
	},
	getters: {
		theme(state) {
			return state.themes[state.currentTheme].style
		},
		currentTheme: state => state.currentTheme
	},
	mutations: {
		changeTheme(state, themeName = "defaultTheme") {
			state.currentTheme = themeName
			// 保存当前主题到本地存储
			uni.setStorageSync('currentTheme', themeName);
		},

		//设置播放列表
		setList(state, list) {
			state.list = list;
			//////console.log(state, list)
		},
		//设置播放路径
		setMusicUrl(state, index) {
			//////console.log(index)
			//设置索引
			state.index = index;
			//设置路径
			state.url = state.list[index].url;
			//播放器引入url
			state.music.src = state.list[index].url;
			//初始化播放进度
			state.music.startTime = 0;
			//开始播放
			state.music.play(); //执行播放
			//设置播放状态
			state.is_bf = true;
			//获取播放进度
			state.music.onTimeUpdate(() => {
				//设置总时长
				state.max = state.music.duration;
				//修改进度
				state.schedule = state.music.currentTime;
			})
		},
		//修改播放进度
		setSchedule(state, num) {
			state.schedule = state.max * num;
			state.music.currentTime = state.schedule;
		},
		//开始播放音频
		play(state, num) {
			state.is_bf = true;
			state.music.play();
		},
		//暂停当前播放的音频
		pause(state, num) {
			state.is_bf = false;
			state.music.pause();
		}
	}
})
export default store