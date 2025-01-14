import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locale/en.json'

//繁体和简体调换一下，因为涉及的地方太多，默认繁体zh
import zh from '@/locale/zh-Hans.json' // 中文繁体
import hkHans from '@/locale/zh-Hant-manual.json' // 中文简体


import pt from '@/locale/pt-Hans.json'
import tl from '@/locale/ph-Hans.json' // 菲律宾
import bnHans from '@/locale/bn-Hans.json' // 孟加拉
import jaHans from '@/locale/ja-Hans.json' // 日语
import thHans from '@/locale/th-Hans.json' // 泰语
import esHans from '@/locale/es-Hans.json' // 西班牙
import idHans from '@/locale/id-Hans.json' // 印尼
import viHans from '@/locale/vi-Hans.json' // 越南
import hiHans from '@/locale/hi-Hans.json' // 印地语
import koHans from '@/locale/ko-Hans.json' // 韩语

Vue.use(VueI18n)

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

const lang = uni.getStorageSync('language') || is_lang;
const i18n = new VueI18n({
	locale: lang,
	messages: {
		zh,
		'tl': tl,
		'en': en,
		'pt': pt,
		'bn': bnHans,
		'ja': jaHans,
		'th': thHans,
		'es': esHans,
		'id': idHans,
		'vi': viHans,
		'hi': hiHans,
		'zh-HK': hkHans,
		'ko': koHans
	}
});






// 连接
let socketTask = null
// 是否主动关闭连接
let meClose = false
//写你的后端连接地址
let url = ''
let development = uni.getStorageSync('development')
//console.log('development',development)
if (development == 0) {
	url = 'wss://www.iszhk.com:3010' //测试
} else {
	url = 'wss://play.mzbxdt.com:443' //正式
}

let token = null
// 重连定时器
let Time = null
// 心跳定时器
let XTime = null

let serialNo = uni.getStorageSync('thisUuid')
let machineName = uni.getStorageSync('machineName')
let ua = uni.getStorageSync('thisUa')

// 开启连接
const sokcet = (type) => {
	//判断是否有websocet对象，有的话清空
	if (socketTask) {
		socketTask.close()
		socketTask = null;
	}
	let is_Token = uni.getStorageSync("token")
	// 进行连接
	socketTask = uni.connectSocket({
		url: url,
		success(data) {
			clearInterval(XTime) //关闭心跳定时器
			//console.log("创建连接!");
		}
	});
	socketTask.onOpen((res) => {
		console.log('连接成功！');
		clearInterval(Time) //关闭定时器
		clearInterval(XTime) //关闭心跳定时器
		Time = null
		// 5秒发送一次心跳后端检测是否在线
		let num = 0
		XTime = setInterval(() => {
			num++
			if (num >= 2) {
				sendMsg(JSON.stringify({
					type: 'ping',
					cmd: 2,
					token: is_Token
				}))
			} else {
				sendMsg(JSON.stringify({
					cmd: 1,
					token: is_Token,
					deviceId: serialNo,
					deviceType: machineName
				}))
			}
			//console.log("心跳", num);
		}, 8000)

	});
	// 监听连接失败
	socketTask.onError((err) => {
		if (!meClose && Time == null) { //判断是否主动关闭进行重新连接
			//console.log('连接失败，请检查');
			reconnect()
		}
	})
	// 监听连接关闭close
	socketTask.onClose((e) => {
		if (!meClose && Time == null) { //判断是否主动关闭进行重新连接
			//console.log('连接关闭！', e, meClose);
			reconnect()
		}
	})
	// 监听收到信息
	socketTask.onMessage(function(res) {
		// 接收数据后回调
		let infos = JSON.parse(res.data)
		console.log('服务器内容:', infos);

		if (infos.cmd == 51) {
			stop()
			uni.removeStorageSync('userinfo');
			uni.removeStorageSync('token');
			uni.$emit("getinspectToken", 1)
			exitLogin(51)
		} else if (infos.cmd == 52) {
			stop()
			uni.removeStorageSync('userinfo');
			uni.removeStorageSync('token');
			uni.$emit("getinspectToken", 1)
			exitLogin(52)
		} else if (infos.cmd == 53) {
			//刷新用户余额
			uni.$emit('getgetMybalance', 1)

			//右上角飘窗
			uni.$emit('UpdataAddBcbalance', (infos.addBalance / 100).toFixed(2))
		} else if (infos.cmd == 54) {
			//显示通知红点
			uni.$emit('getMyUnread', 1)
		} else if (infos.cmd == 55) {
			//token过期或无效，进行重新登录
			stop()
			uni.removeStorageSync('token');
			uni.removeStorageSync("userinfo")
			uni.$emit('getinspectToken', 1)

			//#ifdef H5
			//let self_url = 'http://' + document.domain + '/#/';
			//window.location.href = self_url
			uni.reLaunch({
				url: '/pages/index/index'
			})
			//#endif

			//#ifdef APP-PLUS
			uni.reLaunch({
				url: '/pages/index/index'
			})
			//#endif
		} else if (infos.cmd == 56) {
			//VIP升级奖金提示uni.$emit("CongratulationsShow",{"cmd":56,"vip":10, "reward":10086})
			uni.$emit("CongratulationsShow", infos)

		} else if (infos.cmd == 57) {
			//生日奖金提示uni.$emit("HappyBirthdayShow",{"cmd":57,"date":"2024-06-01", "reward":10086})
			uni.$emit("HappyBirthdayShow", infos)
		} else if (infos.cmd == 58) {
			//未读消息提示
			//{"cmd":58,"unReadCnt":1, "lastMsg":"I love you"}
			uni.$emit("unReadCntShow", infos)
		}
	});
}
// 重新连接
const reconnect = () => {

	// 确保已经关闭后再重新打开
	socketTask.close()

	setTimeout(() => {
		socketTask = '';
		////console.log("重新连接中...");
		sokcet()
	}, 8000);
}
//向后端发送信息
const sendMsg = (msg) => {
	//连接发送数据
	socketTask.send({
		data: msg,
		success(res) {
			////console.log("心跳发送成功", msg);
		},
		fail(err) {
			////console.log("心跳发送失败", err, socketTask.readyState);

			//sendSocketMessage:fail Error: SocketTask.readyState is not OPEN"

			//进行重连
			reconnect()
		},
	});
}
// 手动关闭连接
const stop = () => {
	// 主动关闭连接
	meClose = true
	socketTask.close({
		success() {
			////console.log("手动关闭成功！");
			clearInterval(Time) //关闭定时器
			clearInterval(XTime) //关闭心跳定时器
			Time = null
			// 确保已经关闭
			socketTask = null;
		}
	})
}

