<template>
<div class="happy-all" ref='happyAll' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>

	<div class="happy" ref='happy'>
		<div class="happy-box" ref='box' @click='getHappyText(item.text)' v-for='item in happyContent' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
			{{item.text}}
		</div>
		<transition name='go-to-showText'>
			<router-view></router-view>
		</transition>
	</div>	
</div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      happy: [],
      pagesize: 20,
      page: 1,
      guess: {},
      happyContent: [{ text: "笑话" }, { text: "图片" }],
      startX: "",
      startY: "",
      endX: "",
      endY: "",
      distanceX: "",
      distanceY: ""
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.refreshHappy();
    let that = this;
    window.addEventListener("resize", function() {
      that.refreshHappy();
    });
  },
  methods: {
    ...mapMutations({
      setHappytext: "SET_HAPPYTEXT"
    }),
    refreshHappy() {
      this.width = this.$refs.box[0].offsetWidth;
      let length = this.$refs.box.length;
      let arr = this.$refs.box;
      for (let i = 0; i < length; i++) {
        arr[i].style.fontSize = this.width / 6 + "px";
        arr[i].style.height = this.width + "px";
        arr[i].style.lineHeight = this.width + "px";
      }
    },
    getHappyText(text) {
      this.setHappytext(text);
      this.$router.push({ path: "/happy/showText" });
    },
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
      this.$router.replace({ path: "/guess" });
    },
    right() {
      this.$router.replace({ path: "/about" });
    }
  },
  destroyed() {}
};
</script>
<style scoped lang='less'>
@import "../basestyle/style.less";
.go-to-showText-enter,
.go-to-showText-leave-to {
  transform: translateX(100%);
}
.go-to-showText-enter-active,
.go-to-showText-leave-active {
  transition: all 0.5s;
}
.happy-all {
  position: absolute;
  top: 50px;
  height: 100%;
  width: 100%;
  .happy {
    position: absolute;
    text-align: center;
    overflow: hidden;
    width: 100%;
    margin-top: 5px;
    .happy-box {
      box-sizing: border-box;
      display: inline-block;
      margin: 5px;
      width: 46%;
      background-color: white;
      border-radius: 10px;
      font-size: 30px;
      box-shadow: 0 0 5px 0 black;
    }
  }
}
</style>