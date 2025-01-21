<template>
	<view :style="theme">
		<!-- <install-popup ref="openInstallshow" @CheckboxChange="checkboxChange" @guanBiinstallPopup="GuanBiinstallPopup"></install-popup> -->
		<u-navbar :height="showInstall && platform != 8 ? Navheight:'59'" :is-fixed="is_fixeds" back-icon-color="#fff" :is-back="false" title-color="#fff" :background="{background:'transparent'}" :border-bottom="false">
			<view class="install_webapp" v-if="yqhaoyoushow && showInstall && platform != 8">
				<image class="mini_logo" :src="'/static/logo/' + platform + '_mini_logo.png'"></image>
				<view class="install_info">
					<view>{{$t('NewlyAdded.InstallTIP',{gtgt: 20})}}</view>
					<view>{{$t('NewlyAdded.QuickAT')}}</view>
				</view>
				<view class="install_btn" @click="OpenInstallguiin()"><span>{{$t('NewlyAdded.InstallBTN')}}</span></view>
				<view class="install_colso" @click="GuanBiinstall()"><u-icon name="close" color="#ffffff" size="34"></u-icon></view>
			</view>
			<view class="logo_and_right">
				<view class="left_logo_dayTwo" v-if="is_secondary == true">
					<image @click="BlackPage()" class="menu2" src="/static/image/navBlackIcon.png" mode="widthFix"></image>
					<!--<image class="logo" src="/static/image/666bet.png"></image>-->
					<view class="nav_title">{{title}}</view>
				</view>
				<view class="left_logo" v-else>
					<image @click="startAnimation()" class="menu" :animation="animationData" src="/static/image/menu_fold_one_icon_155136.png"></image>
					<!--<image v-else @click="MenuShow = false" class="menu2" src="/static/image/guanbi.png"></image>-->
					<image class="logo" :src="'/static/logo/' + platform + '_LOGO_MAIN.png'" mode="widthFix" @click="Tohome()"></image>
				</view>
				<view class="right_box" v-if="is_logon == 1">
					<view class="my_Wallet">
						<view class="mayjine">
							<!-- <image class="shuaxin" :class="{'rotate360':showAnimate}" @click="play2()" src="/static/image/shuaxin.png"></image> -->
							<view class="yue">
								<block v-if="is_SelectCurrencyData">
									<image class="rank_icon" v-if="SelectCurrencyData.type == 999" src="/static/image/currency_coins.png"></image>
									<image class="rank_icon" v-else-if="SelectCurrencyData.type == 444" src="/static/image/coin-yuan_cny.png"></image>
									<image class="rank_icon" v-else-if="SelectCurrencyData.type == 555" src="/static/image/jinbi-3.png"></image>
									<image class="rank_icon" v-else :src="staticDname + '/pay/' + SelectCurrencyData.abbr + '.png'"></image>
									
									<view class="myedu" @click="openShuaxinbc()">
										{{JiSuanHuiLv(SelectCurrencyData)}}
									</view>
								</block>
								<block v-else-if="!is_SelectCurrencyData">
									<image class="rank_icon" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
									<image class="rank_icon" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
									<image class="rank_icon" src="/static/image/jinbi-3.png" v-else></image>
									<view class="myedu" @click="openShuaxinbc()">
										{{convertToYuan(balance)}}
									</view>
								</block>
								<view class="arrow-down" @click="openShuaxinbc()">
									<u-icon name="arrow-down"></u-icon>
								</view>
								<!--选择货币-->
								<Select-currency ref="OpenPopup" @UpSelectCurrency="UpSelectCurrency" @yjzhJinbi="YiJianShouHuis"></Select-currency>
							</view>
							
							<uni-transition ref="LiShiJiLu" class="LiShiJiLu_box" :mode-class="['fade','slide-bottom']" :show="show3">
								<view style="color: #1bb83d;font-weight: bold;">+{{PiaoChangVal}}</view>
							</uni-transition>
							
							<!-- <z-top-tips ref="uTips" navbar-height="20"></z-top-tips> -->
						</view>
						<view class="wallet_icon" @click="Towallet()">
							<view><image src="/static/image/wallet_icon.png"></image></view>
						</view>
					</view>
					<view class="xsTask">
						<!-- 新手任务 -->
						<NoviceTask ref=""></NoviceTask>
					</view>
					<!-- <view class="tongzhi" @click="ToNotification()">
						<span v-if="SystemunreadList + PersonalunreadList != 0">{{SystemunreadList + PersonalunreadList}}</span>
						<image src="/static/image/bell_ring.png"></image>
					</view> -->
				</view>
				<view class="right_box" v-if="is_logon == 0">
					<view class="xsTask2">
					  <!-- 新手任务 -->
					 <NoviceTask ref=""></NoviceTask>
					</view>
					<view class="SignIn_Regiser">
						<view class="SigninBtn" @click="signPopupShow()"><span>{{$t('navBar.rtitle1')}}</span></view>
						<view class="zhuceBtn" @click="regPopupShow()">
						<span>{{$t('navBar.rtitle2')}}</span>
						<view class="animation-item"></view>
						<view class="animation-item"></view>
						<view class="animation-item"></view>
						<view class="animation-item"></view>
						</view>
					</view>
				</view>
			</view>
		</u-navbar>

	    <!-- Qiaozhi Mobile Menu-->
		<match-media :max-width="800" >
			<u-popup v-model="MenuShow" mode="left" z-index="101" width="74%" :closeable="false" @close="PopUpclose">
				<view class="menu_wrap" :class="statusBarHeight == true?'menu_wrap2':''" :style="{paddingTop: showInstall && platform != 8?Navheight + 15 + 'px':''}">
					<view :style="{height: isStatusBarHeight}"></view>
					<view class="souso_cion" @click="Tosearch()"><u-icon name="search" color="#3c485c" size="38"></u-icon>{{$t('Qiaozhi.Search')}}</view>
					<view class="cell_box_title">{{$t('Qiaozhi.Betting')}}</view>
						<view class="cell_box">
							<u-cell-group :border="false">
								<u-cell-item class="active" :title="$t('Qiaozhi.Casino')" :border-bottom="false" :title-style="titleStype"
									hover-class="cell-hover-class" index="99" @click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/casino.webp"></u-icon>
									<view slot="right-icon">
										<image class="arrow_right" src="/static/image/arrow_right_icon.png"
											mode="widthFix"></image>
									</view>
								</u-cell-item>
							</u-cell-group>
						</view>
						<view class="cell_box_title">{{$t('Qiaozhi.Crypto')}}</view>
						<view class="cell_box">
							<u-cell-group :border="false">
								<u-cell-item :title="$t('Deposit')" :border-bottom="false" :title-style="titleStype"
									hover-class="active" index="14" @click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/usd-green.webp"></u-icon>
								</u-cell-item>
								<u-cell-item :title="$t('Qiaozhi.CryptoSwap')" :border-bottom="false"
									:title-style="titleStype" hover-class="active" index="15"
									@click="openType" :arrow="false">
									<u-icon slot="icon" size="26"
										name="/static/image/menuIcon/crypto-swap-3d.webp"></u-icon>
								</u-cell-item>
								<u-cell-item :title="$t('Vault Pro')" :border-bottom="false" :title-style="titleStype"
									hover-class="active" index="16" @click="openType" :arrow="false">
									<u-icon slot="icon" size="26" name="/static/image/menuIcon/vault-pro.webp"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</view>

						<view class="cell_box" :style="{display:'none'}">
							<u-cell-group :border="false">
								<u-cell-item :title="$t('sidebar.title3')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="3" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m3.png"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</view>

						<view class="cell_box" :style="{display:'none'}">
							<u-cell-group :border="false">
								<u-cell-item :title="$t('sidebar.title6')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="6" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m7.png"></u-icon>
								</u-cell-item>
								<u-cell-item :title="$t('sidebar.title7')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="7" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m6.png"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</view>

						<view class="cell_box_title">{{$t('Qiaozhi.General')}}</view>
						<view class="cell_box _default">
							<u-cell-group :border="false">
								<u-cell-item :title="$t('sidebar.title2')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="2" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="26" name="/static/image/menuIcon/m1.png"></u-icon>
								</u-cell-item>
								<u-cell-item :title="$t('sidebar.title8')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="8" @click="openType"
									:arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m8.png"></u-icon>
								</u-cell-item>
								<u-cell-item :style="{display:'none'}" :title="$t('NEWBonusPageA.BonusSYS')"
									:border-bottom="false" :title-style="titleStype" hover-class="cell-hover-class"
									index="17" @click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/jiangli.png"></u-icon>
									<view slot="right-icon">
										<view class="tasg_icon">
											<span>Hot</span>
											<image class="arrow_right" src="/static/image/arrow_right_icon.png"
												mode="widthFix"></image>
										</view>
									</view>
								</u-cell-item>
								<u-cell-item :border-bottom="false" :title-style="titleStype"
									hover-class="cell-hover-class" index="9" @click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m9.png"></u-icon>
									<template slot="title">
										<span class="slug">{{$t('Qiaozhi.VIP')}}</span>{{$t('Qiaozhi.Club')}}
									</template>
								</u-cell-item>
							</u-cell-group>

							<u-cell-group :border="false">
								<u-cell-item :title="$t('sidebar.title11')" :border-bottom="false"
									:title-style="titleStype" hover-class="cell-hover-class" index="11"
									@click="openType" :arrow="false">
									<u-icon slot="icon" size="28" name="/static/image/menuIcon/m11.png"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</view>
						<view class="payment_methods _line"></view>
						<view class="payment_methods" @click="openType">
							<image class="_item" src="/static/image/payments/gpay.png" mode="widthFix"></image>
							<image class="_item" src="/static/image/payments/applepay.png" mode="widthFix"></image>
							<image class="_item" src="/static/image/payments/mastercard.png" mode="widthFix"></image>
							<image class="_item" src="/static/image/payments/visa.png" mode="widthFix"></image>
						</view>
						<view class="cell_box _default">
							<view class="sevae_btn_wrap _no_fixed">
								<view class="sevae_btn buy_btn">
									<u-button type="secondary" @click="openType">{{$t('Qiaozhi.BuyCrypto')}}</u-button>
								</view>
							</view>
						</view>
						<view class="cell_box_wrapper">
							<view class="cell_box_title _no-item">{{$t('Qiaozhi.App')}}</view>
							<view class="_apps">
								<view class="_apps _item">
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
										fill="none">
										<g opacity="0.7">
											<g clip-path="url(#clip0_1_6367)">
												<mask id="mask0_1_6367" style="mask-type:luminance"
													maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
													<path d="M0 0H14V14H0V0Z" fill="white" />
												</mask>
												<g mask="url(#mask0_1_6367)">
													<path d="M8.89577 2.02413C9.14079 1.74356 9.32735 1.41691 9.44454 1.06333C9.56174 0.709749 9.6072 0.336338 9.57827 -0.0350342C8.83276 0.0317759 8.14146 0.382646 7.64744 0.944966C7.41108 1.21698 7.23194 1.53382 7.12069 1.87658C7.00945 2.21934 6.96838 2.58099 6.99994 2.93997C7.36561 2.94657 7.72771 2.86712 8.05703 2.70804C8.38634 2.54895 8.67365 2.31468 8.89577 2.02413ZM10.5233 6.82497C10.5271 6.33062 10.6565 5.84535 10.8994 5.41475C11.1422 4.98414 11.4905 4.62233 11.9116 4.3633C11.6435 3.98296 11.2916 3.66939 10.8829 3.44686C10.4742 3.22432 10.0199 3.09879 9.55494 3.07997C8.54577 2.97497 7.61827 3.6633 7.08161 3.6633C6.55077 3.6633 5.79827 3.09163 4.95827 3.1033C4.4092 3.11897 3.87376 3.27795 3.40511 3.56447C2.93645 3.85098 2.55086 4.25507 2.28661 4.73663C1.14911 6.7083 1.99494 9.63663 3.13244 11.235C3.64577 12.0166 4.29327 12.8975 5.14494 12.8683C5.99661 12.8391 6.27077 12.3375 7.25661 12.3375C8.24244 12.3375 8.54577 12.8625 9.38577 12.845C10.2258 12.8275 10.8149 12.0458 11.3574 11.27C11.7442 10.7008 12.045 10.0777 12.2499 9.4208C11.7408 9.20132 11.3065 8.83851 11 8.37658C10.6934 7.91464 10.5278 7.37352 10.5233 6.81913" fill="white" />
												</g>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_6367">
												<rect width="14" height="14" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</view>
								<view class="_apps _item">
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
										fill="none">
										<g opacity="0.7">
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M8.59258 2.99831C8.54077 2.99986 8.48917 2.99109 8.44078 2.97251C8.39239 2.95393 8.34818 2.92591 8.31072 2.89008C8.27326 2.85425 8.24331 2.81133 8.2226 2.76381C8.20188 2.7163 8.19083 2.66514 8.19008 2.61331C8.19008 2.39747 8.37091 2.22831 8.59258 2.22831C8.81425 2.22831 8.98925 2.40331 8.98925 2.61331C8.98849 2.66463 8.97762 2.71531 8.95728 2.76244C8.93693 2.80956 8.9075 2.85222 8.87066 2.88797C8.83383 2.92372 8.79031 2.95187 8.7426 2.9708C8.69488 2.98973 8.64391 2.99908 8.59258 2.99831ZM5.40758 2.99831C5.35626 2.99908 5.30528 2.98973 5.25757 2.9708C5.20985 2.95187 5.16633 2.92372 5.1295 2.88797C5.09266 2.85222 5.06323 2.80956 5.04289 2.76244C5.02254 2.71531 5.01168 2.66463 5.01091 2.61331C5.01091 2.39747 5.18591 2.22831 5.40758 2.22831C5.62925 2.22831 5.81008 2.40331 5.81008 2.61331C5.80933 2.66514 5.79828 2.7163 5.77757 2.76381C5.75686 2.81133 5.7269 2.85425 5.68944 2.89008C5.65198 2.92591 5.60777 2.95393 5.55938 2.97251C5.51099 2.99109 5.45939 2.99986 5.40758 2.99831ZM8.82591 1.45247L8.97175 1.23081L9.12341 1.01497L9.45008 0.536641C9.46665 0.515948 9.47568 0.490231 9.47568 0.463724C9.47568 0.437217 9.46665 0.4115 9.45008 0.390807L9.41508 0.349974C9.38617 0.331629 9.35133 0.325034 9.31771 0.331541C9.28409 0.338048 9.25423 0.357164 9.23425 0.384974L8.72675 1.11997L8.57508 1.34164C8.07046 1.15636 7.53763 1.05966 7.00008 1.05581C6.46254 1.05966 5.9297 1.15636 5.42508 1.34164L5.27341 1.11997L5.12175 0.904141L4.77175 0.384974C4.75944 0.366928 4.74291 0.352161 4.72359 0.341955C4.70428 0.33175 4.68276 0.326416 4.66091 0.326416C4.63907 0.326416 4.61755 0.33175 4.59824 0.341955C4.57892 0.352161 4.56239 0.366928 4.55008 0.384974C4.53494 0.405169 4.52675 0.429731 4.52675 0.454974C4.52675 0.480217 4.53494 0.504779 4.55008 0.524974L4.87675 1.00914L5.02841 1.22497L5.17425 1.44081C4.04841 1.95414 3.29008 2.92247 3.29008 4.02497H10.7101C10.7101 2.91664 9.95175 1.95414 8.82591 1.44081M3.34258 4.53247H3.28425V10.2141C3.28425 10.6633 3.66341 11.0308 4.13008 11.0308H4.73675C4.71341 11.1008 4.70175 11.1728 4.70175 11.2466V12.88C4.70175 13.3058 5.05758 13.6558 5.50091 13.6558C5.93841 13.6558 6.29425 13.3058 6.29425 12.88V11.2466C6.29629 11.1731 6.28441 11.0999 6.25925 11.0308H7.74091C7.71758 11.1008 7.70591 11.1728 7.70591 11.2466V12.88C7.70591 13.3058 8.06175 13.6558 8.50508 13.6558C8.94258 13.6558 9.29841 13.3058 9.29841 12.88V11.2466C9.29841 11.1689 9.28675 11.0969 9.26341 11.0308H9.87008C10.3367 11.0308 10.7101 10.6633 10.7101 10.2141V4.54997L3.34258 4.53247ZM1.96008 4.53247C1.52258 4.54997 1.16675 4.89997 1.16675 5.32581V8.63914C1.16675 9.06497 1.52258 9.41497 1.96008 9.41497C2.39758 9.41497 2.75925 9.06497 2.75925 8.63914V5.31997C2.75925 4.89414 2.40341 4.54997 1.96008 4.54997M12.0401 4.54997C11.5967 4.54997 11.2409 4.89997 11.2409 5.32581V8.63914C11.2409 9.06497 11.5967 9.41497 12.0401 9.41497C12.4776 9.41497 12.8334 9.06497 12.8334 8.63914V5.31997C12.8334 4.89414 12.4776 4.54997 12.0401 4.54997Z"
												fill="#A4C639" />
										</g>
									</svg>
								</view>
								<view class="_apps _item">
									<svg width="14" height="14" viewBox="0 0 14 14" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<g opacity="0.7">
											<path
												d="M12.2501 1.71497L6.57423 2.54913V6.77247L12.2501 6.7258V1.71497ZM1.70923 7.22747V10.8208L6.01423 11.4158V7.25663L1.70923 7.22747ZM6.52756 7.2858L6.53339 11.48L12.2501 12.285V7.29747L6.52756 7.2858ZM1.70923 3.2083V6.80163L6.01423 6.7783V2.62497L1.70923 3.2083Z"
												fill="#0078D6" />
										</g>
									</svg>
								</view>
							</view>
						</view>
						<view class="cell_box _default">
							<view class="sevae_btn_wrap _no_fixed">
								<view class="sevae_btn">
									<u-button type="secondary" @click="getUrl()"><u-icon name="server-fill" color="#ffffff" size="34"></u-icon>{{$t('LiveSupport')}}</u-button>
								</view>
							</view>
						</view>
				</view>
			</u-popup>
		</match-media>

		
		<!-- 页面宽度低于 800px 时显示 -->
		<match-media :max-width="800" >
			<u-popup v-if="false" v-model="MenuShow" mode="left" z-index="101" width="74%" :closeable="false" @close="PopUpclose">
				<view class="menu_wrap" :class="statusBarHeight == true?'menu_wrap2':''" :style="{paddingTop: showInstall && platform != 8?Navheight + 15 + 'px':''}">
					<view :style="{height: isStatusBarHeight}"></view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('Deposit')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="14" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/Deposit.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<u-cell-item :title="$t('Withdraw')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="15" @click="openType" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/menuIcon/Withdraw.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
					
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title1')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="1" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m2.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<u-cell-item :title="$t('sidebar.title2')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="2" @click="openType" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/menuIcon/m1.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title3')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="3" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m3.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title6')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="6" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m7.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<u-cell-item :title="$t('sidebar.title7')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="7" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m6.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title8')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="8" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m8.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							
							<u-cell-item :title="$t('NEWBonusPageA.BonusSYS')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="16" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/jiangli.png"></u-icon>
								<view slot="right-icon">
									<view class="tasg_icon">
										<span>Hot</span>
										<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
									</view>
								</view>
							</u-cell-item>
							
							<u-cell-item :title="$t('sidebar.title9')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="9" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m9.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<!-- <u-cell-item :title="$t('sidebar.title10')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="10" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m10.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item> -->
						</u-cell-group>
					</view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title11')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="11" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m11.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<!-- #ifdef H5 -->
							<u-cell-item v-if="ceBianInstall" :title="$t('NewlyAdded.Install')" :border-bottom="false" :title-style="titleStype" hover-class="none" index="13" @click="openType" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/menuIcon/mphone.png"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix"></image>
								</view>
							</u-cell-item>
							<!-- #endif -->
							
							<!-- <u-cell-item title="主题" :border-bottom="false" :title-style="titleStype" hover-class="none" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/me/shuazizhong.png"></u-icon>
								<view slot="right-icon">
									<view class="zhuti_qh_btn">
										<view class="yl_icon" :class="[ztidex == indexz?'zt_xz':'']" v-for="(itemz,indexz) in zhuTi" :key="indexz" @click="zt_qh(indexz)">
											<image :src="itemz.icon"></image>
										</view>
									</view>
								</view>
							</u-cell-item> -->
							
						</u-cell-group>

						<!-- #ifdef H5 -->
						<view class="qingchu_hc" @click="openType(99)">
							<view class="view_box1"><image src="/static/image/me/qingchu_hc.png"></image>清除缓存</view>
							<!-- <view class="view_box2">
								<u-loading :show="hcloading" size="28" color="#007aff"></u-loading>
							</view> -->
						</view>
						<!-- #endif -->
					</view>
				</view>
				<view class="sevae_btn_wrap">
					<view class="sevae_btn">
						<u-button type="primary" @click="openType(10)"><u-icon name="server-fill" color="#ffffff" size="34"></u-icon>{{$t('LiveSupport')}}</u-button>
					</view>
				</view>
				<view style="height: 200rpx;"></view>
			</u-popup>
		</match-media>

		<!-- 找回金币操作 -->
		<u-popup v-model="YiJianShow" mode="bottom" length="auto" border-radius="34" :closeable="true">
			<view class="YijianZhaohui_wwrap">
				<image class="jinbifuhao" src="/static/image/currency_coins.png" v-if="platform == 8"></image>
				<image class="jinbifuhao" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
				<image class="jinbifuhao" src="/static/image/jinbi-3.png" v-else></image>
				<view class="myyue">
				<u-count-to ref="shuaxinJinbi" :start-val="0" :end-val="convertToYuan(balance)" :decimals="2" font-size="58" :bold="true"></u-count-to>
				</view>
				<view class="dqye">{{$t('dqye')}}<image class="shuaxin" :class="{'rotate360':showAnimate}" @click="play666()" src="/static/image/shuaxin.png"></image></view>
				<view class="line"></view>
				<view class="zhtishi">
					<!-- <u-icon name="warning-fill" color="#fecf4a" size="28"></u-icon> -->
					<view>{{$t('yjhsBtn')}}</view>
				</view>
				<view class="Register_btn">
					<u-button type="primary" :loading="isDisabledTwo" @click="YiJianShouHui()">{{$t('yjhs')}}</u-button>
				</view>
				<!-- <view class="reg_btn" @click="YiJianShouHui()"><span>一键回收</span></view> -->
			</view>
		</u-popup>
		<regiserPopup ref="regiserShow"></regiserPopup>
		<signInPopup ref="signInShow" :isTabs="istabsType"></signInPopup>
		<LanguagePopup ref="Language"></LanguagePopup>
		<musicPopup ref="OpenMusic"></musicPopup>
		<!--在进入站点全局注册组件，因为先注册了导航栏组件-->
		<Happy-Birthday-Popup ref="OpenBirthdayPopup"></Happy-Birthday-Popup>
		<Congratulations-Popup ref="OpenLeveUp"></Congratulations-Popup>
	</view>
