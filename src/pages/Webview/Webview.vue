<template>
	<view class="page_wraps" :style="{theme,height: pageHeight, padding: is_Mobile==1?'0':'3% 14% 6% 14%'}">




		<!-- #ifdef APP-PLUS -->
		<view :style="{height: statusBarHeight + 'px'}"></view>
		<!-- #endif -->
		<!-- 开了后描述文件安装方式会导致顶部黑色区块 -->
		<iframe id="iframeId" class="WebviewStyle" :key="WebUrl" :src="WebUrl"
			style="width:100%;height: 100%;" frameborder="0" scolling="no"
			allowfullscreen="true"></iframe>

		<match-media :min-width="800" v-if="is_Mobile == 0">
			<view class="out_game_pc">
				<view class="guanbi2" @click="screen()">
					<image src="/static/image/jichu_quanping.png"></image>
				</view>
				<view class="shoucang" @click="cLike(gameCode,favorite);favorite =! favorite">
					<view class="star_icon" v-if="favorite == true">
						<u-icon name="star-fill"></u-icon>
					</view>
					<view class="star_icon" v-else>
						<u-icon name="star" color="#ffffff"></u-icon>
					</view>
				</view>
				<view class="guanbi" @click="clickBtn()">
					<u-icon name="close" color="#ffffff"></u-icon>
				</view>
			</view>
		</match-media>



		<view style="position: relative;z-index: 99999999;" v-if="is_Mobile == 1">
			<liu-drag-button @clickBtn="clickBtn">
				<view class="tuichu">
					<image src="/static/tuichu.png"></image>
				</view>
			</liu-drag-button>
		</view>


		<!-- <match-media :min-height="400" :orientation="'landscape'" v-if="is_Mobile == 1">
			<view style="position: relative;z-index: 99999999;">
				<liu-drag-button @clickBtn="clickBtn">
					<view class="tuichu">
						<image src="/static/tuichu.png"></image>2
					</view>
				</liu-drag-button>
			</view>
		</match-media> -->



		<u-modal v-model="show" :content="content" @confirm="confirm" :title="$t('NewlyAdded.Notify')"
			:show-cancel-button="true" :cancel-text="$t('NewlyAdded.Cancel')"
			:confirm-text="$t('NewlyAdded.Confirm')"></u-modal>


	</view>
