<template>
	<view :style="theme" class="page_bg">
		<view class="info_box_wrap">
			<uni-row :gutter="30" class="demo-uni-row">
				<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<view class="info_box">
						<image class="logo" :src="'/static/logo/' + platform + '_logo.png'"></image>
						<view class="infto_1">{{$t('whtext1')}}</view>
						<view class="infto_2">{{$t('whtext2')}}</view>
						<view class="infto_3">
							<view>{{$t('whtext3')}}：{{$u.timeFormat(Datas.startTime, 'mm-dd hh:MM')}}</view>
							<view>{{$t('whtext4')}}：{{$u.timeFormat(Datas.endTime, 'mm-dd hh:MM')}}</view>
						</view>
						<view class="lxkf_box_wwwrap">
							<view class="lxkf_box" style="margin-right: 20rpx;" v-if="Datas.csEnabled == true"> <!-- -->
								<view class="zhuceBtn" @click="TochatUrl()">
									<view class="anniu">
										<view class="wwewnzi"><u-icon name="server-fill" color="#ffffff" size="28"></u-icon>{{$t('sidebar.title10')}}</view>
									</view>
								</view>
							</view>
							<view class="lxkf_box">
								<view class="zhuceBtntwo" @click="Shuaixin()">
									<view class="anniu">
										<view class="wwewnzi"><u-icon name="reload" color="#ffffff" size="28"></u-icon>{{$t('shuaxin')}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</uni-col>
				<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<view class="dhtu">
						<image src="/static/image/astronaut-36479586.png" mode="widthFix"></image>
					</view>
				</uni-col>
			</uni-row>
		</view>
		
		<pc-kefu ref="openKefu"></pc-kefu>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messages: '',
				Datas: {
					csEnabled: true,
					enable: true,
					endTime: 0,
					startTime: 0
				},
				platform: this.PID,
				is_Mobile: 1
			}
		},
		onLoad() {
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			// #ifdef H5 || WEB
			uni.setTopWindowStyle({
				display: 'none',
				height: '0'
			})
			uni.setLeftWindowStyle({
				display: 'none',
				width: '0'
			});
			// #endif
		},
		onReady() {
			let info = uni.getStorageSync("SystemMaintenanceData");
			this.messages = info.data.message
			this.Datas = info.data.data
			console.log('维护数据', this.Datas)
		},
		methods: {
			Shuaixin(){
				
				this.$refs.openKefu.closewindows()
				
				//#ifdef APP-PLUS
				uni.reLaunch({
					url: '/pages/index/index'
				});
				//#endif
				
				//#ifdef H5 || WEB
				//判断PC还是移动端
				const userAgent = navigator.userAgent.toLowerCase();
				if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(userAgent)) {
					// 移动端
					console.log('移动端')
					this.is_Mobile = 1
					uni.setTopWindowStyle({
						display: 'block',
						height: '59px'
					})
					uni.reLaunch({
						url: '/pages/index/index'
					});
				} else {
					// pc端
					console.log('PC端')
					this.is_Mobile = 0
					uni.setTopWindowStyle({
						display: 'block',
						height: '59px'
					})
					uni.setLeftWindowStyle({
						display: 'block',
						width: '230px'
					})
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}
				// #endif
				
				
			},
			TochatUrl() {
				let that = this
				const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
				that.$u.post('/game/chat', {
					pid: this.PID,
					lang: language
				}).then(res => {
					let chatUrl = res.data.chatUrl

					// // #ifdef APP-PLUS
					// plus.runtime.openURL(chatUrl);
					// // #endif

					// // #ifdef H5
					// window.location.href = chatUrl;
					// // #endif
					
					
					// #ifdef APP-PLUS
					plus.runtime.openURL(chatUrl);
					// #endif
					
					// #ifdef H5
					let windowWidth = uni.getSystemInfoSync().windowWidth
					if (windowWidth >= "800") {
						that.$refs.openKefu.openPopup(chatUrl);
					} else {
						window.location.href = chatUrl;
					}
					// #endif

				});
			},
		}
	}
