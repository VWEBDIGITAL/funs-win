<template>
	<view :style="theme">

		<u-popup v-model="RegiserShow" width="650" mode="center" close-icon-size="30" border-radius="14"
			:mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="RegiserShow = false">
				<view>{{$t('ManageAccountPage.AddAccound')}}</view>
			</view>
			<view class="input_box">
				<!-- <view class="input_item">
					<view class="input_item_title">{{$t('NewlyAdded.PleaseSelect')}} *</view>
					<view class="input_item_true_cus" style="padding: 0;">
						<cus-selects :isSouSuo="true" :closeSelect.sync='close' :data="selectList" v-model="value" @change='change' :valueType="alias" @Lowchange="Lowchange"></cus-selects>
					</view>
				</view> -->

				<view class="input_item">
					<view class="input_item_title">{{$t('AddAccoundPopup.AccoundName')}} *</view>
					<view class="input_item_true" :class="input_border1 == 1?'input_border':''">
						<u-input v-model="XingMing" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="text"
							:border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle"
							placeholder="" :clearable="false" />
					</view>
				</view>

				<view class="input_item">
					<view class="input_item_title">{{$t('KaHaoNum')}} *</view>
					<view class="input_item_true" :class="input_border2 == 1?'input_border':''">
						<u-input v-model="KaHao" @input="input2" @blur="inputBlur2" @focus="inputfocus2" type="number"
							:border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle"
							placeholder="" :clearable="false" />
					</view>
				</view>

				<view class="Agreement">
					<view>
						<u-icon name="info-circle-fill"></u-icon> {{$t('NewlyAdded.Addhint')}}
					</view>
				</view>
				<view class="Register_btn">
					<u-button type="primary" :disabled="isDisabledTwo"
						@click="Baocun()">{{$t('NewlyAdded.Savebutton')}}</u-button>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import BankData from "@/utils/HKbankList.js";
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		name: "AddAc-HK-ZSK",
		props: {

		},
		components: {
			cusSelects
		},
		data() {
			return {
				input_border1: 0,
				input_border2: 0,
				XingMing: '',
				KaHao: '',
				
				isDisabledTwo: true,
				RegiserShow: false,
				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},


				value: '003',
				selectList: BankData.list,
				alias: { //别名来代指一下
					label: 'bankName',
					value: 'bankCode'
				},
				close: false,
				
				
				isbnakCode: '港币',
				isbnakName: '香港-轉數快'


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
			input1(e) {
				if (!e) {
					this.isDisabledTwo = true
				} else {
					this.isDisabledTwo = false
				}
			},
			inputBlur1(e) {
				this.input_border1 = 0
				let screeningStr = /^[\a-\z\A-\Z0-9\u4e00-\u9fe5]+$/;//只能输入中文数字和英文
				if(screeningStr.test(e)){
					this.$nextTick(() => {
						this.XingMing = e;
					});
				} else {
					this.$u.toast(this.$t('nameWuXiao'));
					this.$nextTick(() => {
						this.XingMing = '';
					});
					this.isDisabledTwo = true
				}
			},
			inputfocus1() {
				this.input_border1 = 1
			},
			
			
			
			
			input2(e) {
				if (!e) {
					this.isDisabledTwo = true
				} else {
					this.isDisabledTwo = false
				}
			},
			inputBlur2() {
				this.input_border2 = 0
			},
			inputfocus2() {
				this.input_border2 = 1
			},
			
			
			
			
			
			
			
			
			
			
			
			
			change(e) {
				////console.log(e) //这里返回的是value值
			},
			Lowchange(e){
				//console.log(e) //这里返回的是value值
				this.isbnakCode = e.bankCode
				this.isbnakName = e.bankName
			},
			openPopup() {
				this.RegiserShow = true
			},
			closewindows() {
				this.RegiserShow = false
			},
			Baocun() {
				let that = this

				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')

				if (this.XingMing == "") {
					this.$u.toast(this.$t('TianAllInfo'));
					this.isDisabledTwo = true
				} else if (this.KaHao == "") {
					this.$u.toast(this.$t('TianAllInfo'));
					this.isDisabledTwo = true
				} else {
					that.$u.post('/withdraw/bind', {
						method: 19, // number 是 绑定渠道类型
						
						phoneNum: '', // String 否 手机号码 格式：(+00)186123
						email: '', // String 否 电子邮件
						
						deviceId: serialNo,
						deviceType: machineName || ua,
						
						
						account: that.KaHao, // String 否 PIX的CPF帐号/ 银行帐号等
						realName: that.XingMing,
						
						bankCode: that.isbnakCode,
						bankName: that.isbnakName,
						
						
					}).then(res => {
						
						that.XingMing = ""
						that.KaHao = ""
						that.isbnakCode = "港币"
						that.isbnakName = "香港-轉數快"
						that.$emit('zhidiBottom')
						that.$emit('GetAcList')
						that.RegiserShow = false
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

	.input_box {
		padding: 30rpx;

		.input_item {
			margin-bottom: 30rpx;

			/deep/ .select_modal_scroll {
				height: 300px !important;
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
				//height: 50px; 
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