<template>
	<view :style="theme" class="select_wrap_box">
		<view class="select_mask_wrap" @touchmove.stop.prevent="toMoveHandle" @click.stop="showData.length>1?openSelect():''" v-if="isClick"></view>
		<view class="select_wrap" :style="{'width': size +'%'}">
			<view :class="['select_input',isClick?'select_input_select':'']" ref="select-input">

				<view style="display: flex;width: 100%;align-items: center;">
					<view class="jiahao" v-if="jiahao == 1">
						<image :src="Guoqi" mode="widthFix"></image>
					</view>
					<view class="input_info" @click.stop="showData.length>1?openSelect():''" v-if="!readonly">
						<input @click="showData.length>1?openSelect():''" placeholder-style="font-size: 14px;color: #a0a9b0;" :focus="isClick" @input="selectData" :value="selLabel" type="text" :readonly="readonly" :disabled="readonly" autocomplete="off" :placeholder="placeholder" class="text_tips">
					</view>
					<view class="input_info" @click.stop="showData.length>1?openSelect():''" v-else>
						<view :placeholder="placeholder" class="text_tips">{{selLabel}}<text v-if="!selLabel"><!-- {{placeholder}} --></text> </view>
					</view>
				</view>

				<view class="icon_arrow" @click.stop="showData.length>1?openSelect():''" v-if="showData.length>1">
					<u-icon name="arrow-down" v-if="(!value&&!clearable) || (value&&!clearable) || (!value&&clearable) && !filterable" :class="['arrow',show?'arrow_down':'arrow_up']"></u-icon>
				</view>
			</view>
			<view class="select_modal_con" v-if="show" @touchmove.stop.prevent="() => {}">
				<scroll-view scroll-y="true" class="select_modal select_modal_scroll">
					<view class="select_content" ref="select_content">
						<view v-for="(item, index) in showData" :key="index" class="select_content_li" :class="{'selected': value == item[valueType.value]}" @click="change(item)">
							
							<view class="guoqi_quhao">
								<image class="guoqi" :src="item[valueType.flag]" mode="aspectFit"></image>
								<text>{{item[valueType.value]}}</text>
							</view>
							
							<!-- <view v-if="value == item[valueType.value]" class="xzhong"></view> -->
						</view>
						<view class="select_content_li" v-if="!showData.length">{{noDataText}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>

</template>

<script>
	
	export default {
		props: {
			jiahao: {
				type: Number,
				default: 0
			},
			data: {
				type: Array,
				default: () => []
			},
			valueType: {
				type: Object,
				default: () => {
					return {
						label: 'label',
						value: 'value',
						flag: 'flag'
					}
				}
			},
			value: {
				type: [String, Number],
				default: ''
			},
			clearable: {
				type: Boolean,
				default: false
			},
			filterable: {
				type: Boolean,
				default: false
			},
			searchType: {
				type: Number,
				default: 1
			},
			placeholder: {
				type: String,
				default: 'Please select'
			},
			noDataText: {
				type: String,
				default: 'No Data'
			},
			arrLeft: {
				type: Number,
				default: 20
			},
			size: {
				type: Number,
				default: 100 //百分比
			},
			closeSelect: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,
				readonly: true,
				isClick: false,
				showData: [],
				selLabel: '',
				Guoqi: ''
			}
		},
		watch: {
			'filterable': {
				immediate:true,
				deep: true,
				handler(news) {
					this.readonly = !news
				}
			},
			'data': {
				immediate:true,
				deep: true,
				handler(news) {
					this.showData = news
				}
			},
			'value': {
				immediate: true,
				deep: true,
				handler(news) {
					let that = this
					//////console.log(news, 'value', this.data, this.valueType.value)
					setTimeout(()=>{
						if (news) {
							let index = that.data.findIndex(ite => ite[that.valueType.value] == news)
							if (index == -1) {
								//uni.showToast({
								//	title: '传入的value不存在',
								//	icon: 'none',
								//	duration: 1500
								//})
								
							} else {
								that.Guoqi = that.data[index][that.valueType.flag]
								that.selLabel = that.data[index][that.valueType.value]
							}
						}
					},500)
				}
			},
			closeSelect: {
				immediate:true,
				deep: true,
				handler(news) {
					this.show = news
				}
			}
		},
		created() {

		},
		methods: {
			openSelect() {
				this.show = !this.show
				this.$emit("update:closeSelect", this.show)
				this.isClick = !this.isClick
			},
			change(item) {
				//console.log(item)
				if (this.value != item[this.valueType]) {
					this.$emit('input', item[this.valueType.value])
					this.$emit('change', item[this.valueType.value])
				}
				this.Guoqi = item[this.valueType.flag]
				this.selLabel = item[this.valueType.value]
				this.show = false
				this.$emit("update:closeSelect", this.show)
				this.isClick = false
				this.showData = this.data
			},
			clearItem() {
				if (this.clearable) {
					this.$emit('input', '')
					this.$emit('change', '')
				}
				this.selLabel = ''

			},
			selectData(e) {
				let sel = e.detail.value
				if (sel) {
					let arrCons = []
					let selVal = []
					this.data.forEach(item => {
						arrCons.push(item)
					})
					arrCons.forEach((item) => {
						if (this.searchType == 1) {
							if (item[this.valueType.label].indexOf(sel) != -1) {
								selVal.push(item)
							}
						} else {
							if (item[this.valueType.label] == sel) {
								selVal.push(item)
							}
						}

					})
					this.show = true
					this.$emit("update:closeSelect", this.show)

					this.showData = selVal
				} else {
					this.showData = this.data
				}
			},
			toMoveHandle() {

			}
		},
		beforeDestroy() {}
	}
