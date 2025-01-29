<!--Qiaozhi Component-->
<template>
    <view class="game-providers">
        <view class="allgys">
            <scroll-view class="nav-bar" scroll-x @scroll="scroll">
                <view class="nav-bar-wrap">
                    <block v-for="(itemk, indexk) in ProvidersList" :key="indexk">
                        <view class="nav-bar-item" @click="togamesGongying(itemk)">
                            <image :src="domains + '/vendorIcon/' + itemk.name + '.png'" class='jrsx_picture2_gys'>
                            </image>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    mounted() {
	this.getVlist();
		},
        methods: {
    async getVlist() {
        let that = this;
        const ress = await that.$u.post('/game/category', {});
        that.domains = ress.data.domain;
        that.ProvidersList = ress.data.vendors;
    },
    scroll(event) {
        console.log('Scroll Event Triggered:', event);
    },
    togamesGongying(item) {
	console.log(item)
	  uni.navigateTo({
		url: '/pages/supplierGameList/supplierGameList?id=' + item.id + '&title=' + item.name
	  })
	},
},
    data() {
        return {
            ProvidersList: [],
            domains: '',
        };
    }
};
</script>

<style lang="scss" scoped>
	.allgys {
		position: relative;
		height: 102px;
		overflow: hidden;

		.nav-bar-wrap {
			display: flex;
			flex-flow: column wrap;
			height: 102px;
			cursor: pointer;
		}

		.nav-bar-item {
			width: 200rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 22rpx;
			margin-right: 22rpx;
		}

		.nav-bar-item image {
			display: block;
			height: 40px;
			width: 100%;
			margin: 0;
			border-radius: 14rpx;
			background-color: $pupUp-title-border-color;
		}

	}
</style>