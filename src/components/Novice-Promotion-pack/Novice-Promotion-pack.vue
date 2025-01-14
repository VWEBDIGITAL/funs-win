<template>
	<view :style="theme">

		<SigInPopup ref="openSiginShow" @shuaxin="GetQianDao"></SigInPopup>

		<view class="gundong_box_wrap2">
			<view class="bonus_list_box">










				<view class="bonus_list_box_item list_itembg6" v-if="isAcHuodong == 0 && signInSwitch">
					<view class="bonus_list_box_title">
						<view class="bonus_list_box_title_right">
							<image src="/static/image/qiandaoIcon.png" mode=""></image>
						</view>
						<view class="bonus_list_box_title_left">
							<view class="Daily">{{$t('DailySignIn.Title')}}</view>
							<view class="phphzhi lvse" v-if="Available.length > 0">
								<text v-if="platform == 8">$</text>
								<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
								<text v-else-if="platform == 10 || platform == 11">$</text>
								<text v-else>₱</text>
								{{(SignInReward/100).toFixed(2)}}
							</view>
							<view class="phphzhi" v-else><text v-if="platform == 8">$</text>
								<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
								<text v-else-if="platform == 10 || platform == 11">$</text>
								<text v-else>₱</text>0.00</view>
						</view>
					</view>
					<view class="caozuanniu" style="margin-top: 0;">
						<view class="biaoji" v-if="Available.length > 0">{{Available.length}}</view>
						<view class="zhuceBtn" v-if="Available.length > 0" @click="Lingqu_qiandao()">
							<span>{{$t('NEWBonusPageB.Claim')}}</span>
						</view>
						<view class="anniu_type1" v-else @click="TodaySigin_Popup()">{{$t('SpecialBonuS.ViewDetails')}}</view>
					</view>
				</view>









				<view v-if="isAcHuodong == 0">
					<view class="bonus_list_box_item" v-if="DailyRebateSwitch">
						<view class="bonus_list_box_title">
							<view class="bonus_list_box_title_right">
								<image src="/static/Bonuslogin/04.png" mode="aspectFill"></image>
							</view>
							<view class="bonus_list_box_title_left">
								<view class="Daily">{{$t('DailyRebatePopup.title')}}</view>
								<view class="phphzhi" :class="[DailyRebate.reward>0?'lvse':'']"><text v-if="platform == 8">$</text>
								<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
								<text v-else-if="platform == 10 || platform == 11">$</text>
								<text v-else>₱</text>{{(DailyRebate.reward/100).toFixed(2)}}</view>
							</view>
						</view>
						<view class="caozuanniu">
							<view class="anniu_type1" v-if="DailyRebate.reward == 0">{{$t('ADDnew2.NoRewardsYet')}}</view>
							<view class="zhuceBtn" v-else-if="DailyRebate.status == 1 && DailyRebate.reward > 0" @click="Lingqu('DailyRebate')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
							<view class="anniu_type1" v-else-if="DailyRebate.status == 0 && DailyRebate.reward > 0"><u-count-down :timestamp="DailyRebate.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="24"></u-count-down></view>
						</view>
					</view>













					<view class="bonus_list_box_item"
						v-if="DailyCashbackSwitch == 1 || DailyCashbackSwitch == undefined">
						<view class="bonus_list_box_title">
							<view class="bonus_list_box_title_right">
								<image src="/static/Bonuslogin/05.png" mode="widthFix"></image>
							</view>
							<view class="bonus_list_box_title_left">
								<view class="Daily">{{$t('DailyCashBackPopup.title')}}</view>
								<view class="phphzhi" :class="[DailyCashback.reward>0?'lvse':'']">
									<text v-if="platform == 8">$</text>
									<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
									<text v-else-if="platform == 10 || platform == 11">$</text>
									<text v-else>₱</text>{{(DailyCashback.reward/100).toFixed(2) || '0.00'}}</view>
							</view>
						</view>
						<view class="caozuanniu">
							<view class="anniu_type1" v-if="DailyCashback.reward == 0">{{$t('ADDnew2.NoRewardsYet')}}
							</view>
							<view class="zhuceBtn" v-else-if="DailyCashback.status == 1 && DailyCashback.reward > 0"
								@click="Lingqu('DailyCashback')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
							<view class="anniu_type1" v-else-if="DailyCashback.status == 0 && DailyCashback.reward > 0">
								<u-count-down :timestamp="DailyCashback.countdown" bg-color="" color="#aebac8"
									separator-color="#aebac8" font-size="24"></u-count-down></view>
						</view>
					</view>













					<view class="bonus_list_box_item"
						v-if="WeeklyCashbackSwitch == 1 || WeeklyCashbackSwitch == undefined">
						<view class="bonus_list_box_title">
							<view class="bonus_list_box_title_right">
								<image src="/static/Bonuslogin/06.png" mode="widthFix"></image>
							</view>
							<view class="bonus_list_box_title_left">
								<view class="Daily">{{$t('NEWBonusPageB.WeeklyCashBack')}}</view>
								<view class="phphzhi" :class="[WeeklyCashback.reward>0?'lvse':'']">
									<text v-if="platform == 8">$</text>
									<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
									<text v-else-if="platform == 10 || platform == 11">$</text>
									<text v-else>₱</text>{{(WeeklyCashback.reward/100).toFixed(2) || '0.00'}}</view>
							</view>
						</view>
						<view class="caozuanniu">
							<view class="anniu_type1" v-if="WeeklyCashback.reward == 0">{{$t('ADDnew2.NoRewardsYet')}}
							</view>
							<view class="zhuceBtn" v-else-if="WeeklyCashback.status == 1 && WeeklyCashback.reward > 0"
								@click="Lingqu('WeeklyCashback')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
							<view class="anniu_type1"
								v-else-if="WeeklyCashback.status == 0 && WeeklyCashback.countdown > 0"><u-count-down
									:timestamp="WeeklyCashback.countdown" bg-color="" color="#aebac8"
									separator-color="#aebac8" font-size="24"></u-count-down></view>
						</view>
					</view>











					<view class="bonus_list_box_item" v-if="WeeklyBonusSwitch">
						<view class="bonus_list_box_title">
							<view class="bonus_list_box_title_right">
								<image src="/static/Bonuslogin/07.png" mode="widthFix"></image>
							</view>
							<view class="bonus_list_box_title_left">
								<view class="Daily">{{$t('NEWBonusPageB.WeeklyBonus')}}</view>

								<view class="fubiaoti">
									<view class="fbt_type3">
										<view class="type3jindutiao">
											<!-- <view>{{$t('NEWBonusPageB.DepToUnlock')}}</view> -->
											<view :class="[WeeklyBonus.reward>0?'lvse':'']">
												<text v-if="platform == 8">$</text>
												<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
												<text v-else-if="platform == 10 || platform == 11">$</text>
												<text v-else>₱</text>{{(WeeklyBonus.reward/100).toFixed(2)}}</view>
										</view>
										<!-- <view class="type3jindu">
										<u-line-progress active-color="#11bb40" inactive-color="#2c394c" :percent="BonusProgress(WeeklyBonus)" height="12">
											<view slot="default"></view>
										</u-line-progress>
									</view> -->
									</view>
								</view>

							</view>
						</view>

						<view class="caozuanniu">
							<view class="anniu_type1" v-if="WeeklyBonus.reward == 0">{{$t('ADDnew2.NoRewardsYet')}}
							</view>
							<view class="zhuceBtn" v-else-if="WeeklyBonus.status == 1 && WeeklyBonus.reward > 0"
								@click="Lingqu('WeeklyBonus')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
							<view class="anniu_type1" v-else-if="WeeklyBonus.status == 0 && WeeklyBonus.reward > 0">
								<u-count-down :timestamp="WeeklyBonus.countdown" bg-color="" color="#aebac8"
									separator-color="#aebac8" font-size="24"></u-count-down></view>
						</view>
					</view>













					<view class="bonus_list_box_item" v-if="MonthlyBonusSwitch">
						<view class="bonus_list_box_title">
							<view class="bonus_list_box_title_right">
								<image src="/static/Bonuslogin/08.png" mode="widthFix"></image>
							</view>
							<view class="bonus_list_box_title_left">
								<view class="Daily">{{$t('NEWBonusPageB.MonthlyBonus')}}</view>

								<view class="fubiaoti">
									<view class="fbt_type3">
										<view class="type3jindutiao">
											<!-- <view>{{$t('NEWBonusPageB.DepToUnlock')}}</view> -->
											<view :class="[MonthlyBonus.reward>0?'lvse':'']">
												<text v-if="platform == 8">$</text>
												<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
												<text v-else-if="platform == 10 || platform == 11">$</text>
												<text v-else>₱</text>{{(MonthlyBonus.reward/100).toFixed(2)}}</view>
										</view>
										<!-- <view class="type3jindu">
										<u-line-progress active-color="#11bb40" inactive-color="#2c394c" :percent="BonusProgress(MonthlyBonus)" height="12">
											<view slot="default"></view>
										</u-line-progress>
									</view> -->
									</view>
								</view>
							</view>
						</view>
						<view class="caozuanniu">
							<view class="anniu_type1" v-if="MonthlyBonus.reward == 0">{{$t('ADDnew2.NoRewardsYet')}}
							</view>
							<view class="zhuceBtn" v-else-if="MonthlyBonus.status == 1 && MonthlyBonus.reward > 0"
								@click="Lingqu('MonthlyBonus')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
							<view class="anniu_type1" v-else-if="MonthlyBonus.status == 0 && MonthlyBonus.reward > 0">
								<u-count-down :timestamp="MonthlyBonus.countdown" bg-color="" color="#aebac8"
									separator-color="#aebac8" font-size="24"></u-count-down></view>
						</view>
					</view>
				</view>




























			</view>
		</view>



	</view>
