<template>
	<view :style="theme" class="yealuo-select">
		<view class="yealuo-background" @tap="isShow = false" v-show="isShow"></view>


		<view class="yealuo-con" :style="inputStyle" @tap='isShow=isShow?false:nowData.length'>
			<view class="yxzbox">{{$t('Providers')}}<text v-if="theValue.length!=0">:</text><span v-if="theValue.length!=0">{{theValue.length}}</span></view>
			<view class='right_icon' v-if="selectIco">
				<u-icon name="arrow-down" :class="['arrow',isShow?'arrow_down':'arrow_up']"></u-icon>
			</view>
		</view>
		<transition name="scale">
			<view class="yealuo-select" v-if="show" :style="selectStyle">
				<view class="zhangao"></view>
				<scroll-view class="data" scroll-y="true">
					<checkbox-group @change="selectCheckbox">
						<label class="item-text" v-for="(item, index) in nowData" :key="index" v-if="item.gameCount != 0">
							<checkbox iconColor="#FFFFFF" activeBorderColor="#3673d9" activeBackgroundColor="#3673d9" backgroundColor="#B1BAD3" color="#3673D9" style="transform:scale(0.74)" name="name1" checked v-if="theValue.indexOf(String(item.id))!=-1 " :value="String(item.id)"></checkbox>
							<checkbox iconColor="#FFFFFF" activeBorderColor="#3673d9" activeBackgroundColor="#3673d9" backgroundColor="#B1BAD3" color="#3673D9" style="transform:scale(0.74)" name="name1" v-else :value="String(item.id)"></checkbox>
							<text class="leab">{{item.name}}</text>
							<text class="leab2">{{item.gameCount}}</text>
						</label>
					</checkbox-group>
				</scroll-view>
			</view>
		</transition>



	</view>
</template>

<script>
	export default {
		name: 'yealuoInputs',
		props: {
			placeholder: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			},
			itemKey: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '600'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			inputStyle: {
				type: String,
				default: ''
			},
			selectStyle: {
				type: String,
				default: ''
			},
			overflow: {
				type: String,
				default: 'auto'
			},
			binData: {
				type: Array,
				default: ''
			},
			selectIco: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				odData: this.binData,
				nowData: this.binData,
				isShow: false,
				theValue: this.value,
				theDisabled: this.disabled
			}
		},
		watch: {
			value(val) {
				this.theValue = val;
			},
			//监听数据变化
			"binData": {
				handler: function(val) {
					this.nowData = val;
				},
				immediate: true,
				deep: true
			}
		},
		computed: {
			show() {
				return this.isShow && this.nowData.length
			}
		},
		created() {
			uni.$on('Up-yealuoselecct', (val) => {
				this.theValue = []
			})
		},
		methods: {
			//下拉选中
			selectCheckbox(e) {
				var val = e.target.value;
				var str = val.join(",");
				this.$emit('getBackVal', str)
				this.theValue = e.target.value;
				////console.log(e);
				this.isShow = false;
				/*var str = val;
				if (typeof(str) != "string") {
					str = "";
					for (var i = 0; i < val.length; i++) {
						var vt = val[i].split("|");
						str += i > 0 ? "," + vt[0] : vt[0];
					}
				} else {
					this.isShow = false;
					str = str.split("|")[0];
				}
				this.$emit('getBackVal', str)
				this.theValue = str;*/

			}
		},
	}
</script>

<style lang="scss" scoped>
	
	.zhangao {
		height: 12rpx;
	}
	
	/deep/ uni-checkbox {}

	/deep/ uni-checkbox .uni-checkbox-input {
		
	}

	/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
		//font-size: 16px !important;
	}


	.box {
		transition: all 0.3s ease;
	}

	.scale-enter-active,
	.scale-leave-active {
		transition: all 0.3s ease;
	}

	.scale-enter,
	.scale-leave-to {
		transform: scale(0);
		opacity: 0;
	}

	.yealuo-select {
		width: 100%;
		position: relative;

		.yealuo-background {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 999998;
		}

		.yealuo-con {
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			
			color: $font-all-color;
			font-size: 28rpx;
			padding: 0 20rpx;
			border-radius: 20rpx;

			.yxzbox {
				span {
					margin: 0 5rpx;
					color: #3673d9;
				}
			}

			.right_icon {
				.arrow {
					background-color: transparent;
					transition: all .3s;
				}

				.arrow_down {
					transform: rotate(180deg);
				}

				.arrow_up {
					transform: rotate(0deg);
				}
			}
		}


		.yealuo-select {
			position: absolute;
			z-index: 999;
			width: 100%;
			z-index: 999999;
			.data {
				
				background-color: $select-drop-down-color;
				border: 1px solid $select-drop-down-border-color;
				
				border-radius: 10px;
				max-height: 640rpx;
				overflow: auto;

				.item-text {
					padding-left: 14rpx;
					color: $font-all-color;
					width: 100%;
					display: block;
				}

				.leab {
					color: $font-all-color;
					font-size: 26rpx;
				}

				.leab2 {
					font-size: 24rpx;
					display: inline-block;
					padding: 0 10rpx;
					height: 36rpx;
					text-align: center;
					line-height: 36rpx;
					border-radius: 6rpx;
					color: #ffffff;
					background-color: #56b54e;
					//background: linear-gradient(1turn,#FF9619 .8%,#FFB930);
					//box-shadow: 0 3px 16px #6f3f06,inset 0 4px 3px #ffffff4d;
					margin-left: 6rpx;
				}
			}
		}
	}
</style>