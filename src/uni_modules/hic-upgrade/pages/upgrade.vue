<template>
	<view :style="theme" class="hic-upgrade">
		<view class="hic-upgrade__content">
			<view class="content-body">
				<view class="logo_box">
					<image src="../../../static/logo.png"></image>
				</view>
				<view v-if="subTitle" class="sub-title">{{ subTitle }}</view>
				<scroll-view v-if="serverInfo.desc" class="desc-scroll" scroll-y>
					<text>{{ serverInfo.desc }}</text>
				</scroll-view>
				<view class="content-footer">
					<template v-if="isiOS">
						<!-- ios -->
						<button class="btn" @click="jumpToAppStore">{{ btnTextiOS }}</button>
					</template>
					<template v-else>
						<!-- android -->
						<template v-if="!downloadSuccess">
							<!-- 下载包 -->
							<template v-if="!downloading">
								<!-- 下载按钮 -->
								<button class="btn" @click="downloadPackage">{{ btnTextDownLoad }}</button>
							</template>
							<template v-else>
								<!-- 下载中 -->
								<view class="progress-box">
									<progress class="progress" :border-radius="35" :percent="downLoadPercent" :active-color="progressColor" show-info stroke-width="10" />
									<!-- <view class="progress-text">
										<text>{{ downLoadingText }}</text>
										<text>({{ downloadedSize }} / {{ packageFileSize }} M)</text>
									</view> -->
								</view>
							</template>
						</template>
						<template v-else>
							<!-- 下载完成 -->
							<template v-if="!installed">
								<!-- 安装 -->
								<template v-if="!installing">
									<!-- 安装按钮 -->
									<button class="btn" @click="installPackage">{{ btnTextInstall }}</button>
								</template>
								<template v-else>
									<!-- 正在安装 -->
									<button class="btn" loading disabled plain><span style="color: #fff;">{{ installText }}</span></button>
								</template>
							</template>
							<template v-else>
								<!-- 重启 -->
								<button class="btn" @click="restart">{{ btnTextRestart }}</button>
							</template>
						</template>
					</template>
				</view>
			</view>
		</view>
		<!-- <image v-if="!forceUpdate" class="hic-upgrade__close" src="../images/app_update_close.png" @click="closeUpdate"></image> -->
	</view>
</template>

