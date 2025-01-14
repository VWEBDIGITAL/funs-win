<template>
	<view :style="theme" class="page_boxs">


		<match-media :max-width="800">
			<navbar ref="child" :title="$t('NewlyAdded.PromotionsDetails')" :isCountTo="false" :is_secondary="false">
			</navbar>
		</match-media>

		<!-- <uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'100%','position':'absolute','left':'0'}" :show="showOptions"> -->

			<pagesNavTitle ref="" :title="$t('NewlyAdded.PromotionsDetails')"></pagesNavTitle>
			<view class="page_wrap">
				<view class="Bonus_list">
					<view class="Bonus_list_item">
						<view class="swiper-box">

							<view class="swiper-item">
								<view class="sw_right">
									<image :src="mobileImage" mode="widthFix"></image>
								</view>
								<view class="sw_btn">{{$t('NewlyAdded.Endat')}} {{endTime}}</view>
								<!--<view class="sw_left">
									<view class="sub_title" v-if="title">{{title}}</view>
								</view>-->
								<!--<view class="Read_more">
									<text>Read more</text>
									<u-icon name="arrow-right" size="26" color="#2283f6"></u-icon>
								</view>-->
							</view>

						</view>
					</view>
				</view>
				<view class="wenan_wrap">
					<view class="wa_two w-e-text-container">
						<u-parse :html="content"></u-parse>
					</view>
				</view>
				
				
				<view class="reg_btn" @click="tohdsq()" v-if="applyEnabled == true"><span>{{$t('hdsq')}}</span></view>
				
			</view>
			
			

			<!-- 关于我们和技术支持 -->
			<home-bottom-info ref=""></home-bottom-info>

		<!-- </uni-transition> -->

		<!-- 登录窗口 -->
		<signInPopup ref="signInShow" :isTabs="1"></signInPopup>
		
		<Application-Activities ref="openShow" :acid="Acid" :lists="applyQuestions" @GetAcList="getAcList"></Application-Activities>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOptions: true,
				datas: {},
				
				Acid: 0,
				title: "",
				summary: "",
				mobileImage: "",
				endTime: "",
				content: "",
				applyEnabled: false,
				applyQuestion: [],
				applyQuestions: [],

			}
		},
		onLoad(ops) {
			let that = this
			
			uni.setNavigationBarTitle({
				title: this.WebsiteName
			});
			
			let isToken = uni.getStorageSync("token")
			var datas = JSON.parse(decodeURIComponent(ops.data))
			
			let Newdatas = {
				id: datas.id,
				applyEnabled: datas.applyEnabled,
				applyQuestion: datas.applyQuestion,
				content: datas.content,
				endTime: datas.endTime,
				mobileImage: datas.mobileImage,
				pcImage: datas.mobileImage,
				startTime: datas.startTime,
				summary: datas.summary,
				title: datas.title,
				type: datas.type
			}
			
			// console.log('活动详情',Newdatas)

			let phone = {}
			//解决刷新后参数丢失问题
			if (Newdatas) {
				uni.setStorage({
					key: 'el_BonusData',
					data: Newdatas
				});
			}
			uni.getStorage({
				key: 'el_BonusData',
				success: res => {
					phone = res.data;
					//具体操作
					that.Acid = phone.id
					that.title = phone.title
					that.summary = phone.summary
					that.mobileImage = phone.mobileImage
					that.endTime = phone.endTime
					that.content = phone.content
					that.applyEnabled = phone.applyEnabled
					that.applyQuestion = phone.applyQuestion
				}
			});
			
			let newList = []
			that.applyQuestion.forEach((item, index) => {
				newList.push({
					options: item.options,
					tip: item.tip,
					title: item.title,
					type: item.type,
					valText: item.options[0] || ""
				})
			});
			that.applyQuestions = newList
			console.log('活动报名问题',newList)
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
			getAcList(){
				
			},
			tohdsq(){
				
				let isToken = uni.getStorageSync("token")
				if (!isToken) {
					this.$refs.signInShow.openPopup(1);
				} else {
					this.$refs.openShow.openPopup()
				}
				
			}
		}
	}
</script>

