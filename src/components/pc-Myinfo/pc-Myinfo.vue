<template>
	<view :style="theme">

		<u-popup v-model="pc_myinfoShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="pc_myinfoShow = false">
				<view>{{$t('navBarTitle.ProfileInfo')}}</view>
			</view>
			<view class="page_wrap">
				<view class="page_content">
					<view class="myinfo">
						<view class="mytx" @click="openavatarPopup()">
							<image class="txicon" :src="avatar || '/static/touxiang/1.png'"></image>
							<image class="editixcon" src="/static/image/write_icon_148501.png"></image>
						</view>
						<view class="myacnum">
							<view>{{$t('NewlyAdded.username')}}: {{userInfo.nickName}}</view>
							<view>{{$t('NewlyAdded.userID')}}: {{userInfo.userId}}
								<image @click="copy(userInfo.userId)" src="/static/image/me/fuzhi_icon.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="myinfo_inputzu">
						<view class="ini_input_box">
							<view class="input_item">
								<view class="iname">{{$t('NewlyAdded.Realname')}}</view>
								<view class="i_inpout" :class="input_border1 == 1?'input_border':''">
									<u-input v-model="Firstname" @input="usernameInt" @blur="inputBlur1"
										@focus="inputfocus1" type="text" :border="false" height="75"
										:custom-style="customStyle" :placeholder-style="placeholderStyle" :placeholder="$t('BiTian')"
										:clearable="false" />
									<image src="/static/image/write_icon_148501.png"></image>
								</view>
							</view>
						</view>
						<view class="iname_title">{{$t('navBarTitle.Birthday')}} *</view>
						<view class="ini_input_box">

							<view class="input_item">
								<view class="i_inpout222" @click="Riqishow = true">
									<view v-if="yyyy" style="color:#fff;//font-weight: bold;">{{yyyy}}</view>
									<view v-else>YYYY</view>
								</view>
							</view>
							<view class="input_item">
								<view class="i_inpout222" @click="Riqishow = true">
									<view v-if="Month" style="color:#fff;//font-weight: bold;">{{Month}}</view>
									<view v-else>MM</view>
								</view>
							</view>
							<view class="input_item">
								<view class="i_inpout222" @click="Riqishow = true">
									<view v-if="dd" style="color:#fff;//font-weight: bold;">{{dd}}</view>
									<view v-else>DD</view>
								</view>
							</view>

						</view>
						<view class="ini_input_box">
							<view class="input_item">
								<view class="iname">{{$t('navBarTitle.Email')}}</view>
								<view class="i_inpout" :class="input_border2 == 1?'input_border':''">
									<u-input v-model="Email" @input="usernameInt2" @blur="inputBlur2"
										@focus="inputfocus2" type="text" :border="false" height="75"
										:custom-style="customStyle" :placeholder-style="placeholderStyle" :placeholder="$t('BiTian')"
										:clearable="false" :disabled="userInfo.verifyEmail == false?false:true" />

									<view class="Verify" v-if="userInfo.email != '' && userInfo.verifyEmail == false" @click="EmailVerify()">{{$t('phonePopup.verifyBtn')}}</view>
									<image v-else-if="userInfo.verifyEmail == false" src="/static/image/write_icon_148501.png"></image>
									<image v-else-if="userInfo.verifyEmail == true" src="/static/image/ok.png"></image>
								</view>
							</view>
						</view>
						<view class="ini_input_box" style="margin: 0;">
							<view class="input_item">
								<view class="iname">{{$t('navBarTitle.Phone')}}</view>
								<view class="quhao_wrap">
									<view class="i_inpout" style="padding: 0 20rpx 0 0;margin-right: 6px;width: auto;">
										<view class="input_item_true">
											<view class="quhao_box">
												<view class="quhao">
													<view>
														<areaCodeSelect :jiahao="1" :placeholder="$t('BiTian')"
															:closeSelect.sync='close2' :data="selectList2"
															v-model="value2" @change='change2' :valueType="alias2">
														</areaCodeSelect>
													</view>
												</view>
											</view>
										</view>
									</view>
									<view class="i_inpout" :class="input_border4 == 1?'input_border':''">
										<u-input v-model="Phone" @input="usernameInt3" @blur="inputBlur4"
											@focus="inputfocus4" type="text" :border="false" height="75"
											:custom-style="customStylePhone" :placeholder-style="placeholderStyle"
											:placeholder="$t('BiTian')" :clearable="false"
											:disabled="false" /><!--userInfo.verifyPhone == false?false:true-->
										<view class="Verify"
											v-if="userInfo.phoneNumber != '' && userInfo.verifyPhone == false"
											@click="phoneNumberVerify()">{{$t('phonePopup.verifyBtn')}}</view>
										<image v-else-if="userInfo.verifyPhone == false"
											src="/static/image/write_icon_148501.png"></image>
										<image v-else-if="userInfo.verifyPhone == true" src="/static/image/ok.png">
										</image>
									</view>
								</view>

							</view>
						</view>
					</view>
					<view class="sevae_btn">
						<u-button type="primary" :disabled="isDisabled" :loading="loadingBtn" @click="Save()">{{$t('AddAccoundPopup.SaveBtn')}}</u-button>
					</view>
				</view>
			</view>
		</u-popup>
		
		<modifyavatarPopup ref="avatarPopup" @Yixuande="yixuande"></modifyavatarPopup>
		<DatePicker :value="date" :show="Riqishow" @confirm="dateChange" @cancel="datecancel" />
		<!-- <u-picker :confirm-text="$t('popupbtn')" :cancel-text="$t('NewlyAdded.Cancel')" mode="time" :show-time-tag="false" end-year="2006" :default-time="defaultTime" v-model="yyyyShow" :params="yyyyparams" @confirm="yyyyconfirm" @cancel="yyyycancel"></u-picker> -->
		<!-- 邮箱验证弹窗 -->
		<EmailPopup ref="Emailpopup" :num="userInfo.email" @Shuaxin="Shuaxin"></EmailPopup>
		<Phone-modify ref="openmodify" :num="userInfo.phoneNumber" @Shuaxin="Shuaxin"></Phone-modify>

	</view>
