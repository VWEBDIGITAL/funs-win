<template>
	<view :style="theme">

		<u-popup v-model="RejectShow" width="650" mode="center" close-icon-size="30" border-radius="14"
			:mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="RejectShow = false">
				<view>{{$t('OrderProgerss.title')}}</view>
			</view>
			<view class="input_box">

				<view class="Rank_wrap">
					<view class="Rank_box">
						<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8" mode="widthFix"></image>
						<image class="rank_icon" src="/static/image/coin-yuan_cny.png" mode="widthFix" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
						<image class="rank_icon" src="/static/image/jinbi-3.png" mode="widthFix" v-else></image>
						<view class="Rank_box_left">
							<view class="total_num">{{(Datas.amount/100).toFixed(2)}}</view>
						</view>
					</view>
					<view class="Rank_list">
						<view class="Rank_list_item">
							<view>{{$t('OrderProgerss.status')}}</view>
							<view class="left_val">
								
								<!--
								5未支付
								10准备付款
								15订单失败
								18成功
								
								
								6人工审核
								14已驳回
								16已拒绝
								-->
								
								
								<!--
								4.机器审核
								5.未支付
								6.人工审核
								7.二审过通
								8.机审通过
								9.取消订单
								10.准备付款
								11.准备退款
								12.退款中
								13.已退款
								14.已驳回
								15.订单失败
								16.已拒绝
								18.成功 
								-->
								
								<!--
								充值：10是灰色，15是红色，18是绿色 
								提现：6、10是灰色，14、15、16都是失败红色，18是绿色
								-->
								
								
								<view v-if="Datas.status == 5"><span class="huise"></span>{{$t('DetailsPage.Status1')}}</view>
								
								<view v-if="Datas.status==10"><span class="huise"></span>{{$t('DetailsPage.Status1')}}</view>
								
								<view v-if="Datas.status==15"><span class="hongse"></span>{{$t('DetailsPage.Status2')}}</view>
								
								<view v-if="Datas.status==18"><span class="lvse"></span>{{$t('DetailsPage.Status3')}}</view>
								
								<view v-if="Datas.status==6"><span class="huise"></span>{{$t('DetailsPage.Status4')}}</view>
								
								<view v-if="Datas.status==14"><span class="hongse"></span>{{$t('DetailsPage.Status6')}}</view>
								
								<view v-if="Datas.status==16"><span class="hongse"></span>{{$t('DetailsPage.Status7')}}</view>
								
								
								
							</view>
						</view>
						<view class="line"></view>
						<view class="Rank_list_item">
							<view>{{$t('OrderProgerss.time')}}</view>
							<view class="left_val">
								<view>{{Datas.orderTime}}</view>
							</view>
						</view>
						<view class="line"></view>
						<view class="Rank_list_item">
							<view>{{$t('OrderProgerss.OrderID')}}</view>
							<view class="left_val">
								<view>{{Datas.orderId}}<image @click="copy(Datas.orderId)" src="/static/image/fuzhi_icon.png"></image>
								</view>
							</view>
						</view>
						<view class="line"></view>
						<view class="Rank_list_item">
							<view>{{$t('OrderProgerss.PayPe')}}</view>
							<view class="left_val">
								
								<view v-if="Datas.method == 1">USDT</view>
								<view v-if="Datas.method == 2">PIX</view>
								<view v-if="Datas.method == 3">Gcash</view>
								<view v-if="Datas.method == 4">Maya</view>
								<view v-if="Datas.method == 5">Bank</view>
								
							</view>
						</view>
					</view>
				</view>

				<!--<view class="Attention_box">
					<view class="Attention_box_title">驳回原因:</view>
				</view>-->
				<view class="Attention_box_info">
					<u-time-line>
						
						
						
						
						
						
						
						
						
						
						<u-time-line-item nodeTop="-2" bg-color="" style="margin-bottom: 70rpx;">
							<template v-slot:left>
								<view class="line_box"></view>
							</template>
							<!-- 此处自定义了左边内容，用一个图标替代 -->
							<template v-slot:node>
								<view class="u-node" style="background: #45d91e;">
									<!-- 此处为uView的icon组件 -->
									<u-icon name="checkmark" color="#fff" :size="22"></u-icon>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-title">{{$t('OrderProgerss.TOP1')}}</view>
									<view class="u-order-time"><u-icon name="clock" color="#7b98bf" :size="24"></u-icon>{{Datas.orderTime}}</view>
								</view>
							</template>
						</u-time-line-item>
						
						
						
						
						
						
						
						
						
						
						
						
						
						<u-time-line-item nodeTop="-2" bg-color="" style="margin-bottom: 70rpx;">
							
							<template v-slot:left>
								<view class="line_box2" v-if="Datas.status == 6 || Datas.status == 5 || Datas.status == 10 || Datas.status == 15 || Datas.status == 16 || Datas.status == 14"></view>
								<view class="line_box" v-else></view>
							</template>
							
							<template v-slot:node>
									
									<!--
									5未支付
									18成功
									15订单失败
									6人工审核
									10准备付款
									18成功
									14已驳回
									16已拒绝
									-->
									<view class="u-node" style="background: #45d91e;" v-if="Datas.status == 5 || Datas.status == 10">
										<u-icon name="reload" color="#fff" :size="20"></u-icon>
									</view>
									<view class="u-node" style="background: #45d91e;" v-else-if="Datas.status == 18">
										<u-icon name="checkmark" color="#fff" :size="20"></u-icon>
									</view>
									<view class="u-node" style="background: #45d91e;" v-else-if="Datas.status == 6">
										<u-icon name="reload" color="#fff" :size="20"></u-icon>
									</view>
									<view class="u-node" style="background: #45d91e;" v-else-if="Datas.status == 14 || Datas.status == 15 || Datas.status == 16">
										<u-icon name="checkmark" color="#fff" :size="20"></u-icon>
									</view>
									
									
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-title">{{$t('OrderProgerss.TOP2')}}</view>
									<view class="u-order-desc">{{$t('OrderProgerss.tip1')}}</view>
									<view class="u-order-time"><u-icon name="clock" color="#7b98bf" :size="24"></u-icon>
										<span v-if="!Datas.auditTime || !Datas.callTime || Datas.auditTime == '0001-01-01 00:00:00' || Datas.callTime == '0001-01-01 00:00:00'">{{Datas.orderTime}}</span>
										<span v-else>{{Datas.auditTime}}</span>
									</view>
								</view>
							</template>
						</u-time-line-item>
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						<!--
						5未支付
						18成功
						15订单失败
						6人工审核
						10准备付款
						18成功
						14已驳回
						16已拒绝
						-->
						<u-time-line-item nodeTop="-2" bg-color="">
							<template v-slot:node>
								
								<view class="u-node" style="background: #2f4553;" v-if="Datas.status == 15 || Datas.status == 16 || Datas.status == 14">
									<u-icon name="close" color="#878e92" :size="17"></u-icon>
								</view>
								<view class="u-node" style="background: #45d91e;" v-else-if="Datas.status == 18">
									<u-icon name="checkmark" color="#fff" :size="17"></u-icon>
								</view>
								<view class="u-node" style="background: #2f4553;" v-else-if="Datas.status == 6 || Datas.status == 5 || Datas.status == 10">
									3
								</view>
								
							</template>
							<template v-slot:content>
								
								
								<!--驳回原因-->
								<view v-if="Datas.status == 14 || Datas.status == 16">
									<view class="u-order-title">{{$t('OrderProgerss.TOP3b')}}</view>
									<view class="u-order-desc">{{Datas.rejectReason}}</view>
									<view class="u-order-time"><u-icon name="clock" color="#7b98bf" :size="24"></u-icon>{{Datas.callTime}}</view>
								</view>
								<view v-else-if="Datas.status == 18">
									<view class="u-order-title">{{$t('OrderProgerss.TOP3')}}</view>
									<view class="u-order-time"><u-icon name="clock" color="#7b98bf" :size="24"></u-icon>{{Datas.callTime}}</view>
								</view>
								<view v-else-if="Datas.status == 5 || Datas.status == 6 || Datas.status == 10">
									<view class="u-order-title">{{$t('OrderProgerss.TOP3')}}</view>
								</view>
								<view v-else-if="Datas.status == 15">
									<view class="u-order-title">{{$t('OrderProgerss.TOP3b')}}</view>
									<view class="u-order-time"><u-icon name="clock" color="#7b98bf" :size="24"></u-icon>{{Datas.callTime}}</view>
								</view>
								
								
							</template>
						</u-time-line-item>
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
					</u-time-line>
				</view>

				<view class="Register_btn">
					<u-button type="primary" @click="TochatUrl()">{{$t('sidebar.title10')}}</u-button>
				</view>

			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "Reject-Popup",
		props: {

		},
		data() {
			return {
				platform: this.PID,
				RejectShow: false,
				Datas: {}
			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			
		},
		mounted() {

		},
		methods: {
			openPopup(data) {
				//console.log('订单详情',data)
				this.Datas = data
				this.RejectShow = true
			},
			closewindows() {
				this.RejectShow = false
			},
			TochatUrl() {
				let that = this
				
				this.RejectShow = false
				this.$emit('guanbiPCmyDetailsPopup',1);
				
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
					
					//如果在游戏中需要先关闭游戏跳转到首页再进行进入客服页面
					//导航栏金币显示
					// uni.$emit('OpeninGames', 0);
					// that.$u.post('/transfer-out-balance', {
						
					// }).then(res => {
					// 	//刷新用户余额
					// 	uni.$emit('getgetMybalance', 1);
						
					// 	uni.navigateTo({
					// 		url: url_
					// 	})
					// });
				})
			},
			copy(text) {
				let that = this
				uni.setClipboardData({
					data: text, // 设置要复制的文本内容
					showToast: false,
					success(res) {
						////console.log("成功复制到剪贴板");
						uni.showToast({
							title: that.$t('Betting requirements.register7'),
							icon: 'none',
							duration: 3000
						})
					},
					fail(err) {
						console.error("复制失败", err);
					}
				});
			}





		}
	}
