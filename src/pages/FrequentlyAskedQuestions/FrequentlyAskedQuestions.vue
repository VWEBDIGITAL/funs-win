<template>
	<view :style="theme" class="page_boxs">
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('HelpCenter')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->
		
		<pagesNavTitle ref="" :title="$t('HelpCenter')"></pagesNavTitle>
		
		<view class="page_wrap">
			<view class="faq_list_wrap">
				<view class="faq_title">
					<text>{{$t('VaultPage.F&Q')}}</text>
					<image src="/static/image/arrow_right_icon.png"></image>
				</view>
				<view class="faq_list_wrap_item">
					<u-collapse ref="collapseOne" arrow-color="#B1BAD3" :item-style="itemStyle" :head-style="headStyle" :body-style="bodyStyle">
						<u-collapse-item :title="item.Q" v-for="(item, index) in itemList" :key="index" :open="item.open">
							{{item.A}}
						</u-collapse-item>
					</u-collapse>
				</view>
			</view>
		</view>
		<!-- </uni-transition> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOptions: true,
				itemStyle: {
					borderBottom: "0px solid hsla(0,0%,100%,.15)",
					padding: '0 0'
				},
				headStyle: {
					//color: "#8b97ab",
					//backgroundColor: "#1d2633",
					margin: "10rpx 0",
					padding: "30rpx 16rpx",
					borderRadius: "12rpx"
				},
				bodyStyle: {
					//color: "#8b97ab",
					padding: "0 0 20rpx 0",
					//backgroundColor: "#151c23",
					padding: "20rpx",
					borderRadius: "12rpx"
				},
				itemList: this.$t('helpCenter.Helpcenter'),

			}
		},
		onLoad() {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			that.$nextTick(() => {
				setTimeout(() => {
					that.$refs.collapseOne.init();
				}, 500)
			});
		},
		mounted() {
			
		},
		onShow() {
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
			
			} else {
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
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
		background-color: $body-bg-color !important;
	}

	.faq_list_wrap {
		
		.faq_list_wrap_item {
			background-color: $all-secondary-color;
			padding: 20rpx;
			border-radius: 10rpx;
		}

		.faq_title {
			color: $font-all-color;
			margin-bottom: 15rpx;
			background-color: $all-secondary-color;
			padding: 20rpx;
			border-radius: 10rpx;
			display: inline-flex;
			align-items: center;
			justify-content: space-between;
			font-weight: bold;
			image {
				width: 10rpx;
				height: 20rpx;
				transform: rotate(180deg);
				margin-left: 14rpx;
			}
		}
	}
</style>
