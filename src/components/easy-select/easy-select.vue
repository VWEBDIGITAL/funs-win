<template>
	<view :style="theme">
		<view class="select_mask_wrap" @click.stop="trigger" v-if="showOptions"></view>
		<view class="easy-select-wrap" @click.stop="trigger">
			<view class="easy-select">
				<view class="pddingLeftle" style="display: flex;align-items: center;" :style="{paddingLeft: isLeftpad?'74rpx':''}">
					
					<view class="shuruluang">
						<view class="shijizhi">
							
							
							<view class="shijizhi2" v-if="verAcis == 1">{{value || $t('ManageAccountPage.AddAccound')}}</view>
							<view class="shijizhi2" v-if="verAcis == 0">{{value || $t('NotAdded')}}</view>
							
							
							<span v-if="Discountratio==true && opTionsRate != 0" class="youhuibli">+{{opTionsRate/10}}%</span>
						</view>
					</view>
					
				</view>
				
				<view class="easy-select-suffix" :class="[showSuffix]" v-if="options.length>0">
					<u-icon name="arrow-up"></u-icon>
				</view>
				<view class="easy-select-suffix" v-else>
					<u-icon name="arrow-left"></u-icon>
				</view>
				
				<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'auto','position':'absolute','top':'40px','left':'0','z-index':'100'}" :show="showOptions">
				<view class="easy-select-options" v-if="showOptions && options.length != 0">
					
					<view v-if="HideLeft === 0" class="easy-select-options-item" v-for="(item,indexq) in options" :key="item.value" @click.stop="select(item)" :class="[item.label === value?'active':'']">
						<view>{{item.label}}<span v-if="Discountratio==true && item.rate != 0" class="youhuibli2">+{{item.rate/10}}%</span></view>
						<span class="xzhong" v-if="item.label === value"></span>
					</view>
					
					<view v-if="HideLeft === 1" class="easy-select-options-item" v-for="(item,indexs) in options" :key="item.value" @click.stop="select(item)" :class="[currentSelect === item.labeName?'active':'']">
						<view v-if="HideLeft === 1">
							<view class="zhiyihang" v-if="item.labelA || item.labelP">
								<span style="margin-right: 10rpx;">{{item.bnakName || ''}}</span>
								<view>({{item.labelP}}){{item.labelA | testuserName}}</view>
							</view>
							<view class="zhiyihang" v-else>{{item.labelE | testuserName}}</view>
						</view>
						<view v-else>{{item.label}}<span v-if="Discountratio==true && item.rate != 0" class="youhuibli2">+{{item.rate/10}}%</span></view>
						<span class="xzhong" v-if="currentSelect === item.labeName"></span>
					</view>
					
				</view>
				</uni-transition>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * easy-select
	 * @author Snoop zhang
	 * @description Select Component
	 * */
	const COMPONENT_NAME = 'easy-select'
	const MAX_OPTIONS_HEIGHT = 137 // 修改务必也修改easy-select-options的css部分
	const OPTIONS_ITEM_HEIGHT = 33 // 修改务必也修改easy-select-options-item的css部分
	const OPTIONS_MARGIN = 10
	const OPTIONS_PADDING = 6 * 2 + 2 // + 2是border
	const OPTIONS_OTHER_HEIGHT = OPTIONS_MARGIN + OPTIONS_PADDING
	const STORAGE_KEY = '_easyWindowHeight'
	const SIZE = {
		'medium': {
			width: '100%',
			height: '40px'
		},
		'small': {
			width: '200px',
			height: '30px'
		},
		'mini': {
			width: '160px',
			height: '30px'
		}
	}
	
	export default {
		name: COMPONENT_NAME,
		props: {
			verAcis: {
				type: [Number, String],
				default: 0
			},
			isLeftpad: {
				type: Boolean,
				default: true
			},
			opTionsRate: {
				type: [Number, String],
				default: 0
			},
			Discountratio: {//优惠信息显示
				type: Boolean,
				default: false
			},
			HideLeft: {
				type: [Number, String],
				default: 0
			},
			windowHeight: {
				type: [Number, String],
				default: 0
			},
			placeholder: {
				type: String,
				default: 'Please select'
			},
			value: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: 'medium'
			},
			options: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				showOptions: false,
				boundingClientRect: {},
				currentSelect: '',
				optionsGroupTop: 'auto',
				optionsGroupMargin: ''
			}
		},
		watch: {
			'value': {
				immediate:true,
				deep: true,
				handler(newVal) {
					this.currentSelect = newVal
				}
			},
		},
		computed: {
			//计算右边三角旋转
			showSuffix() {
				return this.showOptions ? 'showOptions' : 'no-showOptions'
			},
		},
		mounted() {
			
			/*const elQuery = uni.createSelectorQuery().in(this)
			elQuery.select('.easy-select').boundingClientRect(data => {
				this.boundingClientRect = data
			}).exec();
			try {
				if (!this.windowHeight) {
					const storageHeihgt = uni.getStorageSync(STORAGE_KEY)
					if (storageHeihgt) {
						this.easyWindowHeight = storageHeihgt
						return
					}
					const res = uni.getSystemInfoSync();
					this.easyWindowHeight = res.windowHeight
					uni.setStorageSync(STORAGE_KEY, this.easyWindowHeight)
				}
			} catch (e) {
				
			}*/
		},
		filters: {
			// 加密
			testuserName(value) {
				var newStr;
				var char = '';
				for (var i = 0, len = value.length - 7; i < len; i++) {
					char += '*';
				}
				newStr = value.substr(0, 0) + char + value.substr(-4);
				return newStr;
			}
		},
		methods: {
			opendakai(data){
				this.showOptions = !this.showOptions
			},
			trigger(e) {
				
				if(this.verAcis == 1){
					this.$emit("openShows",e)
				} else {
					this.showOptions = !this.showOptions
				}
				
				
				
				/*const view = uni.createSelectorQuery().in(this)
				view.select('.easy-select').fields({rect: true}, data => {
					let {	top, bottom } = data
					const thresholdHeight = Math.min(MAX_OPTIONS_HEIGHT + OPTIONS_MARGIN, (this.options.length * OPTIONS_ITEM_HEIGHT) + OPTIONS_OTHER_HEIGHT)
					bottom = Number(this.windowHeight || this.easyWindowHeight) - (top + this.boundingClientRect.height) // 距离底部的距离等于视口的高度减上top加select组件的高度

					// judge direction
					if (bottom < thresholdHeight) {
						this.optionsGroupDirection = 'up'
						this.optionsGroupTop = -thresholdHeight - 12 + 'px'
						this.optionsGroupMargin = '0'
					} else {
						this.optionsGroupDirection = 'down'
						this.optionsGroupTop = 'auto'
						this.optionsGroupMargin = '8px 0 0 0'
					}*/

					// if (this.scrollTop < )
					//this.showOptions = !this.showOptions
				//}).exec();
			},
			async select(options) {
				////console.log('选择的',options,this.options)
				let that = this
				that.showOptions = false
				that.currentSelect = options.labeName
				
				/*if(options.labelA){
					const ress = await that.encryption(options)
					//console.log('加密后','('+options.labelP+')'+ress)
				}*/
				
				that.$emit('selectOne', options)
			},
			/*async encryption(val){
				var newVal = val.labelA
				var newStr;
				var char = '';
				for (var i = 0, len = newVal.length - 7; i < len; i++) {
					char += '*';
				}
				newStr = newVal.substr(0, 0) + char + newVal.substr(-4);
				return newStr;
			}*/
		}
	}
