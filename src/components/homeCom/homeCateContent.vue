<template>
  <scroller :top="74" :bottom="49" ref="scroller">
    <img class="banner" :src="bannerUrl">

    <div v-for="itemList in list" :key="itemList.id">
      <h3>{{itemList.name}}</h3>
      <p>{{itemList.frontName}}</p>
      <ul>
        <li v-for="item in itemList.itemlist" :key="item.id">{{item.name}}</li>
      </ul>
    </div>
  </scroller>
</template>

<script>
import { getHomeCateDetail } from "../../services/homeService";
import { Indicator } from "mint-ui";
export default {
  props: ["data"],
  data() {
    return {
      bannerUrl: "",
      list: []
    };
  },
  watch: {
    "data.id": function(newVal) {
      //请求分类的列表数据
      if (newVal) {
        // 显示加载指示器
        Indicator.open();
        getHomeCateDetail(newVal).then(data => {
          console.log(data);
          this.bannerUrl = data.bannerUrl;
          this.list = data.categoryList;
          //渲染数据时让滚动视图滚动到最顶部
          this.$nextTick(() => {
            Indicator.close();
            this.$refs.scroller.scrollTo(0, 0);
          });
        });
      }
    }
  }
};
</script>

<style>
.banner {
  width: 100%;
}
</style>
