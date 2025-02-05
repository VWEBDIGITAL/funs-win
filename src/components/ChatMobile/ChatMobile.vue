<!-- Qiaozhi Component -->
<template>
  <match-media :max-width="800">
  <!-- Select Dropdown -->
  <view class="select">
  <div ref="dropdown" class="dropdown" :aria-expanded="OpenState.toString()">
    <view class="selected-item" @click="triggerDropdown">
      <span v-if="!selectedOption" class="placeholder">{{ Placeholder }}</span>
      <view v-else class="selected-value"><u-icon class="icon-cup" size="28" name="/static/image/chat/flag-gb.png" img-mode="scaleToFill"></u-icon>{{ selectedOption }}</view>
    </view>
    <view v-if="OpenState" class="dropdown-menu">
      <div
        v-for="(option, index) in Options"
        :key="option"
        class="dropdown-item"
        @click="selectOption(option, index)"
        :class="{ active: currentTab === index }"
      >
        {{ option }}
      </div>
    </view>
  </div>
</view>

<!-- Switcher -->
<view v-if="false" class="tabs">
  <view class="tabs-wrapper">
    <view
      v-for="(tab, index) in tabs"
      :key="tab.title"
      class="tab"
      :class="{ active: currentTab === index }"
      @click="switchTab(index)"
    >
      {{ tab.title }}
    </view>
  </view>
</view>
<view class="chat-mobile">
<view v-if="false" class="active-tab">
  <p>Showing Content: {{ tabs[currentTab].title }}</p>
</view>

      <!-- Tab -->
      <view class="container-fluid p-0">
        <uni-row class="row justify-content-center mb-5">
          <!-- Boards -->
          <view v-for="(board, index) in tabs[currentTab].boards" :key="index" class="board"
            :class="'item-' + (index + 1)">
            <view class="user">
              <u-icon class="icon" :name="board.icon" img-mode="scaleToFill"></u-icon>
              <view class="col">{{ board.user + ':' }}</view>
            </view>
            <view class="message">
              <view class="col">{{ board.message }}</view>
              <u-icon v-if="false" class="emoji" :name="board.Emoji" img-mode="scaleToFill"></u-icon>
            </view>
          </view>
        </uni-row>
      </view>
    </view>
  </match-media>
</template>

