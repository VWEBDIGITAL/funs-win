<template>
	<view :style="theme">

		<u-popup v-model="AgentBonusRatePopupShow" width="650" height="90%" mode="center" close-icon-size="30" border-radius="24" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="AgentBonusRatePopupShow = false">
				<view>{{$t('ReferPage.ReferralBonus')}}</view>
			</view>
			<view class="input_box">
				<view class="sange_box">
					<view class="sange_box_item">
						<view class="paixu">01</view>
						<image src="/static/image/xinfeng1.png"></image>
						<view class="sange_box_item_title">{{$t('RecommendPopup.title1')}}</view>
						<view class="sange_box_item_ask">{{$t('RecommendPopup.title2')}}</view>
					</view>
					<view class="sange_box_item">
						<view class="paixu">02</view>
						<image src="/static/image/nazheqian1.png"></image>
						<view class="sange_box_item_title">{{$t('RecommendPopup.title3',{max:weidengluData.maxBonus/100})}}</view>
						<view class="sange_box_item_ask">{{$t('RecommendPopup.title4')}}</view>
					</view>
					<view class="sange_box_item">
						<view class="paixu">03</view>
						<image src="/static/image/jiasuo1.png"></image>
						<view class="sange_box_item_title">{{$t('RecommendPopup.title5')}}</view>
						<view class="sange_box_item_ask">{{$t('RecommendPopup.title6')}}</view>
					</view>
					<view class="sange_box_item">
						<view class="paixu">04</view>
						<image class="xiaoxing" src="/static/image/rankjinbi.png"></image>
						<view class="sange_box_item_title">{{$t('RecommendPopup.title7')}}</view>
						<view class="sange_box_item_ask">{{$t('RecommendPopup.title8')}}</view>
					</view>
				</view>
				<!-- <view class="wenxintishi">
					<view>{{$t('RecommendPopup.title7')}}:</view>
					<view>{{$t('RecommendPopup.title8')}}</view>
				</view> -->
				<view class="tab_list_wrap">
					<view class="tab_list_title">
						<view>{{$t('RecommendPopup.title9')}}</view>
						<view>{{$t('RecommendPopup.title0')}}</view>
					</view>
					<view class="tabl_list_box">
						<view class="tabl_list_box_item" v-for="(item,index) in inviteReward" :key="index" v-if="item.bet>0 && item.reward>0">
							<view class="level_box">
								<view class="level_box_item">
									<view>{{item.bet/100}}</view>
								</view>
							</view>
							<view>
								<image src="/static/image/qianbi.png"></image>{{(item.reward/100).toFixed(2)}}
							</view>
						</view>
					</view>
				</view>

			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "DailyRebateRatePopup",
		props: {

		},
		components: {

		},
		data() {
			return {
				AgentBonusRatePopupShow: false,
				TabsList: [],
				tabsList: [{
					name: this.$t('RebateRatePopup.Slots'),
					icon: '/static/image/home/icons8-lhj.png'
				}, {
					name: this.$t('RebateRatePopup.Live Casino'),
					icon: '/static/image/home/icons8-live.png'
				}, {
					name: this.$t('RebateRatePopup.Fishing'),
					icon: '/static/image/home/icons8-yu.png'
				}, {
					name: this.$t('RebateRatePopup.Sports'),
					icon: '/static/image/icons8-qiu-64.png'
				}, {
					name: this.$t('RebateRatePopup.Fishing'),
					icon: '/static/image/home/icons8-yu.png'
				}, {
					name: this.$t('RebateRatePopup.Sports'),
					icon: '/static/image/icons8-qiu-64.png'
				}],
				tabsIdx: 0,

				tablData: [],

				userInfo: {},
				
				weidengluData: {},
				inviteReward: []

			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			this.getPeiZhi()
			this.getweidenglu()
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				
			} else {
				this.getuserinfo()
			}
		},
		mounted() {

		},
		methods: {
			getuserinfo() {
				let that = this
				that.$u.post('/user/get/info', {}).then(res => {
					that.userInfo = res.data
				})
			},
			getweidenglu(){
				let that = this
				that.$u.post('/promotion/recommend/base', {
					
				}).then(res => {
					this.weidengluData = res.data
				})
			},
			getPeiZhi() {
				let that = this
				that.$u.post('/promotion/invited/cfg', {

				}).then(res => {
					this.inviteReward = res.data

					/*if (res.data.length != 0) {
						const vueObj = res.data;
						const arr = Object.values(vueObj);
						const propertyNames = Object.keys(vueObj);
						let vueObjs = propertyNames
						let newArry = []
						vueObj.forEach((item, index) => {
							////console.log(propertyNames)
							newArry.push({
								name: item.name,
								icon: '/static/DaiLiPopup/d' + index + '.png',
								list: item.list
							})
						})
						that.TabsList = newArry
						////console.log('最终',newArry)
						this.tablData = newArry[0].list
					}*/


				})
			},
			removeCharLevel(value) {
				return value.replace(new RegExp('VIP', 'g'), '');
			},
			clickTabs(item, idx) {
				this.tabsIdx = idx
				//////console.log(item)
				this.tablData = item.list
			},
			openPopup() {
				this.AgentBonusRatePopupShow = true
			},
			closewindows() {
				this.AgentBonusRatePopupShow = false
			}
		}
	}
