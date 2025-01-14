<template>
	<view class="l-dialer" :style="getStyle">
		<view class="l-dialer__inner" :class="[DonghuaKongzhi == true?'zhuanqilai':'']" :style="getDialStyle">
			<view class="l-dialer__inner-border" v-if="$slots.border">
				<slot name="border" />
			</view>
			<view class="l-dialer__inner-wrap" :style="styleOpt.borderColor && (' border: 1rpx solid ' + styleOpt.borderColor)">
				<view class="l-dialer__inner-item" v-for="(item, index) in prizeList" :key="index" :style="[getRotateAngle(index)]">
					<view class="l-dialer__inner-content" :style="[getCorrectAngle(index)]">
						<slot v-if="$slots.prize" name="prize" :item="item" :even="index % 2"></slot>
						<block v-else>
							<image class="l-dialer__inner-img" :src="item.icon"></image>
							<view class="l-dialer__inner-name" :class="[index % 2 == 0 ? 'qioushu1' : 'qioushu2']" :style="[{fontSize: styleOpt.fontSize}]">{{ item.reward }}</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="l-dialer__pointer" :style="pointerStyle">
			<slot v-if="$slots && $slots.pointer" name="pointer" />
			<image v-else :class="!isTurnIng ? 'heart': ''" src="/static/wheel/turnable_btn2.png" style="width: 100%" mode="widthFix" @tap="$emit('click')" />
		</view>
	</view>
</template>
<script>
	export default {
		name: 'l-dialer',
		emits: ['click', 'done'],
		props: {
			size: {
				type: [String, Number],
				default: 300
			},
			prizeList: {
				type: Array
			},
			turns: {
				type: Number,
				default: 10
			},
			duration: {
				type: Number,
				default: 6
			},
			styleOpt: {
				type: Object,
				default: () => ({
					// 每一块扇形的背景色,默认值,可通过父组件来改变
					// $primary-1 $primary-2 
					prizeBgColors: ['linear-gradient(-185deg, #376fdf 64.9%, #2954b9 90.9%)', 'linear-gradient(to top, #f4f4f4, #7ea7f3)'],
					// 每一块扇形的外边框颜色,默认值,可通过父组件来改变
					// primary-4
					borderColor: 'transparent',
				})
			},
			customStyle: {
				type: String,
			},
			dialStyle: {
				type: String,
			},
			pointerStyle: {
				type: String,
				default: `width: 30%`
			}
		},
		data() {
			return {
				// 开始转动的角度
				startRotateDegree: 1,
				// 设置指针默认指向的位置,现在是默认指向2个扇形之间的边线上
				rotateAngle: 1,
				rotateTransition: '',
				isTurnIng: false,
				DonghuaKongzhi: true
			};
		},
		computed: {
			getStyleOpt() {
				const style = {
					// 每一块扇形的背景色,默认值,可通过父组件来改变
					prizeBgColors: ['#fff0a3', '#fffce6'],
					// 每一块扇形的外边框颜色,默认值,可通过父组件来改变
					borderColor: '#ffd752',
				}
				return Object.assign(style, this.styleOpt)
			},
			getRotateAngle() {
				return index => {
					const style = {
						transform: `rotate(${(360 / this.prizeList.length) * index}deg) skewX(0deg) skewY(${360 / this.prizeList.length - 90}deg)`,
						backgroundImage: `${this.getStyleOpt.prizeBgColors[index % this.getStyleOpt.prizeBgColors.length]}`,
						border: `${this.getStyleOpt.borderColor && '0rpx solid ' + this.getStyleOpt.borderColor }`
					}
					if (this.prizeList.length == 2) {
						style['transform'] = index == 0 ? 0 : `rotate(270deg)` //`rotate(${(360 / this.prizeList.length) * index}deg)`
						style['top'] = 0
					}
					return style
				};
			},
			getCorrectAngle() {
				return index => {
					const style = {
						transform: `skewY(${90 - 360 / this.prizeList.length}deg) skewX(0deg) rotate(${180 / this.prizeList.length}deg)`
					}
					if (this.prizeList.length == 2) {
						if (index == 0) {
							style['transform'] = `rotate(90deg)`
							style['bottom'] = 0
						} else {
							style['transform'] = `rotate(0deg)`
							style['left'] = 0
							style['bottom'] = '-50%'
						}

					}
					return style
				};
			},
			getStyle() {
				let {
					size,
					customStyle
				} = this;
				size = /\d$/.test(size) ? size + 'px' : size;
				return `width: ${size}; height: ${size}; ${customStyle}`;
			},
			getDialStyle() {
				return `
				padding: ${this.getStyleOpt.padding};
				transform: ${this.rotateAngle};
				transition: ${this.rotateTransition};
				${this.dialStyle}
			`;
			}

		},
		methods: {
			// 转动起来
			run(index) {
				this.DonghuaKongzhi = false
				setTimeout(()=>{
					if (this.isTurnIng) return
					const duration = this.duration;
					const length = this.prizeList.length
					
					const rotateAngle = this.startRotateDegree + this.turns * 360 + 360 - (180 / length + (360 / length) * index) - (this.startRotateDegree % 360);
					this.startRotateDegree = rotateAngle;
					this.rotateAngle = `rotate(${rotateAngle}deg)`;
					this.rotateTransition = `transform ${duration}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`;
					this.isTurnIng = true
					setTimeout(() => {
						this.$emit('done', index);
						this.isTurnIng = false
						console.log('转动结束');
					}, duration * 1000 + 500);
				},100);
			},
			kaishidh(){
				let that = this
				that.DonghuaKongzhi = true
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import './index';

	.qioushu1 {
		font-weight: bold;
		color: #fff;
		writing-mode: vertical-rl;
	}

	.qioushu2 {
		font-weight: bold;
		color: #000;
		writing-mode: vertical-rl;
	}
	.zhuanqilai {
		pointer-events: none;
		animation: spinDb 30s linear infinite;
		vertical-align: middle;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transform-origin: left top;
	}
	@keyframes spinDb {
	    0% {
	        transform: rotate(-1turn) translate(-50%,-50%)
	    }
	
	    to {
	        transform: rotate(0) translate(-50%,-50%)
	    }
	}
</style>