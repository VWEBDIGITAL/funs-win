<template>
	<view :style="theme">

		<!-- <u-popup v-model="isShow" mode="bottom" length="60%" border-radius="34" :closeable="true"> -->
		<view class="zhezhaoceng" v-if="isShow" @click="isShow = false"></view>
		<view class="hb_wrap" v-if="isShow">
			<!-- <view class="xzhb_title">选择货币</view> -->
			<view class="hb_wrap_item_box">
				<view class="sanjiaoxing"></view>
				<scroll-view :scroll-y="true" class="scrollview-box-bottom">
					<view v-for="(item,index) in JiaMiHbList" class="floor-item" :key="index">
						<view class="mask-box" :class="[curIndex == index?'xzBgColor':'']">
							<view class="text-box" @click="xuanze(item,index)">
								<view class="title">
									
									
									<image v-if="item.type == 999" src="/static/image/currency_coins.png"></image>
									<image v-else-if="item.type == 444" src="/static/image/coin-yuan_cny.png"></image>
									<image v-else-if="item.type == 555" src="/static/image/jinbi-3.png"></image>
									
									<image v-else :src="staticDname + '/pay/' + item.abbr + '.png'"></image>
									
									<span>{{item.abbr}}</span>
								</view>
								<view class="subtitle">
									<u-icon name="checkmark-circle-fill" color="#2283f6" size="38" v-if="curIndex == index"></u-icon>
									<u-icon name="checkmark-circle" color="#374558" size="38" v-else></u-icon>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				
				<view class="yjshcaoz">
					<!-- <view class="yjshts">{{$t('yjhsBtn')}}</view> -->
					<view class="Register_btn">
						<u-button type="primary" :loading="isDisabledTwo" @click="YiJianShouHui()">{{$t('yjhs')}}</u-button>
					</view>
				</view>

			</view>
		</view>
		<!-- </u-popup> -->

	</view>
</template>

<script>
	export default {
		name: "Select-currency",
		data() {
			return {
				isDisabledTwo: false,
				
				isShow: false,
				JiaMiHbList: [],
				currency_rate: 0,
				staticDname: '',
				curIndex: 0,
				curDatas: {},
				platform: this.PID,
			};
		},
		methods: {
			YiJianShouHui(){
				this.isShow = false
				//this.isDisabledTwo = true
				//setTimeout(()=>{
					//this.isDisabledTwo = false
					this.$emit("yjzhJinbi", 1)
				//},1000)
			},
			openShow() {
				let that = this
				that.isShow = true
				that.init()
			},
			GuanbiShow() {
				let that = this
				that.isShow = false
			},
			init() {
				let that = this
				that.staticDname = uni.getStorageSync('Musicdomains');
				that.getCurrencyList()
			},
			getCurrencyList() {
				let that = this
				that.$u.post('/recharge/channel', {}).then(res => {

					console.log('货币', res.data)
					
					
					let arry = []
					
					if(that.platform == 8 || that.platform == 10 || that.platform == 11){
						arry = [{
							abbr: "USD",
							currency_rate: 1,
							digits: 456,
							id: 321,
							mark: "$",
							methods: [],
							name: "默认USD",
							type: 999
						}]
					} else if(that.platform == 1 || that.platform == 5 || that.platform == 6){
						arry = [{
							abbr: "CNY",
							currency_rate: 1,
							digits: 789,
							id: 987,
							mark: "¥",
							methods: [],
							name: "默认CNY",
							type: 444
						}]
					} else {
						arry = [{
							abbr: "PHP",
							currency_rate: 1,
							digits: 456,
							id: 321,
							mark: "₱",
							methods: [],
							name: "默认PHP",
							type: 555
						}]
					}
					
					res.data.forEach((item, index) => {
						arry.push({
							abbr: item.abbr,
							currency_rate: item.currency_rate,
							digits: item.digits,
							id: item.id,
							mark: item.mark,
							methods: item.methods,
							name: item.name,
							type: item.type,
						})
					});
					
					
					that.JiaMiHbList = arry

					//设置默认第一个的汇率
					that.currency_rate = res.data[0].currency_rate
					that.curIndex = uni.getStorageSync("SelectCurrencyIndex");
				})
			},
			xuanze(data, idx) {
				this.curIndex = idx
				this.curDatas = data

				//存入缓存中已选择的货币
				uni.setStorageSync("SelectCurrencyIndex", idx);
				uni.setStorageSync("SelectCurrency", data);
				//执行更新顶部货币
				this.$emit("UpSelectCurrency", data);

				this.isShow = false
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .u-drawer-bottom {
		background-color: #121a24 !important;
	}
	
	.yjshcaoz {
		//border-top: 1px solid #384356;
		padding: 10rpx 0;
		.yjshts {
			font-size: 20rpx;
			text-align: center;
			margin: 15rpx 0;
		}
		.Register_btn {
			uni-button {
				height: 77rpx !important;
				line-height: 77rpx !important;
				font-size: 24rpx;
			}
		}
	}

	.zhezhaoceng {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: #00000000;
		z-index: 99999999;
	}

	.scrollview-box-bottom {
		max-height: 600rpx;
		position: relative;
		z-index: 3;
	}

	.hb_wrap {
		width: 180px;
		position: absolute;
		padding: 10px 10px;
		background-color: $wallet-edithb;
		left: -10px;
		top: 40px;
		border-radius: 12px;
		z-index: 999999999;

		.hb_wrap_item_box {
			position: relative;
			width: 100%;

			.sanjiaoxing {
				background-color: $wallet-edithb;
				width: 20px;
				height: 20px;
				border-radius: 5px;
				position: absolute;
				top: -16px;
				left: 0;
				z-index: 2;
				transform: rotate(45deg);
			}
		}

		.xzhb_title {
			font-weight: bold;
			color: $all-secondary-text-color;
			font-size: 34rpx;
			padding: 10px 0 20px 0;
		}

		.floor-item {
			width: 100%;
		}

		.mask-box {
			width: 100%;
			margin-bottom: 8px;
			padding: 20rpx;
			border-radius: 20rpx;
			//background: #18212c;
			color: #9ea3ae;
			font-weight: bold;
			font-size: 30rpx;
		}

		.xzBgColor {
			background: $wallet-edithbitem !important;
			color: $me-text-color !important;
		}

		.text-box {
			display: flex;
			align-items: center;
		}

		.title {
			font-size: 28rpx;
			display: flex;
			align-items: center;

			image {
				width: 45rpx;
				height: 45rpx;
				border-radius: 100px;
			}

			span {
				margin: 0 0 0 15rpx;
			}
		}

		.subtitle {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: auto;

			.u-icon {
				font-size: 38rpx;
			}
		}
	}
</style>