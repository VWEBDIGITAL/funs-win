<!-- Qiaozhi Component -->
<template>
  <match-media :max-width="800">
  <!-- Select Dropdown -->
  <view class="select">
  <div ref="dropdown" class="dropdown" :aria-expanded="OpenState.toString()">
    <view class="selected-item" @click="triggerDropdown">
      <span v-if="!selectedOption" class="placeholder">{{ Placeholder }}</span>
      <view v-else class="selected-value"><u-icon class="icon-cup" size="28" name="/static/image/contest-games/icon-cup.png" img-mode="scaleToFill"></u-icon>{{ selectedOption }}</view>
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
<view class="contest-mobile">
<view v-if="false" class="active-tab">
  <p>Showing Content: {{ tabs[currentTab].title }}</p>
</view>

      <!-- Tab -->
      <view class="container-fluid p-0">
        <uni-row class="row justify-content-center mb-5">
          <view class="names">
            <uni-col :xs="12" :sm="12" :md="12" :lg="12">
              <view class="col">Game</view>
            </uni-col>
            <uni-col class="result" :xs="12" :sm="12" :md="12" :lg="12">
              <view class="col">Payout</view>
            </uni-col>
          </view>

          <!-- Boards -->
          <view v-for="(board, index) in tabs[currentTab].boards" :key="index" class="board"
            :class="'item-' + (index + 1)">
            <uni-col class="game" :xs="12" :sm="12" :md="12" :lg="12">
              <u-icon class="icon" :name="board.icon" img-mode="scaleToFill"></u-icon>
              <view class="col">{{ board.game }}</view>
            </uni-col>
            <uni-col class="payout" :xs="12" :sm="12" :md="12" :lg="12">
              <view class="col" :class="{ negative: parseFloat(board.payout) < 0 }">{{ board.payout }}</view>
              <u-icon class="icon-currency" :name="board.iconCurrency" img-mode="scaleToFill"></u-icon>
            </uni-col>
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
          title: "Contests",
          boards: [
            { game: "Crash", payout: "1,736,947.22", icon: "/static/image/contest-games/game1.png", iconCurrency: "/static/image/contest-games/btc.png" },
            { game: "Baccarat 3", payout: "14,775,509.53", icon: "/static/image/contest-games/game2.png", iconCurrency: "/static/image/contest-games/btc.png" },
            { game: "Candy Jar Clusters", payout: "1,857,749.95", icon: "/static/image/contest-games/game4.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Plinko", payout: "-7,986,222.59", icon: "/static/image/contest-games/game3.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Plinko", payout: "7,836,544.94", icon: "/static/image/contest-games/game4.png", iconCurrency: "/static/image/contest-games/usdt.png" },
            { game: "Roulette", payout: "9,393,707.90", icon: "/static/image/contest-games/game2.png", iconCurrency: "/static/image/contest-games/usdt.png" },
            { game: "Plinko", payout: "-2,936,642.96", icon: "/static/image/contest-games/game1.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Baccarat", payout: "12,435,986.83", icon: "/static/image/contest-games/game2.png", iconCurrency: "/static/image/contest-games/btc.png" },
            { game: "Roulette", payout: "-4,413,820.93", icon: "/static/image/contest-games/game3.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Roulette", payout: "13,626,647.42", icon: "/static/image/contest-games/game4.png", iconCurrency: "/static/image/contest-games/eth.png" }
          ]
        },
        {
          title: "Tournaments",
          boards: [
            { game: "Crash", payout: "1,736,947.22", icon: "/static/image/contest-games/game1.png", iconCurrency: "/static/image/contest-games/btc.png" },
            { game: "Baccarat 3", payout: "14,775,509.53", icon: "/static/image/contest-games/game2.png", iconCurrency: "/static/image/contest-games/btc.png" },
            { game: "Candy Jar Clusters", payout: "1,857,749.95", icon: "/static/image/contest-games/game4.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Plinko", payout: "-7,986,222.59", icon: "/static/image/contest-games/game3.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Plinko", payout: "7,836,544.94", icon: "/static/image/contest-games/game4.png", iconCurrency: "/static/image/contest-games/usdt.png" },
            { game: "Roulette", payout: "9,393,707.90", icon: "/static/image/contest-games/game2.png", iconCurrency: "/static/image/contest-games/usdt.png" },
            { game: "Plinko", payout: "-2,936,642.96", icon: "/static/image/contest-games/game1.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Baccarat", payout: "12,435,986.83", icon: "/static/image/contest-games/game2.png", iconCurrency: "/static/image/contest-games/btc.png" },
            { game: "Roulette", payout: "-4,413,820.93", icon: "/static/image/contest-games/game3.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Roulette", payout: "13,626,647.42", icon: "/static/image/contest-games/game4.png", iconCurrency: "/static/image/contest-games/eth.png" }
          ]
        },
        {
          title: "Races",
          boards: [
            { game: "Crash", payout: "1,736,947.22", icon: "/static/image/contest-games/game1.png", iconCurrency: "/static/image/contest-games/btc.png" },
            { game: "Baccarat 3", payout: "14,775,509.53", icon: "/static/image/contest-games/game2.png", iconCurrency: "/static/image/contest-games/btc.png" },
            { game: "Candy Jar Clusters", payout: "1,857,749.95", icon: "/static/image/contest-games/game4.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Plinko", payout: "-7,986,222.59", icon: "/static/image/contest-games/game3.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Plinko", payout: "7,836,544.94", icon: "/static/image/contest-games/game4.png", iconCurrency: "/static/image/contest-games/usdt.png" },
            { game: "Roulette", payout: "9,393,707.90", icon: "/static/image/contest-games/game2.png", iconCurrency: "/static/image/contest-games/usdt.png" },
            { game: "Plinko", payout: "-2,936,642.96", icon: "/static/image/contest-games/game1.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Baccarat", payout: "12,435,986.83", icon: "/static/image/contest-games/game2.png", iconCurrency: "/static/image/contest-games/btc.png" },
            { game: "Roulette", payout: "-4,413,820.93", icon: "/static/image/contest-games/game3.png", iconCurrency: "/static/image/contest-games/eth.png" },
            { game: "Roulette", payout: "13,626,647.42", icon: "/static/image/contest-games/game4.png", iconCurrency: "/static/image/contest-games/eth.png" }
          ]
        }
      ],
      selectedOption: "Contests", // Selected Option
      Placeholder: "Menu",
      Options: ["Contests", "Tournaments", "Races"],
    };
  },
  methods: {
    switchTab(index) {
      this.currentTab = index;
      this.selectedOption = this.Options[index]; // Sync Dropdown Selection & Tabs
    },
    generateNewRecord() {
      const gameNames = ["Baccarat 3", "Candy Jar Clusters", "Roulette", "Plinko", "Baccarat", "Crash", "Baccarat 2"];
      const gameIcons = [
        "/static/image/contest-games/game1.png",
        "/static/image/contest-games/game2.png",
        "/static/image/contest-games/game3.png",
        "/static/image/contest-games/game4.png"
      ];
      const currencyIcons = [
        "/static/image/contest-games/btc.png",
        "/static/image/contest-games/usdt.png",
        "/static/image/contest-games/eth.png"
      ];

      const payoutValue = (Math.random() * 10000000).toFixed(2);
      const payout = Math.random() < 0.5 ? `-${payoutValue}` : payoutValue;

      const newRecord = {
        game: gameNames[Math.floor(Math.random() * gameNames.length)],
        payout,
        icon: gameIcons[Math.floor(Math.random() * gameIcons.length)],
        iconCurrency: currencyIcons[Math.floor(Math.random() * currencyIcons.length)]
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