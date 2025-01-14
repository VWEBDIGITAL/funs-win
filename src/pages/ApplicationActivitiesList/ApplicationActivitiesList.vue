<template>
	<view :style="theme" class="page_boxs">

		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('tsjl')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->

			<pagesNavTitle ref="" :title="$t('tsjl')"></pagesNavTitle>


			<view class="page_wrap">

				<!-- <view class="type_box">
					<view>
						<cus-selects :closeSelect.sync='close' :data="selectList" v-model="value" :indexs="0" @Lowchange='change' :valueType="alias"></cus-selects>
					</view>
				</view> -->

				<view class="list_wrap">
					<view class="list_item" v-for="(item,index) in TSactivityList" :key="index">
						<view class="list_item_title">
							<view>{{item.title}}</view>
							<view class="lvse">{{(item.amount/100).toFixed(2)}}</view>
						</view>
						<view class="item_time" style="margin: 20rpx 0 0 0;">
							<view class="time_name">{{item.date}}</view>
							
							<!--//状态0、申请未处理 1、拒绝 2、通过未领奖 3、已领奖-->
							
							<view class="status_text" v-if="item.status == 3">{{$t('VIPPage.BonusStatus2')}}<u-icon name="checkmark-circle-fill" color="#ff9800"></u-icon></view>
							
							<view class="status_text huise" v-else-if="item.status == 0">{{$t('NEWBonusPageA.BluePrompt')}}<u-icon name="close-circle-fill"></u-icon></view>
							<view class="status_text huise" v-else-if="item.status == 1">{{$t('jjsq')}}<u-icon name="close-circle-fill"></u-icon></view>
							<view class="status_text huise" v-else-if="item.status == 2">{{$t('tgwqj')}}<u-icon name="close-circle-fill"></u-icon></view>
							
						</view>
					</view>
				</view>

			</view>

		<!-- </uni-transition> -->
	</view>
</template>

<script>
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		components: {
			cusSelects
		},
		data() {
			return {
				TSactivityList: [],
				showOptions: true,
				
				value: '1',
				selectList: [ //根据自己需求获得的下拉数据，如果数据不是{label:'',value:''}结构的就需要起一个别名来代指一下，就需要valueType
					{
						id: 1,
						title: '全部',
					},
					{
						id: 2,
						title: '已完成',
					},
					{
						id: 3,
						title: '已完成',
					}
				],
				alias: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close: false
				
				
			}
		},
		onLoad() {
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				
			} else {
				this.getTeshuJiangi()
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		methods: {
			getTeshuJiangi(){
				let that = this
				that.$u.post('/apply/activity/record', {
					type: 2//{"type":1} 表示只查申请中和可领取，{"type":2} 查全部记录
				}).then(res => {
					console.log('特殊奖金列表',res.data)
					that.TSactivityList = res.data
				})
			},
			
			change(e,idx) {
				let that = this
				console.log('这里返回的是value值',e,idx)
			},
			
			copy(text) {
				let that = this
				uni.setClipboardData({
					data: text, // 设置要复制的文本内容
					showToast: false,
					success(res) {
						////console.log("成功复制到剪贴板");
						uni.showToast({
							title:  that.$t('Betting requirements.register7'),
							icon: 'none',
							duration: 3000
						})
					},
					fail(err) {
						console.error("复制失败", err);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.page_wrap {
		padding: 20rpx 20rpx;
		height: 100%;
		background-color: $body-bg-color !important;
	}

	.list_wrap {
		.list_item {
			background-color: $all-secondary-color;
			padding: 24rpx;
			border-radius: 12rpx;
			margin-bottom: 20rpx;

			.list_item_title {
				display: flex;
				align-items: center;
				justify-content: space-between;

				view:nth-child(1) {
					flex: 1;
					color: $hot-jiangli-font-color;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					font-weight: bold;
					font-size: 32rpx;
				}

				view:nth-child(2) {
					color: $font-all-color;
					font-size: 32rpx;
				}

				.lvse {
					color: #1db83e !important;
				}
			}

			.item_time {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.time_name {
					color: $font-all-color;
					flex: 1;
				}
				
				.status_text {
					color: #ff9800;
					font-size: 28rpx;
					display: flex;
					align-items: center;
				}
				
				.huise {
					color: $font-all-color !important;
				}

				.time_type {
					width: 200rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					color: $font-all-color;

					view:nth-child(1) {
						flex: 1;
						text-align: left;
					}

					view:nth-child(2) {
						text-align: right;
						//font-weight: bold;
					}


				}
			}
		}
	}

	.type_box {
		display: flex;
		align-items: center;

		.type_box_item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: $all-secondary-color;
			padding: 24rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;

			view {
				color: $font-all-color;
				//font-weight: bold;
			}

			image {
				width: 30rpx;
				height: 30rpx;
				transform: rotate(180deg);
			}

			.tabrgd {
				transform: rotate(270deg);
			}
		}

		.marginl {
			//margin-right: 10rpx;
		}

		.marginr {
			margin-left: 10rpx;
		}
	}
</style>