</script>

<style lang="scss" scoped>
	.shuruluang {
		display: flex;
		align-items: center;
		width: 100%;
		border-left: 1px solid #2F4553;
		margin-left: 20rpx;
		padding-left: 20rpx;
		span {
			
		}
	}
	.shijizhi {
		flex: 1;
		.shijizhi2 {
			word-break:break-all;
			display:-webkit-box;
			-webkit-line-clamp:1;
			-webkit-box-orient:vertical;
			overflow:hidden;
			padding-right: 10%;
		}
	}
	.youhuibli {
		position: absolute;
		top: 0;
		right: 0;
		background: linear-gradient(1turn,#1db83e .8%,#1db83e);
		box-shadow: 0 3px 28px rgba(29, 184, 62, 0.4),inset 0 3px 3px #ffffff4d;
		//background-color: $all-secondary-color;
		color: #fff;
		padding: 4rpx 8rpx;
		font-size: 22rpx;
		border-radius: 0 14rpx 0 14rpx;
		margin-left: 10rpx;
	}
	.youhuibli2 {
		//position: absolute;
		//top: 0;
		//right: 10rpx;
		background: linear-gradient(1turn,#1db83e .8%,#1db83e);
		box-shadow: 0 3px 28px rgba(29, 184, 62, 0.4),inset 0 3px 3px #ffffff4d;
		//background-color: $all-secondary-color;
		color: #fff;
		padding: 4rpx 8rpx;
		font-size: 22rpx;
		border-radius: 8rpx;
		margin-left: 10rpx;
	}
	.select_mask_wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background-color: rgba(0, 0, 0, 0);
	}
	.easy-select-wrap {
		width: 100%;
	}
	.easy-select {
		position: relative;
		//border: 1px solid #dcdfe6;
		border-radius: 4px;
		/* font-size: 28rpx; */
		color: $font-all-color;
		outline: none;
		box-sizing: content-box;
		//height: 30px;
		padding: 20rpx 0;
	}
	.line_icon {
		width: 55.56rpx;
		height: 55.56rpx;
	}
	.easy-select input {
		font-size: 28rpx !important;
		padding: 0 18rpx;
		padding-right: 60rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		flex: 1;
		height: 100% !important;
		min-height: 100% !important;
	}
	
	/deep/ .uni-input-placeholder {
		color: rgb(60, 81, 98) !important;
	}

	.easy-select .easy-select-suffix {
		position: absolute;
		box-sizing: border-box;
		height: 100%;
		right: 10px;
		top: 0;
		display: flex;
		align-items: center;
		transform: rotate(180deg);
		transition: all .3s;
		transform-origin: center;
	}

	.easy-select .showOptions {
		transform: rotate(0) !important;
	}

	.easy-select .no-showOptions {
		transform: rotate(180deg) !important;
	}

	.easy-select .easy-select-options {
		width: 100%;
		height: auto;
		position: absolute;
		padding: 14px;
		margin-top: 14px;
		border-radius: 10px;
		background-color: $select-drop-down-bg-color;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		box-sizing: border-box;
		transform-origin: center top;
		z-index: 2238;
		//overflow: scroll;
		//max-height: 274rpx;
	}

	.easy-select .easy-select-options-item {
		padding: 0 26rpx;
		position: relative;
		color: $font-all-color;
		
		height: 40px;
		line-height: 40px;
			
		border-radius: 12rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.xzhong {
			// flex: initial;
			// display: inline-block;
			// width: 18rpx;
			// height: 18rpx;
			// background-color: #3c85ff;
			// border-radius: 200rpx;
			// box-shadow: 0 0 10px #3c85ff;
		}
		
		.zhiyihang {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			span {
				color: $tkzh-bnak-name-color;
			}
			view {
				flex: 1;
				word-break:break-all;
				display:-webkit-box;
				-webkit-line-clamp:1;
				-webkit-box-orient:vertical;
				overflow:hidden;
			}
		}
	}

	.easy-select .active {
		color: #fbffff;
		border-radius: 10px;
		//border: 1px solid #3c85ff;
		background-color: $select-drop-down-xz-color;
	}
	@media (min-width: 800px) {
		.easy-select .pddingLeftle {
			padding-left: 46px !important;
		}
	}
</style>
