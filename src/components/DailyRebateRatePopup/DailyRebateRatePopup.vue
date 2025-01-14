<template>
	<view :style="theme">

		<u-popup v-model="AgentBonusRatePopupShow" width="650"  height="1260" mode="center" close-icon-size="30" border-radius="24" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="AgentBonusRatePopupShow = false">
				<view>{{$t('RebateRatePopup.title')}}</view>
			</view>
			<view class="input_box">

				<view class="shopTuijian">
					<scroll-view class="uni-swiper-tab" scroll-x>
						<view class="scrollx_items" v-for="(item,index) in TabsList" :key="index">
							<view class="xxk_box" :class="tabsIdx == index?'xuanzhong':''">
								<view class="moren" @click="clickTabs(item,index)">
									<view class="moren_item">
										<!--<image :src="item.icon"></image>-->
										<image v-if="item.name=='bingo'" src="/static/DaiLiPopup/Bingo.png"></image>
										<image v-if="item.name=='cards'" src="/static/DaiLiPopup/d0.png"></image>
										<image v-if="item.name=='fishing'" src="/static/DaiLiPopup/d1.png"></image>
										<image v-if="item.name=='live'" src="/static/DaiLiPopup/d2.png"></image>
										<image v-if="item.name=='mini'" src="/static/DaiLiPopup/d4.png"></image>
										<image v-if="item.name=='slots'" src="/static/DaiLiPopup/d5.png"></image>
										<image v-if="item.name=='sports'" src="/static/DaiLiPopup/d6.png"></image>
										
										<view v-if="item.name=='bingo'">{{$t('ADDnew.Lottery')}}</view>
										<view v-if="item.name=='cards'">{{$t('RebateRatePopup.Cards')}}</view>
										<view v-if="item.name=='fishing'">{{$t('RebateRatePopup.Fishing')}}</view>
										<view v-if="item.name=='live'">{{$t('RebateRatePopup.Live Casino')}}</view>
										<view v-if="item.name=='mini'">{{$t('RebateRatePopup.Mini Games')}}</view>
										<view v-if="item.name=='slots'">{{$t('RebateRatePopup.Slots')}}</view>
										<view v-if="item.name=='sports'">{{$t('RebateRatePopup.Sports')}}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>



				<view class="tab_list_wrap">
					<view class="tab_list_title">
						<view>{{$t('CommissionRatePopup.Level')}}</view>
						<view>{{$t('RebateRatePopup.ValidBets')}}</view>
						<view>{{$t('RebateRatePopup.RebateRate')}}</view>
					</view>
					<view class="tabl_list_box">
						<view class="tabl_list_box_item" v-for="(item,index) in tablData" :key="index">
							<view class="level_box">
								<view class="level_box_item" :class="[removeCharLevel(item.level) == userInfo.vip?'mylevel':'']">
									<view><u-icon v-if="removeCharLevel(item.level) == userInfo.vip" name="checkmark-circle-fill" size="28" color="#45D91E"></u-icon></view>
									<view>{{item.level}}</view>
								</view>
							</view>
							<view>{{item.bet/100}}</view>
							<view>{{item.rebate/100}}%</view>
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
				
				userInfo: {}

			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			this.getPeiZhi()
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				
			}else {
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
			getPeiZhi() {
				let that = this
				that.$u.post('/vip/rebate/cfg', {

				}).then(res => {
					
					if(res.data.length != 0){
						const vueObj = res.data;
						const arr = Object.values(vueObj);
						const propertyNames = Object.keys(vueObj);
						let vueObjs = propertyNames
						let newArry = []
						vueObj.forEach((item, index) => {
							//////console.log(propertyNames)
							newArry.push({
								name: item.name,
								icon: '/static/DaiLiPopup/d' + index + '.png',
								list: item.list
							})
						})
						that.TabsList = newArry
						//////console.log('最终',newArry)
						this.tablData = newArry[0].list
					}
					
					
				})
			},
			removeCharLevel(value) {
				return value.replace(new RegExp('VIP', 'g'), '');
			},
			clickTabs(item,idx) {
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








	.tab_list_wrap {
		margin-top: 22rpx;

		.tab_list_title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #12171c;
			height: 74.31rpx;
			line-height: 74.31rpx;
			border-radius: 0;
			
			view {
				word-break:break-all;
				display:-webkit-box;
				-webkit-line-clamp:1;
				-webkit-box-orient:vertical;
				overflow:hidden;
			}

			view:nth-child(1) {
				flex: 1;
				//width: 150rpx;
				font-size: 24rpx;
				color: #8e99a2;
				text-align: center;
			}

			view:nth-child(2) {
				flex: 1;
				font-size: 24rpx;
				color: #8e99a2;
				text-align: center;
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
				margin: 0 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #1e2b37;
				height: 74.31rpx;
				line-height: 74.31rpx;
				border-radius: 0;

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
						justify-content: center;

						view:nth-child(1) {
							left: 14rpx;
							top: 12rpx;
							position: absolute
						}

						view:nth-child(2) {}
					}
				}

				view:nth-child(2) {
					flex: 1;
					font-size: 24rpx;
					color: $font-all-color;
					text-align: center;
				}

				view:nth-child(3) {
					flex: 1;
					font-size: 28rpx;
					color: #ffc000;
					text-align: center;
					font-weight: bold;
				}
			}

			.tabl_list_box_item:nth-of-type(2n) {
				background-color: #12171c;
			}

			.tabl_list_box_item {
				background-color: #1e2b37;
			}
		}

	}

	.to_SignIn {
		background-color: $all-secondary-color;
		text-align: center;
		height: 83rpx;
		line-height: 83rpx;
		color: $font-all-color;
		font-size: 24rpx;
	}

	.input_box {
		padding: 30rpx;

		.input_item {
			margin-bottom: 30rpx;

			.input_item_title {
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-size: 28rpx;
			}

			.input_item_true {
				background-color: $all-secondary-color;
				border: 1px solid $input-border-color;
				border-radius: 10px;
				padding: 0 16rpx;
				height: 50px; 
			}
		}

		.Agreement {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: $font-all-color;
		}

		.Register_btn {
			width: 100%;
			margin: 40rpx auto 22rpx;
		}
		.xuanzhong {
			color: $me-text-color !important;
			background-color: $all-secondary-color !important;
		}
		.xxk_box {
			padding: 0 12px;
			border-radius: 200rpx;
			.moren {
				flex: 1;
				margin: 0 8rpx;

				.moren_item {
					color: $me-text-color;
					border-radius: 10rpx;
					height: 74rpx;
					//font-weight: bold;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 4rpx;
					}

					view {
						font-size: 28rpx;
					}
				}
			}

			.moren:first-child {
				margin-left: 0;
			}

			.moren:last-child {
				margin-right: 0;
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