<template>
  <view class="swiper-container7 mySwiper">
    <view class="swiper-wrapper">
      <view v-for="(item, index) in slides" :key="index" class="swiper-slide">
        <view class="slide-content">
          <image class="item" :src="item.image" mode="widthFix"></image>
        </view>
      </view>
    </view>
    <view v-if="navigation" class="swiper-button-next"></view>
    <view v-if="navigation" class="swiper-button-prev"></view>
    <view v-if="pagination" class="swiper-pagination"></view>
  </view>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  data() {
    return {
      slides: [
        { image: '/static/image/hero-slider/Slide.png' },
        { image: '/static/image/hero-slider/Slide.png' },
        { image: '/static/image/hero-slider/Slide.png' },
        { image: '/static/image/hero-slider/Slide.png' },
        { image: '/static/image/hero-slider/Slide.png' },
        { image: '/static/image/hero-slider/Slide.png' },
		{ image: '/static/image/hero-slider/Slide.png' },
		{ image: '/static/image/hero-slider/Slide.png' },
		{ image: '/static/image/hero-slider/Slide.png' },
      ],
      navigation: true,
      pagination: true,
      autoplay: true,
      swiperInstance: null, // Store swiper instance for later access
    };
  },
  mounted() {
    this.initializeSwiper(); // Initialize swiper on mount
  },
  destroyed() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(); // Clean up swiper instance on component destroy
    }
  },
  methods: {
    // Initialize or reinitialize Swiper
    initializeSwiper() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy(); // Destroy the previous swiper instance if it exists
      }

      this.swiperInstance = new Swiper('.swiper-container7', {
        loop: false,
		rewind: false,
    autoplay: true,
        slidesPerGroup: 3,
        slidesPerView: 1,
		speed: 1220,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        },
      });

      this.swiperInstance.update(); // Force swiper to update the layout and slides
    },
    
    // Update swiper on resize
    updateSwiper() {
      if (this.swiperInstance) {
        this.swiperInstance.update(); // Force swiper to recheck its layout
      }
    },
  },
};
</script>

<style scoped>
.swiper-container3 {
  width: 100%;
  overflow: hidden;
  display: block;
}
.swiper-wrapper {
  display: flex;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #0d131c;
  border-radius: 8px;
}
.slide-content {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
}
.item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.swiper-button-next,
.swiper-button-prev {
  color: #000;
}
</style>