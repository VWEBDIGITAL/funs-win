<template>
	<view :style="theme">

		<u-popup v-model="RegiserShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="RegiserShow = false">
				<view>{{$t('regiserPopup.title')}}</view>
			</view>
			
			
			<view class="input_box">
				<view class="input_item">
					<view class="input_item_title">{{$t('navBarTitle.Phone')}} *</view>
					<view class="input_item_true" :class="input_border1 == 1?'input_border':''">
						<view class="phone-code">+86</view>
						<u-input v-model="Username" autocomplete="new-password" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
					</view>
				</view>
				<view class="input_item">
					<view class="input_item_title">{{$t('regiserPopup.password')}} *</view>
					<view class="input_item_true" :class="input_border2 == 1?'input_border':''">
						<u-input v-model="Password" autocomplete="new-password" @blur="inputBlur2" @focus="inputfocus2" type="password"
							:border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle"
							placeholder="" :clearable="false" />
					</view>
				</view>
				<view class="input_item" style="margin: 0;">
					<view class="input_item_title">{{$t('regiserPopup.secondConfirmation')}} *</view>
					<view class="input_item_true" :class="input_border3 == 1?'input_border':''">
						<u-input v-model="confirmation" autocomplete="new-password" auto-complete="new-password" @blur="inputBlur3" @focus="inputfocus3" type="password"
							:border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle"
							placeholder="" :clearable="false" />
					</view>
				</view>
				<view class="Agreement">
					<u-checkbox-group @change="checkboxGroupChange" width="100%">
						<u-checkbox size="26" @change="checkboxChange" v-model="RememberMe" name="me">
							<text class="checkbox">
								{{$t('regiserPopup.lagree')}}
							</text>
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="Register_btn">
					<u-button type="primary" :disabled="isDisabledTwo" :loading="btnStatus" @click="regBtn()">{{$t('regiserPopup.regBtn')}}</u-button>
				</view>
			</view>
			
		</u-popup>
		
		<signInPopup ref="openSign"></signInPopup>
		
		<u-modal v-model="Yizhuceshow" :content="$t('NewlyAdded.registered')" @cancel="yesCancel" @confirm="yesconfirm" :title="$t('NewlyAdded.Notify')" :show-cancel-button="true" :cancel-text="$t('navBar.rtitle1')" :confirm-text="$t('NewlyAdded.Next')"></u-modal>

	</view>
</template>

