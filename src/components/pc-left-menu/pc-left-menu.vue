<template>
	<view :style="theme">
		
			<view class="menu_wrap" v-if="guanbiMenu">
				<view class="cell_box">
					<u-cell-group :border="false">
						<u-cell-item :title="$t('Deposit')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="14" @click="openType" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/menuIcon/Deposit.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('Withdraw')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="15" @click="openType" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/menuIcon/Withdraw.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
			
				<view class="cell_box">
					<u-cell-group :border="false">
						<u-cell-item :title="$t('sidebar.title1')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="1" @click="openType" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/menuIcon/m2.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('sidebar.title2')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="2" @click="openType" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/menuIcon/m1.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view class="cell_box">
					<u-cell-group :border="false">
						<u-cell-item :title="$t('sidebar.title3')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="3" @click="openType" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/menuIcon/m3.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view class="cell_box">
					<u-cell-group :border="false">
						<u-cell-item :title="$t('sidebar.title6')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="6" @click="openType" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/menuIcon/m7.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('sidebar.title7')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="7" @click="openType" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/menuIcon/m6.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view class="cell_box">
					<u-cell-group :border="false">
						<u-cell-item :title="$t('sidebar.title8')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="8" @click="openType" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/menuIcon/m8.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('sidebar.title9')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="9" @click="openType" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/menuIcon/m9.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('sidebar.title10')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="10" @click="openType" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/menuIcon/m10.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view class="cell_box">
					<u-cell-group :border="false">
						<u-cell-item :title="$t('sidebar.title11')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="11" @click="openType" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/menuIcon/m11.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
						<!-- #ifdef H5 -->
						<u-cell-item v-if="ceBianInstall" :title="$t('NewlyAdded.Install')" :border-bottom="false"
							:title-style="titleStype" hover-class="none" index="13" @click="openType" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/menuIcon/mphone.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
							</view>
						</u-cell-item>
						<!-- #endif -->
			
					</u-cell-group>
				</view>
			</view>
		
		

	</view>
</template>

<script>
	export default {
		name: "pc-left-menu",
		data() {
			return {
				istabsType: 1,
				is_deviceType: 0, //1是安卓 0是IOS
				ceBianInstall: false,
				guanbiMenu: true,

				titleStype: {
					
				},
			};
		},
		created() {

		},
		methods: {
			open(){
				this.guanbiMenu = true
			},
			guanbi(){
				this.guanbiMenu = false
			},
			openType(index) {
				let that = this
				if (index == 1) {
					uni.switchTab({
						url: '/pages/Account/Account'
					})
				} else if (index == 2) {
					uni.switchTab({
						url: '/pages/Bonus/Bonus'
					})
				} else if (index == 8) {
					//uni.navigateTo({
					//	url: '/pages/Referandearn/Referandearn'
					//})
					uni.switchTab({
						url: '/pages/Referandearn/Referandearn'
					})
				} else if (index == 9) {
					uni.navigateTo({
						//url: '/pages/vipClub/vipClub'
						url: '/pages/VipClubsNew/VipClubsNew'
					})
				} else if (index == 13) {

					//that.$refs.openInstallshow.openPopup()
					if (that.is_deviceType == 0) {
						//打开URL安装ios描述文件
						let url = 'https://test.hftxhs.com/FUNS.mobileconfig'
						window.open(url, '_self');
					} else {
						//直接下载安卓APK
						let url = 'https://test.hftxhs.com/CH1.0.2.apk'
						window.open(url, '_self');
					}

				} else if (index == 11) {
					this.$refs.Language.openPopup()
				} else if (index == 10) {
					const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
					that.$u.post('/game/chat', {
						pid: this.PID,
						lang: language
					}).then(res => {
						let chatUrl = res.data.chatUrl
						// let url_ = '/pages/chatWebview/chatWebview?url=' + encodeURIComponent(JSON.stringify(
						// 	chatUrl))
						// if (url_.indexOf('%') > -1) {
						// 	url_ = url_.replace(/%/g, '%25');
						// }
						// uni.navigateTo({
						// 	url: url_
						// })
						setTimeout(() => {
							window.open(chatUrl, '_blank');
						}, 500)
					})
				} else {

					//如果没登录先登录后在操作
					let token = uni.getStorageSync("token");
					if (!token) {
						this.$refs.signInShow.openPopup()
					} else {
						setTimeout(() => {
							if (index == 3) {
								this.$refs.OpenMusic.openPopup()
							} else if (index == 6) {
								uni.navigateTo({
									url: '/pages/myfavoriteList/myfavoriteList'
								})
							} else if (index == 7) {
								uni.navigateTo({
									url: '/pages/MyhistoryList/MyhistoryList'
								})
							} else if (index == 14) {
								this.ToWallet(0)
							} else if (index == 15) {
								this.ToWallet(1)
							}

						}, 100)
					}

				}
			},
			ToWallet(type) {
				let that = this
				if (type == 0) {
					uni.setStorageSync("makeMoneyTypes", 1);
					uni.switchTab({
						url: '/pages/Wallet/Wallet'
					});
				} else {
					//账号为空直接跳转到添加账号页面
					that.$u.post('/withdraw/bind/query', {}).then(res => {
						let list = res.data
						if (list.length == 0) {
							uni.navigateTo({
								url: '/pages/ManageAccount/ManageAccount'
							})
						} else {
							uni.setStorageSync("makeMoneyTypes", 2);
							uni.switchTab({
								url: '/pages/Wallet/Wallet'
							});
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	image {
		vertical-align: bottom;
	}

	.menu_wrap {
		position: fixed;
		top: 0;
		left: 0;
		height: calc(100vh);
		width: 300px;
		background-color: #f00;
		/* #ifdef H5 */
		padding: 150rpx 30rpx 30rpx 30rpx;
		/* #endif */

		/* #ifdef APP-PLUS */
		padding-top: 20rpx !important;
		padding-right: 30rpx !important;
		padding-bottom: 30rpx !important;
		padding-left: 30rpx !important;
		/* #endif */

		.cell_box {
			margin-bottom: 30rpx;

			.arrow_right {
				width: 12px;
				height: 12px;
				transform: rotate(180deg);
			}

			/deep/ .u-cell-item-box {
				border-radius: 14rpx;
				background-color: $all-secondary-color !important;
			}

			/deep/ .u-cell {
				background-color: transparent !important;
				padding: 8px 16px !important;
			}

			/deep/ .u-cell_title {
				padding-left: 34rpx;
			}
		}
	}
</style>