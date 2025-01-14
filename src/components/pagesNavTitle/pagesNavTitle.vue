<template>
	<view :style="theme">


		<view class="Top_navbar" :class="statusBarHeight == true?'dingwei':''" @click="BlackPage()">
			<view>{{title}}</view>
			<view><u-icon name="close"></u-icon></view>
		</view>

		<!-- #ifdef APP-PLUS -->
		<!-- <view v-if="statusBarHeight === true" style="margin-bottom: 90px;"></view> -->
		<!-- #endif -->
		
		<!-- #ifdef H5 -->
		<!-- <view v-if="statusBarHeight === true" style="margin-bottom: 126px;"></view> -->
		<!-- #endif -->
		
	</view>
</template>

<script>
	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync();
	export default {
		name: "pagesNavTitle",
		props: {
			title: {
				typeo: String,
				default: ''
			}
		},
		data() {
			return {
				//#ifdef APP-PLUS
				statusBarHeight: true,
				//#endif
				//#ifdef H5
				statusBarHeight: null,
				//#endif
			};
		},
		created() {
			////console.log(systemInfo.statusBarHeight)
			//alert(window.navigator.standalone)
			//开启了全屏显示之后，从主屏幕的打开的H5项目
			//如何判断应用是从主屏幕打开还是从浏览器打开
			//window.navigator中会存在standalone，并且该参数为true，通过这个就能判断了
			//#ifdef H5
			if (window.navigator.standalone == false || window.navigator.standalone == undefined) {
				this.statusBarHeight = false
			} else {
				this.statusBarHeight = true
			}
			//#endif

			let token = uni.getStorageSync("token");
			if (!token) {

			} else {

			}
		},
		methods: {
			BlackPage() {
				
				//#ifdef APP-PLUS
				uni.navigateBack()
				//#endif
				
				//#ifdef H5
				let canNavBack = getCurrentPages()
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack()
				} else {
					history.back();
				}
				//#endif
			}
		}
	}
</script>

<style lang="scss">
	.Top_navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx 36rpx;
		background-color: $all-secondary-color;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.22);
		
		.u-icon {
			color: $all-secondary-text-color;
		}

		view {
			color: $all-secondary-text-color;
			font-weight: bold;
			font-size: 19px;
		}
		
		view:nth-child(2){
			cursor: pointer;
			.u-icon {
				font-size: 16px;
			}
		}
	}

	.dingwei {
		//position: fixed !important;


		/* #ifdef APP-PLUS */
		//top: var(--status-bar-height);
		/* #endif */

		/* #ifdef H5 */
		//top: 58px;
		/* #endif */

		width: 100%;
		z-index: 9;
	}

	.zhuangtail {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #f00;
	}
</style>