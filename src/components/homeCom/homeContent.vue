<template>
  <scroller :top="74" :bottom="49">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item class="banner" v-for="item in bannerData" :key="item.id">
        <img :src="item.picUrl">
      </van-swipe-item>
    </van-swipe>

    <div class="top-module" :style="{backgroundImage: 'url('+bgUrl+')', backgroundSize: 'cover'}">
      <ul class="policy">
        <li class="policy-item" v-for="item in policyDescList" :key="item.desc">
          <img :src="item.icon">
          <span>{{item.desc}}</span>
        </li>
      </ul>
      <ul class="kingKong" :style="{backgroundImage: 'url('+kingKongImg+')'}">
        <li class="kingKong-item" v-for="item in kingKongList" :key="item.id">
          <img :src="item.picUrl">
          <p>{{item.text}}</p>
        </li>
      </ul>
      <ul class="promotion">
        <li class="promotion-item" v-for="item in bigPromotionList" :key="item.sequen">
          <img :src="item.picUrl">
        </li>
      </ul>
    </div>
    <div class="center-module"></div>
  </scroller>
</template>

<script>
import { getHomeFocusList, getHomeTopData } from "../../services/homeService";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {
      bannerData: [],
      bgUrl: "",
      policyDescList: [],
      kingKongImg: "",
      kingKongList: [],
      bigPromotionList: []
    };
  },
  created() {
    //请求轮播图数据
    getHomeFocusList().then(data => {
      this.bannerData = data;
    });
    // 请求推荐的分类板块数据
    getHomeTopData().then(
      ({ policyDescList, kingKongData, bigPromotionData, bgUrl }) => {
        this.policyDescList = policyDescList;
        this.kingKongImg = kingKongData.background;
        this.kingKongList = kingKongData.list;
        this.bigPromotionList = bigPromotionData;
        this.bgUrl = bgUrl;
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.banner img {
  width: 100%;
}
.top-module {
  padding: 0px;
}
.policy {
  display: flex;
  height: 20px;
  padding: 5px 0;
  .policy-item {
    flex: 1;
    line-height: 20px;
    font-size: 12px;
    color: #b4282d;
    img {
      width: 16px;
      display: inline-block;
      transform: translateY(4px);
    }
  }
}
.kingKong {
  overflow: hidden;
  .kingKong-item {
    width: 20%;
    float: left;
    padding: 5px 0;
    box-sizing: border-box;
    img {
      width: 80%;
      margin: 0 auto;
    }
    p {
      font-size: 12px;
      color: #333;
      text-align: center;
    }
  }
}
.promotion {
  overflow: hidden;
  .promotion-item img {
    width: 50%;
    float: left;
  }
  .promotion-item:nth-of-type(1) img {
    width: 100%;
  }
}
</style>

<style>
.van-swipe__indicator {
  border-radius: 0;
  width: 18px;
  height: 2px;
}
</style>


