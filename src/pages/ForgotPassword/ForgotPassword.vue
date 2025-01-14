<template>
	<view :style="theme" class="page_boxs">

		<u-verification-code :start-text="$t('NewlyAdded.Send')" change-text="Xs" end-tex="retrieve" :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>

		
		<!-- #ifndef APP-PLUS -->
		<match-media :max-width="800" >
			<navbar :immersive="true" ref="child" :title="$t('signInPopup.ForgotPassword')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		<!-- #endif -->
		
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','top':'0px','left':'0','z-index':'999'}" :show="showOptions"> -->

			<pagesNavTitle ref="" :title="$t('signInPopup.ForgotPassword')"></pagesNavTitle>

			<view class="page_wrap">
				<view class="input_box">
					<view class="input_item">
						<view class="input_item_title">{{$t('ResetPopup.VerificationType')}} *</view>
						<view class="input_item_true_cus" style="padding: 0;">
							<cus-selects :placeholder="placeholderP" :Height="'auto'" :jiahao="0" :closeSelect.sync='close' :data="PopularListP" v-model="value" @change='change' :valueType="alias"></cus-selects>
						</view>
					</view>
					<view class="input_item">
						
						<view class="input_item_title" v-if="vType==1">{{$t('ResetPopup.Phone')}} *</view>
						<view class="input_item_title" v-if="vType==2">{{$t('ResetPopup.Email')}} *</view>
						<view class="input_item_true" v-if="vType == 1" :class="input_border1 == 1?'input_border':''" style="padding: 5.5px 16rpx 5.5px 0;">
							<view class="quhao_box">
								<view class="quhao" style="padding-right: 15rpx;">
									<view>
										<areaCodeSelect :jiahao="1" placeholder="" :closeSelect.sync='close2' :data="selectList2" v-model="value2" @change='change2' :valueType="alias2"></areaCodeSelect>
									</view>
								</view>
								<view class="quhao_inpput">
									<u-input v-model="PhoneNum" @input="phoneInput" @blur="inputBlur1" @focus="inputfocus1" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
								</view>
							</view>
						</view>



						<view class="input_item_true" v-else-if="vType == 2"
							:class="input_border2 == 1?'input_border':''" style="padding: 0 16rpx 0 0;">
							<view class="quhao_box">
								<view class="quhao_inpput">
									<u-input v-model="Email" @input="EmailInput" @blur="inputBlur2" @focus="inputfocus2" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
								</view>
							</view>
						</view>


					</view>
					<view class="input_item">
						<view class="input_item_title">{{$t('ResetPopup.VCode')}} *</view>
						<view class="input_item_true" :class="input_border3 == 1?'input_border':''">
							<view class="huoqqude">
								<view class="shurukkuang">
									<u-input v-model="confirmation" @blur="inputBlur3" @focus="inputfocus3" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
								</view>
								<view class="huoquyzm" @tap="getCode">{{tips}}</view>
							</view>
						</view>
					</view>
					<view class="input_item" style="margin: 0;">
						<view class="input_item_title">{{$t('ResetPopup.NewPassword')}} *</view>
						<view class="input_item_true" :class="input_border4 == 1?'input_border':''">
							<u-input v-model="Newpassword" @input="passwordInput" @blur="inputBlur4" @focus="inputfocus4" type="password" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
						</view>
					</view>
					<!--<view class="Agreement">
						<view>
							<u-icon name="info-circle-fill" size="28"></u-icon>
							Account information cannot be modified after confirmation. If you add it by mistake, delete it and add it again.
						</view>
					</view>-->
				</view>
			</view>
			
			<view class="Register_btn" v-if="vType == 1">
				<u-button type="primary" :disabled="isDisabled" :loading="loadingBtn1" @click="SaveBtnP()">{{$t('AddAccoundPopup.SaveBtn')}}</u-button>
			</view>
			<view class="Register_btn" v-if="vType == 2">
				<u-button type="primary" :disabled="isDisabled" :loading="loadingBtn2" @click="SaveBtnE()">{{$t('AddAccoundPopup.SaveBtn')}}</u-button>
			</view>

		<!-- </uni-transition> -->
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	import countryList from '@/utils/list.json'
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		components: {
			cusSelects
		},
		data() {
			return {
				showOptions: true,
				isDisabled: true,
				Username: '',
				PhoneNum: '',
				Email: '',
				confirmation: '',
				Newpassword: '',
				
				loadingBtn1: false,
				loadingBtn2: false,

				input_border1: 0,
				input_border2: 0,
				input_border3: 0,
				input_border4: 0,

				RegiserShow: false,
				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},

				tips: '',
				// refCode: null,
				seconds: 60,


				value: '1',
				selectList: [],
				alias: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close: false,



				value2: this.AreaCode,
				selectList2: [],//countryList.list,
				alias2: { //别名来代指一下
					label: 'name',
					value: 'tel',
					flag: 'flag'
				},
				close2: false,
				PhoneCode: this.AreaCode,

				vType: 1,
				mobileCode: '',
				emailCode: ''

			}
		},
		onLoad(ops) {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			let Phone = ops.phoneNum
			that.PhoneNum = Phone
			
			let SetData = uni.getStorageSync('registerSet');
			//console.log('注册配置',SetData);
			
			//设置默认区号和国旗
			that.selectList2 = SetData.register.areas;
			that.value2 = SetData.register.areas[0].tel;
			that.PhoneCode = SetData.register.areas[0].tel
		},
		onShow() {
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
			
			} else {
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		computed: {
			placeholderP(){
				let Popular = this.$t('NewlyAdded.Optionphone')
				return Popular
			},
			PopularListP() {
				let arry = [{
					id: 1,
					title: this.$t('NewlyAdded.Optionphone'),
				}, {
					id: 2,
					title:  this.$t('NewlyAdded.Optionemail'),
				}]
				return arry
			}
		},
		methods: {
			change(e) {
				this.vType = e
				////console.log(e) //这里返回的是value值
			},
			change2(e) {
				////console.log(e) //这里返回的是value值
				this.PhoneCode = e
			},
			phoneInput(e) {
				if (!e) {
					//this.isDisabled = true
				} else {
					//this.isDisabled = false
				}
			},
			EmailInput(e) {
				if (!e) {
					//this.isDisabled = true
				} else {
					//this.isDisabled = false
				}
			},
			passwordInput(e){
				if (!e) {
					this.isDisabled = true
				} else {
					this.isDisabled = false
				}
			},


			openPopup() {
				this.RegiserShow = true
			},
			closewindows() {
				this.RegiserShow = false
			},




			codeChange(text) {
				this.tips = text;
			},
			inputBlur1() {
				this.input_border1 = 0
			},
			inputfocus1() {
				this.input_border1 = 1
			},
			inputBlur2() {
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
			inputBlur4() {
				this.input_border4 = 0
			},
			inputfocus4() {
				this.input_border4 = 1
			},
			getCode() {
				if (this.vType == 1) { //Phone
					if (this.PhoneNum == '') {
						this.$u.toast(this.$t('ToastPrompt.Toast8'));
					} else {
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
								this.getPhoneCode()
							}, 2000);
						} else {
							this.$u.toast(this.$t('NewlyAdded.Verificationcode3'));
						}
					}
				} else if (this.vType == 2) {
					if (this.Email == '') {
						this.$u.toast('Please enter your Email');
					} else {
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
					}
				}
			},
			getPhoneCode() {
				let that = this
				that.$u.post('/send/phone/code', {
					phone: '(+' + that.PhoneCode + ')' + that.PhoneNum,
					pid: this.PID
				}).then(res => {
					
				}).catch(err => {

				})
			},
			getEmailCode() {
				let that = this
				that.$u.post('/send/email/code', {
					email: that.Email,
					pid: this.PID
				}).then(res => {
					
				}).catch(err => {

				})
			},
			SaveBtnP() {
				let that = this
				let md5pass = md5Libs.md5(that.Newpassword)
				that.loadingBtn1 = true
				
				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')
				
				setTimeout(()=>{
					that.$u.post('/forget/pwd', {
						pid: this.PID, // number 是 平台ID
						code: that.confirmation, // string 是 验证码
						phone: '(+' + that.PhoneCode + ')' + that.PhoneNum, // string 否(与mail二选一) 手机号
						password: md5pass, // string 是 密码MD5
						
						deviceId: serialNo, //设备序列码
						deviceType: machineName, //设备型号
					}).then(res => {
						that.loadingBtn1 = false
						uni.navigateBack()
					}).catch(err => {
						that.loadingBtn1 = false
					})
				},1000)
			},
			SaveBtnE() {
				let that = this
				let md5pass = md5Libs.md5(that.Newpassword)
				that.loadingBtn2 = true
				setTimeout(()=>{
					that.$u.post('/forget/pwd', {
						pid: this.PID, // number 是 平台ID
						code: that.confirmation, // string 是 验证码
						email: that.Email, // string 否（与email二选 一） 电子邮件
						password: md5pass, // string 是 密码MD5
					}).then(res => {
						that.loadingBtn2 = false
						uni.navigateBack()
					}).catch(err => {
						that.loadingBtn2 = false
					})
				},1000)
			}







		}
	}
</script>

<style lang="scss">
	
	/deep/ .Top_navbar {
		/* #ifdef APP-PLUS */
		padding-top: 100rpx !important;
		/* #endif */
	}
	
	.page_wrap {
		padding: 20rpx 20rpx;
		background-color: $body-bg-color !important;
	}

	.Register_btn {
		position: fixed;
		bottom: 2%;
		left: 0;
		right: 0;
		width: 90%;
		margin: 40rpx auto 22rpx;
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
		
		padding: 20rpx 15rpx;

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
				padding: 5.5px 16rpx;

				.quhao_box {
					display: inline-flex;
					width: 100%;
					align-items: center;

					.quhao {
						width: auto;
						color: $font-all-color;
						border-right: 1px solid #2F4553;

						/deep/ .text_tips {
							font-size: 30rpx;
						}
					}

					.quhao_inpput {
						padding-left: 15rpx;
						width: 100%;
					}
				}

				.huoqqude {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.shurukkuang {
						flex: 1;
					}

					.huoquyzm {
						color: #187AE7;
						font-size: 24rpx;
					}
				}
			}
		}

		.Agreement {
			margin-top: 20rpx;
			font-size: 24rpx;
			color: $font-all-color;

			.u-icon {
				margin-right: 10rpx;
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