<script>
	import * as utils from '../utils/index.js';
	import NotifiUtil from '../utils/NotifiUtil.js';
	import config from '../config.js';
	import * as storage from '@/uni_modules/hic-plugin/js_sdk/storage/storage.js';
	import modal from '@/uni_modules/hic-plugin/js_sdk/message/modal.js';
	import toast from '@/uni_modules/hic-plugin/js_sdk/message/toast.js';
	import { navigateBack } from '@/uni_modules/hic-plugin/js_sdk/tools/uniTools.js';
	export default {
		name: 'HicUpgrade',
		data() {
			return {
				updateInfo: {
					update: false,
					type: '',
					url: ''
				},
				serverInfo: {
					version: '',
					versionCode: 0,
					downloadUrl: '',
					wgtUrl: '',
					forceUpdate: false,
					isSilently: false,
					desc: '1. 更新内容'
				},
				
				title: config.title,
				subTitle: config.subTitle,
				btnTextiOS: config.btnTextiOS,
				btnTextDownLoad: config.btnTextDownLoad,
				downLoadingText: config.downLoadingText,
				btnTextInstall: config.btnTextInstall,
				installText: config.installText,
				btnTextRestart: config.btnTextRestart,
				
				// 下载
				downloadSuccess: false,
				downloading: false,
				downLoadPercent: 0,
				downloadedSize: 0,
				packageFileSize: 0,
				task: null,
				
				// 安装
				installForBeforeFilePath: false,	// 从之前下载安装
				filePath: '',	// 要安装的本地包地址
				installed: false,
				installing: false,
				
				// 进度条颜色
				progressColor: config.progressColor
			}
		},
		computed: {
			forceUpdate() {
				if (this.serverInfo && this.serverInfo.forceUpdate) {
					return this.serverInfo.forceUpdate;
				}
				return false;
			},
			isWGT() {
				return this.updateInfo.type === 'wgt';
			},
			isiOS() {
				if (this.isWGT) {
					return false;
				}
				return utils.platform === 'ios';
			}
		},
		async onLoad() {
			this.updateInfo = utils.getUpdateInfo();
			this.serverInfo = utils.getServerVersion();
			
			this.checkLocalStoragePackage();
		},
		onBackPress(event) {
			// 监听页面返回
			console.log('--- onBackPress 监听页面返回 --->', event);
			if (this.forceUpdate) {
				// 强制更新不允许返回
				return true;
			}
			if (event.from == 'backbutton') {
				// 来源: 左上角返回按钮或 Android 实体返回键
				this.closeUpdate();	// 通过函数判断是否返回上一级页面
				return true;
			}
		},
		methods: {
			jumpToAppStore() {
				utils.updateForIOS();
			},
			async checkLocalStoragePackage() {
				if (!config.localStorageKey) return;
				// 是否有缓存 如果已经有下载好的包
				const data = await storage.getStorage(config.localStorageKey);
				if (data) {
					if (utils.isUpdate(data)) {
						// 删除包
						await this.removeSavedFile(data.url);
						this.downloadSuccess = false;
						this.filePath = '';
					} else {
						// 直接提示安装
						console.log('--- 已下载安装包 --->', data);
						this.downloadSuccess = true;
						this.filePath = data.url;
						this.installForBeforeFilePath = true;
					}
				}
			},
			downloadPackage() {
				this.downloading = true;
				
				const appName = config.appName;
				const progressObj = {};
				if (config.notify) {
					// 通知栏显示下载进度
					NotifiUtil.setNotification(appName, '开始下载!');
					if (Array.isArray(config.NotificationProgress) && config.NotificationProgress.length) {
						// 指定进度第一次出现时更新 通知栏显示的下载进度
						config.NotificationProgress.forEach(item => {
							const key = String(item);
							progressObj[key] = { progress: item, isFirst: true };
						});
					}
				}
				const handleFail = () => {
					// 下载失败处理函数
					uni.showToast({ title: '下载失败，请手动去站点下载安装，错误码: ' + res.statusCode, icon: 'none' });
					if (config.notify) {
						NotifiUtil.compProgressNotification(appName, '下载失败!');
					}
				}
				this.task = uni.downloadFile({
					url: this.updateInfo.url,
					success: (res) => {
						if (res.statusCode === 200) {
							this.downloadSuccess = true;
							this.filePath = res.tempFilePath;	// 临时文件路径
							
							if (this.forceUpdate || config.directInstall) {
								// 强制更新 直接安装
								this.installPackage();
							}
						} else {
							handleFail();
						}
					},
					fail: (err) => {
						console.log(err);
						handleFail();
					},
					complete: () => {
						this.downloading = false;
						this.task = null;
						
						this.downLoadPercent = 0;
						this.downloadedSize = 0;
						this.packageFileSize = 0;
						
						if (config.notify) {
							NotifiUtil.clearNotification();	// 清除通知栏信息
						}
					}
				});
				this.task.onProgressUpdate((res) => {
					// 监听下载进度变化
					const pro = res.progress
					this.downLoadPercent = pro;
					this.downloadedSize = (res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2);
					this.packageFileSize = (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2);
					if (progressObj[pro]) {
						const item = progressObj[pro];
						if (item.isFirst) {
							NotifiUtil.setProgress(pro, appName);
							item.isFirst = false;
						}
					}
				});
			},
			removeSavedFile(filePath) {
				return new Promise((resolve, reject) => {
					// 删除缓存
					storage.removeStorageSync(config.localStorageKey);
					// 删除文件
					uni.removeSavedFile({
						filePath,
						success: () => {
							resolve();
						},
						fail: (err) => {
							console.log(err)
							resolve();
						}
					});
				});
			},
			async closeUpdate() {
				console.log('--- closeUpdate --->');
				if (this.forceUpdate) {
					// 强制更新
					if (this.downloading) {
						toast('下载中， 请稍后...');
					}
					return;
				}
				if (this.downloading) {
					await modal({ title: '是否取消下载？' });
					this.task && this.task.abort();	// 中断下载任务
					navigateBack();
					return;
				}
				if (this.downloadSuccess && this.filePath) {
					// 下载完成 稍后安装 包保存本地
					await this.saveFile();
					navigateBack();
					return;
				}
				navigateBack();
			},
			async saveFile() {
				const data = {
					version: this.serverInfo.version,
					versionCode: this.serverInfo.versionCode,
					url: this.filePath
				};
				await storage.setStorage(config.localStorageKey, data);
			},
			installPackage() {
				// 安装
				this.installing = true;
				utils.installForAndroid(this.filePath).then(() => {
					this.installing = false;
					this.installed = true;
					if (this.forceUpdate || config.directRestart) {
						// 强制更新 直接重启
						//this.restart();
					}
				}).catch(async (err) => {
					// 安装失败
					if (this.installForBeforeFilePath) {
						// 安装之前的包 -> 删除之前的包
						await this.removeSavedFile(this.filePath);
						this.installForBeforeFilePath = false;
					}
					// 安装失败 重新下载安装包
					this.downloadSuccess = false;
					this.installing = false;
					this.installed = false;
					
					await modal({
						title: '更新失败，请重新下载',
						content: (err || {}).message || '',
						showCancel: false
					});
					navigateBack();
				});
				if (!this.isWGT) {
					// 非 wgt 包, 直接返回上一页
					// navigateBack();
				}
			},
			restart() {
				// 重启
				utils.restartForAndroid();
			}
		}
	}
