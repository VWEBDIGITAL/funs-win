<template>
	<view :style="theme">
		
		<!-- <tf-verify-img ref="openVerify" @succeed="chenggong" @close="closeshowVerify" :verifyImgs="imgs"></tf-verify-img> -->
		
		<slider-verify :isShow="sliderVerifyFLag" @touchSliderResult="verifyResult" ref="verifyElement"></slider-verify>
		
		<u-verification-code :start-text="$t('NewlyAdded.Send')" change-text="Xs" end-tex="retrieve" :seconds="seconds" :keep-running="true" ref="uCode" @change="codeChange"></u-verification-code>
		
		<view class="tanchu_box">
			<u-popup v-model="signInShow" width="650" height="auto" mode="center" close-icon-size="30" border-radius="14" :mask-close-able="false" :closeable="false">
				
				<view class="gianbi_icon" @click="signInShow = false">
					<u-icon name="close"></u-icon>
				</view>
				
				<view class="login_tabs_wrap">
					<view class="login_tabs">
						<view :class="tabsIdx == 1?'xuanze':''" @click="tabs_click(1)">{{$t('navBar.rtitle1')}}</view>
						<view v-if="enabled == true" :class="tabsIdx == 2?'xuanze':''" @click="tabs_click(2)">
							{{$t('navBar.rtitle2')}}
						</view>
					</view>
				</view>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
				<view class="input_box" v-if="tabsIdx == 1">
					<view class="input_item">
						<view class="xuanze_acType">
							<view class="mimats_box2">
								
								
								<view v-for="(itemb,indexb) in peList" :key="indexb" @click="cols_type2(itemb,indexb)">
									<p :style="{color: isxzIdx == indexb?'#2283f6':''}">{{itemb.name}}</p>
									<span :class="[isxzIdx == indexb?'isxz':'']"></span>
								</view>
								
								
								<!-- <view @click="cols_type2(1)">
									<p :style="{color: isxzIdx2 == 1?'#2283f6':''}">{{$t('navBarTitle.Phone')}}</p><span :class="[isxzIdx2 == 1?'isxz':'']"></span>
								</view>
								<view @click="cols_type2(2)">
									<p :style="{color: isxzIdx2 == 2?'#2283f6':''}">{{$t('navBarTitle.Email')}}</p><span :class="[isxzIdx2 == 2?'isxz':'']"></span>
								</view> -->
							</view>
						</view>
						<view class="input_item_true" :class="reginput_border1 == 1?'input_border':''" v-if="LeiXingName == 2">
							<view class="phone-code">
								<view class="xialaXuanze2">
									<view class="xlxz_input" @click="huobifuList_quhao.length > 1?showXuanze_quhao():null">
										<view class="xlxz_title">
											<image :src="defaultXz_quhao_icon" mode="aspectFit"></image>
											<view>{{defaultXz_quhao_code}}</view>
										</view>
										<view class="right_box" v-if="huobifuList_quhao.length > 1">
											<u-icon name="arrow-down"></u-icon>
										</view>
									</view>
									<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'auto','position':'absolute','top':'0','left':'0','z-index':'100'}" :show="showOptions_quhao">
										<view class="scroll_wrap">
											<scroll-view scroll-y="true" class="scroll_wrap_item">
												<view class="scroll_name" v-for="(item,index) in huobifuList_quhao" :key="index" @click="clickTabs_quhao(item,index)" :class="defaultXz_quhao_code == item.tel?'xuanzhong':''">
													<view>+{{item.tel}}</view>
												</view>
											</scroll-view>
										</view>
									</uni-transition>
								</view>
							</view>
							<u-input v-model="Username" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
						</view>
						<view class="input_item_true" :class="reginput_border1 == 1?'input_border':''" v-if="LeiXingName == 1">
							<view class="left_icon"><u-icon name="email-fill" color="#55657e"></u-icon></view>
							<u-input v-model="Username" @input="input1" @blur="inputBlur1" @focus="inputfocus1" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
						</view>
					</view>
					<view class="input_item" style="margin: 0;">
						<view class="input_item_title">{{$t('signInPopup.password')}} *</view>
						<view class="input_item_true" :class="input_border2 == 1?'input_border':''">
							<view class="left_icon"><u-icon name="lock-fill" color="#55657e"></u-icon></view>
							<u-input v-model="Password" @blur="inputBlur2" @focus="inputfocus2" type="password" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
						</view>
					</view>
					<view class="Agreement">
						<u-checkbox-group @change="checkboxGroupChange">
							<u-checkbox @change="checkboxChange" v-model="RememberMe" name="me">
								<view class="checkbox">
									{{$t('signInPopup.RememberMe')}}
								</view>
							</u-checkbox>
						</u-checkbox-group>
						<view @click="Towjmm()">{{$t('signInPopup.ForgotPassword')}}?</view>
					</view>
				</view>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
				<view class="input_box" v-if="tabsIdx == 2 && enabled == true">
					<view class="input_item">
						<view class="xuanze_acType">
							<view class="mimats_box2">
			
								<view v-for="(itemp,indexp) in peList" :key="indexp" @click="cols_type(itemp,indexp)">
									<p :style="{color: isxzIdx == indexp?'#2283f6':''}">{{itemp.name}}</p>
									<span :class="[isxzIdx == indexp?'isxz':'']"></span>
								</view>
			
								<!-- <view v-if="KaiQiphoneNumber == 1 || KaiQiphoneNumber == 2" @click="cols_type(1)"><p :style="{color: isxzIdx == 1?'#2283f6':''}">{{$t('navBarTitle.Phone')}}</p><span :class="[isxzIdx == 1?'isxz':'']"></span></view>
								<view v-if="KaiQiemail == 1 || KaiQiemail == 2" @click="cols_type(2)"><p :style="{color: isxzIdx == 2?'#2283f6':''}">{{$t('navBarTitle.Email')}}</p><span :class="[isxzIdx == 2?'isxz':'']"></span></view> -->
							</view>
						</view>
						<view class="input_item_true" :class="[reginput_border4 == 1?'input_border':BorderHongse1==1?'bianHong':'']" v-if="LeiXingName == 2">
							<view class="phone-code">
								<view class="xialaXuanze2">
									<view class="xlxz_input" @click="huobifuList_quhao.length > 1?showXuanze_quhao():null">
										<view class="xlxz_title">
											<image :src="defaultXz_quhao_icon" mode="aspectFit"></image>
											<view>{{defaultXz_quhao_code}}</view>
										</view>
										<view class="right_box" v-if="huobifuList_quhao.length > 1">
											<u-icon name="arrow-down"></u-icon>
										</view>
									</view>
									<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'auto','position':'absolute','top':'0','left':'0','z-index':'100'}" :show="showOptions_quhao">
										<view class="scroll_wrap">
											<scroll-view scroll-y="true" class="scroll_wrap_item">
												<view class="scroll_name" v-for="(item,index) in huobifuList_quhao" :key="index" @click="clickTabs_quhao(item,index)" :class="defaultXz_quhao_code == item.tel?'xuanzhong':''">
													<view>+{{item.tel}}</view>
												</view>
											</scroll-view>
										</view>
									</uni-transition>
								</view>
							</view>
							<u-input v-model="regUsername" autocomplete="new-password" @input="reginput1" @blur="reginputBlur1" @focus="reginputfocus1" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="true" />
						</view>
						<view class="input_item_true" :class="reginput_border9 == 1?'input_border':''" v-if="LeiXingName == 1">
							<view class="left_icon"><u-icon name="email-fill" color="#55657e"></u-icon></view>
							<u-input v-model="regUsername" autocomplete="new-password" @input="reginput4" @blur="reginputBlur4" @focus="reginputfocus4" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="true" />
						</view>
					</view>
					<view class="errPhoneNum" v-if="BorderHongse1 == 1 && LeiXingName == 2">*{{$t('inputPhoneNumErr')}}</view>
					<view class="input_item">
						<view class="tishiInput_box" v-if="is_mstsShow"><!--  -->
							<view class="mimats_box">
								<view class="mimats_info">
									<view class="tishi_1" :class="[is_bawei==1?'zhilv':'']"><u-icon :name="is_bawei==1?'checkmark':'close'" :color="is_bawei==1?'#1fbe43':'#94a3c0'"></u-icon><span>{{$t('ADDnew.register1')}}</span></view>
									<view class="tishi_1" :class="[is_zimu==1?'zhilv':'']"><u-icon :name="is_zimu==1?'checkmark':'close'" :color="is_zimu==1?'#1fbe43':'#94a3c0'"></u-icon><span>{{$t('ADDnew.register3')}}</span></view>
									<view class="tishi_1" :class="[is_shuzi==1?'zhilv':'']"><u-icon :name="is_shuzi==1?'checkmark':'close'" :color="is_shuzi==1?'#1fbe43':'#94a3c0'"></u-icon><span>{{$t('ADDnew.register2')}}</span></view>
								</view>
								<view class="mima_ts_sj"></view>
							</view>
						</view>
						<view class="input_item_title">{{$t('regiserPopup.password')}} *</view>
						<view class="input_item_true" :class="reginput_border2 == 1?'input_border':BorderHongse==1?'bianHong':''">
							<view class="left_icon"><u-icon name="lock-fill" color="#55657e"></u-icon></view>
							<u-input v-model="regPassword" autocomplete="new-password" @input="reginput2" @blur="reginputBlur2" @focus="reginputfocus2" type="password" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="true" />
						</view>
					</view>
					<view class="input_item" style="margin: 0;" v-if="ErCipassword == 1 || ErCipassword == 2">
						<view class="input_item_title">{{$t('regiserPopup.secondConfirmation')}} *</view>
						<view class="input_item_true" :class="reginput_border3 == 1?'input_border':''">
							<view class="left_icon"><u-icon name="lock-fill" color="#55657e"></u-icon></view>
							<u-input v-model="regconfirmation" autocomplete="new-password" auto-complete="new-password" @input="reginput3" @blur="reginputBlur3" @focus="reginputfocus3" type="password" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="false" />
						</view>
					</view>
			
					<!-- 姓名 -->
					<view class="input_item" style="margin: 30rpx 0 30rpx 0;" v-if="ZhenShirealName == 1 || ZhenShirealName == 2">
						<view class="input_item_title">
							<view>{{$t('NewlyAdded.Realname')}}</view>
						</view>
						<view class="input_item_true" :class="reginput_border6 == 1?'input_border':''">
							<view class="left_icon"><u-icon name="account-fill" color="#55657e"></u-icon></view>
							<u-input v-model="XingMing" @input="reginput6" @blur="reginputBlur6" @focus="reginputfocus6" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" :placeholder="ZhenShirealName==2?$t('BiTian'):$t('xuanTian')" :clearable="true" />
						</view>
					</view>
			
					<!-- 手机号验证码 -->
					<view class="input_item" style="margin: 30rpx 0 30rpx 0;" v-if="KaiQiphoneNumber == 2 && LeiXingName == 2">
						<view class="input_item_title">
							<view>{{$t('phonePopup.title')}}{{$t('phonePopup.VCode')}}</view>
						</view>
						<view class="input_item_true" :class="reginput_border7 == 1?'input_border':''">
							<u-input v-model="verifyCode" @input="reginput7" @blur="reginputBlur7" @focus="reginputfocus7" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" :placeholder="KaiQiphoneNumber==2?$t('BiTian'):$t('xuanTian')" :clearable="true" />
							<view class="right_icon shoushi" @click="getCode(1)">{{tips}}</view>
						</view>
					</view>
			
					<!-- 邮箱验证码 -->
					<view class="input_item" style="margin: 30rpx 0 30rpx 0;" v-if="KaiQiemail == 2 && LeiXingName == 1">
						<view class="input_item_title">
							<view>{{$t('emailPopup.title')}}{{$t('emailPopup.VCode')}}</view>
						</view>
						<view class="input_item_true" :class="reginput_border8 == 1?'input_border':''">
							<u-input v-model="verifyCode" @input="reginput8" @blur="reginputBlur8" @focus="reginputfocus8" type="number" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" :placeholder="KaiQiemail==2?$t('BiTian'):$t('xuanTian')" :clearable="true" />
							<view class="right_icon shoushi" @click="getCode(2)">{{tips}}</view>
						</view>
					</view>
			
					<!-- 推广码 -->
					<view class="input_item" style="margin: 30rpx 0 30rpx 0;" v-if="promotionCode == 1 || promotionCode == 2">
						<view class="input_item_title shoushi" @click="isTjmShow()">
							<view>{{$t('NewlyAdded.ReaferralQR')}}({{promotionCode==2?$t('BiTian'):$t('xuanTian')}})</view>
							<u-icon name="arrow-down"></u-icon>
						</view>
						<view class="input_item_true" :class="reginput_border5 == 1?'input_border':''" v-if="is_show_TJM">
							<u-input v-model="YaoQingMa" @input="reginput5" @blur="reginputBlur5" @focus="reginputfocus5" type="text" :border="false" :custom-style="customStyle" :placeholder-style="placeholderStyle" placeholder="" :clearable="true" />
						</view>
					</view>
					<!-- <view class="input_item" style="margin: 30rpx 0 0 0;">
						<view class="input_item_title">{{$t('ADDnew2.Hint')}}</view>
						<view class="input_item_true" style="padding: 0;">
							<view style="width: 100%;">
								<view class="xialaXuanze">
									<view class="xlxz_input" @click="showXuanze()">
										<view class="xlxz_title">
											<image v-if="defaultXz == 'PHP'" src="/static/flag/ph.png" mode="aspectFit"></image>
											<view v-if="defaultXz == 'PHP'">PHP</view>
											<image v-if="defaultXz == 'CNY'" src="/static/flag/cn.png" mode="aspectFit"></image>
											<view v-if="defaultXz == 'CNY'">CNY</view>
										</view>
										<view class="right_box">
											<u-icon name="arrow-down" size="32"></u-icon>
										</view>
									</view>
									<uni-transition :mode-class="['fade', 'zoom-in']" :styles="{'width':'100%','height':'auto','position':'absolute','top':'0','left':'0','z-index':'100'}" :show="showOptions">
										<view class="scroll_wrap">
											<view class="scroll_wrap_item">
												<view class="scroll_name" v-for="(item,index) in huobifuList" :key="index" @click="clickTabs(item,index)" :class="tctabsIdx == index?'xuanzhong':''">
													<image :src="item.icon" mode="widthFix"></image>
													<view>{{item.name}}</view>
												</view>
											</view>
										</view>
									</uni-transition>
								</view>
							</view>
						</view>
					</view> -->
					<view class="Agreement">
						<u-checkbox-group @change="regcheckboxGroupChange" width="100%">
							<u-checkbox size="26" @change="regcheckboxChange" v-model="regRememberMe" name="me">
								<text class="checkbox">
									{{$t('regiserPopup.lagree')}}
								</text>
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			
				<view class="Register_btn_sign_wrap">
					<view class="Register_btn_sign" v-if="tabsIdx == 1">
						<u-button type="error" @click="HuaKuaiVerify(1)" :disabled="isDisabledTwo" :loading="btnStatus">{{$t('signInPopup.signBtn')}}</u-button>
					</view>
					<view class="Register_btn_sign" v-if="tabsIdx == 2">
						<u-button type="error" :disabled="regisDisabledTwo" :loading="regbtnStatus" @click="HuaKuaiVerify(2)">{{$t('regiserPopup.regBtn')}}</u-button>
					</view>
				</view>
				
				<!-- #ifndef APP-PLUS -->
				<view class="sanFang_wrap" v-if="RegisterSetData.loginGoogleEnabled == true">
					<view class="sanFang">
						<span></span>
						<view>{{$t('DiSanFangdl')}}</view>
						<span></span>
					</view>
					<view class="sanFang_icon">
						<image src="/static/image/guge.png" @click="googleAuth()"></image>
					</view>
				</view>
				<!-- #endif -->
				
			</u-popup>
		</view>
		

		<u-modal v-model="Yizhuceshow" :content="$t('NewlyAdded.registered')" @cancel="yesCancel" @confirm="yesconfirm" :title="$t('NewlyAdded.Notify')" :show-cancel-button="true" :cancel-text="$t('navBar.rtitle1')" :confirm-text="$t('NewlyAdded.Next')"></u-modal>

		<pc-ForgotPassword ref="openPCfpass"></pc-ForgotPassword>

	</view>
