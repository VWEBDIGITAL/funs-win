<template>
	<view :style="theme">

		<view class="bonus_lunbo_One" v-if="activitycfg.depositBonusEnabled == true">
			<view class="page_title">{{$t('SpecialBonus')}}</view>
			<swiper :style="{height: swiper_wrapHeight}" :indicator-dots="false" indicator-color='#fff' indicator-active-color='#0086d6' :autoplay="autoplay" interval="6000" :circular='false' @change="swiperChange" previous-margin="0" next-margin="0">

				<!--9和18 是已领取
					10 是进行中，如果进度是100，就显示完成投注待领取
					15是到期未完成
					0 是 未开始-->

				<!--未开始-->
				<swiper-item v-if="activitycfg.depositBonusEnabled == true && userDepositBonus.status == 0">
					<view class="swiper-item" :class="currentStyle == 1?'qumagen':''">
						<view class="sw_left">
							<view class="sub_title">
								<view>{{$t('SpecialBonuS.title1')}} {{activitycfg.rate}}%</view>
								<view @click="OpenDetails()">
									<text>{{$t('SpecialBonuS.ViewDetails')}}</text>
									<u-icon name="arrow-right" color="#3E86FF"></u-icon>
								</view>
							</view>
							<view class="PTitle">{{$t('SpecialBonuS.prompt1')}}</view>
							<view class="ask_info">
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.MinimumDeposit')}} </view><span><span class="price">{{(activitycfg.minAmount/100).toFixed(2)}}</span></span>
								</view>
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.MaximumBonus')}}</view><span><span class="price">{{(activitycfg.bonusMax/100).toFixed(2)}}</span></span>
								</view>
							</view>
						</view>
						<view class="sw_btn" @click="ToWallet()">{{$t('SpecialBonuS.Deposit')}}</view>
					</view>
				</swiper-item>
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				<!--进行中-->
				<swiper-item v-else-if="activitycfg.depositBonusEnabled == true && (userDepositBonus.status == 10 && userDepositBonus.validWager != userDepositBonus.needWager)">
					<view class="swiper-item" :class="currentStyle == 1?'qumagen':''">
						<view class="sw_left">
							<view class="sub_title">
								<view>{{$t('SpecialBonuS.title1')}} {{userDepositBonus.rate}}%</view>
								<view @click="OpenDetails()">
									<text>{{$t('SpecialBonuS.ViewDetails')}}</text>
									<u-icon name="arrow-right"color="#3E86FF"></u-icon>
								</view>
							</view>
							<view class="ask_info">
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.YourBonus')}} </view><span><span class="price">{{(userDepositBonus.bonus/100).toFixed(2)}}</span></span>
								</view>
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.Wagerx')}}（×{{userDepositBonus.multiples}}）</view><span><span class="price">{{(userDepositBonus.validWager/100).toFixed(2)}}/{{(userDepositBonus.needWager/100).toFixed(2)}}</span></span>
								</view>
							</view>
						</view>
						<view class="jdt_box">
							<u-line-progress :percent="userprogress(userDepositBonus)" active-color="#3673D9" inactive-color="#2F4553" height="22"></u-line-progress>
						</view>
						<view class="sw_btn2">
							<view class="EndTime_box">
								<view>{{ days }}D</view>
								<view>{{ hours }}:</view>
								<view>{{ minutes }}:</view>
								<view>{{ seconds }}</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<!--投注成功待领取-->
				<swiper-item v-else-if="activitycfg.depositBonusEnabled == true && (userDepositBonus.status == 10 && userDepositBonus.validWager == userDepositBonus.needWager)">
					<view class="swiper-item" :class="currentStyle == 1?'qumagen':''">
						<view class="sw_left">
							<view class="sub_title">
								<view>{{$t('SpecialBonuS.title1')}} {{userDepositBonus.rate}}%</view>
								<view @click="OpenDetails()">
									<text>{{$t('SpecialBonuS.ViewDetails')}}</text>
									<u-icon name="arrow-right" color="#3E86FF"></u-icon>
								</view>
							</view>
							<view class="ask_info">
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.YourBonus')}} </view><span><span class="price">{{(userDepositBonus.bonus/100).toFixed(2)}}</span></span>
								</view>
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.Wagerx')}}（×{{userDepositBonus.multiples}}）</view><span><span class="price">{{(userDepositBonus.validWager/100).toFixed(2)}}/{{(userDepositBonus.needWager/100).toFixed(2)}}</span></span>
								</view>
							</view>
						</view>
						<view class="jdt_box">
							<u-line-progress :percent="userprogress(userDepositBonus)" active-color="#3673D9" inactive-color="#2F4553" height="22"></u-line-progress>
						</view>
						<view class="sw_btn4" @click="LingQu()">{{$t('SpecialBonuS.Claim')}}</view>
					</view>
				</swiper-item>
				
				
				
				
				
				
				
				
				
				
				
				
				
				<!--9未达标-->
				<swiper-item v-else-if="activitycfg.depositBonusEnabled == true && userDepositBonus.status == 9">
					<view class="swiper-item" :class="currentStyle == 1?'qumagen':''">
						<view class="sw_left">
							<view class="sub_title">
								<view>{{$t('SpecialBonuS.title1')}} {{userDepositBonus.rate}}%</view>
								<view @click="OpenDetails()">
									<text>{{$t('SpecialBonuS.ViewDetails')}}</text>
									<u-icon name="arrow-right" color="#3E86FF"></u-icon>
								</view>
							</view>
							<view class="ask_info">
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.YourBonus')}} </view><span><span class="price">0.00</span></span>
								</view>
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.Wagerx')}}（×{{userDepositBonus.multiples}}）</view><span><span class="price">{{(userDepositBonus.validWager/100).toFixed(2)}}/{{(userDepositBonus.needWager/100).toFixed(2)}}</span></span>
								</view>
							</view>
						</view>
						<view class="jdt_box">
							<u-line-progress :percent="100" active-color="#3673D9" inactive-color="#2F4553" height="22"></u-line-progress>
						</view>
						<!--<view class="sw_btn3">{{$t('SpecialBonuS.Claimed')}}</view>-->
					</view>
				</swiper-item>
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				<!--18已领取18取userDepositBonus中的数据。-->
				<swiper-item v-else-if="activitycfg.depositBonusEnabled == true && userDepositBonus.status == 18">
					<view class="swiper-item" :class="currentStyle == 1?'qumagen':''">
						<view class="sw_left">
							<view class="sub_title">
								<view>{{$t('SpecialBonuS.title1')}} {{userDepositBonus.rate}}%</view>
								<view @click="OpenDetails()">
									<text>{{$t('SpecialBonuS.ViewDetails')}}</text>
									<u-icon name="arrow-right" color="#3E86FF"></u-icon>
								</view>
							</view>
							<view class="ask_info">
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.YourBonus')}} </view><span><span class="price">{{(userDepositBonus.bonus/100).toFixed(2)}}</span></span>
								</view>
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.Wagerx')}}（×{{userDepositBonus.multiples}}）</view><span><span class="price">{{(userDepositBonus.validWager/100).toFixed(2)}}/{{(userDepositBonus.needWager/100).toFixed(2)}}</span></span>
								</view>
							</view>
						</view>
						<view class="jdt_box">
							<u-line-progress :percent="userprogress(userDepositBonus)" active-color="#3673D9" inactive-color="#2F4553" height="22"></u-line-progress>
						</view>
						<view class="sw_btn3">{{$t('SpecialBonuS.Claimed')}}</view>
					</view>
				</swiper-item>
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				<!--到期未完成-->
				<swiper-item v-else-if="activitycfg.depositBonusEnabled == true && userDepositBonus.status == 15">
					<view class="swiper-item" :class="currentStyle == 1?'qumagen':''">
						<view class="sw_left">
							<view class="sub_title">
								<view>{{$t('SpecialBonuS.title1')}} {{userDepositBonus.rate}}%</view>
								<view @click="OpenDetails()">
									<text>{{$t('SpecialBonuS.ViewDetails')}}</text>
									<u-icon name="arrow-right" color="#3E86FF"></u-icon>
								</view>
							</view>
							<view class="ask_info">
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.YourBonus')}} </view><span><span class="price">{{(userDepositBonus.bonus/100).toFixed(2)}}</span></span>
								</view>
								<view class="ask_info_item">
									<view>{{$t('SpecialBonuS.Wagerx')}}（×{{userDepositBonus.multiples}}）</view><span><span class="price">{{(userDepositBonus.validWager/100).toFixed(2)}}/{{(userDepositBonus.needWager/100).toFixed(2)}}</span></span>
								</view>
							</view>
						</view>
						<view class="jdt_box">
							<u-line-progress :percent="userprogress(userDepositBonus)" active-color="#3673D9" inactive-color="#2F4553" height="22"></u-line-progress>
						</view>
						<view class="sw_btn3">
							<view class="EndTime_box">
								<view>0D</view>
								<view>00:</view>
								<view>00:</view>
								<view>00</view>
							</view>
						</view>
					</view>
				</swiper-item>














			</swiper>
		</view>

		<Deposit-Bonus ref="opendeop" :data="activitycfg"></Deposit-Bonus>

	</view>
