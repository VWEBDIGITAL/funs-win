<template>
	<view :style="theme" class="page_boxs">

		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('BonusOfferPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->

			<pagesNavTitle ref="" :title="$t('BonusOfferPage.title')"></pagesNavTitle>


			<view class="page_wrap">

				<view class="type_box">
					<view class="type_box_item marginl">
						<view>Today</view>
						<image src="/static/image/arrow_right_icon.png"></image>
					</view>
					<view class="type_box_item marginr">
						<view>All Type</view>
						<image class="tabrgd" src="/static/image/arrow_right_icon.png"></image>
					</view>
				</view>

				<view class="list_wrap">
					<view class="list_item" v-for="(item,index) in 2" :key="index">
						<view class="list_item_title">
							<view>Bonus Type</view>
							<view class="lvse">200.00</view>
						</view>
						<view class="item_time" style="margin: 10rpx 0;">
							<view class="time_name">2023-03-03 03:03:03</view>
						</view>
					</view>
				</view>

			</view>

		<!-- </uni-transition> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

				showOptions: true,
			}
		},
		onLoad() {
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		methods: {
			copy(text) {
				let that = this
				uni.setClipboardData({
					data: text, // 设置要复制的文本内容
					showToast: false,
					success(res) {
						////console.log("成功复制到剪贴板");
						uni.showToast({
							title:  that.$t('Betting requirements.register7'),
							icon: 'none',
							duration: 3000
						})
					},
					fail(err) {
						console.error("复制失败", err);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		padding: 20rpx 20rpx;
		background-color: $body-bg-color !important;
	}

	.list_wrap {
		.list_item {
			background-color: $all-secondary-color;
			padding: 24rpx;
			border-radius: 12rpx;
			margin-bottom: 20rpx;

			.list_item_title {
				display: flex;
				align-items: center;
				justify-content: space-between;

				view:nth-child(1) {
					flex: 1;
					color: $font-all-color;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				view:nth-child(2) {
					color: $font-all-color;
				}

				.lvse {
					color: #ffffff !important;
				}
			}

			.item_time {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.time_name {
					color: $font-all-color;
					flex: 1;
				}

				.time_type {
					width: 200rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					color: $font-all-color;

					view:nth-child(1) {
						flex: 1;
						text-align: left;
					}

					view:nth-child(2) {
						text-align: right;
						//font-weight: bold;
					}


				}
			}
		}
	}

	.type_box {
		display: flex;
		align-items: center;

		.type_box_item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: $all-secondary-color;
			padding: 24rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;

			view {
				color: $font-all-color;
				//font-weight: bold;
			}

			image {
				width: 10rpx;
				height: 20rpx;
				transform: rotate(180deg);
			}

			.tabrgd {
				transform: rotate(270deg);
			}
		}

		.marginl {
			margin-right: 10rpx;
		}

		.marginr {
			margin-left: 10rpx;
		}
	}
</style>