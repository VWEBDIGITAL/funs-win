<template>
	<view :style="theme" class="page_boxs">
		
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('navBarTitle.QuestHub')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions">
		
		<pagesNavTitle ref="" :title="$t('navBarTitle.QuestHub')"></pagesNavTitle>
		
		
		<view class="page_wrap">

			<view class="tabs_box">
				<view class="tabs_item" v-for="(item,index) in tabsList" :key="index" @click="clicktabs(index)">
					<view class="item_name" :class="tabsidx == index?'xzuanzhong':''">{{item.name}}</view>
					<view class="item_mask" v-if="tabsidx == index"></view>
					<view class="item_border" v-if="tabsidx == index"></view>
				</view>
			</view>

			<view class="daojishi">
				<view>Expires in</view>
				<view class="dji"><u-count-down :timestamp="timestamp" :show-days="false" :show-border="false" font-size="30" color="#ffffff" bgColor="#1D262D" separator-color="#ffffff" border-color="#1D262D"></u-count-down></view>
			</view>

			<view class="ques_list">
				<view class="ques_list_item" v-for="(item,index) in 3" :key="index">
					<view class="CircleProgress">
						<view class="truue_jdt">
							<u-circle-progress width="96" border-width="6" bg-color="transparent" active-color="#3673D9" inactive-color="#2F4553" :percent="50">
								<view class="u-progress-content">
									<text class='u-progress-info'>50%</text>
								</view>
							</u-circle-progress>
						</view>
					</view>
					<view class="neirong">
						<view>Bet 10,000 on Win Win Fish Prawn Crab</view>
						<view>Reward <span>58.88</span></view>
					</view>
					<view class="aniu">GO</view>
				</view>
			</view>

		</view>
		</uni-transition>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOptions: true,
				tabsList: [{
					name: 'Daily Quests'
				}, {
					name: 'Weekly Quests'
				}],
				tabsidx: 0,
				timestamp: 8600,
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
				
			}
		},
		methods: {
			clicktabs(idx) {
				this.tabsidx = idx
			}
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		padding: 20rpx 20rpx;
	}

	.ques_list {
		.ques_list_item {
			display: flex;
			align-items: center;
			background-color: $all-secondary-color;
			padding: 30rpx 30rpx 30rpx 20rpx;
			border-radius: 12rpx;
			margin-bottom: 30rpx;
			.CircleProgress {
				.truue_jdt {
					.u-progress-content {
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #3673D9;
						border-radius: 200rpx;
						width: 63.19rpx;
						height: 63.19rpx;
						text-align: center;
					}
					.u-progress-info {
						font-size: 20rpx;
						text-align: center;
						color: $all-secondary-text-color;
					}
				}
			}

			.neirong {
				flex: 1;
				padding-left: 20rpx;
				view:nth-child(1){
					color: $font-all-color;
					font-size: 26rpx;
					margin-bottom: 10rpx;
				}
				view:nth-child(2){
					color: $font-all-color;
					span {
						color: #45D91E;
						//font-weight: bold;
						margin-left: 10rpx;
					}
				}
			}

			.aniu {
				width: 129.17rpx;
				height: 53.47rpx;
				line-height: 53.47rpx;
				margin-left: auto;
				background-color: #3673D9;
				color: #FEFEFE;
				text-align: center;
				border-radius: 6rpx;
			}
		}
	}

	.daojishi {
		margin: 20rpx 0;
		display: flex;
		align-items: center;

		view:nth-child(1) {
			color: $font-all-color;
		}

		.dji {
			margin: 0 20rpx;
			//font-weight: bold;
			position: relative;
			top: 2rpx;
		}
	}

	.tabs_box {
		border-radius: 12rpx 12rpx 0 0;
		border-bottom: 2px solid #2F4553;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 92rpx;
		position: relative;

		.tabs_item {
			flex: 1;
			position: relative;
			text-align: center;
			height: 92rpx;

			.item_name {
				width: 100%;
				color: $font-all-color;
				//font-weight: bold;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 9;
				font-size: 26rpx;
			}
			.xzuanzhong {
				color: #FEFEFE !important;
			}

			.item_mask {
				background-color: $all-secondary-color;
				height: 27px;
				width: 100%;
				background-image: linear-gradient(to top, rgb(34, 61, 82), rgb(13, 19, 28));
				border-radius: 0 0 0 0;
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 1;
			}

			.item_border {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 2px;
				background-color: #3673D9;
				z-index: 2;
			}
		}
	}
</style>