</template>
<script>
	export default {
		name: "navbar",
		props: {
			is_fixeds: {
				type: Boolean,
				default: true
			},
			showInstall: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			//isCountTo: {
			//	type: Boolean,
			//	default: false
			//},
			is_secondary: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				hcloading: true,
				PiaoChangVal: '',
				show3: false,
				
				zhuTi: [{
					id: 0,
					icon: '/static/image/me/yueliang.png'
				},{
					id: 1,
					icon: '/static/image/me/sun_fill.png'
				}],
				ztidex: 0,
				
				isDisabledTwo: false,
				YiJianShow: false,
				
				platform: this.PID,
				istabsType: 1,
				
				LuoDidomain:'',
				TodayHide: false,
				is_deviceType: 0, //1是安卓 0是IOS
				install_popup: false,
				
				Navheight: 59,//122
				yqhaoyoushow: false,
				ceBianInstall: true,
				isStatusBarHeight: '',
				statusBarHeight: false,
				animationData: {},
				isRote: false,
				animation: null,
				isCountTo: false,

				is_logon: 0,
				titleStype: {
					//color: '$font-all-color'
				},
				MenuShow: false,
				showAnimate: false,
				showAnimateMenu: false,
				balance: 0,

				lastMailidMin: 0,
				SystemunreadList: 0,
				PersonalunreadList: 0,
				staticDname: '',
				SelectCurrencyData: {},
				is_SelectCurrencyData: false
			};
		},
		computed: {

		},
		created() {
			let that = this
			
			let systemInfo = uni.getSystemInfoSync();
			//console.log('状态栏的高度：' + systemInfo.statusBarHeight);
			
			that.staticDname = uni.getStorageSync('Musicdomains');
			
			that.lookBenDihb()
			uni.$on('ZhuRulookBenDihb', (val) => {
				that.lookBenDihb()
			})
			
			//#ifdef APP-PLUS
			that.isStatusBarHeight = systemInfo.statusBarHeight + 66 + 'px'
			//#endif
			
			that.LuoDidomain = uni.getStorageSync("LuoDidomain")
			//console.log(systemInfo)
			
			let UnityisApp = uni.getStorageSync("UnityisApp")
			
			
			//判断是否WebApp启动，如果是就个他领取安装奖励
			//#ifdef H5
			if (window.navigator.standalone == true) {
				//alert('IOS-是从桌面中打开的')
				
				//这里也可以知道是从mobileconfig描述文件打开的
				
				that.yqhaoyoushow = false
				that.ceBianInstall = false
				that.statusBarHeight = true
			} else if (window.matchMedia("(display-mode: standalone)").matches) {
				//alert('android-是从桌面中打开的')
				that.yqhaoyoushow = false
				that.ceBianInstall = false
				that.statusBarHeight = true
			} else if(UnityisApp) {
				
				that.yqhaoyoushow = false
				that.ceBianInstall = false
				that.statusBarHeight = true
				
			} else {
				//alert('浏览器里面打开的')
				//就是浏览器里面打开的
				that.statusBarHeight = false
				if(systemInfo.deviceType == "phone") {
					that.installWebapp()
					if(systemInfo.osName == "ios"){
						that.is_deviceType = 0
					} else {
						that.is_deviceType = 1
					}
				}
			}
			//#endif
			
			
			that.inspectToken()

			let isToken = uni.getStorageSync("token")
			if (!isToken) {

			} else {
				that.getMybalance();
			}

			uni.$on('getinspectToken', (val) => {
				that.inspectToken()
			})

			uni.$on('getgetMybalance', (val) => {
				that.play2()
			})
			
			uni.$on('UpdataAddBcbalance', (val) => {
				that.UpdataAddbc(val)
			})

			uni.$on('getMyUnread', (val) => {
				that.getSystemUnread()
				that.getPersonalUnread()
			})
			
			//注入生日奖励控制
			uni.$on('HappyBirthdayShow', (val) => {
				that.openHappyBir(val)
			})
			
			//注入升级奖励控制
			uni.$on('CongratulationsShow', (val) => {
				that.openCongratulations(val)
			})

		},
		mounted() {
			
		},
		beforeDestroy() {
			// let that = this
			// uni.$on('getgetMybalance', (val) => {
			// 	that.play2()
			// })
		},
		beforeUpdate() {
			
		},
		methods: {
			//给当前网址新增一个时间戳参数，重新加载来解决CDN缓存
			updateUrlWithTimestamp() {
			    // 创建一个新的URL对象
				const newUrl = new URL(window.location.href);
			 
			    // 添加时间戳参数
			    newUrl.searchParams.set('timestamp', Date.now());
			 
			    // 使用新的URL替换当前页面的历史记录
			    window.history.replaceState(null, '', newUrl.toString());
				
				location.reload();

				//location.href = location.href;
				
				//location.replace(location.href);
			
			},
			JianCeZhuti(){
				let that = this
				let theme = that.$store.getters.currentTheme;
				if (theme == "whiteTheme") {
					that.ztidex = 1
					console.log('白色主题')
				} else {
					that.ztidex = 0
					console.log('黑色主题')
				}
			},
			zt_qh(index){
				console.log('主题切换',index)
				let that = this
				that.ztidex = index
				if(index == 0){
					that.$store.commit("changeTheme", 'defaultTheme')
				} else {
					that.$store.commit("changeTheme", 'whiteTheme')
				}
			},
			
			lookBenDihb(){
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
			},
			openShuaxinbc(){
				//this.YiJianShow = true
				this.$refs.OpenPopup.openShow()
			},
			UpSelectCurrency(data){
				console.log('选择的货币',data)
				this.SelectCurrencyData = data
				this.is_SelectCurrencyData = true
			},
			openHappyBir(data){
				let that = this
				that.$nextTick(() => {
				    that.$refs.OpenBirthdayPopup.openPopup(data)
				})
			},
			openCongratulations(data){
				let that = this
				that.$nextTick(() => {
				    that.$refs.OpenLeveUp.openPopup(data)
				})
			},
			UpdataAddbc(val){
				//console.log(val)
				//let Bc = (val/100).toFixed(2)
				let that = this
				that.PiaoChangVal = val
				that.show3 = true
				setTimeout(()=>{
					that.show3 = false
				},3000)
				// that.$refs.uTips.show({
				// 	title: '+' + val,
				// 	type: 'success',
				// 	duration: '3000'
				// });
			},
			removeCharLevel(value) {
				return value.replace(new RegExp('https://', 'g'), '');
			},
			
			
			
			
			
			
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log('2',e);
				this.TodayHide = e
			},
			//检测Install弹窗24小时一次
			installWebapp() {
				let nowTime = uni.getStorageSync("popUp-install-time");
				if(!nowTime || new Date().getTime() - nowTime > 1000 * 60 * 60 * 24){
					//console.log('超出24小时了')
					//alert('超出24小时了')
					//uni.setStorageSync("popUp-install-time", new Date().getTime());
					uni.removeStorageSync('popUp-install-time');
					this.yqhaoyoushow = true;
					this.Navheight = 115
				} else {
					//console.log('还没超过24小时了')
					//alert('还没超过24小时了')
					this.yqhaoyoushow = false;
					this.Navheight = 59
				}
			},
			//关闭Install弹出回调
			GuanBiinstall(e) {
				this.yqhaoyoushow = false;
				this.Navheight = 59
				uni.setStorageSync("popUp-install-time",new Date().getTime());
				setTimeout(()=>{
					this.$emit('GuanInstall', 1)
				},200)
			},
			GuanBiinstallPopup(){
				//console.log('关闭了安装app引导弹窗',this.TodayHide)
				if(this.TodayHide == true){
					this.yqhaoyoushow = false;
					this.Navheight = 59
					uni.setStorageSync("popUp-install-time",new Date().getTime());
				} else {
					//this.yqhaoyoushow = false;
					//this.Navheight = 59
				}
			},
			OpenInstallguiin(){
				let that = this
				//that.$refs.openInstallshow.openPopup();
				
				//先复制渠道id安装后获取粘贴板
				let Codeid = 'pid' + uni.getStorageSync('channel_id');
				uni.setClipboardData({
					data: Codeid,
					showToast: false,
					success: function() {}
				});
				
				if(that.is_deviceType == 0){
					//打开URL安装ios描述文件
					let url = uni.getStorageSync('ipaUrl');
					window.open(url,'_self');
				} else {
					//直接下载安卓APK
					let url = uni.getStorageSync('apkUrl');
					window.open(url,'_self');
				}
			},
			
			
			
			
			
			
			
			
			
			TochatUrl(){
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
					// uni.navigateTo({
					// 	url: url_
					// })
					setTimeout(() => {
						window.open(chatUrl, '_blank');
					}, 500)
					// #endif
					
				})
			},
			PopUpclose() {
				this.animation = uni.createAnimation({
					duration: 400
				});
				//设置旋转角度 
				this.animation.rotate(0).step()
				//导出动画
				this.animationData = this.animation.export()
			},
			startAnimation() {
				this.JianCeZhuti()
				//旋转角度 
				let rota = 180;
				//判断是否展开
				if (this.MenuShow) {
					rota = 0;
					//标记未展开
					this.MenuShow = false;
				} else {
					this.MenuShow = true
				}
				
				//创建动画
				this.animation = uni.createAnimation({
					duration: 400
				});
				//设置旋转角度 
				this.animation.rotate(rota).step()
				//导出动画
				this.animationData = this.animation.export()
			},
			getMybalance() {
				let that = this
				that.$u.post('/refresh-balance', {

				}).then(res => {
					that.balance = res.data.balance
					
					that.lookBenDihb();//在转换一下货币
					
				}).catch(err => {
					
				})
			},
			play2() {
				let that = this
				that.showAnimate = true
				that.isCountTo = true
				that.getMybalance()
				setTimeout(() => {
					that.showAnimate = false
					that.isCountTo = false
				}, 1000)
			},
			play666(){
				let that = this
				that.showAnimate = true
				that.isCountTo = true
				that.getMybalance()
				setTimeout(() => {
					that.showAnimate = false
					that.isCountTo = false
					that.$refs.shuaxinJinbi.start();
				}, 1000)
			},
			inspectToken() {
				let token = uni.getStorageSync("token");

				if (!token) {
					this.is_logon = 0
				} else {
					this.is_logon = 1
				}
			},
			OpenMenu() {
				this.MenuShow = false
				//this.MenuShow == false ? this.MenuShow = true : this.MenuShow = false
			},
			regPopupShow() {
				this.MenuShow = false
				this.istabsType = 2
				this.$refs.signInShow.openPopup(2)
			},
			signPopupShow() {
				this.MenuShow = false
				this.istabsType = 1
				this.$refs.signInShow.openPopup(1)
			},
			Tohome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			openType(index) {
				let that = this
				this.MenuShow = false
				if(index == 99){
					that.updateUrlWithTimestamp()
				} else if (index == 1) {
					uni.switchTab({
						url: '/pages/Account/Account'
					})
				} else if (index == 2) {
					uni.switchTab({
						url: '/pages/Bonus/Bonus'
					})
				} else if (index == 8) {
				 	uni.switchTab({
				 		url: '/pages/Referandearn/Referandearn'
				 	})
				 } else if (index == 9) {
				 	uni.navigateTo({
				 		url: '/pages/VipClubsNew/VipClubsNew'
				 	})
				 } else if (index == 13) {
					
					//先复制渠道id安装后获取粘贴板
					let Codeid = 'pid' +  uni.getStorageSync('channel_id');
					uni.setClipboardData({
						data: Codeid,
						showToast: false,
						success: function() {}
					});
					
					if(that.is_deviceType == 0){
						//打开URL安装ios描述文件
						let url = uni.getStorageSync('ipaUrl');
						window.open(url,'_self');
					} else {
						//直接下载安卓APK
						let url = uni.getStorageSync('apkUrl');
						window.open(url,'_self');
					}
					
				} else if (index == 11) {
					this.$refs.Language.openPopup()
				} else if (index == 10) {
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
						// uni.navigateTo({
						// 	url: url_
						// })
						setTimeout(() => {
							window.open(chatUrl, '_blank');
						}, 500)
						// #endif
					})
				} else {

					//如果没登录先登录后在操作
					let token = uni.getStorageSync("token");
					if (!token) {
						this.$refs.signInShow.openPopup()
					} else {
						setTimeout(() => {
							if (index == 3) {
								this.$refs.OpenMusic.openPopup()
							} else if (index == 6) {
								uni.navigateTo({
									url: '/pages/myfavoriteList/myfavoriteList'
								})
							} else if (index == 7) {
								uni.navigateTo({
									url: '/pages/MyhistoryList/MyhistoryList'
								})
							} else if (index == 14) {
								this.ToWallet(0)
							} else if (index == 15) {
								this.ToWallet(1)
							} else if (index == 16) {
								uni.navigateTo({
									url: '/pages/Bonus-Logoin/Bonus-Logoin'
								})
							}
							
						}, 100)
					}

				}
			},
			ToWallet(type) {
				let that = this
				if (type == 0) {
					//uni.setStorageSync("makeMoneyTypes", 1);
					uni.switchTab({
						url: '/pages/Wallet/Wallet'
					});
				} else {
					//账号为空直接跳转到添加账号页面
					//that.$u.post('/withdraw/bind/query', {}).then(res => {
					//	let list = res.data
					//	if(list.length == 0){
					//		uni.navigateTo({
					//			url: '/pages/ManageAccount/ManageAccount'
					//		})
					//	} else {
							//uni.setStorageSync("makeMoneyTypes", 2);
							uni.navigateTo({
								url: '/pages/Withdrawals/Withdrawals'
							});
					//	}
					//})
				}
			},
			BlackPage() {
				//uni.navigateBack()
				let canNavBack = getCurrentPages()
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack()
				} else {
					history.back();
				}
			},
			ToNotification() {
				let isOpen = uni.getStorageSync("NotisOpen")
				if (isOpen == 1) {
					//console.log('已经打开通知页面了')
				} else {
					uni.setStorageSync("NotisOpen", 1)
					uni.navigateTo({
						url: '/pages/Notification/Notification'
					})
				}
			},
			// 定义一个函数用于进行单位转换
			convertToYuan(amount) {
				return (amount / 100).toFixed(2);
			},
			JiSuanHuiLv(data){
				//金额显示 = 游戏币×汇率
				let yue = (this.balance / 100)
				let price = (yue / data.currency_rate).toFixed(2);
				return price
			},
			Towallet() {
				uni.switchTab({
					url: '/pages/Wallet/Wallet'
				})
			},
			YiJianShouHuis(){
				let that = this
				that.YiJianShow = true
			},
			YiJianShouHui(){
				let that = this
				that.isDisabledTwo = true
				setTimeout(()=>{
					this.$u.post('/transfer-out-balance', {
					
					}).then(res => {
						that.getMybalance()
						setTimeout(() => {
							that.$refs.shuaxinJinbi.start();
						}, 1000);
						that.isDisabledTwo = false
					}).catch(err => {
						that.isDisabledTwo = false
					})
				},500)
			},
			
			Tosearch() {
				uni.navigateTo({
					url: '/pages/searchFor/searchFor'
				})
			},
			getSystemUnread() {
				let that = this
				that.$u.post('/query-mail', {
					type: 1,
					lastMailId: that.lastMailidMin
				}).then(ress => {
					let unread = [];
					ress.data.forEach((item, index) => {
						if (item.status == 0) {
							unread.push(item)
						}
					});
					that.SystemunreadList = unread.length
				});
			},
			getPersonalUnread() {
				let that = this
				that.$u.post('/query-mail', {
					type: 2,
					lastMailId: that.lastMailidMin
				}).then(ress => {
					let unread = [];
					ress.data.forEach((item, index) => {
						if (item.status == 0) {
							unread.push(item)
						}
					});
					that.PersonalunreadList = unread.length
				})
			},

		}
	}
