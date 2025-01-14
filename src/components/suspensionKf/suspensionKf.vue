<template>
	<view :style="theme">
		<view class="bubbles_chat_icon" @click="getUrl()">
			<view class="bubbles_chat_icon_item">
				<image src="/static/image/bubbles_chat_icon.png"></image>
			</view>
		</view>
		<signInPopup ref="signInShow"></signInPopup>
	</view>
</template>

<script>
	export default {
		name: "suspensionKf",
		data() {
			return {

			};
		},
		created() {
			
		},
		methods: {
			getUrl() {
				let that = this
				const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
				that.$u.post('/game/chat', {
					pid: this.PID,
					lang: language
				}).then(res => {
					let chatUrl = res.data.chatUrl
					
					// #ifdef APP-PLUS
					plus.runtime.openURL(chatUrl);
					// #endif
					
					// #ifdef H5
					// let url_ = '/pages/chatWebview/chatWebview?url=' + encodeURIComponent(JSON.stringify(chatUrl))
					// if (url_.indexOf('%') > -1) {
					// 	url_ = url_.replace(/%/g, '%25');
					// }
					setTimeout(() => {
						window.open(chatUrl, '_blank');
					}, 500)
					let windowWidth = uni.getSystemInfoSync().windowWidth
					if (windowWidth >= "800") {
						uni.$emit('OpenPCKefu', chatUrl);
					} else {
						uni.navigateTo({
							url: url_
						})
					}
					// #endif
				})
			},
			Topage() {
				let isToken = uni.getStorageSync("token")
				if (!isToken) {
					this.$refs.signInShow.openPopup()
				} else {
					this.getUrl()
				}
			}
		}
	}
</script>

<style lang="scss">
	.bubbles_chat_icon {
		position: fixed;
		right: 35rpx;
		bottom: 12%;

		.bubbles_chat_icon_item {
			background-color: #3673D9;
			border-radius: 8rpx;
			width: 45px;
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
	}
</style>