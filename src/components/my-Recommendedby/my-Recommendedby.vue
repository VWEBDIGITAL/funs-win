<template>
	<view :style="theme">
		
		
		<!-- 个人统计弹窗 -->
		<PersonalStatisticsPopup ref="tatistics" :queryUserId="QueryUserId" :Types="1" :isShowBtn="2"></PersonalStatisticsPopup>
		
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
					<view class="sousuio"><u-icon name="search" color="#58647c"></u-icon></view>
					<view class="input_srk">
						<u-input height="74" v-model="Amount" type="number" :border="false"
							:custom-style="customStyle" :placeholder-style="placeholderStyle"
							:placeholder="$t('PlayerPage.EnterID')" :clearable="true" @input="inputKey" />
					</view>
					<view class="input_max" @click="okStart()"><u-icon name="search" color="#ffffff"></u-icon>
					</view>
				</view>
			</view>
		
			<view v-if="shopsLists.length != 0">
				<view class="Referralbonus_box2" v-for="(item,index) in shopsLists" :key="index">
					<view class="Referral_bonus_item">
						<view class="Referral_bonus_item_info">
							
							<!--玩家-->
							<view class="item_list_box">
								<view class="ziitem">
									<view>{{$t('PlayerPage.Player')}} : </view>
								</view>
								<view class="nobold" @click="openStatistics(item.userId)">
									<view><image :src="headId(item.headId)"></image>{{item.nick}}</view>
									<u-icon name="checkmark-circle-fill" color="#45D91E" v-if="item.recommendValid == true"></u-icon>
								</view>
							</view>
							<!--总赌注-->
							<view class="item_list_box">
								<view>{{$t('PlayerPage.totalbet')}}</view>
								<view>{{(item.betAmount/100).toFixed(2)}}</view>
							</view>
							<!--我的利润-->
							<view class="item_list_box">
								<view>{{$t('PlayerPage.myprofit')}}</view>
								<view>{{myLirun(item)}}</view>
							</view>
							
							
							
							<view v-show="moreLookIdx.indexOf (index)!=-1">
								<!--直接佣金-->
								<view class="item_list_box">
									<view>{{$t('PlayerPage.BettingContribution')}}</view>
									<view>{{(item.betContribution/100).toFixed(2)}}</view>
								</view>
								<!--间接佣金-->
								<view class="item_list_box">
									<view>{{$t('PlayerPage.AgentContribution')}}</view>
									<view>{{(item.agentContribution/100).toFixed(2)}}</view>
								</view>
								<!--推荐奖金-->
								<view class="item_list_box">
									<view>{{$t('PlayerPage.Referralbonus')}}</view>
									<view>{{(item.recommendReward/100).toFixed(2)}}</view>
								</view>
							</view>
							
							
							
							
							<view class="more_icon" @click="moreLook(item,index)" :style="{paddingTop: moreLookIdx.indexOf (index)!=-1?'0':''}">
								<view class="moreIcon" :class="[moreLookIdx.indexOf (index)!=-1?'showOptions' : 'no-showOptions']">
									<u-icon name="arrow-up" color="#98abcf"></u-icon>
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
		
		
		
		
		<view class="fenyeqi_myxx" v-if="page.total != 0">
			<page-pagination :total="page.total" :pageSize="page.pageSize" :showBorder="false" :numAround="true" @change="changePage"></page-pagination>
		</view>

	</view>
</template>

