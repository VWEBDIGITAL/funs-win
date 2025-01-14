<script>
	import Vue from 'vue';
	//import FingerprintJS from '@fingerprintjs/fingerprintjs';
	import {
		decimalToBase
	} from '@/utils/Int2Base62Str.js';
	import domainNameList from '@/utils/domainName.json'
	//import Fingerprint2 from 'fingerprintjs2'
	import {
		websocetObj
	} from '@/utils/socket.js';
	export default {
		globalData: {
		},
		data() {
			return {
				secondnum: 0,
				timer: null,
			}
		},
		onLaunch: function() {
			//console.log('App Launch');
			let that = this
			let is_systemInfo = uni.getSystemInfoSync();
			console.log('系统信息', is_systemInfo);

			//H5生成浏览器唯一指纹
			// #ifdef H5
			that.getFingerprint(is_systemInfo.deviceId);
			// #endif

			//APP端判断本地是否存在uuid不存在则生成并储存
			// #ifdef APP-PLUS
			let uuid = uni.getStorageSync("thisUuid");
			if (!uuid) {
				let murmur = is_systemInfo.deviceId
				console.log('APP端生成UUID成功', murmur);
				uni.setStorageSync('thisUuid', murmur);
			} else {
				console.log('APP端本地存在uuid', uuid)
			}
			// #endif

			//设置设备类型
			uni.setStorageSync('DeviceType', is_systemInfo.deviceType);

			//设置状态栏高度
			uni.setStorageSync('statusBarHeight', is_systemInfo.statusBarHeight);

			uni.$on('StartOpenWss', (val) => {
				that.openwebSocket();
			});

			uni.$on('StartGuanBiWss', (val) => {
				that.GuanbiwebSocket();
			});


			//获取注册配置信息
			that.$u.post('/register/param', {

			}).then(res => {
				uni.setStorageSync('registerSet', res.data)
			})


			//设置支付域名
			that.$u.post('/platform/domain', {
				pid: that.PID, //Number 是 平台Id
			}).then(res => {
				uni.setStorageSync('domains', res.data.domain)
			})

			//设置音乐域名
			that.$u.post('/game/category', {
				pid: that.PID, //Number 是 平台Id
			}).then(res => {
				uni.setStorageSync('Musicdomains', res.data.domain);
			})

			//获取APP更新版本号
			that.$u.post('/client/version', {
				pid: that.PID, //Number 是 平台Id
				platform: is_systemInfo.platform
			}).then(res => {
				uni.setStorageSync('apkUrl', res.data.downloadUrl) || '';
				uni.setStorageSync('ipaUrl', res.data.descFileUrl) || '';
			})

			//获取落地页域名
			// that.$u.post('/game/domain', {
			// 	pid: that.PID, //Number 是 平台Id
			// }).then(res => {
			// 	uni.setStorageSync('LuoDidomain', res.data.domain)
			// })


			// #ifdef APP-PLUS
			//获取剪切板内容
			uni.getClipboardData({
				success: function(res) {
					console.log('剪切板内容', res.data);
					if (res.data) {

						//判断一下复制的是内容前三位是否为pid，如果没有pid就不是从我们H5安装复制的
						let Three = res.data.substring(0, 3); // 获取前三个字符
						let orThree = res.data.substring(3); // 去掉前三个字符
						console.log('前三位是否为pid', Three);
						console.log('去掉pid后', orThree);

						if (Three == 'pid') {
							//设置父级id到缓存，如果有就不存了
							let ifPid = uni.getStorageSync('channel_id');
							if (!ifPid) {
								uni.setStorageSync('channel_id', orThree);
								console.log('不存在PID', ifPid)
							} else {
								console.log('存在PID', ifPid)
							}
						} else {
							console.log('不是从pid三个字来的，设置默认渠道ID');
							uni.setStorageSync('channel_id', 2);
						}
					}
				},
				fail: (err) => {
					console.log('剪切板错误', err)
				}
			});

			//APP只允许竖屏
			plus.screen.lockOrientation("portrait-primary");
			//接收从H5页面打开APP的参数
			var args = plus.runtime.arguments;
			console.log('H5网址参数', JSON.stringify(args))
			if (args) {
				//对传来的参数做处理并跳转
				let arg = args.split("://")
				// 处理args参数，如直达到某新页面等
				console.log('处理过的H5参数', arg[1])

				if (!arg[1]) {
					//console.log('不存在pid')
				} else {

					//设置父级id到缓存，如果有就不存了
					let ifPid = uni.getStorageSync('pid')
					if (!ifPid) {
						uni.setStorageSync('pid', arg[1]);
						console.log('不存在PID', ifPid)
					} else {
						console.log('存在PID', ifPid)
					}

					//跳转到响应页面
					uni.navigateTo({
						url: '/pages/index/index'
					})
				}
			}
			// #endif


			//#ifdef H5

			let is_lang = navigator.language.substring(0, 2);

			//先独立出简体zh-CN
			let is_langs = navigator.language;
			//alert(is_langs)
			if (is_langs == 'zh-CN') {
				is_lang = 'zh'
			} else if (is_langs == 'zh-HK' || is_langs == 'zh-TW' || is_langs == 'zh-MO') {
				is_lang = 'zh-HK'
			} else if (is_langs == 'fil') {
				is_lang = 'tl'
			} else {
				is_lang = is_lang
			}



			//判断一下手机语言设置的菲律宾语言是fil开头
			// if (is_lang == 'fil') {
			// 	is_lang = 'tl'
			// } else if(is_lang == 'zh-CN') {
			// 	is_lang = 'zh'
			// } else {
			// 	is_lang = is_lang
			// }
			console.log('当前手机语言', is_lang);

			// #endif

			//#ifdef APP-PLUS
			let is_lang = is_systemInfo.language;
			if (is_lang == 'fil') {
				is_lang = 'tl'
			} else if (is_lang == 'zh-CN' || is_lang == 'zh-Hans-CN' || is_lang == 'zh-Hant-CN' || is_lang ==
				'zh-Hans-CN' || is_lang == 'zh-Hans-US' || is_lang == 'en-CN' || is_lang == 'en-US') {
				is_lang = 'zh'
			} else {
				is_lang = is_lang
			}
			console.log('当前手机语言', is_lang);
			// #endif

			const lang = uni.getStorageSync('language') || is_lang;
			that.$i18n.locale = lang;

			//判断是否WebApp启动，传给后台做分析
			let isWebapp = 0
			// #ifdef H5
			uni.setLocale(lang);

			if (window.navigator.standalone == true) {
				//alert('IOS-是从桌面中打开的')
				isWebapp = 1
			} else if (window.matchMedia("(display-mode: standalone)").matches) {
				//alert('android-是从桌面中打开的')
				isWebapp = 2
			} else {
				//浏览器打开的
				isWebapp = 0
			}
			// #endif


			//生成SystemInfo
			let isSystem = uni.getStorageSync('machineName');
			if (!isSystem) {
				//console.log('不存在设备信息,开始获取...')
				uni.getSystemInfo({
					success: function(res) {

						uni.setStorageSync('machineName', isWebapp + '_' + res.uniPlatform + '_' + res
							.deviceType + '_' + res.deviceModel + '_' + res.browserName + '_' + res
							.screenWidth + '_' + res.screenHeight + '_' + res.language);
						uni.setStorageSync('thisUa', res.ua);

						//window.localStorage.setItem('machineName', res.model + '_' + res.browserName + '_' + res.screenWidth + '_' + res.screenHeight + '_' + res.language);
						//window.localStorage.setItem('thisUa', res.ua);

						console.log('获取设备信息成功', res);
						// uni.showModal({
						// 	title: '生成设备信息成功',
						// 	content: JSON.stringify(res),
						// 	success: function(res) {}
						// });
					},
					fail(err) {
						uni.showModal({
							title: '生成设备信息失败',
							content: JSON.stringify(err),
							success: function(res) {}
						});
					}
				});
			} else {
				//console.log('本地存在设备信息', isSystem);
				// uni.showModal({
				// 	title: '本地存在设备信息',
				// 	content: JSON.stringify(isSystem),
				// 	success: function(res) {}
				// });
			}

			// #ifdef H5
			document.title = this.WebsiteName;

			// 动态修改网页icon角标
			let link = '/static/logo/' + that.PID + '_logo.png';
			let $favicon = document.querySelector('link[rel="icon"]');
			if ($favicon !== null) {
				$favicon.href = link;
			} else {
				$favicon = document.createElement("link");
				$favicon.rel = "icon";
				$favicon.href = link;
				document.head.appendChild($favicon);
			}

			// 动态修改webapp图标
			let iconlink = '/static/logo/' + that.PID + '_logo.png';
			let $favicon2 = document.querySelector('link[rel="apple-touch-icon-precomposed"]');
			if ($favicon2 !== null) {
				$favicon2.href = iconlink;
			} else {
				$favicon2 = document.createElement("link");
				$favicon2.rel = "apple-touch-icon-precomposed";
				$favicon2.href = iconlink;
				document.head.appendChild($favicon2);
			}

			// 动态修改webapp名字
			let websitename = this.WebsiteName;
			let $favicon3 = document.querySelector('meta[name="application-name"]');
			if ($favicon3 !== null) {
				$favicon3.content = websitename;
			} else {
				$favicon3 = document.createElement("meta");
				$favicon3.name = "application-name";
				$favicon3.content = websitename;
				document.head.appendChild($favicon3);
			}

			// 动态修改浏览器名称
			let websitenames = this.WebsiteName;
			let $favicon4 = document.querySelector('meta[name="apple-mobile-web-app-title"]');
			if ($favicon4 !== null) {
				$favicon4.content = websitenames;
			} else {
				$favicon4 = document.createElement("meta");
				$favicon4.name = "apple-mobile-web-app-title";
				$favicon4.content = websitenames;
				document.head.appendChild($favicon4);
			}



			//设置Meta Pixel url参数ID
			var url = window.location.search;
			var bindChannel = new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				var strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					bindChannel[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
				}
			}
			let Pixel_id = bindChannel.fb_dynamic_pixel
			console.log('Meta Pixel', Pixel_id)
			uni.setStorageSync('Pixel_id', Pixel_id)
			if (Pixel_id) {
				! function(f, b, e, v, n, t, s) {
					if (f.fbq) return;
					n = f.fbq = function() {
						n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
					};
					if (!f._fbq) f._fbq = n;
					n.push = n;
					n.loaded = !0;
					n.version = '2.0';
					n.queue = [];
					t = b.createElement(e);
					t.async = !0;
					t.src = v;
					s = b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t, s)
				}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', Pixel_id);
				fbq('track', 'PageView');
			}

			//设置状态栏颜色5+app使用
			// if (window.plus) {
			// 	plus.navigator.setStatusBarBackground("$all-secondary-color"); //白色背景
			// 	plus.navigator.setStatusBarStyle('light'); //黑色字体
			// } else {
			// 	document.addEventListener("plusready", function() {
			// 		plus.navigator.setStatusBarBackground("$all-secondary-color");
			// 		plus.navigator.setStatusBarStyle('light');
			// 	}, false);
			// }


			//友盟统计添加
			const script = document.createElement("script");
			script.src = "https://s9.cnzz.com/z.js?id=1281395504&async=1";
			script.language = "JavaScript";
			document.body.appendChild(script);

			//获取url参数
			let hostname = window.location.hostname
			let channel_id = null
			console.log('当前访问域名', hostname);

			//储存当前访问域名作为展示使用
			uni.setStorageSync('LuoDidomain', hostname);

			//官网判定q3.com 做一个判定，如果手机是中文就跳转 38q3.com
			//如果手机是英文及其他语言就跳转 10q3.com
			if (hostname == 'q3.com' && is_lang == 'zh') {
				window.open("38q3.com", "_self");
			} else if (hostname == 'q3.com' && is_lang != 'zh') {
				window.open("10q3.com", "_self");
			}


			//开始获取网址中的参数
			var url = window.location.search;
			var bindChannel = new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				var strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					bindChannel[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
				}
			}

			//有个渠道需要在他的马甲包里面不显示安装app提示，所以用此方法
			let UnityisApp = bindChannel.isApp || false
			uni.setStorageSync("UnityisApp", UnityisApp);


			/* 给某个域名绑定推荐渠道id */
			/* 方式二 把当前访问域名传给接口，从接口中获取渠道号 */

			//let WWWList = domainNameList.list;
			//console.log(WWWList);
			//let wangzhiNei = hostname;
			let currentAgentid = ""
			// WWWList.forEach((item, index) => {
			// 	if (item.name == wangzhiNei) {
			// 		currentAgentid = decimalToBase(item.id)
			// 	}
			// });

			that.$u.post('/query/domain/channel', {
				domain: hostname
			}).then(res => {
				console.log('请求渠道ID', res.data.channelId);
				currentAgentid = decimalToBase(res.data.channelId);
				console.log('当前访问域名的代理id', currentAgentid);


				//判断优先使用i=的推荐id
				//如果网址不存在i=并且域名是事先设置好的归属就按照写死的
				//如果网址中存在i=不管域名了，就按照i=的归属
				if (bindChannel.i) {
					console.log('网址存在i=', bindChannel.i)
					channel_id = bindChannel.i
				} else {
					console.log('网址不存在i=')
					if (currentAgentid != "") {
						channel_id = currentAgentid
					} else {
						channel_id = bindChannel.i
					}
				}

				//先存储推荐人id
				console.log('推荐人id', channel_id, hostname)
				if (!channel_id) {
					console.log('邀请人id不存在就默认归向2');
					uni.setStorageSync('channel_id', '2');
				} else {
					uni.setStorageSync('channel_id', channel_id);
				}

			}).catch(err => {});
			// #endif
			let isToken = uni.getStorageSync("token")
			if (!isToken) {

			} else {
				// #ifdef H5
				that.$u.post('/login-token', {
					serialNo: uni.getStorageSync('thisUuid'),
					machineName: uni.getStorageSync('machineName')
				}).then(res => {

					//更新缓存token
					uni.setStorageSync('token', res.data.token)
					uni.setStorageSync('userinfo', res.data);

				}).catch(err => {
					uni.removeStorageSync('token');
					uni.removeStorageSync("userinfo")
					uni.$emit('getinspectToken', 1)
					websocetObj.stop()
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 200)
				})
				// #endif
			}
		},
		// #ifdef H5
		watch: {
			$route() {
				if (window._czc) {
					let location = window.location;
					let contentUrl = location.pathname + location.hash;
					let refererUrl = "/";
					window._czc.push(["_trackPageview", contentUrl, refererUrl]);
				}
			}
		},
		// #endif
		onShow: function() {
			console.log('App Show')

			//清除定时器
			clearInterval(this.timer);
			this.timer = null;
			this.secondnum = 0

			//创建Websocket
			let isToken = uni.getStorageSync("token")
			if (!isToken) {} else {

				//this.$PublicFunction.RefreshToken()

				websocetObj.sokcet()

				let gamesUrl = uni.getStorageSync("PlayGamesUrl")
				if (!gamesUrl) {
					this.outBalance()
					console.log('不在游戏中')
				} else {
					console.log('在游戏中,不做下分处理')
				}

				//刷新用户余额
				uni.$emit('getgetMybalance', 1)

			}
		},
		onHide: function() {
			console.log('App Hide')
			let that = this
			let isToken = uni.getStorageSync("token")
			if (!isToken) {} else {
				websocetObj.stop()
			}

			// #ifdef H5
			that.timer = setInterval(() => {
				that.secondnum++
				console.log(that.secondnum)
				if (that.secondnum >= 300) {
					console.log('离开了页面180秒')

					uni.showModal({
						title: '提示',
						content: '当前页面已更新,刷新网页即可恢复正常',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.reLaunch({
									url: '/pages/index/index'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

					//清除定时器
					clearInterval(that.timer);
					that.timer = null;
				}
			}, 1000);
			// #endif

		},
		methods: {
			//生成浏览器唯一指纹信息
			async getFingerprint(deviceId) {
				// const fp = await FingerprintJS.load();
				// const options = {
				// 	excludes: {
				// 		// 排除以下因素，根据需要可以添加更多
				// 		userAgent: true, // 排除User-Agent
				// 		language: true, // 排除语言信息
				// 		colorDepth: true, // 排除颜色深度
				// 		pixelRatio: true, // 排除像素比
				// 		screenResolution: true, // 排除屏幕分辨率
				// 		availableScreenResolution: true, // 排除可用屏幕分辨率
				// 		plugins: true, // 排除插件信息
				// 		canvas: true, // 排除canvas指纹信息
				// 		webgl: true, // 排除WebGL指纹信息
				// 		audio: true, // 排除音频指纹信息
				// 		vibrate: true, // 排除震动指纹信息
				// 		touchSupport: true, // 排除触摸支持信息
				// 		indexedDb: true, // 排除IndexedDB指纹信息
				// 		addBehavior: true, // 排除addBehavior指纹信息
				// 		openDatabase: true, // 排除openDatabase指纹信息
				// 		cpuClass: true, // 排除CPU类指纹信息
				// 		audioBaseLatency: true,
				// 		colorGamut: true,
				// 		contrast: true,
				// 		vendor: true,
				// 	}
				// };
				let uuid = uni.getStorageSync("thisUuid");
				if (!uuid) {
					console.log('本地不存在uuid,生成中...', deviceId);
					//const result = await fp.get(options);
					//console.log('打印指纹信息', result.visitorId);
					uni.setStorageSync('thisUuid', deviceId);
				} else {
					console.log('本地存在uuid', uuid);
				}
			},

			openwebSocket() {
				websocetObj.sokcet();
			},
			GuanbiwebSocket() {
				websocetObj.stop();
			},
			// 以前有个接口/transfer-out-balance，以前调用这个接口的地方改成/refresh-balance。
			// 然后，当后台切换到前台的时候，调用一下：/transfer-out-balance（如果游戏webview没有关闭的情况下[就是当前界面是游戏webview] 就不要调用）
			// 这个接口的意思是从第三方下分回来，因为很多用户在游戏中就直接切换进后台了，没有直常退出游戏，导致用户的余额留在了第三方。
			outBalance() {
				uni.request({
					url: Vue.prototype.$baseUrl + '/transfer-out-balance',
					data: {},
					method: "POST",
					header: {
						'Content-Type': 'application/json',
						'Authorization': uni.getStorageSync('token')
					},
					success: (res) => {
						//刷新用户余额
						uni.$emit('getgetMybalance', 1)
					},
					fail: (err) => {}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/iconfont/iconfont.css';
	@import "@/uview-ui/index.scss";
	//@import "@/uview-ui/global.scss";

	@font-face {
		font-family: 'YourFont'; // 此处填写你的字体名称
		src: url('/static/fonts/Montserrat-Regular-8.otf'); // 此处填写你字体文件的路径
	}

	.page_boxs {
		height: calc(100vh);
		background-color: $body-bg-color !important;
	}

	/deep/ uni-canvas canvas {
		border-radius: 20rpx;
	}

	page {
		//background-color: $body-bg-color !important;
		height: 100%;
		min-height: 100%;
	}

	image {
		vertical-align: bottom;
	}

	body {
		font-family: 'YourFont' !important; // 设置全局字体为你的字体
		background-color: #0d131c !important;
	}

	body,
	uni-page-body {
		//background-color: #0d131c !important;
	}

	//文字模糊看不清效果
	.wangzhi {
		margin: 0 8rpx 0 8rpx;
		color: transparent !important;
		text-shadow: #ffffff 0 0 4px;
	}

	.hide_window {
		display: none !important;
	}

	.rank_icon {
		width: 40rpx;
		height: 40rpx;
		margin: 0 10rpx 0 0;
	}

	//经常用flex布局来实现左侧固定右侧自适应，但右侧有元素设置了white-space:nowrap属性，就会将flex的min-width设置为auto（原本是0），这时候宽度就会撑开：
	//解决方法是给自适应的那个元素，添加 min-width：0;
	uni-main {
		min-width: 0;
	}

	.uni-top-window {
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.22);
		overflow: visible !important;
	}

	.container {
		margin-inline: auto;
		//max-width: 1648px;
		width: 100%;
	}

	.cell-hover-class {
		background-color: rgb(235, 237, 238);
	}

	/* 或者单是设置透明度 */
	.cell-hover-class {
		opacity: 0.5;
	}

	/deep/ uni-page-refresh .uni-page-refresh {
		z-index: 999 !important;
	}

	.reg_title {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			font-size: 30rpx;
			color: $pupUp-title-color;
			font-weight: bold !important;
		}
	}

	/* 鼠标点击手势 */
	.shoushi {
		cursor: pointer;
	}


	//如果是想在有 leftwindow 等窗体的时候，隐藏 tabar 页面的 tabbar
	.uni-app--showleftwindow+.uni-tabbar-bottom {
		display: none;
	}

	.page_pc_flex {
		display: -webkit-box;
		align-items: flex-start;

		.left_windows {}

		.page_right_windows {
			flex: 1;
		}
	}


	// portrait 为判断为竖屏
	@media only screen and (orientation: portrait) {

		// 需求代码
		.u-input__input {
			min-height: 30px;
			font-size: 15px;
		}

		/deep/ .u-cell-item-box {
			image {
				width: 14px !important;
				height: 14px !important;
			}
		}

		/deep/ .u-tabbar__content__item__button {
			image {
				width: 16px !important;
				height: 16px !important;
			}
		}
	}

	// landscape 为判断为横屏
	@media only screen and (orientation: landscape) {
		@media screen and (min-width: 1024px) {
			// html {
			// 	max-width: 430px;
			// 	margin: 0 auto;
			// }

			// body {
			// 	max-width: 430px;
			// 	margin: 0 auto;
			// }

			// /deep/ .u-navbar {
			// 	max-width: 430px;
			// 	margin: 0 auto;
			// }

			// /deep/ .u-tabbar__content {
			// 	right: 0;
			// 	max-width: 430px;
			// 	margin: 0 auto;
			// }
		}

		// 需求代码
		.u-input__input {
			min-height: 30px;
			font-size: 15px !important;
		}

		/deep/ .u-cell-item-box {
			image {
				width: 14px !important;
				height: 14px !important;
			}
		}

		/deep/ .u-tabbar__content__item__button {
			image {
				width: 16px !important;
				height: 16px !important;
			}
		}

		/deep/ .LoadJuZhong {
			top: 14% !important;
		}

		/deep/ .jrsx_picture {
			height: 140px !important; //276px
		}
	}

	/deep/ .u-round-circle {
		border-radius: 18px !important;
	}

	/deep/ .u-round-circle::after {
		border-radius: 18px !important;
	}

	//栏加载图片
	.goods-icon {
		width: 100%;
		height: auto;
		border-radius: 18rpx;
		margin: 0 auto 0;
		//background-color: #1d2532;
	}

	/deep/ uni-button:after {
		border-radius: 20px !important;
	}

	.Register_btn {
		/deep/ uni-button {
			background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			position: relative;
			z-index: 2;
			color: #ffffff !important;
			border-radius: 10px;
			font-weight: bold;
		}

		/*/deep/ .u-btn--primary {
			background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			position: relative;
			z-index: 2;
			color: #ffffff !important;
			border-radius: 8px;
		}*/
	}

	.sevae_btn {
		/deep/ uni-button {
			background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			position: relative;
			z-index: 2;
			color: #ffffff !important;
			border-radius: 8px;
			font-weight: bold;
		}

		/*/deep/ .u-btn--primary {
			background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			position: relative;
			z-index: 2;
			color: #ffffff !important;
			border-radius: 8px;
		}*/
	}



	/deep/ .uni-mask {
		backdrop-filter: blur(6px);
		/* 背景模糊 */
		-webkit-backdrop-filter: blur(6px);
		/* 兼容老版本 Safari */
	}

	/deep/ uni-modal .uni-modal {
		border-radius: 20rpx !important;
		//width: 95% ;
		//max-width: 95%;
	}

	/deep/ .u-size-default {
		height: 48px !important;
		line-height: 48px !important;
	}

	.u-loading22 {
		padding: 0 0 0 0;
		text-align: center;
		height: 3000rpx;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		position: relative;

		.loader {
			top: 50rpx !important;
		}

		image {
			text-align: center;
			width: 140rpx;
			height: 18px;
		}
	}

	.reg_title {
		width: 100%;
		position: sticky;
		top: 0;
		right: 0;
		left: 0;
		z-index: 200;
		border-bottom: 1px solid $pupUp-title-border-color;
		padding: 30rpx 30rpx !important;
		background: $pupUp-title-bg-color !important;
		box-shadow: 0 0 8px 0px #00000014;

		view {
			color: $pupUp-title-color !important;
			font-weight: 700;
			font-size: 38rpx !important;
		}
	}

	.install_popup {
		position: relative;

		/deep/ .u-drawer-bottom {
			background-color: $pupUp-bg-color !important;
		}

		.installapp_tiobg {
			position: relative;
			border-radius: 20rpx 20rpx 0 0;
			margin-bottom: 30rpx;

			.top_app_title {
				text-align: center;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				margin: 0 auto;
				z-index: 2;
				padding: 50rpx 0 0 0;

				view:nth-child(1) {
					color: #8797ae;
					margin-bottom: 10rpx;
				}

				view:nth-child(2) {
					font-weight: bold;
					font-size: 46rpx;
					color: #fff;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			}

			image {
				border-radius: 35rpx 35rpx 0 0;
				width: 100%;
				height: 860rpx;
			}
		}

		.bIaoti_top {
			//position: fixed;
			top: 0;
			z-index: 3;
			width: 100%;
			background-color: $pupUp-bg-color;

			.today_hide {
				color: $all-secondary-text-color;
				padding: 30rpx 40rpx;

				.checkbox {
					color: $all-secondary-text-color;
				}
			}

			.tabs_sm {
				width: 92%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: $all-secondary-color;
				border-radius: 19rpx;
				padding: 10rpx;

				view {
					font-weight: bold;
					color: #54647d;
					flex: 1;
					text-align: center;
					height: 80rpx;
					line-height: 80rpx;

					.u-icon {
						margin-right: 6rpx;
					}
				}

				.curbg {
					background-color: #2283f6 !important;
					color: #ffffff !important;
					border-radius: 14rpx;
				}
			}
		}

		.install_popup_box {
			padding: 30rpx 30rpx 30rpx 30rpx;

			.step_box {
				padding: 20rpx 0;
				text-align: center;

				.step_box_title {
					color: $all-secondary-text-color;
					font-size: 44rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				.step_info {
					color: #8797ae;
				}

				image {
					margin: 30rpx 0 0 0;
				}
			}

			.installTitle {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 30rpx 0 10rpx 0;
				color: $all-secondary-text-color;
				font-size: 40rpx;
				font-weight: bold;
			}

			.Browser_title {
				color: $all-secondary-text-color;
				font-size: 34rpx;
				text-align: center;
			}

			.install_sm_wrap {
				position: relative;
				z-index: 2;

				.installbg1 {
					position: relative;

					image {
						width: 100%;
						height: 484rpx;
					}

					.url_link {
						font-size: 26rpx;
						color: #606266;
						position: absolute;
						left: 0;
						right: 0;
						top: 16.8%;
						margin: 0 auto;
						z-index: 9;
						width: 48%;
					}
				}

				.install_sming_anzhuo {
					top: 75% !important;
				}

				.install_sming {
					padding: 40px 20px 20px 20px;
					width: 100%;
					z-index: 2;
					// position: absolute;
					// top: 52%;
					// left: 50%;
					// transform: translate(-50%, -50%);

					.Safari_title {
						color: $all-secondary-text-color;
						font-size: 34rpx;
						text-align: center;
					}

					.sming_text {
						display: flex;
						align-items: flex-start;
						margin-bottom: 30rpx;

						image {
							width: 30rpx;
							height: 40rpx;
						}

						view {
							padding-left: 20rpx;
							flex: 1;
							color: #8797ae;
						}
					}

					.sming_text2 {
						display: flex;
						align-items: flex-start;
						margin-bottom: 30rpx;

						image {
							width: 10rpx;
							height: 40rpx;
						}

						view {
							padding-left: 20rpx;
							flex: 1;
							color: #8797ae;
						}
					}
				}

				.installbg2 {
					position: relative;

					image {
						width: 100%;
						height: 484rpx;
					}

					.url_link {
						font-size: 26rpx;
						color: #606266;
						position: absolute;
						left: 0;
						right: 0;
						top: 23.8%;
						margin: 0 auto;
						z-index: 9;
						width: 48%;
					}
				}

				.installbg3 {
					position: relative;

					image {
						width: 100%;
						height: 588rpx;
					}

					.url_link {
						font-size: 26rpx;
						color: #333;
						position: absolute;
						left: 0;
						right: 0;
						top: 16.8%;
						margin: 0 auto;
						z-index: 9;
						width: 45%;
					}
				}
			}

			.install_botton {
				margin-top: 40rpx;

				.install_sming {
					padding: 0 40rpx;
					width: 100%;

					.sming_text {
						display: flex;
						align-items: flex-start;
						margin-bottom: 30rpx;

						image {
							width: 30rpx;
							height: 40rpx;
						}

						view {
							padding-left: 20rpx;
							flex: 1;
							color: #8797ae;
						}
					}
				}
			}

		}
	}

	.install_webapp_home {
		position: fixed !important;
		width: 50% !important;
		max-width: 70%;
		z-index: 98;
		left: 0;
		right: 0;
		margin: 0 auto;
		height: auto !important;
		bottom: 85px;
		padding: 22rpx !important;
		background-image: linear-gradient(to right, #548dff, #0c5eff) !important;
		border-radius: 16rpx;
		animation: jump 3s infinite;
		box-shadow: none !important;
		background-color: transparent !important;
		// 写在需要添加底部边距的盒子上
		//padding-bottom: calc(constant(safe-area-inset-bottom) + 58px); /*兼容 IOS<11.2*/
		//padding-bottom: clac(env(safe-area-inset-bottom) + 58px); /*兼容 IOS>11.2*/
		// 就是在适配底部小黑条的基础上又增加了50rpx的底部内边距
	}

	@keyframes jump {

		0%,
		100% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-10px);
		}
	}

	.install_webapp {
		position: relative;
		width: 100%;
		background-color: #1d2532;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 58px;
		padding: 30rpx 20rpx 20rpx 20rpx;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.22);

		.mini_logo {
			width: 80rpx;
			height: 80rpx;
			border-radius: 16rpx;
		}

		.mini_logo2 {
			width: 45rpx;
			height: 45rpx;
			border-radius: 8rpx;
		}

		.install_info {
			padding: 0 16rpx;
			flex: 1;

			view:nth-child(1) {
				color: #ffffff;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;

				span {
					color: #fab208;
					padding-left: 2px;
				}
			}

			view:nth-child(2) {
				color: #546676;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
		}

		.install_btn {
			position: relative;
			width: auto;

			span {
				padding: 0 20rpx;
				//width: 140rpx;
				color: $all-secondary-text-color;
				display: inline-block;
				background-color: #3673D9;
				background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
				box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
				border-radius: 6px;
				height: 56.94rpx;
				line-height: 56.94rpx;
				text-align: center;
				position: relative;
				z-index: 2;
				transition: transform .1s ease-in-out;
				padding: 0 20rpx;
			}
		}

		.install_btn:after {
			padding: 0 20rpx;
			border-radius: 6px;
			height: 56.94rpx;
			background-color: #003293;
			bottom: -3px;
			content: "";
			display: block;
			left: 0;
			right: 0;
			margin: 0 auto;
			pointer-events: none;
			position: absolute;
			right: 0;
			z-index: 1;
		}

		.install_colso {
			padding: 0 0 0 20rpx;

			.u-icon {
				font-size: 28rpx;
			}
		}
	}

	.skeleton_box_height {
		width: 100%;
		margin: 0 auto 0;
		padding: 0 20rpx 0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.skeleton_loading {
		flex: 1;
		margin: 0 18rpx 0 0;
		height: 38px;
		border-radius: 8px;
		background: $home-tabas-langding; //linear-gradient(90deg, #1d2532 25%, #1b2329 40%, #1d2532 50%);
		background-size: 400% 100%;
		animation: loading 1.4s ease infinite;
	}

	.skeleton_loading:last-child {
		margin-right: 0;
	}

	.skeleton_loading:first-child {
		margin-left: 0;
	}

	.swpier_skeleton_box_height {
		width: 100%;
		padding: 22rpx 20rpx 20rpx 20rpx;
		margin-bottom: 10rpx;
	}

	.swpier_skeleton_loading {
		height: 200px;
		border-radius: 14rpx;
		background: $home-tabas-langding; //linear-gradient(90deg, #1d2532 25%, #1b2329 40%, #1d2532 50%);
		background-size: 400% 100%;
		animation: loading 1.4s ease infinite;
	}

	@keyframes loading {
		0% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0 50%;
		}
	}

	.Page-loading {
		padding: 50rpx 0 0 0;
		text-align: center;
		height: 1000rpx;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		position: relative;

		image {
			text-align: center;
			width: 140rpx;
		}
	}

	.loader {
		width: 4.75rem;
		height: 0.75rem;
		background-color: $loader-bg-color;
		top: 80rpx;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		border-radius: 200rpx;
		text-align: center;
	}

	.loader .loader-animation {
		border-radius: 200rpx;
		position: absolute;
		background-color: #B1BAD3;
		top: 0.125rem;
		bottom: 0.125rem;
		animation: svelteSlide .8s infinite;
		will-change: left, right;
	}

	@keyframes svelteSlide {
		0% {
			right: 4rem;
			left: .125rem
		}

		5% {
			left: .125rem
		}

		50% {
			right: .125rem;
			left: 4rem
		}

		55% {
			right: .125rem
		}

		to {
			right: 4rem;
			left: .125rem
		}
	}

	/deep/ .u-navbar-inner {
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
	}

	/deep/ .u-mode-center-box {}

	/deep/ .u-close--top-right {
		top: 40rpx !important;
	}

	/deep/ .u-btn {
		//font-weight: bold;
	}

	/deep/ .u-btn--primary--disabled {}

	@keyframes rotate360 {
		100% {
			transform: rotate(360deg);
		}
	}

	.rotate360 {
		animation: rotate360 .5s ease-out 0s;
	}

	.tongji_box {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: $font-all-color;
		font-size: 24rpx;
	}

	.jianju {
		margin-bottom: 60rpx;
	}

	.more-progress {
		max-width: 188px;
		margin: 0 auto 0;
	}

	.mask_ceng {
		position: fixed;
		z-index: 10070;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 auto;
		background-color: #000;
		opacity: .8;
		transition: transform 0.3s;
	}

	.more_btn {
		width: 100%;
		display: inline-flex;
		justify-content: center;
		color: #ffffff;
		font-size: 24rpx;
		text-align: center;
		border-radius: 12rpx;
		margin: 30rpx auto 50rpx;

		/deep/ .u-btn {
			//width: 240rpx !important;
		}

		/deep/ .u-btn--warning {
			width: auto;
			margin: 0 auto;
			color: #ffffff !important;
			border-color: $more-btn-bg !important;
			background-color: $more-btn-bg !important;
			font-weight: initial !important;
			padding: 0 40rpx !important;
			font-weight: bold !important;
		}
	}

	.nodata_all {
		margin-top: 100rpx;
		text-align: center;

		//position: absolute;
		//top: 50%;
		//left: 50%;
		//transform: translate(-50%, -50%);
		view {
			margin-top: 14rpx;
			font-size: 24rpx;
			color: $font-all-color;
		}

		image {
			width: 250rpx;
			height: 150rpx;
		}
	}

	.input_border {
		border: 1px solid #3673D9 !important;
		background-color: $all-secondary-color !important;
	}

	.Data_null {
		text-align: center;
		margin-top: 100rpx;

		view {
			font-size: 24rpx;
			color: $font-all-color;
		}

		image {
			width: 250rpx;
			height: 290rpx;
		}
	}

	.fenyeqi {
		//position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		padding: 10rpx 0 2rpx 0;
		background-color: $all-secondary-color;
	}

	.popupPlay {
		/deep/ .u-drawer-bottom {
			background-color: $all-secondary-color !important;
		}
	}

	.play_game_box {
		padding: 40rpx;

		.game_info_wrap {
			display: flex;
			align-items: flex-start;
			justify-content: center;

			.gamene_img {
				width: 220rpx;
				height: 220rpx;
				border-radius: 20rpx;
			}

			.game_info {
				flex: 1;
				padding-left: 30rpx;

				.game_nam {
					font-weight: bold;
					color: $all-secondary-text-color;
					margin-bottom: 10rpx;
				}

				.tigs {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: $font-all-color;
				}
			}
		}
	}

	.popupPay_btn_box {
		width: 100%;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.quxiao {
			flex: 1;
			margin-right: 10rpx;
			cursor: pointer;

			span {
				font-size: 28rpx;
				font-weight: bold;
				height: 48px;
				text-align: center;
				line-height: 48px;
				border-radius: 10px;
				color: #ffffff;
				width: 100%;
				display: inline-block;
				background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
				box-shadow: 0 3px 20px #ff23413d, inset 0 4px 4px #ffffff30;
			}
		}

		.kaishi {
			margin-left: 10rpx;
			flex: 1;

			.mask_btn {
				margin: 0 auto;
				width: 100%;
				text-align: center;

				/deep/ uni-button {
					background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
					box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
					position: relative;
					z-index: 2;
					color: #ffffff !important;
					border-radius: 8px;
					font-weight: bold;
				}

				/*/deep/ .u-btn--primary {
					background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
					box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
					position: relative;
					z-index: 2;
					color: #ffffff !important;
					border-radius: 8px;
				}*/

				/deep/ .u-btn--primary {
					font-size: 28rpx !important;
					height: 48px !important;
					line-height: 48px !important;
					padding: 0 4px !important;
					border-radius: 10px !important;
				}

				/deep/ .u-size-default {
					font-size: 28rpx !important;
					height: 48px !important;
					line-height: 48px !important;
					border-radius: 10px !important;
				}
			}
		}
	}

	.Tanchuang-wrap {
		.TCtitle {
			padding: 80rpx 0 0 0;
			text-align: center;

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 14rpx;
			}
		}

		.flinput {
			text-align: center;
			padding: 0 0 0 0;
			margin: 20rpx auto 20rpx;
			width: 90%;
			color: $all-secondary-text-color;

			view:nth-child(2) {
				margin-top: 20rpx;
				font-size: 26rpx !important;
				font-weight: initial !important;
				color: #999;

				/deep/ div {
					font-size: 26rpx !important;
					font-weight: initial !important;
				}

				/deep/ p {
					font-size: 26rpx !important;
					font-weight: initial !important;
				}
			}
		}

		.oktbn {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.fuzhibtn {
				flex: 1;
				background-color: #efefef;
				color: #9e9e9e;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 30rpx 0;
			}

			.fuzhibtn2 {
				flex: 1;
				background-color: #1a1a1a;
				color: $all-secondary-text-color;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 30rpx 0;
			}
		}
	}

	.sanFang_wrap {
		padding: 30rpx 0 40rpx 0;
	}

	.sanFang {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 40rpx;

		span {
			display: block;
			height: 1px;
			background-color: $disanfang-border-color;
			flex: 1;
		}

		view {
			margin: 0 30rpx;
			color: #55657e;
		}
	}

	.sanFang_icon {
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 60rpx;
			height: 60rpx;
			margin: 0 15rpx;
			background-color: #fff;
			border-radius: 100px;
			border: 3px solid #fff;
		}
	}

	.sousuo_lan_wrap {
		width: 93%;
		margin: 20rpx auto;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1d2532;
		border-radius: 18rpx;
		padding: 0 8rpx 0 0;

		.sousuo_lan {
			flex: 1;

			/deep/ .u-icon {
				font-size: 36rpx;
				color: $font-all-color;
			}
		}

		.sousuo_Btn {
			cursor: pointer;
			color: $all-secondary-text-color;
			padding: 0 30rpx;
			height: 66rpx;
			line-height: 66rpx;
			border-radius: 16rpx;
			background-image: linear-gradient(to right, rgb(84, 141, 255), rgb(12, 94, 255));
		}
	}

	.input_item_true_cus {
		background-color: $select-drop-down-color;
		border: 1px solid $select-drop-down-border-color;
		border-radius: 10px;
		//padding: 6.5px 0rpx;
	}

	.huobiInfo {
		font-size: 24rpx;
		color: $all-secondary-text-color;
		margin-top: 30px;

		view:nth-child(1) {
			font-weight: bold;

			span {
				margin: 0 5rpx;
				color: #1db83e;
				font-weight: bold;
			}
		}
		view:nth-child(2) {}
	}
</style>