<template>
	<view :style="theme" :id="'luBarTabNav' + barId" class="lu-bar-tab-nav">
		
		<!-- <block v-if="barShowStyles"> -->
		<uv-sticky :z-index="98" :offsetTop="offsetTop" customNavHeight="0">
			<view class="tabs_box">
				<view>
					<new-tabs :list="tabList" name="text" :is-scroll="true" :current="selectedIndex" @change="tabschange" bg-color="#0d131c" inactive-color="#B1BAD3" :active-item-style="activeitemstyle" :bar-style="barStyle"></new-tabs>
				</view>
				<!-- 搜索拦PC -->
				<match-media :min-width="800">
					<view class="sousuo_lan_wrap">
						<view class="sousuo_lan">
							<u-search :placeholder="$t('NewlyAdded.Enter')" v-model="keyword" @search="StartSearch" height="78" shape="square" search-icon-color="#566488" placeholder-color="#566488" bg-color="transparent" border-color="transparent" :show-action="false"></u-search>
						</view>
						<view class="sousuo_Btn" @click="ClickSearch()">{{$t('NewlyAdded.Search')}}</view>
					</view>
				</match-media>
			</view>
		</uv-sticky>
			
		<!-- </block> -->
		
		<!-- <view id="luTabStatic" class="lu-bar-tab lu-bar-tab-static" :style="{height:barHeightStyles}">
			<view class="tabs_box">
				<new-tabs :list="tabList" name="text" :is-scroll="true" :current="selectedIndex" @change="tabschange" bg-color="transparent" inactive-color="#ccc" height="64" :active-item-style="activeitemstyle"></new-tabs>
			</view>
		</view> -->
		
		
		<view class="lu-tab-content"><slot></slot></view>
	</view>
</template>

<script>
	export default {
		name: 'lu-bar-tab-nav',
		props: {
			barFixed:{
				type:Boolean,
				default:true
			},
			iconShow:{
				type:Boolean,
				default:false
			},
			transitionShow:{
				type:Boolean,
				default:false
			},
			barHeight:{
				type:[String,Number],
				default: 70
			},
			barTop:{
				type:[String,Number],
				default:0
			},
			barId:{
				type:[String,Number],
				default:0
			},
			tabList: {
				type:Array,
				default:function () {
					return [{
						//text:"text",
						//navTarget:"#item1",
						// iconClass:"iconClass",
						// iconImage:"iconImage",
						// selectedIconClass:"selectedIconClass",
						//selectedIconImage:"selectedIconImage"
					}]
				}
			}
			
		},
		data() {
			return {
				offsetTop: '59',
				barShow:false,
				selectedIndex:0,
				current: 0,
				activeitemstyle: {
					
				},
				barStyle: {
					bottom: "-2px"
				},
				keyword: ''
			};
		},
		computed:{
			// tabStyles:function () {
			// 	return (!!this.color?'color:'+this.color+';':'')+(!!this.backgroundColor?'backgroundColor:'+this.backgroundColor+';':'');
			// },
			// tabActiveStyles:function () {
			// 	return (!!this.selectedColor?'color:'+this.selectedColor+';':'')+(!!this.selectedBackgroundColor?'backgroundColor:'+this.selectedBackgroundColor+';':'');
			// },
			// barTopStyles:function () {
			// 	// #ifndef H5
			// 		return 'calc('+this.barTop+'px);';
			// 	// #endif
			// 	// #ifdef H5
			// 		return 'calc('+this.barTop+'px + var(--window-top));';
			// 	// #endif
			// },
			// barHeightStyles:function () {
			// 	return this.barHeight?this.barHeight+'px':'54px';
			// },
			// barShowStyles:function () {
			// 	return !this.barShow?false:true;
			// },
		},
		methods: {
			tabschange(index) {
				this.selectedIndex = index;
				this._pageScroll(index);
			},
			_barInit:async function (index){
				let navTargetTop = [];
				let duration = 0;
				let viewScrollTop = 0;
				let viewHeight = 0;
				for (let i = 0,len=this.tabList.length; i < len; i++) {
					navTargetTop[i]= await this._queryMultipleNodes(this.tabList[i]["navTarget"]).then(res => {
						let navTarget = res[0],
							viewPort = res[1];
						viewHeight = viewPort.height;
						viewScrollTop = viewPort.scrollTop;
						const scrollTop = parseInt(navTarget.top) + viewPort.scrollTop - this.barTop - this.barHeight;
						return scrollTop;
					});
				}
				if (!!this.transitionShow) {
					duration = 200;
				} 
				return {
					navTargetTop:navTargetTop,
					duration:duration,
					viewHeight:viewHeight,
					viewScrollTop:viewScrollTop
				};
			},
			_pageScroll:async function(i){
				const elment = await this._barInit(i);
				let scrollTop = elment["navTargetTop"][i];
				let duration = elment["duration"];
				let viewHeight = elment["viewHeight"];
				let viewScrollTop = elment["viewScrollTop"];
				if (Math.abs(scrollTop-viewScrollTop)>viewHeight) {
					if (scrollTop>viewScrollTop) {
						await uni.pageScrollTo({
							scrollTop:(scrollTop-viewHeight),
							duration:0
						});
					}else{
						await uni.pageScrollTo({
							scrollTop:(scrollTop+viewHeight),
							duration:0
						});
					}
				}
				await uni.pageScrollTo({
					scrollTop:(scrollTop+1),
					duration:duration
				});
				// #ifndef H5
				const view = await this._queryMultipleNodes();
				viewScrollTop = view[0].scrollTop;
				if (scrollTop>viewScrollTop&&duration!==0) {
					uni.pageScrollTo({
						scrollTop:(scrollTop+1),
						duration: 0
					})
				}
				// #endif
			},
			_scrollToTarget:function(i) {
				this._pageScroll(i);
			},
			_queryMultipleNodes:function (e,notThis) {
				return new Promise((resolve, reject) => {
					let view = uni.createSelectorQuery();
					if (!!notThis) {
						view.in(this);
					}
					if (!!e) {
						view.select(e).boundingClientRect();
					}
					view.selectViewport().fields({size: true,scrollOffset: true});
					view.exec(function(res) {
						resolve(res);
					});
					
				});
			},
			_showBarFixed:function () {
				// this._queryMultipleNodes("#luTabStatic",true).then(res => {
				// 	let tabNav = res[0];
				// 	if (tabNav.top<=this.barTop) {
				// 		this.barShow=true;
				// 	}else{
				// 		this.barShow=false;
				// 	}
				// });
			},
			_selectedTab:function (y) {
				this._barInit().then((res)=>{
					let itemIndex = 0;
					for (let i = 0,len=res["navTargetTop"].length; i < len; i++) {
						if (y >= res["navTargetTop"][i]) {
							itemIndex = i;
						}
					}
					//console.log('lll',itemIndex)
					this.selectedIndex = itemIndex;
				});
				if (!!this.barFixed) {
					this._showBarFixed();
				}
			},
			StartSearch(e){
				console.log('输入的key',e);
				uni.navigateTo({
					url: '/pages/searchFor/searchFor?source=1' + '&key=' + e
				})
			},
			ClickSearch(){
				let e = this.keyword
				uni.navigateTo({
					url: '/pages/searchFor/searchFor?source=1' + '&key=' + e
				})
			},
		}
	};
