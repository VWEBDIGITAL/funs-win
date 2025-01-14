<template>
	<view :style="theme">

		<u-popup v-model="AllLevelShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="AllLevelShow = false">
				<view>{{$t('DailyCashBackPopup.title')}}</view>
			</view>
			<view class="input_box">
				
				<view class="popTitle">{{$t('DailyCashBackPopup.prompt')}}</view>
				<view class="line"></view>
				<view class="poptitle2">
					<view>{{$t('DailyCashBackPopup.Calculationcycle')}}</view>
					<view>{{$t('DailyCashBackPopup.Calculation1')}}</view>
				</view>
				<view class="line"></view>
				<view class="poptitle2">
					<view>{{$t('DailyCashBackPopup.Claimtime')}}</view>
					<view><u-count-down :timestamp="Datas.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
				</view>
				<view class="fubiaoti_box">
					<view><u-icon name="info-circle-fill" size="34" color="#4b9e5f"></u-icon></view>
					<view>{{$t('DailyCashBackPopup.TIP')}}</view>
				</view>
				
				
				<view class="tab_list_wrap">
					<view class="tab_list_title">
						<view>{{$t('DailyCashBackPopup.DailyLoss')}}</view>
						<view>{{$t('DailyCashBackPopup.CashBack')}}</view>
						<view>{{$t('DailyCashBackPopup.MaxBonus')}}</view>
					</view>
					<view class="tabl_list_box">
						
						<view class="tabl_list_box_item" v-for="(item,index) in Cfgs" :key="index">
							<view class="tabl_list_box_item_box" :class="[is_rate == item.rate?'mylevel':'']">
								<view class="level_box">{{(item.amount/100).toFixed(2)}}</view>
								<view>{{item.rate}}%</view>
								<view v-if="index<is_length">{{(Cfgs[index+1].amount/100 * Cfgs[index].rate/100 || 0).toFixed(2)}}</view>
								<view v-else>{{(maxBonus/100).toFixed(2)}}</view>
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
		name: "DailyCashback-Popup",
		props: {

		},
		data() {
			return {
				AllLevelShow: false,
				Cfgs: [],
				maxBonus: 0,
				Datas: {},
				is_rate: 0,
				is_length: 0
			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			this.Getkuisuan()
		},
		mounted() {
		
		},
		filters: {
			
		},
		methods: {
			openPopup(data) {
				this.Datas = data
				if(data.rate == 0){
					this.is_rate = data.rateList[0]
				} else {
					this.is_rate = data.rate
				}
				this.AllLevelShow = true
				
				
				
			},
			closewindows() {
				this.AllLevelShow = false
			},
			Getkuisuan(){
				//
				let that = this
				that.$u.post('/daily/cashback/cfg', {
					
				}).then(res => {
					//console.log('日亏损配置',res.data)
					that.Cfgs = res.data.cfg
					that.maxBonus = res.data.maxBonus
					
					//定义从倒数第二个开始算
					this.is_length = this.Cfgs.length-1
					////console.log('啥是啥',this.Cfgs.slice(-4))
					
				})
			},
			







		}
	}
</script>

<style lang="scss">
	
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
		padding: 30rpx 30rpx 30rpx 30rpx;
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
			align-items: center;
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