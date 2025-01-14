<template>
	<view :style="theme" class="tf-Box-Bg" v-if="ShowVerify">
		<view class="tf-Box">
			<view class="reg_title" @click.stop="close_">
				<view>{{$t('aqyz')}}</view>
				<u-icon name="close" color="#fff"></u-icon>
			</view>
			<canvas :style="{ width: canvasW + 'px', height: canvasH + 'px', borderRadius: '8px' }" class="tf-Box-center" canvas-id="tf-verify-canvas" id="tf-verify-canvas"></canvas>
			<movable-area class="tf-Box-BtnBox">
				<view class="tf-Box-BtnBox-text">{{$t('hdhkpintu')}}</view>
				<movable-view class="tf-Box-BtnNei" direction="all" :x="canvasX2" @change="changePath" @touchend="endTouch" @mouseup="endTouch">
					<view class="tf-Box-BtnNei-leftBox" :style="{backgroundColor:verifyImgs[verifyIndex].color}"></view>
				</movable-view>
			</movable-area>
			
			<view class="topbian"></view>
			<view class="slider-btn-group">
				<view class="slider-btn slide-btn-refresh" @click.stop="refreshVerify">
					{{$t('shuaxin')}}<u-icon name="reload" color="#fb2b57"></u-icon>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"tf-verify-img",
		props:{
			ShowVerify: {
				type: Boolean,
				default: false
			},
			verifyImgs:{
				type:Array,
				default: function(){
					return []
				}
			}
		},
		data() {
			return {
				verifyIndex:0,
				canvasW:"",
				canvasH:"",
				canvasX2:0,//归为用的
				canvasX:0,//实时移动X
				ctx:false,
				jgX:0,//结果X
				dqImgPath:'',//本地临时图片路径
			};
		},
		created() {
			
		},
		mounted() {
			
		},
		methods:{
			openShowVerify(){
				this.ShowVerify = true
				
				this.canvasW = uni.upx2px(610);
				this.canvasH = uni.upx2px(330);
				console.log("created");
				
				this.$nextTick(()=>{
					this.init()
				});
			},
			GuanBIshow(){
				this.ShowVerify = false
			},
			refreshVerify(){
				this.$nextTick(()=>{
					this.init()
				})
			},
			// 生成从minNum到maxNum的随机数
			randomNum(minNum,maxNum){ 
			    switch(arguments.length){ 
			        case 1: 
			            return parseInt(Math.random()*minNum+1,10); 
			        break; 
			        case 2: 
			            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
			        break; 
			            default: 
			                return 0; 
			            break; 
			    } 
			},
			close_(){
				this.$emit('close');
			},
			init(){
				if(this.verifyImgs.length==0){
					uni.showToast({
						title: 'verifyImgs不能为空',
						icon:"none"
					});
					return;
				}
				console.log("init");
				this.canvasX2--;
				this.canvasX = 0;
				this.verifyIndex = this.randomNum(0,this.verifyImgs.length-1);
				this.ctx = uni.createCanvasContext('tf-verify-canvas',this);
				console.log(this.ctx);
				this.jgX = this.randomNum(uni.upx2px(150),uni.upx2px(450));
				this.dqImgPath = this.verifyImgs[this.verifyIndex].src;
				this.huatu();
			},
			endTouch(){
				if(Math.abs(this.canvasX-this.jgX)<=5){
					this.$emit('succeed')
				}else{
					// uni.showToast({
					// 	title: '验证失败',
					// 	icon:"error"
					// });
					this.init();
				}
			},
			huatu(){
				let this_ = this;
				let r = uni.upx2px(10);
				let XX = this.canvasX;
				let YY = uni.upx2px(100);
				let cs = uni.upx2px(20);
				this_.ctx.drawImage(this_.dqImgPath,0,0,this_.canvasW,this_.canvasH);
				
				//画不可移动的拼图块
				this_.ctx.beginPath();
				this_.ctx.moveTo(-2*r+this_.jgX+cs+2*r, YY-2*r+2*r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+5.5*r, YY-2*r+2*r);
				this_.ctx.arcTo(-2*r+this_.jgX+cs+5.5*r, YY-2*r+3*r, XX-2+this_.jgX*r+cs+6.5*r, YY-2*r+3*r, r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+7.5*r, YY-2*r+3*r);
				this_.ctx.arcTo(-2*r+this_.jgX+cs+8.5*r, YY-2*r+3*r, -2*r+this_.jgX+cs+8.5*r, YY-2*r+2*r, r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+12*r, YY-2*r+2*r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+12*r, YY-2*r+11*r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+8.5*r, YY-2*r+11*r);
				this_.ctx.arcTo(-2*r+this_.jgX+cs+8.5*r, YY-2*r+12*r, -2*r+this_.jgX+cs+7.5*r, YY-2*r+12*r, r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+6.5*r, YY-2*r+12*r);
				this_.ctx.arcTo(-2*r+this_.jgX+cs+5.5*r, YY-2*r+12*r, -2*r+this_.jgX+cs+5.5*r, YY-2*r+11*r, r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+2*r, YY-2*r+11*r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+2*r, YY-2*r+8*r);
				this_.ctx.arcTo(-2*r+this_.jgX+cs+3*r, YY-2*r+8*r, -2*r+this_.jgX+cs+3*r, YY-2*r+7*r, r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+3*r, YY-2*r+6*r);
				this_.ctx.arcTo(-2*r+this_.jgX+cs+3*r, YY-2*r+5*r, -2*r+this_.jgX+cs+2*r, YY-2*r+5*r, r);
				this_.ctx.lineTo(-2*r+this_.jgX+cs+2*r, YY-2*r+2*r);
				this_.ctx.shadowBlur=19;
				this_.ctx.shadowColor="#ffffff";
				this_.ctx.fillStyle = "rgba(0,0,0,0.5)";
				this_.ctx.fill();
				this_.ctx.restore(); 
				//画可移动的拼图块
				this_.ctx.beginPath();
				this_.ctx.save();
				this_.ctx.moveTo(XX-2*r+cs+2*r, YY-2*r+2*r);
				this_.ctx.lineTo(XX-2*r+cs+5.5*r, YY-2*r+2*r);
				this_.ctx.arcTo(XX-2*r+cs+5.5*r, YY-2*r+3*r, XX-2*r+cs+6.5*r, YY-2*r+3*r, r);
				this_.ctx.lineTo(XX-2*r+cs+7.5*r, YY-2*r+3*r);
				this_.ctx.arcTo(XX-2*r+cs+8.5*r, YY-2*r+3*r, XX-2*r+cs+8.5*r, YY-2*r+2*r, r);
				this_.ctx.lineTo(XX-2*r+cs+12*r, YY-2*r+2*r);
				this_.ctx.lineTo(XX-2*r+cs+12*r, YY-2*r+11*r);
				this_.ctx.lineTo(XX-2*r+cs+8.5*r, YY-2*r+11*r);
				this_.ctx.arcTo(XX-2*r+cs+8.5*r, YY-2*r+12*r, XX-2*r+cs+7.5*r, YY-2*r+12*r, r);
				this_.ctx.lineTo(XX-2*r+cs+6.5*r, YY-2*r+12*r);
				this_.ctx.arcTo(XX-2*r+cs+5.5*r, YY-2*r+12*r, XX-2*r+cs+5.5*r, YY-2*r+11*r, r);
				this_.ctx.lineTo(XX-2*r+cs+2*r, YY-2*r+11*r);
				this_.ctx.lineTo(XX-2*r+cs+2*r, YY-2*r+8*r);
				this_.ctx.arcTo(XX-2*r+cs+3*r, YY-2*r+8*r, XX-2*r+cs+3*r, YY-2*r+7*r, r);
				this_.ctx.lineTo(XX-2*r+cs+3*r, YY-2*r+6*r);
				this_.ctx.arcTo(XX-2*r+cs+3*r, YY-2*r+5*r, XX-2*r+cs+2*r, YY-2*r+5*r, r);
				this_.ctx.lineTo(XX-2*r+cs+2*r, YY-2*r+2*r);
				this_.ctx.shadowBlur=19;
				this_.ctx.shadowColor="#ffffff";
				this_.ctx.fill();
				this_.ctx.clip();
				this_.ctx.drawImage(this_.dqImgPath,this_.canvasX-this_.jgX,0,this_.canvasW,this_.canvasH);
				this_.ctx.restore(); 
				//绘图
				this_.ctx.draw();
			},
			changePath(e){
				// #ifdef APP-NVUE
				this.canvasX = e.detail.x;
				// #endif
				// #ifndef APP-NVUE
				this.canvasX = e.target.x;
				// #endif
				this.huatu();
			}
		}
	}
