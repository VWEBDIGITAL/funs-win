<template>
	<view :style="theme" class="page_boxs">
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('ManageAccountPage.title')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		

		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->

			<pagesNavTitle ref="" :title="$t('ManageAccountPage.title')"></pagesNavTitle>

			<view class="page_wrap" :style="{height:windowHeight+'px'}" @click.stop.prevent="onClickContent">

				<!-- <view class="type_box">
					<view class="type_box_item">
						<image class="line_icon" :src="payIconUrl + '/pay/' + Addtype + '.png'"></image>
						<easy-select ref="easySelect" :options="opTions" :value="selecValue" @selectOne="selectOne"></easy-select>
					</view>
				</view> -->

				<view class="list_title">
					<view>{{$t('WDAccount')}} ({{dataList.length}})</view>
					<image class="yjing1" v-if="hiddenEye == true" src="/static/image/hidden_eye.png" @click="hidden_eye()"></image>
					<image class="yjing2" v-else src="/static/image/yanjing.png" mode="widthFix" @click="hidden_eye()"></image>
				</view>
				<view class="list_wrap">
					<view class="t-wrap" v-if="dataList.length != 0">
						<t-slide ref="slide" @edit="edit" @del="del" @itemClick="itemClick" @openHuiseDel="openHuiseDel" @hideHuiseDel="hideHuiseDel">
							<template v-slot:default="{item,index}">
								<view class="t-conten">
									
									<image class="image" :src="payIconUrl + '/pay/' + item.method + '.png'"></image>
									
									<view class="hanggao_box">
										<view class="bankName" v-if="item.method == 5 || item.method == 10 || item.method == 11 || item.method == 15 || item.method == 19 || item.method == 21 || item.method == 22">{{item.bankName}}</view>
										<view style="display: flex;align-items: center;">
											<text class="t-conten-text" v-if="item.method == 2">PIX</text>
											<text class="t-conten-text" v-if="item.method == 1">USDT</text>
											
											<text class="t-conten-text" v-if="item.method == 18">{{item.realName}}</text>
											
											<text class="t-conten-text" v-if="item.method == 3">({{item.realName}})</text>
											<text class="t-conten-text" v-if="item.method == 4">({{item.realName}})</text>
											
											<text class="t-conten-text" v-if="item.method == 5">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 6">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 7">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 8">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 9">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 10">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 11">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 15">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 19">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 21">{{item.realName}}</text>
											<text class="t-conten-text" v-if="item.method == 22">{{item.realName}}</text>
											
											<block v-if="hiddenEye == true">
												<text class="t-conten-text2" v-if="item.account">{{item.account | testuserName}}</text>
												<text class="t-conten-text2" v-if="item.phoneNum">{{item.phoneNum | testuserName}}</text>
											</block>
											<block v-else>
												<text class="t-conten-text2" v-if="item.account">{{item.account}}</text>
												<text class="t-conten-text2" v-if="item.phoneNum">{{item.phoneNum}}</text>
											</block>
										</view>
									</view>
									
									
									<!-- <view class="del_icon" v-if="!guanbiHUisedel && curindex == index">
									
									</view>
									<view class="del_icon" v-else>
										<u-icon name="trash-fill" color="#7c87a7" size="34"></u-icon>
									</view> -->
									
								</view>
							</template>
						</t-slide>
					</view>
					<view class="Data_null" v-else style="margin-bottom: 100rpx;">
						<image src="/static/image/NoOrders.png" mode="widthFix"></image>
						<view>No Datas</view>
					</view>
					<!-- <view class="type_box" @click="OpenAddac()">
						<view class="type_box_item22" style="justify-content: center;">
							<view><u-icon name="plus-circle"></u-icon></view>
							<view style="font-weight: initial;">{{$t('ManageAccountPage.AddAccound')}}</view>
						</view>
					</view> -->
				</view>
				
				
				
				<!-- 开箱即用 -->
				<you-touchbox ref="touchBox" :customSafeArea="{h5Top: ish5Top}" :disable="isTouchDisable" @get-end-detail="getEndDetail">
					<view style="padding: 0 30rpx;display: flex;flex-direction: column;height: 100%;" @click.stop>
						<scroll-view :scroll-y="isScrollY" style="flex: 1;height:1px;">
							<view class="floor-one">
								<view v-for="(item,index) in hotThemeListData" class="floor-item" :key="index" @click="onClickHotTea(item)">
									<view class="mask-box">
										<view class="text-box" @click="OpenAddac(item.value)">
											<view class="title">
												<image class="line_icon" :src="payIconUrl + '/pay/' + item.value + '.png'"></image>
												<span>{{item.label}}</span>
											</view>
											<view class="subtitle">{{$t('ManageAccountPage.AddAccound')}}<span>({{JisuNum(item,dataList)}}/3)</span></view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
						<view style="height: 20px;"></view>
					</view>
				</you-touchbox>
				
				
				
				
			</view>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			

		<!-- </uni-transition> -->

		<Addaccount ref="openAddac" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></Addaccount>
		
		<Addaccount-MAYA ref="openAddmaya" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></Addaccount-MAYA>

		<Addaccount-USDT ref="openUsdt" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></Addaccount-USDT>

		<AccountDeletionPopup ref="openAd" @qudiing="Qudiing" @zhidiBottom="zhidiBottom"></AccountDeletionPopup>

		<AddAc-BANK ref="AddAcBANK" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></AddAc-BANK>
		
		<Addac-purse ref="AddacPurse" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></Addac-purse>
		
		<Addaccount-HuiWang ref="openAddhuiwang" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></Addaccount-HuiWang>
		
		<AddAc-HK-BANK ref="openAddHKBnak" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></AddAc-HK-BANK>
		
		<AddAc-HK-ZSK ref="openAddZSKBnak" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></AddAc-HK-ZSK>
		
		<Addaccount-USDC ref="openAddUSDC" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></Addaccount-USDC>
		
		<AddAc-KO-BANK ref="openAddHanYuan" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></AddAc-KO-BANK>
		
		<AddAc-JP-BANK ref="openAddRiYuan" @GetAcList="getAcList" @zhidiBottom="zhidiBottom"></AddAc-JP-BANK>
		
	</view>
