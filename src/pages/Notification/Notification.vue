<template>
	<view :style="theme" class="page_boxs">
		
		<match-media :max-width="800" >
			<navbar ref="child" :title="$t('NewlyAdded.Notify')" :isCountTo="false" :is_secondary="false"></navbar>
		</match-media>
		<!-- <uni-transition :mode-class="['fade', 'zoom-in']"
			:styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}"
			:show="showOptions"> -->

			<pagesNavTitle ref="" :title="$t('NewlyAdded.Notify')"></pagesNavTitle>


			<view class="page_wrap">
				<!-- <view class="tabs_box">
					<view class="tabs_item" v-for="(item,index) in tabsList" :key="index" @click="clicktabs(index)">
						<view class="num_tag" v-if="index==0 && SystemunreadList.length != 0">{{SystemunreadList.length}}</view>
						<view class="num_tag" v-if="index==1 && PersonalunreadList.length != 0">{{PersonalunreadList.length}}</view>
						<view class="item_name" :class="tabsidx == index?'xzuanzhong':''">{{item.name}}</view>
						<view class="item_mask" v-if="tabsidx == index"></view>
						<view class="item_border" v-if="tabsidx == index"></view>
					</view>
				</view> -->
				
				
				<view class="tabs_sm">
					<view :class="tabsidx == 0?'curbg':''" @click="clicktabs(0)">{{$t('NotificationPage.SystemNotice')}}</view>
					<view :class="tabsidx == 1?'curbg':''" @click="clicktabs(1)" v-if="islogin == 1">{{$t('NotificationPage.PersonalNotice')}}</view>
					
					<!-- <view class="num_tag" v-if="tabsidx == 0 && SystemunreadList.length != 0">{{SystemunreadList.length}}</view>
					<view class="num_tag" v-if="tabsidx == 1 && PersonalunreadList.length != 0">{{PersonalunreadList.length}}</view> -->
					
				</view>
				

				<view v-if="msgList.length != 0">
					<view class="noc_list" v-for="(item,index) in msgList" :key="index">
						<view class="noc_list_item">
							<view class="noc_list_item_time">
								<view>{{$u.timeFormat(item.sentTime, 'yyyy-mm-dd hh:MM')}}</view>
								<span v-if="item.status == 0"></span>
								<u-icon v-if="item.status != 0 && tabsidx == 1" name="trash-fill" color="#787e90" size="28" @click="del(item,index)"></u-icon>
							</view>
							<view class="noc_list_item_title">{{item.title}}</view>
							<view class="ncon_info">
								<!-- <liu-show-hide :itiemid="item.mailId" defaultHeight="150rpx"
									:showText="$t('NotificationPage.ShowAll')" :hideText="$t('NotificationPage.Hide')"
									@change="change">
									<view class="content">{{ item.content }}</view>
								</liu-show-hide> -->
								<mote-lines-divide @change="change" :itiemid="item.mailId" :dt="item.content" :line="1" :expandText="$t('NotificationPage.ShowAll')" :foldHint="$t('NotificationPage.Hide')"/>
							</view>
							<!---<view class="noc_btn">
							<view>Show All</view>
							<image src="/static/image/chevron.png"></image>
						</view>-->
						</view>
					</view>
				</view>
				<view class="nodata_all" v-else>
					<image src="/static/image/NoNotifications.png" mode="widthFix"></image>
					<view>{{$t('NotificationPage.Blankprompt1')}}</view>
				</view>

			</view>

		<!-- </uni-transition> -->
	</view>
</template>

