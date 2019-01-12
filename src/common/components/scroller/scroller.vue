<template>
  <div class="scroller-wrap" ref="scroll" :style="wrapStyle">
    <div class="scroller-content">
      <slot/>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroller",
  props: {
    width: Number,
    height: Number,
    top: Number,
    bottom: Number
  },
  computed: {
    wrapStyle() {
      if (this.top && this.bottom) {
        return {
          position: "absolute",
          top: this.top + "px",
          bottom: this.bottom + "px",
          width: "100%",
          left: 0
        };
      } else {
        return {
          width: this.width + "px",
          height: this.height + "px"
        };
      }
    }
  },
  mounted() {
    const scroll = new BScroll(this.$refs.scroll);
  }
};
</script>

<style lang="scss" scoped>
.scroller-wrap {
  overflow: hidden;
}
</style>

