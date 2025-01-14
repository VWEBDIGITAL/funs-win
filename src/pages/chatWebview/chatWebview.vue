<template>
	<view :style="theme" class="page_wraps page_boxs">

		<match-media :min-width="800">
			<view class="out_game_pc">
				<view class="guanbi" @click="clickBtn()">
					<u-icon name="close" color="#ffffff"></u-icon>
				</view>
			</view>
		</match-media>
		
		<match-media :max-width="800">
			<!-- <view style="position: relative;z-index: 99999999999;">
				<liu-drag-button @clickBtn="clickBtn" bottomPx="140">
					<view class="tuichu">
						<image src="/static/tuichu.png"></image>
					</view>
				</liu-drag-button>
			</view> -->
			
			<view class="fanhuitubiao">
				<image src="/static/image/fanhui_kefy.png" @click="clickBtn"></image>
			</view>
			
		</match-media>


		<!-- #ifdef APP-PLUS -->
		<view :style="{height: statusBarHeight + 'px'}"></view>
		<!-- #endif -->
		<!-- 开了后描述文件安装方式会导致顶部黑色区块 -->
		<iframe id="iframeId" class="WebviewStyle" :key="WebUrl" :src="WebUrl"  :style="{height: pageHeight}">
			
		</iframe>


		<u-modal v-model="show" :content="content" @confirm="confirm" :title="$t('NewlyAdded.Notify')"
			:show-cancel-button="true" :cancel-text="$t('NewlyAdded.Cancel')"
			:confirm-text="$t('NewlyAdded.Confirm')"></u-modal>


	</view>
</template>
<script>
	export default {
		data() {
			return {

				// #ifdef H5 || WEB
				pageHeight: '100%',
				// #endif

				// #ifdef APP-PLUS
				pageHeight: 'calc(100vh)',
				// #endif



				show: false,
				content: this.$t('NewlyAdded.WebQuit'),
				navbackground: {
					backgroundImage: 'linear-gradient(180deg, #FE003C, #FE003C)'
				},
				WebUrl: '',

				statusBarHeight: 0,

				windowResizeCallback: '',


			}
		},
		onLoad(ops) {
			let that = this
			//console.log('游戏参数', ops)
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			uni.getSystemInfo({
			  success: function (info) {
			    console.log('窗口高度：' + info.windowHeight);
			    that.pageHeight = info.windowHeight + 'px';
			  }
			});

			var webUrl = JSON.parse(decodeURIComponent(ops.url))
			that.WebUrl = webUrl

			//#ifdef APP-PLUS
			let statusbar = uni.getSystemInfoSync().statusBarHeight;
			that.statusBarHeight = statusbar
			that.pageHeight = 'calc(100vh - ' + (statusbar) + 'px)';
			//#endif

			//#ifdef H5 || WEB
			//是否webapp启动
			that.isQuanPing();
			//#endif

		},
		onShow() {
			let that = this

			//隐藏PCleft窗口和Top窗口
			// uni.setLeftWindowStyle({
			//     display: 'none',
			// 	width: '0'
			// });
			// uni.setTopWindowStyle({
			//     display: 'none',
			// 	height: '0'
			// });

			this.windowResizeCallback = (res) => {
				//console.log('窗口变化', res);
				let deviceOrientation = res.deviceOrientation;
				if (deviceOrientation == "portrait") {

					that.isQuanPing();

				} else if (deviceOrientation == "landscape") {

					const classList = document.querySelector('uni-left-window').classList;
					classList.add('hide_window');
					const classListT = document.querySelector('uni-top-window').classList;
					classListT.add('hide_window');

					that.isQuanPing();

				}
			}
			uni.onWindowResize(this.windowResizeCallback);
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				// uni.showModal({
				// 	title: this.$t('NewlyAdded.Notify'),
				// 	content: this.$t('NewlyAdded.WebQuit'),
				// 	success: res => {
				// 		if (res.confirm) {
				// 			uni.showLoading({
				// 				title: 'Loading...',
				// 				mask: true
				// 			});
				// 			setTimeout(() => {
				//				this.outOnegame()
				// 			}, 3000)
				// 		}
				// 	}
				// });
				this.confirm();
				return true;
			}
		},
		onReady() {

		},
		destroyed() {
			
		},
		onHide() {
			//alert('游戏页面隐藏了');
			//取消监听窗口变化
			uni.offWindowResize(this.windowResizeCallback);

			let isToken = uni.getStorageSync("token");
			if (!isToken) {} else {
				uni.$emit('getgetMybalance', 1);
				//this.show = true
				this.confirm()
			}
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
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//点击按钮
			clickBtn() {
				//this.show = true
				this.confirm()
			},
			onNavigationBarButtonTap(e) {
				//this.show = true
				this.confirm()
			},
			confirm() {

				uni.showLoading({
					title: 'Loading...',
					mask: true
				})

				this.outOnegame()

			},
			//退出
			outOnegame() {
				let that = this
				uni.hideLoading();
				//取消监听窗口变化
				uni.offWindowResize(this.windowResizeCallback);
				//导航栏金币显示
				uni.$emit('OpeninGames', 0);
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		position: relative;
		width: 100%;
		//position: relative;
		height: 100%;
		background-color: #ffffff;
	}
	
	.fanhuitubiao {
		z-index: 99999999999;
		position: fixed;
		top: 8px;
		left: 8px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		
		image {
			width: 34px;
			height: 34px;
			box-shadow: 0 0 5px 0px #00000038;
			border-radius: 10rpx;
		}
	}

	.out_game_pc {
		z-index: 9;
		position: fixed;
		top: 140rpx;
		right: 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: $all-secondary-text-color;
		margin-top: 10rpx;

		.guanbi {
			cursor: pointer;
			background-color: #1f242b;
			border-radius: 10rpx;
			width: 80rpx;
			height: 80rpx;
			margin-left: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.shoucang {
			cursor: pointer;
			background-color: #1f242b;
			border-radius: 10rpx;
			width: 80rpx;
			height: 80rpx;
			margin-left: 20rpx;
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
		background-color: #ffffff;
	}

	.WebviewStyle {
		background-color: #ffffff;
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 0;
		position: fixed;
		
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
			//height: calc(100vh - 120px);
			//aspect-ratio: 10 / 9;

			//max-width: 800px;
			padding: 0 0;
			margin: 0 auto;
		}
	}
</style>