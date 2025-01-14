<template>
	<view :style="theme" class="" v-if="show">
		<view v-if="show" class="remark" @click="cancel"></view>
		<view class="dialog" :class="{show: show}">
			<view class="title">Select Date</view>
			<picker-view
				class="picker-view"
				immediate-change
				indicator-class="select-line"
				:indicator-style="`height: 42px`"
				mask-style="background: transparent"
				:value="pickeVal"
				@change="bindChangeDate"
			>
				<picker-view-column class="column-left">
					<view
						:key="index"
						v-for="(item,index) in years"
						class="item flex_center"
						:class="index == pickeVal[0] ? 'picker-select' : ''"
					>
						{{ item }}
					</view>
				</picker-view-column>
				<picker-view-column v-if="showLabel" class="column-center">
					<view class="item flex_center color_3 fs_14">年</view>
				</picker-view-column>
			
				<picker-view-column class="column-center">
					<view
						:key="index"
						v-for="(item,index) in months"
						class="item flex_center"
						:class="index == pickeVal[showLabel ? 2 : 1] ? 'picker-select' : ''"
					>
						{{ item }}
					</view>
				</picker-view-column>
				<picker-view-column v-if="showLabel" class="column-center">
					<view class="item flex_center color_3 fs_14">月</view>
				</picker-view-column>
			
				<picker-view-column class="column-center" :class="{'column-right': !showLabel}">
					<view
						:key="index"
						v-for="(item,index) in days"
						class="item flex_center"
						:class="index == pickeVal[showLabel ? 4 : 2] ? 'picker-select' : ''"
					>
						{{ item }}
					</view>
				</picker-view-column>
				<picker-view-column v-if="showLabel" class="column-right">
					<view class="item flex_center color_3 fs_14">日</view>
				</picker-view-column>
			</picker-view>
		
			<view class="button-group">
				<view class="item cancel" @click="cancel">{{$t('NewlyAdded.Cancel')}}</view>
				<view class="item confirm" @click="confirm">{{$t('popupbtn')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'DatePicker',
	props: {
		show: {
			type: Boolean,
			default: false
		},
		value: { // 默认日期
			type: String,
			default: '2006-01-01'
		}
	},
	data() {
		return {
			indicatorStyle: 'height: 100rpx;',
			years: [],
			months: [],
			days: [],
			pickeVal: [],
			
			yearStart: 1950,
			yearEnd: 2006,
			nowStatus: 'past', // 日期显示范围 past 过去 future 未来
			showLabel: false, // 显示年月日
			
		}
	},
	watch: {
		value() {
			this.init()
		}
	},
	created() {
		this.init()
	},
	methods: {
		confirm() {
			this.$emit('confirm', this._timeValue)
		},
		cancel() {
			this.$emit('cancel')
		},
		init() {
			let _default_date = this.value // || this.currentDate() //默认选中日期
			let date = new Date()
			let _year = date.getFullYear()
			if (_default_date && _default_date.length > 0) {
				date = new Date(_default_date.replace(/^\s+|\s+$/g, ''))
			}
			
			// 获取对应范围值
			const year = date.getFullYear()
			const month = date.getMonth() + 1
			const day = date.getDate()
			////console.log('1',date)

			const years = []
			// 年份范围
			let yearIndexStart = this.yearStart
			let yearIndexEnd = this.yearEnd
			////console.log('2',yearIndexStart,yearIndexEnd)
			
			this.formate(year, month)
			////console.log('3',year,month,day)
			
			// 年份数组
			for (let i = yearIndexStart; i <= yearIndexEnd; i++) {
				years.push(i)
			}
			this.years = years
			// 定义默认选中初始值下标
			let index1 = 0
			let index2 = 0
			let index3 = 0
			
			// 赋值默认选中日期
			if (_default_date) {
				const _date = new Date(_default_date.replace(/^\s+|\s+$/g, ''))
				index1 = this.years.findIndex(item=> item == _date.getFullYear())
				index1 = index1 >= 0 ? index1 : 0
				index2 = this.months.findIndex(item=> item == _date.getMonth() + 1)
				index2 = index2 >= 0 ? index2 : 0
				index3 = this.days.findIndex(item=> item == _date.getDate())
				index3 = index3 >= 0 ? index3 : 0
			} else {
				if (this.nowStatus == 'past') {
					index1 = this.years.length - 1
					index2 = this.months.length - 1
					index3 = this.days.length - 1
				}
			}

			const time = year + '-' + this.padStart(month) + '-' + this.padStart(day)
			this._timeValue = time
			this.$emit('change', time)

			this.$nextTick(()=> {
				if(this.showLabel) {
					this.pickeVal = [index1, 0, index2, 0, index3, 0]
				}else {
					this.pickeVal = [index1, index2, index3]
				}
			})
		},
		// 监听选择事件
		bindChangeDate(e) {
			const { value } = e.detail
			const year = parseInt(this.years[value[0]])
			const month = parseInt(this.months[value[this.showLabel ? 2 : 1]])
			let day = parseInt(this.days[value[this.showLabel ? 4 : 2]])
			
			// 选中月份的总天数
			const currentMonthDays = new Date(year, month, 0).getDate()
			// 判断日期没有31号的情况
			if(day > currentMonthDays) {
				day = currentMonthDays
				value[this.showLabel ? 4 : 2] = day - 1
			}
			this.pickeVal = value
			this.formate(year, month, true)
		},
		
		// 动态计算 年月日
		formate(year, month, status = false) {
			// 排除今天日期
			let date = new Date(this.getAppointDate(this.currentDate(), 1))
			let totalMonth = 12
			let totalDay = new Date(parseInt(year), parseInt(month), 0).getDate()

			let initMonth = 1
			let initDay = 1

			if (this.nowStatus == 'past') {
				// 计算结束临界值
				if (year == date.getFullYear()) {
					totalMonth = date.getMonth() + 1
					if (month == date.getMonth() + 1) {
						totalDay = date.getDate()
					}
				}
			}
			// 重新赋值 年月日
			let monthArr = []
			let dayArr = []

			for (let i = initMonth; i <= totalMonth; i++) {
				monthArr.push(this.padStart(i))
			}
			this.months = monthArr

			for (let i = initDay; i <= totalDay; i++) {
				dayArr.push(this.padStart(i))
			}
			this.days = dayArr

			if (status) {
				const year = parseInt(this.years[this.pickeVal[0]])
				const month = parseInt(this.months[this.pickeVal[this.showLabel ? 2 : 1]])
				const day = parseInt(this.days[this.pickeVal[this.showLabel ? 4 : 2]])
				const time = `${year}-${this.padStart(month)}-${this.padStart(day)}`
				this._timeValue = time
				this.$emit('change', time)
			}
		},
		
		// 一位数补0
		padStart(val) {
			return val.toString().padStart(2, 0)
		},
		
		/**
		 * 获取当前时间
		 * @param format 时间格式
		 * @returns 返回当前时间
		 */
		currentDate(format = 'yyyy-mm-dd') {
			const date = new Date()
			const year = date.getFullYear()
			const month = this.padStart(date.getMonth() + 1)
			const day = this.padStart(date.getDate())
			if (format === 'yyyy-mm-dd') {
				return `${year}-${month}-${day}`
			}
			if (format === 'yyyy/mm/dd') {
				return `${year}/${month}/${day}`
			}
			return `${year}年${month}月${day}日`
		},
		
		/**
		 * 获取指定日期
		 * @param {String} targetDate 开始日期
		 * @param {number} day 几天，正数为往后的日期，负数为往前的日期
		 * @returns {number} 返回 day 后的日期
		 * */
		getAppointDate(targetDate, day) {
			const datetmp = new Date(targetDate.replace(/-/g, '/')).getTime()
			let result = new Date(datetmp + 24 * 60 * 60 * 1000 * day)
			return `${result.getFullYear()}-${this.padStart(result.getMonth() + 1)}-${this.padStart(result.getDate())}`
		},
	}

}
</script>

<style lang="scss" scoped>
	.remark {
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9;
		opacity: 0;
		animation: opacity 0.3s ease forwards;
		z-index: 999;
	}
	.dialog {
		max-width: 668px;
		margin: 0 auto;
		
		padding: 0 30rpx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: $pupUp-bg-color;
		padding-bottom: calc(40rpx + constant(safe-area-inset-bottom)) !important;
		padding-bottom: calc(40rpx + env(safe-area-inset-bottom)) !important;
		border-radius: 24rpx 24rpx 0 0;
		z-index: 1000;
		transform: translateY(1000px);
		transition: transform 0.35s ease-out;
		&.show {
			transform: translateY(0);
			transition: transform 0.35s ease-in;
		}
		.title {
			text-align: center;
			//font-weight: bold;
			padding: 40rpx 0;
			box-sizing: border-box;
			color: #fefefe;
		}
	}
	/deep/.select-line::before,
	/deep/.select-line::after {
		border: none;
	}
	/deep/.column-left,
	/deep/.column-center,
	/deep/.column-right {
		.select-line {
			background: $all-secondary-color;
			z-index: -1;
		}
	}
	/deep/.column-left .select-line {
		border-radius: 42rpx 0 0 42rpx;
	}
	/deep/.column-right .select-line {
		border-radius: 0 42rpx 42rpx 0;
	}
	.picker-view {
		height: 420rpx;
		width: 100%;
		.fs_14 {
			font-size: 28rpx;
		}
		.flex_center {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.item {
			height: 42px;
			line-height: 42px;
			font-size: 32rpx;
			color: $font-all-color;
			transition: all 0.2s ease;
			&.picker-select {
				color: #3673D9;
				font-size: 40rpx;
				transition: all 0.2s ease;
			}
		}
	}
	.button-group {
		display: flex;
		justify-content: space-around;
		margin-top: 30rpx;
		.item {
			width: 280rpx;
			height: 84rpx;
			text-align: center;
			line-height: 84rpx;
			border-radius: 42rpx;
			//font-weight: bold;
			&.cancel {
				background: linear-gradient(3360deg,#db0a49 .8%,#fb2b57);
				box-shadow: 0 3px 20px #ff234199,inset 0 4px 4px #ffffff30;
				color: #fefefe;
			}
			&.confirm {
				background: linear-gradient(1turn,#0c5eff .8%,#1398f9);
				box-shadow: 0 3px 28px #2283f666,inset 0 3px 3px #ffffff4d;
				color: #fff;
			}
		}
	}

	.color_3 {
		color: #333 !important;
	}
	
	@keyframes opacity {
		0% {
			opacity: 0;
		}
	
		100% {
			opacity: 1;
		}
	}

</style>