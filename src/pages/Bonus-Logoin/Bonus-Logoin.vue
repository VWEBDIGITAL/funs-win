<template>
	<view :style="theme" class="page_boxs">
		
		<!--充值和提款-->
		<pc-Deposit ref="openPCdeposit"></pc-Deposit>
		
		<uni-transition class="qiliuba_hylb" :mode-class="['fade', 'slide-bottom']" :styles="{'max-width':'430px','height':'auto','position':'fixed','bottom':'66px','left':'0','z-index':'99','right':'0','margin':'0 auto'}" :show="showDepositBonus">
			<Welcome-DepositBonusPlus ref="Openshows" @dakitikPopup="dakitikPopup" @DepositBonusClose="DepositBonusClose"></Welcome-DepositBonusPlus>
		</uni-transition>
		
		<AllLevel-Popup ref="AllLevelopenPopup"></AllLevel-Popup>
		<History-Popup ref="HistoryopenPopup"></History-Popup>
		
		<!--每日返水-->
		<DailyRebate-Popup ref="DailyRebatePopup"></DailyRebate-Popup>
		
		<DailyCashback-Popup ref="DailyCashbackPopup"></DailyCashback-Popup>
		
		<WeeklyCashback-Popup ref="WeeklyCashbackPopup"></WeeklyCashback-Popup>
		
		<WeeklyBonus-Popup ref="WeeklyBonusPopup"></WeeklyBonus-Popup>
		
		<MonthlyBonus-Popup ref="MonthlyBonusPopup"></MonthlyBonus-Popup>
		
		<DepositBonus-Popup ref="DepositBonusPopup"></DepositBonus-Popup>
		
		<SigInPopup ref="openSiginShow" @shuaxin="GetQianDao"></SigInPopup>
		
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('ReferPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		
		
		
		<match-media :min-width="800">
			<view class="dingbuJianBian"></view>
		</match-media>
		<view class="liangBian">
			
			<view class="top_box_wrap">
				<!-- <image class="top_bg" src="/static/Bonuslogin/top_bg.png" mode="widthFix"></image> -->
				
				<match-media :max-width="800">
					<view class="dingbuJianBian"></view>
				</match-media>
				
				<view class="user-avatar_item">
					
					<view class="my_info_wrap">
						<view class="user-avatar">
							<image class="ava_bg" src="/static/Bonuslogin/regular-user-shield.webp"></image>
							<image class="ava_tx" :src="avatar"></image>
							<view class="leve_box">
								<image src="/static/Bonuslogin/dunpai.png" mode="widthFix"></image>
								<text>{{Progress.vip+1 || 1}}</text>
							</view>
						</view>
						<view class="jdtandejl">
							<view class="Welcome_Bonuses"><span>{{$t('NEWBonusPageB.wlecome')}}</span>{{$t('NEWBonusPageB.bonuses')}}</view>
							<view class="jindutiao">
								<u-line-progress active-color="#2979ff" :percent="Progress.progressRate" height="16">
									<view slot="default"></view>
								</u-line-progress>
							</view>
							<view class="Wagerfor">
								<view class="nrinfo">{{$t('NEWBonusPageB.needWager')}}:<span>
								<text v-if="platform == 8 ||platform == 10 || platform == 11">$</text>
								<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
								<text v-else>₱</text>{{(Progress.needBet/100).toFixed(2)}}</span></view>
								<view class="tanhao"><image src="/static/Bonuslogin/i.png" @click="openLeve()"></image></view>
							</view>
						</view>
					</view>
					
					
					
					
					
					
					<match-media :max-width="800" >
						<view class="line1"></view>
					</match-media>
					
					
					<view class="myhejibox">
						<view class="myhejibox_left">
							<image src="/static/Bonuslogin/01.png" mode="widthFix"></image>
						</view>
						<view class="myhejibox_right">
							<view class="hejijine">
								<view>{{$t('NEWBonusPageB.TotalBonusClaimed')}}</view>
								<view @click="openHistory()">{{$t('RewardHistoryPopup.title')}}<u-icon name="arrow-right" color="#3673d9" size="24"></u-icon></view>
							</view>
							<view class="myjinedu"><image class="rank_icon" src="/static/image/qianbi.png"></image> {{(totalBonus/100).toFixed(2)}}</view>
						</view>
					</view>
					
					<match-media :max-width="800" >
						<view class="line1"></view>
					</match-media>
					
				</view>
			</view>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			<!-- <view v-if="firstPay.switchStatus && secondPay.switchStatus && thirdPay.switchStatus">
				
			</view> -->
			<view v-if="isAcHuodong == 0">
				<view v-show="payCount < 3 && (firstPay.countdown > 0 || secondPay.countdown > 0 || thirdPay.countdown > 0)">
					<view class="banshi gundong_box_wrap">
						
						<view class="gdbox_title">
							<image src="/static/Bonuslogin/02.png" mode="widthFix"></image><text>{{$t('NEWBonusPageB.WelCome')}}</text>
						</view>
						
						
						
						
						
						
						<!-- #ifdef H5 || WEB -->
						<view class="swiper-container">
							<view class="swiper-wrapper gundong_swpier">
								<view class="swiper-slide">
									<!--首充-->
									<view class="scroll_item_box">
										<view class="scroll_item_box_item">
											<view class="gantanhao"><image @click="DepositBonus_Popup(firstPay)" src="/static/Bonuslogin/i.png"></image></view>
											<view class="item_1">{{$t('NEWBonusPageB.1STDeposit')}}</view>
											<view class="item_Jiacheng" v-if="firstPay.extraCountdown > 0 && payCount == 0">
												<view class="item_jc1"><span>{{firstPay.rewardRate}}%</span>{{$t('NEWBonusPageB.BONUS')}}</view>
												<view class="item_jc2">
													<view class="item_jc2_2">
														<image src="/static/image/huo.png"></image>
														<view>{{MaxRates}}%</view>
													</view>
													<view class="item_jc2_3">
														<u-count-down :timestamp="firstPay.extraCountdown" bg-color="" color="#ffffff" separator-color="#ffffff" font-size="28" @end="firstPayExtraCountdownend"></u-count-down>
													</view>
												</view>
											</view>
											<view class="item_2" v-else>
												<view class="item_2_1">{{firstPay.rewardRate}}%</view>
												<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
											</view>
											<view class="item_4">
												<view class="djs_lst" v-if="firstPay.countdown>0 && payCount == 0"><u-count-down :timestamp="firstPay.countdown" bg-color="" color="#627a98" separator-color="#627a98" font-size="24"></u-count-down></view>
												<!--可参与(高亮按钮)-->
												<view class="zhuceBtn" v-if="firstPay.status==0 && firstPay.countdown>0 && payCount == 0" @click="ToDeposit()"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--不可参与(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="firstPay.status==0 && firstPay.countdown==0 && payCount == 0"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与未达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="firstPay.status==0 && payCount >= 1"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与已达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="firstPay.status==2 && payCount >= 1"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<view class="zhuceBtn scroll_item_box_opacity" v-else><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
										</view>
									</view>
								</view>
								<view class="swiper-slide">
									<!--二充-->
									<view class="scroll_item_box">
										<view class="scroll_item_box_item">
											<view class="gantanhao"><image @click="DepositBonus_Popup(secondPay)" src="/static/Bonuslogin/i.png"></image></view>
											<view class="item_1">{{$t('NEWBonusPageB.2ndDeposit')}}</view>
											<view class="item_2">
												<view class="item_2_1">{{secondPay.rewardRate}}%</view>
												<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
											</view>
												<!--可参与(高亮按钮显示倒计时)-->
												<view class="item_4" v-if="secondPay.status==0 && secondPay.countdown>0 && payCount <= 1">
													<view class="djs_lst" v-if="secondPay.countdown > 0"><u-count-down :timestamp="secondPay.countdown" bg-color="" color="#627a98" separator-color="#627a98" font-size="24"></u-count-down></view>
													<view class="zhuceBtn" @click="ToDeposit()"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
												<!--不可参与(置灰按钮隐藏倒计时)-->
												<view class="item_4" v-else-if="secondPay.status==0 && secondPay.countdown==0 && payCount <= 1">
													<view class="zhuceBtn scroll_item_box_opacity"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
												<!--参与未达标(置灰按钮隐藏倒计时)-->
												<view class="item_4" v-else-if="secondPay.status==0 && payCount >= 2">
													<view class="zhuceBtn scroll_item_box_opacity"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
												<!--参与已达标(置灰按钮隐藏倒计时)-->
												<view class="item_4" v-else-if="secondPay.status==2 && payCount >= 2">
													<view class="zhuceBtn scroll_item_box_opacity"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
												<view class="item_4" v-else>
													<view class="zhuceBtn scroll_item_box_opacity"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
										</view>
									</view>
								</view>
								<view class="swiper-slide">
									<!--三充-->
									<view class="scroll_item_box" style="margin-bottom: 0;">
										<view class="scroll_item_box_item">
											<view class="gantanhao"><image @click="DepositBonus_Popup(thirdPay)" src="/static/Bonuslogin/i.png"></image></view>
											<view class="item_1">{{$t('NEWBonusPageB.3rdDeposit')}}</view>
											<view class="item_2">
												<view class="item_2_1">{{thirdPay.rewardRate}}%</view>
												<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
											</view>
											<view class="item_4">
												<view class="djs_lst" v-if="thirdPay.countdown > 0"><u-count-down :timestamp="thirdPay.countdown" bg-color="" color="#627a98" separator-color="#627a98" font-size="24"></u-count-down></view>
												<!--可参与(高亮按钮)-->
												<view class="zhuceBtn" v-if="thirdPay.status==0 && thirdPay.countdown>0 && payCount <= 2" @click="ToDeposit()"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--不可参与(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="thirdPay.status==0 && thirdPay.countdown==0 && payCount <= 2"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与未达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="thirdPay.status==0 && payCount > 2"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与已达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="thirdPay.status==2 && payCount > 2"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<view class="zhuceBtn scroll_item_box_opacity" v-else><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="swiper-pagination"></view>
						</view>
						<!-- #endif -->
						
						
						
						
						
						
						<!-- #ifdef APP-PLUS -->
						<scroll-view :scroll-x="true">
							<view class="gundong_swpier">
								<view class="scrollview-box">
									<view class="scroll_item_box">
										<view class="scroll_item_box_item">
											<view class="gantanhao"><image @click="DepositBonus_Popup(firstPay)" src="/static/Bonuslogin/i.png"></image></view>
											<view class="item_1">{{$t('NEWBonusPageB.1STDeposit')}}</view>
											<view class="item_Jiacheng" v-if="firstPay.extraCountdown > 0 && payCount == 0">
												<view class="item_jc1"><span>{{firstPay.rewardRate}}%</span>{{$t('NEWBonusPageB.BONUS')}}</view>
												<view class="item_jc2">
													<view class="item_jc2_2">
														<image src="/static/image/huo.png"></image>
														<view>{{MaxRates}}%</view>
													</view>
													<view class="item_jc2_3">
														<u-count-down :timestamp="firstPay.extraCountdown" bg-color="" color="#ffffff" separator-color="#ffffff" font-size="28" @end="firstPayExtraCountdownend"></u-count-down>
													</view>
												</view>
											</view>
											<view class="item_2" v-else>
												<view class="item_2_1">{{firstPay.rewardRate}}%</view>
												<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
											</view>
											<view class="item_4">
												<view class="djs_lst" v-if="firstPay.countdown>0 && payCount == 0"><u-count-down :timestamp="firstPay.countdown" bg-color="" color="#627a98" separator-color="#627a98" font-size="24"></u-count-down></view>
												<!--可参与(高亮按钮)-->
												<view class="zhuceBtn" v-if="firstPay.status==0 && firstPay.countdown>0 && payCount == 0" @click="ToDeposit()"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--不可参与(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="firstPay.status==0 && firstPay.countdown==0 && payCount == 0"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与未达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="firstPay.status==0 && payCount >= 1"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与已达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="firstPay.status==2 && payCount >= 1"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<view class="zhuceBtn scroll_item_box_opacity" v-else><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
										</view>
									</view>
									<view class="scroll_item_box">
										<view class="scroll_item_box_item">
											<view class="gantanhao"><image @click="DepositBonus_Popup(secondPay)" src="/static/Bonuslogin/i.png"></image></view>
											<view class="item_1">{{$t('NEWBonusPageB.2ndDeposit')}}</view>
											<view class="item_2">
												<view class="item_2_1">{{secondPay.rewardRate}}%</view>
												<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
											</view>
												<!--可参与(高亮按钮显示倒计时)-->
												<view class="item_4" v-if="secondPay.status==0 && secondPay.countdown>0 && payCount <= 1">
													<view class="djs_lst" v-if="secondPay.countdown > 0"><u-count-down :timestamp="secondPay.countdown" bg-color="" color="#627a98" separator-color="#627a98" font-size="24"></u-count-down></view>
													<view class="zhuceBtn" @click="ToDeposit()"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
												<!--不可参与(置灰按钮隐藏倒计时)-->
												<view class="item_4" v-else-if="secondPay.status==0 && secondPay.countdown==0 && payCount <= 1">
													<view class="zhuceBtn scroll_item_box_opacity"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
												<!--参与未达标(置灰按钮隐藏倒计时)-->
												<view class="item_4" v-else-if="secondPay.status==0 && payCount >= 2">
													<view class="zhuceBtn scroll_item_box_opacity"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
												<!--参与已达标(置灰按钮隐藏倒计时)-->
												<view class="item_4" v-else-if="secondPay.status==2 && payCount >= 2">
													<view class="zhuceBtn scroll_item_box_opacity"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
												<view class="item_4" v-else>
													<view class="zhuceBtn scroll_item_box_opacity"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												</view>
										</view>
									</view>
									<view class="scroll_item_box" style="margin-bottom: 0;">
										<view class="scroll_item_box_item">
											<view class="gantanhao"><image @click="DepositBonus_Popup(thirdPay)" src="/static/Bonuslogin/i.png"></image></view>
											<view class="item_1">{{$t('NEWBonusPageB.3rdDeposit')}}</view>
											<view class="item_2">
												<view class="item_2_1">{{thirdPay.rewardRate}}%</view>
												<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
											</view>
											<view class="item_4">
												<view class="djs_lst" v-if="thirdPay.countdown > 0"><u-count-down :timestamp="thirdPay.countdown" bg-color="" color="#627a98" separator-color="#627a98" font-size="24"></u-count-down></view>
												<!--可参与(高亮按钮)-->
												<view class="zhuceBtn" v-if="thirdPay.status==0 && thirdPay.countdown>0 && payCount <= 2" @click="ToDeposit()"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--不可参与(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="thirdPay.status==0 && thirdPay.countdown==0 && payCount <= 2"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与未达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="thirdPay.status==0 && payCount > 2"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与已达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity" v-else-if="thirdPay.status==2 && payCount > 2"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<view class="zhuceBtn scroll_item_box_opacity" v-else><span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
						<!-- #endif -->
						
						
						
						
						
					</view>
				</view>
			</view>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			<view class="gundong_box_wrap2">
				<view class="gdbox_title2" v-if="DailyRebateSwitch || DailyCashbackSwitch==1 || WeeklyCashbackSwitch==1 || WeeklyBonusSwitch || MonthlyBonusSwitch || signInSwitch">
					<image src="/static/Bonuslogin/03.png" mode="widthFix"></image><text>{{$t('NEWBonusPageB.GeneralRewards')}}</text>
				</view>
				<view class="bonus_list_box">
					
					
					<uni-row :gutter="30" class="demo-uni-row">
						<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="DailyRebateSwitch">
							<view class="bonus_list_box_item list_itembg1">
								<view class="bonus_list_box_title">
									<view class="bonus_list_box_title_left">
										<view class="Daily">{{$t('DailyRebatePopup.title')}}<image @click="DailyRebate_Popup(DailyRebate.countdown)" src="/static/Bonuslogin/i-2.png"></image></view>
										<view class="phphzhi" :class="[DailyRebate.reward>0?'lvseText':'']">
										<text v-if="platform == 8 ||platform == 10 || platform == 11">$</text>
										<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
										<text v-else>₱</text>{{(DailyRebate.reward/100).toFixed(2)}}</view>
									</view>
									<view class="bonus_list_box_title_right">
										<image src="/static/Bonuslogin/04.png" mode=""></image>
									</view>
								</view>
								<view class="fubiaoti">
									<view class="fbt_type2">
										<scroll-view class="fbt_type2_scroll_view" scroll-x="true">
											<view class="fbt_type2_box">
												<view class="gundong_box" v-for="(itemk,indexk) in DailyRebate.rateList" :key="indexk">
													<span class="two" v-if="!DailyRebate.rate && indexk==0">{{itemk}}%</span>
													<span v-else :class="[DailyRebate.rate==itemk?'two':'one']">{{itemk}}%</span>
													<image src="/static/Bonuslogin/back_arrow_icon.png" v-if="indexk != DailyRebate.rateList.length-1"></image>
												</view>
											</view>
										</scroll-view>
									</view>
								</view>
								<view class="caozuanniu" v-if="isAcHuodong == 0">
									<view class="anniu_type1" v-if="DailyRebate.reward == 0">{{$t('NEWBonusPageB.ToBet')}}</view>
									<view class="zhuceBtn" v-else-if="DailyRebate.status == 1 && DailyRebate.reward > 0" @click="Lingqu('DailyRebate')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="DailyRebate.status == 0 && DailyRebate.reward > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="DailyRebate.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
								<view class="caozuanniu zhihuide" v-else>
									<view class="anniu_type1" v-if="DailyRebate.reward == 0">{{$t('NEWBonusPageB.ToBet')}}</view>
									<view class="zhuceBtn" v-else-if="DailyRebate.status == 1 && DailyRebate.reward > 0"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="DailyRebate.status == 0 && DailyRebate.reward > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="DailyRebate.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
							</view>
						</uni-col>
						
						
						
						
						
						
						
						
						<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="DailyCashbackSwitch == 1 || DailyCashbackSwitch == undefined">
							<view class="bonus_list_box_item list_itembg2">
								<view class="bonus_list_box_title">
									<view class="bonus_list_box_title_left">
										<view class="Daily">{{$t('DailyCashBackPopup.title')}}<image @click="DailyCashback_Popup(DailyCashback)" src="/static/Bonuslogin/i-2.png"></image></view>
										<view class="phphzhi" :class="[DailyCashback.reward>0?'lvseText':'']">
										<text v-if="platform == 8 ||platform == 10 || platform == 11">$</text>
										<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
										<text v-else>₱</text>{{(DailyCashback.reward/100).toFixed(2)}}</view>
									</view>
									<view class="bonus_list_box_title_right">
										<image src="/static/Bonuslogin/05.png" mode=""></image>
									</view>
								</view>
								<view class="fubiaoti">
									<view class="fbt_type2">
										<view class="fbt_type2_box" v-for="(itemk,indexk) in DailyCashback.rateList" :key="indexk">
											<span class="two" v-if="DailyCashback.rate==0 && indexk==0">{{itemk}}%</span>
											<span v-else :class="[DailyCashback.rate==itemk?'two':'one']">{{itemk}}%</span>
											<image src="/static/Bonuslogin/back_arrow_icon.png" v-if="indexk != DailyCashback.rateList.length-1"></image>
										</view>
									</view>
								</view>
								<view class="caozuanniu" v-if="isAcHuodong == 0">
									<view class="anniu_type1" v-if="DailyCashback.reward == 0">{{$t('NEWBonusPageB.ToBet')}}</view>
									<view class="zhuceBtn" v-else-if="DailyCashback.status == 1 && DailyCashback.reward > 0" @click="Lingqu('DailyCashback')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="DailyCashback.status == 0 && DailyCashback.reward > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="DailyCashback.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
								<view class="caozuanniu zhihuide" v-else>
									<view class="anniu_type1" v-if="DailyCashback.reward == 0">{{$t('NEWBonusPageB.ToBet')}}</view>
									<view class="zhuceBtn" v-else-if="DailyCashback.status == 1 && DailyCashback.reward > 0"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="DailyCashback.status == 0 && DailyCashback.reward > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="DailyCashback.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
							</view>
						</uni-col>
						
						<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="WeeklyCashbackSwitch == 1 || WeeklyCashbackSwitch == undefined">
							<view class="bonus_list_box_item list_itembg3">
								<view class="bonus_list_box_title">
									<view class="bonus_list_box_title_left">
										<view class="Daily">{{$t('NEWBonusPageB.WeeklyCashBack')}}<image @click="WeeklyCashback_Popup(WeeklyCashback)" src="/static/Bonuslogin/i-2.png"></image></view>
										<view class="phphzhi" :class="[WeeklyCashback.reward>0?'lvseText':'']">
										<text v-if="platform == 8 ||platform == 10 || platform == 11">$</text>
										<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
										<text v-else>₱</text>{{(WeeklyCashback.reward/100).toFixed(2)}}</view>
									</view>
									<view class="bonus_list_box_title_right">
										<image src="/static/Bonuslogin/06.png" mode=""></image>
									</view>
								</view>
								<view class="fubiaoti">
									<view class="fbt_type2">
										<view class="fbt_type2_box" v-for="(iteml,indexl) in WeeklyCashback.rateList" :key="indexl">
											
											<span class="two" v-if="WeeklyCashback.rate==0 && indexl==0">{{iteml}}%</span>
											<span v-else :class="[WeeklyCashback.rate==iteml?'two':'one']">{{iteml}}%</span>
											
											<image src="/static/Bonuslogin/back_arrow_icon.png" v-if="indexl != WeeklyCashback.rateList.length-1"></image>
										</view>
										<!--<span class="one">12%</span>
										<image src="/static/Bonuslogin/back_arrow_icon.png"></image>
										<span class="two">{{WeeklyCashback.rate}}%</span>
										<image src="/static/Bonuslogin/back_arrow_icon.png"></image>
										<span class="one">14%</span>-->
									</view>
								</view>
								<view class="caozuanniu" v-if="isAcHuodong == 0">
									<view class="anniu_type1" v-if="WeeklyCashback.reward == 0">{{$t('NEWBonusPageB.ToBet')}}</view>
									<view class="zhuceBtn" v-else-if="WeeklyCashback.status == 1 && WeeklyCashback.reward > 0" @click="Lingqu('WeeklyCashback')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="WeeklyCashback.status == 0 && WeeklyCashback.countdown > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="WeeklyCashback.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
								<view class="caozuanniu zhihuide" v-if="isAcHuodong == 1">
									<view class="anniu_type1" v-if="WeeklyCashback.reward == 0">{{$t('NEWBonusPageB.ToBet')}}</view>
									<view class="zhuceBtn" v-else-if="WeeklyCashback.status == 1 && WeeklyCashback.reward > 0"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="WeeklyCashback.status == 0 && WeeklyCashback.countdown > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="WeeklyCashback.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
							</view>
						</uni-col>
						
						<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="WeeklyBonusSwitch == true">
							<view class="bonus_list_box_item list_itembg4">
								<view class="bonus_list_box_title">
									<view class="bonus_list_box_title_left">
										<view class="Daily">{{$t('NEWBonusPageB.WeeklyBonus')}}<image @click="WeeklyBonus_Popup()" src="/static/Bonuslogin/i-2.png"></image></view>
										<view class="phphzhi" :class="[WeeklyBonus.reward>0?'lvseText':'']">
										<text v-if="platform == 8 ||platform == 10 || platform == 11">$</text>
										<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
										<text v-else>₱</text>{{(WeeklyBonus.reward/100).toFixed(2)}}</view>
									</view>
									<view class="bonus_list_box_title_right">
										<image src="/static/Bonuslogin/07.png" mode=""></image>
									</view>
								</view>
								<view class="fubiaoti">
									<view class="fbt_type3">
										<view class="type3jindutiao">
											<view>{{$t('NEWBonusPageB.DepToUnlock')}}</view>
											<view>{{(WeeklyBonus.nowPay/100).toFixed(2)}}/{{(WeeklyBonus.needPay/100).toFixed(2)}}</view>
										</view>
										<view class="type3jindu">
											<u-line-progress active-color="#11bb40" inactive-color="#242a37" :percent="BonusProgress(WeeklyBonus)" height="12">
												<view slot="default"></view>
											</u-line-progress>
										</view>
									</view>
								</view>
								<view class="caozuanniu" v-if="isAcHuodong == 0">
									<view class="anniu_type1" v-if="WeeklyBonus.reward == 0">{{$t('NEWBonusPageB.ToDep')}}</view>
									<view class="zhuceBtn" v-else-if="WeeklyBonus.status == 1 && WeeklyBonus.reward > 0" @click="Lingqu('WeeklyBonus')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="WeeklyBonus.status == 0 && WeeklyBonus.reward > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="WeeklyBonus.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
								<view class="caozuanniu zhihuide" v-if="isAcHuodong == 1">
									<view class="anniu_type1" v-if="WeeklyBonus.reward == 0">{{$t('NEWBonusPageB.ToDep')}}</view>
									<view class="zhuceBtn" v-else-if="WeeklyBonus.status == 1 && WeeklyBonus.reward > 0"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="WeeklyBonus.status == 0 && WeeklyBonus.reward > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="WeeklyBonus.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
							</view>
						</uni-col>
						
						<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="MonthlyBonusSwitch">
							<view class="bonus_list_box_item list_itembg5">
								<view class="bonus_list_box_title">
									<view class="bonus_list_box_title_left">
										<view class="Daily">{{$t('NEWBonusPageB.MonthlyBonus')}}<image @click="MonthlyBonus_Popup()" src="/static/Bonuslogin/i-2.png"></image></view>
										<view class="phphzhi" :class="[MonthlyBonus.reward>0?'lvseText':'']">
										<text v-if="platform == 8 ||platform == 10 || platform == 11">$</text>
										<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
										<text v-else>₱</text>{{(MonthlyBonus.reward/100).toFixed(2)}}</view>
									</view>
									<view class="bonus_list_box_title_right">
										<image src="/static/Bonuslogin/08.png" mode=""></image>
									</view>
								</view>
								<view class="fubiaoti">
									<view class="fbt_type3">
										<view class="type3jindutiao">
											<view>{{$t('NEWBonusPageB.DepToUnlock')}}</view>
											<view>{{(MonthlyBonus.nowPay/100).toFixed(2)}}/{{(MonthlyBonus.needPay/100).toFixed(2)}}</view>
										</view>
										<view class="type3jindu">
											<u-line-progress active-color="#11bb40" inactive-color="#242a37" :percent="BonusProgress(MonthlyBonus)" height="12">
												<view slot="default"></view>
											</u-line-progress>
										</view>
									</view>
								</view>
								<view class="caozuanniu" v-if="isAcHuodong == 0">
									<view class="anniu_type1" v-if="MonthlyBonus.reward == 0">{{$t('NEWBonusPageB.ToDep')}}</view>
									<view class="zhuceBtn" v-else-if="MonthlyBonus.status == 1 && MonthlyBonus.reward > 0" @click="Lingqu('MonthlyBonus')"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="MonthlyBonus.status == 0 && MonthlyBonus.reward > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="MonthlyBonus.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
								<view class="caozuanniu zhihuide" v-if="isAcHuodong == 1">
									<view class="anniu_type1" v-if="MonthlyBonus.reward == 0">{{$t('NEWBonusPageB.ToDep')}}</view>
									<view class="zhuceBtn" v-else-if="MonthlyBonus.status == 1 && MonthlyBonus.reward > 0"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else-if="MonthlyBonus.status == 0 && MonthlyBonus.reward > 0"><span>{{$t('NEWBonusPageB.ClaimIn')}}</span><u-count-down :timestamp="MonthlyBonus.countdown" bg-color="" color="#aebac8" separator-color="#aebac8" font-size="28"></u-count-down></view>
								</view>
							</view>
						</uni-col>
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						<!--每日签到-->
						<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="SigninDayList.length != 0 && signInSwitch">
							<view class="bonus_list_box_item list_itembg6">
								<view class="bonus_list_box_title">
									<view class="bonus_list_box_title_left">
										<view class="Daily">{{$t('DailySignIn.Title')}}<image @click="TodaySigin_Popup()" src="/static/Bonuslogin/i-2.png"></image></view>
										<view class="phphzhi" v-if="is_SignInLingqu==1">
										<text v-if="platform == 8 ||platform == 10 || platform == 11">$</text>
										<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
										<text v-else>₱</text>{{(todaySignIn.reward/100).toFixed(2)}}<!-- {{$t('DailySignIn.Prompt')}} --></view>
										<view class="phphzhi" v-else>
											<text v-if="platform == 8 ||platform == 10 || platform == 11">$</text>
											<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
											<text v-else>₱</text>0.00</view>
									</view>
									<view class="bonus_list_box_title_right">
										<image src="/static/image/qiandaoIcon.png" mode=""></image>
									</view>
								</view>
								<!-- <view class="fubiaoti" style="margin-bottom: 0;">
									<view class="fbt_type3">
										<view class="type3jindutiao">
											<view>{{$t('DailySignIn.NumberOfCheckins')}}</view>
											<view>{{is_arrisDaka.length}}/{{SigninDayList.length}}</view>
										</view>
										<view class="type3jindutiao">
											<view>{{$t('DailySignIn.DailyRecharge')}}</view>
											<view>{{(todaySignIn.todayPay/100).toFixed(2)}}/{{(todaySignIn.needPay/100).toFixed(2)}}</view>
										</view>
										<view class="type3jindutiao">
											<view>{{$t('DailySignIn.Todaybetting')}}</view>
											<view>{{(todaySignIn.todayBet/100).toFixed(2)}}/{{(todaySignIn.needBet/100).toFixed(2)}}</view>
										</view>
									</view>
								</view> -->
								<view class="fubiaoti">
									<view class="fbt_type2">
										<scroll-view class="fbt_type2_scroll_view" scroll-x="true">
										<view class="fbt_type2_box">
											<view class="gundong_box" v-for="(itemq,indexq) in SigninDayList" :key="indexq">
												<span :class="[localDate == itemq.date && itemq.status == 3?'two':'one']">{{(itemq.reward/100).toFixed(2)}}</span>
												<image src="/static/Bonuslogin/back_arrow_icon.png" v-if="indexq != SigninDayList.length-1"></image>
											</view>
										</view>
										</scroll-view>
									</view>
								</view>
								<view class="caozuanniu" v-if="isAcHuodong == 0" style="margin-top: 0;">
									<view class="zhuceBtn" v-if="Available.length != 0" @click="TodaySigin_Popup()"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else @click="TodaySigin_Popup()">{{$t('DailySignIn.CheckTheDetails')}}</view>
								</view>
								<view class="caozuanniu zhihuide" v-if="isAcHuodong == 1" style="margin-top: 0;">
									<view class="zhuceBtn" v-if="Available.length != 0"><span>{{$t('NEWBonusPageB.Claim')}}</span></view>
									<view class="anniu_type1" v-else>{{$t('DailySignIn.CheckTheDetails')}}</view>
								</view>
							</view>
						</uni-col>
						
						
						
						
						
						
						
						
						
						<!--旋转轮盘-->
						<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="SigninDayList.length != 0 && signInSwitch">
							<view class="bonus_list_box_item list_itembg7">
								<view class="bonus_list_box_title">
									<view class="bonus_list_box_title_left">
										<view class="Daily">旋转轮盘 & 赢奖<image @click="OpenZhuanPan()" src="/static/Bonuslogin/i-2.png"></image></view>
										<view class="phphzhi">旋转于每 12 小时</view>
									</view>
									<view class="bonus_list_box_title_right">
										<image src="/static/image/me/turntable.png" mode=""></image>
									</view>
								</view>
								<view class="fubiaoti">
									<view class="fbt_type2">
										<view class="spinyj"><image src="@/uni_modules/lime-dialer/static/8.png"></image>赢得高达 1 BTC</view>
									</view>
								</view>
								<view class="caozuanniu" v-if="isAcHuodong == 0" style="margin-top: 0;">
									<view class="zhuceBtn" @click="OpenZhuanPan()"><span style="color: #fff;">旋转轮盘</span></view>
								</view>
							</view>
						</uni-col>
						
						
						
						
						
						
						
					</uni-row>
				</view>
			</view>
			
			
			
			
			
			
			
			
			
			
			
			
			
			<view class="gundong_box_wrap3">
				<view class="gdbox_title3">
					<image src="/static/vipclubsNew/hero-5.png" mode="widthFix"></image>
					<view class="tsjli_box">
						<view class="tsjl_title">
							<view>{{$t('tsjl')}}</view>
							<span>{{TSactivityList.length}}</span>
						</view>
						<view class="tsjl_btn" @click="Loogklist()"><u-icon name="clock" color="#1b78fe" size="36"></u-icon></view>
					</view>
				</view>
				<view class="bottom_swpier_bpx_wrap" v-if="TSactivityList.length != 0">
					<scroll-view :scroll-x="true" class="scrollview-box-bottom">
						<view class="scroll_item_box_bottom xiangao sib_bgColor4" v-for="(itemts,indexts) in TSactivityList" :key="indexts">
							<view class="top_title_wrap">
								<view class="top_title">
									<view class="Derails" style="padding-left: 0;">
										<view class="yhhdname">
											<image src="/static/bonusCabinet/fs.png" mode="widthFix"></image>
											<view>{{itemts.title}}</view>
										</view>
										<view class="sqcj_box">
											<span>{{$t('sqcj')}}</span>
											<span>{{(itemts.amount/100).toFixed(2)}}</span>
										</view>
									</view>
								</view>
								<!-- 状态0、申请未处理 1、拒绝 2、通过未领奖 3、已领奖 -->
								<view class="lingqu_btnzu">
									<view class="anniu_type1 tsjl_nowcopacity" v-if="itemts.status == 0"><span>{{$t('NEWBonusPageA.BluePrompt')}}</span></view>
									<view class="anniu_type1 tsjl_nowcopacity" v-if="itemts.status == 1"><span>{{$t('jjsq')}}</span></view>
									<view class="anniu_type1 tsjl_nowcopacity" v-if="itemts.status == 3"><span>{{$t('VIPPage.BonusStatus2')}}</span></view>
									<view class="anniu_type2" v-if="itemts.status == 2" @click="TsLiJiLingQu(itemts)"><span>{{$t('VIPPage.BonusStatus1')}}</span></view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="ZanwuJiangli" v-else>
					<image class="image1" :src="`/static/image/${currentTheme}_me_ren.png`" mode="widthFix"></image>
					<view>暂无奖励</view>
					<image class="image2" :src="`/static/image/${currentTheme}_me_ren2.png`" mode="widthFix"></image>
				</view>
			</view>
			
			
			
			
			
			
			
			
			
			
			<view class="gundong_box_wrap3">
				<view class="gdbox_title3">
					<image src="/static/Bonuslogin/09.png" mode="widthFix"></image><text>{{$t('NEWBonusPageB.OTBonus')}}</text>
				</view>
				<view class="bottom_swpier_bpx_wrap">
					<scroll-view :scroll-x="true" class="scrollview-box-bottom">
						<view class="scroll_item_box_bottom sib_bgColor1">
							<view class="top_title_wrap">
								<view class="top_title">
									<image class="title_one_icon" src="/static/Bonuslogin/10.png" mode="widthFix"></image>
									<view class="Derails">
										<view class="title_one">{{$t('NEWBonusPageB.BBonus')}}</view>
										<view class="title_two">{{$t('NEWBonusPageB.BluePrompt')}}</view>
									</view>
								</view>
								<view class="neirong_info"><span>{{$t('NEWBonusPageB.BBonusTIP')}}</span></view>
							</view>
						</view>
						<view class="scroll_item_box_bottom sib_bgColor1">
							<view class="top_title_wrap">
								<view class="top_title">
									<image class="title_one_icon"src="/static/Bonuslogin/11.png" mode="widthFix"></image>
									<view class="Derails">
										<view class="title_one">{{$t('NEWBonusPageB.LevelBonus')}}</view>
										<view class="title_two">{{$t('NEWBonusPageB.BluePrompt')}}</view>
									</view>
								</view>
								<view class="neirong_info"><span>{{$t('NEWBonusPageB.LevelBonusTIP')}}</span></view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			
			<view style="padding: 30rpx;">
				<faqlist ref="" :istype="'BonusFAQ'"></faqlist>
			</view>
			
		</view>
		
		
		<Spin-Wheel ref="openspin"></Spin-Wheel>
		
		
		<!-- 关于我们和技术支持 -->
		<home-bottom-info ref=""></home-bottom-info>
		
		<match-media :max-width="800">
			<u-tabbar></u-tabbar>
		</match-media>
		
		<Special-RewardsLog ref="openSpecial"></Special-RewardsLog>

	</view>
</template>

<script>
	import Swiper from 'swiper'; // 注意引入的是Swiper
    import 'swiper/swiper-bundle.css'; // 注意这里的引入
	import avatarList from "@/utils/avatar.js";
	export default {
		data() {
			return {
				platform: this.PID,
				isAcHuodong: 0,
				
				swiper: null,
				
				showFirstPayJiaCheng: true,
				avatarlist: avatarList.avatarlist,
				avatar: '',
				showDepositBonus: false,
				userinfo: {},
				totalBonus: 0,
				Progress: {},
				
				firstPay: {
					cfg: [],
					countdown: 0,
					rewardRate: 0,
					status: 0,
					switchStatus: false
				},
				secondPay: {
					cfg: [],
					countdown: 0,
					rewardRate: 0,
					status: 0,
					switchStatus: false
				},
				thirdPay: {
					cfg: [],
					countdown: 0,
					rewardRate: 0,
					status: 0,
					switchStatus: false
				},
				
				
				DailyRebate: {},
				DailyRebateSwitch: true,
				
				DailyCashback: {},
				DailyCashbackSwitch: 1,
				
				WeeklyCashback: {},
				WeeklyCashbackSwitch: 1,
				
				WeeklyBonus: {},
				WeeklyBonusSwitch: true,
				
				MonthlyBonus: {},
				MonthlyBonusSwitch: true,
				
				MaxRates: 0,
				payCount: null,//首充次数
				
				SigninDayList: [],
				signInSwitch: true,
				todaySignIn: {},
				is_arrisDaka: [],
				Available: [],
				
				is_SignInLingqu: 0,//是否可领取按钮 1可以 0不可以
				ok_lingqu: {},
				localDate: '', // 今天日期
				day: new Date().getDate(), // 当前日
				year: new Date().getFullYear(), // 当前年
				month: new Date().getMonth() + 1, // 当前月
				
				TSactivityList: []
				
			}
		},
		onReady() {
			
		},
		computed: {
			currentTheme() {
				return this.$store.getters.currentTheme;
			}
		},
		onLoad(ops) {
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				
			} else {
				if(ops.openSign == 1){
					this.$nextTick(() => {
						this.$refs.openSiginShow.openShow(1);
					});
				}
			}
		},
		onShow() {
			let isToken = uni.getStorageSync("token")
			if(!isToken){
				this.$nextTick(() => {
					uni.navigateTo({
						url: '/pages/bonus-cabinet/bonus-cabinet'
					})
				})
			} else {
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
				this.getuserinfo();
				this.jizhiAcLibao()
				this.GetWelcomePackage();
				this.getZongJiangjin();
				this.getVipprogress();
				this.GetGeneralReward();
				this.GetQianDao();
				this.getTeshuJiangi();
			}
		},
		onReady(){
			
		},
		methods: {
			OpenZhuanPan() {
				this.$refs.openspin.init()
			},
			//检测用户禁止参与活动和礼包功能
			jizhiAcLibao(){
				const userInfo = uni.getStorageSync("userinfo");
				const num = userInfo.managerFlag;
				const bitPosition = 3;
				const fag = this.checkBit(num, bitPosition) ? '1' : '0'; //1禁止 0不禁止
				console.log('是否禁止参与活动',fag);//1禁止 0不禁止
				this.isAcHuodong = fag
			},
			checkBit(num, bitPosition) {
			    const mask = 1 << bitPosition;
			    return (num & mask) !== 0;
			},
			//获取签到
			GetQianDao(){
				let that = this
				that.$u.post('/signin/info', {
					
				}).then(res => {
					//console.log('签到信息-外',res.data);
					
					// 今天日期
					that.localDate = that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(that.day);
					
					if(res.data.length != 0){
						that.SigninDayList = res.data.signIn;
						that.todaySignIn = res.data.todaySignIn;
						//筛选出已打卡的
						let arrisDaka = [];
						res.data.signIn.forEach((item, index) => {
							if (item.status == 1) {
								arrisDaka.push(item);
							}
						});
						that.is_arrisDaka = arrisDaka;
						
						//找出可领取的奖励显示领取按钮
						//Available里面如果有今日的就取出来，领取
						//根据todaySignIn里面的今天日期来确定今天
						let Today = res.data.todaySignIn.today
						let yes_lingqu = {}
						res.data.Available.forEach((item, index) => {
							if (item.date == Today) {
								that.is_SignInLingqu = 1
								yes_lingqu = {
									date: item.date,
									reward: item.reward
								}
							}
						});
						that.ok_lingqu = yes_lingqu
						
						
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
			Lingqu_qiandao(){
				let that = this
				that.$u.post('/take/signin/reward', {
					date: that.ok_lingqu.date
				}).then(res => {
					that.is_SignInLingqu = 0
					//结果数据 res.data: {newBalance: 346, reward: 300, rewardType: 31}
					that.GetQianDao();
					uni.$emit('getgetMybalance', 1);
					uni.$emit('UpdataAddBcbalance', (res.data.reward/100).toFixed(2));
					
					//来刷新一个任务列表显示可领取数量
					uni.$emit('RsGetTaskList', 1);
					
				})
			},
			//获取特殊奖励列表
			getTeshuJiangi(){
				let that = this
				that.$u.post('/apply/activity/record', {
					type: 1//{"type":1} 表示只查申请中和可领取，{"type":2} 查全部记录
				}).then(res => {
					console.log('特殊奖金列表',res.data)
					that.TSactivityList = res.data
				})
			},
			//领取特殊奖励
			TsLiJiLingQu(item){
				let that = this
				that.$u.post('/take/apply/activity/bouns', {
					id: item.id
				}).then(res => {
					console.log('领取特殊奖金表',res.data)
					//领取完飘窗提示
					
					//data: {newBalance: 7564, reward: 1500, rewardType: 32, id: 16}
					uni.$emit('UpdataAddBcbalance', (res.data.reward/100).toFixed(2))
					uni.$emit('getgetMybalance', 1);
					
					that.getTeshuJiangi()
				})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			getSwiper6() {
				this.swiper = new Swiper(".swiper-container", {
					loop: false, // 无缝
					autoHeight: false, //高度随内容变化
					autoplay: false,
					paginationClickable: true,
					slidesPerView: 3, // 一组三个
					spaceBetween: 10, // 间隔
					uniqueNavElements: true,//当存在多个同名导航元素时，设置导航元素是否唯一。
					preloadImages: false, //Swiper会强制加载所有图片后才初始化。
					breakpoints: {
						320: { //当屏幕宽度大于等于320
							slidesPerView: 1.5,
							spaceBetween: 10
						},
						768: { //当屏幕宽度大于等于768 
							slidesPerView: 1.5,
							spaceBetween: 10
						},
						1280: { //当屏幕宽度大于等于1280
							slidesPerView: 3,
							spaceBetween: 10
						}
					},
					// 如果需要前进后退按钮
					// navigation: {
					// 	nextEl: '.swiper-button-next',
					// 	prevEl: '.swiper-button-prev',
					// },
					// 在大屏上写轮播图，在摁下F11或者放大窗口之后，会丢失pagination，条数会变化，加上这两行，重新渲染swiper
					// 窗口变化,重新init,针对F11全屏和放大缩小,必须加
					observer: true,
					observeParents: true,
					// 如果需要分页器
					// pagination: {
					// 	el: '.swiper-pagination',
					// 	clickable: true, // 分页器可以点击
					// },
				})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			getuserinfo() {
				let that = this
				//that.$u.post('/user/get/info', {
					
				//}).then(res => {
					that.userinfo = uni.getStorageSync("userinfo")
					let headId = that.userinfo.headId
					let tx = ''
					that.avatarlist.forEach((item, index) => {
						if (item.id == headId) {
							tx = item.img
						}
					});
					that.avatar = tx
				//})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			//首充倒计时结束监听
			firstPayExtraCountdownend(e){
				//如果加成倒计时结束后 隐藏掉加成模块 显示原有模块
				this.showFirstPayJiaCheng = false
				setTimeout(()=>{
					this.GetWelcomePackage()
				},200)
			},
			//获取总奖金
			getZongJiangjin(){
				let that = this
				that.$u.post('/total/bonus', {
					
				}).then(res => {
					that.totalBonus = res.data.totalBonus
				})
			},
			//获取VIP进度和等级
			getVipprogress() {
				let that = this
				that.$u.post('/vip/progress', {
					vipLevel: this.userinfo.vip
				}).then(res => {
					that.Progress = res.data.progress
				})
			},
			//获取Welcome Package
			GetWelcomePackage(){
				let that = this
				that.$u.post('/welcome/packet', {
					
				}).then(res => {
					//console.log('Welcome Package',res.data)
					that.firstPay = res.data.firstPay
					that.secondPay = res.data.secondPay
					that.thirdPay = res.data.thirdPay
					
					//这是首充次数
					//充值次数=0，首充板块可点击充值，二充三充置灰
					//充值次数=1，首充板块按钮置灰不可点击，二充可点击，三充置灰
					//充值次数=2，首充二充按钮置灰，三充可点击
					//充值次数＞2，隐藏所有欢迎礼包板块
					that.payCount = res.data.payCount
					
					//选出首充最大的加成
					let CfgfirstPay = res.data.firstPay.cfg
					
					// 筛选首充最大加成值
					let max1 = res.data.firstPay.extraRate || 0;
					
					let MaxRate = res.data.firstPay.rewardRate + max1
					
					that.MaxRates = MaxRate
					//console.log('MaxRate',MaxRate)
					
					//console.log('最大加成',max1)
					
					//首充提示
					let is_newuser = uni.getStorageSync("is_newUser")
					setTimeout(()=>{
						if (is_newuser == 1 && res.data.firstPay.extraCountdown > 0 && res.data.payCount == 0 && (res.data.firstPay.switchStatus || res.data.secondPay.switchStatus || res.data.thirdPay.switchStatus)) {
							that.showDepositBonus = true
							that.$refs.Openshows.GetWelcomePackage()
						} else {
							//console.log('加成引导不显示')
							that.showDepositBonus = false
						}
					},1500)
					
					that.getSwiper6()
				})
			},
			//获取通用奖励信息 General Reward
			GetGeneralReward(){
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
			BonusProgress(data){
				let needPay = data.needPay/100
				let nowPay = data.nowPay/100
				
				let all_count = needPay - nowPay
				if (needPay == nowPay) {
					return 100
				} else {
					return parseInt(((needPay - all_count) / needPay) * 100)
				}
			},
			Lingqu(type){
				let that = this
				if(type == "DailyRebate"){ //每日返水
					that.StartLing(3)
					
					
				} else if(type == "DailyCashback"){ //每日亏损返水
					that.StartLing(29)
					
					
				} else if(type == "WeeklyCashback"){ //每周亏损返还
					that.StartLing(30)
					
					
				} else if(type == "WeeklyBonus"){ //每周奖金
					that.StartLing(13)
					
					
				} else if(type == "MonthlyBonus"){ //每月奖金
					that.StartLing(14)
				}
			},
			StartLing(type){
				let that = this
				that.$u.post('/vip/reward/take', {
					rewardType: type, // Number 是 领取类型： 3 返水 11 升级礼金 12 生日礼金 13 周礼金 14 月礼金
					vipLevel: that.Progress.vip
				}).then(res => {
					that.$nextTick(() => {
						
						//领取之后更新所有接口
						that.GetWelcomePackage()
						that.getZongJiangjin()
						that.getVipprogress()
						that.GetGeneralReward()
						
						uni.$emit('getgetMybalance', 1);
						
						
						//来刷新一个任务列表显示可领取数量
						uni.$emit('RsGetTaskList', 1);
						
						
						if(type == 3){
							uni.$emit('UpdataAddBcbalance', (that.DailyRebate.reward/100).toFixed(2))
						} else if(type == 29){
							uni.$emit('UpdataAddBcbalance', (that.DailyCashback.reward/100).toFixed(2))
						} else if(type == 30){
							uni.$emit('UpdataAddBcbalance', (that.WeeklyCashback.reward/100).toFixed(2))
						} else if(type == 13){
							uni.$emit('UpdataAddBcbalance', (that.WeeklyBonus.reward/100).toFixed(2))
						} else if(type == 14){
							uni.$emit('UpdataAddBcbalance', (that.MonthlyBonus.reward/100).toFixed(2))
						}
						
					})
				})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			openLeve(){
				this.$refs.AllLevelopenPopup.openPopup()
			},
			openHistory(){
				this.$refs.HistoryopenPopup.openPopup()
			},
			DailyRebate_Popup(data){
				this.$refs.DailyRebatePopup.openPopup(data)
			},
			DailyCashback_Popup(data){
				this.$refs.DailyCashbackPopup.openPopup(data)
			},
			WeeklyCashback_Popup(data){
				this.$refs.WeeklyCashbackPopup.openPopup(data)
			},
			WeeklyBonus_Popup(){
				this.$refs.WeeklyBonusPopup.openPopup(this.WeeklyBonus)
			},
			MonthlyBonus_Popup(){
				this.$refs.MonthlyBonusPopup.openPopup(this.MonthlyBonus)
			},
			TodaySigin_Popup(){
				this.$refs.openSiginShow.openShow(1)
			},
			DepositBonus_Popup(data){
				this.$refs.DepositBonusPopup.openPopup(data)
			},
			dakitikPopup(){
				this.$refs.openPCdeposit.openPopup()
			},
			DepositBonusClose(){
				this.showDepositBonus = false
			},
			ToDeposit(){
				let windowWidth = uni.getSystemInfoSync().windowWidth
				if(windowWidth >= "800"){
					this.$refs.openPCdeposit.openPopup()
				} else {
					uni.switchTab({
						url: '/pages/Wallet/Wallet'
					})
				}
			},
			Loogklist(){
				this.$refs.openSpecial.init()
				// uni.navigateTo({
				// 	url: '/pages/ApplicationActivitiesList/ApplicationActivitiesList'
				// })
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $body-bg-color;
	}
	
	.dingbuJianBian {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background-image: $bonus-Logoin-page-top_box_wrap;
		height: 164px;
		width: 100%;
		right: 0;
		margin: 0 auto;
	}
	
	.liangBian {
		margin-inline: auto;
		margin: 0 auto;
		max-width: 1088px;
		width: 100%;
		background-color: $body-bg-color;
		position: relative;
	}
	
	.banshi {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding: 0 0;
			
		.swiper-wrapper {
			margin-top: 20px;
		}
	
		.swiper-slide {
			position: relative;
			width: 100%;
			height: auto;
			padding: 0 0;
			background-repeat: no-repeat;
			background-size: contain;
			background-color: transparent;
			border-radius: 28rpx;
		}
	}
	
	/deep/ .u-countdown-colon {
		padding: 0 !important;
		position: relative;
		top: -6rpx;
	}
	
	.scroll_item_box_opacity {
		opacity: .3;
	}
	
	.tsjl_nowcopacity {
		opacity: .5
	}
	
	.lvseText {
		color: #0bd81e !important;
	}
	
	.gundong_box_wrap3 {
		padding: 65rpx 30rpx 0 30rpx;
		.gdbox_title3 {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: $all-secondary-text-color;
			font-size: 34rpx;
			font-weight: bold !important;
			image {
				width: 45rpx;
				margin-right: 10rpx;
				height: 45rpx;
			}
			.tsjli_box {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.tsjl_title {
					display: flex;
					align-items: center;
					color: $all-secondary-text-color;
					span {
						margin-left: 10rpx;
						background-color: $qiehuan-box-bg;
						border-radius: 12rpx;
						height: 30px;
						width: 30px;
						line-height: 30px;
						text-align: center;
						color: #1b78fe;
					}
				}
				.tsjl_btn {
					margin-left: auto;
					display: flex;
					align-items: center;
					font-size: 30rpx;
					font-weight: initial !important;
					color: #1b78fe;
					background-color: $qiehuan-box-bg;
					border-radius: 12rpx;
					height: 30px;
					width: 30px;
					line-height: 30px;
					text-align: center;
					justify-content: center;
					.u-icon {
						font-size: 30rpx;
					}
				}
			}
		}
		.ZanwuJiangli {
			background-color: $all-secondary-color;
			border-radius: 20rpx;
			position: relative;
			height: 200rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 15px;
			overflow: hidden;
			view {
				color: #5c677b;
				text-align: center;
			}
			.image1 {
				width: 150rpx;
				position: absolute;
				bottom: 0;
				left: 0
			}
			.image2 {
				width: 150rpx;
				position: absolute;
				bottom: 0;
				right: 0
			}
		}
		.bottom_swpier_bpx_wrap {
			margin-top: 30rpx;
			.scrollview-box-bottom {
				white-space: nowrap;
				/* 滚动必须加的属性 */
				width: 100%;
				padding: 0 0 0 0;
			}
			.xiangao {
				height: 148px !important; 
			}
			.scroll_item_box_bottom {
				width: 470rpx;
				height: 240rpx;
				margin: 0 20rpx 0 0;
				display: inline-block;
				/* item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可 */
				
				padding: 12px;
				border-radius: 20rpx;
				
				.top_title_wrap {
					width: 100%;
					//height: 240rpx;
					.top_title {
						display: flex;
						align-items: flex-start;
						justify-content: flex-start;
						color: #fff;
						font-size: 28rpx;
						letter-spacing: -.02em;
						line-height: 20px;
						margin-bottom: 0;
						margin-top: 0;
					
						.title_one_icon {
							width: 65rpx;
							margin-right: 10rpx;
						}
						.Derails {
							flex: 1;
							padding-left: 10rpx;
							.title_one{
								text-transform: uppercase;
								font-weight: bold;
								color: $bonus-Logoin-page-DailyColor;
							}
							.title_two{
								color: #0176b6;
								font-size: 26rpx;
							}
							.yhhdname {
								display: flex;
								align-items: center;
								text-transform: uppercase;
								font-weight: bold;
								font-size: 28rpx;
								image {
									width: 75rpx;
									margin-right: 10rpx;
								}
								view {
									word-break:break-all;
									display:-webkit-box;
									-webkit-line-clamp:1;
									-webkit-box-orient:vertical;
									overflow:hidden;
									color: $bonus-Logoin-page-DailyColor;
								}
							}
							.sqcj_box {
								margin-top: 30rpx;
								display: flex;
								align-items: center;
								justify-content: space-between;
								font-size: 28rpx;
								span:nth-child(1){
									color: #aebac8;
								}
								span:nth-child(2){
									color: #0bd81e;
								}
							}
						}
					}
					.lingqu_btnzu {
						margin: 20rpx 0 10rpx 0;
						// .anniu_type1 {
						// 	height: 66rpx !important;
						// 	line-height: 66rpx !important;
						// }
						// .anniu_type2 {
						// 	height: 66rpx !important;
						// 	line-height: 66rpx !important;
						// }
						.zhuceBtn {
							font-weight: bold;
							span {
								height: 66rpx !important;
								line-height: 66rpx !important;
								border-radius: 8px;
							}
						}
									
						.zhuceBtn:after {
							height: 66rpx !important;
							line-height: 66rpx !important;
							border-radius: 8px;
						}
					}
					.neirong_info {
						align-items: flex-start;
						display: flex;
						flex-direction: column;
						white-space: normal;
						span {
							color: #93acd3;
							font-size: 12px;
							margin-top: 8px;
						}
						
					}
				}
				
			}
		
			.scroll_item_box_bottom:first-child {
				//margin-left: 20rpx;
			}
		
			.scroll_item_box_bottom:last-child {
				margin-right: 0;
			}
		
			.sib_bgColor1 {
				background-image: $sib_bgColor4-bgone;
			}
		
			.sib_bgColor2 {
				background: $sib_bgColor4-bgtwo;
			}
		
			.sib_bgColor3 {
				background: $sib_bgColor4-bgthree;
			}
		
			.sib_bgColor4 {
				background: $sib_bgColor4-bgfour;
			}
		}
	}
	
	.zhihuide {
		opacity: .5;
	}
	
	.gundong_box_wrap2 {
		padding: 30rpx 30rpx 0 30rpx;
		.gdbox_title2 {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: $all-secondary-text-color;
			font-size: 34rpx;
			font-weight: bold;
			image {
				width: 45rpx;
				margin-right: 10rpx;
				height: 45rpx;
			}
		}
		.bonus_list_box {
			.list_itembg1 {
				background: $bonus-Logoin-page-boxone-bg;
			}
			.list_itembg2 {
				background: $bonus-Logoin-page-boxtwo-bg;
			}
			.list_itembg3 {
				background: $bonus-Logoin-page-boxthree-bg;
			}
			.list_itembg4 {
				background: $bonus-Logoin-page-boxfour-bg;
			}
			.list_itembg5 {
				background: $bonus-Logoin-page-boxfive-bg;
			}
			.list_itembg6 {
				background: $bonus-Logoin-page-boxsix-bg;
			}
			.list_itembg7 {
				background: $bonus-Logoin-page-boxseven-bg;
			}
			
			.bonus_list_box_item {
				margin: 30rpx 0 0 0;
				padding: 30rpx;
				border-radius: 20rpx;
				height: 172px;
				border: 1px solid $bonus-list-box-item-border;
				
				.caozuanniu {
					//margin-top: 20rpx;
					cursor: pointer;
					
					.zhuceBtn {
						font-weight: bold;
						span {
							height: 76rpx !important;
							line-height: 76rpx !important;
							border-radius: 8px;
						}
					}
								
					.zhuceBtn:after {
						height: 76rpx !important;
						line-height: 76rpx !important;
						border-radius: 8px;
					}
				}
				.fubiaoti {
					margin: 0rpx 0 4px 0;
					background: $bonus-Logoin-page-fubiaoti;
					padding: 12rpx 0;
					height: 100rpx;
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
						margin-top: 8px;
						
						.spinyj {
							display: flex;
							align-items: center;
							color: $all-secondary-text-color;
							image {
								width: 40rpx;
								height: 40rpx;
								margin-right: 10rpx;
							}
						}
						
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
							color: $bonus-Logoin-page-one;
							opacity: .4;
						}
						image {
							width: 20rpx;
							height: 20rpx;
							margin: 0 6rpx;
						}
						.two {
							color: $bonus-Logoin-page-two;
							font-size: 34rpx;
						}
					}
					.fbt_type3 {
						width: 80%;
						.type3jindutiao {
							display: flex;
							align-items: center;
							justify-content: space-between;
							color: $type3jindutiao;
							font-size: 24rpx;
							margin: 10rpx 0;
						}
						.type3jindu {
							line-height: 12rpx;
						}
					}
				}
				.bonus_list_box_title {
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					.bonus_list_box_title_left {
						.Daily {
							margin-bottom: 10rpx;
							color: $bonus-Logoin-page-DailyColor;
							display: flex;
							align-items: center;
							font-size: 34rpx;
							font-weight: bold;
							image {
								width: 30rpx;
								height: 30rpx;
								margin-left: 10rpx;
								cursor: pointer;
							}
						}
						.phphzhi {
							color: #6b778b;
						}
						.lvse {
							color: #0bd81e !important;
						}
					}
					.bonus_list_box_title_right {
						image {
							width: 48px;
							height: 48px;
						}
					}
				}
			}
		}
	}
	.gundong_box_wrap {
		padding: 30rpx 30rpx 0 30rpx;
		.gdbox_title {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: $all-secondary-text-color;
			font-size: 34rpx;
			font-weight: bold !important;
			image {
				width: 45rpx;
				margin-right: 10rpx;
				height: 45rpx;
			}
		}
		.gundong_swpier {
			.scrollview-box {
				position: relative;
				white-space: nowrap;
				/* 滚动必须加的属性 */
				width: 100%;
				padding: 30rpx 0 30rpx 0;
			}
			
			
			
			.scroll_item_box {
				
				
				/* #ifndef APP-PLUS */
				width: 100%;
				//margin: 0 0 0 0;
				/*#endif */
				
				/* #ifdef APP-PLUS */
				margin: 0 20rpx 0 0;
				width: 400rpx;
				display: inline-flex;
				// /* item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可 */
				flex-direction: column;
				/* #endif */
				
				.scroll_item_box_item {
					width: 100%;
					height: 310rpx;
					/* #ifndef APP-PLUS */
					margin: 0 0 0 0;
					/*#endif */
					
					/* #ifdef APP-PLUS */
					margin: 0 0 30rpx 0;
					/* #endif */
					background: $bonuspack-item-bg-colorTwo;
					padding: 12px;
					border-radius: 20rpx;
					position: relative;
					border: 1px solid $bonuspack-item-border;
				}
				
				.gantanhao {
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			
				.item_1 {
					text-align: center;
					color: $bonuspack-item-titleOne;
					font-size: 11px;
					font-weight: 700;
					letter-spacing: .06em;
					line-height: 16px;
					margin-bottom: 4px;
					text-transform: uppercase;
				}
				
				.item_Jiacheng {
					width: 100%;
					text-align: center;
					.item_jc1 {
						color: $all-secondary-text-color;
						font-size: 30rpx;
						span {
							text-decoration: line-through #f00;
							margin-right: 6rpx;
							color: #a7b5ca;
						}
					}
					.item_jc2 {
						margin: 12px 0 12px 0;
						background-image: linear-gradient(to right, #3673d9, #0f50bd) !important;
						border-radius: 16rpx;
						padding: 10rpx 20rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 1px solid #ffffff14;
						.item_jc2_2 {
							display: flex;
							align-items: center;
							justify-content: center;
							color: #fff;
							image {
								width: 40rpx;
								height: 40rpx;
							}
						}
						.item_jc2_3 {
							border-left: 1px solid #ffffff38;
							padding-left: 10rpx;
							margin-left: 15rpx;
						}
					}
				}
			
				.item_2 {
					width: 100%;
					align-items: center;
					border-radius: 8px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					//margin-bottom: 8px;
					padding-bottom: 8px;
					position: relative;
			
					.item_2_1 {
						color: $bonuspack-item-titleTwo;
						font-size: 32px;
						font-weight: 700;
						letter-spacing: -.02em;
						line-height: 40px;
						margin-bottom: 0;
						margin-top: 0;
					}
			
					.item_2_2 {
						color: $bonuspack-item-titleThree;
						font-size: 14px;
						letter-spacing: -.02em;
						line-height: 18px;
						margin-bottom: 0;
					}
				}
			
				.item_2:before {
					background: $bonuspack-item-line;
					bottom: 0;
					content: "";
					height: 1px;
					left: 0;
					position: absolute;
					right: 0;
				}
			
				.item_3 {
					display: flex;
					align-items: center;
					justify-content: center;
			
					image {
						width: 40rpx;
						height: 40rpx;
					}
			
					span {
						font-weight: bold;
						color: $all-secondary-text-color;
						margin: 0 10rpx;
					}
			
					view {
						font-size: 24rpx;
						color: $all-secondary-text-color;
					}
				}
			
				.item_4 {
					width: 100%;
					margin: 20rpx auto 0;
					display: flex;
					align-items: center;
					justify-content: center;
					.djs_lst{
						position: relative;
						top: 2rpx;
						border: 1px solid $bonuspack-item-countdownBorder;
						background-color: $bonuspack-item-countdownBg;
						border-radius: 14rpx;
						padding: 16rpx 6rpx;
						margin-right: 12rpx;
						flex: 1;
						text-align: center;
					}
			
					.zhuceBtn {
						flex: 1;
						font-weight: bold;
						span {
							height: 66rpx !important;
							line-height: 66rpx !important;
							border-radius: 8px;
						}
					}
			
					.zhuceBtn:after {
						height: 66rpx !important;
						line-height: 66rpx !important;
						border-radius: 8px;
					}
				}
			}
			
			.scroll_item_box_item:first-child {
				margin-left: 0;
			}
			
			.scroll_item_box_item:last-child {
				margin-right: 0rpx;
			}
		}
	}
	.top_box_wrap {
		padding: 60rpx 30rpx 0rpx 30rpx;
		position: relative;
		
		.top_bg {
			width: 55%;
			margin: 0 auto;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
		}
		.user-avatar_item {
			position: relative;
			text-align: center;
			
			
			
			.line1 {
				width: 90%;
				margin: 11px auto;
				background: linear-gradient(90deg, #ffffff0d -3%, #ffffff26 48.66%, #ffffff0d 103.12%);
				height: 1px;
			}
			.myhejibox {
				width: 90%;
				margin: 30rpx auto;
				display: flex;
				align-items: center;
				.myhejibox_left {
					image {width: 100rpx;}
				}
				.myhejibox_right {
					text-align: left;
					padding-left: 20rpx;
					flex: 1;
					.hejijine {
						color: $font-all-color;
						margin-bottom: 10rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 26rpx;
						view:nth-child(2){
							color: #3673d9;
						}
					}
					.myjinedu {
						color: #ffc000;
						font-weight: bold;
						font-size: 36rpx;
						display: flex;
						align-items: center;
					}
				}
			}
			.Wagerfor {
				width: 80%;
				margin: 20rpx auto 60rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $font-all-color;
				font-size: 26rpx;
				.nrinfo {
					span {color: $pupUp-title-color;margin-left: 10rpx;}
				}
				.tanhao {
					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
			.jindutiao {
				width: 80%;
				margin: 10rpx auto;
			}
			.Welcome_Bonuses {
				color: $pupUp-title-color;
				font-weight: bold;
				span {
					color: $pupUp-title-color;
					margin-right: 10rpx;
				}
			}
			.user-avatar {
				width: 150rpx;
				height: 150rpx;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 auto 20px;
				.ava_bg {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 150rpx;
					height: 150rpx;
					border-radius: 200rpx;
					z-index: 1;
				}
				.ava_tx {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 2;
					width: 120rpx;
					height: 120rpx;
					border-radius: 200rpx;
				}
				.leve_box {
					position: absolute;
					bottom: -25%;
					left: 0%;
					right: 0;
					margin: 0 auto;
					//transform: translate(-50%, -50%);
					z-index: 3;
					width: 60rpx;
					height: 60rpx;
					image {
						width: 60rpx;
					}
					text {
						text-align: center;
						position: absolute;
						bottom: 40%;
						font-size: 24rpx;
						left: 0%;
						right: 0;
						//transform: translate(-50%, -50%);
						color: #224c99;
					}
				}
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.anniu_type2 {
		background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
		box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
		text-align: center;
		padding: 0 0;
		height: 80rpx;
		line-height: 80rpx;
		border: 1px solid transparent;
		color: #ffffff;
		border-radius: 20rpx;
		font-weight: bold;
		span {
			margin-right: 10rpx;
		}
	}
	
	
	
	.anniu_type1 {
		opacity: .5;
		background-color: $anniu-type-bgcolor;
		text-align: center;
		padding: 0 0;
		height: 80rpx;
		line-height: 80rpx;
		border: 1px solid $anniu-type-bordercolor;
		color: $anniu-type-textcolor;
		border-radius: 20rpx;
		font-weight: bold;
		word-break:break-all;
		display:-webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient:vertical;
		overflow:hidden;
		
		span {
			margin-right: 10rpx;
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
			height: 94rpx;
			line-height: 94rpx;
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
		height: 94rpx;
		background-color: #61001d;
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: -3px;
		margin: 0 auto;
		z-index: 1;
	}
	
	.BlueBtn {
		position: relative;
		color: #ffffff;
	
		span {
			display: inline-block;
			background: linear-gradient(1turn,#0c5eff .8%,#1398f9);
			box-shadow: 0 3px 28px #2283f666,inset 0 3px 3px #ffffff4d;
			border-radius: 12px;
			height: 94rpx;
			line-height: 94rpx;
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
	
	.BlueBtn:after {
		border-radius: 12px;
		height: 94rpx;
		background-color: #003293;
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: -3px;
		margin: 0 auto;
		z-index: 1;
	}
	
	@media (min-width: 800px) {
		.page_boxs{
			height: auto !important;
		}
		.page_wrap {
			padding-left: 24px;
			padding-right: 24px;
		}
		.gundong_box_wrap .gundong_swpier .scroll_item_box .item_Jiacheng .item_jc2 {
			margin: 20px 0 24px;
		}
		.gundong_box_wrap .gundong_swpier .scroll_item_box {
			//width: 33.333333%;
		}
		.top_box_wrap .user-avatar_item {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 60rpx 0 110rpx 0;
		}
		.my_info_wrap {
			display: flex;
			align-items: center;
			flex: 1;
			.jdtandejl {
				flex: 1;
				text-align: left;
				padding-left: 20px;
			}
		}
		.top_box_wrap .user-avatar_item .user-avatar {
			margin: initial;
		}
		.top_box_wrap .user-avatar_item .jindutiao {
			margin: 20rpx 0;
		}
		.top_box_wrap .user-avatar_item .Wagerfor {
			margin: initial;
		}
		.top_box_wrap .user-avatar_item .myhejibox {
			width: 100%;
			flex: 1;
			backdrop-filter: blur(8px);
			background: rgba(255, 255, 255, 0.04);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 16px;
			padding: 22px;
		}
		.top_left_bg {
			background: radial-gradient(49.94% 83.93% at 31.49% 6.43%, rgb(0, 174, 255) 0%, rgb(0, 107, 207) 23.81%, rgb(5, 70, 146) 49.35%, rgb(3, 32, 68) 80.52%, rgb(13, 19, 28) 100%), linear-gradient(rgb(0, 74, 162) 0%, rgb(13, 19, 28) 100%);
			height: 140px;
			left: 0px;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 1;
		}
		.liangBian {
			position: relative;
			z-index: 2;
			padding: 0 0;
			background-color: transparent;
		}
		.top_box_wrap {
			background-image: none;
		}
		.qiliuba_hylb {
			width: 400px !important;
			left: initial !important;
			bottom: 0 !important;
		}
		.gundong_box_wrap .gundong_swpier .scroll_item_box .scroll_item_box_item {
			//width: 98%;
			height: 180px;
			margin:  0;
		}
		.gundong_box_wrap .gundong_swpier .scroll_item_box .scroll_item_box_item .item_2 {
			margin-bottom: 60rpx;
		}
		
		.gundong_box_wrap .gundong_swpier .scroll_item_box .scroll_item_box_item:first-child {
			margin-left: 0;
		}
		.gundong_box_wrap .gundong_swpier .scroll_item_box .item_2:before {
			bottom: -12px;
		}
		.gundong_box_wrap .gundong_swpier .scroll_item_box .item_4 .djs_lst {
			text-align: center;
			flex: 1;
		}
	}
	
</style>