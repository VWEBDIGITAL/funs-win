<template>
	<view :style="theme" class="page_wrap">
		<DepositBonus-Popup ref="DepositBonusPopup"></DepositBonus-Popup>
		<view class="u-loading22" v-show="Hoemloadingtrue == true">
			<view class="loader">
				<view class="loader-animation"></view>
			</view>
		</view>

		<view v-show="Hoemloadingtrue == false">
			<!--滚动大奖 先禁用，因为导致left-windows 没有宽度-->
			<!-- #ifdef H5 -->
			<view v-if="HotBaoJiangList.length > 0">
				<!-- <rollgrand-prix ref="" :hotBaojiangList="HotBaoJiangList" @StartGames="lookMask"></rollgrand-prix> -->
			</view>
			<!-- #endif -->

			<!-- H5游戏历史 -->
			<!--有的游戏没达到2行6个所以少于6个的就显示一行-->
			<!-- #ifdef H5 || WEB -->
			<match-media :max-width="800">
				<!-- #endif -->
				<view v-if="GameHistory.length != 0">
					<view class="games_list_wrap">
						<view class="games_list_title">
							<view class="list_title">
								<u-icon name="clock-fill" size="42" color="#566488"></u-icon>
								<view>{{$t('GameHistory')}}</view>
								<span>({{GameHistory.length || 0}})</span>
							</view>
							<view class="caozuo_btn">
								<view class="gengduo" @click="TolishiLog()">{{$t('ViewAll')}}<u-icon name="arrow-right"
										color="#2283f6"></u-icon></view>
							</view>
						</view>
					</view>
					<view class='rec_bottom' style="margin-bottom: 30px;"><!-- v-if="GameHistory.length < 12"-->
						<!-- <view class="zheceng2"></view> -->
						<view class="shopTuijian">
							<scroll-view class="uni-swiper-tab" scroll-x>
								<view class="scrollx_items" v-for="(valgg,indexgg) in GameHistory" :key="indexgg">
									<view class='jrsx_item2'>
										<view class='goodsdetail'>
											<view class='jrsx_img' @click="lookMask(valgg,valgg.gameCode+indexgg)">
												<u-lazy-load :is-effect="false" class="goods-icon" height="100%"
													:image="valgg.path" border-radius="18" :loading-img="loadingImg"
													:error-img="errorImg"></u-lazy-load>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<!-- <view class="zheceng"></view> -->
					</view>
					<!-- <view class="all"  style="margin-bottom: 30px;" v-else>
					<scroll-view class="nav-bar" scroll-x @scroll="scroll" :show-scrollbar="true">
						<view class="nav-bar-wrap">
							<block v-for="(itemgg,indexgg) in GameHistory" :key="indexgg">
								<view class="nav-bar-item" @click="lookMask(itemgg,itemgg.gameCode+indexgg)" :id="itemgg.id">
									<view class='goodsdetail'>
										<view class='jrsx_img'>
											<u-lazy-load :is-effect="false" class="goods-icon" height="100%" :image="itemgg.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
										</view>
									</view>
								</view>
							</block>
						</view>
					</scroll-view>
					<view class="zheceng"></view>
				</view> -->
				</view>
				<!-- #ifdef H5 || WEB -->
			</match-media>
			<!-- #endif -->
			<!-- H5END -->

			<!-- PC游戏历史 -->
			<!-- #ifndef APP-PLUS -->
			<match-media :min-width="800">
				<view class="pc_all" v-if="GameHistory.length > 0">
					<!-- <view class="zheceng2"></view> -->
					<view class="banshi2">
						<view class="swiper-container3">
							<view class="games_list_wrap">
								<view class="games_list_title">
									<view class="list_title">
										<u-icon name="clock-fill" size="42" color="#566488"></u-icon>
										<view>{{$t('GameHistory')}}</view>
									</view>
									<view class="caozuo_btn">
										<view class="gengduo" @click="TolishiLog()">
											{{$t('ViewAll')}}<span>({{GameHistory.length || 0}})</span></view>
										<view class="swiper-button-prev-zzy"><u-icon name="arrow-left"
												color="#566488"></u-icon></view>
										<view class="swiper-button-next-zzy"><u-icon name="arrow-right"
												color="#566488"></u-icon></view>
									</view>
								</view>
							</view>
							<view class="swiper-wrapper">
								<view v-for="(itemuu,indexuu) in GameHistory" :key="indexuu" class="swiper-slide">
									<u-lazy-load :is-effect="false" class="goods-icon" height="100%"
										:image="itemuu.path" border-radius="28" :loading-img="loadingImg"
										:error-img="errorImg"
										@click="lookMask(itemuu,itemuu.gameCode+indexuu)"></u-lazy-load>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="zheceng"></view> -->
				</view>
			</match-media>
			<!-- #endif -->























			<!-- H5热门游戏 -->
			<!--有的游戏没达到2行6个所以少于6个的就显示一行-->
			<!-- #ifdef H5 || WEB -->
			<match-media :max-width="800">
				<!-- #endif -->
				<view v-if="GameHotList.length != 0">
					<view class="games_list_wrap">
						<view class="games_list_title">
							<view class="list_title">
								<u-icon name="thumb-up-fill" size="42" color="#566488"></u-icon>
								<view>{{$t('HotGames')}}</view>
								<span>({{GameHotList.length || 0}})</span>
							</view>
							<view class="caozuo_btn">
								<view class="gengduo" @click="lookAll()">{{$t('ViewAll')}}<u-icon name="arrow-right"
										color="#2283f6"></u-icon></view>
							</view>
						</view>
					</view>
					<view class='rec_bottom' style="margin-bottom: 30px;"> <!--  v-if="GameHotList.length < 12" -->
						<!-- <view class="zheceng2"></view> -->
						<view class="shopTuijian">
							<scroll-view class="uni-swiper-tab" scroll-x>
								<view class="scrollx_items" v-for="(valgg,indexgg) in GameHotList" :key="indexgg">
									<view class='jrsx_item2'>
										<view class='goodsdetail'>
											<view class='jrsx_img' @click="lookMask(valgg,valgg.gameCode+indexgg)">
												<u-lazy-load :is-effect="false" class="goods-icon" height="100%"
													:image="valgg.path" border-radius="18" :loading-img="loadingImg"
													:error-img="errorImg"></u-lazy-load>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<!-- <view class="zheceng"></view> -->
					</view>
					<!-- <view class="all"  style="margin-bottom: 30px;" v-else>
					<scroll-view class="nav-bar" scroll-x @scroll="scroll" :show-scrollbar="true">
						<view class="nav-bar-wrap">
							<block v-for="(itemgg,indexgg) in GameHotList" :key="indexgg">
								<view class="nav-bar-item" @click="lookMask(itemgg,itemgg.gameCode+indexgg)" :id="itemgg.id">
									<view class='goodsdetail'>
										<view class='jrsx_img'>
											<u-lazy-load :is-effect="false" class="goods-icon" height="100%" :image="itemgg.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
										</view>
									</view>
								</view>
							</block>
						</view>
					</scroll-view>
					<view class="zheceng"></view>
				</view> -->
				</view>
				<!-- #ifdef H5 || WEB -->
			</match-media>
			<!-- #endif -->
			<!-- H5END -->

			<!-- PC热门游戏 -->
			<!-- #ifndef APP-PLUS -->
			<match-media :min-width="800">
				<view class="pc_all" v-if="GameHotList.length > 0">
					<!-- <view class="zheceng2"></view> -->
					<view class="banshi2">
						<view class="swiper-container3">
							<view class="games_list_wrap">
								<view class="games_list_title">
									<view class="list_title">
										<u-icon name="thumb-up-fill" size="42" color="#566488"></u-icon>
										<view>{{$t('HotGames')}}</view>
									</view>
									<view class="caozuo_btn">
										<view class="gengduo" @click="lookAll()">
											{{$t('ViewAll')}}<span>({{GameHotList.length || 0}})</span></view>
										<view class="swiper-button-prev-zzy"><u-icon name="arrow-left"
												color="#566488"></u-icon></view>
										<view class="swiper-button-next-zzy"><u-icon name="arrow-right"
												color="#566488"></u-icon></view>
									</view>
								</view>
							</view>
							<view class="swiper-wrapper">
								<view v-for="(itemuu,indexuu) in GameHotList" :key="indexuu" class="swiper-slide">
									<u-lazy-load :is-effect="false" class="goods-icon" height="100%"
										:image="itemuu.path" border-radius="28" :loading-img="loadingImg"
										:error-img="errorImg"
										@click="lookMask(itemuu,itemuu.gameCode+indexuu)"></u-lazy-load>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="zheceng"></view> -->
				</view>
			</match-media>
			<!-- #endif -->



























			<view v-for="(item,index) in categoryGames" :key="index" v-if="item.games.length != 0">

				<!-- 显示充值礼包 -->
				<view v-if="index === 3">

					<view v-if="firstPay.switchStatus && secondPay.switchStatus && thirdPay.switchStatus">
						<view class="gundong_box_wrap"
							v-if="payCount < 3 && (firstPay.countdown > 0 || secondPay.countdown > 0 || thirdPay.countdown > 0)">
							<view class="gdbox_title">
								<image src="/static/Bonuslogin/02.png" mode="widthFix"></image>
								<text>{{$t('NEWBonusPageB.WelCome')}}</text>
							</view>
							<view class="gundong_swpier">
								<scroll-view :scroll-x="true" class="scrollview-box">
									<!--首充-->
									<view class="scroll_item_box">

										<view class="scroll_item_box_item">

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
														font-size="24"></u-count-down>
												</view>
												<!--可参与(高亮按钮)-->
												<view class="zhuceBtn"
													v-if="firstPay.status==0 && firstPay.countdown>0 && payCount == 0"
													@click="ToDeposit()"><span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
												<!--不可参与(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="firstPay.status==0 && firstPay.countdown==0 && payCount == 0">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
												<!--参与未达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="firstPay.status==0 && payCount >= 1">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
												<!--参与已达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="firstPay.status==2 && payCount >= 1">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
												<view class="zhuceBtn scroll_item_box_opacity" v-else>
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
											</view>
										</view>
									</view>

									<!--二充-->
									<view class="scroll_item_box">
										<view class="scroll_item_box_item">
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
														separator-color="#627a98" font-size="24"></u-count-down></view>
												<view class="zhuceBtn" @click="ToDeposit()">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
											</view>
											<!--不可参与(置灰按钮隐藏倒计时)-->
											<view class="item_4"
												v-else-if="secondPay.status==0 && secondPay.countdown==0 && payCount <= 1">
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
									</view>

									<!--三充-->
									<view class="scroll_item_box">
										<view class="scroll_item_box_item">
											<view class="gantanhao">
												<image @click="DepositBonus_Popup(thirdPay)"
													src="/static/Bonuslogin/i.png">
												</image>
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
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
												<!--参与未达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="thirdPay.status==0 && payCount > 2">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
												<!--参与已达标(置灰按钮)-->
												<view class="zhuceBtn scroll_item_box_opacity"
													v-else-if="thirdPay.status==2 && payCount > 2">
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
												<view class="zhuceBtn scroll_item_box_opacity" v-else>
													<span>{{$t('NEWBonusPageB.DepositBTN')}}</span>
												</view>
											</view>
										</view>
									</view>
								</scroll-view>
							</view>
						</view>
					</view>
				</view>
































				<!-- H5 -->
				<!--有的游戏没达到2行6个所以少于6个的就显示一行-->
				<!-- #ifdef H5 || WEB -->
				<match-media :max-width="800">
					<!-- #endif -->
					<view class="games_list_wrap"><!--  :style="[{marginTop:(index==0?'14px':'')}]"  -->
						<view class="games_list_title">
							<view class="list_title">
								<image class="title_icon2" :src="item.path" mode="widthFix"></image>
								<view v-if="item.name=='Lobby'">{{$t('Lobby')}}</view>
								<view v-if="item.name=='Slots'">{{$t('Slots')}}</view>
								<view v-if="item.name=='Fishing'">{{$t('Fishing')}}</view>
								<view v-if="item.name=='Live'">{{$t('LiveCasino')}}</view>
								<view v-if="item.name=='Sports'">{{$t('Sports')}}</view>
								<view v-if="item.name=='Cards'">{{$t('Cards')}}</view>
								<view v-if="item.name=='Mini'">{{$t('MiniGames')}}</view>
								<view v-if="item.name=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
								<view v-if="item.name=='Poker'">{{$t('ADDnew.Poker')}}</view>
								<view v-if="item.name=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
								<view v-if="item.name=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
								<span>({{QiuHe(item)}})</span>
							</view>
							<view class="caozuo_btn">
								<view class="gengduo" @click="toList(item,index+1)">{{$t('ViewAll')}}<u-icon
										name="arrow-right" color="#2283f6"></u-icon></view>
							</view>
						</view>
					</view>
					<view class='rec_bottom'><!-- v-if="item.games.length < 12"-->
						<!-- <view class="zheceng2"></view> -->
						<view class="shopTuijian">
							<scroll-view class="uni-swiper-tab" scroll-x>
								<view class="scrollx_items" v-for="(val,indexb) in item.games" :key="indexb">
									<view class='jrsx_item2'>
										<view class='goodsdetail'>
											<view class='jrsx_img' @click="lookMask(val,val.gameCode+indexb)">
												<!-- <image :src="val.path" class='jrsx_picture_home' mode="widthFix"></image> -->
												<u-lazy-load :is-effect="false" class="goods-icon" height="100%"
													:image="val.path" border-radius="18" :loading-img="loadingImg"
													:error-img="errorImg"></u-lazy-load>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<!-- <view class="zheceng"></view> -->
					</view>
					<!-- <view class="all" v-else>
						<scroll-view class="nav-bar" scroll-x @scroll="scroll" :show-scrollbar="true">
							<view class="nav-bar-wrap">
								<block v-for="(itembb,indexbb) in item.games" :key="indexbb">
									<view class="nav-bar-item" @click="lookMask(itembb,itembb.gameCode+indexbb)" :id="itembb.id">
										<view class='goodsdetail'>
											<view class='jrsx_img'>
												<u-lazy-load :is-effect="false" class="goods-icon" height="100%" :image="itembb.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
											</view>
										</view>
									</view>
								</block>
							</view>
						</scroll-view>
						<view class="zheceng"></view>
					</view> -->
					<!-- #ifdef H5 || WEB -->
				</match-media>
				<!-- #endif -->
				<!-- H5 -->






























				<!-- PC -->
				<!-- #ifndef APP-PLUS -->
				<match-media :min-width="800">
					<view class="pc_all">
						<!-- <view class="zheceng2"></view> -->
						<view class="banshi2 games-list">
							<view class="swiper-container2">
								<view class="games_list_wrap" :style="[{marginTop:(index==0?'22px':'')}]"><!--   -->
									<view class="games_list_title">
										<view class="list_title">
											<image class="title_icon2" :src="item.path" mode="widthFix"></image>
											<view v-if="item.name=='Lobby'">{{$t('Lobby')}}</view>
											<view v-if="item.name=='Slots'">{{$t('Slots')}}</view>
											<view v-if="item.name=='Fishing'">{{$t('Fishing')}}</view>
											<view v-if="item.name=='Live'">{{$t('LiveCasino')}}</view>
											<view v-if="item.name=='Sports'">{{$t('Sports')}}</view>
											<view v-if="item.name=='Cards'">{{$t('Cards')}}</view>
											<view v-if="item.name=='Mini'">{{$t('MiniGames')}}</view>
											<view v-if="item.name=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
											<view v-if="item.name=='Poker'">{{$t('ADDnew.Poker')}}</view>
											<view v-if="item.name=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
											<view v-if="item.name=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
										</view>
										<view class="caozuo_btn">
											<view class="gengduo" @click="toList(item,index+1)">
												{{$t('ViewAll')}}<span>({{QiuHe(item)}})</span></view>
											<view class="swiper-button-prev-zzy"><u-icon name="arrow-left"
													color="#566488"></u-icon></view>
											<view class="swiper-button-next-zzy"><u-icon name="arrow-right"
													color="#566488"></u-icon></view>
										</view>
									</view>
								</view>
								<view class="swiper-wrapper">
									<view v-for="(itembb,indexbb) in item.games" :key="indexbb" class="swiper-slide">
										<!-- <image class="yxtubiao" :src="itembb.path" mode="widthFix" @click="lookMask(itembb,itembb.gameCode+indexbb)"></image> -->
										<u-lazy-load :is-effect="false" class="goods-icon" height="100%"
											:image="itembb.path" border-radius="28" :loading-img="loadingImg"
											:error-img="errorImg"
											@click="lookMask(itembb,itembb.gameCode+indexbb)"></u-lazy-load>
										<view class="order">{{indexbb + 1}}</view>
										<view class="statistics"><span class="number">{{randomNumber()}}</span><span
												class="slug">{{ $t('Qiaozhi.playing') }}</span></view>
									</view>
								</view>
							</view>
						</view>
						<!-- <view class="zheceng"></view> -->
					</view>
				</match-media>
				<!-- #endif -->
			</view>


			<!-- PC单独显示供应商 -->
			<!-- #ifndef APP-PLUS -->
			<match-media :min-width="800">
				<view class="allgys_pc">
					<!-- <view class="zheceng2"></view> -->
					<view class="banshi2 game-providers">
						<view class="swiper-container2">
							<view class="games_list_wrap">
								<view class="games_list_title">
									<view class="list_title">
										<image class="title_icon" src="/static/image/home/icons8-pgjj.png"
											mode="scaleToFill"></image>
										<view>{{$t('GameProviders')}}</view>
									</view>
									<view class="caozuo_btn">
										<view class="gengduo" @click="toListFuwus()">{{$t('ViewAll')}}</view>
										<view class="swiper-button-prev-zzy"><u-icon name="arrow-left"
												color="#566488"></u-icon></view>
										<view class="swiper-button-next-zzy"><u-icon name="arrow-right"
												color="#566488"></u-icon></view>
									</view>
								</view>
							</view>
							<view class="swiper-wrapper">
								<view v-for="(itemk,indexk) in ProvidersList" :key="indexk" class="swiper-slide">
									<view class="image-wrapper">
										<image class="gystupian" :src="domains + '/vendorIcon/' + itemk.name + '.png'"
											mode="widthFix" @click="togamesGongying(itemk)"></image>
									</view>
									<view class="games-count">
										<span class="slug">{{ $t('Qiaozhi.Games') }}</span><span class="number">{{randomNumber()}}</span>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</match-media>
			<!-- #endif -->


			<!-- H5单独显示供应商 -->
			<!-- #ifdef H5 || WEB -->
			<match-media :max-width="800">
				<!-- #endif -->
				<view class="games_list_wrap">
					<view class="games_list_title">
						<view class="list_title">
							<image class="title_icon" src="/static/image/home/icons8-pgjj.png" mode="scaleToFill">
							</image>
							<view>{{$t('GameProviders')}}</view>
						</view>
						<view class="caozuo_btn">
							<view class="gengduo" @click="toListFuwus()">{{$t('ViewAll')}}<u-icon name="arrow-right"
									color="#2283f6"></u-icon></view>
						</view>
					</view>
				</view>
				<view class="allgys">
					<!-- <view class="zheceng2"></view> -->
					<scroll-view class="nav-bar_gys" scroll-x @scroll="scroll">
						<view class="nav-bar-wrap_gys">
							<block v-for="(itemk,indexk) in ProvidersList" :key="indexk">
								<view class="nav-bar-item_gys" @click="togamesGongying(itemk)">
									<image :src="domains + '/vendorIcon/' + itemk.name + '.png'"
										class='jrsx_picture2_gys'></image>
								</view>
							</block>
						</view>
					</scroll-view>
					<!-- <view class="zheceng"></view> -->
				</view>
				<!-- #ifdef H5 || WEB -->
			</match-media>
			<!-- #endif -->


			<!-- Qiaozhi Component -->
			<match-media :min-width="800">
		    <view class="game-selection">
				<view class="container">
					<uni-row class="row justify-content-center pt-15 pb-15 mb-10">
						<view class="wrapper">
						<h1 class="title">{{$t('Qiaozhi.Games-Selection-Title')}}<span class="title-slug">{{$t('Qiaozhi.Game')}}</span>?</h1>
						<view class="animated-mocks">
							<image
                            v-for="(mock, index) in [
                                '/static/image/game-selection-helper/animated-mocks/Chip.png',
                                '/static/image/game-selection-helper/animated-mocks/Cards.png',
                                '/static/image/game-selection-helper/animated-mocks/Cube.png',
                                '/static/image/game-selection-helper/animated-mocks/Monster.png',
                                '/static/image/game-selection-helper/animated-mocks/Cherries.png',
                                '/static/image/game-selection-helper/animated-mocks/Bomb.png',
                                '/static/image/game-selection-helper/animated-mocks/Ball.png'
                            ]"
                            :key="index"
                            :src="mock"
                            :class="`mockup item-${index + 1}`"
                            mode="widthFix"
                        ></image>
						</view>
						<view class="reel">
						<view class="slot item-1">
							<uni-col :xs="24" :sm="7" :md="7" :lg="7">
							<view class="col">
								<image class="item" :src="'/static/image/game-selection-helper/Stairs.png'" mode="widthFix"></image>
							</view>
						</uni-col>
						<uni-col :xs="24" :sm="7" :md="7" :lg="7">
							<view class="col">
								<image class="item" :src="'/static/image/game-selection-helper/Instant-Roulette.png'" mode="widthFix"></image>
							</view>
						</uni-col>
						<uni-col :xs="24" :sm="7" :md="7" :lg="7">
							<view class="col">
								<image class="item" :src="'/static/image/game-selection-helper/Speed-Baccarat.png'" mode="widthFix"></image>
							</view>
						</uni-col>
						</view>
						<view class="slot item-2">
							<uni-col :xs="24" :sm="7" :md="7" :lg="7">
							<view class="col">
								<image class="item" :src="'/static/image/game-selection-helper/Stairs.png'" mode="widthFix"></image>
							</view>
						</uni-col>
						<uni-col :xs="24" :sm="7" :md="7" :lg="7">
							<view class="col">
								<image class="item" :src="'/static/image/game-selection-helper/Instant-Roulette.png'" mode="widthFix"></image>
							</view>
						</uni-col>
						<uni-col :xs="24" :sm="7" :md="7" :lg="7">
							<view class="col">
								<image class="item" :src="'/static/image/game-selection-helper/Speed-Baccarat.png'" mode="widthFix"></image>
							</view>
						</uni-col>
						</view>
						<view class="slot item-3">
							<uni-col :xs="24" :sm="7" :md="7" :lg="7">
							<view class="col">
								<image class="item" :src="'/static/image/game-selection-helper/Stairs.png'" mode="widthFix"></image>
							</view>
						</uni-col>
						<uni-col :xs="24" :sm="7" :md="7" :lg="7">
							<view class="col">
								<image class="item" :src="'/static/image/game-selection-helper/Instant-Roulette.png'" mode="widthFix"></image>
							</view>
						</uni-col>
						<uni-col :xs="24" :sm="7" :md="7" :lg="7">
							<view class="col">
								<image class="item" :src="'/static/image/game-selection-helper/Speed-Baccarat.png'" mode="widthFix"></image>
							</view>
						</uni-col>
						</view>
					    </view>
						</view>
					</uni-row>
				</view>
				</view>
			</match-media>
			<!-- Qiaozhi Component -->


		</view>
		<view class="popupPlay">
			<u-popup v-model="PlayGameshow" mode="bottom" border-radius="30" :closeable="false"
				:safe-area-inset-bottom="true">
				<view class="play_game_box">
					<view class="game_info_wrap">
						<image class="gamene_img" :src="playGameData.path" mode="widthFix"></image>
						<view class="game_info">
							<view class="game_nam">{{playGameData.gameName}}</view>
							<view class="tigs">
								{{GetGamesType(playGameData.vendor)}}
								<view v-if="isLogin == 1" style="margin-left: auto;"
									@click="cLike(playGameData.gameCode,playGameData.favorite);playGameData.favorite =! playGameData.favorite">
									<view class="star_icon" v-if="playGameData.favorite == true">
										<u-icon name="star-fill"></u-icon>
									</view>
									<view class="star_icon" v-else>
										<u-icon name="star"></u-icon>
									</view>
								</view>
								<view style="margin-left: auto;" v-else>
									<view class="star_icon">
										<u-icon name="star" @click="SignInBtn()"></u-icon>
									</view>
								</view>
							</view>

							<view class="huobiInfo" v-if="is_SelectCurrencyData">
								<view>{{$t('njy')}}
									<span v-if="platform == 8">USD</span>
									<span v-else-if="platform == 1 || platform == 5 || platform == 6">CNY</span>
									<span v-else-if="platform == 10 || platform == 11">USDT</span>
									<span v-else>PHP</span>
									{{$t('jxyx')}}
								</view>
								<view>1{{SelectCurrencyData.abbr}} = {{SelectCurrencyData.currency_rate}}

									<span v-if="platform == 8">USD</span>
									<span v-else-if="platform == 1 || platform == 5 || platform == 6">CNY</span>
									<span v-else-if="platform == 10 || platform == 11">USDT</span>
									<span v-else>PHP</span>

								</view>
							</view>

						</view>
					</view>
					<view class="popupPay_btn_box">
						<view class="quxiao">
							<span @click="PlayGameshow = false">{{$t('NewlyAdded.Cancel')}}</span>
						</view>
						<view class="kaishi">
							<view class="mask_btn" v-if="isLogin == 1">
								<u-button type="primary" :disabled="disabledPlay" :loading="playloading" shape="circle"
									@click.stop="OpenGames(playGameData)">
									<u-icon name="play-right-fill" size="26" color="#fff"></u-icon>{{$t('PlayS')}}
								</u-button>
							</view>
							<view class="mask_btn" v-else>
								<u-button type="primary" shape="circle"
									@click.stop="SignInBtn()">{{$t('regiserPopup.signIn')}}</u-button>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>


		<!-- 登录弹窗 -->
		<signInPopup ref="signInShow"></signInPopup>

		<!--充值和提款-->
		<pc-Deposit ref="openPCdeposit"></pc-Deposit>

	</view>
