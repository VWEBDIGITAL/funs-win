<template>
	<view :style="theme" :class="list.length > 0?'page_wrap':'page_wrap2'">

		<!-- <view class="lunbotu" v-if="list.length > 0">
			<swiper :indicator-dots="false" indicator-color='#fff' indicator-active-color='#0086d6' :autoplay="autoplay" interval="6000" class="swiper-box" :circular='false' @change="swiperChange">
				<swiper-item v-for="(item ,index) in list" :key="index">
					<view class="swiper-item" @click="Todetails(item)">
						<image class="lunbotu_bg" :src="item.mobileImage" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view> -->

		<!-- #ifndef APP-PLUS -->
		<match-media :min-width="800">
			<view class="banshi" v-if="list.length != 0">
				<view class="swiper-container">
					<view class="swiper-wrapper">
						<view v-for="(item,index) in list" :key="item.id" class="swiper-slide">
							<image :src="item.mobileImage" mode="widthFix" @click="Todetails(index)"></image>
						</view>
					</view>
					<view class="swiper-pagination"></view>
					<!-- <view class="swiper-button-next"></view>
					<view class="swiper-button-prev"></view> -->
				</view>
			</view>
			<!-- PC轮播 -->
		</match-media>
		<!-- #endif -->
		


		
		<!-- #ifdef H5 || WEB -->
		<match-media :max-width="800">
		<!-- #endif -->
		
			<view class="swpier_box" :class="[systemList.length == 0?'hide_doc':'']" v-if="list.length > 0">
				<!-- <view class="zheceng2"></view> -->
				<u-swiper height="380" :interval="3000" :effect3d="false" :list="list" name="mobileImage" border-radius="24" bg-color="transparent" @click="Todetails"></u-swiper>
				<!-- <view class="zheceng"></view> -->
			</view>
			
		<!-- #ifdef H5 || WEB -->
		</match-media>
		<!-- #endif -->




	</view>
</template>

