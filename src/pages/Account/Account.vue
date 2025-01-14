<template>
	<view :style="theme" class="page_boxs">
		<!--引导注册弹窗-->
		<uni-transition :mode-class="['fade', 'slide-top']"
			:styles="{'max-width':'430px','height':'auto','position':'fixed','top':Topheight,'left':'0','z-index':'9999','right':'0','margin':'0 auto'}"
			:show="showRegisterNow">
			<Welcome-Register-Now ref="RegisterNowRefs" @RegisterNowClose="RegisterNowClose"
				@RegisterNowOpen="registerNowOpen"></Welcome-Register-Now>
		</uni-transition>


		<match-media :max-width="760">
			<navbar ref="child" :isCountTo="false"></navbar>
		</match-media>

		<regiserPopup ref="regiserShow"></regiserPopup>
		<signInPopup ref="signInShow"></signInPopup>
		<PersonalStatisticsPopup ref="tatistics" :queryUserId="userInfo.userId" :Types="0" :isShowBtn="1">
		</PersonalStatisticsPopup>

		<view class="page_wrap">


			<!-- <span class="iconfont icon-qianbao" ></span>
			<span class="iconfont icon-yinxingqia" ></span>
			<span class="iconfont icon-unity" ></span>
			<span class="iconfont icon-qushi" ></span> -->

			<view class="myinfo_box">
				<view class="user_info">
					<view class="user_tx" @click="Tomyinfo()" v-if="userInfo.userId">
						<image :src="avatar"></image>
					</view>
					<view class="user_tx" v-else>
						<image src="/static/image/person_118819.png"></image>
					</view>
					<view class="user_name_id" @click="clickStatistics()" v-if="userInfo.userId">
						<view class="user_name_iterm">
							<view>Hi~,{{userInfo.nickName}}</view>
							<!--<span @click="Tomyinfo()">Revise</span>-->
							<view class="right_icon">
								<image src="/static/image/arrow_right_icon.png"></image>
							</view>
						</view>
						<view class="userid">ID：{{userInfo.userId}}
							<image src="/static/image/me/fuzhi_icon.png" mode="widthFix"
								@click.stop="copyId(userInfo.userId)"></image>
						</view>
					</view>
					<view class="user_name_id" v-else>
						<view class="user_name_iterm">
							<view class="nologin" @click="signPopupShow()">{{$t('NewlyAdded.PleaseLogin')}}</view>
						</view>
					</view>
				</view>
				<view class="user_vip" @click="toVippage()" v-if="userInfo.userId">
					<view class="vip_title">
						<image src="/static/image/me/huangguan.png"></image><text>RANK {{Progress.vip+1}}</text>
					</view>
					<view class="vip_jdt">
						<view class="jdt_wrap">
							<view class="jdt_box">
								<u-line-progress :percent="Progress.progressRate" active-color="#3673D9" height="14">
									<view slot="default"></view>
								</u-line-progress>
							</view>
							<view class="jdt_ask">
								<view>{{$t('XP')}}</view>
								<view>{{Progress.progressRate}}%</view>
							</view>
						</view>
						<view class="jdt_righticon">
							<image src="/static/image/arrow_right_icon.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="games_box">
				<view class="games_item">
					<view class="games_items1" @click="totabbarPages('/pages/Referandearn/Referandearn')">
						<image src="/static/image/me/me_ren1.png" mode="widthFix"></image>
						<text>{{$t(('Refer&Earn'))}}</text>
					</view>
					<view class="games_items2" @click="toPages('/pages/Bonus-Logoin/Bonus-Logoin')">
						<image src="/static/image/me/me_ren2.png" mode="widthFix"></image>
						<text>{{$t('ADDnew.cashback')}}</text>
					</view>
				</view>
				<!-- <view class="games_item">
					<view class="games_items1" @click="toPages('/pages/QuestHub/QuestHub')">
						<image src="/static/image/me/quests.png"></image><text>{{$t(('QUEST'))}}</text>
					</view>
					<view class="games_items2" @click="toPages('/pages/Spin/Spin')">
						<image src="/static/image/me/turntable.png"></image><text>{{$t(('SPIN'))}}</text>
					</view>
				</view> -->
				
				<view class="games_item" v-if="userInfo.userId">
					<view class="games_items3" @click="OpenZhuanPan()">
						<image src="/static/image/me/turntable.png" mode="widthFix"></image>
						<text>旋转轮盘 & 赢奖</text>
					</view>
				</view>
				
			</view>
			<view class="menus_wrap">
				<view class="menu_item" @click="ToWallet(0)">
					<!-- <image src="/static/image/me/login_circle.png"></image> -->
					<span class="iconfont icon-qianbao"></span>
					<view>{{$t('Deposit')}}</view>
				</view>
				<view class="menu_item" @click="ToWallet(1)">
					<!-- <image src="/static/image/me/login_circle2.png"></image> -->
					<span class="iconfont icon-yinxingqia"></span>
					<view>{{$t('Withdraw')}}</view>
				</view>
				<view class="menu_item" @click="toPages('/pages/VaultPro/VaultPro')">
					<!-- <image src="/static/image/me/time102_42672.png"></image> -->
					<span class="iconfont icon-unity"></span>
					<view>{{$t('Vault Pro')}}</view>
				</view>
				<view class="menu_item" @click="toPages('/pages/myPageDetails/myPageDetails')">
					<!-- <image src="/static/image/me/arrow_up_down.png"></image> -->
					<span class="iconfont icon-qushi"></span>
					<view>{{$t('Details')}}</view>
				</view>
			</view>
			<view class="menus_list_wrap">
				<view class="cell_box">
					<u-cell-group :border="false">

						<u-cell-item :title="$t('NotificationPage.SystemNotice')" :border-bottom="false"
							:title-style="titleStype" hover-class="none" index="8" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/bell_ring.png"></u-icon>
							<view slot="right-icon" class="hxbju">
								<span class="tz_tag"
									v-if="SystemunreadList + PersonalunreadList != 0">{{SystemunreadList + PersonalunreadList}}</span>
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item>

						<u-cell-item :title="$t('GameHistory')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="1" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/gamehis.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('Transaction')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="2" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/transaction-history.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('ManageAccount')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="3" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/bank-account.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item>
						<!-- <u-cell-item :title="$t('ADDnew.Promotions')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="4" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/announcement_icon_125083.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item> -->

					</u-cell-group>
				</view>
			</view>
			<view class="menus_list_wrap">
				<view class="cell_box">
					<u-cell-group :border="false">
						<u-cell-item :title="$t('Music')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="5" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/note_audio_music_3097.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('Set')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="6" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/settings_icon_208167.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('sidebar.title10')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="7" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/me/audio_kefu.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item>
						
						<!-- <u-cell-item title="主题" :border-bottom="false" :title-style="titleStype" hover-class="none" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/me/shuazizhong.png"></u-icon>
							<view slot="right-icon">
								<view class="zhuti_qh_btn">
									<view class="yl_icon" :class="[ztidex == indexz?'zt_xz':'']" v-for="(itemz,indexz) in zhuTi" :key="indexz" @click="zt_qh(indexz)">
										<image :src="itemz.icon"></image>
									</view>
								</view>
							</view>
						</u-cell-item> -->
						
					</u-cell-group>
				</view>
			</view>

			<view style="height: 200rpx;"></view>

		</view>
		<match-media :max-width="800">
			<!-- <view>页面宽度低于 800px 时显示</view> -->
			<u-tabbar></u-tabbar>
		</match-media>

		<musicPopup ref="OpenMusic"></musicPopup>

		<Spin-Wheel ref="openspin"></Spin-Wheel>

	</view>
