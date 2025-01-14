<template>
	<view :style="theme" class="page_boxs">
		<!-- 个人统计弹窗 -->
		<PersonalStatisticsPopup ref="tatistics" :queryUserId="QueryUserId" :Types="1" :isShowBtn="2">
		</PersonalStatisticsPopup>
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('PlayerPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		

		<!-- <uni-transition :mode-class="['fade', 'zoom-in']"
			:styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}"
			:show="showOptions"> -->
			<pagesNavTitle ref="" :title="$t('PlayerPage.title')"></pagesNavTitle>

			<view class="page_wrap">

				<view class="type_box">
					<view class="type_box_item diyige" style="margin-right: 14rpx;">
						<cus-selects :Height="'auto'" :placeholder="placeholderR1" :jiahao="0" :closeSelect.sync='close'
							:data="PopularListR1" v-model="value" @change='change' :valueType="alias"></cus-selects>
					</view>
					<view class="type_box_item dierge">
						<cus-selects :Height="'96px'" :placeholder="placeholderR2" :jiahao="0" :closeSelect.sync='close2'
							:data="PopularListR2" v-model="value2" @change='change2' :valueType="alias2"></cus-selects>
					</view>
				</view>

				<view>
					<view class="input_item">
						<view class="sousuio"><u-icon name="search" color="#8e99a2"></u-icon></view>
						<view class="input_srk">
							<u-input height="74" v-model="Amount" type="number" :border="false"
								:custom-style="customStyle" :placeholder-style="placeholderStyle"
								:placeholder="$t('PlayerPage.EnterID')" :clearable="true" />
						</view>
						<view class="input_max" @click="okStart()"><u-icon name="search" color="#ffffff"></u-icon>
						</view>
					</view>
				</view>

				<view v-if="shopsLists.length != 0">
					<view class="Referralbonus_box2" v-for="(item,index) in shopsLists" :key="index">
						<view class="Referral_bonus_item">
							<view class="Referral_bonus_item_info">
								<view class="item_list_box">
									<view class="ziitem">
										<view>{{$t('PlayerPage.Player')}} : {{item.userId}}</view>
										<u-icon name="checkmark-circle-fill" color="#45D91E"
											v-if="item.recommendValid == true"></u-icon>
									</view>
									<view class="nobold" @click="openStatistics(item.userId)">
										<u-icon name="arrow-rightward"></u-icon>
									</view>
								</view>
								<view class="item_list_box">
									<view>{{$t('PlayerPage.BettingContribution')}}</view>
									<view>{{(item.betContribution/100).toFixed(2)}}</view>
								</view>
								<view class="item_list_box">
									<view>{{$t('PlayerPage.AgentContribution')}}</view>
									<view>{{(item.agentContribution/100).toFixed(2)}}</view>
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
		<!-- </uni-transition> -->

		<view class="fenyeqi" v-if="page.total != 0">
			<page-pagination :total="page.total" :pageSize="page.pageSize" :showBorder="false" :numAround="true" @change="changePage"></page-pagination>
		</view>

	</view>
</template>

