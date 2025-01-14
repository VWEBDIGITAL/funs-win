<template>
	<view :style="theme">

		<view class="icon_bgcolor" v-if="isShowIcon">

			<view class="bgse_wrap">
				<view class="bgse">
					<span class="background1"></span>
					<span class="background2"></span>
				</view>
			</view>

			<view class="movable-view" :class="[ispc || isLogin==1?'xkuan':'']">
				<view class="klq_tag" v-if="isLogin == 1 && KelingQuNum.length > 0">{{KelingQuNum.length || 0}}</view>
				<view class="NewUserBonus_icon" @click="clickBtn">
					<image class="liwuhe" src="/static/NoviceTask/treasure--opened.webp"></image>
					<view class="lbTitle" v-if="ispc || isLogin==1">{{Bonuses}}</view>
					<!-- <view class="xingxing">
						<view class="authorization__animation-item"></view>
						<view class="authorization__animation-item"></view>
						<view class="authorization__animation-item"></view>
						<view class="authorization__animation-item"></view>
					</view> -->
				</view>
			</view>

		</view>

		<u-popup v-model="NoviceTaskshow" width="650" height="80%" mode="center" close-icon-size="30" border-radius="24" :mask-close-able="true" :closeable="true" @open="Taskshowopen">
			<view class="task_wrap_box">
				<!-- <view class="reg_title_task" @click="NoviceTaskshow = false"> -->
					<!-- <view>{{$t('NewUserPopup.Reward')}}</view> -->
					<!-- <view><span>{{AvailableTasks.length}}</span>/{{NewTaskData.length + 5}}</view> -->
				<!-- </view> -->
				
				<view class="reg_title" @click="NoviceTaskshow = false">
					<view>{{$t('NewUserPopup.Reward')}}</view>
				</view>
				
				<view class="Novice_wrap">
					
					
					<view class="Novice_wrap_item">
						<image class="Novice_item_icon" src="/static/image/me/turntable.png" mode="widthFix"></image>
						<view class="Novice_wrap_item_title">
							<view>旋转轮盘 & 赢奖</view>
							<view class="kxz"><span>可旋转</span></view>
						</view>
						<view class="Novice_Btn">
							<view class="NovBtn1" @click="spinkaishi()"><span style="color: #ffffff;">开始</span></view>
						</view>
					</view>
					

					<!--
					19添加到主屏幕
					20手机认证
					21实名认证
					22邮箱认证
					23绑提现帐号
					24KYC认证
					-->
					<view class="Novice_wrap_item" v-for="(item,index) in NewTaskData" :key="index" v-if="item.status != 2">

						<image v-if="item.id == 19" class="Novice_item_icon" src="/static/NoviceTask/novice_6.png"
							mode="aspectFill"></image>
						<image v-if="item.id == 20" class="Novice_item_icon" src="/static/NoviceTask/novice_3.png"
							mode="aspectFill"></image>
						<image v-if="item.id == 21" class="Novice_item_icon" src="/static/NoviceTask/novice_1.png"
							mode="aspectFill"></image>
						<image v-if="item.id == 22" class="Novice_item_icon" src="/static/NoviceTask/novice_2.png"
							mode="aspectFill"></image>
						<image v-if="item.id == 23" class="Novice_item_icon" src="/static/NoviceTask/novice_5.png"
							mode="aspectFill"></image>
						<image v-if="item.id == 24" class="Novice_item_icon" src="/static/NoviceTask/novice_4.png"
							mode="aspectFill"></image>

						<view class="Novice_wrap_item_title">
							<view v-if="item.id == 19">{{$t('NewUserPopup.ADDHOME')}}</view>
							<view v-if="item.id == 20">{{$t('NewUserPopup.PhoneV')}}</view>
							<view v-if="item.id == 21">{{$t('NewUserPopup.NameV')}}</view>
							<view v-if="item.id == 22">{{$t('NewUserPopup.EmailV')}}</view>
							<view v-if="item.id == 23">{{$t('NewUserPopup.Bind')}}</view>
							<view v-if="item.id == 24">{{$t('NewUserPopup.KYCV')}}</view>
							<view>{{$t('NewUserPopup.Bonus')}}:<span>
								<text v-if="platform == 8 ||platform == 10 || platform == 11">$</text>
								<text v-else-if="platform == 1 || platform == 5 || platform == 6">¥</text>
								<text v-else>₱</text>
								{{(item.reward/100).toFixed(2)}}
							</span></view>
						</view>
						<!--活动状态： 0未参与 1可领取 2已领取-->
						<view class="Novice_Btn">
							<view class="NovBtn2" v-if="item.status == 0" @click="ToStart(item,index)">
								<span>{{$t('NewUserPopup.StartBTN')}}</span>
							</view>
							<view class="NovBtn1" v-if="item.status == 1" @click="StartRl(item,index)">
								<span>{{$t('NewUserPopup.ClaimBTN')}}</span>
							</view>
							<view class="NovBtn3" v-if="item.status == 2"><span>{{$t('NewUserPopup.Claimed')}}</span>
							</view>
						</view>
					</view>


					<Novice-Promotion-pack ref="openGetFaiwu" @guanbiliBAo="closewindows"></Novice-Promotion-pack>


				</view>

				<view class="look_all_btn" @click="look_all()">
					<view class="NovBtn2"><span>{{$t('ViewAll')}}</span></view>
				</view>

			</view>
		</u-popup>

		<!--PC个人信息弹窗-->
		<pc-Myinfo ref="openPCmyinfo"></pc-Myinfo>

		<!-- 账户管理 -->
		<pc-manageAccount ref="openPCmange"></pc-manageAccount>
		
		<SigInPopup ref="openSiginShow"></SigInPopup>

		<install-popup ref="openInstallshow" :isShowTitle="false" @CheckboxChange="checkboxChange" @guanBiinstallPopup="GuanBiinstallPopup"></install-popup>
		
		<Spin-Wheel ref="openspin"></Spin-Wheel>

	</view>