<script>
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		name: "my-Recommendedby",
		components: {
			cusSelects
		},
		data() {
			return {
				showOptions: true,
				placeholderStyle: "color: #58647c;",
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
				},
				avatarlist: [{
					img: '/static/touxiang/1.png',
					id: 1
				}, {
					img: '/static/touxiang/2.png',
					id: 2
				}, {
					img: '/static/touxiang/3.png',
					id: 3
				}, {
					img: '/static/touxiang/4.png',
					id: 4
				}, {
					img: '/static/touxiang/5.png',
					id: 5
				}, {
					img: '/static/touxiang/6.png',
					id: 6
				}, {
					img: '/static/touxiang/7.png',
					id: 7
				}, {
					img: '/static/touxiang/8.png',
					id: 8
				}, {
					img: '/static/touxiang/9.png',
					id: 9
				}, {
					img: '/static/touxiang/10.png',
					id: 10
				}, {
					img: '/static/touxiang/11.png',
					id: 11
				}, {
					img: '/static/touxiang/12.png',
					id: 12
				}, {
					img: '/static/touxiang/13.png',
					id: 13
				}, {
					img: '/static/touxiang/14.png',
					id: 14
				}, {
					img: '/static/touxiang/15.png',
					id: 15
				}, {
					img: '/static/touxiang/16.png',
					id: 16
				}, {
					img: '/static/touxiang/17.png',
					id: 17
				}, {
					img: '/static/touxiang/18.png',
					id: 18
				}, {
					img: '/static/touxiang/19.png',
					id: 19
				}, {
					img: '/static/touxiang/20.png',
					id: 20
				}],
				avatarlistIdx: 1,
				moreLookIdx: []
				
				
			};
		},
		created() {
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				
			} else {
				this.getList()
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
			myLirun(item){
				//我的利润是这三个相加 ，然后结果/100
				//betContribution+agentContribution+recommendReward
				let total = item.betContribution+item.agentContribution+item.recommendReward
				return total/100
			},
			moreLook(item,index){
				////console.log(item,index)
				//this.moreLookIdx = index
				//if(this.moreLookIdx==null){
				//   this.moreLookIdx=index  
				//}else{
				//    this.moreLookIdx=null
				//}
				
				if(this.moreLookIdx.indexOf(index) == -1){
					this.moreLookIdx.push(index)
				} else {
					this.moreLookIdx = this.moreLookIdx.filter(item => item != index)
				}
			},
			headId(id){
				let img = ''
				this.avatarlist.forEach(function(item, index) {
					if(item.id == id){img = item.img}
				});
				return img
			},
			changePage(currentPage, type) { // 当前页改变
				let that = this
				
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				setTimeout(()=>{
					that.page.currentPage = currentPage;
					that.pageSize = currentPage
					that.shopsLists = []
					that.getList()
				},400)
				
				
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
			inputKey(e){
				//console.log(e)
				if(!e){
					this.dateType = 1
					this.istype = 1
					this.pageSize = 1
					this.shopsLists = []
					this.getList()
				}
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
	.moreIcon {
		transform: rotate(-180deg);
		transition: all .3s;
		transform-origin: center;
	}
	.showOptions {
		transform: rotate(0) !important;
	}
	
	.no-showOptions {
		transform: rotate(-180deg) !important;
	}
	
	.Data_null {
		margin-bottom: 50px;
	}
	.fenyeqi_myxx {
		position: initial;
		margin: 0 0 20rpx 0;
	}
	.page_wrap {
		padding: 0;
	}

	.Referralbonus_box2 {
		margin: 20rpx 0 30rpx 0;

		.Referral_bonus_item {
			flex: 1;
			background-color: #161c28;
			border-radius: 16rpx;

			.Referral_bonus_item_info {
				padding: 10rpx 30rpx;
				position: relative;
				color: #98abcf;
				.more_icon {
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #161c28;
					padding: 20rpx 0 10rpx 0;
					
				}
				.item_list_box {
					border-bottom: 1px solid;
					border-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #3c4e68 45%, rgba(255, 255, 255, 0) 115%) 2 2 2 2;
					padding: 20rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.ziitem {
						display: flex;
						align-items: center;
						view {
							display: flex;
							align-items: center;
							image {
								margin: 0 10rpx;
								width: 35rpx;
								height: 35rpx;
								border-radius: 200rpx;
								border: 1px solid #2f394a;
							}
						}
						.u-icon {
							margin-left: 10rpx;
						}
					}

					.nobold {
						font-weight: initial !important;
						color: $font-all-color !important;
						display: flex;
						align-items: center;
						.u-icon {
							position: relative;
							top: 2rpx;
							margin-left: 6rpx;
						}
						view {
							display: flex;
							align-items: center;
							
							image {
								margin: 0 10rpx;
								width: 35rpx;
								height: 35rpx;
								border-radius: 200rpx;
								border: 1px solid #2f394a;
							}
						}
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
		border-radius: 10px;
		height: 45px;

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
			background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			height: 45px;
			line-height: 45px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 40rpx;
			color: $font-all-color;
			font-size: 24rpx;
			position: relative;
			right: -2rpx;
			border-radius: 0 12rpx 12rpx 0;
			.u-icon {
				font-size: 34rpx;
			}
		}
	}
	
	/deep/ .select_input {
		height: 40px !important;
		line-height: 40px !important;
	}
	
	/deep/ .select_modal_con {
		top: 12px !important;
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