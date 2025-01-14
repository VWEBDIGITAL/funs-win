<template>
	<view :style="theme">
		
		<u-popup v-model="pc_vaultProShow" width="650" height="85%" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="pc_vaultProShow = false">
				<view>{{$t('VaultPage.title')}}</view>
			</view>
			<view class="page_wrap">
				<view class="tabs_box">
					<view class="tabs_item" v-for="(item,index) in TabsList" :key="index" @click="clicktabs(index)">
						<view class="item_name" :class="tabsidx == index?'xzuanzhong':''">{{item.name}}</view>
						<view class="item_mask" v-if="tabsidx == index"></view>
						<view class="item_border" v-if="tabsidx == index"></view>
					</view>
				</view>
				<view class="input_box_wrap">
					<view class="input_title">{{$t('VaultPage.Amount')}}</view>
					<view class="input_item" :class="input_border1 == 1?'input_border':''">
						<view class="input_srk" v-show="tabsidx == 0">
							<u-input height="74" @input="input1" @blur="inputBlur1" @focus="inputfocus1" v-model="AmountIn" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="true" />
						</view>
						<view class="input_srk" v-show="tabsidx == 1">
							<u-input height="74" @input="input2" @blur="inputBlur2" @focus="inputfocus2" v-model="AmountOut" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="true" />
						</view>
						<view class="input_max" v-show="tabsidx == 0" @click="Max1()">{{$t('VaultPage.Max')}}</view>
						<view class="input_max" v-show="tabsidx == 1" @click="Max2()">{{$t('VaultPage.Max')}}</view>
					</view>
					<view class="Available">
						<view v-if="tabsidx == 0">{{$t('VaultPage.Available')}}:<span>{{balance.toFixed(2)}}</span></view>
						<view v-if="tabsidx == 1">{{$t(('VaultPage.VaultBalance'))}}:<span>{{bankBalance.toFixed(2)}}</span></view>
					</view>
					
					
					
					
					<view v-if="JinZhiBXX == 0">
						<view class="Register_btn" v-if="tabsidx == 0">
							<u-button type="primary" :disabled="isDisabledOne" @click="TransferInBtn()">{{$t('VaultPage.TransferVault')}}</u-button>
						</view>
						<view class="Register_btn" v-else-if="tabsidx == 1">
							<u-button type="primary" :disabled="isDisabledTwo" @click="TransferOutBtn()">{{$t('VaultPage.WithdrawWallet')}}</u-button>
						</view>
					</view>
					
					<view class="xutouzhu" v-if="JinZhiBXX == 1">
						<u-icon name="warning-fill" color="#f1d409" size="32"></u-icon>
						<view>{{$t('hbqian')}}{{$t('Vault Pro')}}！<span @click="LianXiKeFu()">{{$t('OrderProgerss.support')}}</span></view>
					</view>
					
					
				</view>
				<view class="Vault_Pro_Balance">
					<view class="Vault_Pro_Balan_item">
						<image src="/static/image/finance_icon.png"></image>
						<view class="Vault_Pro_Balance_t">
							<view class="Vault_Pro_Balancc">{{$t('VaultPage.VaultBalance')}}</view>
							<view class="Vault_Pro_Balance_b">
								<view>{{bankBalance.toFixed(2)}}</view>
								<view @click="Tolog()">{{$t('VaultPage.Details')}}</view>
							</view>
						</view>
					</view>
				</view>
				<faqlist ref="" :istype="'VaultPro'"></faqlist>
			</view>
		</u-popup>
		
		
		
		
		
		
		<pc-Transaction ref="openPCTra"></pc-Transaction>
		
		<Fun-Password ref="funpassword" :type="1" @UpUserinfo="Upuserinfo"></Fun-Password>
		<VaultPro-Fun-Password ref="inputFunPass" @GetpayPassword="GetPayPassword"></VaultPro-Fun-Password>
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		name:"pc-VaultPro",
		data() {
			return {
				pc_vaultProShow: false,
				
				input_border1: 0,
				isDisabledOne: true,
				isDisabledTwo: true,
				showOptions: true,
				placeholderStyle: "fontSize: 24rpx;",
				customStyle: {
					fontSize: "34rpx",
					fontWeight: "bold"
				},
				tabsList: [{
					name: this.$t('VaultPage.TransferIn')
				}, {
					name: this.$t('VaultPage.TransferOut')
				}],
				tabsidx: 0,
				AmountIn: '',
				AmountOut: '',
				balance: 0,

				bankBalance: 0,
				
				userInfo: {},
				
				funPassword3: '',
				
				JinZhiBXX: 0

			}
		},
		computed: {
			TabsList(){
				let lists = [{
					name: this.$t('VaultPage.TransferIn')
				}, {
					name: this.$t('VaultPage.TransferOut')
				}]
				return lists
			}
		},
		mounted() {
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				
			} else {
				this.init()
			}
		},
		methods: {
			//判断账户是否能使用保险箱
			isJinZhi_BXX(){
				const userInfo = uni.getStorageSync("userinfo");
				const num = userInfo.managerFlag;
				const bitPosition = 2;
				const fag = this.checkBit(num, bitPosition) ? '1' : '0'; //1禁止 0不禁止
				this.JinZhiBXX = fag
			},
			checkBit(num, bitPosition) {
			    const mask = 1 << bitPosition;
			    return (num & mask) !== 0;
			},
			init(){
				this.getMybalance()
				this.GetuserInfo()
				this.isJinZhi_BXX()
			},
			openPopup() {
				this.init();
				this.pc_vaultProShow = true
			},
			closewindows() {
				this.pc_vaultProShow = false
			},
			
			
			
			
			
			
			
			inputBlur1() {
				this.input_border1 = 0
			},
			inputfocus1() {
				this.input_border1 = 1
			},
			inputBlur2() {
				this.input_border1 = 0
			},
			inputfocus2() {
				this.input_border1 = 1
			},
			
			input1(e){
				if(!e){
					this.isDisabledOne = true
				} else {
					this.isDisabledOne = false
				}
			},
			input2(e){
				if(!e){
					this.isDisabledTwo = true
				} else {
					this.isDisabledTwo = false
				}
			},
			getMybalance() {
				let that = this
				that.$u.post('/refresh-balance', {

				}).then(res => {
					that.balance = res.data.balance / 100
				}).catch(err => {

				})
			},
			Tolog(){
				//检查一下窗口大小判断是否打开页面 大于768使用弹窗打开log页面
				let windowWidth = uni.getSystemInfoSync().windowWidth
				if(windowWidth >= "800"){
					this.pc_vaultProShow = false
					this.$refs.openPCTra.openPopup()
				} else {
					uni.navigateTo({
						url: '/pages/Transaction/Transaction'
					})
				}
			},
			GetuserInfo() {
				let that = this
				that.$u.post('/user/get/info', {}).then(res => {
					//////console.log('个人信息', res)
					that.userInfo = res.data
					uni.setStorageSync('userinfo', res.data)
					that.bankBalance = res.data.bankBalance / 100
				})
			},
			clicktabs(idx) {
				this.tabsidx = idx
			},
			TransferInBtn() {
				let that = this
				if(that.AmountIn <= 0){
					
				} else {
					let wallet = parseInt(that.AmountIn)*100
					that.$u.post('/trans-in', {
						amount: wallet// Number 是 转账额度
					}).then(res => {
						uni.$emit('getgetMybalance', 1)
						that.getMybalance()
						that.GetuserInfo()
						that.AmountIn = 0
					})
				}
			},
			Max1(){
				this.AmountIn = this.balance
				this.isDisabledOne = false
			},
			Max2(){
				this.AmountOut = this.bankBalance
				this.isDisabledTwo = false
			},
			TransferOutBtn() {
				let that = this
				if(that.AmountOut <= 0){
					
				} else {
					
					//先判断是否设置支付密码
					if (that.userInfo.payPwdSet == false) {
						//弹窗设置支付密码/。设置后更新用户缓存
						that.$refs.funpassword.openPopup()
					} else if (that.userInfo.payPwdSet == true) {
						//如果已设置直接输入支付密码后兑换
						that.$refs.inputFunPass.openPopup()
					}
				}
			},
			GetPayPassword(e){
				//////console.log(e)
				this.funPassword3 = md5Libs.md5(e)
				this.OkZhuanOut()
			},
			OkZhuanOut(){
				let that = this
				let wallet = parseInt(that.AmountOut)*100
				that.$u.post('/trans-out', {
					amount: wallet,// Number 是 转账额度
					payPwd: that.funPassword3
				}).then(res => {
					uni.$emit('getgetMybalance', 1)
					uni.$emit('UpdataAddBcbalance', (wallet/100).toFixed(2))
					that.getMybalance()
					that.GetuserInfo()
					that.AmountOut = 0
				})
			},
			Upuserinfo(){
				let that = this
				that.GetuserInfo()
			},
			LianXiKeFu(){
				let that = this
				const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
				that.$u.post('/game/chat', {
					pid: this.PID,
					lang: language
				}).then(res => {
					let chatUrl = res.data.chatUrl
					// #ifdef APP-PLUS
					plus.runtime.openURL(chatUrl);
					// #endif
					
					// #ifdef H5
					// let url_ = '/pages/chatWebview/chatWebview?url=' + encodeURIComponent(JSON.stringify(chatUrl))
					// if (url_.indexOf('%') > -1) {
					// 	url_ = url_.replace(/%/g, '%25');
					// }
					setTimeout(() => {
						window.open(chatUrl, '_blank');
					}, 500)
					let windowWidth = uni.getSystemInfoSync().windowWidth
					if (windowWidth >= "800") {
						uni.$emit('OpenPCKefu', chatUrl);
					} else {
						uni.navigateTo({
							url: url_
						})
					}
					// #endif
				});
			}
		}
	}
