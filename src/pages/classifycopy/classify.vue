<template>
	<view :style="theme">

		<!-- 顶部导航 -->
		<navbar ref="child" :isCountTo="true" :showInstall="false"></navbar>

		<!-- 轮播图 -->
		<!-- <home-swiper ref="" :Gamesdata="OneGames" @btnClick="btnClick" :list="lunbotuList" :systemList="SystemunreadList" v-if="swpier_skeleton_loading"></home-swiper>
		<view v-else class="swpier_skeleton_box_height">
			<view class="swpier_skeleton_loading"></view>
		</view>
		<view class="notice-bar">
			<u-notice-bar speed="90" type="primary" color="#ffffff" bg-color="rgba(255, 0, 0, 0)" mode="horizontal" :list="SystemunreadList" :close-icon="false" :more-icon="true" @getMore="ToNocInfo" @click="ToNocInfo"></u-notice-bar>
		</view> -->






		<view class="page-content">
			<luBarTabNav :tabList="tabbar" :barFixed="barFixed" :iconShow="iconShow" :transitionShow="transitionShow" :barHeight="barHeight" :barTop="barTop" :barId="barId" ref="barTabNav">
				<view v-for="(item,index) in tabbar" :key="index" :id="'item'+(index+1)" :class="[index<6?'tabbody':'tabbody2']" :style="{paddingTop: index==0?'40rpx':''}">

					<!-- 标题 -->
					<view class="biaoti_box">
						<view class="biaotilan">
							<image :src="item.iconImage" mode="widthFix"></image>
							<view v-if="item.text && item.text=='Hot'">{{$t('Popular')}}</view>
							<view v-if="item.text && item.text=='Slots'">{{$t('Slots')}}</view>
							<view v-if="item.text && item.text=='Fishing'">{{$t('Fishing')}}</view>
							<view v-if="item.text && item.text=='Live'">{{$t('LiveCasino')}}</view>
							<view v-if="item.text && item.text=='Sports'">{{$t('Sports')}}</view>
							<view v-if="item.text && item.text=='Cards'">{{$t('Cards')}}</view>
							<view v-if="item.text && item.text=='Mini'">{{$t('MiniGames')}}</view>
							<view v-if="item.text && item.text=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
							<view v-if="item.text && item.text=='Poker'">{{$t('ADDnew.Poker')}}</view>
							<view v-if="item.text && item.text=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
							<view v-if="item.text && item.text=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
						</view>
						<view class="lookAll">
							<view v-if="item.type == 1" @click="lookAll(item,index)">查看全部</view>
							<view v-if="item.type == 2" @click="lookAllCs(item,0)">查看全部</view>
							<u-icon name="arrow-right" color="#2283f6" size="24"></u-icon>
						</view>
					</view>
					<!-- 主图 -->
					<view class="rec_bottom" v-if="item.vendors.length < 11">
						<view class="shopTuijian">
							<scroll-view class="uni-swiper-tab" scroll-x>
								<view class="scrollx_items" v-for="(val,indexb) in item.vendors" :key="indexb">
									<view class="jrsx_item2">
										<view class="goodsdetail">
											<view class="jrsx_img" @click="item.type == 1?lookMask(val,val.gameCode+indexb):lookitemCs(item,indexb)">
												<view class="csName_title" v-if="item.type == 2">
													<text>{{val.nameCode}}</text>
													<view v-if="item.text && item.text=='Slots'">{{$t('Slots')}}</view>
													<view v-if="item.text && item.text=='Fishing'">{{$t('Fishing')}}</view>
													<view v-if="item.text && item.text=='Live'">{{$t('LiveCasino')}}</view>
													<view v-if="item.text && item.text=='Sports'">{{$t('Sports')}}</view>
													<view v-if="item.text && item.text=='Cards'">{{$t('Cards')}}</view>
													<view v-if="item.text && item.text=='Mini'">{{$t('MiniGames')}}</view>
													<view v-if="item.text && item.text=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
													<view v-if="item.text && item.text=='Poker'">{{$t('ADDnew.Poker')}}</view>
													<view v-if="item.text && item.text=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
													<view v-if="item.text && item.text=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
												</view>
												<block v-if="item.type == 1">
													<u-lazy-load :is-effect="false" class="goods-icon" height="100%" :image="val.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
												</block>
												<block v-else-if="item.type == 2">
													<u-lazy-load class="goods-icon" height="238" :image="domains + '/vendorIcon/' + item.text + '/' + val.name + '.png'" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
												</block>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="zheceng"></view>
						</view>
					</view>
					<view class="all" v-else>
						<scroll-view class="nav-bar" scroll-x>
							<view class="nav-bar-wrap">
								<block v-for="(itembb,indexbb) in item.vendors" :key="indexbb">
									<view class="nav-bar-item" @click="item.type == 1?lookMask(itembb,itembb.gameCode+indexbb):lookitemCs(item,indexbb)" :id="itembb.id">
										<view class='goodsdetail'>
											<view class='jrsx_img'>
												<view class="csName_title" v-if="item.type == 2">
													<text>{{itembb.nameCode}}</text>
													<view v-if="item.text && item.text=='Slots'">{{$t('Slots')}}</view>
													<view v-if="item.text && item.text=='Fishing'">{{$t('Fishing')}}</view>
													<view v-if="item.text && item.text=='Live'">{{$t('LiveCasino')}}</view>
													<view v-if="item.text && item.text=='Sports'">{{$t('Sports')}}</view>
													<view v-if="item.text && item.text=='Cards'">{{$t('Cards')}}</view>
													<view v-if="item.text && item.text=='Mini'">{{$t('MiniGames')}}</view>
													<view v-if="item.text && item.text=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
													<view v-if="item.text && item.text=='Poker'">{{$t('ADDnew.Poker')}}</view>
													<view v-if="item.text && item.text=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
													<view v-if="item.text && item.text=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
												</view>
												<block v-if="item.type == 1">
													<u-lazy-load :is-effect="false" class="goods-icon" height="100%" :image="itembb.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
												</block>
												<block v-else-if="item.type == 2">
													<u-lazy-load class="goods-icon" height="238" :image="domains + '/vendorIcon/' + item.text + '/' + itembb.name + '.png'" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
												</block>
											</view>
										</view>
									</view>
								</block>
							</view>
						</scroll-view>
						<view class="zheceng"></view>
					</view>

				</view>
			</luBarTabNav>
		</view>






































		<view class="popupPlay">
			<u-popup v-model="PlayGameshow" mode="bottom" border-radius="30" :closeable="false" :safe-area-inset-bottom="true">
				<view class="play_game_box">
					<view class="game_info_wrap">
						<image class="gamene_img" mode="widthFix" :src="playGameData.path"></image>
						<view class="game_info">
							<view class="game_nam">{{playGameData.gameName}}</view>
							<view class="tigs">
								{{GetGamesType(playGameData.vendor)}}
								<view v-if="isLogin == 1" style="margin-left: auto;" @click="cLike(playGameData.gameCode,playGameData.favorite);playGameData.favorite =! playGameData.favorite">
									<view class="star_icon" v-if="playGameData.favorite == true">
										<u-icon name="star-fill"></u-icon>
									</view>
									<view class="star_icon" v-else>
										<u-icon name="star"></u-icon>
									</view>
								</view>
								<view style="margin-left: auto;" v-else>
									<view class="star_icon">
										<u-icon name="star" @click="SignInBtn()"></u-icon>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="popupPay_btn_box">
						<view class="quxiao">
							<span @click="PlayGameshow = false">{{$t('NewlyAdded.Cancel')}}</span>
						</view>
						<view class="kaishi">
							<view class="mask_btn" v-if="isLogin == 1">
								<u-button type="primary" :disabled="disabledPlay" :loading="playloading" shape="circle" @click.stop="OpenGames(playGameData)">
									<u-icon name="play-right-fill" size="26" color="#fff"></u-icon>{{$t('PlayS')}}
								</u-button>
							</view>
							<view class="mask_btn" v-else>
								<u-button type="primary" shape="circle" @click.stop="SignInBtn()">{{$t('regiserPopup.signIn')}}</u-button>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>


		<!-- 登录弹窗 -->
		<signInPopup ref="signInShow"></signInPopup>

		<!-- 关于我们和技术支持 -->
		<view v-if="tabbar.length != 0">
			<home-bottom-info ref=""></home-bottom-info>
		</view>


		<match-media :max-width="800">
			<!-- 右下角客服 -->
			<!-- <view class="CbianKfu" @click="TochatUrl()">
				{{$t('sidebar.title10')}}
			</view> -->
			<!-- <view>页面宽度低于 800px 时显示</view> -->
			<u-tabbar></u-tabbar>
		</match-media>

	</view>
