<template>
	<view :style="theme">

	<u-popup v-model="pc_transactionShow" width="650" height="85%" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
		<view class="reg_title" @click="pc_transactionShow = false">
			<view>{{$t('DetailsPage.title')}}</view>
		</view>	
		<view class="page_wrap">
			<view class="type_box_wrap">
				<view class="type_box" style="margin-right:0;">
					<view class="type_box_item">
						<cus-selects :placeholder="placeholder3" :jiahao="0" :closeSelect.sync='close3'
							:data="PopularList3" v-model="value3" @change='change3' :valueType="alias3"></cus-selects>
					</view>
				</view>
				<view class="type_box" style="margin-left:10rpx;" v-if="islistType == 0">
					<view class="type_box_item">
						<cus-selects :placeholder="placeholder1" :jiahao="0" :closeSelect.sync='close' :data="PopularList1" v-model="value" @change='change' :valueType="alias"></cus-selects>
					</view>
				</view>
				<view class="type_box" style="margin-left:10rpx;" v-if="islistType == 1">
					<view class="type_box_item">
						<cus-selects :placeholder="placeholder4" :jiahao="0" :closeSelect.sync='close4' data="PopularList4" v-model="value4" @change='change4' :valueType="alias4"></cus-selects>
					</view>
				</view>
			</view>
			<view>
				<view class="list_wrap" v-if="shopsLists.length != 0">
					<view class="list_item" v-for="(item,index) in shopsLists" :key="index">
						<view class="list_zongguo">
							<view class="list_icon">
								
								<image class="line_icon" :src="payIconUrl + '/pay/' + item.method + '.png'"></image>

							</view>
							<view class="right_info">
								<view class="list_item_title">
									<view class="teidou" v-if="item.method == 1">USDT</view>
									<view class="teidou" v-if="item.method == 2">PIX</view>
									<view class="teidou" v-if="item.method == 3">Gcash</view>
									<view class="teidou" v-if="item.method == 4">Maya</view>
									<view class="teidou" v-if="item.method == 5">银行卡</view>

									<view class="teidou" v-if="item.method == 6">支付宝</view>
									<view class="teidou" v-if="item.method == 7">微信</view>
									<view class="teidou" v-if="item.method == 8">云闪付</view>
									<view class="teidou" v-if="item.method == 9">数字人民币</view>
									<view class="teidou" v-if="item.method == 10">钱包</view>
									<view class="teidou" v-if="item.method == 11">汇旺支付</view>
									<view class="teidou" v-if="item.method == 12">VISA</view>

									<view class="ordersn">
										<view class="lookDetails" @click="LookDetails(item)">{{item.orderId}}</view>
										<image src="/static/image/me/fuzhi_icon.png" mode="widthFix" @click="copy(item.orderId)"></image>
									</view>
								</view>
								<view class="item_time" style="margin: 10rpx 0 0 0;">
									<view class="time_name">
										<!-- 4.机器审核 5.未支付 6.人工审核 7.二审过通 8.机审通过 9.取消订单 10.准备付款 11.准备退款 12.退款中 13.已退款 14.已驳回 15.订单失败 16.已拒绝 18.成功 -->
										<!-- 充值：10是灰色，15是红色，18是绿色 提现：6、10是灰色，14、15、16都是失败红色，18是绿色 -->
										<view class="baise" v-if="item.status == 5">
											{{(item.amount / 100).toFixed(2)}}
										</view>
										<view class="baise" v-if="item.status == 18">
											{{(item.amount / 100).toFixed(2)}}
										</view>
										<view class="baise" v-if="item.status == 10||item.status == 6">
											{{(item.amount / 100).toFixed(2)}}
										</view>
										<view class="baise" v-if="item.status == 14||item.status == 15||item.status == 16">
											{{(item.amount / 100).toFixed(2)}}
										</view>
										
										<view class="huangse_box" v-if="item.status == 10||item.status == 6||item.status == 5"></view><view class="huangsele" v-if="item.status == 10||item.status == 6||item.status == 5">{{$t('DetailsPage.Status1')}}</view>
										<view class="hongse_box" v-if="item.status == 14||item.status == 15||item.status == 16"></view><view class="hongsele" v-if="item.status == 14||item.status == 15||item.status == 16">{{$t('DetailsPage.Status2')}}</view>
										
										<view class="lvse_box" v-if="item.status == 18"></view>
										<view class="ywcd" v-if="item.status == 18">{{$t('NEWBonusPageA.completed')}}</view>
										
									</view>
									<view class="time_type">
										<view>{{$u.timeFormat(item.orderTime, 'yyyy-mm-dd hh:MM:ss')}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="Data_null" v-else>
					<image src="/static/image/NoOrders.png" mode="widthFix"></image>
					<view>No Datas</view>
				</view>
			</view>
		</view>
		<view class="fenyeqi" v-if="page.total != 0">
			<page-pagination :total="page.total" :pageSize="page.pageSize" :showBorder="false" :numAround="true" @change="changePage"></page-pagination>
		</view>
		</u-popup>


		<Reject-Popup ref="RejectOpen" @guanbiPCmyDetailsPopup="closewindows"></Reject-Popup>

	</view>
</template>

<script>
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		name: "pc-myPageDetails",
		components: {
			cusSelects
		},
		data() {
			return {
				payIconUrl: '',
				pc_transactionShow: false,
				
				Nomore2: 0,
				Nomore: 0,
				btnStatus: false,
				showOptions: true,

				pageSize: 1,
				istype: 0,
				isDate: 4,


				islistType: 0,
				value3: '0',
				selectList3: [],
				alias3: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close3: false,


				//查询类型（0全部1成功2待处理3失败）
				value: '0',
				selectList: [],
				alias: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close: false,



				//查询类型（0全部1成功2待处理3失败）
				value4: '0',
				selectList4: [],
				alias4: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close4: false,



				value2: '1',
				selectList2: [],
				alias2: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close2: false,

				shopsLists: [],

				page: {
					total: 0,
					pageSize: 10,
					currentPage: 1
				}

			}
		},
		created() {
			
		},
		mounted() {

		},
		computed: {
			placeholder3() {
				let Popular = this.$t('Deposit')
				return Popular
			},
			PopularList3() {
				let arry = [{
					id: 0,
					title: this.$t('Deposit'),
				}, {
					id: 1,
					title: this.$t('Withdraw'),
				}]
				return arry
			},
			placeholder2() {
				let Popular = this.$t('DetailsPage.DateOption1')
				return Popular
			},
			PopularList2() {
				let arry = [{
					id: 1,
					title: this.$t('DetailsPage.DateOption1'),
				}, {
					id: 2,
					title: this.$t('DetailsPage.DateOption2'),
				}, {
					id: 3,
					title: this.$t('DetailsPage.DateOption3'),
				}, {
					id: 4,
					title: this.$t('DetailsPage.DateOption4'),
				}]
				return arry
			},
			placeholder1() {
				let Popular = this.$t('DetailsPage.Status0')
				return Popular
			},
			PopularList1() {
				let arry = [{
					id: 0,
					title: this.$t('DetailsPage.Status0'),
				}, {
					id: 10,
					title: this.$t('DetailsPage.Status1'),
				}, {
					id: 15,
					title: this.$t('DetailsPage.Status2'),
				}, {
					id: 18,
					title: this.$t('DetailsPage.Status3'),
				}]
				return arry
			},
			placeholder4() {
				let Popular = this.$t('DetailsPage.Status0')
				return Popular
			},
			PopularList4() {
				let arry = [{
						id: 0,
						title: this.$t('DetailsPage.Status0'),
					}, {
						id: 10,
						title: this.$t('DetailsPage.Status1'),
					},
					//{
					//	id: 15,
					//	title: this.$t('DetailsPage.Status2'),
					//},
					{
						id: 18,
						title: this.$t('DetailsPage.Status3'),
					}, {
						id: 6,
						title: this.$t('DetailsPage.Status4'),
					}, {
						id: 14,
						title: this.$t('DetailsPage.Status6'),
					}, {
						id: 16,
						title: this.$t('DetailsPage.Status7'),
					}
				]
				return arry
			},

		},
		methods: {
			init(val){
				this.payIconUrl = uni.getStorageSync('Musicdomains');
				if(val == 0){
					this.gelog();
				} else {
					this.geTxlog()
				}
				
			},
			openPopup(val) {
				this.init(val);
				this.pc_transactionShow = true
			},
			closewindows() {
				this.pc_transactionShow = false
			},
			
			
			
			
			
			
			
			
			LookDetails(data) {
				this.$refs.RejectOpen.openPopup(data)
			},
			change4(e) {
				let that = this
				////console.log('4',e) //这里返回的是value值
				that.istype = e
				that.pageSize = 1

				if (this.islistType == 0) {
					this.shopsLists = []
					that.gelog()
					that.Nomore = 0
				} else if (this.islistType == 1) {
					this.shopsLists = []
					that.geTxlog()
					that.Nomore = 0
				}
			},
			change3(e) {
				let that = this
				//////console.log(e) //这里返回的是value值
				this.islistType = e
				that.pageSize = 1

				that.value4 = '0'
				that.value2 = '1'
				that.value = '0'

				if (e == 0) {
					that.istype = 0
					this.isDate = 4
					this.shopsLists = []
					that.gelog()
				} else if (e == 1) {
					that.istype = 0
					this.isDate = 4
					this.shopsLists = []
					that.geTxlog()
				}
			},



			change2(e) {
				let that = this
				//////console.log(e) //这里返回的是value值
				this.isDate = e
				that.pageSize = 1

				if (this.islistType == 0) {
					this.shopsLists = []
					that.gelog()
					that.Nomore = 0
				} else if (this.islistType == 1) {
					this.shopsLists = []
					that.geTxlog()
					that.Nomore = 0
				}
			},
			change(e) {
				let that = this
				//////console.log(e) //这里返回的是value值
				that.istype = e
				that.pageSize = 1
				if (this.islistType == 0) {
					this.shopsLists = []
					that.gelog()
					that.Nomore = 0
				} else if (this.islistType == 1) {
					this.shopsLists = []
					that.geTxlog()
					that.Nomore = 0
				}
			},
			LookMore() {
				let that = this
				that.btnStatus = true
				setTimeout(() => {
					that.btnStatus = false
					that.pageSize++
					that.gelog()
				}, 1000)
			},


			//获取充值记录
			gelog() {
				let that = this
				this.$u.post('/recharge/record', {
					page: this.pageSize, // number 是 页数，首次填1
					status: that.istype, // 查询类型（0全部1成功2待处理3失败）
					dateType: this.isDate //日期类型（0全部1今天2昨天3七天内4三十天内）
				}).then(res => {
					that.page.total = res.data.totalPage * 10
					that.page.pageSize = res.data.pageSize
					that.page.currentPage = res.data.page
					if (that.pageSize != 1) {
						if (res.data.record.length != 0) {
							that.shopsLists = that.shopsLists.concat(res.data.record)
						} else {
							that.Nomore = 1
						}
					} else {
						if (res.data.record.length != 0) {
							that.shopsLists = res.data.record
						} else {
							that.Nomore = 1
						}
					}
				}).catch(err => {

				})
			},


			//获取提现记录
			geTxlog() {
				let that = this
				this.$u.post('/withdraw/record', {
					page: this.pageSize, // number 是 页数，首次填1
					status: that
						.istype, // 查询类型（4.机器审核 5.未支付 6.人工审核 7.二审过通 8.机审通过 9.取消订单 10.准备付款 11.准备退款 12.退款中 13.已退款 14.已驳回 15.订单失败 16.已拒绝 18.成功',）
					dateType: this.isDate //日期类型（0全部1今天2昨天3七天内4三十天内）
				}).then(res => {
					that.page.total = res.data.totalPage * 10
					that.page.pageSize = res.data.pageSize
					that.page.currentPage = res.data.page

					if (that.pageSize != 1) {
						if (res.data.record.length != 0) {
							that.shopsLists = that.shopsLists.concat(res.data.record)
						} else {
							that.Nomore = 1
						}
					} else {
						if (res.data.record.length != 0) {
							that.shopsLists = res.data.record
						} else {
							that.Nomore = 1
						}
					}
				}).catch(err => {

				})
			},
			changePage(currentPage, type) { // 当前页改变
				let that = this
				that.page.currentPage = currentPage;
				that.pageSize = currentPage
				//that.shopsLists = []

				if (this.islistType == 0) {
					this.shopsLists = []
					that.gelog()
				} else if (this.islistType == 1) {
					this.shopsLists = []
					that.geTxlog()
				}
			},
			copy(text) {
				let that = this
				uni.setClipboardData({
					data: text, // 设置要复制的文本内容
					showToast: false,
					success(res) {
						////console.log("成功复制到剪贴板");
						uni.showToast({
							title:  that.$t('Betting requirements.register7'),
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
	/deep/ .u-drawer {
		max-width: 668px !important;
	}
	.fenyeqi {
		background-color: transparent !important;
	}
	.page_wrap {
		padding: 40rpx;
	}

	.lookDetails {
		cursor: pointer;
		text-decoration: underline;
		color: #1864bd !important;
	}

	.list_wrap {
		margin: 20rpx 0;

		.list_item {
			background-color: $all-secondary-color;
			padding: 24rpx;
			border-radius: 12rpx;
			margin-bottom: 20rpx;

			.list_zongguo {
				display: flex;
				align-items: center;

				.list_icon {
					image {
						width: 55rpx;
						height: 55rpx;
					}
				}

				.right_info {
					flex: 1;
					padding-left: 20rpx;

					.list_item_title {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.teidou {
							color: #FEFEFE;
						}

						.ordersn {
							display: flex;
							align-items: center;

							view {
								flex: 1;
								color: $font-all-color;
								word-break: break-all;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;
								overflow: hidden;
							}

							image {
								width: 20rpx;
								height: 20rpx;
								margin-left: 10rpx;
							}
						}
					}

					.item_time {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.time_name {
							color: $font-all-color;
							flex: 1;
							display: flex;
							align-items: center;
							//font-weight: bold;

							.lvse {
								color: #45D91E;
								margin-right: 10rpx;
							}

							.baise {
								color: $font-all-color;
								margin-right: 10rpx;
							}

							.hoong {
								color: #f00;
								margin-right: 10rpx;
							}

							.huangse_box {
								margin-left: 10rpx;
								width: 16rpx;
								height: 16rpx;
								background-color: #ecc918;
								border-radius: 100px;
								box-shadow: 0 0 10px #ecc918;
							}

							.hongse_box {
								margin-left: 10rpx;
								width: 16rpx;
								height: 16rpx;
								background-color: #f00;
								border-radius: 100px;
								box-shadow: 0 0 10px #f00;
							}
							
							.ywcd {
								margin-left: 10rpx;
								font-size: 24rpx;
								color: #45D91E;
								word-break:break-all;
								display:-webkit-box;
								-webkit-line-clamp:1;
								-webkit-box-orient:vertical;
								overflow:hidden;
							}
							
							.huangsele {
								margin-left: 10rpx;
								font-size: 24rpx;
								color: #ecc918;
								word-break:break-all;
								display:-webkit-box;
								-webkit-line-clamp:1;
								-webkit-box-orient:vertical;
								overflow:hidden;
							}
							
							.hongsele {
								margin-left: 10rpx;
								font-size: 24rpx;
								color: #f00;
								word-break:break-all;
								display:-webkit-box;
								-webkit-line-clamp:1;
								-webkit-box-orient:vertical;
								overflow:hidden;
							}

							.lvse_box {
								margin-left: 10rpx;
								width: 16rpx;
								height: 16rpx;
								background-color: #45D91E;
								border-radius: 100px;
								box-shadow: 0 0 10px #45D91E;
							}

						}

						.time_type {
							color: $font-all-color;
						}
					}
				}
			}
		}
	}

	.type_box_wrap {
		display: flex;
		align-items: center;
	}

	.type_box {
		flex: 1;
		margin: 0 0 0 0;

		.type_box_item {
			background-color: $all-secondary-color;
			padding: 2rpx 0;
			border-radius: 10rpx;

			/deep/ .select_modal_scroll {
				height: auto !important;
			}
		}

		.marginl {
			margin-right: 10rpx;
		}

		.marginr {
			margin-left: 10rpx;
		}
	}
</style>