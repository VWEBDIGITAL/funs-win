<template>
	<view :style="theme">

		<u-popup v-model="AllLevelShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="AllLevelShow = false">
				<view>{{$t('MonthlyBonusPopup.title')}}</view>
			</view>
			<view class="input_box">
				
				<view class="popTitle">{{$t('MonthlyBonusPopup.prompt')}}</view>
				<view class="line"></view>
				<view class="poptitle2">
					<view>{{$t('MonthlyBonusPopup.Calculationcycle')}}:</view>
					<view>{{$t('MonthlyBonusPopup.Calculation')}}</view>
				</view>
				<view class="line"></view>
				<view class="poptitle2">
					<view>{{$t('MonthlyBonusPopup.Claimtime')}}</view>
					<view>
						<u-count-down :timestamp="Datas.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down>
					</view>
				</view>
				<view class="fubiaoti_box">
					<view><u-icon name="info-circle-fill" size="34" color="#4b9e5f"></u-icon></view>
					<view>{{$t('MonthlyBonusPopup.TIP')}}</view>
				</view>
				
				
				<view class="jindutiao_wrap">
					<view class="jdt_box1">
						<view>{{$t('MonthlyBonusPopup.TIPS')}}:</view>
						<view>{{(Datas.nowPay/100).toFixed(2)}}/{{(Datas.needPay/100).toFixed(2)}}</view>
					</view>
					<view class="jdt_box2">
						<u-line-progress active-color="#11bb40" inactive-color="#242a37" :percent="BonusProgress(Datas)" height="16">
							<view slot="default"></view>
						</u-line-progress>
					</view>
				</view>
				<view class="line"></view>
				
				
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "MonthlyBonus-Popup",
		props: {

		},
		data() {
			return {
				AllLevelShow: false,
				Datas: {}
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
		filters: {
			
		},
		methods: {
			openPopup(data) {
				//console.log('data',data)
				this.Datas = data
				this.AllLevelShow = true
			},
			closewindows() {
				this.AllLevelShow = false
			},
			BonusProgress(data){
				let needPay = data.needPay/100
				let nowPay = data.nowPay/100
				
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
	
	.jindutiao_wrap {
		margin-top: 30rpx;
		.jdt_box1 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			view:nth-child(1){
				color: #596780;
			}
			view:nth-child(2){
				color: $all-secondary-text-color;
			}
		}
		.jdt_box2 {
			
		}
	}
	
	.line {
	    background: linear-gradient(90deg, #ffffff00 -3%, #ffffff17 48.66%, #ffffff00 103.12%);
	    height: 1px;
	    margin: 15px 0;
	    width: 100%;
	}
	
	.liebiao_box {
		position: relative;
		width: 100%;
	}
	
	.input_box {
		width: 100%;
		position: relative;
		
		padding: 30rpx 30rpx 0 30rpx;
		.popTitle {
			color: #596780;
			font-size: 28rpx;
		}
		.poptitle2 {
			margin-bottom: 30rpx;
			view:nth-child(1){
				color: #596780;
			}
			view:nth-child(2){
				color: $all-secondary-text-color;
			}
		}
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
				top: 1rpx;
			}
			view:nth-child(2) {
				flex: 1;
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
	
	.tab_list_wrap {
		padding: 0 18rpx;
		width: 100%;
		margin: 30rpx auto 0;
		background-color: $all-secondary-color;
		border-radius: 20rpx;
		.tab_list_title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 74.31rpx;
			line-height: 74.31rpx;
			border-radius: 0;
			
			view {
				height: 37px;
				line-height: 37px;
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
				color: #98abcf;
				text-align: center;
			}

			view:nth-child(2) {
				flex: 1;
				font-size: 24rpx;
				color: #98abcf;
				text-align: center;
			}

			view:nth-child(3) {
				flex: 1;
				font-size: 24rpx;
				color: #98abcf;
				text-align: center;
			}
		}

		.tabl_list_box {
			
			.tabl_list_box_item {
				
				.mylevel {
					//background-image: linear-gradient(to left, rgba(0, 0, 0, 0), #346ed0);
					background-color: #2283f6 !important;
					border-radius: 16rpx;
					color: #ffffff !important;
				}
				.tabl_list_box_item_box {
					border-radius: 16rpx;
					margin: 0 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 74.31rpx;
					line-height: 74.31rpx;
					color: #55657e;
					.level_box {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					
					view:nth-child(2) {
						flex: 1;
						font-size: 28rpx;
						text-align: center;
						color: $all-secondary-text-color;
					}
					
					view:nth-child(3) {
						flex: 1;
						font-size: 28rpx;
						text-align: center;
						color: $all-secondary-text-color;
					}
				}
				

				
			}

			.tabl_list_box_item:nth-of-type(2n) {
				//background-color: #12171c;
			}

			.tabl_list_box_item {
				//background-color: #1e2b37;
			}
		}

	}
	
</style>