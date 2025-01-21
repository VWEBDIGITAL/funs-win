<template>
  <view id="PromotionSwiper" class="PromotionSwiper swiper-container-promotion">
    <view class="swiper-wrapper">
      <view v-for="(item, index) in slides" :key="index" :autoplay="autoplay" class="swiper-slide">
        <view class="slide-content">
          <image class="item" :src="item.image" mode="widthFix"></image>
        </view>
      </view>
    </view>
    <view v-if="showNavigation" class="swiper-navigation-wrapper">
      <view v-if="navigation" class="swiper-button-prev"></view>
      <view v-if="pagination" class="swiper-pagination"></view>
      <view v-if="navigation" class="swiper-button-next"></view>
    </view>
  </view>
</template>

<script>
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export default {
  data() {
    return {
      slides: [
        { image: '/static/image/hero-slider/Slide1.png' },
        { image: '/static/image/hero-slider/Slide2.png' },
        { image: '/static/image/hero-slider/Slide3.png' },
        { image: '/static/image/hero-slider/Slide4.png' },
        { image: '/static/image/hero-slider/Slide1.png' },
        { image: '/static/image/hero-slider/Slide2.png' },
        { image: '/static/image/hero-slider/Slide3.png' },
        { image: '/static/image/hero-slider/Slide4.png' },
        { image: '/static/image/hero-slider/Slide1.png' },
        { image: '/static/image/hero-slider/Slide2.png' },
        { image: '/static/image/hero-slider/Slide3.png' },
        { image: '/static/image/hero-slider/Slide4.png' },
      ],
      navigation: true,
      pagination: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      swiperInstance: null,
      showNavigation: true,
    };
  },
  mounted() {
    this.detectDevice();
    this.initializeSwiper();
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy();
    }
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    // Detect Mobile
    isMobile() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isUserAgentMobile = /Android|webOS|iPhone|iPod|iPad|Tablet|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent.toLowerCase()
      );
      const isScreenMobile = window.innerWidth <= 768;
      return isUserAgentMobile || isScreenMobile;
    },
    // Update Navigation & Pagination
    detectDevice() {
      const isMobileDevice = this.isMobile();
      this.navigation = !isMobileDevice;
      this.pagination = !isMobileDevice;
      this.showNavigation = !isMobileDevice;
    },
    // Window Resize Update
    onResize() {
      this.detectDevice();
      if (this.swiperInstance) {
        this.swiperInstance.update();
      }
    },
    // Initialize Swiper
    initializeSwiper() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy();
      }
      this.swiperInstance = new Swiper('.swiper-container-promotion', {
        loop: false,
        rewind: true,
        autoplay: this.autoplay,
        slidesPerGroup: 3,
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        navigation: this.navigation
          ? {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              disabledClass: 'swiper-nav-disabled',
            }
          : false,
        pagination: this.pagination
          ? {
              el: '.swiper-pagination',
              clickable: true,
            }
          : false,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
      this.swiperInstance.update();
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-container-promotion {
  display: block;
  width: 100%;
  overflow: visible;
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
  border-radius: 13px;
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
  border-radius: 13px;
}
</style>