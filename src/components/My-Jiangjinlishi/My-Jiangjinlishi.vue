<template>
	<view :style="theme">

		<view class="page_wrap">
			<view class="Commission_Ranking" v-if="BetsList2.length != 0">
				<view class="Ranking_title_sub">
					<view>{{$t('NEWReferpageB.REWARDTYPE')}}</view>
					<view>{{$t('NEWReferpageB.DATE')}}</view>
					<view>{{$t('NEWReferpageB.AMOUNT')}}</view>
				</view>
				<scroll-view scroll-y="true" style="height: 655rpx;">
					<view class="Ranking_lists" v-for="(item,index) in BetsList2" :key="index">
						<view v-if="item.type == 15">{{$t('NEWReferpageB.REWARDTYPE1')}}</view>
						<view v-if="item.type == 2">{{$t('NEWReferpageB.REWARDTYPE2')}}</view>
						<view>{{$u.timeFormat(item.time, 'yyyy/mm/dd')}}</view>
						<view>{{(item.income/100).toFixed(2)}}</view>
					</view>
				</scroll-view>
			</view>
			<view class="rewards__table" v-else>
				<image src="/static/image/NoOrders.png" mode="widthFix"></image>
				<view>NO Datas</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "My-Jiangjinlishi",
		data() {
			return {
				BetsList2: []
			};
		},
		created() {
			this.getLisst2()
		},
		methods: {
			getLisst2(){
				this.$u.post('/promotion/income/record', {
					
				}).then(res => {
					this.BetsList2 = res.data
				}).catch(err => {
				
				})
			}
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		
		.rewards__table {
			text-align: center;
			margin: 250rpx 0 0 0;
			color: #93acd3;
			font-weight: bold;
		
			image {
				width: 300rpx;
			}
		}
		
		.rewards__table_btn {
			width: 100%;
			background-color: #232b3a;
			text-align: center;
			color: #4d5b73;
			padding: 14rpx 0;
			border-radius: 6px;
		}
		
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
				color: #98abcf;
				text-align: left;
				font-size: 24rpx;
			}
			view:nth-child(2) {
				flex: 1;
				color: #98abcf;
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