<template>
	<view :style="theme">

		<view>
			<view class="RegisterNowshow_wrap">
				<view class="RegisterNowshow_box">
					<view class="close_icon" @click="Guanbi()"><u-icon name="close" color="#ffffff"></u-icon></view>
					<view class="RegisterNowshow_wean">

						<view class="wenan_text">
							<view class="wenan_text_1"><!--<span>1s-T</span>-->{{$t('DepositPageBonus.DepBonusPlus')}}</view>
							<view class="wenan_text_2">
								<image src="/static/image/huo.png"></image>
								<view>{{MaxRates||0}}% <span>{{$t('ADDnew.Reward')}}</span></view>
							</view>
						</view>
					</view>

					<view class="daojishi_wrap">
						<view class="daojishi_box">
							<view class="djs_title">
								<view>{{$t('DepositBonusPopup.Minute')}}</view>
								<view>{{$t('DepositBonusPopup.Second')}}</view>
							</view>
							<view class="jshiqi">
								<u-count-down :timestamp="Data.extraCountdown" :show-days="false" :show-hours="false"
									:show-border="true" font-size="42" color="#ffffff" border-color="#5289ff"
									bg-color="#025de9" separator-color="#ffffff" @end="endWelcomeUcd"></u-count-down>
							</view>
						</view>
						<view class="reg_btn" :class="[Data.extraCountdown == 0?'no_box_opacity':'']" @click="[Data.extraCountdown == 0?null:Toregac()]"><span>{{$t('DepositBonusPopup.DEPNOW')}}</span></view>
					</view>

				</view>
			</view>
		</view>

		<!-- <regiserPopup ref="regiserShow"></regiserPopup> -->
		
		
		

	</view>
</template>

<script>
	export default {
		name: "Welcome-DepositBonusPlus",
		props: {
			
		},
		data() {
			return {
				RegisterNowshow: false,
				MaxRates: 0,
				Data: {}
			};
		},
		created() {
			
		},
		mounted() {
			setTimeout(() => {
				this.GetWelcomePackage()
			},200)
		},
		methods: {
			endWelcomeUcd(){
				let that = this
				that.RegisterNowshow = false
				that.$emit('DepositBonusClose',1)
			},
			//获取Welcome Package
			GetWelcomePackage(){
				let that = this
				that.$u.post('/welcome/packet', {
					
				}).then(res => {
					that.Data = res.data.firstPay
					
					// 筛选首充最大加成值 
					// 加成时间过之后应该没有加成的20% 弹窗取消 150%的划线去掉
					if(res.data.firstPay.extraCountdown>0){
						let MaxRate = res.data.firstPay.rewardRate + res.data.firstPay.extraRate || 0
						that.MaxRates = MaxRate
						//console.log('MaxRate',MaxRate)
					} else {
						that.MaxRates = res.data.firstPay.rewardRate
					}
					
					
				})
			},
			Taskshowopen() {
				////console.log('首充欢迎数据',this.Data)
				//this.MaxRates = this.Data.rewardRate + this.Data.extraRate
			},
			Guanbi() {
				let that = this
				that.RegisterNowshow = false
				that.$emit('DepositBonusClose',1)
			},
			Toregac() {
				let that = this
				
				that.RegisterNowshow = false
				that.$emit('DepositBonusClose',1)
				
				let windowWidth = uni.getSystemInfoSync().windowWidth
				if(windowWidth >= "800"){
					this.$emit('dakitikPopup', 1)
				} else {
					setTimeout(() => {
						//that.$refs.regiserShow.openPopup(2)
						uni.switchTab({
							url: '/pages/Wallet/Wallet'
						})
					}, 200)
				}
				
				
			}
		}
	}
</script>

<style lang="scss">
	.jshiqi {
		/deep/ .u-countdown-colon {
			padding: 0 10rpx !important;
			position: relative;
			top: -6rpx;
		}
	}
	
	
	/deep/ .u-countdown-item {
		padding: 16rpx !important;
		border-radius: 20rpx !important;
	}

	/deep/ .u-drawer {
		//position: initial !important;
	}

	/deep/ .u-drawer-content {
		//position: fixed !important;
	}

	/deep/ .u-drawer-bottom {
		background-color: transparent !important;
	}

	/deep/ .u-mask-show {
		//display: none !important;
	}
	
	.no_box_opacity {
		opacity: .3;
	}

	.RegisterNowshow_wrap {
		background-color: transparent;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.RegisterNowshow_box {
			border-radius: 30rpx;
			background: linear-gradient(125deg, #387ae6 0%, #1757fb 100%);
			width: 90%;
			position: relative;
			padding: 20rpx 50rpx 20rpx 30rpx;

			.close_icon {
				cursor: pointer;
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.u-icon {
					font-size: 30rpx;
					color: #ffffff;
					background-color: rgba(0, 0, 0, 0.35);
					padding: 10rpx;
					border-radius: 10rpx;
				}
			}

			.daojishi_wrap {
				display: flex;
				align-items: flex-end;
				justify-content: space-between;

				.daojishi_box {
					flex: 1;
					padding: 0 30rpx 0 0;

					.djs_title {
						margin-bottom: 6rpx;
						display: flex;
						align-items: center;
						color: #cecee7;
						view {
							flex: 1;
							text-align: center;
						}
						view:nth-child(1) {
							margin-right: 24rpx;
							text-align: center;
						}
					}
				}
			}

			.RegisterNowshow_wean {
				display: flex;
				align-items: flex-start;
				padding: 0 0 0 0;
				margin-bottom: 5px;


				.wenan_text {
					.wenan_text_1 {
						color: #ffffff;
						font-size: 36rpx;
						margin-bottom: 10rpx;

						span {
							font-size: 30rpx;
							color: #cfcdd0;
							margin-right: 10rpx;
							font-weight: initial;
						}
					}

					.wenan_text_2 {
						font-size: 28rpx;
						display: flex;
						align-items: center;

						image {
							width: 60rpx;
							height: 60rpx;
						}

						view {
							color: #ffffff;
							font-size: 64rpx;
							font-weight: bold;

							span {
								font-size: 32rpx;
								color: #ffffff9e;
								font-weight: initial;
								padding-left: 20rpx;
							}
						}
					}
				}
			}

			.reg_btn {
				position: relative;
				width: 100%;
				margin: 0 auto;
				bottom: 6rpx;
				cursor: pointer;

				span {
					width: 100%;
					color: #ffffff;
					display: inline-block;
					background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
					box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
					border-radius: 10px;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					position: relative;
					z-index: 2;
					font-weight: bold;

					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			}

			.reg_btn:after {
				width: 100%;
				border-radius: 10px;
				height: 80rpx;
				background-color: #61001d;
				bottom: -3px;
				content: "";
				display: block;
				left: 0;
				margin: 0 auto;
				pointer-events: none;
				position: absolute;
				right: 0;
				z-index: 1;
			}
		}
	}
</style>