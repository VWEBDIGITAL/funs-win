<template>
	<view :style="theme">
		<view
			id="_drag_button"
			class="drag"
			:style="'left: ' + left + 'px; top:' + top + 'px;'"
			@touchstart="touchstart"
			@touchmove.stop.prevent="touchmove"
			@touchend="touchend"
			@click.stop.prevent="click"
			:class="{transition: isDock && !isMove }"
		>
		
			<view class="game_ananiu">
				<image :src="data.path"></image>
				<view class="hottag"><u-icon name="/static/image/huo.png" size="28" color="#f00"></u-icon>{{data.gameName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'drag-button',
		props: {
			data: {
				type: Object,
				default: {}
			},
			isDock:{
				type: Boolean,
				default: false
			},
			existTabBar:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				top:0,
				left:0,
				width: 0,
				height: 0,
				offsetWidth: 0,
				offsetHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				isMove: true,
				edge: 10,
				text: '按钮'
			}
		},
		mounted() {
			const sys = uni.getSystemInfoSync();
			
			this.windowWidth = sys.windowWidth;
			this.windowHeight = sys.windowHeight;
			
			// #ifdef APP-PLUS
				this.existTabBar && (this.windowHeight -= 50);
			// #endif
			if (sys.windowTop) {
				this.windowHeight += sys.windowTop;
			}
			console.log(sys)
			
			const query = uni.createSelectorQuery().in(this);
			query.select('#_drag_button').boundingClientRect(data => {
				console.log(data)
				this.width = data.width;
				this.height = data.height;
				this.offsetWidth = data.width / 2;
				this.offsetHeight = data.height / 2;
				this.left = this.windowWidth - this.width - this.edge;
				this.top = this.windowHeight - this.height - 450;
			}).exec();
		},
		methods: {
			click() {
				this.$emit('btnClick');
			},
			touchstart(e) {
				this.$emit('btnTouchstart');
			},
			touchmove(e) {
				// 单指触摸
				if (e.touches.length !== 1) {
					return false;
				}
				
				this.isMove = true;
				
				this.left = e.touches[0].clientX - this.offsetWidth;
				
				let clientY = e.touches[0].clientY - this.offsetHeight;
				// #ifdef H5
					clientY += this.height;
				// #endif
				let edgeBottom = this.windowHeight - this.height - this.edge;

				// 上下触及边界
				if (clientY < this.edge) {
					this.top = this.edge;
				} else if (clientY > edgeBottom) {
					this.top = edgeBottom;
				} else {
					this.top = clientY
				}
				
			},
			touchend(e) {
				if (this.isDock) {
					let edgeRigth = this.windowWidth - this.width - this.edge;
					
					if (this.left < this.windowWidth / 2 - this.offsetWidth) {
						this.left = this.edge;
					} else {
						this.left = edgeRigth;
					}
					
				}
				
				this.isMove = false;
				
				this.$emit('btnTouchend');
			},
		}}
</script>

<style lang="scss">
	.game_ananiu {
		position: relative;
		animation: bounce 3s infinite;
		text-align: center;
		.hottag {
			position:absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			//width: 100rpx;
			border-radius: 200rpx;
			background: linear-gradient(1turn, #2c62f4 0.8%, #1398f9);
			color: #fff;
			left: 0;
			bottom: -10rpx;
			right: 0;
			margin: 0 auto;
			text-align: center;
			padding: 6rpx 6rpx 6rpx 0;
			font-size: 20rpx;
			.u-icon {
				position: relative;
				top: -2rpx;
			}
		}
		image {
			width: 110rpx;
			height: 110rpx;
			border-radius: 200rpx;
			border: 2px solid #ffffff;
			margin: 0 auto;
		}
	}
	@keyframes bounce {
	  0%, 100% {
	    transform: translateY(0);
	  }
	  50% {
	    transform: translateY(-10px);
	  }
	}
	.drag {
		display: flex;
		justify-content: center;
		align-items: center;
		//background: linear-gradient(1turn, #2c62f4 0.8%, #1398f9);
		//box-shadow: 0 0 6upx rgba(0, 0, 0, 0.4);
		//color: $uni-text-color-inverse;
		// width: 100rpx;
		// height: 100rpx;
		border-radius: 50%;
		//font-size: $uni-font-size-sm;
		position: fixed;
		z-index: 997;
		
		&.transition {
			transition: left .3s ease,top .3s ease;
		}
	}
	
</style>