<script>
export default {
  data() {
    return {
      OpenState: false, // Dropdown State
      currentTab: 0,
      tabs: [
        {
          title: "Stake: English",
          boards: [
            { user: "Whale20", message: "Casino: # 304,652,985,342 ugh", icon: "/static/image/chat/users/user1.png", Emoji: "/static/image/contest-users/btc.png" },
            { user: "RyeRy3", message: "sea", icon: "/static/image/chat/users/user2.png", Emoji: "/static/image/contest-users/btc.png" },
            { user: "Mbittern", message: "World", icon: "/static/image/chat/users/user6.png", Emoji: "/static/image/contest-users/eth.png" },
            { user: "xCaptain", message: " yall need to teach me to win on Keno I ripped on it again", icon: "/static/image/chat/users/user5.png", Emoji: "/static/image/contest-users/eth.png" },
            { user: "900LENA", message: "mouse", icon: "/static/image/chat/users/user7.png", Emoji: "/static/image/contest-users/usdt.png" },
            { user: "Eriddell", message: "beer time", icon: "/static/image/chat/users/user4.png", Emoji: "/static/image/contest-users/usdt.png" },
            { user: "Maaz12122", message: "wowzaa , gg brother nice win", icon: "/static/image/chat/users/user3.png", Emoji: "/static/image/contest-users/eth.png" },
            { user: "renatrezoiton", message: ": have fun with you fellas", icon: "/static/image/chat/users/user2.png", Emoji: "/static/image/contest-users/btc.png" },
          ]
        },
        {
          title: "Tournaments",
          boards: [
            { user: "Whale20", message: "Casino: # 304,652,985,342 ugh", icon: "/static/image/chat/users/user1.png", Emoji: "/static/image/contest-users/btc.png" },
            { user: "RyeRy3", message: "sea", icon: "/static/image/chat/users/user2.png", Emoji: "/static/image/contest-users/btc.png" },
            { user: "Mbittern", message: "World", icon: "/static/image/chat/users/user6.png", Emoji: "/static/image/contest-users/eth.png" },
            { user: "xCaptain", message: " yall need to teach me to win on Keno I ripped on it again", icon: "/static/image/chat/users/user5.png", Emoji: "/static/image/contest-users/eth.png" },
            { user: "900LENA", message: "mouse", icon: "/static/image/chat/users/user7.png", Emoji: "/static/image/contest-users/usdt.png" },
            { user: "Eriddell", message: "beer time", icon: "/static/image/chat/users/user4.png", Emoji: "/static/image/contest-users/usdt.png" },
            { user: "Maaz12122", message: "wowzaa , gg brother nice win", icon: "/static/image/chat/users/user3.png", Emoji: "/static/image/contest-users/eth.png" },
            { user: "renatrezoiton", message: ": have fun with you fellas", icon: "/static/image/chat/users/user2.png", Emoji: "/static/image/contest-users/btc.png" },
          ]
        },
        {
          title: "Races",
          boards: [
            { user: "Whale20", message: "Casino: # 304,652,985,342 ugh", icon: "/static/image/chat/users/user1.png", Emoji: "/static/image/contest-users/btc.png" },
            { user: "RyeRy3", message: "sea", icon: "/static/image/chat/users/user2.png", Emoji: "/static/image/contest-users/btc.png" },
            { user: "Mbittern", message: "World", icon: "/static/image/chat/users/user6.png", Emoji: "/static/image/contest-users/eth.png" },
            { user: "xCaptain", message: " yall need to teach me to win on Keno I ripped on it again", icon: "/static/image/chat/users/user5.png", Emoji: "/static/image/contest-users/eth.png" },
            { user: "900LENA", message: "mouse", icon: "/static/image/chat/users/user7.png", Emoji: "/static/image/contest-users/usdt.png" },
            { user: "Eriddell", message: "beer time", icon: "/static/image/chat/users/user4.png", Emoji: "/static/image/contest-users/usdt.png" },
            { user: "Maaz12122", message: "wowzaa , gg brother nice win", icon: "/static/image/chat/users/user3.png", Emoji: "/static/image/contest-users/eth.png" },
            { user: "renatrezoiton", message: ": have fun with you fellas", icon: "/static/image/chat/users/user2.png", Emoji: "/static/image/contest-users/btc.png" },
          ]
        }
      ],
      selectedOption: "Stake: English", // Selected Option
      Placeholder: "Menu",
      Options: ["Stake: English", "Stake: English2", "Stake: English3"],
    };
  },
  methods: {
    switchTab(index) {
      this.currentTab = index;
      this.selectedOption = this.Options[index]; // Sync Dropdown Selection & Tabs
    },
    generateNewRecord() {
      const userNames = ["Whale20", "xCaptain", "Eriddell", "Maaz12122", "Mbittern", "RyeRy3", "renatrezoiton", "900LENA"];
      const userIcons = [
        "/static/image/chat/users/user1.png",
        "/static/image/chat/users/user2.png",
        "/static/image/chat/users/user3.png",
        "/static/image/chat/users/user4.png"
      ];
      const currencyIcons = [
        "/static/image/contest-users/btc.png",
        "/static/image/contest-users/usdt.png",
        "/static/image/contest-users/eth.png"
      ];

      // Get Current User Message
      const currentMessages = this.tabs[this.currentTab].boards.map(board => board.message);

      // Select Random Message
      const message = currentMessages.length > 0
        ? currentMessages[Math.floor(Math.random() * currentMessages.length)]
        : "Default message";

      const newRecord = {
        user: userNames[Math.floor(Math.random() * userNames.length)],
        message,
        icon: userIcons[Math.floor(Math.random() * userIcons.length)],
        Emoji: currencyIcons[Math.floor(Math.random() * currencyIcons.length)]
      };

      this.tabs[this.currentTab].boards.push(newRecord);

      // Keep 10 Items
      if (this.tabs[this.currentTab].boards.length > 10) {
        this.tabs[this.currentTab].boards.shift();
      }
    },
    triggerDropdown(event) {
      event.stopPropagation();
      this.OpenState = !this.OpenState;
    },
    selectOption(option, index) {
      console.log('Selected:', option);
      this.selectedOption = option;
      this.feedbackSubject = option;
      this.currentTab = index;
      this.OpenState = false;
      console.log('Dropdown:', this.OpenState);
      this.$emit('input', option);
    },
    DropdownOnClickOutside(event) {
      const dropdownElement = this.$refs.dropdown;
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.OpenState = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.DropdownOnClickOutside);
    setInterval(this.generateNewRecord, 1000);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.DropdownOnClickOutside);
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
}
.tab {
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.tab.active {
  font-weight: bold;
}
.board {
  margin-top: 0;
}
.icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}
.select {
  position: relative;
  padding-top: 64px;
  }
  .dropdown {
    width: auto;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
    z-index: 100;
  }
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 10px;
  z-index: 110;
  }
  .selected-item {
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
	padding: 10px;
	background-color: #0F212E;
	font-size: 13px;
	color: #fff;
	& .icon-cup {
		position: relative;
		margin-right: 0.5rem;
	}
	& .selected-value {
		display: block;
		position: relative;
		&::after {
		display: inline-block;
		position: relative;
		margin-left: 0.5rem;
		color: #B1BAD3;
		font: normal normal normal 14px / 1 "uicon-iconfont";
		font-size: 0.75rem;
		content: "\e60d";
		}
	}
  }
</style>