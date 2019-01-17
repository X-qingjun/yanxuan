<template>
  <div id="category" class="page">
    <header class="header border-bottom">
      <p>
        <van-icon name="search" class="icon"/>搜索商品, 共21157款好物
      </p>
    </header>
    <div class="wrap">
      <scroller :top="44" :bottom="49" class="border-right">
        <ul class="list">
          <li
            v-for="(item, index) in navData"
            :key="item.id"
            :class="{active: selectIndex===index}"
            @click="selectedTab(index)"
          >{{item.name}}</li>
        </ul>
      </scroller>

      <scroller
        ref="content"
        :top="44"
        :bottom="49"
        v-if="navData.length>0"
        :forword="handleContentforword"
        :next="handleContentNext"
      >
        <img class="banner" :src="navData[selectIndex].wapBannerUrl">

        <ul class="content-list">
          <li
            class="content-item"
            v-for="value in navData[selectIndex].subCateList"
            :key="value.id"
          >
            <img :src="value.bannerUrl">
            <p>{{value.name}}</p>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<script>
import { getCategoryList } from "../../services/homeService";
export default {
  data() {
    return {
      selectIndex: 0,
      navData: []
    };
  },
  methods: {
    selectedTab(index) {
      this.selectIndex = index;
      this.$nextTick(() => {
        this.$refs.content.scrollTo(-50, 0);
      });
    },
    handleContentforword() {
      // console.log('触发跳转上一个滚动视图');
      if (this.selectIndex > 0) {
        this.selectedTab(this.selectIndex - 1);
      }
    },
    handleContentNext() {
      // console.log('触发跳转下一个滚动视图');
      if (this.selectIndex < this.navData.length - 1) {
        this.selectedTab(this.selectIndex + 1);
      }
    }
  },
  created() {
    getCategoryList().then(data => {
      this.navData = data;
    });
  }
};
</script>

<style lang="scss">
#category {
  .header {
    width: 100%;
    height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    padding: 8px 8px;
    box-sizing: border-box;
    p {
      line-height: 30px;
      font-size: 14px;
      padding: 0 10px;
      background: #ededed;
      color: #666;
      border-radius: 4px;
      margin: 0 8px;
      flex: 1;
      text-align: center;
      .icon {
        transform: translateY(2px);
        font-size: 16px;
      }
    }
  }
  .wrap {
    display: flex;
    .scroller-wrap:nth-of-type(1) {
      width: 70px;
      .list {
        padding-top: 20px;
        li {
          margin-top: 20px;
          line-height: 25px;
          font-size: 14px;
          color: #333;
          text-align: center;
          border-left: 2px solid transparent;
          &:nth-child(1) {
            margin-top: 0px;
          }
          &.active {
            color: #ab2b2b;
            border-left: 2px solid #ab2b2b;
          }
        }
      }
    }
    .scroller-wrap:nth-of-type(2) {
      left: 70px;
      right: 0;
      padding: 10px;
      box-sizing: border-box;
      width: auto;
      .banner {
        width: 100%;
      }
      .content-list {
        padding-top: 10px;
        overflow: hidden;
        .content-item {
          width: 33.33%;
          float: left;
          img {
            width: 80%;
            margin: 0 auto;
          }
          p {
            text-align: center;
            font-size: 12px;
            color: #333;
            line-height: 14px;
            height: 28px;
          }
        }
      }
    }
  }
}
</style>
