<template>
	<view :style="theme">
		<view class="showHidden" :style="{ maxHeight: showDisplay ? centerHeight : defaultHeight }">
			<view id="centerBox">
				<view class="hide-preCode-box" :style="{ height: showDisplay ? '0' : vagueHeight,}"></view>
				<slot />
			</view>
		</view>
		<view class="unfold" @click="changeShowDisplay">
			<text>{{ showDisplay ? hideText : showText }}</text>
			<image class="unfold-icon" :src="showDisplay ? hideIcon : showIcon"></image>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			itiemid: {
				type: [Number,String],
				default: 0
			},
			//展开文字内容
			showText: {
				type: String,
				default: '展开更多',
			},
			//收起文字内容
			hideText: {
				type: String,
				default: '收起',
			},
			//默认显示高度
			defaultHeight: {
				type: String,
				default: '300rpx',
			},
			//是否可以展开
			canShow: {
				type: Boolean,
				default: true,
			},
			//模糊显示高度
			vagueHeight: {
				type: String,
				default: '200rpx',
			},
			//展开图标
			showIcon: {
				type: String,
				default: require('../../static/down.png'),
			},
			//收起图标
			hideIcon: {
				type: String,
				default: require('../../static/up.png'),
			},
		},
		data() {
			return {
				showDisplay: false,
				centerHeight: 0,
			};
		},
		mounted() {
			
		},
		created() {
			
		},
		updated() {
			this.int()
		},
		methods: {
			int(){
				this.$nextTick(() => {
					let view = uni.createSelectorQuery().in(this).select("#centerBox");
					view.boundingClientRect(res => {
						this.centerHeight = res ? this.px2rpx(res.height) + 'rpx' : '';
					}).exec()
				})
			},
			px2rpx(px) {
				const systemInfo = uni.getSystemInfoSync()
				return px / (systemInfo.screenWidth / 750)
			},
			changeShowDisplay() {
				if (!this.canShow) return
				this.showDisplay = !this.showDisplay
				this.$emit('change', this.itiemid)
			},
		},
	};
</script>

<style lang="scss" scoped>
	.showHidden {
		overflow: hidden;
		transition: max-height 0.5s, opacity 0.5s;
		position: relative;
	}

	.hide-preCode-box {
		width: 100%;
		//background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), to(#fff));
		//background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}

	.unfold {
		text-align: center;
		height: 44rpx;
		font-size: 28rpx;
		color: $font-all-color;
		line-height: 44rpx;
		margin: 15rpx 0 0 0;
		display: flex;
		justify-content: flex-end;
		font-size: 24rpx;

		.unfold-icon {
			width: 28rpx;
			height: 28rpx;
			margin: auto 0;
		}
	}
</style>