</script>

<style lang="scss">
	
	.line_box {
		position: absolute;
		top: 28rpx;
		left: -42rpx;
		height: 77px;
		width: 2px;
		background-color: #45d91e;
	}
	
	.line_box2 {
		position: absolute;
		top: 28rpx;
		left: -42rpx;
		height: 77px;
		width: 2px;
		background-color: #2f4553;
	}
	
	
	.Attention_box {
		.Attention_box_title {
			color: #f04b1e;
			text-align: left;
			//font-weight: bold;
		}
	}

	.Attention_box_info {
		text-align: left;
		background-color: $all-secondary-color;
		padding: 15px 25px 1px 25px;
		border-radius: 20rpx;
		color: #8197bc;
		font-size: 24rpx;
		margin: 10rpx 0 30rpx 0;
	}

	.line {
		background: linear-gradient(90deg, #ffffff0d -3%, #ffffff26 48.66%, #ffffff0d 103.12%);
		height: 1px;
		margin: 0 0;
		width: 100%;
	}

	.input_box {
		
		padding: 40rpx 40rpx 40rpx 40rpx;

		.Rank_wrap {
			.Rank_list {
				margin: 40rpx 0 0rpx 0;

				.Rank_list_item {
					display: flex;
					align-items: center;
					padding: 30rpx 0;

					image {
						width: 55rpx;
						height: 55rpx;
					}

					color: #7b98bf;

					view:nth-child(2) {
						padding-left: 20rpx;
					}

					.left_val {
						margin-left: auto;
						color: $all-secondary-text-color;
						display: flex;
						align-items: center;

						span {
							position: relative;
							top: -2rpx;
							display: inline-block;
							width: 7px;
							height: 7px;
							background-color: #0bca6a;
							box-shadow: 0 0 10px #0bca6a;
							border-radius: 100px;
							margin-right: 12rpx;
						}
						
						.hongse {
							background-color: #f04b1e !important;
							box-shadow: 0 0 10px #f04b1e !important;
						}
						
						.lvse {
							background-color: #0bca6a !important;
							box-shadow: 0 0 10px #0bca6a !important;
						}
						
						.huise {
							background-color: #ecc918 !important;
							box-shadow: 0 0 10px #ecc918 !important;
						}

						image {
							width: 25rpx;
							height: 30rpx;
							margin-left: 8rpx;
						}
					}
				}
			}

			.Rank_box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 40rpx 0;

				.rank_icon {
					width: 40rpx;
					height: 40rpx;
				}

				.Rank_box_left {
					padding-left: 14rpx;

					.total_num {
						font-weight: bold;
						font-size: 38rpx;
						color: $all-secondary-text-color;
					}
				}
			}
		}
	}

	.reg_title {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			font-size: 30rpx;
			color: $all-secondary-text-color;
			//font-weight: bold;
		}
	}

	/*/deep/ .u-time-axis:before {
		border-left: 4px solid #2f4553 !important;
		left: -1px !important;
		bottom: 12px !important;
	}*/

	.u-node {
		width: 40rpx;
		height: 40rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: $all-secondary-text-color;
	}

	.u-order-desc {
		color: #7b98bf;
		font-size: 20rpx;
		margin: 4rpx 0;
	}

	.u-order-time {
		color: #7b98bf;
		font-size: 24rpx;
		display: flex;
		align-items: center;

		.u-icon {
			position: relative;
			top: 1px;
			margin-right: 6rpx;
		}
	}
</style>