<script>
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		components: {
			cusSelects
		},
		data() {
			return {
				showOptions: true,
				placeholderStyle: "color: #8e99a2;",
				customStyle: {
					fontSize: "28rpx",
				},
				Amount: '',
				pageSize: 1,
				dateType: 1,
				istype: 1,
				QueryUserId: 0,

				value: '1',
				selectList: [],
				alias: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close: false,

				value2: '1',
				selectList2: [],
				alias2: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close2: false,

				shopsLists: [],
				Nomore: 0,
				page: {
					total: 0,
					pageSize: 10,
					currentPage: 1
				}

			}
		},
		onLoad() {
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				this.getList()
			}
		},
		onShow() {
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
			
			} else {
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		computed: {
			placeholderR1() {
				let Popular = this.$t('DetailsPage.DateOption1')
				return Popular
			},
			PopularListR1() {
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
			placeholderR2() {
				let Popular = this.$t('NewlyAdded.ValidPlayer')
				return Popular
			},
			PopularListR2() {
				let arry = [{ //排序类型（ 1 有效下级 2 注册时间 3 贡献度）
					id: 1,
					title: this.$t('NewlyAdded.ValidPlayer'),
				}, {
					id: 2,
					title: this.$t('NewlyAdded.RegistrationTime'),
				}, {
					id: 3,
					title: this.$t('NewlyAdded.ContributionRanking'),
				}]
				return arry
			},
		},
		methods: {
			changePage(currentPage, type) { // 当前页改变
				let that = this
				that.page.currentPage = currentPage;
				that.pageSize = currentPage
				that.shopsLists = []
				that.getList()
				//////console.log("点击了" + type + "，当前页：" + currentPage);
			},
			change(e) {
				//////console.log(e) //这里返回的是value值
				this.dateType = e
				this.pageSize = 1
				this.shopsLists = []
				this.getList()
				this.Nomore = 0
			},
			change2(e) {
				////console.log(e) //这里返回的是value值
				this.istype = e
				this.pageSize = 1
				this.shopsLists = []
				this.getList()
				this.Nomore = 0
			},
			clicktabs(idx) {
				this.tabsidx = idx
			},
			openStatistics(uid) {
				////console.log(uid)
				this.QueryUserId = uid
				setTimeout(() => {
					this.$refs.tatistics.getsta()
					this.$refs.tatistics.openPopup()
				}, 200)
			},
			getList() {
				let that = this
				this.$u.post('/promotion/referred/player', {
					page: this.pageSize, // number 是 页数，首次填1
					orderType: that.istype, // number 是 排序类型（ 1 有效下级 2 注册时间 3 贡献度）
					dateType: this.dateType, // number 是 日期类型（ 0全部 1今天 2昨天 3七天内 4三十天内）
					queryUserId: Number(that.Amount), // number 否 下级玩家ID
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
			okStart() {
				if (this.Amount == '') {
					this.$u.toast(this.$t('ToastPrompt.Toast21'));
				} else {
					this.dateType = 1
					this.istype = 1
					this.pageSize = 1
					this.shopsLists = []
					this.getList()
				}

			}
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		padding: 20rpx 20rpx;
		background-color: $body-bg-color !important;
	}

	.Referralbonus_box2 {
		margin: 20rpx 0 30rpx 0;

		.Referral_bonus_item {
			flex: 1;
			background-color: $all-secondary-color;
			border-radius: 12rpx;

			.Referral_bonus_item_info {
				padding: 10rpx 30rpx;
				position: relative;
				color: $font-all-color;

				.item_list_box {
					border-bottom: 1px solid #2F4553;
					padding: 20rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.ziitem {
						display: flex;
						align-items: center;

						.u-icon {
							margin-left: 10rpx;
						}
					}

					.nobold {
						font-weight: initial !important;
						color: $font-all-color !important;
					}

					view:nth-child(1) {
						span {
							color: #FEFEFE;
							//font-weight: bold;
							margin: 0 10rpx;
						}
					}

					view:nth-child(2) {
						color: #FEFEFE;
						//font-weight: bold;
					}
				}

				.item_list_box:last-child {
					border-bottom: none !important;
				}
			}
		}
	}

	.input_item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $all-secondary-color;
		border-radius: 10rpx;
		height: 74rpx;

		.sousuio {
			padding: 0 0 0 20rpx;
		}

		.input_srk {
			padding: 0 20rpx;
			flex: 1;
			border-radius: 10rpx;
			background-color: $all-secondary-color;
		}

		.input_max {
			background: linear-gradient(1turn,#0c5eff .8%,#1398f9);
			box-shadow: 0 3px 28px #2283f666,inset 0 3px 3px #ffffff4d;
			height: 74rpx;
			line-height: 74rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 30rpx;
			color: $font-all-color;
			font-size: 24rpx;
			position: relative;
			right: -2rpx;
			border-radius: 0 12rpx 12rpx 0;
		}
	}

	.type_box {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		.type_box_item {
			flex: 1;
			background-color: $all-secondary-color;
			padding: 4rpx 0;
			border-radius: 10rpx;

			/deep/ .select_modal_scroll {
				height: 220px;
			}


			.tabrgd {
				//transform: rotate(270deg);
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