<style lang="scss">
	::v-deep h5,
	.h5 {
		font-size: 14px;
	}

	::v-deep h4,
	.h4 {
		font-size: 16px;
		font-weight: bold;
	}

	::v-deep h3,
	.h3 {
		font-size: 18px;
		font-weight: bold;
	}

	::v-deep h2,
	.h2 {
		font-size: 20px;
		font-weight: bold;
	}

	::v-deep h1,
	.h1 {
		font-size: 22px;
		font-weight: bold;
	}

	::v-deep i {
		font-style: italic
	}

	::v-deep .w-e-toolbar .w-e-menu i {
		font-style: normal;
	}

	::v-deep ol {
		list-style-type: decimal;
	}

	/* ul ol 样式 */
	::v-deep ol {
		margin: 10px 0 10px 22px;
		list-style-type: decimal;
	}

	::v-deep ul {
		margin: 10px 0 10px 22px;
		list-style-type: disc;
	}

	/* table 样式 */
	::v-deep table {
		border-top: 1px solid #ccc;
		border-left: 1px solid #ccc;
	}

	::v-deep table td,
	::v-deep table th {
		border-bottom: 1px solid #ccc;
		border-right: 1px solid #ccc;
		padding: 3px 5px;
		height: 32px;
	}

	::v-deep table th {
		border-bottom: 2px solid #ccc;
		text-align: center;
		background-color: #f1f1f1;
	}

	/* blockquote 样式 */
	::v-deep blockquote {
		display: block;
		border-left: 8px solid #d0e5f2;
		padding: 5px 10px;
		margin: 10px 0;
		line-height: 1.4;
		min-height: 24px;
		font-size: 100%;
		background-color: #f1f1f1;
	}

	/* code 样式 */
	::v-deep code {
		display: inline-block;
		*display: inline;
		*zoom: 1;
		background-color: #f1f1f1;
		border-radius: 3px;
		padding: 3px 5px;
		margin: 0 3px;
	}

	::v-deep pre code {
		display: block;
	}

	::v-deep a {
		// text-decoration: underline;
		color: #5592e5;
	}

	.page_wrap {
		padding: 20rpx 20rpx;
		margin-inline: auto;
		max-width: 1088px;
		width: 100%;
		background-color: $home-games-wrap-color !important;
	}

	.wenan_wrap {

		.wa_title {
			margin-top: 30rpx;
			font-size: 32rpx;
			color: #FEFEFE;
			//font-weight: bold;
			margin-bottom: 15rpx;
		}

		.wa_two {
			view {
				color: $font-all-color;
				font-size: 32rpx;
				margin: 10rpx 0;

				/deep/ li {
					margin: 0 0 40rpx 0;
				}

				/deep/ p {
					margin: 40rpx 0;
				}

				/deep/ h3 {
					margin: 0 0 40rpx 0;
				}
			}

		}
	}

	.Bonus_list {
		.Bonus_list_item {
			margin-bottom: 30rpx;

			.container {
				font-size: 14px;
				background-color: #fff;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			.swiper-box {
				//height: 650rpx;
			}

			.swiper-item {
				//display: flex;
				align-items: center;
				//background-color: $all-secondary-color;
				border-radius: 12rpx;
				//padding: 20rpx 20rpx 20rpx 20rpx;
				position: relative;

				//height: 155px;
				.Read_more {
					display: flex;
					align-items: center;
					color: #2283f6;
					cursor: pointer;
					font-weight: 500;
				}

				.sw_left {
					margin-top: 10rpx;
					position: relative;
					z-index: 2;

					.sub_title {
						display: inline-block;
						color: #fff;
						margin-bottom: 10rpx;
						font-weight: 600;
						font-size: 32rpx;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}

					.ask_info {
						color: #FEFEFE;
						font-size: 24rpx;
						margin-bottom: 20rpx;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
				}

				.sw_right {
					//position: absolute;
					//top: 0;
					//left: 0;
					width: 100%;

					//height: 155px;
					image {
						width: 100%;
						//height: 155px;
						border-radius: 14rpx;
						cursor: pointer;
						background-color: $all-secondary-color;
					}
				}

				.sw_btn {
					//position: absolute;
					//bottom: 20rpx;
					//left: 20rpx;
					color: #93acd3;
					//background-color: rgba(255, 255, 255, 0); /* 半透明背景 */
					//backdrop-filter: blur(10px); /* 背景模糊 */
					//-webkit-backdrop-filter: blur(10px); /* 兼容老版本 Safari */
					//border-radius: 10rpx;
					//border: 1px solid #A3A8AB;
					text-align: left;
					//height: 63rpx;
					font-size: 24rpx;
					//line-height: 63rpx;
					padding: 20rpx 0 0 0;
				}

			}
		}
	}

	@media (min-width: 800px) {
		.page_boxs {
			height: auto !important;
		}
		.page_wrap {
			padding-left: 24px;
			padding-right: 24px;
			padding: 50rpx 0;
		}

		.Bonus_list .Bonus_list_item .swiper-item .sw_right {
			width: 55%;
		}
	}
	
	.reg_btn {
		cursor: pointer;
		position: relative;
		width: 93%;
		margin: 30rpx auto 60rpx;
		span {
			width: 100%;
			color: #ffffff;
			display: inline-block;
			background-color: #2c62f4;
			background: linear-gradient(1turn, #2c62f4 .8%, #1398f9);
			box-shadow: 0 3px 28px #2283f666, inset 0 3px 3px #ffffff4d;
			border-radius: 10px;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			position: relative;
			z-index: 2;
			font-weight: bold;
			
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
	
	.reg_btn:after {
		width: 100%;
		border-radius: 10px;
		height: 90rpx;
		background-color: #003293;
		bottom: -3px;
		content: "";
		display: block;
		left: 0;
		margin: 0 auto;
		pointer-events: none;
		position: absolute;
		right: 0;
		z-index: 1;
	}
</style>