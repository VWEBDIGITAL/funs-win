<!--Qiaozhi Component-->
<template>
    <match-media :max-width="800">
      <view class="about">
        <view class="container p-0">
          <uni-row class="row">
            <!-- About Section -->
            <uni-col :xs="24" :sm="24" :md="12" :lg="12" class="about-section pe-0">
              <h4 class="title">{{ aboutTitle }}</h4>
              <p v-for="(paragraph, index) in truncatedParagraphs" :key="index">
                <span v-html="paragraph"></span>
              </p>
              <view class="item-button me-3">
                <button class="button btn-mn btn-primary btn-sm" @click="toggleShowMore">{{ showFullText ? showLessButtonText : showMoreButtonText }}</button>
              </view> 
            </uni-col>
          </uni-row>
        </view>
      </view>
    </match-media>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // About Text
        aboutTitle: "Social Casino Games Online - Play Best Games at Stake.us Social Casino",
        aboutParagraphs: [
          `Stake.us offers the best online social casino gaming experience on the web. Starting with
          original first-party casino games developed
          by Stake, the online social casino has grown
          to hundreds of casino games from the in the iGaming industry.`,
        ],
        showMoreButtonText: "See More",
        showLessButtonText: "See Less",
        showFullText: false,
      };
    },
    computed: {
      truncatedParagraphs() {
        if (this.showFullText) {
          return this.aboutParagraphs;
        }
        return this.aboutParagraphs.map((paragraph) => {
          const length = Math.floor(paragraph.length * 0.7);
          return paragraph.slice(0, length) + "...";
        });
      },
    },
    methods: {
      toggleShowMore() {
        this.showFullText = !this.showFullText;
      },
      toggleDropdown(event) {
        event.stopPropagation();
        this.isOpen = !this.isOpen;
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .about {
    .about-section {
      margin-bottom: 0;
      button {
        margin-top: 0;
      }
    }
  }
  </style>