<template>
	<view :style="theme" class="page_boxs">
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('GamingHistoryPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->
		
		<pagesNavTitle ref="" :title="$t('GamingHistoryPage.title')"></pagesNavTitle>
		
		<view class="page_wrap">

			<!--<view class="type_box">
				<view class="type_box_item">
					<view>Settled Bets</view>
					<image src="/static/image/arrow_right_icon.png"></image>
				</view>
			</view>-->
			<view class="type_box_wrap">
				<view class="type_box" style="margin-right:10rpx;">
					<view class="type_box_item">
						<cus-selects :Height="'auto'" :placeholder="placeholderGH1" :jiahao="0" :closeSelect.sync='close2' :data="PopularListGH1" v-model="value2" @change='change2' :valueType="alias2"></cus-selects>
					</view>
				</view>
				<view class="type_box" style="margin-left:10rpx;">
					<view class="type_box_item">
						<cus-selects :Height="'220px'" :placeholder="placeholderGH2" :jiahao="0" :closeSelect.sync='close' :data="selectList" v-model="value" @change='change' :valueType="alias"></cus-selects>
					</view>
				</view>
			</view>

			<view class="list_wrap" v-if="shopsLists.length != 0">
				<view class="list_item" v-for="(item,index) in shopsLists" :key="index">
					<view class="list_item_title">
						<view>{{item.orderNo}}</view>
						<image src="/static/image/me/fuzhi_icon.png" mode="widthFix" @click="copy(item.orderNo)"></image>
					</view>
					<view class="item_time" style="margin: 10rpx 0;">
						<view class="time_name">{{item.time}}</view>
						<view class="time_type">
							<view>{{$t('GamingHistoryPage.Bet')}}</view>
							<view>{{(item.betAmount/100).toFixed(2)}}</view>
						</view>
					</view>
					<view class="item_time">
						<view class="time_name">{{item.vendorName}}/{{item.gameName}}</view>
						<view class="time_type">
							<view>{{$t('GamingHistoryPage.W/L')}}</view>
							<view class="lvse" :class="isNum(item.winLost) == -1 ? 'hongse': ''">{{(item.winLost/100).toFixed(2)}}</view>
							
						</view>
					</view>
				</view>
			</view>
			<view class="Data_null" v-else>
				<image src="/static/image/NoOrders.png" mode="widthFix"></image>
				<view>No Datas</view>
			</view>
		</view>
		
		<!--<view class="more_btn" v-if="Nomore == 0">
			<u-button type="warning" :loading="btnStatus" @click="LookMore()">{{$t('LoadMore')}}</u-button>
		</view>-->
		<!-- <view style="height: 140rpx;"></view> -->
		
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
				Nomore: 0,
				showOptions: true,
				pageSize: 1,
				istype: 0,
				isDate: 4,
				shopsLists: [],
				
				btnStatus: false,
				
				value: '0',
				selectList: [],
				alias: { //别名来代指一下
					label: 'name',
					value: 'id'
				},
				close: false,
				
				
				
				value2: '4',
				selectList2: [],
				alias2: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close2: false,
				
				vendorsList:[],
				
				page: {
					total: 0,
					pageSize: 10,
					currentPage: 1
				}
				
			}
		},
		onLoad() {
			let isToken = uni.getStorageSync("token");
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			if(!isToken){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				this.getlist()
				this.GetGamesType()
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
			placeholderGH1(){
				let Popular = this.$t('DetailsPage.DateOption1')
				return Popular
			},
			PopularListGH1() {
				let arry = [
				//{
				//	id: 0,
				//	title: this.$t('DetailsPage.Status0'),
				//},
				{
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
			placeholderGH2(){
				let Popular = this.$t('Providers')
				return Popular
			},
			PopularListGH2() {
				let newarry = []
				let arry = [{
					id: 0,
					name: this.$t('Providers'),
					path: ""
				}]
				let low = arry.concat(this.selectList)
				
				low.forEach((item, index) => {
					if(index != 0){
						newarry.push(item)
					}
				});
				
				//console.log('asd',newarry)
				return newarry
			}
		},
		watch: {
			
		},
		methods: {
			//判断是否负数
			isNum(val){
				let Num = Math.sign(val)
				return Num
			},
			async GetGamesType(proid) {
				let that = this
				const ress = await that.$u.post('/game/category', {})
				let NewProlist = [{
					id: 0,
					name: this.$t('Providers'),
					path: ""
				}]
				ress.data.vendors.forEach((item, index) => {
					NewProlist.push({
						id: item.id,
						name: item.name,
						path: item.path
					})
				});
				that.selectList = NewProlist
			},
			
			
			change2(e) {
				let that = this
				//////console.log(e) //这里返回的是value值
				this.isDate = e
				that.pageSize = 1
				that.shopsLists = []
				that.getlist()
				that.Nomore = 0
			},
			change(e) {
				let that = this
				////console.log(e) //这里返回的是value值
				that.istype = e
				that.pageSize = 1
				that.shopsLists = []
				that.getlist()
				that.Nomore = 0
			},
			LookMore(){
				let that = this
				that.btnStatus = true
				setTimeout(()=>{
					that.btnStatus = false
					that.pageSize++
					that.getlist()
				},1000)
			},
			getlist(){
				let that = this
				this.$u.post('/game/record/user-bet', {
					page: this.pageSize, // number 是 页数，首次填1
					dateType: that.isDate, //日期类型（0全部1今天2昨天3七天4三十天内）
					vendorId: this.istype //厂商id
				}).then(res => {
					
					that.page.total = res.data.totalPage * 10
					that.page.pageSize = res.data.pageSize
					that.page.currentPage = res.data.page
					
					console.log('游戏历史',that.page)
					
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
				}).catch(err => {
				
				})
			},
			copy(text) {
				let that = this
				uni.setClipboardData({
					data: text, // 设置要复制的文本内容
					showToast: false,
					success(res) {
						//////console.log("成功复制到剪贴板");
						uni.showToast({
							title:  that.$t('Betting requirements.register7'),
							icon: 'none',
							duration: 3000
						})
					},
					fail(err) {
						//console.error("复制失败", err);
					}
				});
			},
			changePage(currentPage, type) { // 当前页改变
				let that = this
				that.page.currentPage = currentPage;
				that.pageSize = currentPage
				that.shopsLists = []
				that.getlist()
				//////console.log("点击了" + type + "，当前页：" + currentPage);
			},
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		padding: 20rpx 20rpx;
		//height: 100%;
		background-color: $body-bg-color !important;
	}
	
	/deep/ .select_input {
		height: 40px !important;
		line-height: 40px !important;
	}
	
	/deep/ .select_modal_con {
		top: 12px !important;
	}
	
	.type_box_wrap {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.type_box {
		flex: 1;
		margin: 0 0 0 0;
		.type_box_item {
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			border-radius: 10px;
			padding: 2rpx 0;
		}
	
		.marginl {
			margin-right: 10rpx;
		}
	
		.marginr {
			margin-left: 10rpx;
		}
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
					width: 200rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					color: $font-all-color;

					view:nth-child(1) {
						flex: 1;
						text-align: left;
					}

					view:nth-child(2) {
						text-align: right;
						//font-weight: bold;
					}

					.lvse {
						color: #45D91E;
					}
					.hongse {
						color: #f00 !important;
					}
				}
			}
		}
	}
</style>