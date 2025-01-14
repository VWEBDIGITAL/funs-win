<template>
	<view :style="theme" class="page_boxs">

		<match-media :max-width="800">
			<navbar ref="child" :title="$t('ReferPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>


		<view class="page_wrap">
			
			<view class="leve_swiper_box">
				<view class="leve_swiper_box_title">
					<view>{{$t('NewVIPPage.MAXLEVEL')}}</view>
					<view>RANK {{maxLevelList}}</view>
				</view>
				<view class="leve_swiper_box_item">
					<view class="input_box">
						<view class="jingxiangjb"></view>
			
			
						<swiper class="swiper" :display-multiple-items='SwpierNum' :current="currentIndex"
							@change="handleSwiperChange" :indicator-dots="indicatorDots" :autoplay="autoplay"
							:interval="interval" :duration="duration">
			
			
							<swiper-item v-for="(itemg,indexg) in Dengjilist" :key="indexg">
								<view class="Rank_wrap input_moren"
									:class="[isToken && myVipLeve == indexg?'input_boxwode':'']">
									<view class="Rank_box">
										<image class="rank_icon_box" :src="vipIcondomain+'/' + indexg + '.png'"
											mode="widthFix"></image>
										<view class="Rank_title">Rank {{indexg +1}}</view>
										<view class="total_text">{{$t('NewVIPPage.TotalWager')}}</view>
										<view class="total_num">
											<image class="rank_icon" src="/static/image/qianbi.png"></image>
											{{(itemg.needBet.needNet/100 || 0).toFixed(2)}}
										</view>
									</view>
									<view class="Rank_list">
										<view class="newLine"></view>
										<view class="Rank_list_item">
											<image src="../../static/Bonuslogin/04.png" mode="widthFix"></image>
											<view>{{$t('VIPPage.DailyRebate')}}</view>
											<view>×1%x{{itemg.rebate.maxRebateRate}}%</view>
										</view>
										<view class="newLine"></view>
										<view class="Rank_list_item">
											<image src="../../static/image/rankjinbi.png" mode="widthFix"></image>
											<view>{{$t('VIPPage.LevelUpBonus')}}</view>
											<view>{{(itemg.levelUp.reward/100).toFixed(2)}}</view>
										</view>
										<view class="newLine"></view>
										<view class="newLine"></view>
										<view class="Rank_list_item">
											<image src="../../static/Bonuslogin/10.png" mode="widthFix"></image>
											<view>{{$t('VIPPage.BirthdayBonus')}}</view>
											<view>{{(itemg.birthday.reward/100).toFixed(2)}}</view>
										</view>
										<view class="newLine"></view>
									</view>
									<view class="biaoti_liat">
										<view class="biaoti_liat_item">
											<image src="/static/image/pngtree_3d_green_check_icon.png"></image>
											<view>{{$t('ADDnew.priWith')}}</view>
										</view>
										<view class="biaoti_liat_item">
											<image src="/static/image/pngtree_3d_green_check_icon.png"></image>
											<view>{{$t('ADDnew.excPrev')}}</view>
										</view>
										<view class="biaoti_liat_item">
											<image src="/static/image/pngtree_3d_green_check_icon.png"></image>
											<view>{{$t('ADDnew.onlSupp')}}</view>
										</view>
										<view class="biaoti_liat_item">
											<image src="/static/image/pngtree_3d_green_check_icon.png"></image>
											<view>{{$t('ADDnew.excProm')}}</view>
										</view>
									</view>
									<view v-if="isToken" class="my_levce" :class="[myVipLeve == indexg?'':'yincang']">
										<span>My rank</span></view>
								</view>
							</swiper-item>
			
			
						</swiper>
			
					</view>
				</view>
			
				<view class="qiehuan_box">
					<view class="left" @click="prev"><u-icon name="arrow-left" size="30"
							:color="currentIndex == 0?'#2e3642':'#798cab'"></u-icon></view>
					<view class="right" @click="next"><u-icon name="arrow-right" size="30"
							:color="currentIndex == listsData.length-1?'#2e3642':'#798cab'"></u-icon></view>
				</view>
			
			</view>

			<view class="pc_show_warpa">
				<view class="pc_showTitle">
					<view class="title1">{{$t('NewVIPPage.title')}}</view>
					<view class="title2">{{$t('NewVIPPage.LevelSYS')}}</view>
				</view>
				<view class="pc_show_box">
					<uni-row :gutter="30" class="demo-uni-row">
						<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<view class="pc_show_left">
								<view class="pc_show_wenan">
									<view class="pc_show_wenan_item">
										<image src="/static/vipclubsNew/hero-3.png"></image>
										<view class="wenan_text">
											<view>{{$t('NewVIPPage.BetterBonuses')}}</view>
											<view>{{$t('NewVIPPage.TIP1')}}</view>
										</view>
									</view>
									<view class="pc_show_wenan_item">
										<image src="/static/vipclubsNew/hero-4.png"></image>
										<view class="wenan_text">
											<view>{{$t('NewVIPPage.MassivePayouts')}}</view>
											<view>{{$t('NewVIPPage.TIP2')}}</view>
										</view>
									</view>
									<view class="pc_show_wenan_item">
										<image src="/static/vipclubsNew/hero-5.png"></image>
										<view class="wenan_text">
											<view>{{$t('NewVIPPage.Priority')}}</view>
											<view>{{$t('NewVIPPage.TIP6')}}</view>
										</view>
									</view>
									<view class="pc_show_wenan_item">
										<image src="/static/vipclubsNew/hero-6.png"></image>
										<view class="wenan_text">
											<view>{{$t('NewVIPPage.Exclusive')}}</view>
											<view>{{$t('NewVIPPage.TIP4')}}</view>
										</view>
									</view>
									<view class="pc_show_wenan_item">
										<image src="/static/vipclubsNew/hero-7.png"></image>
										<view class="wenan_text">
											<view>{{$t('NewVIPPage.Highest')}}</view>
											<view>{{$t('NewVIPPage.TIP5')}}</view>
										</view>
									</view>
								</view>
							</view>
						</uni-col>
						<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<view class="pc_show_right">
								<image src="/static/vipclubsNew/hero-2.png" mode="widthFix"></image>
							</view>
						</uni-col>
					</uni-row>
				</view>
			</view>


			<view class="h5show">
				<view class="Top_oageTitle">
					<view class="title1">{{$t('NewVIPPage.title')}}</view>
					<view class="title2">{{$t('NewVIPPage.LevelSYS')}}</view>
				</view>

				<view class="vip_clubs_img1">
					<image src="/static/vipclubsNew/hero-2.png" mode="widthFix"></image>
				</view>

				<view class="vip_clubs_info">
					<view class="vip_clubs_info_item">
						<image src="/static/vipclubsNew/hero-3.png" mode="widthFix"></image>
						<view>{{$t('NewVIPPage.BetterBonuses')}}</view>
						<view>{{$t('NewVIPPage.TIP1')}}</view>
					</view>
					<view class="vip_clubs_info_item">
						<image src="../../static/vipclubsNew/hero-4.png" mode="widthFix"></image>
						<view>{{$t('NewVIPPage.MassivePayouts')}}</view>
						<view>{{$t('NewVIPPage.TIP2')}}</view>
					</view>
					<view class="vip_clubs_info_item">
						<image src="../../static/vipclubsNew/hero-5.png" mode="widthFix"></image>
						<view>{{$t('NewVIPPage.Priority')}}</view>
						<view>{{$t('NewVIPPage.TIP3')}}</view>
					</view>
					<view class="vip_clubs_info_item">
						<image src="../../static/vipclubsNew/hero-6.png" mode="widthFix"></image>
						<view>{{$t('NewVIPPage.Exclusive')}}</view>
						<view>{{$t('NewVIPPage.TIP4')}}</view>
					</view>
					<view class="vip_clubs_info_item">
						<image src="../../static/vipclubsNew/hero-7.png" mode="widthFix"></image>
						<view>{{$t('NewVIPPage.Highest')}}</view>
						<view>{{$t('NewVIPPage.TIP5')}}</view>
					</view>
				</view>
			</view>

			<view class="vipclubs_card_list">
				<view class="clubs_card_list_Title">
					<view>{{$t('NewVIPPage.Howdoes')}}</view>
					<view>{{$t('NewVIPPage.TIP6')}}</view>
				</view>

				<uni-row :gutter="30" class="demo-uni-row">
					<uni-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
						<view class="vipclubs_card_list_item">
							<view class="xia_jiantou"><u-icon name="arrow-down" size="40" color="#fff"></u-icon></view>
							<view class="item_box1">
								<image class="zhutu" src="../../static/vipclubsNew/hero-8.png" mode="widthFix"></image>
								<image class="fubiaotu" src="/static/vipclubsNew/01.png" mode="widthFix"></image>
							</view>
							<view class="item_box2">{{$t('NewVIPPage.step1')}}</view>
							<view class="item_box3">{{$t('NewVIPPage.step1answer')}}</view>
						</view>
					</uni-col>
					<uni-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
						<view class="vipclubs_card_list_item">
							<view class="xia_jiantou"><u-icon name="arrow-down" size="40" color="#fff"></u-icon></view>
							<view class="item_box1">
								<image class="zhutu" src="../../static/vipclubsNew/hero-9.png" mode="widthFix"></image>
								<image class="fubiaotu" src="/static/vipclubsNew/02.png" mode="widthFix"></image>
							</view>
							<view class="item_box2">{{$t('NewVIPPage.step2')}}</view>
							<view class="item_box3">{{$t('NewVIPPage.step2answer')}}</view>
						</view>
					</uni-col>
					<uni-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
						<view class="vipclubs_card_list_item">
							<view class="item_box1">
								<image class="zhutu" src="../../static/vipclubsNew/hero-10.png" mode="widthFix"></image>
								<image class="fubiaotu" src="/static/vipclubsNew/03.png" mode="widthFix"></image>
							</view>
							<view class="item_box2">{{$t('NewVIPPage.step3')}}</view>
							<view class="item_box3">{{$t('NewVIPPage.step3answer')}}</view>
						</view>
					</uni-col>
				</uni-row>

			</view>

			<view class="PalyNow_btn">
				<view class="reg_btn" @click="Ckangbeike()"><span>{{$t('NewVIPPage.NowPlayBTN')}}</span></view>
			</view>

			

			<view style="padding: 0 50rpx;">
				<faqlist ref="" :istype="'vipClub'"></faqlist>
			</view>
		</view>


		<home-bottom-info ref=""></home-bottom-info>


		<match-media :max-width="800">
			<u-tabbar></u-tabbar>
		</match-media>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,

				listsData: [],
				Dengjilist: [],
				maxLevelList: 0,

				vipIcondomain: '',


				tabsCidx: 0,
				myVipLeve: 0,
				userinfo: {},


				Progress: {
					needBet: 0
				},
				birthday: {},
				levelUp: {},
				monthly: {},
				rebate: {},
				weekly: {},
				vipIcon: {},
				isToken: '',
				SwpierNum: 1



			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			//  进入页面的时候执行一次
			// uni.getSystemInfo({
			// 	success: function(res) {
			// 		const windowWidth = res.windowWidth; // 窗口宽度
			// 		const windowHeight = res.windowHeight; // 窗口高度
			// 		//console.log(windowWidth);
			// 		//console.log(windowHeight);
			// 	}
			// });

		},
		onShow() {

			let windowWidth = uni.getSystemInfoSync().windowWidth
			if (windowWidth >= '1324') {
				this.SwpierNum = 3
			}
			if (windowWidth <= '1324') {
				this.SwpierNum = 2
			}
			if (windowWidth <= '1024') {
				this.SwpierNum = 1
			}

			//进入页面不触发获取数据  改变的时候触发
			const windowResizeCallback = (res) => {
				if (res.size.windowWidth >= 1324) {
					this.SwpierNum = 3
				}
				if (res.size.windowWidth <= 1324) {
					this.SwpierNum = 2
				}
				if (res.size.windowWidth <= 1024) {
					this.SwpierNum = 1
				}
				// //console.log('变化后的窗口高度=' + res.size.windowHeight)
			}
			uni.onWindowResize(windowResizeCallback)




			// let windowWidth = uni.getSystemInfoSync().windowWidth
			// if(windowWidth >= "800"){
			// 	this.SwpierNum = 3
			// } else {
			// 	this.SwpierNum = 1
			// }

			let isToken = uni.getStorageSync("token")
			this.isToken = isToken
			if (!isToken) {
				this.getVipDetails();
			} else {
				//uni.$emit('getgetMybalance', 1)
				this.myVipLeve = uni.getStorageSync("userinfo").vip

				this.currentIndex = uni.getStorageSync("userinfo").vip
				this.tabsCidx = uni.getStorageSync("userinfo").vip

				this.Getuserinfo();
				this.getVipDetails();
				this.getVipprogress()
				
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
				
			}
		},
		methods: {
			getVipprogress() {
				let that = this
				that.$u.post('/vip/progress', {
					vipLevel: that.tabsCidx
				}).then(res => {
					that.Progress = res.data.progress
				})
			},
			getVipDetails() {
				let that = this
				that.$u.post('/vip/reward/detail', {
					vipLevel: this.tabsCidx
				}).then(res => {
					//that.Progress = res.data.progress
					// that.birthday = res.data.birthday
					// that.levelUp = res.data.levelUp
					// that.monthly = res.data.monthly
					// that.rebate = res.data.rebate
					// that.weekly = res.data.weekly
					// that.vipIcon = res.data.vipIcon

					let newarry = [{
						birthday: {
							reward: 0
						},
						levelUp: {
							reward: 0
						},
						monthly: {
							reward: 0
						},
						needBet: {
							needNet: 0
						},
						rebate: {
							maxRebateRate: 0
						},
						weekly: {
							reward: 0
						}
					}]

					that.vipIcondomain = res.data.domain
					that.Dengjilist = [...newarry, ...res.data.list]

					//把等级数字转为数组
					that.maxLevelList = res.data.maxLevel + 1
					that.listsData = Array.from(new Array(that.maxLevelList), (x, i) => i + 1);


				})
			},
			Getuserinfo() {
				this.userinfo = uni.getStorageSync("userinfo")
			},

			handleSwiperChange(event) {
				const current = event.detail.current;
				this.currentIndex = current;
				//console.log("当前轮播到第", current, "个索引");
				this.tabsCidx = current
				this.getVipDetails()
			},
			prev() {
				if (this.currentIndex == 0) {

				} else {
					this.currentIndex = (this.currentIndex - 1 + this.listsData.length) % this.listsData.length;
				}
				//console.log(this.currentIndex)
			},
			next() {
				if (this.currentIndex == this.listsData.length - 1) {

				} else {
					this.currentIndex = (this.currentIndex + 1) % this.listsData.length;
				}
			},
			Ckangbeike() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		//background-color: $all-secondary-color;
	}

	.page_wrap {
		margin: 0 auto;
		max-width: 1088px;
		width: 100%;
		background-color: $home-games-wrap-color !important;
	}

	.pc_show_warpa {
		display: none;
	}

	.pc_showTitle {
		margin-bottom: 50rpx;
		font-weight: 900;

		view:nth-child(1) {
			color: $all-secondary-text-color;
			font-size: 43px;
		}

		view:nth-child(2) {
			font-size: 43px;
			color: #ff0048;
		}
	}

	.pc_show_box {

		// display: flex;
		// align-items: center;
		.pc_show_left {
			.pc_show_wenan {
				.pc_show_wenan_item {
					margin: 60rpx 0;
					display: flex;
					align-items: center;

					image {
						width: 100rpx;
						height: 100rpx;
					}

					.wenan_text {
						padding-left: 30rpx;
						flex: 1;

						view:nth-child(1) {
							color: $all-secondary-text-color;
							font-weight: bold;
							font-size: 25px;
							line-height: 1.2;
							margin: 0 0 3px;
							text-transform: uppercase;
						}

						view:nth-child(2) {
							color: #667888;
							font-size: 15px;
							line-height: 23px;
							margin: 0;
						}
					}
				}
			}
		}

		.pc_show_right {
			flex: 1;

			image {
				width: 1000rpx;
			}
		}
	}

	.h5show {
		display: block;
	}

	.biaoti_liat {
		padding: 30rpx 40rpx 1rpx 20rpx;

		.biaoti_liat_item {
			display: flex;
			align-items: center;
			margin: 0 0 25rpx 0;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			view {
				//color: $vip-swiper-item-mr-title;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
		}
	}

	.leve_swiper_box {
		padding-top: 100rpx;
		.leve_swiper_box_item {
			padding: 50rpx 50rpx 30rpx 50rpx;
			position: relative;

			.yincang {
				opacity: 0 !important;
			}

			.my_levce {
				text-align: center;
				//background-image: url('/static/vipclubsNew/my-rank-label_2.png');
				background-position: 50%;
				background-repeat: no-repeat;
				background-color: $mylevce-bg-color;
				bottom: -17px;
				left: 50%;
				position: relative;
				transform: translate(-50%);
				width: 85px;
				border-radius: 0 0 20rpx 20rpx;
				color: $mylevce-font-color;

				span {
					padding: 0 0;
					font-size: 20rpx;
					position: relative;
					top: -4rpx;
				}
			}
		}

		.leve_swiper_box_title {
			text-align: center;

			view:nth-child(1) {
				color: $all-secondary-text-color;
				font-size: 54rpx;
				font-weight: bold;
			}

			view:nth-child(2) {
				color: #ff0048;
				font-size: 84rpx;
				font-weight: bold;
			}
		}
	}

	.PalyNow_btn {
		width: 340rpx;
		margin: 0 auto 80rpx;
	}

	.vipclubs_card_list {
		padding: 60rpx;

		.clubs_card_list_Title {
			text-align: center;
			margin-bottom: 30rpx;

			view:nth-child(1) {
				color: $all-secondary-text-color;
				font-size: 54rpx;
				font-weight: bold;
			}

			view:nth-child(2) {
				color: #667888;
			}
		}

		.vipclubs_card_list_item {
			position: relative;
			background: linear-gradient(-60deg, #1f75dd 0%, #072446 100%);
			border-radius: 20rpx;
			padding: 50rpx;
			margin-bottom: 40rpx;

			.xia_jiantou {
				position: absolute;
				z-index: 9;
				bottom: -60rpx;
				left: 0;
				right: 0;
				margin: 0 auto;
				background-color: #1a2539;
				width: 80rpx;
				height: 80rpx;
				border-radius: 200rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.item_box1 {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 60rpx;

				.zhutu {
					width: 160rpx;
				}

				.fubiaotu {
					width: 168rpx;
				}

				view {
					font-size: 80rpx;
					font-weight: bold;
				}
			}

			.item_box2 {
				color: #ffffff;
				font-size: 34rpx;
				text-transform: uppercase;
				margin: 30rpx 0 10rpx 0;
				font-weight: bold;
			}

			.item_box3 {
				color: #9cb6e4;
			}
		}
	}

	.vip_clubs_info {
		margin-top: 50rpx;

		.vip_clubs_info_item {
			margin-bottom: 100rpx;
			text-align: center;
			padding: 0 65rpx;

			image {
				margin-bottom: 30rpx;
				width: 100rpx;
			}

			view:nth-child(2) {
				color: $all-secondary-text-color;
				font-size: 34rpx;
				margin-bottom: 10rpx;
				text-transform: uppercase;
			}

			view:nth-child(3) {
				color: #667888;
			}
		}
	}

	.vip_clubs_img1 {
		padding: 60rpx;

		image {
			width: 100%;
		}
	}

	.Top_oageTitle {
		padding: 60rpx 0;
		text-align: center;

		.title1 {
			color: $all-secondary-text-color;
			font-size: 45rpx;
		}

		.title2 {
			font-weight: bold;
			font-size: 80rpx;
			color: #ff0048;
		}
	}

	.reg_btn {
		position: relative;
		width: 100%;
		margin: 0 auto;
		bottom: 6rpx;

		span {
			font-weight: bold;
			width: 100%;
			color: #ffffff;
			display: inline-block;
			background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
			box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
			border-radius: 10px;
			height: 90rpx;
			line-height: 90rpx;
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
		height: 90rpx;
		background-color: #61001d;
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

	.qiehuan_box {
		margin-top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		.left {
			padding: 10rpx 14rpx;
			border-radius: 14rpx;
			margin: 0 10rpx 0 0;
			background-color: $all-secondary-color;
			cursor: pointer;
		}

		.right {
			padding: 10rpx 14rpx;
			margin: 0 0 0 10rpx;
			border-radius: 14rpx;
			background-color: $all-secondary-color;
			cursor: pointer;
		}
	}

	.input_boxwode {
		//border: 2px solid #1d6fd2 !important;
		background-image: $vip-swiper-item-xz-bg !important;
		//background-image: url('/static/image/balance_bg.png') !important;
		background-size: cover !important;
		background-repeat: no-repeat !important;
		//background-color: #2187ff !important;
		color: $vip-swiper-item-xz-title !important;
	}

	.input_moren {
		background: linear-gradient(180deg, #19be6b69, #ed1d4900 44.74%), #575a9426;
		background-color: $vip-swiper-item-mr-bgColor;
		color: $vip-swiper-item-mr-title;
	}

	.input_box {
		position: relative;

		//border: 2px solid $all-secondary-color;
		border-radius: 40rpx;
		padding: 30rpx 28rpx;

		.swiper {
			height: 532px;
		}

		.Rank_wrap {
			padding: 15px 15px 0 15px;
			border-radius: 14px;

			.Rank_list {
				.newLine {
					height: 1px;
					width: 100%;
					background: $vip-swiper-item-line;
				}

				.Rank_list_item {
					display: flex;
					align-items: center;
					padding: 30rpx;
					border-radius: 20rpx;
					margin: 20rpx 0 0 0;

					image {
						width: 40rpx;
						height: 40rpx;
					}

					//color: $vip-swiper-item-mr-title;

					view:nth-child(2) {
						padding-left: 20rpx;
						padding-right: 30rpx;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}

					view:nth-child(3) {
						margin-left: auto;
						//color: $vip-swiper-item-mr-title;
						font-weight: bold;
						text-align: right;
					}
				}
			}

			.Rank_box {
				position: relative;
				padding: 30rpx 30rpx;
				border-radius: 20rpx;

				.rank_icon_box {
					position: absolute;
					right: 10rpx;
					top: 40rpx;
					width: 160rpx;
					height: 160rpx;
				}

				.Rank_title {
					font-size: 50rpx;
					font-weight: bold;
					//color: $vip-swiper-item-mr-title;
				}

				.total_text {
					//color: $vip-swiper-item-mr-title;
					font-size: 24rpx;
					margin: 10rpx 0;
				}

				.total_num {
					font-weight: bold;
					font-size: 50rpx;
					//color: $vip-swiper-item-mr-title;
					display: flex;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
						margin-left: 0;
					}
				}
			}
		}
	}

	@media (min-width: 800px) {
		.page_wrap {
			padding: 100rpx 50rpx;
			background: radial-gradient(49.05% 79.72% at 49.05% 0, #00186c 0, #00186c .01%, #0136b41c 74.48%, #0140cd00);
		}

		.pc_show_warpa {
			display: block;
			padding: 0 60rpx;
		}

		.h5show {
			display: none;
		}

		.vipclubs_card_list {
			padding: 130px 30px 30px 30px;
		}

		.vipclubs_card_list .vipclubs_card_list_item {
			height: 225px;
		}

		.vipclubs_card_list .vipclubs_card_list_item .xia_jiantou {
			bottom: 40%;
			left: initial;
			right: -25px;
			transform: rotate(-90deg);
		}

		.vipclubs_card_list .clubs_card_list_Title {
			margin-bottom: 60rpx;
		}

		.PalyNow_btn {
			margin: 0 auto 100px;
		}

		.input_box .swiper {
			height: 532px;
		}

		.input_box .Rank_wrap {
			margin: 0 10px;
		}
		
		.leve_swiper_box {
			margin-bottom: 200rpx;
			padding-top: 30rpx;
		}

		.leve_swiper_box .leve_swiper_box_item .my_levce {
			bottom: -17px;
		}
	}
</style>