<template>
	<view :style="theme">

		<u-popup v-model="AllLevelShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="AllLevelShow = false">
				<view>{{$t('DailyRebatePopup.title')}}</view>
			</view>
			<view class="input_box">
				
				<view class="popTitle">{{$t('DailyRebatePopup.prompt')}}</view>
				<view class="line"></view>
				<view class="poptitle2">
					<view>{{$t('DailyRebatePopup.Calculationcycle')}} :</view>
					<view>{{$t('DailyRebatePopup.Calculation1')}}</view>
				</view>
				<view class="line"></view>
				<view class="poptitle2">
					<view>{{$t('DailyRebatePopup.Claimtime')}}</view>
					<view>
						<u-count-down :timestamp="Datas" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down>
					</view>
				</view>
				
				
				<view class="liebiao_box">
					<view class="xlxz_mask" v-if="showOptions" @click="showOptions=false"></view>
					<view class="xialaXuanze">
						<view class="xlxz_input" @click="showXuanze()">
							<view class="xlxz_title">
								<image v-if="defaultXz=='bingo'" src="/static/DaiLiPopup/Bingo.png" mode="widthFix"></image>
								<image v-if="defaultXz=='cards'" src="/static/DaiLiPopup/d0.png" mode="widthFix"></image>
								<image v-if="defaultXz=='fishing'" src="/static/DaiLiPopup/d1.png" mode="widthFix"></image>
								<image v-if="defaultXz=='live'" src="/static/DaiLiPopup/d2.png" mode="widthFix"></image>
								<image v-if="defaultXz=='mini'" src="/static/DaiLiPopup/d4.png" mode="widthFix"></image>
								<image v-if="defaultXz=='slots'" src="/static/DaiLiPopup/d5.png" mode="widthFix"></image>
								<image v-if="defaultXz=='sports'" src="/static/DaiLiPopup/d6.png" mode="widthFix"></image>
								<view v-if="defaultXz=='bingo'">{{$t('ADDnew.Lottery')}}</view>
								<view v-if="defaultXz=='cards'">{{$t('CommissionRatePopup.Cards')}}</view>
								<view v-if="defaultXz=='fishing'">{{$t('CommissionRatePopup.Fishing')}}</view>
								<view v-if="defaultXz=='live'">{{$t('CommissionRatePopup.Live Casino')}}</view>
								<view v-if="defaultXz=='mini'">{{$t('CommissionRatePopup.Mini Games')}}</view>
								<view v-if="defaultXz=='slots'">{{$t('CommissionRatePopup.Slots')}}</view>
								<view v-if="defaultXz=='sports'">{{$t('CommissionRatePopup.Sports')}}</view>
							</view>
							<view class="right_box">
								<u-icon name="arrow-down" size="32" color="#007aff"></u-icon>
							</view>
						</view>
						<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'auto','position':'absolute','top':'0','left':'0','z-index':'100'}" :show="showOptions">
						<view class="scroll_wrap">
							<view class="scroll_wrap_item">
								<view class="scroll_name" v-for="(item,index) in TabsList" :key="index" @click="clickTabs(item,index)" :class="tabsIdx == index?'xuanzhong':''">
									<image v-if="item.name=='bingo'" src="/static/DaiLiPopup/Bingo.png" mode="widthFix"></image>
									<image v-if="item.name=='cards'" src="/static/DaiLiPopup/d0.png" mode="widthFix"></image>
									<image v-if="item.name=='fishing'" src="/static/DaiLiPopup/d1.png" mode="widthFix"></image>
									<image v-if="item.name=='live'" src="/static/DaiLiPopup/d2.png" mode="widthFix"></image>
									<image v-if="item.name=='mini'" src="/static/DaiLiPopup/d4.png" mode="widthFix"></image>
									<image v-if="item.name=='slots'" src="/static/DaiLiPopup/d5.png" mode="widthFix"></image>
									<image v-if="item.name=='sports'" src="/static/DaiLiPopup/d6.png" mode="widthFix"></image>
									<view v-if="item.name=='bingo'">{{$t('ADDnew.Lottery')}}</view>
									<view v-if="item.name=='cards'">{{$t('CommissionRatePopup.Cards')}}</view>
									<view v-if="item.name=='fishing'">{{$t('CommissionRatePopup.Fishing')}}</view>
									<view v-if="item.name=='live'">{{$t('CommissionRatePopup.Live Casino')}}</view>
									<view v-if="item.name=='mini'">{{$t('CommissionRatePopup.Mini Games')}}</view>
									<view v-if="item.name=='slots'">{{$t('CommissionRatePopup.Slots')}}</view>
									<view v-if="item.name=='sports'">{{$t('CommissionRatePopup.Sports')}}</view>
								</view>
							</view>
						</view>
						</uni-transition>
					</view>
					<view class="tab_list_wrap">
						<view class="tab_list_title">
							<view>{{$t('DailyRebatePopup.Level')}}</view>
							<view>{{$t('DailyRebatePopup.DailyRebate')}}</view>
						</view>
						<view class="tabl_list_box">
							<scroll-view scroll-y="true" style="height: 526rpx;">
								<view class="tabl_list_box_item" v-for="(item,index) in tablData" :key="index"><!-- :class="[removeCharLevel(item.level) == userInfo.vip?'mylevel':'']"-->
									<view class="tabl_list_box_item_box" :class="[statLevel == index?'mylevel':'']"> <!-- -->
										<view class="level_box">{{item.level}}</view>
										<view class="leve_val">{{item.rebate}}‱</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				
				
				
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "DailyRebate-Popup",
		props: {

		},
		data() {
			return {
				AllLevelShow: false,
				defaultXz: '',
				showOptions: false,
				
				TabsList: [],
				tabsList: [{
					name: 'Slots',
					icon: '/static/image/home/icons8-lhj.png'
				}, {
					name: 'Live',
					icon: '/static/image/home/icons8-live.png'
				}, {
					name: 'Fishing',
					icon: '/static/image/home/icons8-yu.png'
				}, {
					name: 'Sports',
					icon: '/static/image/icons8-qiu-64.png'
				}],
				tabsIdx: 0,
				
				tablData: [],
				statLevel: 0,
				userInfo: {},
				Datas: ''
			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				
			}else {
				this.getuserinfo()
			}
			this.getData()
			
		},
		mounted() {
		
		},
		filters: {
		  removeChar(value, charToRemove) {
		  	if (!value) return '';
		  	return value.replace(new RegExp(charToRemove, 'g'), '');
		  }
		},
		methods: {
			showXuanze(){
				if(this.showOptions == true){
					this.showOptions = false
				}else {
					this.showOptions = true
				}
			},
			getuserinfo() {
				let that = this
				that.$u.post('/user/get/info', {}).then(res => {
					that.userInfo = res.data
					that.statLevel = res.data.vip
				})
			},
			getData(){
				let that = this
				that.$u.post('/vip/rebate/cfg', {///promotion/rebate/cfg
				
				}).then(res => {
					
					if(res.data.length != 0){
						const vueObj = res.data;
						const arr = Object.values(vueObj);
						const propertyNames = Object.keys(vueObj);
						let vueObjs = propertyNames
						let newArry = []
						vueObj.forEach((item, index) => {
							//////console.log(propertyNames)
							newArry.push({
								name: item.name,
								icon: '/static/DaiLiPopup/d' + index + '.png',
								list: item.list
							})
						})
						that.TabsList = newArry
						//////console.log('最终',newArry)
						this.tablData = newArry[0].list
						
						/*const vueObj = res.data.cfg;
						const arr = Object.values(vueObj);
						const propertyNames = Object.keys(vueObj);
						let vueObjs = propertyNames
						let newArry = []
						vueObj.forEach((item, index) => {
							////console.log(propertyNames[index])
							newArry.push({
								name: item.name,
								icon: '/static/DaiLiPopup/d' + index + '.png',
								list: item.list
							})
						})*/
						
						//that.TabsList = newArry
						////console.log('最终',newArry)
						that.defaultXz = newArry[0].name
						//this.tablData = newArry[0].list
						//that.statLevel = res.data.statLevel
					}
				})
			},
			removeCharLevel(value) {
				return value.replace(new RegExp('Level', 'g'), '');
			},
			clickTabs(item,idx) {
				this.tabsIdx = idx
				this.defaultXz = item.name
				this.tablData = item.list
				this.showOptions = false
			},
			openPopup(data) {
				this.Datas = data
				this.AllLevelShow = true
			},
			closewindows() {
				this.AllLevelShow = false
			},
			
			







		}
	}