</script>
<style lang="scss" scoped>
	.qingchu_hc {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 15px;
		color: $font-all-color;
		text-decoration: underline;
		.view_box1 {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}
		}
		.view_box2 {
			margin-left: 10rpx;
			display: flex;
			align-items: center;
		}
	}
	
	.LiShiJiLu_box {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 22px;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 999999999;
		text-align: right;
		padding-right: 32px;
	}
	
	.zhuti_qh_btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $ztqh-bg-color;
		border-radius: 12rpx;
		padding: 8rpx;
		position: absolute;
		top: 3px;
		right: 12px;
		.yl_icon {
			cursor: pointer;
			border-radius: 12rpx;
			width: 50rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 36rpx;
				height: 36rpx;
			}
		}
		.zt_xz {
			background-color: $ztqh-xz-color !important;
		}
	}
	
	/deep/ .u-navbar-fixed {
		background-color: $navbar-bg-color !important;
	}
	
	.YijianZhaohui_wwrap {
		position: relative;
		padding: 30rpx;
		background-color: $pupUp-bg-color;
		text-align: center;
		color: $font-all-color;
		.jinbifuhao {
			width: 98rpx;
			height: 98rpx;
			margin: 20rpx 0 30rpx 0;
		}
		.myyue {
			font-size: 58rpx;
			font-weight: bold;
			color: $all-secondary-text-color;
		}
		.dqye {
			margin: 10rpx 0 0 0;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 28rpx;
				height: 28rpx;
				margin-left: 10rpx;
				cursor: pointer;
			}
		}
		.zhtishi {
			padding: 0 20rpx;
			margin-bottom: 30rpx;
			font-size: 24rpx;
			color: #55657e;
			display: flex;
			align-items: center;
			justify-content: center;
			.u-icon {
				margin-right: 10rpx;
			}
		}
		.line {
		    background: linear-gradient(90deg, #ffffff00 -3%, #ffffff26 48.66%, #ffffff00 103.12%);
		    height: 1px;
		    margin: 30rpx 0;
		    width: 100%;
		}
	}
	
	/deep/ .u-drawer {
		max-width: 100%;
	}
	
	/deep/ .u-slot-content {
		display: inline-block !important;
	}
	
	image {
		vertical-align: bottom;
	}
	
	.tasg_icon {
		display: flex;
		align-items: center;
		margin-left: auto;
		span {
			display: inline-block;
			width: auto;
			padding: 4rpx 10rpx;
			border-radius: 200rpx;
			background: linear-gradient(1turn, #ED8E00 .8%, #ED8E00);
			box-shadow: 0 0 20px #ed8e00a6;
			margin-right: 16rpx;
			color: #fff;
			font-size: 20rpx;
		}
	}
	
	.CbianKfu {
		color: $font-all-color;
		position: fixed;
		top: 50%;
		right: 0;
		transform: translate(0%, -50%);
		z-index: 9999;
		
		writing-mode: vertical-rl;
		//transform: rotate(180deg);
		background-color: $all-secondary-color;
		width: 70rpx;
		line-height: 70rpx;
		padding: 20rpx 0;
		border-radius: 10rpx 0 0 10rpx;
	}

	.menu_wrap2 {
		//padding: 270rpx 30rpx 30rpx 30rpx !important;
		padding: 150rpx 30rpx 30rpx 30rpx !important;
	}

	.menu_wrap {
		/* #ifdef H5 */
		padding: 150rpx 30rpx 30rpx 30rpx;
		/* #endif */

		/* #ifdef APP-PLUS */
		padding-top: 20rpx !important;
		padding-right: 30rpx !important;
		padding-bottom: 30rpx !important;
		padding-left: 30rpx !important;
		/* #endif */

		.cell_box {
			margin-bottom: 30rpx;

			.arrow_right {
				width: 12px;
				height: 12px;
				transform: rotate(180deg);
			}

			///deep/ .u-cell-item-box {
			//	border-radius: 14rpx;
			//	background-color: $all-secondary-color !important;
			//}

			///deep/ .u-cell {
			//	background-color: transparent !important;
			//	padding: 8px 16px !important;
			//}

			///deep/ .u-cell_title {
			//	padding-left: 34rpx;
			//	font-weight: bold;
			//}
		}
	}

	.logo_and_right {
		width: 100%;
		padding: 24rpx 12rpx 22rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left_logo_dayTwo {
			display: flex;
			align-items: center;

			.menu {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
			}

			.nav_title {
				color: #FEFEFE;
				//font-weight: bold;
				font-size: 30rpx;
			}

			.menu2 {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
			}

			.logo {
				width: 234rpx;
				height: 60rpx;
			}
		}

		.left_logo {
			display: flex;
			align-items: center;
			width: 140px;

			.menu {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
			}

			.menu2 {
				width: 45.14rpx;
				height: 45.14rpx;
				margin-right: 10rpx;
			}

			.logo {
				width: 100%;
				height: 100rpx;
			}
		}

		.right_box {
			display: flex;
			align-items: center;

			.SignIn_Regiser {
				display: flex;
				align-items: center;
				color: #fff;
				//font-weight: bold;
				font-size: 26rpx;
				position: relative;

				.SigninBtn {
					position: relative;
					margin-left: 20rpx;
					span {
						font-weight: bold;
						word-break:break-all;
						display:-webkit-box;
						-webkit-line-clamp:1;
						-webkit-box-orient:vertical;
						overflow:hidden;
						background-color: #3673D9;
						background: linear-gradient(1turn,#0c5eff .8%,#1398f9);
						box-shadow: 0 3px 28px #2283f666,inset 0 3px 3px #ffffff4d;
						border-radius: 6px;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
						transition: transform .1s ease-in-out;
					}
				}
				.SigninBtn:after {
					padding: 0 24rpx;
					border-radius: 6px;
					height: 60rpx;
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
				.zhuceBtn {
					position: relative;
					margin-left: 20rpx;
					span {
						font-weight: bold;
						word-break:break-all;
						display:-webkit-box;
						-webkit-line-clamp:1;
						-webkit-box-orient:vertical;
						overflow:hidden;
						//background: linear-gradient(1turn,#FF9619 .8%,#FFB930);
						//box-shadow: 0 3px 16px #6f3f06,inset 0 4px 3px #ffffff4d;
						background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
						box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
						border-radius: 6px;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
						transition: transform .1s ease-in-out;
					}
				}
				.zhuceBtn:after {
					padding: 0 24rpx;
					border-radius: 6px;
					height: 60rpx;
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
			}
			
			.xsTask {
				position: relative;
				//left: -10rpx;
				margin: 0 4rpx 0 12rpx;
			}
			
			.xsTask2 {
				position: relative;
				//left: -10rpx;
				margin: 0 10rpx 0 20rpx;
			}

			.tongzhi {
				height: 31px;
				width: 31px;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				span {
					display: inline-block;
					width: 26rpx;
					height: 26rpx;
					//background: linear-gradient(1turn, #1bb83d .8%, #1bb83d);
					//box-shadow: 0 3px 16px #005413, inset 0 4px 3px #ffffff4d;
					
					background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
					box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
					
					border-radius: 100px;
					position: absolute;
					top: 0;
					right: 0;
					text-align: center;
					line-height: 26rpx;
					color: #FEFEFE;
					font-size: 18rpx;
					z-index: 2;
					padding: 1px 1px;

				}

				image {
					position: relative;
					top: -0rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}

			.my_Wallet {
				position: relative;
				display: flex;
				align-items: center;
				background-color: $wallet-bg-color;
				border: 1px solid $wallet-border;
				border-radius: 10px;
				margin-right: 5rpx;
				//box-shadow: 0 0 20px rgba(23, 23, 25, 0.38);
				height: 38px;
				.mayjine {
					padding: 0 10rpx 0 20rpx;
					display: flex;
					align-items: center;
					position: relative;

					.shuaxin {
						width: 26.39rpx;
						height: 26.39rpx;
						margin-right: 0;
						position: relative;
						top: 1rpx;
					}

					.yue {
						font-size: 28rpx;
						color: $wallet-myedu;
						margin-right: 10rpx;
						display: flex;
						align-items: center;
						position: relative;
						
						.arrow-down {
							margin-left: 14rpx;
						}
						
						.myedu {
							//text-decoration: underline;
							font-weight: bold;
						}

						span {
							margin-right: 6rpx;
						}

						view {
							//font-weight: bold;
							font-size: 28rpx;
						}
					}
				}

				// .wallet_icon {
				// 	width: 80rpx;
				// 	height: 70rpx;
				// 	line-height: 70rpx;
				// 	display: flex;
				// 	align-items: center;
				// 	justify-content: center;
				// 	//background-image: linear-gradient(to right, #548dff, #0c5eff);
				// 	background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
				// 	box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
				// 	border-radius: 10px;

				// 	image {
				// 		width: 29.86rpx;
				// 		height: 27.08rpx;
				// 	}
				// }
				
				.wallet_icon {
					position: relative;
					view {
						// word-break:break-all;
						// display:-webkit-box;
						// -webkit-line-clamp:1;
						// -webkit-box-orient:vertical;
						display: flex;
						align-items: center;
						justify-content: center;
						overflow:hidden;
						background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
						//box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
						border-radius: 10px;
						height: 34px;
						text-align: center;
						padding: 0 12px;
						position: relative;
						z-index: 2;
						top: -2px;
						image {
							width: 29.86rpx;
							height: 27.08rpx;
						}
					}
				}
				.wallet_icon:after {
					border-radius: 10px;
					height: 34px;
					background-color: #61001d;
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
	}
	
	
	
	
	
	
	
	
	
	.sevae_btn_wrap {
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: $pupUp-bg-color;
		padding: 20rpx 20rpx 30rpx 20rpx;
		.sevae_btn {
			width: 98%;
			margin: 0 auto;
			/deep/ .u-icon {
				margin-right: 10rpx;
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	.Register_btn {
		width: 95%;
		margin: 0 auto 20rpx;
	}
	.reg_btn {
		cursor: pointer;
		position: relative;
		width: 95%;
		margin: 0 auto 20rpx;
		span {
			width: 100%;
			color: $all-secondary-text-color;
			display: inline-block;
			background-color: #2c62f4;
			background: linear-gradient(1turn, #2c62f4 .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			border-radius: 10px;
			height: 80rpx;
			line-height: 80rpx;
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
	
	.reg_btn:after {
		width: 100%;
		border-radius: 10px;
		height: 80rpx;
		background-color: #003293;
		bottom: -3px;
		content: "";
		display: block;
		left: 0;
		margin: 0 auto;
		pointer-events: none;
		position: absolute;
		right: 0;
		z-index: 1;
	}
</style>