</script>

<style lang="scss" >
	lu-bar-tab-nav{
		position:relative;
		width: 100%;
	}
	.tabs_box {
		width: 100%;
		margin: 0 auto 0;
		padding: 5px 15px 0px 10px;
	}
	.lu-bar-tab-nav{
		position:relative;
		width: 100%;
		background-color: $body-bg-color;
		.lu-bar-tab{
			width: 97%;
			margin: 0 auto;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-around;
			align-items:center;
			background-color: $body-bg-color;
			height: 68px;
			.lu-tab-item{
				//默认状态
				position: relative;
				flex: 1 1 auto;
				text-align: center;
				color: #969696;
				height: 100%;
				font-size: 14px;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				align-items:center;
				.dibian {
					position: absolute;
					width: 90%;
					height: 2px;
					background-color: #1398f9;
					bottom: 0;
				}
				&::before{
					// position: absolute;
					// top: calc(50% - 15px);
					// left: 0px;
					// content: " ";
					// width: 1px;
					// height: 30px;
					// background-color: #eee;
				}
				&:first-child::before{
					display: none;
				}
				.lu-tab-icon{
					font-size: inherit;
					color: inherit;
				}
				.lu-tab-text{
					font-size: inherit;
					color: inherit;
				}
				// 显示图标
				&.lu-icon-show{
					.lu-tab-icon{
						height: 24px;
						width: 24px;
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}
					.lu-tab-text{
						font-size: 12px;
						line-height: 16px;
					}
				}
				// 选中状态
				&.lu-active{
					color: #1398f9;
					font-weight: bold;
					.lu-tab-icon{
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}
				}
			}
			
		}
		.lu-bar-tab-fixed{
			position:fixed;
			z-index: 1;
			top:calc(0px + var(--window-top));
			left: 0;
			right: 0;
			margin: 0 auto;
		}
		.lu-bar-tab-static{
			position:static;
			z-index: 0;
		}
	}
	@media (min-width: 800px) {
		.tabs_box {
			width: 100%;
			margin: 0 auto 0;
			padding: 5px 15px 0px 10px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
