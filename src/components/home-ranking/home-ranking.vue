<template>
	<view :style="theme">

		<view class="page_wrap">
			<view class="xxk_box">
				<view class="moren" v-for="(item,index) in tabsList" :key="index" @click="clickTabs(index)" :class="tabsIdx == index?'xuanzhong':''">{{item.name}}</view>
			</view>
			
			<view class="ranking_list" v-if="tabsIdx == 0">
				<scroll-view scroll-y="true" style="height: 600rpx;">
					<view class="ranking_list_item" v-for="(item,index) in BetsList" :key="index">
						<image src="/static/image/home/crypto_icon_232615.png"></image>
						<view>{{item.userId}} Got <span>${{item.bet/100}}</span> {{item.gameName}}</view>
					</view>
				</scroll-view>
			</view>
			
			<view class="Commission_Ranking" v-if="tabsIdx == 1">
				<view class="Ranking_title_sub">
					<view>Rank</view>
					<view>Player</view>
					<view>Wagered</view>
				</view>
				<scroll-view scroll-y="true" style="height: 600rpx;">
					<view class="Ranking_lists" v-for="(item,index) in BetsList2" :key="index">
						<view>1st</view>
						<view>{{item.userId}}</view>
						<view>{{item.totalBet/100}}</view>
					</view>
				</scroll-view>
			</view>
			
		</view>

	</view>
</template>

<script>
	export default {
		name: "home-ranking",
		data() {
			return {
				tabsList:[{
					name: this.$t('LatestBets')
				},{
					name: this.$t('WagerRanking')
				}],
				tabsIdx: 0,
				BetsList: [],
				BetsList2: []
			};
		},
		created() {
			this.getLisst()
			this.getLisst2()
		},
		methods: {
			getLisst(){
				this.$u.post('game/record/realtime', {
					pid: this.PID, //Number 是 平台Id
				}).then(res => {
					this.BetsList = res.data
				}).catch(err => {
				
				})
			},
			getLisst2(){
				this.$u.post('game/record/bet-rank', {
					pid: this.PID, //Number 是 平台Id
				}).then(res => {
					this.BetsList2 = res.data
				}).catch(err => {
				
				})
			},
			clickTabs(idx){
				this.tabsIdx = idx
			}
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		padding: 0 20rpx 20rpx 20rpx;
		
		.ranking_list {
			background-color: $all-secondary-color;
			margin: 20rpx 0;
			border-radius: 12rpx;
			padding: 10rpx 30rpx;
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

		.xxk_box {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			.moren {
				display: inline-block;
				background-color: $all-secondary-color;
				color: $me-text-color;
				border-radius: 10rpx;
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
	
	.Commission_Ranking {
		margin-top:20rpx;
		background-color: $all-secondary-color;
		padding: 2rpx 30rpx 20rpx 30rpx;
		border-radius: 12rpx;
		.Ranking_title {
			text-align: center;
			font-size: 34rpx;
			color: #FEFEFE;
			//font-weight: bold;
			border-bottom: 1px solid #2F4553;
			padding-bottom: 30rpx;
		}
		.Ranking_title_sub {
			margin: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view:nth-child(1) {
				width: 170rpx;
				color: $font-all-color;
				text-align: left;
			}
			view:nth-child(2) {
				flex: 1;
				color: $font-all-color;
				text-align: center;
			}
			view:nth-child(3) {
				flex: 1;
				color: $font-all-color;
				text-align: right;
			}
		}
		.Ranking_lists {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 0;
			view:nth-child(1) {
				width: 170rpx;
				color: $font-all-color;
				text-align: left;
				font-size: 24rpx;
			}
			view:nth-child(2) {
				flex: 1;
				color: #FEFEFE;
				text-align: center;
				font-size: 24rpx;
				//font-weight: bold;
			}
			view:nth-child(3) {
				flex: 1;
				color: #45D91E;
				text-align: right;
				//font-weight: bold;
				font-size: 24rpx;
			}
		}
	}
</style>