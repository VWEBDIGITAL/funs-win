<template>
	<view :style="theme" class="page_boxs">

		
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="title" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		<!-- <uni-transition class="page_baoguo" :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->

			<pagesNavTitle ref="" :title="title"></pagesNavTitle>

			<view class="wenan" v-if="istype == 1">{{$t('Privacypolicy.describe')}}</view>
			<view class="wenan" v-if="istype == 2">{{$t('LiCenses.describe')}}</view>
			
			<view class="wenan" v-if="istype == 3">{{$t('AML.describe1')}}</view>
			<view class="wenan" v-if="istype == 3">{{$t('AML.describe2')}}</view>
			<view class="wenan" v-if="istype == 3">{{$t('AML.describe3')}}</view>
			
			<view class="wenan" v-if="istype == 4">{{$t('termsofService.describe')}}</view>
			
			<view class="wenan" v-if="istype == 5">{{$t('Responsiblegambling.describe')}}</view>

		<!-- </uni-transition> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOptions: true,
				title: ''
			}
		},
		onLoad(ops) {
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			let title = ops.title
			this.title = title
			this.istype = ops.type
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.wenan {
		color: $font-all-color;
		padding: 30rpx;
		white-space: pre-wrap;
		background-color: $body-bg-color;
	}
	.page_boxs {
		background-color: $body-bg-color;
	}
</style>