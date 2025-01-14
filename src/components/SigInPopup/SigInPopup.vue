<template>
	<view :style="theme">

		<!-- <view class="mask_ceng" v-show="showdlPopup" @click="showdlPopup = false" hover-stop-propagation @touchmove.stop.prevent="() => {}"></view> -->
		<!-- <uni-transition class="qiliuba_hylb" :mode-class="['fade', 'zoom-in']" :show="showdlPopup"> -->
		<u-popup v-model="showdlPopup" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="popup_wrap_box">
				<view class="reg_title" @click="showdlPopup = false">
					<view>{{$t('DailySignIn.Title')}}</view>
				</view>
				<view class="qiliuba_hylb">
					<view class="dl_wrap">
						<view class="dl_wrap_box">
							<!-- <view class="guanbi" @click="showdlPopup = false">
								<view class="reg_titles">
									<view>签到详情</view>
								</view>
								<u-icon name="close" color="#fff"></u-icon>
							</view> -->
							<view class="popup_info_wrap">
								<view class="sigin_date_box">
									<view class="sigin_date_box_title">{{$t('DailySignIn.Prompt')}}<span>{{is_arrisDaka.length}}/{{SigninDayList.length}}</span></view>
									<view class="sigin_date_item_wrap">
										<uni-row :gutter="15" class="demo-uni-row">
											<uni-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4" v-for="(item,index) in SigninDayList" :key="index">
												<view class="sigin_date_day" :class="[localDate == item.date && item.status == 3?'day_border':'']">
													<view class="day_box1">{{item.dayNum}}Day</view>
													<view class="day_box2">
														<view class="day_box2_dh" v-if="localDate == item.date && item.status == 3">
															<image src="/static/sigin/73a37171.png" mode="widthFix"></image>
														</view>
														<!-- <image v-if="index == 6" class="baoxiang bxdh" src="/static/sigin/baoxiang.png" mode="widthFix"></image> -->
														<image class="baoxiang" src="/static/sigin/jinbi-4.png" mode="widthFix"></image>
													</view>
													<view class="day_box3">+{{(item.reward/100).toFixed(2)}}</view>
													<view class="day_box4" :class="[item.status == 1 || item.status == 2?'yqd_color':'']">
														<span v-if="item.status == 1 || item.status == 2">{{$t('DailySignIn.SignedIn')}}</span>
														<span v-else-if="item.status == 3">{{$t('DailySignIn.InProgress')}}</span>
														<span v-else>{{$t('DailySignIn.NotSignedIn')}}</span>
													</view>
												</view>
											</uni-col>
										</uni-row>
									</view>
								</view>
								
								
								
								
								
								
								
								
								
								
								
								<view class="sigin_task_list">
									<view class="task_title">
										<view>{{todaySignIn.today}}{{$t('DailySignIn.SignInTask')}}</view>
										<view>
											<view class="task_btn" v-if="!is_SignInLingqu"><span>{{$t('DailySignIn.InProgress')}}</span></view>
											<view class="task_btn" v-else><span>{{$t('NEWBonusPageA.completed')}}</span></view>
											<!-- <view class="NovBtn2"><span>立即领取</span></view> -->
										</view>
									</view>
									<view class="task_list_item">
										<!-- <view class="task_list_item_box">
											<view class="task_sm">
												<view class="task_sm_item">
													<view class="task_sm_title">连续7天完成打卡任务领取</view>
													<span class="task_sm_jd">(1/7)</span>
												</view>
											</view>
											<view class="caozuozu">
												<view class="jlnum"><image src="/static/sigin/jinbi-2.png"></image>+1111.00</view>
												<view class="task_btn"><span>进行中</span></view>
											</view>
										</view>
										<view class="line"></view> -->
										<!-- <view class="task_list_item_box">
											<view class="task_sm">
												<view class="task_sm_item">
													<view class="task_sm_title">今日充值达标即可领取<u-icon name="checkmark-circle-fill" color="#19be6b"></u-icon></view>
													<span class="task_sm_jd">30/30</span>
												</view>
											</view>
											<view class="caozuozu">
												<view class="jlnum"><image src="/static/sigin/jinbi-2.png"></image>+200.00</view>
												<view class="NovBtn2"><span>立即领取</span></view>
											</view>
										</view>
										<view class="line"></view> -->
										<view class="task_list_item_box">
											<view class="caozuozu">
												<view class="jlnum"><image src="/static/sigin/jinbi-2.png"></image>{{$t('DailySignIn.Earn')}} +{{(todaySignIn.reward/100).toFixed(2)}}</view>
											</view>
											<view class="line"></view>
											<view class="task_sm">
												<view class="task_sm_item">
													<view class="task_sm_title">{{$t('DailySignIn.Todaybetting')}}</view>
													<span class="task_sm_jd">{{(todaySignIn.todayBet/100).toFixed(2)}}/{{(todaySignIn.needBet/100).toFixed(2)}}</span>
												</view>
											</view>
											<view class="task_sm">
												<view class="task_sm_item">
													<view class="task_sm_title">{{$t('DailySignIn.TodayDeposit')}}</view>
													<span class="task_sm_jd">{{(todaySignIn.todayPay/100).toFixed(2)}}/{{(todaySignIn.needPay/100).toFixed(2)}}</span>
												</view>
											</view>
										</view>
									</view>
								</view>
								
								
								
								
								
								
								
								
								
								
								
								<!--历史中有完成但为领取奖励的列表-->
								<view class="sigin_task_list" v-for="(item,index) in Available" :key="index">
									<view class="task_title">
										<view>{{item.date}}{{$t('DailySignIn.SignInTask')}}<u-icon name="checkmark-circle-fill" color="#19be6b"></u-icon></view>
										<view>
											<view class="NovBtn2" @click="lijilingqu(item)"><span>{{$t('DailySignIn.Receive')}}</span></view>
										</view>
									</view>
									<view class="task_list_item">
										<view class="task_list_item_box">
											<view class="caozuozu" style="margin: 0;">
												<view class="jlnum" style="margin: 0;"><image src="/static/sigin/jinbi-2.png"></image>{{$t('DailySignIn.Earn')}} +{{(item.reward/100).toFixed(2)}}</view>
											</view>
											<!-- <view class="line"></view>
											<view class="task_sm">
												<view class="task_sm_item">
													<view class="task_sm_title">今日投注</view>
													<span class="task_sm_jd">10/10</span>
												</view>
											</view>
											<view class="task_sm">
												<view class="task_sm_item">
													<view class="task_sm_title">今日存款</view>
													<span class="task_sm_jd">1000</span>
												</view>
											</view> -->
										</view>
									</view>
								</view>
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- </uni-transition> -->
		

	</view>