</template>
<script>
	// import {
	// 	websocetObj
	// } from '@/utils/socket.js';
	export default {
		data() {
			return {

				// #ifdef H5 || WEB
				pageHeight: '100%',
				// #endif

				// #ifdef APP-PLUS
				pageHeight: '100%',
				// #endif



				show: false,
				content: this.$t('NewlyAdded.WebQuit'),
				WebUrl: '',
				types: '',
				gameCode: '',
				favorite: false,

				statusBarHeight: 0,

				windowResizeCallback: '',

				portrait: '',
				landscape: '',


				//记录是否全屏
				fullscreen: false,
				hostName: '',

				is_Mobile: 1


			}
		},
		onLoad(ops) {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			uni.getSystemInfo({
			  success: function (info) {
			    console.log('窗口高度：' + info.windowHeight);
			    that.pageHeight = info.windowHeight + 'px';
			  }
			});
			
			
			//console.log('游戏参数', ops)
			that.types = ops.tpye
			that.favorite = ops.favorite
			that.gameCode = ops.code



			//#ifdef APP-PLUS
			let statusbar = uni.getSystemInfoSync().statusBarHeight;
			that.statusBarHeight = statusbar
			that.pageHeight = 'calc(100vh - ' + (statusbar) + 'px)';
			//#endif

			//#ifdef H5 || WEB
			//判断PC还是移动端
			const userAgent = navigator.userAgent.toLowerCase();
			if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(userAgent)) {
				// 移动端
				console.log('移动端')
				this.is_Mobile = 1
				uni.setTopWindowStyle({
					display: 'none',
					height: '0'
				})
				uni.setLeftWindowStyle({
					display: 'none',
					width: '0'
				})
			} else {
				// pc端
				console.log('PC端')
				this.is_Mobile = 0

				uni.setTopWindowStyle({
					display: 'none',
					height: '0'
				})
				uni.setLeftWindowStyle({
					display: 'none',
					width: '0'
				})

				// uni.setTopWindowStyle({
				//     display: 'block',
				// 	height: '59px'
				// })
				// uni.setLeftWindowStyle({
				//     display: 'block',
				// 	width: '230px'
				// })
			}

			that.hostName = window.location.hostname
			//是否webapp启动
			that.isQuanPing();
			// #endif

			//从缓存中读取即将进入的游戏Url
			let gamesUrl = uni.getStorageSync("PlayGamesUrl")
			//var webUrl = JSON.parse(decodeURIComponent(ops.url))
			that.WebUrl = gamesUrl
		},
		onShow() {
			let that = this

			this.windowResizeCallback = (res) => {
				//console.log('窗口变化', res);
				let deviceOrientation = res.deviceOrientation;
				if (deviceOrientation == "portrait") {

					that.isQuanPing();

				} else if (deviceOrientation == "landscape") {

					// const classList = document.querySelector('uni-left-window').classList;
					// classList.add('hide_window');
					// const classListT = document.querySelector('uni-top-window').classList;
					// classListT.add('hide_window');

					// #ifdef H5 || WEB
					uni.setTopWindowStyle({
						display: 'none',
						height: '0'
					})
					uni.setLeftWindowStyle({
						display: 'none',
						width: '0'
					});
					// #endif

					that.isQuanPing();

				}
			}
			uni.onWindowResize(this.windowResizeCallback);








			// let serialNo = uni.getStorageSync('thisUuid');
			// let machineName = uni.getStorageSync('machineName');
			// let ua = uni.getStorageSync('thisUa');
			// let isToken = uni.getStorageSync("token")
			// if (!isToken) {
			// 	uni.reLaunch({
			// 		url: '/pages/index/index'
			// 	})
			// } else {
			// 	uni.$emit('getgetMybalance', 1);
			// 	this.$u.post('/login-token', {
			// 		serialNo: serialNo,
			// 		machineName: machineName
			// 	}).then(res => {

			// 		//更新缓存token
			// 		uni.setStorageSync('token', res.data.token)
			// 		uni.setStorageSync('userinfo', res.data)

			// 	}).catch(err => {
			// 		uni.removeStorageSync('token');
			// 		uni.removeStorageSync("userinfo")
			// 		uni.$emit('getinspectToken', 1)
			// 		//websocetObj.stop()

			// 		//关闭wss链接
			// 		uni.$emit('StartGuanBiWss', 1);

			// 		setTimeout(() => {
			// 			uni.reLaunch({
			// 				url: '/pages/index/index'
			// 			})
			// 		}, 200)
			// 	})
			// }
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				uni.showModal({
					title: this.$t('NewlyAdded.Notify'),
					content: this.$t('NewlyAdded.WebQuit'),
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: 'Loading...',
								mask: true
							});
							setTimeout(() => {
								this.outOnegame()
							}, 3000)
						}
					}
				});
				return true;
			}
		},
		onReady() {

		},

		created() {
			// #ifdef H5
			window.addEventListener("message", this.receiveMessage, false);
			// #endif
		},
		destroyed() {
			// #ifdef H5
			window.removeEventListener("message", this.receiveMessage);
			// #endif
		},

		onHide() {
			//alert('游戏页面隐藏了');
			//取消监听窗口变化
			uni.offWindowResize(this.windowResizeCallback);

			// let isToken = uni.getStorageSync("token");
			// if (!isToken) {} else {
			// 	uni.$emit('getgetMybalance', 1);
			// 	this.show = true
			// }
		},
		beforeUnmount() {
			//取消监听窗口变化
			uni.offWindowResize(this.windowResizeCallback);
		},
		methods: {









			isQuanPing() {
				let that = this
				//判断是否WebApp启动
				//#ifdef H5
				if (window.navigator.standalone == true) {
					//alert('IOS-是从桌面中打开的')
					//that.pageHeight = 'calc(100vh - ' + '108' + 'rpx)';
				} else if (window.matchMedia("(display-mode: standalone)").matches) {
					//alert('android-是从桌面中打开的')
					//that.pageHeight = 'calc(100vh)';
				} else {
					//就是浏览器里面打开的
					let is_systemInfo = uni.getSystemInfoSync();
					if (is_systemInfo.platform == "ios") {
						//that.pageHeight = 'calc(100vh - ' + '144' + 'rpx)';
					} else {
						//that.pageHeight = 'calc(100vh)';
					}
				}
				//#endif
			},







			//全屏方法
			screen() {
				//设置后就是id==iframeId 的容器全屏
				var kk = document.getElementById('iframeId')
				if (this.fullscreen) {
					if (document.exitFullscreen) {
						document.exitFullscreen()
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen()
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen()
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen()
					}
				} else {
					if (kk.requestFullscreen) {
						kk.requestFullscreen()
					} else if (kk.webkitRequestFullScreen) {
						kk.webkitRequestFullScreen()
					} else if (kk.mozRequestFullScreen) {
						kk.mozRequestFullScreen()
					} else if (kk.msRequestFullscreen) {
						// IE11
						kk.msRequestFullscreen()
					}
				}
			},






			cLike(code_id, sss) {
				//console.log('收藏', code_id, sss)
				if (sss === true || sss === 1) {
					//取消收藏
					this.quxiaoClickStar(code_id)
				} else {
					//收藏
					this.ClickStar(code_id)
				}
			},
			ClickStar(item) {
				////console.log(item)
				this.$u.post('/favorite', {
					gameCode: item, // String 是 游戏代码
					favorite: true // bool 是 收藏true 取消收藏false
				}).then(res => {})
			},
			quxiaoClickStar(item) {
				this.$u.post('/favorite', {
					gameCode: item, // String 是 游戏代码
					favorite: false // bool 是 收藏true 取消收藏false
				}).then(res => {})
			},






			//处理接收的消息
			receiveMessage(event) {
				let data = event.data;
				console.log('监听', event)
				if (data.name == "gameQuit" || data.type == "Window.Redirect" || data.url == this.hostName || data
					.action == "loaderExitGame") {
					//this.outOnegame();
					//uni.navigateBack();

					uni.showLoading({
						title: 'Loading...',
						mask: true
					})

					this.$router.push('/');

					if (this.is_Mobile == 1) {
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

					//取消监听窗口变化
					uni.offWindowResize(this.windowResizeCallback);
					//导航栏金币显示
					uni.$emit('OpeninGames', 0);

					uni.hideLoading();
				}
			},






			BlackPage() {
				//#ifdef APP-PLUS
				this.show = true
				//#endif

				//#ifdef H5
				this.show = true
				//#endif
			},
			//点击按钮
			clickBtn() {
				this.show = true
			},
			onNavigationBarButtonTap(e) {
				this.show = true
			},
			confirm() {

				uni.showLoading({
					title: 'Loading...',
					mask: true
				})

				this.outOnegame()

			},
			//退出ONE游戏
			outOnegame() {
				let that = this
				let outPath = '/'
				if (that.types == 'tcg') {
					that.$u.post('/exit-tcg', {
						gameCode: that.gameCode
					}).then(res => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					}).catch(err => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					})
				} else if (that.types == 'oneApi') {
					that.$u.post('/exit-one', {
						gameCode: that.gameCode
					}).then(res => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					}).catch(err => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					})
				} else if (that.types == 'wl') {
					that.$u.post('/exit-wl', {
						gameCode: that.gameCode
					}).then(res => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif

					}).catch(err => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					})
				} else if (that.types == 'huidu') {
					that.$u.post('/exit-huidu', {
						gameCode: that.gameCode
					}).then(res => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif

					}).catch(err => {
						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					})
				} else if (that.types == 'tgfun') {
					that.$u.post('/exit-tgfun', {
						gameCode: that.gameCode
					}).then(res => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif

					}).catch(err => {
						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					})
				} else if (that.types == 'ky') {
					that.$u.post('/exit-ky', {
						gameCode: that.gameCode
					}).then(res => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif

					}).catch(err => {
						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					})
				} else if (that.types == 'tcg2') {
					that.$u.post('/exit-tcg2', {
						gameCode: that.gameCode
					}).then(res => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif

					}).catch(err => {
						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					})
				} else if (that.types == 'via') {
					that.$u.post('/exit-via', {
						gameCode: that.gameCode
					}).then(res => {

						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif

					}).catch(err => {
						//移除游戏地址
						uni.removeStorageSync("PlayGamesUrl")

						// #ifdef H5
						that.$router.push(outPath)
						uni.hideLoading()
						// #endif

						// #ifdef APP-PLUS
						uni.navigateBack({
							delta: 1,
							success() {
								uni.$emit('getGamesLaFen', 1)
								uni.hideLoading()
							}
						})
						// #endif
					})
				}


				//#ifdef H5 || WEB
				if (that.is_Mobile == 1) {
					uni.setTopWindowStyle({
						display: 'block',
						height: '59px'
					})
				} else {
					uni.setTopWindowStyle({
						display: 'block',
						height: '59px'
					})
					uni.setLeftWindowStyle({
						display: 'block',
						width: '230px'
					})
				}
				// #endif


				//取消监听窗口变化
				uni.offWindowResize(that.windowResizeCallback);
				//导航栏金币显示
				uni.$emit('OpeninGames', 0);
			}
		}
	}