</script>

<style lang="scss">
	
	.line {
	    background: linear-gradient(90deg, #ffffff00 -3%, #ffffff17 48.66%, #ffffff00 103.12%);
	    height: 1px;
	    margin: 15px 0;
	    width: 100%;
	}
	
	.liebiao_box {
		position: relative;
		width: 100%;
	}
	
	.input_box {
		width: 100%;
		position: relative;
		padding: 30rpx 30rpx 30rpx 30rpx;
		.popTitle {
			color: #596780;
			font-size: 28rpx;
		}
		.poptitle2 {
			margin-bottom: 30rpx;
			view:nth-child(1){
				color: #596780;
			}
			view:nth-child(2){
				color: $all-secondary-text-color;
			}
		}
		
		.input_item {
			margin-bottom: 30rpx;
		
			.input_item_title {
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-size: 28rpx;
			}
		
			.input_item_true {
				background-color: $all-secondary-color;
				border: 1px solid $input-border-color;
				border-radius: 10px;
				padding: 0 16rpx;
				height: 50px; 
			}
		}
		
		.Agreement {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: $font-all-color;
		}
		
		.Register_btn {
			width: 100%;
			margin: 40rpx auto 22rpx;
		}
		.xuanzhong {
			color: #ffffff !important;
			background-color: #2283f6 !important;
		}
		.xxk_box {
			padding: 0 12px;
			border-radius: 200rpx;
			.moren {
				flex: 1;
				margin: 0 8rpx;
		
				.moren_item {
					color: $me-text-color;
					border-radius: 10rpx;
					height: 74rpx;
					//font-weight: bold;
					display: flex;
					align-items: center;
					justify-content: center;
		
					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 4rpx;
					}
		
					view {
						font-size: 28rpx;
					}
				}
			}
		
			.moren:first-child {
				margin-left: 0;
			}
		
			.moren:last-child {
				margin-right: 0;
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
	
	::v-deep .uni-table-tr:nth-of-type(2n) {
		background-color: #B1BAD3;
	}
	
	::v-deep .uni-table-tr {
		background-color: $all-secondary-color;
	}
	.xlxz_mask {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 99;
		background-color: #0000006b;
		border-radius: 20rpx;
	}
	.xialaXuanze {
		position: relative;
		z-index: 101;
		//padding: 14rpx 0;
		.scroll_wrap {
			position: absolute;
			width: 95%;
			margin: 0 auto;
			left: 0;
			right: 0;
			top: 110rpx;
			.scroll_wrap_item {
				background-color: $select-drop-down-color;
				padding: 20rpx;
				border-radius: 16rpx;
				.scroll_name {
					display: flex;
					align-items: center;
					padding: 20rpx 20rpx;
					border-radius: 10rpx;
					color: #B2B9D0;
					image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
		.xlxz_input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			padding: 15rpx 30rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 16rpx;
			.xlxz_title {
				display: flex;
				align-items: center;
				color: $all-secondary-text-color;
				image {
					width: 38rpx;
					margin-right: 10rpx;
				}
				view {
					font-weight: bold;
				}
			}
			.right_box {
				
			}
		}
	}
	
	.shopTuijian {
		padding: 30rpx;
		background-color: $home-games-wrap-color;
	}
	
	.uni-swiper-tab {
		white-space: nowrap;
	}
	
	.scrollx_items {
		text-align: left;
		display: inline-block;
		width: auto;
		box-sizing: border-box;
		margin-right: 5px;
	}
	
	.scrollx_items:first-child {
		//margin-left: 30rpx;
	}
	
	.scrollx_items:last-child {
		margin-right: 0;
	}
	.jieshao_box {
		width: 95%;
		margin: 20rpx auto;
		padding: 30rpx;
		background: $thcz-back-btn-bg-color;
		border-radius: 12px;
		view {
			color: $all-secondary-text-color;
		}
		view:nth-child(1){
			margin-bottom: 20rpx;
		}
	}
	.tab_list_wrap {
		padding: 0 18rpx;
		width: 100%;
		margin: 14rpx auto 0;
		background-color: $all-secondary-color;
		border-radius: 20rpx;
		.tab_list_title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 74.31rpx;
			line-height: 74.31rpx;
			border-radius: 0;
			
			view {
				height: 37px;
				line-height: 37px;
				word-break:break-all;
				display:-webkit-box;
				-webkit-line-clamp:1;
				-webkit-box-orient:vertical;
				overflow:hidden;
			}
	
			view:nth-child(1) {
				flex: 1;
				//width: 150rpx;
				font-size: 24rpx;
				color: #98abcf;
				text-align: left;
			}
	
			view:nth-child(2) {
				flex: 1;
				font-size: 24rpx;
				color: #98abcf;
				text-align: right;
			}
	
			view:nth-child(3) {
				flex: 1;
				font-size: 24rpx;
				color: #98abcf;
				text-align: center;
			}
		}
	
		.tabl_list_box {
			
			.tabl_list_box_item {
				
				.mylevel {
					//background-image: linear-gradient(to left, rgba(0, 0, 0, 0), #346ed0);
					background-color: #2283f6 !important;
					border-radius: 16rpx;
					color: #ffffff !important;
				}
				.tabl_list_box_item_box {
					border-radius: 16rpx;
					margin: 0 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 74.31rpx;
					line-height: 74.31rpx;
					color: #55657e;
					.level_box {
						flex: 1;
						padding-left: 20rpx;
					}
					.leve_val {
						padding-right: 20rpx;
						color: $all-secondary-text-color;
					}
				}
			}
	
			.tabl_list_box_item:nth-of-type(2n) {
				//background-color: #12171c;
			}
	
			.tabl_list_box_item {
				//background-color: #1e2b37;
			}
		}
	
	}
	
	.to_SignIn {
		background-color: $all-secondary-color;
		text-align: center;
		height: 83rpx;
		line-height: 83rpx;
		color: $font-all-color;
		font-size: 24rpx;
	}
	
</style>