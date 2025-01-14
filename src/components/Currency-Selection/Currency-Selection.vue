<template :style="theme">
	<view class="select_wrap_box">
		<view class="select_mask_wrap" @touchmove.stop.prevent="toMoveHandle" @click.stop="openSelect" v-if="isClick">
		</view>

		<view class="select_wrap">
			<view :class="['select_input7788',isClick?'select_input_select':'']" ref="select-input">
				<view style="display: inline-flex;width: 100%;">
					<view class="input_info" @click.stop="openSelect">
						<image :src="TypeIcon || defaultIcon"></image>
						<view class="text_tips">
							<view class="text_tips_item">
								<view>{{$t('bizhong')}}</view>
								<view>{{selLabel || selLabels}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="icon_arrow" @click.stop="openSelect">
					<u-icon name="arrow-down" :class="['arrow',show?'arrow_down':'arrow_up']"></u-icon>
				</view>
			</view>

			<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'179px','position':'absolute','top':'50px','left':'0','z-index':'101'}" :show="show">
				<view class="select_modal_con show-more" v-if="show" @touchmove.stop.prevent="() => {}">
					<scroll-view scroll-y="true" class="select_modal select_modal_scroll" :style="{height:'auto'}">

						<view class="select_content" ref="select_content">
							<view v-for="(item, index) in showDatas" :key="index" class="select_content_li" :class="{'selected': CRvalue == item.index}" @click="change(item)">
								<image :src="item.icon"></image>
								<view>{{item.title}}</view>
							</view>
							<view class="select_content_li" v-if="!showDatas.length">{{noDataText}}</view>
						</view>

					</scroll-view>
				</view>
			</uni-transition>



		</view>
	</view>

</template>

<script>
	export default {
		name: "Currency-Selection",
		props: {
			// showData: {
			// 	type: Array,
			// 	default: []
			// },
			noDataText: {
				type: String,
				default: 'No Data'
			},
			selLabels: {
				type: String,
				default:'Please Select...'
			},
			defaultIcon: {
				type: String,
				default: '/static/image/currency_coins.png'
			},
		},
		data() {
			return {
				show: false,
				isClick: false,
				selLabel: '',
				CRvalue: 0,
				TypeIcon: '',
				showDatas: []
			}
		},
		created() {

		},
		mounted() {

		},
		computed: {
			
		},
		methods: {
			getdata(data){
				this.showDatas = data.arry
				this.selLabel = data.selLabels
				this.CRvalue = 0
				this.TypeIcon = data.defaultIcon
			},
			init(val, icon) {
				this.CRvalue = 0
				this.selLabel = val
				this.TypeIcon = icon
			},
			openSelect() {
				this.show = !this.show
				this.isClick = !this.isClick
			},
			change(item) {
				this.CRvalue = item.index
				this.TypeIcon = item.icon
				this.$emit('Lowchange', item)
				this.selLabel = item.title
				this.show = false
				this.isClick = false
			},
			toMoveHandle() {

			}
		},






	}
</script>

<style lang="scss" scoped>
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

		.select_input7788 {
			position: relative;
			z-index: 100;
			color: #606266;
			display: inline-block;
			
			height: 55px;
			line-height: 55px;
			
			width: 100%;
			padding: 0 12px;

			.input_info {
				font-size: 26rpx;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-start;

				image {
					width: 30px;
					height: 30px;
				}

				.text_tips {
					height: 100%;
					color: $font-all-color;
					padding-right: 30rpx;
					height: 55px;
					display: flex;
					align-items: center;
					padding-left: 20rpx;
					.text_tips_item {
						line-height: initial !important;
						view:nth-child(1) {
							font-size: 24rpx;
							color: $font-all-color;
							word-break:break-all;
							display:-webkit-box;
							-webkit-line-clamp:1;
							-webkit-box-orient:vertical;
							overflow:hidden;
						}
						view:nth-child(2) {
							font-size: 26rpx;
							color: $all-secondary-text-color;
							font-weight: bold;
						}
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
		//border: 1px solid $all-secondary-color;
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
		height: 250px;
		max-height: 250px;
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
				justify-content: flex-start;
				font-size: 26rpx;
				padding: 0 12px;
				position: relative;
				color: $me-text-color;
				height: 40px;
				line-height: 40px;
				box-sizing: border-box;
				cursor: pointer;

				image {
					width: 44rpx;
					height: 44rpx;
					border-radius: 200rpx;
					margin-right: 15rpx;
				}

				&.selected {
					color: #fbffff;
					border-radius: 10px;
					//border: 1px solid #3c85ff;
					background-color: $select-drop-down-xz-color;
				}
			}
		}



	}

	.select_modal_scroll {
		height: auto;
	}
</style>