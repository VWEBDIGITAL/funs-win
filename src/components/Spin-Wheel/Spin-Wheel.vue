<template>
	<view>
		<zp-popup v-model="popupShow" width="750" z-index="999" mode="bottom" border-radius="34" :closeable="false" close-icon-color="#ffffff">
			<view class="pages-wrap">

				<view class="top_kongzhi">
					<view class="misu" @click="jlguize()" v-if="!show4">
						<image src="/static/wheel/icon_216965.png"></image>
					</view>
					
					<view class="misu" v-if="show4">
						<u-icon name="arrow-left" color="#ffffff" @click="jixuxuanzhuan()"></u-icon>
					</view>
					<!-- <view class="misu">
						<u-icon name="volume-up-fill" color="#ffffff" @click="pause" v-if="musicShow"></u-icon>
						<u-icon name="volume-off-fill" color="#ffffff" @click="play" v-if="!musicShow"></u-icon>
					</view> -->
					<view class="guanbi" @click="GuanBiPopShow()"><u-icon name="close" color="#ffffff"></u-icon></view>
				</view>

				<uni-transition ref="showTops" class="pan_xuanxiangka" :mode-class="modeClass" :show="showTop">
					<view class="xxka_box">
						<view class="shopTuijian">
							<scroll-view class="uni-swiper-tab" scroll-x>
								<view class="scrollx_items" v-for="(item,index) in TypesList" :key="index"
									@click="xuanzePantype(item,index)">
									<view class="ren_info" :class="[typesidx == index ? 'typexuanzhong':'']">

										<image :src="item.icon" v-if="index == 0"></image>
										<image :src="item.icon" v-else-if="index == 1"></image>
										<image :src="item.icon" v-else-if="index == 2"></image>
										<image :src="item.icon" v-else-if="index == 3"></image>
										<image src="/static/wheel/zhuanpan2.png" v-else></image>

										<view class="fubiaotiWrap" :class="[typesidx == index ? 'fbtxz':'']">
											<view class="fubiaoti">{{item.name}}</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</uni-transition>

				<view class="demo">

					<uni-transition ref="ani" class="pan_biaoti" :mode-class="modeClass" :show="show">
						<view class="biaoti_tupian">
							<view class="pandengji">
								<view>{{typsData.name}}</view>
								<image src="/static/wheel/tg-wheel-1.webp" mode="widthFix" v-if="typesidx == 0"></image>
								<image src="/static/wheel/tg-wheel-2.webp" mode="widthFix" v-else-if="typesidx == 1">
								</image>
								<image src="/static/wheel/tg-wheel-3.webp" mode="widthFix" v-else-if="typesidx == 2">
								</image>
								<image src="/static/wheel/tg-wheel-4.webp" mode="widthFix" v-else-if="typesidx == 3">
								</image>

								<image src="/static/wheel/tg-wheel-2.webp" mode="widthFix" v-else></image>
							</view>
							<view class="tgwhell_box">
								<image src="/static/wheel/tg-wheel-title.webp" mode="widthFix"></image>
							</view>
						</view>
					</uni-transition>


					<uni-transition ref="ZhuanPan" class="" :mode-class="modeClass3" :show="show3">
						<view class="demos">
							<l-dialer size="624rpx" ref="dialer" :styleOpt="styleOpts" :prizeList="prizeList" @click="onClick" @done="onDone" pointerStyle="width: 26%;" dial-style="color: #00466f; padding: 48rpx;">
								<view slot="pointer">
									<image class="heart" src="/static/wheel/turnable_btn1.png" style="width: 100%" mode="widthFix" @click="[Myinfos.spinScore >= typsData.cost?onClick():null]" v-if="typesidx == 0" />
									<image class="heart" src="/static/wheel/turnable_btn2.png" style="width: 100%" mode="widthFix" @click="[Myinfos.spinScore >= typsData.cost?onClick():null]" v-else-if="typesidx == 1" />
									<image class="heart" src="/static/wheel/turnable_btn3.png" style="width: 100%" mode="widthFix" @click="[Myinfos.spinScore >= typsData.cost?onClick():null]" v-else-if="typesidx == 2" />
									<image class="heart" src="/static/wheel/turnable_btn4.png" style="width: 100%" mode="widthFix" @click="[Myinfos.spinScore >= typsData.cost?onClick():null]" v-else-if="typesidx == 3" />

									<image class="heart" src="/static/wheel/turnable_btn2.png" style="width: 100%" mode="widthFix" @click="[Myinfos.spinScore >= typsData.cost?onClick():null]" v-else />
								</view>
							</l-dialer>
							<view class="bejing">
								<image style="width: 636rpx;height: 636rpx;" src="/static/wheel/tg-wheel-border.webp" v-if="typesidx == 0 || typesidx == 1 || typesidx == 2"></image>
								<image style="width: 636rpx;height: 636rpx;" src="/static/wheel/tg-wheel-border2.webp" v-else-if="typesidx == 3"></image>

								<image style="width: 636rpx;height: 636rpx;" src="/static/wheel/tg-wheel-border.webp" v-else></image>
							</view>
						</view>
					</uni-transition>


					<uni-transition ref="anis" class="kaishixz" :mode-class="modeClass2" :show="show2">
						<view class="zhuceBtn" @click="[Myinfos.spinScore >= typsData.cost?onClick():null]">
							<view class="anniu" :class="[Myinfos.spinScore < typsData.cost?'btm':'']">
								<view class="wwewnzi">
									<view class="ljyj">立即旋转 & 赢奖</view>
									<view class="ssjf">(使用{{typsData.cost||'0'}}幸运值)</view>
								</view>
							</view>
						</view>
					</uni-transition>

				</view>

				<uni-transition ref="JieGuoBg" class="JieGuoBg_DH" :mode-class="['fade','zoom-in']" :show="show4">
					<view>
						<image src="/static/wheel/win-coins.webp" mode=""></image>
					</view>
				</uni-transition>

				<uni-transition ref="JieGuoBg" class="JieGuoBg_title" :mode-class="['fade','zoom-in']" :show="show5">
					<view class="jieguo_title">
						<view class="bt1">
							<image class="btn1image" src="/static/wheel/fury-wheel-win-title.webp" mode=""></image>
						</view>
						<view class="bt2">
							<view class="wenan_wrap">
								<image class="wenan_bg" src="/static/wheel/fury-wheel-win-background.png" mode="">
								</image>
								<view class="jieguo_wenan">
									<image class="" src="/static/image/currency_coins.png" v-if="platform == 8 || platform == 10 || platform == 11"></image>
									<image class="" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
									<image class="" src="/static/image/jinbi-3.png" v-else></image>
									<span>{{toFixedTwo(is_sliceBalance/100)}}</span>
								</view>
							</view>
						</view>
						<view class="btn3">
							<view>用它玩游戏,享受赢得更多的乐趣。</view>
						</view>
					</view>
				</uni-transition>

				<uni-transition ref="JieGuoBg" class="JieGuoBg_anniuzu" :mode-class="['fade','slide-bottom']"
					:show="show6">
					<view class="jieguo_btnzu">
						<view class="hongseBtn">
							<view class="anniu" @click="OpenGames()">开始游戏</view>
						</view>
						<view class="zhuceBtn">
							<view class="anniu"><u-icon name="zhuanfa" color="#ffffff"></u-icon>分享</view>
						</view>
					</view>
				</uni-transition>

				<view class="dizuo">
					<image class="" src="/static/wheel/tg-wheel-background.png" mode="widthFix"></image>
				</view>

				<view class="bottom_kongzhi">
					<view class="misu" v-if="!show4">
						<image src="/static/wheel/info_15260.png"></image>
						<view>当前幸运值:<span @click="lookJifenjl()">{{Myinfos.spinScore || '0'}}</span></view>
					</view>
					<view class="guanbi" @click="ToLishi()" v-if="!show4"><u-icon name="clock" color="#ffffff"></u-icon>
					</view>
				</view>



				<!-- 历史记录 -->
				<uni-transition ref="LiShiJiLu" class="LiShiJiLu_box" :mode-class="['fade','slide-right']" :show="show7">
					<view class="lishijilu_box">
						<view class="lsjl_title">
							<view class="misus" @click="fanhui_btn()">
								<u-icon name="arrow-left"></u-icon>
							</view>
							<view class="biaotiaaa">奖励与公告</view>
						</view>
						<view class="tabs_sm">
							<view :class="tabsidx == 0?'curbg':''" @click="clicktabs(0)">我的奖励</view>
							<view :class="tabsidx == 1?'curbg':''" @click="clicktabs(1)">轮盘公告</view>
						</view>
						<view class="fenshu_list_box">
							<view class="list_title" v-if="tabsidx == 0">
								<view>类型</view>
								<view>时间</view>
								<view>奖励</view>
							</view>
							<view class="list_title" v-if="tabsidx == 1">
								<view>用户</view>
								<view>时间</view>
								<view>奖励</view>
							</view>
							<view class="list_item_box" v-if="HuoJiangJiLu.length != 0">
								<scroll-view scroll-y style="max-height: 500px;" scroll-with-animation>
									<view class="list_item_box_item" v-for="(item,index) in HuoJiangJiLu" :key="index">
										
										
										<view class="yhtx" v-if="tabsidx == 0">
											<!-- <view>{{HuoquspinType(item.type)}}</view> -->
											
											<image :src="HuoquspinTypeImg(item.type)"></image>
											<span style="position: initial;margin: 0 0 0 10rpx;padding: 0 4px;background-color: transparent;">{{HuoquspinType(item.type)}}</span>
											
										</view>
										
										<view class="yhtx" v-if="tabsidx == 1">
											<image :src="userav(item.headId)"></image>
											<span style="position: initial;margin: 0 0 0 10rpx;padding: 0 4px;color:#fff;">{{formattedName(item.nick)}}</span>
										</view>
										
										
										<view class="pan_type">{{$u.timeFormat(item.time, 'yyyy-mm-dd')}}</view>
										<view class="shuliang">
											<image class="" src="/static/image/currency_coins.png" v-if="platform == 8 || platform == 10 || platform == 11"></image>
											<image class="" src="/static/image/coin-yuan_cny.png" v-else-if="platform == 1 || platform == 5 || platform == 6"></image>
											<image class="" src="/static/image/jinbi-3.png" v-else></image>
											<view>{{toFixedTwo(item.gameCoin/100)}}</view>
										</view>
									</view>
								</scroll-view>
							</view>
							<view class="Data_null" v-else>
								<image src="/static/image/NoOrders.png" mode="widthFix"></image>
								<view>No Datas</view>
							</view>
						</view>
					</view>
				</uni-transition>
				
				
				
				
				<!-- 我的积分记录 -->
				<uni-transition ref="LiShiJiLu" class="LiShiJiLu_box" :mode-class="['fade','slide-right']" :show="show9">
					<view class="lishijilu_box">
						<view class="lsjl_title">
							<view class="misus" @click="fanhui_btn9()">
								<u-icon name="arrow-left"></u-icon>
							</view>
							<view class="biaotiaaa">我的积分记录</view>
						</view>
						<view style="height: 50rpx;"></view>
						<view class="fenshu_list_box">
							<view class="list_title">
								<view style="flex: 1;text-align: left;">类型</view>
								<view style="flex: 1;">时间</view>
								<view style="flex: 1;text-align: right;">积分</view>
							</view>
							<view class="list_item_box" v-if="MyjifenJiLu.length != 0">
								<scroll-view scroll-y style="max-height: 500px;" scroll-with-animation>
									<view class="list_item_box_item" v-for="(item,index) in MyjifenJiLu" :key="index">
										
										<!-- 
										1.棋牌投注 
										2、捕鱼投注
										3、电子投注
										4、直播投注 
										5、体育投注 
										6、MINI投注 
										7、缤果投注 
										30、手动加减积分 
										31、充值积分 
										32、注册积分 
										33、登录积分 -->
										
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 1">棋牌投注</view>
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 2">捕鱼投注</view>
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 3">电子投注</view>
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 4">直播投注</view>
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 5">体育投注</view>
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 6">迷你投注</view>
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 7">缤果投注</view>
										
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 30">手动加减</view>
										
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 31">充值积分</view>
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 32">注册积分</view>
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type == 33">登录积分</view>
										
										<view class="yhtx" style="flex: 1;justify-content: flex-start;" v-if="item.type >= 50">旋转轮盘</view>
										
										
										<view class="pan_type" style="flex: 1;">{{$u.timeFormat(item.time, 'yyyy-mm-dd')}}</view>
										<view class="shuliang" style="flex: 1;justify-content: flex-end;padding-right: 20rpx;">
											<view :class="isNum(item.score) == -1 ? 'hongse': 'lvse'">{{item.score}}</view>
										</view>
									</view>
								</scroll-view>
							</view>
							<view class="Data_null" v-else>
								<image src="/static/image/NoOrders.png" mode="widthFix"></image>
								<view>No Datas</view>
							</view>
						</view>
					</view>
				</uni-transition>
				
				


				<!-- 奖励规则 -->
				<uni-transition ref="LiShiJiLu" class="LiShiJiLu_box" :mode-class="['fade','slide-bottom']"
					:show="show8">
					<view class="lishijilu_box">
						<view class="lsjl_title">
							<view class="misus" @click="jlguize_fb()">
								<u-icon name="close"></u-icon>
							</view>
							<view class="biaotiaaa">奖励规则</view>
						</view>
						<!-- <view class="jjgz_box">
							规则说明文案
						</view> -->
					</view>
				</uni-transition>


			</view>
		</zp-popup>
	</view>
