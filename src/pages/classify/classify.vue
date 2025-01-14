<template>
	<view :style="theme" class="container page_boxs">

		<!-- 顶部导航 -->

		<match-media :max-width="800">
			<navbar ref="child" :isCountTo="true" :showInstall="false"></navbar>
		</match-media>

		<view class="swbox_wrap">

			<FenLeiNavTitle ref="" :Total="HuadongtotalCount" :navIcon="navIcon" :title="navtitle || $t('Lobby')"></FenLeiNavTitle>

			<view class="right_wrap">


				<uv-sticky :z-index="98" :offsetTop="offsetTop" customNavHeight="0">
					<match-media :max-width="800">
						<view class="cs_huadong">
							<zzy-tabs :list="DTvendorsList" :domains="domains" name="name" :is-scroll="true" :current="Tagcurrent" @change="tabChange"></zzy-tabs>
						</view>
					</match-media>

					<!-- PC单独显示供应商 -->
					<!-- #ifndef APP-PLUS -->
					<match-media :min-width="800">
						<view class="allgys_pc">
							<view class="banshi2">
								<view class="swiper-container2">
									<view class="swiper-wrapper">
										<view v-for="(itemk,indexk) in DTvendorsList" :key="indexk" class="swiper-slide" :class="[Tagcurrent ==indexk ?'xzlbg':'']">
											<image class="gystupian" :src="domains + '/vendorIcon/' + itemk.name + '.png'" mode="widthFix" @click="tabChange(indexk)"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</match-media>
					<!-- #endif -->
				</uv-sticky>

				<view class="games_wrap_box">
					<view class="u-loading22" v-show="HoemGundongLoadingtrue == true">
						<view class="loader">
							<view class="loader-animation"></view>
						</view>
					</view>

					<!-- <view v-show="HoemGundongLoadingtrue == false"> -->
						
						
						<!-- <view v-if="categoryGames.length != 0"> -->
							<view class='rec_bottom'>
								<view class="uni-swiper-tab">

									<uni-row :gutter="30" class="demo-uni-row">
										<uni-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" v-for="(val,indexb) in categoryGames" :key="indexb">
											<view class='jrsx_item2'>
												<view class='goodsdetail'>
													<view class='jrsx_img' @click="lookMask(val,val.gameCode+indexb)">
														<u-lazy-load class="goods-icon" height="238" :image="val.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
													</view>
												</view>
											</view>
										</uni-col>
									</uni-row>
									
									<!-- <QSMasonry ref="QSMasonry" hasImage :col="col" @clickItem="DianJile"></QSMasonry> -->

									<view v-if="hideHotlistMoreBtn == 0">
										<view class="more-progress">
											<u-line-progress :percent="Moreprogress(HuadongtotalCount,categoryGames.length)" height="6" active-color="#2979ff" inactive-color="#9399ad" :show-percent="false">
												<view slot="default"></view>
											</u-line-progress>
										</view>
										<view class="tongji_box" :class="isNomoreDtRihgt == 1?'jianju':''">
											{{$t('prompt', {c:categoryGames.length,l:HuadongtotalCount})}}
										</view>
										<view class="more_btn" v-if="isNomoreDtRihgt == 0">
											<u-button type="warning" :loading="btnStatus" @click="HotLookMore()">{{$t('LoadMore')}}</u-button>
										</view>
									</view>

								</view>
							</view>
						<!-- </view> -->
						
						
						
						
						
						
						
						
						
						
						
						
						
						
					<!-- </view> -->
				</view>
			</view>
		</view>

		<!-- 关于我们和技术支持 -->
		<home-bottom-info ref=""></home-bottom-info>
















		<view class="popupPlay">
			<u-popup v-model="PlayGameshow" mode="bottom" border-radius="30" :closeable="false" :safe-area-inset-bottom="true">
				<view class="play_game_box">
					<view class="game_info_wrap">
						<image class="gamene_img" mode="widthFix" :src="playGameData.path"></image>
						<view class="game_info">
							<view class="game_nam">{{playGameData.gameName}}</view>
							<view class="tigs">{{GetGamesType(playGameData.vendor)}}
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
							
							<view class="huobiInfo" v-if="is_SelectCurrencyData">
								<view>{{$t('njy')}}
								<span v-if="platform == 8">USD</span>
								<span v-else-if="platform == 1 || platform == 5 || platform == 6">CNY</span>
								<span v-else-if="platform == 10 || platform == 11">USDT</span>
								<span v-else>PHP</span>
								{{$t('jxyx')}}</view>
								<view>1{{SelectCurrencyData.abbr}} = {{SelectCurrencyData.currency_rate}} 
								<span v-if="platform == 8">USD</span>
								<span v-else-if="platform == 1 || platform == 5 || platform == 6">CNY</span>
								<span v-else-if="platform == 10 || platform == 11">USDT</span>
								<span v-else>PHP</span>
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
								<u-button type="primary" :disabled="disabledPlay" :loading="playloading" @click.stop="OpenGames(playGameData)">
									<u-icon name="play-right-fill" size="26" color="#fff"></u-icon>{{$t('PlayS')}}
								</u-button>
							</view>
							<view class="mask_btn" v-else>
								<u-button type="primary" @click.stop="SignInBtn()">{{$t('regiserPopup.signIn')}}</u-button>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>

		<u-back-top :scroll-top="scrollTop" icon="/static/image/back-top.png" right="0" bottom="210" :icon-style="{width: '34px',height:'34px',borderRadius:'5px'}" :custom-style="{width: '34px',height:'34px',borderRadius:'5px',backgroundColor:'transparent'}"></u-back-top>


		<!-- 登录弹窗 -->
		<signInPopup ref="signInShow"></signInPopup>

		<!-- <match-media :max-width="800" >
			<u-tabbar></u-tabbar>
		</match-media> -->


	</view>
