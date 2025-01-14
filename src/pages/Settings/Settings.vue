<template>
	<view :style="theme" class="page_boxs">
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('SetPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->
			
			<pagesNavTitle ref="" :title="$t('SetPage.title')"></pagesNavTitle>
			<view class="page_wrap">
				<view class="menus_list_wrap">
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('SetPage.LoginPassword')" :border-bottom="false"
								:title-style="titleStype" hover-class="none" index="1" @click="meopenMenu"
								:arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/me/password_3715.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
								</view>
							</u-cell-item>

							<u-cell-item v-if="userInfo.payPwdSet == false" :title="$t('SetPage.FundPassword')"
								:border-bottom="false" :title-style="titleStype" hover-class="none" index="2"
								@click="meopenMenu" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/me/security_icon_135219.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
								</view>
							</u-cell-item>
							<u-cell-item v-else-if="userInfo.payPwdSet == true" :title="$t('SetPage.FundPassword')"
								:border-bottom="false" :title-style="titleStype" hover-class="none" index="22"
								@click="meopenMenu" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/me/security_icon_135219.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
								</view>
							</u-cell-item>
							<u-cell-item :title="$t('navBarTitle.ProfileInfo')" :border-bottom="false"
								:title-style="titleStype" hover-class="none" index="66" @click="meopenMenu"
								:arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/menuIcon/m2.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
				</view>
				<view class="menus_list_wrap">
				<!--<view class="cell_box">
					<u-cell-group :border="false">
						<u-cell-item :title="$t('navBarTitle.Phone')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="3" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="28" name="/static/image/me/password_3715.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item>
						<u-cell-item :title="$t('navBarTitle.Email')" :border-bottom="false" :title-style="titleStype"
							hover-class="none" index="4" @click="meopenMenu" :arrow="false">
							<u-icon slot="icon" size="26" name="/static/image/me/security_icon_135219.png"></u-icon>
							<view slot="right-icon">
								<image class="arrow_right" src="/static/image/arrow_right_icon.png"></image>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>-->
			</view>
				<view class="menus_list_wrap">
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('SetPage.Language')" :border-bottom="false"
								:title-style="titleStype" hover-class="none" index="5" @click="meopenMenu"
								:arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m11.png"></u-icon>
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
			</view>
			<view class="Signbut" @click="SignoutPopupShow()">{{$t('SetPage.SignOut')}}</view>
		
		<!-- </uni-transition> -->

		<!-- 退出登录弹窗 -->
		<SignoutPpopup ref="Signout"></SignoutPpopup>

		<!-- 语言切换弹窗 -->
		<LanguagePopup ref="Language"></LanguagePopup>

		<!-- 邮箱验证弹窗 -->
		<EmailPopup ref="Emailpopup"></EmailPopup>

		<!-- 登录密码修改 -->
		<LoginPasswordPoppup ref="LoginPassword"></LoginPasswordPoppup>

		<!-- 设置或更改支付密码 -->
		<Fun-Password ref="funpassword" :type="FunType"></Fun-Password>

		<!-- 设置修改手机号 -->
		<Phone-modify ref="PhoneModify"></Phone-modify>

	</view>
</template>

<script>
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
				
				showOptions: true,
				titleStype: {
					
				},
				userInfo: "",

				FunType: 1, //1设置 2修改
			}
		},
		onShow() {
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				uni.$emit('getgetMybalance', 1);
				this.getuserinfo()
				uni.$emit('ZhuRulookBenDihb', 1);
			}
			
			
			let theme = this.$store.getters.currentTheme;
			if (theme == "whiteTheme") {
				this.ztidex = 1
				console.log('白色主题')
			} else {
				this.ztidex = 0
				console.log('黑色主题')
			}
			
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
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
			
			getuserinfo() {
				let that = this
				that.userInfo = uni.getStorageSync("userinfo")
			},
			SignoutPopupShow() {
				this.$refs.Signout.openPopup()
			},
			meopenMenu(idx) {
				if (idx == 1) {
					this.$refs.LoginPassword.openPopup()
				} else if (idx == 2) {
					this.FunType = 1
					this.$refs.funpassword.openPopup()
				} else if (idx == 22) {
					this.FunType = 2
					this.$refs.funpassword.openPopup()
				} else if (idx == 66) {
					uni.navigateTo({
						url: '/pages/ProfileInfo/ProfileInfo'
					})
				} else if (idx == 3) {
					this.$refs.PhoneModify.openPopup()
				} else if (idx == 4) {
					this.$refs.Emailpopup.openPopup()
				} else if (idx == 5) {
					this.$refs.Language.openPopup()
				} else if (idx == 6) {

				}

			}
		}
	}
</script>

<style lang="scss">
	
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
	
	.Signbut {
		font-size: 30rpx;
		color: #2c62f4;
		//font-weight: bold;
		text-align: center;
		margin: 0 0;
	}

	.page_wrap {
		padding: 20rpx 20rpx;
		background-color: $body-bg-color !important;
	}

	.menus_list_wrap {
		margin: 0 0 20rpx 0;

		.cell_box {

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
				color: #E1EBFF !important;
			}

			/deep/ .u-cell_title {
				padding-left: 34rpx;
				font-weight: bold;
			}
		}
	}
</style>