</template>

<script>
	import avatarList from "@/utils/avatar.js";
	export default {
		name: "Spin-Wheel",
		data() {
			return {
				platform: this.PID,
				avatarlist: avatarList.avatarlist,
				avatar: '',
				
				Myinfos: {},
				tokens: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzQ3ODg1OTEsImlhdCI6MTczNDE4Mzc5MSwiaXNzIjoiNjY2QmV0R2FtZSIsInVpZCI6IjY5Nzc3MDA0In0.eyRJ6i0O1a488-p_fAIakXMGTjixTF-fft6H1Wyx2vg",
				music: null,
				// 图片是播放图片还是暂停图片
				musicShow: true,

				popupShow: false,

				showTop: true,
				show: true,
				show2: true,
				show3: true,
				show4: false,
				show5: false,
				show6: false,
				show7: false,
				show8: false,
				show9: false,

				modeClass: 'fade',
				modeClass2: 'fade',
				modeClass3: 'fade',

				tabsidx: 0,

				//选项卡列表
				TypesList: [],
				typesidx: 0,
				typsData: {
					Slice: [],
					cost: 0,
					id: '',
					name: '',
					icon: ''
				},
				styleOpts: {
					// 每一块扇形的背景色,默认值,可通过父组件来改变
					prizeBgColors: ['linear-gradient(-185deg, #9239f6 64.9%, #5f61f6 90.9%)',
						'linear-gradient(to top, #f4f4f4, #4ba9f8)'
					]
				},

				// 奖品列表，
				prizeList: [],
				is_sliceBalance: 0, //获得的金额
				HuoJiangJiLu: [],
				MyjifenJiLu: []
			};
		},
		created() {
			// this.music.autoplay = true;//自动播放
			//this.music.loop = true; //循环播放
			// //音乐播放
			// this.music.play()
			// //音乐地址
			// this.music.src = '/static/LYgOsNix.mp3';
		},
		mounted() {

		},
		methods: {
			init() {
				this.music = uni.createInnerAudioContext();
				let isToken = uni.getStorageSync("token")
				if (!isToken) {

				} else {
					this.getMyinfo()
					this.getDatas()
				}
			},
			//判断是否负数
			isNum(val){
				let Num = Math.sign(val)
				return Num
			},
			userav(data){
				let headId = data
				let tx = ''
				this.avatarlist.forEach((item, index) => {
					if (item.id == headId) {
						tx = item.img
					}
				});
				return tx
			},
			HuoquspinType(val){
				let name = ''
				this.TypesList.forEach((item, index) => {
					if (item.id == val) {
						name = item.name
					}
				});
				return name
			},
			HuoquspinTypeImg(val){
				let name = ''
				if (50 == val) {
					return '/static/wheel/zhuanpan1.png'
				} else if (51 == val) {
					return '/static/wheel/zhuanpan2.png'
				} else if (52 == val) {
					return '/static/wheel/zhuanpan3.png'
				} else if (53 == val) {
					return '/static/wheel/zhuanpan4.png'
				} else {
					return '/static/wheel/zhuanpan1.png'
				}
			},
			formattedName(val) {
				const start = val.slice(0, 2)
				const end = val.slice(-4)
				return `${start}****${end}`
			},
			GetLishiJilu(trues) {
				this.$u.post('/spinwheel/record', {
					querySelf: trues //querySelf是true表示查自己的记录，false表示查其他人的记录
				}).then(res => {
					console.log('获奖记录', res.data);
					this.HuoJiangJiLu = res.data
				}).catch(err => {
				
				});
			},
			mylishijilu(){
				this.$u.post('/spinwheel/score/record', {
				
				}).then(res => {
					console.log('我的积分记录', res.data);
					this.MyjifenJiLu = res.data
				}).catch(err => {
				
				});
			},
			getMyinfo() {
				this.$u.post('/user/get/info', {

				}).then(res => {
					console.log('我的信息', res.data)
					this.Myinfos = res.data
				}).catch(err => {

				})
			},
			getDatas() {
				this.$u.post('/spinwheel/cfg', {

				}).then(res => {

					let result = res.data

					//设置默认的第一个选项卡默认数据
					this.typsData.Slice = result[0].Slice
					this.typsData.cost = result[0].cost
					this.typsData.id = result[0].id
					this.typsData.name = result[0].name
					this.typsData.icon = '/static/wheel/fury-wheel-1.png'
					this.typesidx = 0
					//设置轮盘第一个颜色
					this.styleOpts.prizeBgColors = ['linear-gradient(-185deg, #9239f6 64.9%, #5f61f6 90.9%)',
						'linear-gradient(to top, #f4f4f4, #4ba9f8)'
					]
					
					//设置选项卡数据
					let XuanXiangKa = []
					result.forEach(function(item, index) {
						XuanXiangKa.push({
							Slice: item.Slice,
							cost: item.cost,
							id: item.id,
							name: item.name,
							icon: '/static/wheel/zhuanpan' + (index + 1) + '.png'
						})
					});
					this.TypesList = XuanXiangKa

					//设置第一个转盘的奖项列表
					let PanList = result[0].Slice;
					let NewPanlist = []
					PanList.forEach(function(items, indexs) {
						NewPanlist.push({
							sliceId: items.sliceId,
							reward: (items.reward / 100).toFixed(2),
							icon: items.icon//'/uni_modules/lime-dialer/static/' + (indexs + 1) + '.png'
						})
					});
					this.prizeList = NewPanlist
					
					//console.log('数据', NewPanlist)
					
					this.popupShow = true

				}).catch(err => {

				});
			},
			//选择转盘类型
			xuanzePantype(item, idx) {
				console.log('选择的选项卡', item)
				this.typesidx = idx

				this.typsData.Slice = item.Slice
				this.typsData.cost = item.cost
				this.typsData.id = item.id
				this.typsData.name = item.name
				this.typsData.icon = item.icon

				//赋值新的转盘数据
				let PrizeList = item.Slice
				let NewPanlist = []
				PrizeList.forEach(function(items, indexs) {
					NewPanlist.push({
						sliceId: items.sliceId,
						reward: (items.reward / 100).toFixed(2),
						icon: items.icon//'/uni_modules/lime-dialer/static/' + (indexs + 1) + '.png'
					})
				});
				this.prizeList = NewPanlist

				//根据选择的转盘类型设置转盘的颜色
				if (idx == 0) {
					this.styleOpts.prizeBgColors = ['linear-gradient(-185deg, #9239f6 64.9%, #5f61f6 90.9%)',
						'linear-gradient(to top, #f4f4f4, #4ba9f8)'
					]
				} else if (idx == 1) {
					this.styleOpts.prizeBgColors = ['linear-gradient(-185deg, #376fdf 64.9%, #2954b9 90.9%)',
						'linear-gradient(to top, #f4f4f4, #7ea7f3)'
					]
				} else if (idx == 2) {
					this.styleOpts.prizeBgColors = ['linear-gradient(-185deg, #ee6c33 64.9%, #f2a13a 90.9%)',
						'linear-gradient(to top, #f4f4f4, #7ea7f3)'
					]
				} else if (idx == 3) {
					this.styleOpts.prizeBgColors = ['linear-gradient(-185deg, #ec696d 64.9%, #de403c 90.9%)',
						'linear-gradient(to top, #f4f4f4, #7ea7f3)'
					]
				} else {
					this.styleOpts.prizeBgColors = ['linear-gradient(-185deg, #376fdf 64.9%, #2954b9 90.9%)',
						'linear-gradient(to top, #f4f4f4, #7ea7f3)'
					]
				}

			},
			//点击历史记录
			ToLishi() {
				this.GetLishiJilu(true)
				this.show7 = true
			},
			lookJifenjl(){
				this.mylishijilu()
				this.show9 = true
			},
			fanhui_btn9(){
				this.show9 = false
			},
			clicktabs(idx) {
				this.tabsidx = idx
				if(idx == 0){
					this.GetLishiJilu(true)
				} else {
					this.GetLishiJilu(false)
				}
			},
			fanhui_btn() {
				this.show7 = false
			},
			jlguize() {
				this.show8 = true
			},
			jlguize_fb() {
				this.show8 = false
			},
			//转换金额数值保留2位小数点
			toFixedTwo(val) {
				var str = Number(val).toFixed(2)
				return str;
			},
			//播放
			play() {
				this.music.loop = true; //循环播放
				this.music.src = "/static/LYgOsNix.mp3";
				this.music.play();
				this.musicShow = true
			},
			//暂停
			pause() {
				this.music.pause();
				this.musicShow = false
			},
			GuanBiPopShow() {
				this.music.stop(); //停止播放音乐

				this.popupShow = false
				this.show4 = false
				this.show5 = false
				this.show6 = false
				this.music.destroy();
			},
			OpenZhuanPan() {
				this.popupShow = true
				//this.play()//开始播放背景音乐
				this.show4 = false
				this.show5 = false
				this.show6 = false
			},
			OpenGames() {
				this.music.stop(); //停止播放音乐
				this.popupShow = false
				this.show4 = false
				this.show5 = false
				this.show6 = false
			},
			onDone(index) {
				let that = this
				console.log('index', index);
				const prize = that.prizeList[index];

				that.ZhuanPanHide() //隐藏转盘开始显示结果动画
				that.StartCustomOne('-300px'); //继续隐藏标题图片动画

				//播放结果音效
				this.music.loop = false; //循环播放
				this.music.src = "/static/BdWin.M92MJ2cy.mp3";
				this.music.play();
				setTimeout(() => {
					//通知导航栏飘窗刷新余额
					uni.$emit('getgetMybalance', 1)
					uni.$emit('UpdataAddBcbalance', (this.is_sliceBalance / 100).toFixed(2))
					that.JieGuoBGShow() //显示结果背景图
				}, 300);
			},
			onClick() {
				//先请求获奖接口，得到获奖的sliceId，然后使用sliceId去转盘的List找出sliceId的下标

				this.$u.post('/spinwheel', {
					id: this.typsData.id
				}).then(res => {

					console.log('获奖结果', res.data);
					//重新获取个人的幸运值
					this.getMyinfo();

					//获奖返回的参数
					//let newBalance = res.data.newBalance; //最新的余额
					let newSpinScore = res.data.newSpinScore; //剩余的幸运值
					let sliceIds = res.data.sliceId; //获奖的sliceId

					//找出中奖的下标和奖励金额
					let sliceId_index = null
					let sliceBalance = 0
					let Panlists = this.typsData.Slice
					Panlists.forEach(function(items, indexs) {
						if (items.sliceId == sliceIds) {
							console.log('当前中奖的奖品', items, indexs)
							sliceId_index = indexs
							sliceBalance = items.reward
						}
					});
					this.is_sliceBalance = sliceBalance; //显示当前获得的金额

					//播放旋转音效
					this.music.loop = false; //循环播放
					this.music.src = "/static/FWCircle.D-qNIGJr.mp3";
					this.music.play();

					this.StartXuanXiangKaOne('-200px'); //执行选项卡动画
					this.StartCustomOne('-85px'); //执行标题图片动画
					this.StartCustomBtn(); //执行立即旋转按钮动画
					console.log('点击了开始旋转');

					// 奖品的索引，索引是几就是奖项
					this.$refs.dialer.run(sliceId_index);

				}).catch(err => {

				});
			},
			//恢复选项卡动画位置
			HuiFuXuanXiangKaOne() {
				this.$refs.showTops.step({
					translateY: '0px'
				}, {
					timingFunction: 'linear',
					duration: 400
				});
				// 开始执行动画
				this.$refs.showTops.run(() => {
					console.log('动画支持完毕')
				});
			},
			//开始标题选项卡Y轴移动-100px
			StartXuanXiangKaOne(px) {
				this.$refs.showTops.step({
					translateY: px
				}, {
					timingFunction: 'linear',
					duration: 400
				});
				// 开始执行动画
				this.$refs.showTops.run(() => {
					console.log('动画支持完毕')
				});
			},
			//恢复标题动画位置showTops
			customHuiFuOne() {
				this.$refs.ani.step({
					translateY: '0px'
				}, {
					timingFunction: 'linear',
					duration: 400
				});
				// 开始执行动画
				this.$refs.ani.run(() => {
					console.log('动画支持完毕')
				});
			},
			//开始标题动画Y轴移动-100px
			StartCustomOne(px) {
				this.$refs.ani.step({
					translateY: px
				}, {
					timingFunction: 'linear',
					duration: 400
				});
				// 开始执行动画
				this.$refs.ani.run(() => {
					console.log('动画支持完毕')
				});
			},
			//恢复立即旋转按钮动画位置
			customHuiFuBtn() {
				this.$refs.anis.step({
					translateY: '0px'
				}, {
					timingFunction: 'linear',
					duration: 400
				});
				// 开始执行动画
				this.$refs.anis.run(() => {
					console.log('动画支持完毕')
				});
			},
			//立即旋转按钮动画Y轴移动200px
			StartCustomBtn() {
				this.$refs.anis.step({
					translateY: '300px'
				}, {
					timingFunction: 'linear',
					duration: 400
				});
				// 开始执行动画
				this.$refs.anis.run(() => {
					console.log('动画支持完毕')
				});
			},
			//执行转盘隐藏动画
			ZhuanPanHide() {
				this.$refs.ZhuanPan.step({
					scale: 0
				}, {
					timingFunction: 'ease-in',
					duration: 200
				});
				// 开始执行动画
				this.$refs.ZhuanPan.run(() => {
					console.log('动画支持完毕')
				});
			},
			//执行转盘显示动画
			ZhuanPanShow() {
				this.$refs.ZhuanPan.step({
					scale: 1
				}, {
					timingFunction: 'ease-in',
					duration: 200
				});
				// 开始执行动画
				this.$refs.ZhuanPan.run(() => {
					console.log('动画支持完毕')
				});
			},
			//执行结果隐藏背景图
			JieGuoBGHide() {
				this.$refs.JieGuoBg.step({
					scale: 0
				}, {
					timingFunction: 'ease-in',
					duration: 200
				});
				// 开始执行动画
				this.$refs.JieGuoBg.run(() => {
					console.log('动画支持完毕')
				});
			},
			//执行结果显示背景图
			JieGuoBGShow() {
				this.show4 = true
				setTimeout(() => {
					this.show5 = true
					this.show6 = true
				}, 100)
			},
			jixuxuanzhuan(){
				this.show4 = false
				this.show5 = false
				this.show6 = false
				
				this.HuiFuXuanXiangKaOne()
				this.customHuiFuOne()
				this.customHuiFuBtn()
				this.ZhuanPanShow()
			},







		}
	}
