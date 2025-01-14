<template>
	<view :style="theme" class="page_boxs">

		<!--充值和提款-->
		<pc-Deposit ref="openPCdeposit"></pc-Deposit>


		<match-media :max-width="800">
			<navbar ref="child" :isCountTo="false"></navbar>
		</match-media>
		<view class="page_wrap">

			<view class="page_title">{{$t('Promotions')}}</view>

			<!--<view class="Bonus-loading" v-if="Pageloadingtrue == true">
				<view class="LoadJuZhong">
					<image src="/static/image/666bet.png" mode=""></image>
					<view class="loader">
						<view class="loader-animation"></view>
					</view>
				</view>
			</view>Pageloadingtrue == false &&  @refGetactivity="refGetactivity" :activitycfg="activitycfg" :userDepositBonus="userDepositBonus" -->
			<!--<view v-if="isLogin == 1">
				<Bonus-TypeOne></Bonus-TypeOne>
			</view>-->

			<view v-show="isLogin == 1 && firstPay.switchStatus && secondPay.switchStatus && thirdPay.switchStatus" style="margin-top: 30rpx;">
				<view class="welcome-banner" v-show="payCount < 3 && (firstPay.countdown > 0 || secondPay.countdown > 0 || thirdPay.countdown > 0)">
					<view class="welcome-banner_info">
						<p class="welcome-banner__info-title"><span class="welcome-banner__info-title--red">{{$t('NEWBonusPageA.GetBonus')}}</span>{{MaxRatesT||0}}%</p>
					</view>
					<view class="welcome-banner-scroll">
						<view v-show="firstPay.switchStatus && secondPay.switchStatus && thirdPay.switchStatus">
							<view class="gundong_box_wrap" v-show="payCount < 3 && (firstPay.countdown > 0 || secondPay.countdown > 0 || thirdPay.countdown > 0)">
								<view class="gundong_swpier">




									<!-- #ifdef H5 || WEB -->
									<view class="banshi">
										<view class="swiper-container">
											<view class="swiper-wrapper">
												<view class="swiper-slide">
													<!--首充-->
													<view class="scroll_item_box">
														<view class="gantanhao">
															<image @click="DepositBonus_Popup(firstPay)"
																src="/static/Bonuslogin/i.png"></image>
														</view>
														<view class="item_1">{{$t('NEWBonusPageB.1STDeposit')}}</view>
														<view class="item_Jiacheng"
															v-if="firstPay.extraCountdown > 0 && payCount == 0">
															<view class="item_jc1">
																<span>{{firstPay.rewardRate}}%</span>{{$t('NEWBonusPageB.BONUS')}}
															</view>
															<view class="item_jc2">
																<view class="item_jc2_2">
																	<image src="/static/image/huo.png"></image>
																	<view>{{MaxRates}}%</view>
																</view>
																<view class="item_jc2_3">
																	<u-count-down :timestamp="firstPay.extraCountdown"
																		bg-color="" color="#ffffff"
																		separator-color="#ffffff" font-size="28"
																		@end="firstPayExtraCountdownend"></u-count-down>
																</view>
															</view>
														</view>
														<view class="item_2" v-else>
															<view class="item_2_1">{{firstPay.rewardRate}}%</view>
															<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
														</view>
														<view class="item_4">
															<view class="djs_lst"
																v-if="firstPay.countdown>0 && payCount == 0">
																<u-count-down :timestamp="firstPay.countdown"
																	bg-color="" color="#627a98"
																	separator-color="#627a98"
																	font-size="24"></u-count-down></view>
															<!--可参与(高亮按钮)-->
															<view class="zhuceBtn"
																v-if="firstPay.status==0 && firstPay.countdown>0 && payCount == 0"
																@click="ToDeposit()">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
															<!--不可参与(置灰按钮)-->
															<view class="zhuceBtn scroll_item_box_opacity"
																v-else-if="firstPay.status==0 && firstPay.countdown==0 && payCount == 0">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
															<!--参与未达标(置灰按钮)-->
															<view class="zhuceBtn scroll_item_box_opacity"
																v-else-if="firstPay.status==0 && payCount >= 1">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
															<!--参与已达标(置灰按钮)-->
															<view class="zhuceBtn scroll_item_box_opacity"
																v-else-if="firstPay.status==2 && payCount >= 1">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
															<view class="zhuceBtn scroll_item_box_opacity" v-else>
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
														</view>
													</view>
												</view>
												<view class="swiper-slide">
													<!--二充-->
													<view class="scroll_item_box">
														<view class="gantanhao">
															<image @click="DepositBonus_Popup(secondPay)"
																src="/static/Bonuslogin/i.png"></image>
														</view>
														<view class="item_1">{{$t('NEWBonusPageB.2ndDeposit')}}</view>
														<view class="item_2">
															<view class="item_2_1">{{secondPay.rewardRate}}%</view>
															<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
														</view>
														<!--可参与(高亮按钮显示倒计时)-->
														<view class="item_4"
															v-if="secondPay.status==0 && secondPay.countdown>0 && payCount <= 1">
															<view class="djs_lst" v-if="secondPay.countdown > 0">
																<u-count-down :timestamp="secondPay.countdown"
																	bg-color="" color="#627a98"
																	separator-color="#627a98"
																	font-size="24"></u-count-down>
															</view>
															<view class="zhuceBtn" @click="ToDeposit()">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
														</view>
														<!--不可参与(置灰按钮隐藏倒计时)-->
														<view class="item_4"
															v-else-if="secondPay.status==0 && secondPay.countdown==0 && payCount <= 1">
															<view class="zhuceBtn scroll_item_box_opacity">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
														</view>
														<!--参与未达标(置灰按钮隐藏倒计时)-->
														<view class="item_4"
															v-else-if="secondPay.status==0 && payCount >= 2">
															<view class="zhuceBtn scroll_item_box_opacity">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
														</view>
														<!--参与已达标(置灰按钮隐藏倒计时)-->
														<view class="item_4"
															v-else-if="secondPay.status==2 && payCount >= 2">
															<view class="zhuceBtn scroll_item_box_opacity">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
														</view>
														<view class="item_4" v-else>
															<view class="zhuceBtn scroll_item_box_opacity">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
														</view>
													</view>
												</view>
												<view class="swiper-slide">
													<!--三充-->
													<view class="scroll_item_box" style="margin-bottom: 0;">
														<view class="gantanhao">
															<image @click="DepositBonus_Popup(thirdPay)"
																src="/static/Bonuslogin/i.png"></image>
														</view>
														<view class="item_1">{{$t('NEWBonusPageB.3rdDeposit')}}</view>
														<view class="item_2">
															<view class="item_2_1">{{thirdPay.rewardRate}}%</view>
															<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
														</view>
														<view class="item_4">
															<view class="djs_lst" v-if="thirdPay.countdown > 0">
																<u-count-down :timestamp="thirdPay.countdown"
																	bg-color="" color="#627a98"
																	separator-color="#627a98"
																	font-size="24"></u-count-down></view>
															<!--可参与(高亮按钮)-->
															<view class="zhuceBtn"
																v-if="thirdPay.status==0 && thirdPay.countdown>0 && payCount <= 2"
																@click="ToDeposit()">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
															<!--不可参与(置灰按钮)-->
															<view class="zhuceBtn scroll_item_box_opacity"
																v-else-if="thirdPay.status==0 && thirdPay.countdown==0 && payCount <= 2">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
															<!--参与未达标(置灰按钮)-->
															<view class="zhuceBtn scroll_item_box_opacity"
																v-else-if="thirdPay.status==0 && payCount > 2">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
															<!--参与已达标(置灰按钮)-->
															<view class="zhuceBtn scroll_item_box_opacity"
																v-else-if="thirdPay.status==2 && payCount > 2">
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
															<view class="zhuceBtn scroll_item_box_opacity" v-else>
																<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
														</view>
													</view>
												</view>
											</view>
											<view class="swiper-pagination"></view>
										</view>
									</view>
									<!-- #endif -->




									<!-- #ifdef APP-PLUS -->
									<scroll-view :scroll-x="true" class="scrollview-box">
										<view class="scroll_item_box">
											<view class="gantanhao">
												<image @click="DepositBonus_Popup(firstPay)"
													src="/static/Bonuslogin/i.png"></image>
											</view>
											<view class="item_1">{{$t('NEWBonusPageB.1STDeposit')}}</view>
											<view class="item_Jiacheng"
												v-if="firstPay.extraCountdown > 0 && payCount == 0">
												<view class="item_jc1">
													<span>{{firstPay.rewardRate}}%</span>{{$t('NEWBonusPageB.BONUS')}}
												</view>
												<view class="item_jc2">
													<view class="item_jc2_2">
														<image src="/static/image/huo.png"></image>
														<view>{{MaxRates}}%</view>
													</view>
													<view class="item_jc2_3">
														<u-count-down :timestamp="firstPay.extraCountdown" bg-color=""
															color="#ffffff" separator-color="#ffffff" font-size="28"
															@end="firstPayExtraCountdownend"></u-count-down>
													</view>
												</view>
											</view>
											<view class="item_2" v-else>
												<view class="item_2_1">{{firstPay.rewardRate}}%</view>
												<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
											</view>
											<view class="item_4">
												<view class="djs_lst" v-if="firstPay.countdown>0 && payCount == 0">
													<u-count-down :timestamp="firstPay.countdown" bg-color=""
														color="#627a98" separator-color="#627a98"
														font-size="24"></u-count-down></view>
												<!--可参与(高亮按钮)-->
												<view class="zhuceBtn"
													v-if="firstPay.status==0 && firstPay.countdown>0 && payCount == 0"
													@click="ToDeposit()"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
												<!--不可参与(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="firstPay.status==0 && firstPay.countdown==0 && payCount == 0">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与未达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="firstPay.status==0 && payCount >= 1">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与已达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="firstPay.status==2 && payCount >= 1">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<view class="zhuceBtn scroll_item_box_opacity" v-else>
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
										</view>
										<view class="scroll_item_box">
											<view class="gantanhao">
												<image @click="DepositBonus_Popup(secondPay)"
													src="/static/Bonuslogin/i.png"></image>
											</view>
											<view class="item_1">{{$t('NEWBonusPageB.2ndDeposit')}}</view>
											<view class="item_2">
												<view class="item_2_1">{{secondPay.rewardRate}}%</view>
												<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
											</view>
											<!--可参与(高亮按钮显示倒计时)-->
											<view class="item_4"
												v-if="secondPay.status==0 && secondPay.countdown>0 && payCount <= 1">
												<view class="djs_lst" v-if="secondPay.countdown > 0"><u-count-down
														:timestamp="secondPay.countdown" bg-color="" color="#627a98"
														separator-color="#627a98" font-size="24"></u-count-down>
												</view>
												<view class="zhuceBtn" @click="ToDeposit()">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
											<!--不可参与(置灰按钮隐藏倒计时)-->
											<view class="item_4"
												v-else-if="secondPay.status==0 && secondPay.countdown==0 && payCount <= 1">
												<view class="zhuceBtn scroll_item_box_opacity">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
											<!--参与未达标(置灰按钮隐藏倒计时)-->
											<view class="item_4" v-else-if="secondPay.status==0 && payCount >= 2">
												<view class="zhuceBtn scroll_item_box_opacity">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
											<!--参与已达标(置灰按钮隐藏倒计时)-->
											<view class="item_4" v-else-if="secondPay.status==2 && payCount >= 2">
												<view class="zhuceBtn scroll_item_box_opacity">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
											<view class="item_4" v-else>
												<view class="zhuceBtn scroll_item_box_opacity">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
										</view>
										<view class="scroll_item_box" style="margin-bottom: 0;">
											<view class="gantanhao">
												<image @click="DepositBonus_Popup(thirdPay)"
													src="/static/Bonuslogin/i.png"></image>
											</view>
											<view class="item_1">{{$t('NEWBonusPageB.3rdDeposit')}}</view>
											<view class="item_2">
												<view class="item_2_1">{{thirdPay.rewardRate}}%</view>
												<view class="item_2_2">{{$t('NEWBonusPageB.BONUS')}}</view>
											</view>
											<view class="item_4">
												<view class="djs_lst" v-if="thirdPay.countdown > 0"><u-count-down
														:timestamp="thirdPay.countdown" bg-color="" color="#627a98"
														separator-color="#627a98" font-size="24"></u-count-down></view>
												<!--可参与(高亮按钮)-->
												<view class="zhuceBtn"
													v-if="thirdPay.status==0 && thirdPay.countdown>0 && payCount <= 2"
													@click="ToDeposit()"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
												<!--不可参与(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="thirdPay.status==0 && thirdPay.countdown==0 && payCount <= 2">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与未达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="thirdPay.status==0 && payCount > 2">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<!--参与已达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="thirdPay.status==2 && payCount > 2">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
												<view class="zhuceBtn scroll_item_box_opacity" v-else>
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span></view>
											</view>
										</view>
									</scroll-view>
									<!-- #endif -->




								</view>
							</view>
						</view>
					</view>
				</view>
			</view>























			<view v-show="isLogin == 0" style="margin: 30rpx 0 0 0;">
				<view class="welcome-banner">
					<view class="welcome-banner-scroll">
						<view class="gundong_box_wrap">
							<view class="gundong_swpier">


								<!-- #ifdef H5 || WEB -->
								<view class="banshi">
									<view class="swiper-container">
										<view class="welcome-banner_info">
											<p class="welcome-banner__info-title"><span
													class="welcome-banner__info-title--red">{{$t('NEWBonusPageA.GetBonus')}}</span>{{MaxRates||0}}%
											</p>
										</view>
										<view class="swiper-wrapper welcome-banner-scroll">
											<view class="swiper-slide">
												<view class="scroll_item_box">
													<view class="gantanhao">
														<image @click="DepositBonus_Popup(firstPay)"
															src="/static/Bonuslogin/i.png"></image>
													</view>
													<view class="item_1">{{$t('NEWBonusPageA.1STDeposit')}}</view>
													<view class="item_2">
														<view class="item_2_1">{{firstPay.rewardRate}}%</view>
														<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
													</view>
													<view class="item_4">
														<view class="zhuceBtn"
															@click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
															<span>{{$t('NEWBonusPageA.DepositBTN')}}</span></view>
													</view>
												</view>
											</view>
											<view class="swiper-slide">
												<view class="scroll_item_box">
													<view class="gantanhao">
														<image @click="DepositBonus_Popup(secondPay)"
															src="/static/Bonuslogin/i.png"></image>
													</view>
													<view class="item_1">{{$t('NEWBonusPageA.2ndDeposit')}}</view>
													<view class="item_2">
														<view class="item_2_1">{{secondPay.rewardRate}}%</view>
														<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
													</view>
													<view class="item_4">
														<view class="zhuceBtn"
															@click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
															<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
														</view>
													</view>
												</view>
											</view>
											<view class="swiper-slide">
												<view class="scroll_item_box">
													<view class="gantanhao">
														<image @click="DepositBonus_Popup(thirdPay)"
															src="/static/Bonuslogin/i.png">
														</image>
													</view>
													<view class="item_1">{{$t('NEWBonusPageA.3rdDeposit')}}</view>
													<view class="item_2">
														<view class="item_2_1">{{thirdPay.rewardRate}}%</view>
														<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
													</view>
													<view class="item_4">
														<view class="zhuceBtn"
															@click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
															<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
														</view>
													</view>
												</view>
											</view>
										</view>
										<view class="swiper-pagination"></view>
									</view>
								</view>
								<!-- #endif -->






								<!-- #ifdef APP-PLUS -->
								<scroll-view :scroll-x="true" class="scrollview-box">
									<view class="scroll_item_box">
										<view class="gantanhao">
											<image @click="DepositBonus_Popup(firstPay)" src="/static/Bonuslogin/i.png">
											</image>
										</view>
										<view class="item_1">{{$t('NEWBonusPageA.1STDeposit')}}</view>
										<view class="item_2">
											<view class="item_2_1">{{firstPay.rewardRate}}%</view>
											<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
										</view>
										<view class="item_4">
											<view class="zhuceBtn"
												@click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
												<span>{{$t('NEWBonusPageA.DepositBTN')}}</span></view>
										</view>
									</view>
									<view class="scroll_item_box">
										<view class="gantanhao">
											<image @click="DepositBonus_Popup(secondPay)"
												src="/static/Bonuslogin/i.png"></image>
										</view>
										<view class="item_1">{{$t('NEWBonusPageA.2ndDeposit')}}</view>
										<view class="item_2">
											<view class="item_2_1">{{secondPay.rewardRate}}%</view>
											<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
										</view>
										<view class="item_4">
											<view class="zhuceBtn"
												@click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
												<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
											</view>
										</view>
									</view>
									<view class="scroll_item_box">
										<view class="gantanhao">
											<image @click="DepositBonus_Popup(thirdPay)" src="/static/Bonuslogin/i.png">
											</image>
										</view>
										<view class="item_1">{{$t('NEWBonusPageA.3rdDeposit')}}</view>
										<view class="item_2">
											<view class="item_2_1">{{thirdPay.rewardRate}}%</view>
											<view class="item_2_2">{{$t('NEWBonusPageA.BONUS')}}</view>
										</view>
										<view class="item_4">
											<view class="zhuceBtn"
												@click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">
												<span>{{$t('NEWBonusPageA.DepositBTN')}}</span>
											</view>
										</view>
									</view>
								</scroll-view>
								<!-- #endif -->


							</view>
						</view>
					</view>
				</view>
			</view>















































			<uv-sticky :z-index="98" :offsetTop="offsetTop" customNavHeight="0" v-if="DefolunbotuList.length != 0">
				<view class="bonus_tabs_box">
					<bonus-tabs :list="subsectionList" name="typeName" :is-scroll="true" :current="subCurrent" @change="tabschange" :active-item-style="activeitemstyle" :bar-style="barStyle"></bonus-tabs>
				</view>
			</uv-sticky>
			<view class="Bonus_list" style="margin-top: 20rpx;" v-if="DefolunbotuList.length != 0">
				<uni-row :gutter="30" class="demo-uni-row">
					<uni-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-for="(item ,index) in lunbotuList" :key="index">
						<view class="Bonus_list_item">
							<view class="swiper-box" @click="Todetails(item)">
								<view class="swiper-item">
									<view class="sw_right">
										<image :src="item.mobileImage" mode="widthFix"></image>
									</view>
									<view class="sw_btn">{{$t('NewlyAdded.Endat')}} {{item.endTime}}</view>
									<view class="sw_left">
										<view class="sub_title" v-if="item.summary">{{item.summary}}</view>
									</view>
									<view class="Read_more">
										<text>{{$t('NewlyAdded.LearnMore')}}</text>
										<u-icon name="arrow-right" size="26" color="#2283f6"></u-icon>
									</view>
								</view>
							</view>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>

		<match-media :max-width="800">
			<!-- <view>页面宽度低于 800px 时显示</view> -->
			<u-tabbar></u-tabbar>
		</match-media>

		<regiserPopup ref="regiserShow"></regiserPopup>
		<signInPopup ref="signInShow"></signInPopup>

		<home-bottom-info ref=""></home-bottom-info>

		<DepositBonus-Popup ref="DepositBonusPopup"></DepositBonus-Popup>

	</view>
</template>

<script>
	import Swiper from 'swiper'; // 注意引入的是Swiper
	import 'swiper/swiper-bundle.css'; // 注意这里的引入

	export default {
		data() {
			return {
				Pageloadingtrue: false,

				NoLogin: false,


				offsetTop: '59',
				activeitemstyle: {

				},
				barStyle: {
					bottom: "-2px"
				},
				subsectionList: [],
				subCurrent: 0,

				autoplay: true,
				currentIndex: 1,
				currentStyle: 0,
				lunbotuList: [],
				DefolunbotuList: [],
				isLogin: 0,

				activitycfg: {},
				userDepositBonus: {},

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
				MaxRatesT: 0,
				payCount: null, //首充次数

				swiper: null,


			}
		},
		onHide() {
			let that = this
			//that.$refs.child.OpenMenu();
			uni.$emit('HideTabber', 1)
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			this.getLunbotu()
		},
		onShow() {
			this.$nextTick(() => {
				let token = uni.getStorageSync("token")
				if (!token) {
					this.GetWelcomePackage()
					this.isLogin = 0
				} else {
					this.isLogin = 1
					//this.Getactivity()
					uni.$emit('getgetMybalance', 1)
					this.GetWelcomePackage_login()
					uni.$emit('ZhuRulookBenDihb', 1);
				}
			})
		},
		onReady() {
			this.getSwiper()
		},
		methods: {
			tabschange(index) {
				let that = this
				that.subCurrent = index;
				that.lunbotuList = that.subsectionList[index].lists
			},
			async getLunbotu() {
				let that = this
				const ress = await that.$u.post('/game/activity', {
					positionType: 1, //（1 活动列表 2 首页跑马灯 ）
					pid: that.PID, //Number 是 平台Id
				});
				
				if(ress.data.activities.length == 0){
					
				} else {
					//设置全部数据
					that.DefolunbotuList = ress.data.activities
					let tabsList = ress.data.activityTypes
					
					//拼装数据
					let newwTabs = [{
						typeName: '全部',
						type: 999,
						lists: ress.data.activities
					}]
					for (var i = 0; i < tabsList.length; i++) {
						const typeName = tabsList[i].typeName
						const type = tabsList[i].type
						const lists = []
						newwTabs.push({
							typeName: typeName,
							type: type,
							lists: await that.ChaXunList(type)
						});
					}
					//去掉分类下面lists为空的
					let truelist = []
					newwTabs.forEach(function(itema, indexa) {
						if(itema.lists.length != 0){
							truelist.push(itema)
						}
					});
					//赋值给选项卡
					that.subsectionList = truelist
					//先把全部的显示出来
					that.lunbotuList = truelist[0].lists
					//console.log('啊啊啊啊', truelist);
				}
				
				
				
			},
			async ChaXunList(type) {
				let cnewlist = []
				this.DefolunbotuList.forEach(function(item, index) {
					if(item.type == type){
						cnewlist.push(item)
					}
				});
				return cnewlist
			},










































			getSwiper() {
				let that = this
				that.swiper = new Swiper(".swiper-container", {
					loop: false, // 无缝
					autoHeight: false, //高度随内容变化
					autoplay: false,
					paginationClickable: true,
					slidesPerView: 3, // 一组三个
					spaceBetween: 10, // 间隔
					uniqueNavElements: true, //当存在多个同名导航元素时，设置导航元素是否唯一。
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

					let MaxRate = res.data.firstPay.rewardRate + max1

					let MaxRatet = res.data.firstPay.rewardRate + res.data.secondPay.rewardRate + res.data.thirdPay
						.rewardRate

					that.MaxRatesT = MaxRatet
					that.MaxRates = MaxRate

					//console.log('MaxRate', MaxRate)
					//console.log('最大加成', max1)

				})
			},
			DepositBonus_Popup(data) {
				this.$refs.DepositBonusPopup.openPopup(data)
			},
			ToDeposit() {
				let windowWidth = uni.getSystemInfoSync().windowWidth
				if (windowWidth >= "800") {
					this.$refs.openPCdeposit.openPopup()
				} else {
					uni.switchTab({
						url: '/pages/Wallet/Wallet'
					})
				}
			},























			//获取未登录的Welcome Package
			GetWelcomePackage() {
				let that = this
				that.$u.post('/welcome/packet', {

				}).then(res => {
					that.firstPay = res.data.firstPay
					that.secondPay = res.data.secondPay
					that.thirdPay = res.data.thirdPay
					that.payCount = res.data.payCount
					let MaxRate = res.data.firstPay.rewardRate + res.data.secondPay.rewardRate + res.data.thirdPay
						.rewardRate
					that.MaxRates = MaxRate
				})
			},





























			Totabbar(url) {
				let token = uni.getStorageSync('token')
				if (!token) {
					this.$refs.signInShow.openPopup()
				} else {
					uni.switchTab({
						url: url
					})
				}
			},
			refGetactivity() {
				//this.Getactivity()
			},
			Getactivity() {
				let that = this

				this.$u.post('/first/deposit/activity', {

				}).then(res => {

					if (res.data.cfg.depositBonusEnabled == false) {

					} else {
						//that.Pageloadingtrue = true
						//setTimeout(()=>{
						that.activitycfg = res.data.cfg || {}
						that.userDepositBonus = res.data.userDepositBonus || {}
						//that.Pageloadingtrue = false
						//},500)
					}

				}).catch(err => {
					that.Pageloadingtrue = false
				})
			},

			Todetails(item) {
				let str = JSON.stringify(item)
				str = str.replace(/%/g, '%25')
				let query = encodeURIComponent(str)
				uni.navigateTo({
					url: '/pages/BonusDetails/BonusDetails?data=' + query
				})
				/*let token = uni.getStorageSync("token")
				if (!token) {
					this.$refs.signInShow.openPopup()
				} else {
					
				}*/
			}






		}
	}
</script>

<style lang="scss">
	.bonus_tabs_box {
		width: 93%;
		margin: 8px auto;
		padding: 0 5px;
		background-color: $home-xxk-mzbg-color;
		border-radius: 10px;
	}

	page {
		height: calc(100vh);
		background-color: $all-secondary-color !important;
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


	.Bonus-loading {
		height: 183px;
		position: relative;

		.LoadJuZhong {
			text-align: center;
			top: 50%;
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




	.page_wrap {
		padding: 0 0 30rpx 0;
		margin-inline: auto;
		margin: 0 auto;
		max-width: 1088px;
		width: 100%;
		background-color: $body-bg-color !important;

		.Bonus_list {
			background-color: $body-bg-color;
			padding: 0 30rpx;

			.Bonus_list_item {
				margin-bottom: 50rpx;

				.container {
					font-size: 14px;
					background-color: #fff;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}

				.swiper-box {
					//height: 155px;
				}

				.swiper-item {
					//display: flex;
					align-items: center;
					//background-color: $all-secondary-color;
					border-radius: 12rpx;
					//padding: 20rpx 20rpx 20rpx 20rpx;
					position: relative;

					//height: 155px;
					.Read_more {
						display: flex;
						align-items: center;
						color: #2283f6;
						cursor: pointer;
						font-weight: 500;
					}

					.sw_left {
						margin-top: 10rpx;
						position: relative;
						z-index: 2;

						.sub_title {
							display: inline-block;
							color: $all-secondary-text-color;
							margin-bottom: 10rpx;
							font-weight: 600;
							font-size: 32rpx;
							word-break: break-all;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}

						.ask_info {
							color: #FEFEFE;
							font-size: 24rpx;
							margin-bottom: 20rpx;
							word-break: break-all;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}
					}

					.sw_right {
						//position: absolute;
						//top: 0;
						//left: 0;
						width: 100%;

						//height: 155px;
						image {
							width: 100%;
							height: 198px;
							border-radius: 14rpx;
							cursor: pointer;
							background-color: $all-secondary-color;
						}
					}

					.sw_btn {
						//position: absolute;
						//bottom: 20rpx;
						//left: 20rpx;
						color: #93acd3;
						//background-color: rgba(255, 255, 255, 0); /* 半透明背景 */
						//backdrop-filter: blur(10px); /* 背景模糊 */
						//-webkit-backdrop-filter: blur(10px); /* 兼容老版本 Safari */
						//border-radius: 10rpx;
						//border: 1px solid #A3A8AB;
						text-align: left;
						//height: 63rpx;
						font-size: 24rpx;
						//line-height: 63rpx;
						padding: 20rpx 0 0 0;
					}

				}
			}
		}

		.page_title {
			color: $all-secondary-text-color;
			font-size: 36rpx;
			font-weight: bold;
			//margin-bottom: 20rpx;
			padding:30rpx;
			background-color: $bonus-title-bg-color;
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






























	.welcome-banner {
		padding: 15px 0;
		background: $bonuspack-bg-color;
		border-radius: 18px;
		overflow: hidden;
		position: relative;
		width: 93%;
		margin: 0 auto 7px;

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
				width: 100%;
				height: 300rpx;
				margin: 0 0 0 30rpx;
				// display: inline-flex;
				// /* item的外层定义成行内素才可进行滚动 inline-block / inline-flex 均可 */
				// flex-direction: column;
				align-items: center;
				background: radial-gradient(117.84% 117.24% at 50% -20.4%, #0176b6 0, #014186 41.31%, #011a53), #111923;
				padding: 12px;
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
				color: $bonuspack-title;

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























	.gundong_box_wrap {
		padding: 0 30rpx;

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
				white-space: nowrap;
				/* 滚动必须加的属性 */
				width: 100%;
				//padding: 30rpx 0 0 0;
			}

			.scroll_item_box {
				height: 310rpx;

				/* #ifndef APP-PLUS */
				width: 100%;
				margin: 0 0 0 0;
				/*#endif */

				/* #ifdef APP-PLUS */
				margin: 0 20rpx 0 0;
				width: 400rpx;
				display: inline-flex;
				// /* item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可 */
				flex-direction: column;
				/* #endif */


				align-items: center;
				background: $bonuspack-item-bg-color;
				padding: 12px 12px 12px 12px;
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
					margin-bottom: 4px;
					text-transform: uppercase;
				}

				.item_Jiacheng {
					width: 100%;
					text-align: center;

					.item_jc1 {
						color: #ffffff;
						font-size: 30rpx;

						span {
							text-decoration: line-through #f00;
							margin-right: 6rpx;
							color: #a7b5ca;
						}
					}

					.item_jc2 {
						margin: 12px 0 0 0;
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

					.djs_lst {
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
		
		.bonus_tabs_box {
			width: 98%;
		}

		.welcome-banner {
			width: 98%;
		}

		.page_wrap {
			padding: 50rpx;
			//background: radial-gradient(49.05% 79.72% at 49.05% 0, #00186c 0, #00186c .01%, #0136b41c 74.48%, #0140cd00);
		}

		.page_wrap .Bonus_list {
			background-color: transparent;
		}

		.gundong_box_wrap .gundong_swpier .scroll_item_box {
			//width: 36.333333%;
			height: 185px;
		}

		.gundong_box_wrap .gundong_swpier .scroll_item_box .item_4 .djs_lst {
			flex: 1;
			text-align: center;
		}

		.gundong_box_wrap .gundong_swpier .scroll_item_box .item_2 {
			margin-bottom: 54rpx;
		}

		.gundong_box_wrap .gundong_swpier .scroll_item_box .item_Jiacheng .item_jc2 {
			margin: 20px 0 24px;
		}
	}
</style>