<template>
	<view :style="theme" class="page_boxs">
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('VIPClub')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->
		
		<pagesNavTitle ref="" :title="$t('VIPClub')"></pagesNavTitle>
		<view class="page_wrap">
			<view class="myinfo_box">
				<view class="user_info">
					<view class="user_tx">
						<!---<image src="/static/image/Lvl1_Steel_512.png"></image>-->
						<image :src="vipIcon.domain+'/' + (Progress.vip) + '.png'" mode="widthFix"></image>
					</view>
					<view class="user_name_id">
						<view class="user_name_iterm">
							<view>{{userinfo.nickName}}</view>
						</view>
						<view class="mioaoshu">
							{{$t('VIPPage.Explain1', { price1: (Progress.userBet/100).toFixed(0),price2: (Progress.needBet/100).toFixed(0)})}}
						</view>
					</view>
				</view>
				<view class="user_vip">
					<view class="vip_title">
						<image src="/static/image/me/huangguan.png"></image><text>VIP{{Progress.vip}}</text>
					</view>
					<view class="vip_jdt">
						<view class="jdt_wrap">
							<view class="jdt_box">
								<u-line-progress :percent="Progress.progressRate" active-color="#3673D9" inactive-color="#2F4553" height="14">
									<view slot="default"></view>
								</u-line-progress>
							</view>
							<view class="jdt_ask">
								<view>{{$t('VIPPage.XP')}}</view>
								<view>{{Progress.progressRate}}%</view>
							</view>
						</view>
					</view>
					<view class="miaoshu22">
						{{$t('VIPPage.Explain2')}}
					</view>
				</view>
			</view>

			<view class="jiangbei_list">
				<view class="tabs_box">
					<scroll-view class="uni-swiper-tab" scroll-x>
						<view class="tabs_item scrollx_items" v-for="(item,index) in maxLevelList" :key="index" @click="clicktabs(item-1,index)">
							<view class="item_name">
								<view class="xuanfu">
									<u-icon name="checkmark-circle-fill" color="#45D91E" v-if="index == myVipLeve"></u-icon>
									<image class="item_icon" :src="vipIcon.domain+'/' + index + '.png'" :class="tabsidx != index?'tmdu':''" mode="widthFix"></image>
								</view>
							</view>
							<view class="item_mask" v-if="tabsidx == index"></view>
							<view class="item_border" v-if="tabsidx == index"></view>
						</view>
					</scroll-view>
				</view>
				<view class="renwu_list">
					<view class="renwu_list_item">
						<view class="image_box">
							<image class="image1" src="/static/image/glare-retro.png" mode="widthFix"></image>
						</view>
						<view class="renwu_item_info">
							<view>{{$t('VIPPage.DailyRebate')}}</view>
							<view>{{$t('NewlyAdded.RebateAmount')}} {{rebate.maxRebateRate}}‱</view>
						</view>
						
						<view class="renwu_btn_wrap">
							<view class="renwu_btn" @click="BettingRebates()">{{$t('VIPPage.ViewBtn')}}</view>
						</view>
						
					</view>
					
					
					
					<view class="renwu_list_item">
						<view class="image_box">
							<image class="image2" src="/static/image/glare-volume.png" mode="widthFix"></image>
						</view>
						<view class="renwu_item_info">
							<view>{{$t('VIPPage.LevelUpBonus')}}</view>
							<view>{{$t('NewlyAdded.UpgradeAmount')}} {{(levelUp.reward/100).toFixed(2)}}</view>
						</view>
						
						<view class="renwu_btn_wrap">
							<view v-if="levelUp.status == 0 || levelUp.status == 2"></view>
							<view class="renwu_btn4" v-else @click="Lingqu('levelUp')">{{$t('VIPPage.BonusStatus1')}}</view>
						</view>
						
					</view>
					
					
					
					<view class="renwu_list_item">
						<view class="image_box">
							<image class="image3" src="/static/image/glare-isometric.png" mode="widthFix"></image>
						</view>
						<view class="renwu_item_info">
							<view>{{$t('VIPPage.WeeklyCashback')}}</view>
							<view>{{$t('NewlyAdded.WeeklyAmount')}} {{(weekly.reward/100).toFixed(2)}}</view>
						</view>
						
						<view class="renwu_btn_wrap">
							<view v-if="weekly.status == 0 || weekly.status == 2"></view>
							<view class="renwu_btn4" v-else @click="Lingqu('weekly')">{{$t('VIPPage.BonusStatus1')}}</view>
						</view>
						
						
					</view>
					
					
					
					<view class="renwu_list_item">
						<view class="image_box">
							<image class="image4" src="/static/image/glare-gradient.png" mode="widthFix"></image>
						</view>
						<view class="renwu_item_info">
							<view>{{$t('VIPPage.MonthlyCashback')}}</view>
							<view>{{$t('NewlyAdded.MonthlyAmount')}} {{(monthly.reward/100).toFixed(2)}}</view>
						</view>
						
						<view class="renwu_btn_wrap">
							<view v-if="monthly.status == 0 || monthly.status == 2"></view>
							<view class="renwu_btn4" v-else @click="Lingqu('monthly')">{{$t('VIPPage.BonusStatus1')}}</view>
						</view>
						
					</view>
					
					
					
					<view class="renwu_list_item">
						<view class="image_box">
							<image class="image5" src="/static/image/glare-gift.png" mode="widthFix"></image>
						</view>
						<view class="renwu_item_info">
							<view>{{$t('VIPPage.BirthdayBonus')}}</view>
							<view>{{$t('NewlyAdded.Annual')}} {{(birthday.reward/100).toFixed(2)}}</view>
						</view>
						
						<view class="renwu_btn_wrap">
							<view v-if="birthday.status == 0 || birthday.status == 2"></view>
							<view class="renwu_btn4" v-else @click="Lingqu('birthday')">{{$t('VIPPage.BonusStatus1')}}</view>
						</view>
						
					</view>
				</view>
			</view>

			<!-- type 领奖类型（3返水 11晋级 12生日 13周礼金 14月礼金）-->
			<!-- <view class="ranking_list">
				<view class="ranking_list_title">{{$t('VIPPage.History')}}</view>
				<view class="ranking_list_item" v-for="(item,index) in Loglist" :key="index">
					<image src="/static/image/home/crypto_icon_232615.png"></image>
					<view style="display:flex;">
						{{item.userId}} Got <span>${{item.reward.toFixed(2)}}</span>
						<p v-if="item.type == 3">Daily Rebate</p>
						<p v-if="item.type == 11">Level Up Bonus</p>
						<p v-if="item.type == 12">Birthday Bonus</p>
						<p v-if="item.type == 13">Weekly Cashback</p>
						<p v-if="item.type == 14">Monthly Cashback</p>
					</view>
				</view>
			</view> -->

			<faqlist ref="" :istype="'vipClub'"></faqlist>
			
			<!--<view class="Terms_and_Conditions">
				<view class="Terms_and_Title">Terms and Conditions</view>
				<view class="wenan_box">The minimum bet required to be eligible for this tournament is 10c USD or
					currency equivalent The multipliers on all games must be matched or bettered to enter the prizepool
				</view>
			</view>-->

		</view>
		
		<!-- </uni-transition> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOptions: true,
				
				tabsidx: 0,
				tabsCidx: 0,
				myVipLeve: 0,
				userinfo:{},
				
				Loglist: [],
				
				Progress: {},
				
				birthday: {},
				levelUp: {},
				monthly: {},
				rebate: {},
				weekly: {},
				vipIcon: {},
				
				maxLevelList: 0,
				
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				this.myVipLeve = uni.getStorageSync("userinfo").vip
				this.tabsidx = uni.getStorageSync("userinfo").vip
				this.tabsCidx = uni.getStorageSync("userinfo").vip
				
				this.Getuserinfo();
				this.getVipDetails();
				this.getLog()
			}
		},
		onShow() {
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				
			} else {
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		methods: {
			getVipDetails() {
				let that = this
				that.$u.post('/vip/reward/detail', {
					vipLevel: this.tabsCidx
				}).then(res => {
					that.Progress = res.data.progress
					that.birthday = res.data.birthday
					that.levelUp = res.data.levelUp
					that.monthly = res.data.monthly
					that.rebate = res.data.rebate
					that.weekly = res.data.weekly
					that.vipIcon = res.data.vipIcon
					that.maxLevelList = res.data.vipIcon.maxLevel + 1
					
				})
			},
			Getuserinfo(){
				this.userinfo = uni.getStorageSync("userinfo")
			},
			clicktabs(item,idx) {
				//console.log(item,idx)
				this.tabsidx = idx
				this.tabsCidx = idx
				this.getVipDetails()
			},
			BettingRebates(){
				uni.navigateTo({
					url: '/pages/Bettingrebates/Bettingrebates'
				})
			},
			Lingqu(type){
				let that = this
				if(type == "levelUp"){
					that.StartLing(11)
				} else if(type == "weekly"){
					that.StartLing(13)
				} else if(type == "monthly"){
					that.StartLing(14)
				} else if(type == "birthday"){
					that.StartLing(12)
				}
			},
			StartLing(type){
				let that = this
				that.$u.post('/vip/reward/take', {
					rewardType: type, // Number 是 领取类型： 3 返水 11 升级礼金 12 生日礼金 13 周礼金 14 月礼金
					vipLevel: this.tabsCidx//uni.getStorageSync("userinfo").vip
				}).then(res => {
					that.$nextTick(() => {
						this.Getuserinfo();
						this.getVipDetails();
						uni.$emit('getgetMybalance', 1)
						
						
						if(type == 11){
							uni.$emit('UpdataAddBcbalance', (that.levelUp.reward/100).toFixed(2))
						} else if(type == 13){
							uni.$emit('UpdataAddBcbalance', (that.weekly.reward/100).toFixed(2))
						} else if(type == 14){
							uni.$emit('UpdataAddBcbalance', (that.monthly.reward/100).toFixed(2))
						} else if(type == 12){
							uni.$emit('UpdataAddBcbalance', (that.birthday.reward/100).toFixed(2))
						}
						
					})
				})
			},
			getLog(){
				let that = this
				that.$u.post('/vip/reward/record', {
					
				}).then(res => {
					this.Loglist = res.data
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.ranking_list {
		background-color: $all-secondary-color;
		margin: 20rpx 0;
		border-radius: 12rpx;
		padding: 10rpx 30rpx;
		
		.ranking_list_title {
			//font-weight: bold;
			color: #FEFEFE;
			font-size: 33.33rpx;
			margin: 30rpx 0 20rpx 0;
		}

		.ranking_list_item {
			padding: 20rpx 0;
			display: flex;
			align-items: center;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 14rpx;
			}

			view {
				color: $all-secondary-text-color;

				span {
					color: #45D91E;
					margin: 0 10rpx;
				}
			}
		}
	}

	.jiangbei_list {
		margin: 30rpx 0;
		background-color: $all-secondary-color;
		border-radius: 12rpx;
		padding: 20rpx;

		.renwu_list {
			margin-top: 40rpx;
			padding: 0 6rpx;

			.renwu_list_item {
				display: flex;
				align-items: center;
				padding: 30rpx 0;

				.image_box {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 80rpx;

					.image1 {
						width: 51.39rpx;
					}

					.image2 {
						width: 33.33rpx;
					}

					.image3 {
						width: 56.25rpx;
					}

					.image4 {
						width: 53.47rpx;
					}

					.image5 {
						width: 56.25rpx;
					}
				}

				.renwu_item_info {
					flex:1;
					padding: 0 10px 0 10rpx;

					view:nth-child(1) {
						color: #FEFEFE;
						//font-weight: bold;
						margin-bottom: 10rpx;
					}

					view:nth-child(2) {
						color: $font-all-color;
						font-size: 24rpx;
					}
				}

				.renwu_btn {
					width: 90px;
					height: 36px;
					line-height: 36px;
					text-align: center;
					margin-left: auto;
					color: #3673D9;
					border: 1px solid #3673D9;
					border-radius: 6rpx;
					font-size: 24rpx;
				}
				
				.renwu_btn_wrap {
					width: 90px;
					width: 90px;
					text-align: center;
					height: 36px;
					line-height: 36px;
					margin-left: auto;
				}

				.renwu_btn4 {
					width: 90px;
					text-align: center;
					height: 36px;
					line-height: 36px;
					margin-left: auto;
					color: $all-secondary-text-color;
					background: linear-gradient(1turn,#0c5eff .8%,#1398f9);
					box-shadow: 0 3px 28px #2283f666,inset 0 3px 3px #ffffff4d;
					border-radius: 6rpx;
					font-size: 24rpx;
				}
			}
		}

		.tabs_box {
			background-color: $all-secondary-color;
			border-radius: 12rpx 12rpx 0 0;
			border-bottom: 2px solid #2F4553;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 92rpx;
			position: relative;
			
			.uni-swiper-tab {
				white-space: nowrap;
			}
			
			.scrollx_items {
				text-align: left;
				display: inline-block;
				width: 44px;
				box-sizing: border-box;
				margin-right: 0;
			}
			
			.scrollx_items:first-child {
				//margin-left: 30rpx;
			}
			
			.scrollx_items:last-child {
				margin-right: 0;
			}

			.tabs_item {
				flex: 1;
				position: relative;
				text-align: center;
				height: 92rpx;

				.item_name {
					color: #FEFEFE;
					//font-weight: bold;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 9;

					.xuanfu {
						position: relative;

						.u-icon {
							position: absolute;
							top: -5rpx;
							right: -10rpx;
							z-index: 2;
						}

						.item_icon {
							width: 53.47rpx;
							height: 68.06rpx;
						}

						.tmdu {
							opacity: .2;
						}
					}
				}

				.item_mask {
					height: 90rpx;
					width: 100%;
					background-image: linear-gradient(to top, #223d52, rgba(30, 49, 63, 0));
					border-radius: 0 0 0 0;
					position: absolute;
					top: 2px;
					left: 0;
					z-index: 1;
				}

				.item_border {
					position: absolute;
					bottom: -2px;
					left: 0;
					width: 100%;
					height: 2px;
					background-color: #3673D9;
					z-index: 2;
				}
			}
		}
	}

	.page_wrap {
		padding: 20rpx 20rpx;
		background-color: $body-bg-color !important;
		.Terms_and_Conditions {
			margin: 30rpx 0;

			.Terms_and_Title {
				//font-weight: bold;
				font-size: 32rpx;
				color: #FEFEFE;
				margin-bottom: 20rpx;
			}

			.wenan_box {
				color: $font-all-color;
			}
		}
	}

	.myinfo_box {
		background-color: $all-secondary-color;
		border-radius: 12rpx;
		padding: 30rpx;

		.user_info {
			display: flex;
			align-items: center;

			.user_tx {
				width: 140.97rpx;
				height: 140.97rpx;
				border: 1px solid #2a3546;
				background-color: $pupUp-bg-color;
				border-radius: 200rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 60.42rpx;
					height: 76.39rpx;
					border-radius: 200rpx;
				}
			}

			.user_name_id {
				padding-left: 20rpx;
				flex: 1;

				.user_name_iterm {
					position: relative;
					margin-bottom: 10rpx;
					color: #fefefe;
					display: flex;
					align-items: center;
					//font-weight: bold;

					span {
						font-size: 24rpx;
						display: inline-block;
						background-color: $pupUp-bg-color;
						border-radius: 200rpx;
						padding: 6rpx 20rpx;
						font-weight: initial;
						margin-left: 10rpx;
					}
				}

				.mioaoshu {
					color: $font-all-color;

					span {
						color: #fefefe;
						//font-weight: bold;
						margin: 0 10rpx;
					}
				}
			}
		}

		.user_vip {
			margin-top: 20rpx;

			.vip_title {
				color: $all-secondary-text-color;
				display: flex;
				align-items: center;

				image {
					width: 38rpx;
					height: 38rpx;
					margin-right: 10rpx;
				}

				text {
					//font-weight: bold;
				}
			}

			.miaoshu22 {
				margin-top: 30rpx;
				background-color: $pupUp-bg-color;
				padding: 20rpx;
				color: $font-all-color;
				border-radius: 12rpx;
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
							color: $font-all-color;
						}

						view:nth-child(2) {
							color: $font-all-color;
						}
					}
				}

				.jdt_righticon {
					width: 10rpx;
					height: 20rpx;
					position: relative;
					top: -2rpx;
					margin-left: 30rpx;

					image {
						width: 10rpx;
						height: 20rpx;
						transform: rotate(180deg);
						position: absolute;
						top: 0;
						left: 0;
					}
				}
			}
		}
	}
</style>