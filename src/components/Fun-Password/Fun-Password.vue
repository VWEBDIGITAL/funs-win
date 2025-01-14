<template>
	<view :style="theme">

		<u-popup v-model="EmailShow" width="650" mode="center" close-icon-size="30" border-radius="14"
			:mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="EmailShow = false">
				<view>{{$t('fundPasswordPopup.title')}}</view>
			</view>
			
			
			<view class="input_box" v-show="type == 1">
				<view class="info_box">
					<image src="/static/image/password_fund.png"></image>
					<view>{{$t('fundPasswordPopup.changeFundPassword')}}</view>
				</view>
				<view class="input_item">
					<view class="input_item_title">{{$t('fundPasswordPopup.title')}} *</view>
					<view class="input_item_true">
						<!-- <u-message-input @finish="finish1" @change="change1" :dot-fill="true" active-color="#3673d9" width="78" font-size="24" :maxlength="6"></u-message-input> -->
						<My-Password-Code ref="pwd" :maxlength="6" :isPwd="true" @finish="getPwd1"></My-Password-Code>
					</view>
				</view>
				<view class="input_item" style="margin-top: 50rpx;">
					<view class="input_item_title">{{$t('fundPasswordPopup.Confirmpassword')}} *</view>
					<view class="input_item_true">
						<!-- <u-message-input :breathe="breathe2" @change="change2" :dot-fill="true" :active-color="activeColor4" width="78" font-size="24" :maxlength="6"></u-message-input> -->
						<My-Password-Code ref="pwd" :maxlength="6" :isPwd="true" @finish="getPwd2"></My-Password-Code>
					</view>
				</view>
				<view class="Register_btn">
					<u-button type="primary" @click="Newbaocun()">{{$t('fundPasswordPopup.popupbtn')}}</u-button>
				</view>
			</view>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			<view class="input_box" v-show="type == 2">
				<view class="info_box">
					<image src="/static/image/password_fund.png"></image>
					<view>{{$t('fundPasswordPopup.changeFundPassword')}}</view>
				</view>
				<view class="input_item">
					<view class="input_item_title">{{$t('fundPasswordPopup.OldPassword')}} *</view>
					<view class="input_item_true">
						<!-- <u-message-input @finish="finish3" @change="change3" :dot-fill="true" active-color="#3673d9" width="78" font-size="24" :maxlength="6"></u-message-input> -->
						<My-Password-Code ref="pwd" :maxlength="6" :isPwd="true" @finish="getPwd3"></My-Password-Code>
					</view>
				</view>
				<view class="input_item marginTop">
					<view class="input_item_title">{{$t('fundPasswordPopup.Newpassword')}} *</view>
					<view class="input_item_true">
						<!-- <u-message-input @change="change4" :dot-fill="true" active-color="#3673d9" width="78" font-size="24" :maxlength="6"></u-message-input> -->
						<My-Password-Code ref="pwd" :maxlength="6" :isPwd="true" @finish="getPwd4"></My-Password-Code>
					</view>
				</view>
				<view class="Register_btn">
					<u-button type="primary" @click="Changbaocun()">{{$t('fundPasswordPopup.popupbtn')}}</u-button>
				</view>
			</view>
			
			
		</u-popup>

	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		name: "Fun-Password",
		props: {
			type: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				breathe4: false,
				activeColor4: '#606266',
				
				breathe2: false,
				activeColor2: '#606266',
				
				Email: '',
				EmailShow: false,
				placeholderStyle: "fontSize: 24rpx;",
				customStyle: {
					
				},
				funPassword1: '',
				funPassword2: '',
				
				funPassword3: '',
				funPassword4: '',
				
				focus4: false
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
			finish3(e){
				this.breathe4 = true
				this.focus4 = true
				this.activeColor4 = '#3673d9'
			},
			finish1(e){
				this.breathe2 = true
				this.activeColor2 = '#3673d9'
			},
			
			
			
			openPopup() {
				this.EmailShow = true
			},
			closewindows() {
				this.EmailShow = false
			},
			change1(e) {
				//////console.log(e)
				this.funPassword1 = md5Libs.md5(e)
				this.breathe2 = false
				this.activeColor2 = '#606266'
			},
			change2(e) {
				this.funPassword2 = md5Libs.md5(e)
			},
			//获取密码
			getPwd1(val) {
				//console.log(val);
				this.funPassword1 = md5Libs.md5(val)
			},
			getPwd2(val) {
				//console.log(val);
				this.funPassword2 = md5Libs.md5(val)
			},
			
			
			
			change3(e) {
				//////console.log(e)
				this.funPassword3 = md5Libs.md5(e)
				this.breathe4 = false
				this.focus4 = false
				this.activeColor4 = '#606266'
			},
			change4(e) {
				this.funPassword4 = md5Libs.md5(e)
			},
			
			getPwd3(val) {
				//console.log(val);
				this.funPassword3 = md5Libs.md5(val)
			},
			getPwd4(val) {
				//console.log(val);
				this.funPassword4 = md5Libs.md5(val)
			},
			
			
			
			
			Newbaocun() {
				
				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')
				
				if (this.funPassword1 == "") {

				} else if (this.funPassword2 == "") {

				} else if(this.funPassword1 != this.funPassword2) {
					this.$u.toast(this.$t('opoupToast.NotheSame'));
				} else {
					this.$u.post('/reset-ppwd', {
						password: '', 		// String 是 原密码(首次设置这个值传空串)
						newPassword: this.funPassword2, 	// String 是 新密码
						deviceId: serialNo,
						deviceType: machineName || ua
					}).then(res => {
						this.$u.toast(this.$t('ToastPrompt.Toast10'));
						this.EmailShow = false
						
						//更新缓存PayTrue
						let NewpayPwdSet = uni.getStorageSync('userinfo')
						NewpayPwdSet.payPwdSet = true
						uni.setStorageSync('userinfo', NewpayPwdSet)
						
						this.$emit('UpUserinfo',1)
						
						
					}).catch(err => {
					
					})
				}
			},
			Changbaocun(){
				
				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')
				
				if (this.funPassword3 == "") {
				
				} else if (this.funPassword4 == "") {
				
				}else {
					////console.log()
					this.$u.post('/reset-ppwd', {
					
						password: this.funPassword3, 		// String 是 原密码(首次设置这个值传空串)
						newPassword: this.funPassword4, 	// String 是 新密码
						
						deviceId: serialNo,
						deviceType: machineName || ua
					
					}).then(res => {
						this.$u.toast(this.$t('ToastPrompt.Toast11'));
						this.EmailShow = false
					
					}).catch(err => {
					
					})
				}
			}
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
	
	/deep/ .u-drawer-center {
		//bottom: 30%;
	}
	
	.marginTop {
		margin-top: 30rpx;
	}

	.input_box {
		padding: 20rpx 30rpx 30rpx 30rpx;

		.info_box {
			text-align: center;
			margin: 20rpx 0 30rpx 0;

			image {
				width: 94.44rpx;
				height: 110rpx;
			}

			view:nth-child(2) {
				font-size: 30rpx;
				color: $all-secondary-text-color;
				margin: 20rpx 0 15rpx;
				//font-weight: bold;
			}

			view:nth-child(3) {
				color: $font-all-color;
			}
		}

		.input_item {
			margin-bottom: 10rpx;

			.input_item_title {
				padding-left: 13rpx;
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-size: 28rpx;
			}

			.input_item_true {}
		}

		.Agreement {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: $font-all-color;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.Register_btn {
			width: 100%;
			margin: 30rpx auto 0;
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