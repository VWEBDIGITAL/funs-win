<template>
	<view :style="theme" class="content_wrap">
    <view class="hero-swiper">
    <!-- Skeleton Loader -->
    <view v-if="!swpier_skeleton_loading">
	<view class="swpier_skeleton_box_height">	
	  <view class="swpier_skeleton_loading"></view>
	</view>
	<view class="skeleton_box_height">
	  <view class="skeleton_loading"></view>
	  <view class="skeleton_loading"></view>
	  <view class="skeleton_loading"></view>
	  <view class="skeleton_loading"></view>
	</view>
    </view>
    <!-- Swiper Component -->
    <PromotionSwiper v-else />
    </view>
		<!-- 滑动广告图 -->
		<uni-transition ref="achd" class="achd_popup_dh" :mode-class="['fade', 'zoom-in']" :show="showACHDPopup && ACswiper.length > 0">
			<u-mask :show="showACHDPopup" :mask-click-able="false" @click="showACHDGuanbi()" :custom-style="{background: 'rgba(0, 0, 0, 0.5)'}"></u-mask>
			<view class="achd_popup_box">
				<view class="swiper_popup_box">
					<view class="prevleft" @click="prev">
						<u-icon name="arrow-left" size="30" :color="currentIndex == 0?'#5d636c':'#fff'"></u-icon>
					</view>
					<!--{ height: swiperHeight + 'px' }-->
					<swiper class="swiper" style="height: 540px;" :current="currentIndex" @change="handleSwiperChange" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in ACswiper" :key="index">
							<image id="u-gridh" class="achdtu" :src="item.picture" mode="aspectFit"></image>
						</swiper-item>
					</swiper>
					<view class="nextright" @click="next">
						<u-icon name="arrow-right" size="30" :color="currentIndex == ACswiper.length-1?'#5d636c':'#fff'"></u-icon>
					</view>
				</view>
				<view class="today_hide" v-if="isLogin">
					<u-checkbox-group>
						<u-checkbox @change="today_hideChange" v-model="HDavTodayHide" name="HideToday">
							<view class="checkbox">
								{{$t('NewlyAdded.HideToday')}}
							</view>
						</u-checkbox>
					</u-checkbox-group>
				</view>
				
				<view class="hd_guanbi" @click="showACHDGuanbi()">
					<image src="/static/image/hd_guanbi_icon.png" @click="showACHDGuanbi()"></image>
				</view>
			</view>
		</uni-transition>
		
		<!-- 登录窗口 -->
		<signInPopup ref="signInShow" :isTabs="1"></signInPopup>
		
		<!-- 大逃杀游戏悬浮窗 -->
		<!-- <view v-if="Object.keys(OneGames).length !== 0">
			<drag-button :data="OneGames" :isDock="true" :existTabBar="false" @btnClick="btnClick" />
		</view> -->
		
		<install-popup ref="openInstallshow" @CheckboxChange="checkboxChange" @guanBiinstallPopup="GuanBiinstallPopup"></install-popup>
		<!-- 顶部导航 -->
		<match-media :max-width="800">
			<navbar ref="child" :isCountTo="true" :showInstall="true" @openPCmenu="openPCmenu" @GuanInstall="JiSuanXiDing"></navbar>
		</match-media>

		<!--充值和提款-->
		<pc-Deposit ref="openPCdeposit"></pc-Deposit>

		<!--生日礼金弹窗-->
		<Happy-Birthday-Popup ref="OpenBirthdayPopup"></Happy-Birthday-Popup>

		<!--等级升级奖金发放弹窗-->
		<Congratulations-Popup ref="OpenLeveUp"></Congratulations-Popup>


		<match-media :max-width="800">
			<!--引导注册弹窗-->
			<uni-transition :mode-class="['fade', 'slide-top']" :styles="{'max-width':'430px','height':'auto','position':'fixed','top':Topheight,'left':'0','z-index':'9999','right':'0','margin':'0 auto'}" :show="showRegisterNow">
				<Welcome-Register-Now ref="RegisterNowRefs" @RegisterNowClose="RegisterNowClose" @RegisterNowOpen="registerNowOpen"></Welcome-Register-Now>
			</uni-transition>
		</match-media>


		<!--登录注册弹窗-->
		<signInPopup ref="signInShow"></signInPopup>


		<uni-transition class="qiliuba_hylb" :mode-class="['fade', 'slide-bottom']" :show="showDepositBonus">
			<Welcome-DepositBonusPlus ref="Openshows" @dakitikPopup="dakitikPopup" @DepositBonusClose="DepositBonusClose"></Welcome-DepositBonusPlus>
		</uni-transition>


		<NoviceTask ref="openNovice" :isShowIcon="false"></NoviceTask>


		<!--PC通知弹窗-->
		<view class="mask_ceng" v-show="showPCnc" @click="showPCnc = false" hover-stop-propagation @touchmove.stop.prevent="() => {}"></view>
		<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'max-width':'430px','height':'auto','position':'fixed','top':'0','left':'0','z-index':'10075','right':'0','margin':'0 auto','bottom':'0'}" :show="showPCnc">
			<view class="tz_wrap">
				<view class="guanbi" @click="showPCnc = false">
					<view class="reg_titles">
						<view>{{$t('NotificationPage.title')}}</view>
					</view>
					<u-icon name="close" color="#fff"></u-icon>
				</view>
				<view class="tc_lan">
					<pc-Notification ref="TZTanchuang"></pc-Notification>
				</view>
			</view>
		</uni-transition>


		<view class="list_wrap_box">
			<!-- 轮播图 -->
			<home-swiper ref="" :Gamesdata="OneGames" @btnClick="btnClick" :list="lunbotuList" :systemList="SystemunreadList" v-if="swpier_skeleton_loading"></home-swiper>
			<view v-else class="swpier_skeleton_box_height">
				<view class="swpier_skeleton_loading"></view>
			</view>
			<view class="notice-bar" v-if="SystemunreadList.length != 0">
				<u-notice-bar speed="90" type="primary" color="#ffffff" bg-color="rgba(255, 0, 0, 0)" mode="horizontal" :list="SystemunreadList" :no-list-hidden="false" :close-icon="false" :more-icon="true" @getMore="ToNocInfo" @click="ToNocInfo"></u-notice-bar>
			</view>
			
			<!-- <view style="color: #fff;text-align: center;margin: 30rpx 0 20rpx 0;">{{thisuuid}}</view> -->

			<!-- 搜索拦H5 -->
			<!-- <match-media :max-width="800" v-if="platform != 8">
				<view class="sousuo_lan_wrap">
					<view class="sousuo_lan">
						<u-search :placeholder="$t('NewlyAdded.Enter')" v-model="keyword" @search="StartSearch" height="78" shape="square" search-icon-color="#566488" placeholder-color="#566488" bg-color="transparent" border-color="transparent" :show-action="false"></u-search>
					</view>
					<view class="sousuo_Btn" @click="ClickSearch()">{{$t('NewlyAdded.Search')}}</view>
				</view>
			</match-media> -->

			<!-- 顶选项卡 -->
			<uv-sticky :z-index="98" :offsetTop="offsetTop" customNavHeight="0">
				<view class="tabs_wrap_box">
					<view class="v-tabs_wrap" v-if="skeleton_loading">
                    <view class="lobby_nav">
						<match-media :max-width="800">
							<u-tabs :list="tagList" name="name" :is-scroll="true" :current="Tagcurrent" @change="tabChange"></u-tabs>
						</match-media>
						<!-- #ifndef APP-PLUS -->
						<match-media :min-width="800">
							<pc-homeTabs ref="" :list="tagList" @change="tabChange"></pc-homeTabs>
						</match-media>
						<!-- #endif -->
                     </view>
					</view>
					<view v-else class="skeleton_box_height">
						<view class="skeleton_loading"></view>
						<view class="skeleton_loading"></view>
						<view class="skeleton_loading"></view>
						<view class="skeleton_loading"></view>
					</view>
					<!-- #ifndef APP-PLUS -->
					<match-media :min-width="800">
						<view class="souso_cion" @click="Tosearch()" v-if="skeleton_loading"><u-icon name="search" color="#3c485c" size="38"></u-icon>{{$t('Qiaozhi.Search')}}</view>
					</match-media>
					<!-- #endif -->
				</view>
			</uv-sticky>
			<view class="games_wrap_box">
				<view v-show="Tagcurrent == 0">
					<view v-show="showHotGame == false">
						<home-games-list ref="homeGames" :Hoemloadingtrue="hoemloadingtrue" :HotBaoJiangList="HotBaoJiangLists" :categoryGames="categoryGames" :GameHotList="GameHotList" :GameHistory="GameHistory" :Proid="Proid" @JumpTap="jumpTap"></home-games-list>
					</view>
				</view>
				<!-- 其他Tabs游戏列表 -->
				<view v-show="Tagcurrent != 0">
					<home-tab-gamelist ref="" @TapLookMore="tapLookMore" :TabtotalCount="TabtotalCount" :TabGamesList="TabGamesList" :isNomore="isNomore" :classInfo="classInfo"></home-tab-gamelist>
				</view>
			</view>
			<!-- 关于我们和技术支持 -->
			<home-bottom-info ref=""></home-bottom-info>
		</view>
			
		
		    <!-- Qiaozhi Game-Selection -->
			<GameSelection />
			<!-- Qiaozhi AboutFeedback -->
			<AboutFeedback />
			<!-- Qiaozhi Footer -->
			<Footer />

		<DepositoAdv ref="DepositoAdvOpen"></DepositoAdv>
		<!-- 登录密码修改 -->
		<LoginPasswordPoppup ref="LoginPassword"></LoginPasswordPoppup>

		<match-media :max-width="800">
			<!-- 右下角客服 -->
			<view class="CbianKfu">
				<!-- <view @click="TochatUrl()">
					<view class="kf_text">{{$t('sidebar.title10')}}</view>
					<view class="msg_num" v-if="unReadMsg.unReadCnt>0">{{unReadMsg.unReadCnt}}</view>
				</view> -->
				<view class="msg_info_wrap" v-if="kefuMsgTag && unReadMsg.unReadCnt>0">
					<view class="msg_info">
						<view class="kefu_icon" @click="TochatUrl()">
							<image src="/static/image/kefu_bottom.png" mode=""></image>
						</view>
						<view class="kefu_info" @click="TochatUrl()">
							<view class="msg_info_title">{{unReadMsg.lastSender}}</view>
							<view class="msg_info_text">{{unReadMsg.lastMsg}}</view>
						</view>
						<view class="gb_icon">
							<u-icon @click="GbkefuMsgTag()" name="close" color="#fff"></u-icon>
						</view>
						<view class="right_sanjiao"></view>
					</view>
				</view>
			</view>
			<!-- <view>页面宽度低于 800px 时显示</view> -->
			<u-tabbar></u-tabbar>
		</match-media>
		
		
		<!-- PC客服未读消息提示 -->
		<match-media :min-width="800">
			<view class="CbianKfu_pc">
				<view class="msg_info_wrap" v-if="kefuMsgTag && unReadMsg.unReadCnt>0"><!---->
					<view class="msg_info">
						<view style="display: flex;align-items: center;" @click="TochatUrl()">
							<view class="kefu_icon">
								<span>{{unReadMsg.unReadCnt||0}}</span>
								<image src="/static/image/kefu_bottom.png" mode=""></image>
							</view>
							<view class="kefu_info">
								<view class="msg_info_title">{{unReadMsg.lastSender}}</view>
								<view class="msg_info_text">{{unReadMsg.lastMsg}}</view>
							</view>
						</view>
						<view class="gb_icon">
							<u-icon @click="GbkefuMsgTag()" name="close" color="#fff"></u-icon>
						</view>
						<!-- <view class="right_sanjiao"></view> -->
					</view>
				</view>
			</view>
		</match-media>
		<!-- <suspensionKf></suspensionKf> -->
		<!-- <u-back-top :scroll-top="scrollTop" icon="/static/image/back-top.png" right="0" bottom="270" :icon-style="{width: '34px',height:'34px',borderRadius:'5px'}" :custom-style="{width: '34px',height:'34px',borderRadius:'5px',backgroundColor:'transparent'}"></u-back-top> -->

		<!--生成下载app的二维码-->
		<view class="erweim">
			<yz-qr @qrOpen="Openqr" :qrPath.sync="qrPath" :text="recommendedLink" :size="size" :quality="quality" :colorDark="colorDark" :colorLight="colorLight"></yz-qr>
		</view>


		<!-- 底部提示安装APP -->
		<!-- #ifndef APP-PLUS -->
		<match-media :max-width="800">
			<view class="install_webapp install_webapp_home" @click="OpenInstallguiin()" v-if="yqhaoyoushow">
				<image class="mini_logo2" :src="'/static/image/addtoDS.png'"></image>
				<view class="install_info">
					<view>{{$t('NewUserPopup.ADDHOME')}}</view>
				</view>
				<view class="install_colso" @click.stop="GuanBiinstall()"><u-icon name="close" color="#ffffff"></u-icon>
				</view>
			</view>
		</match-media>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<AppPopUp ref="AppUpdate"></AppPopUp>
		<!-- #endif -->
	</view>
