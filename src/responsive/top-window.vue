<template>
	<view :style="theme" class="pc_top_nav">
		<view class="logo_and_right">
			<view class="left_logo">
				<image @click="startAnimation()" class="menu" :animation="animationData" src="/static/image/menu_fold_one_icon_155136.png"></image>
				<image class="logo"  :src="'/static/logo/' + platform + '_LOGO_MAIN.png'" mode="widthFix" @click="Tohome()"></image>
				<view class="xsTask">
					<!-- 新手任务 -->
					<NoviceTask ref="" :Bonuses="$t('NEWBonusPageB.bonuses')" :ispc="true"></NoviceTask>
				</view>
			</view>

			<view class="right_box" v-if="is_logon == 1">
				<view class="dw_app" @click="dlApp()">
					<view><u-icon name="download" color="#a8b5ca"></u-icon>{{$t('ADDnew2.DownloadTheApp')}}</view>
				</view>
				
				<view class="my_Wallet">
					<view class="mayjine" v-show="is_games_in == 0">
						<!-- <image class="shuaxin" :class="{'rotate360':showAnimate}" @click="play2()" src="/static/image/shuaxin.png"></image> -->
						<view class="yue" @click="YiJianShow = true">
							<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
							<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
							<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
							<view class="myedu">{{convertToYuan(balance)}}</view>
						</view>
						<z-top-tips ref="uTips" navbar-height="20"></z-top-tips>
					</view>
					<view class="mayjine" v-show="is_games_in == 1">
						<view class="yue">
							<view><image class="gmIng" src="/static/image/youxitianchong.png"></image></view>
						</view>
					</view>
					<view class="wallet_icon" @click="Towallet()" v-show="is_games_in == 0">
						<view><image src="/static/image/wallet_icon.png"></image></view>
					</view>
				</view>
				
				<view class="my_info" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
					<image class="mytx_icon" :src="avatar"></image>
					<u-icon name="arrow-down" color="#a8b5ca"></u-icon>
					<uni-transition :mode-class="['fade', 'zoom-in']" :show="isHover">
						<view class="isHover" v-if="isHover">
							<view class="xf_menu">
								<view class="top_sj"></view>
								<view class="menu_me_box">
									<view class="menu_me_item">
										<image :src="avatar"></image>
										<span>{{Progress.vip+1}} Rank</span>
									</view>
									<view class="menu_me_name">{{userInfo.nickName||'--'}}</view>
								</view>
								<view class="user_vip" @click="toVippage()" v-if="userInfo.userId">
									<view class="vip_title">
										<image src="/static/image/me/huangguan.png"></image><text>RANK {{Progress.vip+1}}</text>
									</view>
									<view class="vip_jdt">
										<view class="jdt_wrap">
											<view class="jdt_box">
												<u-line-progress :percent="Progress.progressRate" active-color="#3673D9"
													inactive-color="#222a38" height="14">
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
								<view class="menu_list_wrap">
									<view class="menu_list_item" @click="ToOpen(1)">
										<image src="/static/image/menuIcon/m2.png"></image>
										<span>{{$t('navBarTitle.ProfileInfo')}}</span>
									</view>
									<view class="menu_list_item" @click="ToOpen(2)">
										<image src="/static/image/bank-account.png"></image>
										<span>{{$t('ManageAccount')}}</span>
									</view>
									<view class="menu_list_item" @click="ToOpen(3)">
										<image src="/static/image/details_pc.png"></image>
										<span>{{$t('Details')}}</span>
									</view>
									<view class="menu_list_item" @click="ToOpen(4)">
										<image src="/static/image/gamehis.png"></image>
										<span>{{$t('GameHistory')}}</span>
									</view>
									<view class="menu_list_item" @click="ToOpen(5)">
										<image src="/static/image/transaction-history.png"></image>
										<span>{{$t('Transaction')}}</span>
									</view>
								</view>
								<view class="outBtn" @click="TuiChu()">{{$t('SignoutPopup.title')}}</view>
							</view>
						</view>
					</uni-transition>
				</view>
				
				<!--  @mouseenter="handleMouseEnter2" -->
				<view class="set_box" @mouseleave="handleMouseLeave2" @click="showSetPopup()">
					<u-icon name="setting-fill" color="#a8b5ca"></u-icon>
					<uni-transition :mode-class="['fade', 'zoom-in']" :show="isHover2">
						<view class="isHover" v-if="isHover2">
							<view class="xf_menu" style="padding-top: 40rpx;">
								
								<view class="top_sj" style="right: 24rpx;"></view>
								
								<view class="xf_menu_title">{{$t('SetPage.title')}}</view>
								<view class="menu_list_wrap">
									<view class="menu_list_item" @click="ToOpen(6)">
										<image src="/static/image/menuIcon/m2.png"></image>
										<span>{{$t('SetPage.LoginPassword')}}</span>
									</view>
									<view class="menu_list_item" @click="ToOpen(7)" v-if="userInfo.payPwdSet == false">
										<image src="/static/image/bank-account.png"></image>
										<span>{{$t('SetPage.FundPassword')}}</span>
									</view>
									<view class="menu_list_item" @click="ToOpen(8)" v-if="userInfo.payPwdSet == true">
										<image src="/static/image/bank-account.png"></image>
										<span>{{$t('SetPage.FundPassword')}}</span>
									</view>
								</view>
							</view>
						</view>
					</uni-transition>
				</view>
		
				
				<view class="tongzhi" @mouseenter="handleMouseEnter3" @mouseleave="handleMouseLeave3">
					<view class="jiaobiao" v-if="SystemunreadList + PersonalunreadList != 0">{{SystemunreadList + PersonalunreadList}}</view>
					<u-icon name="bell-fill" color="#a8b5ca"></u-icon>
					<uni-transition :mode-class="['fade', 'slide-right']" :styles="styles" :show="isHover3">
						<view class="isHover hover_width" v-if="isHover3">
							<view class="xf_menu" style="padding-top: 40rpx;">
								<view class="top_sj" style="right: 24rpx;"></view>
								<view class="tz_wrap">
									<pc-Notification ref="TZTanchuang"></pc-Notification>
								</view>
							</view>
						</view>
					</uni-transition>
				</view>
			</view>
			<view class="right_box" style="padding-right: 20rpx;" v-if="is_logon == 0">
				<view class="dw_app" @click="dlApp()">
					<view><u-icon name="download" color="#a8b5ca"></u-icon>{{$t('ADDnew2.DownloadTheApp')}}</view>
				</view>
				<view class="SignIn_Regiser">
					<view class="SigninBtn" @click="signPopupShow()"><span>{{$t('navBar.rtitle1')}}</span></view>
					<view class="zhuceBtn" @click="regPopupShow()">
						<span>{{$t('navBar.rtitle2')}}</span>
						<view class="animation-item"></view>
						<view class="animation-item"></view>
						<view class="animation-item"></view>
						<view class="animation-item"></view>
					</view>
				</view>
				<!-- 新手任务 -->
				<!-- <view class="xsTask">
					<NoviceTask ref=""></NoviceTask>
				</view> -->
			</view>
		</view>

		<signInPopup ref="signInShow" :isTabs="istabsType"></signInPopup>

		<!--在进入站点全局注册组件，因为先注册了导航栏组件-->
		<Happy-Birthday-Popup ref="OpenBirthdayPopup"></Happy-Birthday-Popup>
		<Congratulations-Popup ref="OpenLeveUp"></Congratulations-Popup>
		
		<!--PC个人信息弹窗-->
		<pc-Myinfo ref="openPCmyinfo"></pc-Myinfo>
		<!--充值和提款-->
		<pc-Deposit ref="openPCdeposit"></pc-Deposit>
		<!--交易历史-->
		<pc-Transaction ref="openPCTra"></pc-Transaction>
		<!-- 账户管理 -->
		<pc-manageAccount ref="openPCmange"></pc-manageAccount>
		<!-- 充提详情 -->
		<pc-myPageDetails ref="openPCdetails"></pc-myPageDetails>
		<!-- 游戏上下分记录 -->
		<pc-GamingHistory ref="openPCgameshisory"></pc-GamingHistory>
		<!-- 登录密码修改 -->
		<LoginPasswordPoppup ref="LoginPassword"></LoginPasswordPoppup>
		<!-- 设置或更改支付密码 -->
		<Fun-Password ref="funpassword" :type="FunType"></Fun-Password>
		
		<!-- 下载APP -->
		<pc-downloadApp ref="openPCdlApp"></pc-downloadApp>
		
		<pc-kefu ref="openKefu"></pc-kefu>
		
		<!--引导注册弹窗-->
		<match-media :min-width="800">
			<uni-transition :mode-class="['fade', 'slide-top']" :styles="{'max-width':'430px','height':'auto','position':'fixed','top':Topheight,'left':'0','z-index':'9999','right':'0','margin':'0 auto'}" :show="showRegisterNow">
				<Welcome-Register-Now ref="RegisterNowRefs" @RegisterNowClose="RegisterNowClose" @RegisterNowOpen="registerNowOpen"></Welcome-Register-Now>
			</uni-transition>
		</match-media>
		
		<!-- 找回金币操作 -->
		<u-popup v-model="YiJianShow" mode="center" length="auto" border-radius="34" :closeable="true">
			<view class="YijianZhaohui_wwrap">
				<image class="jinbifuhao" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
				<image class="jinbifuhao" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
				<image class="jinbifuhao" src="/static/image/jinbi-3.png" v-else></image>
				<view class="myyue">
					<u-count-to ref="shuaxinJinbi" :start-val="0" :end-val="convertToYuan(balance)" :decimals="2" color="#fff" font-size="58" :bold="true"></u-count-to>
				</view>
				<view class="dqye">{{$t('dqye')}}<image class="shuaxin" :class="{'rotate360':showAnimate}" @click="play666()" src="/static/image/shuaxin.png"></image></view>
				<view class="line"></view>
				<view class="zhtishi">
					<!-- <u-icon name="warning-fill" color="#fecf4a" size="28"></u-icon> -->
					<view>{{$t('yjhsBtn')}}</view>
				</view>
				<view class="Register_btn">
					<u-button type="primary" :loading="isDisabledTwo" @click="YiJianShouHui()">{{$t('yjhs')}}</u-button>
				</view>
				<!-- <view class="reg_btn" @click="YiJianShouHui()"><span>一键回收</span></view> -->
			</view>
		</u-popup>

	</view>
