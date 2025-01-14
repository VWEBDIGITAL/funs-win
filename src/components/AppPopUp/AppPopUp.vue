<template>
	<view :style="theme">
		<u-popup v-model="Upshow" mode="bottom" border-radius="34" :mask-close-able="false">
			<view class="hic-upgrade">
				<view class="hic-upgrade__close" @click="closeUpdate" v-if="!forceUpdate">
					<u-icon name="close" color="#fff"></u-icon>
				</view>
				<view class="hic-upgrade__content">
					<view class="content-body">
						<view class="logo_box">
							<span>New</span>
							<image :src="'/static/logo/' + platform + '_mini_logo.png'"></image>
						</view>
						<view class="sub-title">V{{serverInfo.version}}</view>
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
											<u-line-progress :striped="true" :percent="downLoadPercent" :striped-active="true"></u-line-progress>
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
			</view>
		</u-popup>
	</view>
</template>

<script>
	import * as utils from '@/uni_modules/hic-upgrade/utils/index.js';
	import NotifiUtil from '@/uni_modules/hic-upgrade/utils/NotifiUtil.js';
	import config from '@/uni_modules/hic-upgrade/config.js';
	import * as storage from '@/uni_modules/hic-plugin/js_sdk/storage/storage.js';
	import modal from '@/uni_modules/hic-plugin/js_sdk/message/modal.js';
	
	export default {
		name: 'AppPopUp',
		data() {
			return {
				platform: this.PID,
				Upshow: false,
				updateInfo: {
					update: false,
					type: 'wgt',
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

				//title: config.title,
				//subTitle: config.subTitle,
				// btnTextiOS: config.btnTextiOS,
				// btnTextDownLoad: config.btnTextDownLoad,
				// downLoadingText: config.downLoadingText,
				// btnTextInstall: config.btnTextInstall,
				// installText: config.installText,
				// btnTextRestart: config.btnTextRestart,
				
				// iOS按钮
				btnTextiOS: this.$t('btnTextiOS'),
				// 下载按钮
				btnTextDownLoad: this.$t('btnTextDownLoad'),
				// 下载中提示文字
				downLoadingText: this.$t('downLoadingText'),
				// 安装按钮
				btnTextInstall: this.$t('btnTextInstall'),
				// 安装中提示文字
				installText: this.$t('installText'),
				// 重启按钮
				btnTextRestart: this.$t('btnTextRestart'),

				// 下载
				downloadSuccess: false,
				downloading: false,
				downLoadPercent: 0,
				downloadedSize: 0,
				packageFileSize: 0,
				task: null,

				// 安装
				installForBeforeFilePath: false, // 从之前下载安装
				filePath: '', // 要安装的本地包地址
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
		created() {
			
		},
		methods: {
			openPopup(tip){
				this.versionUpdate(tip)
			},
			async versionUpdate(tip) {
				let that = this
				
				// 1 请求返回服务端版本信息
				const res = await that.getLatestVersion();
				
				// const res = {
				// 	versionCode: '1.0.6',
				// 	downloadUrl: 'https://test.hftxhs.com/apk/pt5_1.0.6.apk',
				// 	wgtUrl: 'https://test.hftxhs.com/apk/pt5_1.0.6.wgt',
				// 	forceUpdate: false,
				// 	isSilently: false,
				// 	versionDesc: '1.主版本号不同进行整包更新, 其余进行热更新\n2.子版本号不同进行整包更新, 其余进行热更新\n3.补丁版本号不同进行整包更新, 其余进行热更新'
				// }
				
				console.log('1',res);
				
				//如果res不存在就提示无更新
				if (!res) {
					if (tip){
						uni.showToast({
							title: '暂无更新'
						})
					}
					return;
				}
				
				
				//把版本好的点去掉
				let vsname = parseInt(res.versionCode.replace(/\D/g, ''), 10);
				
				// 2 存储服务端版本信息
				utils.setServerInfo({
					version: res.versionCode,
					versionCode: vsname,
					downloadUrl: res.downloadUrl,
					wgtUrl: res.wgtUrl,
					forceUpdate: res.forceUpdate,
					isSilently: res.isSilently,
					desc: res.versionDesc
				});
				console.log('2',res)


				// 3 判断是否更新 //逻辑是本地版本号<线上版本号提示更新
				if (!utils.isUpdate()) {
					if (tip){
						uni.showToast({
							title: '已是最新版本'
						})
					}
					return;
				}
				
				
				const updateInfo = utils.getUpdateInfo();
				const info = utils.getServerVersion();
				
				console.log('3',updateInfo,info)
				// 4 wgt 静默更新
				if (updateInfo.type == 'wgt' && info.isSilently) {
					const path = await utils.downloadFile(updateInfo.url);
					// 下载完成 直接安装 下次启动生效
					await utils.installForAndroid(path);
					return;
				}
				//打开弹窗 提示更新
				that.Upshow = true;

				that.updateInfo = utils.getUpdateInfo();
				that.serverInfo = utils.getServerVersion();
				that.checkLocalStoragePackage();

			},
			async getLatestVersion() {
				let that = this
				const res = await that.$u.post('/client/version', {
					pid: that.PID, //Number 是 平台Id
					platform: utils.platform // 运行平台
				})
				return res.data;
			},




































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
							progressObj[key] = {
								progress: item,
								isFirst: true
							};
						});
					}
				}
				const handleFail = () => {
					// 下载失败处理函数
					uni.showToast({
						title: '下载失败，错误码: ' + res.statusCode,
						icon: 'none'
					});
					if (config.notify) {
						NotifiUtil.compProgressNotification(appName, '下载失败!');
					}
				}
				this.task = uni.downloadFile({
					url: this.updateInfo.url,
					success: (res) => {
						if (res.statusCode === 200) {
							this.downloadSuccess = true;
							this.filePath = res.tempFilePath; // 临时文件路径

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
							NotifiUtil.clearNotification(); // 清除通知栏信息
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
				console.log('--- closeUpdate --->',this.downloading);
				if (this.forceUpdate) {
					// 强制更新
					if (this.downloading) {
						uni.showToast({
							title: '下载中，请稍后...',
							icon: 'none',
							duration: 3000
						})
					}
					return;
				}
				if (this.downloading) {
					await modal({
						title: '是否取消下载？'
					});
					this.task && this.task.abort(); // 中断下载任务
					this.Upshow = false
					return;
				}
				if (this.downloadSuccess && this.filePath) {
					// 下载完成 稍后安装 包保存本地
					await this.saveFile();
					this.Upshow = false
					return;
				}
				this.Upshow = false
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
					this.Upshow = false
				});
				if (!this.isWGT) {
					// 非 wgt 包, 直接返回上一页
					this.Upshow = false
				}
			},
			restart() {
				// 重启
				utils.restartForAndroid();
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/uni_modules/hic-upgrade/theme.scss';
	/deep/ .u-drawer-bottom {
		background-color: $pupUp-bg-color !important;
	}
	.hic-upgrade {
		padding: 40rpx 0 60rpx 0;
		background-color: $pupUp-bg-color;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		
		.hic-upgrade__close {
			position: absolute;
			top: 0;
			right: 30rpx;
			width: 50rpx;
			height: 50rpx;
		}

		&__content {
			width: 100%;

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
			$padding: 40rpx 40rpx 0 40rpx;

			.content-body {
				padding: $padding;
				background-color: $pupUp-bg-color;

				.logo_box {
					width: 150rpx;
					height: 150rpx;
					margin: 0 auto 30rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					span {
						position: absolute;
						display: inline-block;
						top: -24rpx;
						right: -36rpx;
						// background-color: #3673D9;
						// background: linear-gradient(1turn,#0c5eff .8%,#1398f9);
						// box-shadow: 0 3px 28px #2283f666,inset 0 3px 3px #ffffff4d;
						
						background: linear-gradient(1turn, #1bb83d .8%, #1bb83d);
						box-shadow: 0 3px 16px #005413, inset 0 4px 3px #ffffff4d;
						
						border-radius: 10rpx 10rpx 10rpx 4rpx;
						padding: 2rpx 15rpx;
						color: #fff;
						font-size: 24rpx;
						z-index: 2;
					}
					image {
						width: 150rpx;
						height: 150rpx;
						border-radius: 20rpx;
					}
				}

				.sub-title {
					text-align: center;
					font-size: $font-lg;
					color: $hic-upgrade-subtitle;
					padding: 0 0 30rpx 0;
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
						width: 95%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 0 auto;
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
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		padding: 0 40rpx;
		color: $hic-upgrade-btn-color;
		background-color: #3673D9;
		background: linear-gradient(1turn,#0c5eff .8%,#1398f9);
		box-shadow: 0 3px 28px #2283f666,inset 0 3px 3px #ffffff4d;
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