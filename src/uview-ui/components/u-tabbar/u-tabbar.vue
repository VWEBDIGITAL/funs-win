<template>
	<view :style="theme" v-if="show" class="u-tabbar" @touchmove.stop.prevent="() => {}">

		<!--Qiaozhi Tabbar-->
		<view class="qiaozhi">
		<view v-if="show" class="u-tabbar__content qiaozhi" :style="{ height: $u.addUnit(height) }" :class="{ 'u-border-top': borderTop }">
			<view class="u-tabbar__content__item" v-for="(item, index) in list" :key="index"
				:class="{ 'u-tabbar__content__circle': midButton && item.midButton, 'dise': index === 2 }"
				@tap.stop="clickHandler(index)">
				<view class="u-tabbar__content__item__topBian" :style="{background: BianelColor(index),display: BianelColor(index).includes('linear-gradient') ? 'block' : '' }"></view>
			<view :class="[midButton && item.midButton ? 'u-tabbar__content__circle__button' : 'u-tabbar__content__item__button',]">
				<u-icon class="aotu_icon" :name="elIconPath(index)" img-mode="scaleToFill" :color="elColor(index)" :custom-prefix="item.customIcon ? 'custom-icon' : 'uicon'"></u-icon>
				<u-badge :count="item.count" :is-dot="item.isDot" v-if="item.count || item.isDot" :offset="[-2, getOffsetRight(item.count, item.isDot)]"></u-badge>
				</view>
				<view class="u-tabbar__content__item__text" :style="{ color: elColor(index) }">
					<text class="u-line-1" v-if="index === 0">{{ $t('Qiaozhi.Browse') }}</text>
					<text class="u-line-1" v-if="index === 1">{{ $t('Qiaozhi.Contests') }}</text>
					<text class="u-line-1" v-if="index === 2">{{ $t('Qiaozhi.Chat') }}</text>
					<text class="u-line-1" v-if="index === 3">{{ $t('Qiaozhi.Casino') }}</text>
				</view>
			</view>
			<view v-if="midButton" class="u-tabbar__content__circle__border"
				:class="{ 'u-border': borderTop, 'tuqidhua': Dangidx === 2 }"
				:style="{ background: Dangidx === 2 ? '#007aff' : bgColor, left: midButtonLeft }"></view>
		</view>
	   </view>

		<!--safe-area-inset-bottom 底部安全区域-->
		<view v-if="false" class="u-tabbar__content " :style="{ height: $u.addUnit(height) }"
			:class="{ 'u-border-top': borderTop }"><!-- , backgroundColor: bgColor, -->
			<view class="u-tabbar__content__item" v-for="(item, index) in list" :key="index"
				:class="{ 'u-tabbar__content__circle': midButton && item.midButton,'dise': index == 2 }"
				@tap.stop="clickHandler(index)"><!-- :style="{ backgroundColor: bgColor }"-->
				<view v-if="index != 2" class="u-tabbar__content__item__topBian"
					:style="{background: BianelColor(index)}"></view>
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
	export default {
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
						pagePath: "/pages/Account/Account",
						iconPath: "/static/tabbar/qiaozhi/browse.png",
						selectedIconPath: "/static/tabbar/qiaozhi/browse.png",
						text: this.$t('Qiaozhi.Browse')
					}, {
						pagePath: "/pages/searchFor/searchFor",
						iconPath: "/static/tabbar/qiaozhi/contests.png",
						selectedIconPath: "/static/tabbar/qiaozhi/contests.png",
						text: this.$t('Qiaozhi.Contests')
					},					{
						pagePath: "/pages/searchFor/searchFor",
						iconPath: "/static/tabbar/qiaozhi/chat.png",
						selectedIconPath: "/static/tabbar/qiaozhi/chat.png",
						text: this.$t('Qiaozhi.Chat')
					},
					{
						pagePath: "/pages/index/index",
						iconPath: "/static/tabbar/qiaozhi/casino.png",
						selectedIconPath: "/static/tabbar/qiaozhi/casino.png",
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
		},
		data() {
			return {
				// 由于安卓太菜了，通过css居中凸起按钮的外层元素有误差，故通过js计算将其居中
				midButtonLeft: '50%',
				pageUrl: '', // 当前页面URL
				Dangidx: 0
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
</style>