</template>

<script>
	export default {
		name: "Novice-Promotion-pack",
		data() {
			return {
				platform: this.PID,
				isAcHuodong: 0,
				DailyRebate: {},
				DailyRebateSwitch: true,

				DailyCashback: {},
				DailyCashbackSwitch: 1,

				WeeklyCashback: {},
				WeeklyCashbackSwitch: 1,

				WeeklyBonus: {},
				WeeklyBonusSwitch: false,

				MonthlyBonus: {},
				MonthlyBonusSwitch: false,

				Progress: {},



				SigninDayList: [],
				signInSwitch: false,
				todaySignIn: {},
				is_arrisDaka: [],
				Available: [],

				SignInReward: 0,

				is_SignInLingqu: 0, //是否可领取按钮 1可以 0不可以
				ok_lingqu: {},
				localDate: '', // 今天日期
				day: new Date().getDate(), // 当前日
				year: new Date().getFullYear(), // 当前年
				month: new Date().getMonth() + 1, // 当前月



			};
		},
		created() {

		},
		methods: {
			inits() {
				let isToken = uni.getStorageSync("token")
				if (!isToken) {

				} else {
					this.GetGeneralReward()
					this.getVipprogress()
					this.GetQianDao()
					this.jizhiAcLibaojk()
				}
			},
			//检测用户禁止参与活动和礼包功能
			jizhiAcLibaojk() {
				const userInfo = uni.getStorageSync("userinfo");
				const num = userInfo.managerFlag;
				const bitPosition = 3;
				const fag = this.checkBit(num, bitPosition) ? '1' : '0'; //1禁止 0不禁止
				console.log('是否禁止参与活动', fag); //1禁止 0不禁止
				this.isAcHuodong = fag
			},
			checkBit(num, bitPosition) {
				const mask = 1 << bitPosition;
				return (num & mask) !== 0;
			},
			//获取通用奖励信息 General Reward
			GetGeneralReward() {
				let that = this
				that.$u.post('/general/reward', {

				}).then(res => {
					//console.log('General Reward',res.data)
					that.DailyRebate = res.data.rebate
					that.DailyRebateSwitch = res.data.rebate.switch

					that.DailyCashback = res.data.dailyCashback
					that.DailyCashbackSwitch = res.data.dailyCashback.switch

					that.WeeklyCashback = res.data.weeklyCashback
					that.WeeklyCashbackSwitch = res.data.weeklyCashback.switch

					that.WeeklyBonus = res.data.weeklyBonus
					that.WeeklyBonusSwitch = res.data.weeklyBonus.switch

					that.MonthlyBonus = res.data.monthlyBonus
					that.MonthlyBonusSwitch = res.data.monthlyBonus.switch

					that.signInSwitch = res.data.signIn.switch
				})
			},
			BonusProgress(data) {
				let needPay = data.needPay / 100
				let nowPay = data.nowPay / 100

				let all_count = needPay - nowPay
				if (needPay == nowPay) {
					return 100
				} else {
					return parseInt(((needPay - all_count) / needPay) * 100)
				}
			},
			Lingqu(type) {
				let that = this
				if (type == "DailyRebate") { //每日返水
					that.StartLing(3)


				} else if (type == "DailyCashback") { //每日亏损返水
					that.StartLing(29)


				} else if (type == "WeeklyCashback") { //每周亏损返还
					that.StartLing(30)


				} else if (type == "WeeklyBonus") { //每周奖金
					that.StartLing(13)


				} else if (type == "MonthlyBonus") { //每月奖金
					that.StartLing(14)
				}
			},
			//获取VIP进度和等级
			getVipprogress() {
				let that = this
				let userinfo = uni.getStorageSync("userinfo")
				that.$u.post('/vip/progress', {
					vipLevel: userinfo.vip
				}).then(res => {
					that.Progress = res.data.progress
				})
			},
			StartLing(type) {
				let that = this
				that.$u.post('/vip/reward/take', {
					rewardType: type, // Number 是 领取类型： 3 返水 11 升级礼金 12 生日礼金 13 周礼金 14 月礼金
					vipLevel: that.Progress.vip
				}).then(res => {
					that.$nextTick(() => {

						//领取之后更新所有接口
						that.GetGeneralReward();

						uni.$emit('getgetMybalance', 1);

						that.$emit('guanbiliBAo', 0);

						//来刷新一个任务列表显示可领取数量
						uni.$emit('RsGetTaskList', 1);

						if (type == 3) {
							uni.$emit('UpdataAddBcbalance', (that.DailyRebate.reward / 100).toFixed(2))
						} else if (type == 29) {
							uni.$emit('UpdataAddBcbalance', (that.DailyCashback.reward / 100).toFixed(2))
						} else if (type == 30) {
							uni.$emit('UpdataAddBcbalance', (that.WeeklyCashback.reward / 100).toFixed(2))
						} else if (type == 13) {
							uni.$emit('UpdataAddBcbalance', (that.WeeklyBonus.reward / 100).toFixed(2))
						} else if (type == 14) {
							uni.$emit('UpdataAddBcbalance', (that.MonthlyBonus.reward / 100).toFixed(2))
						}

					})
				})
			},




			TodaySigin_Popup() {
				this.$emit('guanbiliBAo', 1);
			},
			//获取签到
			GetQianDao() {
				let that = this
				that.$u.post('/signin/info', {

				}).then(res => {
					//console.log('签到信息-外',res.data);

					// 今天日期
					that.localDate = that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(that.day);

					if (res.data.length != 0) {

						//that.SigninDayList = res.data.signIn;
						that.todaySignIn = res.data.todaySignIn;


						//筛选出已打卡的
						// let arrisDaka = [];
						// res.data.signIn.forEach((item, index) => {
						// 	if (item.status == 1) {
						// 		arrisDaka.push(item);
						// 	}
						// });
						// that.is_arrisDaka = arrisDaka;

						//找出可领取的奖励显示领取按钮
						//Available里面如果有今日的就取出来，领取
						//根据todaySignIn里面的今天日期来确定今天
						// let Today = res.data.todaySignIn.today
						// let yes_lingqu = {}
						let Qiuhe = 0
						res.data.Available.forEach((item, index) => {
							// if (item.date == Today) {
							// 	that.is_SignInLingqu = 1
							// 	yes_lingqu = {
							// 		date: item.date,
							// 		reward: item.reward
							// 	}
							// }
							Qiuhe += item.reward
						});
						//console.log('有可领取的签到',yes_lingqu)
						// that.ok_lingqu = yes_lingqu

						that.SignInReward = Qiuhe


						//只要Available里面有数据就可以领取，点击打开签到详情领取
						that.Available = res.data.Available

					} else {
						that.is_SignInLingqu = 0
						that.SigninDayList = []
						that.is_arrisDaka = []
						that.Available = []
					}
				})
			},
			// 格式化日期位数
			formatNum(num) {
				return num < 10 ? ('0' + num) : num;
			},
			Lingqu_qiandao() {
				let that = this
				that.$emit('guanbiliBAo', 1);
				// setTimeout(()=>{
				// 	uni.navigateTo({
				// 		url: '/pages/Bonus-Logoin/Bonus-Logoin'
				// 	})
				// },300)

				// that.$u.post('/take/signin/reward', {
				// 	date: that.ok_lingqu.date
				// }).then(res => {
				// 	that.is_SignInLingqu = 0
				// 	//结果数据 res.data: {newBalance: 346, reward: 300, rewardType: 31}
				// 	that.GetQianDao();
				// 	uni.$emit('getgetMybalance', 1);
				// 	that.$emit('guanbiliBAo',0);
				// 	uni.$emit('UpdataAddBcbalance', (res.data.reward/100).toFixed(2));
				// })
			},




		}
	}
