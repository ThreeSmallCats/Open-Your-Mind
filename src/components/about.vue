<template>
<div class='about-all' ref='aboutAll' @touchstart.stop='tStart($event)' @touchend.stop='tEnd($event)'>

	<div class="about" >
		<div class="about-box" >			
			<h2>关于</h2>
			<h3>&gt;&gt;&gt;&gt;这是一个小网站&lt;&lt;&lt;&lt;</h3>
			<h3>请用手机浏览</h3>
			<h2>免责声明</h2>
			<h3>手机砸坏了不关我事喔~</h3>
			<h4>作者：ThreeSmallCats</h4>
			<h4>简历：<br><a href="https://tscats.cn/resume">https://tscats.cn/resume (请用电脑浏览)</a></h4>
			<h4>源码：<br><a href="https://github.com/ThreeSmallCats/Open-Your-Mind">——github源码——</a></h4>
		</div>
	</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      text: "home",
      startX: "",
      startY: "",
      endX: "",
      endY: "",
      distanceX: "",
      distanceY: ""
    };
  },
  computed: {},
  mounted() {},
  methods: {
    tStart(event) {
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    tEnd(event) {
      this.endX = event.changedTouches[0].clientX;
      this.endY = event.changedTouches[0].clientY;
      this.distanceX = this.startX - this.endX;
      this.distanceY = this.startY - this.endY;
      if (Math.abs(this.distanceX) > Math.abs(this.distanceY)) {
        if (this.distanceX > 20) {
          this.left();
        } else if (this.distanceX < -20) {
          this.right();
        }
      }
    },
    left() {
      this.$router.replace({ path: "/happy" });
    },
    right() {
      this.$router.replace({ path: "/guess" });
    }
  }
};
</script>
<style scoped lang='less'>
@import "../basestyle/style.less";
.about-all {
  position: absolute;
  height: 100%;
  top: 50px;
  width: 100%;

  .about {
    position: absolute;
    text-align: center;
    width: 100%;
    .about-box {
      display: inline-block;
      width: 95%;
      background-color: White;
      border-radius: 10px;
      margin-top: 30px;
      padding: 20px 0;
      box-shadow: 0 0 100px 0 black;
      h2 {
        font-size: 30px;
      }
      h3 {
        font-size: 22px;
      }
      h4 {
        font-size: 20px;
      }
    }
  }
}
</style>