</template>

<script>
	export default {
		name: "NoviceTask",
		props: {
			Bonuses: {
				type: String,
				default: ''
			},
			ispc: {
				type: Boolean,
				default: false
			},
			isShowIcon: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				platform: this.PID,
				NewTaskData: [],
				KelingQuNum: [],
				AvailableTasks: [], //未完成任务列表
				taskOk: false,
				isLogin: 0,
				NoviceTaskshow: false,

			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				this.isLogin = 0
			} else {
				this.isLogin = 1;
				this.GetTaskList();
			
				uni.$on('RsGetTaskList', (val) => {
					this.GetTaskList();
				});
			}
		},
		mounted() {
			
		},
		methods: {
			GetTaskList() {
				let that = this

				let serialNo = uni.getStorageSync('thisUuid');
				let machineName = uni.getStorageSync('machineName');
				let ua = uni.getStorageSync('thisUa');

				//alert(JSON.stringify(machineName))

				that.$u.post('/special/activity', {
					deviceId: serialNo,
					deviceType: machineName
				}).then(res => {
					that.NewTaskData = res.data
					//计算出未完成的任务数量
					let isNum = []
					res.data.forEach(function(item, index) {
						if (item.status != 2) {
							isNum.push(item)
						}
					})
					that.AvailableTasks = isNum
					//console.log('新人活动', that.NewTaskData)

					//算出可领取的数量
					let KlqNum = []
					res.data.forEach(function(item, index) {
						if (item.status == 1) {
							KlqNum.push(item)
						}
					});

					that.GetQianDao(KlqNum);

					//判断是否都完成了任务
					let taskis_ok = this.allCompleted()
					that.taskOk = taskis_ok
					//console.log('是否都完成了任务',that.taskOk)
				})
			},
			//获取签到
			GetQianDao(list) {
				let that = this
				that.$u.post('/signin/info', {

				}).then(res => {
					if (res.data.length != 0) {
						let Today = res.data.todaySignIn.today
						let yes_lingqu = []
						res.data.Available.forEach((item, index) => {
							yes_lingqu.push(item)
						});
						that.Getgeneralreward(list, yes_lingqu);
					} else {
						that.Getgeneralreward(list);
					}
				})
			},
			Getgeneralreward(list, list2) {
				let that = this;
				let klqList = list || []
				let klqList2 = list2 || []
				that.$u.post('/general/reward', {

				}).then(res => {
					let datas = res.data
					let duiXiang = Object.keys(datas).map(key => ({
						key,
						value: datas[key]
					}));
					let newarry = []
					duiXiang.forEach(function(item, index) {
						if (item.value.status == 1 && item.value.reward > 0) {
							newarry.push(item)
						}
					});
					let mergedArr = [...klqList, ...newarry, ...klqList2];
					that.KelingQuNum = mergedArr
					//console.log('222计算这六个某个可领取的num', that.KelingQuNum);
				})
			},
















































			allCompleted() {
				//allCompleted是一个计算属性，它会返回一个布尔值，指示tasks数组中的所有任务是否都已经完成。Array.prototype.every方法被用来检查数组中的所有元素是否都符合指定的条件（在这个例子中是task.completed为true）。如果所有任务的completed属性都是true，那么allCompleted计算属性将返回true，否则返回false。
				return this.NewTaskData.every(task => task.status == 2);
			},
			//开始参与活动
			ToStart(item, idx) {
				//console.log('参与活动', item, idx);
				//检查一下窗口大小判断是否打开页面 大于768使用弹窗打开log页面
				let windowWidth = uni.getSystemInfoSync().windowWidth

				/*	活动类型：
					19添加到主屏幕
					20手机认证
					21实名认证
					22邮箱认证
					23绑提现帐号
					24KYC认证
				*/
				//根据类型做响应的操作，比如手机认证就跳转到个人资料页面
				if (item.id == 19) {
					this.NoviceTaskshow = false
					setTimeout(() => {
						this.$refs.openInstallshow.openPopup()
					}, 200)
				} else if (item.id == 20) {
					this.NoviceTaskshow = false
					if (windowWidth >= "800") {
						this.$refs.openPCmyinfo.openPopup()
					} else {
						uni.navigateTo({
							url: '/pages/ProfileInfo/ProfileInfo'
						})
					}
				} else if (item.id == 21) {
					this.NoviceTaskshow = false
					if (windowWidth >= "800") {
						this.$refs.openPCmyinfo.openPopup()
					} else {
						uni.navigateTo({
							url: '/pages/ProfileInfo/ProfileInfo'
						})
					}
				} else if (item.id == 22) {
					this.NoviceTaskshow = false
					if (windowWidth >= "800") {
						this.$refs.openPCmyinfo.openPopup()
					} else {
						uni.navigateTo({
							url: '/pages/ProfileInfo/ProfileInfo'
						})
					}
				} else if (item.id == 23) {
					this.NoviceTaskshow = false
					if (windowWidth >= "800") {
						this.$refs.openPCmange.openPopup()
					} else {
						uni.navigateTo({
							url: '/pages/ManageAccount/ManageAccount'
						})
					}
				} else if (item.id == 24) {

				}
			},
			//领取奖励
			StartRl(item, idx) {
				//console.log('领取奖励', item)
				let that = this
				that.$u.post('/take/special/activity', {
					type: item.id
				}).then(res => {
					//that.GetTaskList(); //领取后刷新
					
					//来刷新一个任务列表显示可领取数量
					uni.$emit('RsGetTaskList', 1);
					
					//console.log('领取奖励', res.data)
					//that.NoviceTaskshow = false
					
					setTimeout(() => {
						uni.$emit('getgetMybalance', 1)
						uni.$emit('UpdataAddBcbalance', (res.data.reward / 100).toFixed(2))
					}, 1000)
				})
			},
			look_all() {
				this.NoviceTaskshow = false
				//导航栏金币显示
				uni.$emit('OpeninGames', 0);

				let isToken = uni.getStorageSync("token")
				if (!isToken) {} else {
					this.outBalance();
				}

				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/Bonus-Logoin/Bonus-Logoin'
					})
				}, 300)
			},
			outBalance() {
				let that = this
				that.$u.post('/transfer-out-balance', {

				}).then(res => {
					//刷新用户余额
					uni.$emit('getgetMybalance', 1);
				});
			},












			checkboxChange(e) {

			},
			GuanBiinstallPopup() {

			},
			Taskshowopen() {
				//console.log('新手任务弹窗打开了');
				//操作获取五个礼包
				this.$refs.openGetFaiwu.GetGeneralReward()
			},
			openPopup() {
				this.NoviceTaskshow = true
			},
			closewindows(val) {
				if(val == 1){
					this.NoviceTaskshow = false
					//this.$refs.openSiginShow.openShow(1);
					uni.navigateTo({
						url: '/pages/Bonus-Logoin/Bonus-Logoin?openSign=1'
					})
				} else {
					//this.NoviceTaskshow = false
				}
			},
			openList() {
				this.NoviceTaskshow = true
			},
			//点击按钮
			clickBtn() {
				let that = this
				let isToken = uni.getStorageSync("token")
				if (!isToken) {
					uni.navigateTo({
						url: '/pages/bonus-cabinet/bonus-cabinet'
					})
				} else {
					that.GetTaskList();
					that.NoviceTaskshow = true
					console.log('打开了礼包弹窗')
					that.$nextTick(()=>{
						that.$refs.openGetFaiwu.inits()
					});
					
				}
			},
			spinkaishi(){
				this.NoviceTaskshow = false
				this.$refs.openspin.init()
			}

		}
	}
