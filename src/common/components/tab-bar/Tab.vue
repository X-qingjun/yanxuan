<template>
  <router-link class="tab" :to="info.path">
    <div>
      <img src="/img/tab.png" :style="style">
    </div>
    <span>{{info.title}}</span>
  </router-link>
</template>

<script>
export default {
  name: "tab-item",
  props: ["info"],
  computed: {
    style() {
      let offset = this.info.index * -61;
      if (this.$route.path !== this.info.path) {
        offset -= 31;
      }
      return {
        transform: `translateY(${offset}px)`
      };
    }
  }
};
</script>

<style>
.tab {
  text-align: center;
  flex: 1;
  list-style: none;
}
.tab div {
  width: 26px;
  height: 31px;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 2px;
}
.tab div img {
  width: 100%;
}
.tab span {
  display: block;
  font-size: 12px;
  color: #555;
}
</style>
