<template>
	<div class='top-nav'>
		<ul class='nav-ul'>
			<router-link to="/happy" tag='li'>笑话</router-link>
			<router-link to="/guess" tag='li'>猜一猜</router-link>
			<router-link to="/about" tag='li'>关于</router-link>
		</ul>
	</div>
</template>
<script>
export default {};
</script>
<style scoped lang='less'>
@import "../basestyle/style.less";
.nav-ul {
  display: flex;
  background-color: @baseWhite;
  li {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 20px;
    &.router-link-active {
      color: white;
      background-color: @baseGray;
    }
  }
}
</style>