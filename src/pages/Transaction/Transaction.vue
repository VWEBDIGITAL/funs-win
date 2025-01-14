<template>
	<view :style="theme" class="page_boxs">

		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('TransactionPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>

		
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->
			<pagesNavTitle ref="" :title="$t('TransactionPage.title')"></pagesNavTitle>
			
			
			<view class="page_wrap">
				<view class="type_box">
					<view class="type_box_item diyige" style="margin-right: 14rpx;">
						<cus-selects :Height="'auto'" :placeholder="placeholderT1" :jiahao="0" :closeSelect.sync='close' :data="PopularListT1" v-model="value" @change='change' :valueType="alias"></cus-selects>
					</view>
					<view class="type_box_item dierge">
						<cus-selects :Height="'220px'" :placeholder="placeholderT2" :jiahao="0" :closeSelect.sync='close2' :data="PopularListT2" v-model="value2" @change='change2' :valueType="alias2"></cus-selects>
					</view>
				</view>
				
				<view class="Bonus-loading" v-if="pageLoading">
					<view class="LoadJuZhong">
						<view class="loader">
							<view class="loader-animation"></view>
						</view>
					</view>
				</view>
				<view class="list_wrap" v-else-if="shopsLists.length != 0">
					<view class="list_item" v-for="(item,index) in shopsLists" :key="index">
						<view class="list_item_title">
							<view v-if="item.type == 1">{{$t('TransactionPage.FundingCorrection')}}</view>
							<view v-if="item.type == 2">{{$t('TransactionPage.Commission')}}</view>
							<view v-if="item.type == 3">{{$t('TransactionPage.RebateRewards')}}</view>
							<view v-if="item.type == 4">{{$t('TransactionPage.Deposit')}}</view>
							<view v-if="item.type == 5">{{$t('TransactionPage.DepositBonus')}}</view>
							<view v-if="item.type == 11">{{$t('TransactionPage.LevelUpBonus')}}</view>
							<view v-if="item.type == 12">{{$t('TransactionPage.BirthdayBonus')}}</view>
							<view v-if="item.type == 13">{{$t('TransactionPage.WeeklyBonus')}}</view>
							<view v-if="item.type == 14">{{$t('TransactionPage.MonthlyBonus')}}</view>
							<view v-if="item.type == 15">{{$t('TransactionPage.ReferralRewards')}}</view>
							<view v-if="item.type == 16">{{$t('TransactionPage.SpinBonus')}}</view>
							<view v-if="item.type == 17">{{$t('TransactionPage.QuestBonus')}}</view>
							<view v-if="item.type == 18">{{$t('TransactionPage.OtherBonuses')}}</view>
							
							
							
							
							
							
							<view v-if="item.type == 19">{{$t('NewUserPopup.ADDHOME')}}</view>
							<view v-if="item.type == 20">{{$t('NewUserPopup.PhoneV')}}</view>
							<view v-if="item.type == 21">{{$t('NewUserPopup.NameV')}}</view>
							<view v-if="item.type == 22">{{$t('NewUserPopup.EmailV')}}</view>
							<view v-if="item.type == 23">{{$t('NewUserPopup.Bind')}}</view>
							<view v-if="item.type == 24">{{$t('NewUserPopup.KYCV')}}</view>
							
							<view v-if="item.type == 500">{{$t('RewardHistoryPopup.bonus5')}}</view>
							<view v-if="item.type == 501">{{$t('RewardHistoryPopup.bonus6')}}</view>
							
							
							<view v-if="item.type == 25">{{$t('NEWBonusPageA.1STDeposit')}}</view>
							<view v-if="item.type == 26">{{$t('NEWBonusPageA.2ndDeposit')}}</view>
							<view v-if="item.type == 27">{{$t('NEWBonusPageA.3rdDeposit')}}</view>
							<view v-if="item.type == 28">{{$t('DepositPageBonus.DepBonusPlus')}}</view>
							
							<view v-if="item.type == 29">{{$t('RewardHistoryPopup.bonus3')}}</view>
							<view v-if="item.type == 30">{{$t('RewardHistoryPopup.bonus4')}}</view>
							
							
							
							
							
							
							
							<view v-if="item.type == 51">{{$t('TransactionPage.Withdraw')}}</view>
							<view v-if="item.type == 52">{{$t('TransactionPage.WithdrawFee')}}</view>
							<view v-if="item.type == 53">{{$t('TransactionPage.Refunded')}}</view>
							<view v-if="item.type == 54">{{$t('TransactionPage.Vault')}}</view>
							<view v-if="item.type == 55">{{$t('TransactionPage.GamePoints')}}</view>
							<view v-if="item.type == 56">{{$t('TransactionPage.GameScores')}}</view>
							<view v-if="item.type == 101">{{$t('SpecialBonuS.title1')}}</view>
							
							<view v-if="item.changeBalance != '0.00'" class="lvse" :class="isNum(item.changeBalance) == -1 ? 'hongse': ''">{{(item.changeBalance/100).toFixed(2)}}</view>
							
						</view>
						<view class="item_time" style="margin: 10rpx 0 0 0;">
							<view class="item_time" style="margin: 0 0;">
								<view class="time_name">{{item.time}}</view>
							</view>
							<view class="time_type" style="flex: 1;">
								<view>{{$t('NewlyAdded.Balance')}} {{(item.balance/100).toFixed(2)}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="Data_null" v-else>
					<image src="/static/image/NoOrders.png" mode="widthFix"></image>
					<view>No Datas</view>
				</view>
			</view>
			
			
			<view class="fenyeqi" v-if="page.total != 0">
				<page-pagination :total="page.total" :pageSize="page.pageSize" :showBorder="false" :numAround="true" @change="changePage"></page-pagination>
			</view>
			
		<!-- </uni-transition> -->
		
		

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
				pageLoading: true,
				Nomore: 0,
				btnStatus: false,
				showOptions: true,
				pageSize: 1,
				dateType: 4,
				istype: 0,


				value: '4',
				selectList: [],
				alias: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close: false,

				value2: '0',
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
				this.gelog()
			}
			
		},
		onShow() {
			let token = uni.getStorageSync("token")
			if(!token){
				
			} else {
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			let that = this
			that.pageSize = 1
			setTimeout(function() {
				uni.stopPullDownRefresh();
				//this.gelog()
			}, 1000);
		},
		//触底加载
		onReachBottom() {
			let that = this
			setTimeout(function() {
				that.pageSize++;
				//this.gelog()
				uni.hideNavigationBarLoading()
			}, 500);
		},
		computed: {
			placeholderT1(){
				let Popular = this.$t('DetailsPage.DateOption1')
				return Popular
			},
			PopularListT1() {
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
			placeholderT2(){
				let Popular = this.$t('TransactionPage.TraOption0')
				return Popular
			},
			PopularListT2() {
				let arry = [{
					id: 0,
					title: this.$t('TransactionPage.TraOption0'),
				}, {
					id: 1,
					title: this.$t('TransactionPage.FundingCorrection'),
				}, {
					id: 2,
					title: this.$t('TransactionPage.Commission'),
				}, {
					id: 3,
					title: this.$t('TransactionPage.RebateRewards'),
				}, {
					id: 4,
					title: this.$t('TransactionPage.Deposit'),
				}, {
					id: 5,
					title: this.$t('TransactionPage.DepositBonus'),
				}, {
					id: 6,
					title: this.$t('TransactionPage.LevelUpBonus'),
				}, {
					id: 7,
					title: this.$t('TransactionPage.BirthdayBonus'),
				}, {
					id: 8,
					title: this.$t('TransactionPage.WeeklyBonus'),
				}, {
					id: 9,
					title: this.$t('TransactionPage.MonthlyBonus'),
				}, {
					id: 10,
					title: this.$t('TransactionPage.ReferralRewards'),
				}, {
					id: 11,
					title: this.$t('TransactionPage.SpinBonus'),
				}, {
					id: 12,
					title: this.$t('TransactionPage.QuestBonus'),
				}, {
					id: 13,
					title: this.$t('TransactionPage.OtherBonuses'),
				}, {
					id: 14,
					title: this.$t('TransactionPage.Withdraw'),
				}, {
					id: 15,
					title: this.$t('TransactionPage.WithdrawFee'),
				}, {
					id: 16,
					title: this.$t('TransactionPage.Refunded'),
				}, {
					id: 17,
					title: this.$t('TransactionPage.Vault'),
				}, {
					id: 18,
					title: this.$t('TransactionPage.GamePoints'),
				}, {
					id: 19,
					title: this.$t('TransactionPage.GameScores'),
				}]
				return arry
			}
		},
		methods: {
			//判断是否负数
			isNum(val){
				let Num = Math.sign(val)
				return Num
			},
			LookMore() {
				let that = this
				that.btnStatus = true
				setTimeout(()=>{
					that.btnStatus = false
					that.pageSize++
					that.gelog()
				},1000)
			},
			change(e) {
				//////console.log(e) //这里返回的是value值
				this.dateType = e
				this.pageSize = 1
				this.shopsLists = []
				this.gelog()
				this.Nomore = 0
			},
			change2(e) {
				////console.log(e) //这里返回的是value值
				this.istype = e
				this.pageSize = 1
				this.shopsLists = []
				this.gelog()
				this.Nomore = 0
			},
			gelog() {
				let that = this
				that.pageLoading = true
				this.$u.post('/game/record/balance-change', {
					page: this.pageSize, // number 是 页数，首次填1
					dateType: that.dateType, //日期类型（0全部 1今天 2昨天 3七天内 4三十天内）
					type: that.istype
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
						if(res.data.record.length != 0){
							that.shopsLists = res.data.record
						}else {
							that.Nomore = 1
						}
					}
					that.pageLoading = false
					
				}).catch(err => {
					that.pageLoading = false
				})
			},
			
			changePage(currentPage, type) { // 当前页改变
				let that = this
				that.page.currentPage = currentPage;
				that.pageSize = currentPage
				that.shopsLists = []
				that.gelog()
				//////console.log("点击了" + type + "，当前页：" + currentPage);
			},

		}
	}