</template>

<script>
	import Swiper from 'swiper'; // 注意引入的是Swiper
    import 'swiper/swiper-bundle.css'; // 注意这里的引入
	export default {
		name: "home-games-list",
		props: {
			HotBaoJiangList: {
				type: Array,
				default: []
			},
			Hoemloadingtrue: {
				type: Boolean,
				default: true
			},
			categoryGames: {
				type: Array,
				default: []
			},
			GameHistory: {
				type: Array,
				default: []
			},
			GameHotList: {
				type: Array,
				default: []
			},
			Proid: {
				type: [String, Number],
				default: ""
			}
		},
		data() {
			return {
				platform: this.PID,
				
				
				loadingImg: '/static/logo/' + this.PID + '_logo.png',
				errorImg: '/static/logo/' + this.PID + '_logo.png',


				playGameData: {},
				PlayGameshow: false,
				//Hoemloadingtrue: true,
				domains: '',
				ProvidersList: [],
				playloading: false,
				loadingtrue: true,
				
				currentIndex: 0,

				swiper2: null,
				swiper3: null,

				vendorsList: [],

				dangqiangIdx: 0,
				isLogin: 0,

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
				
				disabledPlay: false,
				
				SelectCurrencyData: {},
				is_SelectCurrencyData: false

			};
		},
		computed: {

		},
		watch: {

		},
		created() {
			
		},
		beforeUpdate() {
			//setTimeout(()=>{
			//	this.Hoemloadingtrue = false
			//},800)
		},
		mounted() {
			
			let token = uni.getStorageSync("token")
			if (!token) {
				this.isLogin = 0
			} else {
				this.isLogin = 1
			}
			
			this.getChangShang();
			this.getVlist();
			this.GetWelcomePackage();
		},
		methods: {
		randomNumber() {
          return Math.floor(100 + Math.random() * 900);
        },
			getSwiper2() {
				let that = this
				that.swiper2 = new Swiper(".swiper-container2", {
					loop: false, // 无缝
					slidesPerGroup: 6,
					loopFillGroupWithBlank: true,
					autoHeight: false, //高度随内容变化
					paginationClickable: true,
					slidesPerView: 1, // 一组三个
					spaceBetween: 10, // 间隔
					uniqueNavElements: true, //当存在多个同名导航元素时，设置导航元素是否唯一。
					preloadImages: false, //Swiper会强制加载所有图片后才初始化。
					breakpoints: {
						320: { //当屏幕宽度大于等于320
							slidesPerView: 3.5,
							spaceBetween: 10
						},
						768: { //当屏幕宽度大于等于768 
							slidesPerView: 6,
							spaceBetween: 10
						},
						1280: { //当屏幕宽度大于等于1280
							slidesPerView: 8,
							spaceBetween: 10
						}
					},
					// 如果需要前进后退按钮
					navigation: {
						nextEl: '.swiper-button-next-zzy',
						prevEl: '.swiper-button-prev-zzy',
						disabledClass: 'my-button-disabled',
					},
					// 在大屏上写轮播图，在摁下F11或者放大窗口之后，会丢失pagination，条数会变化，加上这两行，重新渲染swiper
					// 窗口变化,重新init,针对F11全屏和放大缩小,必须加
					observer: true,
					observeParents: true,
					on: {
						imagesReady: function() {
							alert('图片加载完成了');
						},
					},
				});
			},
			
			
			
			getSwiper3(){
				let that = this
				that.swiper3 = new Swiper(".swiper-container3", {
					loop: false, // 无缝
					slidesPerGroup: 6,
					loopFillGroupWithBlank: true,
					autoHeight: false, //高度随内容变化
					paginationClickable: true,
					slidesPerView: 1, // 一组三个
					spaceBetween: 10, // 间隔
					uniqueNavElements: true, //当存在多个同名导航元素时，设置导航元素是否唯一。
					preloadImages: false, //Swiper会强制加载所有图片后才初始化。
					breakpoints: {
						320: { //当屏幕宽度大于等于320
							slidesPerView: 3.5,
							spaceBetween: 10
						},
						768: { //当屏幕宽度大于等于768 
							slidesPerView: 6,
							spaceBetween: 10
						},
						1280: { //当屏幕宽度大于等于1280
							slidesPerView: 8,
							spaceBetween: 10
						}
					},
					// 如果需要前进后退按钮
					navigation: {
						nextEl: '.swiper-button-next-zzy',
						prevEl: '.swiper-button-prev-zzy',
						disabledClass: 'my-button-disabled',
					},
					// 在大屏上写轮播图，在摁下F11或者放大窗口之后，会丢失pagination，条数会变化，加上这两行，重新渲染swiper
					// 窗口变化,重新init,针对F11全屏和放大缩小,必须加
					observer: true,
					observeParents: true,
					on: {
						imagesReady: function() {
							alert('图片加载完成了');
						},
					},
				});
			},













			
			QiuHe(item) {
				let zong = 0
				item.vendors.forEach((items, indexs) => {
					zong += items.gameCount
				});
				return zong
			},
			//首充倒计时结束监听
			firstPayExtraCountdownend(e) {
				//如果加成倒计时结束后 隐藏掉加成模块 显示原有模块
				this.showFirstPayJiaCheng = false
				setTimeout(() => {
					this.GetWelcomePackage()
				}, 200)
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
					//console.log('MaxRate', MaxRate)

					//console.log('最大加成', max1)

					//首充提示
					// setTimeout(()=>{
					// 	if(res.data.firstPay.extraCountdown && res.data.firstPay.extraCountdown != 0 && that.payCount == 0 && res.data.firstPay.switchStatus && res.data.secondPay.switchStatus && res.data.thirdPay.switchStatus){
					// 		that.showDepositBonus = true
					// 		that.$refs.Openshows.GetWelcomePackage()
					// 	} else {
					// 		//console.log('加成引导不显示')
					// 		that.showDepositBonus = false
					// 	}
					// },1500)

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
































			
			scroll(event) {
				
			},
			async getVlist() {
				let that = this
				const ress = await that.$u.post('/game/category', {});
				that.domains = ress.data.domain;
				that.ProvidersList = ress.data.vendors
			},
			
			
			
			
			
			
			
			
			
			JiSuanHuiLv(data){
				//金额显示 = 游戏币×汇率
				let price = (1 * data.currency_rate).toFixed(2);
				return price
			},
			lookMask(item, idx) {
				//console.log(item, idx)
				
				let that = this
				//看看本地是否存在了选择货币展示
				let SelectCurrencys = uni.getStorageSync("SelectCurrency");
				if(!SelectCurrencys){
					//console.log('本地不存在已选的货币',SelectCurrencys);
					that.SelectCurrencyData = {}
					that.is_SelectCurrencyData = false
				} else {
					//console.log('本地已存在已选的货币',SelectCurrencys);
					that.SelectCurrencyData = SelectCurrencys
					that.is_SelectCurrencyData = true
				}
				
				
				
				
				
				this.PlayGameshow = true
				this.playGameData = item
				
				let token = uni.getStorageSync("token")
				if (!token) {
					this.isLogin = 0
				} else {
					this.isLogin = 1
					
					//判断这个用户是否禁止游戏不让玩
					const noPlay = this.jisuanWeizhi();
					console.log('是否禁玩',noPlay);
					if(noPlay == 1){
						this.disabledPlay = true
					} else {
						this.disabledPlay = false
					}
					
				}
			},
			//检测禁止游戏功能
			jisuanWeizhi(){
				const userInfo = uni.getStorageSync("userinfo");
				const num = userInfo.managerFlag;
				const bitPosition = 4;
				const fag = this.checkBit(num, bitPosition) ? '1' : '0'; //1禁止 0不禁止
				return fag
			},
			checkBit(num, bitPosition) {
			    const mask = 1 << bitPosition;
			    return (num & mask) !== 0;
			},
			
			
			
			
			
			
			JumpNewUrl(val){
				let that = this
				let Device_type = uni.getStorageSync('DeviceType');
				let client_Type = ''
				if (Device_type == "pc") {
					client_Type = 'html5-desktop'
				} else {
					client_Type = 'html5'
				}
				if (val.API == "tcg") {
					this.$u.post('/enter-tcg', {
						gameCode: val.gameCode,
						clientType: client_Type
					}).then(res => {
						console.log('AG',res.data)
						let gameUrl = res.data.gameUrl
						that.playloading = false
						this.PlayGameshow = false
						window.open(gameUrl, '_self');
					}).catch(err => {
						that.playloading = false
					})
				} else if (val.API == "huidu") {
					
				}
			},
			OpenGames(val) {
				//console.log(val)
				let that = this

				that.playloading = true
				
				// #ifdef H5 || WEB
				//IOS客户端独有，判断是否是AG电子游戏如果是就跳转新标签打开
				//category3是电子游戏分类
				let systemInfo = uni.getSystemInfoSync();
				if((systemInfo.platform == "ios"||systemInfo.platform == "macos") && systemInfo.browserName == "safari"){
					let Manufacturer = that.GetGamesType(val.vendor);
					if(Manufacturer == "AG" && val.category == 3){
						that.JumpNewUrl(val)
						return false
					}
				}
				// #endif
				
				//setTimeout(() => {

					if (val.API == "tcg") {
						let Device_type = uni.getStorageSync('DeviceType');
						let client_Type = ''
						if(Device_type == "pc"){
							client_Type = 'html5-desktop'
						} else {
							client_Type = 'html5'
						}
						this.$u.post('/enter-tcg', {
							gameCode: val.gameCode,
							clientType: client_Type
						}).then(res => {
							let gameUrl = res.data.gameUrl

							//把游戏地址写入缓存便于Webview读取打开
							uni.setStorageSync("PlayGamesUrl", gameUrl);
							
							//导航栏金币显示游戏中
							uni.$emit('OpeninGames', 1);
							
							that.playloading = false
							this.PlayGameshow = false

							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if (val.API == "one" || val.API == "oneApi") {
						this.$u.post('/enter-one', {
							gameCode: val.gameCode
						}).then(res => {
							let gameUrl = res.data.gameUrl
							//把游戏地址写入缓存便于Webview读取打开
							uni.setStorageSync("PlayGamesUrl", gameUrl)
							
							//导航栏金币显示游戏中
							uni.$emit('OpeninGames', 1);
							
							that.playloading = false
							this.PlayGameshow = false

							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if(val.API == "huidu") {
						this.$u.post('/enter-huidu', {
							gameCode: val.gameCode
						}).then(res => {
							let gameUrl = res.data.gameUrl
							//把游戏地址写入缓存便于Webview读取打开
							uni.setStorageSync("PlayGamesUrl", gameUrl)
							
							//导航栏金币显示游戏中
							uni.$emit('OpeninGames', 1);
							
							that.playloading = false
							this.PlayGameshow = false
							
							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if(val.API == "tgfun"){
						this.$u.post('/enter-tgfun', {
							gameCode: val.gameCode
						}).then(res => {
							let gameUrl = res.data.gameUrl
							//把游戏地址写入缓存便于Webview读取打开
							uni.setStorageSync("PlayGamesUrl", gameUrl)
							
							//导航栏金币显示游戏中
							uni.$emit('OpeninGames', 1);
							
							that.playloading = false
							this.PlayGameshow = false
						
							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if(val.API == "ky"){
						this.$u.post('/enter-ky', {
							gameCode: val.gameCode
						}).then(res => {
							let gameUrl = res.data.gameUrl
							//把游戏地址写入缓存便于Webview读取打开
							uni.setStorageSync("PlayGamesUrl", gameUrl)
							
							//导航栏金币显示游戏中
							uni.$emit('OpeninGames', 1);
							
							that.playloading = false
							this.PlayGameshow = false
						
							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if(val.API == "tcg2"){
						let Device_type = uni.getStorageSync('DeviceType');
						let client_Type = ''
						if (Device_type == "pc") {
							client_Type = 'html5-desktop'
						} else {
							client_Type = 'html5'
						}
						that.$u.post('/enter-tcg2', {
							gameCode: val.gameCode,
							clientType: client_Type
						}).then(res => {
							let gameUrl = res.data.gameUrl
							//把游戏地址写入缓存便于Webview读取打开
							uni.setStorageSync("PlayGamesUrl", gameUrl)
							
							//导航栏金币显示游戏中
							uni.$emit('OpeninGames', 1);
							
							that.playloading = false
							this.PlayGameshow = false
						
							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else if(val.API == "via"){
						this.$u.post('/enter-via', {
							gameCode: val.gameCode
						}).then(res => {
							let gameUrl = res.data.gameUrl
							//把游戏地址写入缓存便于Webview读取打开
							uni.setStorageSync("PlayGamesUrl", gameUrl)
							
							//导航栏金币显示游戏中
							uni.$emit('OpeninGames', 1);
							
							that.playloading = false
							this.PlayGameshow = false
						
							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					} else {
						this.$u.post('/enter-wl', {
							gameCode: val.gameCode
						}).then(res => {
							let gameUrl = res.data.gameUrl
							//把游戏地址写入缓存便于Webview读取打开
							uni.setStorageSync("PlayGamesUrl", gameUrl)
							
							//导航栏金币显示游戏中
							uni.$emit('OpeninGames', 1);
							
							that.playloading = false
							this.PlayGameshow = false

							uni.navigateTo({
								url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
							})
						}).catch(err => {
							that.playloading = false
						})
					}

					// #ifdef H5
					//友盟埋点事件
					const _czc = _czc || [];
					window._czc.push(['_trackEvent', '打开', 'GAMEOPEN']);
					// #endif


				//}, 1000)
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			togamesGongying(item) {
				//console.log(item)
				uni.navigateTo({
					url: '/pages/supplierGameList/supplierGameList?id=' + item.id + '&title=' + item.name
				})
			},
			toListFuwus() {
				uni.navigateTo({
					url: '/pages/venDorsAll/venDorsAll'
				})
			},
			toList(item, index) {
				console.log('查看全部',item, index)

				//把分类id写入缓存 防止刷新页面后不存在分类id
				uni.setStorageSync("isCurCInfo", item)
				uni.navigateTo({
					url: '/pages/classify/classify?Leixing=1' + '&index=' + 0
				})

				// this.$emit('JumpTap', index)

				// uni.pageScrollTo({
				// 	scrollTop: 0,
				// 	duration: 150
				// })


				// #ifdef H5
				//友盟埋点事件
				const _czc = _czc || [];
				window._czc.push(['_trackEvent', '点击查看全部', item.name]);
				// #endif
			},
			cLike(code_id, sss) {
				//console.log('是什么',code_id,sss)
				if (sss === true || sss === 1) {
					//取消收藏
					this.quxiaoClickStar(code_id)
				} else {
					//收藏
					this.ClickStar(code_id)
				}
			},
			ClickStar(item) {
				//////console.log(item)
				this.$u.post('/favorite', {
					gameCode: item, // String 是 游戏代码
					favorite: true // bool 是 收藏true 取消收藏false
				}).then(res => {})
			},
			quxiaoClickStar(item) {
				this.$u.post('/favorite', {
					gameCode: item, // String 是 游戏代码
					favorite: false // bool 是 收藏true 取消收藏false
				}).then(res => {})
			},
			SignInBtn() {
				this.$refs.signInShow.openPopup()
			},
			//先获取厂商列表，Map对应的厂商name
			getChangShang() {
				let that = this
				that.$u.post('/game/category', {}).then(ress => {
					that.vendorsList = ress.data.vendors
				})
			},
			GetGamesType(proid) {
				let that = this
				let Vname = ''
				let NewProlist = that.vendorsList
				NewProlist.forEach((item, index) => {
					if (item.id == proid) {
						Vname = item.name
					}
				});
				return Vname
			},
			TolishiLog(){
				uni.navigateTo({
					url: '/pages/MyhistoryList/MyhistoryList'
				})
			},
			lookAll() {
				let data = {
					id: 0,
					name: "Hot",
					path: "/static/image/huore.png"
				}
			
				//把分类id写入缓存 防止刷新页面后不存在分类id
				uni.setStorageSync("isCurCInfo", data)
				uni.navigateTo({
					url: '/pages/classify/classify?Leixing=3' + '&index=' + 0
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	//@import 'swiper/swiper-bundle.css';
	.swiper-button-prev-zzy {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12rpx;
		background-color: #1d2532;
		height: 50rpx;
		width: 50rpx;
		line-height: 50rpx;
		margin: 0 10rpx 0 20rpx;
		.u-icon {
			font-size: 26rpx;
		}
	}
	.swiper-button-prev-zzy:hover {
		background-color: #151c27;
	}

	.swiper-button-next-zzy {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12rpx;
		background-color: #1d2532;
		height: 50rpx;
		width: 50rpx;
		line-height: 50rpx;
		.u-icon {
			font-size: 26rpx;
		}
	}
	.swiper-button-next-zzy:hover {
		background-color: #151c27;
	}
	
	.my-button-disabled{
	  opacity: 0.2;
	}

	.banshi2 {
		width: 100%;
		height: 100%;
		//padding: 30rpx 0 0 0;

		.swiper-slide {
			position: relative;
			width: 100%;
			height: auto;
			padding: 0 0;
			background-repeat: no-repeat;
			background-size: contain;
			background-color: transparent;
			border-radius: 28rpx;

			.yxtubiao {
				width: 100%;
				height: 100%;
				border-radius: 28rpx;
				background-color: #1d2532;
				//background-image: url('/static/logo/6_logo.png');
				background-size: 100% 100%;
				background-position: center;
				cursor: pointer;
			}
			
			.gystupian {
				width: 100%;
				height: 100%;
				//max-height: 116rpx;
				border-radius: 28rpx;
				background-color: #1d2532;
				background-size: 100% 100%;
				background-position: center;
				cursor: pointer;
			}
		}
	}




	.item-box {
		padding: 10rpx;
		box-sizing: border-box;
	}

	.item {
		background-color: salmon;
		line-height: 80rpx;
		border-radius: 6rpx;
		font-size: 22rpx;
		text-align: center;
		font-weight: bold;
		color: #666;
		min-width: 194rpx;

		image {
			width: 100%;
		}
	}

	.nodata {
		text-align: center;
		height: 3000rpx;
		position: relative;

		.iconbox {
			position: absolute;
			top: 15%;
			left: 50%;
			transform: translate(-50%, -50%);

			view {
				margin-top: 14rpx;
				font-size: 24rpx;
				color: $font-all-color;
			}

			image {
				width: 250rpx;
				height: 140rpx;
			}
		}
	}

	.page_wrap {
		padding: 0 28rpx 28rpx 28rpx;
		background-color: $home-games-wrap-color !important;
	}

	.games_list_wrap {
		//margin-bottom: 24rpx;
		margin-top: 60rpx;
		background-color: $home-games-wrap-color !important;

		.games_list_title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.list_title {
				display: flex;
				align-items: center;
				overflow: hidden;
				
				.u-icon {
					margin-right: 10rpx;
				}

				view {
					font-weight: bold !important;
					color: $me-text-color;
					font-size: 34rpx;
				}

				.title_icon {
					width: 44rpx;
					height: 44rpx;
					margin-right: 10rpx;
					position: relative;
				}

				.title_icon2 {
					width: 44rpx;
					height: 44rpx;
					margin-right: 10rpx;
					position: relative;
				}

				span {
					margin-left: 10rpx;
					display: inline-block;
					border-radius: 200rpx;
					text-align: center;
					color: $home-gamelist-num-color;
					padding: 2rpx 4rpx;
					font-size: 28rpx;
				}
			}

			.caozuo_btn {
				display: flex;
				align-items: center;

				.gengduo {
					display: flex;
					align-items: center;
					color: #2283f6;
					font-size: 26rpx;
					cursor: pointer;

					image {
						width: 10px;
						height: 10px;
						margin-left: 4rpx;
					}

					span {
						margin-left: 4rpx;
						display: inline-block;
						border-radius: 200rpx;
						text-align: center;
						padding: 2rpx 0;
						font-size: 24rpx;
						font-weight: 600;
					}
				}
				.gengduo:hover {
					color: #55a3ff;
				}

				.left {
					color: #FEFEFE;
					border-radius: 200rpx 0 0 200rpx;
					border: 1px solid #2a3546;
					width: 82.22rpx;
					height: 63.19rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.right {
					color: #FEFEFE;
					border-radius: 0 200rpx 200rpx 0;
					border-top: 1px solid #2F4553;
					border-bottom: 1px solid #2F4553;
					border-right: 1px solid #2F4553;
					width: 82.22rpx;
					height: 63.19rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.rec_bottom {
		//margin-bottom: 48rpx;
		position: relative;

		.shopTuijian {
			padding: 20rpx 0 0 0;
		}

		.uni-swiper-tab {
			white-space: nowrap;
		}

		.scrollx_items {
			text-align: left;
			display: inline-block;
			width: 220rpx;
			box-sizing: border-box;

			/* #ifdef H5 */
			margin-right: 16rpx;
			/* #endif */

			/* #ifdef APP-PLUS */
			margin-right: 16rpx;
			/* #endif */

		}

		.scrollx_items:first-child {

			/* #ifdef H5 */
			margin-left: 0;
			/* #endif */

			/* #ifdef APP-PLUS */
			margin-left: 2px;
			/* #endif */
		}

		.scrollx_items:last-child {

			/* #ifdef H5 */
			margin-right: 5rpx;
			/* #endif */

			/* #ifdef APP-PLUS */
			margin-right: 5rpx;
			/* #endif */
		}
	}

	.jrsx_swiper {
		margin: 0 0 30rpx 0;
		height: 300rpx;
	}

	.isswiper-item {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.jrsx_item {
		flex: 1;
		//width: 33.333333%;
		margin: 0 7rpx;
		position: relative;
	}

	.jrsx_item2 {
		flex: 1;
		//width: 33.333333%;
		//margin: 0 7rpx;
		position: relative;
	}

	//.jrsx_item:first-child {
		//margin-left: 0;
	//}

	//.jrsx_item:last-child {
		//margin: 0;
	//}

	.zhezhao_mask {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 12rpx;
		z-index: 99;
		padding: 20rpx;
		white-space: normal;
		backdrop-filter: blur(1px);

		.zhezhao_mask_item {
			position: relative;
			height: 100%;

			.mask_title {
				//font-weight: bold;
				color: #FEFEFE;
				font-size: 24rpx;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.mask_subtitle {
				margin-top: 10rpx;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $font-all-color;
			}

			.mask_btn {
				position: absolute;
				bottom: 6rpx;
				left: 0;
				right: 0;
				margin: 0 auto;
				width: 80px;
				text-align: center;

				/deep/ uni-button:before {
					width: 14px !important;
					height: 14px !important;
				}

				/deep/ .u-btn--primary {
					font-size: 24rpx !important;
					height: 27px !important;
					line-height: 27px !important;
					padding: 0 4px !important;
				}

				/deep/ .u-size-default {
					font-size: 24rpx !important;
					height: 27px !important;
					line-height: 27px !important;
				}
			}
		}
	}

	.goodsdetail {
		width: 100%;
		//height: 300rpx;
	}

	.jrsx_img {
		cursor: pointer;
	}
	
	.goods-icon {
		cursor: pointer;
	}

	.jrsx_picture_home {
		width: 100%;
		height: 200rpx;
		overflow: hidden;
		border-radius: 28rpx 28rpx 28rpx 28rpx !important;
		background-color: #1d2532;
		background-image: url('/static/logo/6_logo.png');
		background-size: 100% 100%;
		background-position: center;
	}

	.jrsx_picture2 {
		width: 100%;
		height: 44px;
		overflow: hidden;
		border-radius: 12rpx;
		background-color: #1d2532;
	}

	.jrsx_title {
		padding: 0 10rpx;
		height: 66rpx;
		line-height: 66rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0 0 12rpx 12rpx;
		background-color: #1d2532;
		color: $font-all-color;

		.title {
			overflow: hidden;
			text-overflow: ellipsis;
			//white-space: nowrap;
			font-size: 26rpx;
		}

		.star_icon {
			margin-left: auto;
		}
	}

	.dots1 {
		width: 100%;
		float: left;
		display: flex;
		justify-content: center;
	}

	.dots1 .dot {
		margin: 0 8rpx;
		width: 14rpx;
		height: 14rpx;
		background: #000;
		border-radius: 8rpx;
		transition: all 0.6s;
		opacity: 0.5;
	}

	.dots1 .dot.active {
		width: 30rpx;
		background-image: linear-gradient(-90deg, #ff0c5d 0%, #f7292a 100%), linear-gradient(#fff, #fff);
		opacity: 1;
	}






	.zheceng {
		width: 100rpx;
		height: 98.5%;
		//background: linear-gradient(to right, #0d131c00 0, rgba(13, 19, 28, 0) 100px), linear-gradient(to left, #0d131cba 0, rgba(13, 19, 28, 0) 30px);
		background: linear-gradient(90.17deg, rgba(32, 6, 58, 0) 0%, #0d131c 100%);
		position: absolute;
		right: -1px;
		bottom: 0;
	}

	.zheceng2 {
		width: 100rpx;
		height: 98.5%;
		background: linear-gradient(-90.17deg, rgba(32, 6, 58, 0) 0%, #0d131cc2 100%);
		position: absolute;
		left: -1px;
		bottom: 0;
		z-index: 9;
	}





	.pc_all {
		position: relative;
		overflow: hidden;
	}





	.all {
		position: relative;
		height: 222px;
		overflow: hidden;
	}
	
	scroll-view {
		white-space: nowrap;
	}
	
	/* 去除滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
	}
	
	.nav-bar-wrap {
		display: flex;
		flex-flow: column wrap;
		height: 222px;
	}
	
	.nav-bar-item {
		width: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 22rpx;
		margin-right: 22rpx;
	}
	
	.nav-bar-item image {
		display: block;
		height: 220rpx;
		width: 100%;
		margin: 0;
		border-radius: 14rpx 14rpx 0 0;
	}
	
	.nav-bar-item text {
		border-radius: 0 0 14rpx 14rpx;
		width: 100%;
		padding: 14rpx 10rpx;
		text-align: center;
		line-height: 32rpx;
		font-size: 24rpx;
		background-color: #1d2532;
		color: $font-all-color;
		display: inline-block;
		white-space: nowrap; 
		width: 100%; 
		overflow: hidden;
		text-overflow:ellipsis;
	}
	
	.slider {
		position: relative;
		margin-left: 50%;
		/* left: 50%; */
		transform: translateX(-50%);
		width: 64rpx;
		height: 6rpx;
		border-radius: 3rpx;
		background: #eee;
	}
	
	.slider-inside {
		/* transform: translateX(-50%); */
		width: 32rpx;
		height: 100%;
		border-radius: 3rpx;
		background-color: #11BEA7;
	}
	
	.slider-inside-location {
		position: absolute;
		/* left: 50%; */
	}









	.allgys_pc {
		position: relative;
		overflow: hidden;
		background-color: $home-games-wrap-color !important;
	}
	.allgys {
		position: relative;
		height: 102px;
		overflow: hidden;
		// scroll-view {
		// 	white-space: nowrap;
		// }

		.nav-bar-wrap_gys {
			display: flex;
			flex-flow: column wrap;
			height: 102px;
			cursor: pointer;
		}

		.nav-bar-item_gys {
			width: 200rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 22rpx;
			margin-right: 22rpx;
		}

		.nav-bar-item_gys image {
			display: block;
			height: 40px;
			width: 100%;
			margin: 0;
			border-radius: 14rpx;
			background-color: $pupUp-title-border-color;
		}

		.slider {
			position: relative;
			margin-left: 50%;
			/* left: 50%; */
			transform: translateX(-50%);
			width: 64rpx;
			height: 6rpx;
			border-radius: 3rpx;
			background: #eee;
		}

		.slider-inside {
			/* transform: translateX(-50%); */
			width: 32rpx;
			height: 100%;
			border-radius: 3rpx;
			background-color: #11BEA7;
		}

		.slider-inside-location {
			position: absolute;
			/* left: 50%; */
		}
	}


	.gundong_box_wrap {
		padding: 46rpx 0 0 0;

		.gdbox_title {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: $all-secondary-text-color;
			font-size: 16px;
			font-weight: bold !important;

			image {
				width: 45rpx;
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
				padding: 30rpx 0 0 0;
			}

			.scroll_item_box {
				display: inline-flex;
				/* item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可 */
				flex-direction: column;
				align-items: center;

				.scroll_item_box_item {
					width: 400rpx;
					height: 310rpx;
					margin: 0 0 0 30rpx;
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
					cursor: pointer;
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

					.djs_lst {
						position: relative;
						top: 2rpx;
						border: 1px solid $bonuspack-item-countdownBorder;
						background-color: $bonuspack-item-countdownBg;
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

			.scroll_item_box_item:first-child {
				margin-left: 10rpx;
			}

			.scroll_item_box_item:last-child {
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
			line-clamp: 1;
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
		.page_wrap {
			padding: 0 80rpx 80rpx 80rpx;
		}

		.games_list_wrap {
			padding-right: 0;
			margin-top: 35px !important;
			margin-bottom: 12px;
			background-color: $home-games-wrap-color !important;
		}
		
		.dj_wrap {
			margin-top: 52px;
		}

		//.all {
			//height: 352px;
		//}

		//.nav-bar-wrap {
			//height: 352px;
		//}

		.nav-bar-item {
			width: 165px;
		}

		.jrsx_picture_home {
			height: 165px !important;
		}

		.rec_bottom .scrollx_items {
			width: 165px;
		}

		.allgys {
			height: 153px;
		}

		.allgys .nav-bar-wrap_gys {
			height: 153px;
		}

		.allgys .nav-bar-item_gys {
			width: 165px;
		}

		.allgys .nav-bar-item_gys uni-image {
			height: 65px;
		}

		.gundong_box_wrap .gundong_swpier .scroll_item_box {
			width: 33.333333333%;
			padding: 0 16rpx 0 0;
		}

		.gundong_box_wrap .gundong_swpier .scroll_item_box .scroll_item_box_item {
			width: 100%;
			height: 180px;
			margin: 0;
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

		//.banshi2 .swiper-slide image {
			//max-height: 324rpx;
		//}
		.gundong_box_wrap .gundong_swpier .scroll_item_box .item_Jiacheng .item_jc2 {
			margin: 20px auto 24px;
			max-width: 240px;
		}
	}
</style>