<template>
	<view :style="theme">

		<u-popup v-model="AllLevelShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="AllLevelShow = false">
				<view>{{$t('RebateRatePopup.VIP')}}</view>
			</view>
			<view class="input_box">
				
				
				
				<swiper class="swiper" :current="currentIndex" @change="handleSwiperChange" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in Dengjilist" :key="index">
						<view class="Rank_wrap" :class="[myVipLeve == currentIndex?'myRank':'']">
							<view class="Rank_box">
								<image class="rank_icon" :src="vipIcondomain+'/' + index + '.png'" mode="widthFix"></image>
								<view class="Rank_title">Rank {{index+1}}</view>
								<view class="total_text">{{$t('LockFundsPop-ups.TotalWager')}}</view>
								<view class="total_num">{{(item.needBet.needNet/100).toFixed(2)}}</view>
							</view>
							
							<view class="Rank_list">
								<view class="newLine"></view>
								<view class="Rank_list_item">
									<image src="../../static/Bonuslogin/04.png" mode="widthFix"></image>
									<view>{{$t('VIPPage.DailyRebate')}}</view>
									<view>×1%×{{item.rebate.maxRebateRate}}%</view><!--{{rebate.maxRebateRate}}‱-->
								</view>
								<view class="newLine"></view>
								<view class="Rank_list_item">
									<image src="../../static/image/rankjinbi.png" mode="widthFix"></image>
									<view>{{$t('VIPPage.LevelUpBonus')}}</view>
									<view>{{(item.levelUp.reward/100).toFixed(2)}}</view>
								</view>
								<!--<view class="newLine"></view>
								<view class="Rank_list_item">
									<image src="../../static/Bonuslogin/07.png" mode="widthFix"></image>
									<view>{{$t('VIPPage.WeeklyCashback')}}</view>
									<view>{{(weekly.reward/100).toFixed(2)}}</view>
								</view>-->
								<view class="newLine"></view>
								<!--<view class="Rank_list_item">
									<image src="../../static/Bonuslogin/08.png" mode="widthFix"></image>
									<view>{{$t('VIPPage.MonthlyCashback')}}</view>
									<view>{{(monthly.reward/100).toFixed(2)}}</view>
								</view>
								<view class="newLine"></view>-->
								<view class="Rank_list_item">
									<image src="../../static/Bonuslogin/10.png" mode="widthFix"></image>
									<view>{{$t('VIPPage.BirthdayBonus')}}</view>
									<view>{{(item.birthday.reward/100).toFixed(2)}}</view>
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
						</view>
						
						<view class="my_levce" :class="[myVipLeve == currentIndex?'':'yincang']"><span>My rank</span></view>
						
					</swiper-item>
				</swiper>
				
				
				
				
				<view class="qiehuan_box">
					<view class="left" @click="prev"><u-icon name="arrow-left" size="34" :color="currentIndex == 0?'#2e3642':'#798cab'"></u-icon></view>
					<view class="right" @click="next"><u-icon name="arrow-right" size="34" :color="currentIndex == listsData.length-1?'#2e3642':'#798cab'"></u-icon></view>
				</view>
				
				
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "AllLevel-Popup",
		props: {

		},
		data() {
			return {
				AllLevelShow: false,
				
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
				userinfo:{},
				
				
				Progress: {
					needBet: 0
				},
				birthday: {},
				levelUp: {},
				monthly: {},
				rebate: {},
				weekly: {},
				vipIcon: {},
				
			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				this.getVipDetails();
			} else {
				this.int()
			}
		},
		mounted() {

		},
		methods: {
			int(){
				let that = this
				that.myVipLeve = uni.getStorageSync("userinfo").vip
				
				that.currentIndex = uni.getStorageSync("userinfo").vip
				that.tabsCidx = uni.getStorageSync("userinfo").vip
				
				//console.log('我当前所在的等级描边',that.myVipLeve,that.currentIndex)
				
				this.getVipDetails();
				this.getVipprogress()
			},
			openPopup() {
				this.AllLevelShow = true
				this.int()
			},
			closewindows() {
				this.AllLevelShow = false
			},
			
			handleSwiperChange(event) {
				const current = event.detail.current;
				this.currentIndex = current;
				//console.log("当前轮播到第", current, "个索引");
				this.tabsCidx = current
				this.getVipDetails()
			},
			prev() {
				if(this.currentIndex == 0){
					
				} else {
					this.currentIndex = (this.currentIndex - 1 + this.listsData.length) % this.listsData.length;
				}
				//console.log(this.currentIndex)
			},
			next() {
				if(this.currentIndex == this.listsData.length-1){
					
				} else {
					this.currentIndex = (this.currentIndex + 1) % this.listsData.length;
				}
			},
			
			
			
			
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
					
					// //把等级数字转为数组
					// that.maxLevelList = res.data.vipIcon.maxLevel + 1
					// that.listsData = Array.from(new Array(that.maxLevelList), (x, i) => i + 1);
					
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
			
			
		}
	}
