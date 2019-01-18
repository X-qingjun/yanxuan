<template>
  <scroller :top="74" :bottom="49">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item class="banner" v-for="item in bannerData" :key="item.id">
        <img :src="item.picUrl">
      </van-swipe-item>
    </van-swipe>

    <div class="top-module" :style="{backgroundImage: 'url('+bgUrl+')', backgroundSize: 'cover'}">
      <ul class="policy">
        <li class="policy-item" v-for="item in PolicyList" :key="item.desc">
          <img v-lazy="item.icon">
          <span>{{item.desc}}</span>
        </li>
      </ul>
      <ul class="kingKong" :style="{backgroundImage: 'url('+kingKongImg+')'}">
        <li class="kingKong-item" v-for="item in kingKongList" :key="item.id">
          <img v-lazy="item.picUrl">
          <p>{{item.text}}</p>
        </li>
      </ul>
      <ul class="promotion">
        <li class="promotion-item" v-for="item in bigPromotionList" :key="item.sequen">
          <img v-lazy="item.picUrl">
        </li>
      </ul>
    </div>
    <div class="center-module">
      <div class="center-one">
        <div class="center-top">
          <h3>品牌制造商提供</h3>
          <h5>更多
            <van-icon name="arrow" class="arrow"/>
          </h5>
        </div>
        <ul class="taglist">
          <li class="taglist-item" v-for="item in TagList" :key="item.id">
            <div class="descript">
              <p>{{item.name}}</p>
              <p>{{item.floorPrice}}元起</p>
            </div>
            <img v-lazy="item.picUrl">
          </li>
        </ul>
      </div>
      <div class="center-two">
        <h3>{{title}}</h3>
        <ul class="catelist">
          <li class="catelist-item" v-for="item in cataList" :key="item.categoryName">
            <div class="item-left">{{item.categoryName}}</div>
            <img v-lazy="item.picUrl">
          </li>
        </ul>
      </div>
    </div>
  </scroller>
</template>

<script>
import {
  getHomeFocusList,
  getPolicyList,
  getHomeList,
  getHomeActivity,
  getHomeTagList,
  getHomeCateSell
} from "../../services/homeService";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {
      bannerData: [],
      bgUrl: "",
      PolicyList: [],
      kingKongImg: "",
      kingKongList: [],
      bigPromotionList: [],
      TagList: [],
      item: "",
      cataList: []
    };
  },
  created() {
    //请求轮播图数据
    getHomeFocusList().then(data => {
      this.bannerData = data;
    });
    // 请求网易严选协议
    getPolicyList().then(data => {
      this.PolicyList = data;
    });
    // 首页分类列表
    getHomeList().then(data => {
      this.kingKongImg = data.background;
      this.kingKongList = data.list;
    });
    //请求首页活动
    getHomeActivity().then(data => {
      this.bgUrl = data.backgroundUrl;
      this.bigPromotionList = data.bigPromotionData;
    });
    getHomeTagList().then(data => {
      this.TagList = data;
    });
    getHomeCateSell().then(data => {
      this.title = data.title;
      this.cataList = data.cateList;
    });
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
  border-bottom: 15px solid #e8c092;
  overflow: hidden;
  .promotion-item img {
    width: 50%;
    float: left;
  }
  .promotion-item:nth-of-type(1) img {
    width: 100%;
  }
}
.center-module {
  padding: 10px;
  border-top: 10px solid #f4f4f4;
  .center-one {
    .center-top {
      height: 30px;
      h3 {
        font-weight: normal;
        float: left;
        font-size: 16px;
      }
      h5 {
        font-weight: normal;
        float: right;
        font-size: 13px;
        .arrow {
          transform: translateY(2px);
        }
      }
    }
    .taglist {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .taglist-item {
        width: 49%;
        margin-top: 5px;
        .descript {
          position: absolute;
          width: 49%;
          margin-top: 20px;
          p:nth-of-type(1) {
            font-size: 14px;
            text-align: center;
          }
          p:nth-of-type(2) {
            font-size: 12px;
            color: #777;
            text-align: center;
          }
        }
        img {
          width: 100%;
        }
      }
    }
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


