<template>
	<view :style="theme">

		<u-popup v-model="SignoutShow" width="650" height="auto" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="SignoutShow = false">
				<view>{{$t('LockFundsPop-ups.title')}}</view>
			</view>
			<view class="input_box">
				<view class="Agreement">
					<view>{{$t('LockFundsPop-ups.prompt')}}</view>
				</view>
				<view class="Agreement">
					<view>{{$t('LockFundsPop-ups.prompt1')}}</view>
				</view>
				
				<view class="title_box" v-for="(item,index) in dataList" :key="index">
					<view class="wrap_ifo">
						<view class="title_box_mx">
							
							<block v-if="item.type == 4">
								<view class="box_mx_title"><span></span>{{$t('LockFundsPop-ups.Depositin')}} {{item.date}}</view>
								<view class="php-num">
									<image class="" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
									<image class="" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
									<image class="" src="/static/image/jinbi-3.png" v-else></image>
									<view>{{(item.amount/100).toFixed(2)}}</view>
								</view>
								<view class="line"></view>
							</block>
							
							<block v-if="item.type != 4">
								<view class="box_mx_title"><span></span>{{$t('Betting requirements.register5')}} {{item.date}}</view>
								<view class="php-num">
									<image class="" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
									<image class="" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
									<image class="" src="/static/image/jinbi-3.png" v-else></image>
									<view>{{(item.amount/100).toFixed(2)}}</view>
								</view>
								<view class="line"></view>
							</block>
							
							<view class="Total_Wager_box">
								<view class="Total_Wager">{{$t('LockFundsPop-ups.TotalWager')}}</view>
								<view class="Total_Wager_jdt_title">
									<view>{{(item.finished/100).toFixed(2)}} / {{(item.total/100).toFixed(2)}}</view>
									<view>{{BonusProgress(item) || 0}}%</view>
								</view>
								<view class="Total_Wager_jdt_box">
									<u-line-progress :percent="BonusProgress(item)" :show-percent="false" :round="true" active-color="#52ae59" inactive-color="#242a37" height="16"></u-line-progress>
								</view>
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
		name: "LockFunds-Popup",
		props: {
			
		},
		data() {
			return {
				platform: this.PID,
				SignoutShow: false,
				dataList: []
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
			init(){
				let that = this
				that.$u.post('/query/bet/codes', {
					
				}).then(res => {
					console.log('锁定金额',res.data)
					that.dataList = res.data
				}).catch(err => {
				
				})
			},
			openPopup() {
				this.SignoutShow = true
				this.init()
			},
			closewindows() {
				this.SignoutShow = false
			},
			BonusProgress(data){
				let needPay = data.total/100
				let nowPay = data.finished/100
				
				let all_count = needPay - nowPay
				if (needPay == nowPay) {
					return 100
				} else {
					return parseInt(((needPay - all_count) / needPay) * 100)
				}
			},
		}
	}
</script>

<style lang="scss">
	.line {
	    background: linear-gradient(90deg, #ffffff00 -3%, #ffffff17 48.66%, #ffffff00 103.12%);
	    height: 1px;
	    margin: 10px 0;
	    width: 100%;
	}

	.input_box {
		
		padding: 20rpx 30rpx 0 30rpx;

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
		
		.title_box {
			margin: 30rpx 0;
			.wrap_ifo {
				background-color: $select-drop-down-color;
				border: 1px solid $select-drop-down-border-color;
				padding: 30rpx;
				border-radius: 20rpx;
				.title_box_mx {
					
					.box_mx_title {
						color: #8197bc;
						display: flex;
						align-items: center;
						span {
							margin-right: 10rpx;
							display: inline-block;
							background-color: #3673D9;
							width: 8rpx;
							height: 28rpx;
							border-radius: 200rpx;
						}
					}
					.php-num {
						display: flex;
						align-items: center;
						margin: 20rpx 0 0 0;
						image {
							width: 30rpx;
							height: 30rpx;
							margin-right: 10rpx;
						}
						view {
							font-size: 32rpx;
							color: $all-secondary-text-color;
							font-weight: bold;
							span {
								color: #8197bc;
								margin-left: 10rpx;
							}
						}
					}
					.Total_Wager_box {
						margin: 30rpx 0 0 0;
						.Total_Wager {
							color: #8197bc;
							margin-bottom: 10rpx;
						}
						.Total_Wager_jdt_title {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-bottom: 10rpx;
							view:nth-child(1){
								color: $all-secondary-text-color;
							}
							view:nth-child(2){
									color: $all-secondary-text-color;
							}
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