//操作
const exitLogin = (type) => {
	if (type == 51) {
		uni.showModal({
			//title: '提示',
			content: i18n.tc('NewlyAdded.Signelsewhere'),
			showCancel: false,
			confirmColor: "#f00",
			confirmText: i18n.tc('SignoutPopup.outBtn'),
			success: function(res) {
				if (res.confirm) {

					//#ifdef H5
					//判断PC还是移动端
					let is_Mobile = 1
					let userAgent = navigator.userAgent.toLowerCase();
					if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
							userAgent)) {
						is_Mobile = 1
					} else {
						is_Mobile = 0
					}

					if (is_Mobile == 1) {
						uni.setTopWindowStyle({
							display: 'block',
							height: '59px'
						})
					} else {
						uni.setTopWindowStyle({
							display: 'block',
							height: '64px'
						})
						uni.setLeftWindowStyle({
							display: 'block',
							width: '230px'
						})
					}

					uni.reLaunch({
						url: '/pages/index/index'
					});
					//#endif

					//#ifdef APP-PLUS
					uni.reLaunch({
						url: '/pages/index/index'
					});
					//#endif

				} else if (res.cancel) {

				}
			}
		});
	} else if (type == 52) {
		uni.showModal({
			//title: '提示',
			content: i18n.tc('NewlyAdded.Disablereminder'),
			showCancel: false,
			confirmColor: "#f00",
			confirmText: i18n.tc('SignoutPopup.outBtn'),
			success: function(res) {
				if (res.confirm) {

					//#ifdef H5
					//判断PC还是移动端
					let is_Mobile = 1
					let userAgent = navigator.userAgent.toLowerCase();
					if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
							userAgent)) {
						is_Mobile = 1
					} else {
						is_Mobile = 0
					}

					if (is_Mobile == 1) {
						uni.setTopWindowStyle({
							display: 'block',
							height: '59px'
						})
					} else {
						uni.setTopWindowStyle({
							display: 'block',
							height: '64px'
						})
						uni.setLeftWindowStyle({
							display: 'block',
							width: '230px'
						})
					}

					uni.reLaunch({
						url: '/pages/index/index'
					});
					//#endif

					//#ifdef APP-PLUS
					uni.reLaunch({
						url: '/pages/index/index'
					});
					//#endif

				} else if (res.cancel) {

				}
			}
		});
	}
}


// 导出方法
export const websocetObj = {
	sokcet, //连接
	stop, //关闭
	sendMsg, //发送
};