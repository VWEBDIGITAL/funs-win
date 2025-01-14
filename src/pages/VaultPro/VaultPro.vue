<template>
	<view :style="theme" class="page_boxs">
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('VaultPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		
		
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->
		
		<pagesNavTitle ref="" :title="$t('VaultPage.title')"></pagesNavTitle>
		<view class="page_wrap">

			<!-- <view class="tabs_box">
				<view class="tabs_item" v-for="(item,index) in TabsList" :key="index" @click="clicktabs(index)">
					<view class="item_name" :class="tabsidx == index?'xzuanzhong':''">{{item.name}}</view>
					<view class="item_mask" v-if="tabsidx == index"></view>
					<view class="item_border" v-if="tabsidx == index"></view>
				</view>
			</view> -->
			

			<view class="tabs_sm">
				<view :class="tabsidx == 0?'curbg':''" @click="clicktabs(0)">{{$t('VaultPage.TransferIn')}}</view>
				<view :class="tabsidx == 1?'curbg':''" @click="clicktabs(1)">{{$t('VaultPage.TransferOut')}}</view>
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
					
					<image class="" src="/static/image/currency_coins.png" v-if="platform == 8 || platform == 10 || platform == 11"></image>
					<image class="" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
					<image class="" src="/static/image/jinbi-3.png" v-else></image>
					
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
		
		<!-- </uni-transition> -->
		
		<Fun-Password ref="funpassword" :type="1" @UpUserinfo="Upuserinfo"></Fun-Password>
		
		<VaultPro-Fun-Password ref="inputFunPass" @GetpayPassword="GetPayPassword"></VaultPro-Fun-Password>
		
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				platform: this.PID,
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
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
		},
		onShow() {
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				this.getMybalance()
				this.GetuserInfo()
				this.isJinZhi_BXX()
				uni.$emit('ZhuRulookBenDihb', 1);
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
				uni.navigateTo({
					url: '/pages/Transaction/Transaction'
				})
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
	.page_wrap {
		//height: calc(100vh);
		padding: 20rpx 20rpx;
		height: 100%;
		background-color: $body-bg-color !important;
	}
	
	.tabs_sm {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $all-secondary-color;
		border-radius: 19rpx;
		margin: 15rpx 0 35rpx 0;
		padding: 10rpx;
	
		view {
			font-weight: bold;
			color: #54647d;
			flex: 1;
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
		}
	
		.curbg {
			background-color: #2283f6 !important;
			color: #ffffff !important;
			border-radius: 14rpx;
		}
	}
	
	.zhangao {
		height: 100rpx;
		background-color: $body-bg-color;
	}
	
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
			padding: 40rpx 30rpx;
			display: flex;
			align-items: center;
			border-radius: 18rpx;

			image {
				width: 54.86rpx;
				height: 54.86rpx;
			}

			.Vault_Pro_Balance_t {
				padding-left: 30rpx;

				.Vault_Pro_Balancc {
					color: $font-all-color;
					font-size: 26rpx;
					margin-bottom: 6rpx;
				}

				.Vault_Pro_Balance_b {
					display: flex;
					align-items: flex-end;

					view:nth-child(1) {
						color: #007aff;
						font-size: 34rpx;
					}

					view:nth-child(2) {
						color: #007aff;
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
			border: 1px solid $vaultpro-maxbtn-border;
			border-radius: 20rpx;
			height: 100rpx;

			.input_srk {
				padding: 0 20rpx;
				flex: 1;
			}

			.input_max {
				background-color: $vaultpro-maxbtn-bgcolor;
				height: 70rpx;
				line-height: 70rpx;
				padding: 0 30rpx;
				color: $vaultpro-maxbtn-fontcolor;
				font-size: 24rpx;
				position: relative;
				right: 16rpx;
				border-radius: 15rpx;
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
				height: 27px;
				width: 100%;
				background-image: linear-gradient(to top, rgb(34, 61, 82), rgb(13, 19, 28));
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
				background-color: #007aff;
				z-index: 2;
			}
		}
	}
</style>