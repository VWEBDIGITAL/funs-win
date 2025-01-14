<template>
	<view>
		<view :style="theme" class="code-area">
			<view class="flex-box">
				<input :value="val" type="number" :maxlength="maxlength" class="hide-input" @input="getVal" @blur="isblur" @focus="isfocus" />
				<view v-bind:class="['item', { active: codeIndex == 1 && shanshuo }]">
					<view class="line"></view>
					<block v-if="isPwd && codeArr.length >= 1">
						<text class="dot"></text>
					</block>
					<block v-else> {{ codeArr[0] ? codeArr[0] : ''}}</block>
				</view>
				<view v-bind:class="['item', { active: codeIndex == 2 && shanshuo }]">
					<view class="line"></view>
					<block v-if="isPwd && codeArr.length >= 2">
						<text class="dot"></text>
					</block>
					<block v-else> {{ codeArr[1] ? codeArr[1] : ''}}</block>
				</view>
				<view v-bind:class="['item', { active: codeIndex == 3 && shanshuo }]">
					<view class="line"></view>
					<block v-if="isPwd && codeArr.length >= 3">
						<text class="dot"></text>
					</block>
					<block v-else> {{ codeArr[2] ? codeArr[2] : ''}}</block>
				</view>
				<view v-bind:class="['item', { active: codeIndex == 4 && shanshuo }]">
					<view class="line"></view>
					<block v-if="isPwd && codeArr.length >= 4">
						<text class="dot"></text>
					</block>
					<block v-else> {{ codeArr[3] ? codeArr[3] : ''}}</block>
				</view>
				<block v-if="maxlength === 6">
					<view v-bind:class="['item', { active: codeIndex == 5 && shanshuo }]">
						<view class="line"></view>
						<block v-if="isPwd && codeArr.length >= 5">
							<text class="dot"></text>
						</block>
						<block v-else> {{ codeArr[4] ? codeArr[4] : ''}}</block>
					</view>
					<view v-bind:class="['item', { active: codeIndex == 6 && shanshuo }]">
						<view class="line"></view>
						<block v-if="isPwd && codeArr.length >= 6">
							<text class="dot"></text>
						</block>
						<block v-else> {{ codeArr[5] ? codeArr[5] : ''}}</block>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"My-Password-Code",
		props: {
			//最大长度 值为4或者6
			maxlength: {
				type: Number,
				default: 4
			},
			//是否是密码
			isPwd: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				shanshuo: false,
				codeIndex: 1, //下标
				codeArr: [],
				val: '', //输入框的值
			};
		},
		methods: {
			//取值
			getVal(e) {
				let {value} = e.detail;
				this.val = value;
				// //console.log('验证码:', value);
				let arr = value.split('');
				this.codeIndex = arr.length + 1;
				this.codeArr = arr;
				// //console.log(this.codeIndex, this.pwdArr);
				if (this.codeIndex > Number(this.maxlength)) {
					//输入完成
					this.$emit('finish', this.codeArr.join(''));
				}
			},
			//清除验证码或者密码
			clear() {
				this.codeIndex = 1;
				this.codeArr = [];
				this.val = "";
			},
			isfocus(e){
				////console.log('聚焦了',e.target.value)
				this.shanshuo = true;
			},
			isblur(e){
				////console.log('离开聚焦', e.target.cursor)
				this.shanshuo = false;
			},
		}
	}
</script>

<style lang="scss">
	.code-area {
		text-align: center;
		margin-top: 35rpx;
		padding: 0 4rpx;

		.flex-box {
			display: flex;
			flex-wrap: wrap;
			position: relative;
			justify-content: space-between;
		}

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			width: 80rpx;
			height: 80rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: $code-area-font;
			line-height: 80rpx;
			box-sizing: border-box;
			border: 4rpx solid $code-area-border;
			background-color: $code-area-bgcolo;
			border-radius: 14rpx;
		}

		.item:last-child {
			margin-right: 0;
		}

		.active {
			border-color: #2979ff;
		}

		.active .line {
			display: block;
		}

		.line {
			display: none;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 2rpx;
			height: 40rpx;
			background: #2979ff;
			animation: twinkling 1s infinite ease;
		}

		.hide-input {
			position: absolute;
			top: 0;
			left: -100%;
			width: 200%;
			height: 100%;
			text-align: left;
			z-index: 9;
			opacity: 1;
		}

		@keyframes twinkling {
			0% {
				opacity: 0.2;
			}

			50% {
				opacity: 0.5;
			}

			100% {
				opacity: 0.2;
			}
		}

		.dot {
			display: inline-block;
			width: 20rpx;
			height: 20rpx;
			background-color: #2f3646;
			border-radius: 200rpx;
		}
	}
</style>