</script>

<style lang="scss">
	::v-deep .uni-table-tr:nth-of-type(2n) {
		background-color: #B1BAD3;
	}

	::v-deep .uni-table-tr {
		background-color: $all-secondary-color;
	}

	.shopTuijian {
		padding: 0 0 14rpx 0;
		background-color: $home-games-wrap-color;
	}

	.uni-swiper-tab {
		white-space: nowrap;
	}

	.scrollx_items {
		text-align: left;
		display: inline-block;
		width: auto;
		box-sizing: border-box;
		margin-right: 5px;
	}

	.scrollx_items:first-child {
		//margin-left: 30rpx;
	}

	.scrollx_items:last-child {
		margin-right: 0;
	}
	
	.wenxintishi {
		view:nth-child(1){
			color: $font-all-color;
			font-weight: bold;
		}
		view:nth-child(2){
			color: #8e99a2;
		}
	}

	.tab_list_wrap {
		margin-top: 22rpx;
		background-color: $referralBonus-popup-list-bg;
		padding: 20rpx;
		border-radius: 6px;

		.tab_list_title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: $tabl-list-box-item;
			height: 74.31rpx;
			line-height: 74.31rpx;
			border-radius: 6px;
			padding: 0 10rpx;

			view {
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			view:nth-child(1) {
				flex: 1;
				//width: 150rpx;
				font-size: 24rpx;
				color: #8e99a2;
				text-align: left;
			}

			view:nth-child(2) {
				flex: 1;
				font-size: 24rpx;
				color: #8e99a2;
				text-align: right;
			}

			view:nth-child(3) {
				flex: 1;
				font-size: 24rpx;
				color: #8e99a2;
				text-align: center;
			}
		}

		.tabl_list_box {
			.tabl_list_box_item {
				margin: 10rpx 0;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: $tabl-list-box-item;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 6px;

				.level_box {
					flex: 1;
					//width: 150rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.mylevel {
						background-image: linear-gradient(to left, rgba(0, 0, 0, 0), #346ed0);
					}

					.level_box_item {
						width: 100%;
						position: relative;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						color: $all-secondary-text-color;
					}
				}

				view:nth-child(2) {
					flex: 1;
					font-size: 28rpx;
					color: #ffc000;
					text-align: right;
					font-weight: bold;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}

				view:nth-child(3) {
					flex: 1;
					font-size: 28rpx;
					color: #ffc000;
					text-align: center;
					font-weight: bold;
				}
			}

			//.tabl_list_box_item:nth-of-type(2n) {
			//	background-color: #12171c;
			//}

			//.tabl_list_box_item {
			//	background-color: #1e2b37;
			//}
		}

	}

	.input_box {
		//background-color: #1d262d;
		padding: 30rpx;

		.sange_box {
			.sange_box_item {
				margin-bottom: 30rpx;
				position: relative;
				background-image: $sange-box-item;
				padding: 20rpx;
				border-radius: 12rpx;

				.paixu {
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					font-size: 80rpx;
					font-weight: bold;
					background: $sange-box-item-xh;
					/* 标准语法 */
					-webkit-background-clip: text;
					/* Chrome, Safari */
					background-clip: text;
					-webkit-text-fill-color: transparent;
					/* Chrome, Safari */
					color: transparent;
					/* 其他浏览器 */
				}
				
				.xiaoxing {
					width: 55rpx !important;
					height: 55rpx !important;
				}

				image {
					width: 70rpx;
					height: 70rpx;
					margin-bottom: 10rpx;
				}

				.sange_box_item_title {
					color: $all-secondary-text-color;
					font-size: 40rpx;
					display: flex;
					align-items: center;

					image {
						margin: 0 10rpx 0 20rpx;
						width: 50rpx;
						height: 50rpx;
					}

					span {
						color: #ffc000;
					}
				}

				.sange_box_item_ask {
					color: #7a99bf;
				}
			}
		}
	}

	.reg_title {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			font-size: 30rpx;
			color: $all-secondary-text-color;
			//font-weight: bold;
		}
	}
</style>