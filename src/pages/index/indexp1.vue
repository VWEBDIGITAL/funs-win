<template>
	<view :style="theme" class="content_wrap">
		
		<!-- 滑动广告图 -->
		<uni-transition ref="achd" class="achd_popup_dh" :mode-class="['fade', 'zoom-in']" :show="showACHDPopup && ACswiper.length > 0">
			<u-mask :show="showACHDPopup" :mask-click-able="false" @click="showACHDGuanbi()" :custom-style="{background: 'rgba(0, 0, 0, 0.5)'}"></u-mask>
			<view class="achd_popup_box">
				
				<view class="swiper_popup_box">
					<view class="prevleft" @click="prev">
						<u-icon name="arrow-left" size="30" :color="currentIndex == 0?'#5d636c':'#fff'"></u-icon>
					</view>
					<swiper class="swiper" style="height: 540px;" :current="currentIndex" @change="handleSwiperChange" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in ACswiper" :key="index">
							<image id="u-gridh" class="achdtu" :src="item.picture" mode="aspectFit"></image>
						</swiper-item>
					</swiper>
					<view class="nextright" @click="next">
						<u-icon name="arrow-right" size="30" :color="currentIndex == ACswiper.length-1?'#5d636c':'#fff'"></u-icon>
					</view>
				</view>
				
				<view class="today_hide" v-if="isLogin">
					<u-checkbox-group>
						<u-checkbox @change="today_hideChange" v-model="HDavTodayHide" name="HideToday">
							<view class="checkbox">
								{{$t('NewlyAdded.HideToday')}}
							</view>
						</u-checkbox>
					</u-checkbox-group>
				</view>
				
				<view class="hd_guanbi" @click="showACHDGuanbi()">
					<image src="/static/image/hd_guanbi_icon.png" @click="showACHDGuanbi()"></image>
				</view>
				
			</view>
			
		</uni-transition>
		
		<!-- 顶部导航 -->
		<match-media :max-width="800">
			<navbar ref="child" :isCountTo="true" :showInstall="true" @GuanInstall="JiSuanXiDing"></navbar>
		</match-media>
		
		<!-- 登录注册弹窗 -->
		<signInPopup ref="signInShow" :isTabs="1"></signInPopup>
		
		<!-- 大逃杀游戏悬浮窗 -->
		<!-- <view v-if="Object.keys(OneGames).length !== 0">
			<drag-button :data="OneGames" :isDock="true" :existTabBar="false" @btnClick="btnClick" />
		</view> -->
		
		<!-- 安装APP顶部提示 -->
		<install-popup ref="openInstallshow" @CheckboxChange="checkboxChange" @guanBiinstallPopup="GuanBiinstallPopup"></install-popup>

		<!--充值和提款-->
		<pc-Deposit ref="openPCdeposit"></pc-Deposit>

		<!--生日礼金弹窗-->
		<Happy-Birthday-Popup ref="OpenBirthdayPopup"></Happy-Birthday-Popup>

		<!--等级升级奖金发放弹窗-->
		<Congratulations-Popup ref="OpenLeveUp"></Congratulations-Popup>

		<!--引导注册弹窗-->
		<match-media :max-width="800">
			<uni-transition :mode-class="['fade', 'slide-top']" :styles="{'max-width':'430px','height':'auto','position':'fixed','top':Topheight,'left':'0','z-index':'9999','right':'0','margin':'0 auto'}" :show="showRegisterNow">
				<Welcome-Register-Now ref="RegisterNowRefs" @RegisterNowClose="RegisterNowClose" @RegisterNowOpen="registerNowOpen"></Welcome-Register-Now>
			</uni-transition>
		</match-media>

		<!--登录注册弹窗-->
		<signInPopup ref="signInShow"></signInPopup>

		<!-- 右下角礼包弹窗 -->
		<uni-transition class="qiliuba_hylb" :mode-class="['fade', 'slide-bottom']" :show="showDepositBonus">
			<Welcome-DepositBonusPlus ref="Openshows" @dakitikPopup="dakitikPopup" @DepositBonusClose="DepositBonusClose"></Welcome-DepositBonusPlus>
		</uni-transition>
		
		<!-- 任务列表弹窗 -->
		<NoviceTask ref="openNovice" :isShowIcon="false"></NoviceTask>

		<!--PC通知弹窗-->
		<view class="mask_ceng" v-show="showPCnc" @click="showPCnc = false" hover-stop-propagation @touchmove.stop.prevent="() => {}"></view>
		<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'max-width':'430px','height':'auto','position':'fixed','top':'0','left':'0','z-index':'10075','right':'0','margin':'0 auto','bottom':'0'}" :show="showPCnc">
			<view class="tz_wrap">
				<view class="guanbi" @click="showPCnc = false">
					<view class="reg_titles">
						<view>{{$t('NotificationPage.title')}}</view>
					</view>
					<u-icon name="close" color="#fff"></u-icon>
				</view>
				<view class="tc_lan">
					<pc-Notification ref="TZTanchuang"></pc-Notification>
				</view>
			</view>
		</uni-transition>



		<view class="list_wrap_box">
		<!-- 轮播图 -->
		<home-swiper ref="" :Gamesdata="OneGames" @btnClick="btnClick" :list="lunbotuList" :systemList="SystemunreadList" v-if="swpier_skeleton_loading"></home-swiper>
		<view v-else class="swpier_skeleton_box_height">
			<view class="swpier_skeleton_loading"></view>
		</view>
		
		<!-- 公告栏 -->
		<view class="notice-bar">
			<u-notice-bar speed="90" type="primary" color="#ffffff" bg-color="rgba(255, 0, 0, 0)" mode="horizontal" :list="SystemunreadList" :close-icon="false" :more-icon="true" @getMore="ToNocInfo" @click="ToNocInfo"></u-notice-bar>
		</view>


		<!-- 搜索拦H5 -->
		<match-media :max-width="800">
			<view class="sousuo_lan_wrap">
				<view class="sousuo_lan">
					<u-search :placeholder="$t('NewlyAdded.Enter')" v-model="keyword" @search="StartSearch" height="78" shape="square" search-icon-color="#566488" placeholder-color="#566488" bg-color="transparent" border-color="transparent" :show-action="false"></u-search>
				</view>
				<view class="sousuo_Btn" @click="ClickSearch()">{{$t('NewlyAdded.Search')}}</view>
			</view>
		</match-media>
		













		
		<view class="u-loading22" v-show="Hoemloadingtrue == true">
			<view class="loader">
				<view class="loader-animation"></view>
			</view>
		</view>
		<view class="page-content" v-show="Hoemloadingtrue == false">
			<luBarTabNav :tabList="tabbar" :barFixed="barFixed" :iconShow="iconShow" :transitionShow="transitionShow" :barHeight="barHeight" :barTop="barTop" :barId="barId" ref="barTabNav">
				<view v-for="(item,index) in tabbar" :key="index" :id="'item'+(index+1)" :class="[index<6?'tabbody':'tabbody2']" :style="{paddingTop: index==0?'60rpx':''}">
					
					<!-- H5 -->
					<!--有的游戏没达到2行6个所以少于6个的就显示一行-->
					<!-- #ifdef H5 || WEB -->
					<match-media :max-width="800">
					<!-- #endif -->
					
					<!-- 标题 -->
					<view class="biaoti_box">
						<view class="biaotilan">
							<image :src="item.iconImage" mode="widthFix"></image>
							<view v-if="item.text && item.text=='Hot'">{{$t('Popular')}}</view>
							<view v-if="item.text && item.text=='Slots'">{{$t('Slots')}}</view>
							<view v-if="item.text && item.text=='Fishing'">{{$t('Fishing')}}</view>
							<view v-if="item.text && item.text=='Live'">{{$t('LiveCasino')}}</view>
							<view v-if="item.text && item.text=='Sports'">{{$t('Sports')}}</view>
							<view v-if="item.text && item.text=='Cards'">{{$t('Cards')}}</view>
							<view v-if="item.text && item.text=='Mini'">{{$t('MiniGames')}}</view>
							<view v-if="item.text && item.text=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
							<view v-if="item.text && item.text=='Poker'">{{$t('ADDnew.Poker')}}</view>
							<view v-if="item.text && item.text=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
							<view v-if="item.text && item.text=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
							<view v-if="item.text && item.text=='收藏'">{{$t('NewlyAdded.Favorites')}}</view>
							<view v-if="item.text && item.text=='历史'">{{$t('NewlyAdded.Recent')}}</view>
						</view>
						<view class="lookAll">
							<view v-if="item.type == 1" @click="lookAll(item,index)">{{$t('ViewAll')}}</view>
							<view v-if="item.type == 2" @click="lookAllCs(item,0)">{{$t('ViewAll')}}</view>
							<u-icon name="arrow-right" color="#2283f6" size="24"></u-icon>
						</view>
					</view>
					
					<view class="rec_bottom"><!-- v-if="item.vendors.length < 11"-->
						<view class="shopTuijian">
							<scroll-view class="uni-swiper-tab" scroll-x>
								<view class="scrollx_items" v-for="(val,indexb) in item.vendors" :key="indexb">
									<view class="jrsx_item2">
										<view class="goodsdetail">
											<view class="jrsx_img" @click="item.type == 1?lookMask(val,val.gameCode+indexb):lookitemCs(item,indexb)">
												<view class="csName_title" v-if="item.type == 2">
													<text>{{val.nameCode}}</text>
													<view v-if="item.text && item.text=='Slots'">{{$t('Slots')}}</view>
													<view v-if="item.text && item.text=='Fishing'">{{$t('Fishing')}}</view>
													<view v-if="item.text && item.text=='Live'">{{$t('LiveCasino')}}</view>
													<view v-if="item.text && item.text=='Sports'">{{$t('Sports')}}</view>
													<view v-if="item.text && item.text=='Cards'">{{$t('Cards')}}</view>
													<view v-if="item.text && item.text=='Mini'">{{$t('MiniGames')}}</view>
													<view v-if="item.text && item.text=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
													<view v-if="item.text && item.text=='Poker'">{{$t('ADDnew.Poker')}}</view>
													<view v-if="item.text && item.text=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
													<view v-if="item.text && item.text=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
													<view v-if="item.text && item.text=='收藏'">{{$t('NewlyAdded.Favorites')}}</view>
													<view v-if="item.text && item.text=='历史'">{{$t('NewlyAdded.Recent')}}</view>
												</view>
												<block v-if="item.type == 1">
													<u-lazy-load :is-effect="false" class="goods-icon" height="100%" :image="val.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
												</block>
												<block v-else-if="item.type == 2">
													<u-lazy-load class="goods-icon" height="238" :image="domains + '/vendorIcon/' + item.text + '/' + val.name + '.png'" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
												</block>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<!-- <view class="all" v-else>
						<view class="zheceng2"></view>
						<scroll-view class="nav-bar" scroll-x>
							<view class="nav-bar-wrap">
								<block v-for="(itembb,indexbb) in item.vendors" :key="indexbb">
									<view class="nav-bar-item" @click="item.type == 1?lookMask(itembb,itembb.gameCode+indexbb):lookitemCs(item,indexbb)" :id="itembb.id">
										<view class='goodsdetail'>
											<view class='jrsx_img'>
												<view class="csName_title" v-if="item.type == 2">
													<text>{{itembb.nameCode}}</text>
													<view v-if="item.text && item.text=='Slots'">{{$t('Slots')}}</view>
													<view v-if="item.text && item.text=='Fishing'">{{$t('Fishing')}}</view>
													<view v-if="item.text && item.text=='Live'">{{$t('LiveCasino')}}</view>
													<view v-if="item.text && item.text=='Sports'">{{$t('Sports')}}</view>
													<view v-if="item.text && item.text=='Cards'">{{$t('Cards')}}</view>
													<view v-if="item.text && item.text=='Mini'">{{$t('MiniGames')}}</view>
													<view v-if="item.text && item.text=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
													<view v-if="item.text && item.text=='Poker'">{{$t('ADDnew.Poker')}}</view>
													<view v-if="item.text && item.text=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
													<view v-if="item.text && item.text=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
													<view v-if="item.text && item.text=='收藏'">收藏</view>
													<view v-if="item.text && item.text=='历史'">历史</view>
												</view>
												<block v-if="item.type == 1">
													<u-lazy-load :is-effect="false" class="goods-icon" height="100%" :image="itembb.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
												</block>
												<block v-else-if="item.type == 2">
													<u-lazy-load class="goods-icon" height="238" :image="domains + '/vendorIcon/' + item.text + '/' + itembb.name + '.png'" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
												</block>
											</view>
										</view>
									</view>
								</block>
							</view>
						</scroll-view>
					</view> -->
					<!-- #ifdef H5 || WEB -->
					</match-media>
					<!-- #endif -->
					<!-- H5 -->
					
					
					
					
					
					
					
					<!-- PC -->
					<!-- #ifndef APP-PLUS -->
					<match-media :min-width="800" >
					<view class="pc_all">
						<view class="banshi2">
							<view class="swiper-container2">
								<view class="games_list_wrap" :style="[{marginTop:(index==0?'22px':'')}]"><!--   -->
									<view class="games_list_title">
										<view class="list_title">
											<image class="title_icon2" :src="item.iconImage" mode="widthFix"></image>
											<view v-if="item.text && item.text=='Hot'">{{$t('Popular')}}</view>
											<view v-if="item.text && item.text=='Slots'">{{$t('Slots')}}</view>
											<view v-if="item.text && item.text=='Fishing'">{{$t('Fishing')}}</view>
											<view v-if="item.text && item.text=='Live'">{{$t('LiveCasino')}}</view>
											<view v-if="item.text && item.text=='Sports'">{{$t('Sports')}}</view>
											<view v-if="item.text && item.text=='Cards'">{{$t('Cards')}}</view>
											<view v-if="item.text && item.text=='Mini'">{{$t('MiniGames')}}</view>
											<view v-if="item.text && item.text=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
											<view v-if="item.text && item.text=='Poker'">{{$t('ADDnew.Poker')}}</view>
											<view v-if="item.text && item.text=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
											<view v-if="item.text && item.text=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
											<view v-if="item.text && item.text=='收藏'">{{$t('NewlyAdded.Favorites')}}</view>
											<view v-if="item.text && item.text=='历史'">{{$t('NewlyAdded.Recent')}}</view>
										</view>
										<view class="caozuo_btn">
											
											<view class="gengduo" v-if="item.type == 1" @click="lookAll(item,index)">{{$t('ViewAll')}}</view>
											<view class="gengduo" v-if="item.type == 2" @click="lookAllCs(item,0)">{{$t('ViewAll')}}</view>
											
											<view class="swiper-button-prev-zzy"><u-icon name="arrow-left" color="#566488"></u-icon></view>
											<view class="swiper-button-next-zzy"><u-icon name="arrow-right" color="#566488"></u-icon></view>
										</view>
									</view>
								</view>
								<view class="swiper-wrapper">
									<view v-for="(itemvv,indexvv) in item.vendors" :key="indexvv" class="swiper-slide" @click="item.type == 1?lookMask(itemvv,itemvv.gameCode+indexvv):lookitemCs(item,indexvv)" :id="itemvv.id">
										
										<view class="csName_title" v-if="item.type == 2">
											<text>{{itemvv.nameCode}}</text>
											<view v-if="item.text && item.text=='Slots'">{{$t('Slots')}}</view>
											<view v-if="item.text && item.text=='Fishing'">{{$t('Fishing')}}</view>
											<view v-if="item.text && item.text=='Live'">{{$t('LiveCasino')}}</view>
											<view v-if="item.text && item.text=='Sports'">{{$t('Sports')}}</view>
											<view v-if="item.text && item.text=='Cards'">{{$t('Cards')}}</view>
											<view v-if="item.text && item.text=='Mini'">{{$t('MiniGames')}}</view>
											<view v-if="item.text && item.text=='Bingo'">{{$t('ADDnew.Lottery')}}</view>
											<view v-if="item.text && item.text=='Poker'">{{$t('ADDnew.Poker')}}</view>
											<view v-if="item.text && item.text=='ARCADE'">{{$t('ADDnew.Arcade')}}</view>
											<view v-if="item.text && item.text=='Lottery'">{{$t('ADDnew.Lottery')}}</view>
											<view v-if="item.text && item.text=='收藏'">{{$t('NewlyAdded.Favorites')}}</view>
											<view v-if="item.text && item.text=='历史'">{{$t('NewlyAdded.Recent')}}</view>
										</view>
										
										<block v-if="item.type == 1">
											<u-lazy-load :is-effect="false" class="goods-icon" height="100%" :image="itemvv.path" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
										</block>
										<block v-else-if="item.type == 2">
											<u-lazy-load :is-effect="false" class="goods-icon" height="100%" :image="domains + '/vendorIcon/' + item.text + '/' + itemvv.name + '.png'" border-radius="18" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
										</block>
									
									</view>
								</view>
							</view>
						</view>
					</view>
					</match-media>
					<!-- #endif -->
					
				</view>
			</luBarTabNav>
		</view>
		</view>
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		<!-- 开始游戏弹窗 -->
		<view class="popupPlay">
			<u-popup v-model="PlayGameshow" mode="bottom" border-radius="30" :closeable="false" :safe-area-inset-bottom="true">
				<view class="play_game_box">
					<view class="game_info_wrap">
						<image class="gamene_img" :src="playGameData.path" mode="widthFix"></image>
						<view class="game_info">
							<view class="game_nam">{{playGameData.gameName}}</view>
							<view class="tigs">
								{{GetGamesType(playGameData.vendor)}}
								<view v-if="isLogin == 1" style="margin-left: auto;" @click="cLike(playGameData.gameCode,playGameData.favorite);playGameData.favorite =! playGameData.favorite">
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
								{{$t('jxyx')}}</view>
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
								<u-button type="primary" :disabled="disabledPlay" :loading="playloading" shape="circle" @click.stop="OpenGames(playGameData)">
									<u-icon name="play-right-fill" size="26" color="#fff"></u-icon>{{$t('PlayS')}}
								</u-button>
							</view>
							<view class="mask_btn" v-else>
								<u-button type="primary" shape="circle" @click.stop="SignInBtn()">{{$t('regiserPopup.signIn')}}</u-button>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>













		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		<!-- 关于我们和技术支持 -->
		<view class="dibuvs" v-if="tabbar.length != 0">
			<home-bottom-info ref=""></home-bottom-info>
		</view>
		<DepositoAdv ref="DepositoAdvOpen"></DepositoAdv>
		<!-- 登录密码修改 -->
		<LoginPasswordPoppup ref="LoginPassword"></LoginPasswordPoppup>
		<!--生成下载app的二维码-->
		<view class="erweim">
			<yz-qr @qrOpen="Openqr" :qrPath.sync="qrPath" :text="recommendedLink" :size="size" :quality="quality" :colorDark="colorDark" :colorLight="colorLight"></yz-qr>
		</view>
		<!-- 底部新的提示安装APP -->
		<!-- #ifndef APP-PLUS -->
		<match-media :max-width="800">
			<view class="install_webapp install_webapp_home" @click="OpenInstallguiin()" v-if="yqhaoyoushow">
				<image class="mini_logo2" :src="'/static/image/addtoDS.png'"></image>
				<view class="install_info">
					<view>{{$t('NewUserPopup.ADDHOME')}}</view>
				</view>
				<view class="install_colso" @click.stop="GuanBiinstall()"><u-icon name="close" color="#ffffff"></u-icon>
				</view>
			</view>
		</match-media>
		<!-- #endif -->
		<!-- APP检测升级 -->
		<!-- #ifdef APP-PLUS -->
		<AppPopUp ref="AppUpdate"></AppPopUp>
		<!-- #endif -->
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop" icon="/static/image/back-top.png" right="0" bottom="270" :icon-style="{width: '34px',height:'34px',borderRadius:'5px'}" :custom-style="{width: '34px',height:'34px',borderRadius:'5px',backgroundColor:'transparent'}"></u-back-top>
		<!-- 右下角客服和tabbar -->
		<match-media :max-width="800">
			<view class="CbianKfu">
				<view @click="TochatUrl()">
					<view class="kf_text">{{$t('sidebar.title10')}}</view>
					<view class="msg_num" v-if="unReadMsg.unReadCnt>0">{{unReadMsg.unReadCnt}}</view>
				</view>
				<view class="msg_info_wrap" v-if="kefuMsgTag && unReadMsg.unReadCnt>0">
					<view class="msg_info">
						<view class="kefu_icon" @click="TochatUrl()">
							<image src="/static/image/kefu_bottom.png" mode=""></image>
						</view>
						<view class="kefu_info" @click="TochatUrl()">
							<view class="msg_info_title">{{unReadMsg.lastSender}}</view>
							<view class="msg_info_text">{{unReadMsg.lastMsg}}</view>
						</view>
						<view class="gb_icon">
							<u-icon @click="GbkefuMsgTag()" name="close" color="#fff"></u-icon>
						</view>
						<!-- <image class="biansanjiao" src="/static/image/msg_info_jiao.png" mode="widthFix"></image> -->
						<view class="right_sanjiao"></view>
					</view>
				</view>
			</view>
			<u-tabbar></u-tabbar>
		</match-media>
		<!-- PC客服未读消息提示 -->
		<match-media :min-width="800">
			<view class="CbianKfu_pc">
				<view class="msg_info_wrap" v-if="kefuMsgTag && unReadMsg.unReadCnt>0"><!---->
					<view class="msg_info">
						<view style="display: flex;align-items: center;" @click="TochatUrl()">
							<view class="kefu_icon">
								<span>{{unReadMsg.unReadCnt||0}}</span>
								<image src="/static/image/kefu_bottom.png" mode=""></image>
							</view>
							<view class="kefu_info">
								<view class="msg_info_title">{{unReadMsg.lastSender}}</view>
								<view class="msg_info_text">{{unReadMsg.lastMsg}}</view>
							</view>
						</view>
						<view class="gb_icon">
							<u-icon @click="GbkefuMsgTag()" name="close" color="#fff"></u-icon>
						</view>
						<!-- <view class="right_sanjiao"></view> -->
					</view>
				</view>
			</view>
		</match-media>
	</view>
