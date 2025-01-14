<template>
	<view :style="theme" class="page_boxs">
		<DailyRebateRatePopup ref="RebateRate"></DailyRebateRatePopup>

		

		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('RebatesPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>

		<!-- <uni-transition :mode-class="['fade', 'zoom-in']"
			:styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}"
			:show="showOptions"> -->

			<pagesNavTitle ref="" :title="$t('RebatesPage.title')"></pagesNavTitle>


			<view class="page_wrap">
				<view class="top_box">
					<view class="top_box_left">
						<view>{{$t('RebatesPage.TodayWagered')}}:<span>{{todayBet.toFixed(2)}}</span></view>
						<view>{{$t('RebatesPage.RebatesAvailable')}}:<span>{{rebateAvailable}}</span></view>
					</view>
					<view class="top_box_right">
						<view @click="Lingqu()" v-if="rebateAvailable != 0">{{$t('RebatesPage.ClaimBtn')}}</view>
						<view v-else style="color: #666;">{{$t('RebatesPage.ClaimBtn')}}</view>
						<u-icon @click="openDrrp()" name="question-circle-fill" size="30" color="#ffffff"></u-icon>
					</view>
				</view>
				<view class="Referralbonus_box2" v-if="betList.length != 0">
					<view class="Referral_bonus_item" v-for="(item,index) in betList" :key="index">
						<view class="Referral_bonus_item_info">
							<view class="item_list_box">
								<view>{{$t('NewlyAdded.GameType')}} <span>{{item.category}}</span></view>
								<view class="nobold">{{$t('RebatesPage.Ratio')}}：{{item.rebateRate}}‱</view>
							</view>
							<view class="item_list_box">
								<view>{{$t('RebatesPage.BetAmount')}} </view>
								<view>{{item.totalBet.toFixed(2)/100}}</view>
							</view>
							<view class="item_list_box">
								<view>{{$t('RebatesPage.RebateAmount')}} </view>
								<view>{{item.betRebate.toFixed(2)/100}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="nodata_all" v-else>
					<image src="/static/image/NoOrders.png" mode="widthFix"></image>
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
				rebateAvailable: '',
				todayBet: 0,
				betList: []
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
				this.getDetailss()
			}

		},
		onShow() {
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
			
			} else {
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		methods: {
			getDetailss() {
				let that = this
				that.$u.post('/vip/rebate/detail', {

				}).then(res => {
					that.rebateAvailable = (res.data.rebateAvailable/100).toFixed(2) || 0
					that.todayBet = res.data.todayBet / 100
					that.betList = res.data.betList
				})
			},
			clicktabs(idx) {
				this.tabsidx = idx
			},
			openDrrp() {
				this.$refs.RebateRate.openPopup()
			},
			Lingqu() {
				let that = this
				that.$u.post('/vip/reward/take', {
					rewardType: 3, // Number 是 领取类型： 3 返水 11 升级礼金 12 生日礼金 13 周礼金 14 月礼金
					vipLevel: uni.getStorageSync("userinfo").vip
				}).then(res => {
					that.$nextTick(() => {
						this.getDetailss();
						uni.$emit('getgetMybalance', 1)
						uni.$emit('UpdataAddBcbalance', (that.rebateAvailable/100).toFixed(2));
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		padding: 20rpx 20rpx;
		background-color: $body-bg-color !important;
	}

	.top_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $all-secondary-color;
		margin-bottom: 30rpx;
		border-radius: 12rpx;
		padding: 30rpx;

		.top_box_left {
			flex: 1;
			view:nth-child(1) {
				color: $font-all-color;
				margin-bottom: 20rpx;

				span {
					color: #FEFEFE;
					//font-weight: bold;
				}
			}

			view:nth-child(2) {
				color: $font-all-color;

				span {
					color: #FEFEFE;
					//font-weight: bold;
				}
			}
		}

		.top_box_right {
			display: flex;
			align-items: center;

			view:nth-child(1) {
				background-color: $pupUp-bg-color;
				color: #3673D9;
				border-radius: 6rpx;
				margin-right: 20rpx;
				//width: 141.67rpx;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
				padding: 0 10rpx;
			}
		}
	}

	.Referralbonus_box2 {
		margin: 0 0 30rpx 0;

		.Referral_bonus_item {
			flex: 1;
			background-color: $all-secondary-color;
			border-radius: 12rpx;
			margin-bottom: 30rpx;

			.Referral_bonus_item_info {
				padding: 10rpx 30rpx;
				position: relative;
				color: $font-all-color;

				.item_list_box {
					border-bottom: 1px solid #2F4553;
					padding: 20rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.nobold {
						font-weight: initial !important;
						color: $font-all-color !important;
					}

					view:nth-child(1) {
						span {
							color: #FEFEFE;
							//font-weight: bold;
							margin: 0 10rpx;
						}
					}

					view:nth-child(2) {
						color: #FEFEFE;
						//font-weight: bold;
					}
				}

				.item_list_box:last-child {
					border-bottom: none !important;
				}
			}
		}
	}
</style>