<template>
	<view :style="theme">
		<u-popup v-model="NoviceTaskshow" width="650" mode="center" close-icon-size="30" border-radius="24" :mask-close-able="true" :closeable="true">
			<view class="reg_title" @click="NoviceTaskshow = false">
				<view>{{$t('ADDnew3.Tips')}}</view>
			</view>
			<view class="task_wrap_box">
				<view class="tiTitle">{{$t('ADDnew3.Complete the operation')}}</view>
				
				
				
				
				
				<view class="Novice_wrap">
					
					<!-- <view class="line1"></view> -->
					
					
					<view v-if="managerFlag0 == 1">
						<view class="Novice_wrap_item">
							<image class="Novice_item_icon" src="/static/image/yzshoupop_1.webp" mode="widthFix"></image>
							<view class="Novice_wrap_item_title">
								<view>{{$t('ADDnew3.Verify mobile phone')}}</view>
								<!-- <view>Bonus:<span>RMB 5.00</span></view> -->
							</view>
							<view class="Novice_Btn" @click="KaishiVf()" v-if="!userInfo.verifyPhone">
								<view class="NovBtn2"><span>{{$t('ADDnew3.Start')}}</span></view>
							</view>
							<view class="Novice_Btn" v-else>
								<view class="NovBtn3"><span>{{$t('DetailsPage.Status3')}}</span></view>
							</view>
						</view>
						<!-- <view class="line1"></view> -->
					</view>
					
					
					<view v-if="managerFlag1 == 1">
						<view class="Novice_wrap_item">
							<image class="Novice_item_icon" src="/static/image/yanz_yx.png" mode="widthFix"></image>
							<view class="Novice_wrap_item_title">
								<view>{{$t('ADDnew3.Verify email')}}</view>
								<!-- <view>Bonus:<span>RMB 5.00</span></view> -->
							</view>
							<view class="Novice_Btn" @click="KaishiVf()" v-if="!userInfo.verifyEmail">
								<view class="NovBtn2"><span>{{$t('ADDnew3.Start')}}</span></view>
							</view>
							<view class="Novice_Btn" v-else>
								<view class="NovBtn3"><span>{{$t('DetailsPage.Status3')}}</span></view>
							</view>
						</view>
						<!-- <view class="line1"></view> -->
					</view>
					
					
					
					
					<view v-if="managerFlag2 == 1">
						<view class="Novice_wrap_item">
							<image class="Novice_item_icon" src="/static/image/gerenxinxi_icon.png" mode="widthFix"></image>
							<view class="Novice_wrap_item_title">
								<view>{{$t('ADDnew3.Complete information')}}</view>
								<!-- <view>Bonus:<span>RMB 5.00</span></view> -->
							</view>
							<view class="Novice_Btn" @click="KaishiVf()" v-if="!userInfo.realName">
								<view class="NovBtn2"><span>{{$t('ADDnew3.Start')}}</span></view>
							</view>
							<view class="Novice_Btn" v-else>
								<view class="NovBtn3"><span>{{$t('DetailsPage.Status3')}}</span></view>
							</view>
						</view>
						<!-- <view class="line1"></view> -->
					</view>
					
					
					
					
					
					
					
					
					<view class="Novice_wrap_item" v-if="managerFlag3 == 1">
						<image class="Novice_item_icon" src="/static/image/tx_yhka.png" mode="widthFix"></image>
						<view class="Novice_wrap_item_title">
							<view>{{$t('ADDnew3.Bind account')}}</view>
							<!-- <view>Bonus:<span>RMB 5.00</span></view> -->
						</view>
						<view class="Novice_Btn" @click="ToBingding()" v-if="myAccountLists.length <= 0">
							<view class="NovBtn2"><span>{{$t('ADDnew3.Start')}}</span></view>
						</view>
						<view class="Novice_Btn" v-else>
							<view class="NovBtn3"><span>{{$t('DetailsPage.Status3')}}</span></view>
						</view>
					</view>
					
				</view>
				
				
				
				
				
				<view class="look_all_btn" @click="NoviceTaskshow = false">
					<view class="NovBtn2"><span>{{$t('NewlyAdded.Cancel')}}</span></view>
				</view>
			</view>
		</u-popup>
		
		<!--PC个人信息弹窗-->
		<pc-Myinfo ref="openPCmyinfo"></pc-Myinfo>
		
	</view>
