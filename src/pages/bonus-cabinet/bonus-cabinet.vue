<template>
	<view :style="theme" class="page_boxs">

		<!--引导注册弹窗-->
		<!-- <uni-transition :mode-class="['fade', 'slide-top']"
			:styles="{'max-width':'430px','height':'auto','position':'fixed','top':Topheight,'left':'0','z-index':'9999','right':'0','margin':'0 auto'}"
			:show="showRegisterNow">
			<Welcome-Register-Now ref="RegisterNowRefs" @RegisterNowClose="RegisterNowClose"
				@RegisterNowOpen="registerNowOpen"></Welcome-Register-Now>
		</uni-transition> -->


		<match-media :max-width="800">
			<navbar ref="child" :title="$t('ReferPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		<view class="container page_wrap">

			<match-media :min-width="800">
				<view class="top_pc">
					<view class="top_info_pc">
						<view class="pc_infoos">
							<h1>{{$t('NEWBonusPageA.title1')}}<br>{{$t('NEWBonusPageA.BonusSYS')}}</h1>
							<p>{{$t('NEWBonusPageA.TIP1')}}</p>
							<view class="sign_Btn">
								<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
									<span>{{$t('NEWBonusPageA.regBtn')}}</span>
								</view>
							</view>
						</view>
						<image src="../../static/bonusCabinet/gift-mobile.png" mode="widthFix"></image>
					</view>
				</view>
			</match-media>

			<match-media :max-width="800">
				<view class="top">
					<view class="top_info">
						<view>
							<h1>{{$t('NEWBonusPageA.title1')}}<br>{{$t('NEWBonusPageA.BonusSYS')}}</h1>
							<p>{{$t('NEWBonusPageA.TIP1')}}</p>
						</view>
						<image src="../../static/bonusCabinet/gift-mobile.png" mode="widthFix"></image>
						<view class="sign_Btn">
							<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
								<span>{{$t('NEWBonusPageA.regBtn')}}</span>
							</view>
						</view>
					</view>
				</view>
			</match-media>




			<view class="nbc">



				<match-media :min-width="800">
					<view class="block_pc">
						<view class="block_image-block_pc">
							<image class="block_image_pc" src="../../static/bonusCabinet/100fs_low.BViUSnZc.png"
								mode="widthFix"></image>
							<view class="block_gradients_pc">
								<view class="block_image-blur-1_pc"></view>
								<view class="block__image-blur-2_pc"></view>
								<view class="block_mage-blur-3_pc"></view>
							</view>
						</view>
						<view class="block_content-block_pc">
							<h2 class="block_title_pc">{{$t('NEWBonusPageA.RegBonus')}}</h2>
							<p class="block_desc_pc">{{$t('NEWBonusPageA.TIP2')}}</p>
							<view class="Sign_upbtn_pc" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
								{{$t('NEWBonusPageA.regB')}}
							</view>
						</view>
					</view>
				</match-media>







				<match-media :max-width="800">
					<view class="block">
						<view class="block_content-block">
							<h2 class="block_title">{{$t('NEWBonusPageA.RegBonus')}}</h2>
							<p class="block_desc">{{$t('NEWBonusPageA.TIP2')}}</p>
							<view class="Sign_upbtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
								{{$t('NEWBonusPageA.regB')}}
							</view>
						</view>
						<view class="block_image-block">
							<image class="block_image" src="../../static/bonusCabinet/100fs_low.BViUSnZc.png"
								mode="widthFix"></image>
							<view class="block_gradients">
								<view class="block_image-blur-1"></view>
								<view class="block__image-blur-2"></view>
								<view class="block_mage-blur-3"></view>
							</view>
						</view>
					</view>
				</match-media>



				
				<!--登录的礼包显示-->
				<view v-if="isLogin == 1">
					<view class="welcome-banner">
						<view class="welcome-banner_info">
							<p class="welcome-banner__info-title">
								<span class="welcome-banner__info-title--red">{{$t('NEWBonusPageA.GetBonus')}}</span>{{MaxRates||0}}%
							</p>
						</view>
						<view class="welcome-banner-scroll">
							<view v-if="firstPay.switchStatus && secondPay.switchStatus && thirdPay.switchStatus">
								<view class="gundong_box_wrap" v-if="payCount < 3 && (firstPay.countdown > 0 || secondPay.countdown > 0 || thirdPay.countdown > 0)">
									<view class="gundong_swpier">
										<scroll-view :scroll-x="true" class="scrollview-box">
											<!--首充-->
											<view class="scroll_item_box">
												<view class="gantanhao">
													<image @click="DepositBonus_Popup(firstPay)" src="/static/Bonuslogin/i.png"></image>
												</view>
												<view class="item_1">{{$t('NEWBonusPageB.1STDeposit')}}</view>
												<view class="item_Jiacheng" v-if="firstPay.extraCountdown > 0 && payCount == 0">
													<view class="item_jc1">
														<span>{{firstPay.rewardRate}}%</span>{{$t('NEWBonusPageB.BONUS')}}
													</view>
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
													<view class="djs_lst" v-if="firstPay.countdown>0 && payCount == 0">
														<u-count-down :timestamp="firstPay.countdown" bg-color="" color="#a7c0df" separator-color="#a7c0df" font-size="24"></u-count-down>
													</view>
													<!--可参与(高亮按钮)-->
													<view class="zhuceBtn" v-if="firstPay.status==0 && firstPay.countdown>0 && payCount == 0" @click="ToDeposit()">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
													<!--不可参与(置灰按钮)-->
													<view class="zhuceBtn scroll_item_box_opacity" v-else-if="firstPay.status==0 && firstPay.countdown==0 && payCount == 0">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
													<!--参与未达标(置灰按钮)-->
													<view class="zhuceBtn scroll_item_box_opacity" v-else-if="firstPay.status==0 && payCount >= 1">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
													<!--参与已达标(置灰按钮)-->
													<view class="zhuceBtn scroll_item_box_opacity" v-else-if="firstPay.status==2 && payCount >= 1">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
													<view class="zhuceBtn scroll_item_box_opacity" v-else>
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
												</view>
											</view>
				
											<!--二充-->
											<view class="scroll_item_box">
												<view class="gantanhao">
													<image @click="DepositBonus_Popup(secondPay)" src="/static/Bonuslogin/i.png"></image>
												</view>
												<view class="item_1">{{$t('NEWBonusPageB.2ndDeposit')}}</view>
												<view class="item_2">
													<view class="item_2_1">{{secondPay.rewardRate}}%</view>
													<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
												</view>
												<!--可参与(高亮按钮显示倒计时)-->
												<view class="item_4" v-if="secondPay.status==0 && secondPay.countdown>0 && payCount <= 1">
													<view class="djs_lst" v-if="secondPay.countdown > 0"><u-count-down :timestamp="secondPay.countdown" bg-color="" color="#a7c0df" separator-color="#a7c0df" font-size="24"></u-count-down>
													</view>
													<view class="zhuceBtn" @click="ToDeposit()">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
												</view>
												<!--不可参与(置灰按钮隐藏倒计时)-->
												<view class="item_4" v-else-if="secondPay.status==0 && secondPay.countdown==0 && payCount <= 1">
													<view class="zhuceBtn scroll_item_box_opacity">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
												</view>
												<!--参与未达标(置灰按钮隐藏倒计时)-->
												<view class="item_4" v-else-if="secondPay.status==0 && payCount >= 2">
													<view class="zhuceBtn scroll_item_box_opacity">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
												</view>
												<!--参与已达标(置灰按钮隐藏倒计时)-->
												<view class="item_4" v-else-if="secondPay.status==2 && payCount >= 2">
													<view class="zhuceBtn scroll_item_box_opacity">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
												</view>
												<view class="item_4" v-else>
													<view class="zhuceBtn scroll_item_box_opacity">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
												</view>
											</view>
				
											<!--三充-->
											<view class="scroll_item_box">
												<view class="gantanhao">
													<image @click="DepositBonus_Popup(thirdPay)" src="/static/Bonuslogin/i.png"></image>
												</view>
												<view class="item_1">{{$t('NEWBonusPageB.3rdDeposit')}}</view>
												<view class="item_2">
													<view class="item_2_1">{{thirdPay.rewardRate}}%</view>
													<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
												</view>
												<view class="item_4">
													<view class="djs_lst" v-if="thirdPay.countdown > 0"><u-count-down :timestamp="thirdPay.countdown" bg-color="" color="#a7c0df" separator-color="#a7c0df" font-size="24"></u-count-down>
													</view>
													<!--可参与(高亮按钮)-->
													<view class="zhuceBtn" v-if="thirdPay.status==0 && thirdPay.countdown>0 && payCount <= 2" @click="ToDeposit()">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
													<!--不可参与(置灰按钮)-->
													<view class="zhuceBtn scroll_item_box_opacity" v-else-if="thirdPay.status==0 && thirdPay.countdown==0 && payCount <= 2">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
													<!--参与未达标(置灰按钮)-->
													<view class="zhuceBtn scroll_item_box_opacity" v-else-if="thirdPay.status==0 && payCount > 2">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
													<!--参与已达标(置灰按钮)-->
													<view class="zhuceBtn scroll_item_box_opacity" v-else-if="thirdPay.status==2 && payCount > 2">
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
													<view class="zhuceBtn scroll_item_box_opacity" v-else>
														<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
													</view>
												</view>
											</view>
										</scroll-view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				
				
				
				<!--未登录的礼包显示-->
				<view v-else>
					<view v-if="firstPay.switchStatus && secondPay.switchStatus && thirdPay.switchStatus"></view>
					<view class="banshi">
						<view class="swiper-container welcome-banner">
							<view class="welcome-banner_info">
								<p class="welcome-banner__info-title"><span class="welcome-banner__info-title--red">{{$t('NEWBonusPageA.GetBonus')}}</span>
									{{MaxRates||0}}%
								</p>
							</view>
							
							
							
							
							
							
							
							<!-- #ifdef H5 || WEB -->
							<view class="swiper-wrapper welcome-banner-scroll">
								<view class="swiper-slide">
									<view class="scroll_item_box">
										<view class="gantanhao">
											<image @click="DepositBonus_Popup(firstPay)" src="/static/Bonuslogin/i.png"></image>
										</view>
										<view class="item_1">{{$t('NEWBonusPageA.1STDeposit')}}</view>
										<view class="item_2">
											<view class="item_2_1">{{firstPay.rewardRate}}%</view>
											<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
										</view>
										<view class="item_4">
											<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
												<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
											</view>
										</view>
									</view>
								</view>
								<view class="swiper-slide">
									<view class="scroll_item_box">
										<view class="gantanhao">
											<image @click="DepositBonus_Popup(secondPay)" src="/static/Bonuslogin/i.png"></image>
										</view>
										<view class="item_1">{{$t('NEWBonusPageA.2ndDeposit')}}</view>
										<view class="item_2">
											<view class="item_2_1">{{secondPay.rewardRate}}%</view>
											<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
										</view>
										<view class="item_4">
											<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
												<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
											</view>
										</view>
									</view>
								</view>
								<view class="swiper-slide">
									<view class="scroll_item_box">
										<view class="gantanhao">
											<image @click="DepositBonus_Popup(thirdPay)" src="/static/Bonuslogin/i.png"></image>
										</view>
										<view class="item_1">{{$t('NEWBonusPageA.3rdDeposit')}}</view>
										<view class="item_2">
											<view class="item_2_1">{{thirdPay.rewardRate}}%</view>
											<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
										</view>
										<view class="item_4">
											<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
												<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="swiper-pagination"></view>
							<!-- #endif -->
							
							
							
							
							
							<!-- #ifdef APP-PLUS -->
							<view class="welcome-banner-scroll">
								<scroll-view :scroll-x="true" class="scrollview-box">
									
									<view class="scroll_item_box">
										<view class="gantanhao">
											<image @click="DepositBonus_Popup(firstPay)" src="/static/Bonuslogin/i.png"></image>
										</view>
										<view class="item_1">{{$t('NEWBonusPageA.1STDeposit')}}</view>
										<view class="item_2">
											<view class="item_2_1">{{firstPay.rewardRate}}%</view>
											<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
										</view>
										<view class="item_4">
											<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
												<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
											</view>
										</view>
									</view>
									
									<view class="scroll_item_box">
										<view class="gantanhao">
											<image @click="DepositBonus_Popup(secondPay)" src="/static/Bonuslogin/i.png"></image>
										</view>
										<view class="item_1">{{$t('NEWBonusPageA.2ndDeposit')}}</view>
										<view class="item_2">
											<view class="item_2_1">{{secondPay.rewardRate}}%</view>
											<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
										</view>
										<view class="item_4">
											<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
												<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
											</view>
										</view>
									</view>
									
									<view class="scroll_item_box">
										<view class="gantanhao">
											<image @click="DepositBonus_Popup(thirdPay)" src="/static/Bonuslogin/i.png"></image>
										</view>
										<view class="item_1">{{$t('NEWBonusPageA.3rdDeposit')}}</view>
										<view class="item_2">
											<view class="item_2_1">{{thirdPay.rewardRate}}%</view>
											<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
										</view>
										<view class="item_4">
											<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
												<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
											</view>
										</view>
									</view>
									
								</scroll-view>
							</view>
							<!-- #endif -->
							
							
							
							
							
							
						</view>
					</view>
				</view>
				
				
				
				
				
				
				
				
				


				










				<view class="regular">
					<view class="regular__title">
						<h1>{{$t('NEWBonusPageA.title2')}}</h1>
					</view>
					<view class="regular__cards">

						<uni-row :gutter="30" class="demo-uni-row">
							
							
							<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="DailyRebateSwitch">
								<view class="bonus-regular bgColor1">
									<image class="bonus-regular_topbg" src="/static/bonusCabinet/rakeback.png" mode="">
									</image>
									<view class="bonus-regular_title">{{$t('NEWBonusPageA.Rabate')}}</view>
									<view class="furywheel-mc noflex">
										<view class="fbt_type2">
											<scroll-view class="fbt_type2_scroll_view" scroll-x="true">
												<view class="fbt_type2_box" style="margin-top: 16rpx;">
													<view class="gundong_box" v-for="(itemk,indexk) in DailyRebate.rateList"
														:key="indexk">
														<span class="two"
															v-if="!DailyRebate.rate && indexk==0">{{itemk}}%</span>
														<span v-else
															:class="[DailyRebate.rate==itemk?'two':'one']">{{itemk}}%</span>
														<image src="/static/Bonuslogin/back_arrow_icon.png"
															v-if="indexk != DailyRebate.rateList.length-1"></image>
													</view>
												</view>
											</scroll-view>
										</view>
									</view>
									<view class="top__subtitle">{{$t('NEWBonusPageA.TIP3')}}</view>
								</view>
							</uni-col>
							
							
							<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="DailyCashbackSwitch == 1 || DailyCashbackSwitch == undefined">
								<view class="bonus-regular bgColor2">
									<image class="bonus-regular_topbg" src="/static/bonusCabinet/crazycashback.png"
										mode=""></image>
									<view class="bonus-regular_title">{{$t('NEWBonusPageA.Dcash')}}</view>
									<view class="furywheel-mc">
										<view class="fbt_type2">
											<view class="fbt_type2_box" v-for="(itemk,indexk) in DailyCashback.rateList"
												:key="indexk">
												<span class="two" v-if="DailyCashback.rate==0 && indexk==0">{{itemk}}%</span>
												<span v-else :class="[DailyCashback.rate==itemk?'two':'one']">{{itemk}}%</span>
												<image src="/static/Bonuslogin/back_arrow_icon.png"
													v-if="indexk != DailyCashback.rateList.length-1"></image>
											</view>
										</view>
									</view>
									<view class="top__subtitle">{{$t('NEWBonusPageA.Dcashtitle')}}</view>
								</view>
							</uni-col>
							
							
							<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="WeeklyCashbackSwitch == 1 || WeeklyCashbackSwitch == undefined">
								<view class="bonus-regular bgColor3">
									<image class="bonus-regular_topbg2" src="/static/Bonuslogin/06.png" mode="">
									</image>
									<view class="bonus-regular_title">{{$t('NEWBonusPageA.Wcash')}}</view>
									<view class="furywheel-mc">
										<view class="fbt_type2">
											<view class="fbt_type2_box" v-for="(itemk,indexk) in WeeklyCashback.rateList"
												:key="indexk">
												<span class="two" v-if="WeeklyCashback.rate==0 && indexk==0">{{itemk}}%</span>
												<span v-else :class="[WeeklyCashback.rate==itemk?'two':'one']">{{itemk}}%</span>
												<image src="/static/Bonuslogin/back_arrow_icon.png"
													v-if="indexk != WeeklyCashback.rateList.length-1"></image>
											</view>
										</view>
									</view>
									<view class="top__subtitle">{{$t('NEWBonusPageA.Wcashtitle')}}</view>
								</view>
							</uni-col>
							
							
							<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="WeeklyBonusSwitch">
								<view class="bonus-regular bgColor5">
									<image class="bonus-regular_topbg" src="/static/bonusCabinet/weeklybonus.png" mode=""></image>
									<view class="bonus-regular_title">{{$t('NEWBonusPageA.Wbonus')}}</view>
									<view class="top__subtitle">{{$t('NEWBonusPageA.Wbonustitle')}}</view>
								</view>
							</uni-col>
							
							
							<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="MonthlyBonusSwitch">
								<view class="bonus-regular bgColor6">
									<image class="bonus-regular_topbg2" src="/static/Bonuslogin/08.png" mode=""></image>
									<view class="bonus-regular_title">{{$t('NEWBonusPageA.Mbonus')}}</view>
									<view class="top__subtitle">{{$t('NEWBonusPageA.Mbonustitle')}}</view>
								</view>
							</uni-col>
							
							
							<uni-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="signInSwitch">
								<view class="bonus-regular bgColor5">
									<image class="bonus-regular_topbg2" src="/static/image/qiandaoIcon.png" mode=""></image>
									<view class="bonus-regular_title">{{$t('DailySignIn.Title')}}</view>
									<view class="top__subtitle">{{$t('DailySignIn.Prompt')}}</view>
								</view>
							</uni-col>
							
							
						</uni-row>
						<view class="card_btoom_info">
							<view class="card_btoom_info_text">{{$t('NEWBonusPageA.TIP4')}}</view>
							<view class="card_btoom_info_Btn">
								<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
									<span>{{$t('NEWBonusPageA.regBtn')}}</span>
								</view>
							</view>
						</view>
					</view>
				</view>



				
				<match-media :min-width="800">
					<view class="top_pc nobgcolor">
						<view class="top_info_pc">
							<view class="pc_infoos">
								<h1>{{$t('NEWBonusPageA.title3')}}</h1>
								<p>{{$t('NEWBonusPageA.TIP5')}}</p>
								<view class="sign_Btn">
									<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
										<span>{{$t('NEWBonusPageA.regBtn')}}</span>
									</view>
								</view>
							</view>
							<image src="/static/bonusCabinet/calendar-mobile.BYMsQVwl.png" mode="widthFix"></image>
						</view>
					</view>
				</match-media>
				
				<match-media :max-width="800">
					<view class="calendar">
						<view class="calendar__info">
							<h1>{{$t('NEWBonusPageA.title3')}}</h1>
							<image src="/static/bonusCabinet/calendar-mobile.BYMsQVwl.png" mode="widthFix"></image>
							<span class="mobile">{{$t('NEWBonusPageA.TIP5')}}</span>
							<view class="card_btoom_info_Btn">
								<view class="zhuceBtn" @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
									<span>{{$t('NEWBonusPageA.regBtn')}}</span>
								</view>
							</view>
						</view>
					</view>
				</match-media>
				
				

				<view class="bottom_swpier_bpx">
					<h3 class="regular__title">{{$t('NEWBonusPageA.OTBonus')}}</h3>
					<view class="bottom_swpier_bpx_wrap">
						<view>
							
							<uni-row :gutter="30" class="demo-uni-row">
								<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
									<view class="scroll_item_box_bottom sib_bgColor1">
										<view class="top_title_wrap">
											<view class="top_title">
												<image src="/static/Bonuslogin/10.png" mode="widthFix"></image>
												<view class="Derails">
													<view>{{$t('NEWBonusPageA.BBonus')}}</view>
													<view>{{$t('NEWBonusPageA.BluePrompt')}}</view>
												</view>
											</view>
											<view class="neirong_info"><span>{{$t('NEWBonusPageA.BBonusTIP')}}</span></view>
										</view>
									</view>
								</uni-col>
								<uni-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
									<view class="scroll_item_box_bottom sib_bgColor2">
										<view class="top_title_wrap">
											<view class="top_title">
												<image src="/static/Bonuslogin/11.png" mode="widthFix"></image>
												<view class="Derails">
													<view>{{$t('NEWBonusPageA.LevelBonus')}}</view>
													<view>{{$t('NEWBonusPageA.BluePrompt')}}</view>
												</view>
											</view>
											<view class="neirong_info"><span>{{$t('NEWBonusPageA.LevelBonusTIP')}}</span></view>
										</view>
									</view>
								</uni-col>
							</uni-row>
							
							
							
						</view>
					</view>
				</view>
				
				
				
				
				
				
			</view>

			<view style="padding: 0 30rpx 30rpx 30rpx;">
				<faqlist ref="" :istype="'BonusFAQ'"></faqlist>
			</view>

		</view>

		<!-- 关于我们和技术支持 -->
		<home-bottom-info ref=""></home-bottom-info>

		<signInPopup ref="signInShow"></signInPopup>
		<DepositBonus-Popup ref="DepositBonusPopup" :data="{}"></DepositBonus-Popup>

		<match-media :max-width="800">
			<u-tabbar></u-tabbar>
		</match-media>

	</view>
