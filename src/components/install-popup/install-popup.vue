<template>
	<view :style="theme">
		
		<view class="install_popup">
			<u-popup v-model="install_show" height="80%" mode="bottom" border-radius="24" :mask-close-able="false" :closeable="true" :close-icon-size="50" close-icon-color="#fff" @close="GuanBiinstallPopup">
				<view class="bIaoti_top">
					<view class="today_hide" v-if="isShowTitle">
						<u-checkbox-group>
							<u-checkbox @change="checkboxChange" v-model="TodayHide" name="HideToday">
								<view class="checkbox">
									{{$t('NewlyAdded.HideToday')}}
								</view>
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<view class="today_hide" style="padding: 56rpx 20rpx;" v-else></view>
					<view class="tabs_sm">
						<view :class="tabsIdx == 0?'curbg':''" @click="curClick(0)"><u-icon name="apple-fill" :color="tabsIdx==0?'#ffffff':'#8797ae'" size="28"></u-icon>IOS</view>
						<view :class="tabsIdx == 1?'curbg':''" @click="curClick(1)"><u-icon name="android-fill" :color="tabsIdx==1?'#ffffff':'#8797ae'" size="28"></u-icon>Android</view>
					</view>
				</view>
				<view class="install_popup_box">
					<view v-if="tabsIdx == 0">
						<view class="installTitle">IOS<!-- <u-icon name="apple-fill" color="#ffffff" size="40"></u-icon> --></view>
						
						
						<view class="Browser_title">Safari Browser</view>
						<view class="install_sm_wrap">
							<view class="installbg1">
								<image src="/static/image/install_ios2.png" mode="widthFix"></image>
							</view>
							<view class="install_sming">
								<view class="sming_text">
									<image src="/static/image/share_icon_233975.png" mode="widthFix"></image>
									<view>{{$t('NewlyAdded.iosSafari1')}}</view>
								</view>
								<view class="sming_text">
									<image src="/static/image/insert_add_icon_259213.png" mode="widthFix"></image>
									<view>{{$t('NewlyAdded.iosSafari2')}}</view>
								</view>
								
								
								<view class="installTitle" style="margin-top: 30px;">IOS<!-- <u-icon name="apple-fill" color="#ffffff" size="40"></u-icon> --></view>
								<view class="Safari_title">Google Chrome</view>
								
							</view>
							<view class="installbg2">
								<view class="url_link"><span class="wangzhi2">{{removeCharLevel(LuoDidomain)}}</span></view>
								<image src="/static/image/install_ios1.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="install_botton" style="margin-top: 0;">
							<view class="install_sming">
								<view class="sming_text">
									<image src="/static/image/share_icon_233975.png" mode="widthFix"></image>
									<view>{{$t('NewlyAdded.iosGoogle1')}}</view>
								</view>
							</view>
							<view class="install_sming">
								<view class="sming_text">
									<image src="/static/image/insert_add_icon_259213.png" mode="widthFix"></image>
									<view>{{$t('NewlyAdded.iosGoogle2')}}</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="tabsIdx == 1">
						<view class="installTitle">Android<!-- <u-icon name="android-fill" color="#ffffff" size="40"></u-icon> --></view>
						<view class="Browser_title">Google Chrome</view>
						<view class="install_sm_wrap" style="margin-top: 20rpx;">
							<view class="installbg3">
								<view class="url_link"><span class="wangzhi">{{removeCharLevel(LuoDidomain)}}</span></view>
								<image src="/static/image/anzhuobg.png" mode="widthFix"></image>
							</view>
							<view class="install_sming install_sming_anzhuo" style="padding-top: 0;">
								<view class="sming_text2">
									<image src="/static/image/sangedian.png" mode="widthFix"></image>
									<view>{{$t('NewlyAdded.AndGoogle1')}}</view>
								</view>
								<view class="sming_text">
									<image src="/static/image/phone_android_icon_137793.png" mode="widthFix"></image>
									<view>{{$t('NewlyAdded.AndGoogle2')}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"install-popup",
		props: {
			isShowTitle: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				install_show: false,
				TodayHide: false,
				tabsIdx: 0,
				LuoDidomain: ''
			};
		},
		created() {
			let that = this
			let systemInfo = uni.getSystemInfoSync();
			that.LuoDidomain = uni.getStorageSync("LuoDidomain")
			//#ifdef H5
			if (window.navigator.standalone == false || window.navigator.standalone == undefined) {
				that.statusBarHeight = false
				
				if(systemInfo.deviceType == "phone") {
					if(systemInfo.osName == "ios"){
						that.tabsIdx = 0
					} else {
						that.tabsIdx = 1
					}
				}
				
			} else {
				//webapp全屏启动
			}
			//#endif
		},
		mounted() {
			
		},
		methods: {
			openPopup() {
				this.install_show = true
			},
			closewindows() {
				this.install_show = false
			},
			
			
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log('1',e);
				this.$emit('CheckboxChange',e.value)
			},
			removeCharLevel(value) {
				return value.replace(new RegExp('https://', 'g'), '');
			},
			curClick(idx) {
				this.tabsIdx = idx
			},
			GuanBiinstallPopup(){
				this.$emit('guanBiinstallPopup',1)
			},
			
			
			
		}
	}
</script>

<style lang="scss">
.wangzhi2 {
	color: transparent !important;
	text-shadow: #000000 0 0 4px;
}
</style>