<template>
	<view :style="theme">
		
		
		<u-popup v-model="pc_wallisShow" width="650" height="90%" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="false">
			
			<u-sticky width="100%" bg-color="transparent" offset-top="0" h5-nav-height="0">
				<view class="yztg_box_wrap">
					<view class="yztg_box">
						<image src="/static/image/dunpai.png"></image>
						<view>{{$t('ADDnew2.Security Verification')}}</view>
					</view>
				</view>
				<view class="nav_top_box_wwrap">
					<view class="nav_top_box">
						<view class="nav_top_box_left">
							<view class="fanhui_btn" @click="FanHuiPages()"><u-icon name="arrow-left" color="#007aff"></u-icon></view>
							<view class="cz_title">{{$t('DEPBtn')}}</view>
						</view>
				
						<view class="nav_top_box_right" v-if="tabsidx == 0">
							<view class="lsjl"><u-icon name="clock" color="#007aff" @click="Tolijilu0(0)"></u-icon></view>
						</view>
						<view class="nav_top_box_right" v-if="tabsidx == 1">
							<view class="lsjl"><u-icon name="clock" color="#007aff" @click="Tolijilu1(1)"></u-icon></view>
						</view>
					</view>
				</view>
			</u-sticky>
			
							
			
			<view class="tabs_box_wrap" v-show="tabsidx == 0">
				<view class="tabs_box">
					<view class="tabs_item" v-for="(item,index) in PopularListW1" :key="index" @click="clicktabs(index)">
						<view class="item_name" :class="czTabsIdx == index?'xzuanzhong':''">
							<view>{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="Currency_selection_wrap">
				<view class="Currency_s_cus_item">
					<Currency-Selection ref="xuanzeCS" :showData="selectList" :defaultIcon="defaultIcon" :selLabels="selLabels" @Lowchange='CSchange'></Currency-Selection>
				</view>
				<view class="Currency_s_cus_item">
					<Payment-method-selection ref="xuanzeZF" :showData="selectList2" :defaultIcon="defaultIcon2" :selLabels="selLabels2" @LowchangeTwo='CSchange2'></Payment-method-selection>
				</view>
			</view>
							
			<view class="page_wrap">
							
				<!-- <view class="huobi_cools_box" v-if="!showChongZhileixing">
					<view class="jiamihuobi" v-if="JiaMiHbList.length != 0">
						<view class="huobi_cools_title">{{$t('jmhb')}}</view>
						<u-row gutter="16">
							<u-col span="3" v-for="(itemhb,indexhb) in JiaMiHbList" :key="indexhb">
								<view class="huobiList_box" @click="JiaMiHuoBi(itemhb,indexhb)">
									<image :src="staticDname + '/pay/' + itemhb.abbr + '.png'"></image>
									<view>{{itemhb.abbr}}</view>
								</view>
							</u-col>
						</u-row>
					</view>
					<view class="jiamihuobi" v-if="JiaMiHbListFB.length != 0">
						<view class="huobi_cools_title">{{$t('fbck')}}</view>
						<u-row gutter="16">
							<u-col span="3" v-for="(itemfb,indexfb) in JiaMiHbListFB" :key="indexfb">
								<view class="huobiList_box" @click="JiaMiHuoBi(itemfb,indexfb)">
									<image :src="staticDname + '/pay/' + itemfb.abbr + '.png'"></image>
									<view>{{itemfb.abbr}}</view>
								</view>
							</u-col>
						</u-row>
					</view>
				</view> -->
							
							
				<uni-transition class="qiliuba_hylb" :mode-class="['fade', 'slide-bottom']" :show="showChongZhileixing">
					<view v-show="tabsidx == 0">
						<!-- <view class="type_box"> -->
							<!-- <view class="type_box_title"> -->
								<!-- <view class="ttpetitle">{{$t('PayMethod')}}</view> -->
								<!-- <view class="bizhong" @click="ChongXuanBz()">
									<view class="bztitle">
										<view>{{$t('bizhong')}}</view>
									</view>
									<view class="bzxz">
										<image :src="YiXuanHuoBiInfo.icon"></image>
										<view>{{YiXuanHuoBiInfo.abbr}}</view>
										<view class="sanjiao"><u-icon name="arrow-down" size="22" color="#fff"></u-icon>
										</view>
									</view>
								</view> -->
							<!-- </view> -->
							<!--Swpier_box-->
							<!-- <view class="bottom_swpier_bpx_wrap"> -->
								<!-- <scroll-view :scroll-x="true" class="scrollview-box-bottom">
									<view class="scroll_item_box_bottom PayMethod_wrap" v-for="(Pitem,Pinex) in opTions" :key="Pinex">
										<view class="demo-layout" :class="PayMethodOneIndex == Pinex?'mren_sc':''" @click="selectOne(Pitem,Pinex)">
											<image class="line_icon" :src="payIconUrl + '/pay/' + Pitem.value + '.png'"></image>
										</view>
									</view>
								</scroll-view> -->
								<!-- <u-row gutter="16">
									<u-col span="3" v-for="(Pitem,Pinex) in opTions" :key="Pinex">
										<view class="PayMethod_wrap">
											<view class="demo-layout" :class="PayMethodOneIndex == Pinex?'mren_sc':''" @click="selectOne(Pitem,Pinex)">
												<view class="pay_type">
													<image class="line_icon" :src="payIconUrl + '/pay/' + Pitem.value + '.png'"></image>
													<view>{{Pitem.label}}</view>
												</view>
											</view>
										</view>
									</u-col>
								</u-row> -->
							<!-- </view> -->
						<!-- </view> -->
						<view class="type_box">
							<view class="type_box_title">{{$t('PayProvider')}}</view>
							<!--Swpier_box-->
							<view class="bottom_swpier_bpx_wrap">
								<scroll-view :scroll-x="true" class="scrollview-box-bottom">
									<view class="scroll_item_box_bottom PayProvider_wrap" v-for="(Vitem,Vinex) in opTions2" :key="Vinex">
										<view class="demo-layout" :class="PayProviderOneIndex == Vinex?'mren_sc':''" @click="selectOne2(Vitem,Vinex)">
											<text :class="[PayProviderOneIndex == Vinex?'xzfontColor':'mzfontColor']">{{Vitem.name}}</text>
											<view class="son4" v-if="Vitem.rate != 0"><span>+{{Vitem.rate/10}}%</span></view>
										</view>
									</view>
								</scroll-view>
								<!-- <u-row gutter="16">
									<u-col span="3" v-for="(Vitem,Vinex) in opTions2" :key="Vinex">
										<view class="PayProvider_wrap">
											<view class="demo-layout" :class="PayProviderOneIndex == Vinex?'mren_sc':''" @click="selectOne2(Vitem,Vinex)">
												<text :style="{color: PayProviderOneIndex == Vinex?'#ffffff':'#ffffff'}">{{Vitem.name}}</text>
												<view class="son4" v-if="Vitem.rate != 0"><span>+{{Vitem.rate/10}}%</span></view>
											</view>
										</view>
									</u-col>
								</u-row> -->
							</view>
						</view>
							
						<view class="type_list">
							<view class="list_item" style="display: block;">
								<view class="type_title">
									{{$t('ChooseM')}}
									<view class="Tip_box2" v-if="currency_rate != 1">
										<view>
											<image class="fabifu_icon" :src="YiXuanHuoBiInfo.icon"></image>
											1{{YiXuanHuoBiInfo.abbr}}=
											<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
											<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
											<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
											{{currency_rate || 0}}
										</view>
									</view>
								</view>
							
							
							
							
							
							
							
							
							
							
								<view class="wallet_input" :class="input_border == 1?'input_border':''">
									<view class="wallet_input_I">
										<image class="fabifu_icon" :src="YiXuanHuoBiInfo.icon"></image>
										<u-input v-model="wallet" type="textarea" :auto-height="false" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" :placeholder="Inputrange" :clearable="false" @input="Oneinput" @blur="ChooseBlur" @focus="Choosefocus" />
										<view class="Fabifu">
											{{YiXuanHuoBiInfo.abbr}}
										</view>
									</view>
								</view>
							
								<view class="type_title" style="margin: 20rpx 0 0 0;padding-bottom: 0;" v-if="HuoDeJinBi > 0">
									<view class="new_njhd">
										<view>{{$t('njhde')}}</view>
										<view class="zzhd_num">
											{{Number(HuoDeJinBi).toFixed(2)}}
											<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
											<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
											<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
										</view>
										<view class="bili" v-if="Extra != 0">
											<view class="ewwaijia">
												{{$t('NewlyAdded.Extra')}}{{(Extra).toFixed(2)}}
											</view>
											<zb-tooltip placement="top-end" ref="tooltip3" color="#202a3b">
												<view slot="content">
													<view class="poptptopis">
														{{$t('Wtopis1',{l:firstPay.multiples})}}{{$t('Wtopis2')}}
													</view>
												</view>
												<u-icon v-if="switchChecked && firstpayCount<=3" name="/static/image/wenhao2.png" size="35" color="#ffffff" top="2"></u-icon>
											</zb-tooltip>
										</view>
									</view>
									<!-- <view class="Tip_box2" v-if="currency_rate != 1"> -->
										<!--  v-if="selecValue == 'USDT'" -->
										<!-- <view>{{$t('Needtopay')}}<span>{{Currency_Rate}}</span>{{YiXuanHuoBiInfo.abbr}}</view> -->
										<!-- <view>1{{YiXuanHuoBiInfo.abbr}}={{currency_rate || 0}}
											<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
											<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
											<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
										</view> -->
									<!-- </view> -->
								</view>
								<!-- <view class="wallet_input wallet_input2">
									
									<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
									<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
									<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
									
									<view class="wallet_input_I2">
										<view class="hdJinBi">{{Number(HuoDeJinBi).toFixed(2)}}</view>
										<view class="bili" v-if="Extra != 0">
											<view class="ewwaijia">{{$t('NewlyAdded.Extra')}}{{(Extra).toFixed(2)}}</view>
											<zb-tooltip placement="top-end" ref="tooltip3" color="#202a3b">
												<view slot="content">
													<view class="poptptopis">
														{{$t('Wtopis1',{l:firstPay.multiples})}}{{$t('Wtopis2')}}
													</view>
												</view>
												<u-icon v-if="switchChecked && firstpayCount<=3" name="/static/image/wenhao2.png" size="35" color="#ffffff" top="2"></u-icon>
											</zb-tooltip>
										</view>
									</view>
								</view> -->
							
							
								<view class="type_title" style="margin: 20rpx 0 0 0;" v-if="dengjilist.length!=0">
									{{$t('xuanzejine')}}
								</view>
								<view class="xuanze_box_list" v-if="dengjilist.length!=0">
									<u-row gutter="16">
										<u-col span="3" v-for="(item,index) in dengjilist" :key="index" @click="dengjicoolsBtn(item,index)">
											<view :class="[dengjiindx == index?'classxuanzhong':'bg-purple']">
												<text>{{YiXuanHuoBiInfo.mark}}</text>{{item}}
											</view>
										</u-col>
									</u-row>
								</view>
							</view>
						</view>
						<view class="Tip_box" v-if="tips && firstpayCount>=3">Tip: {{tips}}</view>
						<!--&& (selecValue != 'USDT' || selecValue != '汇旺支付') -->
						<view class="card__main-bottombain" v-if="dengjilist.length!=0"></view>
						<view class="is_xuanze_free"
							v-if="(firstpayCount < 3 || firstPay.countdown > 0) && PackageswitchStatus">
							<view class="xuanze_free_item">
								<view class="xuanze_free_item_title_box">
									<view>
										<image src="/static/image/liwu2.png"></image> {{$t('DepositPageBonus.Packge')}}
									</view>
									<view>
										<span>{{$t('DepositPageBonus.EARNBonus')}}</span>
										<u-switch v-model="switchChecked" size="30" active-color="#2e70dd"
											inactive-color="#394559" @change="switchChange"></u-switch>
									</view>
								</view>
								<view class="free_item_lookmore" v-if="switchChecked" @click="LookMoreDetails()">
									<text>{{$t('DepositPageBonus.More')}}</text>
									<u-icon name="arrow-right" size="26" color="#2283f6"></u-icon>
								</view>
								<view class="tishi_box" v-if="!switchChecked">
									<u-icon name="warning-fill" size="32" color="#f1d409"></u-icon>
									<span>{{$t('DepositPageBonus.CLOSE')}}</span>
								</view>
								<view class="free_info_wrap" v-if="switchChecked">
									<view class="free_info_item" v-if="firstPay.extraCountdown > 0">
										<view class="free_info_title">{{$t('DepositPageBonus.DepBonusPlus')}}</view>
										<view class="free_info_daojishi">
											<view class="free_djs_left">
												<view>{{$t('DepositPageBonus.UPTO')}}
													<image src="/static/image/huo.png"></image>
													<span>{{MaxRates}}%</span>
												</view>
											</view>
											<view class="free_djs_right">
												<u-count-down :timestamp="firstPay.extraCountdown" :show-days="false"
													:show-border="false" font-size="28" color="#ffffff"
													border-color="#025de9" bg-color="#025de9" separator-color="#ffffff"
													@end="firstPayExtraCountdownend"></u-count-down>
											</view>
										</view>
									</view>
									<view class="free_info_more">
										<view class="free_info_more_item" v-for="(itemF,indexF) in firstPay.cfg" :key="indexF">
											<span class="more_item_bg1" v-if="indexF == 0"></span>
											<span class="more_item_bg2" v-if="indexF == 1"></span>
											<span class="more_item_bg3" v-if="indexF == 2"></span>
											<view class="more_item_text">{{$t('DepositPageBonus.depto')}}
												<p>{{(itemF.payAmount/100).toFixed(0)}}</p>
												{{$t('DepositPageBonus.andget')}}
												<p>{{itemF.rate}}%</p> <span v-if="firstpayCount == 0 && firstPay.extraCountdown > 0">+{{itemF.extraRate}}%</span>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</uni-transition>
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
				<view v-show="tabsidx == 1">
					<view class="type_box">
						<view class="type_box_title">{{$t('WDMethod')}}</view>
						<view class="type_box_item">
							<image class="line_icon_2" :src="payIconUrl + '/pay/' + MorenType + '.png'"></image>
							<easy-select ref="easySelect3" :Discountratio="false" :options="opTions3"
								:value="selecValue3" @selectOne="selectOne3"></easy-select>
						</view>
					</view>
					<view class="type_box">
						<view class="type_box_title">{{$t('WDAccount')}}<span @click="toguanli()">{{$t('ManageAccountPage.title')}}</span></view>
						<view class="type_box_item">
							<image class="line_icon_2" :src="payIconUrl + '/pay/' + MorenType + '.png'"></image>
							<easy-select ref="easySelect4" :Discountratio="false" :HideLeft="1" :options="opTions4" :value="selecValue4" @selectOne="selectOne4"></easy-select>
						</view>
					</view>
					<view class="type_box">
						<view class="type_box_title">
							<view>{{$t('WDM')}}</view>
							<view style="color: #B1BAD3;">{{$t('xianedu')}}{{InputAmount}}</view>
						</view>
						<view class="wallet_input" :class="input_border2 == 1?'input_border':''">
							
							<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
							<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
							<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
							
							<view class="wallet_input_I">
								<u-input v-model="walletNum" @blur="withdrawAmount" @input="withdrawAmountInput" @focus="withdrawAmountbulr" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" :placeholder="InputAmount" :clearable="false" />
								<view class="addMax" @click="AddMax()">{{$t('VaultPage.Max')}}</view>
							</view>
						</view>
					</view>
					<view class="Available">
						<view class="Available_item" style="padding-right: 20rpx;" @click="renew()">
							<view class="Available_item_box">
								<view><u-icon name="/static/image/tx_qianbao.png" size="44"></u-icon></view>
								<view>{{$t('Available')}}:</view>
								<view class="a_bold">{{Number(balance).toFixed(2)}}
									<image :class="{'rotate360':showAnimate}" src="/static/image/imedia-refresh_107975.png"></image>
								</view>
							</view>
						</view>
						<!-- <view class="Available_item">
							<view class="Available_item_box">
								<view><u-icon name="/static/image/tx_yhka.png" size="62"></u-icon></view>
								<view>投注达到以下可提现</view>
								<view class="a_bold" @click="LockFundsPopup()">5000.00<u-icon name="question-circle-fill" size="30" color="#566488"></u-icon></view>
							</view>
						</view> -->
					</view>
					<view class="amount_info">
						<view class="amount_info_item">
							<view>{{$t('WDM')}}:</view>
							<span>{{toFixedTwo(walletNum)}}
							<image class="" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
							<image class="" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
							<image class="" src="/static/image/jinbi-3.png" v-else></image>
							</span>
						</view>
						<view class="amount_info_item">
							<view>{{$t('Fee')}}:</view>
							<span>{{toFixedTwo(is_Fee)}}
							<image class="" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
							<image class="" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
							<image class="" src="/static/image/jinbi-3.png" v-else></image>
							</span>
						</view>
						<view class="amount_info_item">
							<view>{{$t('yujidaozhang')}}:</view>
							<span class="amii_bg">{{toFixedTwo(YuJiDaoZhang)}}
							<image :src="staticDname + '/pay/' + MorDz_abbr + '.png'"></image>
							</span>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 40rpx;"></view>
			
			<view class="look_all_btn" v-show="tabsidx == 0">
				<view v-if="JinZhiTZ == 0">
					<view v-if="!isDisabled" class="NovBtn2" @click="PanDuaniSGouxuan()"><span>{{$t('DEP')}}</span></view>
					<view v-else class="NovBtn2 NovBtn3"><span>{{$t('DEP')}}</span></view>
				</view>
				<view v-else-if="JinZhiTZ == 1">
					<view class="xutouzhu">
						<u-icon name="warning-fill" color="#f1d409" size="32"></u-icon>
						<view>{{$t('hbqian')}}{{$t('DEPBtn')}}！<span @click="LianXiKeFu()">{{$t('OrderProgerss.support')}}</span>
						</view>
					</view>
					<view class="NovBtn2 NovBtn3"><span>{{$t('DEP')}}</span></view>
				</view>
			</view>
			
			<view class="look_all_btn" v-show="tabsidx == 1">
				<view v-if="JinZhiDH == 0">
					<view class="xutouzhu" v-if="DaiWWanCheng>0">
						<u-icon name="warning-fill" color="#f1d409" size="32"></u-icon>
						<view>{{$t('Betting requirements.register1')}}<span
								@click="LockFundsPopup()">{{ DaiWWanCheng }}</span>{{$t('Betting requirements.register2')}}!</view>
					</view>
					<view class="NovBtn2" @click="PanDuaniSGouxuan2()" v-if="!isDisabledTwo && DaiWWanCheng <= 0">
						<span>{{$t('popupbtn')}}</span></view>
					<view class="NovBtn2 NovBtn3" v-else><span>{{$t('popupbtn')}}</span></view>
				</view>
				<view v-else-if="JinZhiDH == 1">
					<view class="xutouzhu">
						<u-icon name="warning-fill" color="#f1d409" size="32"></u-icon>
						<view>{{$t('hbqian')}}{{$t('WDBtn')}}！<span @click="LianXiKeFu()">{{$t('OrderProgerss.support')}}</span>
						</view>
					</view>
					<view class="NovBtn2 NovBtn3"><span>{{$t('popupbtn')}}</span></view>
				</view>
			</view>
			
		</u-popup>
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		<!-- 账户管理 -->
		<pc-manageAccount ref="openPCmange"></pc-manageAccount>
		<!-- 充提详情 -->
		<pc-myPageDetails ref="openPCdetails"></pc-myPageDetails>
		
		
		<!--首充次数弹窗-->
		<First-recharge-frequency ref="FirstRechargeOpen"></First-recharge-frequency>
		<LockFunds-Popup ref="LockFundsopenPopup"></LockFunds-Popup>
		
		<Fun-Password ref="funpassword" :type="1" @UpUserinfo="Upuserinfo"></Fun-Password>
		<input-Fun-Password ref="inputFunPass" :Morentype="MorenType" :PayType="selecValue3" :TixianAccount="selecValue4" :TixianAmount="walletNum" :TixianSxf="ActualPayment" @GetpayPassword="GetPayPassword"></input-Fun-Password>

		<Verify-phone-number ref="openvpnShow"></Verify-phone-number>

	</view>
</template>

<script>
	import Vue from 'vue';
	
	import Enumerable from 'linq';
	
	import md5Libs from "uview-ui/libs/function/md5";
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	
	export default {
		name:"pc-Deposit",
		components: {
			cusSelects
		},
		data() {
			return {
				platform: this.PID,
				HuoDeJinBi: 0,
				staticDname: '',
				YiXuanHuoBiInfo: {}, //选了某个加密货币的数据
				showChongZhileixing: true,
				JiaMiHbList: [],
				JiaMiHbListFB: [],
				
				//法币的第一个货币列表
				selectList: [],
				selLabels: '',//默认选择显示的title
				defaultIcon: '',//默认选择显示的icon
				
				selectList2: [],
				selLabels2: '',//默认选择显示的title
				defaultIcon2: '',//默认选择显示的icon
				
				pc_wallisShow: false,
				JinZhiTZ: 0, //禁止充值
				JinZhiDH: 0, //禁止兑换
				
				payIconUrl: '',
				switchChecked: false, //礼包开关
				PayMethodOneIndex: 0,
				PayProviderOneIndex: 0,
				DEPBtnLoading: false,
				Pageloadingtrue: true,
				input_border: 0,
				input_border2: 0,
				isDisabled: true,
				isDisabledTwo: true,
				showAnimate: false,
				is_login: 0,
				wallet: '',
				Extra: 0,
				Available: '0.00',
				opTions: [],
				selecValue: '',
				selecValue2: '',
				opTions2: [],
				opTions2Rate: 0,
				is_Rate: 0,
				is_Peak: 0,
				
				MorenType: null,
				selecValue3: '',
				opTions3: [],
				selecValue4: '',
				opTions4: [],
				AmountId: '',
				InputAmount: '',
				tabsList: [],
				
				tabsidx: 0,
				czTabsIdx: 0,
				
				Selectedmethod: {},
				Inputrange: '',
				ChooseAmountMin: 0,
				ChooseAmountMax: 0,
				dengjilist: [],
				dengjiindx: -1,
				walletNum: '',
				placeholderStyle: "color: #8e99a2;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold",
					fontSize: '15px'
				},
				placeholderStyle_1: "color: #8e99a2;fontWeight: initial;",
				customStyle_1: {
					fontWeight: "bold",
					fontSize: '15px'
				},
				userInfo: {},
				balance: 0,
				Confirmloading: false,
				Lowmin: '',
				Peakmax: '',
				Ratemin: '',
				
				YuJiDaoZhang: 0,
				MoRenDzHuiLv: 0,
				MorDz_abbr: '',
				MorDz_mark: '',
				
				
				tips: '',
				is_Fee: 0,
				ActualPayment: 0,
				WithhdrawalAmountMin: 0,
				WithhdrawalAmountMax: 0,
				myAccountList: [],
				
				payCount: null,
				firstpayCount: 0,
				PackageswitchStatus: false,
				firstPay: {
					cfg: [],
					countdown: 0,
					extraRate: 0,
					maxBonus: 0,
					multiples: 0,
					rewardRate: 0,
					status: 0,
					switchStatus: false
				},
				secondPay: {
					cfg: [],
					countdown: 0,
					rewardRate: 0,
					status: 0
				},
				thirdPay: {
					cfg: [],
					countdown: 0,
					rewardRate: 0,
					status: 0
				},
				MaxRates: 0,
				
				Currency_Rate_hw: 0,
				Currency_Rate: 0,
				currency_rate: 0,
				DaiWWanCheng: 0
				
			}
		},
		computed: {
			PopularListW1() {
				let arry = [{
					name: this.$t('jmhb')
				}, {
					name: this.$t('fbck')
				}]
				return arry
			},
		},
		created() {
			
		},
		mounted() {
			//this.init();
		},
		methods: {
			init(){
				let that = this
				that.payIconUrl = uni.getStorageSync('Musicdomains');
				that.staticDname = uni.getStorageSync('Musicdomains');
				
				that.Pageloadingtrue = true;
				setTimeout(() => {
					that.Pageloadingtrue = false;
				}, 1000)
				
				let isToken = uni.getStorageSync("token");
				if (!isToken) {
					that.is_login = 0;
					setTimeout(() => {
						that.$refs.signInShow.openPopup();
					}, 400)
				} else {
					that.GetPayList();
					that.is_login = 1
					that.GetWelcomePackage(); //获取欢迎礼包
					that.getwithdrawChannel();
					that.getMybalance()
					that.getuserinfo()
					that.GetMyAccount()
					that.ChaXunrecord()
					that.PayCountNum()
					that.getDaiWanCheng()
					that.isJinZhi_TZ();
					that.isJinZhi_DH();
					
					uni.$emit('ZhuRulookBenDihb', 1);
					
				}
			},
			
			
			
			
			
			
			
			
			
			
			
			
			openPopup() {
				this.init();
				this.pc_wallisShow = true
			},
			closewindows() {
				this.pc_wallisShow = false
			},
			toFixedTwo(val){
				var str = Number(val).toFixed(2)
				return str;
			},
			JiaMiHuoBi(item, idx) {
				console.log('选择某个加密货币', item)
				let that = this
				
				that.YiXuanHuoBiInfo = {
					abbr: item.abbr,
					currency_rate: item.currency_rate,
					digits: item.digits,
					id: item.id,
					mark: item.mark,
					methods: item.methods,
					name: item.name,
					icon: that.staticDname + '/pay/' + item.abbr + '.png'
				}
				that.showChongZhileixing = true
			
				that.PayMethodOneIndex = 0
				that.PayProviderOneIndex = 0
				that.dengjiindx = -1
				that.selecValue = item.methods[0].name
			
				that.$nextTick(() => {
					that.Extra = 0
					that.Amount = ''
					that.wallet = ''
					that.isDisabled = true
					that.Currency_Rate = 0
					that.Currency_Rate_hw = 0
					that.HuoDeJinBi = 0
				});
				
				//设置默认usdt的汇率
				that.currency_rate = item.currency_rate
				that.getrecharge(item.methods);
			
			},
			ChongXuanBz() {
				let that = this
				that.showChongZhileixing = false
				that.isDisabled = true
			},
			
			
			
			
			
			
			
			
			
			//法币选择
			CSchange(item) {
				let that = this
				console.log('这里返回的是value值',item) //这里返回的是value值
				
				that.YiXuanHuoBiInfo = {
					abbr: item.abbr,
					currency_rate: item.currency_rate,
					digits: item.digits,
					id: item.id,
					mark: item.mark,
					methods: item.methods,
					name: item.name,
					icon: that.staticDname + '/pay/' + item.abbr + '.png'
				}
				that.showChongZhileixing = true
				
				that.PayMethodOneIndex = 0
				that.PayProviderOneIndex = 0
				that.dengjiindx = -1
				that.selecValue = item.methods[0].name
				
				that.$nextTick(() => {
					that.Extra = 0
					that.Amount = ''
					that.wallet = ''
					that.isDisabled = true
					that.Currency_Rate = 0
					that.Currency_Rate_hw = 0
					that.HuoDeJinBi = 0
				});
				
				//设置默认usdt的汇率
				that.currency_rate = item.currency_rate
				that.getrecharge(item.methods);
				
				//设置默认显示第一个的支付方式名字和图标
				that.$refs.xuanzeZF.init(that.selectList2[0].label,that.selectList2[0].icon);
				
			},
			//支付方式选择
			CSchange2(item,index) {
				let that = this
				console.log('支付方式选择',item,index) //这里返回的是value值
				this.selectOne(item,index)
			},
			GetPayList() {
				let that = this
				that.$u.post('/recharge/channel', {}).then(res => {
			
					console.log('充值渠道', res.data);
					//先分别出type1 and 2，分别1加密货币和2法币存款
					let Type1ArryList = []
					let Type2ArryList = []
					res.data.forEach((item, index) => {
						if (item.type == 1) {
							Type1ArryList.push(item)
						}
						if (item.type == 2) {
							Type2ArryList.push(item)
						}
					});
					console.log('加密货币', Type1ArryList)
					console.log('法币存款', Type2ArryList)
			
					that.JiaMiHbList = Type1ArryList
					that.JiaMiHbListFB = Type2ArryList
					
					//先显示法币存款
					//that.FabeDatas();
					
					//先显示虚拟币存款
					that.XuNibeDatas();
			
				})
			},
			//法币数据
			FabeDatas(){
				let that = this
				let datas = that.JiaMiHbListFB
				
				let arry = []
				datas.forEach((item, index) => {
					arry.push({
						index: index,
						title: item.abbr,
						abbr: item.abbr,
						currency_rate: item.currency_rate,
						digits: item.digits,
						id: item.id,
						mark: item.mark,
						methods: item.methods,
						name: item.name,
						type: item.type,
						icon: that.staticDname + '/pay/' + item.abbr + '.png'
					})
				});
				console.log('法币选择数据', arry);
				that.selectList = arry
				// that.selLabels = arry[0].title
				// that.defaultIcon = arry[0].icon
				
				
				let shuju = {
					selLabels: arry[0].title,
					defaultIcon: arry[0].icon,
					arry: arry
				}
				that.$refs.xuanzeCS.getdata(shuju);
				
				
				//设置默认的汇率
				that.currency_rate = arry[0].currency_rate
				that.showChongZhileixing = true
				that.YiXuanHuoBiInfo = {
					abbr: arry[0].abbr,
					currency_rate: arry[0].currency_rate,
					digits: arry[0].digits,
					id: arry[0].id,
					mark: arry[0].mark,
					methods: arry[0].methods,
					name: arry[0].name,
					icon: that.staticDname + '/pay/' + arry[0].abbr + '.png'
				}
				
				that.$nextTick(() => {
					that.Extra = 0
					that.Amount = ''
					that.wallet = ''
					that.isDisabled = true
					that.Currency_Rate = 0
					that.Currency_Rate_hw = 0
					that.HuoDeJinBi = 0
				});
				
				that.getrecharge(arry[0].methods);
			},
			//虚拟币数据
			XuNibeDatas(){
				let that = this
				let datas = that.JiaMiHbList
				
				let arry = []
				datas.forEach((item, index) => {
					arry.push({
						index: index,
						title: item.abbr,
						abbr: item.abbr,
						currency_rate: item.currency_rate,
						digits: item.digits,
						id: item.id,
						mark: item.mark,
						methods: item.methods,
						name: item.name,
						type: item.type,
						icon: that.staticDname + '/pay/' + item.abbr + '.png'
					})
				});
				console.log('虚拟币选择数据', arry);
				that.selectList = arry
				that.selLabels = arry[0].title
				that.defaultIcon = arry[0].icon
				
				let shuju = {
					selLabels: arry[0].title,
					defaultIcon: arry[0].icon,
					arry: arry
				}
				that.$refs.xuanzeCS.getdata(shuju);
				
				//设置默认的汇率
				that.currency_rate = arry[0].currency_rate
				that.showChongZhileixing = true
				that.YiXuanHuoBiInfo = {
					abbr: arry[0].abbr,
					currency_rate: arry[0].currency_rate,
					digits: arry[0].digits,
					id: arry[0].id,
					mark: arry[0].mark,
					methods: arry[0].methods,
					name: arry[0].name,
					icon: that.staticDname + '/pay/' + arry[0].abbr + '.png'
				}
				
				that.PayMethodOneIndex = 0
				that.PayProviderOneIndex = 0
				that.dengjiindx = -1
				that.selecValue = arry[0].methods[0].name
				
				that.$nextTick(() => {
					that.Extra = 0
					that.Amount = ''
					that.wallet = ''
					that.isDisabled = true
					that.Currency_Rate = 0
					that.Currency_Rate_hw = 0
					that.HuoDeJinBi = 0
				});
				that.getrecharge(arry[0].methods);
			},
			getrecharge(data) {
				let that = this
				console.log('支付数据', data);
			
				// 	that.$u.post('/recharge/channel', {
			
				// 	}).then(res => {
			
				let channel = data
				let PaymentMethod = []
				channel.forEach((item, index) => {
					PaymentMethod.push({
						index: index,
						value: item.id,
						label: item.name,
						channel: item.channels,
						icon: that.payIconUrl + '/pay/' + item.id + '.png'
					})
				});
			
			
				//设置默认usdt的汇率
				//that.currency_rate = channel[0].currency_rate
			
			
				that.selecValue = PaymentMethod[0].label
				that.opTions = PaymentMethod
				console.log('PaymentMethod', PaymentMethod)
				
				that.selectList2 = PaymentMethod
				that.selLabels2 = PaymentMethod[0].label
				that.defaultIcon2 = PaymentMethod[0].icon
				
				
				let shuju = {
					selLabels: PaymentMethod[0].label,
					defaultIcon: PaymentMethod[0].icon,
					arry: PaymentMethod
				}
				that.$refs.xuanzeZF.getdata(shuju);
				
				
			
				let PaymentProvider = PaymentMethod[0].channel
				let NewProvider = []
				PaymentProvider.forEach((item, index) => {
					NewProvider.push({
						fee: item.fee || 0,
						value: item.id,
						label: item.name,
						fixed: item.fixed,
						id: item.id,
						low: item.low,
						method: item.method,
						name: item.name,
						peak: item.peak,
						rate: item.rate,
						tip: item.tip,
						amounts: item.amounts,
						buttons: item.buttons
					})
				});
				//设置tips
				that.tips = NewProvider[0].tip
				//设置Provider第一个名字
				that.selecValue2 = NewProvider[0].name
				that.opTions2 = NewProvider
			
				//设置比例Rate
				that.is_Rate = NewProvider[0].rate
				that.is_Peak = NewProvider[0].peak
			
				//设置第二个选择的百分比例
				that.opTions2Rate = NewProvider[0].rate
				console.log('Rate',that.is_Rate,'Peak',that.is_Peak)
			
				//设置默认Choose充值价格
				that.dengjilist = NewProvider[0].buttons
				//设置默认没有选择时的充值数据
				that.Selectedmethod = NewProvider[0]
				this.Amount = NewProvider[0].buttons[0]
				this.$nextTick(() => {
					//this.wallet = NewProvider[0].buttons[0]
				})
			
			
			
				//设置输入范围amounts
				let amountsarr = NewProvider[0].amounts
				let target = {};
				amountsarr.forEach((a, index) => {
					let source = JSON.parse(`{"${'num'+index}":"${a}"}`);
					Object.assign(target, source);
				})
				that.ChooseAmountMin = target.num0
				that.ChooseAmountMax = target.num1
				var str = amountsarr.join("-")
				that.Inputrange = str
			
			
			
				//})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//判断账户禁止充值功能
			isJinZhi_TZ() {
				const userInfo = uni.getStorageSync("userinfo");
				const num = userInfo.managerFlag;
				const bitPosition = 0;
				const fag = this.checkBit(num, bitPosition) ? '1' : '0'; //1禁止 0不禁止
				this.JinZhiTZ = fag
			},
			//判断账户禁止提现功能
			isJinZhi_DH() {
				const userInfo = uni.getStorageSync("userinfo");
				const num = userInfo.managerFlag;
				const bitPosition = 1;
				const fag = this.checkBit(num, bitPosition) ? '1' : '0'; //1禁止 0不禁止
				this.JinZhiDH = fag
			},
			checkBit(num, bitPosition) {
				const mask = 1 << bitPosition;
				return (num & mask) !== 0;
			},
			//获取待完成的金额判断提现
			getDaiWanCheng() {
				let that = this
				this.$u.post('/query/locked/score', {
			
				}).then(res => {
					//console.log('待完成金额', res.data)
					this.DaiWWanCheng = (res.data.unfinishScore / 100).toFixed(2)
				}).catch(err => {
			
				})
			},
			Tolijilu0(val){
				this.pc_wallisShow = false
				this.$refs.openPCdetails.openPopup(0)
			},
			Tolijilu1(val){
				this.pc_wallisShow = false
				this.$refs.openPCdetails.openPopup(val)
			},
			FanHuiPages() {
				this.pc_wallisShow = false
			},
			//礼包开关
			switchChange(e) {
				let that = this
				//value：打开时为active-value值，关闭时为inactive-value值
				
				let values = that.wallet //当前输入或选择的金额
				let value = parseFloat(that.HuoDeJinBi);
				
				if (!e) {
					//当关闭时重新计算他的礼包优惠信息
					let rate = that.is_Rate
					let peak = that.is_Peak
					let discount = value * rate / 1000
					//console.log('礼包开关1',discount)
					if (peak >= discount) {
						this.Extra = discount
						//console.log('礼包开关2',discount)
					} else if (peak < discount) {
						this.Extra = peak
						//console.log('礼包开关3',peak)
					}
					console.log('关闭礼包的额外加是多少',that.Extra)
					
				} else {
					//打开礼包开关
			
					//获取礼包配置
					let is_firstPay = that.firstPay
					//let is_secondPay = that.secondPay
					//let is_thirdPay = that.thirdPay
					//console.log('礼包开关-获取的当前礼包',is_firstPay)
					//获取充值次数
					let PayTotal = that.payCount
					//先取得额外加的结果进行保存，以便后续计算礼包
					let rate = that.is_Rate
					let peak = that.is_Peak
					let discount = value * rate / 1000
					let DefExtra = 0
					if (peak >= discount) {
						DefExtra = discount
					} else if (peak < discount) {
						DefExtra = peak
					}
					//console.log('礼包开关-额外+',DefExtra)
					//判断充值次数>=3后使用默认的额外加计算优惠，否则使用欢迎礼包的优惠数值计算
					if (PayTotal >= 3 || that.PackageswitchStatus == false && is_firstPay.countdown == 0 || that.switchChecked == false) {
						//计算额外加优惠
						let rate = that.is_Rate
						let peak = that.is_Peak
						let discount = value * rate / 1000
						//console.log('礼包开关-1',discount)
						if (peak >= discount) {
							this.Extra = discount
							//console.log('礼包开关-2',discount)
						} else if (peak < discount) {
							this.Extra = peak
							//console.log('礼包开关-3',peak)
						}
						
						console.log('礼包开关-最终额外加是多少',that.Extra);
					} else {
						//计算礼包加成时间内的
						if (is_firstPay.status == 0 && is_firstPay.countdown > 0 && is_firstPay.extraCountdown > 0) {
							//console.log('礼包开关-加成时间还没结束，计算加成时间内的，加上加成比例')
							//礼包充值优惠要达到最低标准，最低标准在cfg数组里面
							//输入的金额不可超过最大标准，超出后使用最大标准数值使用cfg外面的rewardRate，字段maxBonus
							if (value > is_firstPay.maxBonus / 100) {
								let heji = is_firstPay.rewardRate + is_firstPay.extraRate
								let TotalNum_1 = value * heji / 100
								if (TotalNum_1 > is_firstPay.maxBonus / 100) {
									this.Extra = is_firstPay.maxBonus / 100 + DefExtra
								} else {
									that.Extra = TotalNum_1
								}
								//console.log('礼包开关-超过了最大标准',this.Extra)
							} else {
								//就是对比出cfg数组里面的最低标准值进行计算
								let is_curval = 0
								let is_curextraRate = 0 //加成比例
								let is_currate = 0 //获得比例
								is_firstPay.cfg.forEach(function(items, indexs) {
									if (value >= items.payAmount / 100) {
										is_curval = items.payAmount / 100
										is_curextraRate = items.extraRate || 0
										is_currate = items.rate + items.extraRate
									}
								});
								if (value < is_curval) {
									//console.log('礼包开关-没有达到最低标准',is_curval)
									this.Extra = DefExtra
								} else {
									//如果最终的奖金超出了后台设置的最大奖金就用最大奖金+通道额外+
									let TotalNum_2 = value * is_currate / 100
									if (TotalNum_2 > is_firstPay.maxBonus / 100) {
										//console.log('礼包开关-超出了最大奖金(maxBonus)')
										this.Extra = is_firstPay.maxBonus / 100 + DefExtra
									} else {
										this.Extra = value * is_currate / 100 + DefExtra
									}
									//console.log('礼包开关-存款达到多少',value,is_curval,is_currate/100,DefExtra)
									//console.log('礼包开关-已经达到最低标准',TotalNum_2)
								}
							}
						}
						//计算加成时间-已过的
						else if (is_firstPay.status == 0 || is_firstPay.countdown > 0) {
							//console.log('礼包开关-加成时间已结束-去掉加成的比例开始计算')
							//输入的金额不可超过最大标准，超出后使用最大标准数值使用cfg外面的rewardRate，字段maxBonus
							if (value > is_firstPay.maxBonus / 100) {
								let TotalNum_1 = value * is_firstPay.rewardRate / 100
								if (TotalNum_1 > is_firstPay.maxBonus / 100) {
									this.Extra = is_firstPay.maxBonus / 100 + DefExtra
								} else {
									that.Extra = TotalNum_1
								}
								//console.log('礼包开关-超过了最大标准',this.Extra)
							} else {
								//礼包充值优惠要达到最低标准，最低标准在cfg数组每一项里面
								//就是对比出cfg数组里面的最低标准值进行计算
								let is_curval = 0
								let is_curextraRate = 0 //加成比例
								let is_currate = 0 //获得比例
								is_firstPay.cfg.forEach(function(items, indexs) {
									if (value >= items.payAmount / 100) {
										is_curval = items.payAmount / 100
										is_curextraRate = items.extraRate || 0
										is_currate = items.rate
									}
								});
								if (value < is_curval) {
									//console.log('礼包开关-没有达到最低标准',is_curval)
									this.Extra = DefExtra
								} else {
									//如果最终的奖金超出了后台设置的最大奖金就用最大奖金+通道额外+
									let TotalNum_2 = value * is_currate / 100
									if (TotalNum_2 > is_firstPay.maxBonus / 100) {
										//console.log('超出了最大奖金(maxBonus)')
										this.Extra = is_firstPay.maxBonus / 100 + DefExtra
									} else {
										this.Extra = value * is_currate / 100 + DefExtra
									}
									//console.log('礼包开关-存款达到多少',is_curval,is_currate/100)
									//console.log('礼包开关-已经达到最低标准',TotalNum_2)
								}
							}
						}
						
						//计算出输入的金额能得到多少游戏金币
						//如果额外+不等于0就用额外+的值乘汇率，否则用输入的值乘汇率
						console.log('礼包开关-最终额外加是多少',that.Extra);
						
						
						// let is_currates = 0 //获得比例
						// is_firstPay.cfg.forEach(function(items, indexs) {
						// 	if (value >= items.payAmount / 100) {
						// 		is_currates = items.rate
						// 	}
						// });
						// let Ewaijia = values * this.currency_rate
						// console.log('发发发111',Ewaijia)
						// let zuoBijiao = Ewaijia * is_currates/100
						// console.log('发发发222',zuoBijiao)
						// if(zuoBijiao > is_firstPay.maxBonus/100){
						// 	//超出了最大奖金
						// 	that.Extra = (is_firstPay.maxBonus/100 + DefExtra);
						// } else {
						// 	//没有超出
						// 	let newwvals = zuoBijiao
						// 	let zuizzhi = (DefExtra + newwvals)
						// 	that.Extra = zuizzhi
						// }
					}
				}
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//首充倒计时结束监听
			firstPayExtraCountdownend(e) {
				let that = this
				setTimeout(() => {
					that.switchChange(false);//从新关闭礼包开关
					that.GetWelcomePackage();
				}, 200)
			},
			LookMoreDetails() {
				this.$refs.FirstRechargeOpen.openPopup(this.firstPay)
			},
			//检测用户禁止参与活动和礼包功能
			jizhiAcLibao() {
				const userInfo = uni.getStorageSync("userinfo");
				const num = userInfo.managerFlag;
				const bitPosition = 3;
				const fag = this.checkBit(num, bitPosition) ? '1' : '0'; //1禁止 0不禁止
			
				return fag
			},
			checkBit(num, bitPosition) {
				const mask = 1 << bitPosition;
				return (num & mask) !== 0;
			},
			//获取Welcome Package
			GetWelcomePackage() {
				let that = this
				that.$u.post('/welcome/packet', {
			
				}).then(res => {
					//console.log('Welcome Package',res.data)
			
					//判断是否显示欢迎礼包
					// if (res.data.firstPay.switchStatus == true && res.data.secondPay.switchStatus == false && res.data.thirdPay.switchStatus == false) {
					// 	that.PackageswitchStatus = true
					// 	console.log('1是否显示礼包-是')
					// } else if(res.data.firstPay.switchStatus == false && res.data.secondPay.switchStatus == true && res.data.thirdPay.switchStatus == false) {
					// 	that.PackageswitchStatus = true
					// 	console.log('2是否显示礼包-是')
					// } else if(res.data.firstPay.switchStatus == false && res.data.secondPay.switchStatus == false && res.data.thirdPay.switchStatus == true) {
					// 	that.PackageswitchStatus = true
					// 	console.log('2是否显示礼包-是')
					// } else if(res.data.firstPay.switchStatus == true && res.data.secondPay.switchStatus == true && res.data.thirdPay.switchStatus == true){
					// 	that.PackageswitchStatus = true
					// 	console.log('3是否显示礼包-是')
					// } else if(res.data.firstPay.switchStatus == false && res.data.secondPay.switchStatus == false && res.data.thirdPay.switchStatus == false){
					// 	that.PackageswitchStatus = false
					// 	console.log('4是否显示礼包-否')
					// }
			
			
					let jizhiAcLibao = that.jizhiAcLibao()
					console.log('是否禁止参与活动', jizhiAcLibao); //1禁止 0不禁止
			
					if (jizhiAcLibao == 0 && res.data.firstPay.switchStatus == true || res.data.secondPay.switchStatus == true || res.data.thirdPay.switchStatus == true) {
						that.PackageswitchStatus = true
					} else if (jizhiAcLibao == 1 && res.data.firstPay.switchStatus == false && res.data.secondPay.switchStatus == false && res.data.thirdPay.switchStatus == false) {
						that.PackageswitchStatus = false
					}
			
			
					//判断欢迎礼包开关
					if(that.switchChecked == true){
						that.switchChecked = true
					} else {
						that.switchChecked = res.data.firstPay.display || false
					}
					
			
			
					//判断第几次充值就显示第几次的欢迎礼包
					that.firstpayCount = res.data.payCount
					if (that.firstpayCount == 0) {
						that.firstPay = res.data.firstPay
					} else if (that.firstpayCount == 1) {
						that.firstPay = res.data.secondPay
					} else if (that.firstpayCount == 2) {
						that.firstPay = res.data.thirdPay
					}
			
			
			
					// 筛选首充最大加成值
					let max1 = res.data.firstPay.extraRate || 0;
					let MaxRate = res.data.firstPay.rewardRate + max1
					that.MaxRates = MaxRate
					//console.log('MaxRate',MaxRate)
			
			
				})
			},
			
			
			
			
			
			
			
			
			
			
			getuserinfo() {
				let that = this
				that.$u.post('/user/get/info', {}).then(res => {
					that.userInfo = res.data;
					uni.setStorageSync('userinfo', res.data);
					//console.log('个人信息',res.data)
					//that.balance = that.userInfo.balance / 100
				})
			},
			getwithdrawChannel() {
				let that = this
				that.$u.post('/withdraw/channel', {
			
				}).then(res => {
			
					if (res.data.length == 0) {
			
					} else {
						let List = res.data
						let Newchannel = []
						List.forEach((item, index) => {
			
							item.methods.forEach((item, index) => {
								Newchannel.push({
									value: item.id,
									label: item.name,
									channel: item.channels
								})
							})
			
							// Newchannel.push({
							// 	value: item.method,
							// 	label: item.methodName,
							// 	channel: item.channel
							// })
						})
			
						that.opTions3 = Newchannel
						that.MorenType = Newchannel[0].value
						that.selecValue3 = Newchannel[0].label
						let Onelist = Newchannel[0].channel
			
						console.log('可兑换渠道列表', Newchannel,Onelist)
						console.log('默认的类型', that.MorenType)
			
						this.GetMyAccount()
			
						// 筛选最大值和最小值
						let lowmin = Enumerable.from(Onelist).min(item => item.low);
						let peakmax = Enumerable.from(Onelist).max(item => item.peak);
						let ratemin = Enumerable.from(Onelist).min(item => item.rate);
			
						that.Lowmin = lowmin
						that.Peakmax = peakmax
						that.Ratemin = ratemin
						
						//设置默认到账的货币汇率，多个通道的汇率是相同的，就取数组第一个就行
						that.MoRenDzHuiLv = Onelist[0].currency_rate
						that.MorDz_abbr = Onelist[0].abbr
						that.MorDz_mark = Onelist[0].mark
						
			
						let Twolist = Onelist
						let NewArr = []
						Twolist.forEach(function(s) {
							let aaa = s.amounts
							aaa.forEach(function(b) {
								NewArr.push(b)
							})
						})
						let AmountMin = Enumerable.from(NewArr).min(item => item);
						let AmountMax = Enumerable.from(NewArr).max(item => item);
						that.InputAmount = AmountMin + '-' + AmountMax
						that.WithhdrawalAmountMin = AmountMin
						that.WithhdrawalAmountMax = AmountMax
					}
			
			
			
				})
			},
			GetMyAccount() {
				let that = this
				that.$u.post('/withdraw/bind/query', {}).then(res => {
					//console.log('我的账户',res.data)
					that.myAccountList = res.data
					let list = res.data
					let NewList = []
					list.forEach((item, index) => {
						//console.log(item, that.MorenType)
						if (item.method === that.MorenType) {
							NewList.push({
								method: item.method,
								value: item.id,
								//label: item.email || item.phoneNum || item.account,
								//labelE: item.email || '',
								labelP: item.realName || '',
								labelA: item.account || item.phoneNum,
								labeName: (item.bankName || '') + '(' + item.realName + ')' + this.testuserName(item.account || item.phoneNum),
								bnakName: item.bankName || ''
							})
						}
					});
					if (NewList.length != 0) {
						that.opTions4 = NewList
						if (NewList[0].labelP || NewList[0].labelA) {
							that.selecValue4 = NewList[0].bnakName + '(' + NewList[0].labelP + ')' + this.testuserName(NewList[0].labelA)
						}
						that.AmountId = NewList[0].value
					} else {
						that.opTions4 = []
						that.selecValue4 = ''
						that.AmountId = 0
					}
					console.log('提款方式对应的提款账户', that.opTions4)
				})
			},
			testuserName(value) {
				var newStr;
				var char = '';
				for (var i = 0, len = value.length - 7; i < len; i++) {
					char += '*';
				}
				newStr = value.substr(0, 0) + char + value.substr(-4);
				return newStr;
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			PanDuaniSGouxuan2() {
				let that = this
				that.$u.post('/withdraw/deposit/ctrl', {}).then(res => {
					console.log('点击查询弹窗', res.data);
			
					// let info = uni.getStorageSync("userinfo");
					// let verifyPhone = info.verifyPhone;
					// let verifyEmail = info.verifyEmail;
					// let realName = info.realName;
					// let bindCard = that.myAccountList;
			
					//通过传0123判断提现验证是否开启了勾选
					const num = res.data.withdrawConfig;
					const bitPosition0 = 0; //0手机，1邮箱，2实名，3提现账户
					const bitPosition1 = 1; //0手机，1邮箱，2实名，3提现账户
					const bitPosition2 = 2; //0手机，1邮箱，2实名，3提现账户
					const bitPosition3 = 3; //0手机，1邮箱，2实名，3提现账户
			
					const fag0 = this.checkBit(num, bitPosition0) ? '1' : '0'; //结果是1勾选 0未勾选
					const fag1 = this.checkBit(num, bitPosition1) ? '1' : '0'; //结果是1勾选 0未勾选
					const fag2 = this.checkBit(num, bitPosition2) ? '1' : '0'; //结果是1勾选 0未勾选
					const fag3 = this.checkBit(num, bitPosition3) ? '1' : '0'; //结果是1勾选 0未勾选
					this.managerFlag = fag0
			
					console.log(`是否勾选了手机 ${fag0}`);
					console.log(`是否勾选了邮箱 ${fag1}`);
					console.log(`是否勾选了实名 ${fag2}`);
					console.log(`是否勾选了提现账户 ${fag3}`);
			
					//console.log('是否完成了四项验证',verifyPhone,verifyEmail,realName,bindCard);
			
					//如果勾选了就需要去验证一下对应的提示
					if (fag0 == 1 && res.data.verifyPhone == false) {
						//打开弹窗进行手机验证
						that.$refs.openvpnShow.openPopup(2);
						return false
					} else if (fag1 == 1 && res.data.verifyEmail == false) {
						//打开弹窗进行邮箱验证
						that.$refs.openvpnShow.openPopup(2);
						return false
					} else if (fag2 == 1 && res.data.realName == false) {
						//打开弹窗进行实名验证
						that.$refs.openvpnShow.openPopup(2);
						return false
					} else if (fag3 == 1 && res.data.bindCard == false) {
						//打开弹窗进行提示绑定提款账户
						that.$refs.openvpnShow.openPopup(2);
						return false
					} else {
						console.log('都不成立直接去跳转提现')
						that.FaqiTransfer();
					}
			
				});
			},
			FaqiTransfer() {
				let that = this
				if (that.balance == 0 || that.balance == "0.00" || that.balance == "0") {
					this.$u.toast(this.$t('ToastPrompt.Toast1'));
				} else {
					if (that.opTions4.length == 0) {
						this.$u.toast('请选择提款账号');
					} else if (this.walletNum == "") {
						this.$u.toast(this.$t('ToastPrompt.Toast2'));
					} else {
			
						//先判断是否验证邮箱手机号码，必须验证手机号码后方可进行提现
						//if(that.userInfo.verifyPhone == false && that.userInfo.verifyEmail == false){
						//打开为验证手机号码弹窗提示
						//	that.$refs.openvpnShow.openPopup();	
						//} else {
						//再判断是否设置支付密码
						if (that.userInfo.payPwdSet == false) {
							//弹窗设置支付密码/。设置后更新用户缓存
							that.$refs.funpassword.openPopup()
						} else if (that.userInfo.payPwdSet == true) {
							//如果已设置直接输入支付密码后兑换
							that.$refs.inputFunPass.openPopup()
						}
						//}
					}
				}
			},
			Upuserinfo() {
				let that = this
				that.getuserinfo()
			},
			GetPayPassword(val) {
				//console.log('输入的支付密码', val)
				this.Confirmloading = true
				this.StartDuihuan(val)
			},
			StartDuihuan(val) {
				let that = this
				setTimeout(() => {
					let md5Pass = md5Libs.md5(val)
					let wallet = parseInt(that.walletNum) * 100
					that.$u.post('/withdraw', {
						id: that.AmountId, // number 是 账户id
						amount: wallet, // number 是 兑换金额 转成分数
						payPwd: md5Pass, // String 是 支付密码（MD5值）
					}).then(res => {
						that.Confirmloading = false
						//console.log('兑换', res)
						that.$u.toast(this.$t('ToastPrompt.Toast3'));
			
						that.$nextTick(() => {
							uni.$emit('getgetMybalance', 1)
							that.walletNum = 0
							that.is_Fee = 0
							that.ActualPayment = 0
							that.YuJiDaoZhang = 0
						})
						that.getMybalance()
			
					}).catch(err => {
						that.Confirmloading = false
					})
				}, 1500)
			},
			selectOne3(options) {
				console.log('选择提款方式', options)
				let that = this
				that.selecValue3 = options.label
				that.MorenType = options.value
				
				that.MoRenDzHuiLv = options.channel[0].currency_rate
				that.MorDz_abbr = options.channel[0].abbr
				that.MorDz_mark = options.channel[0].mark
			
				that.GetMyAccount()
			
				let channel = options.channel
				let NewArr = []
				channel.forEach(function(s) {
					NewArr.push(s)
				})
			
				let items = NewArr
				// 筛选最大值和最小值
				let lowmin = Enumerable.from(items).min(item => item.low);
				let peakmax = Enumerable.from(items).max(item => item.peak);
				let ratemin = Enumerable.from(items).min(item => item.rate);
				that.Lowmin = lowmin
				that.Peakmax = peakmax
				that.Ratemin = ratemin
				that.walletNum = 0
				that.is_Fee = 0
				that.ActualPayment = 0
				that.YuJiDaoZhang = 0
				// 默认筛选通道最大值和最小值兑换金额范围
				let rangelist = channel
				let rangeArr = []
				rangelist.forEach(function(s) {
					let aaa = s.amounts
					aaa.forEach(function(b) {
						rangeArr.push(b)
					})
				})
				let AmountMin = Enumerable.from(rangeArr).min(item => item);
				let AmountMax = Enumerable.from(rangeArr).max(item => item);
				that.InputAmount = AmountMin + '-' + AmountMax
				that.WithhdrawalAmountMin = AmountMin
				that.WithhdrawalAmountMax = AmountMax
			},
			selectOne4(options) {
				console.log('选择提款账户', options)
				let bankName = options.bnakName || ''
				this.selecValue4 = bankName + '(' + options.labelP + ')' + this.testuserName(options.labelA)
				this.AmountId = options.value
			},
			withdrawAmountbulr() {
				this.input_border2 = 1
			},
			withdrawAmountInput(e) {
				if (!e) {
					this.isDisabledTwo = true
				} else {
					this.isDisabledTwo = false
				}
			},
			withdrawAmount(e) {
				this.input_border2 = 0
				if (!e) {
					this.isDisabledTwo = true
				} else {
					this.isDisabledTwo = false
				}
			
				let that = this
				//监测输入的是否整数 ////console.log(this.$u.test.digits('2020'));
			
				//let Int = this.$u.test.digits(e)
				//console.log('是否整数',Int)
			
				if (e < that.WithhdrawalAmountMin || e > that.WithhdrawalAmountMax) {
					this.$u.toast(this.$t('ToastPrompt.Toast4') + that.WithhdrawalAmountMin + '-' + that.WithhdrawalAmountMax);
					that.$nextTick(() => {
						that.walletNum = 0
						that.is_Fee = 0
						that.ActualPayment = 0
						that.YuJiDaoZhang = 0
						this.isDisabledTwo = true
					})
				} else {
			
					let ratemin = that.Ratemin * 100 / 1000
					let lowmin = that.Lowmin
					let peakmax = that.Peakmax
			
					console.log('最小比例',that.Ratemin)
					console.log('最低',that.Lowmin)
					console.log('最高',that.Peakmax)
					console.log(ratemin, lowmin, peakmax)
			
					//如果1000*1.5/100 = 15，如果15小于Peak大于low，就用15作为Fee
					//反之 15 大于peak就用peak做Fee
					//15小于low，就用low作为fee
			
					let fee = (e * ratemin / 100)
					console.log('Fee', fee)
			
					if (fee >= lowmin && fee <= peakmax) {
			
						let finalFee = e * ratemin / 100
						that.is_Fee =  Number(finalFee).toFixed(2)
						that.ActualPayment = (e - finalFee).toFixed(2)
						console.log('最低和最高之间',finalFee)
						
						//就算预计到账，实付金额*货币汇率
						that.YuJiDaoZhang = (that.ActualPayment / that.MoRenDzHuiLv).toFixed(2)
			
					} else if (fee < lowmin) {
			
						let finalFee = lowmin
						that.is_Fee =  Number(finalFee).toFixed(2)
						that.ActualPayment = (e - finalFee).toFixed(2)
						console.log('小于最低',finalFee)
						
						//就算预计到账，实付金额*货币汇率
						that.YuJiDaoZhang = (that.ActualPayment / that.MoRenDzHuiLv).toFixed(2)
			
					} else if (fee > peakmax) {
			
						let finalFee = peakmax
						that.is_Fee =  Number(finalFee).toFixed(2)
						that.ActualPayment = (e - finalFee).toFixed(2)
						console.log('大于最高',finalFee)
						
						//就算预计到账，实付金额*货币汇率
						that.YuJiDaoZhang = (that.ActualPayment / that.MoRenDzHuiLv).toFixed(2)
			
					}
				}
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			LockFundsPopup() {
				this.$refs.LockFundsopenPopup.openPopup()
			},
			dengjicoolsBtn(values, e) {
				console.log('选择的充值金额', values)
				let that = this
				//初始化usdt实际数量
				that.Currency_Rate = 0
				this.Currency_Rate_hw = 0
				that.HuoDeJinBi = 0
			
				this.dengjiindx = e
				this.Amount = values
			
				//设置需要实际多少U
				this.Currency_Rate = (values / this.currency_rate).toFixed(2);
				this.Currency_Rate_hw = (values / this.currency_rate).toFixed(2);
				console.log('选择金额-实际多少U', this.Currency_Rate);
				
				//计算出输入的金额能得到多少游戏金币
				that.HuoDeJinBi = values * that.currency_rate;
				
				let value = parseFloat(that.HuoDeJinBi);
			
				this.$nextTick(() => {
			
					//获取礼包配置
					let is_firstPay = that.firstPay
					//let is_secondPay = that.secondPay
					//let is_thirdPay = that.thirdPay
					console.log('选择金额-获取的当前礼包',is_firstPay)
					//获取充值次数
					let PayTotal = that.payCount
					//先取得额外加的结果进行保存，以便后续计算礼包
					let rate = that.is_Rate
					let peak = that.is_Peak
					let discount = value * rate / 1000
					let DefExtra = 0
					if (peak >= discount) {
						DefExtra = discount
					} else if (peak < discount) {
						DefExtra = peak
					}
					console.log('选择金额-额外+',DefExtra)
			
			
					//判断充值次数>=3后使用默认的额外加计算优惠，否则使用欢迎礼包的优惠数值计算  并且如果开关关了后就不算加成了直接显示额外+
					if (PayTotal >= 3 || that.PackageswitchStatus == false && is_firstPay.countdown == 0 || that.switchChecked == false) {
						//计算额外加优惠
						let rate = that.is_Rate
						let peak = that.is_Peak
						let discount = value * rate / 1000
						console.log('选择金额-1',discount)
						if (peak >= discount) {
							this.Extra = discount
							console.log('选择金额-2',discount)
						} else if (peak < discount) {
							this.Extra = peak
							console.log('选择金额-3',peak)
						}
						
						console.log('选择金额-关闭礼包时最终额外加是多少',that.Extra);
					} else {
						//计算礼包加成时间内的
						if (is_firstPay.status == 0 && is_firstPay.countdown > 0 && is_firstPay.extraCountdown > 0) {
							console.log('选择金额-加成时间还没结束，计算加成时间内的，加上加成比例')
							//礼包充值优惠要达到最低标准，最低标准在cfg数组里面
							//输入的金额不可超过最大标准，超出后使用最大标准数值使用cfg外面的rewardRate，字段maxBonus
							console.log('这是多少',value)
							if (value > (is_firstPay.maxBonus / 100)) {
								let heji = is_firstPay.rewardRate + is_firstPay.extraRate
								let TotalNum_1 = (value * heji / 100)
								if (TotalNum_1 > (is_firstPay.maxBonus / 100)) {
									that.Extra = (is_firstPay.maxBonus / 100 + DefExtra)
								} else {
									that.Extra = TotalNum_1
								}
								console.log('选择金额-超过了最大标准',that.Extra);
							} else {
								
								//就是对比出cfg数组里面的最低标准值进行计算
								let is_curval = 0
								let is_curextraRate = 0 //加成比例
								let is_currate = 0 //获得比例
								
								is_firstPay.cfg.forEach(function(items, indexs) {
									if (value >= items.payAmount / 100) {
										is_curval = items.payAmount / 100
										is_curextraRate = items.extraRate || 0
										is_currate = items.rate + items.extraRate
									}
								});
								if (value < is_curval) {
									console.log('选择金额-没有达到最低标准',is_curval)
									that.Extra = DefExtra
								} else {
									//如果最终的奖金超出了后台设置的最大奖金就用最大奖金+通道额外+
									let TotalNum_2 = value * is_currate / 100
									if (TotalNum_2 > is_firstPay.maxBonus / 100) {
										console.log('选择金额-超出了最大奖金(maxBonus)')
										that.Extra = is_firstPay.maxBonus / 100 + DefExtra
									} else {
										that.Extra = value * is_currate / 100 + DefExtra
									}
									//console.log('选择金额-存款达到多少',value,is_curval,is_currate/100,DefExtra)
									
									console.log('输入的值',value)
									console.log('最低金额',is_curval)
									console.log('当前比例',is_currate/100)
									console.log('礼包外默认加成',DefExtra)
									
									
									console.log('选择金额-已经达到最低标准',TotalNum_2)
								}
							}
						}
						//计算加成时间-已过的
						else if (is_firstPay.status == 0 || is_firstPay.countdown > 0) {
							console.log('加成时间已结束-去掉加成的比例开始计算')
							//输入的金额不可超过最大标准，超出后使用最大标准数值使用cfg外面的rewardRate，字段maxBonus
							if (value > is_firstPay.maxBonus / 100) {
								let TotalNum_1 = value * is_firstPay.rewardRate / 100
								if (TotalNum_1 > is_firstPay.maxBonus / 100) {
									that.Extra = is_firstPay.maxBonus / 100 + DefExtra
								} else {
									that.Extra = TotalNum_1
								}
								console.log('选择金额-超过了最大标准',that.Extra)
							} else {
								//礼包充值优惠要达到最低标准，最低标准在cfg数组每一项里面
								//就是对比出cfg数组里面的最低标准值进行计算
								let is_curval = 0
								let is_curextraRate = 0 //加成比例
								let is_currate = 0 //获得比例
								is_firstPay.cfg.forEach(function(items, indexs) {
									if (value >= items.payAmount / 100) {
										is_curval = items.payAmount / 100
										is_curextraRate = items.extraRate || 0
										is_currate = items.rate
									}
								});
								if (value < is_curval) {
									console.log('选择金额-没有达到最低标准',is_curval)
									that.Extra = DefExtra
								} else {
									//如果最终的奖金超出了后台设置的最大奖金就用最大奖金+通道额外+
									let TotalNum_2 = value * is_currate / 100
									if (TotalNum_2 > is_firstPay.maxBonus / 100) {
										console.log('超出了最大奖金(maxBonus)')
										that.Extra = is_firstPay.maxBonus / 100 + DefExtra
									} else {
										that.Extra = value * is_currate / 100 + DefExtra
										console.log('这是什么',value,is_currate,DefExtra)
									}
									
									console.log('输入的值',value)
									console.log('最低金额',is_curval)
									console.log('当前比例',is_currate/100)
									console.log('礼包外默认加成',DefExtra)
									
									console.log('选择金额-已经达到最低标准2',TotalNum_2)
								}
							}
						}
						
						//计算出输入的金额能得到多少游戏金币
						//如果额外+不等于0就用额外+的值乘汇率，否则用输入的值乘汇率
						//console.log('额外+减去输入的值得出，额外加了多少',that.Extra - value);
						console.log('选择金额-最终额外加是多少',that.Extra);
						
						// let is_currates = 0 //获得比例
						// is_firstPay.cfg.forEach(function(items, indexs) {
						// 	if (value >= items.payAmount / 100) {
						// 		is_currates = items.rate
						// 	}
						// });
						// let Ewaijia = values * this.currency_rate
						// console.log('发发发111',Ewaijia)
						// let zuoBijiao = Ewaijia * is_currates/100
						// console.log('发发发222',zuoBijiao)
						// if(zuoBijiao > is_firstPay.maxBonus/100){
						// 	//超出了最大奖金
						// 	that.Extra = (is_firstPay.maxBonus/100 + DefExtra);
						// } else {
						// 	//没有超出
						// 	let newwvals = zuoBijiao
						// 	let zuizzhi = (DefExtra + newwvals)
						// 	that.Extra = zuizzhi
						// }
						
					}
			
					that.wallet = values
					that.isDisabled = false
				})
			},
			Oneinput(values) {
				console.log('输入的值',values)
				let that = this
			
			
				//设置需要实际多少U
				that.Currency_Rate = (values / that.currency_rate).toFixed(2);
				this.Currency_Rate_hw = (values / that.currency_rate).toFixed(2);
				console.log('输入框计算-实际多少U', that.Currency_Rate);
				
				//计算出输入的金额能得到多少游戏金币
				that.HuoDeJinBi = values * that.currency_rate;
				
				let value = parseFloat(that.HuoDeJinBi);
			
				let digits = true//that.$u.test.digits(values)
				if (!digits) {
					that.$nextTick(() => {
						that.wallet = ''
						that.Extra = 0
					})
					return false
				} else {
			
					//获取礼包配置
					let is_firstPay = that.firstPay
					//let is_secondPay = that.secondPay
					//let is_thirdPay = that.thirdPay
					//console.log('获取的当前礼包',is_firstPay)
					//获取充值次数
					let PayTotal = that.payCount
					//先取得额外加的结果进行保存，以便后续计算礼包
					let rate = that.is_Rate
					let peak = that.is_Peak
					console.log('ddddddddd',that.is_Rate,that.is_Peak)
					let discount = value * rate / 1000
					let DefExtra = 0
					if (peak >= discount) {
						DefExtra = discount
					} else if (peak < discount) {
						DefExtra = peak
					}
					console.log('输入框计算-额外+',DefExtra)
					//判断充值次数>=3后使用默认的额外加计算优惠，否则使用欢迎礼包的优惠数值计算
					if (PayTotal >= 3 || that.PackageswitchStatus == false && is_firstPay.countdown == 0 || that.switchChecked == false) {
						//计算额外加优惠
						let rate = that.is_Rate
						let peak = that.is_Peak
						let discount = value * rate / 1000
						console.log('输入框计算-1',discount)
						if (peak >= discount) {
							this.Extra = discount
							console.log('输入框计算-2',discount)
						} else if (peak < discount) {
							this.Extra = peak
							console.log('输入框计算-3',peak)
						}
						console.log('输入框计算-关闭礼包时最终额外加是多少',that.Extra);
					} else {
						//计算礼包加成时间内的
						if (is_firstPay.status == 0 && is_firstPay.countdown > 0 && is_firstPay.extraCountdown > 0) {
							console.log('加成时间还没结束，计算加成时间内的，加上加成比例')
							//礼包充值优惠要达到最低标准，最低标准在cfg数组里面
							//输入的金额不可超过最大标准，超出后使用最大标准数值使用cfg外面的rewardRate，字段maxBonus
							if (value > is_firstPay.maxBonus / 100) {
								let heji = is_firstPay.rewardRate + is_firstPay.extraRate
								let TotalNum_1 = value * heji / 100
								if (TotalNum_1 > is_firstPay.maxBonus / 100) {
									this.Extra = is_firstPay.maxBonus / 100 + DefExtra
								} else {
									that.Extra = TotalNum_1
								}
								console.log('输入框计算-超过了最大标准',this.Extra)
							} else {
								//就是对比出cfg数组里面的最低标准值进行计算
								let is_curval = 0
								let is_curextraRate = 0 //加成比例
								let is_currate = 0 //获得比例
								is_firstPay.cfg.forEach(function(items, indexs) {
									if (value >= items.payAmount / 100) {
										is_curval = items.payAmount / 100
										is_curextraRate = items.extraRate || 0
										is_currate = items.rate + items.extraRate
									}
								});
								if (value < is_curval) {
									console.log('输入框计算-没有达到最低标准',is_curval)
									this.Extra = DefExtra
								} else {
									//如果最终的奖金超出了后台设置的最大奖金就用最大奖金+通道额外+
									let TotalNum_2 = value * is_currate / 100
									if (TotalNum_2 > is_firstPay.maxBonus / 100) {
										console.log('输入框计算-超出了最大奖金(maxBonus)')
										this.Extra = is_firstPay.maxBonus / 100 + DefExtra
									} else {
										this.Extra = value * is_currate / 100 + DefExtra
									}
									console.log('输入框计算-存款达到多少',value,is_curval,is_currate/100,DefExtra)
									console.log('输入框计算-已经达到最低标准',TotalNum_2)
								}
							}
						}
						//计算加成时间-已过的
						else if (is_firstPay.status == 0 || is_firstPay.countdown > 0) {
							console.log('输入框计算-加成时间已结束-去掉加成的比例开始计算')
							//输入的金额不可超过最大标准，超出后使用最大标准数值使用cfg外面的rewardRate，字段maxBonus
							if (value > is_firstPay.maxBonus / 100) {
								let TotalNum_1 = value * is_firstPay.rewardRate / 100
								if (TotalNum_1 > is_firstPay.maxBonus / 100) {
									this.Extra = is_firstPay.maxBonus / 100 + DefExtra
								} else {
									that.Extra = TotalNum_1
								}
								console.log('输入框计算-超过了最大标准',this.Extra)
							} else {
								//礼包充值优惠要达到最低标准，最低标准在cfg数组每一项里面
								//就是对比出cfg数组里面的最低标准值进行计算
								let is_curval = 0
								let is_curextraRate = 0 //加成比例
								let is_currate = 0 //获得比例
								is_firstPay.cfg.forEach(function(items, indexs) {
									if (value >= items.payAmount / 100) {
										is_curval = items.payAmount / 100
										is_curextraRate = items.extraRate || 0
										is_currate = items.rate
									}
								});
								if (value < is_curval) {
									console.log('输入框计算-没有达到最低标准',is_curval)
									this.Extra = DefExtra
								} else {
									//如果最终的奖金超出了后台设置的最大奖金就用最大奖金+通道额外+
									let TotalNum_2 = value * is_currate / 100
									if (TotalNum_2 > is_firstPay.maxBonus / 100) {
										console.log('输入框计算-超出了最大奖金(maxBonus)')
										this.Extra = is_firstPay.maxBonus / 100 + DefExtra
									} else {
										this.Extra = value * is_currate / 100 + DefExtra
									}
									console.log('输入框计算-存款达到多少2',is_curval,is_currate/100)
									console.log('输入框计算-已经达到最低标准2',TotalNum_2)
								}
							}
						}
						
						
						
						
						
						console.log('输入框计算-最终额外加是多少',that.Extra);
						
						
						
						
						
						
						// let is_currates = 0 //获得比例
						// is_firstPay.cfg.forEach(function(items, indexs) {
						// 	if (value >= items.payAmount / 100) {
						// 		is_currates = items.rate
						// 	}
						// });
						// let Ewaijia = values * this.currency_rate
						// console.log('发发发111',Ewaijia)
						// let zuoBijiao = Ewaijia * is_currates/100
						// console.log('发发发222',zuoBijiao)
						// if(zuoBijiao > is_firstPay.maxBonus/100){
						// 	//超出了最大奖金
						// 	that.Extra = (is_firstPay.maxBonus/100 + DefExtra);
						// } else {
						// 	//没有超出
						// 	let newwvals = zuoBijiao
						// 	let zuizzhi = (DefExtra + newwvals)
						// 	that.Extra = zuizzhi
						// }
						
					}
			
					if (!value) {
						//console.log('没有了')
						that.isDisabled = true
						that.Extra = 0
					} else {
						that.isDisabled = false
					}
					that.Amount = values
				}
			},
			Choosefocus(e) {
				this.dengjiindx = -1
				this.input_border = 1
			},
			ChooseBlur(e) {
				let that = this
				this.input_border = 0
				that.Amount = e
				let input = parseFloat(e)
				let min = parseFloat(that.ChooseAmountMin)
				let max = parseFloat(that.ChooseAmountMax)
				
				if (input < min || input > max) {
					that.$u.toast(this.$t('ToastPrompt.Toast5') + that.ChooseAmountMin + '-' + that.ChooseAmountMax);
					that.$nextTick(() => {
						that.Extra = 0
						that.Amount = ''
						that.wallet = ''
						that.isDisabled = true
						that.Currency_Rate = 0
						that.Currency_Rate_hw = 0
						that.HuoDeJinBi = 0
					})
				}
			},
			selectPayMethodOne(item, index) {
				let that = this
				that.PayMethodOneIndex = index
				//console.log(item,index)
			},
			selectOne(options, index) {
				console.log('选的支付方式', options)
				let that = this
			
				//初始化usdt实际数量
				that.Currency_Rate = 0
				that.Currency_Rate_hw = 0
				that.HuoDeJinBi = 0
			
				that.PayMethodOneIndex = index
				that.PayProviderOneIndex = 0
				this.selecValue = options.label
			
				//设置PaymentProvider的数据
				let PaymentProvider = options.channel
				let NewProvider = []
				PaymentProvider.forEach((item, index) => {
					NewProvider.push({
						fee: item.fee || 0,
						value: item.id,
						label: item.name,
						fixed: item.fixed,
						id: item.id,
						low: item.low,
						method: item.method,
						name: item.name,
						peak: item.peak,
						rate: item.rate,
						tip: item.tip,
						amounts: item.amounts,
						buttons: item.buttons
					})
				});
				//设置tips
				that.tips = NewProvider[0].tip
				//设置Provider第一个名字
				that.selecValue2 = NewProvider[0].name
				that.opTions2 = NewProvider
				that.Extra = 0
				//设置比例Rate
				that.is_Rate = NewProvider[0].rate
				that.is_Peak = NewProvider[0].peak
			
				//设置第二个选择的百分比例
				that.opTions2Rate = NewProvider[0].rate
				////console.log('Rate',that.is_Rate,'Peak',that.is_Peak)
			
				//设置默认Choose充值价格
				that.dengjilist = NewProvider[0].buttons
				that.Selectedmethod = NewProvider[0]
				this.Amount = NewProvider[0].buttons[0]
				this.$nextTick(() => {
					this.wallet = '' //NewProvider[0].buttons[0]
				})
				this.dengjiindx = -1
				this.isDisabled = true
			
				let amountsarr = NewProvider[0].amounts
				let target = {};
				amountsarr.forEach((a, index) => {
					let source = JSON.parse(`{"${'num'+index}":"${a}"}`);
					Object.assign(target, source);
				})
				that.ChooseAmountMin = target.num0
				that.ChooseAmountMax = target.num1
				var str = amountsarr.join("-")
				that.Inputrange = str
			
			},
			selectPayProviderOne(item, index) {
				let that = this
				that.PayProviderOneIndex = index
				//console.log(item,index)
			},
			selectOne2(options, index) {
				console.log('选择的支付提供商', options)
				let that = this
			
				//初始化usdt实际数量
				that.Currency_Rate = 0
				that.Currency_Rate_hw = 0
				that.HuoDeJinBi = 0
			
				that.PayProviderOneIndex = index
				this.Selectedmethod = options
				this.dengjilist = options.buttons
				this.selecValue2 = options.label
				//设置tips
				that.tips = options.tip
			
				that.Extra = 0
			
				//设置比例Rate
				that.is_Rate = options.rate
				that.is_Peak = options.peak
			
				//设置第二个选择的百分比例
				that.opTions2Rate = options.rate
				////console.log('Rate',that.is_Rate,'Peak',that.is_Peak)
			
				this.dengjiindx = -1
				this.Amount = options.buttons[0]
				this.$nextTick(() => {
					this.wallet = '' //options.buttons[0]
				})
				this.isDisabled = true
			
				//设置输入范围amounts
				let amountsarr = options.amounts
				let target = {};
				amountsarr.forEach((a, index) => {
					let source = JSON.parse(`{"${'num'+index}":"${a}"}`);
					Object.assign(target, source);
				})
				that.ChooseAmountMin = target.num0
				that.ChooseAmountMax = target.num1
				var str = amountsarr.join("-")
				that.Inputrange = str
			
			},
			//获取充值次数
			PayCountNum() {
				let that = this
				that.$u.post('/pay/count', {
			
				}).then(res => {
					//console.log('充值次数',res.data.payCount)
					that.payCount = res.data.payCount
				})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			//打开外部浏览器充值
			//通过后台勾选的先判断是否验证邮箱手机号码，必须验证手机号码后方可进行提现
			PanDuaniSGouxuan() {
			
				let that = this
				that.$u.post('/withdraw/deposit/ctrl', {}).then(res => {
					console.log('点击查询弹窗', res.data);
			
					// let info = uni.getStorageSync("userinfo");
					// let verifyPhone = info.verifyPhone;
					// let verifyEmail = info.verifyEmail;
					// let realName = info.realName;
					// let bindCard = that.myAccountList;
			
					//通过传0123判断充值验证是否开启了勾选
					const num = res.data.depositConfig;
					const bitPosition0 = 0; //0手机，1邮箱，2实名，3提现账户
					const bitPosition1 = 1; //0手机，1邮箱，2实名，3提现账户
					const bitPosition2 = 2; //0手机，1邮箱，2实名，3提现账户
					const bitPosition3 = 3; //0手机，1邮箱，2实名，3提现账户
			
					const fag0 = this.checkBit(num, bitPosition0) ? '1' : '0'; //结果是1勾选 0未勾选
					const fag1 = this.checkBit(num, bitPosition1) ? '1' : '0'; //结果是1勾选 0未勾选
					const fag2 = this.checkBit(num, bitPosition2) ? '1' : '0'; //结果是1勾选 0未勾选
					const fag3 = this.checkBit(num, bitPosition3) ? '1' : '0'; //结果是1勾选 0未勾选
					this.managerFlag = fag0
			
					console.log(`是否勾选了手机 ${fag0}`);
					console.log(`是否勾选了邮箱 ${fag1}`);
					console.log(`是否勾选了实名 ${fag2}`);
					console.log(`是否勾选了提现账户 ${fag3}`);
			
					//console.log('是否完成了四项验证',verifyPhone,verifyEmail,realName,bindCard);
			
					//如果勾选了就需要去验证一下对应的提示
					if (fag0 == 1 && res.data.verifyPhone == false) {
						//打开弹窗进行手机验证
						that.$refs.openvpnShow.openPopup(1);
						return false
					} else if (fag1 == 1 && res.data.verifyEmail == false) {
						//打开弹窗进行邮箱验证
						that.$refs.openvpnShow.openPopup(1);
						return false
					} else if (fag2 == 1 && res.data.realName == false) {
						//打开弹窗进行实名验证
						that.$refs.openvpnShow.openPopup(1);
						return false
					} else if (fag3 == 1 && res.data.bindCard == false) {
						//打开弹窗进行提示绑定提款账户
						that.$refs.openvpnShow.openPopup(1);
						return false
					} else {
						console.log('都不成立直接去跳转充值')
						that.DepositOpen();
					}
			
				});
			
			},
			checkBit(num, bitPosition) {
				const mask = 1 << bitPosition;
				return (num & mask) !== 0;
			},
			DepositOpen() {
				let that = this
				let Datas = this.Selectedmethod
				if (that.Amount == '' && that.wallet == '') {
					that.$u.toast(this.$t('ToastPrompt.Toast6'));
				} else {
			
					//关了欢迎礼包开关 switchChecked
					//判断充值次数  payCount如果是 0，1，2 传act=1 否则传0
					let PayCount = that.payCount
					let act = 0
					if ((PayCount == 0 || PayCount == 1 || PayCount == 2) && that.switchChecked == true) {
						act = 1
					} else {
						act = 0
					}
			
					let language = uni.getStorageSync("UNI_LOCALE");
					let userid = uni.getStorageSync("userinfo").userId;
					let Domains = uni.getStorageSync("domains");
					let amount = that.Amount;
					let url = Domains + '/pay/recharge?userid=' + userid + '&id=' + Datas.id + '&cash=' + amount + '&lang=' + language + '&act=' + act;
			
					//#ifdef APP-PLUS
					plus.runtime.openURL(url);
					//#endif
			
					//#ifdef H5
					//if(window.plus){
					//	//console.log('是5+')
					//	plus.runtime.openURL(url);
					//} else {
					//	//console.log('不是5+环境')
					//window.open(url,'_self');
					//}
			
					if (window.Unity) {
						//console.log('Yes_Unity')
						Unity.openSafari(url);
					} else {
						//console.log('No_Unity')
						setTimeout(() => {
							window.open(url, '_blank');
						}, 100)
			
					}
					//#endif
				}
			},
			
			
			
			
			
			
			
			
			
			
			regPopupShow() {
				this.$refs.regiserShow.openPopup()
			},
			signPopupShow() {
				this.$refs.signInShow.openPopup()
			},
			clicktabs(idx) {
				let that = this
				if (idx == 0) {
					
					that.czTabsIdx = 0
					that.XuNibeDatas();
					that.$refs.xuanzeCS.init(that.selectList[0].title,that.selectList[0].icon);
					that.$refs.xuanzeZF.init(that.selectList2[0].label,that.selectList2[0].icon);
					
				} else if (idx == 1) {
					
					that.czTabsIdx = 1
					that.FabeDatas();
					that.$refs.xuanzeCS.init(that.selectList[0].title,that.selectList[0].icon);
					that.$refs.xuanzeZF.init(that.selectList2[0].label,that.selectList2[0].icon);
					
				}
			},
			Tologin() {
				this.$refs.signInShow.openPopup()
			},
			getMybalance() {
				let that = this
				that.$u.post('/refresh-balance', {}).then(res => {
					that.balance = res.data.balance / 100
					uni.$emit('getgetMybalance', 1)
				}).catch(err => {})
			},
			AddMax() {
				let that = this
				that.walletNum = that.balance
				that.isDisabledTwo = false
				that.withdrawAmount(that.balance)
			},
			renew() {
				this.showAnimate = true
				this.Getrenew()
				setTimeout(() => {
					this.showAnimate = false
				}, 500)
			},
			Getrenew() {
				let that = this
				uni.request({
					url: Vue.prototype.$baseUrl + '/transfer-out-balance',
					data: {},
					method: "POST",
					header: {
						'Content-Type': 'application/json',
						'Authorization': uni.getStorageSync('token')
					},
					success: (res) => {
						that.Available = res.data.balance / 100
						that.getMybalance()
						that.$nextTick(() => {
							uni.$emit('getgetMybalance', 1)
						})
					},
					fail: (err) => {}
				})
			},
			toguanli() {
				uni.navigateTo({
					url: '/pages/ManageAccount/ManageAccount'
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
						//uni.$emit('UpdataAddBcbalance', (res.data[0].actual/100).toFixed(2))
			
			
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
			
								//抖音的充值完成埋点
								if (window.ttq) {
									ttq.track('CompletePayment', {
										"contents": [{
											"content_id": item
											.orderId, // string. ID of the product. Example: "1077218".
											"content_type": "RMB", // string. Either product or product_group.
											"content_name": "RMB" // string. The name of the page or product. Example: "shirt".
										}],
										"value": item
										.Amount, // number. Value of the order or items sold. Example: 100.
										"currency": "RMB" // string. The 4217 currency code. Example: "USD".
									});
								}
			
			
							}
			
						})
			
			
			
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
			LianXiKeFu() {
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
				});
			}
		}
	}
</script>

<style lang="scss">
	
	/deep/ .u-drawer {
		max-width: 668px !important;
	}
	
	/deep/ .u-sticky {
		width: 100% !important;
	}
	
	page {
		//height: calc(100vh);
		//background-color: #101923 !important;
	}
	
	.poptptopis {
		color: $tkzh-bnak-name-color;
		// word-wrap: break-word;
		// white-space: nowrap;
		// word-break: break-all;
		// display: -webkit-box;
		// -webkit-line-clamp: 6;
		// -webkit-box-orient: vertical;
		// overflow: hidden;
	}

	.huobi_cools_box {
		.jiamihuobi {
			margin: 30rpx 0;

			.huobi_cools_title {
				color: #fff;
				font-weight: bold;
				margin: 0 0 16rpx 0;
				padding: 0 10rpx;
			}

			.huobiList_box {
				text-align: center;
				background-color: #1c2a3b;
				border: 1px solid #2b3545;
				border-radius: 10rpx;
				margin-bottom: 16rpx;
				padding: 26rpx 0;

				image {
					width: 70rpx;
					height: 70rpx;
					margin-bottom: 15rpx;
				}

				view {
					color: #fff;
				}
			}
		}
	}

	.xutouzhu {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 40rpx;
		color: $all-secondary-text-color;

		.u-icon {
			margin-right: 10rpx;
		}

		span {
			color: #2283f6;
			margin: 0 10rpx;
			cursor: pointer;
			text-decoration: underline;
			font-size: 31rpx;
			font-weight: 600;
		}
	}

	.nav_top_box_wwrap {
		background-color: $body-bg-color;
	}

	.nav_top_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 30rpx 30rpx 30rpx;
		border-radius: 28rpx 28rpx 0 0;
		background-color: $body-bg-color;

		.nav_top_box_left {
			color: $all-secondary-text-color;
			display: flex;
			align-items: center;
			cursor: pointer;

			.fanhui_btn {
				background-color: $thcz-back-btn-bg-color;
				width: 70rpx;
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 16rpx;
				margin-right: 10rpx;

				.u-icon {
					font-size: 30rpx;
				}
			}
			.cz_title {
				font-weight: bold;
				font-size: 40rpx;
				color: $all-secondary-text-color;
				padding-left: 10rpx;
			}
		}

		.nav_top_box_right {
			display: flex;
			align-items: center;
			color: $all-secondary-text-color;

			.rhsy {
				background-color: #2a3545;
				width: auto;
				padding: 0 20rpx;
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 16rpx;
				margin-right: 10rpx;
				cursor: pointer;
				font-size: 24rpx !important;
				color: #a2afc6;

				image {
					width: 26rpx;
					margin-right: 10rpx;
				}
			}

			.lsjl {
				background-color: $thcz-back-btn-bg-color;
				width: 70rpx;
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 16rpx;
				cursor: pointer;

				.u-icon {
					font-size: 38rpx;
				}
			}
		}
	}

	/deep/ .pddingLeftle {
		padding-left: 11% !important;
	}

	.card__main-bottombain {
		height: 20rpx;
		width: 100%;
		border-bottom: 1px solid;
		border-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #3c4e68 50%, rgba(255, 255, 255, 0) 99%) 2 2 2 2;
	}


	.newPayProvider_type_wrap {
		background-color: #080c13;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		padding: 4rpx 8rpx;
		border: 1px solid #080c13;

		.type_box_item2 {
			width: 300rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			background-color: $all-secondary-color;
			border-radius: 20rpx;
			position: relative;
			height: 94rpx;

			/deep/ .easy-select-options {
				margin-top: 26rpx !important;
				border-radius: 10px !important;
			}

			/deep/ .easy-select {
				padding: 32rpx 0 !important;
			}

			/deep/ .shuruluang {
				//padding-left: 0 !important;
				margin-left: 0 !important;
				border-left: none !important;
			}

			/deep/ .easy-select-options-item {
				padding: 0 10px 0 4px !important;
				font-size: 13px !important;
			}

			/deep/ .xzhong {
				display: none;
			}

			view {
				flex: 1 !important;
				color: $font-all-color;
			}

			.line_icon {
				position: absolute;
				top: 50%;
				left: 2.5%;
				transform: translate(2.5%, -50%);
				width: 164rpx;
				height: 68rpx;
			}

			.line_iconr {
				margin-left: auto;
				width: 10rpx;
				height: 20rpx;
				transform: rotate(180deg);
			}
		}
	}

	.is_xuanze_free {
		padding: 0 10rpx;

		.xuanze_free_item {
			.tishi_box {
				margin-top: 20rpx;
				display: flex;
				align-items: flex-start;

				.u-icon {
					position: relative;
					top: 2rpx;
				}

				span {
					color: $font-all-color;
					display: inline-block;
					padding-left: 10rpx;
					font-size: 26rpx;
				}
			}

			.free_item_lookmore {
				display: flex;
				align-items: center;
				color: #2283f6;
				cursor: pointer;
				font-weight: 500;
				margin-top: 6rpx;
			}

			.xuanze_free_item_title_box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 0 0 0;

				view:nth-child(1) {
					color: $all-secondary-text-color;
					font-size: 28rpx;
					font-weight: 600;
					display: flex;
					align-items: center;
					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 6rpx;
					}
				}

				view:nth-child(2) {
					color: #55657e;
					font-size: 26rpx;
					display: flex;
					font-weight: initial;
					align-items: center;

					span {
						margin-right: 6rpx;
					}
				}
			}

			.free_info_wrap {
				.free_info_more {
					.free_info_more_item {
						display: flex;
						align-items: center;
						justify-content: flex-start;
						margin: 30rpx 0;

						.more_item_bg1 {
							display: inline-block;
							background-image: linear-gradient(to top, #854423, #af643b);
							width: 26rpx;
							height: 26rpx;
							border-radius: 200rpx;
							border: 1px solid #9c6c53;
						}

						.more_item_bg2 {
							display: inline-block;
							background-image: linear-gradient(to top, #44687b, #7d929f);
							width: 26rpx;
							height: 26rpx;
							border-radius: 200rpx;
							border: 1px solid #b5c4cd;
						}

						.more_item_bg3 {
							display: inline-block;
							background-image: linear-gradient(to top, #c66721, #f3c373);
							width: 26rpx;
							height: 26rpx;
							border-radius: 200rpx;
							border: 1px solid #eac982;
						}

						.more_item_text {
							padding-left: 10rpx;
							color: #7a99bf;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							font-size: 26rpx;

							p {
								color: $all-secondary-text-color;
								margin: 0 10rpx;
							}

							span {
								color: #1db83e;
							}
						}

					}
				}

				.free_info_item {
					margin-top: 14rpx;
					margin-bottom: 10rpx;
					background-image: linear-gradient(to left, #007aff, #1f64da);
					padding: 15rpx 0;
					border-radius: 15rpx;

					.free_info_title {
						margin-bottom: 10rpx;
						font-weight: bold;
						text-align: center;
						color: #ffffff;
					}

					.free_info_daojishi {
						display: flex;
						align-items: center;
						justify-content: center;
						color: #fff;
						width: 100%;

						.free_djs_left {
							view {
								display: flex;
								align-items: center;
								justify-content: center;

								image {
									width: 40rpx;
									height: 40rpx;
									margin: 0 10rpx;
								}

								span {
									font-weight: bold;
									font-size: 34rpx;
								}
							}
						}

						.free_djs_right {
							margin-left: 14rpx;
						}
					}
				}
			}

			.radio_name {
				display: flex;
				align-items: center;

				.u-icon {
					margin-left: 6rpx;
				}
			}

			/deep/ .u-radio-group {
				width: 100%;
			}

			/deep/ .u-radio {
				background-color: $all-secondary-color;
				padding: 11px 0 11px 12px;
				border-radius: 6px;
				margin: 10px 0 0 0;
				align-items: flex-start !important;
				position: relative;
			}

			/deep/ .u-radio__label {
				width: 100%;
				//margin-right: 0 !important;
				color: #ffffff !important;
			}

			/deep/ .u-radio__icon-wrap {
				border: 1px solid #7b98bf;
				position: relative;
				top: 10rpx;
			}
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
		padding: 20rpx 20rpx 0 20rpx;
		//background-color: #101923;
		//border-radius: 28rpx 28rpx 0 0;
		position: relative;
	}

	.yztg_box_wrap {
		background-color: $thcz-top-aq-bg-color;

		/* #ifndef APP-PLUS */
		padding: 1px 10px 1px 10px;
		/* #endif */

		/* #ifdef APP-PLUS */
		padding: 120rpx 20rpx 1rpx 20rpx;
		/* #endif */

		display: flex;
		align-items: center;
		justify-content: center;

		.yztg_box_leftMar {
			margin-left: 20rpx !important;

			image {
				width: 28rpx !important;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}

		.jilu {
			flex: initial !important;
			padding: 0 20rpx;
			margin-left: 20rpx !important;

			.u-icon {
				font-size: 44rpx;
			}

			image {
				margin-right: 0 !important;
			}
		}

		.yztg_box {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: $thcz-top-aq-nei-color;
			border: 1px solid $thcz-top-aq-nei-border;
			color: #fafcff;
			border-radius: 16rpx;
			margin: 20rpx auto;
			//height: 88rpx;
			//line-height: 88rpx;
			padding: 20rpx;
			text-align: center;
			font-size: 30rpx;

			view {
				font-weight: bold;
				width: auto;
				// word-break:break-all;
				// display:-webkit-box;
				// -webkit-line-clamp:1;
				// -webkit-box-orient:vertical;
				// overflow:hidden;
			}

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
	}


	.noLogin {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.Register_btn2 {
			width: 100%;
			margin: 80rpx auto 0;
		}
	}

	.amount_info {
		width: 98%;
		margin: 20rpx auto;
		padding: 5px 5px 5px 10px;
		border-radius: 24rpx;
		margin-top: 20rpx;
		background-color: $select-drop-down-color;
		border: 1px solid $select-drop-down-border-color;

		.amount_info_item {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {
				color: $font-all-color;
			}

			span {
				color: $all-secondary-text-color;
				font-weight: bold;
				padding: 5px 7px 5px 8px;
				border-radius: 15rpx;
				image {
					width: 38rpx;
					height: 38rpx;
					margin-left: 10rpx;
				}
			}

			.amii_bg {
				background-color: $pupUp-bg-color;
				color: #3673D9;
				padding: 5px 7px 5px 8px;
				border-radius: 15rpx;
			}
		}
	}

	.xf_cz_btn {
		position: fixed;
		bottom: 0;
		z-index: 9999;
		width: 100%;
		padding: 20px 15px;
		background-color: $all-secondary-color;
		box-shadow: 0 0 10px 0px #0000001a;

		.Register_btn {
			width: 100%;
			margin: 0 auto 0;
			/deep/ uni-button {
				background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57) !important;
				box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30 !important;
				height: 100rpx !important;
				line-height: 100rpx !important;
			}
			.czhi_btnbox {
				.tguohu {
					text {
						margin-left: 10rpx;
					}
				}
				view {
					line-height: normal !important;
				}
				.tgyuText {
					font-size: 28rpx;
				}
				.shijiczje {
					margin: 0 0 0 10rpx;
					font-size: 24rpx;
					color: #ffb4c8;
					text {
						margin-left: 10rpx;
					}
				}
			}
		}
	}

	.Tip_box {
		color: $font-all-color;
		margin-top: 18rpx;
	}

	.wallet_input2 {
		flex: 1;
		margin-bottom: 20rpx !important;
		//display: flex;
		align-items: center;
		//border: 1px solid $all-secondary-color;
		//background-color: $all-secondary-color;
		padding: 0 24rpx;
		border-radius: 20rpx;
		.rank_icon {
			width: 40rpx !important;
			height: 40rpx !important;
			margin-left: 0;
		}
	}

	.wallet_input {
		width: 98%;
		margin: 0 auto 10rpx;
		display: flex;
		align-items: center;
		background-color: $select-drop-down-color;
		border: 1px solid $select-drop-down-border-color;
		padding: 14rpx 24rpx;
		border-radius: 24rpx;

		.wallet_input_R {
			color: $font-all-color;
			font-size: 32rpx;
		}

		.wallet_input_I {
			flex: 1;
			padding: 0;
			margin-left: 0rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			/deep/ uni-textarea {
				height: 50rpx !important;
				line-height: 50rpx !important;
				min-height: 50rpx !important;
			}

			.addMax {
				color: #ebeced;
				background-color: $tkcz-max-btn;
				padding: 15rpx 20rpx;
				border-radius: 10px;
			}

			.bili {
				color: #3673D9;
				font-weight: 500;
				font-size: 26rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.u-icon {
					margin-left: 10rpx;
				}
			}
			
			.fabifu_icon {
				width: 40rpx;
				height: 40rpx;
				margin: 0 12rpx 0 0;
			}
			
			.Fabifu {
				font-weight: bold;
				font-size: 32rpx;
				color: #b2bad3;
				display: flex;
				align-items: center;
			}
		}
		.wallet_input_I2 {
			padding: 7.5px 0;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.hdJinBi {
				font-weight: bold;
				color: $all-secondary-text-color;
				font-size: 30rpx;
			}
			// text {
			// 	color: #7a99bf;
			// 	font-size: 34rpx;
			// 	margin-right: 6rpx;
			// }
			
			/deep/ uni-textarea {
				height: 50rpx !important;
				line-height: 50rpx !important;
				min-height: 50rpx !important;
				font-size: 34rpx !important;
			}
			
			.addMax {
				color: #ebeced;
				background-color: $tkcz-max-btn;
				padding: 15rpx 20rpx;
				border-radius: 10px;
			}
		}
	}
	
	.bili {
		margin-left: auto;
		font-weight: 500;
		font-size: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.ewwaijia {
			background: linear-gradient(1turn, #1db83e 0.8%, #1db83e);
			box-shadow: 0 3px 28px rgba(29, 184, 62, 0.4), inset 0 3px 3px #ffffff4d;
			border-radius: 100px;
			padding: 2px 8px;
			color: #ffffff;
		}
		.u-icon {
			margin-left: 10rpx;
			position: relative;
			top: 2px;
		}
	}

	.Available {
		width: 98%;
		margin: 20rpx auto;
		border-radius: 20rpx;
		margin-top: 18rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;


		.underline {
			cursor: pointer;
			text-decoration: underline;
		}

		.Available_item:first-child {
			margin-left: 0;
		}

		.Available_item:last-child {
			margin-right: 0;
		}

		.Available_item {
			//height: 210rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: $font-all-color;
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			padding: 20rpx;
			margin: 0 10rpx;
			flex: 1;
			border-radius: 24rpx;

			.Available_item_box {
				display: flex;
				align-items: center;
				flex: 1;

				view:nth-child(1) {
					display: none;
					margin-right: 10rpx;
				}

				view:nth-child(2) {
					display: flex;
					align-items: center;
					margin: 10rpx 10rpx 10rpx 0;
				}

				view:nth-child(3) {
					margin-left: auto;
				}

				.a_bold {
					font-weight: bold;
					color: $all-secondary-text-color;
					display: flex;
					align-items: center;
					cursor: pointer;

					image {
						width: 34rpx;
						height: 34rpx;
						margin-left: 14rpx;
						position: relative;
						top: 0;
						cursor: pointer;
					}

					.u-icon {
						margin-left: 14rpx;
					}
				}
			}
		}
	}

	.type_box {
		//margin-top: 40rpx;

		.bottom_swpier_bpx_wrap {
			.scrollview-box-bottom {
				white-space: nowrap;
				/* 滚动必须加的属性 */
				width: 100%;
				padding: 0 10rpx;

				.scroll_item_box_bottom {
					width: 200rpx;
					//height: 240rpx;
					margin: 0 20rpx 0 0;
					display: inline-block;
					/* item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可 */
					//background-color: #1db83e;
					//padding: 12px;
					//border-radius: 20rpx;

				}
			}
		}

		.PayProvider_wrap {
			.demo-layout {
				margin-bottom: 20rpx;
				background: $czym-paytype-mzbg-color;
				text-align: center;
				height: 88rpx;
				border-radius: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 2px solid $czym-paytype-mzborder-color;
				position: relative;
				overflow: hidden;
				
				.xzfontColor {
					color: $czym-paytype-xzfont-color !important;
				}
				
				.mzfontColor {
					color: $czym-paytype-mzfont-color;
				}

				text {
					padding: 0 10rpx;
					font-size: 24rpx;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.tag_top {
					font-size: 24rpx;
					background-color: #f00;
					text-align: center; // 文本居中 
					position: absolute; // 绝对定位
					top: 10rpx;
					//font-weight: bold;
					right: -30rpx;
					// 以下属性会影响斜边标签的显示
					width: 50%;
					transform: rotate(50deg);
				}

				.son4 {
					/* 左上角飘带 */
					background: linear-gradient(1turn, #1db83e .8%, #1db83e);
					box-shadow: 0 3px 28px rgba(29, 184, 62, 0.4), inset 0 3px 3px #ffffff4d;
					/* 左上角飘带的背景颜色 */
					overflow: hidden;
					white-space: nowrap;
					/* 文字不换行*/
					position: absolute;
					/* 绝对定位 */
					right: 0;
					top: 0;
					border-radius: 0 10px 0 6px;
					//transform: rotate(45deg);
					/* 旋转45°*/
				}

				.son4 span {
					padding: 2px 4px 2px 4px;
					font-size: 16rpx;
					color: #ffffff;
					display: block;
					text-align: center;
				}
			}

			.mren_sc {
				border: 2px solid $czym-paytype-xzborder-color !important;
				background: $czym-paytype-xzbg-color !important;
			}
		}

		.PayMethod_wrap {
			.demo-layout {
				margin-bottom: 20rpx;
				background: $czym-paytype-mzbg-color;
				text-align: center;
				height: 158rpx;
				border-radius: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 2px solid $czym-paytype-mzborder-color;

				.pay_type {
					.line_icon {
						width: 70rpx !important;
						height: 70rpx !important;
						border-radius: 0;
						margin-bottom: 10rpx;
						//filter: brightness(100);
					}

					view {
						color: $all-secondary-text-color;
						font-size: 24rpx;
					}
				}
			}

			.mren_sc {
				border: 2px solid $czym-paytype-xzborder-color !important;
				background: $czym-paytype-xzbg-color !important;
				.line_icon {
					position: relative;
					z-index: 9;
					width: 68rpx;
					height: 68rpx;
					border-radius: 14rpx;
					//filter: brightness(100);
				}
			}
		}

		.type_box_title {
			padding: 20rpx 10rpx 0 10rpx;
			color: $all-secondary-text-color;
			font-size: 28rpx;
			margin-top: 0;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: bold;

			.ttpetitle {}

			.bizhong {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.bztitle {
					color: $font-all-color;
					margin-right: 10rpx;
					display: flex;
					align-items: center;
				}

				.bzxz {
					display: flex;
					align-items: center;
					border: 1px solid #2d3544;
					background-color: #0b1017;
					border-radius: 16rpx;
					padding: 10rpx 10rpx 10rpx 10rpx;
					font-size: 24rpx;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 6rpx;
					}

					.sanjiao {
						background-color: #1c2a3b;
						border-radius: 10rpx;
						width: 36rpx;
						height: 36rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 10rpx;

						.u-icon {
							text-align: center;
						}
					}
				}
			}

			span {
				color: #3673D9;
			}

			.u-icon {
				font-size: 34rpx;
			}
		}

		.type_box_item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			border-radius: 24rpx;
			margin-bottom: 20rpx;
			position: relative;
			padding: 10rpx 0;

			view {
				flex: 1 !important;
				color: $font-all-color;
			}

			.line_icon {
				position: absolute;
				top: 50%;
				left: 2.5%;
				transform: translate(2.5%, -50%);
				width: 55rpx;
				height: 55rpx;
			}

			.line_icon_2 {
				position: absolute;
				top: 50%;
				left: 2.5%;
				transform: translate(2.5%, -50%);
				width: 55rpx;
				height: 55rpx;
			}

			.line_iconr {
				margin-left: auto;
				width: 10rpx;
				height: 20rpx;
				transform: rotate(180deg);
			}
		}
	}
	
	.Currency_selection_wrap {
		padding: 50rpx 30rpx 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.Currency_s_cus_item {
			flex: 1;
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			border-radius: 10px;
			margin-right: 30rpx;
		}
		.Currency_s_cus_item:last-child {
			margin-right: 0;
		}
	}

	.tabs_box_wrap {
		width: 100%;
		margin: 30rpx 0 0 0;
	}

	.tabs_box {
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		.xzletab {
			border: 1px solid #3673D9 !important;
			background-color: #1c2a3b !important;
		}

		.tabs_item:last-child {
			margin: 0;
		}

		.tabs_item {
			flex: 1;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 30rpx 0 0;

			span {
				position: absolute;
				display: inline-block;
				width: 100%;
				height: 4rpx;
				background-color: #3673D9;
				bottom: -4rpx;
			}

			.item_name {
				width: 100%;
				font-size: 30rpx;
				position: relative;
				top: 0;
				view {
					color: $fabi-xunibi-tabs-mzfont-color;
					height: 42px;
					text-align: center;
					line-height: 42px;
					border-radius: 10px;
					background: $fabi-xunibi-tabs-mz-color;
				}
			}
			
			.xzuanzhong {
				position: relative;
				view {
					font-weight: bold;
					color: #ffffff;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow:hidden;
					background: linear-gradient(1turn,#0c5eff .8%,#1398f9);
					box-shadow: 0 3px 28px #2283f666,inset 0 3px 3px #ffffff4d;
					border-radius: 10px;
					height: 42px;
					text-align: center;
					padding: 0 12px;
					position: relative;
					z-index: 2;
					top: -2px;
				}
			}
			.xzuanzhong:after {
				border-radius: 10px;
				height: 42px;
				background-color: #003293;
				bottom: -2px;
				content: "";
				display: block;
				left: 0;
				right: 0;
				margin: 0 auto;
				position: absolute;
				z-index: 1;
			}
			
		}
	}



	.type_list {
		//overflow: hidden;
		//margin-top: 20rpx;

		.list_item {
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			padding: 0 0 0 0;
			//overflow: hidden;
			width: 100%;

			.type_title {
				padding: 5px 5px 10px 5px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $all-secondary-text-color;
				font-weight: bold;

				span {
					color: #3673D9;
				}

				.u-icon {
					font-size: 34rpx;
				}

				.Tip_box2 {
					flex: 1;
					padding: 0 0 0 10rpx;
					color: $font-all-color;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					view {
						display: flex;
						align-items: center;
					}

					image {
						width: 40rpx;
						height: 40rpx;
						margin-left: 10rpx;
						margin-right: 10rpx;
					}
				}
			}
			
			.type_title2 {
				margin-top: 30rpx;
			}

			.xuanze_box_list {}

			.bg-purple {
				
				background: $czym-paytype-mzbg-color;
				border: 1px solid $czym-paytype-mzborder-color;
				
				text-align: center;
				border-radius: 24rpx;
				padding: 0 0;
				height: 88rpx;
				line-height: 88rpx;
				width: 100%;
				color: $all-secondary-text-color;
				font-size: 26rpx;
				margin: 0 0 16rpx 0;
				//font-weight: bold;
				text {
					margin-right: 5rpx;
					color: #728196;
				}
			}

			.classxuanzhong {
				
				border: 2px solid $czym-paytype-xzborder-color !important;
				background: $czym-paytype-xzbg-color !important;
				color: $czym-paytype-xzfont-color !important;
				
				text-align: center;
				border-radius: 24rpx;
				padding: 0 0;
				height: 88rpx;
				line-height: 88rpx;
				width: 100%;
				font-size: 26rpx;
				//font-weight: bold;
				margin: 0 0 16rpx 0;
				text {
					margin-right: 5rpx;
					color: #728196;
				}
			}

		}
	}
	.new_njhd {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: #6f7e93;
		image {
			margin-left: 10rpx;
		}
		.zzhd_num {
			color: #2284f6 !important;
			font-weight: bold;
			font-size: 16px;
			margin: 0 0 0 5px;
		}
	}
	
	
	
.look_all_btn {
	width: 100%;
	position: sticky;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	padding: 30rpx 0 30rpx 0;
	background-color: $all-secondary-color;
	z-index: 99;
	box-shadow: 0 0 20px 0px #00000075;
	font-size: 28rpx;
	.NovBtn3 {
		opacity: .5 !important;
	}
	
	.NovBtn2 {
		cursor: pointer;
		position: relative;
		width: 95%;
		margin: 0 auto;

		span {
			font-weight: bold;
			width: 100%;
			color: #ffffff;
			display: inline-block;
			background-color: #2c62f4;
			background: linear-gradient(1turn, #2c62f4 .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			border-radius: 8px;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
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
		border-radius: 8px;
		height: 90rpx;
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
}
	
</style>