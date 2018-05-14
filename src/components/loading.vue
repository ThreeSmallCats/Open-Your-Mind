<template>
	<div class='load' v-if='show'>
		<img src="../pic/5-121204193934.gif" height="24" width="24" alt="加载中~~~~">
	</div>
</template>
<script>
// loading组件会在两秒后自动注销
export default {
  data() {
    return {
      show: true
    };
  },
  props: {},
  mounted() {
    let that = this;
    let time = setInterval(function() {
      that.$emit("showLoad", 0);
      clearInterval(time);
    }, 2000);
  },
  destroyed() {
    // clearInterval(time)
  }
};
</script>
<style scoped lang='less'>
@import "../basestyle/style.less";
.load {
  text-align: center;
  padding-top: 100px;
}
</style>