<script>
	
	// import {
	// 	websocetObj
	// } from '@/utils/socket.js';

	import md5Libs from "uview-ui/libs/function/md5";

	export default {
		name: "regiserPopup",
		props: {

		},
		data() {
			return {
				Yizhuceshow: false,
				isDisabledTwo: true,
				input_border1: 0,
				input_border2: 0,
				input_border3: 0,
				RememberMe: false,
				btnStatus: false,
				Username: '',
				Password: '',
				confirmation: '',
				RegiserShow: false,
				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},

			}
		},
		watch: {

		},
		computed: {

		},
		created() {
			// uni.$on(事件名，事件的回调函数)
			//uni.$on('OpenReg', (val) => {
			//	this.openPopup()
			//})
		},
		mounted() {

		},
		methods: {
			input1(e) {
				if (!e) {
					this.isDisabledTwo = true
				} else {
					this.isDisabledTwo = false
				}
			},
			inputBlur1(e) {
				////console.log('输入的', e)
				//不能纯数字注册
				
				//判断输入的是否是纯数字 false不是数字  true是纯数字
				//let isNum = !isNaN(parseFloat(e)) && isFinite(e);
				////console.log('是否为数字',isNum)
				
				//判断是否为字母 false不是字母  true是纯字母
				//let isStr = this.$u.test.letter(e)
				////console.log('是否为字母',isStr)
				
				//判断如果小于6个字符就提示
				//if(e.length < 6){
				//	this.$u.toast(this.$t('ToastPrompt.Toast14'));
				//} else {
				//	if(isNum == false && isStr == false){
						////console.log('输入的是数字和字母')
				//		let key = this.$u.test.enOrNum(e)
				//		if(!key){
				//			this.Username = ''
				//			this.$u.toast(this.$t('ToastPrompt.Toast14'));
				//			this.isDisabledTwo = true
				//		}
				//	} else if(isNum == true) {
						/////console.log('输入的是数字和字母')
				//		this.Username = ''
				//		this.$u.toast(this.$t('ToastPrompt.Toast14'));
				//		this.isDisabledTwo = true
				//	}
					/* else if(isStr == true) {
						this.Username = ''
						this.$u.toast('请输入字母加数字-字母');
						this.isDisabledTwo = true
					}*/
				//}
				this.input_border1 = 0
			},
			inputfocus1() {
				this.input_border1 = 1
			},



			inputBlur2(e) {
				//判断输入的是否是字母和数字 不能小于8位
				let key = this.$u.test.enOrNum(e)
				//!key || 
				if (e.length < 8) {
					this.Password = ''
					this.$u.toast(this.$t('ToastPrompt.Toast15'));
				}
				this.input_border2 = 0
			},
			inputfocus2() {
				this.input_border2 = 1
			},


			inputBlur3() {
				this.input_border3 = 0
			},
			inputfocus3() {
				this.input_border3 = 1
			},
			quzhuce() {
				//this.RegiserShow = false
				//uni.$emit('OpenLogin', 1)
			},
			openPopup() {
				this.RegiserShow = true
			},
			closewindows() {
				this.RegiserShow = false
			},
			regBtn() {
				let that = this
				let channel_id = uni.getStorageSync('channel_id') || 2

				if (that.Username == "") {
					that.$u.toast(that.$t('opoupToast.username'));
				} else if (that.Password == "") {
					that.$u.toast(that.$t('opoupToast.password'));
				} else if (that.confirmation == "") {
					that.$u.toast(that.$t('opoupToast.confirmation'));
				} else if (that.Password != that.confirmation) {
					that.$u.toast(that.$t('opoupToast.NotheSame'));
				} else if (that.RememberMe == false) {
					
					
					//that.$u.toast(that.$t('regiserPopup.Unselected'));
					uni.showToast({
						title: that.$t('regiserPopup.Unselected'),
						icon: 'none',
						duration: 30000
					})
					
				} else {
					let md5Pw = md5Libs.md5(that.confirmation) //把密码加密
					that.btnStatus = true
					
					let serialNo = uni.getStorageSync('thisUuid')
					let machineName = uni.getStorageSync('machineName')
					let ua = uni.getStorageSync('thisUa')
					
					setTimeout(() => {
						that.$u.post('/register', {
							channelId: Number(channel_id),
							username: '(+86)' + that.Username, //用户名
							password: md5Pw, //md5加密后的串
							serialNo: serialNo, //设备序列码
							machineName: machineName, //设备型号
							pid: this.PID, //Number 是 平台Id
						}).then(res => {
							////console.log('注册账号',res)
							that.btnStatus = false
							uni.setStorageSync('token', res.data.token)
							uni.setStorageSync('userinfo', res.data)
							that.RegiserShow = false
							
							
							//#ifdef H5
							//友盟埋点事件
							const _czc = _czc || [];
							window._czc.push(['_trackEvent', '点击注册', '注册']);
							if(window.Unity){
								Unity.call('af_complete_registration'); //注册成功埋点
							}
							
							//Facebook Pixel埋点
							if(window.fbq){
								fbq('track', 'CompleteRegistration',{status: true}); //注册成功埋点
							}
							
							
							
							
							
							uni.reLaunch({
								url: '/pages/index/index',
								success: function(res) {
									uni.setStorageSync("OpenDepositoAdvShow", 1)
									//websocetObj.sokcet()
								}
							})
							//#endif
							
							//#ifdef APP-PLUS
							uni.reLaunch({
								url: '/pages/index/index',
								success: function(res) {
									//websocetObj.sokcet()
								}
							})
							//#endif

						}).catch(err => {
							////console.log('注册失败',err)
							that.btnStatus = false
							let code = err.data.code
							if(code == 1 || code == 4){
								that.RegiserShow = false
								setTimeout(()=>{
									that.Yizhuceshow = true
									//账户已被使用找回密码操作
									/*uni.showModal({
										title: this.$t('NewlyAdded.Notify'),
										content: this.$t('NewlyAdded.registered'),
										cancelText: this.$t('navBar.rtitle1'),
										confirmText: this.$t('NewlyAdded.Next'),
										success: function (res) {
											if (res.confirm) {
												////console.log('用户下一步');
												uni.navigateTo({
													url: '/pages/ForgotPassword/ForgotPassword?phoneNum=' + that.Username
												})
											} else if (res.cancel) {
												////console.log('用户去登陆');
												that.$refs.openSign.openPopup()
											}
										}
									});*/
								},300)
							}
						})
					}, 1500)

				}
			},
			yesconfirm() {
				let that = this
				uni.navigateTo({
					url: '/pages/ForgotPassword/ForgotPassword?phoneNum=' + that.Username
				})
			},
			yesCancel(){
				let that = this
				that.$refs.openSign.openPopup()
			},
			checkboxChange(e) {

			},
			checkboxGroupChange(e) {

			},
		}
	}
</script>

<style lang="scss">
	/deep/ .u-checkbox {
		line-height: initial;
		align-items: flex-start !important;
	}

	/deep/ .u-checkbox__icon-wrap {
		position: relative;
		top: 7rpx;
	}

	.checkbox {
		width: 100%;
		font-size: 28rpx;
		color: $font-all-color;
	}

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
				
				display: flex;
				align-items: center;
				.phone-code {
					border-right: 1px solid #2f4553;
					padding: 0 20rpx 0 0;
					color: #7b98bf;
					margin-right: 20rpx;
				}
			}
		}

		.Agreement {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: $font-all-color;
		}

		.Register_btn {
			width: 100%;
			margin: 40rpx auto 0;
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