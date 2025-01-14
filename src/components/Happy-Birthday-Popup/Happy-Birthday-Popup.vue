<template>
	<view :style="theme">

		<u-popup z-index="999999999" :mask="false" v-model="BirthdayShow" width="100%" mode="right" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="false" @open="Hybopen">
			
			<view class="input_box_wrap">
				<view class="input_box">
					<view class="close_icon" @click="closewindows()"><u-icon name="close" color="#ffffff"></u-icon></view>
					<view class="popTitle">
						<image src="/static/NoviceTask/NewUserBonus.png" mode="widthFix"></image>
						<view class="popTitle_sub">
							<view>{{$t('ADDnew.BirthHappy')}}</view>
							<view><span>{{$t('ADDnew.BirthB',{BirthB:(Datas.reward/100).toFixed(2)})}}</span></view>
							<!--  -->
						</view>
					</view>
					
				</view>
			</view>
			
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "Happy-Birthday-Popup",
		props: {

		},
		data() {
			return {
				BirthdayShow: false,
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
				this.BirthdayShow = true
				this.Datas = data
			},
			closewindows() {
				this.BirthdayShow = false
				/*setTimeout(()=>{
					uni.reLaunch({
						url: '/pages/index/index'
					})
				},300)*/
			},
			Hybopen(){
				//console.log('生日奖励打开弹窗')
				//setTimeout(()=>{
				//	this.BirthdayShow = false
				//},4000)
			}
			







		}
	}
</script>

<style lang="scss" scoped>
	
	/deep/ .u-drawer {
		height: 200px;
		margin: 0 auto;
	}
	
	/deep/ .u-mask {
		display: none;
	}
	
	/deep/ .u-drawer-right {
		background-color: transparent !important;
	}
	
	/deep/ .u-drawer-top {
		background-color: transparent !important;
	}
	
	/deep/ .u-close--top-right {
		right: 24px !important;
		top: 24px !important;
	}
	
	.popup_wrap{
		padding: 60rpx 30rpx 30rpx 30rpx;
		background: radial-gradient(117.84% 117.24% at 50% -20.4%, #282268 0, #282268 41.31%, #db0a4900), #fb2b5700;
		text-align: center;
		image {
			width: 180rpx;
			height: 180rpx;
		}
		.Birthday_title {
			font-weight: bold;
			color: #ffffff;
			font-size: 44rpx;
			margin-top: 44rpx;
		}
		.B_Level {
			color: #ffffff;
			margin-top: 20rpx;
		}
		.B_Rank {
			color: #edb92c;
			font-size: 66rpx;
			font-weight: bold;
			margin-top: 10rpx;
		}
	}
	
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
				color: #ffffff;
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
	
	.input_box_wrap {
		padding: 130rpx 30rpx 30rpx 30rpx;
	}
	
	.input_box {
		width: 100%;
		position: relative;
		background-color: #3573d8;
		padding: 40rpx 40rpx 30rpx 20rpx;
		border-radius: 20rpx;
		
		.close_icon {
			padding: 30rpx 25rpx 10rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			position: absolute;
			z-index: 999;
			top: -10rpx;
			right: -8rpx;
		
			.u-icon {
				font-size: 30rpx;
				color: #ffffff;
				background-color: rgba(0, 0, 0, 0.35);
				padding: 10rpx;
				border-radius: 10rpx;
			}
		}
		
		.popTitle {
			color: #ffffff;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-weight: bold;
			image {
				width: 90rpx;
				height: 90rpx;
				margin-right: 10rpx;
			}
			.popTitle_sub {
				flex: 1;
				color: #ffffff;
				view:nth-child(2){
					color: #ffffff;
					font-weight: initial;
					span {
						color: #ffffff;
					}
				}
			}
		}
		.poptitle2 {
			margin-bottom: 30rpx;
			view:nth-child(1){
				color: #596780;
			}
			view:nth-child(2){
				color: #ffffff;
			}
		}
		.fubiaoti_box {
			margin-bottom: 30rpx;
			display: flex;
			align-items: flex-start;
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			border-radius: 20rpx;
			padding: 24rpx;
			color: #596780;
			
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
			color: #ffffff;
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
						color: #ffffff;
					}
					
					view:nth-child(3) {
						flex: 1;
						font-size: 28rpx;
						text-align: center;
						color: #ffffff;
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