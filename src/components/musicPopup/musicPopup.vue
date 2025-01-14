<template>
	<view :style="theme">




		<u-popup v-model="SignoutShow" width="650" height="80%" mode="center" close-icon-size="30" border-radius="14"
			:mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="SignoutShow = false">
				<view>{{$t('musicPopup.title')}}</view>
			</view>
			<view class="input_box">

				<view class="music_box">
					<view class="list_icon">
						<view class="list_box">
							
<view class="tem_box" v-for="(item, id) in list" :key="item.id || id" :class="{active: index == id}" @click.stop="setIndex(id)">
  <view class="listmisuc">
    <image v-if="index == id" src="/static/image/yinle2.png" mode=""></image>
    <view>{{ item.title }}</view>
  </view>
  <view v-if="index == id">
    <image src="/static/image/bofangzhong.png" mode="aspectFit"></image>
  </view>
</view>

							
							
						</view>
					</view>



					<view class="kongzhi_wrap">
						<view class="left_box">
							<view class="prev" @click="prev(index)">
								<u-icon name="rewind-left-fill" size="54" color="#343c44" v-if="index <= 0"></u-icon>
								<u-icon name="rewind-left-fill" size="54" color="#3673D9" v-else></u-icon>
							</view>
							<view class="bf" @click="setBf(!is_bf)" v-if="index != 0">
								<u-icon name="play-right-fill" size="64" color="#3673D9" v-if="!is_bf"></u-icon>
								<u-icon name="pause" size="64" color="#3673D9" v-else></u-icon>
							</view>
							<view class="bf" @click="setBf2(!is_bf)" v-if="index == 0">
								<u-icon name="play-right-fill" size="64" color="#3673D9" v-if="!is_bf"></u-icon>
								<u-icon name="pause" size="64" color="#3673D9" v-else></u-icon>
							</view>
							<view class="next" @click="next(index,list)">
								<u-icon name="rewind-right-fill" size="54" color="#343c44" v-if="index >= list.length - 1"></u-icon>
								<u-icon name="rewind-right-fill" size="54" color="#3673D9" v-else></u-icon>
							</view>
						</view>
						<view class="jindutiaode">
							<view class="geming">{{Title}}</view>
							<!-- 进度条 @click="getXy" -->
							<view class="jd_box">
								<view class="jd_n" :style="{width:schedule/max*100+'%'}"></view>
							</view>
							<!-- 时间 -->
							<view class="timer_box">
								<view>{{getTimer(schedule)}}</view>
								<view>{{getTimer(max)}}</view>
							</view>
						</view>

					</view>




					<!-- {{schedule}}/{{max}} -->
				</view>

			</view>
		</u-popup>
	</view>
</template>
<script>
	import {
		mapGetters,
		mapMutations,
		mutations,
		mapState
	} from 'vuex'
	export default {
		name: "musicPopup",
		data() {
			return {
				SignoutShow: false,
				Title: '',
			}
		},
		//监听数据发生变化
		watch: {
			schedule(val) {

			}
		},
		created() {

		},
		mounted() {
			let that = this
			let Musicdomains = uni.getStorageSync("Musicdomains")
			that.$u.post('/assets/music.json', {
				pid: 1
			}).then(res => {
				////console.log('音乐列表', res.data)
				let List = []
				res.data.forEach((item, index) => {
					List.push({
						"id": item.id,
						"title": item.name,
						"url": Musicdomains + item.url
					})
				});
				this.setList(List)
				this.getTitlel()
			})

		},
		computed: {
			...mapState(["schedule", "url", "max", "list", "is_bf", "index"])
		},
		methods: {
			...mapMutations(['setList', 'setSchedule', 'setTestArrInc', 'play', 'pause', 'setMusicUrl']),
			getTitlel() {
				this.Title = this.list[this.index].title
			},
			prev(index) {
				if (index <= 0) {
					return
				}
				this.setMusicUrl(index - 1)
				this.Title = this.list[index - 1].title
			},
			next(index, list) {
				if (index >= list.length - 1) {
					return
				}
				this.setMusicUrl(index + 1)
				this.Title = this.list[index + 1].title
			},
			setIndex(index) {
				////console.log('选择列表的',index)
				this.setMusicUrl(index);
				this.Title = this.list[index].title
			},
			getTimer(second) {
				let h = parseInt(second / 60 / 60 % 24);
				h = h < 10 ? '0' + h : h;
				let m = parseInt(second / 60 % 60);
				m = m < 10 ? '0' + m : m;
				let s = parseInt(second % 60);
				s = s < 10 ? '0' + s : s;
				let res = [h, m, s];
				return res[1] + ':' + res[2] //res[0] + ':' + res[1] + ':' + res[2]
			},
			getXy(e) {
				////console.log((e.detail.x - (e.currentTarget.offsetLeft * (document.documentElement.clientWidth / 1920))))
				this.setSchedule(((e.detail.x / (document.documentElement.clientWidth / 1920)) - e.currentTarget.offsetLeft) / 500);
			},
			//设置播放状态
			setBf(is) {
				////console.log('1',this.index)
				if (is) {
					this.play();
				} else {
					this.pause();
				}
			},
			setBf2(is){
				////console.log('2',this.index)
				if (is) {
					this.setMusicUrl(0);
					this.Title = this.list[0].title
					this.play();
				} else {
					this.pause();
				}
			},
			openPopup() {
				this.SignoutShow = true
			},
			closewindows() {
				this.SignoutShow = false
			},
		},
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

	.music_box {
		width: 100%;
	}

	.kongzhi_wrap {
		padding: 40rpx 30rpx;
		background-color: $all-secondary-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		bottom: 0;
		z-index: 999;
	}

	.jindutiaode {
		flex: 1;
		padding-left: 30rpx;
	}

	.geming {
		color: $all-secondary-text-color;
		//font-weight: bold;
		margin-bottom: 10rpx;
		font-size: 26rpx;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.left_box {
		display: flex;
		align-items: center;
	}

	.bf {
		margin: 0 20px;
	}

	.timer_box {
		margin-top: 10rpx;
		color: $font-all-color;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.jd_box {
		margin-top: 20rpx;
		width: 100%;
		height: 8px;
		background-color: rgba(255, 255, 255, 1);
		position: relative;
		border-radius: 200rpx;
	}

	.jd_n {
		width: 0%;
		height: 100%;
		background-color: #187ae7;
		border-radius: 200rpx;
	}

	.list_icon {
		position: relative;
		padding: 30rpx 30rpx 0 30rpx;
	}

	.list_box {
		width: 100%;
	}

	.list_box>view {
		width: 100%;
		text-align: center;
		font-size: 14px;
		line-height: 30px;
		text-align: left;
	}

	.tem_box {
		padding: 15rpx 25rpx;
		border-radius: 16rpx;
		color: $font-all-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.listmisuc {
			display: flex;
			align-items: center;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 15rpx;
			}
			view {
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
				flex: 1;
			}
		}

		view:nth-child(2) {
			display: flex;
			align-items: center;

			image {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}

	.active {
		background: $select-drop-down-bg-color;
		padding: 15rpx 20rpx;
		border-radius: 16rpx;
		color: $all-secondary-text-color;
		//font-weight: bold;
	}
</style>