<template>
	<view :style="theme">

		<u-popup v-model="DepositoAdvShow" width="650" mode="center" close-icon-size="30" border-radius="14" @close="Advclose" :mask="true" :mask-close-able="false" :closeable="false">
			<!-- <view class="reg_title" @click="DepositoAdvShow = false">
				<view>Successful</view>
			</view>
			<view class="input_box">
				<view class="okimg">
					<image src="/static/image/badge_verification.png"></image>
				</view>
				<view class="Agreement">
					<view>Matagumpay kang nakarehistro, paki-verify ang</view>
					<view>impormasyon ng iyong account.</view>
				</view>
				
				<view class="deposito_adv">
					<image src="/static/image/deposito_adv.png"></image>
				</view>
				
				<view class="Register_btn">
					<u-button type="primary" @click="ToDeposito()" :loading="btnStatus">Pumunta sa Deposito</u-button>
				</view>
				
			</view> -->
			
			<view class="huodong">
				<image @click="Advclose()" class="hdguanbi" src="/static/image/hd_guanbi_icon.png"></image>
				<image @click="Tocuxiao()" class="hdtu" src="/static/image/huodong.png" mode="widthFix"></image>
			</view>
			
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "DepositoAdv",
		props: {

		},
		data() {
			return {
				btnStatus: false,
				DepositoAdvShow: false,
			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			// let that = this
			// let OpenDepositoAdvShow = uni.getStorageSync("OpenDepositoAdvShow")
			// if(OpenDepositoAdvShow == 1){
			// 	//this.$refs.DepositoAdvOpen.openPopup()
			// 	that.DepositoAdvShow = true
			// }
		},
		mounted() {

		},
		methods: {
			openPopup() {
				this.DepositoAdvShow = true
			},
			closewindows() {
				this.DepositoAdvShow = false
			},
			Advclose(){
				this.DepositoAdvShow = false
				uni.setStorageSync("OpenDepositoAdvShow", 0)
			},
			Tocuxiao(){
				this.DepositoAdvShow = false
				uni.setStorageSync("OpenDepositoAdvShow", 0)
				uni.navigateTo({
					url: '/pages/Bonus/Bonus'
				})
			},
			ToDeposito(){
				this.btnStatus = true
				setTimeout(() => {
					this.btnStatus = false
					this.DepositoAdvShow = false
					uni.setStorageSync("OpenDepositoAdvShow", 0)
					uni.switchTab({
						url: '/pages/Wallet/Wallet'
					})
				}, 1500)
			}
			
		}
	}
</script>

<style lang="scss">
	/deep/ .u-mode-center-box {
		background-color: transparent !important;
	}
	.huodong {
		position: relative;
		.hdguanbi {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 20rpx;
			top: 0;
			z-index: 9999;
		}
		.hdtu {
			width: 100%;
		}
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
		
		.okimg {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 30px auto 42px;
			width: 130rpx;
			height: 130rpx;
			text-align: center;
			image {
				width: 130rpx;
				height: 130rpx;
			}
		}

		.Agreement {
			margin-top: 30px;
			font-size: 28rpx;
			color: $font-all-color;
			text-align: center;
			view:nth-child(1){
				
			}
			view:nth-child(2){
				text-decoration: underline;
			}
		}

		.Register_btn {
			width: 66.5%;
			margin: 38px auto 24px;
		}
		.deposito_adv {
			margin: 40px 0 0 0;
			image {
				width: 100%;
				height: 250rpx;
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