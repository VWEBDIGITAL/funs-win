<template>
	<view :style="theme">
		<!-- <install-popup ref="openInstallshow" @CheckboxChange="checkboxChange" @guanBiinstallPopup="GuanBiinstallPopup"></install-popup> -->
		<u-navbar :height="showInstall && platform != 8 ? Navheight:'59'" :is-fixed="is_fixeds" back-icon-color="#fff" :is-back="false" title-color="#fff" :background="{background:'transparent'}" :border-bottom="false">
			<view class="install_webapp" v-if="yqhaoyoushow && showInstall && platform != 8">
				<image class="mini_logo" :src="'/static/logo/' + platform + '_mini_logo.png'"></image>
				<view class="install_info">
					<view>{{$t('NewlyAdded.InstallTIP',{gtgt: 20})}}</view>
					<view>{{$t('NewlyAdded.QuickAT')}}</view>
				</view>
				<view class="install_btn" @click="OpenInstallguiin()"><span>{{$t('NewlyAdded.InstallBTN')}}</span></view>
				<view class="install_colso" @click="GuanBiinstall()"><u-icon name="close" color="#ffffff" size="34"></u-icon></view>
			</view>
			<view class="logo_and_right">
				<view class="left_logo_dayTwo" v-if="is_secondary == true">
					<image @click="BlackPage()" class="menu2" src="/static/image/navBlackIcon.png" mode="widthFix"></image>
					<!--<image class="logo" src="/static/image/666bet.png"></image>-->
					<view class="nav_title">{{title}}</view>
				</view>
				<view class="left_logo" v-else>
					<image @click="startAnimation()" class="menu" :animation="animationData" src="/static/image/menu_fold_one_icon_155136.png"></image>
					<!--<image v-else @click="MenuShow = false" class="menu2" src="/static/image/guanbi.png"></image>-->
					<image class="logo" :src="'/static/logo/' + platform + '_LOGO_MAIN.png'" mode="widthFix" @click="Tohome()"></image>
				</view>
				<view class="right_box" v-if="is_logon == 1">
					<view class="my_Wallet">
						<view class="mayjine">
							<!-- <image class="shuaxin" :class="{'rotate360':showAnimate}" @click="play2()" src="/static/image/shuaxin.png"></image> -->
							<view class="yue">
								<block v-if="is_SelectCurrencyData">
									<image class="rank_icon" v-if="SelectCurrencyData.type == 999" src="/static/image/currency_coins.png"></image>
									<image class="rank_icon" v-else-if="SelectCurrencyData.type == 444" src="/static/image/coin-yuan_cny.png"></image>
									<image class="rank_icon" v-else-if="SelectCurrencyData.type == 555" src="/static/image/jinbi-3.png"></image>
									<image class="rank_icon" v-else :src="staticDname + '/pay/' + SelectCurrencyData.abbr + '.png'"></image>
									
									<view class="myedu" @click="openShuaxinbc()">
										{{JiSuanHuiLv(SelectCurrencyData)}}
									</view>
								</block>
								<block v-else-if="!is_SelectCurrencyData">
									<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
									<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
									<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
									<view class="myedu" @click="openShuaxinbc()">
										{{convertToYuan(balance)}}
									</view>
								</block>
								<view class="arrow-down" @click="openShuaxinbc()">
									<u-icon name="arrow-down"></u-icon>
								</view>
								<!--选择货币-->
								<Select-currency ref="OpenPopup" @UpSelectCurrency="UpSelectCurrency" @yjzhJinbi="YiJianShouHuis"></Select-currency>
							</view>
							
							<uni-transition ref="LiShiJiLu" class="LiShiJiLu_box" :mode-class="['fade','slide-bottom']" :show="show3">
								<view style="color: #1bb83d;font-weight: bold;">+{{PiaoChangVal}}</view>
							</uni-transition>
							
							<!-- <z-top-tips ref="uTips" navbar-height="20"></z-top-tips> -->
						</view>
						<view class="wallet_icon" @click="Towallet()">
							<view><image src="/static/image/wallet_icon.png"></image></view>
						</view>
					</view>
					<view class="xsTask">
						<!-- 新手任务 -->
						<NoviceTask ref=""></NoviceTask>
					</view>
					<!-- <view class="tongzhi" @click="ToNotification()">
						<span v-if="SystemunreadList + PersonalunreadList != 0">{{SystemunreadList + PersonalunreadList}}</span>
						<image src="/static/image/bell_ring.png"></image>
					</view> -->
				</view>
				<view class="right_box" v-if="is_logon == 0">
					<view class="SignIn_Regiser">
						<view class="SigninBtn" @click="signPopupShow()"><span>{{$t('navBar.rtitle1')}}</span></view>
						<view class="zhuceBtn" @click="regPopupShow()">
							<span>{{$t('navBar.rtitle2')}}</span>
						</view>
					</view>
					<view class="xsTask2">
						<!-- 新手任务 -->
						<NoviceTask ref=""></NoviceTask>
					</view>
				</view>
			</view>
		</u-navbar>
		
		<!-- 页面宽度低于 800px 时显示 -->
		<match-media :max-width="800" >
			<u-popup v-model="MenuShow" mode="left" z-index="101" width="74%" :closeable="false" @close="PopUpclose">
				<view class="menu_wrap" :class="statusBarHeight == true?'menu_wrap2':''" :style="{paddingTop: showInstall && platform != 8?Navheight + 15 + 'px':''}">
					<view :style="{height: isStatusBarHeight}"></view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('Deposit')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="14" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/Deposit.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<u-cell-item :title="$t('Withdraw')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="15" @click="openType" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/menuIcon/Withdraw.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
					
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title1')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="1" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m2.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<u-cell-item :title="$t('sidebar.title2')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="2" @click="openType" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/menuIcon/m1.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title3')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="3" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m3.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title6')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="6" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m7.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<u-cell-item :title="$t('sidebar.title7')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="7" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m6.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title8')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="8" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m8.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							
							<u-cell-item :title="$t('NEWBonusPageA.BonusSYS')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="16" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/jiangli.png"></u-icon>
								<view slot="right-icon">
									<view class="tasg_icon">
										<span>Hot</span>
										<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
									</view>
								</view>
							</u-cell-item>
							
							<u-cell-item :title="$t('sidebar.title9')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="9" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m9.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<!-- <u-cell-item :title="$t('sidebar.title10')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="10" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m10.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item> -->
						</u-cell-group>
					</view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title11')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="11" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m11.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<!-- #ifdef H5 -->
							<u-cell-item v-if="ceBianInstall" :title="$t('NewlyAdded.Install')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="13" @click="openType" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/menuIcon/mphone.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<!-- #endif -->
							
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

						<!-- #ifdef H5 -->
						<view class="qingchu_hc" @click="openType(99)">
							<view class="view_box1"><image src="/static/image/me/qingchu_hc.png"></image>清除缓存</view>
							<!-- <view class="view_box2">
								<u-loading :show="hcloading" size="28" color="#007aff"></u-loading>
							</view> -->
						</view>
						<!-- #endif -->
					</view>
				</view>
				<view class="sevae_btn_wrap">
					<view class="sevae_btn">
						<u-button type="primary" @click="openType(10)"><u-icon name="server-fill" color="#ffffff" size="34"></u-icon>{{$t('LiveSupport')}}</u-button>
					</view>
				</view>
				<view style="height: 200rpx;"></view>
			</u-popup>
		</match-media>

		<!-- 找回金币操作 -->
		<u-popup v-model="YiJianShow" mode="bottom" length="auto" border-radius="34" :closeable="true">
			<view class="YijianZhaohui_wwrap">
				<image class="jinbifuhao" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
				<image class="jinbifuhao" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
				<image class="jinbifuhao" src="/static/image/jinbi-3.png" v-else></image>
				<view class="myyue">
				<u-count-to ref="shuaxinJinbi" :start-val="0" :end-val="convertToYuan(balance)" :decimals="2" font-size="58" :bold="true"></u-count-to>
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
		<regiserPopup ref="regiserShow"></regiserPopup>
		<signInPopup ref="signInShow" :isTabs="istabsType"></signInPopup>
		<LanguagePopup ref="Language"></LanguagePopup>
		<musicPopup ref="OpenMusic"></musicPopup>
		<!--在进入站点全局注册组件，因为先注册了导航栏组件-->
		<Happy-Birthday-Popup ref="OpenBirthdayPopup"></Happy-Birthday-Popup>
		<Congratulations-Popup ref="OpenLeveUp"></Congratulations-Popup>
	</view>
