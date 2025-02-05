<template>
	<view :style="theme" v-if="show" class="u-tabbar" @touchmove.stop.prevent="() => {}">
		<!--Qiaozhi Tabbar-->
		<view class="qiaozhi-tabbar">
			<view v-if="show" class="u-tabbar__content qiaozhi" :style="{ height: $u.addUnit(height) }" :class="{ 'u-border-top': borderTop }">					
			<view class="u-tabbar__content__item" v-for="(item, index) in list" :key="index" :class="{ 'u-tabbar__content__circle': midButton && item.midButton, 'mid-button': index === null, 'current-item': activeIndex === index }" @tap.stop="clickHandler(index)">
					<view @click="QiaozhiHandleClick(index)" :animation="disableAnimation ? null : animationData" class="q-u-tabbar-wrapper">
						<view class="u-tabbar__content__item__topBian" :class="{ 'active': (activeIndex === index) && !(index === 0 && (!QiaozhiPopUp && !MenuShow) || index === 1 && (!QiaozhiPopUp && !MenuShow) || index === 2 && (!QiaozhiPopUp && !MenuShow)) }"  :style="{background: BianelColor(index),display: BianelColor(index).includes('linear-gradient') ? 'none' : 'none' }">
						</view>
						<view :class="[midButton && item.midButton ? 'u-tabbar__content__circle__button' : 'u-tabbar__content__item__button',]">
							<u-icon class="aotu_icon" :name="IconPath(index)" img-mode="scaleToFill" :color="elColor(index)" :custom-prefix="item.customIcon ? 'custom-icon' : 'uicon'"></u-icon>
							<u-badge :count="item.count" :is-dot="item.isDot" v-if="item.count || item.isDot" :offset="[-2, getOffsetRight(item.count, item.isDot)]"></u-badge>
						</view>
						<view class="u-tabbar__content__item__text" :style="{color: QiaozhiGetTextColor(index)}">
							<text class="u-line-1" v-if="index === 0">{{ $t('Qiaozhi.Browse') }}</text>
							<text class="u-line-1" v-if="index === 1">{{ $t('Qiaozhi.Contests') }}</text>
							<text class="u-line-1" v-if="index === 2">{{ $t('Qiaozhi.Chat') }}</text>
							<text class="u-line-1" v-if="index === 3">{{ $t('Qiaozhi.Casino') }}</text>
						</view>
					</view>
				</view>
				<view v-if="midButton" class="u-tabbar__content__circle__border"
					:class="{ 'u-border': borderTop, 'tuqidhua': Dangidx === 2 }"
					:style="{ background: Dangidx === 2 ? '#007aff' : bgColor, left: midButtonLeft }"></view>
			</view>
		</view>

		<!--Qiaozhi Uni Popup Module-->
		<view class="q-tabbar-view">
			<u-popup v-model="QiaozhiPopUp" mode="center" z-index="101" width="80%" :closeable="false"
				@close="QiaozhiPopUpclose">
				<view>
		          <!-- Qiaozhi Component -->
				  <component :is="QiaozhiComponent"></component>
				</view>
			</u-popup>
		</view>

		<!--Qiaozhi Mobile Menu [Browse Tab]-->
		<!-- Qiaozhi Mobile Menu-->
		<match-media :max-width="800">
			<u-popup v-model="MenuShow" mode="left" z-index="101" width="74%" :closeable="false" @close="PopUpclose">
				<view class="menu_wrap" :class="statusBarHeight == true?'menu_wrap2':''"
					:style="{paddingTop: showInstall && platform != 8?Navheight + 15 + 'px':''}">
					<view :style="{height: isStatusBarHeight}"></view>
					<view class="souso_cion" @click="Tosearch()"><u-icon name="search" color="#3c485c"
							size="38"></u-icon>{{$t('Qiaozhi.Search')}}</view>
					<view class="cell_box_title">{{$t('Qiaozhi.Betting')}}</view>
					<view class="cell_box">
						<u-cell-group :border="false">
							<u-cell-item class="active" :title="$t('Qiaozhi.Casino')" :border-bottom="false"
								:title-style="titleStype" hover-class="cell-hover-class" index="99" @click="openType"
								:arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/casino.webp"></u-icon>
								<view slot="right-icon">
									<image class="arrow_right" src="/static/image/arrow_right_icon.png" mode="widthFix">
									</image>
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
								:title-style="titleStype" hover-class="active" index="15" @click="openType"
								:arrow="false">
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
							<u-cell-item :title="$t('sidebar.title3')" :border-bottom="false" :title-style="titleStype"
								hover-class="cell-hover-class" index="3" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m3.png"></u-icon>
							</u-cell-item>
						</u-cell-group>
					</view>

					<view class="cell_box" :style="{display:'none'}">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title6')" :border-bottom="false" :title-style="titleStype"
								hover-class="cell-hover-class" index="6" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m7.png"></u-icon>
							</u-cell-item>
							<u-cell-item :title="$t('sidebar.title7')" :border-bottom="false" :title-style="titleStype"
								hover-class="cell-hover-class" index="7" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m6.png"></u-icon>
							</u-cell-item>
						</u-cell-group>
					</view>

					<view class="cell_box_title">{{$t('Qiaozhi.General')}}</view>
					<view class="cell_box _default">
						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title2')" :border-bottom="false" :title-style="titleStype"
								hover-class="cell-hover-class" index="2" @click="openType" :arrow="false">
								<u-icon slot="icon" size="26" name="/static/image/menuIcon/m1.png"></u-icon>
							</u-cell-item>
							<u-cell-item :title="$t('sidebar.title8')" :border-bottom="false" :title-style="titleStype"
								hover-class="cell-hover-class" index="8" @click="openType" :arrow="false">
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
							<u-cell-item :border-bottom="false" :title-style="titleStype" hover-class="cell-hover-class"
								index="9" @click="openType" :arrow="false">
								<u-icon slot="icon" size="28" name="/static/image/menuIcon/m9.png"></u-icon>
								<template slot="title">
									<span class="slug">{{$t('Qiaozhi.VIP')}}</span>{{$t('Qiaozhi.Club')}}
								</template>
							</u-cell-item>
						</u-cell-group>

						<u-cell-group :border="false">
							<u-cell-item :title="$t('sidebar.title11')" :border-bottom="false" :title-style="titleStype"
								hover-class="cell-hover-class" index="11" @click="openType" :arrow="false">
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
												<path
													d="M8.89577 2.02413C9.14079 1.74356 9.32735 1.41691 9.44454 1.06333C9.56174 0.709749 9.6072 0.336338 9.57827 -0.0350342C8.83276 0.0317759 8.14146 0.382646 7.64744 0.944966C7.41108 1.21698 7.23194 1.53382 7.12069 1.87658C7.00945 2.21934 6.96838 2.58099 6.99994 2.93997C7.36561 2.94657 7.72771 2.86712 8.05703 2.70804C8.38634 2.54895 8.67365 2.31468 8.89577 2.02413ZM10.5233 6.82497C10.5271 6.33062 10.6565 5.84535 10.8994 5.41475C11.1422 4.98414 11.4905 4.62233 11.9116 4.3633C11.6435 3.98296 11.2916 3.66939 10.8829 3.44686C10.4742 3.22432 10.0199 3.09879 9.55494 3.07997C8.54577 2.97497 7.61827 3.6633 7.08161 3.6633C6.55077 3.6633 5.79827 3.09163 4.95827 3.1033C4.4092 3.11897 3.87376 3.27795 3.40511 3.56447C2.93645 3.85098 2.55086 4.25507 2.28661 4.73663C1.14911 6.7083 1.99494 9.63663 3.13244 11.235C3.64577 12.0166 4.29327 12.8975 5.14494 12.8683C5.99661 12.8391 6.27077 12.3375 7.25661 12.3375C8.24244 12.3375 8.54577 12.8625 9.38577 12.845C10.2258 12.8275 10.8149 12.0458 11.3574 11.27C11.7442 10.7008 12.045 10.0777 12.2499 9.4208C11.7408 9.20132 11.3065 8.83851 11 8.37658C10.6934 7.91464 10.5278 7.37352 10.5233 6.81913"
													fill="white" />
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
								<u-button type="secondary" @click="getUrl()"><u-icon name="server-fill" color="#ffffff"
										size="34"></u-icon>{{$t('LiveSupport')}}</u-button>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</match-media>

		<!--safe-area-inset-bottom 底部安全区域-->
		<view v-if="false" class="u-tabbar__content " :style="{ height: $u.addUnit(height) }"
			:class="{ 'u-border-top': borderTop }"><!-- , backgroundColor: bgColor, -->
			<view class="u-tabbar__content__item" v-for="(item, index) in list" :key="index"
				:class="{ 'u-tabbar__content__circle': midButton && item.midButton,'dise': index == 2 }"
				@tap.stop="clickHandler(index)"><!-- :style="{ backgroundColor: bgColor }"-->
				<view v-if="index != 2" class="u-tabbar__content__item__topBian" :style="{background: BianelColor(index)}"></view>
				<!--<view class="u-tabbar__content__item__bottomBian" :style="{boxShadow: BianelBottomColor(index)}"></view>-->
				<view
					:class="[midButton && item.midButton ? 'u-tabbar__content__circle__button' : 'u-tabbar__content__item__button']">
					<u-icon class="aotu_icon" :name="elIconPath(index)" img-mode="scaleToFill" :color="elColor(index)"
						:custom-prefix="item.customIcon ? 'custom-icon' : 'uicon'"></u-icon>
					<u-badge :count="item.count" :is-dot="item.isDot" v-if="item.count || item.isDot"
						:offset="[-2, getOffsetRight(item.count, item.isDot)]"></u-badge>
				</view>
				<view class="u-tabbar__content__item__text" :style="{color: elColor(index)}">
					<text class="u-line-1" v-if="index==0">{{$t('tabBar.home')}}</text>
					<text class="u-line-1" v-if="index==1">{{$t('Promotions')}}</text>
					<text class="u-line-1" v-if="index==2">{{$t('tabBar.wallet')}}</text>
					<text class="u-line-1" v-if="index==3">{{$t('NewlyAdded.Referral')}}</text>
					<text class="u-line-1" v-if="index==4">{{$t('tabBar.profile')}}</text>
				</view>
			</view>
			<view v-if="midButton" class="u-tabbar__content__circle__border"
				:class="[{'u-border': borderTop,},Dangidx == 2?'tuqidhua':'']"
				:style="{background: Dangidx == 222222?'#007aff':bgColor, left: midButtonLeft}"></view>
		</view>
		<!-- 这里加上一个48rpx的高度,是为了增高有凸起按钮时的防塌陷高度(也即按钮凸出来部分的高度)
		<view class="u-fixed-placeholder safe-area-inset-bottom" :style="{ height: `calc(${$u.addUnit(height)} + ${midButton ? 48 : 0}rpx)`, }"></view> -->
	</view>