</template>

<script>
	// import {
	// 	websocetObj
	// } from '@/utils/socket.js';
	import tfVerifyImg from '@/components/tf-verify-img/tf-verify-img.vue';
	
	//import sliderVerify from '@/components/slider-verify/slider-verify.vue';

	import md5Libs from "uview-ui/libs/function/md5";

	import countryList from '@/utils/list.json'
	
	import {
	parsePhoneNumberFromString, 
	isPossiblePhoneNumber, 
	isValidPhoneNumber, 
	validatePhoneNumberLength,
	} from 'libphonenumber-js/mobile';

	export default {
		components: {
			//'slider-verify': sliderVerify,
			tfVerifyImg
		},
		name: "signInPopup",
		props: {
			istabsType: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				RegisterSetData: {},
				
				verifyType: 1,
				sliderVerifyFLag: false ,//滑块验证开关
				
				showVerify:false,
				imgs:[{
					src:'/static/image/slider-verify/1.jpg',
					color:'#242e3d'
				},{
					src:'/static/image/slider-verify/2.jpg',
					color:'#242e3d'
				},{
					src:'/static/image/slider-verify/3.jpg',
					color:'#242e3d'
				},{
					src:'/static/image/slider-verify/4.jpg',
					color:'#242e3d'
				},{
					src:'/static/image/slider-verify/5.jpg',
					color:'#242e3d'
				}],
				
				value2: this.AreaCode,
				selectList2: countryList.list,
				alias2: { //别名来代指一下
					label: 'name',
					value: 'tel',
					flag: 'flag'
				},
				close2: false,
				PhoneCode: this.AreaCode,

				is_pid: this.PID,

				tctabsIdx: 0,
				defaultXz: 'CNY',

				showOptions: false,
				huobifuList: [{
					id: 1,
					name: 'CNY',
					icon: '/static/flag/cn.png'
				}],
				
				huobifuList_quhao: [], //countryList.list,
				tctabsIdx_quhaoidx: 0,
				defaultXz_quhao_icon: '', //'/static/flag/ph.png',
				defaultXz_quhao_code: null, //this.AreaCode,
				showOptions_quhao: false,
				short: '',

				BorderHongse1: 0,
				BorderHongse: 0,
				is_mstsShow: false,
				is_zimu: 0,
				is_shuzi: 0,
				is_bawei: 0,
				is_tszifu: 0,

				isxzIdx: 0,
				LeiXingName: 2,
				peList: [{
					id: 2,
					name: this.$t('navBarTitle.Phone')
				}, {
					id: 1,
					name: this.$t('navBarTitle.Email')
				}],

				isxzIdx2: 0,

				tabsIdx: 1,

				isDisabledTwo: true,
				input_border1: 0,
				input_border2: 0,
				btnStatus: false,
				Username: '',
				Password: '',

				signInShow: false,

				placeholderStyle: "color: #8e99a2;fontSize: 28rpx;fontWeight: initial;",
				customStyle: {
					fontWeight: "bold"
				},
				RememberMe: true,

				Yizhuceshow: false,
				regisDisabledTwo: true,
				reginput_border1: 0,
				reginput_border2: 0,
				reginput_border3: 0,
				reginput_border4: 0,
				reginput_border5: 0,
				reginput_border6: 0,
				reginput_border7: 0,
				reginput_border8: 0,
				reginput_border9: 0,
				regRememberMe: true,
				regbtnStatus: false,

				is_show_TJM: false,
				is_show_XM: false,

				regUsername: '',
				regPassword: '',
				regconfirmation: '',
				YaoQingMa: '',
				XingMing: '',
				PhoneYanZhengma: '',
				YouXiangYanZhengma: '',

				firstChoice: 2,
				KaiQiemail: 1,
				enabled: false,
				ErCipassword: 1,
				KaiQiphoneNumber: 1,
				promotionCode: 1,
				ZhenShirealName: 1,
				verifyCode: '',

				tips: '',
				seconds: 60,
				placeholderT1: ''


			};
		},
		watch: {

		},
		computed: {

		},
		created() {
			
			uni.$on('OpenLogin', (val) => {
				this.openPopup()
			})

		},
		mounted() {
			
		},
		methods: {
			// 滑块验证结果回调函数
			verifyResult(res) {
				let that = this
				that.sliderVerifyFLag = false;
			
				if (res) { //校验通过
					console.log('校验通过', res);
					
					if(that.verifyType == 1){
						that.ToSignIn();//开始登录
					} else if(that.verifyType == 2){
						that.regBtn();//开始注册
					}
					
				} else {
					// 校验失败,点击关闭按钮
				}
			},
			//登录和注册之前做一下滑块验证
			HuaKuaiVerify(type){
				//type 1是登录 2是注册
				let that = this
				that.verifyType = type
				
				//判读从后台是否开启滑块验证
				if(type == 1){
					if(that.RegisterSetData.loginSlideEnabled == true){
						that.sliderVerifyFLag = true;
						//that.$refs.openVerify.openShowVerify()
					} else {
						that.ToSignIn();//直接开始登录
					}
				} else if(type == 2){
					if(that.RegisterSetData.registerSlideEnabled == true){
						that.sliderVerifyFLag = true;
						//that.$refs.openVerify.openShowVerify()
					} else {
						that.regBtn();//直接开始注册
					}
				}
				
			},
			
			
			
			
			
			
			
			
			
			
			
			
			chenggong(){
				let that = this
				that.showVerify = false;
				that.$refs.openVerify.GuanBIshow()
				if(that.verifyType == 1){
					that.ToSignIn();//开始登录
				} else if(that.verifyType == 2){
					that.regBtn();//开始注册
				}
			},
			closeshowVerify(){
				let that = this
				that.showVerify = false;
				that.$refs.openVerify.GuanBIshow()
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			googleAuth() {
				let hostname = window.location.hostname
				// 你的Google OAuth 客户端 ID
				window.clientId = '530177592792-nt8h20nb888gmnirgqbnvptev6il8be8.apps.googleusercontent.com';
				// 重定向 URI
				window.redirectUri = 'https://' + hostname;
				// 请求的权限范围，可以根据需求修改
				window.scope = 'email profile';
				// 用于防止跨站请求伪造（CSRF）攻击，可以不设置，可以随心设置
				window.state = '';
				// 授权响应类型，表示要求返回授权码
				window.responseType = 'code';
				// 你的Google OAuth 客户端密钥
				window.clientSecret = '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';
				window.grantType = 'authorization_code';
				//&prompt=login 把它加到window.authUrl的末尾可以让用户每次都需要重新输入账号和密码
				window.authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${window.clientId}&redirect_uri=${window.redirectUri}&scope=${window.scope}&state=${window.state}&response_type=${window.responseType}`;
				//点击Google登录 执行这个方法进行跳转
				window.location.href = window.authUrl
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//获取注册配置
			GetRegSet() {
				let that = this
				
				
				
				let TJMNum = uni.getStorageSync('channel_id');
				that.YaoQingMa = TJMNum;
				//console.log('邀请码',that.YaoQingMa);

				let SetData = uni.getStorageSync('registerSet');
				that.RegisterSetData = SetData.register
				console.log('注册配置',SetData);

				//that.$u.post('/register/param', {

				//}).then(ress => {

				//返回结果是枚举
				//0=隐藏 1=可见 2=必填

				//是否开启注册
				that.enabled = SetData.register.enabled;


				//控制手机注册TAB
				that.KaiQiphoneNumber = SetData.register.phoneNumber;
				if ((SetData.register.phoneNumber == 1 || SetData.register.phoneNumber == 2) && SetData.register.email == 0) {
					//that.isxzIdx = 1
					that.LeiXingName = 2
					that.peList = [{
						id: 2,
						name: this.$t('navBarTitle.Phone')
					}]
					console.log('后台显示了手机1')
				} else {
					console.log('后台隐藏了手机2')
					that.LeiXingName = 1
					that.peList = [{
						id: 1,
						name: this.$t('navBarTitle.Email')
					}]
				}
				//控制邮箱注册TAB 如果邮箱显示了就默认显示邮箱注册输入框
				that.KaiQiemail = SetData.register.email;
				if ((SetData.register.email == 1 || SetData.register.email == 2) && SetData.register.phoneNumber == 0) {
					//that.isxzIdx = 2
					that.LeiXingName = 1
					that.peList = [{
						id: 1,
						name: this.$t('navBarTitle.Email')
					}]
					console.log('后台显示了邮箱1')
				} else {
					console.log('后台隐藏了邮箱2')
					that.LeiXingName = 2
					that.peList = [{
						id: 2,
						name: this.$t('navBarTitle.Phone')
					}]
				}

				//设置手机和邮箱的前后位置 1邮箱 2手机
				let iskkphone = SetData.register.phoneNumber;
				let iskkemail = SetData.register.email;
				//先判断是否勾选了手机或邮箱的隐藏选项
				if (iskkphone != 0 && iskkemail != 0) {
					if (SetData.register.firstChoice == 1) {
						//that.isxzIdx = 2
						that.LeiXingName = 1
						that.peList = [{
							id: 1,
							name: this.$t('navBarTitle.Email')
						}, {
							id: 2,
							name: this.$t('navBarTitle.Phone')
						}]
						console.log('邮箱在前')
					} else if (SetData.register.firstChoice == 2) {
						//that.isxzIdx = 1
						that.LeiXingName = 2
						that.peList = [{
							id: 2,
							name: this.$t('navBarTitle.Phone')
						}, {
							id: 1,
							name: this.$t('navBarTitle.Email')
						}]
						console.log('手机在前')
					}
				}



				//设置默认区号和国旗
				that.huobifuList_quhao = SetData.register.areas;
				that.tctabsIdx_quhaoidx = 0;
				that.defaultXz_quhao_icon = SetData.register.areas[0].flag;
				that.defaultXz_quhao_code = SetData.register.areas[0].tel;
				that.short = SetData.register.areas[0].short;


				//是否需要输入二次确认密码
				that.ErCipassword = SetData.register.password;


				//推荐码必填的时候就不折叠了
				that.promotionCode = SetData.register.promotionCode;
				if (that.promotionCode == 2) {
					that.is_show_TJM = true
				}

				//真实姓名
				that.ZhenShirealName = SetData.register.realName;
				//});
				
				that.inits();//初始化是否缓存有邮箱或者密码
			},
			inits(){
				let that = this
				
				let is_name = uni.getStorageSync("loginUsername")
				let is_pass = uni.getStorageSync("loginPassword")
				
				if (is_name) {
					this.RememberMe = true
					this.isDisabledTwo = false
				
					let is_gmailo = that.$u.test.email(is_name);
					if (is_gmailo) {
						
						// if(that.LeiXingName == 2){
						// 	that.isxzIdx = 1
						// } else {
						// 	that.isxzIdx = 0
						// }
						that.Username = is_name
						console.log('是否邮箱',is_gmailo)
					} else {
						//把手机号和区号分开
						const phoneNumber = is_name;
						const regex = /^\((\+\d+)\)(\d+)$/;
						const match = phoneNumber.match(regex);
						if (match) {
							const countryCode = match[1];
							const number = match[2];
							const NewcountryCode = countryCode.replace(/\+/g, '');
							
							if(that.LeiXingName == 2){
								that.Username = number
								console.log('是否手机号',number)
							}
						} else {
							//console.log("Invalid phone number");
						}
						
					}
				}
				if (is_pass) {
					that.Password = is_pass
				}
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//选择登录或注册切换
			tabs_click(type) {
				this.tabsIdx = type
			},
			//登录选项卡——选择手机或邮箱
			cols_type2(item, idx) {
				this.isxzIdx = idx
				//this.isxzIdx2 = idx
				this.LeiXingName = item.id
				this.Username = ''
				this.inits();
			},
			//注册选项卡——选择手机或邮箱
			cols_type(item, idx) {
				this.isxzIdx = idx
				this.LeiXingName = item.id
				this.regUsername = ''
			},
			//点击折叠推荐码
			isTjmShow() {
				if (!this.is_show_TJM) {
					this.is_show_TJM = true
				} else {
					this.is_show_TJM = false
				}
			},
			//选择那个货币符号暂时不用了
			clickTabs(item, idx) {
				this.tctabsIdx = idx
				this.is_pid = item.id
				this.defaultXz = item.name
				this.showOptions = false
			},
			//选择货币符号某个货币
			showXuanze() {
				if (this.showOptions == true) {
					this.showOptions = false
				} else {
					this.showOptions = true
				}
			},
			//选择手机区号
			clickTabs_quhao(item, idx) {
				console.log('选择的区号', item)
				this.tctabsIdx_quhaoidx = idx
				this.defaultXz_quhao_code = item.tel
				this.short = item.short
				this.defaultXz_quhao_icon = item.flag
				this.showOptions_quhao = false
			},
			//选择区号的弹窗显示
			showXuanze_quhao() {
				if (this.showOptions_quhao == true) {
					this.showOptions_quhao = false
				} else {
					this.showOptions_quhao = true
				}
			},
			openPopup(e) {
				let that = this
				that.GetRegSet();
				that.codeChange(that.$t('NewlyAdded.Send'));
				that.tabsIdx = e || 1
				that.isxzIdx = 0
				that.signInShow = true
			},
			closewindows(e) {
				this.signInShow = false
			},
























			//登录控制模块
			input1(e) {
				if (!e) {
					this.isDisabledTwo = true
				} else {
					this.isDisabledTwo = false
				}
			},
			inputBlur1() {
				this.input_border1 = 0
			},
			inputfocus1() {
				this.input_border1 = 1
			},
			inputBlur2() {
				this.input_border2 = 0
			},
			inputfocus2() {
				this.input_border2 = 1
			},
			//开始请求登录接口
			ToSignIn() {
				let that = this
				if (that.Username == "") {
					that.$u.toast(that.$t('opoupToast.username'));
				} else if (that.Password == "") {
					//that.$modalTip(that.$t('opoupToast.password'),3000)
					that.$u.toast(that.$t('opoupToast.password'));
				} else {

					let isgmails = that.$u.test.email(that.Username);
					if (isgmails) {
						if (that.RememberMe == true) {
							uni.setStorageSync("loginUsername", that.Username);
							uni.setStorageSync("loginPassword", that.Password);
						} else {
							uni.removeStorageSync('loginUsername');
							uni.removeStorageSync('loginPassword');
						}
					} else {
						if (that.RememberMe == true) {
							uni.setStorageSync("loginUsername", '(+' + that.defaultXz_quhao_code + ')' + that.Username);
							uni.setStorageSync("loginPassword", that.Password);
						} else {
							uni.removeStorageSync('loginUsername');
							uni.removeStorageSync('loginPassword');
						}
					}

					let md5Pw = md5Libs.md5(that.Password) //把密码加密
					that.btnStatus = true

					let serialNo = uni.getStorageSync('thisUuid') || 'iphone';
					let machineName = uni.getStorageSync('machineName') || 'iphone';
					let ua = uni.getStorageSync('thisUa') || 'iphone';

					let canshu = {
						username: '(+' + that.defaultXz_quhao_code + ')' + that.Username, //用户名
						password: md5Pw, //md5加密后的串
						serialNo: serialNo, //设备序列码
						machineName: machineName, //设备型号
						pid: this.PID, //Number 是 平台Id
					}

					//alert(JSON.stringify(canshu))

					//判断一下输入的是否邮箱否则就是手机号
					let isgmail = that.$u.test.email(that.Username)
					let AccNum = ''
					if (isgmail) {
						AccNum = that.Username
					} else {
						AccNum = '(+' + that.defaultXz_quhao_code + ')' + that.Username
					}

					//operatorId
					//从缓存中获取用户注册时选择的货币符号来定义pid
					//就是如果用户选择人民币 operatorId就传6  pid传6
					//如果选择的是PHP operatorId就传6  pid传7
					//接口要选定不同的地址。pid是6的用户，用6的接口地址，是7的用7的地址

					setTimeout(() => {
						that.$u.post('/login', {
							username: AccNum, //用户名
							password: md5Pw, //md5加密后的串
							serialNo: serialNo, //设备序列码
							machineName: machineName, //设备型号
							operatorId: this.OPERATORID,
							pid: this.is_pid || this.PID, //Number 是 平台Id
						}).then(res => {
							////console.log('登录账号', res)

							that.btnStatus = false
							uni.setStorageSync('token', res.data.token)
							uni.setStorageSync('userinfo', res.data)
							that.signInShow = false
							//登录后刷新一下navbar组件的获取token方法
							uni.$emit('getinspectToken', 1);
							uni.setStorageSync('is_newUser', 0);

							//打开wss链接
							uni.$emit('StartOpenWss', 1);

							//关闭注册引导
							uni.$emit('GuanBiYinDaoReg', 1);

							let userid = uni.getStorageSync('userinfo').userId
							//上报充值成功记录查询
							that.$u.post('/recharge/finished/record', {}).then(res => {
								if (res.data.length != 0) {

									var oid = []
									res.data.forEach(function(item, index) {
										oid.push(item.orderId)

										//只有payTimes等于1是首充的
										if (item.payTimes == 1) {

											// #ifdef H5
											//Facebook Pixel埋点
											if (window.fbq) {
												//自定义的事件trackCustom是固定的自定义事件类型
												fbq('trackCustom', 'firstDepositArrival', {
													user: userid,
													currency: "PHP",
													amount: item.amount
												});
												//fb官方标准事件
												fbq('track', 'Purchase', {
													currency: "PHP",
													value: item.amount
												});
											}
											// #endif

										}

									})

									var str = oid.join(",");
									that.$u.post('/recharge/reported', {
										orderList: str
									}).then(resv => {
										res.data.forEach(function(item, index) {


											// #ifdef H5
											if (window.Unity) {
												//埋点充值成功
												Unity.call('af_purchase&&' + item
													.amount / 100);
											}
											// #endif


										})
									})
								} else {}
							})

							//#ifdef H5
							//友盟埋点事件
							const _czc = _czc || [];
							window._czc.push(['_trackEvent', '点击登录', '登录']);

							if (window.Unity) {
								//埋点
								Unity.call('af_login'); //登录成功
							}

							//window.location.reload();

							uni.reLaunch({
								url: '/pages/index/index',
								success: function(res) {
									//uni.setStorageSync("OpenDepositoAdvShow", 1)
									//websocetObj.sokcet();
								}
							});
							//#endif

							//#ifdef APP-PLUS
							uni.reLaunch({
								url: '/pages/index/index',
								success: function(res) {
									//websocetObj.sokcet()
								}
							})
							//#endif

						}).catch(err => {
							that.btnStatus = false
						})
					}, 1500)

				}
			},
			Towjmm() {
				//检查一下窗口大小判断是否打开页面 大于768使用弹窗打开log页面
				let windowWidth = uni.getSystemInfoSync().windowWidth
				if (windowWidth >= "800") {
					this.signInShow = false
					this.$refs.openPCfpass.openPopup(this.Username)
				} else {
					uni.navigateTo({
						url: '/pages/ForgotPassword/ForgotPassword?phoneNum=' + this.Username
					})
				}
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				//console.log(e);
			},
			//登录模块控制结束 END























































































			codeChange(text) {
				this.tips = text;
			},
			getCode(type) {
				if (type == 1 && this.regUsername == "") {
					this.$u.toast(this.$t('ToastPrompt.Toast8'))
				} else if (type == 2 && this.regUsername == "") {
					this.$u.toast(this.$t('ToastPrompt.Toast9'))
				} else {
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: this.$t('NewlyAdded.Verificationcode1')
						})
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							this.$u.toast(this.$t('NewlyAdded.Verificationcode2'));
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();

							if (type == 1) {
								this.getphoneCode();
							} else if (type == 2) {
								this.getemaioCode();
							}

						}, 2000);
					} else {
						this.$u.toast(this.$t('NewlyAdded.Verificationcode3'));
					}
				}
			},
			getphoneCode() {
				let that = this
				that.$u.post('/send/phone/code', {
					phone: '(+' + that.defaultXz_quhao_code + ')' + that.regUsername,
					pid: this.PID
				}).then(res => {

				}).catch(err => {

				})
			},
			getemaioCode() {
				let that = this
				that.$u.post('/send/email/code', {
					email: that.regUsername,
					pid: this.PID
				}).then(res => {

				}).catch(err => {

				})
			},
			reginput4(e) {

			},
			reginputBlur4(e) {
				let email = this.$u.test.email(e);
				if (!email) {
					//console.log('输入的不是邮箱',e);
					this.$u.toast(this.$t('emailGeShi'));
					this.$nextTick(() => {
						this.regUsername = ''
					})
				} else {
					//console.log('输入的是邮箱',e);

					//判断.后面是否是纯字母如果是则通过，如果不是提示邮箱格式错误并清空
					let isshifu = this.validateEmail(e);
					if (!isshifu) {
						//console.log('.后面不是纯字母',isshifu);
						this.$u.toast(this.$t('emailGeShi'));
						this.$nextTick(() => {
							this.regUsername = ''
						})
					} else {
						//console.log('.后面是纯字母',isshifu);
					}

				}
				this.reginput_border9 = 0
			},
			validateEmail(e) {
				//判断邮箱末尾是否有数字
				// const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w{2,}(\.\w{2,})?$/;
				// const numberPattern = /\d$/;
				// return !emailPattern.test(e) || numberPattern.test(e);

				//使用split分割email字符串
				const parts = e.split('.');
				// 如果数组长度大于1，返回'@'后面的内容，否则返回空字符串
				let dianHou = parts.length > 1 ? parts[1] : '';

				//然后判断.后面的是否有数字
				const numberPattern = /\d$/;

				//是否字母
				//只能为"a-z"或者"A-Z"之间的字符，结果返回true或者false。
				//结果true就是纯字母   //false就是数字加字母或纯数字
				return this.$u.test.letter(dianHou);
			},
			reginputfocus4(e) {
				//console.log('进入邮箱输入框');
				this.reginput_border9 = 1
			},
			reginput5(e) {
				if (!e) {

				} else {

				}
			},
			reginputBlur5() {
				this.reginput_border5 = 0
			},
			reginputfocus5() {
				this.reginput_border5 = 1
			},
			reginput6(e) {
				if (!e) {

				} else {

				}
			},
			reginputBlur6() {
				this.reginput_border6 = 0
			},
			reginputfocus6() {
				this.reginput_border6 = 1
			},
			reginput7(e) {
				if (!e) {

				} else {

				}
			},
			reginputBlur7() {
				this.reginput_border7 = 0
			},
			reginputfocus7() {
				this.reginput_border7 = 1
			},
			reginput8(e) {
				if (!e) {

				} else {

				}
			},
			reginputBlur8() {
				this.reginput_border8 = 0
			},
			reginputfocus8() {
				this.reginput_border8 = 1
			},
			
			
			
			
			
			
			
			//手机号输入框
			reginput1(e) {
				let that = this
				if (!e) {
					//that.BorderHongse1 = 1
					//this.regisDisabledTwo = true
				} else {
					// 示例电话号码和国家代码
					// const phoneNumber = that.defaultXz_quhao_code + e; // 国际格式
					// const country = that.short; // 国家代码，比如 'US' 代表美国
					
					// 解析电话号码
					// const parsedNumber = isValidPhoneNumber(phoneNumber, country);
					// if (parsedNumber) {
					// 	console.log('有效的电话号码');
					// 	that.BorderHongse1 = 0
					// } else {
					// 	console.log('无效的电话号码');
					// 	that.BorderHongse1 = 1
					// }
					
					//判断首位不能是0
					// if (e == 0 || e == "0") {
					// 	this.$nextTick(() => {
					// 		this.regUsername = ''
					// 	})
					// }
					//this.regisDisabledTwo = false
				}
			},
			//离开聚焦手机号输入框
			reginputBlur1(e) {
				this.reginput_border4 = 0
				//this.BorderHongse1 = 0
				// 示例电话号码和国家代码
				const phoneNumber = this.defaultXz_quhao_code + e; // 国际格式
				const country = this.short; // 国家代码，比如 'US' 代表美国
				
				// 解析电话号码
				const parsedNumber = isValidPhoneNumber(phoneNumber, country);
				if (parsedNumber) {
					console.log('有效的电话号码');
					this.BorderHongse1 = 0
					this.regisDisabledTwo = false
				} else {
					console.log('无效的电话号码');
					this.BorderHongse1 = 1
					this.regisDisabledTwo = true
				}
			},
			//聚焦手机号输入框
			reginputfocus1(e) {
				this.reginput_border4 = 1
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			//注册密码输入框
			reginput2(e) {
				//console.log('输入第一次密码',e)
				if (!e) {
					this.regisDisabledTwo = true
					this.is_bawei = 0
					this.is_zimu = 0
					this.is_shuzi = 0
				} else {
					//this.regisDisabledTwo = false

					//判断输入的是否是纯数字 false不是数字  true是纯数字
					let isNum = !isNaN(parseFloat(e)) && isFinite(e);
					//console.log('是否为数字',isNum)

					//判断是否为字母 false不是字母  true是纯字母
					let isStr = this.$u.test.letter(e)
					//console.log('是否为字母',isStr)

					//判断输入的是否是字母和数字 不能小于8位
					// if(e.length >= 8){

					// 	this.regisDisabledTwo = false
					// 	this.is_bawei = 1
					// 	//this.is_zimu = 0
					// 	//this.is_shuzi = 0
					// } else {
					// 	//console.log('密码小于8位')
					// 	this.is_bawei = 0
					// 	this.regisDisabledTwo = true
					// }
					//else {
					//this.is_bawei = 1

					if (isNum == false && isStr == false) {
						//console.log('输入的是数字和字母1')
						if (e.length >= 8) {
							//if(this.regconfirmation){
							this.regisDisabledTwo = false
							//}
							this.BorderHongse = 0 //红色边框去除
							this.is_bawei = 1
							this.is_shuzi = 1
							this.is_zimu = 1
						} else {
							//console.log('密码小于8位')
							this.is_bawei = 0
							this.is_zimu = 1
							this.is_shuzi = 1
							this.regisDisabledTwo = true
							this.BorderHongse = 1 //红色边框加上
						}


						//可以判断是否字母和数字，如包含特殊字符就是false
						let key = this.$u.test.enOrNum(e);
						if (!key) {
							//console.log('字母和数字中包含其他字符')
							this.is_shuzi = 0
							this.is_zimu = 0

							let isbaohansz = /\d/.test(e); //是否包含数字
							//console.log('是否包含数字',isbaohansz)
							if (isbaohansz) {
								this.is_shuzi = 1
							} else {
								this.regisDisabledTwo = true
							}

							let isbaohanzm = /[a-zA-Z]/.test(e); //是否包含字母
							//console.log('是否包含字母',isbaohansz)
							if (isbaohanzm) {
								this.is_zimu = 1
							} else {
								this.regisDisabledTwo = true
							}

						} else {

						}

					} else if (isNum == true) {
						//console.log('输入的是数字')
						this.regisDisabledTwo = true

						if (e.length >= 8) {
							this.is_bawei = 1
							this.is_shuzi = 1
							this.is_zimu = 0
						} else {
							//console.log('数字-密码小于8位')
							this.is_bawei = 0
							this.is_shuzi = 1
							this.is_zimu = 0
							this.BorderHongse = 1 //红色边框加上
						}

					} else if (isStr == true) {
						//console.log('输入的是字母')
						this.regisDisabledTwo = true

						if (e.length >= 8) {
							this.is_bawei = 1
							this.is_zimu = 1
							this.is_shuzi = 0
						} else {
							//console.log('字母-密码小于8位')
							this.is_bawei = 0
							this.is_shuzi = 0
							this.is_zimu = 1
							this.BorderHongse = 1 //红色边框加上
						}
					}
					//}

				}
			},
			reginputBlur2(e) {

				this.is_mstsShow = false

				let isNum = !isNaN(parseFloat(e)) && isFinite(e);
				let isStr = this.$u.test.letter(e)

				if (e.length < 8) {
					//此时可以让边框变红
					this.BorderHongse = 1

					this.regisDisabledTwo = true
				} else {
					if (isNum == false && isStr == false) {

						//if(this.regconfirmation){
						this.regisDisabledTwo = false
						//}

						this.is_shuzi = 1
						this.is_zimu = 1

						//可以判断是否字母和数字，如包含特殊字符就是false
						let key = this.$u.test.enOrNum(e);
						if (!key) {
							//console.log('字母和数字中包含其他字符')
							this.is_shuzi = 0
							this.is_zimu = 0

							let isbaohansz = /\d/.test(e); //是否包含数字
							//console.log('是否包含数字',isbaohansz)
							if (isbaohansz) {
								this.is_shuzi = 1
							} else {
								//此时可以让边框变红
								this.BorderHongse = 1

								this.regisDisabledTwo = true
							}

							let isbaohanzm = /[a-zA-Z]/.test(e); //是否包含字母
							//console.log('是否包含字母',isbaohansz)
							if (isbaohanzm) {
								this.is_zimu = 1
							} else {
								//此时可以让边框变红
								this.BorderHongse = 1

								this.regisDisabledTwo = true
							}

						} else {

						}
					} else if (isNum == true) {
						//console.log('输入的是数字')

						//此时可以让边框变红
						this.BorderHongse = 1

						this.regisDisabledTwo = true
						this.is_shuzi = 1
						this.is_zimu = 0
					} else if (isStr == true) {
						//console.log('输入的是字母')

						//此时可以让边框变红
						this.BorderHongse = 1

						this.regisDisabledTwo = true
						this.is_zimu = 1
						this.is_shuzi = 0
					}
				}

				this.reginput_border2 = 0
			},
			reginputfocus2() {
				this.reginput_border2 = 1
				this.is_mstsShow = true
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			reginput3(e) {
				if (!e) {
					this.regisDisabledTwo = true
				} else {
					this.regisDisabledTwo = false
				}
			},
			reginputBlur3() {
				this.reginput_border3 = 0
			},
			reginputfocus3() {
				this.reginput_border3 = 1
			},
			regBtn() {
				let that = this
				
				if (that.regUsername == "") {

					that.$u.toast(that.$t('opoupToast.username'));

				} else if (that.regPassword == "") {

					that.$u.toast(that.$t('opoupToast.password'));

				} else if (that.ErCipassword == 2 && that.regconfirmation == "") {

					that.$u.toast(that.$t('opoupToast.confirmation'));

				} else if (that.ErCipassword == 2 && that.regPassword != that.regconfirmation) {

					that.$u.toast(that.$t('opoupToast.NotheSame'));

				} else if (that.ZhenShirealName == 2 && that.XingMing == "") {

					that.$u.toast(that.$t('getZhenshiName'));

				} else if (that.KaiQiphoneNumber == 2 && that.LeiXingName == 2 && that.verifyCode == "") {

					that.$u.toast(that.$t('getPhoneCode'));

				} else if (that.KaiQiemail == 2 && that.LeiXingName == 1 && that.verifyCode == "") {

					that.$u.toast(that.$t('getYouXiangCode'));

				} else if (that.regRememberMe == false) {

					that.$u.toast(that.$t('regiserPopup.Unselected'));

				} else if(that.BorderHongse1 == 1 && that.LeiXingName == 2){
					
					that.BorderHongse1 = 1
					that.regisDisabledTwo = true
					
				} else {
					let md5Pw = md5Libs.md5(that.regPassword) //把密码加密
					that.regbtnStatus = true

					let serialNo = uni.getStorageSync('thisUuid') || 'iphone';
					let machineName = uni.getStorageSync('machineName') || 'iphone';
					let ua = uni.getStorageSync('thisUa') || 'iphone';

					let ZhangHuMing = ''
					if (that.LeiXingName == 2) {
						ZhangHuMing = '(+' + that.defaultXz_quhao_code + ')' + that.regUsername
					} else {
						ZhangHuMing = that.regUsername
					}
					
					
					
					
					
					
					
					
					
					
					//let QuDaoId = uni.getStorageSync('channel_id') || 2;
					//先判断id是否为整数，如果是就是直接传给channelId
					//如果不是就传给referalCode
					let is_num = that.$u.test.digits(that.YaoQingMa);
					console.log('是否为整数：',is_num);
					
					let channel_sid = 2
					let referalCodes = ""
					
					if(is_num){
						channel_sid = Number(that.YaoQingMa);
						console.log('整数渠道ID：', channel_sid);
					} else {
						referalCodes = that.YaoQingMa;
						console.log('转码渠道ID：', referalCodes);
					}
					

					setTimeout(() => {
						that.$u.post('/register', {
							
							channelId: parseInt(channel_sid) || 2,
							referalCode: referalCodes || "",
							
							username: ZhangHuMing, //用户名
							password: md5Pw, //md5加密后的串
							realName: that.XingMing,
							verifyCode: that.verifyCode,
							serialNo: serialNo, //设备序列码
							machineName: machineName, //设备型号
							operatorId: that.OPERATORID,
							pid: that.is_pid || that.PID,
						}).then(res => {

							//console.log('注册账号',res)
							that.regbtnStatus = false
							uni.setStorageSync('token', res.data.token)
							uni.setStorageSync('userinfo', res.data)
							
							uni.removeStorageSync('ADD-MYAPP-KEY-ONE');
							
							that.signInShow = false

							//登录后刷新一下navbar组件的获取token方法
							uni.$emit('getinspectToken', 1)

							//注册成功后设置用户标记
							//玩家注册成功之后，跳转到奖金页面（可以弹出那个首充引导弹窗）,登录不用...
							uni.setStorageSync('is_newUser', 1)

							//打开wss链接
							uni.$emit('StartOpenWss', 1);

							//关闭注册引导
							uni.$emit('GuanBiYinDaoReg', 1);

							//#ifdef H5

							//友盟埋点事件
							const _czc = _czc || [];
							window._czc.push(['_trackEvent', '点击注册', '注册']);

							if (window.Unity) {
								Unity.call('af_complete_registration'); //注册成功埋点
							}
							//Facebook Pixel埋点
							if (window.fbq) {
								fbq('track', 'CompleteRegistration', {
									status: true
								}); //注册成功埋点
							}
							
							
							
							
							
							//抖音的注册埋点
							if (window.ttq) {
								ttq.track('CompleteRegistration', {
								  "contents": [
									{
									  "content_id": that.is_pid || that.PID, // string. ID of the product. Example: "1077218".
									  "content_type": "<content_type>", // string. Either product or product_group.
									  "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
									}
								  ],
								  "value": that.YaoQingMa || channel_sid, // number. Value of the order or items sold. Example: 100.
								  "currency": "" // string. The 4217 currency code. Example: "USD".
								});
							}
							
							

							//window.location.reload();

							uni.reLaunch({
								url: '/pages/index/index',
								success: function(res) {
									//uni.setStorageSync("OpenDepositoAdvShow", 1)
									//websocetObj.sokcet();
								}
							});
							//#endif

							//#ifdef APP-PLUS
							uni.reLaunch({
								url: '/pages/Bonus-Logoin/Bonus-Logoin', //'/pages/index/index',
								success: function(res) {
									//websocetObj.sokcet()
								}
							})
							//#endif

						}).catch(err => {
							//console.log('注册失败',err)
							that.regbtnStatus = false
							let code = err.data.code
							if (code == 1 || code == 4) {
								that.signInShow = false
								setTimeout(() => {
									//账户已被使用找回密码操作
									that.Yizhuceshow = true
								}, 300)
							}
						})
					}, 1500)

				}
			},
			yesconfirm() {
				let that = this
				let windowWidth = uni.getSystemInfoSync().windowWidth
				if (windowWidth >= "800") {
					that.signInShow = false
					that.$refs.openPCfpass.openPopup(that.Username)
				} else {
					uni.navigateTo({
						url: '/pages/ForgotPassword/ForgotPassword?phoneNum=' + that.regUsername
					})
				}
			},
			yesCancel() {
				//已注册去登录。切换tabs就行了
				let that = this
				that.signInShow = true
				that.tabsIdx = 1
			},
			regcheckboxChange(e) {

			},
			regcheckboxGroupChange(e) {

			},



















		}
	}
</script>

<style lang="scss">
	// /deep/ .select_input {
	// 	padding-left: 0 !important;
	// }
	
	.gianbi_icon {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		z-index: 99;
		.u-icon {
			color: $me-text-color;
			font-size: 16px !important;
		}
	}
	
	#grecaptcha {
		margin: 0 auto;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.errPhoneNum {
		color: #fb2b57 !important;
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}

	/deep/ .u-drawer {
		max-width: 430px !important;
	}

	.bianHong {
		border: 1px solid #fb2b57 !important;
	}

	/deep/ .u-mask-show {
		display: block !important;
	}

	/*/deep/ .u-btn--error {
		background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
		box-shadow: 0 3px 20px #ff23413d, inset 0 4px 4px #ffffff30;
		position: relative;
		z-index: 2;
		color: #ffffff !important;
		border-radius: 8px;
	}
	
	/deep/ uni-button {
		background: linear-gradient(1turn, #db0a49 .8%, #db0a49);
		box-shadow: 0 3px 28px #ff23413d, inset 0 3px 3px #ffffff30;
		position: relative;
		z-index: 2;
		color: #ffffff !important;
		border-radius: 8px;
	}
	
	/deep/ .u-btn--primary {
		background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
		box-shadow: 0 3px 20px #ff23413d, inset 0 4px 4px #ffffff30;
		position: relative;
		z-index: 2;
		color: #ffffff !important;
		border-radius: 8px;
	}*/

	/deep/ .xialaXuanze2 {
		z-index: 9 !important;
	}

	.login_tabs_wrap {
		padding: 40rpx 40rpx 0 40rpx;
		width: 100%;
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 10;

		.login_tabs {
			display: flex;
			align-items: center;
			background-image: $signlnPopup-tabs-bg-color;
			border-radius: 20rpx;
			padding: 8rpx;
			width: fit-content;

			view {
				cursor: pointer;
				font-weight: 600;
				border-radius: 15rpx;
				width: auto;
				padding: 0 20rpx;
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				color: $signlnPopup-tabs-mzFont-color;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.xuanze {
				background-color: $signlnPopup-tabs-xz-color;
				color: $signlnPopup-tabs-xzFont-color;
			}

			view:nth-child(1) {}

			view:nth-child(2) {}
		}
	}


	/deep/ .u-checkbox {
		line-height: initial;
		align-items: flex-start !important;
	}

	/deep/ .u-checkbox__icon-wrap {
		position: relative;
		top: 7rpx;
	}

	.checkbox {
		font-size: 28rpx;
		color: $font-all-color;
	}

	.to_SignIn {
		background-color: $all-secondary-color;
		text-align: center;
		height: 83rpx;
		line-height: 83rpx;
		color: $font-all-color;
		font-size: 24rpx;
	}

	.input_box {
		
		padding: 30rpx 40rpx 40rpx 40rpx;

		.input_item {
			margin-bottom: 30rpx;
			position: relative;

			.xuanze_acType {
				padding-left: 10rpx;
				display: inline-block;
				margin-bottom: 30rpx;
				// position: absolute;
				// left: 0;
				// top: 45rpx;
				//z-index: 9999;
				position: relative;

				.mimats_box2 {
					//background-color: #37465c4d;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					position: relative;

					view {
						cursor: pointer;
						font-size: 28rpx;
						position: relative;
						margin-right: 18px;
						text-align: center;

						p {
							color: #94a3c0;
						}
					}

					.isxz {
						width: 100%;
						position: absolute;
						left: 0;
						right: 0;
						margin: 0 auto;
						bottom: -10rpx;
						border-bottom: 2px solid #2283f6;
						color: #2283f6 !important;
					}
				}
			}

			.tishiInput_box {
				width: 100%;
				position: absolute;
				left: 0;
				top: -195rpx;
				z-index: 9999;

				.mimats_box {
					background-color: $mimats-box-bg-color;
					border-radius: 20rpx;
					position: relative;

					.mimats_info {
						padding: 10rpx 20rpx;

						.zhilv {
							color: #1fbe43 !important;
						}

						.tishi_1 {
							display: flex;
							align-items: center;
							margin: 10rpx 0;
							color: $mimats-box-mr-font;
							font-size: 26rpx;

							.u-icon {
								margin-right: 10rpx;
							}

							span {
								font-weight: bold;
								word-break: break-all;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;
								overflow: hidden;
							}
						}
					}

					.mima_ts_sj {
						width: 30rpx;
						height: 30rpx;
						background-color: $mimats-box-bg-color;
						position: absolute;
						bottom: -12rpx;
						left: 20rpx;
						transform: rotate(45deg);
					}
				}
			}

			.input_item_title {
				color: $font-all-color;
				margin-bottom: 10rpx;
				font-size: 28rpx;
				display: flex;
				align-items: center;

				.u-icon {
					margin-left: 8rpx;
					cursor: pointer;
				}
			}
			.input_item_true {
				background-color: $all-secondary-color;
				border: 1px solid $input-border-color;
				border-radius: 20rpx;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				height: 50px;

				.left_icon {
					margin-right: 10rpx;

					.u-icon {
						font-size: 34rpx;
					}
				}

				.right_icon {
					color: #2283f6;
					font-size: 24rpx;

					span {
						color: #2283f6;
					}
				}

				.phone-code {
					border-right: 1px solid #2f4553;
					padding: 0 20rpx 0 0;
					color: #7b98bf;
					margin-right: 20rpx;
				}
			}
		}

		.Agreement {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: $font-all-color;
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {

				cursor: pointer;
			}
		}
	}

	.Register_btn_sign_wrap {
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 20rpx 0 30rpx 0;
		z-index: 8;
	}

	.Register_btn_sign {
		width: 90%;
		margin: 0 auto;

		/deep/ uni-button {
			background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
			box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
			position: relative;
			z-index: 2;
			color: #ffffff !important;
			border-radius: 8px;
			font-weight: bold;
		}

		/deep/ .u-btn--error--disabled {
			background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57) !important;
			opacity: .4;
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









	::v-deep .uni-table-tr:nth-of-type(2n) {
		background-color: #B1BAD3;
	}

	::v-deep .uni-table-tr {
		background-color: $all-secondary-color;
	}


	.xialaXuanze {
		position: relative;
		z-index: 101;
		cursor: pointer;

		.scroll_wrap {
			position: absolute;
			width: 100%;
			margin: 0 auto;
			left: 0;
			right: 0;
			top: 104rpx;

			.scroll_wrap_item {
				background-color: $select-drop-down-color;
				padding: 20rpx;
				border-radius: 16rpx;

				.scroll_name {
					display: flex;
					align-items: center;
					padding: 20rpx 20rpx;
					border-radius: 10rpx;
					cursor: pointer;
					color: #B2B9D0;

					image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.xlxz_input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			//background-color: #2a3546;
			padding: 15rpx 30rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 16rpx;

			.xlxz_title {
				display: flex;
				align-items: center;
				color: $all-secondary-text-color;

				image {
					width: 38rpx;
					height: 38rpx;
					margin-right: 10rpx;
				}

				view {
					font-weight: bold;
				}
			}

			.right_box {}
		}
	}










	.xialaXuanze2 {
		position: relative;
		z-index: 999;
		cursor: pointer;

		.scroll_wrap {
			position: absolute;
			width: 100%;
			margin: 0 auto;
			left: 0;
			right: 0;
			top: 80rpx;

			.scroll_wrap_item {
				background-color: $select-drop-down-color;
				padding: 20rpx;
				border-radius: 16rpx;
				//height: 300rpx;
				max-height: 300rpx;

				.scroll_name {
					display: flex;
					align-items: center;
					padding: 14rpx 18rpx;
					cursor: pointer;
					color: #B2B9D0;
					border-radius: 10rpx;

					image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 10rpx;
					}
				}

				.xuanzhong {
					background-color: $select-drop-down-xz-color;
					color: #fff;
					font-weight: bold;
				}
			}
		}

		.xlxz_input {
			display: flex;
			align-items: center;
			justify-content: space-between;

			//background-color: #2a3546;
			//padding: 15rpx 30rpx;
			//height: 90rpx;
			//line-height: 90rpx;
			//border-radius: 16rpx;
			.xlxz_title {
				display: flex;
				align-items: center;
				color: #B2B9D0;

				image {
					width: 38rpx;
					height: 38rpx;
					margin-right: 10rpx;
				}

				view {
					font-weight: bold;
				}
			}

			.right_box {
				margin-left: 10rpx;

				.u-icon {
					font-size: 24rpx;
					color: $me-text-color;
				}
			}
		}
	}
</style>