<template>
  <!-- Qiaozhi AboutFeedback Component -->
  <match-media :min-width="800">
    <view class="about-feedback">
      <view class="container">
        <uni-row class="row">
          <!-- About Section -->
          <uni-col :xs="24" :sm="24" :md="12" :lg="12" class="about-section pe-5">
            <h4 class="title">{{ aboutTitle }}</h4>
            <p v-for="(paragraph, index) in truncatedParagraphs" :key="index">
              <span v-html="paragraph"></span>
            </p>
            <view class="item-button me-3">
              <button class="button btn-mn btn-primary btn-sm" @click="toggleShowMore">{{ showFullText ? showLessButtonText : showMoreButtonText }}</button>
            </view> 
          </uni-col>
          <!-- Feedback Section -->
          <uni-col :xs="24" :sm="24" :md="12" :lg="12" class="feedback-section">
            <h4 class="title">{{ feedbackTitle }}</h4>
            <p>{{ feedbackSubtitle }}</p>
            <form @submit.prevent="submitFeedback">
              <!-- Select Dropdown -->
              <view class="select mb-3">
                <div ref="dropdown" class="dropdown" @click="toggleDropdown" :aria-expanded="isOpen.toString()">
                  <div class="selected-item">
                    <span v-if="!selectedValue" class="placeholder">{{ feedbackSubjectPlaceholder }}</span>
                    <view v-else class="slected-value">{{ selectedValue }}</view>
                  </div>
                  <div v-if="isOpen" class="dropdown-menu">
                    <div
                      v-for="(option, index) in feedbackOptions"
                      :key="index"
                      class="dropdown-item"
                      @click="selectOption(option)"
                    >
                      {{ option }}
                    </div>
                  </div>
                </div>
              </view>
              <!-- Feedback Textarea -->
              <textarea
                v-model="feedbackMessage"
                class="form-textarea"
                :placeholder="feedbackMessagePlaceholder"
                maxlength="1500"
                required
              ></textarea>
              <button type="submit" class="button btn-mn btn-secondary btn-sm">{{ submitButtonText }}</button>
            </form>
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
      aboutTitle: "About FUNS.WIN Bitcoin Games",
      aboutParagraphs: [
        `FUNS.WIN, as one of the best <a href="#" class="link">crypto casinos</a> in the world, offers a huge number of different games with unique features. Thematic slots, legendary table and live games, unique Original games from FUNS.WIN – all of this meets you along the path of the easiest and most fun way to make money in the crypto world. Besides, our platform replenishes the number of convenient and newfangled features every day!`,
        `On FUNS.WIN you can play with over 50 top cryptocurrencies. It allows increasing the number of your favorite tokens without making any transfers and exchanges. There is a special Demo mode for testing games and getting a useful experience. It’s a cool feature that’s implemented for training and for a calm game without any worries.`,
        `Playing casino games with crypto for fun and believing in victory is all you need to keep good things in life accessible because of the most generous bonuses.`,
      ],
      showMoreButtonText: "Show More",
      showLessButtonText: "Show Less",
      showFullText: false,

      // Feedback Text
      feedbackTitle: "⭐ Let's improve your gaming experience",
      feedbackSubtitle: "Have you found a bug or have an idea for the platform improvement? Please, leave your message here!",
      feedbackSubjectPlaceholder: "Select a feedback subject",
      feedbackOptions: ["Bug Report", "Feature Request", "Other"],
      feedbackMessagePlaceholder: "Your feedback",
      submitButtonText: "Sign Up or Login",

      // Form State
      feedbackSubject: "",
      feedbackMessage: "",
      isOpen: false, // Dropdown State
      selectedValue: '', // Selected Option
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
    submitFeedback() {
      if (this.feedbackSubject && this.feedbackMessage) {
        console.log("Feedback Submitted:", {
          subject: this.feedbackSubject,
          message: this.feedbackMessage,
        });
        alert("Feedback Submitted!");
        // API Call
      }
    },
    toggleDropdown(event) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedValue = option;
      this.feedbackSubject = option;
      this.isOpen = false;
      this.$emit('input', option);
    },
    closeDropdownOnClickOutside(event) {
      const dropdownElement = this.$refs.dropdown;
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdownOnClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdownOnClickOutside);
  },
};
</script>

<style lang="scss" scoped>
.about-feedback {
  .feedback-section {
    text-align: left;
  }
  .about-section {
    margin-bottom: 30px;
    button {
      margin-top: 10px;
    }
  }
  .select {
    position: relative;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 10px;
    z-index: 100;
  }
}
</style>