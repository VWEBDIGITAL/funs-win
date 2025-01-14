<template>
	<view :style="theme">
		<movable-area class="movable-area" :scale-area="false">
			<movable-view class="movable-view" :class="!isRemove?'animation-info':''" style="pointer-events: auto;"
				@click="clickBtn" @touchstart="touchstart" @touchend="touchend" @change="onChange" direction="all"
				inertia="true" :x="x" :y="y" :disabled="disabled" :out-of-bounds="true" :damping="200" :friction="100">
				<slot></slot>
			</movable-view>
		</movable-area>
		
		
		<!-- <movable-area>
			<movable-view :x="x" :y="y" direction="all" @click="clickBtn" @change="onChange">
				<slot></slot>
			</movable-view>
		</movable-area> -->
		
		
	</view>
</template>

<script>
	export default {
		props: {
			//是否禁用拖动
			disabled: {
				type: Boolean,
				default: false
			},
			//是否自动停靠
			canDocking: {
				type: Boolean,
				default: true
			},
			//按钮默认位置离底部距离（px）
			bottomPx: {
				type: [Number,String],
				default: 0
			},
			//按钮默认位置离右边距离（px）
			rightPx: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				left: 0,
				top: 0,
				isRemove: true,
				windowWidth: 0,
				windowHeight: 0,
				btnWidth: 0,
				btnHeight: 0,
				
				
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0
				},
				
			};
		},
		mounted() {
			this.getSysInfo()
		},
		methods: {
			
			// tap: function(e) {
			// 	this.x = this.old.x
			// 	this.y = this.old.y
			// 	this.$nextTick(function() {
			// 		this.x = 30
			// 		this.y = 30
			// 	})
			// },
			// onChange: function(e) {
			// 	this.old.x = e.detail.x
			// 	this.old.y = e.detail.y
			// },
			
			getSysInfo() {
				// let sysInfo = uni.getSystemInfoSync()
				// this.windowWidth = sysInfo.windowWidth
				// this.windowHeight = sysInfo.windowHeight
				// let view = uni.createSelectorQuery().in(this).select(".movable-view")
				// view.boundingClientRect(rect => {
				// 	this.btnWidth = rect.width
				// 	this.btnHeight = rect.height
				// 	this.x = this.old.x
				// 	this.y = this.old.y
				// 	this.$nextTick(res => {
				// 		this.x = this.windowWidth - this.btnWidth - this.rightPx
				// 		this.y = this.windowHeight - this.btnHeight - this.bottomPx
				// 	})
				// }).exec()
			},
			//移动按钮
			onChange(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			//开始移动
			touchstart(e) {
				this.isRemove = true
			},
			//结束移动
			touchend(e) {
				if (this.canDocking && this.old.x) {
					this.x = this.old.x
					this.y = this.old.y
					let bWidth = (this.windowWidth - this.btnWidth) / 2
					if (this.x < 0 || (this.x > 0 && this.x <= bWidth)) {
						this.$nextTick(res => {
							this.x = 0
						})
					} else {
						this.$nextTick(res => {
							this.x = this.windowWidth - this.btnWidth
						})
					}
					this.isRemove = false
				}
			},
			//点击按钮
			clickBtn() {
				this.$emit('clickBtn')
				//////console.log('点了吗')
			}
		}
	};
</script>

<style scoped lang="scss">
	
	/deep/ uni-movable-view {
		top: 68px !important;
	}
	
	.movable-view {
		width: 100rpx;
		height: 100rpx;
		background: linear-gradient(360deg, #287BF8 0%, #6EA8FF 100%);
		box-shadow: 0px 4rpx 12rpx 0px #ADC3F8;
		border-radius: 50rpx;
		color: $all-secondary-text-color;
		font-size: 26rpx;
		touch-action: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.animation-info {
		transition: left .25s ease;
	}

	.movable-area {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999999 !important;
		pointer-events: none;
	}
</style>
