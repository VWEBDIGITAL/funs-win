<template>
	<view class="banquanbox">

		<view style="margin-top: 50rpx;"></view>
		<view class="wenan1" @click="userinfo">© 2024<!-- <span class="wangzhi2">{{removeCharLevel(LuoDidomain)}}</span> | -->{{$t('ADDnew.all')}}.</view>
		<!---<view class="wenan1">Stake is owned and operated by Medium Rare N.V., registration number: 145353, registered
			address: Korporaalweg 10, Willemstad, Curaçao. Contact us at support@stake.com.</view>
		<view class="wenan1">
			Payment agent company is Medium Rare Limited with address 7-9 Riga Feraiou, LIZANTIA COURT, Office 310,
			Agioi Omologites, 1087 Nicosia, Cyprus and Registration number: HE 410775</view>
			-->


	</view>
</template>

<script>
	export default {
		name: "copyright",
		data() {
			return {
				LuoDidomain: ''
			};
		},
		created() {
			
			// #ifdef H5
			this.LuoDidomain = window.location.hostname
			// #endif
		},
		methods: {
			removeCharLevel(value) {
				return value.replace(new RegExp('https://', 'g'), '');
			},
			userinfo(){
				uni.navigateTo({
					url: '/pages/SocketTest/SocketTest'
				})
			}
		}
	}
</script>

<style lang="scss">
	.wenan1 {
		margin-bottom: 30rpx;
		font-size: 22rpx;
		text-align: center;
		color: $font-all-color;
	}
	.wangzhi2 {
		margin: 0 8rpx 0 8rpx;
	}
	.banquanbox {
		padding: 0 32rpx;
		//background-color: $bottom-info-bg-color;
	}
</style>