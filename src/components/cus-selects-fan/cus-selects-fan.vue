<template>
	<view :style="theme" class="select_wrap_box">
		<view class="select_mask_wrap" @touchmove.stop.prevent="toMoveHandle" @click.stop="openSelect" v-if="isClick">
		</view>

		<view class="select_wrap" :style="{'width': size +'%'}">
			<view :class="['select_input',isClick?'select_input_select':'']" ref="select-input">
				<view style="display: inline-flex;width: 100%;">
					<view class="jiahao" v-if="jiahao == 1">
						<u-icon name="plus" color="#ffffff"></u-icon>
					</view>
					<view class="input_info" @click.stop="openSelect" v-if="!readonly">
						<input @click="openSelect" placeholder-style="font-size: 14px;color: #a0a9b0;" :focus="isClick"
							@input="selectData" :value="selLabel" type="text" :readonly="readonly" :disabled="readonly"
							autocomplete="off" :placeholder="placeholder" class="text_tips">
					</view>
					<view class="input_info" @click.stop="openSelect" v-else>
						<view class="text_tips">
							{{selLabel}}
						</view>
						<!--<view v-if="!selLabel">{{Placeholders}}</view>-->
					</view>
				</view>
				<view class="icon_arrow" @click.stop="openSelect">
					<u-icon name="arrow-down"
						v-if="(!value&&!clearable) || (value&&!clearable) || (!value&&clearable) && !filterable"
						:class="['arrow',show?'arrow_down':'arrow_up']"></u-icon>
				</view>
			</view>

			<uni-transition class="DH_wrap" :mode-class="['fade', 'zoom-in']" :styles="{'height':Height}" :show="show">
				<view class="select_modal_con show-more" v-if="show" @touchmove.stop.prevent="() => {}">
					<scroll-view scroll-y="true" class="select_modal select_modal_scroll" :style="{height:Height}">

						<view class="sousuo_box" v-if="isSouSuo" :class="input_border1 == 1?'input_border':''">
							<u-input height="65" v-model="keyword" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="text" :border="false" :placeholder="$t('NewlyAdded.Search')" :custom-style="customStyle" :placeholder-style="placeholderStyle" :clearable="false" />
						</view>

						<view class="select_content" ref="select_content">
							<view v-for="(item, index) in showData" :key="index" class="select_content_li" :class="{'selected': Jujiao && value == item[valueType.value]}" @click="change(item)">
								<text>{{item[valueType.label]}}</text>
								<view v-if="Jujiao && value == item[valueType.value]" class="xzhong"></view>
							</view>
							<view class="select_content_li" v-if="!showData.length">{{noDataText}}</view>
						</view>
					</scroll-view>
				</view>
			</uni-transition>



		</view>
	</view>

</template>

