<template>
	<view :style="theme">

		<u-popup v-model="RegiserShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="RegiserShow = false">
				<view>{{$t('ManageAccountPage.AddAccound')}}</view>
			</view>
			<view class="input_box">
				<view class="input_item">
					<view class="input_item_title">{{$t('NewlyAdded.chooseNetwork')}} *</view>
					<view class="input_item_true_cus" style="padding: 0;">
						<cus-selects :closeSelect.sync='close' :data="selectList" v-model="value" @change='change' :valueType="alias"></cus-selects>
					</view>
				</view>
				<view class="input_item">
					<view class="input_item_title">{{$t('NewlyAdded.WithdralAddress')}} *</view>
					<view class="input_item_true" :class="input_border1 == 1?'input_border':''">
						<u-input v-model="Address" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
					</view>
				</view>
				<view class="Agreement">
					<view>
						<u-icon name="info-circle-fill"></u-icon> {{$t('NewlyAdded.Addhint')}}
					</view>
				</view>
				<view class="Register_btn">
					<u-button type="primary" :disabled="isDisabledTwo" @click="Baocun()">{{$t('NewlyAdded.Savebutton')}}</u-button>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		name: "Addaccount-USDC",
		props: {

		},
		components: {
			cusSelects
		},
		data() {
			return {
				input_border1: 0,
				Address: '',
				isDisabledTwo: true,
				RegiserShow: false,
				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},

				networrkType: 1,
				value: '1',
				selectList: [ //根据自己需求获得的下拉数据，如果数据不是{label:'',value:''}结构的就需要起一个别名来代指一下，就需要valueType
					{
						id: 1,
						title: 'ETH',
					}
				],
				alias: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close: false


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
			inputBlur1(e){
				this.input_border1 = 0
				let screeningStr = /[\W]/g; //想禁止什么类型，在这里替换正则就可以了
				if(screeningStr.test(e)){
					this.$u.toast(this.$t('DiZhiWuXiao'));
					this.$nextTick(() => {
						this.Address = '';
					});
					this.isDisabledTwo = true
				} else {
					this.$nextTick(() => {
						this.Address = e;
					});
				}
			},
			inputfocus1(){
				this.input_border1 = 1
			},
			change(e) {
				console.log(e) //这里返回的是value值
				this.networrkType = e
			},
			openPopup() {
				this.RegiserShow = true
			},
			closewindows() {
				this.RegiserShow = false
			},
			Baocun(){
				let that = this
				
				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')
				
				if (this.Address == "") {
					this.$u.toast(this.$t('NewlyAdded.WithdralAddress'));
					this.isDisabledTwo = true
				} else {
					
					let tkDizhi = ''
					let leixing = ''
					if(this.networrkType == 1){
						tkDizhi = that.Address
						leixing = 'ETH'
					} else if(this.networrkType == 2){
						tkDizhi = that.Address
						leixing = 'ETH'
					}
					
					that.$u.post('/withdraw/bind', {
						method: 18, // number 是 绑定渠道类型
						account: tkDizhi, // String 否 PIX的CPF帐号/ 银行帐号等
						phoneNum: '', // String 否 手机号码 格式：(+86)186123
						email: '', // String 否 电子邮件
						deviceId: serialNo,
						deviceType: machineName || ua,
						
						realName: 'USDC',
						bankCode: leixing,
						//bankName: 'USDC',
						
					}).then(res => {
						that.Address = ""
						
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