</template>

<script>
	export default {
		name: "Verify-phone-number",
		props: {
			
		},
		data() {
			return {
				isLogin: 0,
				NoviceTaskshow: false,
				userInfo: {},
				myAccountLists: [],
				managerFlag0: 1,
				managerFlag1: 1,
				managerFlag2: 1,
				managerFlag3: 1,
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
			init(val){
				let isToken = uni.getStorageSync("token")
				if (!isToken) {
					this.isLogin = 0
				} else {
					this.isLogin = 1;
					this.GetUserInfo();
					this.GetMyZhangHu();
					this.ChaXunGouxuan(val);
				}
			},
			openPopup(data) {
				this.init(data)
				this.NoviceTaskshow = true
			},
			closewindows() {
				this.NoviceTaskshow = false
			},
			GetUserInfo(){
				let info = uni.getStorageSync("userinfo");
				this.userInfo = info
				console.log('个人信息',this.userInfo)
			},
			GetMyZhangHu(){
				let that = this
				that.$u.post('/withdraw/bind/query', {}).then(res => {
					that.myAccountLists = res.data
				})
			},
			KaishiVf(){
				let windowWidth = uni.getSystemInfoSync().windowWidth
				if(windowWidth >= "800"){
					this.NoviceTaskshow = false
					this.$refs.openPCmyinfo.openPopup()
				} else {
					this.NoviceTaskshow = false
					uni.navigateTo({
						url: '/pages/ProfileInfo/ProfileInfo'
					})
				}
			},
			ToBingding(){
				this.NoviceTaskshow = false
				uni.navigateTo({
					url: '/pages/ManageAccount/ManageAccount'
				})
			},
			ChaXunGouxuan(val){
				
				let that = this
				that.$u.post('/withdraw/deposit/ctrl', {}).then(res => {
					
				
					let num = null;
					if(val == 1){
						//通过传0123判断充值验证是否开启了勾选
						num = res.data.depositConfig;
					} else {
						num = res.data.withdrawConfig;
					}
					
					let bitPosition0 = 0;	//0手机，1邮箱，2实名，3提现账户
					let bitPosition1 = 1;	//0手机，1邮箱，2实名，3提现账户
					let bitPosition2 = 2;	//0手机，1邮箱，2实名，3提现账户
					let bitPosition3 = 3;	//0手机，1邮箱，2实名，3提现账户
					
					let fag0 = that.checkBit(num, bitPosition0) ? '1' : '0'; //结果是1勾选 0未勾选
					let fag1 = that.checkBit(num, bitPosition1) ? '1' : '0'; //结果是1勾选 0未勾选
					let fag2 = that.checkBit(num, bitPosition2) ? '1' : '0'; //结果是1勾选 0未勾选
					let fag3 = that.checkBit(num, bitPosition3) ? '1' : '0'; //结果是1勾选 0未勾选
					that.managerFlag0 = fag0;
					that.managerFlag1 = fag1;
					that.managerFlag2 = fag2;
					that.managerFlag3 = fag3;
					
					// console.log(`是否勾选了手机 ${that.managerFlag0}`);
					// console.log(`是否勾选了邮箱 ${that.managerFlag1}`);
					// console.log(`是否勾选了实名 ${that.managerFlag2}`);
					// console.log(`是否勾选了提现账户 ${that.managerFlag3}`);
					
				});
				
			},
			checkBit(num, bitPosition) {
			    const mask = 1 << bitPosition;
			    return (num & mask) !== 0;
			},
			
			
			
			
			
			
			

		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-mode-center-box {
		background-color: $all-secondary-color !important;
		max-height: 1200rpx;
	}
	
	.task_wrap_box {
		position: relative;
		.tiTitle {
			font-weight: bold;
			color: $all-secondary-text-color;
			padding: 50rpx 50rpx 15rpx 50rpx;
		}
	}
	
	.line1 {
		width: 100%;
		margin: 15px auto;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) -3%, rgba(255, 255, 255, 0.15) 48.66%, rgba(255, 255, 255, 0.02) 103.12%);
		height: 1px;
	}

	.Novice_wrap {
		background-color: $all-secondary-color;
		padding: 0 50rpx 20rpx 50rpx;

		.Novice_wrap_item {
			margin-bottom: 35rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			//background-color: #222a38;
			border-radius: 15rpx;
			padding: 30rpx 30rpx;
			
			background-color: $novice-popup-itembg;
			border: 1px solid $novice-popup-itemborder;

			//box-shadow: 0 1px 1px 0px #000000;
			.Novice_item_icon {
				width: 60rpx;
				height: 60rpx;
			}

			.Novice_wrap_item_title {
				padding-left: 26rpx;
				flex: 1;

				view:nth-child(1) {
					font-weight: bold;
					color: $all-secondary-text-color;
					font-size: 28rpx;
					//margin-bottom: 8rpx;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				view:nth-child(2) {
					//font-weight: bold;
					color: #7b98bf;
					font-size: 24rpx;

					span {
						color: #07b163;
						margin-left: 10rpx;
					}
				}
			}

			.Novice_Btn {
				margin-left: auto;
				cursor: pointer;
				.NovBtn1 {
					position: relative;

					span {
						font-weight: bold;
						width: 100rpx;
						color: #ffffff;
						display: inline-block;
						background-color: #db0a49;
						background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
						box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
						border-radius: 8px;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
				}

				.NovBtn1:after {
					padding: 0 24rpx;
					border-radius: 8px;
					height: 60rpx;
					background-color: #61001d;
					bottom: -3px;
					content: "";
					display: block;
					left: 0;
					right: 0;
					margin: 0 auto;
					pointer-events: none;
					position: absolute;
					right: 0;
					z-index: 1;
				}

				.NovBtn2 {
					position: relative;
					margin-left: 20rpx;

					span {
						font-weight: bold;
						width: 100rpx;
						color: #ffffff;
						display: inline-block;
						background-color: #2c62f4;
						background: linear-gradient(1turn, #2c62f4 .8%, #1398f9);
						box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
						border-radius: 8px;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
				}

				.NovBtn2:after {
					padding: 0 24rpx;
					border-radius: 8px;
					height: 60rpx;
					background-color: #003293;
					bottom: -3px;
					content: "";
					display: block;
					left: 0;
					right: 0;
					margin: 0 auto;
					pointer-events: none;
					position: absolute;
					right: 0;
					z-index: 1;
				}

				.NovBtn3 {
					position: relative;
					margin-left: 20rpx;

					span {
						font-weight: bold;
						width: 100rpx;
						color: $anniu-type1-text-colo;
						display: inline-block;
						background-color: $anniu-type1-bg;
						border: 1px solid $anniu-type1-bg-border;
						border-radius: 8px;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
					}
				}
			}
		}
	}

	.look_all_btn {
		width: 100%;
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 20rpx 0 30rpx 0;
		background-color: $all-secondary-color;
		box-shadow: -10px 0 15px 0 rgba(0, 0, 0, 0.15);
		z-index: 99;
		font-size: 28rpx;
		.NovBtn2 {
			cursor: pointer;
			position: relative;
			width: 92%;
			margin: 0 auto;

			span {
				font-weight: bold;
				width: 100%;
				color: #ffffff;
				display: inline-block;
				background-color: #db0a49;
				background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
				box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
				border-radius: 8px;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				position: relative;
				z-index: 2;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
		}

		.NovBtn2:after {
			border-radius: 8px;
			height: 90rpx;
			background-color: #61001d;
			bottom: -3px;
			content: "";
			display: block;
			left: 0;
			right: 0;
			margin: 0 auto;
			pointer-events: none;
			position: absolute;
			right: 0;
			z-index: 1;
		}
	}

	@media (min-width: 800px) {
		
	}
</style>