</template>

<script>
	import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
	import tSlide from "@/components/t-slide/t-slide.vue"
	export default {
		components: {
			tSlide,
			cusSelects
		},
		data() {
			return {
				ish5Top: 64,
				isTouchDisable: false, // 是否禁用滑动
				windowHeight: null,
				themeUrl: 'https://s2.loli.net/2022/02/26/l9b4TRreZAXod2k.png', // 主题背景
				show: false,
				title: '',
				content: '',
				showConfrimBtn: true,
				confirmText: '',
				isScrollY: false,
				hotThemeListData: [],
				
				guanbiHUisedel: true,
				curindex: 0,
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				payIconUrl: '',
				Addtype: null,
				showOptions: true,

				value: null,
				selectList: [],
				alias: { //别名来代指一下
					label: 'methodName',
					value: 'method'
				},
				close: false,
				hiddenEye: true,

				MorenType: null,
				dataList: [],
				opTions: [],
				selecValue: '',

				DelId: null,
				
				qianbaoList: [],
				
				Laiyuan: 987

			}
		},
		filters: {
			// 加密姓名
			testuserName(value) {
				// var newStr;
				// var char = '';
				// for (var i = 0, len = value.length - 7; i < len; i++) {
				// 	char += '*';
				// }
				// newStr = value.substr(0, 0) + char + value.substr(-4);
				// return newStr;
				const start = value.slice(0, 8)
				const end = value.slice(-4)
				return `${start}******${end}`
			}
		},
		onLoad(ops) {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			const info = uni.getSystemInfoSync();
			console.log('状态栏的高度：' + info.statusBarHeight);
			that.ish5Top = 64 + info.statusBarHeight
			
			that.payIconUrl = uni.getStorageSync('Musicdomains');
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				that.getQuudao()
			}
			//判断type从提款页面来就直接显示添加对应的弹窗
			let types = ops.type
			that.Laiyuan = types
		},
		onReady() {
			let that = this
			that.windowHeight = uni.getSystemInfoSync().windowHeight
			if(that.Laiyuan != 987){
				that.OpenAddac(that.Laiyuan)
			}
		},
		onShow() {
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
			
			} else {
				uni.$emit('getgetMybalance', 1);
				uni.$emit('ZhuRulookBenDihb', 1);
			}
		},
		methods: {
			// 点击了热门茶系列
			onClickHotTea(item) {
				this.themeUrl = item.themeUrl
			},
			// 点击了页面
			onClickContent() {
				// 开关
				this.close = !this.close
				if (this.close) {
					//this.$refs.touchBox.setBottom(0)
				} else {
					//this.$refs.touchBox.setBottom(.21)
				}
			},
			getEndDetail({
				minTop,
				maxTop,
				curTop
			}) {
				// console.log(minTop, maxTop, curTop);
				if (curTop == maxTop) this.isScrollY = true
				else this.isScrollY = false
			},
			onChangeTouchDisable() {
				this.isTouchDisable = !this.isTouchDisable
				uni.showToast({
					title: this.isTouchDisable ? '已禁用滑动' : '已开启滑动',
					icon: 'none'
				})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			hidden_eye() {
				//this.hiddenEye == true?false:true
				if (this.hiddenEye == true) {
					this.hiddenEye = false
				} else {
					this.hiddenEye = true
				}
			},
			change(e) {
				//console.log(e) //这里返回的是value值
				this.Addtype = e
				this.MorenType = e
				this.getAcList()
			},
			selectOne(options) {
				//console.log(options)
				this.selecValue = options.label
				this.Addtype = options.value
				this.MorenType = options.value
				this.getAcList()
			},
			getQuudao() {
				let that = this
				that.$u.post('/withdraw/channel', {

				}).then(res => {
					console.log('渠道列表', res.data)

					let channel = res.data
					let PaymentMethod = []
					channel.forEach((item, index) => {
						item.methods.forEach((item, index) => {
							PaymentMethod.push({
								value: item.id,
								label: item.name,
								channel: item.channels
							})
						})
						// PaymentMethod.push({
						// 	value: item.method,
						// 	label: item.methodName,
						// 	channel: item.channel
						// })
					});
					console.log('渠道列表', PaymentMethod)
					that.selecValue = PaymentMethod[0].label
					that.opTions = PaymentMethod
					that.hotThemeListData = PaymentMethod
					
					//获取钱包下面的钱包类型
					let qianbao = []
					PaymentMethod.forEach((item, index) => {
						if(item.value == 10 || item.label == "钱包"){
							qianbao = item.channel
						}
					});
					//console.log('钱包类型',qianbao)
					this.qianbaoList = qianbao

					//that.selectList = res.data
					//that.value = res.data[0].method


					this.Addtype = PaymentMethod[0].value
					this.MorenType = PaymentMethod[0].value

					this.$nextTick(() => {
						this.getAcList()
					})
				})
			},
			zhidiBottom(){
				this.$refs.touchBox.setBottom(.21)//设置底部上滑为底部
			},
			getAcList() {
				let that = this
				
				that.$u.post('/withdraw/bind/query', {

				}).then(res => {
					console.log('账号列表', res)
					
					//来刷新一个任务列表显示可领取数量
					uni.$emit('RsGetTaskList', 1);
					
					let Provider = res.data
					let NewProvider = []
					Provider.forEach((item, index) => {
						//if (item.method === that.MorenType) {
							NewProvider.push({
								id: item.id,
								method: item.method,
								phoneNum: item.phoneNum || "",
								account: item.account || "",
								email: item.email || "",
								realName: item.realName || "",
								img: '/static/image/99538133.png',
								bankCode: item.bankCode,
								bankName: item.bankName
							})
						//}
					});
					//console.log(NewProvider)
					that.dataList = NewProvider
					if (NewProvider.length != 0) {
						that.$nextTick(() => {
							that.$refs.slide.assignment(that.dataList)
						})
					}
					
					//回到页面顶部
					uni.pageScrollTo({
					    scrollTop: 0,
					    duration: 200 // 动画时长，默认300ms
					});
				})
			},
			JisuNum(data,list){
				let NewProvider = []
				list.forEach((item, index) => {
					if (item.method === data.value) {
						NewProvider.push(item)
					}
				});
				return NewProvider.length
			},
			copy(text) {
				let that = this
				uni.setClipboardData({
					data: text, // 设置要复制的文本内容
					showToast: false,
					success(res) {
						//////console.log("成功复制到剪贴板");
						uni.showToast({
							title:  that.$t('Betting requirements.register7'),
							icon: 'none',
							duration: 3000
						})
					},
					fail(err) {
						//console.error("复制失败", err);
					}
				});
			},
			//点击单行
			itemClick(data,idx) {
				//console.log('点击单行', data,idx)
				this.$refs.slide.clickOpen(idx)
				this.curindex = idx
				this.guanbiHUisedel = false
			},
			hideHuiseDel(data,idx) {
				//console.log('滑动打开', data,idx)
				this.curindex = idx
				this.guanbiHUisedel = false
			},
			openHuiseDel(data,idx){
				//console.log('收起',data,idx)
				this.curindex = idx
				this.guanbiHUisedel = true
			},
			//删除
			del(data) {
				console.log('删除', data)
				//this.$refs.openAd.openPopup()
				this.DelId = data.id
				setTimeout(()=>{
					this.Qudiing()
				},200)
			},
			//编辑
			edit(data) {
				//////console.log('编辑', data)
				uni.showToast({
					title: '编辑ID--' + data.id,
					icon: 'none'
				})
			},
			Qudiing() {
				let that = this
				
				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')
				
				that.$u.post('/withdraw/bind/delete', {
					id: this.DelId,
					deviceId: serialNo,
					deviceType: machineName || ua
				}).then(res => {
					this.getAcList()
				})
			},
			OpenAddac(val) {
				this.Addtype = val
				
				if (this.Addtype == 1) {//USDT
				
					this.$refs.openUsdt.openPopup()
					
				} else if (this.Addtype == 2) {//PIX
				
					this.$refs.openAddac.openPopup()
					
				} else if (this.Addtype == 3) {//GCASH
				
					this.$refs.openAddac.openPopup()
					
				} else if (this.Addtype == 4) {//MAYA
				
					this.$refs.openAddmaya.openPopup()
					
				} else if (this.Addtype == 5) { //BNAK
				
					this.$refs.AddAcBANK.openPopup()
					
				} else if (this.Addtype == 10) { //钱包
				
					this.$refs.AddacPurse.openPopup(this.qianbaoList)
					
				} else if (this.Addtype == 11) { //汇旺钱包
				
					this.$refs.openAddhuiwang.openPopup()
					
				} else if (this.Addtype == 15) { //香港银行卡
				
					this.$refs.openAddHKBnak.openPopup()
					
				} else if (this.Addtype == 19) { //香港-轉數快
				
					this.$refs.openAddZSKBnak.openPopup()
					
				} else if (this.Addtype == 18) { //USDC
				
					this.$refs.openAddUSDC.openPopup()
					
				} else if (this.Addtype == 22) { //韩元
				
					this.$refs.openAddHanYuan.openPopup()
					
				} else if (this.Addtype == 21) { //日元
				
					this.$refs.openAddRiYuan.openPopup()
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page_wrap {
		padding: 20rpx 20rpx;
		background-color: $body-bg-color !important;
	}
	
	.bottom_list {
		.bottom_list_item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.card_type_item {
				display: flex;
				align-items: center;
				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
			.ljtj_btn {
				
			}
		}
	}

	.NoAccount {
		text-align: center;
		color: $font-all-color;
		padding: 30rpx 0;
	}

	.t-wrap {
		padding: 0 0;

		.t-conten {
			display: flex;
			flex-direction: row !important;
			height: 65px;
			padding: 0 0 0 25rpx;
			line-height: initial;
			align-items: center;
			
			.hanggao_box {
				.bankName {
					color: $all-secondary-text-color;
					font-size: 24rpx;
					font-weight: bold;
				}
				/deep/ .t-conten-text {
					height: auto;
					line-height: normal;
				}
				/deep/ .t-conten-text2 {
					height: auto;
					line-height: normal;
				}
			}
			
			.del_icon {
				margin-left: auto;
				padding-right: 20rpx;
			}

			.image {
				width: 33px;
				height: 33px;
				margin-right: 20upx;
			}

			.t-conten-text {
				color: $font-all-color;
				//height: 65px;
				//line-height: 65px;
			}

			.t-conten-text2 {
				color: $font-all-color;
				//height: 65px;
				//line-height: 65px;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
				padding: 0 30rpx 0 10rpx;
			}
		}
	}





	.list_title {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;

		view {
			color: $font-all-color;
		}

		.yjing1 {
			width: 27.78rpx;
			height: 13.19rpx;
		}

		.yjing2 {
			width: 32.78rpx;
			height: 13.19rpx;
		}
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
					color: $font-all-color;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				view:nth-child(2) {
					color: $font-all-color;
				}

				.lvse {
					color: #ffffff !important;
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
			justify-content: flex-start;
			
			background-color: $select-drop-down-color;
			border: 1px solid $select-drop-down-border-color;
			border-radius: 10px;
			
			margin-bottom: 20rpx;
			position: relative;
			padding: 10rpx 0;
			view {
				flex: 1 !important;
				color: $font-all-color;
			}
			
			.line_icon {
				position: absolute;
				top: 50%;
				left: 2.5%;
				transform: translate(2.5%, -50%);
				width: 55rpx;
				height: 55rpx;
			}
			.line_iconr {
				margin-left: auto;
				width: 10rpx;
				height: 20rpx;
				transform: rotate(180deg);
			}
		}

		.type_box_item22 {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			background-color: $all-secondary-color;
			padding: 30rpx 8rpx 30rpx 24rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;

			view {
				color: $font-all-color;
			}

			.line_icon {
				width: 55rpx;
				height: 55rpx;
			}

			.line_iconr {
				margin-left: auto;
				width: 10rpx;
				height: 20rpx;
				transform: rotate(180deg);
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.floor-item {
		margin-bottom: 20rpx;
		padding: 30rpx;
		border-radius: 30rpx;
		background: $addAc-list-bg-color;
	}
	
	.mask-box {
		width: 100%;
		height: 100%;
	}
	
	.text-box {
		display: flex;
		align-items: center;
	}
	
	.title {
		font-size: 28rpx;
		color: $all-secondary-text-color;
		display: flex;
		align-items: center;
		image {
			width: 66rpx;
			height: 66rpx;
			border-radius: 5px;
		}
		span {
			margin: 0 0 0 15rpx;
			color: $font-all-color;
		}
	}
	
	.subtitle {
		font-size: 24rpx;
		color: #3673d9;
		margin-left: auto;
	}
</style>