</script>

<style lang="scss">
	.lvse {
		color: #0bd81e !important;
		font-size: 24rpx;
	}
	.gundong_box_wrap2 {
		padding: 0 0 0 0;

		.gdbox_title2 {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: #fff;
			font-size: 34rpx;

			image {
				width: 45rpx;
				margin-right: 10rpx;
				height: 45rpx;
			}
		}

		.bonus_list_box {
			.list_itembg1 {
				background: radial-gradient(97.13% 60.1% at 0% 0%, rgba(22, 143, 255, 0.48) 0%, rgba(0, 0, 0, 0) 100%), rgb(17, 25, 35);
			}

			.list_itembg2 {
				background: radial-gradient(97.13% 60.1% at 0% 0%, rgba(27, 184, 61, 0.48) 0%, rgba(0, 0, 0, 0) 100%), rgb(17, 25, 35);
			}

			.list_itembg3 {
				background: radial-gradient(97.13% 60.1% at 0% 0%, rgba(255, 0, 73, 0.48) 0%, rgba(0, 0, 0, 0) 100%), rgb(17, 25, 35);
			}

			.list_itembg4 {
				background: radial-gradient(97.13% 60.1% at 0% 0%, rgba(255, 156, 54, 0.48) 0%, rgba(0, 0, 0, 0) 100%), rgb(17, 25, 35);
			}

			.list_itembg5 {
				background: radial-gradient(97.13% 60.1% at 0% 0%, rgba(12, 148, 150, 0.48) 0%, rgba(0, 0, 0, 0) 100%), rgb(17, 25, 35);
			}

			.bonus_list_box_item {
				margin: 0 0 18rpx 0;
				padding: 20rpx 24rpx;
				border-radius: 12px;
				background-color: $novice-popup-itembg;
				border: 1px solid $novice-popup-itemborder;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.caozuanniu {
					position: relative;
					width: 192rpx;
					font-size: 24rpx;
					.biaoji {
						display: flex;
						align-items: center;
						justify-content: center;
						position: absolute;
						top: -5px;
						right: -5px;
						width: 20px;
						height: 20px;
						border-radius: 100px;
						background-color: #fff;
						border: 2px solid #db0a49;
						color: #db0a49;
						text-align: center;
						z-index: 9;
						font-size: 12px;
						font-weight: bold;
					}

					.zhuceBtn {
						font-weight: bold;

						span {
							height: 70rpx !important;
							line-height: 70rpx !important;
							border-radius: 8px;
							font-weight: bold;
						}
					}

					.zhuceBtn:after {
						height: 70rpx !important;
						line-height: 70rpx !important;
						border-radius: 8px;
					}

					.anniu_type1 {
						width: 100%;
						color: $anniu-type1-text-colo;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
						background-color: $anniu-type1-bg;
						border: 1px solid $anniu-type1-bg-border;
						border-radius: 8px;
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						font-weight: bold;

						span {
							margin-right: 10rpx;
						}
					}
				}

				.fubiaoti {
					margin: 0rpx 0 0rpx 0;
					padding: 0 0 0 0;

					.fbt_type1 {
						color: #aebbcf;

						span {
							margin: 0 10rpx;
							color: $all-secondary-text-color;
						}
					}

					.fbt_type2 {
						display: flex;
						align-items: center;
						overflow: hidden;

						.fbt_type2_scroll_view {
							white-space: nowrap;
							width: 100%;
						}

						.fbt_type2_box {
							display: flex;
							align-items: center;

							.gundong_box {
								display: inline-flex;
								align-items: center;
							}
						}

						.one {
							color: #0bd81e;
							opacity: .2;
						}

						image {
							width: 20rpx;
							height: 20rpx;
							margin: 0 6rpx;
						}

						.two {
							color: #0bd81e;
							font-size: 34rpx;
						}
					}

					.fbt_type3 {
						width: 92%;

						.type3jindutiao {
							display: flex;
							align-items: center;
							justify-content: space-between;
							color: #7b98bf;
							font-size: 24rpx;
							text {
								margin-right: 4rpx;
							}
						}

						.type3jindu {
							line-height: 12rpx;
						}
					}
				}

				.bonus_list_box_title {
					display: flex;
					align-items: center;
					flex: 1;

					.bonus_list_box_title_left {
						padding-left: 13px;
						flex: 1;

						.Daily {
							color: $all-secondary-text-color;
							display: flex;
							align-items: center;
							font-size: 28rpx;
							font-weight: bold;

							image {
								width: 30rpx;
								height: 30rpx;
								margin-left: 10rpx;
							}
						}

						.phphzhi {
							color: #7b98bf;
							font-size: 24rpx;
							text {
								margin-right: 4rpx;
							}
						}
					}

					.bonus_list_box_title_right {
						image {
							width: 70rpx;
							height: 70rpx;
						}
					}
				}
			}
		}
	}

	.zhuceBtn {
		position: relative;
		color: #ffffff;

		span {
			display: inline-block;
			background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
			box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
			border-radius: 12px;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			position: relative;
			z-index: 2;
			cursor: pointer;
			font-weight: bold;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}

	.zhuceBtn:after {
		border-radius: 12px;
		height: 70rpx;
		background-color: #61001d;
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: -3px;
		margin: 0 auto;
		z-index: 1;
	}
</style>