</template>


<script>
	import avatarList from "@/utils/avatar.js";
	export default {
		data() {
			return {
				platform: this.PID,
				avatarlist: avatarList.avatarlist,
				userInfo: {},
				Progress: {},
				avatar: '',
				isHover: false,
				isHover2: false,
				isHover3: false,
				istabsType: 1,
				animation: null,
				isCountTo: false,
				is_logon: 0,
				MenuShow: false,
				showAnimate: false,
				showAnimateMenu: false,
				balance: 0,
				lastMailidMin: 0,
				SystemunreadList: 0,
				PersonalunreadList: 0,
				FunType: 1, //1设置 2修改
				styles: {
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: '17px',
					right: '8px'
				},
				is_games_in: 0,
				animationData: {},
				animation: null,
				showRegisterNow: false,
				Topheight: '0',
				isDisabledTwo: false,
				YiJianShow: false,
			};
		},
		created() {
			let that = this

			let isToken = uni.getStorageSync("token")
			if (!isToken) {

			} else {
				that.getuserinfo()
				that.getMybalance()
				that.getSystemUnread()
				that.getPersonalUnread()
			}

			that.inspectToken();
			
			//注入打开PC客服弹窗方法
			uni.$on('OpenPCKefu', (val) => {
				that.$refs.openKefu.openPopup(val);
			})

			uni.$on('getinspectToken', (val) => {
				that.inspectToken()
			})

			uni.$on('getgetMybalance', (val) => {
				that.play2()
			})

			uni.$on('UpdataAddBcbalance', (val) => {
				that.UpdataAddbc(val)
			})

			uni.$on('getMyUnread', (val) => {
				that.getSystemUnread()
				that.getPersonalUnread()
			})

			//注入生日奖励控制
			uni.$on('HappyBirthdayShow', (val) => {
				that.openHappyBir(val)
			})

			//注入升级奖励控制
			uni.$on('CongratulationsShow', (val) => {
				that.openCongratulations(val)
			})
			
			//进入游戏显示游戏中
			uni.$on('OpeninGames', (val) => {
				that.openingame(val)
			})
		},
		methods: {
			RegisterNowClose(data){
				if(data == 0){
					this.showRegisterNow = false
				} else {
					this.showRegisterNow = false
					this.$refs.signInShow.openPopup(2);
				}
			},
			registerNowOpen(){
				this.showRegisterNow = true
			},
			openingame(val){
				this.is_games_in = val
			},
			handleMouseEnter() {
				this.isHover = true;
				// 进行鼠标移入时的操作
			},
			handleMouseLeave() {
				this.isHover = false;
				// 进行鼠标移出时的操作
			},
			
			
			
			showSetPopup(){
				this.isHover2 = true;
			},
			handleMouseEnter2() {
				this.isHover2 = true;
				// 进行鼠标移入时的操作
			},
			handleMouseLeave2() {
				this.isHover2 = false;
				// 进行鼠标移出时的操作
			},
			
			
			
			handleMouseEnter3() {
				let that = this
				that.isHover3 = true;
				that.$nextTick(() => {
					that.$refs.TZTanchuang.init()
				})
				
				
				// 进行鼠标移入时的操作
			},
			handleMouseLeave3() {
				this.isHover3 = false;
				// 进行鼠标移出时的操作
			},
			
			ToOpen(index) {
				if (index == 1) {
					this.$refs.openPCmyinfo.openPopup()
				} else if (index == 2) {
					this.$refs.openPCmange.openPopup()
				} else if (index == 3) {
					this.$refs.openPCdetails.openPopup(0)
				} else if (index == 4) {
					this.$refs.openPCgameshisory.openPopup()
				} else if (index == 5) {
					this.$refs.openPCTra.openPopup()
				} else if (index == 6) {
					this.$refs.LoginPassword.openPopup()
				} else if (index == 7) {
					this.FunType = 1
					this.$refs.funpassword.openPopup()
				} else if (index == 8) {
					this.FunType = 2
					this.$refs.funpassword.openPopup()
				}
			},
			TuiChu(){
				uni.removeStorageSync('userinfo');
				uni.removeStorageSync('token');
				uni.$emit("getinspectToken", 1)
				
				this.$refs.RegisterNowRefs.hideRegisterNowRefs(0)
				this.showRegisterNow = false
				
				//#ifdef  H5
				window.location.reload();
				// uni.reLaunch({
				// 	url: '/pages/index/index',
				// 	success: function(res) {}
				// })
				//#endif
				
				//#ifdef  APP-PLUS
				uni.reLaunch({
					url: '/pages/index/index'
				})
				//#endif
			},







			dlApp(){
				this.$refs.openPCdlApp.openShow()
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
					that.getVipDetails()
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
			ToNotification() {
				this.$refs.RegisterNowRefs.hideRegisterNowRefs(0)
				this.showRegisterNow = false
				let isOpen = uni.getStorageSync("NotisOpen");
				if (isOpen == 1) {
					////console.log('已经打开通知页面了')
				} else {
					uni.setStorageSync("NotisOpen", 1)
					uni.navigateTo({
						url: '/pages/Notification/Notification'
					})
				}
			},
			// 定义一个函数用于进行单位转换
			convertToYuan(amount) {
				return (amount / 100).toFixed(2);
			},
			Towallet() {
				this.$refs.openPCdeposit.openPopup()
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
			openHappyBir(data) {
				let that = this
				that.$nextTick(() => {
					that.$refs.OpenBirthdayPopup.openPopup(data)
				})
			},
			openCongratulations(data) {
				let that = this
				that.$nextTick(() => {
					that.$refs.OpenLeveUp.openPopup(data)
				})
			},
			UpdataAddbc(val) {
				//console.log(val)
				//let Bc = (val/100).toFixed(2)
				let that = this
				that.$nextTick(() => {
				    that.$refs.uTips.show({
				    	title: '+' + val,
				    	type: 'success',
				    	duration: '3000'
				    })
				});
			},
			YiJianShouHui(){
				let that = this
				that.isDisabledTwo = true
				setTimeout(()=>{
					this.$u.post('/transfer-out-balance', {
					
					}).then(res => {
						that.getMybalance()
						setTimeout(() => {
							that.$refs.shuaxinJinbi.start();
						}, 1000);
						that.isDisabledTwo = false
					}).catch(err => {
						that.isDisabledTwo = false
					})
				},500)
			},
			
			
			
			getMybalance() {
				let that = this
				that.$u.post('/refresh-balance', {

				}).then(res => {
					that.balance = res.data.balance
				}).catch(err => {

				})
			},
			play666(){
				let that = this
				that.showAnimate = true
				that.isCountTo = true
				that.getMybalance()
				setTimeout(() => {
					that.showAnimate = false
					that.isCountTo = false
					that.$refs.shuaxinJinbi.start();
				}, 1000)
			},
			
			
			
			
			play2() {
				let that = this
				this.showAnimate = true
				this.isCountTo = true
				that.getMybalance()
				setTimeout(() => {
					this.showAnimate = false
					this.isCountTo = false
				}, 1000)
			},
			inspectToken() {
				let that = this
				let token = uni.getStorageSync("token");

				if (!token) {
					this.is_logon = 0
				} else {
					this.is_logon = 1
					that.getuserinfo()
					that.getMybalance()
					that.getSystemUnread()
					that.getPersonalUnread()
				}
			},
			regPopupShow() {
				this.MenuShow = false
				this.istabsType = 2
				this.$refs.signInShow.openPopup(2)
			},
			signPopupShow() {
				this.MenuShow = false
				this.istabsType = 1
				this.$refs.signInShow.openPopup(1)
			},
			Tohome() {
				//导航栏金币显示
				uni.$emit('OpeninGames', 0);
				
				this.$refs.RegisterNowRefs.hideRegisterNowRefs(0)
				this.showRegisterNow = false
				
				let isToken = uni.getStorageSync("token")
				if (!isToken) {} else {
					this.outBalance();
				}
				
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			outBalance() {
				let that = this
				that.$u.post('/transfer-out-balance', {
					
				}).then(res => {
					//刷新用户余额
					uni.$emit('getgetMybalance', 1);
				});
			},
			startAnimation() {
				//旋转角度 
				let rota = 180;
				//判断是否展开
				if (this.MenuShow) {
					rota = 0;
					//标记未展开
					this.MenuShow = false;
					uni.setLeftWindowStyle({
					    display: 'block',
						width: '230px'
					})
				} else {
					this.MenuShow = true;
					uni.setLeftWindowStyle({
					    display: 'none',
						width: '0'
					})
				}
				
				//打开PC侧边菜单
				//this.$emit('openPCmenu',this.MenuShow)
				
				//创建动画
				this.animation = uni.createAnimation({
					duration: 400
				});
				//设置旋转角度 
				this.animation.rotate(rota).step()
				//导出动画
				this.animationData = this.animation.export()
			},
			toVippage() {
				
				this.$refs.RegisterNowRefs.hideRegisterNowRefs(0)
				this.showRegisterNow = false
				
				this.isHover = false
				//导航栏金币显示
				uni.$emit('OpeninGames', 0);
				let isToken = uni.getStorageSync("token")
				if (!isToken) {} else {
					this.outBalance();
				}
				setTimeout(()=>{
					uni.navigateTo({
						url: '/pages/VipClubsNew/VipClubsNew'
					})
				},200)
			},

		}
	}
</script>

<style lang="scss">
	.YijianZhaohui_wwrap {
		position: relative;
		padding: 30rpx;
		background-color: $pupUp-bg-color;
		text-align: center;
		color: $font-all-color;
		.jinbifuhao {
			width: 98rpx;
			height: 98rpx;
			margin: 20rpx 0 30rpx 0;
		}
		.myyue {
			font-size: 58rpx;
			font-weight: bold;
			color: $all-secondary-text-color;
		}
		.dqye {
			margin: 10rpx 0 0 0;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 28rpx;
				height: 28rpx;
				margin-left: 10rpx;
				cursor: pointer;
			}
		}
		.zhtishi {
			padding: 0 20rpx;
			margin-bottom: 30rpx;
			font-size: 24rpx;
			color: #55657e;
			display: flex;
			align-items: center;
			justify-content: center;
			.u-icon {
				margin-right: 10rpx;
			}
		}
		.line {
		    background: linear-gradient(90deg, #ffffff00 -3%, #ffffff26 48.66%, #ffffff00 103.12%);
		    height: 1px;
		    margin: 30rpx 0;
		    width: 100%;
		}
	}
	.xsTask {
		position: relative;
		z-index: 6;
		//left: -10rpx;
		margin-left: 30rpx;
		cursor: pointer;
	}
	.pc_top_nav {
		background-color: $all-secondary-color;
		height: 100%;
	}
	.hover_width {
		width: 365px !important;
	}
	.isHover {
		width: 265px;
		background-color: transparent;
		padding: 58rpx 0 0 0;
		border-radius: 28rpx;
		position: absolute;
		top: 0;
		right: -20rpx;
		z-index: 2;

		.xf_menu {
			background-color: #1e2531;
			padding: 60rpx 30rpx 30rpx 30rpx;
			border-radius: 28rpx;
			position: relative;
			.top_sj {
				position: absolute;
				top: -8rpx;
				right: 48rpx;
				background-color: #1e2531;
				display: inline-block;
				width: 16px;
				height: 16px;
				transform: rotate(45deg);
				border-radius: 4rpx;
			}
			.xf_menu_title {
				color: $all-secondary-text-color;
				font-weight: bold;
				font-size: 34rpx;
				margin-bottom: 30rpx;
			}
			
			.menu_me_box {
				text-align: center;

				.menu_me_item {
					position: relative;

					image {
						width: 140rpx;
						height: 140rpx;
						border-radius: 200rpx;
						border: 2px solid #3673D9;
					}

					span {
						display: inline-table;
						position: absolute;
						left: 0;
						right: 0;
						text-align: center;
						bottom: -10rpx;
						margin: 0 auto;
						background-color: #3673D9;
						color: #fff;
						border-radius: 200rpx;
						padding: 4rpx 20rpx;
						font-size: 24rpx;
					}
				}

				.menu_me_name {
					font-weight: bold;
					color: #fff;
					margin-top: 30rpx;
				}
			}

			.menu_list_wrap {
				padding: 36rpx;
				background-color: #2c3545;
				width: 100%;
				margin: 0 auto;
				border-radius: 28rpx;

				.menu_list_item {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					cursor: pointer;
					margin-bottom: 36rpx;

					image {
						width: 40rpx;
						height: 40rpx;
					}

					span {
						margin-left: 20rpx;
						font-weight: bold;
						color: #aab5c8;
						font-size: 26rpx;
					}
					
					span:hover {
						color: $all-secondary-text-color;
					}
				}

				.menu_list_item:last-child {
					margin-bottom: 0;
				}
			}
			.outBtn {
				display: inline-block;
				padding: 22rpx 36rpx;
				background-color: #393f4a;
				margin: 30rpx 0 0 0;
				border-radius: 18rpx;
				font-weight: bold;
				color: #aab5c8;
			}
			.outBtn:hover {
				color: $all-secondary-text-color;
			}
		}
	}

	.logo_and_right {
		width: 100%;
		height: 64px;
		padding: 0 12rpx 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left_logo_dayTwo {
			display: flex;
			align-items: center;

			.menu {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
			}

			.nav_title {
				color: #FEFEFE;
				//font-weight: bold;
				font-size: 30rpx;
			}

			.menu2 {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
			}

			.logo {
				width: 234rpx;
				height: 60rpx;
			}
		}

		.left_logo {
			display: flex;
			align-items: center;
			.menu {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
				cursor: pointer;
			}

			.menu2 {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
			}

			.logo {
				width: 270rpx;
				cursor: pointer;
				height: 108rpx;
			}
		}

		.right_box {
			display: flex;
			align-items: center;
			
			.dw_app {
				display: flex;
				align-items: center;justify-content: center;
				border: 1px solid #232e3d;
				background-color: #232e3d;
				border-radius: 14rpx;
				color: $all-secondary-text-color;
				padding: 0 20rpx;
				height: 72rpx;
				line-height: 72rpx;
				margin-right: 30rpx;
				font-size: 26rpx;
				cursor: pointer;
				.u-icon {
					font-size: 34rpx;
					margin-right: 6rpx;
				}
			}
			.dw_app:hover {
				border-color: #1398f9;
				color: $all-secondary-text-color;
			}

			.SignIn_Regiser {
				display: flex;
				align-items: center;
				color: #fff;
				//font-weight: bold;
				font-size: 26rpx;
				position: relative;

				.SigninBtn {
					//width: 147.22rpx;
					//height: 64rpx;
					//line-height: 64rpx;
					//text-align: center;
					position: relative;
					//margin-left: 20rpx;
					cursor: pointer;

					span {
						font-weight: bold;
						display: inline-block;
						background-color: #3673D9;
						background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
						box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
						border-radius: 6px;
						height: 64rpx;
						line-height: 64rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
						transition: transform .1s ease-in-out;
					}
				}

				.SigninBtn:after {
					padding: 0 24rpx;
					border-radius: 6px;
					height: 64rpx;
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

				.zhuceBtn {
					position: relative;
					margin-left: 30rpx;
					cursor: pointer;

					span {
						font-weight: bold;
						display: inline-block;
						background-color: #3673D9;
						//background: linear-gradient(1turn,#FF9619 .8%,#FFB930);
						//box-shadow: 0 3px 16px #6f3f06,inset 0 4px 3px #ffffff4d;
						background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
						box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
						border-radius: 6px;
						height: 64rpx;
						line-height: 64rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
						transition: transform .1s ease-in-out;
					}
				}

				.zhuceBtn:after {
					padding: 0 24rpx;
					border-radius: 6px;
					height: 64rpx;
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
			}

			.my_info {
				margin-left: 30rpx;
				background: #232e3d;
				border-radius: 200rpx;
				padding: 10rpx 20rpx 10rpx 10rpx;
				display: flex;
				align-items: center;
				cursor: pointer;
				position: relative;
				z-index: 4;
				
				.u-icon {
					margin-left: 20rpx;
					margin-right: 10rpx;
					font-size: 24rpx;
				}

				.mytx_icon {
					width: 46rpx;
					height: 46rpx;
					border-radius: 200rpx;
					border: 2px solid #3673D9;
				}
			}
			
			.set_box {
				cursor: pointer;
				margin-left: 30rpx;
				background: #232e3d;
				border-radius: 18rpx;
				position: relative;
				z-index: 3;
				width: 68rpx;
				height: 68rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.u-icon {
					font-size: 36rpx;
					/deep/ .u-icon__icon:hover {
						color: #fff !important;
					}
				}
			}

			.tongzhi {
				cursor: pointer;
				background: #232e3d;
				border-radius: 18rpx;
				position: relative;
				z-index: 2;
				width: 68rpx;
				height: 68rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 10px 0 15px;
				
				.u-icon {
					font-size: 36rpx;
					/deep/ .u-icon__icon:hover {
						color: #fff !important;
					}
				}
				
				.jiaobiao {
					display: inline-block;
					width: 36rpx;
					height: 36rpx;
					//background: linear-gradient(1turn, #1bb83d .8%, #1bb83d);
					//box-shadow: 0 3px 16px #005413, inset 0 4px 3px #ffffff4d;

					background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
					box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;

					border-radius: 100px;
					position: absolute;
					top: -6rpx;
					right: -6rpx;
					text-align: center;
					line-height: 32rpx;
					color: #FEFEFE;
					font-size: 24rpx;
					z-index: 2;
					padding: 1px 1px;
				}

				image {
					position: relative;
					top: 0;
					width: 42rpx;
					height: 42rpx;
				}
			}

			.my_Wallet {
				position: relative;
				z-index: 5;
				display: flex;
				align-items: center;
				background-color: #242d3c;
				border-radius: 10px;
				margin-right: 5rpx;
				box-shadow: 0 0 20px rgba(23, 23, 25, 0.38);
				height: 38px;
				cursor: pointer;

				.mayjine {
					padding: 0 10rpx 0 20rpx;
					display: flex;
					align-items: center;
					position: relative;

					.shuaxin {
						width: 26.39rpx;
						height: 26.39rpx;
						margin-right: 15rpx;
						position: relative;
						top: 1rpx;
					}

					.yue {
						font-size: 28rpx;
						color: #fff;
						margin-right: 10rpx;
						display: flex;
						align-items: center;
						
						.myedu {
							text-decoration: underline;
						}

						span {
							margin-right: 6rpx;
						}

						view {
							//font-weight: bold;
							font-size: 28rpx;
						}
						.gmIng {
							padding: 10rpx 0;
							width: 55rpx;
							height: 50rpx;
						}
					}
				}

				// .wallet_icon {
				// 	width: 80rpx;
				// 	height: 70rpx;
				// 	line-height: 70rpx;
				// 	display: flex;
				// 	align-items: center;
				// 	justify-content: center;
				// 	//background-image: linear-gradient(to right, #548dff, #0c5eff);
				// 	background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
				// 	box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
				// 	border-radius: 10px;

				// 	image {
				// 		width: 29.86rpx;
				// 		height: 27.08rpx;
				// 	}
				// }
				
				
				.wallet_icon {
					position: relative;
					view {
						// word-break:break-all;
						// display:-webkit-box;
						// -webkit-line-clamp:1;
						// -webkit-box-orient:vertical;
						display: flex;
						align-items: center;
						justify-content: center;
						overflow:hidden;
						background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
						box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
						border-radius: 10px;
						height: 34px;
						text-align: center;
						padding: 0 12px;
						position: relative;
						z-index: 2;
						top: -2px;
						image {
							width: 29.86rpx;
							height: 27.08rpx;
						}
					}
				}
				.wallet_icon:after {
					border-radius: 10px;
					height: 34px;
					background-color: #61001d;
					bottom: -2px;
					content: "";
					display: block;
					left: 0;
					right: 0;
					margin: 0 auto;
					position: absolute;
					z-index: 1;
				}
				
				
			}
		}
	}

	.user_vip {
		width: 100%;
		margin: 20rpx auto;
		background-color: #2c3545;
		padding: 20rpx;
		border-radius: 28rpx;

		.vip_title {
			color: #aab5c8;
			display: flex;
			align-items: center;

			image {
				width: 34rpx;
				height: 34rpx;
				margin-right: 10rpx;
			}

			/*text {
				//font-weight: bold;
			}*/
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
					font-size: 24rpx;

					view:nth-child(1) {
						color: #aab5c8;
					}

					view:nth-child(2) {
						color: #aab5c8;
					}
				}
			}

			.jdt_righticon {
				width: 10rpx;
				height: 20rpx;
				position: relative;
				top: -4rpx;
				margin-left: 12rpx;
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
</style>