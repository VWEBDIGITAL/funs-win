<template>
	<view :style="theme">

		<u-popup v-model="LanguageShow" width="650" height="80%" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="true">
			<view class="reg_title" @click="LanguageShow = false">
				<view>{{$t('languagePopup.title')}}</view>
			</view>
			<view class="input_box">

				<view class="Language_list_wrap">
					<view class="Language_list_item" v-for="(item,index) in LanguageList" :key="index" @click="xuanzeL(item,index)">
						<view class="list_item_box" :class="Languageidx == index?'list_item_box_bg':''">
							<view class="lang_name" :class="Languageidx == index?'lang_name_a':''">
								<image :src="item.icon"></image>
								<text>{{item.name}}</text>
							</view>
							<view class="cosicon">
								<image src="/static/image/xuanzhonggou.png" v-if="Languageidx == index"></image>
								<image src="/static/image/weixuanzhong.png" v-else></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="Register_btn">
				<u-button type="primary" @click="Confirm()">{{$t('languagePopup.popupbtn')}}</u-button>
			</view>
			
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: "LanguagePopup",
		props: {

		},
		data() {
			return {
				
				/**English
				中文简体
				Português
				Filipino
				বাংলা
				日本語
				ภาษาไทย
				Español
				Indonesia
				Tiếng việt*/

				LanguageShow: false,
				LanguageList: [{
					id: 'tl',
					name: 'Filipino',
					icon: '/static/Nationalflag/187-philippines.png'
				}, {
					id: 'pt',
					name: 'Português',
					icon: '/static/Nationalflag/098-portugal.png'
				}, {
					id: 'en',
					name: 'English',
					icon: '/static/Nationalflag/186-united-states.png'
				}, 
				{
					id: 'zh',
					name: '中文简体',
					icon: '/static/Nationalflag/011-china.png'
				}, 
				{
					id: 'bn',
					name: 'বাংলা',
					icon: '/static/Nationalflag/134-bangladesh.png'
				}, {
					id: 'ja',
					name: '日本語',
					icon: '/static/Nationalflag/241-japan.png'
				}, {
					id: 'th',
					name: 'ภาษาไทย',
					icon: '/static/Nationalflag/088-thailand.png'
				}, {
					id: 'es',
					name: 'Español',
					icon: '/static/Nationalflag/230-spain.png'
				}, {
					id: 'id',
					name: 'Indonesia',
					icon: '/static/Nationalflag/220-monaco.png'
				}, {
					id: 'vi',
					name: 'Tiếng Việt',
					icon: '/static/Nationalflag/109-vietnam.png'
				}, {
					id: 'hi',
					name: 'हिन्दी',
					icon: '/static/Nationalflag/055-india.png'
				}, {
					id: 'zh-HK',
					name: '繁体中文',
					icon: '/static/Nationalflag/196-hong-kong.png'
				}, {
					id: 'ko',
					name: '한국인',
					icon: '/static/Nationalflag/219-south-korea.png'
				}],
				Languageidx: 0,
				curLanguage: {}
			};
		},
		watch: {

		},
		computed: {

		},
		created() {

		},
		mounted() {
			
			
			//#ifdef H5
			let is_lang = navigator.language.substring(0, 2);
			//先独立出简体zh-CN
			let is_langs = navigator.language;
			if(is_langs == 'zh-CN'){
				is_lang = 'zh'
			} else if (is_langs == 'zh-HK' || is_langs == 'zh-TW' || is_langs == 'zh-MO'){
				is_lang = 'zh-HK'
			} else if(is_langs == 'fil') {
				is_lang = 'tl'
			} else {
				is_lang = is_lang
			}
			
			// let is_lang = navigator.language;
			// if (is_lang == 'fil') {
			// 	is_lang = 'tl'
			// } else if(is_lang == 'zh-CN') {
			// 	is_lang = 'zh'
			// } else {
			// 	is_lang = is_lang
			// }
			// #endif
			
			//#ifdef APP-PLUS
			let is_systemInfo = uni.getSystemInfoSync();
			let is_lang = is_systemInfo.language;
			if (is_lang == 'fil') {
				is_lang = 'tl'
			} else if(is_lang == 'zh-CN') {
				is_lang = 'zh'
			} else {
				is_lang = is_lang
			}
			// #endif
			
			
			let language = uni.getStorageSync('language') || is_lang;
			if (language == "tl") {
				this.Languageidx = 0
				this.curLanguage = {
					id: 'tl',
					name: 'Philippines'
				}
			} else if (language == "pt") {
				this.Languageidx = 1
				this.curLanguage = {
					id: 'pt',
					name: 'Portugal'
				}
			} else if (language == "en") {
				this.Languageidx = 2
				this.curLanguage = {
					id: 'en',
					name: 'English'
				}
			} 
			else if (language == "zh") {
				this.Languageidx = 3
				this.curLanguage = {
					id: 'zh',
					name: '中文简体'
				}
			} 
			else if (language == "bn") {
				this.Languageidx = 4
				this.curLanguage = {
					id: 'bn',
					name: 'Bengal'
				}
			} else if (language == "ja") {
				this.Languageidx = 5
				this.curLanguage = {
					id: 'ja',
					name: 'Japan'
				}
			} else if (language == "th") {
				this.Languageidx = 6
				this.curLanguage = {
					id: 'th',
					name: 'Thailand'
				}
			} else if (language == "es") {
				this.Languageidx = 7
				this.curLanguage = {
					id: 'es',
					name: 'Spain'
				}
			} else if (language == "id") {
				this.Languageidx = 8
				this.curLanguage = {
					id: 'id',
					name: 'Indonesia'
				}
			} else if (language == "vi") {
				this.Languageidx = 9
				this.curLanguage = {
					id: 'vi',
					name: 'Vietnam'
				}
			} else if (language == "hi") {
				this.Languageidx = 10
				this.curLanguage = {
					id: 'hi',
					name: 'हिन्दी'
				}
			} else if (language == "zh-HK") {
				this.Languageidx = 11
				this.curLanguage = {
					id: 'zh-HK',
					name: '繁体中文'
				}
			} else if (language == "ko") {
				this.Languageidx = 12
				this.curLanguage = {
					id: 'ko',
					name: '한국인'
				}
			}
		},
		methods: {
			xuanzeL(item, idxx) {
				this.Languageidx = idxx
				this.curLanguage = item;
			},
			openPopup() {
				this.LanguageShow = true
			},
			closewindows() {
				this.LanguageShow = false
			},
			Confirm() {
				let that = this
				that.LanguageShow = false
				
				uni.setStorageSync('language', that.curLanguage.id);
				
				that.$nextTick(() => {
				    that.$i18n.locale = that.curLanguage.id
				    //切换语言环境必须在that.$i18n.locale之后，否则app端会有意想不到的bug
				    uni.setLocale(that.curLanguage.id)
				})
				
				uni.onLocaleChange(e => {
					console.log('用户语言切换',e);
					uni.$emit('updateGetGames',{msg:'切换语言刷新游戏'})
				});

				//简体中文 Simplified Chinese CN
				//繁体中文 Traditional Chinese TW
				//英文 English EN
				//泰语 Thailand TH
				//越南语 Vietnamese VI
				let Code = ''
				if (this.Languageidx == 0) {
					Code = 'tl'
				} else if (this.Languageidx == 1) {
					Code = 'pt'
				} else if (this.Languageidx == 2) {
					Code = 'en'
				} 
				else if (this.Languageidx == 3) {
					Code = 'zh'
				} 
				else if (this.Languageidx == 4) {
					Code = 'bn'
				} else if (this.Languageidx == 5) {
					Code = 'ja'
				} else if (this.Languageidx == 6) {
					Code = 'th'
				} else if (this.Languageidx == 7) {
					Code = 'es'
				} else if (this.Languageidx == 8) {
					Code = 'id'
				} else if (this.Languageidx == 9) {
					Code = 'vi'
				} else if (this.Languageidx == 10) {
					Code = 'hi'
				} else if (this.Languageidx == 11) {
					Code = 'zh-HK'
				} else if (this.Languageidx == 12) {
					Code = 'ko'
				}
				
				let token = uni.getStorageSync("token")
				if(!token){
					
				} else {
					this.$u.post('/set-language', {
						language: Code
					}).then(ress => {
						
					
					}).catch(err => {
						
						
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

		.Language_list_wrap {
			.Language_list_item {
				margin: 0 0 0 0;

				.list_item_box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					background-color: $pupUp-bg-color;
					padding: 25rpx 20rpx;
					border-radius: 16rpx;
					font-weight: bold;

					.lang_name {
						color: $font-all-color;
						display: flex;
						align-items: center;
						image {
							width: 46rpx;
							height: 46rpx;
							margin-right: 14rpx;
						}
					}

					.lang_name_a {
						color: $all-secondary-text-color !important;
						//font-weight: bold;
					}

					.cosicon {
						margin-left: auto;

						image {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}

				.list_item_box_bg {
					background-color: $select-drop-down-bg-color !important;
					
				}
			}
		}
	}
	
	.Register_btn {
		width: 100%;
		margin: 20rpx auto 0;
		position: sticky;
		bottom: 0;
		z-index: 999;
		background-color: $all-secondary-color;
		padding: 20rpx;
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