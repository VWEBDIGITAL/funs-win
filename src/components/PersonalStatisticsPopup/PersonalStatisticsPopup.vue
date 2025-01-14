<template>
	<view :style="theme">

		<u-popup v-model="StatisticsShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="StatisticsShow = false">
				<view>{{$t('PerStatisticsPopup.Statistics')}}</view>
			</view>
			<view class="input_box">
				
				<view v-if="tabsIdx == 0">
					<view class="my_name">{{datas.userName}}</view>
					<view class="my_time">{{$t('PerStatisticsPopup.Joinedon')}},{{datas.regDate}}</view>
				</view>
				
				<view v-if="tabsIdx == 1">
					<view class="my_name">{{datas.userName}}</view>
					<view class="my_time">{{$t('PerStatisticsPopup.Joinedon')}},{{datas.regDate}}</view>
				</view>
				
				<view class="xxk_box" v-if="isShowBtn === 1">
					<view class="moren" :class="'xuanzhong'">{{$t('PerStatisticsPopup.Statistics')}}</view>
				</view>
				<view class="xxk_box" v-if="isShowBtn === 2">
					<view class="moren" v-for="(item,index) in PopularListW1" :key="index" @click="clickTabs(index)" :class="tabsIdx == index?'xuanzhong':''">{{item.name}}</view>
				</view>

				<view class="qukuai_box" v-show="tabsIdx == 0">
					<u-row gutter="16">
						<u-col span="6">
							<view class="demo-layout">
								<view>{{$t('NewlyAdded.TotalDeposits')}}</view>
								<view>{{statistics.depositCount}}</view>
							</view>
						</u-col>
						<u-col span="6">
							<view class="demo-layout">
								<view>{{$t('NewlyAdded.TotalBets')}}</view>
								<view>{{statistics.betCount}}</view>
							</view>
						</u-col>
						<u-col span="6">
							<view class="demo-layout">
								<view>{{$t('NewlyAdded.AccumulatedDeposits')}}</view>
								<view>{{(statistics.deposits/100).toFixed(2)}}</view>
							</view>
						</u-col>
						<u-col span="6">
							<view class="demo-layout">
								<view>{{$t('NewlyAdded.TotalWins')}}</view>
								<view>{{statistics.totalWin}}</view>
							</view>
						</u-col>
						<u-col span="6">
							<view class="demo-layout">
								<view>{{$t('NewlyAdded.AvailableFunds')}}</view>
								<view>{{(statistics.balance/100).toFixed(2)}}</view>
							</view>
						</u-col>
						<u-col span="6">
							<view class="demo-layout">
								<view>{{$t('NewlyAdded.TotalWagered')}}</view>
								<view>{{(statistics.totalBet/100).toFixed(2)}}</view>
							</view>
						</u-col>
					</u-row>
				</view>
				
				<view class="qukuai_box" v-show="tabsIdx == 1">
					<u-row gutter="16">
						<u-col span="12">
							<view class="demo-layout">
								<view>{{$t('PlayStatisticsPopup.BettingContribution')}}</view>
								<view>{{(contribute.betContribution/100).toFixed(2)}}</view>
							</view>
						</u-col>
						<u-col span="12">
							<view class="demo-layout">
								<view>{{$t('PlayStatisticsPopup.AgentContribution')}}</view>
								<view>{{(contribute.agentContribution/100).toFixed(2)}}</view>
							</view>
						</u-col>
						<u-col span="12">
							<view class="demo-layout">
								<view>{{$t('PlayStatisticsPopup.TotalContribution')}}</view>
								<view>{{(contribute.totalContribution/100).toFixed(2)}}</view>
							</view>
						</u-col>
						<u-col span="12">
							<view class="demo-layout">
								<view>{{$t('NEWReferpageB.REWARDTYPE1')}}</view>
								<view>{{(statistics.recommendReward/100).toFixed(2)}}</view>
							</view>
						</u-col>
					</u-row>
				</view>
				

			</view>
			<!--<view class="to_SignIn">{{$t('PerStatisticsPopup.ViewGameDetailsBtn')}}</view>-->
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "PersonalStatisticsPopup",
		props: {
			queryUserId: {
				type: Number,
				default: 0
			},
			isShowBtn: {
				type: Number,
				default: 1
			},
			Types: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				StatisticsShow: false,
				tabsList:[{
					name: this.$t('PerStatisticsPopup.Statistics')
				},{
					name: this.$t('PlayStatisticsPopup.Contribute')
				}],
				tabsIdx: 0,
				user: {},
				datas: {},
				statistics: {},
				contribute: {},
			};
		},
		watch: {

		},
		computed: {
			PopularListW1() {
				let arry = [{
					name: this.$t('PerStatisticsPopup.Statistics')
				}, {
					name: this.$t('PlayStatisticsPopup.Contribute')
				}]
				return arry
			},
		},
		created() {

		},
		mounted() {
			this.tabsIdx = this.Types
			this.GetuserInfo()
			//this.getsta()
		},
		methods: {
			getsta(){
				let that = this
				this.$u.post('/promotion/statistics/player', {
					queryUserId: Number(that.queryUserId) //好友id
				}).then(res => {
					that.datas = res.data
					that.statistics = res.data.statistics
					that.contribute = res.data.contribute
					/*res.data = {
						agentContribution: 0
						betContribution: 0
						regDate: "2024-01-27 10:44:55"
						totalContribution: 0
						userId: 180000574
						userName: "X54321"
					}*/
				}).catch(err => {
				
				})
			},
			GetuserInfo(){
				let that = this
				that.user = uni.getStorageSync('userinfo')
			},
			openPopup() {
				this.StatisticsShow = true
			},
			closewindows() {
				this.StatisticsShow = false
			},
			clickTabs(idx){
				this.tabsIdx = idx
			}
		}
	}
</script>

<style lang="scss">
	.to_SignIn {
		background-color: $all-secondary-color;
		text-align: center;
		height: 83rpx;
		line-height: 83rpx;
		color: $font-all-color;
		font-size: 22rpx;
	}

	.input_box {
		
		padding: 30rpx;

		.my_name {
			color: $font-all-color;
			margin-bottom: 10rpx;
			font-weight: bold;
			font-size: 30rpx;
		}

		.my_time {
			color: $font-all-color;
			font-size: 24rpx;
		}

		.my_btn {
			background-color: $all-secondary-color;
			border-radius: 200rpx;
			text-align: center;
			color: $all-secondary-text-color;
			display: inline-block;
			padding: 20rpx 30rpx;
			margin-top: 30rpx;
		}
		
		.qukuai_box {
			margin-top: 20rpx;
			.demo-layout {
				margin: 10rpx 0;
				background-color: $all-secondary-color;
				padding: 20rpx;
				border-radius: 10rpx;
				view:nth-child(1){
					color: $font-all-color;
					font-size: 20rpx;
					margin-bottom: 5rpx;
				}
				view:nth-child(2){
					font-size: 30rpx;
					color: $all-secondary-text-color;
					//font-weight: bold;
				}
			}
		}
		
		.xxk_box {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			.moren {
				display: inline-block;
				color: $me-text-color;
				border-radius: 200rpx;
				padding: 20rpx;
				//font-weight: bold;
				margin-right: 20rpx;
			}
			.xuanzhong {
				color: $me-text-color !important;
				background-color: $all-secondary-color !important;
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