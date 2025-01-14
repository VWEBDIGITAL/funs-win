<template>
	<view :style="theme">


		<view class="Top_navbar" :class="statusBarHeight == true?'dingwei':''">
			<view class="fennavtiel" @click="BlackPage()">
				<view class="fanhuiicon">
					<u-icon name="arrow-left"></u-icon>
				</view>
				<!-- <image :src="navIcon"></image> -->
				<!-- <view class="biaotizi">{{title}}</view> -->
				
				<view class="biaotizi" v-if="title=='Hot'">{{$t('Popular')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Lobby'">{{$t('Lobby')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Slots'">{{$t('Slots')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Fishing'">{{$t('Fishing')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Live'">{{$t('LiveCasino')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Sports'">{{$t('Sports')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Cards'">{{$t('Cards')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Mini'">{{$t('MiniGames')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Bingo'">{{$t('ADDnew.Lottery')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Poker'">{{$t('ADDnew.Poker')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='ARCADE'">{{$t('ADDnew.Arcade')}}<span>({{Total || '0'}})</span></view>
				<view class="biaotizi" v-if="title=='Lottery'">{{$t('ADDnew.Lottery')}}<span>({{Total || '0'}})</span></view>
				
				
			</view>
			<view class="youbiancz">
				<view class="col_box">
					<!--<view class="hotHover" @click="Clickhot()" :class="hotcos == true?'dise':''">
						<image src="/static/image/home/icons8-huo.png" mode="widthFix"></image>
					</view>-->
					<!-- <view class="sc" @click="topage('/pages/myfavoriteList/myfavoriteList')"><image src="/static/image/home/star_favorite.png" mode="widthFix"></image></view>
					<view class="ls" @click="topage('/pages/MyhistoryList/MyhistoryList')"><image src="/static/image/home/history_icon.png" mode="widthFix"></image></view> -->
					<view class="ss" @click="ToSousuo()"><u-icon name="search" color="#007aff"></u-icon><!-- <span>{{$t('NewlyAdded.Search')}}...</span> --></view>
				</view>
			</view>
		</view>

		<!-- #ifdef APP-PLUS -->
		<!-- <view v-if="statusBarHeight === true" style="margin-bottom: 90px;"></view> -->
		<!-- #endif -->
		
		<!-- #ifdef H5 -->
		<!-- <view v-if="statusBarHeight === true" style="margin-bottom: 126px;"></view> -->
		<!-- #endif -->
		
		<signInPopup ref="signInShow"></signInPopup>
		
	</view>
</template>

<script>
	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync();
	export default {
		name: "FenLeiNavTitle",
		props: {
			navIcon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			Total: {
				type: Number,
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
			},
			topage(url){
				let token = uni.getStorageSync("token")
				if(!token){
					this.$refs.signInShow.openPopup(1)
				} else {
					uni.navigateTo({
						url: url
					})
				}
			},
			Tofavorite(){
				uni.navigateTo({
					url: '/pages/myfavoriteList/myfavoriteList'
				})
			},
			Tolishi(){
				uni.navigateTo({
					url: '/pages/MyhistoryList/MyhistoryList'
				})
			},
			ToSousuo(){
				uni.navigateTo({
					url: '/pages/searchFor/searchFor'
				})
			},
		}
	}
</script>

<style lang="scss">
	.youbiancz {
		width: 48rpx;
		margin-right: 10rpx;
	}
	.fennavtiel {
		flex: 1;
		display: flex;
		align-items: center;
		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}
		.biaotizi {
			font-size: 40rpx;
			font-weight: bold;
			color: $all-secondary-text-color;
			margin-left: 20rpx;
			display: flex;
			align-items: center;
			cursor: pointer;
			span {
				font-weight: initial;
				color: #707a98;
				font-size: 28rpx;
				margin-left: 15rpx;
			}
		}
		.fanhuiicon {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 12rpx;
			background-color: $select-drop-down-xz-color;
			height: 60rpx;
			width: 60rpx;
			line-height: 60rpx;
			cursor: pointer;
			.u-icon {
				font-size: 32rpx;
				color: #ffffff;
			}
		}
	}
	.Top_navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 24rpx 24rpx 24rpx;
		background-color: $home-games-wrap-color;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.22);

		view {
			color: $all-secondary-text-color;
			font-weight: bold;
			font-size: 19px;
		}
	}

	.dingwei {
		//position: fixed !important;
		//left: 0;
		//right: 0;
		
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
		height: var(--statusBarHeight);
		width: 100%;
		background-color: #f00;
	}
	.col_box {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		.sc {
			border-radius: 12rpx;
			width: 100%;
			background-color: #1d2532;
			height: 68.47rpx;
			line-height: 68.47rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 10rpx;
			image {
				width: 25rpx;
			}
		}
		.ls {
			border-radius: 12rpx;
			width: 100%;
			background-color: #1d2532;
			height: 68.47rpx;
			line-height: 68.47rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 10rpx;
			image {
				width: 25rpx;
			}
		}
		.ss {
			border-radius: 12rpx;
			width: 100%;
			cursor: pointer;
			//background-color: #1d2532;
			//height: 68.47rpx;
			//line-height: 68.47rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin-left: 10rpx;
			//padding-left: 20rpx;
			.u-icon {
				font-size: 48rpx;
			}
			image {
				width: 48rpx;
				height: 48rpx;
				//margin-right: 10rpx;
				filter: brightness(0) invert(1);
			}
			span {
				flex: 1;
				color: #707a98;
				display: inline-block;
			}
		}
	}
</style>