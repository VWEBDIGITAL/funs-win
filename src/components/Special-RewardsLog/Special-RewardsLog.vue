<template>
	<view>
		<u-popup v-model="centerShow" mode="bottom" border-radius="34" :closeable="true">
			<view class="reg_title_task" @click="centerShow = false">
				<view>{{$t('NewUserPopup.Reward')}}</view>
			</view>
			<view class="page_wrap">
				<view class="list_wrap">
					<scroll-view scroll-y style="max-height: 500px;" scroll-with-animation>
					<view class="list_item" v-for="(item,index) in TSactivityList" :key="index">
						<view class="list_item_title">
							<view>{{item.title}}</view>
							<view class="lvse">{{(item.amount/100).toFixed(2)}}</view>
						</view>
						<view class="item_time" style="margin: 20rpx 0 0 0;">
							<view class="time_name">{{item.date}}</view>
							<!--状态0、申请未处理 1、拒绝 2、通过未领奖 3、已领奖-->
							<view class="status_text" v-if="item.status == 3">{{$t('VIPPage.BonusStatus2')}}<u-icon name="checkmark-circle-fill" color="#ff9800"></u-icon></view>
							<view class="status_text huise" v-else-if="item.status == 0">{{$t('NEWBonusPageA.BluePrompt')}}<u-icon name="close-circle-fill"></u-icon></view>
							<view class="status_text huise" v-else-if="item.status == 1">{{$t('jjsq')}}<u-icon name="close-circle-fill"></u-icon></view>
							<view class="status_text huise" v-else-if="item.status == 2">{{$t('tgwqj')}}<u-icon name="close-circle-fill"></u-icon></view>
						</view>
					</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	export default {
		name: "Special-RewardsLog",
		data() {
			return {
				TSactivityList: [],
				centerShow: false
			};
		},
		created() {

		},
		methods: {
			init() {
				this.centerShow = true
				this.getTeshuJiangi()
			},
			getTeshuJiangi() {
				let that = this
				that.$u.post('/apply/activity/record', {
					type: 2 //{"type":1} 表示只查申请中和可领取，{"type":2} 查全部记录
				}).then(res => {
					console.log('特殊奖金列表', res.data)
					that.TSactivityList = res.data
				})
			},

		}
	}
</script>

<style lang="scss">
	/deep/ .u-drawer-bottom {
		background-color: $body-bg-color !important;
	}

	.page_wrap {
		padding: 10px 10px 10px 10px;
		height: 100%;
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
					color: $hot-jiangli-font-color;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					font-weight: bold;
					font-size: 32rpx;
				}

				view:nth-child(2) {
					color: $font-all-color;
					font-size: 32rpx;
				}

				.lvse {
					color: #1db83e !important;
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

				.status_text {
					color: #ff9800;
					font-size: 28rpx;
					display: flex;
					align-items: center;
				}

				.huise {
					color: $font-all-color !important;
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
				width: 30rpx;
				height: 30rpx;
				transform: rotate(180deg);
			}

			.tabrgd {
				transform: rotate(270deg);
			}
		}

		.marginl {
			//margin-right: 10rpx;
		}

		.marginr {
			margin-left: 10rpx;
		}
	}

	.reg_title_task {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		padding: 30rpx 30rpx;
		z-index: 9;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background-color: $all-secondary-color;
		box-shadow: 10px 0 15px 0 rgba(0, 0, 0, 0.1);

		view:nth-child(1) {
			font-size: 38rpx;
			color: $all-secondary-text-color;
			font-weight: bold;
		}

		view:nth-child(2) {
			margin-left: 10rpx;
			color: #55657e;
			background-color: $pupUp-bg-color;
			padding: 4rpx 14rpx;
			border-radius: 8rpx;

			span {
				color: #07b163;
			}
		}
	}
</style>