<template>
	<view :style="theme" class="page_boxs">
		
		<signInPopup ref="signInShow"></signInPopup>
		
		<!--引导注册弹窗-->
		<uni-transition :mode-class="['fade', 'slide-top']" :styles="{'max-width':'430px','height':'auto','position':'fixed','top':Topheight,'left':'0','z-index':'9999','right':'0','margin':'0 auto'}" :show="showRegisterNow">
			<Welcome-Register-Now ref="RegisterNowRefs" @RegisterNowClose="RegisterNowClose" @RegisterNowOpen="registerNowOpen"></Welcome-Register-Now>
		</uni-transition>

		<AgentBonusRatePopup ref="agentBonusrate"></AgentBonusRatePopup>
		<ReferralBonus ref="ReferralBonus"></ReferralBonus>

		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('ReferPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		

		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->
			<!--<pagesNavTitle ref="" :title="$t('ReferPage.title')"></pagesNavTitle>-->
			<view style="height: 120rpx;" v-if="NavHeight"></view>
			
			<view class="page_wrap">
				
				<view class="pc_top_wrap">
					<view class="pc_top_box">
						<view class="pc_top_left">
							<view class="pc_toptitle">{{$t('NEWReferpageA.title',{MAX:weidengluData.maxBonus/100,max:weidengluData.maxRate})}}</view>
							<view class="Register_btn">
								<view class="zhuceBtn" @click="Totabbar('/pages/Referandearn/Referandearn')"><span>{{$t('NEWReferpageA.InBTN')}}</span></view>
							</view>
						</view>
						<view class="pc_top_right">
							<image src="/static/refer/1.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				
				
				<view class="top-block container">
					<view class="top-block__content">
						
						<view class="top-block__main" :style="{paddingTop: titlePaddingTop}">
							<h1 class="top-block__title">
								{{$t('NEWReferpageA.title',{MAX:weidengluData.maxBonus/100,max:weidengluData.maxRate})}}
							</h1>
							<image class="top-block__img-main" mode="widthFix" src="/static/refer/1.png"></image>
							<view class="Register_btn">
								<view class="zhuceBtn" @click="Totabbar('/pages/Referandearn/Referandearn')"><span>{{$t('NEWReferpageA.InBTN')}}</span></view>
							</view>
						</view>
					</view>
				</view>
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				<view class="wrap container">
					<view class="general-info">
						
						
						<uni-row :gutter="30" class="demo-uni-row">
							<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<view class="general-info__side">
									<view class="totals">
										<view class="totals__block totals__block222">
											<view class="totals__title">{{$t('NEWReferpageA.TotalReferrlas')}}</view>
											<view class="totals__value"><span>{{weidengluData.totalReferrals}}</span></view>
										</view>
										<view class="totals__block">
											<view class="totals__title">{{$t('NEWReferpageA.TotalRewards')}}</view>
											<view class="totals__value"><span>
											
											<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8" mode=""></image>
											<image class="rank_icon" src="/static/image/coin-yuan_cny.png" mode="" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
											<image class="rank_icon" src="/static/image/jinbi-3.png" mode="" v-else></image>
											
											{{weidengluData.totalPaid/100}}</span></view>
										</view>
									</view>
								</view>
								<match-media :max-width="800" >
									<view style="margin: 40rpx 0;">
										<view class="general-info__divider"></view>
										<view class="general-info__vertical-divider"></view>
									</view>
								</match-media>
							</uni-col>
							<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<!-- #ifdef H5 -->
								<view class="general-info__side">
									<view class="claims">
										<view class="claims__title">
											<view class="claims__dot"></view> {{$t('NEWReferpageA.LiveRewards')}}
										</view>
										<vue-seamless-scroll :data="listData" :class-option="classOption" class="warp">
											<ul class="ul-item">
												<li class="li-item" v-for="(item, index) in listData" :key="index">
													<image :src="item.icon"></image>
													
													
													<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8" mode=""></image>
													<image class="rank_icon" src="/static/image/coin-yuan_cny.png" mode="" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
													<image class="rank_icon" src="/static/image/jinbi-3.png" mode="" v-else></image>
													
													
													{{item.price}}.00
												</li>
											</ul>
										</vue-seamless-scroll>
									</view>
								</view>
								<!-- #endif -->
							</uni-col>
						</uni-row>
					</view>
					
					
					
				
					<view class="cards">
						<uni-row :gutter="30" class="demo-uni-row">
							<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<view class="card">
									<image class="card__img" mode="widthFix" src="/static/recommend/banner-2.webp"></image>
									<view class="card__info">
										<view class="card__title">{{$t('NEWReferpageA.title1',{MAX:weidengluData.maxBonus/100})}}
										</view>
										<p class="card__desc">{{$t('NEWReferpageA.subtitle1',{MAX:weidengluData.maxBonus/100})}}</p>
										<view class="xiangqing" @click="LookDetails2()">
											<span>{{$t('NEWReferpageB.Details')}}</span>
											<u-icon name="arrow-right" size="28" color="#2283f6"></u-icon>
										</view>
									</view>
								</view>
							</uni-col>
							<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<view class="card card--other">
									<image class="card__img" mode="widthFix" src="/static/recommend/banner-1.webp"></image>
									<view class="card__info">
										<view class="card__title">{{$t('NEWReferpageA.title2',{max:weidengluData.maxRate})}}</view>
										<p class="card__desc">{{$t('NEWReferpageA.subtitle2',{max:weidengluData.maxRate})}}</p>
										<view class="xiangqing" @click="LookDetails()">
											<span>{{$t('NEWReferpageB.Details')}}</span>
											<u-icon name="arrow-right" size="28" color="#2283f6"></u-icon>
										</view>
									</view>
								</view>
							</uni-col>
						</uni-row>
					</view>
				
					<view class="boost">
						
						<view class="flex_a">
							<view class="boost__title-block">
								<view class="boost__info">{{$t('NEWReferpageA.title3')}}</view>
								<h2 class="boost__title">{{$t('NEWReferpageA.title4')}}</h2>
								<view class="flex_c">
									<view class="boost__desc-block">
										<p class="boost__desc">{{$t('NEWReferpageA.subtitle4')}}</p>
									</view>
									<view class="Register_btn pcregvtn">
										<view class="zhuceBtn" @click="Totabbar('/pages/Referandearn/Referandearn')"> <span>{{$t('NEWReferpageA.InBTN')}}</span></view>
									</view>
								</view>
							</view>
							<view class="boost__img-wrap">
								<image src="/static/recommend/commission.BO5qp9dN.png" mode="widthFix"></image>
							</view>
						</view>
						
						<view class="flex_b">
							<view class="boost__desc-block">
								<p class="boost__desc">{{$t('NEWReferpageA.subtitle4')}}</p>
							</view>
							<view class="Register_btn">
								<view class="zhuceBtn" @click="Totabbar('/pages/Referandearn/Referandearn')"> <span>{{$t('NEWReferpageA.InBTN')}}</span></view>
							</view>
						</view>
						
					</view>
				
					<!--<view class="bottom_listbpx">
					<image src="/static/refer/4.png" mode="widthFix"></image>
				</view>-->
				
					<view class="banner referral__banner">
						<view class="banner__top">
							<view class="banner__banner--mob">
								<image class="img-mob" mode="widthFix" src="/static/refer/4.png"></image>
								<image class="banner__coin1" mode="widthFix" src="/static/recommend/coin2-mob.webp"></image>
							</view>
							<h2 class="banner__title">{{$t('NEWReferpageA.Exclusive')}}</h2>
							<p class="banner__desc">{{$t('NEWReferpageA.subtitle5')}}</p>
						</view>
						<view class="banner__bottom">
							<image class="banner__gift" src="/static/recommend/gift.webp" mode="widthFix"></image>
							<image class="banner__coin" src="/static/recommend/coin.webp" mode="widthFix"></image>
							<view class="banner__label">{{$t('NEWReferpageA.title5')}}</view>
							<view class="banner__percent">85%</view>
							<!--<view class="banner__center">
							<p class="banner__text">自注册日起前 2 个月</p>
							<p class="banner__text2">RevShare 50%</p>
						</view>-->
						</view>
						<view class="banner__footer">
							<view class="Register_btn2">
								<view class="zhuceBtn" @click="TochatUrl()"><span>{{$t('NEWReferpageA.BecomeBTN')}}</span></view>
							</view>
						</view>
					</view>
				</view>
				<faqlist ref="" :istype="'ReferAndearn'"></faqlist>
			</view>
			
			<!-- 关于我们和技术支持 -->
			<home-bottom-info ref=""></home-bottom-info>
			
		<!-- </uni-transition> -->
		
		<match-media :max-width="800" >
			<view style="height: 100rpx;"></view>
			<u-tabbar></u-tabbar>
		</match-media>

	</view>
</template>

<script>
	// #ifdef H5
	import vueSeamlessScroll from 'vue-seamless-scroll'
	// #endif
	export default {
		components: {
			// #ifdef H5
			vueSeamlessScroll
			// #endif
		},
		data() {
			return {
				platform: this.PID,
				Topheight: '0',
				showRegisterNow: false,
				showOptions: true,
				titlePaddingTop: '30px',
				
				
				listData: [],
				classOption: {
					step: 0.3, // 数值越大速度滚动越快
					//limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
					//hoverStop: true, // 是否开启鼠标悬停stop
					direction: 2, // 0向下 1向上 2向左 3向右
					//openWatch: true, // 开启数据实时监控刷新dom
					//singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					//singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					//waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				},
				NavHeight: false,
				showOptions: true,
				weidengluData: {}
			}
		},
		onLoad() {
			let that = this;
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			//判断是否WebApp启动，如果是就个他领取安装奖励
			//#ifdef H5
			if (window.navigator.standalone == true) {
				//alert('IOS-是从桌面中打开的')
				that.Topheight = '54px'
				that.titlePaddingTop = '0'
				that.NavHeight = true
			} else if (window.matchMedia("(display-mode: standalone)").matches) {
				//alert('android-是从桌面中打开的')
				that.titlePaddingTop = '0'
				that.NavHeight = false
				that.Topheight = '0'
			} else {
				//就是浏览器里面打开的
				that.titlePaddingTop = '60px'
				that.NavHeight = false
			}
			//#endif

			setTimeout(() => {
				let arry = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16','17', '18', '19', '20', '21']
				let newarry = []
				arry.forEach(function(item, index) {
					newarry.push({
						icon: '/static/touxiang/' + (index+1) + '.png',
						price: Math.ceil(Math.random() * 1000)
					})
				});
				that.listData = newarry
			}, 100)



			that.getweidenglu()
		},
		onUnload() {
			//console.log('recommend页面隐藏了')
			let that = this
			that.$refs.RegisterNowRefs.hideRegisterNowRefs(0)
			that.showRegisterNow = false
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
			
			
			
			
			
			TochatUrl() {
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
			},
			getweidenglu() {
				let that = this
				that.$u.post('/promotion/recommend/base', {

				}).then(res => {
					this.weidengluData = res.data
				})
			},
			testClick(e) {
				//console.log(e)
			},
			LookDetails() {
				this.$refs.agentBonusrate.openPopup()
			},
			LookDetails2() {
				this.$refs.ReferralBonus.openPopup()
			},
			Logoin() {
				this.$refs.signInShow.openPopup()
			},
			Totabbar(url) {
				let token = uni.getStorageSync('token')
				if (!token) {
					this.$refs.signInShow.openPopup()
				} else {
					uni.switchTab({
						url: url
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	/deep/ .faq_list_wrap {
		padding: 0 30rpx;
	}
	.page_wrap {
		margin-inline: auto;
		margin: 0 auto;
		max-width: 1088px;
		width: 100%;
		background-color: $body-bg-color !important;
		padding-bottom: 50rpx;
	}
	
	.pc_top_wrap {
		display: none;
	}
	.pc_top_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-image: url('/static/recommend/heading_bg.Brx7nYTy.png');
		background-position: top;
		background-size: 100% 100%;
		padding: 20px;
		.pc_top_left {
			text-align: left;
			.pc_toptitle {
				font-weight: bold;
				font-size: 35px;
				color: #fff;
			}
			.Register_btn {
				margin: 30px 0 0 0 !important;
				justify-content: flex-start;
			}
		}
		.pc_top_right {
			image {
				width: 488px;
				height: 488px;
			}
		}
	}
	
	.warp {
		width: 100%;
		height: 30px;
		margin: 0 auto;
		overflow: hidden;

		ul {
			list-style: none;
			padding: 0;
			margin: 0 auto;

			&.ul-item {
				display: flex;

				.li-item {
					width: 100px;
					height: 30px;
					line-height: 30px;
					color: $me-text-color;
					font-size: 12px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: bold;

					image {
						width: 40rpx;
						height: 40rpx;
						border-radius: 200rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}





















	.container {
		margin: 0 auto;
		position: relative;
		width: 100%;
	}
	
	.top-block {
		display: block;
	}

	.top-block__content {
		align-items: center;
		background-image: url('/static/recommend/heading_bg.Brx7nYTy.png');
		background-position: top;
		background-size: 100% 100%;
		height: 466px;
		justify-content: center;
		margin: 0 0;
		min-width: unset;
		width: 100%;

		.top-block__main {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 100%;
			justify-content: space-between;
			
			/* #ifdef H5 */
			margin-top: -30px;
			/* #endif */
			
			/* #ifdef APP-PLUS */
			margin-top: 60px;
			/* #endif */
			
			
			max-width: 450px;
			padding: 0 16px;
			width: 100%;

			.top-block__title {
				color: $all-secondary-text-color;
				font-size: 28px;
				font-weight: 900;
				letter-spacing: .02em;
				line-height: 32px;
				margin-bottom: 12px;
				text-align: center;
				text-transform: uppercase;

				span {
					color: #ee3345;
				}
			}

			.top-block__img-main {
				display: block;
				vertical-align: middle;
				height: auto;
				width: 86%;
				left: 50%;
				position: absolute;
				top: 140px;
				transform: translate(-50%);
			}

			.top-block__desc {
				color: #ffffffcc;
				font-size: 16px;
				font-weight: 500;
				line-height: 24px;
				margin-bottom: auto;
			}
		}
	}

	.wrap {
		padding: 0 38rpx;

		.bottom_listbpx {
			background-image: linear-gradient(to top, #0d1162, #2d2676);
			border-radius: 8px;
			padding: 150rpx 30rpx 100rpx 30rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 90%;
			}
		}

		.referral__banner {
			margin: 68px 0 68px 0;
		}

		.banner {
			border-radius: 24px;
			overflow: hidden;
			background: radial-gradient(43.08% 17.64% at 44.36% 68.6%, #ff4f8eb3 0, #ff4f8e00), linear-gradient(86.96deg, #8045e7 -44.1%, #161f2c 100.09%);

			.banner__footer {
				padding: 0;
				text-align: center;
			}

			.banner__bottom {
				background: linear-gradient(88.54deg, #af0177 21.66%, #af017700 99.55%);
				min-height: 66px;
				padding: 11px 11px 12px 172px;
				font-size: 12px;
				gap: 15px;
				line-height: 16px;
				align-items: center;
				order-top: 1px solid hsla(0, 0%, 100%, .1);
				display: flex;
				justify-content: space-between;
				position: relative;

				.banner__gift {
					width: 75px;
					bottom: 0;
					left: 0;
					position: absolute;
					z-index: 2;
				}

				.banner__coin {
					display: none;
					bottom: 0;
					left: 220px;
					position: absolute;
					width: 150px;
				}

				.banner__label {
					font-size: 11px;
					height: 17px;
					line-height: 10px;
					padding-right: 14px;
					top: -1px;
					width: 160px;
					align-items: center;
					background: url('/static/recommend/label.webp') no-repeat;
					background-size: cover;
					color: #30052f;
					display: flex;
					font-weight: 800;
					justify-content: flex-end;
					left: 0;
					position: absolute;
					text-align: right;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: horizontal;
					overflow: hidden;
				}

				.banner__center {
					max-width: 210px;

					.banner__text {
						color: $all-secondary-text-color;
						font-size: 10px;
						line-height: 12px;
						font-weight: 700;
						letter-spacing: -.02em;
						margin-bottom: 0;
					}

					.banner__text2 {
						color: #ffb701;
						font-size: 14px;
						line-height: 17px;
						font-weight: 700;
						letter-spacing: -.02em;
						margin-bottom: 0;
					}
				}

				.banner__percent {
					bottom: 3px;
					font-size: 46px;
					left: 60px;
					color: #ffb701;
					font-weight: 900;
					line-height: 95%;
					margin-bottom: 0;
					position: absolute;

				}
			}

			.banner__top {
				position: relative;
				padding: 16px 24px 192px;
				text-align: center;

				.banner__banner {
					max-width: 405px;
					position: absolute;
					bottom: 0;
					left: 50%;
					max-height: 180px;
					top: auto;
					transform: translate(-50%);
				}

				.banner__desc {
					color: #ffffffb3;
					font-size: 12px;
					font-weight: 500;
					letter-spacing: -.02em;
					line-height: 150%;
					margin-bottom: 0;
				}

				.banner__title {
					font-weight: 700;
					font-size: 24px;
					line-height: 135%;
					margin-bottom: 12px;
					color: #ffffff;

					span {
						font-weight: 700;
						color: #fed700;
						font-size: 24px;
						line-height: 135%;
					}
				}

				.banner__banner--mob {
					position: absolute;
					width: 100%;
					bottom: 0;
					display: flex;
					left: 50%;
					max-height: 180px;
					max-width: 328px;
					top: auto;
					transform: translate(-50%);

					.img-mob {
						max-width: 100%;
						vertical-align: bottom;
					}

					.banner__coin1 {
						position: absolute;
						right: 0;
						top: 0;
						width: 65px;
					}

					.banner__coin2 {
						bottom: -42px;
						position: absolute;
						right: -30px;
						width: 90px;
					}
				}
			}
		}

		.boost {
			margin-top: 68px;
			
			.flex_a {
				display: block;
				.flex_c {
					display: none;
				}
			}
			.flex_b {
				display: block;
			}

			.boost__desc-block {
				display: flex;
				flex-direction: column;
				grid-area: desc;
				min-width: 100%;
				align-items: center;
				justify-content: center;

				.boost__desc {
					margin-top: 4rem;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 20px;
					margin-bottom: 2rem;
					text-align: center;
					color: $me-subtext-color;
				}
			}

			.boost__img-wrap {
				display: flex;
				grid-area: image;
				justify-content: center;
				overflow-x: hidden;
				width: 100%;
				margin: 0 auto;

				image {
					height: auto;
					width: 100%;
				}
			}

			.boost__title-block {
				text-align: center;

				.boost__info {
					color: $notice-font-color;
					font-size: 12px;
					font-weight: 700;
					letter-spacing: .06em;
					line-height: 18px;
					margin-bottom: 4px;
					text-transform: uppercase;
				}

				.boost__title {
					color: $all-secondary-text-color;
					font-size: 24px;
					font-weight: 700;
					line-height: 32px;
					margin-bottom: 30px;
					margin-top: 0;
					text-align: center;
				}
			}
		}

		.cards {
			grid-row-gap: 20px;
			display: grid;
			grid-template-columns: 1fr;
			grid-gap: 16px;

			.card--other {
				background: radial-gradient(110.75% 100% at 0 0, #2283f680 0, #242df640, #2622f600) !important;
				grid-gap: 16px;
			}

			.card {
				display: grid;
				grid-template-columns: auto 1fr;
				grid-gap: 8px;
				background: radial-gradient(110.75% 100% at 0 0, #00ff3880 0, #00c32b40, #006a1700);
				border-radius: 12px;
				padding-right: 20px;

				.card__img {
					height: auto;
					width: 100px;
				}

				.card__info {
					display: flex;
					flex-direction: column;
					margin-top: 28px;

					.card__title {
						font-size: 18px;
						font-style: normal;
						font-weight: 600;
						letter-spacing: -.36px;
						line-height: 135%;
						margin-bottom: 4px;
						color: $all-secondary-text-color;
					}

					.card__desc {
						color: $me-text-color;
						font-size: 14px;
						font-weight: bold;
						line-height: 20px;
						margin-bottom: 1rem;

						span {
							font-size: 14px;
							color: $all-secondary-text-color;
							font-weight: bold;
						}
					}

					.xiangqing {
						display: flex;
						align-items: center;
						color: #2283f6;

						span {
							font-weight: bold;
							font-size: 14px;
						}
					}
				}
			}
		}

		.general-info {
			width: 100%;
			margin: 56px 0 36px 0;

			.general-info__side {
				
				.totals {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.totals__block {

						.totals__title {
							color: #6e81a0;
							font-size: 12px;
							font-weight: 700;
							line-height: 18px;
							margin-bottom: 2px;
							word-break: break-all;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}

						.totals__value {
							font-size: 24px;
							font-weight: 700;
							line-height: 32px;
							margin-bottom: 0;
							margin-top: 0;
							display: flex;
							align-items: center;

							span {
								color: $me-text-color;
								font-weight: 600;
								// word-break: break-all;
								// display: -webkit-box;
								// -webkit-line-clamp: 1;
								// -webkit-box-orient: vertical;
								// overflow: hidden;
								display: flex;
								align-items: center;
								image {
									width: 45rpx;
									height: 45rpx;
								}
							}
						}
					}
				}

				.claims {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 100%;

					.claims__title {
						align-items: center;
						color: #6e81a0;
						display: flex;
						font-size: 12px;
						font-weight: 700;
						letter-spacing: .06em;
						line-height: 18px;
						margin-bottom: 14px;
						text-transform: uppercase;

						.claims__dot {
							background-color: #ee3345;
							border-radius: 50%;
							height: 10px;
							margin-right: 5px;
							width: 10px;
						}
					}
				}
			}

			.general-info__divider {
				background: linear-gradient(90deg, #43536d1a 5%, #43536d 50%, #43536d00);
				display: block;
				height: 1px;
				width: 100%;
			}

			.general-info__vertical-divider {
				background: linear-gradient(0deg, #43536d1a 5%, #43536d 50%, #43536d00);
				display: block;
				height: 100%;
				width: 1px;
			}
		}
	}

	.Register_btn2 {
		width: auto;
		margin: 45rpx auto;
		font-weight: bold;
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 28rpx;
		position: relative;
		text-align: center;
		justify-content: center;
	}

	.Register_btn {
		width: auto;
		margin: 40rpx auto 0;
		font-weight: bold;
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 26rpx;
		position: relative;
		text-align: center;
		justify-content: center;
	}

	.zhuceBtn {
		position: relative;

		span {
			display: inline-block;
			background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
			box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
			border-radius: 12px;
			height: 94rpx;
			line-height: 94rpx;
			text-align: center;
			padding: 0 54rpx;
			position: relative;
			z-index: 2;
			cursor: pointer;
			font-weight: bold;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}

	.zhuceBtn:after {
		padding: 0 54rpx;
		border-radius: 12px;
		height: 94rpx;
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
	
	@media (min-width: 800px) {
		.page_boxs {
			height: auto !important;
		}
		.page_wrap {
			padding: 50rpx;
			background: radial-gradient(49.05% 79.72% at 49.05% 0, #00186c 0, #00186c .01%, #0136b41c 74.48%, #0140cd00);
		}
		.pc_top_wrap {
			display: block;
		}
		.top-block {
			display: none;
		}
		.wrap .general-info .general-info__side .totals {
			justify-content: flex-start;
		}
		.totals__block222 {
			flex: 1;
		}
		.wrap .general-info .general-info__side .totals .totals__block .totals__title {
			margin-bottom: 12px;
		}
		.general-info__side {
			padding-right: 85px;
		}
		.wrap .boost .boost__img-wrap {
			width: 488px;
		}
		.wrap .boost .boost__title-block {
			text-align: left;
		}
		.wrap .boost .boost__title-block .boost__title{
			text-align: left;
		}
		.wrap .boost .flex_a {
			display: flex;
			align-items: center;
		}
		.wrap .boost .flex_b {
			display: none;
		}
		.wrap .boost .flex_a .flex_c {
			display: block;
		}
		.wrap .boost .boost__desc-block .boost__desc {
			margin-top: 0;
			margin-bottom: 20px;
			text-align: left;
		}
		.pcregvtn {
			width: auto;
			margin: auto !important;
			justify-content: flex-start;
			cursor: pointer;
		}
	}
	@media (max-width: 1324px) {
		.pc_top_box {
			display: block;
			text-align: center;
		}
		.pc_top_box .pc_top_left {
			text-align: center;
		}
		.pc_top_box .pc_top_left .Register_btn {
			justify-content: center;
		}
	}
	
</style>