<script>
	export default {
		props: {
			indexs: {
				type: Number,
				default: 0
			},
			isSouSuo: {
				type: Boolean,
				default: false
			},
			Height: {
				type: String,
				default: 'auto'
			},
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
						value: 'value'
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
				Jujiao: true,
				input_border1: 0,
				keyword: '',
				placeholderStyle: "color: #8e99a2;fontSize: 26rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},

				show: false,
				readonly: true,
				isClick: false,
				totalArr: [],
				showData: [],
				showDataNew: [],
				selLabel: '',
				Placeholders: '',
				isShow: false,
				isClick: false,


			}
		},
		watch: {
			'placeholder': {
				immediate: true,
				deep: true,
				handler(newval) {
					this.selLabel = newval
				}
			},
			'filterable': {
				immediate: true,
				deep: true,
				handler(news) {
					this.readonly = !news
				}
			},
			'data': {
				immediate: true,
				deep: true,
				handler(news) {
					this.showData = news
					this.totalArr = news
				}
			},
			'value': {
				immediate: true,
				deep: true,
				handler(news) {
					////console.log(news, 'value', this.data, this.valueType.value)
					setTimeout(() => {
						if (news) {
							let index = this.data.findIndex(ite => ite[this.valueType.value] == news)
							if (index == -1) {
								//uni.showToast({
								//	title: '传入的value不存在',
								//	icon: 'none',
								//	duration: 1500
								//})
							} else {
								this.selLabel = this.data[index][this.valueType.label]
							}
						}
					}, 500)
				}
			},
			closeSelect: {
				immediate: true,
				deep: true,
				handler(news) {
					this.show = news
				}
			}
		},
		created() {

		},
		methods: {
			input1(key) {
				let that = this
				if (!key) {
					//输入框不存在文字清空了
					that.showData = that.totalArr
				} else {
					//进行模糊搜索
					let newList = [];
					that.totalArr.filter(item => {
						if (item.bankName.indexOf(key) !== -1) {
							newList.push(item)
						}
					})
					that.showData = newList
				}
			},
			inputBlur1() {
				this.input_border1 = 0
				this.Jujiao = true
			},
			inputfocus1() {
				this.input_border1 = 1
				this.Jujiao = false
			},





			openSelect() {
				this.show = !this.show
				this.$emit("update:closeSelect", this.show)
				this.isClick = !this.isClick
			},
			change(item) {
				if (this.value != item[this.valueType]) {
					this.$emit('input', item[this.valueType.value])
					this.$emit('change', item[this.valueType.value])
					this.$emit('Lowchange', item,this.indexs)
				}
				this.selLabel = item[this.valueType.label]
				this.show = false
				this.$emit("update:closeSelect", this.show)
				this.isClick = false
				this.showData = this.data
				this.keyword = ''
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
	.DH_wrap {
		width: 100%;
		position: absolute;
		top: 40px;
		left: 0;
		z-index: 101;
	}
	.sousuo_box {
		width: 93.5%;
		margin: 13.5px auto 4rpx;
		background-color: $all-secondary-color;
		border: 1px solid #2a3546;
		border-radius: 10px;
		padding: 8rpx 16rpx;
	}

	.jiahao {
		margin-right: 10rpx;
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
			position: relative;
			z-index: 100;
			-webkit-appearance: none;
			background-color: transparent;
			background-image: none;
			box-sizing: border-box;
			color: #606266;
			display: inline-block;
			height: 50px;
			line-height: 50px;
			outline: none;
			box-sizing: border-box;
			transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
			width: 100%;
			padding: 0 15px;

			.input_info {
				font-size: 26rpx;
				width: 100%;
				height: 100%;

				.text_tips {
					height: 100%;
					color: $font-all-color;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					padding-right: 30rpx;

					text {
						font-size: 26rpx;
						color: $font-all-color;
					}
				}
			}

			.icon_arrow {
				position: absolute;
				width: 30px;
				right: 7px;
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
		top: 20px;
		//left: -3rpx;
		border-radius: 10px;
		background-color: $select-drop-down-bg-color;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		//margin-top: 12px;

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
		height: 200px;
		max-height: 200px;

		.select_content {
			width: 100%;
			list-style: none;
			padding: 14px;
			margin: 0;
			box-sizing: border-box;

			.xzhong {
				// position: relative;
				// right: 4rpx;
				// width: 18rpx;
				// height: 18rpx;
				// background-color: #3c85ff;
				// border-radius: 200rpx;
				// box-shadow: 0 0 10px #3c85ff;
			}

			.select_content_li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 26rpx;
				padding: 0 12px;
				position: relative;
				//white-space: nowrap;
				//overflow: hidden;
				//text-overflow: ellipsis;
				color: $me-text-color;
				height: 40px;
				line-height: 40px;
				box-sizing: border-box;
				cursor: pointer;

				text {
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					padding-right: 8px;
					flex: 1;
				}

				&.selected {
					color: #fbffff;
					border-radius: 10px;
					background-color: $select-drop-down-xz-color;
				}
			}
		}



	}

	.select_modal_scroll {
		height: auto;
	}
</style>