<template>
	<view class="container" @tap="_click">
		<image :src="listItem.path" mode="widthFix" class="img" @load="imgLoaded" @error="imgLoaded"></image>
	</view>
</template>

<script>
	export default {
		props: {
			listItem: {
				type: [Object, String, Number, Array],
				default: ()=> { return {} }
			},
			type: {
				type: String,
				default: ''
			}
		},
		methods: {
			_click() {
				this.$emit("clickItemB",this.listItem)
			},
			imgLoaded() {
				this.$emit('imgLoaded')
			}
		}
	}
</script>

<style scoped>
	@import url("../css/box-sizing-border-box.css");
	.container{
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		overflow: hidden;
		//padding: 15rpx;
		background-color: transparent;
	}
	.image-box{
		width: 100%;
		position: relative;
		height: 0;
		padding-top: 100%;
	}
	.image{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx; 
	}
	.img{
		width: 100%;
		height: auto;
	}
	.text{
		font-size: 28rpx;
		color: #999999;
		margin-top: 25rpx;
	}
</style>
