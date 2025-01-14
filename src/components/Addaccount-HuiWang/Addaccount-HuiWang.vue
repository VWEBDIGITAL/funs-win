<template>
	<view :style="theme">

		<u-popup v-model="RegiserShow" width="650" mode="center" close-icon-size="30" border-radius="14"
			:mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="RegiserShow = false">
				<view>{{$t('AddAccoundPopup.title')}}</view>
			</view>
			<view class="input_box">


				<view class="input_item" v-if="vType == 2">
					<view class="input_item_title">{{$t('AddAccoundPopup.Accound')}} *</view>
					<view class="input_item_true" :class="input_border2 == 1?'input_border':''"
						style="padding: 0 16rpx 0 0;">
						<view class="quhao_box">



							<view class="xialaXuanze2" style="padding-right: 20rpx;border-right: 1px solid #2c384a;">
								<view class="xlxz_input" @click="huobifuList_quhao.length > 1?showXuanze_quhao():null">
									<view class="xlxz_title">
										<image :src="defaultXz_quhao_icon" mode="aspectFit"></image>
										<view>{{defaultXz_quhao_code}}</view>
									</view>
									<view class="right_box" v-if="huobifuList_quhao.length > 1">
										<u-icon name="arrow-down" color="#007aff"></u-icon>
									</view>
								</view>
								<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'auto','position':'absolute','top':'0','left':'0','z-index':'100'}" :show="showOptions_quhao">
									<view class="scroll_wrap">
										<scroll-view scroll-y="true" class="scroll_wrap_item">
											<view class="scroll_name" v-for="(item,index) in huobifuList_quhao" :key="index" @click="clickTabs_quhao(item,index)" :class="defaultXz_quhao_code == item.tel?'xuanzhong':''">
												<view>+{{item.tel}}</view>
											</view>
										</scroll-view>
									</view>
								</uni-transition>
							</view>



							<view class="quhao_inpput" style="padding-left: 20rpx;">
								<u-input v-model="PhoneNum" type="number" :border="false" :custom-style="customStyle"
									:placeholder-style="placeholderStyle" placeholder="" :clearable="false"
									@input="phoneInput" @blur="phoneBlur" @focus="phonefocus" />
							</view>
						</view>
					</view>
				</view>

				<view class="input_item" v-if="vType == 2">
					<view class="input_item_title">{{$t('navBarTitle.Name')}} *</view>
					<view class="input_item_true" :class="input_border1 == 1?'input_border':''"
						style="padding: 0 16rpx 0 0;">
						<view class="quhao_box">
							<view class="quhao_inpput">
								<u-input v-model="AccountName" type="text" maxlength="11" :border="false"
									:custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder=""
									:clearable="false" @input="CPFInput" @blur="CPFBlur" @focus="CPFfocus" />
							</view>
						</view>
					</view>
				</view>



				<view class="Agreement">
					<view>
						<u-icon name="info-circle-fill"></u-icon>
						{{$t('NewlyAdded.Addhint')}}
					</view>
				</view>
			</view>
			<view class="Register_btn">
				<u-button type="primary" :disabled="disabledBtn"
					@click="BaoCun()">{{$t('AddAccoundPopup.SaveBtn')}}</u-button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import countryList from '@/utils/list.json'
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		name: "Addaccount-HuiWang",
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
				vType: 2,


				huobifuList_quhao: [],//countryList.list,
				tctabsIdx_quhaoidx: 0,
				defaultXz_quhao_icon: '/static/flag/cn.png',
				defaultXz_quhao_code: this.AreaCode,
				showOptions_quhao: false,


			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			let that = this
			//#ifdef H5
			let is_lang = navigator.language.substring(0, 2);
			//先独立出简体zh-CN
			let is_langs = navigator.language;
			if(is_langs == 'zh-CN'){
				is_lang = 'zh'
			} else if(is_langs == 'zh-HK' || is_langs == 'zh-TW' || is_langs == 'zh-MO'){
				is_lang = 'zh-HK'
			} else if(is_langs == 'fil') {
				is_lang = 'tl'
			} else {
				is_lang = is_lang
			}
			
			// let is_lang = navigator.language;
			// if (is_lang == 'fil') {
			// 	is_lang = 'tl'
			// } else if(is_lang == 'zh-CN') {
			// 	is_lang = 'zh'
			// } else {
			// 	is_lang = is_lang
			// }
			// #endif

			//#ifdef APP-PLUS
			let is_systemInfo = uni.getSystemInfoSync();
			let is_lang = is_systemInfo;
			// #endif
			
			//判断区号显示国旗
			// let quhao = this.AreaCode
			// if(quhao == '86'){
			// 	this.defaultXz_quhao_icon = '/static/flag/cn.png'
			// } else if(quhao == '63'){
			// 	this.defaultXz_quhao_icon = '/static/flag/ph.png'
			// } else if(quhao == '81'){
			// 	this.defaultXz_quhao_icon = '/static/flag/jp.png'
			// } else if(quhao == '855'){
			// 	this.defaultXz_quhao_icon = '/static/flag/kh.png'
			// } else if(quhao == '55'){
			// 	this.defaultXz_quhao_icon = '/static/flag/br.png'
			// }

			//根据我手机设备的语言来判断，我是去平台六还是平台7
			// if (is_lang === 'zh') {
			// 	that.defaultXz_quhao_code = this.AreaCode
			// 	that.defaultXz_quhao_icon = '/static/flag/cn.png'
			// } else {
			// 	//一律菲律宾7
			// 	that.defaultXz_quhao_code = this.AreaCode
			// 	that.defaultXz_quhao_icon = '/static/flag/cn.png'
			// }
		},
		mounted() {

		},
		methods: {
			clickTabs_quhao(item, idx) {
				this.tctabsIdx_quhaoidx = idx

				this.defaultXz_quhao_code = item.tel
				this.defaultXz_quhao_icon = item.flag

				this.showOptions_quhao = false
			},
			showXuanze_quhao() {
				if (this.showOptions_quhao == true) {
					this.showOptions_quhao = false
				} else {
					this.showOptions_quhao = true
				}
			},



			phoneInput(e) {
				//////console.log(e)
				if (!e) {
					this.disabledBtn = true
				} else {
					this.disabledBtn = false
				}
			},


			CPFInput(e) {
				//////console.log(e)
				if (!e) {
					this.disabledBtn = true
				} else {
					this.disabledBtn = false
				}
			},
			//离开聚焦
			CPFBlur(e) {
				this.input_border1 = 0
				let screeningStr = /^[\a-\z\A-\Z0-9\u4e00-\u9fe5]+$/;//只能输入中文数字和英文
				if(screeningStr.test(e)){
					this.$nextTick(() => {
						this.AccountName = e;
					});
				} else {
					this.$u.toast(this.$t('nameWuXiao'));
					this.$nextTick(() => {
						this.AccountName = '';
					});
					this.disabledBtn = true
				}
			},
			//聚焦
			CPFfocus() {
				this.input_border1 = 1
			},
			
			
			phoneBlur() {
				this.input_border2 = 0
			},
			phonefocus() {
				this.input_border2 = 1
			},
			
			
			
			
			
			
			

			openPopup() {
				let that = this
				let SetData = uni.getStorageSync('registerSet');
				console.log('注册配置',SetData);
				//设置默认区号和国旗
				that.huobifuList_quhao = SetData.register.areas || [];
				that.defaultXz_quhao_code = SetData.register.areas[0].tel
				this.defaultXz_quhao_icon = SetData.register.areas[0].flag
				
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

				if (this.vType == 2) {

					if (this.PhoneNum == "") {
						this.$u.toast(this.$t('ToastPrompt.Toast8'));
						this.disabledBtn = true
					} else if(this.AccountName == ""){
						this.$u.toast(this.$t('ToastPrompt.Toast16'));
						this.disabledBtn = true
					} else {
						that.$u.post('/withdraw/bind', {
							method: 11,
							account: '',
							phoneNum: '(+' + that.defaultXz_quhao_code + ')' + that.PhoneNum,
							email: '',
							realName: that.AccountName,
							bankCode: 'CNY',
							bankName: '汇旺支付',
							deviceId: serialNo,
							deviceType: machineName || ua
						}).then(res => {
							that.PhoneNum = ""
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

<style lang="scss" scoped>
	.xialaXuanze2 {
		position: relative;
		z-index: 999;
		cursor: pointer;

		.scroll_wrap {
			position: absolute;
			width: 100%;
			margin: 0 auto;
			left: 0;
			right: 0;
			top: 80rpx;

			.scroll_wrap_item {
				background-color: $select-drop-down-color;
				padding: 20rpx;
				border-radius: 16rpx;
				max-height: 300rpx;
				.scroll_name {
					display: flex;
					align-items: center;
					padding: 14rpx 18rpx;
					cursor: pointer;
					color: #B2B9D0;
					border-radius: 10rpx;

					image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 10rpx;
					}
				}

				.xuanzhong {
					background-color: $select-drop-down-xz-color;
					color: #fff;
					font-weight: bold;
				}
			}
		}

		.xlxz_input {
			display: flex;
			align-items: center;
			justify-content: space-between;

			//background-color: #2a3546;
			//padding: 15rpx 30rpx;
			//height: 90rpx;
			//line-height: 90rpx;
			//border-radius: 16rpx;
			.xlxz_title {
				display: flex;
				align-items: center;
				color: $all-secondary-text-color;

				image {
					width: 38rpx;
					height: 38rpx;
					margin-right: 10rpx;
				}

				view {
					font-weight: bold;
				}
			}

			.right_box {
				margin-left: 10rpx;

				.u-icon {
					font-size: 24rpx;
					position: relative;
					top: 2rpx;
				}
			}
		}
	}



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
					padding-left: 20rpx;
					height: 50px;
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
						//padding-left: 15rpx;
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