</script>

<style lang="scss">
	@media screen and (orientation: portrait) {

		/*竖屏 css*/
		.top_height {
			height: 114rpx;
		}
	}

	@media screen and (orientation: landscape) {

		/*横屏 css*/
		.page_wraps {
			height: 100% !important;
		}

		.top_height {
			height: 0;
		}

		.WebviewStyle {
			height: 100%; //calc(100vh);
		}
	}

	.page_wraps {
		position: fixed;
		width: 100%;
		z-index: 9;
		background-color: $body-bg-color;
	}

	.out_game_pc {
		z-index: 9;
		//position: fixed;
		//top: 140rpx;
		//right: 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: $all-secondary-text-color;
		margin-top: 10rpx;

		.guanbi {
			cursor: pointer;
			background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
			//box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
			border-radius: 10rpx;
			width: 80rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: auto;
			font-weight: bold;
		}

		.guanbi2 {
			cursor: pointer;
			background-color: #1f242b;
			border-radius: 10rpx;
			width: 80rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 20rpx 0 0;
			font-weight: bold;

			image {
				width: 40rpx;
				height: 40rpx;
				filter: brightness(100);
			}
		}

		.shoucang {
			cursor: pointer;
			background-color: #1f242b;
			border-radius: 10rpx;
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.u-icon {
				font-size: 34rpx;
			}
		}
	}

	page {
		height: 100%;
		background-color: $body-bg-color;
	}

	.WebviewStyle {
		background-color: #ffffff;
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 0;
	}

	.tuichu {
		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	@media (min-width: 800px) {
		.page_wraps {
			//width: auto;
			height: 100% !important;
			//aspect-ratio: 12 / 9;

			//max-width: 800px;
			padding: 3% 14% 6% 14%;
			margin: 0 auto;
			border-radius: 20rpx;
		}
	}
</style>