<template>
	<view :style="theme">

		<u-popup v-model="AllLevelShow" width="650" mode="center" close-icon-size="30" border-radius="14"
			:mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="AllLevelShow = false">
				<view>{{$t('RewardHistoryPopup.title')}}</view>
			</view>
			<view class="input_box">




				<view class="Rank_wrap">
					<view class="Rank_box">
						<image class="rank_icon" src="/static/Bonuslogin/treasure-opened.png" mode="widthFix"></image>
						<view class="Rank_box_left">
							<view class="Rank_title">{{$t('RewardHistoryPopup.TotalBonus')}}</view>
							<view class="total_num">
								
								
								<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
								<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
								<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
								
								{{(historyData.totalBonus/100).toFixed(2)}}</view>
						</view>
					</view>
					<view class="Rank_list">
						<view v-for="(item,index) in historyData.bonusList" :key="index">
							<view class="Rank_list_item"><!--  v-if="(item.type != 29 && item.type != 30)" -->
								
								
								<view v-if="item.type == 1">{{$t('TransactionPage.FundingCorrection')}}</view>
								<view v-if="item.type == 2">{{$t('TransactionPage.Commission')}}</view>
								
								<view v-if="item.type == 4">{{$t('TransactionPage.Deposit')}}</view>
								
								<view v-if="item.type == 11">{{$t('TransactionPage.LevelUpBonus')}}</view>
								<view v-if="item.type == 12">{{$t('TransactionPage.BirthdayBonus')}}</view>
								<view v-if="item.type == 13">{{$t('TransactionPage.WeeklyBonus')}}</view>
								<view v-if="item.type == 14">{{$t('TransactionPage.MonthlyBonus')}}</view>
								<view v-if="item.type == 15">{{$t('TransactionPage.ReferralRewards')}}</view>
								<view v-if="item.type == 16">{{$t('TransactionPage.SpinBonus')}}</view>
								<view v-if="item.type == 17">{{$t('TransactionPage.QuestBonus')}}</view>
								<view v-if="item.type == 18">{{$t('TransactionPage.OtherBonuses')}}</view>
								
								<view v-if="item.type == 19">{{$t('NewUserPopup.ADDHOME')}}</view>
								<view v-if="item.type == 20">{{$t('NewUserPopup.PhoneV')}}</view>
								<view v-if="item.type == 21">{{$t('NewUserPopup.NameV')}}</view>
								<view v-if="item.type == 22">{{$t('NewUserPopup.EmailV')}}</view>
								<view v-if="item.type == 23">{{$t('NewUserPopup.Bind')}}</view>
								<view v-if="item.type == 24">{{$t('NewUserPopup.KYCV')}}</view>
								
								
								
								<image v-if="item.type == 5" src="/static/Bonuslogin/cuxiao.png" mode="widthFix"></image>
								<image v-if="item.type == 3" src="/static/Bonuslogin/04.png" mode="widthFix"></image>
							
								
								
								<image v-if="item.type == 29" src="/static/Bonuslogin/05.png" mode="widthFix"></image>
								<image v-if="item.type == 30" src="/static/Bonuslogin/06.png" mode="widthFix"></image>
								
								
								
								
								
								<image v-if="item.type == 31" src="/static/image/qiandaoIcon.png.png" mode="widthFix"></image>
								
								<image v-if="item.type == 500" src="/static/image/rankjinbi.png" mode="widthFix"></image>
								<image v-if="item.type == 501" src="/static/Bonuslogin/11.png" mode="widthFix"></image>
								
								
								<view v-if="item.type == 5">{{$t('RewardHistoryPopup.bonus1')}}</view>
								<view v-if="item.type == 3">{{$t('RewardHistoryPopup.bonus2')}}</view>
								
								
								
								
								<view v-if="item.type == 29">{{$t('RewardHistoryPopup.bonus3')}}</view>
								<view v-if="item.type == 30">{{$t('RewardHistoryPopup.bonus4')}}</view>
								
								
								
								
								
								<view v-if="item.type == 31">{{$t('DailySignIn.Title')}}</view>
								
								<view v-if="item.type == 500">{{$t('RewardHistoryPopup.bonus5')}}</view>
								<view v-if="item.type == 501">{{$t('RewardHistoryPopup.bonus6')}}</view>
								
								
								
								
								
								
								<view v-if="item.type == 25">{{$t('NEWBonusPageA.1STDeposit')}}</view>
								<view v-if="item.type == 26">{{$t('NEWBonusPageA.2ndDeposit')}}</view>
								<view v-if="item.type == 27">{{$t('NEWBonusPageA.3rdDeposit')}}</view>
								<view v-if="item.type == 28">{{$t('DepositPageBonus.DepBonusPlus')}}</view>
								
								<view v-if="item.type == 51">{{$t('TransactionPage.Withdraw')}}</view>
								<view v-if="item.type == 52">{{$t('TransactionPage.WithdrawFee')}}</view>
								<view v-if="item.type == 53">{{$t('TransactionPage.Refunded')}}</view>
								<view v-if="item.type == 54">{{$t('TransactionPage.Vault')}}</view>
								<view v-if="item.type == 55">{{$t('TransactionPage.GamePoints')}}</view>
								<view v-if="item.type == 56">{{$t('TransactionPage.GameScores')}}</view>
								<view v-if="item.type == 101">{{$t('SpecialBonuS.title1')}}</view>
								
								<view class="left_val">
									<view>
										
										<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
										<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
										<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
										
										{{(item.totalBonus/100).toFixed(2)}}</view>
								</view>
							</view>
							<view class="line"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="qiehuan_box">
				<view class="left" @click="ToDetaild()">{{$t('DepositPageBonus.More')}}</view>
			</view>
		</u-popup>
		
		<!-- 充提详情 -->
		<pc-myPageDetails ref="openPCdetails"></pc-myPageDetails>

	</view>
