<!--Qiaozhi Component-->
<template>
  <match-media :min-width="800">
    <view class="footer">
      <view class="container">
        <!-- Footer Main Content -->
        <uni-row class="row justify-content-between mb-5">
          <uni-col v-for="(section, index) in footerSections" :key="`section-${index}`" :xs="24" :sm="4" :md="4" :lg="4" class="footer-section" :class="`item-${index + 1}`">
            <h5>{{ section.title }}</h5>
            <ul class="menu-items">
              <li v-for="(item, itemIndex) in section.items" :key="`item-${index + 1}-${itemIndex + 1}`" :class="`item-${itemIndex + 1}`">
                <a v-if="item.link" :href="item.link">{{ item.text }}</a>
                <span v-else>{{ item.text }}</span>
              </li>
            </ul>
          </uni-col>
        </uni-row>
        <!-- Footer Bottom Section -->
        <view class="footer-bottom text-center">
          <view class="footer-icons mb-3">
            <span class="icon blue"></span>
            <span class="icon black"></span>
            <span class="icon orange"></span>
            <span class="icon pink"></span>
            <span class="icon red"></span>
            <span class="icon yellow"></span>
          </view>
          <view class="copyright-disclaimer mb-3">
            This website offers gaming with risk experience. To be a user of this site you must be over 18 years old.
            We are not responsible for the violation of your local laws related to i-gaming.
            Play responsibly and have fun on FUNS.WIN.
          </view>
          <view class="copyright mb-3">Copyright © 2019-2025 FUNS.WIN. All Rights Reserved.</view>
        </view>
      </view>
    </view>
  </match-media>
  <!-- Qiaozhi Footer Component -->
</template>

<script>
export default {
  data() {
    return {
      footerSections: [
        {
          title: "I-GAMING",
          items: [
            { text: "All games" },
            { text: "Dice" },
            { text: "Slots" },
            { text: "Rank system" },
            { text: "Live casino" },
            { text: "Plinko" },
            { text: "Crypto Poker" },
          ],
        },
        {
          title: "FEATURES",
          items: [
            { text: "BFG Staking" },
            { text: "Crypto Staking" },
            { text: "Crypto Loans" },
            { text: "Farming" },
            { text: "FUNS.WIN Box" },
            { text: "Daily tasks" },
            { text: "Affiliate Program" },
            { text: "Futures" },
          ],
        },
        {
          title: "PROMO",
          items: [{ text: "Promotions" }],
        },
        {
          title: "ABOUT US",
          items: [
            { text: "News" },
            { text: "About BFG" },
            { text: "About team" },
            { text: "FUNS.WIN Whitepaper" },
            { text: "FUNS.WIN Docs" },
            { text: "Official Mirrors" },
            { text: "Download application" },
          ],
        },
        {
          title: "CONTACT US",
          items: [
            { text: "support@funs.win", link: "mailto:support@funs.win" },
            { text: "bugbounty@funs.win", link: "mailto:bugbounty@funs.win" },
            { text: "pr@funs.win", link: "mailto:pr@funs.win" },
            { text: "affiliate@funs.win", link: "mailto:affiliate@funs.win" },
          ],
        },
        {
          title: "HELP",
          items: [
            { text: "Fairness" },
            { text: "Privacy Policy" },
            { text: "Terms of Service" },
            { text: "Sportsbetting T&C" },
            { text: "Bug Bounty Program" },
            { text: "Business Inquiries" },
            { text: "Live Support" },
            { text: "Responsible Gambling" },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  & .footer-bottom {
    margin-top: 20px;
    p {
      font-size: 0.8rem;
      color: #55657E;
      margin: 0 0 10px;
    }
    .footer-icons {
      display: flex;
      justify-content: start;
      gap: 10px;
      .icon {
        width: 30px;
        height: 30px;
        border-radius: 10px;
        display: inline-block;

        &.blue {
          background: linear-gradient(to right, #18C8FF 0%, #0080DC 100%);
        }

        &.black {
          background: linear-gradient(to right, #3A3A3A 0%, #000000 100%);
        }

        &.orange {
          background: linear-gradient(to right, #FFAF37 0%, #F07300 100%);
        }

        &.pink {
          background: linear-gradient(to right, #5662F6 0%, #3D2A8A 100%);
        }

        &.red {
          background: linear-gradient(to right, #FF8A00 0%, #FF4500 100%);
        }

        &.yellow {
          background: linear-gradient(130deg, #00C2FF 0%, #1875FF 32%, #FF002E 100%);
        }
      }
    }
  }
}
</style>