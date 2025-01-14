<template>
	<view :style="theme">
		
		<u-verification-code :start-text="$t('NewlyAdded.Send')" change-text="Xs" end-tex="retrieve" :seconds="seconds" :keep-running="true" ref="uCode" @change="codeChange"></u-verification-code>

		<u-popup v-model="EmailShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="EmailShow = false">
				<view>{{$t('emailPopup.title')}}</view>
			</view>
			<view class="input_box">
				
				<view class="info_box" v-if="!is_success">
					<image src="/static/image/email_icon.png"></image>
					<view>{{$t('emailPopup.emailverification')}}</view>
					<view>{{$t('emailPopup.HaSent')}}</view>
				</view>
				
				<view class="info_box" v-if="is_success">
					<image class="issucIcon" src="/static/image/yimaio_sus.webp" mode=""></image>
					<view>{{$t('RenZhengSuc')}}</view>
					<view>{{$t('RenZhengSucSub')}}</view>
				</view>
				
				<view class="input_item" v-if="!is_success">
					<view class="input_item_title">{{$t('emailPopup.VCode')}} *</view>
					<view class="input_item_true" :class="input_border2 == 1?'input_border':''">
						<u-input v-model="EmailCode" @input="inputIN" @blur="inputBlur2" @focus="inputfocus2" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
						<view class="huoquyzm" @tap="getCode">{{tips}}</view>
					</view>
				</view>
				
				
				<view class="Register_btn" v-if="!is_success">
					<u-button type="primary" :disabled="Btndisabled" :loading="Btnloading" @click="verifyBtn()">{{$t('emailPopup.verifyBtn')}}</u-button>
				</view>
				<view class="Register_btn" v-else>
					<u-button type="primary" :disabled="false" @click="successBtn()">{{$t('ResetPopup.popupbtn')}}</u-button>
				</view>
				
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "EmailPopup",
		props: {
			num: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				input_border2: 0,
				EmailCode: '',
				EmailShow: false,
				placeholderStyle: "fontSize: 24rpx;",
				customStyle: {},
				tips: '',
				// refCode: null,
				seconds: 60,
				Btndisabled: true,
				Btnloading: false,
				is_success: false,
				
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
				this.EmailShow = true
			},
			closewindows() {
				this.EmailShow = false
			},
			inputfocus2() {
				this.input_border2 = 1
			},
			inputIN(e){
				if(!e){
					this.Btndisabled = true
				} else {
					this.Btndisabled = false
				}
			},
			inputBlur2(e) {
				//let isEmail = this.$u.test.email(e)
				//if(!isEmail){
				//	this.$u.toast('Please enter the correct emai');
				//	this.$nextTick(()=>{
				//		this.Email = ''
				//	})
				//} else {
					
				//}
				this.input_border2 = 0
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode(){
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: this.$t('NewlyAdded.Verificationcode1')
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast(this.$t('NewlyAdded.Verificationcode2'));
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
						this.getEmailCode()
					}, 2000);
				} else {
					this.$u.toast(this.$t('NewlyAdded.Verificationcode3'));
				}
			},
			getEmailCode() {
				let that = this
				that.$u.post('/send/email/code', {
					email: that.num,
					pid: this.PID
				}).then(res => {
					
				}).catch(err => {
			
				})
			},
			verifyBtn(){
				let that = this
				
				let serialNo = uni.getStorageSync('thisUuid');
				let machineName = uni.getStorageSync('machineName');
				let ua = uni.getStorageSync('thisUa');
				
				if(that.EmailCode == ''){
					
				} else {
					that.Btnloading = true
					setTimeout(()=>{
						that.$u.post('/verify/email', {
							code: that.EmailCode,
							pid: this.PID,
							deviceId: serialNo,
							deviceType: machineName || ua
						}).then(res => {
							that.Btnloading = false
							that.is_success = true
						}).catch(err => {
							that.Btnloading = false	
						})
					},1500)
				}
			},
			successBtn(){
				let that = this
				that.EmailShow = false
				that.$emit('Shuaxin',1);
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
		//height: 286px;
		.info_box {
			text-align: center;
			margin: 20rpx 0 60rpx 0;
			.issucIcon {
				width: 200rpx !important;
				height: 200rpx !important;
			}
			image {
				width: 200rpx;
				height: 200rpx;
			}
			view:nth-child(2){
				font-size: 30rpx;
				color: $all-secondary-text-color;
				margin: 20rpx 0 15rpx;
				//font-weight: bold;
			}
			view:nth-child(3){
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
				padding: 0 16rpx;
				height: 50px; 
				
				display: flex;
				align-items: center;
				.huoquyzm {
					color: #187AE7;
					font-size: 24rpx;
				}
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
			margin: 30rpx auto 6rpx;
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