</script>

<style lang="scss">
	
	/deep/ .select_input {
		height: 40px !important;
		line-height: 40px !important;
	}
	
	/deep/ .select_modal_con {
		top: 12px !important;
	}
	
	.Bonus-loading {
		height: 100%;
		position: relative;
		.LoadJuZhong {
			text-align: center;
			top: 10%;
			left: 50%;
			transform: translate(-50%, -50%);
			position: absolute;
			image {
				width: 140rpx;
				height: 18px;
				position: relative;
				top: -50rpx;
			}
			.loader {
				top: 50% !important;
			}
		}
	}
	
	.more_btn {
		margin-top: 4px;
	}

	.page_wrap {
		//height: 100%;
		padding: 20rpx 20rpx;
		//height: 100%;
		background-color: $body-bg-color !important;
	}

	.list_wrap {
		.list_item {
			background-color: $all-secondary-color;
			padding: 24rpx;
			border-radius: 12rpx;
			margin-bottom: 20rpx;

			.list_item_title {
				display: flex;
				align-items: center;
				justify-content: space-between;

				view:nth-child(1) {
					flex: 1;
					color: $font-all-color;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.lvse {
					color: #45D91E;
					//font-weight: bold;
				}
				.hongse {
					color: #f00 !important;
					//font-weight: bold;
				}
			}

			.item_time {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.time_name {
					color: $font-all-color;
					flex: 1;
				}

				.time_type {
					//width: 200rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					color: $font-all-color;

					view:nth-child(1) {
						flex: 1;
						text-align: right;
					}

					view:nth-child(2) {
						text-align: right;
						//font-weight: bold;
					}


				}
			}
		}
	}

	.type_box {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		.type_box_item {
			flex: 1;
			
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			border-radius: 10px;
			
			padding: 4rpx 0;
			
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