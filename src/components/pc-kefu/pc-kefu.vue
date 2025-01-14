<template>
	<view :style="theme">

		<uni-transition :mode-class="['fade', 'slide-right']" class="pc_kefu_style" :show="isShow_popup">
			<view class="isHover" v-if="isShow_popup">
				<view class="lefu_wrap">
					<view class="guanbi" @click="GuanBiBtn()">
						<u-icon name="close" color="#ffffff"></u-icon>
					</view>
					<iframe id="iframeId" class="WebviewStyle" :key="WebUrl" :src="WebUrl" style="width:100%;height: 100%;"></iframe>
				</view>
			</view>
		</uni-transition>

	</view>
</template>

<script>
	export default {
		name: "pc-kefu",
		data() {
			return {
				isShow_popup: false,
				styles: {
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: '17px',
					right: '8px'
				},
				WebUrl: ''
			};
		},
		created() {

		},
		methods: {
			openPopup(data) {
				var webUrl = data
				this.WebUrl = webUrl
				console.log('客服地址',webUrl)
				this.isShow_popup = true
			},
			closewindows() {
				this.isShow_popup = false
			},
			GuanBiBtn(){
				this.isShow_popup = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pc_kefu_style {
		width: 400px;
		max-width: 400px;
		height: 90%;
		position: fixed;
		bottom: 10px;
		z-index: 99999999;
		right: 10px;
		background-color: transparent;
		border-radius: 28rpx;
	}

	.isHover {
		width: 400px;
		background-color: transparent;
		position: relative;
		height: 100%;
	}
	.lefu_wrap {
		position: relative;
		height: 100%;
		border-radius: 28rpx;
		.WebviewStyle {
			background-color: #ffffff;
			width: 100%;
			border-radius: 28rpx;
			height: 100%;
			border: none;
		}
	}
	.guanbi {
		position: absolute;
		right: 0px;
		top: 5px;
		z-index: 99999;
		cursor: pointer;
		border-radius: 18rpx 0 0 18rpx;
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.u-icon {
			font-size: 38rpx;
			cursor: pointer;
		}
	}
</style>