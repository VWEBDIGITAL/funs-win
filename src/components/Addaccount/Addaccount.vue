<template>
	<view :style="theme">

		<u-popup v-model="RegiserShow" width="650" mode="center" close-icon-size="30" border-radius="14"
			:mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="RegiserShow = false">
				<view>{{$t('AddAccoundPopup.title')}}</view>
			</view>
			<view class="input_box">

				<view class="input_item" v-if="vType == 2">
					<view class="input_item_title">{{$t('AddAccoundPopup.AccoundName')}} *</view>
					<view class="input_item_true" :class="input_border1 == 1?'input_border':''" style="padding: 0 16rpx 0 0;">
						<view class="quhao_box">
							<view class="quhao_inpput">
								<u-input v-model="CpfAc" type="text" :border="false" :custom-style="customStyle"
									:placeholder-style="placeholderStyle" placeholder="" :clearable="false"
									@input="CPFInput" @blur="CPFBlur" @focus="CPFfocus" />
							</view>
						</view>
					</view>
				</view>
				
				
				<!--<view class="input_item" v-if="vType == 1">
					<view class="input_item_title">{{$t('AddAccoundPopup.Accound')}} *</view>
					<view class="input_item_true" :class="input_border6 == 1?'input_border':''" style="padding: 0 16rpx 0 0;">
						<view class="quhao_box">
							<view class="quhao_inpput">
								<u-input v-model="Cpfzh" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" @input="CPFInput2" @blur="CPFBlur2" @focus="CPFfocus2" />
							</view>
						</view>
					</view>
				</view>-->

				<view class="input_item" v-if="vType == 2">
					<view class="input_item_title">{{$t('AddAccoundPopup.Accound')}} *</view>
					<view class="input_item_true" :class="input_border2 == 1?'input_border':''" style="padding: 0 16rpx 0 0;">
						<view class="quhao_box">
							<!--<view class="quhao">
								<view>
									<view class="cengji">
										<areaCodeSelect :jiahao="1" placeholder="" :closeSelect.sync='close3' :data="selectList3" v-model="value3" @change='change3' :valueType="alias3"></areaCodeSelect>
									</view>
								</view>
							</view>-->
							<view class="quhao_inpput">
								<u-input v-model="PhoneNum" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" @input="phoneInput" @blur="phoneBlur" @focus="phonefocus" />
							</view>
						</view>
					</view>
				</view>

				<!--<view class="input_item" v-if="vType == 3">
					<view class="input_item_title">{{$t('AddAccoundPopup.AccoundName')}} *</view>
					<view class="input_item_true" :class="input_border3 == 1?'input_border':''" style="padding: 0 16rpx 0 0;">
						<view class="quhao_box">
							<view class="quhao_inpput"><u-input v-model="EmailAc" type="text" :border="false"
									:custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder=""
									:clearable="false" @input="EmailInput" @blur="EmailBlur" @focus="Emailfocus" /></view>
						</view>
					</view>
				</view>-->








				<!--<view class="input_item" style="margin: 0;">
					<view class="input_item_title">Account Name *</view>
					<view class="input_item_true">
						<u-input v-model="AccountName" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
					</view>
				</view>-->
				<view class="Agreement">
					<view>
						<u-icon name="info-circle-fill"></u-icon>
						{{$t('NewlyAdded.Addhint')}}
					</view>
				</view>
			</view>
			<view class="Register_btn">
				<u-button type="primary" :disabled="disabledBtn" @click="BaoCun()">{{$t('AddAccoundPopup.SaveBtn')}}</u-button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import countryList from '@/utils/list.json'
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		name: "Addaccount",
		props: {

		},
		components: {
			cusSelects
		},
		data() {
			return {
				disabledBtn: true,
				input_border6: 0,
				input_border1: 0,
				input_border2: 0,
				input_border3: 0,
				
				Cpfzh: '',
				CpfAc: '',
				EmailAc: '',
				PhoneNum: '',
				AccountName: '',

				RegiserShow: false,
				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},

				value: '1',
				selectList: [{
					id: 1,
					title: 'CPF',
				}, {
					id: 2,
					title: 'Phone',
				}, {
					id: 3,
					title: 'Email',
				}],
				alias: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close: false,


				value2: '1',
				selectList2: [{
					id: 1,
					title: this.AreaCode,
				}, {
					id: 2,
					title: '45',
				}],
				alias2: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close2: false,

				vType: 2,
				PhoneCode: this.AreaCode,
				
				
				value3: this.AreaCode,
				selectList3: countryList.list,
				alias3: { //别名来代指一下
					label: 'name',
					value: 'tel',
					flag: 'flag'
				},
				close3: false,
				
				
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
			change3(e) {
				////console.log(e) //这里返回的是value值
				this.PhoneCode = e
			},
			change(e) {
				this.vType = e
				//////console.log(e) //这里返回的是value值
			},
			change2(e) {
				//////console.log(e) //这里返回的是value值
				this.PhoneCode = '(+' + e + ')'
			},
			phoneInput(e) {
				//////console.log(e)
				if(!e){
					this.disabledBtn = true
				} else {
					this.disabledBtn = false
				}
			},
			EmailInput(e) {
				//////console.log(e)
				if(!e){
					this.disabledBtn = true
				} else {
					this.disabledBtn = false
				}
			},
			
			
			CPFInput(e) {
				//////console.log(e)
				if(!e){
					this.disabledBtn = true
				} else {
					this.disabledBtn = false
				}
			},
			//离开聚焦
			CPFBlur(e){
				this.input_border1 = 0
				let screeningStr = /^[\a-\z\A-\Z0-9\u4e00-\u9fe5]+$/;//只能输入中文数字和英文
				if(screeningStr.test(e)){
					this.$nextTick(() => {
						this.CpfAc = e;
					});
				} else {
					this.$u.toast(this.$t('huMingWuXiao'));
					this.$nextTick(() => {
						this.CpfAc = '';
					});
					this.disabledBtn = true
				}
			},
			//聚焦
			CPFfocus(){
				this.input_border1 = 1
			},
			CPFInput2(e) {
				//////console.log(e)
				if(!e){
					this.disabledBtn = true
				} else {
					this.disabledBtn = false
				}
			},
			//离开聚焦
			CPFBlur2(){
				this.input_border6 = 0
			},
			//聚焦
			CPFfocus2(){
				this.input_border6 = 1
			},
			phoneBlur(){
				this.input_border2 = 0
			},
			phonefocus(){
				this.input_border2 = 1
			},
			EmailBlur(){
				this.input_border3 = 0
			},
			Emailfocus(){
				this.input_border3 = 1
			},

			openPopup() {
				this.RegiserShow = true
			},
			closewindows() {
				this.RegiserShow = false
			},
			BaoCun() {
				let that = this
				
				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')

				if (this.vType == 1) {
					
					if (this.CpfAc == "" || this.Cpfzh == "") {
						//this.$u.toast(this.$t('ToastPrompt.Toast7'));
						this.disabledBtn = true
					} if(this.PhoneNum == ""){
						//this.$u.toast(this.$t('ToastPrompt.Toast7'));
						this.disabledBtn = true
					} else {
						that.$u.post('/withdraw/bind', {
							method: 2, // number 是 绑定渠道类型
							account: that.CpfAc, // String 否 GCASH的帐号/ 银行帐号等
							phoneNum: '', // String 否 手机号码 格式：(+86)186123
							email: '', // String 否 电子邮件
							deviceId: serialNo,
							deviceType: machineName || ua
						}).then(res => {
							that.CpfAc = ""
							
							that.$emit('zhidiBottom')
							that.$emit('GetAcList')
							that.RegiserShow = false
						})
					}
					
				} else if (this.vType == 2) {
					if (this.CpfAc == "") {
						this.$u.toast(this.$t('TianAllInfo'));
						this.disabledBtn = true
					} else if (this.PhoneNum == "") {
						this.$u.toast(this.$t('TianAllInfo'));
						this.disabledBtn = true
					} else {
						that.$u.post('/withdraw/bind', {
							method: 3,
							account: that.PhoneNum,
							phoneNum: '',
							realName: that.CpfAc,
							email: '',
							bankCode: 'GCASH',
							bankName: 'PHP',
							deviceId: serialNo,
							deviceType: machineName || ua
						}).then(res => {
							that.PhoneNum = ""
							
							that.$emit('zhidiBottom')
							that.$emit('GetAcList')
							that.RegiserShow = false
						})
					}

				} else if (this.vType == 3) {

					if (this.EmailAc == "") {
						this.$u.toast(this.$t('ToastPrompt.Toast9'));
					} else {
						that.$u.post('/withdraw/bind', {
							method: 2,
							account: '',
							phoneNum: '',
							email: that.EmailAc,
							deviceId: serialNo,
							deviceType: machineName || ua
						}).then(res => {
							that.EmailAc = ""
							
							that.$emit('zhidiBottom')
							that.$emit('GetAcList')
							that.RegiserShow = false
						})
					}

				}


			}
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		padding: 32rpx 20rpx;
	}

	.Register_btn {
		width: 90%;
		margin: 24rpx auto 42rpx;
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
		padding: 30rpx 30rpx;

		.input_item {
			margin-bottom: 30rpx;

			/deep/ .select_modal_scroll {
				height: auto;
			}

			.input_item_title {
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-size: 28rpx;
			}

			.input_item_true {
				background-color: $all-secondary-color;
				border: 1px solid $input-border-color;
				border-radius: 10px;
				padding: 4px 16rpx;
				
				/deep/ .select_modal_con {
					width: 100.6%;
				}

				.quhao_box {
					display: inline-flex;
					align-items: center;
					width: 100%;
					.quhao {
						width: 140px;
						color: $font-all-color;
						border-right: 1px solid #2F4553;

						/deep/ .text_tips {
							font-size: 30rpx;
						}
						
						.cengji {
							.select_wrap_box {
								position: relative;
								z-index: 2;
							}
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