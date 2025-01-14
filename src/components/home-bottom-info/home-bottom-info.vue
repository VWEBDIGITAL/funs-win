<template>
	<view :style="theme">
		<view class="footer page_wrap">
			<view class="About">
				<view class="About_title" @click="show_more(1)">
					<view>{{$t('AboutUs')}}</view>
					<view class="moreIcon" :class="[showinfoOne?'no-showOptions' : 'showOptions']">
						<u-icon name="arrow-down" color="#58647c"></u-icon>
					</view>
				</view>
				<view class="info_1" v-if="showinfoOne">
					<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('PrivacyPolicy') + '&type=1')">{{$t('PrivacyPolicy')}}</view>
					<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('Licenses') + '&type=2')">{{$t('Licenses')}}</view>
					<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('AMLPolicy') + '&type=3')">{{$t('AMLPolicy')}}</view>
					<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('TermsofService') + '&type=4')">{{$t('TermsofService')}}</view>
					<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('ResponsibleGambling') + '&type=5')">{{$t('ResponsibleGambling')}}</view>
				</view>
			</view>
			<view class="About">
				<view class="About_title" @click="show_more(2)">
					<view>{{$t('Support')}}</view>
					<view class="moreIcon" :class="[showinfoTwo?'no-showOptions' : 'showOptions']">
						<u-icon name="arrow-down" color="#58647c"></u-icon>
					</view>
				</view>
				<view class="info_1" v-if="showinfoTwo">
					<view>{{$t('Fairness')}}</view>
					<view @click="Topages('/pages/VipClubsNew/VipClubsNew')">{{$t('VIPClub')}}</view>
					<view @click="Totabbar('/pages/Referandearn/Referandearn')">{{$t('Refer&Earn')}}</view>
					<view @click="Totabbar('/pages/Bonus-Logoin/Bonus-Logoin')">{{$t('Promotions')}}</view>
					<view @click="Livesupport()">{{$t('LiveSupport')}}</view>
					<view @click="Topages('/pages/FrequentlyAskedQuestions/FrequentlyAskedQuestions')">
						{{$t('HelpCenter')}}</view>
				</view>
			</view>
			<view class="shiBa_wrap">
				<view class="shiba_icon">
					<image src="/static/image/18jia.png" mode="widthFix"></image>
				</view>
				<view class="shiba_text">
					{{$t('ADDnew.18TIP')}}
				</view>
			</view>
			<view class="About" v-if="facebook || twitter || telegram || instagram || youtube || pinterest">
				<view class="huoban">
					<image src="/static/image/home/share_321374ebb.png" @click="toWebUrl(facebook)" v-if="facebook">
					</image>
					<image src="/static/image/home/share_8ae8effba.png" @click="toWebUrl(twitter)" v-if="twitter">
					</image>
					<image src="/static/image/home/share_7f3cb39a2.png" @click="toWebUrl(telegram)" v-if="telegram">
					</image>
					<image src="/static/image/home/share_6b1025447.png" @click="toWebUrl(instagram)" v-if="instagram">
					</image>
					<image src="/static/image/home/share_52a1f1696.png" @click="toWebUrl(youtube)" v-if="youtube">
					</image>
					<image src="/static/image/home/share_245a347d3.png" @click="toWebUrl(pinterest)" v-if="pinterest">
					</image>
				</view>
			</view>
			<copyright></copyright>
		</view>
	</view>
</template>

<script>
	export default {
		name: "home-bottom-info",
		data() {
			return {
				showinfoOne: true,
				showinfoTwo: false,
				facebook: "",
				instagram: "",
				pinterest: "",
				telegram: "",
				twitter: "",
				youtube: ""
			};
		},
		created() {
			this.getShequ()
		},
		methods: {
			getShequ() {
				let that = this
				that.$u.post('/customer/service', {

				}).then(ress => {

					that.facebook = ress.data.facebook || ""
					that.instagram = ress.data.instagram || ""
					that.pinterest = ress.data.pinterest || ""
					that.telegram = ress.data.telegram || ""
					that.twitter = ress.data.twitter || ""
					that.youtube = ress.data.youtube || ""

					//console.log('社区链接',ress.data)
				})
			},
			toWebUrl(url) {
				console.log(url)
				// #ifdef APP-PLUS
				plus.runtime.openURL(url);
				// #endif

				// #ifdef H5
				window.open(url, '_blank');
				// #endif
			},
			show_more(type) {
				if (type == 1) {
					if (this.showinfoOne == true) {
						this.showinfoOne = false
					} else {
						this.showinfoOne = true
					}
				} else if (type == 2) {
					if (this.showinfoTwo == true) {
						this.showinfoTwo = false
					} else {
						this.showinfoTwo = true
					}
				}
			},
			Topages(url) {
				uni.navigateTo({
					url: url
				})
			},
			Totabbar(url) {
				uni.switchTab({
					url: url
				})
			},
			Livesupport() {
				let that = this
				const language = uni.getStorageSync('language') || uni.getStorageSync('UNI_LOCALE');
				that.$u.post('/game/chat', {
					pid: this.PID,
					lang: language
				}).then(res => {
					let chatUrl = res.data.chatUrl

					// #ifdef APP-PLUS
					plus.runtime.openURL(chatUrl);
					// #endif

					// #ifdef H5
					// let url_ = '/pages/chatWebview/chatWebview?url=' + encodeURIComponent(JSON.stringify(chatUrl))
					// if (url_.indexOf('%') > -1) {
					// 	url_ = url_.replace(/%/g, '%25');
					// }
					setTimeout(() => {
						window.open(chatUrl, '_blank');
					}, 500)
					let windowWidth = uni.getSystemInfoSync().windowWidth
					if (windowWidth >= "800") {
						uni.$emit('OpenPCKefu', chatUrl);
					} else {
						uni.navigateTo({
							url: url_
						})
					}
					// #endif

				})
			},
			Toxieyi(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
.moreIcon {
  transform: rotate(-180deg);
  transition: all 0.3s;
  transform-origin: center;
}

.showOptions {
  transform: rotate(0) !important;
}

.no-showOptions {
  transform: rotate(-180deg) !important;
}

.page_wrap {
  padding: 1rpx 40rpx 150px 40rpx;
  background-color: $bottom-info-bg-color;

  .shiBa_wrap {
    display: flex;
    align-items: flex-start;
    border-top: 1px solid $bottom-info-border;
    padding-top: 45rpx;

    .shiba_icon {
      margin-right: 25rpx;

      image {
        width: 55rpx;
      }
    }

    .shiba_text {
      color: #58647c;
      font-size: 22rpx;
    }
  }

  .About {
    text-align: left;
    margin: 45rpx 0;

    .About_title {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 30rpx;
      font-weight: bold;
      color: $me-text-color;
    }

    .huoban {
      display: flex;
      align-items: center;
      justify-content: center;

      border-top: 1px solid $bottom-info-border;
      border-bottom: 1px solid $bottom-info-border;

      padding: 45rpx 0;

      image {
        cursor: pointer;
        width: 63.89rpx;
        height: 63.89rpx;
        margin: 0 10rpx;
      }
    }

    .info_1 {
      text-align: left;
      color: #58647c;
      font-size: 24rpx;

      view {
        margin: 24rpx 0;
        cursor: pointer;
      }
    }
  }
}

@media (min-width: 800px) {
  .page_wrap {
    padding: 1rpx 40rpx 40rpx 40rpx;
    margin-bottom: 0;
  }
}
</style>