</template>
<script>
	export default {
		name: "navbar",
		props: {
			is_fixeds: {
				type: Boolean,
				default: true
			},
			showInstall: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			//isCountTo: {
			//	type: Boolean,
			//	default: false
			//},
			is_secondary: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				hcloading: true,
				PiaoChangVal: '',
				show3: false,
				
				zhuTi: [{
					id: 0,
					icon: '/static/image/me/yueliang.png'
				},{
					id: 1,
					icon: '/static/image/me/sun_fill.png'
				}],
				ztidex: 0,
				
				isDisabledTwo: false,
				YiJianShow: false,
				
				platform: this.PID,
				istabsType: 1,
				
				LuoDidomain:'',
				TodayHide: false,
				is_deviceType: 0, //1是安卓 0是IOS
				install_popup: false,
				
				Navheight: 59,//122
				yqhaoyoushow: false,
				ceBianInstall: true,
				isStatusBarHeight: '',
				statusBarHeight: false,
				animationData: {},
				isRote: false,
				animation: null,
				isCountTo: false,

				is_logon: 0,
				titleStype: {
					//color: '$font-all-color'
				},
				MenuShow: false,
				showAnimate: false,
				showAnimateMenu: false,
				balance: 0,

				lastMailidMin: 0,
				SystemunreadList: 0,
				PersonalunreadList: 0,
				staticDname: '',
				SelectCurrencyData: {},
				is_SelectCurrencyData: false
			};
		},
		computed: {

		},
		created() {
			let that = this
			
			let systemInfo = uni.getSystemInfoSync();
			//console.log('状态栏的高度：' + systemInfo.statusBarHeight);
			
			that.staticDname = uni.getStorageSync('Musicdomains');
			
			that.lookBenDihb()
			uni.$on('ZhuRulookBenDihb', (val) => {
				that.lookBenDihb()
			})
			
			//#ifdef APP-PLUS
			that.isStatusBarHeight = systemInfo.statusBarHeight + 66 + 'px'
			//#endif
			
			that.LuoDidomain = uni.getStorageSync("LuoDidomain")
			//console.log(systemInfo)
			
			let UnityisApp = uni.getStorageSync("UnityisApp")
			
			
			//判断是否WebApp启动，如果是就个他领取安装奖励
			//#ifdef H5
			if (window.navigator.standalone == true) {
				//alert('IOS-是从桌面中打开的')
				
				//这里也可以知道是从mobileconfig描述文件打开的
				
				that.yqhaoyoushow = false
				that.ceBianInstall = false
				that.statusBarHeight = true
			} else if (window.matchMedia("(display-mode: standalone)").matches) {
				//alert('android-是从桌面中打开的')
				that.yqhaoyoushow = false
				that.ceBianInstall = false
				that.statusBarHeight = true
			} else if(UnityisApp) {
				
				that.yqhaoyoushow = false
				that.ceBianInstall = false
				that.statusBarHeight = true
				
			} else {
				//alert('浏览器里面打开的')
				//就是浏览器里面打开的
				that.statusBarHeight = false
				if(systemInfo.deviceType == "phone") {
					that.installWebapp()
					if(systemInfo.osName == "ios"){
						that.is_deviceType = 0
					} else {
						that.is_deviceType = 1
					}
				}
			}
			//#endif
			
			
			that.inspectToken()

			let isToken = uni.getStorageSync("token")
			if (!isToken) {

			} else {
				that.getMybalance();
			}

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

		},
		mounted() {
			
		},
		beforeDestroy() {
			// let that = this
			// uni.$on('getgetMybalance', (val) => {
			// 	that.play2()
			// })
		},
		beforeUpdate() {
			
		},
		methods: {
			//给当前网址新增一个时间戳参数，重新加载来解决CDN缓存
			updateUrlWithTimestamp() {
			    // 创建一个新的URL对象
				const newUrl = new URL(window.location.href);
			 
			    // 添加时间戳参数
			    newUrl.searchParams.set('timestamp', Date.now());
			 
			    // 使用新的URL替换当前页面的历史记录
			    window.history.replaceState(null, '', newUrl.toString());
				
				location.reload();

				//location.href = location.href;
				
				//location.replace(location.href);
			
			},
			JianCeZhuti(){
				let that = this
				let theme = that.$store.getters.currentTheme;
				if (theme == "whiteTheme") {
					that.ztidex = 1
					console.log('白色主题')
				} else {
					that.ztidex = 0
					console.log('黑色主题')
				}
			},
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
			
			lookBenDihb(){
				let that = this
				//看看本地是否存在了选择货币展示
				let SelectCurrencys = uni.getStorageSync("SelectCurrency");
				if(!SelectCurrencys){
					//console.log('本地不存在已选的货币',SelectCurrencys);
					that.SelectCurrencyData = {}
					that.is_SelectCurrencyData = false
				} else {
					//console.log('本地已存在已选的货币',SelectCurrencys);
					that.SelectCurrencyData = SelectCurrencys
					that.is_SelectCurrencyData = true
				}
			},
			openShuaxinbc(){
				//this.YiJianShow = true
				this.$refs.OpenPopup.openShow()
			},
			UpSelectCurrency(data){
				console.log('选择的货币',data)
				this.SelectCurrencyData = data
				this.is_SelectCurrencyData = true
			},
			openHappyBir(data){
				let that = this
				that.$nextTick(() => {
				    that.$refs.OpenBirthdayPopup.openPopup(data)
				})
			},
			openCongratulations(data){
				let that = this
				that.$nextTick(() => {
				    that.$refs.OpenLeveUp.openPopup(data)
				})
			},
			UpdataAddbc(val){
				//console.log(val)
				//let Bc = (val/100).toFixed(2)
				let that = this
				that.PiaoChangVal = val
				that.show3 = true
				setTimeout(()=>{
					that.show3 = false
				},3000)
				// that.$refs.uTips.show({
				// 	title: '+' + val,
				// 	type: 'success',
				// 	duration: '3000'
				// });
			},
			removeCharLevel(value) {
				return value.replace(new RegExp('https://', 'g'), '');
			},
			
			
			
			
			
			
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log('2',e);
				this.TodayHide = e
			},
			//检测Install弹窗24小时一次
			installWebapp() {
				let nowTime = uni.getStorageSync("popUp-install-time");
				if(!nowTime || new Date().getTime() - nowTime > 1000 * 60 * 60 * 24){
					//console.log('超出24小时了')
					//alert('超出24小时了')
					//uni.setStorageSync("popUp-install-time", new Date().getTime());
					uni.removeStorageSync('popUp-install-time');
					this.yqhaoyoushow = true;
					this.Navheight = 115
				} else {
					//console.log('还没超过24小时了')
					//alert('还没超过24小时了')
					this.yqhaoyoushow = false;
					this.Navheight = 59
				}
			},
			//关闭Install弹出回调
			GuanBiinstall(e) {
				this.yqhaoyoushow = false;
				this.Navheight = 59
				uni.setStorageSync("popUp-install-time",new Date().getTime());
				setTimeout(()=>{
					this.$emit('GuanInstall', 1)
				},200)
			},
			GuanBiinstallPopup(){
				//console.log('关闭了安装app引导弹窗',this.TodayHide)
				if(this.TodayHide == true){
					this.yqhaoyoushow = false;
					this.Navheight = 59
					uni.setStorageSync("popUp-install-time",new Date().getTime());
				} else {
					//this.yqhaoyoushow = false;
					//this.Navheight = 59
				}
			},
			OpenInstallguiin(){
				let that = this
				//that.$refs.openInstallshow.openPopup();
				
				//先复制渠道id安装后获取粘贴板
				let Codeid = 'pid' + uni.getStorageSync('channel_id');
				uni.setClipboardData({
					data: Codeid,
					showToast: false,
					success: function() {}
				});
				
				if(that.is_deviceType == 0){
					//打开URL安装ios描述文件
					let url = uni.getStorageSync('ipaUrl');
					window.open(url,'_self');
				} else {
					//直接下载安卓APK
					let url = uni.getStorageSync('apkUrl');
					window.open(url,'_self');
				}
			},
			
			
			
			
			
			
			
			
			
			TochatUrl(){
				let that = this
				const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
				that.$u.post('/game/chat', {
					pid: this.PID,
					lang: language
				}).then(res => {
					let chatUrl = res.data.chatUrl
					
					// #ifdef APP-PLUS
					plus.runtime.openURL(chatUrl);
					// #endif
					
					// #ifdef H5
					// let url_ = '/pages/chatWebview/chatWebview?url=' + encodeURIComponent(JSON.stringify(chatUrl))
					// if (url_.indexOf('%') > -1) {
					// 	url_ = url_.replace(/%/g, '%25');
					// }
					// uni.navigateTo({
					// 	url: url_
					// })
					setTimeout(() => {
						window.open(chatUrl, '_blank');
					}, 500)
					// #endif
					
				})
			},
			PopUpclose() {
				this.animation = uni.createAnimation({
					duration: 400
				});
				//设置旋转角度 
				this.animation.rotate(0).step()
				//导出动画
				this.animationData = this.animation.export()
			},
			startAnimation() {
				this.JianCeZhuti()
				//旋转角度 
				let rota = 180;
				//判断是否展开
				if (this.MenuShow) {
					rota = 0;
					//标记未展开
					this.MenuShow = false;
				} else {
					this.MenuShow = true
				}
				
				//创建动画
				this.animation = uni.createAnimation({
					duration: 400
				});
				//设置旋转角度 
				this.animation.rotate(rota).step()
				//导出动画
				this.animationData = this.animation.export()
			},
			getMybalance() {
				let that = this
				that.$u.post('/refresh-balance', {

				}).then(res => {
					that.balance = res.data.balance
					
					that.lookBenDihb();//在转换一下货币
					
				}).catch(err => {
					
				})
			},
			play2() {
				let that = this
				that.showAnimate = true
				that.isCountTo = true
				that.getMybalance()
				setTimeout(() => {
					that.showAnimate = false
					that.isCountTo = false
				}, 1000)
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
			inspectToken() {
				let token = uni.getStorageSync("token");

				if (!token) {
					this.is_logon = 0
				} else {
					this.is_logon = 1
				}
			},
			OpenMenu() {
				this.MenuShow = false
				//this.MenuShow == false ? this.MenuShow = true : this.MenuShow = false
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
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			openType(index) {
				let that = this
				this.MenuShow = false
				if(index == 99){
					that.updateUrlWithTimestamp()
				} else if (index == 1) {
					uni.switchTab({
						url: '/pages/Account/Account'
					})
				} else if (index == 2) {
					uni.switchTab({
						url: '/pages/Bonus/Bonus'
					})
				} else if (index == 8) {
				 	uni.switchTab({
				 		url: '/pages/Referandearn/Referandearn'
				 	})
				 } else if (index == 9) {
				 	uni.navigateTo({
				 		url: '/pages/VipClubsNew/VipClubsNew'
				 	})
				 } else if (index == 13) {
					
					//先复制渠道id安装后获取粘贴板
					let Codeid = 'pid' +  uni.getStorageSync('channel_id');
					uni.setClipboardData({
						data: Codeid,
						showToast: false,
						success: function() {}
					});
					
					if(that.is_deviceType == 0){
						//打开URL安装ios描述文件
						let url = uni.getStorageSync('ipaUrl');
						window.open(url,'_self');
					} else {
						//直接下载安卓APK
						let url = uni.getStorageSync('apkUrl');
						window.open(url,'_self');
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
						// #ifdef APP-PLUS
						plus.runtime.openURL(chatUrl);
						// #endif
						
						// #ifdef H5
						// let url_ = '/pages/chatWebview/chatWebview?url=' + encodeURIComponent(JSON.stringify(chatUrl))
						// if (url_.indexOf('%') > -1) {
						// 	url_ = url_.replace(/%/g, '%25');
						// }
						// uni.navigateTo({
						// 	url: url_
						// })
						setTimeout(() => {
							window.open(chatUrl, '_blank');
						}, 500)
						// #endif
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
							} else if (index == 16) {
								uni.navigateTo({
									url: '/pages/Bonus-Logoin/Bonus-Logoin'
								})
							}
							
						}, 100)
					}

				}
			},
			ToWallet(type) {
				let that = this
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
			},
			BlackPage() {
				//uni.navigateBack()
				let canNavBack = getCurrentPages()
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack()
				} else {
					history.back();
				}
			},
			ToNotification() {
				let isOpen = uni.getStorageSync("NotisOpen")
				if (isOpen == 1) {
					//console.log('已经打开通知页面了')
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
			JiSuanHuiLv(data){
				//金额显示 = 游戏币×汇率
				let yue = (this.balance / 100)
				let price = (yue / data.currency_rate).toFixed(2);
				return price
			},
			Towallet() {
				uni.switchTab({
					url: '/pages/Wallet/Wallet'
				})
			},
			YiJianShouHuis(){
				let that = this
				that.YiJianShow = true
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
				});
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

		}
	}
