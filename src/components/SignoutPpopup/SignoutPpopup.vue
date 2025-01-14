<template>
	<view :style="theme">

		<u-popup v-model="SignoutShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="SignoutShow = false">
				<view>{{$t('SignoutPopup.title')}}</view>
			</view>
			<view class="input_box">
				<view class="Agreement">
					<view>{{$t('SignoutPopup.prompt')}}</view>
				</view>
				<view class="Register_btn">
					<u-button type="error" @click="signOut()" :loading="btnStatus">{{$t('SignoutPopup.outBtn')}}</u-button>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	// import {
	// 	websocetObj
	// } from '@/utils/socket.js';
	export default {
		name: "SignoutPpopup",
		props: {

		},
		data() {
			return {
				btnStatus: false,
				Username: '',
				Password: '',
				confirmation: '',
				SignoutShow: false,
				placeholderStyle: "fontSize: 24rpx;",
				customStyle: {
					
				}
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
			openPopup() {
				this.SignoutShow = true
			},
			closewindows() {
				this.SignoutShow = false
			},
			signOut() {
				this.btnStatus = true
				setTimeout(() => {
					this.btnStatus = false
					//websocetObj.stop()
					
					//关闭wss链接
					uni.$emit('StartGuanBiWss', 1);
					
					uni.removeStorageSync('ADD-MYAPP-KEY-ONE');
					uni.removeStorageSync('userinfo');
					uni.removeStorageSync('token');
					uni.$emit("getinspectToken", 1)

					//#ifdef  H5
					//let self_url = 'http://' + document.domain + '/#/';
					//window.location.href = self_url
					uni.reLaunch({
						url: '/pages/index/index',
						success: function(res) {}
					})
					//#endif

					//#ifdef  APP-PLUS
					uni.reLaunch({
						url: '/pages/index/index'
					})
					//#endif

				}, 1500)
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
			}
		}

		.Agreement {
			margin-top: 10rpx;
			font-size: 28rpx;
			color: $font-all-color;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.Register_btn {
			width: 100%;
			margin: 40rpx auto 0;
			
			/deep/ uni-button {
				background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57) !important;
				box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30 !important;
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