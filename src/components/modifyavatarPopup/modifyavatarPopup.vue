<template>
	<view :style="theme">

		<u-popup v-model="RegiserShow" width="650" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="RegiserShow = false">
				<view>{{$t('avatarPopup.title')}}</view>
			</view>
			<view class="input_box">
				<view class="input_item">
					<view class="input_item_title">{{$t('NewlyAdded.Nickname')}} *</view>
					<view class="input_item_true" :class="input_border1 == 1?'input_border':''">
						<u-input v-model="nickname" autocomplete="new-password" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
					</view>
				</view>
					
				<view class="avatar_box">
					<u-row gutter="16">
						<u-col span="3" v-for="(item,index) in avatarlist" :key="index" @click="cosavatar(item,index)">
							<view class="demo-layout">
								<image :src="item.img" :class="avatarlistIdx == item.id?'border':''"></image>
							</view>
						</u-col>
					</u-row>
				</view>

				<view class="Register_btn">
					<u-button type="primary" @click="baocun()">{{$t('avatarPopup.popupbtn')}}</u-button>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "modifyavatarPopup",
		props: {
			
		},
		data() {
			return {
				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},
				input_border1: 0,
				RegiserShow: false,
				nickname: '',
				
				avatarlist: [{
					img: '/static/touxiang/1.png',
					id: 1
				}, {
					img: '/static/touxiang/2.png',
					id: 2
				}, {
					img: '/static/touxiang/3.png',
					id: 3
				}, {
					img: '/static/touxiang/4.png',
					id: 4
				}, {
					img: '/static/touxiang/5.png',
					id: 5
				}, {
					img: '/static/touxiang/6.png',
					id: 6
				}, {
					img: '/static/touxiang/7.png',
					id: 7
				}, {
					img: '/static/touxiang/8.png',
					id: 8
				}, {
					img: '/static/touxiang/9.png',
					id: 9
				}, {
					img: '/static/touxiang/10.png',
					id: 10
				}, {
					img: '/static/touxiang/11.png',
					id: 11
				}, {
					img: '/static/touxiang/12.png',
					id: 12
				}, {
					img: '/static/touxiang/13.png',
					id: 13
				}, {
					img: '/static/touxiang/14.png',
					id: 14
				}, {
					img: '/static/touxiang/15.png',
					id: 15
				}, {
					img: '/static/touxiang/16.png',
					id: 16
				}, {
					img: '/static/touxiang/17.png',
					id: 17
				}, {
					img: '/static/touxiang/18.png',
					id: 18
				}, {
					img: '/static/touxiang/19.png',
					id: 19
				}, {
					img: '/static/touxiang/20.png',
					id: 20
				}],
				avatarlistIdx: 1,
				
				avatarID: 1

			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			
		},
		mounted() {
			let that = this
			let userInfo = uni.getStorageSync("userinfo")
			let headId = userInfo.headId || 0
			that.avatarlistIdx = headId
			that.nickname = userInfo.nickName
		},
		methods: {
			input1(e) {
				if (!e) {
					this.isDisabledTwo = true
				} else {
					this.isDisabledTwo = false
				}
			},
			inputBlur1(e) {
				this.input_border1 = 0
			},
			inputfocus1() {
				this.input_border1 = 1
			},
			
			
			
			openPopup() {
				this.RegiserShow = true
			},
			closewindows() {
				this.RegiserShow = false
			},
			cosavatar(item, idx) {
				this.avatarlistIdx = item.id
				this.avatarID = item.id
			},
			baocun(e) {
				var that = this
				
				let serialNo = uni.getStorageSync('thisUuid')
				let machineName = uni.getStorageSync('machineName')
				let ua = uni.getStorageSync('thisUa')
				
				that.$u.post('/head-id', {
					headId: that.avatarID,
					nickName: that.nickname,
					deviceId: serialNo, //设备序列码
					deviceType: machineName, //设备型号
				}).then(res => {
					
					let Newchatavatar = uni.getStorageSync('userinfo')
					Newchatavatar.headId = that.avatarID
					uni.setStorageSync('userinfo', Newchatavatar)
					
					//更新缓存userName
					//let NewchatNmae = uni.getStorageSync('userinfo')
					//NewchatNmae.username = that.nicheng
					//uni.setStorageSync('userinfo', NewchatNmae)
					that.RegiserShow = false
					
					that.$emit('Yixuande', this.avatarID)
					
				}).catch(err => {
				
				})
				
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
		
		padding: 30rpx 0;
		
		.input_item {
			margin-bottom: 30rpx;
			padding: 0 30rpx;
		
			.input_item_title {
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-size: 30rpx;
			}
		
			.input_item_true {
				background-color: $all-secondary-color;
				border: 1px solid $input-border-color;
				border-radius: 10px;
				padding: 5rpx 20rpx;
				display: flex;
				align-items: center;
				.phone-code {
					border-right: 1px solid #2f4553;
					padding: 0 20rpx 0 0;
					color: #7b98bf;
					margin-right: 20rpx;
				}
			}
		}

		.avatar_box {
			.demo-layout {
				text-align: center;
				margin-bottom: 30rpx;

				image {
					width: 122rpx;
					height: 122rpx;
					border-radius: 200rpx;
					border: 6rpx solid #1D262D;
				}

				.border {
					border: 6rpx solid #3673D9 !important;
				}
			}
		}

		.Register_btn {
			width: 92%;
			margin: 0 auto;
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