</script>

<style lang="scss">
	page {}
	
	.lxkf_box_wwwrap {
		text-align: center;
	}

	.page_bg {
		width: 100%;
		height: 100%;
		background-image: url('/static/image/bg-500-2617af58.png');
		background-position: center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999999999;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		background-size: cover;
		background-position: center;
		padding: 10% 10%;

		.info_box_wrap {
			width: 100%;
			margin: 0 auto;
		}

		.info_box {
			text-align: center;

			.logo {
				width: 170rpx;
				height: 170rpx;
				border-radius: 12px;
				margin: 0 auto 2.5rem;
			}

			.infto_1 {
				color: #fff;
				text-align: center;
				font-size: 28rpx;
				margin-bottom: .625rem;
			}

			.infto_2 {
				padding: 0 20rpx;
				color: #fff;
				text-align: center;
				font-size: 28rpx;
			}
			
			.infto_3 {
				margin-top: 80rpx;
				padding: 0 20rpx;
				color: #c0b6d2;
				text-align: center;
				font-size: 24rpx;
				span:nth-child(1){
					
				}
				span:nth-child(2){
					margin: 0 15rpx;
				}
				span:nth-child(3){
					
				}
			}

			.lxkf_box {
				display: -webkit-inline-box;
				align-items: center;
				justify-content: center;
				margin-top: 1.275rem;
			}
		}

		.dhtu {
			margin-top: 3.75rem;
			width: 100%;

			image {
				width: 100%;
				max-width: 100%;
				animation: astronaut-floating 1.5s infinite linear;
			}
		}
	}
	
	.zhuceBtntwo {
		position: relative;
		
		.anniu {
			color: #fff;
			background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
			box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
			border-radius: 12px;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			padding: 0 54rpx;
			position: relative;
			z-index: 2;
			cursor: pointer;
			font-weight: bold;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		
			.wwewnzi {
				display: flex;
				align-items: center;
		
				.u-icon {
					margin-right: 8rpx;
				}
			}
		}
	}
	.zhuceBtntwo:after {
		padding: 0 54rpx;
		border-radius: 12px;
		height: 80rpx;
		background-color: #61001d;
		bottom: -3px;
		content: "";
		display: block;
		left: 0;
		right: 0;
		margin: 0 auto;
		pointer-events: none;
		position: absolute;
		right: 0;
		z-index: 1;
	}
	
	.zhuceBtn {
		position: relative;

		.anniu {
			color: #fff;
			background-color: #3673D9;
			background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			border-radius: 12px;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			padding: 0 54rpx;
			position: relative;
			z-index: 2;
			cursor: pointer;
			font-weight: bold;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;

			.wwewnzi {
				display: flex;
				align-items: center;

				.u-icon {
					margin-right: 8rpx;
				}
			}
		}
	}

	.zhuceBtn:after {
		padding: 0 54rpx;
		border-radius: 12px;
		height: 80rpx;
		background-color: #003293;
		bottom: -3px;
		content: "";
		display: block;
		left: 0;
		right: 0;
		margin: 0 auto;
		pointer-events: none;
		position: absolute;
		right: 0;
		z-index: 1;
	}

	@keyframes astronaut-floating {
		0% {
			transform: translateZ(0);
			rotate: 0deg
		}

		25% {
			transform: translate3d(0, 5%, 0);
			rotate: 6deg
		}

		75% {
			transform: translate3d(0, -5%, 0);
			rotate: 3deg
		}

		to {
			transform: translateZ(0);
			rotate: 0deg
		}
	}

	@media (min-width: 800px) {
		.page_bg .dhtu {
			margin-top: 0;
		}

		.demo-uni-row {
			display: flex;
			align-items: center;
		}

		.page_bg .dhtu image {
			width: 80%;
		}

		.page_bg .info_box .infto_1 {
			font-size: 1.25rem;
		}

		.page_bg .info_box .infto_2 {
			font-size: 1.25rem;
		}
	}
</style>