</template>

<script>
	export default {
		name: "History-Popup",
		props: {

		},
		data() {
			return {
				platform: this.PID,
				AllLevelShow: false,
				historyData: {
					bonusList: [],
					totalBonus: 0
				},
				
				DailyRebate: {},
				DailyCashback: {},
				WeeklyCashback: {},
				WeeklyBonus: {},
				MonthlyBonus: {},
				PingTai: this.PID
			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				
			} else {
				
			}
		},
		mounted() {

		},
		methods: {
			Getgeneralreward(){
				let that = this
				that.$u.post('/general/reward', {
					
				}).then(res => {
					//console.log('General Reward',res.data)
					that.DailyRebate = res.data.rebate
					that.DailyCashback = res.data.dailyCashback
					that.WeeklyCashback = res.data.weeklyCashback
					that.WeeklyBonus = res.data.weeklyBonus
					that.MonthlyBonus = res.data.monthlyBonus
				})
			},
			
			openPopup() {
				this.getBonusHistory()
				//this.Getgeneralreward()
				this.AllLevelShow = true
			},
			closewindows() {
				this.AllLevelShow = false
			},
			
			getBonusHistory() {
				let that = this
				that.$u.post('/bonus/history', {
					
				}).then(res => {
					that.historyData = res.data
				})
			},
			ToDetaild(){
				this.AllLevelShow = false
				
				
				let windowWidth = uni.getSystemInfoSync().windowWidth
				if (windowWidth >= "800") {
					this.$refs.openPCdetails.openPopup()
				} else {
					uni.navigateTo({
						url: '/pages/Transaction/Transaction'
					})
				}
				
			}






		}
	}
</script>

<style lang="scss">
	
	.line {
	    background: linear-gradient(90deg, #ffffff0d -3%, #ffffff26 48.66%, #ffffff0d 103.12%);
	    height: 1px;
	    margin: 0 0;
	    width: 100%;
	}
	
	.qiehuan_box {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $all-secondary-color;
		padding: 40rpx 0;
		//border-top: 1px solid #222a3a;
		font-weight: bold;
		.left {
			background-color: $tkcz-max-btn;
			border-radius: 20rpx;
			padding: 30rpx 0;
			width: 80%;
			text-align: center;
			margin: 0 auto;
			color: #ffffff;
		}
	}
	
	.input_box {
		padding: 30rpx 30rpx 0 30rpx;

		.Rank_wrap {
			.Rank_list {
				.Rank_list_item {
					display: flex;
					align-items: center;
					padding: 30rpx;
					
					image {
						width: 55rpx;
						height: 55rpx;
					}

					color: $all-secondary-text-color;

					view:nth-child(2) {
						padding-left: 20rpx;
					}

					.left_val {
						margin-left: auto;
						color: $all-secondary-text-color;
						view:nth-child(1){
							display: flex;
							align-items: center;
							image {
								width: 34rpx;
								height: 34rpx;
							}
						}
						view:nth-child(2){
							color: #71809d;
						}
					}
				}
			}

			.Rank_box {
				position: relative;
				background-color: $all-secondary-color;
				padding: 50rpx 40rpx;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				.rank_icon {
					width: 70rpx;
					height: 70rpx;
				}
				.Rank_box_left {
					padding-left: 30rpx;
					.Rank_title {
						font-size: 26rpx;
						font-weight: bold;
						color: #71809d;
						margin-bottom: 10rpx;
					}
					.total_num {
						font-weight: bold;
						font-size: 40rpx;
						color: $all-secondary-text-color;
						display: flex;
						align-items: center;
						image {
							width: 40rpx;
							height: 40rpx;
							margin-left: 0;
						}
					}
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
			color: $all-secondary-text-color;
			//font-weight: bold;
		}
	}
</style>