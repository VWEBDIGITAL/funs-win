<template>
	<view :style="theme">

		<u-popup v-model="EmailShow" width="650" mode="center" close-icon-size="30" border-radius="14"
			:mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="EmailShow = false">
				<view>{{$t('ADDnew.WithDea')}}</view>
			</view>


			<view class="input_box">
				<view class="tishini">
					<p>{{$t('ADDnew.TIPS')}}</p>
				</view>

				<view class="queren_box">
					<view class="queren_box_item">
						<view class="queren_box_item_title">{{$t('ADDnew.WithACC')}}</view>
						<view class="item_box">
							
							<image class="image" :src="payIconUrl + '/pay/' + Morentype + '.png'"></image>
							
							<view class="val">{{TixianAccount}}</view>
						</view>
					</view>
					<view class="queren_box_item">
						<view class="queren_box_item_title">{{$t('ADDnew.WithAmo')}}</view>
						<view class="item_box">
							<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8" mode=""></image>
							<image class="rank_icon" src="/static/image/coin-yuan_cny.png" mode="" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
							<image class="rank_icon" src="/static/image/jinbi-3.png" mode="" v-else></image>
							<view class="val">{{TixianAmount}}</view>
						</view>
					</view>
					<view class="queren_box_item">
						<view class="queren_box_item_title">{{$t('yujidaozhang')}}</view>
						<view class="item_box">
							<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8" mode=""></image>
							<image class="rank_icon" src="/static/image/coin-yuan_cny.png" mode="" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
							<image class="rank_icon" src="/static/image/jinbi-3.png" mode="" v-else></image>
							<view class="val">{{TixianSxf}}</view>
						</view>
					</view>
				</view>


				<!--<view class="info_box">
					<image src="/static/image/password_fund.png"></image>
					<view>Verify Fund Password</view>
				</view>-->

				<view class="input_item">
					<view class="input_item_title">{{$t('fundPasswordPopup.Confirmpassword')}} *</view>
					<view class="input_item_true">
						<!-- <u-message-input :disabled-keyboard="false" @change="change1" @finish="finish" :dot-fill="true" active-color="#3673d9" width="88" font-size="24" :maxlength="6"></u-message-input> -->
						<My-Password-Code ref="pwd" :maxlength="6" :isPwd="true" @finish="getPwd"></My-Password-Code>
					</view>
				</view>
				<view class="Register_btn">
					<view class="reg_btn" @click="Confirm()"><span>{{$t('popupbtn')}}</span></view>
				</view>
			</view>


		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "input-Fun-Password",
		props: {
			PayType: {
				type: [Object, String],
				default: null
			},
			Morentype: {
				type: [String, Number],
				default: 0
			},
			TixianAccount: {
				type: [Object, String],
				default: null
			},
			TixianAmount: {
				type: [String, Number],
				default: 0
			},
			TixianSxf: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				platform: this.PID,
				payIconUrl: '',
				Email: '',
				EmailShow: false,
				placeholderStyle: "fontSize: 24rpx;",
				customStyle: {
					
				},
				funPassword1: '',
			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			this.payIconUrl = uni.getStorageSync('Musicdomains');
		},
		mounted() {

		},
		methods: {
			openPopup() {
				this.funPassword1 = ''
				this.EmailShow = true
			},
			closewindows() {
				this.EmailShow = false
			},
			change1(e) {
				//console.log('输入中', e)
				this.funPassword1 = e
			},
			finish(e) {
				//console.log('输入完成', e)
				//this.$emit('GetpayPassword',this.funPassword1)
				//this.EmailShow = false
			},




			Confirm() {
				if (this.funPassword1 == "") {
					uni.showToast({
						title: this.$t('opoupToast.password'),
						icon: 'none'
					})
				} else if (this.funPassword1.length < 6) {
					uni.showToast({
						title: 'Please enter a 6-digit password',
						icon: 'none'
					})
				} else {
					this.$emit('GetpayPassword', this.funPassword1)
					this.EmailShow = false
				}
			},
			
			
			
			
			
		
			//获取密码
			getPwd(val) {
				//console.log(val);
				this.funPassword1 = val
			},
			// 清空验证码
			clearCode() {
				this.$refs.code.clear();
			},
			// 清空密码
			clearPwd() {
				this.$refs.pwd.clear();
			}
			
			
			
			


		}
	}
</script>

<style lang="scss">
	/deep/ .u-char-flex {
		justify-content: space-between !important;
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
		
		padding: 30rpx 30rpx 0 30rpx;

		.queren_box {
			.queren_box_item {
				margin: 30rpx 0;

				.queren_box_item_title {
					color: #96a9ce;
					margin-bottom: 6rpx;
				}

				.item_box {
					display: flex;
					align-items: center;
					background-color: #0c1117;
					border-radius: 20rpx;
					border: 1px solid #2d3544;
					padding: 0 20rpx;
					height: 100rpx;
					line-height: 100rpx;

					.image {
						width: 55rpx;
						height: 55rpx;
					}

					.huobifu {
						color: #8197bc;
						font-size: 30rpx;
					}

					.val {
						flex: 1;
						color: #8197bc;
						padding-left: 14rpx;
						font-size: 24rpx;
						word-break:break-all;
						display:-webkit-box;
						-webkit-line-clamp:1;
						-webkit-box-orient:vertical;
						overflow:hidden;
					}
				}
			}
		}

		.tishini {
			margin-bottom: 30rpx;

			p {
				color: #4e628a;
				font-size: 26rpx;
			}
		}

		.info_box {
			text-align: center;
			margin: 20rpx 0 60rpx 0;

			image {
				width: 94.44rpx;
				height: 110rpx;
			}

			view:nth-child(2) {
				font-size: 30rpx;
				color: $all-secondary-text-color;
				margin: 20rpx 0 15rpx;
				//font-weight: bold;
			}

			view:nth-child(3) {
				color: $font-all-color;
			}
		}

		.input_item {
			margin-bottom: 30rpx;

			.input_item_title {
				//padding-left: 13rpx;
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-size: 28rpx;
			}

			.input_item_true {}
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
			margin: 40rpx auto 40rpx;
			cursor: pointer;

			.reg_btn {
				position: relative;
				width: 100%;
				margin: 0 auto;

				span {
					width: 100%;
					color: $all-secondary-text-color;
					display: inline-block;
					background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
					box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
					border-radius: 10px;
					height: 90rpx;
					line-height: 90rpx;
					text-align: center;
					position: relative;
					z-index: 2;


					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			}

			.reg_btn:after {
				width: 100%;
				border-radius: 10px;
				height: 90rpx;
				background-color: #61001d;
				bottom: -3px;
				content: "";
				display: block;
				left: 0;
				margin: 0 auto;
				pointer-events: none;
				position: absolute;
				right: 0;
				z-index: 1;
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