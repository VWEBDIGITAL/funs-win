<template>
	<view :style="theme">

		<u-popup v-model="EmailShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="EmailShow = false">
				<view>{{$t('loginPasswordPopup.title')}}</view>
			</view>
			<view class="input_box">
				<view class="info_box">
					<image src="/static/image/password_3715.png"></image>
					<view>{{$t('loginPasswordPopup.changeLoginPassword')}}</view>
					<view>{{$t('loginPasswordPopup.prompt')}}</view>
				</view>
				<view class="input_item">
					<view class="input_item_title">{{$t('loginPasswordPopup.OldPassword')}} *</view>
					<view class="input_item_true" :class="input_border1 == 1?'input_border':''">
						<u-input v-model="LoginPassword" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="password" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
					</view>
				</view>
				<view class="input_item">
					<view class="input_item_title">{{$t('loginPasswordPopup.Newpassword')}} *</view>
					<view class="input_item_true" :class="input_border2 == 1?'input_border':''">
						<u-input v-model="NewPassword" @blur="inputBlur2" @focus="inputfocus2" type="password" :border="false" :custom-style="customStyle"
							:placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
					</view>
				</view>
				<view class="Register_btn">
					<u-button type="primary" @click="chongzhi()" :disabled="isDisabledTwo" :loading="loadingBtn">{{$t('loginPasswordPopup.popupbtn')}}</u-button>
				</view>
			</view>
		</u-popup>
		
		<ChangepasswordDetermine ref="passChang"></ChangepasswordDetermine>		
		
	</view>
</template>
<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		name: "LoginPasswordPoppup",
		props: {

		},
		data() {
			return {
				isDisabledTwo: true,
				
				input_border1: 0,
				input_border2: 0,
				loadingBtn: false,
				LoginPassword: '',
				NewPassword: '',
				EmailShow: false,
				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},
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
			input1(e){
				if(!e){
					this.isDisabledTwo = true
				}else {
					this.isDisabledTwo = false
				}
			},
			inputBlur1(){
				this.input_border1 = 0
			},
			inputfocus1(){
				this.input_border1 = 1
			},
			inputBlur2(){
				this.input_border2 = 0
			},
			inputfocus2(){
				this.input_border2 = 1
			},
			openPopup() {
				this.EmailShow = true
			},
			closewindows() {
				this.EmailShow = false
			},
			chongzhi() {
				let that = this
				
				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')
				
				if(that.LoginPassword == ''){
					this.$u.toast(this.$t('ToastPrompt.Toast12'));
				} else if(that.NewPassword == ''){
					this.$u.toast(this.$t('ToastPrompt.Toast13'));
				} else {
					that.loadingBtn = true
					setTimeout(() => {
						let lowpass = md5Libs.md5(that.LoginPassword)
						let newpass = md5Libs.md5(that.NewPassword)
						that.$u.post('/reset-pwd', {
							password: lowpass, // String 是 原密码
							newPassword: newpass, // String 是 新密码
							deviceId: serialNo,
							deviceType: machineName || ua
						}).then(ress => {
							that.EmailShow = false
							that.$refs.passChang.openPopup();
							
							//uni.removeStorageSync('userinfo');
							//uni.removeStorageSync('token');
							//uni.removeStorageSync('loginUsername');
							//uni.removeStorageSync('loginPassword');
					
							//退出后刷新一下navbar组件的获取token方法
							//uni.$emit("getinspectToken", 1)
					
							//uni.reLaunch({
							//	url: '/pages/index/index'
							//})
					
							that.loadingBtn = false
							
						}).catch(err => {
							that.loadingBtn = false
						})
					}, 1500)
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

	.input_box {
		
		padding: 30rpx;

		.info_box {
			text-align: center;
			margin: 20rpx 0 60rpx 0;

			image {
				width: 77.78rpx;
				height: 91.44rpx;
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
				padding: 6px 12px;
			}
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