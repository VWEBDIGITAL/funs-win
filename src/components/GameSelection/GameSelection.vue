	<template>
		<!-- Qiaozhi Component -->
		<match-media :min-width="800">
			<view class="game-selection">
				<view class="container">
					<uni-row class="row justify-content-center pt-10 pb-15">
						<view class="wrapper">
							<h1 class="title">{{ $t('Qiaozhi.Games-Selection-Title') }}<span
									class="title-slug">{{ $t('Qiaozhi.Game') }}</span>?</h1>
							<view class="animated-mocks">
								<image v-for="(mock, index) in [
									'/static/image/game-selection-helper/animated-mocks/Chip.png',
									'/static/image/game-selection-helper/animated-mocks/Cards.png',
									'/static/image/game-selection-helper/animated-mocks/Cube.png',
									'/static/image/game-selection-helper/animated-mocks/Monster.png',
									'/static/image/game-selection-helper/animated-mocks/Cherries.png',
									'/static/image/game-selection-helper/animated-mocks/Bomb.png',
									'/static/image/game-selection-helper/animated-mocks/Ball.png'
								]" :key="index" :src="mock" :class="`mockup item-${index + 1}`" mode="widthFix">
								</image>
							</view>
							<view class="reel">
								<view class="slot item-1">
									<uni-col :xs="24" :sm="7" :md="7" :lg="7">
										<view class="col">
											<image class="item" :src="'/static/image/game-selection-helper/Stairs.png'"
												mode="widthFix"></image>
										</view>
									</uni-col>
									<uni-col :xs="24" :sm="7" :md="7" :lg="7">
										<view class="col">
											<image class="item"
												:src="'/static/image/game-selection-helper/Instant-Roulette.png'"
												mode="widthFix"></image>
										</view>
									</uni-col>
									<uni-col :xs="24" :sm="7" :md="7" :lg="7">
										<view class="col">
											<image class="item"
												:src="'/static/image/game-selection-helper/Speed-Baccarat.png'"
												mode="widthFix"></image>
										</view>
									</uni-col>
								</view>
								<view class="slot item-2">
									<uni-col :xs="24" :sm="7" :md="7" :lg="7">
										<view class="col">
											<image class="item" :src="'/static/image/game-selection-helper/Stairs.png'"
												mode="widthFix"></image>
										</view>
									</uni-col>
									<uni-col :xs="24" :sm="7" :md="7" :lg="7">
										<view class="col">
											<image class="item"
												:src="'/static/image/game-selection-helper/Instant-Roulette.png'"
												mode="widthFix"></image>
										</view>
									</uni-col>
									<uni-col :xs="24" :sm="7" :md="7" :lg="7">
										<view class="col">
											<image class="item"
												:src="'/static/image/game-selection-helper/Speed-Baccarat.png'"
												mode="widthFix"></image>
										</view>
									</uni-col>
								</view>
								<view class="slot item-3">
									<uni-col :xs="24" :sm="7" :md="7" :lg="7">
										<view class="col">
											<image class="item" :src="'/static/image/game-selection-helper/Stairs.png'"
												mode="widthFix"></image>
										</view>
									</uni-col>
									<uni-col :xs="24" :sm="7" :md="7" :lg="7">
										<view class="col">
											<image class="item"
												:src="'/static/image/game-selection-helper/Instant-Roulette.png'"
												mode="widthFix"></image>
										</view>
									</uni-col>
									<uni-col :xs="24" :sm="7" :md="7" :lg="7">
										<view class="col">
											<image class="item"
												:src="'/static/image/game-selection-helper/Speed-Baccarat.png'"
												mode="widthFix"></image>
										</view>
									</uni-col>
								</view>
							</view>
						</view>
					</uni-row>
				</view>
			</view>
		</match-media>
		<!-- Qiaozhi Component -->
	</template>