<script>
	import MoteLinesDivide from "@/components/mote-lines-divide/mote-lines-divide";
	export default {
		components: {
		    MoteLinesDivide
		},
		data() {
			return {
				islogin: 0,
				showOptions: true,
				//tabsList: [],
				tabsidx: 0,
				istype: 1,
				lastMailidMin: 0,
				msgList: [],

				SystemunreadList: [],
				PersonalunreadList: []

			}
		},
		onLoad() {
			this.getnews()
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			let isToken = uni.getStorageSync("token")
			if (!isToken) {
				this.islogin = 0
			} else {
				this.islogin = 1
				this.getSystemUnread()
				this.getPersonalUnread()
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
		computed: {
			tabsList() {
				let isToken = uni.getStorageSync("token")
				let arry = []
				if (!isToken) {
					arry = [{
						name: this.$t('NotificationPage.SystemNotice')
					}]
				}
				if (isToken) {
					arry = [{
						name: this.$t('NotificationPage.SystemNotice')
					}, {
						name: this.$t('NotificationPage.PersonalNotice')
					}]
				}
				return arry
			},
		},
		updated() {

		},
		onHide() {
			//////console.log('页面隐藏了')
			uni.setStorageSync("NotisOpen", 0)
		},
		onUnload() {
			//////console.log('页面卸载了')
			uni.setStorageSync("NotisOpen", 0)
		},
		methods: {
			getnews() {
				let that = this
				that.$u.post('/query-mail', {
					type: that.istype, // number 是 类型（1系统消息 2 个人消息）
					lastMailId: that.lastMailidMin // number 是 已返回的最小的消息 id，首次查询填0
				}).then(ress => {
					that.msgList = ress.data

				})
			},
			getSystemUnread() {
				let that = this
				that.$u.post('/query-mail', {
					type: 1,
					lastMailId: that.lastMailidMin
				}).then(ress => {
					let unread = [];
					ress.data.forEach((item, index) => {
						if (item.status == 0) {
							unread.push(item)
						}
					});
					that.SystemunreadList = unread
				})
			},
			getPersonalUnread() {
				let that = this
				that.$u.post('/query-mail', {
					type: 2,
					lastMailId: that.lastMailidMin
				}).then(ress => {
					let unread = [];
					ress.data.forEach((item, index) => {
						if (item.status == 0) {
							unread.push(item)
						}
					});
					that.PersonalunreadList = unread
				})
			},
			clicktabs(idx) {
				this.tabsidx = idx
				if (idx == 0) {
					this.istype = 1
					this.getnews()
				} else if (idx == 1) {
					this.istype = 2
					this.getnews()
				}
			},
			change(e) {
				let that = this
				
				let isToken = uni.getStorageSync("token")
				if (!isToken) {
				
				} else {
					that.$u.post('/read-mail', {
						mailId: parseInt(e),
					}).then(ress => {
						this.getnews()
						this.getSystemUnread()
						this.getPersonalUnread()
						uni.$emit('getMyUnread', 1)
					})
				}
				
				
			},
			del(item, idx) {
				////console.log(item)
				let that = this
				that.$u.post('/del-mail', {
					mailId: parseInt(item.mailId),
				}).then(ress => {
					this.getnews()
					this.getSystemUnread()
					this.getPersonalUnread()
					uni.$emit('getMyUnread', 1)
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		//background-color: #f6f6f6;
	}
	
	.tabs_sm {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $all-secondary-color;
		border-radius: 19rpx;
		margin: 15rpx 0 35rpx 0;
		padding: 10rpx;
	
		view {
			font-weight: bold;
			color: #54647d;
			flex: 1;
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
		}
	
		.curbg {
			background-color: #2283f6 !important;
			color: #ffffff !important;
			border-radius: 14rpx;
		}
	}

	.title {
		font-size: 24px;
		margin-bottom: 10px;
		margin: 32rpx;
	}

	.author {
		color: #888;
		margin: 32rpx;
		margin-bottom: 20px;
	}

	.content {
		line-height: 1.5;
		font-size: 24rpx;
		text-indent: 0;
		white-space: pre-wrap;
		padding: 0 0;
	}

	.page_wrap {
		padding: 20rpx 20rpx;
		background-color: $body-bg-color !important;
		.noc_list {
			background-color: $all-secondary-color;
			border-radius: 12rpx;
			padding: 30rpx 30rpx 20rpx 30rpx;
			margin: 30rpx 0;

			.noc_list_item {
				.noc_list_item_time {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: $font-all-color;

					span {
						display: inline-block;
						width: 19.44rpx;
						height: 19.44rpx;
						background-color: #3673D9;
						border-radius: 200rpx;
					}
				}

				.noc_list_item_title {
					color: #FEFEFE;
					//font-weight: bold;
					margin: 24rpx 0 34rpx 0;
				}

				.ncon_info {
					font-size: 24rpx;
					color: $font-all-color;
					margin-bottom: 10rpx;
				}

				.noc_btn {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					color: $font-all-color;
					margin-left: auto;
					font-size: 24rpx;

					image {
						width: 20rpx;
						height: 20rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.tabs_box {
			border-radius: 12rpx 12rpx 0 0;
			border-bottom: 2px solid #2F4553;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 92rpx;
			position: relative;

			.tabs_item {
				flex: 1;
				position: relative;
				text-align: center;
				height: 92rpx;

				.num_tag {
					background-color: #3673D9;
					text-align: center;
					border-radius: 10rpx;
					padding: 2rpx 14rpx;
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					font-size: 20rpx;
					color: #FEFEFE;
					z-index: 19;
				}

				.item_name {
					width: 100%;
					color: $font-all-color;
					//font-weight: bold;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 9;
					font-size: 26rpx;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.xzuanzhong {
					color: #FEFEFE !important;
					font-weight: bold;
				}

				.item_mask {
					background-color: #1e2b37;
					height: 27px;
					width: 100%;
					background-image: linear-gradient(to top, rgb(34, 61, 82), rgb(13, 19, 28));
					border-radius: 0 0 0 0;
					position: absolute;
					bottom: 0;
					left: 0;
					z-index: 1;
				}

				.item_border {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 2px;
					background-color: #3673D9;
					z-index: 2;
				}
			}
		}

	}
</style>