<script>
	
	// #ifndef APP-PLUS
	import Swiper from 'swiper'; // 注意引入的是Swiper
    import 'swiper/swiper-bundle.css'; // 注意这里的引入
	// #endif
	
	export default {
		name: "home-swiper",
		props: {
			Gamesdata: {
				type: Object,
				default: {}
			},
			list: {
				type: Array,
				default: []
			},
			systemList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				currentIndex: 1,
				autoplay: true, //自动切换轮播图
				swiperCurrent: 0,

				swiper: null,
				swiperList: [],

			};
		},
		created() {

		},
		mounted() {
			//console.log('轮播图', this.list)
			
			// #ifndef APP-PLUS
			this.getSwiper()
			// #endif
		},
		methods: {
			getSwiper() {
				this.swiper = new Swiper(".swiper-container", {
					loop: false, // 无缝
					autoHeight: false, //高度随内容变化
					autoplay: { //自动开始
						delay: 3000, //时间间隔
						disableOnInteraction: false, //*手动操作轮播图后不会暂停*
					},
					paginationClickable: true,
					slidesPerView: 1, // 一组三个
					spaceBetween: 30, // 间隔
					uniqueNavElements: true,//当存在多个同名导航元素时，设置导航元素是否唯一。
					preloadImages:false, //Swiper会强制加载所有图片后才初始化。
					breakpoints: {
						768: { //当屏幕宽度大于等于768 
							slidesPerView: 2,
							spaceBetween: 15
						},
						1280: { //当屏幕宽度大于等于1280
							slidesPerView: 3,
							spaceBetween: 15
						}
					},
					// 如果需要前进后退按钮
					// navigation: {
					// 	nextEl: '.swiper-button-next',
					// 	prevEl: '.swiper-button-prev',
					// },
					// 在大屏上写轮播图，在摁下F11或者放大窗口之后，会丢失pagination，条数会变化，加上这两行，重新渲染swiper
					// 窗口变化,重新init,针对F11全屏和放大缩小,必须加
					observer: true,
					observeParents: true,
					// 如果需要分页器
					// pagination: {
					// 	el: '.swiper-pagination',
					// 	clickable: true, // 分页器可以点击
					// },
				})
			},



















			qiehuan_doc(e) {
				//console.log(e)
				this.swiperCurrent = e
				//this.currentIndex = e+1
			},
			swiperChange_pc(event) {
				this.swiperCurrent = event.detail.current;
				// let a = 1;
				// if (event.detail.current == (Number(this.list.length) - 1)) {
				// 	// 滑动到最后一个时，  currentIndex 和 数组的下标 index 相等
				// 	a = -(Number(this.list.length) - 1)
				// }
				//this.currentIndex = event.detail.current// + a;
			},
			swiperChange(e) {
				//console.log(e)
			},
			Todetails(idx) {
				let item = this.list[idx]
				console.log('点击轮播图',item)
				
				if(item.type == 666){//平台8单独有个游戏提供
					this.$emit('btnClick', 1)
				} else {
					let str = JSON.stringify(item)
					str = str.replace(/%/g, '%25')
					let query = encodeURIComponent(str)
					uni.navigateTo({
						url: '/pages/BonusDetails/BonusDetails?data=' + query
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	/* PC轮播图 */
	.banshi {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding: 0 80rpx;

		.swiper-slide {
			position: relative;
			width: 100%;
			height: auto;
			padding: 0 0;
			background-repeat: no-repeat;
			background-size: contain;
			background-color: transparent;
			border-radius: 28rpx;

			image {
				width: 100%;
				border-radius: 28rpx;
				cursor: pointer;
			}
		}
	}
















	.heade {
		//height: 300rpx;
		position: relative;
		//padding-top: 100rpx;
		margin-bottom: 40px;
		padding: 0 40px 0 40px;
	}

	.sitem {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 16rpx;
	}

	.swiper {
		height: 250px;
	}

	uni-swiper-item {
		overflow: inherit;
	}

	.swiper-item-px {
		box-sizing: border-box;
		width: 100%;
		cursor: pointer;

		image {
			width: 100%;
			height: 500rpx;
			border-radius: 24rpx;
		}
	}

	.sitem:first-child {}

	.sitem:last-child {}


	.s_b {
		position: absolute;
		bottom: -70rpx;
		display: flex;
		justify-content: center;
		transform: translateX(-50%);
		left: 50%;
		//left: 0;
		right: 0;
		margin: 0 auto;
	}

	.dot {
		height: 16rpx;
		width: 35rpx;
		background: #2a3546;
		margin: 0 6rpx;
		border-radius: 8rpx;
		cursor: pointer;
	}

	.active {
		background: #2284f6;
		height: 16rpx;
		width: 60rpx;
		margin-right: 0;
		margin-left: 0;
		border-radius: 8rpx;
	}













	.hide_doc {
		/deep/ .u-indicator-item-round {
			background-color: $indicator-item-round;
		}

		/deep/ .u-indicator-item-round-active {
			background-color: #2283f6 !important;
		}

		/deep/ .u-swiper-indicator {
			padding: 12px 12px 0 12px !important;
			position: initial !important;
			background-color: transparent;
			text-align: center;
			justify-content: center;
		}
	}

	.page_wrap {
		padding: 32rpx 28rpx 8rpx 28rpx;
		margin-bottom: 0;
	}

	.swpier_box {
		position: relative;
	}

	.zheceng {
		width: 80rpx;
		height: 100%;
		background: linear-gradient(90.17deg, rgba(32, 6, 58, 0) 0%, #0d131c4f 80%);
		position: absolute;
		right: -1px;
		bottom: 0;
	}

	.zheceng2 {
		width: 80rpx;
		height: 100%;
		background: linear-gradient(-90.17deg, rgba(32, 6, 58, 0) 0%, #0d131c4f 70%);
		position: absolute;
		left: -1px;
		bottom: 0;
		z-index: 9;
	}

	.page_wrap2 {
		padding: 0 20rpx 0 20rpx;
		//margin-bottom: 10rpx;
	}

	.lunbotu {
		//background-color: #1d2532;
		height: 200px;
		border-radius: 16rpx;

		.container {
			font-size: 14px;
			background-color: #fff;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.swiper-box {
			height: 200px;
		}

		.swiper-item {
			position: relative;
			//display: flex;
			align-items: flex-start;
			background-color: $all-secondary-color;
			border-radius: 20rpx;
			//padding: 20rpx 20rpx 20rpx 20rpx;
			height: 200px;

			.lunbotu_bg {
				width: 100%;
				height: 200px;
				border-radius: 20rpx;
				background-color: $all-secondary-color;
			}

			.sw_left {
				position: relative;
				z-index: 2;
				width: 55%;

				.sub_title {
					display: inline-block;
					background-color: #FEFEFE;
					padding: 6rpx 12rpx;
					border-radius: 6rpx;
					font-size: 22rpx;
				}

				.PTitle {
					color: #FEFEFE;
					font-size: 32rpx;
					margin: 10rpx 0 10rpx 0;
					//font-weight: bold;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.ask_info {
					color: #FEFEFE;
					font-size: 24rpx;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

			}

			.sw_right {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 200px;
				border-radius: 20rpx;
				background-color: $all-secondary-color;

				image {
					width: 100%;
					//height: 156px;
					border-radius: 20rpx;
					background-color: $all-secondary-color;
				}
			}

			.sw_btn {
				color: #FEFEFE;
				border-radius: 10rpx;
				border: 1px solid #FEFEFE;
				background-color: rgba(255, 255, 255, 0);
				/* 半透明背景 */
				backdrop-filter: blur(10px);
				/* 背景模糊 */
				-webkit-backdrop-filter: blur(10px);
				/* 兼容老版本 Safari */
				text-align: center;
				//width: 225rpx;
				height: 63rpx;
				line-height: 63rpx;
				position: absolute;
				left: 24rpx;
				bottom: 24rpx;
				padding: 0 15rpx;
			}

		}
	}

	@media (min-width: 800px) {
		.page_wrap {
			padding: 80rpx 0 8rpx 0;
			margin-bottom: 0;
		}

		/deep/ uni-swiper .uni-swiper-wrapper {
			//overflow: initial !important;
		}

		/deep/ uni-swiper .uni-swiper-dots-horizontal {
			//bottom: -34px;
		}

		/deep/ uni-swiper .uni-swiper-dot {
			//width: 25px;
			//border-radius: 4px;
		}

		.zheceng {
			background: linear-gradient(90.17deg, rgba(32, 6, 58, 0) 0%, #0d131c 80%);
		}

		.zheceng2 {
			background: linear-gradient(-90.17deg, rgba(32, 6, 58, 0) 0%, #0d131c 70%);
		}
	}
</style>