</template>

<script>
	export default {
		name: "Bonus-TypeOne",
		props: {
			/*activitycfg: {
				type: Object,
				default: {}
			},
			userDepositBonus: {
				type: Object,
				default: {}
			}*/
		},
		data() {
			return {
				
				activitycfg: {},
				userDepositBonus: {},
				
				end_date: "", // 截止时间
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				residue: 0,
				swiper_wrapHeight: '',


				Banners: [],
				autoplay: true,
				currentIndex: 1,
				currentStyle: 0,
			};
		},
		created() {
			this.Getactivity()
		},
		mounted() {
			
		},
		methods: {
			Getactivity(){
				let that = this
				
				this.$u.post('/first/deposit/activity', {
					
				}).then(res => {
					
					if(res.data.cfg.depositBonusEnabled == false) {
						
					} else {
						that.activitycfg = res.data.cfg || {}
						that.userDepositBonus = res.data.userDepositBonus || {}
						
						setInterval(() => {
							this.getResidueDate();
						}, 1000);
						
						that.$nextTick(function () {
							const query = uni.createSelectorQuery().in(that);
						    query.select(".swiper-item").boundingClientRect(data => {
						    	////console.log('轮播图高度',data)
						    	if (data) {
						    		that.swiper_wrapHeight = data.height + 'px'
						    	} else {
						    		that.swiper_wrapHeight = '210px'
						    	}
						    }).exec();
						})
						
					}
					
				}).catch(err => {
				})
			},
			getResidueDate() {
				let EndTime = this.$u.timeFormat(this.userDepositBonus.expireDate, 'yyyy-mm-dd hh:MM:ss');
				this.residue = new Date(EndTime).getTime() - new Date();
				this.days = this.addZero(
					Math.floor(this.residue / 1000 / 60 / 60 / 24)
				); //天
				this.hours = this.addZero(
					Math.floor((this.residue / 1000 / 60 / 60) % 24)
				); //时
				this.minutes = this.addZero(
					Math.floor((this.residue / 1000 / 60) % 60)
				); //分
				this.seconds = this.addZero(Math.floor((this.residue / 1000) % 60)); //秒
			},
			addZero(d) {
				return parseInt(d) < 10 ? "0" + d : d;
			},
			
			
			
			
			
			
			ExpiresTime(expiresTime) {
				return expiresTime
			},
			swiperChange(e) {
				let that = this
				that.currentIndex = e.detail.current
				this.currentIndex = (this.currentIndex + 1) % this.Banners.length;
				if (this.currentIndex == 0) {
					this.currentStyle = 1
				} else {
					that.currentStyle = 0
				}
			},
			OpenDetails() {
				this.$refs.opendeop.openPopup()
			},
			ToWallet() {
				uni.switchTab({
					url: '/pages/Wallet/Wallet'
				})
			},
			userprogress(data) {
				if (data.validWager == data.needWager) {
					return 100
				} else {
					return parseInt((data.validWager / data.needWager) * 100)
				}
			},
			LingQu() {
				let that = this
				that.$u.post('/first/deposit/take/bonus', {

				}).then(res => {
					uni.$emit('getgetMybalance', 1)
					this.$emit('refGetactivity', 1)
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss">
	.bonus_lunbo_One {
		margin-bottom: 20rpx;
		
		.page_title {
			//font-weight: bold;
			color: $me-text-color;
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}

		.container {
			font-size: 14px;
			background-color: #fff;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.swiper-box {
			//height: 210px;
		}
		
		.swiperHeght {
			height: 0 !important;
		}

		.qumagen {
			margin-right: 0 !important;
		}

		.swiper-item {
			position: relative;
			//margin-right: 20rpx;
			background-color: $all-secondary-color;
			border-radius: 7.55rpx;
			padding: 30rpx 30rpx 30rpx 30rpx;

			.sw_left {
				padding-right: 0;

				.sub_title {
					color: #FEFEFE;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20rpx;

					view:nth-child(1) {
						//font-weight: bold;
					}

					view:nth-child(2) {
						color: #3E86FF;
						font-size: 24rpx;
					}
				}

				.PTitle {
					color: $font-all-color;
					margin: 10rpx 0 40rpx 0;
					font-size: 24rpx;
					word-break:break-all;
						display:-webkit-box;
						-webkit-line-clamp:1;
						-webkit-box-orient:vertical;
						overflow:hidden;
				}

				.ask_info {
					color: $font-all-color;
					font-size: 28rpx;
					margin-bottom: 30rpx;

					.ask_info_item {
						margin-bottom: 10rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.price {
							color: #fff;
							//font-weight: bold;
							margin-left: 8rpx;
						}
					}
				}
			}

			.jdt_box {
				/deep/ .u-active {
					justify-items: flex-end !important;
					padding-right: 10rpx;
				}
			}
			
			.EndTime_box {
				display: flex;
				align-items: center;
				justify-content: center;
				view:nth-child(1){
					margin-right: 10rpx;
				}
				view:nth-child(2){
					
				}
				view:nth-child(3){
					
				}
				view:nth-child(4){
					
				}
			}

			.sw_btn {
				color: #3E86FF;
				border-radius: 10rpx;
				background-color: $pupUp-bg-color;
				text-align: center;
				width: 100%;
				margin: 35rpx auto 0;
				height: 73rpx;
				line-height: 73rpx;
			}

			.sw_btn2 {
				color: #fff;
				//font-weight: bold;
				border-radius: 10rpx;
				background-color: $pupUp-bg-color;
				text-align: center;
				width: 100%;
				margin: 35rpx auto 0;
				height: 73rpx;
				line-height: 73rpx;
			}

			.sw_btn3 {
				color: #2f4553;
				//font-weight: bold;
				border-radius: 10rpx;
				background-color: $pupUp-bg-color;
				text-align: center;
				width: 100%;
				margin: 35rpx auto 0;
				height: 73rpx;
				line-height: 73rpx;
			}

			.sw_btn4 {
				color: #fff;
				//font-weight: bold;
				border-radius: 10rpx;
				background-color: #3E86FF;
				text-align: center;
				width: 100%;
				margin: 35rpx auto 0;
				height: 73rpx;
				line-height: 73rpx;
			}

			.sw_right {
				position: absolute;
				right: 10rpx;
				top: 10rpx;
				padding-left: 30rpx;

				image {
					width: 253.47rpx;
					height: 209.03rpx;
				}
			}

		}
	}
</style>