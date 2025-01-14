<template>
	<view :style="theme">
		<view class="t-slide-box" v-for="(item,index) in items" :key="index">
			<view class="t-slide-area">
				<view class="t-slide-view">
					　　<view class="t-touch-item" :class=" item.isTouchMove?'touch-move-active':''" @touchstart="touchstart($event,item,index)" @touchmove="touchmove" :data-index="index">
						<view class="t-slide-content" :style="{transform:item.isTouchMove?'translateX(0)':`translateX(${btnWidth*(btnArr.length)}rpx)`, marginLeft:`-${btnWidth*(btnArr.length)}rpx`}" @click="itemClick(item,index)">
							<slot v-bind:item="item,index"> </slot>
						</view>
						<view class="t-slide-btn" v-for="(btn,num) in btnArr" :key="num" @touchstart="btnClick(btn.events,item)" :style="{width:btnWidth+'rpx',transform:item.isTouchMove?'translateX(0)':`translateX(${btnWidth*(btnArr.length)}rpx)`,}"><!-- backgroundColor:btn.background,-->
							<!-- <view class="t-slide-btn-text" :style="{color:btn.color}">
								<image src="/static/image/remove_icon.png"></image>
							</view> -->
							
							<view class="wallet_icon">
								<view><image src="/static/image/remove_icon.png"></image></view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//单行高度
			height: {
				type: Number,
				default: 100
			},
			//按钮宽度
			btnWidth: {
				type: Number,
				default: 120
			},
			//按钮数组
			btnArr: {
				type: Array,
				default: function() {
					return [
						//{
						//	name: '编辑',
						//	background: '#00aaff',
						//	color: '#fff',
						//	events: 'edit'
						//},
						{
							name: '删除',
							background: '#ff5500',
							color: '#fff',
							events: 'del'
						}
					]
				}
			},
		},
		data() {
			return {
				items: [],
				startX: 0, //开始坐标
				startY: 0, //开始Y坐标
				flag: false,
			}
		},

		methods: {
			//点击单行
			itemClick(item, idx) {
				setTimeout(() => {
					if (this.flag) {
						this.$emit('itemClick', item, idx)
					}
				}, 100)
			},
			//点击按钮
			btnClick(name, item, event) {
				this.$emit(name, item)
			},
			//赋值
			assignment(data) {
				data.forEach(val => {
					this.$set(val, 'isTouchMove', false)
				})
				this.items = data
			},
			clickOpen(idx) {
				this.$set(this.items[idx], 'isTouchMove', true)
			},
			touchstart: function(e, item, index) {

				this.flag = true
				//如果点击的行为滑开行   不执行点击事件
				if (item.isTouchMove) {
					this.flag = false
					//console.log('1')
					//this.$emit('hideHuiseDel', item, index)
				} else {
					//console.log('2')
					//this.$emit('hideHuiseDel', item, index)
				}
				//开始触摸时 重置所有删除
				this.items.forEach((v, i) => {
					//只操作为true的
					if (v.isTouchMove) {
						v.isTouchMove = false
						//console.log('3')
						this.$emit('openHuiseDel', item, index)
					} else {
						//console.log('4')
					}
				})
				/*  #ifdef APP-PLUS||H5||MP  */
				this.startX = e.changedTouches[0].clientX
				this.startY = e.changedTouches[0].clientY,
				/*  #endif  */
				/*  #ifdef APP-NVUE */
				this.startX = e.changedTouches[0].screenX
				this.startY = e.changedTouches[0].screenY,
				/*  #endif  */
				this.items = this.items
				//console.log('4')
			},
			//滑动事件处理
			touchmove: function(e) {
				this.flag = false
				let that = this
				let index = e.currentTarget.dataset.index //当前索引
				let startX = this.startX //开始X坐标
				let startY = this.startY //开始Y坐标
				/*  #ifdef APP-PLUS||H5||MP  */
				var touchMoveX = e.changedTouches[0].clientX //滑动变化坐标
				var touchMoveY = e.changedTouches[0].clientY //滑动变化坐标
				/*  #endif  */
				/*  #ifdef APP-NVUE */
				var touchMoveX = e.changedTouches[0].screenX //滑动变化坐标
				var touchMoveY = e.changedTouches[0].screenY //滑动变化坐标
				/*  #endif  */
				//获取滑动角度
				let angle = this.angle({
					X: startX,
					Y: startY
				}, {
					X: touchMoveX,
					Y: touchMoveY
				});
				this.items.forEach(function(v, i) {
					v.isTouchMove = false
					//滑动超过60度角 return
					if (Math.abs(angle) > 60) return;
					if (i == index) {

						if (touchMoveX > startX) {
							that.$set(that.items[i], 'isTouchMove', false) //右滑
						} else {
							that.$set(that.items[i], 'isTouchMove', true) //左滑
						}
					}
				})
			},
			angle: function(start, end) {
				var X = end.X - start.X,
					Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(Y / X) / (2 * Math.PI);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.t-slide-box {
		//border-bottom-width: 1rpx;
		//border-bottom-style: solid;
		//border-bottom-color: #ececec;
		margin: 26rpx 0;
		background-color: $all-secondary-color;
		border-radius: 20rpx;
	}

	.t-slide-area {
		flex: 1;
		height: 65px;
	}

	.t-slide-view {
		flex: 1;
		height: 65px;
	}

	.t-touch-item {
		font-size: 24rpx;
		/*  #ifdef APP-PLUS||H5||MP  */
		display: flex;
		/*  #endif  */
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
		height: 65px;
		overflow: hidden;
	}

	.t-slide-content {
		flex: 1;
		line-height: 65px;
		transition-property: transform;
		transition-duration: 0.3s;
	}

	.t-slide-btn {
		//font-weight: bold;
		/*  #ifdef APP-PLUS||H5||MP  */
		display: flex;
		/*  #endif  */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #fff;
		transition-property: transform;
		transition-duration: 0.3s;
		border-radius: 12rpx;
		height: 65px;
	}

	.t-slide-btn-text {
		font-size: 24rpx;
		color: #000;

		image {
			width: 36.11rpx;
			height: 36.11rpx;
		}
	}
	
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
			box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
			border-radius: 10px;
			height: 34px;
			text-align: center;
			padding: 0 12px;
			position: relative;
			z-index: 2;
			top: -2px;
			image {
				width: 28rpx;
				height: 28rpx;
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
</style>