</template>

<script>
	const app = getApp();
	import {
		websocetObj
	} from '@/utils/socket.js';
	import dragButton from "@/components/drag-button/drag-button.vue";
	import PromotionSwiper from "@/components/PromotionSwiper/PromotionSwiper.vue";
	import GameSelection from "@/components/GameSelection/GameSelection.vue";
	import AboutFeedback from "@/components/AboutFeedback/AboutFeedback.vue";
	import Footer from "@/components/Footer/Footer.vue";

	//import FingerprintJS from '@fingerprintjs/fingerprintjs';
	export default {
		components: {
		    dragButton,
			PromotionSwiper,
			GameSelection,
			AboutFeedback,
			Footer,
		    },
		data() {
			return {
				platform: this.PID,
				title: 'Hello',
				pic: '/static/logo/1_logo.png',
				email: '',
				sitekey: '6LdhYGcqAAAAAGFUxPtCeRF0v8VZvHDzFV7926GY',
				
				OneGames: {},
				offsetTop: '59',
				showDepositBonus: false,
				showPCnc: false,
				pcmenuWidth: '300px',
				
				thisuuid: '',

				qrPath: '',
				size: 70,
				quality: 'L',
				colorDark: '#000000',
				colorLight: '#ffffff',
				recommendedLink: '',

				SystemunreadList: [],
				Topheight: '0',
				showRegisterNow: false,

				scrollTop: 0,
				tabslist: [],
				Tagcurrent: 0,
				tagList: [],
				categoryGames: [],
				HotBaoJiangLists: [],
				GameHistory: [],
				GameHotList: [],
				hoemloadingtrue: true,
				vendorsList: [],
				TabsvendorsList: [],
				TabGamesList: [],
				TabtotalCount: 0,
				TapPageSize: 1,
				Proid: 0,
				otahProid: 0,
				Popularid: 1,
				classID: 0,
				classInfo: {},
				showHotGame: false,
				HotGamesList: [],
				isNomoreHot: 0,
				totalCount: 0,
				isNomore: 0,
				hotPageSize: 1,
				lunbotuList: [],
				skeleton_loading: false,
				swpier_skeleton_loading: false,

				intervalId: null,
				data: null, // 存储请求到的数据

				yqhaoyoushow: false,
				TodayHide: true,
				platform: this.PID,
				
				YaoQingMa: '',
				keyword: '',
				
				kefuMsgTag: false,
				
				unReadMsg: {
					lastSender: "",
					lastMsg: "",
					unReadCnt: 0
				},
				
				
				ACswiper: [],
				currentIndex: 0,
				showACHDPopup: false,
				indicatorDots: false,
				autoplay: true,
				interval: 8000,
				duration: 500,
				swiperHeight: 540,
				HDavTodayHide: false,
				isLogin: false
				
			}
		},
		watch: {
			qrPath(newVal, oldVal) {
				//console.log('最新地址：' + newVal, "原来的地址：" + oldVal);
				uni.setStorageSync('dwappqrPath', this.qrPath);
				return this.qrPath;
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad(options) {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});

			
			//引入谷歌授权登录js
			//#ifdef H5
			var script = document.createElement('script');
			script.src = "https://accounts.google.com/gsi/client";
			document.head.appendChild(script);
			//#endif
			
			let TJMNum = uni.getStorageSync('channel_id');
			that.YaoQingMa = TJMNum;
			//console.log('邀请码',that.YaoQingMa);
			
			that.GetHotMenGames();//获取热门游戏
			
			that.GetGamesType(0);
			
			//全局监听用户切换语言后从新刷新一下游戏列表
			uni.$on('updateGetGames',function(data){
				that.LangChange(0);
			})
			
			//获取平台8单独大逃杀游戏
			//that.GetOnedayGame();
			
			that.getLunbotu();
			that.getSystemUnread();
			
			//设置全局获取未读消息显示
			uni.$on('unReadCntShow', (val) => {
				that.kefuMsgTag = true
				that.unReadMsg = {
					lastSender: val.lastSender,
					unReadCnt: val.unReadCnt,
					lastMsg: val.lastMsg
				}
			})

			 //检查APP升级
			// #ifdef APP-PLUS
			//注入监测App更新方法
			that.JianChaAppUp(false); //版本更新提示信息 false不提示
			
			that.ckickisToken();
			that.LingQuinstall(); //APP打开的给他领取安装奖励
			// #endif

			let isToken = uni.getStorageSync("token");
			if (!isToken) {
				
				//#ifdef H5
				//获取地址中的谷歌授权信息，进行登录操作
				that.getUserInfo();
				//#endif
				
			} else {
				
				//检查是否有可领取的任务奖励有之弹窗
				that.CkNovice();
				
				//获取充值礼包提示
				that.GetWelcomePackage();

				//判断是否WebApp启动，如果是就个他领取安装奖励
				//#ifdef H5
				if (window.navigator.standalone == true) {
					//alert('IOS-是从桌面中打开的')
					that.Topheight = '54px';
					that.LingQuinstall();
					//return false;
				} else if (window.matchMedia("(display-mode: standalone)").matches) {
					//alert('android-是从桌面中打开的')
					that.LingQuinstall();
					that.Topheight = '0';
					//return false;
				} else {
					that.installWebapp()
					that.Topheight = '0';
				}
				//#endif
				
				// 设置定时器每隔一分钟（60000毫秒）请求一次数据 刷新可领取的任务数量
				//that.intervalId = setInterval(that.fetchData, 60000);
			}

			// #ifdef H5
			if (window.navigator.standalone == true) {} else if (window.matchMedia("(display-mode: standalone)").matches) {} else {
				//就是浏览器里面打开的
				that.installWebapp()
			}
			// #endif
			
		},
		onShow() {
			let that = this
			
			that.thisuuid = uni.getStorageSync("thisUuid");
			
			//计算顶部吸顶距离
			that.JiSuanXiDing();
			
			//设置PC弹窗APP下载链接
			let systemInfo = uni.getSystemInfoSync();
			if (systemInfo.osName == "ios") {
				that.recommendedLink = uni.getStorageSync('ipaUrl') || 'https://';
			} else {
				that.recommendedLink = uni.getStorageSync('apkUrl') || 'https://';
			}

			let isToken = uni.getStorageSync("token");
			if (!isToken) {
				that.isLogin = false
			} else {
				that.isLogin = true
				that.GetUnMsgInfo();//未读消息
				that.ChaXunrecord();
				//that.Getotherreward()//检查生日和升级奖励弹窗
				that.GetLishiGames(); //获取游戏历史记录
				that.GamesLaFen();
				
				//检查APP升级
				// #ifdef APP-PLUS
				uni.$on('getGamesLaFen', (val) => {
					that.GamesLaFen()
				})
				// #endif
				
				uni.$emit('ZhuRulookBenDihb', 1);
				
			}
			
			setTimeout(()=>{
				that.getLunBoAds();//轮播广告图
			},1000)
			
		},
		onReady() {
			let that = this
			//this.getFingerprint();
			//测试生日奖励和等级奖励弹窗
			//setTimeout(()=>{
			//uni.$emit("HappyBirthdayShow",{"cmd":57,"date":"2024-06-01", "reward":10086})
			//uni.$emit("CongratulationsShow",{"cmd":56,"vip":10, "reward":10086})
			//},3000)
		},
		onHide() {
			//console.log('Index页面隐藏了')
			let that = this
			that.$refs.RegisterNowRefs.hideRegisterNowRefs(0)
			that.showRegisterNow = false

			//that.$refs.child.OpenMenu();
			uni.$emit('HideTabber', 1)

		},
		onPullDownRefresh() {
			let that = this
			let isToken = uni.getStorageSync("token");
			if (!isToken) {
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			} else {
				websocetObj.stop();
				setTimeout(function() {
					websocetObj.sokcet();
					that.GetUnMsgInfo();//未读消息
					uni.stopPullDownRefresh();
				}, 1000);
			}
		},
		onReachBottom() {
			let that = this
			setTimeout(function() {
				uni.hideNavigationBarLoading()
			}, 500);
		},
		methods: {
			showACHDGuanbi(){
				let that = this
				//获取当前第几个item
				let i = that.currentIndex
				//找出当前item的mailId
				let mailId = that.ACswiper[i].mailId
				//判断如果用户点击了今日隐藏，就把当前item的mailId传给接口，表示已读状态
				console.log('mailId',mailId)
				
				let isToken = uni.getStorageSync("token");
				if (!isToken) {
					that.showACHDPopup = false
				} else {
					
					if(that.HDavTodayHide == true){
						that.setyiDuStatus(mailId)
						that.showACHDPopup = false
						// uni.setStorage({
						// 	key: "ADD-MYAPP-KEY-ONE",
						// 	data: new Date().getTime(),
						// });
					} else {
						that.showACHDPopup = false
					}
					
				}
			},
			//设置已读接口
			setyiDuStatus(mailId){
				let that = this
				that.$u.post('/read-mail', {
					mailId: parseInt(mailId),
				}).then(ress => {
					
				})
			},
			//获取轮播广告24小时显示一次
			getLunBoAds(){
				let that = this
				// uni.getStorage({
				// 	key: "ADD-MYAPP-KEY-ONE",
				// 	success: (res) => {
				// 		// 24小时超时
				// 		if (!res.data || new Date().getTime() - res.data > 1000 * 60 * 60 * 24) {
				// 			console.log("刚进入，本地有，且超时", "case");
				// 			that.startHuoquads()
				// 		} else {
				// 			console.log("刚进入，时间没到", "case");
				// 		}
				// 	},
				// 	fail: (err) => {
				// 		console.log("刚进入，本地无", "case");
				 		that.startHuoquads()
				// 	},
				// });
			},
			startHuoquads(){
				let that = this
				that.$u.post('/query-popup-msg', {
					
				}).then(res => {
					console.log('轮播广告',res.data)
					that.ACswiper = res.data
					that.showACHDPopup = true
					
					// if(that.ACswiper.length > 0){
					// 	setTimeout(()=>{
					// 		uni.createSelectorQuery().select('#u-gridh').boundingClientRect(rect=>{
					// 			console.log('打印该盒子的元素',rect.height);
					// 			that.swiperHeight = rect.height
					// 		}).exec()
					// 	},1000)
					// }
					
				}).catch(err => {
					that.ACswiper = []
					that.showACHDPopup = false
				})
			},
			handleSwiperChange(event) {
				const current = event.detail.current;
				this.currentIndex = current;
			},
			prev() {
				if(this.currentIndex == 0){
					
				} else {
					this.currentIndex = (this.currentIndex - 1 + this.ACswiper.length) % this.ACswiper.length;
				}
			},
			next() {
				if(this.currentIndex == this.ACswiper.length-1){
					
				} else {
					this.currentIndex = (this.currentIndex + 1) % this.ACswiper.length;
				}
			},
			// 选中某个复选框时，由checkbox时触发
			today_hideChange(e) {
				console.log('HDavTodayHide',e);
				this.HDavTodayHide = e
			},
			
			//读取未读消息
			GetUnMsgInfo(){
				let that = this
				that.$u.post('/chat/unread', {
					
				}).then(res => {
					console.log('未读消息',res.data)
					
					if(res.data.unReadCnt > 0){
						that.kefuMsgTag = true
						that.unReadMsg = {
							lastSender: res.data.lastSender,
							lastMsg: res.data.lastMsg,
							unReadCnt: res.data.unReadCnt
						}
					} else {
						that.kefuMsgTag = false
						that.unReadMsg = {
							lastSender: "",
							lastMsg: "",
							unReadCnt: 0
						}
					}
					
				}).catch(err => {
					
				})
			},
			GbkefuMsgTag(){
				this.kefuMsgTag = false
			},
			StartSearch(e){
				console.log('输入的key',e);
				uni.navigateTo({
					url: '/pages/searchFor/searchFor?source=1' + '&key=' + e
				})
			},
			ClickSearch(){
				let e = this.keyword
				uni.navigateTo({
					url: '/pages/searchFor/searchFor?source=1' + '&key=' + e
				})
			},
			
			getUserInfo() {
				let hostname = window.location.hostname
				const urlParams = new URLSearchParams(window.location.search);
				const code = urlParams.get('code');
				if (!code) {
					return
				}
				// 用授权码交换访问令牌地址
				const tokenEndpoint = 'https://oauth2.googleapis.com/token';
				const requestBody = new URLSearchParams();
				requestBody.append('code', code);
				// 你的 Google OAuth 客户端 ID
				requestBody.append('client_id', '530177592792-nt8h20nb888gmnirgqbnvptev6il8be8.apps.googleusercontent.com');
				// 你的Google OAuth 客户端密钥
				requestBody.append('client_secret', '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');
				requestBody.append('redirect_uri', 'https://' + hostname);
				requestBody.append('grant_type', 'authorization_code'); //这些参数在之前配置的有，看前面的代码
			
				fetch(tokenEndpoint, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						body: requestBody
					}).then(response => response.json()).then(data => {
						// 获得token令牌的信息
						const accessToken = data.access_token;
						console.log('token令牌', data);
						if(!data.error){
							uni.setStorageSync('GoogletokenInfo',data);
							this.ZhiXingLogin(data);
						}
						// 调用获取用户信息接口
						// fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
						// 		headers: {
						// 			Authorization: `Bearer ${accessToken}`
						// 		}
						// 	}).then(response => response.json()).then(userInfo => {
						// 		// 获取用户信息
						// 		this.title = userInfo.name
						// 		this.pic = userInfo.picture
						// 		this.email = userInfo.email
						// 		console.log('获取谷歌授权信息',userInfo)
								
						// 		if(!userInfo.error){
						// 			uni.setStorageSync('GoogleUserInfo',userInfo);
						// 			this.ZhiXingLogin(userInfo);
						// 		}
						// 		// let isSystem = uni.getStorageSync('GoogleUserInfo');
						// 		// if(!isSystem){
						// 		// 	uni.setStorageSync('GoogleUserInfo',userInfo)
						// 		// }
								
						// 	})
					})
			},
			ZhiXingLogin(googleData){
				let that = this
				console.log('执行谷歌授权登录',googleData);
				
				let serialNo = uni.getStorageSync('thisUuid') || 'iphone';
				let machineName = uni.getStorageSync('machineName') || 'iphone';
				let ua = uni.getStorageSync('thisUa') || 'iphone';
				
				//let QuDaoId = uni.getStorageSync('channel_id') || 2;
				//先判断id是否为整数，如果是就是直接传给channelId
				//如果不是就传给referalCode
				let is_num = that.$u.test.digits(that.YaoQingMa);
				console.log('是否为整数：',is_num);
				let channel_sid = 2
				let referalCodes = ""
				
				if(is_num){
					channel_sid = Number(that.YaoQingMa);
					console.log('整数渠道ID：', channel_sid);
				} else {
					referalCodes = that.YaoQingMa;
					console.log('转码渠道ID：', referalCodes);
				}
				that.$u.post('/login-google', {
					id_token: googleData.id_token,
					channelId: parseInt(channel_sid) || 2,
					referalCode: referalCodes || "",
					serialNo: serialNo, //设备序列码
					machineName: machineName, //设备型号
					operatorId: that.OPERATORID,
					pid: that.PID
				}).then(res => {
					console.log('谷歌登录账号', res)
					uni.setStorageSync('token', res.data.token)
					uni.setStorageSync('userinfo', res.data)
					that.signInShow = false
					
					//登录后刷新一下navbar组件的获取token方法
					uni.$emit('getinspectToken', 1);
					uni.setStorageSync('is_newUser', 0);
					//打开wss链接
					uni.$emit('StartOpenWss', 1);
					//关闭注册引导
					uni.$emit('GuanBiYinDaoReg', 1);
					
					//#ifdef H5
					uni.reLaunch({
						url: '/pages/index/index',
						success: function(res) {}
					});
					//#endif
					
				}).catch(err => {
					console.log('注册失败',err)
					//that.regbtnStatus = false
					let code = err.data.code
					uni.showToast({
						title: err.data.message,
						icon: 'none',
						duration: 3000
					})
					if (code == 1 || code == 4) {
						//that.signInShow = false
						setTimeout(() => {
							//账户已被使用找回密码操作
							//that.Yizhuceshow = true
						}, 300)
					}
				})
			},
			
			
			
			// async getFingerprint() {
			//   const fp = await FingerprintJS.load();
			//   const options = {
			// 	excludes: {
			// 	  // 排除以下因素，根据需要可以添加更多
			// 	  userAgent: true, // 排除User-Agent
			// 	  language: true, // 排除语言信息
			// 	  colorDepth: true, // 排除颜色深度
			// 	  pixelRatio: true, // 排除像素比
			// 	  screenResolution: true, // 排除屏幕分辨率
			// 	  availableScreenResolution: true, // 排除可用屏幕分辨率
			// 	  plugins: true, // 排除插件信息
			// 	  canvas: true, // 排除canvas指纹信息
			// 	  webgl: true, // 排除WebGL指纹信息
			// 	  audio: true, // 排除音频指纹信息
			// 	  vibrate: true, // 排除震动指纹信息
			// 	  touchSupport: true, // 排除触摸支持信息
			// 	  indexedDb: true, // 排除IndexedDB指纹信息
			// 	  addBehavior: true, // 排除addBehavior指纹信息
			// 	  openDatabase: true, // 排除openDatabase指纹信息
			// 	  cpuClass: true, // 排除CPU类指纹信息
			// 	  audioBaseLatency: true,
			// 	  colorGamut: true,
			// 	  contrast: true,
			// 	  vendor: true,
			// 	}
			//   };

			//   const result = await fp.get(options);
			//   console.log('打印指纹信息',result.visitorId); // 打印指纹信息
			//   this.thisuuid = result.visitorId//uni.getStorageSync("thisUuid");
			// },
			
			
			JianChaAppUp(tip) {
				this.$nextTick(() => {
					this.$refs.AppUpdate.openPopup(tip); // 版本更新提示信息 false不提示
				});
			},
			btnClick(){
				let that = this
				console.log('点击了悬浮窗',that.OneGames);
				let isToken = uni.getStorageSync("token");
				if(!isToken){
					that.$refs.signInShow.openPopup(1)
				} else {
					let val = that.OneGames
					//开始进入游戏
					that.$u.post('/enter-tgfun', {
						gameCode: val.gameCode
					}).then(res => {
						let gameUrl = res.data.gameUrl
						//把游戏地址写入缓存便于Webview读取打开
						uni.setStorageSync("PlayGamesUrl", gameUrl);
						//导航栏金币显示游戏中
						uni.$emit('OpeninGames', 1);
						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
						})
					}).catch(err => {})
				}
			},
			//计算吸顶
			JiSuanXiDing(){
				
				let that = this
				//通过监测顶部是否关闭了安装app拦，来设置吸顶的距离
				// #ifdef H5
				//判断是否WebApp启动
				let InsAppNowTime = uni.getStorageSync("popUp-install-time");
				
				if (window.navigator.standalone == true) {
					//alert('IOS-是从桌面中打开的')
					that.offsetTop = '59'
				} else if (window.matchMedia("(display-mode: standalone)").matches) {
					//alert('android-是从桌面中打开的')
					that.offsetTop = '59'
				} else {
					
					const userAgent = navigator.userAgent.toLowerCase();
					if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(userAgent)) {
						// 移动端
						if(InsAppNowTime){
							that.offsetTop = '59'
						} else {
							if(this.PID == 8){
								that.offsetTop = '59'
							} else {
								that.offsetTop = '59'
							}
						}
					} else {
						// pc端
						that.offsetTop = '59'
					}
				}
				// #endif
			},



			//定时器任务监测可领取任务数量
			fetchData() {
				let that = this
				that.$refs.openNovice.GetTaskList();
			},
			GamesLaFen(){
				//游戏拉分
				this.$u.post('/transfer-out-balance', {
				
				}).then(res => {
					//获取我的金币
					uni.$emit('getgetMybalance', 1);
				}).catch(err => {})
			},

			//选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log('2',e);
				//this.TodayHide = e
			},
			OpenInstallguiin() {
				let that = this
				that.$refs.openInstallshow.openPopup();
			},
			//关闭Install弹出回调
			GuanBiinstall(e) {
				this.yqhaoyoushow = false;
				uni.setStorageSync("popUp-install-time", new Date().getTime());
			},
			GuanBiinstallPopup() {
				//console.log('关闭了安装app引导弹窗',this.TodayHide)
				// if(this.TodayHide == true){
				// 	this.yqhaoyoushow = false;
				// 	uni.setStorageSync("popUp-install-time",new Date().getTime());
				// }
			},
			//检测Install弹窗24小时一次
			installWebapp() {
				let nowTime = uni.getStorageSync("popUp-install-time");
				if (!nowTime || new Date().getTime() - nowTime > 1000 * 60 * 60 * 24) {
					//console.log('超出24小时了')
					//alert('超出24小时了')
					//uni.setStorageSync("popUp-install-time", new Date().getTime());
					this.yqhaoyoushow = true;
					//并移除当前时间
					uni.removeStorageSync('popUp-install-time');
				} else {
					//console.log('还没超过24小时了')
					//alert('还没超过24小时了')
					this.yqhaoyoushow = false;
				}
			},
			

			//监测是否有可领取的奖励并弹窗
			CkNovice() {
				let that = this
				that.GetTaskListNum();
			},
			GetTaskListNum() {
				let that = this
				let serialNo = uni.getStorageSync('thisUuid');
				let machineName = uni.getStorageSync('machineName');
				let ua = uni.getStorageSync('thisUa');
				that.$u.post('/special/activity', {
					deviceId: serialNo,
					deviceType: machineName
				}).then(res => {
					//算出可领取的数量
					let KlqNum = []
					res.data.forEach(function(item, index) {
						if (item.status == 1) {KlqNum.push(item)}
					});
					that.GetQianDao(KlqNum);
				})
			},
			//获取签到
			GetQianDao(list) {
				let that = this
				that.$u.post('/signin/info', {}).then(res => {
					if (res.data.length != 0) {
						let Today = res.data.todaySignIn.today
						let yes_lingqu = []
						res.data.Available.forEach((item, index) => {yes_lingqu.push(item)});
						that.Getgeneralreward(list, yes_lingqu);
					} else {that.Getgeneralreward(list);}
				})
			},
			Getgeneralreward(list, list2) {
				let that = this;
				let klqList = list || []
				let klqList2 = list2 || []
				that.$u.post('/general/reward', {}).then(res => {
					let datas = res.data
					let duiXiang = Object.keys(datas).map(key => ({
						key,
						value: datas[key]
					}));
					let newarry = []
					duiXiang.forEach(function(item, index) {
						if (item.value.status == 1 && item.value.reward > 0) {newarry.push(item)}
					});
					let mergedArr = [...klqList, ...newarry, ...klqList2];
					if (mergedArr.length > 0) {
						setTimeout(() => {this.$refs.openNovice.openPopup();}, 1500)
					}
				})
			},


			Openqr() {
				let that = this
				//console.log('点击二维码', this.qrPath)
			},
			DepositBonusClose() {
				this.showDepositBonus = false
			},
			//获取Welcome Package
			GetWelcomePackage() {
				let that = this
				that.$u.post('/welcome/packet', {

				}).then(res => {
					//首充提示
					let is_newuser = uni.getStorageSync("is_newUser")
					setTimeout(() => {
						if (is_newuser == 1 && res.data.firstPay.extraCountdown > 0 && res.data.payCount == 0 && (res.data.firstPay.switchStatus || res.data.secondPay.switchStatus || res.data.thirdPay.switchStatus)) {
							that.showDepositBonus = true
							that.$refs.Openshows.GetWelcomePackage()
						} else {
							//console.log('加成引导不显示')
							that.showDepositBonus = false
						}
					}, 1500);
				})
			},
			dakitikPopup() {
				this.$refs.openPCdeposit.openPopup()
			},

			openPCmenu(e) {
				//console.log('打开或关闭PC左侧栏',e)
				if (e) {
					this.pcmenuWidth = '300px'
					this.$refs.openPcmenu.open()
				} else {
					this.pcmenuWidth = '0px'
					this.$refs.openPcmenu.guanbi()
				}
			},
			ToNocInfo() {
				let windowWidth = uni.getSystemInfoSync().windowWidth;
				if (windowWidth >= "800") {
					this.showPCnc = true
					this.$refs.TZTanchuang.init()
				} else {
					uni.navigateTo({
						url: '/pages/Notification/Notification'
					})
				}
			},
			getSystemUnread() {
				let that = this
				that.$u.post('/query-mail', {
					type: 1,
					lastMailId: 0
				}).then(ress => {
					let unread = [];
					ress.data.forEach((item, index) => {
						if (item.status == 0) {
							unread.push(item.content)
						}
					});
					that.SystemunreadList = unread
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
			Getotherreward() {
				let that = this
				this.$u.post('/other/reward', {}).then(res => {

					/*let data = {
						birthday: {date: "2025-05-28", reward: 1000},//生日奖励
						levelUp: {vip: 2, reward: 1000}//升级奖励
					}*/

					if (!res.data) {
						////console.log('不存在data')
					} else {
						////console.log('存在data')

						let birthday = res.data.birthday
						let levelUp = res.data.levelUp

						if (birthday) {
							that.$refs.OpenBirthdayPopup.openPopup(birthday)
						}
						if (levelUp) {
							that.$refs.OpenLeveUp.openPopup(levelUp)
						}

					}

				}).catch(err => {

				})
			},
			LingQuinstall() {
				let that = this
				let serialNo = uni.getStorageSync('thisUuid');
				let machineName = uni.getStorageSync('machineName');
				let ua = uni.getStorageSync('thisUa');

				that.$u.post('/shortcut/reward', {
					deviceId: serialNo,
					deviceType: machineName
				}).then(res => {
					console.log('安装桌面奖励', res.data)
					//res.data不存在证明领取过了
					//if(res.data){
					//	uni.$emit('UpdataAddBcbalance', (res.data.reward/100).toFixed(2))
					//}
					/*res.data = {
						newBalance: 1100709
						reward: 100
					}*/
				})
			},
			ChaXunrecord() {
				let that = this
				let userid = uni.getStorageSync('userinfo').userId
				//上报充值成功记录查询
				that.$u.post('/recharge/finished/record', {}).then(res => {
					//结构
					//res.data {
					//	actual: 5000
					//	amount: 5000
					//	orderId: "720231027182922002"
					//	payTimes: 1
					//}
					if (res.data.length != 0) {

						var oid = []
						res.data.forEach(function(item, index) {
							oid.push(item.orderId)

							//只有payTimes等于1是首充的
							if (item.payTimes == 1) {
								//Facebook Pixel埋点
								if (window.fbq) {

									//自定义的事件trackCustom是固定的自定义事件类型
									fbq('trackCustom', 'firstDepositArrival', {
										user: userid,
										currency: "RMB",
										amount: item.amount
									});

									//fb官方标准事件
									fbq('track', 'Purchase', {
										currency: "RMB",
										value: item.amount
									});

								}
							}

						})

						var str = oid.join(",");
						that.$u.post('/recharge/reported', {
							orderList: str
						}).then(resv => {
							res.data.forEach(function(item, index) {

								if (window.Unity) {
									//埋点充值成功
									Unity.call('af_purchase&&' + item.amount / 100);
								}
							})
						})
					} else {}
				})
			},
			TochatUrl() {
				let that = this
				const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
				that.$u.post('/game/chat', {
					pid: this.PID,
					lang: language
				}).then(res => {
					
					that.kefuMsgTag = false
					
					let chatUrl = res.data.chatUrl
					
					// #ifdef APP-PLUS
					plus.runtime.openURL(chatUrl);
					// #endif
					
					// #ifdef H5
					let url_ = '/pages/chatWebview/chatWebview?url=' + encodeURIComponent(JSON.stringify(chatUrl))
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
					
				});
			},
			getLunbotu() {
				let that = this
				that.$u.post('/game/activity', {
					positionType: 2, //（1 活动列表 2 首页跑马灯 ）
					pid: that.PID, //Number 是 平台Id
				}).then(res => {
					
					console.log('轮播图',res.data)
					
					let newList = [];
					// if(that.PID == 8){
					// 	newList = [{
					// 		content: "",
					// 		endTime: "2024-09-12 12:00:00",
					// 		mobileImage: "/static/image/dataosha_img.jpg",
					// 		pcImage: "/static/image/dataosha_img.jpg",
					// 		startTime: "",
					// 		summary: "",
					// 		title: "大逃杀",
					// 		type: 666
					// 	}];
					// } else {
					// 	newList = [];
					// }
					
					res.data.activities.forEach((item, index) => {
						newList.push({
							content: item.content,
							endTime: item.endTime,
							mobileImage: item.mobileImage,
							pcImage: item.pcImage,
							startTime: item.startTime,
							summary: item.summary,
							title: item.title,
							type: item.type
						})
					});
					that.lunbotuList = res.data.activities
					that.swpier_skeleton_loading = true
				}).catch(err => {
					that.lunbotuList = []
					that.swpier_skeleton_loading = true
					console.log('轮播图err',err)
				})
			},
			async GetOnedayGame(){
				let that = this
				let games = await that.CheckcategoriesGameList(6, 0);
				let WanGaames = {}
				games.forEach((item, index) => {
					if (item.gameName == "大逃杀") {
						WanGaames = item
					}
				});
				that.OneGames = WanGaames
				console.log('大逃杀',WanGaames);
			},
			async GetGamesType(proid) {
				let that = this
				const ress = await that.$u.post('/game/category', {});
				console.log('游戏分类列表',ress.data);
				
				
				//新的方式统一一次返回数据加载更快
				that.tagList = ress.data.categories
				//过滤掉娱乐大厅的类别
				let NewListArr = []
				ress.data.categories.forEach((item, index) => {
					if(item.name != "Lobby"){
						NewListArr.push(item)
					}
				});
				that.categoryGames = NewListArr
				that.vendorsList = ress.data.vendors
				that.skeleton_loading = true
				
				// let tabsList = []
				// ress.data.categories.forEach((item, index) => {
				// 	if (item.vendors.length != 0) {
				// 		tabsList.push(item)
				// 	}
				// });
				// that.tagList = tabsList

				// that.skeleton_loading = true

				// let NewProlist = [
				// 	//	{
				// 	//	categories: [],
				// 	//	id: 0,
				// 	//	name: this.$t('Providers'),
				// 	//	path: "",
				// 	//	gameCount: 0
				// 	//},
				// ]

				// ress.data.vendors.forEach((item, index) => {
				// 	NewProlist.push({
				// 		categories: item.categories,
				// 		id: item.id,
				// 		name: item.name,
				// 		path: item.path,
				// 		gameCount: item.gameCount
				// 	})
				// });
				// that.vendorsList = NewProlist

				// let newarr = []
				// for (var i = 0; i < that.tagList.length; i++) {
				// 	if (that.tagList[i].name != "Lobby" && that.tagList[i].vendors.length != 0) {
				// 		const id = that.tagList[i].id
				// 		const name = that.tagList[i].name
				// 		const path = that.tagList[i].path
				// 		const vendors = that.tagList[i].vendors
				// 		newarr.push({
				// 			id: id,
				// 			name: name,
				// 			path: path,
				// 			vendors: vendors,
				// 			games: await that.CheckcategoriesGameList(id, proid)
				// 		})
				// 	}
				// }
				// that.categoryGames = newarr
				that.hoemloadingtrue = false
				
				//获取暴奖游戏列表
				that.getBaojiangList()

				//操作初始化swpier组件
				// #ifndef APP-PLUS
				that.$nextTick(() => {
					that.$refs.homeGames.getSwiper2()
				})
				// #endif

			},
			async CheckcategoriesGameList(cid, proid) {
				let that = this
				const res = await that.$u.post('/game/list', {
					page: 1,
					searchText: '',
					categoryId: cid,
					vendorId: proid,
					orderType: 1,
				})
				return res.data.gameList
			},
			//暴奖游戏列表
			getBaojiangList(){
				this.$u.post('/game/top/record/realtime', {
					
				}).then(res => {
					this.HotBaoJiangLists = res.data
				}).catch(err => {
					
				})
			},
			//获取历史游戏
			GetLishiGames() {
				let that = this
				that.$u.post('/recent/list', {

				}).then(res => {
					//console.log('历史游戏列表', res)
					that.GameHistory = res.data

					//操作初始化swpier组件
					// #ifndef APP-PLUS
					that.$nextTick(() => {
						that.$refs.homeGames.getSwiper3()
					})
					// #endif

				})
			},
			//获取热门游戏
			GetHotMenGames() {
				let that = this
				that.$u.post('/game/list', {
					queryHot: true,
					page: 1
				}).then(res => {
					console.log('热门游戏列表', res)
					that.GameHotList = res.data.gameList
			
					//操作初始化swpier组件
					// #ifndef APP-PLUS
					that.$nextTick(() => {
						that.$refs.homeGames.getSwiper3()
					})
					// #endif
			
				})
			},
			ClickHot(e) {
				this.showHotGame = e
				if (e == true) {
					uni.$emit('Up-Hot-loadingtrue', 1)
					this.isNomoreHot = 0
					this.hotPageSize = 1
					this.HotGamesList = []
					this.gethotgamelist(0)
				} else {
					this.GetGamesType(0)
				}
			},
			selectPro(e) {
				let vid = null
				if (!e) {
					vid = 0
					this.Proid = 0
				} else {
					vid = e
					this.Proid = vid
				}

				this.hoemloadingtrue = true
				if (this.showHotGame == true) {
					uni.$emit('Up-Hot-loadingtrue', 1)
					this.isNomoreHot = 0
					this.hotPageSize = 1
					this.HotGamesList = []
					this.gethotgamelist(vid)
				} else {
					this.GetGamesType(vid)
				}
			},
			gethotgamelist(vid) {
				let that = this
				that.$u.post('/game/list', {
					page: that.hotPageSize,
					searchText: '',
					categoryId: 0,
					vendorId: vid,
					orderType: that.Popularid,
				}).then(res => {
					that.totalCount = res.data.totalCount
					if (that.hotPageSize != 1) {
						if (res.data.gameList.length != 0) {
							that.HotGamesList = that.HotGamesList.concat(res.data.gameList)
						} else {
							that.isNomoreHot = 1
						}
					} else {
						that.HotGamesList = res.data.gameList
					}
				})
			},
			hotLookMore() {
				let that = this
				that.hotPageSize++
				that.gethotgamelist(this.Proid)
			},
			tapLookMore() {
				let that = this
				that.TapPageSize++
				that.GetGamesList()
			},
			Tosearch() {
				uni.navigateTo({
					url: '/pages/searchFor/searchFor'
				})
			},

			//选项卡操作获取游戏列表
			GetGamesList() {
				let that = this
				that.$u.post('/game/list', {
					page: that.TapPageSize,
					searchText: '',
					categoryId: that.classID,
					vendorId: that.otahProid,
					orderType: that.Popularid,
				}).then(res => {
					that.TabtotalCount = res.data.totalCount
					if (that.TapPageSize != 1) {
						if (res.data.gameList.length != 0) {
							that.TabGamesList = that.TabGamesList.concat(res.data.gameList)
						} else {
							that.isNomore = 1
						}
					} else {
						that.TabGamesList = res.data.gameList
					}
				})
			},
			tabChange(t) {
				let that = this
				let idx = JSON.stringify(t)
				let cid = parseInt(this.tagList[idx].id)
				this.Tagcurrent = idx
				if (t == 0) {
					this.hoemloadingtrue = true
					this.GetGamesType(0)
				} else {
					that.TabsvendorsList = this.tagList[idx].vendors
					this.isNomore = 0
					uni.$emit('Up-tab-loadingtrue', 1)
					uni.$emit('Up-yealuoselecct', 1)
					this.classID = cid
					this.classInfo = this.tagList[idx]
					that.otahProid = 0
					this.TapPageSize = 1
					this.TabGamesList = []
					this.GetGamesList()
				}
				//滚到到指定位置
				this.zhiding()
			},
			//切换语言更新游戏
			LangChange(t){
				let that = this
				let idx = JSON.stringify(t)
				let cid = parseInt(this.tagList[idx].id)
				this.Tagcurrent = idx
				if (t == 0) {
					this.hoemloadingtrue = true
					this.GetGamesType(0)
				} else {
					that.TabsvendorsList = this.tagList[idx].vendors
					this.isNomore = 0
					uni.$emit('Up-tab-loadingtrue', 1)
					uni.$emit('Up-yealuoselecct', 1)
					this.classID = cid
					this.classInfo = this.tagList[idx]
					that.otahProid = 0
					this.TapPageSize = 1
					this.TabGamesList = []
					this.GetGamesList()
				}
			},
			ProselectPro(e) {
				let vid = 0
				if (!e) {
					vid = 0
				} else {
					vid = e
				}
				uni.$emit('Up-tab-loadingtrue', 1)
				this.otahProid = vid
				this.isNomore = 0
				this.TapPageSize = 1
				this.TabGamesList = []
				this.GetGamesList()
			},
			//选择排序
			selectPopular(e) {
				uni.$emit('Up-tab-loadingtrue', 1)
				this.Popularid = e
				this.TabGamesList = []
				this.TapPageSize = 1
				this.GetGamesList()
			},
			jumpTap(t) {
				uni.$emit('Up-tab-loadingtrue', 1)
				let idx = JSON.stringify(t)
				let cid = parseInt(this.tagList[idx].id)
				this.TabsvendorsList = this.tagList[idx].vendors
				this.Tagcurrent = idx
				this.classID = cid

				this.TapPageSize = 1
				this.TabGamesList = []
				this.GetGamesList()

				//滚到到指定位置
				this.zhiding()
			},

			//首页指定到选项卡
			zhiding() {
				//判断一下顶部安装app提示，计算他的高度
				let installapp = uni.getStorageSync("popUp-install-time");
				let navH = 110 + uni.getSystemInfoSync().statusBarHeight;
				
				// #ifdef H5
				//判断是否WebApp启动
				if (window.navigator.standalone == true) {
					//alert('IOS-是从桌面中打开的')
					navH = 110 + uni.getSystemInfoSync().statusBarHeight
				} else if (window.matchMedia("(display-mode: standalone)").matches) {
					//alert('android-是从桌面中打开的')
					navH = 110 + uni.getSystemInfoSync().statusBarHeight
				} else {
					const userAgent = navigator.userAgent.toLowerCase();
					if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(userAgent)) {
						// 移动端
						if (installapp) {
							navH = 110 + uni.getSystemInfoSync().statusBarHeight
						} else {
							if(this.PID == 8){
								navH = 110 + uni.getSystemInfoSync().statusBarHeight
							} else {
								navH = 174 + uni.getSystemInfoSync().statusBarHeight
							}
						}
					} else {
						// pc端去掉了通告的高度
						if (installapp) {
							navH = 59 + uni.getSystemInfoSync().statusBarHeight
						} else {
							if(this.PID == 8){
								navH = 59 + uni.getSystemInfoSync().statusBarHeight
							} else {
								navH = 59 + uni.getSystemInfoSync().statusBarHeight
							}
						}
					}
				}
				// #endif
				setTimeout(() => {
					uni.createSelectorQuery().select('.games_wrap_box').boundingClientRect(
					data => { //目标位置的节点：类class或者id
						//console.log('置顶节点1', data)
						uni.createSelectorQuery().select(".content_wrap").boundingClientRect(
							res => { //最外层盒子的节点：类class或者id
								uni.pageScrollTo({
									duration: 100, //过渡时间
									scrollTop: data.top + -res.top - navH, //到达距离顶部的top值
								})
								//console.log('置顶节点2', res)
							}).exec()
					}).exec();
				}, 200)
			},
			ckickisToken() {
				let isToken = uni.getStorageSync("token");
				let serialNo = uni.getStorageSync('thisUuid');
				let machineName = uni.getStorageSync('machineName');
				let ua = uni.getStorageSync('thisUa');
				if (!isToken) {

				} else {
					this.$u.post('/login-token', {
						serialNo: serialNo,
						machineName: machineName
					}).then(res => {
						
						//更新缓存token
						uni.setStorageSync('token', res.data.token)
						uni.setStorageSync('userinfo', res.data)
						
					}).catch(err => {
						uni.removeStorageSync('token');
						uni.removeStorageSync("userinfo")
						uni.$emit('getinspectToken', 1)
						uni.reLaunch({
							url: '/pages/index/index'
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss">
// Index Component
.erweim {
  position: absolute;
  top: -100px;
  left: -100px;
  opacity: 0;
}
.tz_wrap {
  width: 100%;
  height: 600px;
  background-color: #1e2531;
  border-radius: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10078;

  .tc_lan {
    padding: 20px;
  }

  .guanbi {
    border-radius: 14px 14px 0 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    //border-bottom: 1px solid #1e2531;
    padding: 30rpx 30rpx !important;
    background: linear-gradient(180deg, #003370, #08264a 40%, #1e2531);

    .reg_titles {
      view {
        color: $all-secondary-text-color;
        font-weight: bold;
        font-size: 38rpx !important;
      }
    }
  }
}

.content_wrap {
  background-color: $home-games-wrap-color !important;
  margin-inline: auto;
  width: 100%;
}

.list_wrap_box {
  background-color: $home-games-wrap-color !important;
  margin-inline: auto;
  max-width: 1648px;
  width: 100%;
}

.CbianKfu_pc {
  position: fixed;
  top: 250rpx;
  right: 0;
  z-index: 98;
  .msg_info_wrap {
    cursor: pointer;
    background-color: #1d2532;
    box-shadow: 0px 0 16px 0px #000000;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    position: absolute;
    left: -315px;
    width: 300px;
    bottom: 0;
    border: 1px solid #273243;
    .msg_info {
      position: relative;
      padding: 20rpx 16rpx 20rpx 20rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .right_sanjiao {
        background-color: #1d2532;
        width: 26rpx;
        height: 26rpx;
        border-radius: 6rpx;
        position: absolute;
        right: -10rpx;
        transform: rotate(45deg);
      }
      .kefu_icon {
        background-color: #374457;
        border: 1px solid #1bb83d;
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 12rpx;
        position: relative;
        span {
          position: absolute;
          top: -7px;
          left: -7px;
          display: inline-block;
          background: linear-gradient(1turn, #1bb83d 0.8%, #1bb83d);
          box-shadow: 0 3px 16px #005413, inset 0 4px 3px #ffffff4d;
          text-align: center;
          color: #fefefe;
          width: 14px;
          height: 14px;
          line-height: 14px;
          font-size: 10px;
          z-index: 9;
          border-radius: 4px;
          border: 2px solid $all-secondary-color;
          font-weight: bold;
        }
        image {
          width: 60rpx;
          height: 60rpx;
          border-radius: 12rpx;
        }
      }
      .gb_icon {
        position: relative;
        z-index: 666;
        margin-left: auto;
        .u-icon {
          background-color: #273243;
          border-radius: 10rpx;
          padding: 12rpx;
          font-size: 22rpx;
          cursor: pointer;
          position: relative;
          top: 0;
        }
      }
      .kefu_info {
        padding-left: 16rpx;
        padding-right: 14rpx;
        .msg_info_title {
          line-height: 15px !important;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 28rpx;
          color: #1bb83d;
        }
        .msg_info_text {
          line-height: initial !important;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 1;
		  line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          color: #fefefe;
          font-size: 24rpx;
        }
      }
      .biansanjiao {
        position: absolute;
        width: 37rpx;
        height: 15rpx;
        right: -34rpx;
        bottom: -2rpx;
      }
    }
  }
}

.CbianKfu {
  position: fixed;
  bottom: 115px;
  right: 0;
  z-index: 98;
  // box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.7);
  // background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
  // box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
  // width: 70rpx;
  // line-height: 70rpx;
  // padding: 20rpx 0;
  // border-radius: 10rpx 0 0 10rpx;
  .kf_text {
    color: #ffffff;
    writing-mode: vertical-rl;
  }
  .msg_num {
    writing-mode: horizontal-tb;
    background: linear-gradient(1turn, #1bb83d 0.8%, #1bb83d);
    text-align: center;
    color: #fefefe;
    margin: 12rpx auto 0;
    width: 40rpx;
    height: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    z-index: 9;
    border-radius: 4px;
    border: 2px solid $all-secondary-color;
    font-weight: bold;
  }
  .msg_info_wrap {
    background: $home-kf-bg-color;
    box-shadow: 0px 0 16px 0px $home-kf-shadow-color;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    position: absolute;
    left: -260px;
    width: 250px;
    bottom: 0;
    border: 1px solid $home-kf-border-color;
    .msg_info {
      position: relative;
      padding: 10rpx 16rpx 10rpx 16rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .right_sanjiao {
        background: $home-kf-bg-color;
        width: 26rpx;
        height: 26rpx;
        border-radius: 6rpx;
        position: absolute;
        right: -10rpx;
        transform: rotate(45deg);
      }
      .kefu_icon {
        background-color: $home-kf-kefu-icon;
        border: 1px solid $home-kf-kefu-icon-border;
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10rpx;
        image {
          width: 60rpx;
          height: 60rpx;
        }
      }
      .gb_icon {
        position: relative;
        z-index: 3;
        margin-left: auto;
        .u-icon {
          background-color: $home-kf-kefu-gb-icon;
          border-radius: 10rpx;
          padding: 12rpx;
          font-size: 22rpx;
          cursor: pointer;
          position: relative;
          top: 0;
        }
      }
      .kefu_info {
        padding-left: 16rpx;
        padding-right: 14rpx;
        .msg_info_title {
          line-height: 15px !important;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 28rpx;
          color: $home-kf-kefu-title;
        }
        .msg_info_text {
          line-height: initial !important;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 1;
		  line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          color: $home-kf-kefu-text;
          font-size: 24rpx;
        }
      }
      .biansanjiao {
        position: absolute;
        width: 37rpx;
        height: 15rpx;
        right: -34rpx;
        bottom: -2rpx;
      }
    }
  }
}

//.tabs_wrap_box {
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
//}

.souso_cion {
  position: relative;
  top: 0;
  margin-right: 80rpx;
  margin-left: 15px;
  background-color: $all-secondary-color;
  cursor: pointer;
  border-radius: 28rpx;
  padding: 18rpx;
  color: #3c485c;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 400rpx;

  .u-icon {
    margin-right: 10rpx;
  }
}

.v-tabs_wrap {
  flex: 1;
  //height: 55px;
  padding: 8px 14px 4px 14px;
  // background-color: #1a2230;
  // border-radius: 18rpx;
  // border-bottom: 2px solid #2283f6;
  //width: 95%;
  //margin: 0 auto;
}

.notice-bar {
  padding: 0 10rpx 0 6rpx;
  cursor: pointer;
}

.marginTop10 {
  margin-top: 20rpx;
}

.qiliuba_hylb {
  width: 330px;
  max-width: 430px;
  height: auto;
  position: fixed;
  bottom: 66px;
  z-index: 99;
  right: 0;
}

.achd_popup_dh {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
}
.achd_popup_box {
  z-index: 999999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  width: 700rpx;
  height: auto;
  .today_hide {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20rpx;
    .checkbox {
      color: #ffffff;
    }
  }
  .swiper_popup_box {
    position: relative;
    width: 700rpx;
    .prevleft {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(30, 37, 49, 0.43);
      border-radius: 200rpx;
      margin: 0 0 0 0;
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 0%;
      transform: translate(20%, 0%) !important;
      cursor: pointer;
    }
    .nextright {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(30, 37, 49, 0.43);
      margin: 0 0 0 0;
      border-radius: 200rpx;
      position: absolute;
      z-index: 2;
      top: 50%;
      right: 0%;
      transform: translate(-20%, 0%) !important;
      cursor: pointer;
    }
    .achdtu {
      width: 700rpx;
      height: 540px;
      cursor: pointer;
    }
  }
}
.hd_guanbi {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30rpx;

  //position: absolute;
  // bottom: 8%;
  // left: 0;
  // right: 0;
  // margin: 0 auto;
  // z-index: 999999;

  image {
    width: 70rpx;
    height: 70rpx;
    cursor: pointer;
  }
}

@media (min-width: 800px) {
  .v-tabs_wrap {
    padding: 12px 14px 12px 40px;
  }

  .tabs_wrap_box {
    display: -webkit-box;
    align-items: center;
    justify-content: space-between;
  }

  .notice-bar {
    padding: 5rpx 80rpx 15rpx 60rpx;
  }

  .qiliuba_hylb {
    bottom: 0;
    width: 400px;
  }
}

.kundugu {
  width: 92% !important;
  margin: 30rpx auto !important;
}
</style>