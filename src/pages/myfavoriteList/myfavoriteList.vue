<template>
	<view :style="theme" class="page_boxs">
		
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="title || $t('sidebar.title6')" :isCountTo="false" :is_secondary="false">
			</navbar>
		</match-media>

		<!-- <uni-transition :mode-class="['fade', 'zoom-in']"
			:styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}"
			:show="showOptions"> -->

			<pagesNavTitle ref="" :title="$t('sidebar.title6')"></pagesNavTitle>



			<view class="u-loading" v-show="loadingtrue == true">
				<view class="LoadJuZhong">
					<view class="loader">
						<view class="loader-animation"></view>
					</view>
				</view>
			</view>

			<view class="shopTuijian" v-show="loadingtrue == false">
				<view class="uni-swiper-tab" v-if="TabGamesList.length != 0">
					
					<uni-row :gutter="30" class="demo-uni-row">
						<uni-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" v-for="(val,indexb) in TabGamesList" :key="val.gameCode">
							<view class="scrollx_items">
								<view class='jrsx_item2'>
									<view class='goodsdetail'>
										<view class='jrsx_img' @click="lookMask(val,val.gameCode)">
											<!-- <image :src="val.path" class='jrsx_picture_favori' mode="widthFix"></image> -->
											<u-lazy-load class="goods-icon" height="238" :image="val.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
										</view>
									</view>
								</view>
							</view>
						</uni-col>
					</uni-row>
					
					<!-- <u-row gutter="20">
						<u-col span="4" v-for="(val,indexb) in TabGamesList" :key="val.gameCode">
							
						</u-col>
					</u-row> -->
					<!--<view class="more_btn">
					<view>Load More</view>
				</view>-->
				
				
				</view>
				<view class="nodata" v-else>
					<view class="iconbox">
						<image src="/static/image/NoOrders.png" mode="widthFix"></image>
						<view>No Datas</view>
					</view>
				</view>
			</view>
			
			<!-- 关于我们和技术支持 -->
			<home-bottom-info ref=""></home-bottom-info>

		<!-- </uni-transition> -->
		
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

	</view>
</template>