</script>
<style lang="scss" scoped>
	.qingchu_hc {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 15px;
		color: $font-all-color;
		text-decoration: underline;
		.view_box1 {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}
		}
		.view_box2 {
			margin-left: 10rpx;
			display: flex;
			align-items: center;
		}
	}
	
	.LiShiJiLu_box {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 22px;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 999999999;
		text-align: right;
		padding-right: 32px;
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
	
	/deep/ .u-navbar-fixed {
		background-color: $navbar-bg-color !important;
	}
	
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
	
	/deep/ .u-drawer {
		max-width: 100%;
	}
	
	/deep/ .u-slot-content {
		display: inline-block !important;
	}
	
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
	
	.CbianKfu {
		color: $font-all-color;
		position: fixed;
		top: 50%;
		right: 0;
		transform: translate(0%, -50%);
		z-index: 9999;
		
		writing-mode: vertical-rl;
		//transform: rotate(180deg);
		background-color: $all-secondary-color;
		width: 70rpx;
		line-height: 70rpx;
		padding: 20rpx 0;
		border-radius: 10rpx 0 0 10rpx;
	}

	.menu_wrap2 {
		//padding: 270rpx 30rpx 30rpx 30rpx !important;
		padding: 150rpx 30rpx 30rpx 30rpx !important;
	}

	.menu_wrap {
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
				font-weight: bold;
			}
		}
	}

	.logo_and_right {
		width: 100%;
		padding: 24rpx 12rpx 22rpx 30rpx;
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
			width: 140px;

			.menu {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
			}

			.menu2 {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
			}

			.logo {
				width: 100%;
				height: 100rpx;
			}
		}

		.right_box {
			display: flex;
			align-items: center;

			.SignIn_Regiser {
				display: flex;
				align-items: center;
				color: #fff;
				//font-weight: bold;
				font-size: 26rpx;
				position: relative;

				.SigninBtn {
					position: relative;
					margin-left: 20rpx;
					span {
						font-weight: bold;
						word-break:break-all;
						display:-webkit-box;
						-webkit-line-clamp:1;
						-webkit-box-orient:vertical;
						overflow:hidden;
						background-color: #3673D9;
						background: linear-gradient(1turn,#0c5eff .8%,#1398f9);
						box-shadow: 0 3px 28px #2283f666,inset 0 3px 3px #ffffff4d;
						border-radius: 6px;
						height: 60rpx;
						line-height: 60rpx;
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
					height: 60rpx;
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
					margin-left: 20rpx;
					span {
						font-weight: bold;
						word-break:break-all;
						display:-webkit-box;
						-webkit-line-clamp:1;
						-webkit-box-orient:vertical;
						overflow:hidden;
						//background: linear-gradient(1turn,#FF9619 .8%,#FFB930);
						//box-shadow: 0 3px 16px #6f3f06,inset 0 4px 3px #ffffff4d;
						background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
						box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
						border-radius: 6px;
						height: 60rpx;
						line-height: 60rpx;
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
					height: 60rpx;
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
			
			.xsTask {
				position: relative;
				//left: -10rpx;
				margin: 0 4rpx 0 12rpx;
			}
			
			.xsTask2 {
				position: relative;
				//left: -10rpx;
				margin: 0 10rpx 0 20rpx;
			}

			.tongzhi {
				height: 31px;
				width: 31px;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				span {
					display: inline-block;
					width: 26rpx;
					height: 26rpx;
					//background: linear-gradient(1turn, #1bb83d .8%, #1bb83d);
					//box-shadow: 0 3px 16px #005413, inset 0 4px 3px #ffffff4d;
					
					background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
					box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
					
					border-radius: 100px;
					position: absolute;
					top: 0;
					right: 0;
					text-align: center;
					line-height: 26rpx;
					color: #FEFEFE;
					font-size: 18rpx;
					z-index: 2;
					padding: 1px 1px;

				}

				image {
					position: relative;
					top: -0rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}

			.my_Wallet {
				position: relative;
				display: flex;
				align-items: center;
				background-color: $wallet-bg-color;
				border: 1px solid $wallet-border;
				border-radius: 10px;
				margin-right: 5rpx;
				//box-shadow: 0 0 20px rgba(23, 23, 25, 0.38);
				height: 38px;
				.mayjine {
					padding: 0 10rpx 0 20rpx;
					display: flex;
					align-items: center;
					position: relative;

					.shuaxin {
						width: 26.39rpx;
						height: 26.39rpx;
						margin-right: 0;
						position: relative;
						top: 1rpx;
					}

					.yue {
						font-size: 28rpx;
						color: $wallet-myedu;
						margin-right: 10rpx;
						display: flex;
						align-items: center;
						position: relative;
						
						.arrow-down {
							margin-left: 14rpx;
						}
						
						.myedu {
							//text-decoration: underline;
							font-weight: bold;
						}

						span {
							margin-right: 6rpx;
						}

						view {
							//font-weight: bold;
							font-size: 28rpx;
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
						//box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
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
	
	
	
	
	
	
	
	
	
	.sevae_btn_wrap {
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: $pupUp-bg-color;
		padding: 20rpx 20rpx 30rpx 20rpx;
		.sevae_btn {
			width: 98%;
			margin: 0 auto;
			/deep/ .u-icon {
				margin-right: 10rpx;
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	.Register_btn {
		width: 95%;
		margin: 0 auto 20rpx;
	}
	.reg_btn {
		cursor: pointer;
		position: relative;
		width: 95%;
		margin: 0 auto 20rpx;
		span {
			width: 100%;
			color: $all-secondary-text-color;
			display: inline-block;
			background-color: #2c62f4;
			background: linear-gradient(1turn, #2c62f4 .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			border-radius: 10px;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			position: relative;
			z-index: 2;
			
			
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
	
	.reg_btn:after {
		width: 100%;
		border-radius: 10px;
		height: 80rpx;
		background-color: #003293;
		bottom: -3px;
		content: "";
		display: block;
		left: 0;
		margin: 0 auto;
		pointer-events: none;
		position: absolute;
		right: 0;
		z-index: 1;
	}
</style>