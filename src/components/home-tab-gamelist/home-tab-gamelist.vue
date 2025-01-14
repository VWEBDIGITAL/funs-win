<template>
	<view :style="theme">

		<view class="u-loading-2" v-show="loadingtrue == true">
			<view class="loader">
				<view class="loader-animation"></view>
			</view>
		</view>

		<view class="shopTuijian" v-show="loadingtrue == false">
			<view class="uni-swiper-tab" v-if="TabGamesList.length != 0">
				
				<uni-row :gutter="30" class="demo-uni-row">
					<uni-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" v-for="(val,indexb) in TabGamesList" :key="indexb">
						<view class="scrollx_items">
							<view class='jrsx_item2'>
								<view class='goodsdetail'>
									<view class='jrsx_img' @click="lookMask(val,val.gameCode+indexb)">
										<!-- <image :src="val.path" class='jrsx_picture' mode="widthFix"></image> -->
										<u-lazy-load class="goods-icon" height="238" :image="val.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
									</view>
								</view>
							</view>
						</view>
					</uni-col>
				</uni-row>
				<view class="more_btn">
					<u-button type="warning" @click="lookAllgames()">{{$t('ViewAll')}}({{TabtotalCount}})</u-button>
				</view>
			</view>
			<view class="nodata" v-else>
				<view class="iconbox">
					<image src="/static/image/NoOrders.png" mode="widthFix"></image>
					<view>No Datas</view>
				</view>
			</view>
		</view>

		<view class="popupPlay">
			<u-popup v-model="PlayGameshow" mode="bottom" border-radius="30" :closeable="false"
				:safe-area-inset-bottom="true">
				<view class="play_game_box">
					<view class="game_info_wrap">
						<image class="gamene_img" mode="widthFix" :src="playGameData.path"></image>
						<view class="game_info">
							<view class="game_nam">{{playGameData.gameName}}</view>
							<view class="tigs">
								{{GetGamesType(playGameData.vendor)}}
								<view v-if="isLogin == 1" style="margin-left: auto;"
									@click="cLike(playGameData.gameCode,playGameData.favorite);playGameData.favorite =! playGameData.favorite">
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
								<u-button type="primary" :disabled="disabledPlay" :loading="playloading" shape="circle"
									@click.stop="OpenGames(playGameData)">
									<u-icon name="play-right-fill" size="26" color="#fff"></u-icon>{{$t('PlayS')}}
								</u-button>
							</view>
							<view class="mask_btn" v-else>
								<u-button type="primary" shape="circle"
									@click.stop="SignInBtn()">{{$t('regiserPopup.signIn')}}</u-button>
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
		name: "home-tab-gamelist",
		props: {
			classInfo: {
				type: Object,
				default: 0
			},
			isNomore: {
				type: Number,
				default: 0
			},
			TabtotalCount: {
				type: Number,
				default: 0
			},
			TabGamesList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				loadingImg: '/static/logo' + this.PID + '_logo.png',
				errorImg: '/static/logo' + this.PID + '_logo.png',


				playGameData: {},
				PlayGameshow: false,

				colSpan: 4,
				playloading: false,
				btnStatus: false,
				currentItem_idx: 0,
				loadingtrue: true,
				isLogin: 0,
				vendorsList: [],
				disabledPlay: false
			};
		},
		watch: {
			'TabGamesList': {
				immediate: true,
				deep: true,
				handler(newVal) {

				}
			},
		},
		created() {

			uni.onWindowResize(res => {
				let deviceOrientation = res.deviceOrientation
				if (deviceOrientation == "portrait") {
					//竖屏
					////console.log('竖屏',deviceOrientation)
					//this.colSpan = 4
				} else if (deviceOrientation == "landscape") {
					//横屏
					////console.log('横屏',deviceOrientation)
					//this.colSpan = 2
				}
			})

			//setTimeout(() => {
				this.loadingtrue = false
			//}, 100)

			let token = uni.getStorageSync("token")
			if (!token) {
				this.isLogin = 0
			} else {
				this.isLogin = 1
			}
			this.getChangShang()

			uni.$on('Up-tab-loadingtrue', (val) => {
				this.loadingtrue = true
				this.upTabLoad()
			})

		},
		beforeUpdate() {

		},
		mounted() {
			
		},
		methods: {
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			lookAllgames() {
				//把分类id写入缓存 防止刷新页面后不存在分类id
				uni.setStorageSync("isCurCInfo", this.classInfo)
				uni.navigateTo({
					url: '/pages/classify/classify?Leixing=1' + '&index=' + 0
				})
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
			upTabLoad() {
				//setTimeout(() => {
					this.loadingtrue = false
				//}, 100)
			},
			HotLookMore() {
				this.btnStatus = true
				setTimeout(() => {
					this.btnStatus = false
					this.$emit('TapLookMore', 1)
				}, 1000)

			},
			lookMask(item, idx) {
				//console.log(item, idx)
				
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
				
				//setTimeout(() => {

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

				//}, 1000)

			},
			SignInBtn() {
				this.$refs.signInShow.openPopup()
			},
			cLike(code_id, sss) {
				if (sss === true || sss === 1) {
					//取消收藏
					this.quxiaoClickStar(code_id)
				} else {
					//收藏
					this.ClickStar(code_id)
				}
			},
			ClickStar(item) {
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
		}
	}
</script>

<style lang="scss">
	.u-loading-2 {
		padding: 50rpx 0 0 0;
		text-align: center;
		height: 3000rpx;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		position: relative;

		image {
			text-align: center;
			width: 140rpx;
			height: 18px;
		}
	}

	.nodata {
		text-align: center;
		height: 3000rpx;
		position: relative;

		.iconbox {
			position: absolute;
			top: 15%;
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
		padding: 20rpx 28rpx 20rpx 28rpx;
	}

	// .uni-swiper-tab {
	// 	white-space: nowrap;
	// }

	.scrollx_items {
		width: 100%;
		margin-bottom: 36rpx;

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
		top: 0;
		white-space: normal;
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
		cursor: pointer;
	}

	.jrsx_img {}

	.jrsx_picture {
		width: 100%;
		height: 238rpx;
		overflow: hidden;
		border-radius: 18rpx 18rpx 18rpx 18rpx !important;
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
			//white-space: nowrap;
			font-size: 26rpx;
		}

		.star_icon {
			margin-left: auto;
		}
	}
	
	
	
	@media (min-width: 800px) {
		.shopTuijian {
			padding: 20rpx 80rpx 20rpx 80rpx;
		}
	}
	
</style>