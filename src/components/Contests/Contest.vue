<!-- Qiaozhi Component -->
<template>
  <match-media :max-width="800">
    <view class="contest">
      <view class="title-wrap mt-5 mb-3">
        <view class="title">
          <view class="heading">
            <image class="icon" src="/static/image/home/icons8-pgjj.png" mode="scaleToFill" />
            <view class="title">{{ $t('Qiaozhi.Contests') }}</view>
          </view>
        </view>
      </view>

      <!-- Switcher -->
      <view class="tabs">
        <view class="tabs-wrapper">
          <view
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab"
            :class="{ active: currentTab === index }"
            @click="switchTab(index)"
          >
            {{ tab.title }}
          </view>
        </view>
      </view>

      <!-- Tab -->
      <view class="container-fluid p-0">
        <uni-row class="row justify-content-center mb-5">
          <view class="names">
            <uni-col :xs="12" :sm="12" :md="12" :lg="12">
              <view class="col">Game</view>
            </uni-col>
            <uni-col class="result" :xs="12" :sm="12" :md="12" :lg="12">
              <view class="col">Result</view>
            </uni-col>
          </view>

          <!-- Boards -->
          <view
            v-for="(board, index) in tabs[currentTab].boards"
            :key="index"
            class="board"
            :class="'item-' + (index + 1)"
          >
            <uni-col class="game" :xs="12" :sm="12" :md="12" :lg="12">
              <u-icon class="icon" :name="board.icon" img-mode="scaleToFill"></u-icon>
              <view class="col">{{ board.game }}</view>
            </uni-col>
            <uni-col class="payout" :xs="12" :sm="12" :md="12" :lg="12">
              <view class="col">{{ board.payout }}</view>
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
      currentTab: 0,
      tabs: [
        {
          title: "My Games",
          boards: [
            { game: "Big Bass Xmas Xt…", payout: "1,736,947.22", icon: "/static/image/contest-games/game21.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Dragon King Hot…", payout: "14,775,509.53", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Stake American B…", payout: "1,857,749.95", icon: "/static/image/contest-games/game21.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Video Poker", payout: "-7,986,222.59", icon: "/static/image/contest-games/poker.png", iconCurrency: "/static/image/contest-games/gold.png" },
            { game: "Starlight Christmas", payout: "7,836,544.94", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/gold.png" },
            { game: "Dice", payout: "9,393,707.90", icon: "/static/image/contest-games/dice.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Dice", payout: "-2,936,642.96", icon: "/static/image/contest-games/dice.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Stake American B…", payout: "12,435,986.83", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Donny Dough", payout: "-4,413,820.93", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Donny Dough", payout: "13,626,647.42", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" }
          ]
        },
        {
          title: "All Games",
          boards: [
            { game: "Dice", payout: "9,393,707.90", icon: "/static/image/contest-games/dice.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Dice", payout: "-2,936,642.96", icon: "/static/image/contest-games/dice.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Stake American B…", payout: "12,435,986.83", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Donny Dough", payout: "-4,413,820.93", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Donny Dough", payout: "13,626,647.42", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Big Bass Xmas Xt…", payout: "1,736,947.22", icon: "/static/image/contest-games/game21.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Dragon King Hot…", payout: "14,775,509.53", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Stake American B…", payout: "1,857,749.95", icon: "/static/image/contest-games/game21.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Video Poker", payout: "-7,986,222.59", icon: "/static/image/contest-games/poker.png", iconCurrency: "/static/image/contest-games/gold.png" },
            { game: "Starlight Christmas", payout: "7,836,544.94", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/gold.png" },
          ]
        },
        {
          title: "High Rollers",
          boards: [
            { game: "Big Bass Xmas Xt…", payout: "1,736,947.22", icon: "/static/image/contest-games/game21.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Stake American B…", payout: "12,435,986.83", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Donny Dough", payout: "-4,413,820.93", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Donny Dough", payout: "13,626,647.42", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Dragon King Hot…", payout: "14,775,509.53", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Stake American B…", payout: "1,857,749.95", icon: "/static/image/contest-games/game21.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Video Poker", payout: "-7,986,222.59", icon: "/static/image/contest-games/poker.png", iconCurrency: "/static/image/contest-games/gold.png" },
            { game: "Starlight Christmas", payout: "7,836,544.94", icon: "/static/image/contest-games/seven.png", iconCurrency: "/static/image/contest-games/gold.png" },
            { game: "Dice", payout: "9,393,707.90", icon: "/static/image/contest-games/dice.png", iconCurrency: "/static/image/contest-games/stake.png" },
            { game: "Dice", payout: "-2,936,642.96", icon: "/static/image/contest-games/dice.png", iconCurrency: "/static/image/contest-games/stake.png" },
          ]
        }
      ]
    };
  },
  methods: {
    switchTab(index) {
      this.currentTab = index;
    },
    generateNewRecord() {
      const newRecord = {
        game: `Game-${Math.random().toString(36).substr(2, 5)}`,
        payout: (Math.random() * 10000000).toFixed(2),
        icon: "/static/image/contest-games/game21.png",
        iconCurrency: "/static/image/contest-games/stake.png"
      };
      this.tabs[this.currentTab].boards.push(newRecord);

      // 10 Items
      if (this.tabs[this.currentTab].boards.length > 10) {
        this.tabs[this.currentTab].boards.shift();
      }
    }
  },
  mounted() {
    setInterval(this.generateNewRecord, 1000);
  }
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
  margin-top: 10px;
}
.icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}
</style>