</template>

<script>
	import QSMasonry from '@/components/QS-Masonry/QS-Masonry.vue';
	import Swiper from 'swiper'; // 注意引入的是Swiper
    import 'swiper/swiper-bundle.css'; // 注意这里的引入
	export default {
		components: { QSMasonry },
		data() {
			return {
				col: 3,
				
				platform: this.PID,
				Leixing: 1, //1是从老首页查看全部  2是点击厂商查看全部  3是点击热门查看全部

				loadingImg: '/static/logo/' + this.PID + '_logo.png',
				errorImg: '/static/logo/' + this.PID + '_logo.png',

				scrollTop: 0,

				offsetTop: '59',

				navIcon: '',
				navtitle: '',

				Proid: "",
				categoryGames: [],
				HoemGundongLoadingtrue: true,
				DTvendorsList: [],
				HuadongtotalCount: 0,
				isNomoreDtRihgt: 0,
				DthdBtnPageSize: 1,

				hideHotlistMoreBtn: 0,

				playGameData: {},
				PlayGameshow: false,

				btnStatus: false,

				domains: '',
				ProvidersList: [],
				playloading: false,
				loadingtrue: true,

				vendorsList: [],
				isLogin: 0,

				csitem: {},

				classID: 0, //分类ID
				csid: 0, //厂商ID

				scrollTop: 0,
				isCurinfo: {},

				Tagcurrent: 0,

				currentIndex: 0,
				swiper666: null,

				disabledPlay: false,
				
				SelectCurrencyData: {},
				is_SelectCurrencyData: false

			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad(ops) {
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			this.Tagcurrent = ops.index
			this.Leixing = ops.Leixing
			console.log('进入类型', ops.Leixing);
			console.log('点击的第几个厂商', ops.index);



			let isCurinfo = uni.getStorageSync("isCurCInfo");
			this.isCurinfo = isCurinfo
			console.log('兜兜风的', isCurinfo)
			this.navIcon = isCurinfo.path
			this.navtitle = isCurinfo.name
			this.classID = isCurinfo.id

			let token = uni.getStorageSync("token")
			if (!token) {
				this.isLogin = 0
			} else {
				this.isLogin = 1
			}

			this.getChangShang()
			this.getVlist()
			this.GetGameslsit(0)
		},
		onShow() {
			let that = this
			let token = uni.getStorageSync("token")
			if (!token) {

			} else {
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		onReady() {
			
		},
		methods: {
			DianJile(data){
				console.log('点击游戏',data)
				this.lookMask(data,0)
			},
			
			
			
			
			getSwiper666() {
				let that = this
				that.swiper666 = new Swiper(".swiper-container2", {
					loop: false, // 无缝
					slidesPerGroup: 6,
					loopFillGroupWithBlank: true,
					autoHeight: false, //高度随内容变化
					paginationClickable: true,
					slidesPerView: 1, // 一组三个
					spaceBetween: 10, // 间隔
					uniqueNavElements: true, //当存在多个同名导航元素时，设置导航元素是否唯一。
					preloadImages: false, //Swiper会强制加载所有图片后才初始化。
					breakpoints: {
						320: { //当屏幕宽度大于等于320
							slidesPerView: 3.5,
							spaceBetween: 10
						},
						768: { //当屏幕宽度大于等于768 
							slidesPerView: 6,
							spaceBetween: 10
						},
						1280: { //当屏幕宽度大于等于1280
							slidesPerView: 8,
							spaceBetween: 10
						}
					},



					// 如果需要前进后退按钮
					// navigation: {
					// 	nextEl: '.swiper-button-next-zzy',
					// 	prevEl: '.swiper-button-prev-zzy',
					// 	disabledClass: 'my-button-disabled',
					// },



					// 在大屏上写轮播图，在摁下F11或者放大窗口之后，会丢失pagination，条数会变化，加上这两行，重新渲染swiper
					// 窗口变化,重新init,针对F11全屏和放大缩小,必须加
					observer: true,
					observeParents: true,
					on: {
						imagesReady: function() {
							alert('图片加载完成了');
						},
					},
				});
			},
			// 点击某一个tab菜单
			clickTab(index) {
				this.currentIndex = index

			},























			//计算进度
			Moreprogress(total, cur) {
				let all_count = total - cur
				if (total == cur) {
					return 100
				} else {
					return parseInt(((total - all_count) / total) * 100)
				}
			},



			tabChange(idx) {
				let that = this
				let vid = this.DTvendorsList[idx].id
				//console.log('选择的厂商',vid)
				that.Tagcurrent = idx
				
				that.categoryGames = []
				//that.$refs.QSMasonry.reset()
				
				if (idx == 0) {
					that.HoemGundongLoadingtrue = true
					that.DthdBtnPageSize = 1
					that.isNomoreDtRihgt = 0
					that.csid = 0
					that.hdMoreBtnlist()
				} else {
					that.HoemGundongLoadingtrue = true
					that.DthdBtnPageSize = 1
					that.isNomoreDtRihgt = 0
					that.csid = vid
					that.hdMoreBtnlist()
				}
				that.zhiding()
			},
			ClickHot(e) {
				//console.log('点击热门游戏', e)
			},
			selectPro(e) {
				//console.log('选择的厂商', e)
				let vid = 0
				if (!e) {
					vid = 0
				} else {
					vid = e
				}
				this.HoemGundongLoadingtrue = true
				this.DthdBtnPageSize = 1
				this.isNomoreDtRihgt = 0
				this.csid = vid
				this.hdMoreBtnlist()
			},



















			ProselectPro(e) {
				let vid = 0
				if (!e) {
					vid = 0
				} else {
					vid = e
				}
				this.HoemGundongLoadingtrue = true
				this.DthdBtnPageSize = 1
				this.isNomoreDtRihgt = 0
				this.csid = vid
				this.hdMoreBtnlist()
			},
			//选择排序
			selectPopular(e) {
				//uni.$emit('Up-tab-loadingtrue', 1)
				//this.Popularid = e
				//this.TabGamesList = []
				//this.TapPageSize = 1
				//this.GetGamesList()
			},


















































			//获取我的收藏
			// Getmyshoucang() {
			// 	let that = this
			// 	this.HoemGundongLoadingtrue = true
			// 	this.DthdBtnPageSize = 1
			// 	this.isNomoreDtRihgt = 0
			// 	//setTimeout(() => {
			// 	that.$u.post('/favorite/list', {

			// 	}).then(res => {
			// 		//console.log('收藏游戏列表', res)
			// 		this.categoryGames = res.data
			// 		this.HoemGundongLoadingtrue = false
			// 	})
			// 	//}, 1000)
			// },
			//获取玩过的记录
			// Getmylishijilu() {
			// 	let that = this
			// 	this.HoemGundongLoadingtrue = true
			// 	this.DthdBtnPageSize = 1
			// 	this.isNomoreDtRihgt = 0
			// 	//setTimeout(() => {
			// 	that.$u.post('/recent/list', {

			// 	}).then(res => {
			// 		//console.log('历史游戏列表', res)
			// 		this.categoryGames = res.data
			// 		this.HoemGundongLoadingtrue = false
			// 	})
			// 	//}, 1000)
			// },











			HotLookMore() {
				this.btnStatus = true
				setTimeout(() => {
					this.btnStatus = false
					this.RightHuaDongLookMore(this.csitem)
				}, 1000)
			},
			//选择右边游戏滑动加载更多按钮
			RightHuaDongLookMore(item) {
				// let items = {}
				// if (Object.keys(item).length === 0) {
				// 	items = this.DTvendorsList[0]
				// } else {
				// 	items = item
				// }
				this.DthdBtnPageSize++
				//this.csid = items.id
				this.hdMoreBtnlist()
				//console.log('右边的加载更多按钮回调', this.csid)
			},
			//获取游戏列表
			hdMoreBtnlist() {
				let that = this
				console.log('类型及啊',that.Leixing);
				//根据点击首页热门查看全部来请求热门列表接口
				if(that.Leixing == 3) {
					that.$u.post('/game/list', {
						queryHot: true,
						page: that.DthdBtnPageSize,
						searchText: '',
						categoryId: that.classID,
						vendorId: that.csid,
						orderType: 1,
					}).then(res => {
						that.HuadongtotalCount = res.data.totalCount
						if (that.DthdBtnPageSize != 1) {
							if (res.data.gameList.length != 0) {
								that.categoryGames = that.categoryGames.concat(res.data.gameList)
								//that.$refs.QSMasonry.add(that.categoryGames);
							} else {
								that.isNomoreDtRihgt = 1
							}
						} else {
							that.categoryGames = res.data.gameList
							//that.$refs.QSMasonry.add(that.categoryGames);
						}
						setTimeout(() => {
							this.HoemGundongLoadingtrue = false
						}, 500)
					})
				} else {
					that.$u.post('/game/list', {
						page: that.DthdBtnPageSize,
						searchText: '',
						categoryId: that.classID,
						vendorId: that.csid,
						orderType: 1,
					}).then(res => {
						that.HuadongtotalCount = res.data.totalCount
						if (that.DthdBtnPageSize != 1) {
							if (res.data.gameList.length != 0) {
								that.categoryGames = that.categoryGames.concat(res.data.gameList)
								//that.$refs.QSMasonry.add(that.categoryGames);
							} else {
								that.isNomoreDtRihgt = 1
							}
						} else {
							that.categoryGames = res.data.gameList
							//that.$refs.QSMasonry.add(that.categoryGames);
						}
						setTimeout(() => {
							this.HoemGundongLoadingtrue = false
						}, 500)
					})
				}
			},
			//根据首页所选分类获取该分类下的厂商列表
			async GetGameslsit(proid) {
				let that = this
				const ress = await that.$u.post('/game/category', {});
				that.domains = ress.data.domain;
				console.log('多个', ress)
				let tabsList = {
					vendors: []
				}



				if (this.Leixing == 1) {
					ress.data.categories.forEach((item, index) => {
						if (item.vendors.length != 0 && item.id == this.classID) {
							tabsList = item
						}
					});
				} else if (this.Leixing == 2) {

					ress.data.categories.forEach((item, index) => {
						if (item.vendors.length != 0 && item.id == this.classID) {
							tabsList = item
						}
					});

				} else if (this.Leixing == 3) {
					ress.data.vendors.forEach((item, index) => {
						if (item.gameCount != 0) {
							tabsList.vendors.push(item)
						}
					});
				}



				//that.tagList = tabsList
				console.log('当前所选分类的下的厂商', tabsList)


				let NewProlist = [{
					gameCount: 0,
					id: 0,
					name: "ALL",
					path: "/static/image/ALL.png"
				}]
				tabsList.vendors.forEach((item, index) => {
					NewProlist.push({
						gameCount: item.gameCount,
						id: item.id,
						name: item.name,
						path: item.path
					})
				});
				console.log('游戏厂商列表', NewProlist)
				that.DTvendorsList = NewProlist //tabsList.vendors


				if (that.Leixing != 0) {
					that.HoemGundongLoadingtrue = true
					that.DthdBtnPageSize = 1
					that.isNomoreDtRihgt = 0
					that.csid = NewProlist[this.Tagcurrent].id
					that.hdMoreBtnlist()
				} else {
					this.csid = 0
					this.hdMoreBtnlist()
				}


				//获取厂商列表的第一个厂商下面的游戏
				//let id = tabsList.vendors[0].id

				//let newarr = []
				//newarr = await that.CheckcategoriesGameList(id, proid)
				//that.categoryGames = newarr.gameList
				//that.HuadongtotalCount = newarr.totalCount

				////console.log('当前所选厂商下的游戏列表',newarr)
				setTimeout(() => {
					this.HoemGundongLoadingtrue = false

					// #ifndef APP-PLUS
					this.getSwiper666()
					// #endif

				}, 500)

			},
























			async CheckcategoriesGameList(cid, proid) {

				let that = this
				const res = await that.$u.post('/game/list', {
					page: 1,
					searchText: '',
					categoryId: 0, //cid //选项卡分类id
					vendorId: proid || cid, //proid //厂商id
					orderType: 1,
				})
				return res.data
			},


























































			async getVlist() {
				let that = this
				const ress = await that.$u.post('/game/category', {})
				that.ProvidersList = ress.data.vendors
			},
			lookMask(item, idx) {
				console.log(item, idx)
				
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
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode +
								'&favorite=' + val.favorite
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
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode +
								'&favorite=' + val.favorite
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
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode +
								'&favorite=' + val.favorite
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
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode +
								'&favorite=' + val.favorite
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

						//this.$refs.OpenGames.openPopup(val)

						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode +
								'&favorite=' + val.favorite
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

						//this.$refs.OpenGames.openPopup(val)

						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode +
								'&favorite=' + val.favorite
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
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode +
								'&favorite=' + val.favorite
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
			//先获取厂商列表，Map对应的厂商name
			getChangShang() {
				let that = this
				that.$u.post('/game/category', {}).then(ress => {
					that.vendorsList = ress.data.vendors
				})
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
			zhiding() {
				//118
				let navH = 108 + uni.getSystemInfoSync().statusBarHeight;
				setTimeout(() => {
					uni.createSelectorQuery().select('.games_wrap_box').boundingClientRect(
						data => { //目标位置的节点：类class或者id
							console.log('置顶节点1', data)
							uni.createSelectorQuery().select(".container").boundingClientRect(
								res => { //最外层盒子的节点：类class或者id
									uni.pageScrollTo({
										duration: 100, //过渡时间
										scrollTop: data.top + -res.top - navH, //到达距离顶部的top值
									})
									console.log('置顶节点2', res)
								}).exec()
						}).exec();
				}, 200)
			},

		}
	}
</script>

<style lang="scss">
	.container {
		// min-height: 100vh;
		// background-color: #f2f2f2;
		// width: 100%;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	/deep/ .Top_navbar {
		//padding-bottom: 0;
	}
	
	.games_wrap_box {
		//padding: 0 14rpx;
	}

	.allgys_pc {
		position: relative;
		overflow: hidden;
		// margin-top: 10rpx;
		// margin-bottom: 30rpx;
		padding: 30rpx 0;
	}

	.banshi2 {
		width: 100%;
		height: 100%;

		.xzlbg {
			background-color: #1d2532 !important;
		}

		.swiper-slide {
			position: relative;
			width: 100%;
			height: auto;
			padding: 0 0;
			background-repeat: no-repeat;
			background-size: contain;
			background-color: transparent;
			border-radius: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.gystupian {
				width: 100%;
				height: 100%;
				max-width: 216rpx;
				max-height: 116rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
			}
		}
	}





















	.cs_huadong {

		/* #ifdef APP-PLUS */
		padding-top: 36rpx;
		/* #endif */

		/* #ifdef H5 */
		padding-top: 20rpx;
		/* #endif */


		padding-right: 24rpx;
		padding-bottom: 10rpx;
		padding-left: 20rpx;
	}

	.more-progress {
		max-width: 188px;
		margin: 0 auto 0;
	}





















	.gundongshaixan {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.shaixuan_box {
			flex: 1;
			padding-top: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2px solid #1a2230;

			view {
				flex: 1;
				text-align: center;
				color: #babadb;
				cursor: pointer;
				position: relative;
				height: 65rpx;
				line-height: 65rpx;
				font-weight: bold;
				font-size: 26rpx;

				.sxname {
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			}

			.xzelcolor {
				font-weight: bold;
				color: #ffffff !important;
			}

			.xzelSpan {
				display: inline-block;
				width: 100%;
				height: 6rpx;
				background-color: #2283f6;
				border-radius: 200rpx;
				position: absolute;
				z-index: 2;
				bottom: -2px;
				left: 0;
				right: 0;
				margin: 0 auto;
			}
		}

		.sousuo_box {
			margin: 12rpx 10rpx 0 10rpx;

			// background-color: #1d2532;
			// border-radius: 10rpx;
			// padding: 10rpx 15rpx;
			.u-icon {
				font-size: 36rpx;
			}
		}
	}


	.swbox_wrap {
		background-color: $home-games-wrap-color;
		margin: 0 auto;
		//max-width: 430px;
		width: 100%;

		.left_wrap {
			width: 230rpx;
			padding: 0 0 0 0;

			.ChangS_item_list {
				width: 230rpx;

				.uni-swiper-left {
					padding: 0 0 0 0;
					white-space: nowrap;
					height: calc(100vh - 125px + var(--status-bar-height));
				}

				.ChangS_item_list_box {
					padding-left: 20rpx;
					position: relative;

					.left_kuai {
						display: inline-block;
						background-color: #2283f6;
						border-radius: 0 10rpx 10rpx 0;
						width: 8rpx;
						height: 65rpx;
						position: absolute;
						top: 50%;
						left: 0%;
						transform: translate(0%, -50%);
					}

					.ChangS_item_list_box_item {
						background-color: #1a2230;
						margin: 22rpx 0 0 0;
						border-radius: 20rpx;
						padding: 10rpx 0;

						image {
							width: 100%;
							height: 80rpx;
						}

						.csName {
							height: 88rpx;
							line-height: 88rpx;
							text-align: center;
							padding: 0 10rpx;
							font-size: 26rpx;
							color: #FEFEFE;
							word-break: break-all;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}
					}

					.morenxz {
						background-color: #2283f6 !important;
					}
				}
			}
		}

		.right_wrap {
			flex: 1;
			padding: 0 10rpx;
		}
	}
	.rec_bottom {
		padding: 20rpx 0 1px 0;
		.uni-swiper-tab {
			padding: 0 10rpx 0 10rpx;
			//white-space: nowrap;
			//height: calc(100vh - 155px + var(--status-bar-height));
		}

		.jrsx_item2 {
			margin: 0 0 36rpx 0;
			position: relative;
		}

		.goodsdetail {
			width: 100%;
		}

		.jrsx_img {}

		.jrsx_picture_home {
			width: 100%;
			height: 112px;
			overflow: hidden;
			border-radius: 18rpx 18rpx 18rpx 18rpx !important;
			background-color: #1d2532;
		}
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

	@media (min-width: 800px) {
		.swbox_wrap {
			padding: 30rpx 80rpx 80rpx 80rpx;
		}

		.cs_huadong {
			padding-bottom: 30rpx;
		}
	}
</style>