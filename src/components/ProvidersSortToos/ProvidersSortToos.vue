<template>
	<view :style="theme" class="page_wrap">
		<view class="content_wrap">
			<view class="Providers_toosl">
				<view class="Providers_box">
					<yealuo-select value="" :binData="VendorsList" @getBackVal="getBackVal"></yealuo-select>
				</view>
				<view class="Providers_box2">
					<cus-selects :Height="'100px'" :closeSelect.sync='close2' :placeholder="placeholderS" :data="PopularList" v-model="value2" @change='change2' :valueType="alias2"></cus-selects>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		name: "ProvidersSortToos",
		props: {
			VendorsList: {
				type: Array,
				default: []
			}
		},
		components: {
			cusSelects
		},
		data() {
			return {
				value: '',
				selectList: [],
				alias: { //别名来代指一下
					label: 'name',
					value: 'id'
				},
				close: false,

				value2: '1',
				//排序方式 1.热门 2.A-Z 3.Z-A
				selectList2: [],
				alias2: { //别名来代指一下
					label: 'name',
					value: 'id'
				},
				close2: false

			};
		},
		computed: {
			placeholderS(){
				let Popular = this.$t('Popular')
				////console.log('大是大非',Popular)
				return Popular
			},
			PopularList() {
				let arry = [{
					id: 1,
					name: this.$t('Popular')
				}, {
					id: 2,
					name: 'A-Z'
				}, {
					id: 3,
					name: 'Z-A'
				}]
				return arry
			}
		},
		methods: {
			change(e) {
				////console.log(e) //这里返回的是value值
				this.$emit('ProselectPro', e)
			},
			//选中值传（值可自定义，初始id与value用|分割，根据实际用途定义）
			getBackVal: function(e) {
				this.$emit('ProselectPro', e)
			},
			change2(e) {
				////console.log(e) //这里返回的是value值
				this.$emit('selectPopular', e)
			},
		}

	}
</script>

<style lang="scss">
	.content_wrap {
		//background-color: #0d131c !important;
	}
	.page_wrap {
		padding: 14rpx 20rpx 0 20rpx;
		z-index: 1;
	}

	.Providers_toosl {
		margin: 0 0 0 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.Providers_box {
			flex: 1;
			//width: 348rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			//background-color: #1d2532;
			border-radius: 8px;
			padding: 30rpx 0 30rpx 0;
			height: 78.47rpx;
			line-height: 78.47rpx;

			/*view {
				width: 100%;
				color: #FEFEFE;
				//font-weight: bold;
			}
			image {
				width: 10rpx;
				height: 20rpx;
				transform: rotate(180deg);
			}*/
			/deep/ .select_wrap_box {
				width: 100%;
			}

			/deep/ .select_input {
				padding: 0 12px !important;
			}
		}

		.Providers_box2 {
			margin-left: 18rpx;
			width: 258rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			
			border-radius: 8px;
			padding: 30rpx 0 30rpx 0;
			height: 78.47rpx;
			line-height: 78.47rpx;

			/*view {
				width: 100%;
				color: #FEFEFE;
				//font-weight: bold;
			}
			image {
				width: 10rpx;
				height: 20rpx;
				transform: rotate(180deg);
			}*/
			/deep/ .select_wrap_box {
				width: 100%;
			}

			/deep/ .select_input {
				padding: 0 12px !important;
			}
		}

		.col_box {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			view {
				border-radius: 12rpx;
				width: 100%;
				background-color: #1d2532;
				height: 78.47rpx;
				line-height: 78.47rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;

				image {
					width: 25rpx;
				}
			}
		}
	}
</style>