</template>

<script>
	import luBarTabNav from "@/components/lu-bar-tab-nav/lu-bar-tab-nav.vue";
	export default {
		components: {
			luBarTabNav
		},
		data() {
			return {
				barFixed: true,
				barHeight: "34",
				barTop: 59,
				iconShow: false,
				transitionShow: false,
				barId: "0",
				tabbar: [],

				allHotGames: 0,

				swpier_skeleton_loading: false,
				OneGames: {},
				lunbotuList: [],
				SystemunreadList: [],

				loadingImg: '/static/logo/' + this.PID + '_logo.png',
				errorImg: '/static/logo/' + this.PID + '_logo.png',
				playGameData: {},
				PlayGameshow: false,
				domains: '',
				playloading: false,
				vendorsList: [],
				isLogin: 0,
				disabledPlay: false

			};
		},
		onLoad(ops) {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});

			let token = uni.getStorageSync("token")
			if (!token) {
				that.isLogin = 0
			} else {
				that.isLogin = 1
			}
			that.getVlistAll();
			
			//that.getLunbotu();
			//that.getSystemUnread();
		},
		onShow() {

		},
		methods: {
			onPageScroll: function(e) {
				this.$refs.barTabNav._selectedTab(e.scrollTop);
			},
			//先获取分类列表
			async getVlistAll() {
				let that = this
				const ress = await that.$u.post('/game/category', {});
				that.domains = ress.data.domain;

				//过滤掉大厅
				let newList = [{
					id: 0,
					type: 1, //表示热门游戏
					vendors: await that.GetHotGames(),
					text: "Hot",
					navTarget: "#item0",
					iconImage: "/static/image/huore.png",
				}]
				ress.data.categories.forEach((item, index) => {
					if (item.name != "Lobby" && item.id != 100 && item.vendors.length != 0) {
						newList.push({
							id: item.id,
							type: 2,
							vendors: item.vendors,
							text: item.name,
							navTarget: "#item" + index,
							iconImage: item.path,
						})
					}
				});
				console.log('1', newList);

				let xindearr = []
				newList.forEach((items, indexs) => {
					xindearr.push({
						type: items.type,
						id: items.id,
						vendors: items.vendors,
						text: items.text,
						navTarget: "#item" + (indexs + 1),
						iconImage: items.iconImage,
					})
				});
				that.tabbar = xindearr
				console.log('2', xindearr);
			},
			//获取热门游戏
			async GetHotGames() {
				let that = this
				const res = await that.$u.post('/game/list', {
					queryHot: true,
					page: 1
				})
				that.allHotGames = res.data.totalCount
				return res.data.gameList
			},


















































































			// getLunbotu() {
			// 	let that = this
			// 	that.$u.post('/game/activity', {
			// 		positionType: 2, //（1 活动列表 2 首页跑马灯 ）
			// 		pid: that.PID, //Number 是 平台Id
			// 	}).then(res => {

			// 		let newList = [];
			// 		if (that.PID == 8) {
			// 			newList = [{
			// 				content: "",
			// 				endTime: "2024-09-12 12:00:00",
			// 				mobileImage: "/static/image/dataosha_img.jpg",
			// 				pcImage: "/static/image/dataosha_img.jpg",
			// 				startTime: "",
			// 				summary: "",
			// 				title: "大逃杀",
			// 				type: 666
			// 			}];
			// 		} else {
			// 			newList = [];
			// 		}

			// 		res.data.forEach((item, index) => {
			// 			newList.push({
			// 				content: item.content,
			// 				endTime: item.endTime,
			// 				mobileImage: item.mobileImage,
			// 				pcImage: item.pcImage,
			// 				startTime: item.startTime,
			// 				summary: item.summary,
			// 				title: item.title,
			// 				type: item.type
			// 			})
			// 		});
			// 		//console.log('轮播图',newList)
			// 		that.lunbotuList = newList //res.data
			// 		that.swpier_skeleton_loading = true
			// 	}).catch(err => {

			// 	})
			// },
			// btnClick() {
			// 	let that = this
			// 	console.log('点击了悬浮窗', that.OneGames);
			// 	let isToken = uni.getStorageSync("token");
			// 	if (!isToken) {
			// 		that.$refs.signInShow.openPopup(1)
			// 	} else {
			// 		let val = that.OneGames
			// 		//开始进入游戏
			// 		that.$u.post('/enter-tgfun', {
			// 			gameCode: val.gameCode
			// 		}).then(res => {
			// 			let gameUrl = res.data.gameUrl
			// 			//把游戏地址写入缓存便于Webview读取打开
			// 			uni.setStorageSync("PlayGamesUrl", gameUrl);
			// 			//导航栏金币显示游戏中
			// 			uni.$emit('OpeninGames', 1);
			// 			uni.navigateTo({
			// 				url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode +
			// 					'&favorite=' + val.favorite
			// 			})
			// 		}).catch(err => {})
			// 	}
			// },
			// getSystemUnread() {
			// 	let that = this
			// 	that.$u.post('/query-mail', {
			// 		type: 1,
			// 		lastMailId: 0
			// 	}).then(ress => {
			// 		let unread = [];
			// 		ress.data.forEach((item, index) => {
			// 			if (item.status == 0) {
			// 				unread.push(item.content)
			// 			}
			// 		});
			// 		that.SystemunreadList = unread
			// 	})
			// },
			// ToNocInfo() {
			// 	let windowWidth = uni.getSystemInfoSync().windowWidth;
			// 	if (windowWidth >= "800") {
			// 		this.showPCnc = true
			// 		this.$refs.TZTanchuang.init()
			// 	} else {
			// 		uni.navigateTo({
			// 			url: '/pages/Notification/Notification'
			// 		})
			// 	}
			// },













































































































			lookMask(item, idx) {
				console.log('点击游戏',item, idx);
				this.PlayGameshow = true
				this.playGameData = item

				let token = uni.getStorageSync("token")
				if (!token) {
					this.isLogin = 0
				} else {
					this.isLogin = 1

					//判断这个用户是否禁止游戏不让玩
					const noPlay = this.jisuanWeizhi();
					console.log('是否禁玩', noPlay);
					if (noPlay == 1) {
						this.disabledPlay = true
					} else {
						this.disabledPlay = false
					}

				}
			},
			//检测禁止游戏功能
			jisuanWeizhi() {
				const userInfo = uni.getStorageSync("userinfo");
				const num = userInfo.managerFlag;
				const bitPosition = 4;
				const fag = this.checkBit(num, bitPosition) ? '1' : '0'; //1禁止 0不禁止
				return fag
			},
			checkBit(num, bitPosition) {
				const mask = 1 << bitPosition;
				return (num & mask) !== 0;
			},
			JumpNewUrl(val) {
				let that = this
				let Device_type = uni.getStorageSync('DeviceType');
				let client_Type = ''
				if (Device_type == "pc") {
					client_Type = 'html5-desktop'
				} else {
					client_Type = 'html5'
				}
				if (val.API == "tcg") {
					this.$u.post('/enter-tcg', {
						gameCode: val.gameCode,
						clientType: client_Type
					}).then(res => {
						console.log('AG', res.data)
						let gameUrl = res.data.gameUrl
						that.playloading = false
						this.PlayGameshow = false
						window.open(gameUrl, '_self');
					}).catch(err => {
						that.playloading = false
					})
				} else if (val.API == "huidu") {

				}
			},
			OpenGames(val) {
				//console.log('点击开始游戏',val)
				let that = this
				that.playloading = true

				// #ifdef H5 || WEB
				//IOS客户端独有，判断是否是AG电子游戏如果是就跳转新标签打开
				//category3是电子游戏分类
				let systemInfo = uni.getSystemInfoSync();
				if ((systemInfo.platform == "ios" || systemInfo.platform == "macos") && systemInfo.browserName ==
					"safari") {
					let Manufacturer = that.GetGamesType(val.vendor);
					if (Manufacturer == "AG" && val.category == 3) {
						that.JumpNewUrl(val)
						return false
					}
				}
				// #endif

				if (val.API == "tcg") {
					let Device_type = uni.getStorageSync('DeviceType');
					let client_Type = ''
					if (Device_type == "pc") {
						client_Type = 'html5-desktop'
					} else {
						client_Type = 'html5'
					}
					this.$u.post('/enter-tcg', {
						gameCode: val.gameCode,
						clientType: client_Type
					}).then(res => {
						let gameUrl = res.data.gameUrl

						//把游戏地址写入缓存便于Webview读取打开
						uni.setStorageSync("PlayGamesUrl", gameUrl)

						//导航栏金币显示游戏中
						uni.$emit('OpeninGames', 1);

						that.playloading = false
						this.PlayGameshow = false

						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
						})
					}).catch(err => {
						that.playloading = false
					})
				} else if (val.API == "one" || val.API == "oneApi") {
					this.$u.post('/enter-one', {
						gameCode: val.gameCode
					}).then(res => {
						let gameUrl = res.data.gameUrl

						//把游戏地址写入缓存便于Webview读取打开
						uni.setStorageSync("PlayGamesUrl", gameUrl)

						//导航栏金币显示游戏中
						uni.$emit('OpeninGames', 1);

						that.playloading = false
						this.PlayGameshow = false

						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
						})
					}).catch(err => {
						that.playloading = false
					})
				} else if (val.API == "huidu") {
					this.$u.post('/enter-huidu', {
						gameCode: val.gameCode
					}).then(res => {
						let gameUrl = res.data.gameUrl
						//把游戏地址写入缓存便于Webview读取打开
						uni.setStorageSync("PlayGamesUrl", gameUrl)

						//导航栏金币显示游戏中
						uni.$emit('OpeninGames', 1);

						that.playloading = false
						this.PlayGameshow = false

						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
						})
					}).catch(err => {
						that.playloading = false
					})
				} else if (val.API == "tgfun") {
					this.$u.post('/enter-tgfun', {
						gameCode: val.gameCode
					}).then(res => {
						let gameUrl = res.data.gameUrl
						//把游戏地址写入缓存便于Webview读取打开
						uni.setStorageSync("PlayGamesUrl", gameUrl)

						//导航栏金币显示游戏中
						uni.$emit('OpeninGames', 1);

						that.playloading = false
						this.PlayGameshow = false

						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
						})
					}).catch(err => {
						that.playloading = false
					})
				} else if (val.API == "ky") {
					this.$u.post('/enter-ky', {
						gameCode: val.gameCode
					}).then(res => {
						let gameUrl = res.data.gameUrl
						//把游戏地址写入缓存便于Webview读取打开
						uni.setStorageSync("PlayGamesUrl", gameUrl)

						//导航栏金币显示游戏中
						uni.$emit('OpeninGames', 1);

						that.playloading = false
						this.PlayGameshow = false

						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
						})
					}).catch(err => {
						that.playloading = false
					})
				} else if (val.API == "tcg2") {
					let Device_type = uni.getStorageSync('DeviceType');
					let client_Type = ''
					if (Device_type == "pc") {
						client_Type = 'html5-desktop'
					} else {
						client_Type = 'html5'
					}
					that.$u.post('/enter-tcg2', {
						gameCode: val.gameCode,
						clientType: client_Type
					}).then(res => {
						let gameUrl = res.data.gameUrl
						//把游戏地址写入缓存便于Webview读取打开
						uni.setStorageSync("PlayGamesUrl", gameUrl)

						//导航栏金币显示游戏中
						uni.$emit('OpeninGames', 1);

						that.playloading = false
						this.PlayGameshow = false

						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
						})
					}).catch(err => {
						that.playloading = false
					})
				} else {
					this.$u.post('/enter-wl', {
						gameCode: val.gameCode
					}).then(res => {
						let gameUrl = res.data.gameUrl

						//把游戏地址写入缓存便于Webview读取打开
						uni.setStorageSync("PlayGamesUrl", gameUrl)

						//导航栏金币显示游戏中
						uni.$emit('OpeninGames', 1);

						that.playloading = false
						this.PlayGameshow = false

						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
						})
					}).catch(err => {
						that.playloading = false
					})
				}

				// #ifdef H5
				//友盟埋点事件
				const _czc = _czc || [];
				window._czc.push(['_trackEvent', '打开', 'GAMEOPEN']);
				// #endif

			},
			cLike(code_id, sss) {
				//console.log('是什么',code_id,sss)
				if (sss === true || sss === 1) {
					//取消收藏
					this.quxiaoClickStar(code_id)
				} else {
					//收藏
					this.ClickStar(code_id)
				}
			},
			ClickStar(item) {
				//console.log(item)
				this.$u.post('/favorite', {
					gameCode: item, // String 是 游戏代码
					favorite: true // bool 是 收藏true 取消收藏false
				}).then(res => {})
			},
			quxiaoClickStar(item) {
				this.$u.post('/favorite', {
					gameCode: item, // String 是 游戏代码
					favorite: false // bool 是 收藏true 取消收藏false
				}).then(res => {})
			},
			SignInBtn() {
				this.$refs.signInShow.openPopup(1)
			},
			GetGamesType(proid) {
				let that = this
				let Vname = ''
				let Prolist = that.vendorsList
				Prolist.forEach((item, index) => {
					if (item.id == proid) {
						Vname = item.name
					}
				});
				return Vname
			},
			lookAll(item, index) {
				console.log('点击查看全部热门', item)
				let data = {
					id: item.id,
					name: item.text,
					path: item.iconImage
				}

				//把分类id写入缓存 防止刷新页面后不存在分类id
				uni.setStorageSync("isCurCInfo", data)
				uni.navigateTo({
					url: '/pages/classify/classify?Leixing=3' + '&index=' + 0
				})
			},
			//点击查看某个分类下面的全部厂商
			lookAllCs(item, index) {
				console.log('点击查看全部分类', item, index)
				let data = {
					id: item.id,
					name: item.text,
					path: item.iconImage
				}

				//把分类id写入缓存 防止刷新页面后不存在分类id
				uni.setStorageSync("isCurCInfo", data)
				uni.navigateTo({
					url: '/pages/classify/classify?Leixing=2' + '&index=' + index
				})
			},
			lookitemCs(item, index) {
				console.log('点击某个厂商查看', item, index)
				let data = {
					id: item.id,
					name: item.text,
					path: item.iconImage
				}
				//把分类id写入缓存 防止刷新页面后不存在分类id
				uni.setStorageSync("isCurCInfo", data)
				uni.navigateTo({
					url: '/pages/classify/classify?Leixing=2' + '&index=' + (index + 1)
				})
			},















		}
	}
