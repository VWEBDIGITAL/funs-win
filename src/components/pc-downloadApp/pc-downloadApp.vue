<template>
	<view :style="theme">



		<view class="mask_ceng" v-show="showdlPopup" @click="showdlPopup = false" hover-stop-propagation
			@touchmove.stop.prevent="() => {}"></view>
		<uni-transition class="qiliuba_hylb" :mode-class="['fade', 'zoom-in']" :show="showdlPopup">
			<view class="dl_wrap">
				<view class="dl_wrap_box">
					<view class="left_box">
						<view class="sub_title">{{$t('ADDnew2.PleaseuseyourphonealbumtoscantheQRcodetodownload')}}
						</view>
						<view class="erweima">
							<image :src="dwappqrPath"></image>
						</view>
						<view class="zjxz">{{$t('ADDnew2.DirectDownload')}}</view>
						<view class="is_az_ios">
							<view class="az" @click="openurl(1)"><u-icon name="android-fill"
									color="#fff"></u-icon>{{$t('ADDnew2.Android')}}
							</view>
							<view class="az" @click="openurl(2)"><u-icon name="apple-fill"
									color="#fff"></u-icon>{{$t('ADDnew2.Apple')}}
							</view>
						</view>
						<!-- <view class="cplink">复制下载链接</view>
						<view class="linkUrl">https://test.hftxhs.com/K77IO.apk<image src="/static/image/fuzhi-4.png">
							</image>
						</view> -->
					</view>
					<view class="right_box">
						<view class="guanbi" @click="showdlPopup = false"><u-icon name="close" color="#fff"></u-icon>
						</view>
						<image src="/static/image/installapp_topbg.jpg" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</uni-transition>

	</view>
</template>

<script>
	export default {
		name: "pc-downloadApp",
		data() {
			return {
				showdlPopup: false,
				dwappqrPath: ''
			};
		},
		mounted() {

		},
		methods: {
			openShow() {
				this.dwappqrPath = uni.getStorageSync('dwappqrPath');
				this.showdlPopup = true
			},
			openurl(type) {
				//先复制渠道id安装后获取粘贴板
				let Codeid = 'pid' +  uni.getStorageSync('channel_id');
				uni.setClipboardData({
					data: Codeid,
					showToast: false,
					success: function() {}
				});
				if (type == 2) {
					//打开URL安装ios描述文件
					let url = uni.getStorageSync('ipaUrl');
					window.open(url, '_self');
				} else {
					//直接下载安卓APK
					let url = uni.getStorageSync('apkUrl');
					window.open(url, '_self');
				}
			}
		}
	}
</script>

<style lang="scss">
	.mask_ceng {
		position: fixed;
		z-index: 10070;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 auto;
		background-color: #000;
		opacity: .8;
		transition: transform 0.3s;
	}

	.qiliuba_hylb {
		position: fixed;
		z-index: 10071;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 auto;

		.dl_wrap {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 10072;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #17181b;
			border-radius: 28rpx;

			.dl_wrap_box {
				display: flex;
				align-items: center;
				justify-content: center;

				.left_box {
					padding: 30px 60px 30px 60px;

					.sub_title {
						color: #90939a;
						font-size: 24rpx;
					}

					.erweima {
						margin-top: 6px;

						image {
							width: 250rpx;
							height: 250rpx;
							padding: 20rpx;
							border-radius: 16rpx;
							background-color: #ffffff;
						}
					}

					.zjxz {
						margin-top: 40px;
						color: #90939a;
						font-size: 24rpx;
					}

					.is_az_ios {
						margin-top: 6px;
						display: flex;
						align-items: center;

						.az {
							cursor: pointer;
							background-color: #24262b;
							color: #fff;
							border-radius: 10rpx;
							padding: 18rpx 20rpx;
							width: 100px;
							text-align: center;
							font-size: 24rpx;
							margin-right: 10px;

							.u-icon {
								font-size: 32rpx;
								margin-right: 8rpx;
							}
						}
					}

					.cplink {
						margin-top: 40px;
						color: #90939a;
						font-size: 24rpx;
					}

					.linkUrl {
						margin-top: 6px;
						color: $all-secondary-text-color;
						font-size: 24rpx;
						background-color: #24262b;
						padding: 10rpx 10rpx;
						border-radius: 6rpx;
						display: flex;
						align-items: center;

						image {
							width: 30rpx;
							height: 30rpx;
							margin-left: 8rpx;
							cursor: pointer;
						}
					}
				}

				.right_box {
					position: relative;

					.guanbi {
						position: absolute;
						top: 24rpx;
						right: 24rpx;
						z-index: 2;
						cursor: pointer;

						.u-icon {
							font-size: 34rpx;
						}
					}

					image {
						width: 800rpx;
						border-radius: 28rpx;
					}
				}
			}
		}
	}
</style>