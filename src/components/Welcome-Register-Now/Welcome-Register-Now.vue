<template>
	<view :style="theme" class="RegisterNowshow_wrap_page">

		<view v-model="RegisterNowshow" width="100%" mode="top" :mask="false" border-radius="0" :mask-close-able="true" :closeable="false" @open="Taskshowopen" @close="RegisterNowclose">
			<view class="RegisterNowshow_wrap" :style="{paddingTop: Topheight}">
				<view class="RegisterNowshow_box">
					<view class="close_icon" @click="Guanbi()"><u-icon name="close" color="#ffffff"></u-icon></view>
					<view class="RegisterNowshow_wean">
						<image src="/static/image/yindaoReg.png"></image>
						<view class="wenan_text">
							<view>{{$t('WelcomePackgePopup.Packge')}}</view>
							<view>{{$t('WelcomePackgePopup.prompt')}}</view>
						</view>
					</view>
					<view class="reg_btn" @click="Toregac()"><span>{{$t('WelcomePackgePopup.RegBTN')}}</span></view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name: "Welcome-Register-Now",
		data() {
			return {
				RegisterNowshow: false,
				secondnum: 0,
				timer: null,
				
				//#ifdef APP-PLUS
				Topheight: '40px',
				//#endif
				
				//#ifdef H5
				Topheight: '15px',
				//#endif
				
			};
		},
		created() {
			let that = this
			
			uni.$on('GuanBiYinDaoReg', (val) => {
				that.Guanbi();
			});
			
			//#ifdef H5
			if (window.navigator.standalone == true) {
				//alert('IOS-是从桌面中打开的')
				that.Topheight = '15px' //写了54后通过描述文件安装的会导致据顶部很多'54px'
			} else if (window.matchMedia("(display-mode: standalone)").matches) {
				//alert('android-是从桌面中打开的')
				that.Topheight = '15px'
			} else {
				//就是浏览器里面打开的
				that.Topheight = '15px'
			}
			//#endif
			
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				//未登录进来300秒后显示注册引导
				that.timer = setInterval(() => {
					that.secondnum++
					if (that.secondnum >= 30) {
						that.RegisterNowshow = true
						that.$emit('RegisterNowOpen',1)
					}
				}, 1000)
			} else {
				
			}
		},
		mounted() {

		},
		methods: {
			hideRegisterNowRefs(){
				let that = this
				that.RegisterNowshow = false
				//console.log('清空计时器')
				clearInterval(that.timer);
				that.timer = null;
			},
			Taskshowopen() {

			},
			RegisterNowclose(){
				let that = this
				//console.log('清空计时器')
				clearInterval(that.timer);
				that.timer = null;
			},
			Guanbi(){
				let that = this
				that.RegisterNowshow = false
				//console.log('清空计时器')
				clearInterval(that.timer);
				that.timer = null;
				
				that.$emit('RegisterNowClose',0)
				
			},
			Toregac(){
				let that = this
				//console.log('清空计时器')
				clearInterval(that.timer);
				that.timer = null;
				that.RegisterNowshow = false
				
				that.$emit('RegisterNowClose',1)
			}
		}
	}
</script>

<style lang="scss">
	.RegisterNowshow_wrap_page {
		/deep/ .u-drawer-top {
			background-color: transparent !important;
		}
	}
	

	.RegisterNowshow_wrap {
		background-color: transparent;
		padding: 30rpx;

		.RegisterNowshow_box {
			border-radius: 30rpx;
			background: linear-gradient(80deg, #5720c6 0%, #841fca 100%);
			width: 100%;
			position: relative;
			padding: 0 0 35rpx 0;

			.close_icon {
					cursor: pointer;
				padding: 0 25rpx 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.u-icon {
					position: relative;
					top: 14px;
					font-size: 30rpx;
					color: #ffffff;
					background-color: rgba(0, 0, 0, 0.35);
					padding: 10rpx;
					border-radius: 10rpx;
				}
			}

			.RegisterNowshow_wean {
				display: flex;
				align-items: flex-start;
				padding: 0 30rpx 0 20rpx;
				margin-bottom: 12px;
				image {
					width: 180rpx;
					height: 130rpx;
				}

				.wenan_text {
					color: #decaff;
					flex: 1;
					view:nth-child(1) {
						color: #ffffff;
						font-weight: bold;
						font-size: 38rpx;
						margin-bottom: 10rpx;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}

					view:nth-child(2) {
						font-size: 28rpx;
						// word-break: break-all;
						// display: -webkit-box;
						// -webkit-line-clamp: 2;
						// -webkit-box-orient: vertical;
						// overflow: hidden;
					}
				}
			}
			.reg_btn {
				cursor: pointer;
				position: relative;
				width: 88%;
				margin: 0 auto;
				span {
					width: 100%;
					color: #ffffff;
					display: inline-block;
					background-color: #2c62f4;
					background: linear-gradient(1turn, #2c62f4 .8%, #1398f9);
					box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
					border-radius: 10px;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					position: relative;
					z-index: 2;
					font-weight: bold;
					
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
				height: 80rpx;
				background-color: #003293;
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
</style>