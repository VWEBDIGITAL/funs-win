<template>
	<view :style="theme">
		<view class="menu_wrap_box">
			<scroll-view scroll-y="true" style="height: calc(100vh)">
				<view class="menu_wrap">
					<view class="menu_wrap_box2">
						<view class="souso_cion" @click="Tosearch()"><u-icon name="search" color="#3c485c" size="38"></u-icon>{{$t('Qiaozhi.Search')}}</view>
						<view class="cell_box_title">{{$t('Qiaozhi.Betting')}}</view>
						<view class="cell_box">
							<u-cell-group :border="false">
								<u-cell-item class="active" :title="$t('Qiaozhi.Casino')" :border-bottom="false" :title-style="titleStype"
									hover-class="cell-hover-class" index="99" @click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/casino.webp"></u-icon>
									<view slot="right-icon">
										<image class="arrow_right" src="/static/image/arrow_right_icon.png"
											mode="widthFix"></image>
									</view>
								</u-cell-item>
							</u-cell-group>
						</view>
						<view class="cell_box_title">{{$t('Qiaozhi.Crypto')}}</view>
						<view class="cell_box">
							<u-cell-group :border="false">
								<u-cell-item :title="$t('Deposit')" :border-bottom="false" :title-style="titleStype"
									hover-class="active" index="14" @click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/usd-green.webp"></u-icon>
								</u-cell-item>
								<u-cell-item :title="$t('Qiaozhi.CryptoSwap')" :border-bottom="false"
									:title-style="titleStype" hover-class="active" index="15"
									@click="openType" :arrow="false">
									<u-icon slot="icon" size="26"
										name="/static/image/menuIcon/crypto-swap-3d.webp"></u-icon>
								</u-cell-item>
								<u-cell-item :title="$t('Vault Pro')" :border-bottom="false" :title-style="titleStype"
									hover-class="active" index="16" @click="openType" :arrow="false">
									<u-icon slot="icon" size="26" name="/static/image/menuIcon/vault-pro.webp"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</view>

						<view class="cell_box" :style="{display:'none'}">
							<u-cell-group :border="false">
								<u-cell-item :title="$t('sidebar.title3')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="3" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m3.png"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</view>
						<view class="cell_box" :style="{display:'none'}">
							<u-cell-group :border="false">
								<u-cell-item :title="$t('sidebar.title6')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="6" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m7.png"></u-icon>
								</u-cell-item>
								<u-cell-item :title="$t('sidebar.title7')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="7" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m6.png"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</view>
						<view class="cell_box_title">{{$t('Qiaozhi.General')}}</view>
						<view class="cell_box _default">
							<u-cell-group :border="false">
								<u-cell-item :title="$t('sidebar.title2')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="2" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="26" name="/static/image/menuIcon/m1.png"></u-icon>
								</u-cell-item>
								<u-cell-item :title="$t('sidebar.title8')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="8" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m8.png"></u-icon>
								</u-cell-item>
								<u-cell-item :style="{display:'none'}" :title="$t('NEWBonusPageA.BonusSYS')"
									:border-bottom="false" :title-style="titleStype" hover-class="cell-hover-class"
									index="17" @click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/jiangli.png"></u-icon>
									<view slot="right-icon">
										<view class="tasg_icon">
											<span>Hot</span>
											<image class="arrow_right" src="/static/image/arrow_right_icon.png"
												mode="widthFix"></image>
										</view>
									</view>
								</u-cell-item>
								<u-cell-item :border-bottom="false" :title-style="titleStype"
									hover-class="cell-hover-class" index="9" @click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m9.png"></u-icon>
									<template slot="title">
										<span class="slug">{{$t('Qiaozhi.VIP')}}</span>{{$t('Qiaozhi.Club')}}
									</template>
								</u-cell-item>
							</u-cell-group>

							<u-cell-group :border="false">
								<u-cell-item :title="$t('sidebar.title11')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="11"
									@click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m11.png"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</view>
						<view class="payment_methods _line"></view>
						<view class="payment_methods" @click="openType">
							<image class="_item" src="/static/image/payments/gpay.png" mode="widthFix"></image>
							<image class="_item" src="/static/image/payments/applepay.png" mode="widthFix"></image>
							<image class="_item" src="/static/image/payments/mastercard.png" mode="widthFix"></image>
							<image class="_item" src="/static/image/payments/visa.png" mode="widthFix"></image>
						</view>
						<view class="cell_box _default">
							<view class="sevae_btn_wrap _no_fixed">
								<view class="sevae_btn buy_btn">
									<u-button type="secondary" @click="openType">{{$t('Qiaozhi.BuyCrypto')}}</u-button>
								</view>
							</view>
						</view>
						<view class="cell_box_wrapper">
							<view class="cell_box_title _no-item">{{$t('Qiaozhi.App')}}</view>
							<view class="_apps">
								<view class="_apps _item">
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
										fill="none">
										<g opacity="0.7">
											<g clip-path="url(#clip0_1_6367)">
												<mask id="mask0_1_6367" style="mask-type:luminance"
													maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
													<path d="M0 0H14V14H0V0Z" fill="white" />
												</mask>
												<g mask="url(#mask0_1_6367)">
													<path d="M8.89577 2.02413C9.14079 1.74356 9.32735 1.41691 9.44454 1.06333C9.56174 0.709749 9.6072 0.336338 9.57827 -0.0350342C8.83276 0.0317759 8.14146 0.382646 7.64744 0.944966C7.41108 1.21698 7.23194 1.53382 7.12069 1.87658C7.00945 2.21934 6.96838 2.58099 6.99994 2.93997C7.36561 2.94657 7.72771 2.86712 8.05703 2.70804C8.38634 2.54895 8.67365 2.31468 8.89577 2.02413ZM10.5233 6.82497C10.5271 6.33062 10.6565 5.84535 10.8994 5.41475C11.1422 4.98414 11.4905 4.62233 11.9116 4.3633C11.6435 3.98296 11.2916 3.66939 10.8829 3.44686C10.4742 3.22432 10.0199 3.09879 9.55494 3.07997C8.54577 2.97497 7.61827 3.6633 7.08161 3.6633C6.55077 3.6633 5.79827 3.09163 4.95827 3.1033C4.4092 3.11897 3.87376 3.27795 3.40511 3.56447C2.93645 3.85098 2.55086 4.25507 2.28661 4.73663C1.14911 6.7083 1.99494 9.63663 3.13244 11.235C3.64577 12.0166 4.29327 12.8975 5.14494 12.8683C5.99661 12.8391 6.27077 12.3375 7.25661 12.3375C8.24244 12.3375 8.54577 12.8625 9.38577 12.845C10.2258 12.8275 10.8149 12.0458 11.3574 11.27C11.7442 10.7008 12.045 10.0777 12.2499 9.4208C11.7408 9.20132 11.3065 8.83851 11 8.37658C10.6934 7.91464 10.5278 7.37352 10.5233 6.81913" fill="white" />
												</g>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_6367">
												<rect width="14" height="14" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</view>
								<view class="_apps _item">
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
										fill="none">
										<g opacity="0.7">
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M8.59258 2.99831C8.54077 2.99986 8.48917 2.99109 8.44078 2.97251C8.39239 2.95393 8.34818 2.92591 8.31072 2.89008C8.27326 2.85425 8.24331 2.81133 8.2226 2.76381C8.20188 2.7163 8.19083 2.66514 8.19008 2.61331C8.19008 2.39747 8.37091 2.22831 8.59258 2.22831C8.81425 2.22831 8.98925 2.40331 8.98925 2.61331C8.98849 2.66463 8.97762 2.71531 8.95728 2.76244C8.93693 2.80956 8.9075 2.85222 8.87066 2.88797C8.83383 2.92372 8.79031 2.95187 8.7426 2.9708C8.69488 2.98973 8.64391 2.99908 8.59258 2.99831ZM5.40758 2.99831C5.35626 2.99908 5.30528 2.98973 5.25757 2.9708C5.20985 2.95187 5.16633 2.92372 5.1295 2.88797C5.09266 2.85222 5.06323 2.80956 5.04289 2.76244C5.02254 2.71531 5.01168 2.66463 5.01091 2.61331C5.01091 2.39747 5.18591 2.22831 5.40758 2.22831C5.62925 2.22831 5.81008 2.40331 5.81008 2.61331C5.80933 2.66514 5.79828 2.7163 5.77757 2.76381C5.75686 2.81133 5.7269 2.85425 5.68944 2.89008C5.65198 2.92591 5.60777 2.95393 5.55938 2.97251C5.51099 2.99109 5.45939 2.99986 5.40758 2.99831ZM8.82591 1.45247L8.97175 1.23081L9.12341 1.01497L9.45008 0.536641C9.46665 0.515948 9.47568 0.490231 9.47568 0.463724C9.47568 0.437217 9.46665 0.4115 9.45008 0.390807L9.41508 0.349974C9.38617 0.331629 9.35133 0.325034 9.31771 0.331541C9.28409 0.338048 9.25423 0.357164 9.23425 0.384974L8.72675 1.11997L8.57508 1.34164C8.07046 1.15636 7.53763 1.05966 7.00008 1.05581C6.46254 1.05966 5.9297 1.15636 5.42508 1.34164L5.27341 1.11997L5.12175 0.904141L4.77175 0.384974C4.75944 0.366928 4.74291 0.352161 4.72359 0.341955C4.70428 0.33175 4.68276 0.326416 4.66091 0.326416C4.63907 0.326416 4.61755 0.33175 4.59824 0.341955C4.57892 0.352161 4.56239 0.366928 4.55008 0.384974C4.53494 0.405169 4.52675 0.429731 4.52675 0.454974C4.52675 0.480217 4.53494 0.504779 4.55008 0.524974L4.87675 1.00914L5.02841 1.22497L5.17425 1.44081C4.04841 1.95414 3.29008 2.92247 3.29008 4.02497H10.7101C10.7101 2.91664 9.95175 1.95414 8.82591 1.44081M3.34258 4.53247H3.28425V10.2141C3.28425 10.6633 3.66341 11.0308 4.13008 11.0308H4.73675C4.71341 11.1008 4.70175 11.1728 4.70175 11.2466V12.88C4.70175 13.3058 5.05758 13.6558 5.50091 13.6558C5.93841 13.6558 6.29425 13.3058 6.29425 12.88V11.2466C6.29629 11.1731 6.28441 11.0999 6.25925 11.0308H7.74091C7.71758 11.1008 7.70591 11.1728 7.70591 11.2466V12.88C7.70591 13.3058 8.06175 13.6558 8.50508 13.6558C8.94258 13.6558 9.29841 13.3058 9.29841 12.88V11.2466C9.29841 11.1689 9.28675 11.0969 9.26341 11.0308H9.87008C10.3367 11.0308 10.7101 10.6633 10.7101 10.2141V4.54997L3.34258 4.53247ZM1.96008 4.53247C1.52258 4.54997 1.16675 4.89997 1.16675 5.32581V8.63914C1.16675 9.06497 1.52258 9.41497 1.96008 9.41497C2.39758 9.41497 2.75925 9.06497 2.75925 8.63914V5.31997C2.75925 4.89414 2.40341 4.54997 1.96008 4.54997M12.0401 4.54997C11.5967 4.54997 11.2409 4.89997 11.2409 5.32581V8.63914C11.2409 9.06497 11.5967 9.41497 12.0401 9.41497C12.4776 9.41497 12.8334 9.06497 12.8334 8.63914V5.31997C12.8334 4.89414 12.4776 4.54997 12.0401 4.54997Z"
												fill="#A4C639" />
										</g>
									</svg>
								</view>
								<view class="_apps _item">
									<svg width="14" height="14" viewBox="0 0 14 14" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<g opacity="0.7">
											<path
												d="M12.2501 1.71497L6.57423 2.54913V6.77247L12.2501 6.7258V1.71497ZM1.70923 7.22747V10.8208L6.01423 11.4158V7.25663L1.70923 7.22747ZM6.52756 7.2858L6.53339 11.48L12.2501 12.285V7.29747L6.52756 7.2858ZM1.70923 3.2083V6.80163L6.01423 6.7783V2.62497L1.70923 3.2083Z"
												fill="#0078D6" />
										</g>
									</svg>
								</view>
							</view>
						</view>
						<view class="cell_box _default">
							<view class="sevae_btn_wrap _no_fixed">
								<view class="sevae_btn">
									<u-button type="secondary" @click="getUrl()"><u-icon name="server-fill" color="#ffffff" size="34"></u-icon>{{$t('LiveSupport')}}</u-button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<!--充值-->
		<pc-Deposit ref="openPCdeposit"></pc-Deposit>
		<!--提款-->
		<pc-Withdrawals ref="openPCWithdrawals"></pc-Withdrawals>
		<!--保险箱-->
		<pc-VaultPro ref="openPCvaultPro"></pc-VaultPro>
		<signInPopup ref="signInShow" :isTabs="istabsType"></signInPopup>
		<LanguagePopup ref="Language"></LanguagePopup>
		<musicPopup ref="OpenMusic"></musicPopup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				istabsType: 1,
				is_deviceType: 0, //1是安卓 0是IOS
				ceBianInstall: false,
				titleStype: {

				},

			};
		},
		computed: {

		},
		created() {
			let that = this
		},
		mounted() {

		},
		beforeDestroy() {

		},
		beforeUpdate() {

		},
		methods: {
			openType(index) {
				let that = this


				let isToken = uni.getStorageSync("token")
				if (!isToken) {} else {
					this.outBalance();
				}


				if (index == 99) {
					//导航栏金币显示
					uni.$emit('OpeninGames', 0);
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else if (index == 2) {
					//导航栏金币显示
					uni.$emit('OpeninGames', 0);
					uni.switchTab({
						url: '/pages/Bonus/Bonus'
					})
				} else if (index == 8) {
					//导航栏金币显示
					uni.$emit('OpeninGames', 0);
					uni.switchTab({
						url: '/pages/Referandearn/Referandearn'
					})
				} else if (index == 9) {
					//导航栏金币显示
					uni.$emit('OpeninGames', 0);
					uni.navigateTo({
						url: '/pages/VipClubsNew/VipClubsNew'
					})
				} else if (index == 11) {
					this.$refs.Language.openPopup()
				} else {

					//如果没登录先登录后在操作
					let token = uni.getStorageSync("token");
					if (!token) {
						if (index == 17) {
							uni.navigateTo({
								url: '/pages/bonus-cabinet/bonus-cabinet'
							})
						} else {
							this.$refs.signInShow.openPopup()
						}
					} else {
						setTimeout(() => {
							if (index == 3) {
								this.$refs.OpenMusic.openPopup()
							} else if (index == 6) {
								//导航栏金币显示
								uni.$emit('OpeninGames', 0);
								uni.navigateTo({
									url: '/pages/myfavoriteList/myfavoriteList'
								})
							} else if (index == 7) {
								//导航栏金币显示
								uni.$emit('OpeninGames', 0);
								uni.navigateTo({
									url: '/pages/MyhistoryList/MyhistoryList'
								})
							} else if (index == 14) {
								this.ToWallet(0)
							} else if (index == 15) {
								this.ToWallet(1)
							} else if (index == 16) {
								this.$refs.openPCvaultPro.openPopup()
							} else if (index == 17) {
								//导航栏金币显示
								uni.$emit('OpeninGames', 0);
								uni.navigateTo({
									url: '/pages/Bonus-Logoin/Bonus-Logoin'
								})
							}

						}, 100)
					}

				}
			},
			// 然后，当后台切换到前台的时候，调用一下：/transfer-out-balance（如果游戏webview没有关闭的情况下[就是当前界面是游戏webview] 就不要调用）
			// 这个接口的意思是从第三方下分回来，因为很多用户在游戏中就直接切换进后台了，没有直常退出游戏，导致用户的余额留在了第三方。
			outBalance() {
				let that = this
				that.$u.post('/transfer-out-balance', {

				}).then(res => {
					//刷新用户余额
					uni.$emit('getgetMybalance', 1);
				});
			},
			Tosearch() {
				uni.navigateTo({
					url: '/pages/searchFor/searchFor'
				})
			},
			ToWallet(type) {
				let that = this
				if (type == 0) {
					that.$refs.openPCdeposit.openPopup()
				} else {
					//账号为空直接跳转到添加账号页面
					that.$u.post('/withdraw/bind/query', {}).then(res => {
						let list = res.data
						if (list.length == 0) {
							that.$refs.openPCWithdrawals.openPopup()
						} else {
							that.$refs.openPCWithdrawals.openPopup()
						}
					})
				}
			},
			getUrl() {
				let that = this
				const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
				that.$u.post('/game/chat', {
					pid: this.PID,
					lang: language
				}).then(res => {

					// let isToken = uni.getStorageSync("token")
					// if (!isToken) {} else {
					// 	//导航栏金币显示
					// 	uni.$emit('OpeninGames', 0);
					// 	that.outBalance();
					// }

					let chatUrl = res.data.chatUrl

					uni.$emit('OpenPCKefu', chatUrl);

					// let url_ = '/pages/chatWebview/chatWebview?url=' + encodeURIComponent(JSON.stringify(chatUrl))
					// if (url_.indexOf('%') > -1) {
					// 	url_ = url_.replace(/%/g, '%25');
					// }
					// uni.navigateTo({
					// 	url: url_
					// })
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	image {
		vertical-align: bottom;
	}

	.tasg_icon {
		display: flex;
		align-items: center;
		margin-left: auto;

		span {
			display: inline-block;
			width: auto;
			padding: 4rpx 10rpx;
			border-radius: 200rpx;
			background: linear-gradient(1turn, #ED8E00 .8%, #ED8E00);
			box-shadow: 0 0 20px #ed8e00a6;
			margin-right: 16rpx;
			color: #fff;
			font-size: 20rpx;
		}
	}

	.sevae_btn_wrap {
		position: fixed;
		bottom: 0;
		width: 232px;
		background-color: $pupUp-bg-color;
		padding: 20rpx 20rpx 30rpx 20rpx;

		.sevae_btn {
			width: 200px;
			margin: 0 auto;

			/deep/ .u-icon {
				margin-right: 10rpx;
			}
		}
	}

	.menu_wrap_box {
		position: fixed;
		top: 0;
		left: 0;
		height: calc(100vh);
		width: 232px;
		background-color: $pupUp-bg-color;
		box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.22);
		z-index: 99;
	}

	.menu_wrap {
		position: relative;
		width: 100%;
		height: 100%;

		.menu_wrap_box2 {
			position: relative;
			width: 100%;
			height: 100%;
			/* #ifdef H5 */
			padding: 150rpx 30rpx 30rpx 30rpx;
			/* #endif */
			/* #ifdef APP-PLUS */
			padding-top: 20rpx !important;
			padding-right: 30rpx !important;
			padding-bottom: 30rpx !important;
			padding-left: 30rpx !important;
			/* #endif */
		}

		.cell_box {
			margin-bottom: 30rpx;

			.arrow_right {
				width: 12px;
				height: 12px;
				transform: rotate(-90deg);
				background-color: #202a39;
				border-radius: 6px;
				padding: 14rpx;
			}

			/deep/ .u-cell-item-box {
				border-radius: 14rpx;
				background-color: $all-secondary-color !important;
				cursor: pointer;
			}

			/deep/ .u-cell {
				background-color: transparent !important;
				padding: 8px 16px !important;
			}

			/deep/ .u-cell_title {
				padding-left: 34rpx;
				font-weight: bold;
			}
		}
	}
</style>