</template>

<script>
	export default {
		name: "SigInPopup",
		data() {
			return {
				showdlPopup: false,
				SigninDayList: [],
				todaySignIn: {}, 
				Available: [],
				is_arrisDaka: [],
				
				is_SignInLingqu: false,
				localDate: '', // 今天日期
				day: new Date().getDate(), // 当前日
				year: new Date().getFullYear(), // 当前年
				month: new Date().getMonth() + 1, // 当前月
				
				
			};
		},
		created() {

		},
		methods: {
			openShow() {
				this.GetQianDao()
				this.showdlPopup = true
			},
			//获取签到
			GetQianDao(){
				let that = this
				that.$u.post('/signin/info', {
					
				}).then(res => {
					//console.log('签到信息',res.data);
					
					// 今天日期
					that.localDate = that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(that.day);
					//console.log('今日日期',that.localDate)
					that.SigninDayList = res.data.signIn
					that.todaySignIn = res.data.todaySignIn
					that.Available = res.data.Available
					
					//筛选出已打卡的
					let arrisDaka = []
					res.data.signIn.forEach((item, index) => {
						if (item.status == 1) {
							arrisDaka.push(item)
						}
					});
					that.is_arrisDaka = arrisDaka
					
					
					
					
					//找出可领取的奖励显示领取按钮
					//Available里面如果有今日的就取出来，领取
					//根据todaySignIn里面的今天日期来确定今天
					let Today = res.data.todaySignIn.today
					res.data.Available.forEach((item, index) => {
						if (item.date == Today) {
							that.is_SignInLingqu = true
						}
					});
				})
			},
			// 格式化日期位数
			formatNum(num) {
				return num < 10 ? ('0' + num) : num;
			},
			lijilingqu(data){
				let that = this
				that.$u.post('/take/signin/reward', {
					date: data.date
				}).then(res => {
					//结果数据 res.data: {newBalance: 346, reward: 300, rewardType: 31}
					that.GetQianDao();
					that.is_SignInLingqu = false;
					that.showdlPopup = false;
					that.$emit('shuaxin', 1);
					uni.$emit('getgetMybalance', 1);
					
					//来刷新一个任务列表显示可领取数量
					uni.$emit('RsGetTaskList', 1);
					
					uni.$emit('UpdataAddBcbalance', (res.data.reward/100).toFixed(2));
				})
			}
			
			
			
		}
	}