</script>

<style lang="scss">
	/deep/ uni-canvas canvas {
		border-radius: 20rpx;
	}
	.tf-Box-Bg{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 999999999;
		background-color: rgba(0,0,0,.3);
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(2px); /* 背景模糊 */
		-webkit-backdrop-filter: blur(2px); /* 兼容老版本 Safari */
		.tf-Box{
			width: 700rpx;
			height: 248px;
			background-color: $pupUp-bg-color;
			border-radius: 30rpx;
			
			.reg_title {
				padding: 30rpx 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 20rpx 20rpx 0 0;
				view {
					font-size: 30rpx;
					color: $all-secondary-text-color;
					//font-weight: bold;
				}
			}
			
			.tf-Box-center{
				margin: 30rpx auto;
				align-self: center;
				/deep/ canvas {
					border-radius: 20rpx;
				}
				/deep/ uni-canvas canvas {
					border-radius: 20rpx;
				}
			}
			.tf-Box-BtnBox{
				margin: 30rpx auto;
				align-self: center;
				width: 630rpx;
				height: 75rpx;
				line-height: 75rpx;
				text-align: center;
				font-size: 28rpx;
				border-radius: 6rpx;
				
				// border: 1px solid #E1E3E9;
				// background-color: #F7F8F9;
				
				background-color: #242e3d;
				//border: 1px solid #2a3546;
				
				overflow: hidden;
				position: relative;
				.tf-Box-BtnBox-text{
					width: 100%;
					height: 75rpx;
					position: absolute;
					top: 0;
					left: 0;
					color: $font-all-color;
					text-align: center;
				}
				.tf-Box-BtnNei{
					height: 75rpx;
					width: 75rpx;
					background-color: #2283f6;
					box-shadow: 0 0 10rpx 0rpx rgba(0,0,0,.2);
					background-image: url('img/tf-arrows.png');
					background-size: 34rpx;
					background-position: center;
					background-repeat: no-repeat;
					.tf-Box-BtnNei-leftBox{
						position: absolute;
						top: 0;
						left: -700rpx;
						width: 700rpx;
						height: 100%;
						//background-image: linear-gradient(to right, #548dff, #0c5eff) !important;
					}
				}
			}
		}
	}
	.topbian {
		    background: -webkit-linear-gradient(left, #43536d1a 5%, #43536d 50%, #43536d00);
		    background: linear-gradient(90deg, #43536d1a 5%, #43536d 50%, #43536d00);
		    display: block;
		    height: 1px;
		    width: 100%;
	}
	.slider-btn-group {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $pupUp-bg-color;
		border-radius: 0 0 30rpx 30rpx;
	
		.slider-btn {
			flex: 1;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
	
			&:active {
				opacity: 0.8;
			}
		}
	
		.slide-btn-refresh {
			color: #fb2b57;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			.u-icon {
				font-size: 38rpx;
				font-weight: bold;
				margin-left: 6rpx;
			}
		}
	}
</style>
