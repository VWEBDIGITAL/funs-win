<template>
	<view :style="theme">

		<u-popup v-model="RegiserShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="RegiserShow = false">
				<view>{{$t('hdsq')}}</view>
			</view>
			<view class="input_box">
				
				
				<view class="input_item" v-for="(item,index) in lists" :key="index">
					<view class="input_item_title">{{item.title}}</view>
					
					<view class="input_item_true_cus" v-if="item.type == 2">
						<view>
							<cus-selects :closeSelect.sync='close' :data="values(item.options,index)" v-model="value" :indexs="index" @Lowchange='change' :valueType="alias" Height="100px"></cus-selects>
						</view>
					</view>
					<view class="input_item_true" v-if="item.type == 1">
						<view style="padding: 0 20rpx;">
							<u-input v-model="item.valText" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" :placeholder="item.tip" :clearable="false" />
						</view>
					</view>
					
				</view>
				
				<!-- <view class="input_item">
					<view class="input_item_title">自定义标题(输入)</view>
					<view class="input_item_true" :class="input_border1 == 1?'input_border':''">
						<u-input v-model="Address" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
					</view>
				</view> -->
				<!-- <view class="Agreement">
					<view>
						<u-icon name="info-circle-fill"></u-icon> 可以写申请说明之类的
					</view>
				</view> -->
				<view class="Register_btn">
					<u-button type="primary" :disabled="isDisabledTwo" @click="Baocun()">{{$t('ResetPopup.popupbtn')}}</u-button>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	export default {
		name: "Application-Activities",
		props: {
			lists: {
				type: Array,
				default: []
			},
			acid: {
				type: [String,Number],
				default: 0
			}
		},
		components: {
			cusSelects
		},
		data() {
			return {
				input_border1: 0,
				Address: '',
				isDisabledTwo: false,
				RegiserShow: false,
				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},

				networrkType: 1,
				value: '0',
				selectList: [],
				alias: { //别名来代指一下
					label: 'title',
					value: 'id'
				},
				close: false


			};
		},
		watch: {

		},
		computed: {

		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			values(data,idx){
				let that = this
				let newList = []
				data.forEach((item, index) => {
					newList.push({
						id: index,
						title: item
					})
				});
				//that.lists[idx].valText = newList[0].title
				return newList
			},
			input1(e){
				if(!e){
					//this.isDisabledTwo = true
				}else {
					//this.isDisabledTwo = false
				}
			},
			inputBlur1(e){
				this.input_border1 = 0
				//this.isDisabledTwo = true
				// let screeningStr = /[\W]/g; //想禁止什么类型，在这里替换正则就可以了
				// if(screeningStr.test(e)){
				// 	this.$u.toast(this.$t('DiZhiWuXiao'));
				// 	this.$nextTick(() => {
				// 		this.Address = '';
				// 	});
				// 	this.isDisabledTwo = true
				// } else {
				// 	this.$nextTick(() => {
				// 		this.Address = e;
				// 	});
				// }
			},
			inputfocus1(){
				this.input_border1 = 1
			},
			change(e,idx) {
				let that = this
				console.log('这里返回的是value值',e,idx) //这里返回的是value值
				that.lists[idx].valText = e.title
			},
			openPopup() {
				this.RegiserShow = true
			},
			closewindows() {
				this.RegiserShow = false
			},
			Baocun(){
				let that = this
				
				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')
				
				console.log('地方释放1',that.lists)
				
				let isnewList = []
				that.lists.forEach((item, index) => {
					isnewList.push({
						ask: item.title,
						answer: item.valText
					})
				});
				
				//找出空的没有填写的让他填写完
				let noAnswer = 1//0是没有选择或者填写 1是已选择或所有输入框已填写完毕
				isnewList.forEach((items, indexs) => {
					if(items.answer == ""){
						noAnswer = 0
					}
				});
				
				console.log('地方释放2',isnewList)
				console.log('所有是否选择或填写完',noAnswer)
				
				if(noAnswer == 0){
					uni.showToast({
						title: this.$t('qtxsywt'),
						icon: 'none',
						duration: 3000
					})
				} else {
					that.$u.post('/apply/activity', {
						id: that.acid,
						answer: isnewList,
						
						deviceId: serialNo,
						deviceType: machineName || ua
						
					}).then(res => {
						
						that.$emit('zhidiBottom')
						that.$emit('GetAcList')
						that.RegiserShow = false
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.to_SignIn {
		background-color: $all-secondary-color;
		text-align: center;
		height: 83rpx;
		line-height: 83rpx;
		color: $font-all-color;
		font-size: 24rpx;
	}

	.input_box {
		padding: 30rpx;

		.input_item {
			margin-bottom: 30rpx;
			
			/deep/ .select_modal_scroll {
				height: auto;
			}
			
			.input_item_true_cus {
				/deep/ .DH_wrap {
					position: initial !important;
				}
				/deep/.select_modal_con{
					position: relative !important;
					top: 4px !important;
				}
				/deep/ .select_wrap_box .select_mask_wrap {
					position: initial !important;
				}
			}

			.input_item_title {
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-size: 28rpx;
			}

			.input_item_true {
				background-color: $all-secondary-color;
				border: 1px solid $input-border-color;
				border-radius: 10px;
				padding: 6px 0;
			}
		}

		.Agreement {
			margin-top: 20rpx;
			font-size: 24rpx;
			color: $font-all-color;

			.u-icon {
				margin-right: 10rpx;
			}
		}

		.Register_btn {
			width: 100%;
			margin: 40rpx auto 0;
			/deep/ uni-button {
				background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57) !important;
				box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30 !important;
			}
		}
	}

	.reg_title {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			font-size: 30rpx;
			color: $all-secondary-text-color;
			//font-weight: bold;
		}
	}
</style>