</template>

<script>
import ContestMobile from "@/components/ContestsMobile/ContestMobile.vue";
import ChatMobile from "@/components/ChatMobile/ChatMobile.vue";
	export default {
		components: {
			ContestMobile,
			ChatMobile,
		    },
		props: {
			// 显示与否
			show: {
				type: Boolean,
				default: true
			},
			// 通过v-model绑定current值
			value: {
				type: [String, Number],
				default: 0
			},
			// 整个tabbar的背景颜色
			bgColor: {
				type: String,
				default: 'transparent'
			},
			// tabbar的高度，默认50px，单位任意，如果为数值，则为rpx单位
			height: {
				type: [String, Number],
				default: '58px'
			},
			// 非凸起图标的大小，单位任意，数值默认rpx
			iconSize: {
				type: [String, Number],
				default: 30
			},
			// 凸起的图标的大小，单位任意，数值默认rpx
			midButtonSize: {
				type: [String, Number],
				default: 30
			},
			// 激活时的演示，包括字体图标，提示文字等的演示
			activeColor: {
				type: String,
				default: '#ffffff'
			},
			// 未激活时的颜色
			inactiveColor: {
				type: String,
				default: '#A7B5CA'
			},
			// 是否显示中部的凸起按钮
			midButton: {
				type: Boolean,
				default: true
			},
			// 配置参数
			/*list: {
				type: Array,
				default () {
					return [{
						pagePath: "/pages/index/index",
						iconPath: "/static/tabbar/tabbar1.png",
						selectedIconPath: "/static/tabbar/tabbar11.png",
						text: this.$t('tabBar.home')
					}, {
						pagePath: "/pages/Bonus/Bonus",
						iconPath: "/static/tabbar/tabbar2.png",
						selectedIconPath: "/static/tabbar/tabbar22.png",
						text: this.$t('Promotions')
					}, {
						pagePath: "/pages/Wallet/Wallet",
						iconPath: "/static/tabbar/qianbao.gif",
						selectedIconPath: "/static/tabbar/qianbao.gif",
						text: this.$t('tabBar.wallet'),
						midButton: true
					}, {
						pagePath: "/pages/Referandearn/Referandearn",
						iconPath: "/static/tabbar/tabbar5.png",
						selectedIconPath: "/static/tabbar/tabbar55.png",
						text: this.$t('tabBar.bonus')
					}, {
						pagePath: "/pages/Account/Account",
						iconPath: "/static/tabbar/tabbar4.png",
						selectedIconPath: "/static/tabbar/tabbar44.png",
						text: this.$t('tabBar.profile')
					}]
				}
			},*/

			// Qiaozhi List
			list: {
				type: Array,
				default () {
					return [{
						//pagePath: "/pages/Account/Account",
                        iconPath: "/static/tabbar/qiaozhi/browse.png",
                        selectedIconPath: "/static/tabbar/qiaozhi/browse-white.png",
                        text: this.$t('Qiaozhi.Browse'),
					}, {
						//pagePath: "/pages/searchFor/searchFor",
						iconPath: "/static/tabbar/qiaozhi/contests.png",
						selectedIconPath: "/static/tabbar/qiaozhi/contests-white.png",
						text: this.$t('Qiaozhi.Contests')
					},					{
						//pagePath: "/pages/searchFor/searchFor",
						iconPath: "/static/tabbar/qiaozhi/chat.png",
						selectedIconPath: "/static/tabbar/qiaozhi/chat-white.png",
						text: this.$t('Qiaozhi.Chat'),
					},
					{
						pagePath: "/pages/index/index",
						iconPath: "/static/tabbar/qiaozhi/casino.png",
						selectedIconPath: "/static/tabbar/qiaozhi/casino-white.png",
						text: this.$t('Qiaozhi.Casino')
					},]
				}
			},
			// 切换前的回调
			beforeSwitch: {
				type: Function,
				default: null
			},
			// 是否显示顶部的横线
			borderTop: {
				type: Boolean,
				default: false
			},
			// 是否隐藏原生tabbar
			hideTabBar: {
				type: Boolean,
				default: true
			},
			// Qiaozhi Modification
			showInstall: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				// 由于安卓太菜了，通过css居中凸起按钮的外层元素有误差，故通过js计算将其居中
				midButtonLeft: '50%',
				pageUrl: '', // 当前页面URL
				Dangidx: 0,
				// Qiaozhi Modification
				MenuShow: false,		
				animationData: {},
				animation: null,
				disableAnimation: true,
				titleStype: {
				  //color: '$font-all-color'
				},
				isStatusBarHeight: '',
				statusBarHeight: false,
				QiaozhiPopUp: false,
				activeIndex: false,
				QiaozhiComponent: null,
				Component1: "ContestMobile",
				Component2: "ChatMobile",
			}
		},
		created() {
			// 是否隐藏原生tabbar
			if (this.hideTabBar) uni.hideTabBar();
			// 获取引入了u-tabbar页面的路由地址，该地址没有路径前面的"/"
			let pages = getCurrentPages();
			// 页面栈中的最后一个即为项为当前页面，route属性为页面路径
			this.pageUrl = pages[pages.length - 1].route;
			if(this.pageUrl == 'pages/Wallet/Wallet'){
				this.Dangidx = 2
				////console.log('广告',this.Dangidx)
			}
		},
		watch: {
			
		},
		computed: {
			elIconPath() {
				return (index) => {
					// 历遍u-tabbar的每一项item时，判断是否传入了pagePath参数，如果传入了
					// 和data中的pageUrl参数对比，如果相等，即可判断当前的item对应当前的tabbar页面，设置高亮图标
					// 采用这个方法，可以无需使用v-model绑定的value值
					let pagePath = this.list[index].pagePath;
					// 如果定义了pagePath属性，意味着使用系统自带tabbar方案，否则使用一个页面用几个组件模拟tabbar页面的方案
					// 这两个方案对处理tabbar item的激活与否方式不一样
					if (pagePath) {
						if (pagePath == this.pageUrl || pagePath == '/' + this.pageUrl) {
							return this.list[index].selectedIconPath;
						} else {
							return this.list[index].iconPath;
						}
					} else {
						// 普通方案中，索引等于v-model值时，即为激活项
						return index == this.value ? this.list[index].selectedIconPath : this.list[index].iconPath
					}
				}
			},
			elColor() {
				return (index) => {
					// 判断方法同理于elIconPath
					let pagePath = this.list[index].pagePath;
					if (pagePath) {
						if (pagePath == this.pageUrl || pagePath == '/' + this.pageUrl) return this.activeColor;
						else return this.inactiveColor;
					} else {
						return index == this.value ? this.activeColor : this.inactiveColor;
					}
				}
			},
			BianelColor() {
				return (index) => {
					// 判断方法同理于elIconPath
					let pagePath = this.list[index].pagePath;
					if (pagePath) {
						if (pagePath == this.pageUrl || pagePath == '/' + this.pageUrl) return '-webkit-linear-gradient(left, rgba(237, 29, 73, 0) 0%, #ed1d49 48%, rgba(237, 29, 73, 0) 100%)';
						else return '$all-secondary-color';
					} else {
						return index == this.value ? '#3673D9' : '$all-secondary-color';
					}
				}
			},
			BianelBottomColor() {
				return (index) => {
					// 判断方法同理于elIconPath
					let pagePath = this.list[index].pagePath;
					if (pagePath) {
						if (pagePath == this.pageUrl || pagePath == '/' + this.pageUrl) return '0 -10px 20px rgba(0, 122, 255, 0.65)';
						else return '';
					} else {
						//return index == this.value ? '#3673D9' : '$all-secondary-color';
					}
				}
			}
		},
		mounted() {
			this.midButton && this.getMidButtonLeft();
		},
		methods: {
			async clickHandler(index) {
				let that = this
				if (this.beforeSwitch && typeof(this.beforeSwitch) === 'function') {
					// 执行回调，同时传入索引当作参数
					// 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
					// 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
					let beforeSwitch = this.beforeSwitch.bind(this.$u.$parent.call(this))(index);
					// 判断是否返回了promise
					if (!!beforeSwitch && typeof beforeSwitch.then === 'function') {
						await beforeSwitch.then(res => {
							// promise返回成功，
							this.switchTab(index);
						}).catch(err => {

						})
					} else if (beforeSwitch === true) {
						// 如果返回true
						this.switchTab(index);
					}
				} else {
					this.switchTab(index);
				}
			},
			// 切换tab
			switchTab(index) {
				// 发出事件和修改v-model绑定的值
				this.$emit('change', index);
				// 如果有配置pagePath属性，使用uni.switchTab进行跳转
				if (this.list[index].pagePath) {
					uni.switchTab({
						url: this.list[index].pagePath
					})
				} else {
					// 如果配置了papgePath属性，将不会双向绑定v-model传入的value值
					// 因为这个模式下，不再需要v-model绑定的value值了，而是通过getCurrentPages()适配
					this.$emit('input', index);
				}
			},
			// 计算角标的right值
			getOffsetRight(count, isDot) {
				// 点类型，count大于9(两位数)，分别设置不同的right值，避免位置太挤
				if (isDot) {
					return -20;
				} else if (count > 9) {
					return -40;
				} else {
					return -30;
				}
			},
			// 获取凸起按钮外层元素的left值，让其水平居中
			getMidButtonLeft() {
				let windowWidth = this.$u.sys().windowWidth;
				// 由于安卓中css计算left: 50%的结果不准确，故用js计算
				//this.midButtonLeft = (windowWidth / 2) + 'px';
			},
			// Qiaozhi Open Left Window Menu Implementation
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
			PopUpclose() {
				this.animation = uni.createAnimation({
					duration: 400
				});
				//设置旋转角度 
				this.animation.rotate(0).step()
				//导出动画
				this.animationData = this.animation.export()
			},
			// Qiaozhi Propagate Menu Animation
			startAnimation(index) {
				if (index === 0) {
					this.JianCeZhuti();
					//旋转角度
					let rota = 180;
					//判断是否展开
					if (this.MenuShow) {
					  rota = 0;
					  //标记未展开
					  this.MenuShow = false;
					} else {
					  this.MenuShow = true;
					}
					//创建动画
					this.animation = uni.createAnimation({
					  duration: 400
					});
					//设置旋转角度
					this.animation.rotate(rota).step();
					//导出动画
					this.animationData = this.animation.export();
				}
			},
				// Qiaozhi: Handle Popups
				QiaozhiHandleClick(index) {
				if (this.activeIndex === index) {
                if (index === 0) {
                this.startAnimation(index);
                } else if (index !== 3 && !this.QiaozhiPopUp) {
                 this.QiaozhiPopUpShow();
                }
                return;
                }

				// Qiaozhi Load Components Dinamically
				if (index === 1) {
                  this.Component = 'ContestMobile';
                  this.QiaozhiComponent = this.Component1;
                } else if (index === 2) {
                  this.Component = 'ChatMobile';
                  this.QiaozhiComponent = this.Component2;
                 }
                console.log('Popup Component:', this.Component);

				this.activeIndex = index; 

				// Switch Tabs
				if (this.MenuShow) {
				  this.PopUpclose();
				  this.MenuShow = false;
				  console.log('Qiaozhi Mobile Menu Close');
				}

				// Close Popup While Switching
				this.QiaozhiPopUpclose();

				// Perform Actions Based On Item
				if (index === 0) {
				    this.startAnimation(index);
				} else if (index === 1 || index === 2) {
				    this.QiaozhiPopUpShow();
				}	
				},

                // Show Popup Window
				QiaozhiPopUpShow() {
				  this.QiaozhiPopUp = true;
				  console.log('Qiaozhi Popup Show');
				},

                // Close Popup Window
				QiaozhiPopUpclose() {
				  this.QiaozhiPopUp = false;
				  console.log('Qiaozhi Popup Close');
				},

				// Qiaozhi Active Tab Icon
				IconPath(index) {
                 if (this.activeIndex === index) {
                 return this.list[index].selectedIconPath;
                 } else {
                  return this.list[index].iconPath;
                  }
                 },
                // Qiaozhi Active Tab Color
			   QiaozhiGetTextColor(index) {
				if (this.activeIndex === index) {
                return this.activeColor;
                } else {
                 return this.inactiveColor;
                 }
                },

			  // Qiaozhi Mobile Menu Routing
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
			Tosearch() {
				uni.navigateTo({
					url: '/pages/searchFor/searchFor'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/scss/style.components.scss";
	.tuqidhua {
		animation: borderanimation 0.2s ease;
	}
	
	@keyframes borderanimation {
		0% {
			width: 40px;
		}
		100% {
			width: 50px;
		}
	}

	@keyframes lengthenAnimation {
		0% {
			width: 10rpx;
			/* 起始状态为短 */
		}

		100% {
			width: 80rpx;
			/* 结束状态返回原始大小 */
		}
	}
	
	.dise {
		background-color: $tabbar-bg-color !important;
	}

	.u-fixed-placeholder {
		/* #ifndef APP-NVUE */
		box-sizing: content-box;
		/* #endif */
	}

	.u-tabbar {
		&__content {
			@include vue-flex;
			border-radius: 20rpx 20rpx 0 0;
			align-items: center;
			position: relative;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 99;
			/* #ifndef APP-NVUE */
			box-sizing: content-box;
			/* #endif */
			box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
			background-color: $tabbar-bg-color;

			&__circle__border {
				border-radius: 100%;
				width: 100rpx;
				height: 100rpx;
				top: -36rpx;
				position: absolute;
				z-index: 4;
				background-color: #ffffff;
				// 由于安卓的无能，导致只有3个tabbar item时，此css计算方式有误差
				// 故使用js计算的形式来定位，此处不注释，是因为js计算有延后，避免出现位置闪动
				left: 50%;
				transform: translateX(-50%);

				&:after {
					border-radius: 100px;
				}
			}

			&__item {
				flex: 1;
				justify-content: center;
				height: 100%;
				padding: 12rpx 0;
				@include vue-flex;
				flex-direction: column;
				align-items: center;
				position: relative;

				&__button {
					position: absolute;
					top: 28rpx;
					left: 50%;
					transform: translateX(-50%);
				}

				&__text {
					color: $u-content-color;
					font-size: 24rpx;
					line-height: 28rpx;
					position: absolute;
					bottom: 28rpx;
					left: 50%;
					transform: translateX(-50%);
					width: 100%;
					text-align: center;
				}

				&__topBian {
					display: none;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					margin: 0 auto;
					width: 80rpx;
					height: 6rpx;
					background-color: #3673D9;
					animation: lengthenAnimation .3s ease;
				}
				&__bottomBian {
					position: absolute;
					bottom: -52px;
					left: 0;
					right: 0;
					margin: 0 auto;
					width: 100rpx;
					height: 100rpx;
					background-color: #007aff;
					border-radius: 200rpx;
					animation: lengthenAnimation .5s ease;
				}
			}

			&__circle {
				position: relative;
				@include vue-flex;
				flex-direction: column;
				justify-content: space-between;
				z-index: 10;
				/* #ifndef APP-NVUE */
				height: calc(100% - 1px);
				/* #endif */

				&__button {
					width: 80rpx;
					height: 80rpx;
					border-radius: 100%;
					@include vue-flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					background-color: $tabbar-bg-color;
					top: -28rpx;
					left: 50%;
					z-index: 6;
					transform: translateX(-50%);
					.aotu_icon {
						margin: 0 auto;
						/deep/ .u-icon__img {
							width: 80rpx !important;
							height: 80rpx !important;
							margin: 0 auto;
						}
					}
				}
			}
		}
	}
	// Qiaozhi Modification
	.menu_wrap {
	 padding: 75px 15px 15px 15px;
	}
	// Uni Popup Close
	.q-tabbar-view {
	/deep/ .u-close {
    position: absolute;
    &.u-close--top-right {
	top: 85px !important;
    right: 1.5rem;
    position: fixed;
    height: 1rem;
    width: 1rem;
    z-index: 110;
    color: #B1BAD3;
    border-radius: 50%;
    font: normal normal normal 14px / 1 "uicon-iconfont";
    font-size: 0.75rem;
	&::before {
	content: "\e685";
	}
   }
  } 
	}
</style>