</script>

<style lang="scss">
	
	.xutouzhu {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		color: $all-secondary-text-color;
		.u-icon {
			margin-right: 10rpx;
		}
		span {
			color: #2283f6;
			margin: 0 10rpx;
			cursor: pointer;
			text-decoration: underline;
			font-size: 31rpx;
			font-weight: 600;
		}
	}
	
	/deep/ .u-drawer {
		max-width: 668px !important;
	}
	.page_wrap {
		padding: 40rpx;
	}

	.faq_list_wrap {
		margin-top: 40rpx;

		.faq_title {
			font-weight: bold;
			color: #FEFEFE;
			font-size: 34rpx;
			margin-bottom: 15rpx;
		}
	}

	.Vault_Pro_Balance {
		margin: 20rpx 0;
		background-color: $all-secondary-color;
		padding: 30rpx;
		border-radius: 12rpx;

		.Vault_Pro_Balan_item {
			background-color: $pupUp-bg-color;
			padding: 30rpx 50rpx;
			display: flex;
			align-items: center;
			border-radius: 12rpx;

			image {
				width: 54.86rpx;
				height: 47rpx;
			}

			.Vault_Pro_Balance_t {
				padding-left: 40rpx;

				.Vault_Pro_Balancc {
					color: $font-all-color;
					font-size: 26rpx;
					margin-bottom: 6rpx;
				}

				.Vault_Pro_Balance_b {
					display: flex;
					align-items: flex-end;

					view:nth-child(1) {
						color: #FEFEFE;
						font-size: 34rpx;
					}

					view:nth-child(2) {
						cursor: pointer;
						color: #3673D9;
						padding-left: 20rpx;
						text-decoration: underline;
					}
				}
			}
		}
	}

	.input_box_wrap {
		margin: 20rpx 0;
		background-color: $all-secondary-color;
		padding: 30rpx;
		border-radius: 12rpx;

		.input_title {
			color: $font-all-color;
			margin-bottom: 10rpx;
		}

		.input_item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: $pupUp-bg-color;
			border: 1px solid #2a3546;
			border-radius: 10rpx;
			height: 74rpx;

			.input_srk {
				padding: 0 20rpx;
				flex: 1;
			}

			.input_max {
				background-color: #2F4553;
				height: 70rpx;
				line-height: 70rpx;
				padding: 0 20rpx;
				color: $font-all-color;
				font-size: 24rpx;
				position: relative;
				right: 0rpx;
				border-radius: 0 8rpx 8rpx 0;
			}
		}

		.Available {
			view {
				font-size: 25rpx;
				color: $font-all-color;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 20rpx 0;

				span {
					//font-weight: bold;
					color: #FEFEFE;
				}
			}
		}

		.Register_btn {
			width: 100%;
			margin: 30rpx auto 10rpx;
		}
	}

	.tabs_box {
		border-radius: 12rpx 12rpx 0 0;
		border-bottom: 2px solid #2F4553;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 92rpx;
		position: relative;

		.tabs_item {
			flex: 1;
			position: relative;
			text-align: center;
			height: 92rpx;
			cursor: pointer;
			.item_name {
				width: 100%;
				color: $font-all-color;
				//font-weight: bold;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 9;
				font-size: 26rpx;
			}

			.xzuanzhong {
				color: #FEFEFE !important;
			}

			.item_mask {
				background-color: $all-secondary-color;
				height: 52px;
				width: 100%;
				background-image: linear-gradient(to top, #3574d978, #3574d900);
				border-radius: 0 0 0 0;
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 1;
			}

			.item_border {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 2px;
				background-color: #3673D9;
				z-index: 2;
			}
		}
	}
</style>


