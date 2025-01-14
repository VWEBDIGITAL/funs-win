import Vue from 'vue'

import {
	websocetObj
} from '@/utils/socket.js';

export default {
	RefreshToken(val) {
		/*uni.request({
			url: Vue.prototype.$baseUrl + '/refresh-token',
			data: {
				refreshToken: uni.getStorageSync("token")
			},
			method: "POST",
			header: {
				'Content-Type': 'application/json',
				//'authorization': uni.getStorageSync('token')
			},
			success: (res) => {
				if(res.data.code == 8 || res.data.message == "token invalid"){
					//console.log('刷新Token失败',res.data)
					
				} else {
					//console.log('刷新Token成功',res.data)
				}
			},
			fail: (err) => {
				
			}
		})*/
		uni.request({
			url: Vue.prototype.$baseUrl + '/login-token',
			data: {
				serialNo: uni.getStorageSync("serialNo"),
				machineName: uni.getStorageSync("machineName")
			},
			method: "POST",
			header: {
				'Content-Type': 'application/json',
				'authorization': uni.getStorageSync('token')
			},
			success: (res) => {

				if (res.data.code == 8 || res.data.message == "token invalid") {
					//console.log('Token登录失败', res.data)
					uni.removeStorageSync('token');
					uni.removeStorageSync("userinfo")
					uni.$emit('getinspectToken', 1)

					websocetObj.stop()
				} else {
					//console.log('Token登录成功', res.data)
					websocetObj.sokcet()
				}
			},
			fail: (err) => {

			}
		})
	},
}