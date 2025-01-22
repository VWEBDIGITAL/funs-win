<template>
	<match-media :max-width="800">
		<view class="mobile-footer qiaozhi" :style="theme">
			<view class="page_wrap">
				<view class="Logo">
					<uni-row class="row">
						<uni-col :xs="8" :sm="8" :md="8" :lg="8">
							<view class="logo">
								<image class="logo" :src="'/static/logo/' + platform + '_LOGO_MAIN.png'" mode="widthFix"></image>
							</view>
						</uni-col>
					</uni-row>
					<view class="copyright mb-3">
						<copyright></copyright>
					</view>
					<view class="social-icons"
						v-if="facebook || twitter || telegram || instagram || youtube || pinterest">
						<view class="huoban">
							<!-- Facebook -->
							<view v-show="facebook" @click="toWebUrl(facebook)" v-html="facebookSvg"></view>

							<!-- Twitter -->
							<view v-show="twitter" @click="toWebUrl(twitter)" v-html="twitterSvg"></view>

							<!-- Telegram -->
							<view v-show="telegram" @click="toWebUrl(telegram)" v-html="telegramSvg"></view>

							<!-- Instagram -->
							<view v-show="instagram" @click="toWebUrl(instagram)" v-html="instagramSvg"></view>

							<!-- YouTube -->
							<view v-show="youtube" @click="toWebUrl(youtube)" v-html="youtubeSvg"></view>

							<!-- Pinterest -->
							<view v-show="pinterest" @click="toWebUrl(pinterest)" v-html="pinterestSvg"></view>
						</view>
					</view>
				</view>
				<view class="About">
					<view class="About_title" @click="show_more(1)">
						<view>{{$t('AboutUs')}}</view>
						<view class="moreIcon" :class="[showinfoOne?'no-showOptions' : 'showOptions']">
							<u-icon name="arrow-down" color="#58647c"></u-icon>
						</view>
					</view>
					<view class="info_1" v-if="showinfoOne">
						<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('PrivacyPolicy') + '&type=1')">
							{{$t('PrivacyPolicy')}}</view>
						<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('Licenses') + '&type=2')">
							{{$t('Licenses')}}</view>
						<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('AMLPolicy') + '&type=3')">
							{{$t('AMLPolicy')}}</view>
						<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('TermsofService') + '&type=4')">
							{{$t('TermsofService')}}</view>
						<view @click="Toxieyi('/pages/AboutUs/AboutUs?title=' + $t('ResponsibleGambling') + '&type=5')">
							{{$t('ResponsibleGambling')}}</view>
					</view>
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
				<!-- Qiaozhi Game-Providers -->
				<GamesProviders />
				<view class="shiBa_wrap">
					<view class="shiba_icon">
						<image src="/static/image/18jia.png" mode="widthFix"></image>
					</view>
					<view class="shiba_text">
						{{$t('ADDnew.18TIP')}}
					</view>
				</view>
			</view>
		</view>
	</match-media>
</template>