</script>

<style lang="scss">
	/deep/ .u-mode-center-box {
		background-color: transparent !important;
		border-radius: 15px;
	}

	/deep/ .u-drawer-bottom {
		background-color: transparent !important;
		border-radius: 15px 15px 0 0;
		max-width: 1000rpx !important;
		margin: 0 auto;
	}
	
	.btm {
		opacity: .7;
	}
	
	.lvse {
		color: #45D91E;
		//font-weight: bold;
	}
	.hongse {
		color: #f00 !important;
		//font-weight: bold;
	}

	.pages-wrap {
		border-radius: 15px 15px 0 0;
		margin: 0 auto;
		//max-width: 1000rpx;
		background: radial-gradient(77.26% 54.32% at 50% 37.59%, #02b9ff 14%, #005e95 57.5%, #004376 78%, #00244d), linear-gradient(180deg, #005e95 -7.07%, #005e95 14.79%, #00cdff 39.59%, #005e95 58.5%, #004376 67.14%, #00244d 99.06%);

		// #ifdef H5
		//min-height: calc(100vh - 44px);
		// #endif
		// #ifndef H5
		//min-height: 100vh;
		// #endif

		// display: flex;
		// align-items: center;
		// justify-content: center;
		position: relative;
		padding: 0 15px 0 15px;
	}

	.bottom_kongzhi {
		height: 68px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		z-index: 999999999;
		bottom: 0;
		width: 100%;
		color: #ffffff;
		padding: 0 0;

		.misu {
			//background: #ffffff14;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 55rpx;
			cursor: pointer;
			border-radius: 10rpx;
			padding: 0 10rpx;

			.u-icon {
				font-size: 32rpx;
			}

			view {
				font-size: 28rpx;
				color: #7fabda;
				font-weight: bold;

				span {
					color: #ffd800;
					margin: 0 10rpx;
					text-decoration: underline;
					cursor: pointer;
				}
			}

			image {
				width: 38rpx;
				height: 38rpx;
				margin-right: 5rpx;
			}
		}

		.guanbi {
			margin-left: auto;
			background: #ffffff14;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 65rpx;
			height: 65rpx;
			cursor: pointer;
			border-radius: 10rpx;

			.u-icon {
				font-size: 30rpx;
			}
		}
	}

	.top_kongzhi {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		z-index: 999999999;
		top: 0;
		width: 100%;
		color: #ffffff;
		padding: 0 0;
		height: 68px;

		.misu {
			background: #ffffff14;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60rpx;
			height: 60rpx;
			cursor: pointer;
			border-radius: 10rpx;

			.u-icon {
				font-size: 30rpx;
			}

			image {
				width: 32rpx;
				height: 32rpx;
			}
		}

		.guanbi {
			margin-left: auto;
			background: #ffffff14;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60rpx;
			height: 60rpx;
			cursor: pointer;
			border-radius: 10rpx;

			.u-icon {
				font-size: 26rpx;
			}
		}
	}

	.pan_xuanxiangka {
		position: relative;

		.xxka_box {
			margin-bottom: 40px;

			.shopTuijian {
				padding: 0;

				.uni-swiper-tab {
					white-space: nowrap;

					.scrollx_items {
						text-align: left;
						display: inline-block;
						width: 160rpx;
						margin-right: 20rpx;

						.ren_info {
							cursor: pointer;
							background: #ffffff14;
							text-align: center;
							position: relative;
							padding: 24rpx 0 0 0;
							border-radius: 15rpx;

							image {
								width: 54rpx;
								height: 54rpx;
								margin-bottom: 10rpx;
								box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
								border-radius: 100%;
							}

							.fubiaotiWrap {
								background: transparent;
								border: 1px solid transparent;
								border-radius: 6px;
								opacity: .7;
								font-size: 24rpx;
								height: 45rpx;
								line-height: 45rpx;
								font-weight: bold;

								.fubiaoti {
									background: linear-gradient(180deg, #fff, #daf7ff);
									background-clip: text;
									color: transparent;
									filter: drop-shadow(0 1px 1.266px rgba(0, 0, 0, .2));
									word-break: break-all;
									display: -webkit-box;
									-webkit-line-clamp: 1;
									-webkit-box-orient: vertical;
									overflow: hidden;
								}
							}

							.fbtxz {
								background: #0173af;
								border: 1px solid hsla(0, 0%, 100%, .16);
								opacity: 1 !important;
							}
						}

						.typexuanzhong {
							background: linear-gradient(180deg, #00cdff -10%, #00397c 146.25%) !important;
							border-radius: 15rpx;
						}
					}

					.scrollx_items:first-child {
						//margin-left: 30rpx;
					}

					.scrollx_items:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}

	.LiShiJiLu_box {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		//left: 0%;
		//transform: translate(-50%, -50%);
		z-index: 999999999;
		background-color: $body-bg-color;
		border-radius: 15px 15px 0 0;
		padding: 30rpx;

		.lishijilu_box {
			.jjgz_box {
				background-color: #1c2838;
				border-radius: 20rpx;
				padding: 30rpx;
				color: #ffffff;
				margin: 30rpx 0;
				font-size: 24rpx;
			}

			.lsjl_title {
				display: flex;
				align-items: center;
				justify-content: flex-start;

				.misus {
					background: $spin-log-popup-back;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 60rpx;
					height: 60rpx;
					cursor: pointer;
					border-radius: 10rpx;

					.u-icon {
						font-size: 26rpx;
						color: $all-secondary-text-color !important;
					}
				}

				.biaotiaaa {
					margin-left: 16rpx;
					color: $all-secondary-text-color;
					font-weight: bold;
					font-size: 32rpx;
				}
			}

			.tabs_sm {
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: $all-secondary-color;
				border-radius: 19rpx;
				margin: 35rpx 0 35rpx 0;
				padding: 10rpx;

				view {
					font-weight: bold;
					color: #54647d;
					flex: 1;
					text-align: center;
					height: 66rpx;
					line-height: 66rpx;
					cursor: pointer;
				}

				.curbg {
					background-color: #2283f6 !important;
					color: #ffffff !important;
					border-radius: 14rpx;
				}
			}

			.fenshu_list_box {
				.list_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 10rpx;
					color: #54647d;
					font-size: 28rpx;

					view:nth-child(1) {
						//width: 164rpx;
						flex: 1;
						padding: 0 0 0 18rpx;
						text-align: left;
					}

					view:nth-child(2) {
						flex: 1;
						text-align: center;
					}

					view:nth-child(3) {
						flex: 1;
						justify-content: flex-end;
						text-align: right;
					}
				}

				.list_item_box {
					margin: 20rpx 0;

					.list_item_box_item {
						margin-bottom: 30rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						background-color: $spin-log-popup-item-bg;
						padding: 30rpx 0 30rpx 28rpx;
						border-radius: 18rpx;
						//box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

						.yhtx {
							position: relative;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							font-weight: bold;
							color: $spin-log-popup-item-fontColor;
							//width: 150rpx;
							flex: 1;
							image {
								width: 50rpx;
								height: 50rpx;
								border: 2px solid #353e52;
								border-radius: 100%;
							}

							span {
								display: inline-block;
								width: max-content;
								padding: 0 14rpx;
								position: absolute;
								bottom: -6rpx;
								left: 0;
								right: 0;
								margin: 0 auto;
								background-color: #ee1947;
								color: $spin-log-popup-item-fontColor;
								border-radius: 200rpx;
								text-align: center;
								font-size: 22rpx;
							}
						}

						.pan_type {
							font-weight: bold;
							color: $spin-log-popup-item-fontColor;
							text-align: center;
							flex: 1;
						}

						.shuliang {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							text-align: right;
							font-weight: bold;
							color: $spin-log-popup-item-fontColor;
							padding-right: 20rpx;
							image {
								width: 40rpx;
								height: 40rpx;
								margin-right: 12rpx;
							}
						}
					}
				}
			}
		}
	}

	.pan_biaoti {
		position: absolute;
		top: -2%;
		//left: 0%;
		//transform: translate(-50%, -50%);
		z-index: 9;

		.biaoti_tupian {
			position: relative;

			.pandengji {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 0;
				right: 0;
				height: 97rpx;
				top: -28px;

				image {
					width: 220rpx;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					margin: 0 auto;
					z-index: 2;
				}

				view {
					max-width: 66px;
					position: relative;
					z-index: 3;
					font-weight: bold;
					color: #ffffff;
					font-size: 26rpx;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			}

			.tgwhell_box {
				image {
					width: 500rpx;
				}
			}
		}

	}

	.JieGuoBg_DH {
		position: absolute;
		width: 100%;
		height: 650px;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 auto;

		image {
			width: 100%;
			height: 650px;
			vertical-align: bottom;
		}
	}

	.JieGuoBg_anniuzu {
		position: absolute;
		bottom: 120px;
		z-index: 9;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		left: 0;
		right: 0;

		.jieguo_btnzu {
			.zhuceBtn {
				color: #ffffff;

				.anniu {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 95px !important;
					height: 70rpx;
					border-radius: 8px;

					.u-icon {
						position: relative;
						top: 2rpx;
						margin-right: 5rpx;
					}
				}
			}

			.zhuceBtn:after {
				width: 95px !important;
				height: 70rpx;
				border-radius: 8px;
			}
		}
	}

	.JieGuoBg_title {
		position: absolute;
		width: 500rpx;
		height: 150px;
		top: 150px;
		z-index: 9;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		left: 0;
		right: 0;

		.jieguo_title {
			width: 500rpx;
			height: 130px;
			text-align: center;
			position: relative;

			.bt1 {
				width: 500rpx;
				position: relative;
				left: 0;
				right: 0;
				top: 0;
				z-index: 2;

				.btn1image {
					width: 500rpx;
					height: 127px;
				}
			}

			.bt2 {
				width: 500rpx;
				position: absolute;
				left: 0;
				right: 0;
				bottom: -30rpx;

				.wenan_wrap {
					width: 500rpx;
					position: relative;

					.wenan_bg {
						width: 500rpx;
						height: 77px;
					}

					.jieguo_wenan {
						display: flex;
						align-items: center;
						justify-content: center;
						position: absolute;
						left: 0;
						right: 0;
						margin: 0 auto;
						bottom: 20rpx;

						image {
							width: 38rpx;
							height: 38rpx;
							margin-right: 10rpx;
						}

						span {
							color: #ffffff;
							font-weight: bold;
							font-size: 38rpx;
						}
					}
				}
			}

			.btn3 {
				text-align: center;
				font-weight: bold;
				color: #ffffff;
				position: relative;
				top: 35px;
			}
		}
	}

	.demo {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0px 0 30px 0;
		z-index: 2;

		.demos {
			width: 100%;
			height: 100%;
			padding: 18px;
			border-radius: 100%;
			background: linear-gradient(0deg, #001a39, #0079e9);
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 2;
		}

		.zhizhen {
			position: absolute;
			top: 50%;
			right: 0%;
			transform: translate(-0%, -50%);
			z-index: 9;

			image {
				width: 60rpx;
			}
		}

		.bejing {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 636rpx;
			height: 636rpx;

			image {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				transform-origin: left top;
				pointer-events: none;
				animation: spinDb 30s linear infinite;
				vertical-align: middle;
			}
		}
	}

	.dizuo {
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: -44px;
		text-align: center;
		z-index: 1;

		image {
			width: 100%;
		}
	}

	.kaishixz {
		position: absolute;
		bottom: 30px;
		//bottom: 14.5%;
		//left: 50%;
		//transform: translate(-50%, -50%);
		z-index: 9;
		margin: 0 auto;
		width: 100%;
		text-align: center;
	}

	.zhuceBtn {
		position: relative;

		.anniu {
			width: 320rpx;
			margin: 0 auto;
			padding: 0 0;
			background-color: #3673D9;
			background: linear-gradient(1turn, #0c5eff .8%, #1398f9);
			box-shadow: 0 6px 38px #2283f666, inset 0 3px 3px #ffffff4d;
			border-radius: 8px;
			text-align: center;
			position: relative;
			z-index: 2;
			cursor: pointer;

			.wwewnzi {
				padding: 22rpx 0 14rpx 0;
				line-height: 32rpx;

				.ljyj {
					font-size: 14px;
					color: #fff;
					font-weight: 600;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.ssjf {
					font-size: 22rpx;
					color: #afd6ff;
				}
			}
		}
	}

	.zhuceBtn:after {
		width: 320rpx;
		margin: 0 auto;
		padding: 0 0;
		border-radius: 8px;
		height: 90rpx;
		background-color: #00244d;
		bottom: -4px;
		content: "";
		display: block;
		left: 0;
		right: 0;
		margin: 0 auto;
		pointer-events: none;
		position: absolute;
		right: 0;
		z-index: 1;
	}

	.hongseBtn {
		position: relative;
		font-size: 30rpx;
		margin-bottom: 30rpx;

		.anniu {
			width: 135px;
			margin: 0 auto;
			color: #fff;
			background: linear-gradient(3360deg, #db0a49 .8%, #fb2b57);
			box-shadow: 0 3px 20px #ff234199, inset 0 4px 4px #ffffff30;
			border-radius: 8px;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			//padding: 0 24rpx;
			position: relative;
			z-index: 2;
			cursor: pointer;
			font-weight: bold;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}

	.hongseBtn:after {
		width: 135px;
		margin: 0 auto;
		//padding: 0 24rpx;
		border-radius: 8px;
		height: 90rpx;
		background-color: #61001d;
		bottom: -3px;
		content: "";
		display: block;
		left: 0;
		right: 0;
		margin: 0 auto;
		pointer-events: none;
		position: absolute;
		right: 0;
		z-index: 1;
	}

	@keyframes spinDb {
		0% {
			transform: rotate(0) translate(-50%, -50%)
		}

		to {
			transform: rotate(-1turn) translate(-50%, -50%)
		}
	}

	/* #ifndef APP-IOS || APP-ANDROID */
	.heart {
		animation: heart 1.5s infinite;
	}

	@keyframes heart {
		0% {
			transform: scale(1);
		}

		25% {
			transform: scale(1.04);
		}

		to {
			transform: scale(1);
		}
	}

	/* #endif */
</style>