<template>
	<view :style="theme">
		
		<view class="allgys_pc">
			<view class="zheceng2"></view>
			<view class="banshi2">
				<view class="swiper-containertabs">
					<view class="swiper-wrapper">
						<view v-for="(item,index) in list" :key="index" class="swiper-slide">
							<view class="u-tab-item" @tap="clickTab(index)" :class="[currentIndex==index?'bg_color':'']">
								<view class="tabs_icon" :class="[currentIndex == index?'tabs_icon_xz':'']">
									<image class="moren" :class="currentIndex == index?'zhihui':''" :src="item.path" mode="widthFix"></image>
									<view v-if="item.name && item.name=='Lobby'">{{$t('Lobby')}}</view>
									<view v-if="item.name && item.name=='Slots'">{{$t('Slots')}}</view>
									<view v-if="item.name && item.name=='Fishing'">{{$t('Fishing')}}</view>
									<view v-if="item.name && item.name=='Live'">{{$t('LiveCasino')}}</view>
									<view v-if="item.name && item.name=='Sports'">{{$t('Sports')}}</view>
									<view v-if="item.name && item.name=='Cards'">{{$t('Cards')}}</view>
									<view v-if="item.name && item.name=='Mini'">{{$t('MiniGames')}}</view>
									<view v-if="item.name && item.name=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
									<view v-if="item.name && item.name=='Poker'">{{$t('ADDnew.Poker')}}</view>
									<view v-if="item.name && item.name=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
									<view v-if="item.name && item.name=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
									<view class="game_num" v-if="currentIndex == index">{{QiuHe(item)}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- <view class="banshi">
			<view class="swiper-container-tabs">
				<view class="swiper-wrapper">
					<view class="u-tab-item" v-for="(item, index) in list" :key="index" @tap="clickTab(index)" :class="[currentIndex==index?'bg_color':'']">
						<view class="tabs_icon" :class="[currentIndex == index?'tabs_icon_xz':'']">
							<image class="moren" :class="currentIndex == index?'zhihui':''" :src="item.path" mode="widthFix"></image>
							<view v-if="item.name && item.name=='Lobby'">{{$t('Lobby')}}</view>
							<view v-if="item.name && item.name=='Slots'">{{$t('Slots')}}</view>
							<view v-if="item.name && item.name=='Fishing'">{{$t('Fishing')}}</view>
							<view v-if="item.name && item.name=='Live'">{{$t('LiveCasino')}}</view>
							<view v-if="item.name && item.name=='Sports'">{{$t('Sports')}}</view>
							<view v-if="item.name && item.name=='Cards'">{{$t('Cards')}}</view>
							<view v-if="item.name && item.name=='Mini'">{{$t('MiniGames')}}</view>
							<view v-if="item.name && item.name=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
							<view v-if="item.name && item.name=='Poker'">{{$t('ADDnew.Poker')}}</view>
							<view v-if="item.name && item.name=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
							<view v-if="item.name && item.name=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
							<view class="game_num" v-if="currentIndex == index">{{QiuHe(item)}}</view>
						</view>
					</view>
				</view>
				<view class="swiper-pagination"></view>
			</view>
		</view> -->

	</view>
</template>

<script>
	import Swiper from 'swiper'; // 注意引入的是Swiper
    import 'swiper/swiper-bundle.css'; // 注意这里的引入
	export default {
		name: "pc-homeTabs",
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				currentIndex: 0,
				swiper: null,
			};
		},
		created() {

		},
		mounted() {
			// #ifndef APP-PLUS
			this.getSwiper()
			// #endif
		},
		methods: {
			getSwiper() {
				let that = this
				that.swiper2 = new Swiper(".swiper-containertabs", {
					loop: false, // 无缝
					slidesPerGroup: 1,
					loopFillGroupWithBlank: true,
					autoHeight: true, //高度随内容变化
					paginationClickable: true,
					slidesPerView: "auto", // 一组三个
					spaceBetween: 10, // 间隔
					uniqueNavElements: true, //当存在多个同名导航元素时，设置导航元素是否唯一。
					preloadImages: false, //Swiper会强制加载所有图片后才初始化。
					// breakpoints: {
					// 	320: { //当屏幕宽度大于等于320
					// 		slidesPerView: 3,
					// 		spaceBetween: 10
					// 	},
					// 	768: { //当屏幕宽度大于等于768 
					// 		slidesPerView: 4,
					// 		spaceBetween: 10
					// 	},
					// 	1280: { //当屏幕宽度大于等于1280
					// 		slidesPerView: 8,
					// 		spaceBetween: 10
					// 	}
					// },
					// 如果需要前进后退按钮
					// navigation: {
					// 	nextEl: '.swiper-button-next-zzy',
					// 	prevEl: '.swiper-button-prev-zzy',
					// 	disabledClass: 'my-button-disabled',
					// },
					// 在大屏上写轮播图，在摁下F11或者放大窗口之后，会丢失pagination，条数会变化，加上这两行，重新渲染swiper
					// 窗口变化,重新init,针对F11全屏和放大缩小,必须加
					observer: true,
					observeParents: true,
					on: {
						imagesReady: function() {
							alert('图片加载完成了');
						},
					},
				});
			},












			// 点击某一个tab菜单
			clickTab(index) {
				this.currentIndex = index
				// 发送事件给父组件
				this.$emit('change', index);
			},
			QiuHe(item) {
				let zong = 0
				item.vendors.forEach((items, indexs) => {
					zong += items.gameCount
				});
				return zong
			},
		}
	}
</script>

<style lang="scss" scoped>
	.allgys_pc {
		position: relative;
		overflow: hidden;
	}

	.banshi2 {
		width: 100%;
		height: 100%;

		.swiper-slide {
			position: relative;
			width: auto !important;
			height: auto;
		}
	}








	.u-tab-item {
		padding: 0 20rpx;
		//margin-right: 20rpx;
		height: 38px !important;
		line-height: 38px !important;
		position: relative;
		background-color: #1d2532;
		border-radius: 12px;
	}

	.bg_color {
		background-image: linear-gradient(to right, #548dff, #0c5eff) !important;
	}

	.tabs_icon_xz {
		color: #ffffff !important;
	}

	.tabs_icon {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 5;
		font-size: 28rpx;
		cursor: pointer;
		color: $font-all-color;

		.game_num {
			margin-left: 16rpx;
			height: 40rpx;
			line-height: 40rpx;
			display: inline-block;
			background-color: #ffffff;
			border-radius: 6px;
			padding: 0 10rpx;
			color: #4684ff;
			font-size: 24rpx;
		}

		.moren {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}

		.zhihui {
			filter: grayscale(100%) brightness(10000%);
		}

		view {
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
</style>