<template>
	<view :style="theme" class="dj_wrap">
		<view class="hj_paihangbg">
			<image src="/static/bonusCabinet/top.png"></image>
			<view>{{$t('ADDnew2.Rewards')}}</view>
		</view>
		<view>
			<!-- #ifdef H5 -->
			<vue-seamless-scroll :data="hotBaojiangList" :class-option="classOption" class="warp">
				<view class="ul-item">
					<view class="li-item" v-for="(item, index) in hotBaojiangList" :key="index" @click="Opengame(item,index)">
						<view class="games_tu">
							<img class="yx_tu" :src="item.path" alt="" />
						</view>
						<view class="info_wrap">
							<view class="user"><!-- <img :src="userav(item.headId)" /> --><span>{{formattedName(item.nickName)}}</span></view>
							<!-- <view class="game_name">{{item.gameName}}</view> -->
							<view class="info_boxs">
								<img class="jinbi" src="/static/image/currency_coins.png" v-if="platform == 8" mode="" />
								<img class="jinbi" src="/static/image/coin-yuan_cny.png" mode="" v-else-if="platform == 1 || platform == 5 || platform == 6" />
								<img class="jinbi" src="/static/image/jinbi-3.png" mode="" v-else />
								<view>{{(item.winLost/100).toFixed(2)}}</view>
							</view>
						</view>
					</view>
				</view>
			</vue-seamless-scroll>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import avatarList from "@/utils/avatar.js";
	// #ifdef H5
	import vueSeamlessScroll from 'vue-seamless-scroll'
	// #endif
	export default {
		name: "rollgrand-prix",
		components: {
			// #ifdef H5
			vueSeamlessScroll
			// #endif
		},
		props: {
			hotBaojiangList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				platform: this.PID,
				avatarlist: avatarList.avatarlist,
				avatar: '',
				listData: [],
				classOption: {
					step: 1, // 数值越大速度滚动越快
					//limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
					//hoverStop: true, // 是否开启鼠标悬停stop
					direction: 2, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					//singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					//singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					//waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				},
			};
		},
		created() {
			
		},
		methods: {
			formattedName(val) {
				// let newVal = val.slice(0, 8);
				// if(newVal.length <=2){
				// 	return '****';
				// }
				// if(newVal.length > 2){
				// 	return newVal.substring(0, 2) + new Array(newVal.length).join('*');
				// }
				
				const start = val.slice(0, 2)
				const end = val.slice(-4)
				return `${start}****${end}`
				
			},
			userav(data){
				let headId = data
				let tx = ''
				this.avatarlist.forEach((item, index) => {
					if (item.id == headId) {
						tx = item.img
					}
				});
				return tx
			},
			Opengame(data,idx){
				this.$emit('StartGames', data,idx)
			}
		}
	}
</script>

<style lang="scss">
	.dj_wrap {
		margin-top: 30px;
	}
	.hj_paihangbg {
		display: flex;
		align-items: center;
		padding: 0 0 24rpx 0;
		image {
			width: 46rpx;
			height: 46rpx;
			margin-right: 3px;
		}
		view {
			font-size: 16px;
			font-weight: bold;
			color: $me-text-color;
		}
	}
	.warp {
		width: 100%;
		height: auto;
		margin: 0 auto 10rpx;
		overflow: hidden;

		.ul-item {
			list-style: none;
			padding: 0;
			margin: 0 auto;
			display: flex;

				.li-item {
					width: 80px;
					height: 100%;
					margin: 0 10rpx;
					position: relative;
					// display: flex;
					// align-items: flex-start;
					background-color: $hot-jiangli-bg-color;
					border-radius: 20rpx;
					//padding: 20rpx;
					cursor: pointer;
					text-align: center;
					.games_tu {
						width: 80px;
						height: 100%;
						text-align: center;
						margin: 0 auto;
						.yx_tu {
							width: 100%;
							height: 100%;
							border-radius: 20rpx;
						}
					}
					
					.info_wrap {
						background-color: $hot-jiangli-bg-color;
						border-radius: 20rpx;
						padding: 0 15rpx 15rpx 15rpx;
						text-align: left;
						height: 100%;
						flex: 1;
						.user {
							margin-top: 0;
							margin-bottom: 6rpx;
							display: flex;
							align-items: center;
							font-size: 24rpx;
							font-weight: bold;
							span {
								color: $hot-jiangli-font-color;
							}
							img {
								width: 35rpx;
								height: 35rpx;
								border-radius: 200rpx;
								margin-right: 10rpx;
							}
						}
						.game_name {
							margin-top: 0;
							margin-bottom: 14rpx;
							font-size: 24rpx;
							color: #007aff;
							text-decoration: underline;
							text-decoration-color: #007aff;
							word-break:break-all;
							display:-webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							overflow:hidden;
						}
						.info_boxs {
							color: $hot-jiangli-font-color;
							font-size: 24rpx;
							font-weight: bold;
							display: flex;
							align-items: center;
							font-weight: bold;
							.jinbi {
								width: 28rpx;
								height: 28rpx;
								margin-right: 6rpx;
								position: relative;
								top: 0rpx;
							}
						}
					}
					
				}
		}
	}
	@media (min-width: 800px) {
		.warp {
			height: auto;
		}
		.warp .ul-item .li-item {
			width: 115px;
		}
		.warp .ul-item .li-item .games_tu {
			width: 115px;
		}
	}
</style>