</script>

<style>
page {
	background-color: rgba(0,0,0,0.4);
}
</style>
<style lang="scss" scoped>
@import '../theme.scss';
	
.hic-upgrade {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	&__content {
		width: 600rpx;
		.content-top {
			position: relative;
			z-index: 1;
			image {
				width: 100%;
				height: 270rpx;
			}
			&__text {
				position: absolute;
				top: 120rpx;
				left: 50rpx;
				color: #94a3c0;
				font-size: $font-xl;
				font-weight: bold;
			}
		}
		$distance: 50rpx;
		$padding: 40rpx;
		.content-body {
			transform: translateY(-$distance);
			min-height: 300rpx;
			padding: $padding;
			padding-top: $distance + 10rpx;
			background-color: $pupUp-bg-color;
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			border-top-right-radius: 30rpx;
			border-top-left-radius: 30rpx;
			.logo_box {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 30rpx;
				image {
					width: 130rpx;
					height: 130rpx;
					border-radius: 16rpx;
				}
			}
			.sub-title {
				font-size: $font-lg;
				font-weight: bold;
				color: $hic-upgrade-subtitle;
				padding: 20rpx 0;
			}
			.desc-scroll {
				box-sizing: border-box;
				padding: 0 40rpx;
				//height: 200rpx;
				text-align: left;
				line-height: 1.4;
				text {
					font-size: 26rpx;
					color: #94a3c0;
				}
			}
			.content-footer {
				margin: 40rpx 20rpx 0;
				.progress-box {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #94a3c0 !important;
					border-radius: 200rpx !important;
					.progress {
						width: 90%;
						height: 40rpx;
						border-radius: 200rpx !important;
						color: #94a3c0 !important;
						.progress-text {
							width: 100%;
							font-size: 24rpx !important;
							display: flex;
							justify-content: space-around;
							color: #94a3c0 !important;
						}
					}
				}
			}
		}
	}
	&__close {
		margin-top: 40rpx;
		width: 70rpx;
		height: 70rpx;
	}
}
.btn {
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	padding: 0 40rpx;
	color: $hic-upgrade-btn-color;
	background: $hic-upgrade-btn-bg-color;
	box-sizing: border-box;
	overflow: visible;
	border: 0;
	border-radius: 18rpx;
	text-decoration: none;
	transform: translate(0rpx, 0rpx);
	position: relative;
	font-size: 28rpx !important;
	&::after {
		display: none;
	}
}
</style>