</template>

<script>
	import countryList from '@/utils/list.json'
	import areaCodeSelect from '@/components/areaCodeSelect/areaCodeSelect.vue'
	import DatePicker from '@/components/dragon-datePicker/dragon-datePicker.vue'
	import avatarList from "@/utils/avatar.js";
	export default {
		name: "pc-Myinfo",
		components: {
			DatePicker,
			areaCodeSelect
		},
		data() {
			return {
				pc_myinfoShow: false,
				defaultTime: '2006-01-01',
				yyyyShow: false,
				yyyyparams: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},




				showOptions: true,

				isDisabled: true,
				input_border1: 0,
				input_border2: 0,
				input_border3: 0,
				input_border4: 0,
				defaultDate: '',
				date: '2006-01-01',
				Riqishow: false,

				loadingBtn: false,
				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},
				customStylePhone: {
					
					fontWeight: "bold"
				},
				Firstname: '',
				Lastname: '',
				Email: '',
				Phone: '',
				dd: '',
				Month: '',
				yyyy: '',

				PhoneCode: this.AreaCode,

				avatar: '',
				userInfo: {},
				avatarlist: avatarList.avatarlist,


				value2: this.AreaCode,
				selectList2: [],//countryList.list,
				alias2: { //别名来代指一下
					label: 'name',
					value: 'tel',
					flag: 'flag'
				},
				close2: false,
			};
		},
		created() {
			
		},
		methods: {
			openPopup() {
				
				let SetData = uni.getStorageSync('registerSet');
				//console.log('注册配置',SetData);
				
				//设置默认区号和国旗
				this.selectList2 = SetData.register.areas;
				this.value2 = SetData.register.areas[0].tel;
				this.PhoneCode = SetData.register.areas[0].tel
				
				this.getuserinfo();
				this.pc_myinfoShow = true
			},
			closewindows() {
				this.pc_myinfoShow = false
			},

			copy(val) {
				let that = this
				uni.setClipboardData({
					data: String(val),
					showToast: false,
					success(res) {
						uni.showToast({
							title: that.$t('Betting requirements.register7'),
							icon: 'none',
							duration: 3000
						})
					},
					fail(err) {
						////console.log(err)
					}
				});
			},
			usernameInt(e) {
				if (!e) {
					this.isDisabled = true
				} else {
					this.isDisabled = false
				}
			},
			usernameInt2(e) {
				if (!e) {
					this.isDisabled = true
				} else {
					this.isDisabled = false
				}
			},
			usernameInt3(e) {
				if (!e) {
					this.isDisabled = true
				} else {
					this.isDisabled = false
				}
			},

			yyyycancel() {
				this.isDisabled = true
			},
			yyyyconfirm(e) {
				this.date = e.year + '-' + e.month + '-' + e.day
				this.yyyy = e.year
				this.Month = e.month
				this.dd = e.day
				this.isDisabled = false
			},



			dateChange(v) {
				this.Riqishow = false
				this.date = v
				var dateStr = v;
				var dateObj = new Date(dateStr);
				var year = dateObj.getFullYear();
				var month = dateObj.getMonth() + 1;
				var day = dateObj.getDate(); // 返回值范围为[1, 31]
				this.dd = day
				this.Month = month
				this.yyyy = year
				this.isDisabled = false
			},
			datecancel() {
				this.Riqishow = false
				this.isDisabled = true
			},





			Shuaxin() {
				this.getuserinfo();
				//来刷新一个任务列表显示可领取数量
				uni.$emit('RsGetTaskList', 1);
			},
			getuserinfo() {
				let that = this

				that.$u.post('/user/get/info', {}).then(res => {
					uni.setStorageSync('userinfo', res.data)
					that.userInfo = res.data

					let headId = that.userInfo.headId
					let tx = ''
					that.avatarlist.forEach((item, index) => {
						if (item.id == headId) {
							tx = item.img
						}
					});
					that.avatar = tx
					that.Firstname = that.userInfo.realName //that.userInfo.realName || that.userInfo.username
					that.Email = that.userInfo.email

					//把手机号和区号分开
					const phoneNumber = that.userInfo.phoneNumber;
					const regex = /^\((\+\d+)\)(\d+)$/;
					const match = phoneNumber.match(regex);
					if (match) {
						const countryCode = match[1];
						const number = match[2];
						////console.log(`Country code: ${countryCode}`);
						////console.log(`Phone number: ${number}`);
						const NewcountryCode = countryCode.replace(/\+/g, '');
						that.value2 = NewcountryCode
						that.PhoneCode = NewcountryCode
						that.Phone = number;
					} else {
						////console.log("Invalid phone number");
					}

					that.defaultTime = that.userInfo.birthday;
					that.date = that.userInfo.birthday || '2006-01-01'

					var dateStr = that.userInfo.birthday
					var dateObj = new Date(dateStr);
					var year = dateObj.getFullYear();
					var month = dateObj.getMonth() + 1;
					var day = dateObj.getDate();
					that.dd = day
					that.Month = month
					that.yyyy = year

					//判断是否存在参数
					if (that.Firstname && (that.dd || that.Month || that.yyyy) && that.Email && that.Phone) {
						that.isDisabled = true
					} else {
						that.isDisabled = true
					}

				})


			},

			Save() {
				let that = this


				//name String 是 真实姓名
				//birthday String 是 用户生日（格式1990-01-01）
				//email String 是 电子邮件地址
				//phoneNumber String 是 电话号码 格式(+852)11112222

				if (that.Firstname == "") {
					this.$u.toast(this.$t('ToastPrompt.Toast16'));
				} else if (that.dd == "" || that.Month == "" || that.yyyy == "") {
					this.$u.toast(this.$t('ToastPrompt.Toast17'));
				} else if (that.Email == "") {
					this.$u.toast(this.$t('ToastPrompt.Toast18'));
				} else if (that.Phone == "") {
					this.$u.toast(this.$t('ToastPrompt.Toast19'));
				} else {
					that.loadingBtn = true

					let serialNo = uni.getStorageSync('thisUuid')
					let machineName = uni.getStorageSync('machineName')
					let ua = uni.getStorageSync('thisUa')

					setTimeout(() => {
						that.$u.post('/user-info', {
							name: that.Firstname,
							//realName: that.Firstname,
							birthday: that.date,
							email: that.Email,
							phoneNumber: '(+' + that.PhoneCode + ')' + that.Phone,
							//phoneNumber: that.Phone
							deviceId: serialNo,
							deviceType: machineName || ua
						}).then(res => {
							that.loadingBtn = false
							uni.showToast({
								title: 'Save Success',
								icon: 'none',
								duration: 3000
							})

							//更新缓存userName
							let NewchatNmae = uni.getStorageSync('userinfo')
							NewchatNmae.username = that.Firstname
							uni.setStorageSync('userinfo', NewchatNmae)

							//更新缓存user生日
							let Birthday = uni.getStorageSync('userinfo')
							Birthday.birthday = that.date
							uni.setStorageSync('userinfo', Birthday)

							//更新缓存useremail
							let isemail = uni.getStorageSync('userinfo')
							isemail.email = that.Email
							uni.setStorageSync('userinfo', isemail)

							//更新缓存userephoneNumber
							let PhoneNumber = uni.getStorageSync('userinfo')
							PhoneNumber.phoneNumber = that.Phone
							uni.setStorageSync('userinfo', PhoneNumber)

							that.getuserinfo()
							
							that.pc_myinfoShow = false
							
							//来刷新一个任务列表显示可领取数量
							uni.$emit('RsGetTaskList', 1);
							
						}).catch(err => {
							that.loadingBtn = false
						})
					}, 1500)
				}
			},
			openavatarPopup() {
				this.$refs.avatarPopup.openPopup()
			},
			yixuande(e) {
				//////console.log(e)
				let that = this
				this.getuserinfo()
			},
			change2(e) {
				////console.log(e) //这里返回的是value值
				this.PhoneCode = e
			},
			inputBlur1() {
				this.input_border1 = 0
			},
			inputfocus1() {
				this.input_border1 = 1
			},
			inputBlur2(e) {
				let isEmail = this.$u.test.email(e)
				if (!isEmail) {
					this.$u.toast(this.$t('ToastPrompt.Toast20'));
					this.$nextTick(() => {
						this.Email = ''
					})
				} else {

				}
				this.input_border2 = 0
			},
			inputfocus2() {
				this.input_border2 = 1
			},
			inputBlur3() {
				this.input_border3 = 0
			},
			inputfocus3() {
				this.input_border3 = 1
			},
			inputBlur4() {
				this.input_border4 = 0
			},
			inputfocus4() {
				this.input_border4 = 1
			},
			EmailVerify() {
				this.$refs.Emailpopup.openPopup()
			},
			phoneNumberVerify() {
				this.$refs.openmodify.openPopup()
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	/deep/ .u-drawer {
		max-width: 668px !important;
	}
	
	page {
		height: calc(100vh);
	}
	
	/deep/ .dialog {
		z-index: 999999 !important;
	}
	
	/deep/ .remark {
		background: #ffffff00 !important;
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

	.page_wrap {
		padding: 40rpx;
	}

	.sevae_btn {
		width: 100%;
		margin: 30rpx auto 0;
	}

	.page_content {
		.myinfo_inputzu {
			background-color: $all-secondary-color;
			padding: 30rpx 24rpx;
			border-radius: 12rpx;

			.iname_title {
				height: 38rpx;
				line-height: 38rpx;
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-weight: bold;
			}

			.ini_input_box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30rpx;

				.input_item:first-child {
					margin-left: 0;
				}

				.input_item:last-child {
					margin-right: 0;
				}

				.input_item {
					flex: 1;
					margin: 0 6rpx;

					.quhao_wrap {
						display: flex;
						align-items: center;
					}

					.iname {
						height: 38rpx;
						line-height: 38rpx;
						color: $font-all-color;
						font-weight: bold;
						margin-bottom: 10rpx;
					}

					.i_inpout {
						width: 100%;
						display: flex;
						align-items: center;
						position: relative;
						border-radius: 10rpx;
						padding: 0 20rpx;
						background-color: $pupUp-bg-color;
						border: 1px solid $input-border-color;

						.Verify {
							color: #187AE7;
							font-size: 26rpx;
						}

						.input_item_true {
							width: 100%;

							.quhao_box {
								width: 100%;
								display: inline-flex;
								align-items: center;

								.quhao {
									width: 100%;
									color: $font-all-color;

									/deep/ .text_tips {
										font-size: 30rpx;
									}
								}

								.quhao_inpput {
									padding-left: 15rpx;
									width: 100%;
								}
							}

							.huoqqude {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.shurukkuang {
									flex: 1;
								}

								.huoquyzm {
									color: #187AE7;
									font-size: 24rpx;
								}
							}
						}

						image {
							position: absolute;
							top: 23rpx;
							right: 20rpx;
							width: 27.78rpx;
							height: 27.78rpx;
						}
					}

					.i_inpout222 {
						display: flex;
						align-items: center;
						position: relative;
						width: 100%;
						border-radius: 10rpx;
						padding: 20rpx 20rpx;
						background-color: $pupUp-bg-color;
						border: 1px solid $input-border-color;

						view {
							color: #8e99a2;
						}

						image {
							position: absolute;
							top: 23rpx;
							right: 20rpx;
							width: 27.78rpx;
							height: 27.78rpx;
						}
					}
				}
			}
		}

		.myinfo {
			display: flex;
			align-items: center;
			background-color: $all-secondary-color;
			padding: 30rpx;
			border-radius: 12rpx;
			margin-bottom: 27rpx;

			.mytx {
				position: relative;

				.txicon {
					width: 94.93rpx;
					height: 94.93rpx;
					border-radius: 200rpx;
				}

				.editixcon {
					position: absolute;
					bottom: 0;
					right: 0;
					width: 25rpx;
					height: 25rpx;
				}
			}

			.myacnum {
				padding-left: 20rpx;
				color: $font-all-color;

				view:nth-child(1) {
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				view:nth-child(2) {
					//font-weight: bold;
					display: flex;
					align-items: center;
					color: #566488;
					font-size: 24rpx;
					image {
						width: 20rpx;
						height: 20rpx;
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>