</template>

<script>
	import Swiper from 'swiper'; // 注意引入的是Swiper
	import 'swiper/swiper-bundle.css'; // 注意这里的引入
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				Topheight: '0',
				showRegisterNow: false,
				showOptions: true,
				isLogin: 0,



				// firstPay: {
				// 	cfg: [],
				// 	countdown: 0,
				// 	rewardRate: 0,
				// 	status: 0,
				// 	switchStatus: false
				// },
				// secondPay: {
				// 	cfg: [],
				// 	countdown: 0,
				// 	rewardRate: 0,
				// 	status: 0,
				// 	switchStatus: false
				// },
				// thirdPay: {
				// 	cfg: [],
				// 	countdown: 0,
				// 	rewardRate: 0,
				// 	status: 0,
				// 	switchStatus: false
				// },

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
				
				signInSwitch: false,





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
				MaxRates: 0,
				payCount: null, //首充次数


				swiper: null,



			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				this.isLogin = 0
				this.GetWelcomePackage()
			} else {
				this.isLogin = 1
				this.GetWelcomePackage_login()
			}

			this.GetGeneralReward()

			//判断是否WebApp启动，如果是就个他领取安装奖励
			//#ifdef H5
			if (window.navigator.standalone == true) {
				//alert('IOS-是从桌面中打开的')
				this.Topheight = '54px'
			} else if (window.matchMedia("(display-mode: standalone)").matches) {
				//alert('android-是从桌面中打开的')
				this.Topheight = '0'
			} else {
				//就是浏览器里面打开的
				this.Topheight = '0'
			}
			//#endif

		},
		onUnload() {
			//console.log('bonus-cabinet页面隐藏了')
			let that = this
			//that.$refs.RegisterNowRefs.hideRegisterNowRefs(0)
			that.showRegisterNow = false
		},
		onReady(){
			this.getSwiper()
		},
		methods: {
			getSwiper() {
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
			RegisterNowClose(data){
				if(data == 0){
					this.showRegisterNow = false
				} else {
					this.showRegisterNow = false
					this.$refs.signInShow.openPopup(2);
				}
			},
			registerNowOpen() {
				this.showRegisterNow = true
			},











			//首充倒计时结束监听
			firstPayExtraCountdownend(e) {
				//如果加成倒计时结束后 隐藏掉加成模块 显示原有模块
				this.showFirstPayJiaCheng = false
				setTimeout(() => {
					this.GetWelcomePackage_login()
				}, 200)
			},
			//获取登录后的Welcome Package
			GetWelcomePackage_login() {
				let that = this
				that.$u.post('/welcome/packet', {

				}).then(res => {
					//console.log('Welcome Package', res.data)
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

					//let MaxRate = res.data.firstPay.rewardRate + max1

					let MaxRate = res.data.firstPay.rewardRate + res.data.secondPay.rewardRate + res.data.thirdPay.rewardRate

					that.MaxRates = MaxRate
					//console.log('MaxRate', MaxRate)
					//console.log('最大加成', max1)

				})
			},
			DepositBonus_Popup(data) {
				this.$refs.DepositBonusPopup.openPopup(data)
			},
			ToDeposit() {
				uni.switchTab({
					url: '/pages/Wallet/Wallet'
				})
			},












			//获取Welcome Package
			GetWelcomePackage() {
				let that = this
				that.$u.post('/welcome/packet', {

				}).then(res => {
					//console.log('Welcome Package', res.data)
					that.firstPay = res.data.firstPay
					that.secondPay = res.data.secondPay
					that.thirdPay = res.data.thirdPay


					let MaxRate = res.data.firstPay.rewardRate + res.data.secondPay.rewardRate + res.data.thirdPay
						.rewardRate

					that.MaxRates = MaxRate
					//console.log('MaxRate', MaxRate)

				})
			},
			//获取通用奖励信息 General Reward
			GetGeneralReward() {
				let that = this
				that.$u.post('/general/reward', {

				}).then(res => {
					//console.log('General Reward', res.data)
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



			Logoin() {
				this.$refs.signInShow.openPopup()
			},
			Totabbar(url) {
				let token = uni.getStorageSync('token')
				if (!token) {
					this.$refs.signInShow.openPopup(2)
				} else {
					uni.switchTab({
						url: url
					})
				}
			},









		}
	}
</script>

<style lang="scss">
	
	@import 'swiper/swiper-bundle.css'; // 注意这里的引入
	
	
	
	.container {
		margin-inline: auto;
		max-width: 1648px;
		width: 100%;
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	.block_pc {
		width: 75%;
		margin: 0 auto 30px;
		display: flex;
		align-items: center;
		background: linear-gradient(180deg, #161f2c, #161f2c00);
		border-radius: 16px;
		display: flex;
		height: 250px;
		overflow: hidden;
		position: relative;

		.block_image-block_pc {
			flex: 1;
			position: relative;

			.block_image_pc {
				width: 100%;
				position: relative;
				z-index: 3;
			}

			.block_gradients_pc {
				height: 100%;
				left: 0;
				position: absolute;
				top: 0;
				transform: rotate(-11deg) translate(-30%, 22%);
				width: 100%;

				.block_image-blur-1_pc {
					background: #ffc7c7;
					filter: blur(54px);
					height: 97px;
					left: 0;
					margin-left: auto;
					margin-right: auto;
					position: absolute;
					right: 0;
					top: 120px;
					width: 166px;
					z-index: 3;
				}

				.block__image-blur-2_pc {
					background: #d44f67;
					filter: blur(54px);
					left: 0;
					margin-left: auto;
					margin-right: auto;
					position: absolute;
					right: 0;
				}

				.block_mage-blur-3_pc {
					height: 235px;
					top: 30px;
					width: 403px;
					z-index: 1;
					background: #d44f67;
					filter: blur(54px);
					left: 0;
					margin-left: auto;
					margin-right: auto;
					position: absolute;
					right: 0;
				}
			}
		}

		.block_content-block_pc {
			flex: 1;
			padding: 0 20px;
			position: relative;
			z-index: 4;

			.block_title_pc {
				font-size: 24px;
				font-weight: 700;
				letter-spacing: -.02em;
				line-height: 32px;
				margin-bottom: 8px;
				color: #fff;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.block_desc_pc {
				font-size: 14px;
				font-weight: 500;
				line-height: 20px;
				margin-bottom: 12px;
				color: #a7b5ca;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.Sign_upbtn_pc {
				cursor: pointer;
				color: #2283f6;
				align-items: center;
				column-gap: 2px;
				display: flex;
				font-weight: 600;
				padding: 0;
				text-decoration: none;
			}
		}
	}
	
	.nobgcolor {
		background: transparent !important;
	}

	.top_pc {
		background: $bonus-cabinet-top-bgcolor;
		padding: 80rpx 14%;

		.top_info_pc {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.pc_infoos {
				h1 {
					font-weight: bold;
					font-size: 44px;
					color: $all-secondary-text-color;
				}

				p {
					color: $all-secondary-text-color;
					font-size: 16px;
					font-weight: 500;
				}

				.sign_Btn {
					width: 247px;
					margin-top: 30px;
				}
			}

			image {
				width: 735px;
			}
		}
	}

	.container {
		background-color: $body-bg-color !important;
		.top {
			background: $bonus-cabinet-top-bgcolor;
			margin: 0 0 64px 0;
			padding-top: 32px;
			text-align: center;

			.top_info {
				text-align: center;
				padding: 0 16px;

				.sign_Btn {
					width: 480rpx;
					margin: 40rpx auto 0;
				}

				h1 {
					color: $bonus-cabinet-top-title;
					font-size: 32px;
					font-weight: bold;
					letter-spacing: .02em;
					line-height: 36px;
					margin-bottom: 8px;
					text-transform: uppercase;
				}

				p {
					color: $bonus-cabinet-top-title;
					font-size: 16px;
					font-weight: 500;
					line-height: 24px;
					margin-bottom: 24px;
				}

				image {
					width: 90%;
					margin: 16px auto 16px;
					position: static;
				}
			}
		}

		.nbc {
			padding: 0 30rpx;
			width: 100%;

			.bottom_swpier_bpx {
				.regular__title {
					color: $all-secondary-text-color;
					font-size: 18px;
					font-weight: 600;
					letter-spacing: -.02em;
					line-height: 24px;
					margin-bottom: 14px;
					margin-top: 0;
				}

				.bottom_swpier_bpx_wrap {
					.scrollview-box-bottom {
						//white-space: nowrap;
						/* 滚动必须加的属性 */
						width: 100%;
						padding: 0 0 0 0;
					}

					.scroll_item_box_bottom {
						//width: 470rpx;
						width: 100%;
						height: 240rpx;
						margin: 0 20rpx 20rpx 0;
						display: inline-block;
						/* item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可 */

						padding: 12px;
						border-radius: 20rpx;
						border: 1px solid $bonus-cabinet-sib-border;

						.top_title_wrap {
							width: 100%;
							height: 240rpx;

							.top_title {
								display: flex;
								align-items: flex-start;
								justify-content: flex-start;
								color: $bonus-cabinet-sib-title;
								font-size: 16px;
								letter-spacing: -.02em;
								line-height: 20px;
								margin-bottom: 0;
								margin-top: 0;
								font-weight: bold;

								image {
									width: 70rpx;
									margin-right: 10rpx;
								}

								.Derails {
									flex: 1;
									padding-left: 10rpx;

									view:nth-child(1) {
										text-transform: uppercase;
									}

									view:nth-child(2) {
										color: #0176b6;
										font-size: 26rpx;
									}
								}
							}

							.neirong_info {
								align-items: flex-start;
								display: flex;
								flex-direction: column;
								white-space: normal;

								span {
									color: $bonus-cabinet-sib-subtitle;
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
						background: $bonus-cabinet-sib-bgColor1;
					}

					.sib_bgColor2 {
						background: $bonus-cabinet-sib-bgColor2;
					}

					.sib_bgColor3 {
						background: radial-gradient(99.61% 65.67% at 0% 0%, rgba(27, 184, 61, 0.2) 0%, rgba(27, 184, 61, 0) 100%), linear-gradient(rgb(17, 25, 35) 0%, rgba(17, 25, 35, 0) 100%);
					}

					.sib_bgColor4 {
						background: radial-gradient(99.61% 65.67% at 0% 0%, rgba(237, 29, 73, 0.2) 0%, rgba(237, 29, 73, 0) 100%), linear-gradient(rgb(17, 25, 35) 0%, rgba(17, 25, 35, 0) 100%);
					}
				}
			}

			.calendar {
				margin-bottom: 80px;

				.calendar__info {
					text-align: center;
					padding-top: 0px;
					color: $all-secondary-text-color;

					h1 {
						font-size: 24px;
						font-weight: 700;
						letter-spacing: -.02em;
						line-height: 32px;
						margin-bottom: 8px;
						margin-top: 0;
					}

					image {
						margin-bottom: 7px;
						position: static;
						width: 100%;
					}

					.mobile {
						color: #a7b5ca;
						display: block;
						font-size: 16px;
						font-weight: 500;
						line-height: 24px;
						margin-bottom: 24px;
						padding: 0 16px;
					}

					.card_btoom_info_Btn {
						width: 440rpx;
						margin: 0 auto;
					}
				}
			}

			.vip-bonuses-reviews {
				.vip-bonuses-reviews__title {
					color: #fff;
					font-size: 32px;
					font-weight: 700;
					letter-spacing: -.02em;
					line-height: 40px;
					margin-bottom: 32px;
					margin-top: 0;
					text-align: center;
				}

				.vip-bonuses-reviews__cards {
					.card_btoom_info_Btn {
						width: 440rpx;
						margin: 0 auto;
					}

					.vip-bonuses-reviews-footer__text {
						color: #a7b5ca;
						font-size: 16px;
						font-weight: 500;
						line-height: 24px;
						margin-bottom: 16px;
					}

					.vip-bonus-card-preview {
						margin-bottom: 30rpx;
						align-items: center;
						background: radial-gradient(113.69% 86.86% at 50% 13.14%, #ffad01fc 0, #502017fc);
						border-radius: 16px;
						display: flex;
						flex-direction: column;
						padding: 8px 20px 24px;

						.card-image-wrapper {
							text-align: center;

							image {
								width: 266rpx;
							}

							view {
								color: $all-secondary-text-color;
								font-size: 18px;
								font-weight: 600;
								letter-spacing: -.02em;
								line-height: 24px;
								margin-bottom: 8px;
								margin-top: 0;
								text-align: center;
							}

							p {
								color: #ffffffa3;
								font-size: 14px;
								font-weight: 500;
								line-height: 20px;
								margin-bottom: 0;
								text-align: center;
							}
						}
					}
				}
			}

			.regular {
				margin-top: 56px;
				//align-items: center;
				//display: flex;
				//flex-direction: column;
				margin-bottom: 72px;
				text-align: center;

				.regular__title {
					display: flex;
					justify-content: center;
					max-width: 512px;
					text-align: center;

					h1 {
						font-size: 24px;
						font-weight: 700;
						letter-spacing: -.02em;
						line-height: 32px;
						margin-bottom: 24px;
						margin-top: 0;
						color: $all-secondary-text-color;
					}
				}

				.regular__cards {
					.card_btoom_info {
						.card_btoom_info_text {
							color: #93acd3;
							margin: 0 0 30rpx 0;
						}

						.card_btoom_info_Btn {
							width: 440rpx;
							margin: 0 auto;
						}
					}

					.bonus-regular {
						padding: 30rpx 30rpx 30rpx 30rpx;
						border-radius: 20rpx;
						margin-bottom: 30rpx;
						height: 282px;
						border: 1px solid $bonus-cabinet-bonus-regular;
						.bonus-regular_topbg {
							width: 480rpx;
							height: 142px;
						}

						.bonus-regular_topbg2 {
							width: 108px;
							height: 108px;
							margin-bottom: 40rpx;
						}

						.bonus-regular_title {
							color: $all-secondary-text-color;
							margin-bottom: 12px;
							text-align: center;
							font-size: 40rpx;
							font-weight: bold;
						}

						.noflex {
							display: block !important;
						}

						.furywheel-mc {
							display: flex;
							align-items: center;
							justify-content: center;
							margin-top: 12px;
							background: $bonus-cabinet-furywheel-mc;
							min-height: 35px;
							position: relative;
							width: 100%;

							.fbt_type2 {
								display: flex;
								align-items: center;

								.fbt_type2_scroll_view {
									//white-space: nowrap;
									width: 100%;
								}

								.fbt_type2_box {
									display: flex;
									align-items: center;
									justify-content: center;

									.gundong_box {
										display: inline-flex;
										align-items: center;
									}
								}

								.one {
									color: $bonus-cabinet-two;
									opacity: .2;
								}

								image {
									width: 20rpx;
									height: 20rpx;
									margin: 0 6rpx;
								}

								.two {
									color: $bonus-cabinet-two;
									font-size: 34rpx;
								}
							}

							.jinbifu {
								width: 40rpx;
							}

							view {
								color: #ffffffb8;

								.bise {
									color: $all-secondary-text-color;
								}
							}
						}

						.lvseColor {
							view {
								color: #1bb83d;

								span {
									color: #1bb83d;
								}
							}
						}

						.top__subtitle {
							color: $bonus-cabinet-top-subtitle;
							font-size: 12px;
							letter-spacing: -.02em;
							line-height: 16px;
							margin-bottom: 0;
							margin-top: 8px !important;
							margin-top: 0;
							padding: 0 14px;
							text-align: center;
						}
					}

					.bgColor1 {
						background: $bonus-cabinet-bgColor1;
					}

					.bgColor2 {
						background: $bonus-cabinet-bgColor2;
					}

					.bgColor3 {
						background: $bonus-cabinet-bgColor3;
					}

					.bgColor4 {
						background: $bonus-cabinet-bgColor4;
					}

					.bgColor5 {
						background: $bonus-cabinet-bgColor5;
						padding-top: 55px;
					}

					.bgColor6 {
						background: $bonus-cabinet-bgColor6;
						padding-top: 55px;
					}
				}
			}

			.welcome-banner {
				padding: 30rpx;
				background: $bonuspack-bg-color;
				border-radius: 18px;
				overflow: hidden;
				position: relative;

				.welcome-banner-scroll {
					.scrollview-box {
						white-space: nowrap;
						/* 滚动必须加的属性 */
						width: 100%;
						padding: 30rpx 0 10rpx 0;
					}

					.scroll_item_box_opacity {
						opacity: .3;
					}

					.scroll_item_box {
						
						
						
						// #ifdef APP-PLUS
						width: 400rpx;
						//height: 300rpx;
						margin: 0 30rpx 30rpx 0;
						display: inline-flex;
						/* item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可 */
						flex-direction: column;
						// #endif
						
						// #ifdef H5
						margin: 0 0 30rpx 0;
						// #endif
						
						align-items: center;
						background: $bonuspack-item-bg-color;
						padding: 12px;
						border-radius: 20rpx;
						position: relative;
						border: 1px solid $bonuspack-item-border;

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
							margin-bottom: 0;
							text-transform: uppercase;
						}

						.item_2 {
							width: 100%;
							align-items: center;
							border-radius: 8px;
							display: flex;
							flex-direction: column;
							justify-content: center;
							margin-bottom: 4px;
							padding-bottom: 4px;
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
							max-width: 200px;
							margin: 20rpx auto 0;

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
					}

					.scroll_item_box:first-child {
						margin-left: 0;
					}

					.scroll_item_box:last-child {
						margin-right: 0;
					}
				}

				.welcome-bannerView_btn {
					align-items: center;
					color: #2283f6;
					display: flex;
					text-decoration: none;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.welcome-banner_info {
					position: relative;
					max-width: 100%;
					text-align: center;
					width: 100%;

					.welcome-banner__info-title {
						font-size: 28px;
						font-weight: 900;
						letter-spacing: -.02em;
						line-height: 32px;
						margin-bottom: 4px;
						text-transform: uppercase;
						color: $all-secondary-text-color;

						.welcome-banner__info-title--red {
							color: #ed1d49;
							margin-right: 10rpx;
						}
					}

					.welcome-banner__info-desc {
						color: #a7b5ca;
						font-size: 14px;
						letter-spacing: -.02em;
						line-height: 18px;
						margin-bottom: 0;
						margin-top: 0;
					}
				}
			}

			.welcome-banner:before {
				// background-image: url("@/static/bonusCabinet/bg-mobile.webp");
				// background-size: 100% 100%;
				// content: "";
				// height: 100%;
				// left: 0;
				// pointer-events: none;
				// position: absolute;
				// top: 0;
				// width: 100%;
			}

			.block {
				width: 88%;
				flex-direction: column-reverse;
				justify-content: flex-end;
				margin: 0 auto;
				background: $bonus-cabinet-block;
				border-radius: 16px;
				display: flex;
				overflow: hidden;
				position: relative;

				.block_image-block {
					position: relative;

					.block_image {
						border-radius: 16px 0 0 16px;
						height: 100%;
						object-fit: cover;
						position: relative;
						width: 100%;
						z-index: 4;
					}

					.block_gradients {
						height: 100%;
						left: 0;
						position: absolute;
						top: 0;
						transform: translate(-11%, -66%);
						width: 100%;

						.block_image-blur-1 {
							background: #ffc7c7;
							filter: blur(54px);
							height: 97px;
							left: 0;
							margin-left: auto;
							margin-right: auto;
							position: absolute;
							right: 0;
							top: 120px;
							width: 166px;
							z-index: 3;
						}

						.block__image-blur-2 {
							background: #d44f67;
							filter: blur(54px);
							left: 0;
							margin-left: auto;
							margin-right: auto;
							position: absolute;
							right: 0;
						}

						.block_mage-blur-3 {
							background: #d44f67;
							filter: blur(54px);
							left: 0;
							margin-left: auto;
							margin-right: auto;
							position: absolute;
							right: 0;
							height: 235px;
							top: 30px;
							width: 403px;
						}
					}
				}

				.block_content-block {
					max-width: 100%;
					padding: 0 32px 20px;
					z-index: 5;

					.block_title {
						font-size: 24px;
						font-weight: 700;
						letter-spacing: -.02em;
						line-height: 32px;
						margin-bottom: 8px;
						margin-top: 0;
						color: $all-secondary-text-color;
					}

					.block_desc {
						color: #93acd3;
						font-size: 14px;
						font-weight: 500;
						line-height: 20px;
						margin-bottom: 12px;
					}

					.Sign_upbtn {
						font-size: 14px;
						align-items: center;
						color: #2283f6;
						display: flex;
						font-weight: 600;
						padding: 0;
						cursor: pointer;
					}
				}
			}
		}
	}

	.zhuceBtn {
		position: relative;
		color: #ffffff;

		span {
			font-weight: bold;
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
































	.gundong_box_wrap {
		padding: 0 0;

		.gdbox_title {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: #fff;
			font-size: 32rpx;

			image {
				width: 45rpx;
				margin-right: 4rpx;
				height: 45rpx;
				position: relative;
				left: -8rpx;
			}
		}

		.gundong_swpier {
			.scrollview-box {
				position: relative;
				//white-space: nowrap;
				/* 滚动必须加的属性 */
				width: 100%;
				//padding: 30rpx 0 0 0;
			}

			.scroll_item_box {
				//width: 400rpx;
				height: 310rpx;
				margin: 0 0 0 24rpx;
				//display: inline-flex;
				/* item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可 */
				//flex-direction: column;
				align-items: center;
				background: radial-gradient(117.84% 117.24% at 50% -20.4%, #0176b6 0, #014186 41.31%, #011a53), #111923;
				padding: 12px 12px 12px 12px;
				border-radius: 20rpx;
				position: relative;

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
					color: #a7b5ca;
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
						color: $all-secondary-text-color;
						font-size: 32px;
						font-weight: 700;
						letter-spacing: -.02em;
						line-height: 40px;
						margin-bottom: 0;
						margin-top: 0;
					}

					.item_2_2 {
						color: #a7b5ca;
						font-size: 14px;
						letter-spacing: -.02em;
						line-height: 18px;
						margin-bottom: 0;
					}
				}

				.item_2:before {
					background: linear-gradient(90deg, #1f54a300 -2.62%, #1f54a3 48.83%, #1f54a300 103.06%);
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

					.djs_lst {
						position: relative;
						top: 2rpx;
						border: 1px solid #293e6d;
						background-color: #0a2d65;
						border-radius: 14rpx;
						padding: 16rpx 6rpx;
						margin-right: 12rpx;
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

			.scroll_item_box:first-child {
				margin-left: 0;
			}

			.scroll_item_box:last-child {
				margin-right: 0rpx;
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

	.scroll_item_box_opacity {
		opacity: .3;
	}

	@media (min-width: 800px) {
		
		.page_boxs {
			height: auto !important;
		}
		
		.gundong_box_wrap .gundong_swpier .scroll_item_box .item_Jiacheng .item_jc2 {
			margin: 20px 0 24px;
		}
		.page_wrap {
			padding: 0 0;
		}
		.container .nbc .regular {
			width: 75%;
			margin: 0 auto;
		}
		.container .nbc .welcome-banner {
			width: 75%;
			margin: 30px auto;
		}
		.card_btoom_info {
			margin: 30px auto;
		}
		.container .nbc .calendar {
			margin-top: 100px;
			margin-bottom: 180px;
		}
		.bottom_swpier_bpx {
			width: 75%;
			margin: 30px auto;
		}
		.container .nbc .regular .regular__title {
			justify-content: flex-start;
		}
	}

	@media (max-width: 1024px) {
		.top_pc .top_info_pc {
			display: block;
			text-align: center;
		}

		.top_pc .top_info_pc .pc_infoos .sign_Btn {
			margin: 30px auto;
		}

		.top_pc .top_info_pc .pc_infoos h1 {
			font-size: 30px;
		}

		.top_pc .top_info_pc uni-image {
			width: 70%;
		}

		.block_pc .block_image-block_pc {
			overflow: hidden;
			position: relative;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.block_pc {
			height: auto;
			text-align: left;
			display: block;
		}
		.block_pc .block_content-block_pc {
			padding: 20rpx;
		}
	}

	@media (max-width: 800px) {
		.top_pc .top_info_pc uni-image {
			width: 40%;
		}
	}
</style>