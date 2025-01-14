<template>
	<view :style="theme">

		<u-popup v-model="SignoutShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="SignoutShow = false">
				<view>{{$t('VaultPage.Details')}}</view>
			</view>
			<view class="input_box">
				
				<!--  -->
				<view class="free_info_item" v-if="Datas.extraCountdown && Datas.extraCountdown > 0">
					<view class="free_info_title">{{$t('DepositBonusPopup.DepPlus')}}</view>
					<view class="free_info_daojishi">
						<view class="free_djs_left">
							<view>{{$t('DepositBonusPopup.UPTO')}} <image src="/static/image/huo.png"></image> <span>{{MaxRates}}%</span></view>
						</view>
						<view class="free_djs_right">
							<u-count-down :timestamp="Datas.extraCountdown" :show-days="false" :show-border="false" font-size="28" color="#ffffff" border-color="#025de9" bg-color="#025de9" separator-color="#ffffff"></u-count-down>
						</view>
					</view>
				</view>
				
				<view class="title_box" v-for="(item,index) in Datas.cfg" :key="index">
					<view class="title_box_item">
						<view>{{$t('DepositBonusPopup.DepositTo')}} <span>{{(item.payAmount/100).toFixed(2)}}</span></view>
					</view>
					<view class="wrap_ifo">
						<view class="title_box_mx">
							<view>{{$t('DepositBonusPopup.DepositBonus')}} <span>{{item.rate || 0}}%</span><p v-if="Datas.extraCountdown && Datas.extraCountdown > 0">+{{item.extraRate}}%</p></view>
						</view>
					</view>
				</view>
				
				<view class="Request_box">
					<view class="Request_title">{{$t('DepositBonusPopup.WageringRequirements')}}</view>
					<view class="Request_conternt">
						<view>{{$t('DepositBonusPopup.GameType')}}<span>{{$t('BonusPopup.AllGame')}}</span></view>
						<view class="line"></view>
						<view>{{$t('DepositBonusPopup.TotlaWager')}}<span>x{{Datas.multiples}}</span></view>
					</view>
				</view>
				
				<view class="maxJiang">{{$t('DepositBonusPopup.MaxDepositBonus')}}<span>{{(Datas.maxBonus/100).toFixed(2)}}</span></view>
				
				<view class="fubiaoti_box">
					<view><u-icon name="info-circle-fill" size="34" color="#4b9e5f"></u-icon></view>
					<view>最高投注限额：使用奖金资金下注时，每次旋转或每轮游戏的单笔下注限额 5 USD。超过此金额的投注可能会导致奖金和相关奖金被没收。</view>
				</view>
				
				
			</view>
			
			<view class="guanbi" @click="SignoutShow = false"><span>{{$t('popupbtn')}}</span></view>
			
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "First-recharge-frequency",
		props: {
			
		},
		data() {
			return {
				SignoutShow: false,
				Datas: {
					cfg: [],
					countdown: 0,
					rewardRate: 150,
					status: 0
				},
				MaxRates: 0
			};
		},
		watch: {

		},
		computed: {

		},
		created() {

		},
		mounted() {

		},
		methods: {
			openPopup(data) {
				//console.log('data',data)
				this.Datas = data
				this.SignoutShow = true
				let MaxRate = data.rewardRate + data.extraRate
				this.MaxRates = MaxRate
			},
			closewindows() {
				this.SignoutShow = false
			},
		}
	}
</script>

<style lang="scss">
	
	.fubiaoti_box {
		display: flex;
		align-items: flex-start;
		background-color: $select-drop-down-color;
		border: 1px solid $select-drop-down-border-color;
		border-radius: 20rpx;
		padding: 24rpx;
		color: #9caacc;
		view:nth-child(1) {
			margin-right: 6rpx;
			position: relative;
			top: 2rpx;
		}
		view:nth-child(2) {
			flex: 1;
		}
	}
	
	.guanbi {
		background-color: $all-secondary-color;
		padding: 30rpx 0;
		text-align: center;
		span {
			display: inline-block;
			background-color: $tkcz-max-btn;
			text-align: center;
			border-radius: 20rpx;
			padding: 20rpx 0;
			width: 90%;
			color: #ffffff;
			font-weight: bold;
		}
	}
	.line {
	    background: linear-gradient(90deg, #ffffff00 -3%, #ffffff17 48.66%, #ffffff00 103.12%);
	    height: 1px;
	    margin: 10px 0;
	    width: 100%;
	}
	.to_SignIn {
		background-color: $all-secondary-color;
		text-align: center;
		height: 83rpx;
		line-height: 83rpx;
		color: #8197bc;
		font-size: 24rpx;
	}

	.input_box {
		padding: 10rpx 30rpx 10rpx 30rpx;
		
		.free_info_item {
			margin-top: 30rpx;
			margin-bottom: 10rpx;
			background-image: linear-gradient(to left, #007aff, #1f64da);
			padding: 15rpx 0;
			border-radius: 15rpx;
			.free_info_title {
				margin-bottom: 10rpx;
				font-weight: bold;
				text-align: center;
				color: #ffffff;
			}
			.free_info_daojishi {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				width: 100%;
				.free_djs_left {
					view {
						display: flex;
						align-items: center;
						justify-content: center;
						image {
							width: 40rpx;
							height: 40rpx;
							margin: 0 10rpx;
						}
						span {
							font-weight: bold;
							font-size: 34rpx;
						}
					}
				}
				.free_djs_right {
					margin-left: 14rpx;
				}
			}
		}

		.input_item {
			margin-bottom: 30rpx;

			.input_item_title {
				color: #8197bc;
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
			margin-top: 10rpx;
			font-size: 28rpx;
			color: #8197bc;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.maxJiang {
			margin-bottom: 20rpx;
			color: #8197bc;
			display: flex;
			align-items: center;
			justify-content: space-between;
			span {
				color: $all-secondary-text-color;
				font-weight: bold;
			}
		}
		.Request_box {
			margin-bottom: 30rpx;
			.Request_title{
				color: $all-secondary-text-color;
				margin-bottom: 20rpx;
			}
			.Request_conternt {
				background-color: $select-drop-down-color;
				border: 1px solid $select-drop-down-border-color;
				border-radius: 20rpx;
				padding: 30rpx 30rpx;
				view {
					color: #8197bc;
					display: flex;
					align-items: center;
					justify-content: space-between;
					span {
						color: $all-secondary-text-color;
					}
				}
			}
		}
		
		.Attention_box {
			.Attention_box_title {
				color: #f04b1e;
				text-align: center;
				//font-weight: bold;
			}
		}
		.Attention_box_info {
			text-align: center;
			background-color: $all-secondary-color;
			padding: 15px;
			border-radius: 20rpx;
			color: #8197bc;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
		
		.title_box {
			margin: 30rpx 0;
			.wrap_ifo {
				background-color: $select-drop-down-color;
				border: 1px solid $select-drop-down-border-color;
				padding: 30rpx;
				border-radius: 20rpx;
				.title_box_mx {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #8197bc;
					view {
						display: flex;
						align-items: center;
						span {
							padding-left: 10rpx;
							color: $all-secondary-text-color;
							font-weight: bold;
						}
						p {
							margin-left: 10rpx;
							color: #00ff43;
						}
					}
				}
			}
			.title_box_item {
				margin-bottom: 10rpx;
				display: flex;
				align-items: center;
				color: #8197bc;
				span {
					color: $all-secondary-text-color;
					padding-left: 10rpx;
					font-weight: bold;
				}
				image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 4rpx;
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