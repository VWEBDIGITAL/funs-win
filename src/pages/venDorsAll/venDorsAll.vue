<template>
	<view :style="theme" class="page_boxs">
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('GameProviders')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->
			
			<pagesNavTitle ref="" :title="$t('GameProviders')"></pagesNavTitle>
			<view class='rec_bottom'>
				<uni-row :gutter="30" class="demo-uni-row">
					<uni-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" v-for="(itemk,indexk) in ProvidersList" :key="indexk">
						<view class="demo-layout" @click="togamesGongying(itemk)">
							<view class='jrsx_img'>
								<image :src="domains + '/vendorIcon/' + itemk.name + '.png'" mode="widthFix"></image>
							</view>
						</view>
					</uni-col>
				</uni-row>
			</view>
		<!-- </uni-transition> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOptions: true,
				ProvidersList: [],
				domains: ''
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				
			} else {
				
			}
			this.getVlist()
		},
		methods: {
			async getVlist(){
				let that = this
				const ress = await that.$u.post('/game/category', {});
				that.domains = ress.data.domain;
				that.ProvidersList = ress.data.vendors
				////console.log(ress.data.vendors)
			},
			togamesGongying(item){
				//////console.log(item)
				uni.navigateTo({
					url: '/pages/supplierGameList/supplierGameList?id=' + item.id + '&title=' + item.name
				})
			},
		}
	}
</script>

<style lang="scss">
	.rec_bottom {
		padding: 30rpx 20rpx;
		background-color: $body-bg-color !important;
		height: 100%;
		.demo-layout {
			width: 100%;
			margin-bottom: 25rpx;
			.jrsx_img {
				cursor: pointer;
				image {
					width: 100%;
					height: 40rpx;
					border-radius: 28rpx;
					background-color: $pupUp-title-border-color;
				}
			}
		}
	}
</style>