</script>

<style lang="scss">
	
	.biaoti_liat {
		padding: 30rpx 40rpx 1rpx 40rpx;
		.biaoti_liat_item {
			display: flex;
			align-items: center;
			margin: 0 0 25rpx 0;
			image {
				width: 50rpx;
				height: 50rpx;
			}
			view {
				//color: #ffffff;
				word-break:break-all;
				display:-webkit-box;
				-webkit-line-clamp:1;
				-webkit-box-orient:vertical;
				overflow:hidden;
			}
		}
	}
	
	.newLine {
		height: 1px;
		width: 100%;
		background: $vip-swiper-item-line;
		//background: linear-gradient(90deg, #43536d1a 5%, #6187be 50%, #43536d00);
	}
	.myRank {
		//border: 2px solid #1d6fd2 !important;
		background-image: $vip-swiper-item-xz-bg !important;
		//background-image: url('/static/image/balance_bg.png') !important;
		background-size: cover !important;
		background-repeat: no-repeat !important;
		//background-color: #2187ff !important;
		color: $vip-swiper-item-xz-title !important;
		
		//background-image: linear-gradient(107.7deg, #1552a2 -30.7%, #1552a2 7.2%, #124283 18.3%, #0c2953 60%, #1b54a1 170%) !important;
		border-radius: 20rpx;
	}
	.yincang {
		opacity: 0 !important;
	}
	.my_levce {
		text-align: center;
		//background-image: url('/static/vipclubsNew/my-rank-label_2.png');
		//background-image: linear-gradient(-27.7deg, #124283 0%, #124283 0%, #124283 1.3%, #0c2953 60%, #1b54a1 170%) !important;
		
		background-color: $mylevce-bg-color;
		
		background-position: 50%;
		background-repeat: no-repeat;
		bottom: 2rpx;
		left: 50%;
		position: relative;
		transform: translate(-50%);
		width: 85px;
		color: $mylevce-font-color;
		border-radius: 0 0 20rpx 20rpx;
		span {
			padding: 0 0;
			font-size: 20rpx;
			position: relative;
			top: -4rpx;
		}
	}
	
	.input_box {
		padding: 40rpx 50rpx;
		.swiper {
			height: 1000rpx;
			position: relative;
		}
		.qiehuan_box {
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			.left {
				background-color: $qiehuan-box-bg;
				padding: 20rpx;
				border-radius: 14rpx;
				margin: 0 10rpx 0 0;
			}
			.right {
				background-color: $qiehuan-box-bg;
				padding: 20rpx;
				margin: 0 0 0 10rpx;
				border-radius: 14rpx;
			}
		}
		
		
		
		.Rank_wrap {
			border-radius: 20rpx;
			//background-color: #1e2531;
			
			background: linear-gradient(180deg, #19be6b69, #ed1d4900 44.74%), #575a9426;
			background-color: $vip-swiper-item-mr-bgColor;
			color: $vip-swiper-item-mr-title;
			
			.Rank_list {
				
				.Rank_list_item {
					display: flex;
					align-items: center;
					padding: 40rpx 50rpx;
					
					margin: 0 0 0 0;
					image {
						width: 40rpx;
						height: 40rpx;
					}
					//color: #ffffff;
					view:nth-child(2){
						padding-left: 20rpx;
						padding-right: 30rpx;
						word-break:break-all;
						display:-webkit-box;
						-webkit-line-clamp:1;
						-webkit-box-orient:vertical;
						overflow:hidden;
					}
					view:nth-child(3){
						margin-left: auto;
						//color: #14d566;
					}
				}
			}
			.Rank_box {
				position: relative;
				padding: 30rpx 50rpx;
				border-radius: 20rpx;
				.rank_icon {
					position: absolute;
					right: 40rpx;
					top: 38rpx;
					width: 150rpx;
					height: 150rpx;
				}
				.Rank_title {
					font-size: 50rpx;
					font-weight: bold;
					//color: #ffffff;
				}
				.total_text {
					//color: #ffffff;
					font-size: 24rpx;
					margin: 10rpx 0;
				}
				.total_num {
					font-weight: bold;
					font-size: 40rpx;
					//color: #14d566;
				}
			}
		}
	}

	.reg_title {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			font-size: 30rpx;
			color: #ffffff;
			//font-weight: bold;
		}
	}
</style>