</script>

<style lang="scss" scoped>
	.jiahao {
		margin-right: 10rpx;
		display: flex;
		align-items: center;
		//flex: 1;
		image {
			width: 36rpx !important;
			height: 36rpx;
		}
	}

	.select_wrap_box {

		.select_mask_wrap {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background-color: rgba(0, 0, 0, 0);
			height: 100%;
			z-index: 100;
		}
	}

	.select_wrap {
		width: 100%;
		display: inline-block;
		position: relative;

		.select_input {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 100;
			//-webkit-appearance: none;
			//background-color: transparent;
			//background-image: none;
			//box-sizing: border-box;
			color: #606266;
			//display: inline-block;
			height: 37px;
			line-height: 37px;
			// outline: none;
			// box-sizing: border-box;
			//transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
			//width: 100%;
			padding-left: 20rpx;
			padding-right: 20rpx;

			.input_info {
				font-size: 26rpx;
				//flex: 1;
				position: initial !important;
				height: 100%;

				.text_tips {
					height: 100%;
					color: $font-all-color;

					text {
						font-size: 26rpx;
						color: $font-all-color;
					}
				}
			}

			.icon_arrow {
				//position: absolute;
				width: 20px;
				right: 0;
				top: 0;
				color: #c0c4cc;
				z-index: 999;
				text-align: center;

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

				.arrow-clear {
					width: 14px;
					height: 14px;
					border: 1px solid #e4e7ed;
					color: #e4e7ed;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 12px;
				}
			}
		}

		.select_input_select {
			border-color: $all-secondary-color;
		}
	}

	.select_modal_con {
		width: 100%;
		transform-origin: center top;
		z-index: 2062;
		position: absolute;
		top: 44px;
		left: 0;
		//border: 1px solid #192533;
		border-radius: 10px;
		background-color: $select-drop-down-bg-color;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		margin-top: 12px;

		.cons_arrow {
			position: absolute;
			display: block;
			width: 0;
			height: 0;
			border-color: transparent;
			border-style: solid;
			top: -6px;
			left: 10%;
			margin-right: 3px;
			border-top-width: 0;
			border-bottom-color: #ebeef5;

		}

		.cons_arrow:after {
			content: " ";
			border-width: 6px;
			position: absolute;
			display: block;
			width: 0;
			height: 0;
			border-color: transparent;
			border-style: solid;
			top: 1px;
			margin-left: -6px;
			border-top-width: 0;
			border-bottom-color: #fff;
		}
	}

	.select_modal {
		overflow: scroll;
		max-height: 150px;

		.select_content {
			width: 100%;
			list-style: none;
			padding: 6px;
			margin: 0;
			box-sizing: border-box;
			.guoqi_quhao {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.guoqi {
					margin-right: 10rpx;
					width: 36rpx;
					height: 36rpx;
				}
			}
			

			.xzhong {
				width: 18rpx;
				height: 18rpx;
				background-color: #3c85ff;
				border-radius: 200rpx;
				box-shadow: 0 0 10px #3c85ff;
			}

			.select_content_li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;
				padding: 0 6px;
				position: relative;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: $font-all-color;
				height: 30px;
				line-height: 30px;
				box-sizing: border-box;
				cursor: pointer;

				&.selected {
					color: #ffffff;
					border-radius: 12rpx;
					background-color: $select-drop-down-xz-color;
				}
			}
		}



	}

	.select_modal_scroll {
		height: auto;
	}
</style>