</template>

<script>
	import avatarList from "@/utils/avatar.js";
	export default {
		data() {
			return {
				zhuTi: [{
					id: 0,
					icon: '/static/image/me/yueliang.png'
				},{
					id: 1,
					icon: '/static/image/me/sun_fill.png'
				}],
				ztidex: 0,
				
				Topheight: '0',
				showRegisterNow: false,
				showOptions: true,
				titleStype: {},
				avatarlist: avatarList.avatarlist,
				userInfo: {},
				avatar: '',
				Progress: {},
				lastMailidMin: 0,
				SystemunreadList: 0,
				PersonalunreadList: 0
			};
		},
		onHide() {
			//console.log('我的页面隐藏了')
			let that = this
			that.$refs.RegisterNowRefs.hideRegisterNowRefs(0)
			that.showRegisterNow = false
			//that.$refs.child.OpenMenu();
			uni.$emit('HideTabber', 1)
		},
		onLoad() {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			//判断是否WebApp启动，如果是就个他领取安装奖励
			//#ifdef H5
			if (window.navigator.standalone == true) {
				//alert('IOS-是从桌面中打开的')
				that.Topheight = '54px'
			} else if (window.matchMedia("(display-mode: standalone)").matches) {
				//alert('android-是从桌面中打开的')
				that.Topheight = '0'
			} else {
				//就是浏览器里面打开的
				that.Topheight = '0'
			}
			//#endif
		},
		onShow() {
			let that = this
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				that.userInfo = ''
			} else {
				that.getuserinfo();
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
				that.getSystemUnread();
				that.getPersonalUnread();
			}

			let theme = that.$store.getters.currentTheme;
			if (theme == "whiteTheme") {
				that.ztidex = 1
				console.log('白色主题')
			} else {
				that.ztidex = 0
				console.log('黑色主题')
			}

		},
		onUnload() {

		},
		methods: {
			zt_qh(index){
				console.log('主题切换',index)
				let that = this
				that.ztidex = index
				if(index == 0){
					that.$store.commit("changeTheme", 'defaultTheme')
				} else {
					that.$store.commit("changeTheme", 'whiteTheme')
				}
			},
			OpenZhuanPan() {
				this.$refs.openspin.init()
			},
			jisuanWeizhi() {

				/*
				num是传managerFlag的值，
				bitPosition是标志位，禁止提取佣金是第5位，你就传5来判断是不是禁止提取佣金
				
				现在第5位是标记禁止提佣金（标记位为1就是禁止，0是不禁止）
				bitPosition的值 {
					0 禁止充值
					1 禁止兑换
					2 禁止存进保险箱
					3 禁止活动
					4 禁止游戏
					5 禁止佣金提现
				}
				
				*/
				const num = this.userInfo.managerFlag;
				const bitPosition = 5;

				const fag = this.checkBit(num, bitPosition) ? '1' : '0';

				console.log(`The bit at position ${bitPosition} is ${fag}.`);
			},
			checkBit(num, bitPosition) {
				const mask = 1 << bitPosition;
				return (num & mask) !== 0;
			},
			getSystemUnread() {
				let that = this
				that.$u.post('/query-mail', {
					type: 1,
					lastMailId: that.lastMailidMin
				}).then(ress => {
					let unread = [];
					ress.data.forEach((item, index) => {
						if (item.status == 0) {
							unread.push(item)
						}
					});
					that.SystemunreadList = unread.length
				})
			},
			getPersonalUnread() {
				let that = this
				that.$u.post('/query-mail', {
					type: 2,
					lastMailId: that.lastMailidMin
				}).then(ress => {
					let unread = [];
					ress.data.forEach((item, index) => {
						if (item.status == 0) {
							unread.push(item)
						}
					});
					that.PersonalunreadList = unread.length
				})
			},


			RegisterNowClose(data) {
				if (data == 0) {
					this.showRegisterNow = false
				} else {
					this.showRegisterNow = false
					this.$refs.signInShow.openPopup(2);
				}
			},
			registerNowOpen() {
				this.showRegisterNow = true
			},




			getuserinfo() {
				let that = this
				that.$u.post('/user/get/info', {

				}).then(res => {
					uni.setStorageSync('userinfo', res.data)
					that.userInfo = uni.getStorageSync("userinfo")
					let headId = that.userInfo.headId
					let tx = ''
					that.avatarlist.forEach((item, index) => {
						if (item.id == headId) {
							tx = item.img
						}
					});
					that.avatar = tx
					that.getVipDetails();

				})
			},
			getVipDetails() {
				let that = this
				that.$u.post('/vip/progress', {
					vipLevel: that.userInfo.vip
				}).then(res => {
					that.Progress = res.data.progress
				})
			},
			meopenMenu(idx) {
				let token = uni.getStorageSync("token")
				if (!token) {
					this.signPopupShow()
				} else {
					if (idx == 1) {
						uni.navigateTo({
							url: '/pages/GamingHistory/GamingHistory'
						})
					} else if (idx == 2) {
						uni.navigateTo({
							url: '/pages/Transaction/Transaction'
						})
					} else if (idx == 3) {
						uni.navigateTo({
							url: '/pages/ManageAccount/ManageAccount'
						})
					} else if (idx == 4) {
						uni.switchTab({
							url: "/pages/Bonus/Bonus"
						})
					} else if (idx == 5) {
						this.$refs.OpenMusic.openPopup()
					} else if (idx == 6) {
						uni.navigateTo({
							url: '/pages/Settings/Settings'
						})
					} else if (idx == 7) {
						const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
						this.$u.post('/game/chat', {
							pid: this.PID,
							lang: language
						}).then(res => {
							let chatUrl = res.data.chatUrl

							// #ifdef APP-PLUS
							plus.runtime.openURL(chatUrl);
							// #endif

							// #ifdef H5
							// let url_ = '/pages/chatWebview/chatWebview?url=' + encodeURIComponent(JSON.stringify(
							// 	chatUrl))
							// if (url_.indexOf('%') > -1) {
							// 	url_ = url_.replace(/%/g, '%25');
							// }
							setTimeout(() => {
								window.open(chatUrl, '_blank');
							}, 500)
							let windowWidth = uni.getSystemInfoSync().windowWidth
							if (windowWidth >= "800") {
								uni.$emit('OpenPCKefu', chatUrl);
							} else {
								uni.navigateTo({
									url: url_
								})
							}
							// #endif
						})
					} else if (idx == 8) {
						let isOpen = uni.getStorageSync("NotisOpen")
						if (isOpen == 1) {
							//console.log('已经打开通知页面了')
						} else {
							uni.setStorageSync("NotisOpen", 1)
							uni.navigateTo({
								url: '/pages/Notification/Notification'
							})
						}
					}
				}
			},
			toPages(url) {
				let token = uni.getStorageSync("token")
				if (!token) {
					this.signPopupShow()
				} else {
					uni.navigateTo({
						url: url
					})
				}
			},
			totabbarPages(url) {
				uni.switchTab({
					url: url
				})
			},
			Tomyinfo() {
				uni.navigateTo({
					url: '/pages/ProfileInfo/ProfileInfo'
				})
			},
			ToWallet(type) {
				let that = this
				let token = uni.getStorageSync("token")
				if (!token) {
					this.signPopupShow()
				} else {
					if (type == 0) {
						//uni.setStorageSync("makeMoneyTypes", 1);
						uni.switchTab({
							url: '/pages/Wallet/Wallet'
						});
					} else {
						//账号为空直接跳转到添加账号页面
						//that.$u.post('/withdraw/bind/query', {}).then(res => {
						//	let list = res.data
						//	if(list.length == 0){
						//		uni.navigateTo({
						//			url: '/pages/ManageAccount/ManageAccount'
						//		})
						//	} else {
						//uni.setStorageSync("makeMoneyTypes", 2);
						uni.navigateTo({
							url: '/pages/Withdrawals/Withdrawals'
						});
						//	}
						//})
					}
				}
			},
			regPopupShow() {
				this.$refs.regiserShow.openPopup()
			},
			signPopupShow() {
				this.$refs.signInShow.openPopup()
			},
			clickStatistics() {
				this.$refs.tatistics.getsta()
				this.$refs.tatistics.openPopup()
			},
			toVippage() {
				uni.navigateTo({
					url: '/pages/VipClubsNew/VipClubsNew'
				})
			},
			copyId(val) {
				let that = this
				uni.setClipboardData({
					data: String(val),
					showToast: false,
					success(res) {
						uni.showToast({
							title: that.$t('Betting requirements.register7'),
							icon: 'none',
							duration: 3000
						})
					},
					fail(err) {
						//console.log(err)
					}
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	
	.page_boxs {
		height: auto !important;
	}
	
	.zhuti_qh_btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $ztqh-bg-color;
		border-radius: 12rpx;
		padding: 8rpx;
		position: absolute;
		top: 3px;
		right: 12px;
		.yl_icon {
			cursor: pointer;
			border-radius: 12rpx;
			width: 50rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 36rpx;
				height: 36rpx;
			}
		}
		.zt_xz {
			background-color: $ztqh-xz-color !important;
		}
	}
	
	.hxbju {
		display: flex;
		align-items: center;
	}

	.tz_tag {
		display: inline-block;
		background: linear-gradient(1turn, #1bb83d .8%, #1bb83d);
		//box-shadow: 0 3px 16px #005413, inset 0 4px 3px #ffffff4d;

		// background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
		// box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;

		text-align: center;
		color: #FEFEFE;
		width: 18px;
		height: 18px;
		line-height: 18px;
		font-size: 12px;
		z-index: 9;
		border-radius: 4px;
		border: 2px solid $all-secondary-color;
		font-weight: bold;
	}

	.page_wrap {
		padding: 10px 10px 10px 10px;
		height: calc(100vh);
		.menus_list_wrap {
			margin: 20rpx 0 0 0;

			.cell_box {
				.arrow_right {
					width: 12px;
					height: 12px;
					transform: rotate(180deg);
				}

				/deep/ .u-cell-item-box {
					border-radius: 14rpx;
					background-color: $me-box-color !important;
				}

				/deep/ .u-cell {
					background-color: transparent !important;
					padding: 8px 16px !important;
					color: $me-subtext-color !important;
				}

				/deep/ .u-cell_title {
					padding-left: 34rpx;
					font-weight: bold;
				}
			}
		}

		.menus_wrap {
			height: 145.14rpx;
			background-color: $me-box-color;
			padding: 0 20rpx;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.menu_item {
				flex: 1;
				text-align: center;

				.iconfont {
					color: $me-icon-color;
					font-size: 40rpx !important;
				}

				image {
					width: 42rpx;
					height: 42rpx;
				}

				view {
					margin-top: 8rpx;
					color: $me-subtext-color;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}

		.games_box {
			margin: 20rpx 0;

			.games_item {
				margin-top: 30rpx;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;

				.games_items1 {
					margin-right: 7rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					//background-color: $me-box-color;
					//background-image: linear-gradient(20deg, #0b3b3d 10.5%, $all-secondary-color 86.8%);
					background: linear-gradient(26.79deg, rgba(109, 43, 255, .480402) 1.86%, rgba(109, 43, 255, .04) 85.25%, rgba(109, 43, 255, .04) 85.25%), rgba(216, 216, 216, .05);
					flex: 1;
					border-radius: 20rpx;
					padding: 0 12rpx;
					height: 75rpx;
					color: $all-secondary-text-color;
					font-weight: bold;
					font-size: 28rpx;
					position: relative;

					image {
						width: 80rpx;
						height: 63rpx;
						margin-right: 10rpx;
						position: absolute;
						bottom: 0rpx;
						left: 24rpx;
					}

					text {
						padding-left: 58rpx;
						text-transform: uppercase;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
				}

				.games_items2 {
					margin-left: 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					//background-image: linear-gradient(20deg, #0b3429 10.5%, $all-secondary-color 86.8%);
					//background-color: $me-box-color;
					background: linear-gradient(19.92deg, rgba(175, 13, 132, .511772) -6.45%, rgba(175, 13, 132, .04) 78.77%), rgba(216, 216, 216, .05);
					flex: 1;
					border-radius: 20rpx;
					padding: 0 12rpx;
					height: 75rpx;
					color: $all-secondary-text-color;
					font-weight: bold;

					font-size: 28rpx;
					position: relative;

					image {
						width: 60rpx;
						height: 63rpx;
						margin-right: 10rpx;
						position: absolute;
						bottom: 0rpx;
						left: 30rpx;
					}

					text {
						padding-left: 40rpx;
						text-transform: uppercase;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
				}

				.games_items3 {
					display: flex;
					align-items: center;
					background: linear-gradient(19.92deg, #009688 -6.45%, #00968817 78.77%), rgba(216, 216, 216, 0.05);
					//border: 1px solid #4D3C2E;
					flex: 1;
					border-radius: 20rpx;
					padding: 0 22rpx 0 22rpx;
					height: 85rpx;
					color: $all-secondary-text-color;
					font-weight: bold;
					font-size: 28rpx;
					position: relative;

					image {
						width: 50rpx;
						height: 50rpx;
						margin-right: 20rpx;
						//position: absolute;
						//bottom: 0rpx;
						//left: 30rpx;
					}

					text {
						//padding-left: 40rpx;
						text-transform: uppercase;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}

					.spinDjs {
						margin-left: auto;
						color: $all-secondary-text-color;
						align-items: center;
						background: #ffffff0a;
						//border: 1px solid #ffffff14;
						border-radius: 5px;
						display: flex;
						justify-content: center;
						padding: 5px;
						/deep/ .u-countdown-time {
							color: $all-secondary-text-color !important;
						}
						/deep/ .u-countdown-colon {
							color: $all-secondary-text-color !important;
						}
						span {
							margin-left: 10rpx;
							font-size: 24rpx;
						}
					}
				}
			}
		}

		.myinfo_box {
			background-color: $me-box-color;
			border-radius: 20rpx;
			padding: 30rpx;

			.user_info {
				display: flex;
				align-items: center;

				.user_tx {
					image {
						width: 94.93rpx;
						height: 94.93rpx;
						border-radius: 200rpx;
					}
				}

				.user_name_id {
					padding-left: 20rpx;
					flex: 1;

					.userid {
						display: flex;
						align-items: center;

						image {
							width: 18rpx;
							height: 24rpx;
							margin-left: 6rpx;
						}
					}

					.user_name_iterm {
						position: relative;
						margin-bottom: 10rpx;
						color: $me-text-color;
						display: flex;
						align-items: center;
						font-weight: bold;

						.nologin {
							font-weight: bold;
						}

						span {
							font-size: 24rpx;
							display: inline-block;
							background-color: $pupUp-bg-color;
							border-radius: 200rpx;
							padding: 6rpx 20rpx;
							font-weight: initial;
							margin-left: 10rpx;
						}

						.right_icon {
							// position: absolute;
							// right: -3px;
							// top: 0;
							margin-left: auto;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 12px;
								height: 12px;
								transform: rotate(180deg);
							}
						}
					}

					view:nth-child(2) {
						color: $me-subtext-color;
					}
				}
			}

			.user_vip {
				margin-top: 20rpx;

				.vip_title {
					color: $me-text-color;
					display: flex;
					align-items: center;

					image {
						width: 34rpx;
						height: 34rpx;
						margin-right: 10rpx;
					}

					text {
						font-weight: bold;
					}
				}

				.vip_jdt {
					margin-top: 16rpx;
					display: flex;
					align-items: flex-start;
					position: relative;

					.jdt_wrap {
						flex: 1;

						.jdt_box {
							display: flex;
							align-items: center;
							margin-bottom: 16rpx;
						}

						.jdt_ask {
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-size: 28rpx;

							view:nth-child(1) {
								color: $me-subtext-color;
							}

							view:nth-child(2) {
								color: $me-subtext-color;
							}
						}
					}

					.jdt_righticon {
						width: 10rpx;
						height: 20rpx;
						position: relative;
						top: -4rpx;
						margin-left: 30rpx;
						right: 4px;

						image {
							width: 12px;
							height: 12px;
							transform: rotate(180deg);
							position: absolute;
							top: 0;
							left: 0;
						}
					}
				}
			}
		}
	}

	.Bonus-loading {
		height: 183px;
		position: relative;

		.LoadJuZhong {
			text-align: center;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			position: absolute;

			image {
				width: 140rpx;
				height: 18px;
				position: relative;
				top: -50rpx;
			}

			.loader {
				top: 50% !important;
			}
		}
	}
</style>