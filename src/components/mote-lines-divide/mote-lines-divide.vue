<template>
	<view :style="theme">
		<view style="position: relative" v-if="isHide">
			<view class="dt-content" :style="'-webkit-line-clamp:'+line">
				<text class="content">
					<slot>{{ dt ? dt : '' }}</slot>
				</text>
			</view>
			<view class="button-show" @click="quanbu()"> <!-- v-if="enableButton&&lines>line" -->
				<text style="color: #3574d9">{{ expandText }}</text>
			</view>
		</view>
		<view v-else>
			<view>
				<text class="content">
					<slot>{{ dt ? dt : '' }}</slot>
				</text>
			</view>
			<view class="fold-hint" v-if="foldHint">
				<view @click="yincang()">
					{{ foldHint }}
				</view>
			</view>
		</view>
		<view>
			<text class="placeholder">
				{{ placeholder }}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 是否隐藏多余行。初始状态不隐藏
				isHide: true,
				// 全量所占文本高度
				textHeight: 0,
				// 单行文本所占高度
				lineHeight: 1,
				// 占位文本
				placeholder: '占位'
			};
		},
		props: {
			itiemid: {
				type: [Number, String],
				default: 0
			},
			// 展示多少行
			line: {
				type: [Number, String],
				default: 1
			},
			// 文本
			dt: {
				type: [String],
				default: ''
			},
			enableButton: {
				type: Boolean,
				default: true
			},
			// 自定义展开提示
			expandText: {
				type: String,
				default: "展开"
			},
			// 自定义收起提示
			foldHint: {
				type: String,
				default: "收起"
			}
		},

		watch: {
			dt() {
				let that = this
				setTimeout(() => {
					let query = uni.createSelectorQuery().in(that);
					// 获取所有文本在html中的高度
					query.select('.content').boundingClientRect(data => {
						that.textHeight = data.height
					}).exec();
				}, 100)
			}
		},

		mounted() {
			if (this.enableButton) {
				let query = uni.createSelectorQuery().in(this);
				// 获取所有文本在html中的高度
				query.select('.content').boundingClientRect(data => {
					this.textHeight = data.height
				}).exec();

				// 通过占位元素获取单行文本的高度
				query.select('.placeholder').boundingClientRect(data => {
					this.lineHeight = data.height
				}).exec();
			}
			// 获取单行文本高度后，置空占位元素，使其释放占位
			this.placeholder = ''
		},
		computed: {
			// 全文本所占总行数
			lines() {
				if (!this.enableButton) {
					return this.line
				}
				return Math.floor(this.textHeight > 0 && this.lineHeight > 0 ? this.textHeight / this.lineHeight : 0)
			}
		},
		methods: {
			quanbu(){
				this.isHide = false
				this.$emit('change', this.itiemid)
			},
			yincang(){
				this.isHide = true
			}
		}
	}
</script>

<style scoped>
	.dt-content {
		overflow: hidden;
		text-overflow: clip;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.button-show {
		/* width: 70rpx; */
		/* position: absolute; */
		right: 0;
		bottom: 0;
		z-index: 0;
		text-align: right;
		background-image: linear-gradient(-180deg, $all-secondary-color 50%, $all-secondary-color 80%);
		padding-top: 1rem;
	}

	.fold-hint {
		color: #3574d9;
		text-align: right
	}
</style>