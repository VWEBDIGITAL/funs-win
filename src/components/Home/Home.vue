<template>
	<view :style="theme" class="page_wrap">
		<view class="content_wrap">
			<view class="Providers_toosl">
				<view class="Providers_box">
					<yealuo-select value="" placeholder='请选择供应商' :binData="VendorsList" @getBackVal="getBackVal" ></yealuo-select>
				</view>
				<view class="col_box">
					<!--<view class="hotHover" @click="Clickhot()" :class="hotcos == true?'dise':''">
						<image src="/static/image/home/icons8-huo.png" mode="widthFix"></image>
					</view>-->
					<view class="sc" @click="topage('/pages/myfavoriteList/myfavoriteList')"><image src="/static/image/home/star_favorite.png" mode="widthFix"></image></view>
					<view class="ls" @click="topage('/pages/MyhistoryList/MyhistoryList')"><image src="/static/image/home/history_icon.png" mode="widthFix"></image></view>
					<view class="ss" @click="ToSousuo()"><image src="/static/image/home/search_110300.png" mode="widthFix"></image></view>
				</view>
			</view>
		</view>
		<signInPopup ref="signInShow"></signInPopup>
	</view>
</template>

<script>
	import yealuoInputs from '@/components/yealuo-select/yealuo-select.vue'
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		name: "Home",
		props: {
			VendorsList: {
				type: Array,
				default: []
			}
		},
		components: {
			cusSelects,
			yealuoInputs
		},
		data() {
			return {
				value: '',
				selectList: [],
				alias: {
					label: 'name',
					value: 'id'
				},
				close: false,
				
				hotcos: false
			};
		},
		methods: {
			change(e) {
				this.$emit('selectPro',e)
			},
			//选中值传（值可自定义，初始id与value用|分割，根据实际用途定义）
			getBackVal:function(e){
				this.$emit('selectPro',e)
			},
			topage(url){
				let token = uni.getStorageSync("token")
				if(!token){
					this.$refs.signInShow.openPopup(1)
				} else {
					uni.navigateTo({
						url: url
					})
				}
			},
			Tofavorite(){
				uni.navigateTo({
					url: '/pages/myfavoriteList/myfavoriteList'
				})
			},
			Tolishi(){
				uni.navigateTo({
					url: '/pages/MyhistoryList/MyhistoryList'
				})
			},
			ToSousuo(){
				uni.navigateTo({
					url: '/pages/searchFor/searchFor'
				})
			},
			Clickhot(){
				if(this.hotcos == false){
					this.hotcos = true
				} else {
					this.hotcos = false
				}
				this.$emit('clickHot',this.hotcos)
			}
		}

	}
</script>

<style lang="scss">
	.content_wrap {
		//background-color: #0d131c !important;
	}
	
	.page_wrap {
		padding: 0 20rpx 0 20rpx;
		z-index: 1;
	}
	
	.hotHover {
		border-radius: 12rpx;
		width: 100%;
		background-color: #1d2532;
		//background-image: linear-gradient(to left, #FF9619, #FFB930);
		//background-image: linear-gradient(to right, #548dff, #0c5eff);
		
		height: 78.47rpx;
		line-height: 78.47rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 10rpx;
		image {
			width: 25rpx;
		}
	}
	//.hotHover:active {
	//	background: linear-gradient(1turn,#c4003b .8%,#fb1949);
	//	box-shadow: 0 3px 16px #ff234180,inset 0 4px 3px #ffffff4d;
	//}
	.dise {
		background-color: $all-secondary-color !important;
	}
	
	.Providers_toosl {
		margin: 0 0 0 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.Providers_box {
			width: 420rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #1d2532;
			border-radius: 10rpx;
			padding: 30rpx 0 30rpx 0;
			height: 78.47rpx;
			line-height: 78.47rpx;
		}
		.col_box {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			.sc {
				border-radius: 12rpx;
				width: 100%;
				background-color: #1d2532;
				height: 78.47rpx;
				line-height: 78.47rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;
				image {
					width: 25rpx;
				}
			}
			.ls {
				border-radius: 12rpx;
				width: 100%;
				background-color: #1d2532;
				height: 78.47rpx;
				line-height: 78.47rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;
				image {
					width: 25rpx;
				}
			}
			.ss {
				border-radius: 12rpx;
				width: 100%;
				background-color: #1d2532;
				height: 78.47rpx;
				line-height: 78.47rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;
				image {
					width: 25rpx;
				}
			}
		}
	}

	
</style>