</template>

<script>
	const app = getApp();
	
	import Swiper from 'swiper'; // 注意引入的是Swiper
	import 'swiper/css/swiper.min.css' // 注意这里的引入
	
	import luBarTabNav from "@/components/lu-bar-tab-nav/lu-bar-tab-nav.vue";
	
	import {
		websocetObj
	} from '@/utils/socket.js';
	
	import dragButton from "@/components/drag-button/drag-button.vue";

	export default {
		components: {
			luBarTabNav,
		    dragButton
		},
		data() {
			return {
				Hoemloadingtrue: true,
				barFixed: true,
				barHeight: "34",
				
				// #ifdef APP-IOS
				barTop: 110,
				// #endif
				
				// #ifdef APP-ANDROID
				barTop: 88,
				// #endif
				
				// #ifdef H5
				barTop: 59,
				// #endif
				
				iconShow: false,
				transitionShow: false,
				barId: "0",
				tabbar: [],
				allHotGames: 0,
				swpier_skeleton_loading: false,
				loadingImg: '/static/logo/' + this.PID + '_logo.png',
				errorImg: '/static/logo/' + this.PID + '_logo.png',
				playGameData: {},
				PlayGameshow: false,
				domains: '',
				playloading: false,
				vendorsList: [],
				isLogin: 0,
				disabledPlay: false,
				OneGames: {},
				offsetTop: '59',
				showDepositBonus: false,
				showPCnc: false,
				qrPath: '',
				size: 70,
				quality: 'L',
				colorDark: '#000000',
				colorLight: '#ffffff',
				recommendedLink: '',
				SystemunreadList: [],
				Topheight: '0',
				showRegisterNow: false,
				scrollTop: 0,
				GameHistory: [],
				lunbotuList: [],
				intervalId: null,
				data: null, // 存储请求到的数据
				yqhaoyoushow: false,
				TodayHide: true,
				platform: this.PID,
				swiper2: null,
				swiper3: null,
				YaoQingMa: '',
				keyword: '',
				kefuMsgTag: false,
				
				unReadMsg: {
					lastSender: "",
					lastMsg: "",
					unReadCnt: 0
				},
				
				ACswiper: [],
				currentIndex: 0,
				showACHDPopup: false,
				indicatorDots: false,
				autoplay: true,
				interval: 8000,
				duration: 500,
				swiperHeight: 0,
				HDavTodayHide: false,
				isLogin: false,
				
				SelectCurrencyData: {},
				is_SelectCurrencyData: false
				
			}
		},
		watch: {
			qrPath(newVal, oldVal) {
				//console.log('最新地址：' + newVal, "原来的地址：" + oldVal);
				uni.setStorageSync('dwappqrPath', this.qrPath);
				return this.qrPath;
			}
		},
		onLoad(options) {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			// #ifdef H5
			let windowWidth = uni.getSystemInfoSync().windowWidth
			if (windowWidth >= "800") {
				this.barTop = '0'
			} else {
				this.barTop = '59'
			}
			// #endif
			
			//引入谷歌授权登录js
			//#ifdef H5
			var script = document.createElement('script');
			script.src = "https://accounts.google.com/gsi/client";
			document.head.appendChild(script);
			//#endif
			
			let TJMNum = uni.getStorageSync('channel_id');
			that.YaoQingMa = TJMNum;
			//console.log('邀请码',that.YaoQingMa);
			
			//获取游戏和厂商列表
			that.getVlistAll();
			
			//全局监听用户切换语言后从新刷新一下游戏列表
			uni.$on('updateGetGames',function(data){
				that.LangChange(0);
			});
			
			//设置全局获取未读消息显示
			uni.$on('unReadCntShow', (val) => {
				that.kefuMsgTag = true
				that.unReadMsg = {
					lastSender: val.lastSender,
					unReadCnt: val.unReadCnt,
					lastMsg: val.lastMsg
				}
			})
			
			//获取平台8单独大逃杀游戏
			//that.GetOnedayGame();
			
			//获取轮播图
			that.getLunbotu();
			//或系统公告
			that.getSystemUnread();

			//注入监测App更新方法
			// #ifdef APP-PLUS
			//版本更新提示信息 false不提示
			that.JianChaAppUp(false);
			//APP检测token是否过期
			that.ckickisToken();
			//APP打开的就领取安装奖励
			that.LingQuinstall();
			// #endif

			let isToken = uni.getStorageSync("token");
			if (!isToken) {
				//#ifdef H5
				//获取地址中的谷歌授权信息，进行登录操作
				that.getUserInfo();
				//#endif
			} else {
				//检查是否有可领取的任务奖励有之弹窗
				that.CkNovice();
				//获取充值礼包提示
				that.GetWelcomePackage();
				//判断是否WebApp启动，如果是就个他领取安装奖励
				//#ifdef H5
				if (window.navigator.standalone == true) {
					//alert('IOS-是从桌面中打开的')
					that.Topheight = '54px';
					that.LingQuinstall();
					//return false;
				} else if (window.matchMedia("(display-mode: standalone)").matches) {
					//alert('android-是从桌面中打开的')
					that.LingQuinstall();
					that.Topheight = '0';
					//return false;
				} else {
					that.installWebapp()
					that.Topheight = '0';
				}
				//#endif
				// 设置定时器每隔一分钟（60000毫秒）请求一次数据 刷新可领取的任务数量
				//that.intervalId = setInterval(that.fetchData, 60000);
			}
			// #ifdef H5
			if (window.navigator.standalone == true) {} else if (window.matchMedia("(display-mode: standalone)").matches) {} else {
				//就是浏览器里面打开的
				that.installWebapp()
			}
			// #endif
			that.getLunBoAds();//轮播广告图
		},
		onShow() {
			let that = this
			
			//计算顶部吸顶距离
			that.JiSuanXiDing();
			
			//设置PC弹窗APP下载链接
			let systemInfo = uni.getSystemInfoSync();
			if (systemInfo.osName == "ios") {
				that.recommendedLink = uni.getStorageSync('ipaUrl') || 'https://';
			} else {
				that.recommendedLink = uni.getStorageSync('apkUrl') || 'https://';
			}

			let isToken = uni.getStorageSync("token");
			if (!isToken) {
				that.isLogin = false
			} else {
				that.isLogin = true
				
				that.GetUnMsgInfo();//未读消息
				
				//上报充值成功记录查询
				that.ChaXunrecord();
				
				//获取游戏历史记录
				//that.GetLishiGames(); 
				
				//游戏拉分
				that.GamesLaFen();
				
				// #ifdef APP-PLUS
				uni.$on('getGamesLaFen', (val) => {
					//游戏拉分
					that.GamesLaFen();
				})
				// #endif
				
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		onReady() {
			//测试生日奖励和等级奖励弹窗
			//setTimeout(()=>{
			//uni.$emit("HappyBirthdayShow",{"cmd":57,"date":"2024-06-01", "reward":10086})
			//uni.$emit("CongratulationsShow",{"cmd":56,"vip":10, "reward":10086})
			//},3000)
		},
		onHide() {
			let that = this
			that.$refs.RegisterNowRefs.hideRegisterNowRefs(0)
			that.showRegisterNow = false
			uni.$emit('HideTabber', 1)
		},
		onPullDownRefresh() {
			let that = this
			let isToken = uni.getStorageSync("token");
			if (!isToken) {
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			} else {
				websocetObj.stop();
				that.Hoemloadingtrue = true
				setTimeout(function() {
					//获取游戏和厂商列表
					that.getVlistAll();
					that.GetUnMsgInfo();//未读消息
					websocetObj.sokcet();
					uni.stopPullDownRefresh();
				}, 1000);
			}
		},
		onReachBottom() {
			let that = this
			setTimeout(function() {
				uni.hideNavigationBarLoading()
			}, 500);
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			this.$refs.barTabNav._selectedTab(e.scrollTop);
		},
		methods: {
			showACHDGuanbi(){
				let that = this
				//获取当前第几个item
				let i = that.currentIndex
				//找出当前item的mailId
				let mailId = that.ACswiper[i].mailId
				//判断如果用户点击了今日隐藏，就把当前item的mailId传给接口，表示已读状态
				console.log('mailId',mailId)
				
				let isToken = uni.getStorageSync("token");
				if (!isToken) {
					that.showACHDPopup = false
				} else {
					
					if(that.HDavTodayHide == true){
						that.setyiDuStatus(mailId)
						that.showACHDPopup = false
						// uni.setStorage({
						// 	key: "ADD-MYAPP-KEY-ONE",
						// 	data: new Date().getTime(),
						// });
					} else {
						that.showACHDPopup = false
					}
					
				}
			},
			//设置已读接口
			setyiDuStatus(mailId){
				let that = this
				that.$u.post('/read-mail', {
					mailId: parseInt(mailId),
				}).then(ress => {
					
				})
			},
			//获取轮播广告24小时显示一次
			getLunBoAds(){
				let that = this
				// uni.getStorage({
				// 	key: "ADD-MYAPP-KEY-ONE",
				// 	success: (res) => {
				// 		// 24小时超时
				// 		if (!res.data || new Date().getTime() - res.data > 1000 * 60 * 60 * 24) {
				// 			console.log("刚进入，本地有，且超时", "case");
				// 			that.startHuoquads()
				// 		} else {
				// 			console.log("刚进入，时间没到", "case");
				// 		}
				// 	},
				// 	fail: (err) => {
				// 		console.log("刚进入，本地无", "case");
				 		that.startHuoquads()
				// 	},
				// });
			},
			startHuoquads(){
				let that = this
				that.$u.post('/query-popup-msg', {
					
				}).then(res => {
					console.log('轮播广告',res.data)
					that.ACswiper = res.data
					that.showACHDPopup = true
					
					// if(that.ACswiper.length > 0){
					// 	setTimeout(()=>{
					// 		uni.createSelectorQuery().select('#u-gridh').boundingClientRect(rect=>{
					// 			console.log('打印该盒子的元素',rect.height);
					// 			that.swiperHeight = rect.height
					// 		}).exec()
					// 	},1000)
					// }
					
				}).catch(err => {
					that.ACswiper = []
					that.showACHDPopup = false
				})
			},
			handleSwiperChange(event) {
				const current = event.detail.current;
				this.currentIndex = current;
			},
			prev() {
				if(this.currentIndex == 0){
					
				} else {
					this.currentIndex = (this.currentIndex - 1 + this.ACswiper.length) % this.ACswiper.length;
				}
			},
			next() {
				if(this.currentIndex == this.ACswiper.length-1){
					
				} else {
					this.currentIndex = (this.currentIndex + 1) % this.ACswiper.length;
				}
			},
			// 选中某个复选框时，由checkbox时触发
			today_hideChange(e) {
				console.log('HDavTodayHide',e);
				this.HDavTodayHide = e
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//读取未读消息
			GetUnMsgInfo(){
				let that = this
				that.$u.post('/chat/unread', {
					
				}).then(res => {
					console.log('未读消息',res.data)
					if(res.data.unReadCnt > 0){
						that.kefuMsgTag = true
						that.unReadMsg = {
							lastSender: res.data.lastSender,
							lastMsg: res.data.lastMsg,
							unReadCnt: res.data.unReadCnt
						}
					} else {
						that.kefuMsgTag = false
						that.unReadMsg = {
							lastSender: "",
							lastMsg: "",
							unReadCnt: 0
						}
					}
				}).catch(err => {
					
				})
			},
			GbkefuMsgTag(){
				this.kefuMsgTag = false
			},
			StartSearch(e){
				console.log('输入的key',e);
				uni.navigateTo({
					url: '/pages/searchFor/searchFor?source=1' + '&key=' + e
				})
			},
			ClickSearch(){
				let e = this.keyword
				uni.navigateTo({
					url: '/pages/searchFor/searchFor?source=1' + '&key=' + e
				})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//先获取分类列表
			async getVlistAll() {
				let that = this
				const ress = await that.$u.post('/game/category', {});
				that.domains = ress.data.domain;
				that.vendorsList = ress.data.vendors;
				
				//先过滤掉大厅和没有游戏的分类
				let GamesListS = []
				ress.data.categories.forEach((itemg, indexg) => {
					if (itemg.name != "Lobby" && itemg.id != 100 && itemg.vendors.length != 0) {
						GamesListS.push({
							games: itemg.games,
							id: itemg.id,
							name: itemg.name,
							path: itemg.path,
							vendors: itemg.vendors
						})
					}
				});
				
				let Hotgames = await that.GetHotGames();
				let newList = []
				if(Hotgames.length == 0){
					
				} else {
					newList = [{
						id: 0,
						type: 1, //表示热门游戏
						vendors: await that.GetHotGames(),
						text: "Hot",
						navTarget: "#item0",
						iconImage: "/static/image/huore.png",
					}]
				}
			 
				GamesListS.forEach((itemu, indexu) => {
					newList.push({
						id: itemu.id,
						type: 2,
						vendors: itemu.vendors,
						text: itemu.name,
						navTarget: "#item" + (indexu+1),
						iconImage: itemu.path,
					})
				});
				console.log('1', newList);
			
				let xindearr = []
				newList.forEach((items, indexs) => {
					xindearr.push({
						type: items.type,
						id: items.id,
						vendors: items.vendors,
						text: items.text,
						navTarget: "#item" + indexs,
						iconImage: items.iconImage,
					})
				});
				
				console.log('2', newList);
				
				//获取收藏和历史游戏写入数组
				let isToken = uni.getStorageSync("token");
				if (!isToken) {
					
					//最终过滤掉为空的数组
					let ZuiZhongNewList = []
					xindearr.forEach((items, indexs) => {
						if(items.vendors.length > 0){
							ZuiZhongNewList.push({
								type: items.type,
								id: items.id,
								vendors: items.vendors,
								text: items.text,
								navTarget: "#item" + (indexs + 1),
								iconImage: items.iconImage,
							})
						}
					});
					that.tabbar = ZuiZhongNewList;
					console.log('未登录最终列表',ZuiZhongNewList)
					
				} else {
					
					let scarry = []
					//判断是否有收藏游戏和历史游戏
					let scgames = await that.GetShouCangGames();
					let lsgames = await that.GetrecentGames();
					
					console.log('收藏游戏列表',scgames)
					console.log('历史游戏列表',lsgames)
					
					if(scgames.length == 0 && lsgames.length == 0){
						scarry = []
					} else if(scgames.length != 0 && lsgames.length != 0) {
						scarry = [{
							iconImage : "/static/image/menuIcon/m7.png",
							id : 66,
							navTarget : "",
							text : "收藏",
							type: 1,
							vendors: await that.GetShouCangGames(),
						},{
							iconImage : "/static/image/menuIcon/m6.png",
							id : 77,
							navTarget : "",
							text : "历史",
							type: 1,
							vendors: await that.GetrecentGames(),
						}]
					} else if(scgames.length != 0) {
						scarry = [{
							iconImage : "/static/image/menuIcon/m7.png",
							id : 66,
							navTarget : "",
							text : "收藏",
							type: 1,
							vendors: await that.GetShouCangGames(),
						}]
					} else if(lsgames.length != 0) {
						scarry = [{
							iconImage : "/static/image/menuIcon/m6.png",
							id : 77,
							navTarget : "",
							text : "历史",
							type: 1,
							vendors: await that.GetrecentGames(),
						}]
					}
					
					//合并收藏和历史
					let mergedArray = [...xindearr, ...scarry];
					
					//从新for赋值
					let ZuiZhongList = []
					mergedArray.forEach((items, indexs) => {
						ZuiZhongList.push({
							type: items.type,
							id: items.id,
							vendors: items.vendors,
							text: items.text,
							navTarget: "#item" + indexs,
							iconImage: items.iconImage,
						})
					});
					
					//最终过滤掉为空的数组
					let ZuiZhongNewList = []
					ZuiZhongList.forEach((items, indexs) => {
						if(items.vendors.length > 0){
							ZuiZhongNewList.push({
								type: items.type,
								id: items.id,
								vendors: items.vendors,
								text: items.text,
								navTarget: "#item" + (indexs + 1),
								iconImage: items.iconImage,
							})
						}
					});
					
					that.tabbar = ZuiZhongNewList
					console.log('登录后的最终游戏列表', ZuiZhongNewList);
				}
				
				that.Hoemloadingtrue = false
				
				//操作初始化swpier组件
				// #ifndef APP-PLUS
				that.$nextTick(() => {
					that.getSwiper2();
				})
				// #endif
				
			},
			//获取热门游戏
			async GetHotGames() {
				let that = this
				const res = await that.$u.post('/game/list', {
					queryHot: true,
					page: 1
				})
				that.allHotGames = res.data.totalCount
				return res.data.gameList
			},
			//获取收藏游戏
			async GetShouCangGames() {
				let that = this
				const res = await that.$u.post('/favorite/list', {
					
				})
				return res.data
			},
			//获取历史游戏
			async GetrecentGames() {
				let that = this
				const res = await that.$u.post('/recent/list', {
					
				})
				return res.data
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//切换语言更新游戏
			LangChange(t){
				let that = this
				that.getVlistAll();
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
			QiuHe(item) {
				let zong = 0
				item.vendors.forEach((items, indexs) => {
					zong += items.gameCount
				});
				return zong
			},
			toList(item, index) {
				console.log('查看全部',item, index)
			
				//把分类id写入缓存 防止刷新页面后不存在分类id
				// uni.setStorageSync("isCurCInfo", item)
				// uni.navigateTo({
				// 	url: '/pages/classify/classify?Leixing=1' + '&index=' + 0
				// })
				
				// #ifdef H5
				//友盟埋点事件
				const _czc = _czc || [];
				window._czc.push(['_trackEvent', '点击查看全部', item.name]);
				// #endif
			},
			lookMask(item, idx) {
				console.log('点击游戏',item, idx);
				
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
					console.log('是否禁玩', noPlay);
					if (noPlay == 1) {
						this.disabledPlay = true
					} else {
						this.disabledPlay = false
					}
			
				}
			},
			//检测禁止游戏功能
			jisuanWeizhi() {
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
			JumpNewUrl(val) {
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
						console.log('AG', res.data)
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
				//console.log('点击开始游戏',val)
				let that = this
				that.playloading = true
			
				// #ifdef H5 || WEB
				//IOS客户端独有，判断是否是AG电子游戏如果是就跳转新标签打开
				//category3是电子游戏分类
				let systemInfo = uni.getSystemInfoSync();
				if ((systemInfo.platform == "ios" || systemInfo.platform == "macos") && systemInfo.browserName ==
					"safari") {
					let Manufacturer = that.GetGamesType(val.vendor);
					if (Manufacturer == "AG" && val.category == 3) {
						that.JumpNewUrl(val)
						return false
					}
				}
				// #endif
			
				if (val.API == "tcg") {
					let Device_type = uni.getStorageSync('DeviceType');
					let client_Type = ''
					if (Device_type == "pc") {
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
				} else if (val.API == "huidu") {
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
				} else if (val.API == "tgfun") {
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
				} else if (val.API == "ky") {
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
				} else if (val.API == "tcg2") {
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
				//console.log(item)
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
				this.PlayGameshow = false
				this.$refs.signInShow.openPopup(1)
			},
			GetGamesType(proid) {
				let that = this
				let Vname = ''
				let Prolist = that.vendorsList
				Prolist.forEach((item, index) => {
					if (item.id == proid) {
						Vname = item.name
					}
				});
				return Vname
			},
			lookAll(item, index) {
				console.log('点击查看全部热门', item)
				let data = {
					id: item.id,
					name: item.text,
					path: item.iconImage
				}
				
				if(item.text == "收藏"){
					uni.navigateTo({
						url: '/pages/myfavoriteList/myfavoriteList'
					})
				} else if(item.text == "历史"){
					uni.navigateTo({
						url: '/pages/MyhistoryList/MyhistoryList'
					})
				} else {
					//把分类id写入缓存 防止刷新页面后不存在分类id
					uni.setStorageSync("isCurCInfo", data)
					uni.navigateTo({
						url: '/pages/classify/classify?Leixing=3' + '&index=' + 0
					})
				}
				
			},
			//点击查看某个分类下面的全部厂商
			lookAllCs(item, index) {
				console.log('点击查看全部分类', item, index)
				let data = {
					id: item.id,
					name: item.text,
					path: item.iconImage
				}
			
				//把分类id写入缓存 防止刷新页面后不存在分类id
				uni.setStorageSync("isCurCInfo", data)
				uni.navigateTo({
					url: '/pages/classify/classify?Leixing=2' + '&index=' + index
				})
			},
			lookitemCs(item, index) {
				console.log('点击某个厂商查看', item, index)
				let data = {
					id: item.id,
					name: item.text,
					path: item.iconImage
				}
				//把分类id写入缓存 防止刷新页面后不存在分类id
				uni.setStorageSync("isCurCInfo", data)
				uni.navigateTo({
					url: '/pages/classify/classify?Leixing=2' + '&index=' + (index + 1)
				})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//获取谷歌授权信息
			getUserInfo() {
				let hostname = window.location.hostname
				const urlParams = new URLSearchParams(window.location.search);
				const code = urlParams.get('code');
				if (!code) {
					return
				}
				// 用授权码交换访问令牌地址
				const tokenEndpoint = 'https://oauth2.googleapis.com/token';
				const requestBody = new URLSearchParams();
				requestBody.append('code', code);
				// 你的 Google OAuth 客户端 ID
				requestBody.append('client_id', '530177592792-nt8h20nb888gmnirgqbnvptev6il8be8.apps.googleusercontent.com');
				// 你的Google OAuth 客户端密钥
				requestBody.append('client_secret', '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');
				requestBody.append('redirect_uri', 'https://' + hostname);
				requestBody.append('grant_type', 'authorization_code'); //这些参数在之前配置的有，看前面的代码
			
				fetch(tokenEndpoint, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						body: requestBody
					}).then(response => response.json()).then(data => {
						// 获得token令牌的信息
						const accessToken = data.access_token;
						console.log('token令牌', data);
						
						if(!data.error){
							uni.setStorageSync('GoogletokenInfo',data);
							this.ZhiXingLogin(data);
						}
						
						// 调用获取用户信息接口
						// fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
						// 		headers: {
						// 			Authorization: `Bearer ${accessToken}`
						// 		}
						// 	}).then(response => response.json()).then(userInfo => {
						// 		// 获取用户信息
						// 		this.title = userInfo.name
						// 		this.pic = userInfo.picture
						// 		this.email = userInfo.email
						// 		console.log('获取谷歌授权信息',userInfo)
								
						// 		if(!userInfo.error){
						// 			uni.setStorageSync('GoogleUserInfo',userInfo);
						// 			this.ZhiXingLogin(userInfo);
						// 		}
						// 		// let isSystem = uni.getStorageSync('GoogleUserInfo');
						// 		// if(!isSystem){
						// 		// 	uni.setStorageSync('GoogleUserInfo',userInfo)
						// 		// }
								
						// 	})
					})
			},
			ZhiXingLogin(googleData){
				let that = this
				console.log('执行谷歌授权登录',googleData);
				
				let serialNo = uni.getStorageSync('thisUuid') || 'iphone';
				let machineName = uni.getStorageSync('machineName') || 'iphone';
				let ua = uni.getStorageSync('thisUa') || 'iphone';
				
				//let QuDaoId = uni.getStorageSync('channel_id') || 2;
				//先判断id是否为整数，如果是就是直接传给channelId
				//如果不是就传给referalCode
				let is_num = that.$u.test.digits(that.YaoQingMa);
				console.log('是否为整数：',is_num);
				let channel_sid = 2
				let referalCodes = ""
				
				if(is_num){
					channel_sid = Number(that.YaoQingMa);
					console.log('整数渠道ID：', channel_sid);
				} else {
					referalCodes = that.YaoQingMa;
					console.log('转码渠道ID：', referalCodes);
				}
				that.$u.post('/login-google', {
					id_token: googleData.id_token,
					channelId: parseInt(channel_sid) || 2,
					referalCode: referalCodes || "",
					serialNo: serialNo, //设备序列码
					machineName: machineName, //设备型号
					operatorId: that.OPERATORID,
					pid: that.PID
				}).then(res => {
					console.log('谷歌登录账号', res)
					uni.setStorageSync('token', res.data.token)
					uni.setStorageSync('userinfo', res.data)
					that.signInShow = false
					
					//登录后刷新一下navbar组件的获取token方法
					uni.$emit('getinspectToken', 1);
					uni.setStorageSync('is_newUser', 0);
					//打开wss链接
					uni.$emit('StartOpenWss', 1);
					//关闭注册引导
					uni.$emit('GuanBiYinDaoReg', 1);
					
					//#ifdef H5
					uni.reLaunch({
						url: '/pages/index/index',
						success: function(res) {}
					});
					//#endif
					
				}).catch(err => {
					console.log('注册失败',err)
					//that.regbtnStatus = false
					let code = err.data.code
					uni.showToast({
						title: err.data.message,
						icon: 'none',
						duration: 3000
					})
					if (code == 1 || code == 4) {
						//that.signInShow = false
						setTimeout(() => {
							//账户已被使用找回密码操作
							//that.Yizhuceshow = true
						}, 300)
					}
				})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			async GetOnedayGame(){
				let that = this
				let games = await that.CheckcategoriesGameList(6, 0);
				let WanGaames = {}
				games.forEach((item, index) => {
					if (item.gameName == "大逃杀") {
						WanGaames = item
					}
				});
				that.OneGames = WanGaames
				console.log('大逃杀',WanGaames);
			},
			async CheckcategoriesGameList(cid, proid) {
				let that = this
				const res = await that.$u.post('/game/list', {
					page: 1,
					searchText: '',
					categoryId: cid,
					vendorId: proid,
					orderType: 1,
				})
				return res.data.gameList
			},
			JianChaAppUp(tip) {
				this.$nextTick(() => {
					this.$refs.AppUpdate.openPopup(tip); // 版本更新提示信息 false不提示
				});
			},
			btnClick(){
				let that = this
				console.log('点击了悬浮窗',that.OneGames);
				let isToken = uni.getStorageSync("token");
				if(!isToken){
					that.$refs.signInShow.openPopup(1)
				} else {
					let val = that.OneGames
					//开始进入游戏
					that.$u.post('/enter-tgfun', {
						gameCode: val.gameCode
					}).then(res => {
						let gameUrl = res.data.gameUrl
						//把游戏地址写入缓存便于Webview读取打开
						uni.setStorageSync("PlayGamesUrl", gameUrl);
						//导航栏金币显示游戏中
						uni.$emit('OpeninGames', 1);
						uni.navigateTo({
							url: '/pages/Webview/Webview?tpye=' + val.API + '&code=' + val.gameCode + '&favorite=' + val.favorite
						})
					}).catch(err => {})
				}
			},
			//计算吸顶
			JiSuanXiDing(){
				let that = this
				//通过监测顶部是否关闭了安装app拦，来设置吸顶的距离
				// #ifdef H5
				//判断是否WebApp启动
				let InsAppNowTime = uni.getStorageSync("popUp-install-time");
				
				if (window.navigator.standalone == true) {
					//alert('IOS-是从桌面中打开的')
					that.offsetTop = '59'
				} else if (window.matchMedia("(display-mode: standalone)").matches) {
					//alert('android-是从桌面中打开的')
					that.offsetTop = '59'
				} else {
					
					const userAgent = navigator.userAgent.toLowerCase();
					if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(userAgent)) {
						// 移动端
						if(InsAppNowTime){
							that.offsetTop = '59'
						} else {
							if(this.PID == 8){
								that.offsetTop = '59'
							} else {
								that.offsetTop = '59'
							}
						}
					} else {
						// pc端
						that.offsetTop = '59'
					}
				}
				// #endif
			},
			//定时器任务监测可领取任务数量
			fetchData() {
				let that = this
				that.$refs.openNovice.GetTaskList();
			},
			GamesLaFen(){
				//游戏拉分
				this.$u.post('/transfer-out-balance', {
				
				}).then(res => {
					//获取我的金币
					uni.$emit('getgetMybalance', 1);
				}).catch(err => {})
			},
			//选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log('2',e);
				//this.TodayHide = e
			},
			OpenInstallguiin() {
				let that = this
				that.$refs.openInstallshow.openPopup();
			},
			//关闭Install弹出回调
			GuanBiinstall(e) {
				this.yqhaoyoushow = false;
				uni.setStorageSync("popUp-install-time", new Date().getTime());
			},
			GuanBiinstallPopup() {
				//console.log('关闭了安装app引导弹窗',this.TodayHide)
				// if(this.TodayHide == true){
				// 	this.yqhaoyoushow = false;
				// 	uni.setStorageSync("popUp-install-time",new Date().getTime());
				// }
			},
			//检测Install弹窗24小时一次
			installWebapp() {
				let nowTime = uni.getStorageSync("popUp-install-time");
				if (!nowTime || new Date().getTime() - nowTime > 1000 * 60 * 60 * 24) {
					//console.log('超出24小时了')
					//alert('超出24小时了')
					//uni.setStorageSync("popUp-install-time", new Date().getTime());
					this.yqhaoyoushow = true;
					//并移除当前时间
					uni.removeStorageSync('popUp-install-time');
				} else {
					//console.log('还没超过24小时了')
					//alert('还没超过24小时了')
					this.yqhaoyoushow = false;
				}
			},
			//监测是否有可领取的奖励并弹窗
			CkNovice() {
				let that = this
				that.GetTaskListNum();
			},
			GetTaskListNum() {
				let that = this
				let serialNo = uni.getStorageSync('thisUuid');
				let machineName = uni.getStorageSync('machineName');
				let ua = uni.getStorageSync('thisUa');
				that.$u.post('/special/activity', {
					deviceId: serialNo,
					deviceType: machineName
				}).then(res => {
					//算出可领取的数量
					let KlqNum = []
					res.data.forEach(function(item, index) {
						if (item.status == 1) {KlqNum.push(item)}
					});
					that.GetQianDao(KlqNum);
				})
			},
			//获取签到
			GetQianDao(list) {
				let that = this
				that.$u.post('/signin/info', {}).then(res => {
					if (res.data.length != 0) {
						let Today = res.data.todaySignIn.today
						let yes_lingqu = []
						res.data.Available.forEach((item, index) => {yes_lingqu.push(item)});
						that.Getgeneralreward(list, yes_lingqu);
					} else {that.Getgeneralreward(list);}
				})
			},
			Getgeneralreward(list, list2) {
				let that = this;
				let klqList = list || []
				let klqList2 = list2 || []
				that.$u.post('/general/reward', {}).then(res => {
					let datas = res.data
					let duiXiang = Object.keys(datas).map(key => ({
						key,
						value: datas[key]
					}));
					let newarry = []
					duiXiang.forEach(function(item, index) {
						if (item.value.status == 1 && item.value.reward > 0) {newarry.push(item)}
					});
					let mergedArr = [...klqList, ...newarry, ...klqList2];
					if (mergedArr.length > 0) {
						setTimeout(() => {this.$refs.openNovice.openPopup();}, 1500)
					}
				})
			},
			Openqr() {
				let that = this
				//console.log('点击二维码', this.qrPath)
			},
			DepositBonusClose() {
				this.showDepositBonus = false
			},
			//获取Welcome Package
			GetWelcomePackage() {
				let that = this
				that.$u.post('/welcome/packet', {

				}).then(res => {
					//首充提示
					let is_newuser = uni.getStorageSync("is_newUser")
					setTimeout(() => {
						if (is_newuser == 1 && res.data.firstPay.extraCountdown > 0 && res.data.payCount == 0 && (res.data.firstPay.switchStatus || res.data.secondPay.switchStatus || res.data.thirdPay.switchStatus)) {
							that.showDepositBonus = true
							that.$refs.Openshows.GetWelcomePackage()
						} else {
							//console.log('加成引导不显示')
							that.showDepositBonus = false
						}
					}, 1500);
				})
			},
			dakitikPopup() {
				this.$refs.openPCdeposit.openPopup()
			},
			ToNocInfo() {
				let windowWidth = uni.getSystemInfoSync().windowWidth;
				if (windowWidth >= "800") {
					this.showPCnc = true
					this.$refs.TZTanchuang.init()
				} else {
					uni.navigateTo({
						url: '/pages/Notification/Notification'
					})
				}
			},
			getSystemUnread() {
				let that = this
				that.$u.post('/query-mail', {
					type: 1,
					lastMailId: 0
				}).then(ress => {
					let unread = [];
					ress.data.forEach((item, index) => {
						if (item.status == 0) {
							unread.push(item.content)
						}
					});
					that.SystemunreadList = unread
				})
			},
			RegisterNowClose(data) {
				if (data == 0) {
					this.showRegisterNow = false
				} else {
					this.showRegisterNow = false
					this.$refs.signInShow.openPopup(2);
				}
			},
			registerNowOpen() {
				this.showRegisterNow = true
			},
			LingQuinstall() {
				let that = this
				let serialNo = uni.getStorageSync('thisUuid');
				let machineName = uni.getStorageSync('machineName');
				let ua = uni.getStorageSync('thisUa');

				that.$u.post('/shortcut/reward', {
					deviceId: serialNo,
					deviceType: machineName
				}).then(res => {
					console.log('安装桌面奖励', res.data)
					//res.data不存在证明领取过了
					//if(res.data){
					//	uni.$emit('UpdataAddBcbalance', (res.data.reward/100).toFixed(2))
					//}
					/*res.data = {
						newBalance: 1100709
						reward: 100
					}*/
				})
			},
			ChaXunrecord() {
				let that = this
				let userid = uni.getStorageSync('userinfo').userId
				//上报充值成功记录查询
				that.$u.post('/recharge/finished/record', {}).then(res => {
					//结构
					//res.data {
					//	actual: 5000
					//	amount: 5000
					//	orderId: "720231027182922002"
					//	payTimes: 1
					//}
					if (res.data.length != 0) {

						var oid = []
						res.data.forEach(function(item, index) {
							oid.push(item.orderId)

							//只有payTimes等于1是首充的
							if (item.payTimes == 1) {
								//Facebook Pixel埋点
								if (window.fbq) {

									//自定义的事件trackCustom是固定的自定义事件类型
									fbq('trackCustom', 'firstDepositArrival', {
										user: userid,
										currency: "RMB",
										amount: item.amount
									});

									//fb官方标准事件
									fbq('track', 'Purchase', {
										currency: "RMB",
										value: item.amount
									});

								}
							}
						});
						var str = oid.join(",");
						that.$u.post('/recharge/reported', {
							orderList: str
						}).then(resv => {
							res.data.forEach(function(item, index) {

								if (window.Unity) {
									//埋点充值成功
									Unity.call('af_purchase&&' + item.amount / 100);
								}
							})
						})
					} else {}
				})
			},
			TochatUrl() {
				let that = this
				const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
				that.$u.post('/game/chat', {
					pid: this.PID,
					lang: language
				}).then(res => {
					that.kefuMsgTag = false
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
					
				});
			},
			getLunbotu() {
				let that = this
				that.$u.post('/game/activity', {
					positionType: 2, //（1 活动列表 2 首页跑马灯 ）
					pid: that.PID, //Number 是 平台Id
				}).then(res => {
					
					console.log('轮播图',res.data)
					
					let newList = [];
					// if(that.PID == 8){
					// 	newList = [{
					// 		content: "",
					// 		endTime: "2024-09-12 12:00:00",
					// 		mobileImage: "/static/image/dataosha_img.jpg",
					// 		pcImage: "/static/image/dataosha_img.jpg",
					// 		startTime: "",
					// 		summary: "",
					// 		title: "大逃杀",
					// 		type: 666
					// 	}];
					// } else {
					// 	newList = [];
					// }
					
					res.data.activities.forEach((item, index) => {
						newList.push({
							content: item.content,
							endTime: item.endTime,
							mobileImage: item.mobileImage,
							pcImage: item.pcImage,
							startTime: item.startTime,
							summary: item.summary,
							title: item.title,
							type: item.type
						})
					});
					that.lunbotuList = res.data.activities
					that.swpier_skeleton_loading = true
				}).catch(err => {
					that.lunbotuList = []
					that.swpier_skeleton_loading = true
					console.log('轮播图err',err)
				})
			},
			//获取历史游戏
			GetLishiGames() {
				let that = this
				that.$u.post('/recent/list', {

				}).then(res => {
					//console.log('历史游戏列表', res)
					that.GameHistory = res.data
					//操作初始化swpier组件
					// #ifndef APP-PLUS
					// that.$nextTick(() => {
					// 	that.$refs.homeGames.getSwiper3()
					// })
					// #endif
				})
			},
			ckickisToken() {
				let isToken = uni.getStorageSync("token");
				let serialNo = uni.getStorageSync('thisUuid');
				let machineName = uni.getStorageSync('machineName');
				let ua = uni.getStorageSync('thisUa');
				if (!isToken) {

				} else {
					this.$u.post('/login-token', {
						serialNo: serialNo,
						machineName: machineName
					}).then(res => {
						
						//更新缓存token
						uni.setStorageSync('token', res.data.token)
						uni.setStorageSync('userinfo', res.data)
						
					}).catch(err => {
						uni.removeStorageSync('token');
						uni.removeStorageSync("userinfo")
						uni.$emit('getinspectToken', 1)
						uni.reLaunch({
							url: '/pages/index/index'
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	
	
	
	.dibuvs {
		/deep/ .page_wrap {
			padding-bottom: 100px !important;
		}
	}
	
	.games_list_wrap {
		//margin-bottom: 24rpx;
		margin-top: 60rpx;
	
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
	.jrsx_img {
		position: relative;
		cursor: pointer;
	}
	
	.goods-icon {
		//background-color: #1d2532;
		cursor: pointer;
	}
	
	.csName_title {
		font-size: 24rpx;
		text-align: center;
		color: $all-secondary-text-color;
		position: absolute;
		bottom: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		width: 100%;
		text-shadow: 0 .02rem .04rem rgba(0, 0, 0, .3);
	}
	
	.page-content {
		margin-top: 20rpx;
		padding: 0 0 50rpx 0;
		position: relative;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	
		.biaoti_box {
			padding: 0 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
	
			.biaotilan {
				display: flex;
				align-items: center;
				font-weight: 700 !important;
				color: #fefefe;
				font-size: 16px;
	
				image {
					width: 22px;
					height: 22px;
					margin-right: 10rpx;
				}
			}
	
			span {
				font-size: 24rpx;
				color: #999;
			}
		}
	
		.youxitu {
			width: 150rpx;
			height: 150rpx;
			border-radius: 14rpx;
		}
	
		.look_btn {
			.suanduos {
				font-size: 22rpx;
				text-align: center;
				color: #7f8692;
				font-weight: initial;
				margin-bottom: 16rpx;
			}
		}
	}
	
	.lookAll {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 0 0 0;
	
		view {
			color: #2283f6;
			font-size: 14px;
			cursor: pointer;
		}
	}
	
	.tabbody {
		padding: 60rpx 30rpx 0 30rpx;
		width: 100%;
	}
	
	.tabbody2 {
		padding: 60rpx 30rpx 0 30rpx;
		width: 100%;
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
	.zheceng {
		width: 100rpx;
		height: 98.5%;
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
	
	.jrsx_item2 {
		flex: 1;
		position: relative;
	}
	
	.rec_bottom {
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
	
	
	.all {
		position: relative;
		height: 242px;
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
		height: 242px;
	}
	
	.nav-bar-item {
		width: 220rpx;
		padding-top: 22rpx;
		margin-right: 16rpx;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.achd_popup_dh {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) !important;
	}
	.achd_popup_box {
		z-index: 999999;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) !important;
		width: 700rpx;
		height: auto;
		.today_hide {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20rpx;
			.checkbox {
				color: #ffffff;
			}
		}
		.swiper_popup_box {
			position: relative;
			width: 700rpx;
			.prevleft {
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(30, 37, 49, 0.43);
				border-radius: 200rpx;
				margin: 0 0 0 0;
				position: absolute;
				z-index: 2;
				top: 50%;
				left: 0%;
				transform: translate(20%, 0%) !important;
				cursor: pointer;
			}
			.nextright {
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(30, 37, 49, 0.43);
				margin: 0 0 0 0;
				border-radius: 200rpx;
				position: absolute;
				z-index: 2;
				top: 50%;
				right: 0%;
				transform: translate(-20%, 0%) !important;
				cursor: pointer;
			}
			.swiper {
				
			}
			.achdtu {
				width: 100%;
				height: 540px;
				cursor: pointer;
			}
		}
	}
	.hd_guanbi {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		
		//position: absolute;
		// bottom: 8%;
		// left: 0;
		// right: 0;
		// margin: 0 auto;
		// z-index: 999999;
		
		image {
			width: 70rpx;
			height: 70rpx;
			cursor: pointer;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	page {
		background-color: $pupUp-bg-color;
	}
	.erweim {
		position: absolute;
		top: -100px;
		left: -100px;
		opacity: 0;
	}

	.tz_wrap {
		width: 100%;
		height: 600px;
		background-color: #1e2531;
		border-radius: 14px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10078;

		.tc_lan {
			padding: 20px;
		}

		.guanbi {
			border-radius: 14px 14px 0 0;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			cursor: pointer;
			//border-bottom: 1px solid #1e2531;
			padding: 30rpx 30rpx !important;
			background: linear-gradient(180deg, #003370, #08264a 40%, #1e2531);

			.reg_titles {
				view {
					color: $all-secondary-text-color;
					font-weight: bold;
					font-size: 38rpx !important;
				}
			}
		}
	}

	.content_wrap {
		background-color: $home-games-wrap-color !important;
		margin-inline: auto;
		max-width: 1648px;
		width: 100%;
	}
	
	.list_wrap_box {
		background-color: $home-games-wrap-color !important;
		margin-inline: auto;
		max-width: 1648px;
		width: 100%;
	}
	
	.CbianKfu_pc {
		position: fixed;
		top: 250rpx;
		right: 0;
		z-index: 98;
		.msg_info_wrap {
			cursor: pointer;
			background-color: #1d2532;
			box-shadow: 0px 0 16px 0px #000000;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			position: absolute;
			left: -315px;
			width: 300px;
			bottom: 0;
			border: 1px solid #273243;
			.msg_info {
				position: relative;
				padding: 20rpx 16rpx 20rpx 20rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.right_sanjiao {
					background-color: #1d2532;
					width: 26rpx;
					height: 26rpx;
					border-radius: 6rpx;
					position: absolute;
					right: -10rpx;
					transform: rotate(45deg);
				}
				.kefu_icon {
					background-color: #374457;
					border: 1px solid #1bb83d;
					width: 60rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-radius: 12rpx;
					position: relative;
					span {
						position: absolute;
						top: -7px;
						left: -7px;
						display: inline-block;
						background: linear-gradient(1turn, #1bb83d .8%, #1bb83d);
						box-shadow: 0 3px 16px #005413, inset 0 4px 3px #ffffff4d;text-align: center;
						color: #FEFEFE;
						width: 14px;
						height: 14px;
						line-height: 14px;
						font-size: 10px;
						z-index: 9;
						border-radius: 4px;
						border: 2px solid $all-secondary-color;
						font-weight: bold;
					}
					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 12rpx;
					}
				}
				.gb_icon {
					position: relative;
					z-index: 666;
					margin-left: auto;
					.u-icon {
						background-color: #273243;
						border-radius: 10rpx;
						padding: 12rpx;
						font-size: 22rpx;
						cursor: pointer;
						position: relative;
						top: 0;
					}
				}
				.kefu_info {
					padding-left: 16rpx;
					padding-right: 14rpx;
					.msg_info_title {
						line-height: 15px !important;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;
						color: #1bb83d;
					}
					.msg_info_text {
						line-height: initial !important;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
						color: #FEFEFE;
						font-size: 24rpx;
					}
				}
				.biansanjiao {
					position: absolute;
					width: 37rpx;
					height: 15rpx;
					right: -34rpx;
					bottom: -2rpx;
				}
			}
		}
	}

	.CbianKfu {
		position: fixed;
		bottom: 400rpx;
		right: 0;
		z-index: 98;
		box-shadow: 3px 0px 7px 0px rgba(0, 0, 0, 0.7);
		background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
		box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
		width: 70rpx;
		line-height: 70rpx;
		// text-align: center;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		padding: 20rpx 0;
		border-radius: 10rpx 0 0 10rpx;
		.kf_text {
			color: #ffffff;
			writing-mode: vertical-rl;
		}
		.msg_num {
			writing-mode: horizontal-tb;
			background: linear-gradient(1turn, #1bb83d .8%, #1bb83d);
			text-align: center;
			color: #FEFEFE;
			margin: 12rpx auto 0;
			width: 40rpx;
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 12px;
			z-index: 9;
			border-radius: 4px;
			border: 2px solid $all-secondary-color;
			font-weight: bold;
		}
		.msg_info_wrap {
			background-color: #1d2532;
			box-shadow: 0px 0 16px 0px #000000;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			position: absolute;
			left: -260px;
			width: 250px;
			bottom: 0;
			border: 1px solid #273243;
			.msg_info {
				position: relative;
				padding: 10rpx 16rpx 10rpx 16rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.right_sanjiao {
					background-color: #1d2532;
					width: 26rpx;
					height: 26rpx;
					border-radius: 6rpx;
					position: absolute;
					right: -10rpx;
					transform: rotate(45deg);
				}
				.kefu_icon {
					background-color: #374457;
					border: 1px solid #1bb83d;
					width: 60rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-radius: 10rpx;
					image {
						width: 60rpx;
						height: 60rpx;
					}
				}
				.gb_icon {
					position: relative;
					z-index: 3;
					margin-left: auto;
					.u-icon {
						background-color: #273243;
						border-radius: 10rpx;
						padding: 12rpx;
						font-size: 22rpx;
						cursor: pointer;
						position: relative;
						top: 0;
					}
				}
				.kefu_info {
					padding-left: 16rpx;
					padding-right: 14rpx;
					.msg_info_title {
						line-height: 15px !important;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;
						color: #1bb83d;
					}
					.msg_info_text {
						line-height: initial !important;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
						color: #FEFEFE;
						font-size: 24rpx;
					}
				}
				.biansanjiao {
					position: absolute;
					width: 37rpx;
					height: 15rpx;
					right: -34rpx;
					bottom: -2rpx;
				}
			}
		}
		
	}

	.notice-bar {
		padding: 0 10rpx 0 6rpx;
		cursor: pointer;
	}

	.marginTop10 {
		margin-top: 20rpx;
	}

	.qiliuba_hylb {
		width: 330px;
		max-width: 430px;
		height: auto;
		position: fixed;
		bottom: 66px;
		z-index: 99;
		right: 0;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	@media (min-width: 800px) {
		.page-content {
			padding: 0 56rpx 80rpx 56rpx;
		}

		.notice-bar {
			padding: 5rpx 80rpx 15rpx 60rpx;
		}

		.qiliuba_hylb {
			bottom: 0;
			width: 400px;
		}
			
		.games_list_wrap {
			padding-right: 0;
			margin-top: 0 !important;
			margin-bottom: 12px;
		}
		
		.nav-bar-item {
			width: 165px;
		}
			
		.rec_bottom .scrollx_items {
			width: 165px;
		}
			
		.banshi2 .swiper-slide image {
			//max-height: 324rpx;
		}
	}

	.kundugu {
		width: 92% !important;
		margin: 30rpx auto !important;
	}
	
</style>