<script>
	export default {
		data() {
			return {
				loadingImg: '/static/logo/' + this.PID + '_logo.png',
				errorImg: '/static/logo/' + this.PID + '_logo.png',
				
				playGameData: {},
				PlayGameshow: false,
				
				colSpan: 4,
				playloading: false,
				showOptions: true,
				currentItem_idx: 0,
				loadingtrue: true,
				TabGamesList: [],
				cid: 0,
				title: '',
				proIds: 0,
				isLogin: 0,
				vendorsList: [],
				disabledPlay: false,
				
				platform: this.PID,
				SelectCurrencyData: {},
				is_SelectCurrencyData: false
			};
		},
		onLoad(ops) {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			that.cid = parseInt(ops.id)
			this.title = ops.title
			that.proIds = parseInt(ops.Proid)
			//////console.log(ops)
			this.GetGamesList()
			that.getChangShang()
			
			
			
		},
		onShow() {
			let that = this
			
			let token = uni.getStorageSync("token")
			if (!token) {
				that.isLogin = 0
				this.SignInBtn()
			} else {
				uni.$emit('getgetMybalance', 1)
				that.isLogin = 1
				that.GetGamesList()
				that.getChangShang()
				
				uni.$emit('ZhuRulookBenDihb', 1);
				
				/*uni.onWindowResize(res => {
					let deviceOrientation = res.deviceOrientation
					if (deviceOrientation == "portrait") {
						//竖屏
						////console.log('竖屏',deviceOrientation)
						that.colSpan = 4
					} else if (deviceOrientation == "landscape") {
						//横屏
						////console.log('横屏',deviceOrientation)
						that.colSpan = 2
					}
				})*/
				
			}
			
			

		},
		methods: {
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
				let NewProlist = that.vendorsList
				NewProlist.forEach((item, index) => {
					if (item.id == proid) {
						Vname = item.name
					}
				});
				return Vname
			},
			GetGamesList() {
				let that = this
				this.loadingtrue = true
				setTimeout(()=>{
					that.$u.post('/favorite/list', {
					
					}).then(res => {
						//////console.log('收藏游戏列表', res)
						this.TabGamesList = res.data
						this.loadingtrue = false
					})
				},600)
			},
			lookMask(item, idx) {
				//console.log(item, idx)
				
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
					console.log('是否禁玩',noPlay);
					if(noPlay == 1){
						this.disabledPlay = true
					} else {
						this.disabledPlay = false
					}
					
				}
			},
			//检测禁止游戏功能
			jisuanWeizhi(){
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
			JumpNewUrl(val){
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
						console.log('AG',res.data)
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
				//console.log(val)
				let that = this
				that.playloading = true
				
				// #ifdef H5 || WEB
				//IOS客户端独有，判断是否是AG电子游戏如果是就跳转新标签打开
				//category3是电子游戏分类
				let systemInfo = uni.getSystemInfoSync();
				if((systemInfo.platform == "ios"||systemInfo.platform == "macos") && systemInfo.browserName == "safari"){
					let Manufacturer = that.GetGamesType(val.vendor);
					if(Manufacturer == "AG" && val.category == 3){
						that.JumpNewUrl(val)
						return false
					}
				}
				// #endif
				
				//setTimeout(()=>{
					
					if (val.API == "tcg") {
						let Device_type = uni.getStorageSync('DeviceType');
						let client_Type = ''
						if(Device_type == "pc"){
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
							uni.setStorageSync("PlayGamesUrl",gameUrl)
							
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
							uni.setStorageSync("PlayGamesUrl",gameUrl)
							
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
							
							//this.$refs.OpenGames.openPopup(val)
							
							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if(val.API == "tgfun"){
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
						
							//this.$refs.OpenGames.openPopup(val)
						
							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if(val.API == "ky"){
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
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if(val.API == "tcg2"){
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
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if(val.API == "via"){
						this.$u.post('/enter-via', {
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
					} else {
						this.$u.post('/enter-wl', {
							gameCode: val.gameCode
						}).then(res => {
							let gameUrl = res.data.gameUrl
							//把游戏地址写入缓存便于Webview读取打开
							uni.setStorageSync("PlayGamesUrl",gameUrl)
							
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
				//},1000)
				
			},
			SignInBtn() {
				this.$refs.signInShow.openPopup()
			},
			cLike(code_id, sss) {
				//////console.log('是什么',code_id,sss)
				if (sss === true || sss === 1) {
					//收藏
					this.quxiaoClickStar(code_id)
				} else {
					//取消收藏
					this.quxiaoClickStar(code_id)
				}
			},
			ClickStar(item) {
				//////console.log(item)
				this.$u.post('/favorite', {
					gameCode: item, // String 是 游戏代码
					favorite: true // bool 是 收藏true 取消收藏false
				}).then(res => {})
			},
			quxiaoClickStar(item) {
				this.$u.post('/favorite', {
					gameCode: item, // String 是 游戏代码
					favorite: false // bool 是 收藏true 取消收藏false
				}).then(res => {
					this.TabGamesList = []
					this.GetGamesList()
				})
			}
		}
	}
</script>

<style lang="scss">
	
	// portrait 为判断为竖屏
	@media only screen and (orientation: portrait) {
		// 需求代码
		
	}
	
	// landscape 为判断为横屏
	@media only screen and (orientation: landscape) {
		// 需求代码
		.jrsx_picture_favori {
			width: 100%;
			height: 276px !important;
		}
	}
	
	.u-loading {
		text-align: center;
		height: calc(100vh - 88px);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		.LoadJuZhong {
			text-align: center;
			top: 10%;
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

	.nodata {
		text-align: center;
		height: calc(100vh - 88px);
		position: relative;
		.iconbox {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			view {
				margin-top: 14rpx;
				font-size: 24rpx;
				color: $font-all-color;
			}
			image {
				width: 250rpx;
				height: 140rpx;
			}
		}
	}

	.shopTuijian {
		padding: 25rpx 20rpx;
		background-color: $home-games-wrap-color !important;
		.scrollx_items {}
	}

	.uni-swiper-tab {
		white-space: nowrap;
	}

	.scrollx_items {
		width: 100%;
		margin-bottom: 20rpx;

	}

	.jrsx_swiper {
		margin: 0 0 30rpx 0;
		height: 300rpx;
	}

	.jrsx_item {
		flex: 1;
		position: relative;
	}

	.jrsx_item2 {
		flex: 1;
		position: relative;
	}

	.zhezhao_mask {
		backdrop-filter: blur(1px);
		position: absolute;
		width: 100%;
		height: 100%;
		white-space: normal;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 12rpx;
		z-index: 99;
		padding: 20rpx;

		.zhezhao_mask_item {
			position: relative;
			height: 100%;

			.mask_title {
				//font-weight: bold;
				color: #FEFEFE;
				font-size: 24rpx;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.mask_subtitle {
				margin-top: 10rpx;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $font-all-color;
			}

			.mask_btn {
				position: absolute;
				bottom: 6rpx;
				left: 0;
				right: 0;
				margin: 0 auto;
				width: 80px;
				text-align: center;
				/deep/ uni-button[loading]:before {
					width: 14px !important;
					height: 14px !important;
				}
				/deep/ .u-btn--primary {
					font-size: 24rpx !important;
					height: 27px !important;
					line-height: 27px !important;
					padding: 0 4px !important;
				}
				/deep/ .u-size-default {
					font-size: 24rpx !important;
					height: 27px !important;
					line-height: 27px !important;
				}
			}
		}
	}

	.goodsdetail {
		width: 100%;
		//height: 300rpx;
	}

	.jrsx_img {
		cursor: pointer;
	}

	.jrsx_picture_favori {
		width: 100%;
		height: 108px;
		overflow: hidden;
		border-radius: 18rpx;
		background-color: #1d2532;
	}

	.jrsx_title {
		padding: 14rpx 10rpx;
		//height: 57rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0 0 12rpx 12rpx;
		background-color: #1d2532;
		color: $font-all-color;
	
		.title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 26rpx;
		}
	
		.star_icon {
			margin-left: auto;
		}
	}
</style>