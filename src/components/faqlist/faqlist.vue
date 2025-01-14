<template>
	<view :style="theme">

		<view class="faq_list_wrap">
			<view class="faq_title">{{$t('VaultPage.F&Q')}}</view>
			<view class="faq_list_wrap_item">
				<u-collapse ref="collapseOne" arrow-color="#B1BAD3" :item-style="itemStyle" :head-style="headStyle" :body-style="bodyStyle">
					<u-collapse-item :title="item.Q" v-for="(item, index) in itemListS" :key="index" :open="item.open">
						{{item.A}}
					</u-collapse-item>
				</u-collapse>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "faqlist",
		props: {
			istype: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
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
					//backgroundColor: "#12171d",
					padding: "20rpx",
					borderRadius: "12rpx"
				},
				//itemListS: []
			};
		},
		computed: {
			itemListS() {
				let that = this
				if (that.istype == 'VaultPro') {
					return that.$t('VaultQ&A.FrequentlyAskedQuestions')
				}
				if (that.istype == 'vipClub') {
					return that.$t('VIPQ&A.FrequentlyAskedQuestions')
				}
				if (that.istype == 'ReferAndearn') {
					return that.$t('ReferQ&A.FrequentlyAskedQuestions')
				}
				if (that.istype == 'BonusFAQ') {
					return that.$t('BonusFAQ.FrequentlyAskedQuestions')
				}
			}
		},
		mounted() {
			let that = this
			////console.log(that.istype)
			/*if(that.istype == 'VaultPro') {
				that.itemList = that.$t('VaultQ&A.FrequentlyAskedQuestions')
			} else if(that.istype == 'vipClub') {
				that.itemList = that.$t('VIPQ&A.FrequentlyAskedQuestions')
			} else if(that.istype == 'ReferAndearn') {
				that.itemList = that.$t('ReferQ&A.FrequentlyAskedQuestions')
			}*/

			that.$nextTick(() => {
				setTimeout(() => {
					that.$refs.collapseOne.init();
				}, 500)
			});
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.faq_list_wrap {
		margin-top: 40rpx;
		padding-bottom: 40rpx;
		.faq_list_wrap_item {
			background-color: $all-secondary-color;
			padding: 20rpx;
			border-radius: 10rpx;
		}
		.faq_title {
			font-weight: bold;
			color: $font-all-color;
			font-size: 34rpx;
			margin-bottom: 15rpx;
		}
	}
</style>