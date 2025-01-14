<template>
	<view :style="theme" class="page_boxs">
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('navBarTitle.spin')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		
		<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions">
			
		<pagesNavTitle ref="" :title="$t('navBarTitle.spin')"></pagesNavTitle>
		
		<view class="page_wrap">
			
			<view class="tabs_box">
				<view class="tabs_item" v-for="(item,index) in tabsList" :key="index" @click="clicktabs(index)">
					<view class="item_name" :class="tabsidx == index?'xzuanzhong':''">{{item.name}}</view>
					<view class="item_mask" v-if="tabsidx == index"></view>
					<view class="item_border" v-if="tabsidx == index"></view>
				</view>
			</view>
			
			<view class="Spin_point_bronze">
				<image src="/static/image/Spin_point_bronze.png" mode="widthFix"></image>
			</view>
			
			<view class="paihangbang">
				<view class="paihangbang_item">
					<view class="huangguan">
						<image src="/static/image/crown.c6636ed4.png"></image>
					</view>
					<view class="cao_box">
						<image src="/static/image/laurel.2ec31bad.png"></image>
						<view>Spin Bounts</view>
						<image src="/static/image/laurel.234rfdf.png"></image>
					</view>
				</view>
				<view class="Commission_Ranking">
					<view class="Ranking_title"></view>
					<view class="Ranking_title_sub">
						<view>User Name</view>
						<view>Spin level</view>
						<view>Prize</view>
					</view>
                 <view class="Ranking_lists" v-for="(item, index) in Array.from({ length: 17 })" :key="index">
                 <view>Guang</view>
                 <view>LUCKY SPIN</view>
                 <view>+188.88</view>
                 </view>
				</view>
			</view>
		</view>
		</uni-transition>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOptions: true,
				tabsList: [{
					name: 'Lucky Spin'
				}, {
					name: 'Super Spin'
				}, {
					name: 'Mega Spin'
				}],
				tabsidx: 1,

			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				
			}
		},
		methods: {
			clicktabs(idx) {
				this.tabsidx = idx
			}
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		padding: 20rpx 20rpx;
		.paihangbang {
			background-color: $all-secondary-color;
			padding: 30rpx;
			border-radius: 6rpx;
			.paihangbang_item {
				.huangguan {
					text-align: center;
					image {
						width: 75.69rpx;
						height: 41rpx;
					}
				}
				.cao_box {
					display: flex;
					align-items: center;
					justify-content: center;
					image {
						width: 22.22rpx;
						height: 41rpx;
					}
					view {
						color: #FEFEFE;
						//font-weight: bold;
						margin: 0 10rpx;
					}
				}
			}
			.Commission_Ranking {
				background-color: $all-secondary-color;
				padding: 0 10rpx;
				border-radius: 12rpx;
				.Ranking_title {
					text-align: center;
					font-size: 34rpx;
					color: #FEFEFE;
					//font-weight: bold;
					border-bottom: 1px solid #2F4553;
					padding-bottom: 30rpx;
				}
				.Ranking_title_sub {
					margin: 30rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					view:nth-child(1) {
						width: 190rpx;
						color: #FEFEFE;
						text-align: left;
					}
					view:nth-child(2) {
						flex: 1;
						color: #FEFEFE;
						text-align: center;
					}
					view:nth-child(3) {
						flex: 1;
						color: #FEFEFE;
						text-align: right;
					}
				}
				.Ranking_lists {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 10rpx 0;
					view:nth-child(1) {
						width: 190rpx;
						color: #FEFEFE;
						text-align: left;
						font-size: 24rpx;
						//font-weight: bold;
					}
					view:nth-child(2) {
						flex: 1;
						color: $font-all-color;
						text-align: center;
						font-size: 24rpx;
					}
					view:nth-child(3) {
						flex: 1;
						color: #45D91E;
						text-align: right;
						//font-weight: bold;
						font-size: 24rpx;
					}
				}
			}
		}
		.Spin_point_bronze {
			text-align: center;
			background-color: $all-secondary-color;
			padding: 60rpx;
			margin: 40rpx 0 30rpx 0;
			border-radius: 6rpx;
			image {
				width: 484.72rpx;
			}
		}
		.tabs_box {
			border-radius: 12rpx 12rpx 0 0;
			border-bottom: 2px solid #2F4553;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 92rpx;
			position: relative;
		
			.tabs_item {
				flex: 1;
				position: relative;
				text-align: center;
				height: 92rpx;
		
				.item_name {
					width: 100%;
					color: $font-all-color;
					//font-weight: bold;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 9;
					font-size: 26rpx;
				}
				.xzuanzhong {
					color: #FEFEFE !important;
				}
		
				.item_mask {
					background-color: $all-secondary-color;
					height: 27px;
					width: 100%;
					background-image: linear-gradient(to top, rgb(34, 61, 82), rgb(13, 19, 28));
					border-radius: 0 0 0 0;
					position: absolute;
					bottom: 0;
					left: 0;
					z-index: 1;
				}
		
				.item_border {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 2px;
					background-color: #3673D9;
					z-index: 2;
				}
			}
		}
	}
</style>