</script>

<style lang="scss">
	/deep/ .u-drawer {
		max-width: 708px !important;
	}
	
	// .reg_title {
	// 	width: 100%;
	// 	position: sticky;
	// 	top: 0;
	// 	right: 0;
	// 	left: 0;
	// 	z-index: 100;
	// }
	
	.mask_ceng {
		position: fixed;
		z-index: 10070;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 auto;
		background-color: #000;
		opacity: .8;
		transition: transform 0.3s;
	}

	.qiliuba_hylb {
		//position: fixed;
		//z-index: 10071;
		//top: 0;
		//left: 0;
		//right: 0;
		//bottom: 0;
		//margin: 0 auto;

		.dl_wrap {
			//position: absolute;
			width: 100%;
			//top: 50%;
			//left: 50%;
			//transform: translate(-50%, -50%);
			//z-index: 10072;
			display: flex;
			align-items: center;
			justify-content: center;

			.dl_wrap_box {
				width: 95%;
				max-width: 708px;
				border-radius: 28rpx;
				background-color: $pupUp-bg-color;
				.guanbi {
					border-radius: 14px 14px 0 0;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #1a273e;
					padding: 30rpx 30rpx !important;
					background: linear-gradient(180deg, #003370, #08264a 40%, #111923);
					.reg_titles {
						view {
							color: $all-secondary-text-color;
							font-weight: 700;
							font-size: 38rpx !important;
						}
					}
					.u-icon {
						font-size: 34rpx;
						cursor: pointer;
					}
				}
				.popup_info_wrap {
					padding: 20rpx 0;
					.sigin_date_box {
						padding: 30rpx 30rpx 10rpx 30rpx;
						background: $sigin-task-popup-sigindatebox;
						border-radius: 20rpx;
						.sigin_date_box_title {
							color: $all-secondary-text-color;
							margin-bottom: 10rpx;
							font-weight: bold;
							display: flex;
							align-items: center;
							justify-content: space-between;
							span {
								color: $all-secondary-text-color;
							}
						}
						.sigin_date_item_wrap {
							.day_border {
								border: 1px dashed #007aff !important;
							}
							.sigin_date_day {
								cursor: pointer;
								background: $sigin-task-popup-box;
								text-align: center;
								border-radius: 20rpx;
								margin: 20rpx 0;
								border: 1px solid $sigin-task-popup-sigin-date-daybor;
								.day_box1 {
									color: #98a7b5;
									padding: 16rpx 0 6rpx 0;
									//background: #2c345080;
									font-size: 24rpx;
									border-radius: 20rpx 20rpx 0 0;
								}
								.day_box2 {
									position: relative;
									width: 100%;
									height: 120rpx;
									.bxdh {
										top: 28% !important;
										left: 33% !important;
										animation: breathe 1.8s infinite;
									}
									.baoxiang {
										position: absolute !important;
										top: 50%;
										left: 50%;
										transform: translate(-50%, -50%);
										width: 60rpx;
										z-index: 3;
										// border-radius: 100px;
										// box-shadow: 0px 1px 20px 10px #cfc01330;
									}
									.day_box2_dh {
										text-align: center;
										position: absolute;
										top: 50%;
										left: 50%;
										transform: translate(-50%, -50%);
										z-index: 2;
									    image {
											animation: roateobfe1dbd 10s linear infinite;
											width: 150rpx;
										}
									}
								}
								.day_box3 {
									color: $all-secondary-text-color;
									margin-bottom: 20rpx;
								}
								.day_box4 {
									color: $sigin-task-popup-day-box4-font;
									//padding: 6rpx 0 6rpx 0;
									background: $sigin-task-popup-day-box4;
									font-size: 24rpx;
									border-radius: 0 0 20rpx 20rpx;
									word-break: break-all;
									display: -webkit-box;
									-webkit-line-clamp: 1;
									-webkit-box-orient: vertical;
									overflow: hidden;
									height: 40rpx;
									line-height: 40rpx;
								}
								.yqd_color {
									background: #007aff !important;
									color: #ffffff !important;
								}
							}
						}
					}
					.sigin_task_list {
						background: $sigin-task-popup-box;
						padding: 30rpx;
						border-radius: 20rpx;
						margin-top: 30rpx;
						.task_title {
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-weight: bold;
							color: $all-secondary-text-color;
							margin-bottom: 30rpx;
							view:nth-child(1){
								.u-icon {
									font-size: 32rpx;
									position: relative;
									top: 2rpx;
									left: 4rpx;
								}
							}
						}
						.task_list_item {
							padding: 20rpx;
							//background: #272e4680;
							border-radius: 20rpx;
							background-color: $sigin-task-popup-task-list-item;
							.line {
								background: $sigin-task-popup-task-list-item-line;
								height: 1px;
								margin: 15px 0;
								width: 100%;
							}
							.task_list_item_box {
								// display: flex;
								// align-items: center;
								margin-bottom: 30rpx;
								.caozuozu {
									display: flex;
									align-items: center;
									justify-content: space-between;
									margin-bottom: 30rpx;
									.jlnum {
										margin-top: 10rpx;
										display: flex;
										align-items: center;
										image {
											width: 36rpx;
											height: 36rpx;
											margin-right: 10rpx;
										}
										font-size: 34rpx;
										color: #ffad04;
										font-weight: initial;
									}
								}
								.left_icon {
									width: 60rpx;
									height: 60rpx;
								}
								.task_sm {
									color: #9caacc;
									font-size: 28rpx;
									padding: 10rpx 14rpx;
									font-weight: bold;
									//background-color: #1d2431;
									border-radius: 10rpx;
									.task_sm_item {
										display: flex;
										align-items: center;
										justify-content: space-between;
										.task_sm_title {
											display: flex;
											align-items: center;
											.u-icon {
												font-size: 32rpx;
												position: relative;
												top: 2rpx;
												left: 4rpx;
											}
										}
										.task_sm_jd {
											background-color: $sigin-task-popup-task-sm-jd;
											border-radius: 200rpx;
											padding: 8rpx 16rpx;
											font-size: 22rpx;
											color: #ffffff;
											margin-left: 10rpx;
										}
									}
								}
							}
							.task_list_item_box:last-child {
								margin-bottom: 0;
							}
						}
					}
				}
			}
		}
	}
	@keyframes roateobfe1dbd {
	    0% {
	        transform: rotate(0deg)
	    }
	
	    8.3% {
	        transform: rotate(30deg)
	    }
	
	    16.6% {
	        transform: rotate(60deg)
	    }
	
	    25% {
	        transform: rotate(90deg)
	    }
	
	    33.3% {
	        transform: rotate(120deg)
	    }
	
	    41.6% {
	        transform: rotate(150deg)
	    }
	
	    50% {
	        transform: rotate(180deg)
	    }
	
	    58.3% {
	        transform: rotate(210deg)
	    }
	
	    66.6% {
	        transform: rotate(240deg)
	    }
	
	    75% {
	        transform: rotate(270deg)
	    }
	
	    83.3% {
	        transform: rotate(300deg)
	    }
	
	    91.6% {
	        transform: rotate(330deg)
	    }
	
	    to {
	        transform: rotate(1turn)
	    }
	}
	
	@keyframes breathe {
		0% {
			transform: scale(.99);
		}
	
		50% {
			transform: scale(1.2);
		}
	
		100% {
			transform: scale(.99);
		}
	}
	
	.task_btn {
		color: $sigin-task-popup-task-btnfont;
		display: inline-block;
		background-color: $sigin-task-popup-task-btn;
		border: 1px solid $sigin-task-popup-task-btnbors;
		border-radius: 8px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		padding: 0 12px;
		position: relative;
		margin-left: auto;
		span {
			margin-right: 10rpx;
		}
	}
	.task_btn_ok {
		background-color: #007aff !important;
		color: #ffffff !important;
	}
	
	.NovBtn2 {
		position: relative;
		margin-left: auto;
		cursor: pointer;
		span {
			font-weight: bold;
			width: 140rpx;
			color: $all-secondary-text-color;
			display: inline-block;
			background-color: #2c62f4;
			background: linear-gradient(1turn, #2c62f4 .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			border-radius: 8px;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			padding: 0 24rpx;
			position: relative;
			z-index: 2;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
	
	.NovBtn2:after {
		padding: 0 24rpx;
		border-radius: 8px;
		height: 70rpx;
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
	
	@media (min-width: 800px) {
		.qiliuba_hylb .dl_wrap .dl_wrap_box .popup_info_wrap {
			//padding: 40rpx;
		}
	}
	
</style>