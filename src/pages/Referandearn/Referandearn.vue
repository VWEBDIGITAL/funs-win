<template>
	<view :style="theme" class="page_boxs">
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('ReferPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>

		

		<AgentBonusRatePopup ref="agentBonusrate"></AgentBonusRatePopup>
		<ReferralBonus ref="ReferralBonus"></ReferralBonus>

		<view class="erweim">
			<yz-qr @qrOpen="Openqr" :qrPath.sync="qrPath" :text="recommendedLink" :size="size" :quality="quality" :colorDark="colorDark" :colorLight="colorLight"></yz-qr>
		</view>

		<view class="page_wrap" v-if="is_login==1">
			<view class="btns-static">
				<view class="page_title">{{$t('NEWReferpageB.title')}}</view>
				<view class="item_one" @click="Topages('/pages/recommend/recommend')"><u-icon name="volume-fill" color="#007aff" size="30"></u-icon>{{$t('NEWReferpageB.ReferralBTN')}}</view>
			</view>
			
			<view class="tabs_sm">
				<view :class="tabsIdx == 0?'curbg':''" @click="curClick(0)">{{$t('NEWReferpageB.Dashboard')}}</view>
				<view :class="tabsIdx == 1?'curbg':''" @click="curClick(1)">{{$t('NEWReferpageB.Referrals')}}</view>
			</view>



			<view v-if="tabsIdx == 0">
				<view class="invite_wrap">
					<view class="statistics">
						<view class="statistics_item">
							<image class="fhya" src="/static/recommend/total-profit.webp" mode="widthFix"></image>
							<view class="mysy">{{$t('NEWReferpageB.Mytotalprofit')}}
							</view>
							<view class="mysynum">
								
								<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
								<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
								<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
								
								{{(available.totalIncome/100).toFixed(2)}}</view>
						</view>
						<view class="rightBorder"></view>
						<view class="statistics_item">
							<image class="fhya" src="/static/recommend/total-referrals.webp" mode="widthFix"></image>
							<view class="mysy">{{$t('NEWReferpageB.Totalreferrals')}}
							</view>
							<view class="mysynum">{{available.referralUserCount}}</view>
						</view>
					</view>
					<view class="proposition">
						<uni-row :gutter="30" class="demo-uni-row">
							<uni-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
								<view class="proposition__inner">
									<h4 class="proposition__title">{{$t('NEWReferpageB.invite1')}}</h4>
									<view class="proposition__info"><u-icon name="checkbox-mark" color="#b7c5dc" size="28"></u-icon><span>{{$t('NEWReferpageB.invite2',{MAX:weidengluData.maxBonus/100})}}</span></view>
									<view class="proposition__info"><u-icon name="checkbox-mark" color="#b7c5dc" size="28"></u-icon><span>{{$t('NEWReferpageB.invite3',{max:weidengluData.maxRate})}}</span></view>
									<image class="bg bg__money-bg" mode="widthFix" src="/static/recommend/invite-money-bg.webp"></image>
								</view>
							</uni-col>
						</uni-row>
						
						<view class="inputs__title">{{$t('NEWReferpageB.Yourreferrallink')}}:</view>
						
						<uni-row :gutter="30" class="demo-uni-row">
							<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<view class="yq_caozuo">
									<!-- <view class="inputs__title" style="margin-top: 30rpx;">{{$t('NEWReferpageB.Yourreferrallink')}}:</view> -->
									<view class="input_animated">
										<view class="input_animated_icon">
											<u-icon name="attach" color="#55657e" size="40"></u-icon>
										</view>
										<view class="input_animated_link">
											<view>{{$t('ReferPage.RecommendedLink')}}</view>
											<view>https://{{recommendedLink}}</view>
										</view>
										<view class="input_animated_btn" @click="copy(recommendedLink)">
											<image src="/static/image/fuzhi-3.png"></image>
										</view>
									</view>
								</view>
							</uni-col>
							<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<view class="yq_caozuo">
									<!-- <view class="inputs__title" style="margin-top: 30rpx;">{{$t('NewlyAdded.ReaferralQR')}}:</view> -->
									<view class="input_animated">
										<view class="input_animated_icon">
											<u-icon name="coupon-fill" color="#55657e" size="40"></u-icon>
										</view>
										<view class="input_animated_link">
											<view>{{$t('NewlyAdded.ReaferralQR')}}</view>
											<view>{{newCode}}</view>
										</view>
										<view class="input_animated_btn" @click="copy(newCode)">
											<image src="/static/image/fuzhi-3.png"></image>
										</view>
									</view>
								</view>
							</uni-col>
						</uni-row>
						<view class="yq_caozuo">
							<view class="input_animated_btnbox">
								<view class="fenxBtn1" @click="webShare()"><span>{{$t('RecommendPopup.title1')}}</span></view>
								<view class="fenxBtn2" @click="Openqr()"><span>{{$t('NEWReferpageB.QRBTN')}}</span></view>
							</view>
						</view>
					</view>
				</view>
				
				
				
				
				<view class="balance_wrap">
					<view class="balance__header">
						<view class="balance__title">{{$t('NEWReferpageB.Mybalance')}}</view>
						<!--<view class="balance__my-ref">
							<span>推荐我的人</span>
							<view class="user-data">
								<image src="/static/touxiang/6.png"></image>
								<view>User5426646</view>
							</view>
						</view>-->
					</view>
					<view class="balance__cards">
						
						<uni-row :gutter="30" class="demo-uni-row">
							<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<view class="balance__card">
									<view class="card__content">
										<view class="card__header">
											<h3 class="card__title">{{$t('NEWReferpageB.ReferralBonus')}}</h3>
											<view class="card__link" @click="LookDetails2()">
												{{$t('NEWReferpageB.Details')}}<u-icon name="arrow-right" color="#2283f6"
													size="26"></u-icon>
											</view>
										</view>
										<view class="card__main-top">
											<view class="text">{{$t('NEWReferpageB.Available')}}</view>
											<view class="daolefu">
												
												<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
												<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
												<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
												
												{{(available.referralBonus/100).toFixed(2)}}
											</view>
										</view>
										<view class="card__main-bottombain"></view>
										<view class="card__main-bottom">
											<image src="/static/recommend/locked-icon.webp" mode="widthFix"></image>
											<view class="text">
												<view class="title">{{$t('NEWReferpageB.LockedBalance')}}</view>
												<view class="value">{{(available.lockedBonus/100).toFixed(2)}}</view>
											</view>
										</view>
										<view class="card__footer" >
											<view class="card__footerBtn" @click="Lingqu1()">
												<view :class="available.referralBonus==0?'card__footerBtn_opacity':''">{{$t('NEWReferpageB.ClaimAvailableBonus')}}</view>
											</view>
										</view>
									</view>
								</view>
							</uni-col>
							<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<view class="balance__card">
									<view class="card__content">
										<view class="card__header">
											<h3 class="card__title">{{$t('NEWReferpageB.CommissionRewards')}}</h3>
											<view class="card__link" @click="LookDetails()">
												{{$t('NEWReferpageB.Details')}}<u-icon name="arrow-right" color="#2283f6"
													size="26"></u-icon>
											</view>
										</view>
										<view class="card__main-top">
											<view class="text">{{$t('NEWReferpageB.Available')}}</view>
											<view class="daolefu">
												
												<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
												<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
												<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
												
												{{(available.commission/100).toFixed(2)}}
											</view>
										</view>
										<view class="card__main-bottombain"></view>
										<view class="lookfyong" @click="LookMingxi()">{{$t('NEWReferpageB.ViewCommission')}}<u-icon name="arrow-right" color="#3c485c" size="26"></u-icon></view>
										
										<view class="card__footer" v-if="managerFlag == 0">
											<view class="card__footerBtn" @click="Lingqu2()">
												<view :class="available.commission==0?'card__footerBtn_opacity':''">{{$t('NEWReferpageB.ClaimAvailableBonus')}}</view>
											</view>
										</view>
										<view class="card__footer" v-if="managerFlag == 1">
											<view class="card__footerBtn">
												<view class="card__footerBtn_opacity">{{$t('NEWReferpageB.ClaimAvailableBonus')}}</view>
											</view>
										</view>
										
									</view>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</view>
				
				
				

				

				<uni-row :gutter="30" class="demo-uni-row">
					<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<view class="charts-box">
							<view class="areTitle_wrap">
								<view class="areTitle">{{$t('NEWReferpageB.MyReferrals')}}</view>
								<view class="type_sec_box">
									<view class="type_sec_box_item" v-for="(itemt,indext) in typeSecList" :key="indext" @click.stop="ClicktypeSec(itemt,indext)">
										<image src="/static/image/xuanzhong_2.png" v-if="typeSecidx==indext"></image>
										<image src="/static/image/xuanzhong.png" v-else></image>
										<span :style="{color: typeSecidx==indext?'#007aff':''}"
											v-if="itemt.type==3">{{$t('DetailsPage.DateOption3')}}</span>
										<span :style="{color: typeSecidx==indext?'#007aff':''}"
											v-if="itemt.type==4">{{$t('DetailsPage.DateOption4')}}</span>
									</view>
								</view>
							</view>
							<qiun-data-charts type="area"
								:opts="{legend:{show:false},xAxis:{disabled:true,axisLine:false,fontColor:'#7e92b7',showTitle:true,boundaryGap:'justify'},yAxis:{disabled:true,disableGrid:true,gridType:'solid',gridColor:'#7e92b7'},extra:{tooltip:{splitLine:true,showCategory:false,legendShow:true,horizentalLine:false,gridType:'dash',legendShape:'circle',gridColor:'#7e92b7'},area:{type:'curve',addLine:true,gradient:false}},fontColor:'#7e92b7',dataLabel:false,dataPointShape:false,padding:[50,15,50,15],fontSize:10}"
								:chartData="chartsDataArea1" />
							<view class="myheji_box">
								<view class="heji_box1">
									<p></p><view class="heji_name">{{$t('NEWReferpageB.TotalReferrals')}} </view><span>{{is_userCountTotal}}</span>
								</view>
								<view class="heji_box2">
									<p></p><view class="heji_name">{{$t('NEWReferpageB.TotalDeposits')}} </view><span>{{is_depositsTotal}}</span>
								</view>
							</view>
						</view>
						
						<view class="charts-box charts-boxbgcolor">
							<view class="areTitle_wrap">
								<view class="areTitle">{{$t('NEWReferpageB.MyProfit')}}</view>
								<view class="type_sec_box">
									<view class="type_sec_box_item" v-for="(items,indexs) in typeSecList2" :key="indexs" @click.stop="ClicktypeSec2(items,indexs)">
										<image src="/static/image/xuanzhong_3.png" v-if="typeSecidx2==indexs"></image>
										<image src="/static/image/xuanzhong.png" v-else></image>
										<span :style="{color: typeSecidx2==indexs?'#007aff':''}"
											v-if="items.type==3">{{$t('DetailsPage.DateOption3')}}</span>
										<span :style="{color: typeSecidx2==indexs?'#007aff':''}"
											v-if="items.type==4">{{$t('DetailsPage.DateOption4')}}</span>
									</view>
								</view>
							</view>
							<qiun-data-charts type="area"
								:opts="{legend:{show:false},xAxis:{disabled:true,axisLine:false,fontColor:'#7e92b7',showTitle:false,boundaryGap:'justify'},yAxis:{disabled:true,disableGrid:true,gridType:'solid',gridColor:'#7e92b7'},extra:{tooltip:{splitLine:true,showCategory:false,legendShow:true,horizentalLine:false,gridType:'dash',legendShape:'circle',gridColor:'#7e92b7'},area:{type:'curve',addLine:true,gradient:false}},fontColor:'#7e92b7',dataLabel:false,dataPointShape:false,padding:[50,15,50,15],fontSize:10}"
								:chartData="chartsDataArea2" />
							<view class="mysyi">{{$t('NEWReferpageB.MyTotalProfit')}}：<span>
							
							<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
							<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
							<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
							
							{{(Totalrevenue/100).toFixed(2)}}</span></view>
						</view>
					</uni-col>
					<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<view class="rewards__live">
							<view class="rewards__top">
								<h3 class="rewards__title">{{$t('NEWReferpageB.LiveRewards')}}</h3>
								<view class="rewards__total">
									<view class="total__container">
										<view class="total__title">{{$t('NEWReferpageB.TotalRewards')}}</view>
										<view class="total__value">
											
											<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
											<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
											<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
											
											{{(weidengluData.totalPaid/100).toFixed(2)}}</view>
									</view>
								</view>
								<!-- #ifdef H5 -->
								<vue-seamless-scroll :data="listData" :class-option="classOption" class="warp">
									<ul class="item">
										<li v-for="(item, index) in listData" :key="index">
											<view class="u_ifno">
												<image class="title" :src="item.icon"></image>
												<span class="uname">{{item.name}}</span>
											</view>
											<view class="uprice">{{item.price}}.00</view>
										</li>
									</ul>
								</vue-seamless-scroll>
								<!-- #endif -->
						
							</view>
							<view class="rewards__main-bottombain"></view>
							<view class="rewards__bottom">
								<h3 class="rewards__title">{{$t('NEWReferpageB.Leaderboard')}}</h3>
								<view class="rewards__leaderboard">
									<view class="mignci1">
										<view class="mignci_tx">
											<image class="tx_av" src="/static/touxiang/1.png"></image>
											<image class="tx_chib" mode="widthFix" src="/static/recommend/wreath_place-2.png">
											</image>
											<view class="mignci_num1">2</view>
										</view>
										<view class="mingci_text">NemeanLion</view>
									</view>
									<view class="mignci2">
										<view class="mignci_tx">
											<image class="tx_av" src="/static/touxiang/2.png"></image>
											<image class="tx_chib" mode="widthFix" src="/static/recommend/wreath_place-1.png">
											</image>
											<view class="mignci_num2">1</view>
										</view>
										<view class="mingci_text">RedFury</view>
									</view>
									<view class="mignci3">
										<view class="mignci_tx">
											<image class="tx_av" src="/static/touxiang/3.png"></image>
											<image class="tx_chib" mode="widthFix" src="/static/recommend/wreath_place-3.png">
											</image>
											<view class="mignci_num3">3</view>
										</view>
										<view class="mingci_text">NeoToad</view>
									</view>
									<view class="rewards__leaderboard-wrap">
										<view class="status">{{$t('NEWReferpageB.ComingSoon')}}</view>
									</view>
								</view>
								<view class="rewards__btn"><span>{{$t('NEWReferpageB.GoToLeaderboard')}}</span></view>
							</view>
						</view>
					</uni-col>
				</uni-row>




				





				<uni-row :gutter="30" class="demo-uni-row">
					<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<view class="rewards__my-history">
							<h3 class="rewards__title">{{$t('NEWReferpageB.MyRewardsHistory')}}</h3>
							<My-Jiangjinlishi ref="getLisstJinlishi"></My-Jiangjinlishi>
							<!--<view class="rewards__table_btn">查看全部奖励</view>-->
						</view>
					</uni-col>
					<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<view class="banner referral__banner">
							<view class="banner__top">
								<view class="banner__banner--mob">
									<image class="img-mob" mode="widthFix" src="/static/refer/4.png"></image>
									<image class="banner__coin1" mode="widthFix" src="/static/recommend/coin2-mob.webp"></image>
								</view>
								<h2 class="banner__title">{{$t('NEWReferpageA.Exclusive')}}</h2>
								<p class="banner__desc">{{$t('NEWReferpageA.subtitle5')}}</p>
							</view>
							<view class="banner__bottom">
								<image class="banner__gift" src="/static/recommend/gift.webp" mode="widthFix"></image>
								<image class="banner__coin" src="/static/recommend/coin.webp" mode="widthFix"></image>
								<view class="banner__label">{{$t('NEWReferpageA.title5')}}</view>
								<view class="banner__percent">85%</view>
								<!--<view class="banner__center">
									<p class="banner__text">自注册日起前 2 个月</p>
									<p class="banner__text2">RevShare 50%</p>
								</view>-->
							</view>
							<view class="banner__footer">
								<view class="Register_btn2">
									<view class="zhuceBtn" @click="TochatUrl()"><span>{{$t('NEWReferpageA.BecomeBTN')}}</span></view>
								</view>
							</view>
						</view>
					</uni-col>
				</uni-row>


				<faqlist ref="" :istype="'ReferAndearn'"></faqlist>
			</view>
			<my-Recommendedby v-if="tabsIdx == 1"></my-Recommendedby>
		</view>

		<!-- 关于我们和技术支持 -->
		<home-bottom-info ref="" v-if="is_login==1"></home-bottom-info>

		<u-popup v-model="SignoutShow" width="650" mode="center" close-icon-size="30" border-radius="14"
			:mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="SignoutShow = false">
				<view>{{$t('NewlyAdded.ReaferralQR')}}</view>
			</view>
			<view class="input_box">
				<view class="Agreement">
					<image :src="qrPath"></image>
				</view>
				<view class="Register_btn">
					<u-button type="primary" @click="baoCun()" :loading="btnStatus">
						<u-icon name="download" color="#fff"></u-icon>{{$t('NewlyAdded.Download')}}
					</u-button>
				</view>
			</view>
		</u-popup>
		
		

		<signInPopup ref="signInShow"></signInPopup>
		
		<match-media :max-width="800" >
			<!-- <view>页面宽度低于 800px 时显示</view> -->
			<u-tabbar></u-tabbar>
		</match-media>

	</view>
</template>

<script>
	import Vue from 'vue'

	//#ifdef  H5
	import vueSeamlessScroll from 'vue-seamless-scroll'
	import NativeShare from 'nativeshare'
	//#endif

	//下面是演示数据，您的项目不需要引用，数据需要您从服务器自行获取
	import demodata from '@/mockdata/demodata.json';
	import mapdata from '@/mockdata/mapdata.json'
	
	import { decimalToBase } from '@/utils/Int2Base62Str.js';

	export default {
		components: {
			// #ifdef H5
			vueSeamlessScroll
			// #endif
		},
		data() {
			return {
				platform: this.PID,
				
				managerFlag: 0,
				
				listData: [],
				classOption: {
					step: 0.3, // 数值越大速度滚动越快
					//limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
					//hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					//openWatch: true, // 开启数据实时监控刷新dom
					//singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					//singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					//waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				},
				typeSecList: [{
					type: 3
				}, {
					type: 4
				}],
				typeSecidx: 0,

				typeSecList2: [{
					type: 3
				}, {
					type: 4
				}],
				typeSecidx2: 0,
				dateType_chartOne: 3,
				dateType_chartTwo: 3,
				chartsDataArea1: {},
				chartsDataArea2: {},
				Totalrevenue: 0,
				is_userCountTotal: 0,
				is_depositsTotal: 0,

				tabsIdx: 0,
				is_login: 0,
				SignoutShow: false,
				btnStatus: false,
				showOptions: true,

				qrPath: '',
				text: 'hello',
				size: 70,
				quality: 'L',
				colorDark: '#000000',
				colorLight: '#ffffff',
				weidengluData: {},

				recommendedLink: '',
				newCode: '',
				available: {},
				todayReferral: {},
				todayCommission: {},
				rankList: {},
				TuBiaodate1: [],
				TuBiaoData1: [],
				TuBiaoData2: []
			}
		},
		computed: {
			/*TBiaoDatas: function() {
				setTimeout(()=>{
					let arry = {
							"categories": this.TuBiaodate1,
							"series": [{
								"name": this.$t('NEWReferpageB.TotalReferrals'),
								"data": this.TuBiaoData1,
								"color": "#2fc25b"
						},{
								"name": this.$t('NEWReferpageB.TotalDeposits'),
								"data": this.TuBiaoData2,
								"color": "#007aff"
						}]
					}
					//console.log('短发短发',arry)
					return JSON.parse(JSON.stringify(arry))
				},1500)
			}*/
		},
		onLoad() {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});

			//设置滚动虚拟数据
			setTimeout(() => {
				let arry = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
					'17', '18', '19', '20', '21'
				]
				let newarry = []
				arry.forEach(function(item, index) {
					newarry.push({
						icon: '/static/touxiang/' + (index + 1) + '.png',
						price: Math.ceil(Math.random() * 1000),
						name: 'User' + Math.floor(10000000 + Math.random() * 90000000).toString()
					})
				});
				that.listData = newarry
			}, 100)

		},
		onReady() {
			let that = this;

			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				
			} else {
				//图表模拟从服务器获取数据
				that.getServerData()
			}
		},
		onShow() {
			this.getweidengluData()
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				this.is_login = 0
				//setTimeout(() => {
				//	this.$refs.signInShow.openPopup()
				//}, 500)
				this.$nextTick(() => {
					uni.navigateTo({
						url: '/pages/recommend/recommend'
					})
				})
			} else {
				uni.$emit('getgetMybalance', 1);
				this.is_login = 1;
				this.getDetailsData();
				this.GetrankList();
				this.jisuanWeizhi();
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		watch: {
			qrPath(newVal, oldVal) {
				//////console.log('最新地址：' + newVal, "原来的地址：" + oldVal);
				return this.qrPath;
			}
		},
		methods: {
			
			//检测禁止功能
			jisuanWeizhi(){
				/*
					num是传managerFlag的值，
					bitPosition是标志位，禁止提取佣金是第5位，你就传5来判断是不是禁止提取佣金
					
					现在第5位是标记禁止提佣金（标记位为1就是禁止，0是不禁止）
					bitPosition的值 {
						0 禁止充值
						1 禁止兑换
						2 禁止存进保险箱
						3 禁止活动
						4 禁止游戏
						5 禁止佣金提现
					}
				*/
				const userInfo = uni.getStorageSync("userinfo");
				const num = userInfo.managerFlag;
				const bitPosition = 5;
				
				const fag = this.checkBit(num, bitPosition) ? '1' : '0'; //1禁止 0不禁止
				this.managerFlag = fag
				
				console.log(`The bit at position ${bitPosition} is ${fag}.`);
			},
			checkBit(num, bitPosition) {
			    const mask = 1 << bitPosition;
			    return (num & mask) !== 0;
			},
			
			
			
			
			
			
			
			
			
			getweidengluData() {
				let that = this
				that.$u.post('/promotion/recommend/base', {

				}).then(res => {
					this.weidengluData = res.data
				})
			},
			getServerData() {
				let that = this
				that.GetChartDataOne()
				that.GetChartDataTwo()
			},
			GetChartDataOne() {
				let that = this
				//查询代理7天或者1个月内的推荐人数和充值人数
				that.$u.post('/promotion/referral/count', {
					dateType: that.dateType_chartOne //7天内传3，1个月内传4
				}).then(res => {
					//console.log('图表1我的推荐人', res.data)
					
					let userCountList = res.data.userCountList
					let depositsList = res.data.depositsList
					
					let Cdate = []//日期
					let userCountData = []//推荐合计
					let depositsData = []//充值合计
					
					let userCountTotal = 0 //计算推荐合计数
					let depositsTotal = 0 //计算充值合计数
					
					userCountList.forEach(function(item, index) {
						Cdate.push(item.date)
					});
					userCountList.forEach(function(item, index) {
						userCountData.push(item.userCount)
						userCountTotal += item.userCount
					});
					depositsList.forEach(function(item, index) {
						depositsData.push(item.deposits)
						depositsTotal += item.deposits
					});
					
					let datas = {
						"categories": Cdate,
						"series": [{
							"name": '',//this.$t('NEWReferpageB.TotalReferrals'),
							"data": userCountData,
							"color": "#2fc25b"
						},{
							"name": '',//this.$t('NEWReferpageB.TotalDeposits'),
							"data": depositsData,
							"color": "#007aff"
						}]
					}
					that.is_userCountTotal = userCountTotal
					that.is_depositsTotal = depositsTotal
					
					that.TuBiaodate1 = Cdate
					that.TuBiaoData1 = userCountData
					that.TuBiaoData2 = depositsData
					
					//console.log('嗷嗷',userCountTotal,depositsTotal,Cdate,userCountData,depositsData);
					
					setTimeout(() => {
						that.chartsDataArea1 = JSON.parse(JSON.stringify(datas))
					}, 1500);
				})
			},
			GetChartDataTwo() {
				let that = this
				//查询代理7天或者1个月内的代理总收益
				that.$u.post('/promotion/income/history', {
					dateType: that.dateType_chartTwo //7天内传3，1个月内传4
				}).then(res => {
					let resList = res.data
					let newData = []//图表的数值
					let newDate = []//图表的日期
					let Total = 0 //计算总收益
					
					resList.forEach(function(item, index) {
						newData.push(item.income/100)
						Total += item.income
					});
					resList.forEach(function(item, index) {
						newDate.push(item.date)
					});
					let datas = {
						"categories": newDate,
						"series": [{
							"name": "",
							"data": newData,
							"color": "#2fc25b"
						}]
					}
					that.Totalrevenue = Total
					////console.log('嗷嗷', Total);

					setTimeout(() => {
						that.chartsDataArea2 = JSON.parse(JSON.stringify(datas))
					}, 1500);
					////console.log('图表2我的收益',res.data)
				})
			},
			ClicktypeSec(item, idx) {
				console.log('1',item, idx)
				let that = this
				that.dateType_chartOne = item.type
				that.typeSecidx = idx
				that.chartsDataArea1 = {}
				that.GetChartDataOne()
			},
			ClicktypeSec2(item, idx) {
				console.log('2',item, idx)
				let that = this
				that.dateType_chartTwo = item.type
				that.typeSecidx2 = idx
				that.chartsDataArea2 = {}
				that.GetChartDataTwo()
			},



















			LookDetails() {
				this.$refs.agentBonusrate.openPopup()
			},
			LookDetails2() {
				this.$refs.ReferralBonus.openPopup()
			},
			curClick(idx) {
				this.tabsIdx = idx
			},
			webShare() {
				let that = this
				//#ifdef  H5
				if (navigator.share) {
					//当浏览器支持此功能
					navigator.share({
						//要共享的标题
						title: this.WebsiteName,
						//要共享的 URL
						url: that.recommendedLink,
						//要共享的文本
						text: this.WebsiteName,
					})
				} else {
					//当浏览器不支持此功能时
					//alert("当前浏览器不支持此功能");
				}
				//#endif

				//#ifdef  APP-PLUS

				//#endif
			},
			copy(text) {
				let that = this
				uni.setClipboardData({
					data: 'https://' + text,
					showToast: false,
					success(res) {
						uni.showToast({
							title:  that.$t('Betting requirements.register7'),
							icon: 'none',
							duration: 3000
						})
					},
					fail(err) {}
				});
			},
			Openqr() {
				let that = this
				that.SignoutShow = true
				////console.log('点击二维码', this.qrPath)
			},
			baoCun() {
				let that = this
				that.btnStatus = true

				//#ifdef  H5
				setTimeout(() => {
					that.btnStatus = false
					const canvas = document.createElement('canvas');
					// 创建新的画布上下文对象
					const context = canvas.getContext('2d');
					// 加载并绘制图像到画布上
					const img = new Image();
					img.onload = () => {
						canvas.width = img.width;
						canvas.height = img.height;
						context.drawImage(img, 0, 0);
						// 将画布内容转换为Data URL格式
						const dataUrl = canvas.toDataURL('image/png');
						// 创建一个a标签，模拟点击下载链接
						const link = document.createElement('a');
						link.href = dataUrl;
						link.download = 'saved_image.png';
						link.dispatchEvent(new MouseEvent('click'));
					}
					img.src = this.qrPath;
				}, 1000)
				//#endif

				//#ifdef  APP-PLUS
				setTimeout(() => {
					that.btnStatus = false

				}, 1000)
				//#endif
			},
			GetrankList() {
				let that = this
				that.$u.post('/promotion/rank', {

				}).then(res => {
					that.rankList = res.data
				})
			},
			getDetailsData() {
				let that = this
				let myid = uni.getStorageSync("userinfo").userId;
				
				let newMyid = decimalToBase(myid);
				that.newCode = newMyid
				console.log('我的新ID',newMyid)
				
				that.$u.post('/promotion/recommend', {

				}).then(res => {
					//console.log('asdfsd', res)
					
					// #ifdef H5
					let url = uni.getStorageSync("LuoDidomain");
					let self_url = url + '/?i=' + newMyid
					// #endif
					
					// #ifdef APP-PLUS
					let self_url = res.data.recommendedLink + '/?i=' + newMyid
					// #endif
					
					that.recommendedLink = self_url
					that.available = res.data.available
					that.todayReferral = res.data.todayReferral
					that.todayCommission = res.data.todayCommission
				})
			},
			ReferrePlayers() {
				uni.navigateTo({
					url: '/pages/ReferredPlayers/ReferredPlayers'
				})
			},
			Lingqu1() {
				let that = this
				that.$u.post('/vip/reward/take', {
					rewardType: 15, // Number 是 领取类型： 3 返水 11 升级礼金 12 生日礼金 13 周礼金 14 月礼金 15是推荐奖金
					vipLevel: uni.getStorageSync("userinfo").vip
				}).then(res => {
					that.$nextTick(() => {
						this.getDetailsData();
						uni.$emit('getgetMybalance', 1)
						uni.$emit('UpdataAddBcbalance', (that.available.referralBonus/100).toFixed(2))
						that.$refs.getLisstJinlishi.getLisst2()
					})
				}).catch(err => {
					that.$nextTick(() => {
						this.getDetailsData();
						uni.$emit('getgetMybalance', 1)
						that.$refs.getLisstJinlishi.getLisst2()
					})
				})
			},
			Lingqu2() {
				let that = this
				that.$u.post('/promotion/take/commission', {

				}).then(res => {
					that.$nextTick(() => {
						this.getDetailsData();
						uni.$emit('getgetMybalance', 1)
						uni.$emit('UpdataAddBcbalance', (that.available.commission/100).toFixed(2))
						that.$refs.getLisstJinlishi.getLisst2()
					})
				}).catch(err => {
					that.$nextTick(() => {
						this.getDetailsData();
						uni.$emit('getgetMybalance', 1)
						that.$refs.getLisstJinlishi.getLisst2()
					})
				})
			},
			Topages(url) {
				uni.navigateTo({
					url: url
				})
			},
			LookMingxi() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				setTimeout(() => {
					this.tabsIdx = 1
				}, 700)
			},
			TochatUrl() {
				let that = this
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
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: calc(100vh);
		background-color: $all-secondary-color !important;
	}
	
	.page_boxs {
		height: auto !important;
	}
	
	.card__footerBtn_opacity {
		opacity: .2;
		border-radius: 24rpx;
	}
	
	/deep/ .chartsview {
		position: relative;
		z-index: 98;
	}

	.warp {
		height: 120px;
		width: 99%;
		margin: 0 auto;
		overflow: hidden;

		ul {
			list-style: none;
			padding: 0;
			margin: 0 auto;

			li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 26rpx 0;

				.u_ifno {
					.title {
						width: 40rpx;
						height: 40rpx;
						border-radius: 200rpx;
						margin-right: 12rpx;
					}

					.uname {
						color: $referandearn-page-boxtitle-color;
					}
				}

				.uprice {
					color: rgb(27, 184, 61);
				}
			}
		}
	}

	.charts-boxbgcolor {
		background: $referandearn-page-boxfour-bg !important;
	}

	.charts-box {
		width: 100%;
		height: 260px;
		padding: 30rpx 0 0 0;
		background: $referandearn-page-boxthree-bg;
		border-radius: 20rpx;
		margin-bottom: 50rpx;
		position: relative;

		.areTitle_wrap {
			width: 100%;
			position: absolute;
			z-index: 99;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;

			.areTitle {
				color: $referandearn-page-boxtitle-color;
				font-weight: bold;
				font-size: 38rpx;
				word-break:break-all;
				display:-webkit-box;
				-webkit-line-clamp:1;
				-webkit-box-orient:vertical;
				overflow:hidden;
			}

			.type_sec_box {
				display: flex;
				align-items: center;

				.type_sec_box_item {
					display: flex;
					align-items: center;
					margin-left: 10rpx;

					image {
						width: 34rpx;
						height: 34rpx;
						margin-right: 6rpx;
					}

					span {
						flex: 1;
						display: inline-block;
						color: #b7c5dc;
						font-size: 26rpx;
						word-break:break-all;
						display:-webkit-box;
						-webkit-line-clamp:1;
						-webkit-box-orient:vertical;
						overflow:hidden;
					}
				}
			}
		}


		.mysyi {
			width: 100%;
			text-align: center;
			position: absolute;
			left: 0;
			right: 0;
			margin: 0 auto;
			bottom: 30rpx;
			color: #98abcf;
			font-size: 28rpx;

			span {
				color: #56b54e;
			}
		}

		.myheji_box {
			width: 100%;
			text-align: center;
			position: absolute;
			left: 0;
			right: 0;
			margin: 0 auto;
			bottom: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #98abcf;

			.heji_box1 {
				margin: 0 10rpx;
				text-align: center;
				display: flex;
				align-items: center;
				
				p {
					margin-right: 6rpx;
					display: block;
					width: 20rpx;
					height: 20rpx;
					border-radius: 200rpx;
					background-color: #2fc25b;
					
				}
				.heji_name {
					flex: 1;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				span {
					padding-left: 10rpx;
					color: #ffffff;
				}
			}

			.heji_box2 {
				margin: 0 10rpx;
				text-align: center;
				display: flex;
				align-items: center;
				
				.heji_name {
					flex: 1;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				p {
					margin-right: 6rpx;
					display: block;
					width: 20rpx;
					height: 20rpx;
					border-radius: 200rpx;
					background-color: #007aff;
				}

				span {
					padding-left: 10rpx;
					color: #ffffff;
				}
			}
		}
	}

	.erweim {
		position: absolute;
		top: -100px;
		left: -100px;
		opacity: 0;
	}

	.reg_title {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			font-size: 30rpx;
			color: #ffffff;
			//font-weight: bold;
		}
	}

	.input_box {
		
		padding: 30rpx;

		.input_item {
			margin-bottom: 30rpx;

			.input_item_title {
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-size: 28rpx;
			}

			.input_item_true {
				background-color: #1c2838;
				border: 1px solid #1c2838;
				border-radius: 10px;
				padding: 0 16rpx;
				height: 50px;
			}
		}

		.Agreement {
			margin: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 350rpx;
				height: 350rpx;
				border-radius: 19rpx;
				padding: 20rpx;
				background-color: #ffffff;
			}
		}

		.Register_btn {
			width: 100%;
			margin: 60rpx auto 0;

			.u-icon {
				margin-right: 10rpx;
			}
		}
	}

	.page_wrap {
		padding: 30rpx;
		margin-inline: auto;
		margin: 0 auto;
		max-width: 1088px;
		width: 100%;
		background-color: $body-bg-color !important;
		.rewards__my-history {
			height: 465px;
			margin: 45rpx 0 45rpx 0;
			background: $referandearn-page-boxfive-six;
			border-radius: 12px;
			padding: 16px;
			width: 100%;
			position: relative;

			.rewards__title {
				font-size: 22px;
				font-weight: 700;
				letter-spacing: -.02em;
				line-height: 28px;
				margin-bottom: 1rem;
				margin-top: 0;
				color: $referandearn-page-boxtitle-color;
			}
		}

		.btns-static {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.page_title {
				font-weight: bold;
				font-size: 38rpx;
				color: $all-secondary-text-color;
				flex: 1;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.item_one {
				width: auto;
				padding: 0 30rpx;
				text-align: center;
				background-color: $all-secondary-color;
				color: $all-secondary-text-color;
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 19rpx;
				font-weight: bold;
				display: flex;
				align-items: center;
				justify-content: center;

				.u-icon {
					margin-right: 10rpx;
				}
			}

			view:nth-child(1) {
				//margin-right: 10rpx;
			}

			view:nth-child(2) {
				//margin-left: 10rpx;
			}
		}

		.tabs_sm {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: $all-secondary-color;
			border-radius: 19rpx;
			margin: 45rpx 0 45rpx 0;
			padding: 10rpx;

			view {
				font-weight: bold;
				color: #54647d;
				flex: 1;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
			}

			.curbg {
				background-color: #2283f6 !important;
				color: #ffffff !important;
				border-radius: 14rpx;
			}
		}

		.rewards__live {
			background: $referandearn-page-boxfive-bg;
			border-radius: 12px;

			.rewards__bottom {
				display: flex;
				flex-direction: column;
				height: 273px;
				padding: 16px;
				position: relative;

				.rewards__title {
					font-size: 22px;
					font-weight: 700;
					letter-spacing: -.02em;
					line-height: 28px;
					margin-top: 0;
					color: $referandearn-page-boxtitle-color;
				}

				.rewards__btn {
					opacity: .2;
					position: relative;
					width: 100%;

					span {
						width: 100%;
						color: #ffffff;
						font-weight: bold;
						display: inline-block;
						background-color: #3673D9;
						background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
						box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
						border-radius: 6px;
						height: 88rpx;
						line-height: 88rpx;
						text-align: center;
						position: relative;
						z-index: 2;
						transition: transform .1s ease-in-out;
					}
				}

				.rewards__btn:after {
					border-radius: 6px;
					height: 88rpx;
					background-color: #003293;
					bottom: -3px;
					content: "";
					display: block;
					left: 0;
					right: 0;
					margin: 0 auto;
					pointer-events: none;
					position: absolute;
					right: 0;
					z-index: 1;
				}

				.rewards__leaderboard {
					align-items: center;
					background: $rewards-leaderboard;
					border: 1px solid rgba(34, 131, 246, .4);
					border-radius: 10px;
					display: flex;
					height: 140px;
					justify-content: center;
					margin: 17px 0 17px 0;
					overflow: hidden;
					position: relative;

					.rewards__leaderboard-wrap {
						align-items: center;
						backdrop-filter: blur(1px);
						background: $rewards-leaderboard-wrap;
						display: flex;
						height: 100%;
						justify-content: center;
						position: absolute;
						width: 100%;
						z-index: 4;

						.status {
							backdrop-filter: blur(12px);
							background: radial-gradient(47.06% 47.06% at 50% 50%, #ffffff0f 0, #fff0), #26304199;
							border: 1px solid #3c485c;
							border-radius: 6px;
							padding: 0 12px;
							height: 80rpx;
							line-height: 80rpx;
							color: #ffffff;
							max-width: 80%;
							font-weight: bold;
							word-break: break-all;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}
					}

					.mignci1 {
						position: relative;
						transform: scale(.75);

						.mignci_tx {
							position: relative;
							text-align: center;
							height: 80px;

							.tx_av {
								box-shadow: 0 0 30px #a5c7fd;
								position: absolute;
								top: 12rpx;
								left: 0;
								right: 0;
								margin: 0 auto;
								border: 4px solid #d3e5fc;
								width: 48px;
								height: 48px;
								border-radius: 200rpx;
							}

							.tx_chib {
								width: 90px;
								height: 90px;
								position: absolute;
								bottom: 0;
								left: 0;
								right: 0;
								margin: 0 auto;
							}

							.mignci_num1 {
								position: absolute;
								left: 0;
								right: 0;
								margin: 0 auto;
								background: linear-gradient(131.88deg, #d9eaff 13.94%, #608cc8 86.62%);
								border: 1px solid #5780b9;
								align-items: center;
								border-radius: 45px;
								bottom: -8px;
								display: flex;
								font-size: 10px;
								font-weight: 700;
								height: 15px;
								justify-content: center;
								letter-spacing: -.02em;
								width: 18px;
								position: absolute;
								text-shadow: 0 1px 1px rgba(108, 46, 0, .5);
								transform: translateY(-100%);
								z-index: 3;
								color: #ffffff;
							}
						}

						.mingci_text {
							text-align: center;
							font-weight: bold;
							color: #ffffff;
							width: 90px;
							margin: 0 auto;
						}
					}

					.mignci2 {
						position: relative;
						transform: scale(.9);

						.mignci_tx {
							position: relative;
							text-align: center;
							align-items: center;
							display: flex;
							justify-content: center;
							height: 80px;
							width: 110px;

							.tx_av {
								box-shadow: 0 0 30px #ffb636;
								position: absolute;
								top: 12rpx;
								left: 0;
								right: 0;
								margin: 0 auto;
								border: 4px solid #d3e5fc;
								width: 58px;
								height: 58px;
								border-radius: 200rpx;
							}

							.tx_chib {
								width: 110px;
								height: 110px;
								position: absolute;
								bottom: -10px;
								left: 0;
								right: 0;
								margin: 0 auto;
							}

							.mignci_num2 {
								position: absolute;
								left: 0;
								right: 0;
								margin: 0 auto;
								background: linear-gradient(131.88deg, #f9d44a 13.94%, #eb8f1b 86.62%);
								border: 1px solid #d58500;
								align-items: center;
								border-radius: 45px;
								bottom: -14px;
								display: flex;
								font-size: 10px;
								font-weight: 700;
								height: 15px;
								justify-content: center;
								letter-spacing: -.02em;
								width: 18px;
								position: absolute;
								text-shadow: 0 1px 1px rgba(108, 46, 0, .5);
								transform: translateY(-100%);
								z-index: 3;
								color: #ffffff;
							}
						}

						.mingci_text {
							text-align: center;
							font-weight: bold;
							color: #ffffff;
							width: 90px;
							margin: 0 auto;
						}
					}

					.mignci3 {
						position: relative;
						transform: scale(.75);

						.mignci_tx {
							position: relative;
							text-align: center;
							height: 80px;

							.tx_av {
								box-shadow: 0 0 30px #a5c7fd;
								position: absolute;
								top: 12rpx;
								left: 0;
								right: 0;
								margin: 0 auto;
								border: 4px solid #d3e5fc;
								width: 48px;
								height: 48px;
								border-radius: 200rpx;
							}

							.tx_chib {
								width: 90px;
								height: 90px;
								position: absolute;
								bottom: 0;
								left: 0;
								right: 0;
								margin: 0 auto;
							}

							.mignci_num3 {
								position: absolute;
								left: 0;
								right: 0;
								margin: 0 auto;
								background: linear-gradient(131.88deg, #efc4b1 13.94%, #ab5b3a 86.62%);
								border: .791032px solid #9d5838;
								align-items: center;
								border-radius: 45px;
								bottom: -8px;
								display: flex;
								font-size: 10px;
								font-weight: 700;
								height: 15px;
								justify-content: center;
								letter-spacing: -.02em;
								width: 18px;
								position: absolute;
								text-shadow: 0 1px 1px rgba(108, 46, 0, .5);
								transform: translateY(-100%);
								z-index: 3;
								color: #ffffff;
							}
						}

						.mingci_text {
							text-align: center;
							font-weight: bold;
							color: #ffffff;
							width: 90px;
							margin: 0 auto;
						}
					}
				}
			}

			.rewards__main-bottombain {
				width: 100%;
				border-bottom: 2px solid;
				border-image: $card-main-bottombain;
			}

			.rewards__top {
				border-radius: 12px 12px 0 0;
				overflow: hidden;
				padding: 16px 16px 0 16px;
				position: relative;

				.rewards__title {
					font-size: 22px;
					font-weight: 700;
					letter-spacing: -.02em;
					line-height: 28px;
					margin-bottom: 1rem;
					margin-top: 0;
					color: $referandearn-page-boxtitle-color;
				}



				.rewards__total {
					.total__container {
						align-items: center;
						background: $referandearn-page-balance-card;
						border: 1px solid $referandearn-page-balance-cardbor;
						border-radius: 8px;
						display: flex;
						flex-direction: column;
						gap: 10px;
						height: 90px;
						justify-content: space-between;
						overflow: hidden;
						padding: 16px;
						position: relative;
						z-index: 1;

						.total__title {
							color: #55657e;
							font-size: 11px;
							font-weight: 600;
						}

						.total__value {
							display: flex;
							align-items: center;
							font-size: 50rpx;
							font-weight: bold;
							color: $referandearn-page-linkcolor;
							image {
								width: 50rpx;
								height: 50rpx;
							}
						}
					}
				}
			}
		}

		.balance_wrap {
			margin: 45rpx 0;
			background: $referandearn-page-boxtwo-bg;
			border-radius: 12px;
			flex-direction: column;
			padding: 16px 16px 0 16px;

			.balance__cards {
				.balance__card {
					background: $referandearn-page-balance-card;
					border: 1px solid $referandearn-page-balance-cardbor;
					border-radius: 8px;
					padding: 16px;
					width: 100%;
					
					/* #ifndef APP-PLUS */
					height: 244px;
					/*#endif */
					
					/* #ifdef APP-PLUS */
					height: 254px;
					/* #endif */
					
					
					margin-bottom: 30rpx;

					.card__content {
						width: 100%;

						.card__header {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.card__title {
								font-size: 24rpx;
								color: $me-text-color;
								font-weight: bold;
							}

							.card__link {
								font-size: 24rpx;
								color: #2283f6;
							}
						}

						.coins {
							margin: 34rpx 0 20rpx 0;
							text-align: center;

							.coin--empty-wrap {
								position: relative;
								display: flex;
								align-items: center;
								justify-content: center;

								.coin--empty {
									border-radius: 50%;
									box-shadow: -1px 1px 3px #000c;
									height: 24px;
									margin-left: -6px;
									position: relative;
									width: 24px;
									background-color: #263041;
								}

								.coin--empty:after {
									background-color: #3c485c;
									border-radius: 50%;
									content: "";
									height: 16px;
									left: 50%;
									position: absolute;
									top: 50%;
									transform: translate(-50%, -50%);
									width: 16px;
								}
							}
						}

						.lookfyong {
							text-align: center;
							font-size: 24rpx;
							margin-top: 60rpx;
							color: #3c485c;

							.u-icon {
								margin-left: 10rpx;
							}
						}

						

						.card__footer {
							margin-top: 30rpx;

							.card__footerBtn {
								position: relative;
								color: #ffffff;
								font-weight: bold;
								view {
									//width: -webkit-fill-available;
									//display: inline-block;
									background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
									box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
									border-radius: 6px;
									height: 76rpx;
									line-height: 76rpx;
									text-align: center;
									position: relative;
									z-index: 2;
								}
							}

							/*.card__footerBtn:after {
								border-radius: 6px;
								height: 66rpx;
								background-color: #61001d;
								bottom: -3px;
								content: "";
								display: block;
								left: 0;
								right: 0;
								margin: 0 auto;
								pointer-events: none;
								position: absolute;
								right: 0;
								z-index: 1;
							}*/
						}

						.card__main-bottom {
							display: flex;
							align-items: center;
							justify-content: center;
							margin-top: 26rpx;

							image {
								width: 50rpx;
								height: 50rpx;
							}

							.text {
								color: #ffffff;
								text-align: center;
								padding-left: 10rpx;

								.title {
									color: #93acd3;
									font-size: 12px;
									font-style: normal;
									font-variant-numeric: lining-nums tabular-nums;
									font-weight: 600;
									letter-spacing: -.24px;
									line-height: 130%;
								}

								.value {
									font-size: 28rpx;
									font-weight: bold;
									display: flex;
									align-items: center;
									justify-content: center;
									color: $referandearn-page-linkcolor;
									image {
										width: 30rpx;
										height: 30rpx;
									}
								}
							}
						}

						.card__main-bottombain {
							height: 30rpx;
							width: 100%;
							border-bottom: 1px solid;
							border-image: $card-main-bottombain;
						}

						.card__main-top {
							text-align: center;

							.text {
								color: #55657e;
								font-size: 22rpx;
								margin-top: 20px;
								margin-bottom: 10rpx;
							}

							.daolefu {
								display: flex;
								align-items: center;
								justify-content: center;

								image {
									width: 48rpx;
									height: 48rpx;
									margin-right: 10rpx;
								}

								font-size: 52rpx;
								color: $referandearn-page-linkcolor;
								font-weight: bold;
							}
						}
					}
				}
			}

			.balance__header {
				display: flex;
				align-items: flex-start;
				justify-content: space-between;

				.balance__title {
					color: $referandearn-page-boxtitle-color;
					font-weight: bold;
					font-size: 18px;
					font-weight: 600;
					margin-bottom: 15px;
				}

				.balance__my-ref {
					span {
						color: #55657e;
						font-size: 11px;
						font-weight: 600;
						margin-right: 12px;
					}

					.user-data {
						margin-top: 8rpx;
						display: flex;
						align-items: center;

						image {
							width: 16px;
							height: 16px;
							border-radius: 200rpx;
						}

						view {
							margin-left: 8px;
							font-size: 24rpx;
							color: #ffffff;
						}
					}
				}
			}
		}

		.invite_wrap {
			background: $referandearn-page-boxone-bg;
			border-radius: 24rpx;
			overflow: hidden;
			padding: 30rpx 30rpx 0 30rpx;

			.proposition {
				margin: 30rpx 0;
				position: relative;
				
				.yq_caozuo {
					margin-top: 20rpx;
				}

				.input_animated_btnbox {
					margin-top: 30rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 26rpx;
					.fenxBtn1 {
						border-radius: 10px;
						position: relative;
						color: $fenxBtn1-fontcolor;
						margin-right: 26rpx;
						flex: 1;
						cursor: pointer;
						span {
							padding: 0 10rpx;
							word-break:break-all;
							display:-webkit-box;
							-webkit-line-clamp:1;
							-webkit-box-orient:vertical;
							overflow:hidden;
							
							background: $fenxBtn1-bgcolor;
							//box-shadow: 0 3px 28px #2a3546, inset 0 3px 3px #2a3546;
							border-radius: 10px;
							height: 88rpx;
							line-height: 88rpx;
							text-align: center;
							position: relative;
							z-index: 2;
							font-weight: bold;
						}
					}

					.fenxBtn2 {
						flex: 1;
						position: relative;
						color: #ffffff;
						border-radius: 10px;
						cursor: pointer;
						span {
							padding: 0 10rpx;
							word-break:break-all;
							display:-webkit-box;
							-webkit-line-clamp:1;
							-webkit-box-orient:vertical;
							overflow:hidden;
							font-weight: bold;
							background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
							//box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
							border-radius: 10px;
							height: 88rpx;
							line-height: 88rpx;
							text-align: center;
							position: relative;
							z-index: 2;
						}
					}

					/*.fenxBtn2:after {
						border-radius: 6px;
						height: 66rpx;
						background-color: #003293;
						bottom: -3px;
						content: "";
						display: block;
						left: 0;
						right: 0;
						margin: 0 auto;
						pointer-events: none;
						position: absolute;
						right: 0;
						z-index: 1;
					}*/
				}

				.input_animated {
					border-radius: 10px;
					height: 58px;
					padding: 7px 10px;
					align-items: center;
					background-color: $referandearn-page-linkInput;
					border: 1px solid $referandearn-page-linkInputbor;
					cursor: text;
					display: flex;
					position: relative;
					transition: color .1s ease-in-out, border-color .1s ease-in-out;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.input_animated_icon {}

					.input_animated_link {
						color: $referandearn-page-linkcolor;
						flex: 1;
						padding: 0 20rpx;

						view:nth-child(1) {
							color: #55657e;
							font-size: 24rpx;
						}

						view:nth-child(2) {
							font-size: 26rpx;
							word-break: break-all;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}
					}

					.input_animated_btn {
						padding: 14rpx 14rpx;

						image {
							cursor: pointer;
							width: 40rpx;
							height: 40rpx;
						}
					}
				}

				.inputs__title {
					font-weight: bold;
					color: $referandearn-page-boxtitle-color;
					display: flex;
					align-items: center;
					font-size: 32rpx;

					span {
						margin: 0 0 0 10rpx;
						display: block;
						background-color: #2283f6;
						border-radius: 200rpx;
						padding: 2rpx 10rpx;
						font-size: 22rpx;
					}
				}

				.proposition__inner {
					background: $referandearn-page-boxone-yqbgcolor;
					border-radius: 8px;
					overflow: hidden;
					padding: 16px;
					position: relative;
					margin-bottom: 30rpx;

					.bg__money-bg {
						width: 100%;
						position: absolute;
						right: -120px;
						top: 0;
						height: 100%;
						max-height: 120px;
					}

					.proposition__title {
						font-size: 34rpx;
						font-weight: bold;
						margin-bottom: 18rpx;
						position: relative;
						z-index: 2;
						color: #ffffff;
					}

					.proposition__info {
						margin-top: 10rpx;
						font-size: 26rpx;
						color: $referandearn-page-boxone-yqtextcolor;

						.u-icon {
							margin-right: 10rpx;
						}
					}
				}
			}

			.statistics {
				background: radial-gradient(572.86% 251.57% at 33.2% 178.81%, #1d2b3e00 28.45%, #00926636 63.21%, #1bb83dad);
				border: 1px solid hsla(0, 0%, 100%, .08);
				border-radius: 8px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				position: relative;

				.rightBorder {
					position: absolute;
					height: 200rpx;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					/*首先我们设置边框只显示右侧，宽度为2px的实线。*/
					border-right: 2px solid;
					/*设置线性渐变*/
					border-image: linear-gradient(180deg, #ddeafc00 0%, #95b0dc4d 50%, #ddeafc00 100%) 2 2 2 2;
				}

				.statistics_item {
					flex: 1;
					padding: 30rpx;
					position: relative;

					.fhya {
						top: 10rpx;
						width: 160rpx;
						position: absolute;
						left: -10rpx;
					}

					.mysy {
						margin-top: 120rpx;
						color: #93acd3;
						font-size: 11px;
						font-weight: 600;
						margin-bottom: 10rpx;

						.u-icon {
							margin-left: 10rpx;
							position: relative;
							top: 3rpx;
						}
					}

					.mysynum {
						font-weight: bold;
						font-size: 18px;
						color: $notice-font-color;
						display: flex;
						align-items: center;
						image {
							margin-left: 0;
						}
					}
				}
			}
		}

		.referral__banner {
			margin: 0 0 36px 0;
		}

		.banner {
			height: 465px;
			border-radius: 24px;
			overflow: hidden;
			background: radial-gradient(43.08% 17.64% at 44.36% 68.6%, #ff4f8eb3 0, #ff4f8e00), linear-gradient(86.96deg, #8045e7 -44.1%, #161f2c 100.09%);

			.banner__footer {
				padding: 0;
				text-align: center;
			}

			.banner__bottom {
				background: linear-gradient(88.54deg, #af0177 21.66%, #af017700 99.55%);
				min-height: 66px;
				padding: 11px 11px 12px 172px;
				font-size: 12px;
				gap: 15px;
				line-height: 16px;
				align-items: center;
				order-top: 1px solid hsla(0, 0%, 100%, .1);
				display: flex;
				justify-content: space-between;
				position: relative;

				.banner__gift {
					width: 75px;
					bottom: 0;
					left: 0;
					position: absolute;
					z-index: 2;
				}

				.banner__coin {
					display: none;
					bottom: 0;
					left: 220px;
					position: absolute;
					width: 150px;
				}

				.banner__label {
					font-size: 11px;
					height: 17px;
					line-height: 10px;
					padding-right: 14px;
					top: 0;
					width: 160px;
					align-items: center;
					background: url('/static/recommend/label.webp') no-repeat;
					background-size: cover;
					color: #30052f;
					display: flex;
					font-weight: 800;
					justify-content: flex-end;
					align-items: center;
					left: 0;
					position: absolute;
					text-align: right;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: horizontal;
					overflow: hidden;
				}

				.banner__center {
					max-width: 210px;

					.banner__text {
						color: #ffffff;
						font-size: 10px;
						line-height: 12px;
						font-weight: 700;
						letter-spacing: -.02em;
						margin-bottom: 0;
					}

					.banner__text2 {
						color: #ffb701;
						font-size: 14px;
						line-height: 17px;
						font-weight: 700;
						letter-spacing: -.02em;
						margin-bottom: 0;
					}
				}

				.banner__percent {
					bottom: 3px;
					font-size: 46px;
					left: 60px;
					color: #ffb701;
					font-weight: 900;
					line-height: 95%;
					margin-bottom: 0;
					position: absolute;
				}
			}

			.banner__top {
				position: relative;
				padding: 16px 24px 192px;
				text-align: center;

				.banner__banner {
					max-width: 405px;
					position: absolute;
					bottom: 0;
					left: 50%;
					max-height: 180px;
					top: auto;
					transform: translate(-50%);
				}

				.banner__desc {
					color: #ffffffb3;
					font-size: 12px;
					font-weight: 500;
					letter-spacing: -.02em;
					line-height: 150%;
					margin-bottom: 0;
				}

				.banner__title {
					font-weight: 700;
					font-size: 24px;
					line-height: 135%;
					margin-bottom: 12px;
					color: #ffffff;

					span {
						font-weight: 700;
						color: #fed700;
						font-size: 24px;
						line-height: 135%;
					}
				}

				.banner__banner--mob {
					position: absolute;
					width: 100%;
					bottom: 0;
					display: flex;
					left: 50%;
					max-height: 180px;
					max-width: 328px;
					top: auto;
					transform: translate(-50%);

					.img-mob {
						max-width: 100%;
						vertical-align: bottom;
					}

					.banner__coin1 {
						position: absolute;
						right: 0;
						top: 0;
						width: 65px;
					}

					.banner__coin2 {
						bottom: -42px;
						position: absolute;
						right: -30px;
						width: 90px;
					}
				}
			}
		}
	}

	.Register_btn2 {
		margin: 45rpx auto;
		font-weight: bold;
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 28rpx;
		position: relative;
		text-align: center;
		justify-content: center;
	}

	.zhuceBtn {
		position: relative;
		width: 50%;
		font-weight: bold;
		span {
			font-weight: bold;
			width: 100%;
			display: inline-block;
			background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
			box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
			border-radius: 12px;
			height: 94rpx;
			line-height: 94rpx;
			text-align: center;
			position: relative;
			z-index: 2;
			cursor: pointer;
		}
	}

	.zhuceBtn:after {
		width: 100%;
		border-radius: 12px;
		height: 94rpx;
		background-color: #61001d;
		bottom: -3px;
		content: "";
		display: block;
		left: 0;
		right: 0;
		margin: 0 auto;
		pointer-events: none;
		position: absolute;
		right: 0;
		z-index: 1;
	}
	
	@media (min-width: 800px) {
		.page_wrap {
			padding: 50rpx;
			background: radial-gradient(49.05% 79.72% at 49.05% 0, #096afe 0, #042053 0.01%, #0136b41c 74.48%, #0140cd00);
		}
		.page_wrap .rewards__my-history {
			margin-top: 0 !important;
		}
		.page_wrap .invite_wrap .proposition .proposition__inner {
			height: 280rpx;
			margin-bottom: 0;
		}
		.page_wrap .tabs_sm {
			width: 600rpx;
		}
		.page_wrap .invite_wrap .proposition .yq_caozuo {
			margin-top: 0;
		}
	}
</style>