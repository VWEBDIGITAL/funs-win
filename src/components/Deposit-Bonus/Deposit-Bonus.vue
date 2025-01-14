<template>
	<view :style="theme">

		<u-popup v-model="SignoutShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="SignoutShow = false">
				<view>{{$t('BonusPopup.title')}}</view>
			</view>
			<view class="input_box">
				<view class="Agreement">
					<view>{{$t('BonusPopup.prompt',{rate:data.rate})}}</view>
				</view>
				
				<view class="title_box">
					<view class="title_box_item">
						<image src="/static/image/check_reward_medal.png"></image>
						<view>{{$t('BonusPopup.title1')}}</view>
					</view>
					<view class="wrap_ifo">
						<view class="title_box_mx" style="margin: 10rpx 0;">
							<view>{{$t('BonusPopup.MinimumDeposit')}}</view>
							<span>{{(data.minAmount/100).toFixed(2)}}</span>
						</view>
						<view class="title_box_mx">
							<view>{{$t('BonusPopup.MaximumBonus')}}</view>
							<span>{{(data.bonusMax/100).toFixed(2)}}</span>
						</view>
					</view>
				</view>
				
				<view class="title_box">
					<view class="title_box_item">
						<image src="/static/image/spades_icon-icons.png"></image>
						<view>{{$t('BonusPopup.title2')}}</view>
					</view>
					<view class="wrap_ifo">
						<view class="title_box_mx" style="margin: 10rpx 0;">
							<view>{{$t('BonusPopup.GameType')}}</view>
							<span>{{$t('BonusPopup.AllGame')}}</span>
						</view>
						<view class="title_box_mx">
							<view>{{$t('BonusPopup.Wager')}}</view>
							<span>×{{data.multiples}}</span>
						</view>
					</view>
				</view>
				
				<view class="Attention_box">
					<view class="Attention_box_title">{{$t('BonusPopup.attention')}}!</view>
				</view>
				<view class="Attention_box_info">
					{{$t('BonusPopup.prompt2',{expireDays: data.expireDays})}}
				</view>
				
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "Deposit-Bonus",
		props: {
			data: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				SignoutShow: false,
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
			openPopup() {
				this.SignoutShow = true
			},
			closewindows() {
				this.SignoutShow = false
			},
		}
	}
</script>

<style lang="scss">
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
			margin-top: 10rpx;
			font-size: 28rpx;
			color: $font-all-color;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		.Attention_box {
			.Attention_box_title {
				color: #f04b1e;
				text-align: center;
				//font-weight: bold;
			}
		}
		.Attention_box_info {
			background-color: $all-secondary-color;
			padding: 10px;
			border-radius: 10rpx;
			color: $font-all-color;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
		
		.title_box {
			margin: 30rpx 0;
			.wrap_ifo {
				background-color: $all-secondary-color;
				padding: 20rpx;
				border-radius: 10rpx;
				.title_box_mx {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: $font-all-color;
					font-size: 24rpx;
					span {
						color: $all-secondary-text-color;
						//font-weight: bold;
					}
				}
			}
			.title_box_item {
				margin-bottom: 10rpx;
				display: flex;
				align-items: center;
				color: $all-secondary-text-color;
				//font-weight: bold;
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