<script>
import GamesProviders from "@/components/GamesProviders/GamesProviders.vue";
	export default {
		components: {
			GamesProviders,
		 },
		name: "home-bottom-info",
		data() {
			return {
				platform: this.PID,
				showinfoOne: false,
				showinfoTwo: false,
				facebook: "https://facebook.com",
				instagram: "https://instagram.com",
				pinterest: "https://pinterest.com",
				telegram: "https://telegram.com",
				twitter: "https://x.com",
				youtube: "https://youtube.com",
				facebookSvg: `<svg class="icon" viewBox="0 0 96 96" class="svg-icon w-6 md:w-4 h-auto text-white" style=""><path d="M72.614.633c-1.05 0-2.1-.195-3.165-.27-1.5-.105-3.135-.21-4.71-.27-1.575-.06-3.24-.09-4.935-.09C59.672 0 59.516 0 59.36 0c-2.993 0-5.87.513-8.54 1.455L51 1.4c-4.326 1.479-7.842 4.386-10.062 8.147l-.047.087c-1.311 2.238-2.268 4.854-2.712 7.64l-.018.13a31.09 31.09 0 0 0-.405 5.079v.29-.014 12.419h-14.7v17.099h14.685V96H55.5V52.263h14.654c.735-5.715 1.5-11.385 2.205-17.1h-16.86a2.729 2.729 0 0 1 0-.338v.009-11.61c0-1.23.238-2.405.667-3.482l-.021.063a5.483 5.483 0 0 1 3.5-3.291l.04-.009a11.718 11.718 0 0 1 3.611-.555h.192-.009 9.09c.374 0 .374 0 .374-.36V1.026c0-.24-.03-.375-.33-.39V.633Z"></path></svg>`,
                twitterSvg: `<svg class="icon" viewBox="0 0 96 96" class="svg-icon w-6 md:w-4 h-auto text-white" style=""><path d="M54.821 42.49 81.607 12h-6.345L51.994 38.47 33.424 12H12l28.088 40.03L12 84h6.345l24.556-27.958L62.516 84H83.94M20.635 16.686h9.748l44.874 62.858h-9.75"></path></svg>`,
                telegramSvg: `<svg class="icon" viewBox="0 0 64 64" class="svg-icon w-6 md:w-4 h-auto text-white" style=""><path d="M16 2.666v48c0 1.6-1.066 2.666-2.666 2.666-1.6 0-2.666-1.066-2.666-2.666V8h-8v45.334c0 4.534 3.466 8 8 8h50.666V2.668H16v-.002ZM34.666 48H24V26.666h10.666V48Zm18.668 0H40v-8h13.334v8Zm0-13.334H40v-8h13.334v8Zm0-13.332H24v-8h29.334v8Z"></path></svg>`,
                instagramSvg: `<svg class="icon" viewBox="0 0 96 96" class="svg-icon w-6 md:w-4 h-auto text-white" style=""><path fill-rule="evenodd" clip-rule="evenodd" d="M71.586.1H24.414A24.414 24.414 0 0 0 0 24.515v47.173A24.212 24.212 0 0 0 24.414 95.9h47.172A24.209 24.209 0 0 0 96 71.687V24.514A24.414 24.414 0 0 0 71.586.101Zm14.487 72.03a13.883 13.883 0 0 1-13.841 14.044H23.808A13.88 13.88 0 0 1 9.927 72.13V23.707a13.881 13.881 0 0 1 13.881-13.68h48.424A13.882 13.882 0 0 1 86.114 23.91l-.04 48.222ZM72.396 28.995a4.802 4.802 0 1 0 0-9.604 4.802 4.802 0 0 0 0 9.604Zm-37.543-.54a23.647 23.647 0 0 1 13.17-3.98A23.607 23.607 0 0 1 71.629 47.92a23.647 23.647 0 1 1-36.776-19.465Zm5.105 31.736A14.529 14.529 0 0 0 62.509 47.92a14.527 14.527 0 1 0-22.551 12.27Z"></path></svg>`,
                youtubeSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 8.64L15.5 12 10 15.36V8.64zm9.5 4.36L20 7c-1.4-1.4-3.56-1.4-4.95 0-.76.76-1.19 1.78-1.14 2.89-.26-.03-.52-.04-.78-.04-3.31 0-6 2.69-6 6 0 .78.12 1.53.31 2.25-.55-.09-1.08-.18-1.64-.24-.43-.11-.89-.13-1.34-.12-.19 0-.38 0-.57.02.26-.45.43-.97.43-1.5 0-1.69-1.11-3.12-2.58-3.71-1.51-.6-3.23-.53-4.55.16-.61.31-1.07.79-1.4 1.38-.33-.35-.66-.7-.99-1.05 2.14-3.1 5.46-5.22 9.13-5.22 2.59 0 4.95.99 6.74 2.79 2.24 2.19 3.35 5.02 3.35 8.01 0 1.66-.47 3.25-1.3 4.64z"/></svg>`,
                pinterestSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 2c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm0 3c-1.66 0-3 1.34-3 3 0 1.66 1.34 3 3 3 1.66 0 3-1.34 3-3 0-1.66-1.34-3-3-3zm0 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>`
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