</script>

<style lang="scss">
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.jrsx_img {
		position: relative;

		.goods-icon {
			//background-color: #1d2532;
		}

		.csName_title {
			font-size: 24rpx;
			text-align: center;
			color: $all-secondary-text-color;
			position: absolute;
			bottom: 4px;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 2;
			width: 100%;
			text-shadow: 0 .02rem .04rem rgba(0, 0, 0, .3);
		}
	}

	.page-content {
		margin-top: 20rpx;
		padding: 0 0 50rpx 0;
		position: relative;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;

		.biaoti_box {
			padding: 0 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.biaotilan {
				display: flex;
				align-items: center;
				font-weight: 700 !important;
				color: #fefefe;
				font-size: 16px;

				image {
					width: 22px;
					height: 22px;
					margin-right: 10rpx;
				}
			}

			span {
				font-size: 24rpx;
				color: #999;
			}
		}

		.youxitu {
			width: 150rpx;
			height: 150rpx;
			border-radius: 14rpx;
		}

		.look_btn {
			.suanduos {
				font-size: 22rpx;
				text-align: center;
				color: #7f8692;
				font-weight: initial;
				margin-bottom: 16rpx;
			}
		}
	}

	.lookAll {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 0 0 0;

		view {
			color: #2283f6;
			font-size: 14px;
			cursor: pointer;
		}
	}

	.tabbody {
		padding: 60rpx 30rpx 0 30rpx;
		width: 100%;
	}

	.tabbody2 {
		padding: 60rpx 30rpx 0 30rpx;
		width: 100%;
	}

	scroll-view {
		white-space: nowrap;
	}

	/* 去除滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
	}
	.zheceng {
		width: 100rpx;
		height: 98.5%;
		background: linear-gradient(90.17deg, rgba(32, 6, 58, 0) 0%, #0d131c 100%);
		position: absolute;
		right: -1px;
		bottom: 0;
	}

	.zheceng2 {
		width: 100rpx;
		height: 98.5%;
		background: linear-gradient(-90.17deg, rgba(32, 6, 58, 0) 0%, #0d131cc2 100%);
		position: absolute;
		left: -1px;
		bottom: 0;
		z-index: 9;
	}

	.jrsx_item2 {
		flex: 1;
		position: relative;
	}

	.rec_bottom {
		position: relative;

		.shopTuijian {
			padding: 20rpx 0 0 0;
		}

		.uni-swiper-tab {
			white-space: nowrap;
		}

		.scrollx_items {
			text-align: left;
			display: inline-block;
			width: 200rpx;
			box-sizing: border-box;

			/* #ifdef H5 */
			margin-right: 22rpx;
			/* #endif */

			/* #ifdef APP-PLUS */
			margin-right: 20rpx;
			/* #endif */

		}

		.scrollx_items:first-child {

			/* #ifdef H5 */
			margin-left: 0;
			/* #endif */

			/* #ifdef APP-PLUS */
			margin-left: 2px;
			/* #endif */
		}

		.scrollx_items:last-child {

			/* #ifdef H5 */
			margin-right: 5rpx;
			/* #endif */

			/* #ifdef APP-PLUS */
			margin-right: 5rpx;
			/* #endif */
		}
	}


	.all {
		position: relative;
		height: 222px;
		overflow: hidden;
	}

	scroll-view {
		white-space: nowrap;
	}

	/* 去除滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
	}

	.nav-bar-wrap {
		display: flex;
		flex-flow: column wrap;
		height: 222px;
	}

	.nav-bar-item {
		width: 200rpx;
		padding-top: 22rpx;
		margin-right: 22rpx;
	}
</style>