</script>

<style lang="scss">
	/deep/ .u-drawer-bottom {
		//background-color: $all-secondary-color !important;
		//max-height: 1200rpx;
	}

	.xkuan {
		width: auto !important;
	}

	.movable-view {
		width: 31px;
		height: 31px;
		color: $all-secondary-text-color;
		font-size: 26rpx;
		touch-action: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;
	}

	.icon_bgcolor {
		height: 35px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px 5px 5px 5px;
		position: relative;
		width: 100%;

		.bgse_wrap {
			position: absolute;
			top: 0;
			left: 0;
			height: 35px;
			width: 100%;

			.bgse {
				overflow: hidden;
				height: 35px;
				width: 100%;
				border-radius: 8px;
				position: relative;
				background: radial-gradient(164.23% 68.81% at 100% 100%, #feab4acc 0, #fe8b4a2e 72.4%, #fe4a4a00), radial-gradient(203.92% 89.64% at 9.37% -19.79%, #fecf4acc 0, #fe9a4a2e 72.4%, #fe8b4a00), #503221;

				.background1 {
					background: linear-gradient(90deg, #fecf4a00 2%, #fecf4a 54.57%, #fecf4a00 99.99%);
					border-radius: 50px 50px 0 0;
					content: "";
					height: 1px;
					position: absolute;
					width: 100%;
					left: 0;
					top: 0;
				}

				.background2 {
					background: linear-gradient(90deg, #fecf4a00 2%, #fecf4a 54.57%, #fecf4a00 99.99%);
					border-radius: 50px 50px 50px 50px;
					content: "";
					height: 1px;
					position: absolute;
					width: 100%;
					bottom: 0;
					right: 0;
				}
			}
		}
	}

	.klq_tag {
		position: absolute;
		top: -10rpx;
		right: -14rpx;
		//border: 2px solid #2a3546;
		// background-color: #1bb83d;
		// box-shadow: 0 3px 18px #3196026b;
		background: linear-gradient(3360deg, #1bb83d .8%, #1bb83d);
		box-shadow: 0 3px 20px #3196026b, inset 0 4px 4px #ffffff30;
		color: $all-secondary-text-color;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18rpx;
		z-index: 9;
		border-radius: 4px;
		border: 2px solid $all-secondary-color;
		font-weight: bold;
	}

	.animation-info {
		transition: left .25s ease;
	}

	.movable-area {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999 !important;
		pointer-events: none;
	}

	.NewUserBonus_icon {
		position: relative;
		//right: 15rpx;
		//top: 4px;
		display: flex;
		align-items: center;
		justify-content: center;

		.liwuhe {
			position: relative;
			//left: 22rpx;
			z-index: 2;
			width: 26px;
			height: 26px;
			//animation: giftA28f35eb 3s linear infinite;
		}

		.xingxing {

			.authorization__animation-item {
				border-radius: .3px;
				height: 3.7px;
				position: absolute;
				width: 3.7px;
			}

			.authorization__animation-item:first-of-type {
				animation: square1A28f35eb 3s linear infinite;
				background: #f5f446;
				right: -8px;
				top: -2px;
				transform: matrix(.26, .97, -.97, .26, 0, 0);
			}

			.authorization__animation-item:nth-of-type(2) {
				animation: square2A28f35eb 3s linear infinite;
				background: #e94b6f;
				right: -17px;
				top: 5px;
				transform: rotate(98.97deg);
			}

			.authorization__animation-item:nth-of-type(3) {
				animation: square3A28f35eb 3s linear infinite;
				background: #35b9d6;
				right: -17px;
				top: 18px;
				transform: rotate(45.28deg);
			}

			.authorization__animation-item:nth-of-type(4) {
				animation: square4A28f35eb 3s linear infinite;
				background: #ffb636;
				right: -6px;
				top: 30px;
				transform: rotate(84.97deg);
			}
		}
	}

	@keyframes square1A28f35eb {
		0% {
			transform: matrix(.26, .97, -.97, .26, 0, 0) translate(0) translateY(0)
		}

		5% {
			transform: matrix(.26, .97, -.97, .26, 0, 0) translate(0) translateY(0)
		}

		25% {
			transform: matrix(.26, .97, -.97, .26, 0, 0) translate(15px) translateY(5px)
		}

		75% {
			transform: matrix(.26, .97, -.97, .26, 0, 0) translate(15px) translateY(5px)
		}

		95% {
			transform: matrix(.26, .97, -.97, .26, 0, 0) translate(0) translateY(0)
		}

		to {
			transform: matrix(.26, .97, -.97, .26, 0, 0) translate(0) translateY(0)
		}
	}

	@keyframes square2A28f35eb {
		0% {
			transform: rotate(98.97deg) translate(0) translateY(0)
		}

		5% {
			transform: rotate(98.97deg) translate(0) translateY(0)
		}

		25% {
			transform: rotate(98.97deg) translate(10px) translateY(9px)
		}

		75% {
			transform: rotate(98.97deg) translate(10px) translateY(9px)
		}

		95% {
			transform: rotate(98.97deg) translate(0) translateY(0)
		}

		to {
			transform: rotate(98.97deg) translate(0) translateY(0)
		}
	}

	@keyframes square3A28f35eb {
		0% {
			transform: rotate(45.28deg) translate(0) translateY(0)
		}

		5% {
			transform: rotate(45.28deg) translate(0) translateY(0)
		}

		25% {
			transform: rotate(45.28deg) translate(-8px) translateY(10px)
		}

		75% {
			transform: rotate(45.28deg) translate(-8px) translateY(10px)
		}

		95% {
			transform: rotate(45.28deg) translate(0) translateY(0)
		}

		to {
			transform: rotate(45.28deg) translate(0) translateY(0)
		}
	}

	@keyframes square4A28f35eb {
		0% {
			transform: rotate(84.97deg) translate(0) translateY(0)
		}

		5% {
			transform: rotate(84.97deg) translate(0) translateY(0)
		}

		25% {
			transform: rotate(84.97deg) translate(-20px) translateY(0)
		}

		75% {
			transform: rotate(84.97deg) translate(-20px) translateY(0)
		}

		95% {
			transform: rotate(84.97deg) translate(0) translateY(0)
		}

		to {
			transform: rotate(84.97deg) translate(0) translateY(0)
		}
	}

	@keyframes giftA28f35eb {
		0% {
			transform: rotate(0)
		}

		23% {
			transform: rotate(0)
		}

		33% {
			transform: rotate(-8deg)
		}

		50% {
			transform: rotate(0)
		}

		67% {
			transform: rotate(8deg);
		}

		to {
			transform: rotate(0)
		}
	}

	.to_SignIn {
		background-color: $all-secondary-color;
		text-align: center;
		height: 83rpx;
		line-height: 83rpx;
		color: $font-all-color;
		font-size: 24rpx;
	}

	.Novice_wrap {
		background-color: $all-secondary-color;
		padding: 30rpx 30rpx 10rpx 30rpx;

		.Novice_wrap_item {
			margin-bottom: 18rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			background-color: $novice-popup-itembg;
			border: 1px solid $novice-popup-itemborder;
			border-radius: 12px;
			padding: 16rpx 24rpx;

			//box-shadow: 0 1px 1px 0px #000000;
			.Novice_item_icon {
				width: 70rpx;
				height: 70rpx;
			}

			.Novice_wrap_item_title {
				padding-left: 26rpx;
				flex: 1;
				view:nth-child(1) {
					font-weight: bold;
					color: $all-secondary-text-color;
					font-size: 28rpx;
					margin-bottom: 8rpx;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				view:nth-child(2) {
					color: #7b98bf;
					font-size: 24rpx;

					span {
						color: #07b163;
						margin-left: 10rpx;
					}
				}
				.kxz {
					color: #7b98bf;
					font-size: 24rpx;
					span {
						color: #07b163;
						margin-left: 0 !important;
					}
				}
			}

			.Novice_Btn {
				margin-left: auto;
				font-size: 24rpx;
				.NovBtn1 {
					position: relative;
					margin-left: 20rpx;

					span {
						font-weight: bold;
						width: 140rpx;
						color: #ffffff;
						display: inline-block;
						background-color: #2c62f4;
						background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
						box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
						border-radius: 8px;
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
				}

				.NovBtn1:after {
					padding: 0 24rpx;
					border-radius: 8px;
					height: 70rpx;
					background-color: #61001d;
					bottom: -3px;
					content: "";
					display: block;
					left: 0;
					right: 0;
					margin: 0 auto;
					pointer-events: none;
					position: absolute;
					right: 0;
					z-index: 1;
				}

				.NovBtn2 {
					position: relative;
					margin-left: 20rpx;

					span {
						width: 140rpx;
						color: #ffffff;
						display: inline-block;
						background-color: #2c62f4;
						background: linear-gradient(1turn, #2c62f4 .8%, #1398f9);
						box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
						border-radius: 8px;
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
						font-weight: bold;
					}
				}

				.NovBtn2:after {
					padding: 0 24rpx;
					border-radius: 8px;
					height: 70rpx;
					background-color: #003293;
					bottom: -3px;
					content: "";
					display: block;
					left: 0;
					right: 0;
					margin: 0 auto;
					pointer-events: none;
					position: absolute;
					right: 0;
					z-index: 1;
				}

				.NovBtn3 {
					position: relative;
					margin-left: 20rpx;

					span {
						width: 140rpx;
						color: #a9b4c8;
						display: inline-block;
						background-color: #2a323f;
						border: 1px solid #3b424e;
						border-radius: 8px;
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;
						padding: 0 24rpx;
						position: relative;
						z-index: 2;
						font-weight: bold;
					}
				}
			}
		}
	}

	.look_all_btn {
		width: 100%;
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 20rpx 0 30rpx 0;
		background-color: $all-secondary-color;
		box-shadow: -10px 0 15px 0 rgba(0, 0, 0, 0.1);
		z-index: 99;
		font-size: 28rpx;
		.NovBtn2 {
			cursor: pointer;
			position: relative;
			width: 92%;
			margin: 0 auto;

			span {
				font-weight: bold;
				width: 100%;
				color: #ffffff;
				display: inline-block;
				background-color: #2c62f4;
				background: linear-gradient(1turn, #2c62f4 .8%, #1398f9);
				box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
				border-radius: 8px;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				position: relative;
				z-index: 2;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
		}

		.NovBtn2:after {
			border-radius: 8px;
			height: 90rpx;
			background-color: #003293;
			bottom: -3px;
			content: "";
			display: block;
			left: 0;
			right: 0;
			margin: 0 auto;
			pointer-events: none;
			position: absolute;
			right: 0;
			z-index: 1;
		}
	}

	.task_wrap_box {
		position: relative;
	}

	.reg_title_task {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		padding: 30rpx 30rpx;
		z-index: 9;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background-color: $all-secondary-color;
		box-shadow: 10px 0 15px 0 rgba(0, 0, 0, 0.1);

		view:nth-child(1) {
			font-size: 38rpx;
			color: $all-secondary-text-color;
			font-weight: bold;
		}

		view:nth-child(2) {
			margin-left: 10rpx;
			color: #55657e;
			background-color: $pupUp-bg-color;
			padding: 4rpx 14rpx;
			border-radius: 8rpx;

			span {
				color: #07b163;
			}
		}
	}

	@media (min-width: 800px) {
		.movable-view {
			width: 34px;
			height: 34px;
		}

		.NewUserBonus_icon .liwuhe {
			width: 26px;
			height: 26px;
		}

		.NewUserBonus_icon .lbTitle {
			margin-left: 10rpx;
			margin-right: 10rpx;
		}

		.klq_tag {
			width: 18px;
			height: 18px;
			font-size: 12px;
			top: -8rpx;
			right: -18rpx;
		}
	}
</style>