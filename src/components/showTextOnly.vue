<template>
	<div class="answer-box"  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
		<div class="back-box" @click='back'>
			<div class='back' ></div>
		</div>
		<div class="title">
			{{title}}
		</div>
		<div class="item" ref='top'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
			<div class='item-box' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)' >
				<div class='text' v-html='text' v-if='show'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
					
				</div>
				<div class="pic"  ref='pic' v-else v-show='title'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
					<img :src="text" alt="" ref='max'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
				</div>
			</div>
			<div class='none' v-if='!text'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
				<div class='item'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
					让您失望了~~~~<br>
					这里什么都<br>没有~<br>请返回-_-!
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      answer: "",
      title: "",
      text: "",
      show: false,
      url: "",
      startX: "",
      startY: "",
      endX: "",
      endY: "",
      distanceX: "",
      distanceY: ""
    };
  },
  methods: {
    back() {
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
          return;
        } else if (this.distanceX < -20) {
          this.right();
        }
      }
    },
    right() {
      this.$router.replace({ path: "/happy/showText" });
    }
  },
  computed: {
    ...mapGetters(["getHappyAnswer", "getHappyText"])
  },
  created() {
    this.title = this.getHappyText;
    this.text = this.getHappyAnswer;

    let that = this;
    this.$nextTick(() => {
      this.width =
        document.documentElement.clientWidth || document.body.clientWidth;
      this.$refs.top.style.fontSize = this.width / 18 + "px";
      window.addEventListener("resize", function() {
        that.width =
          document.documentElement.clientWidth || document.body.clientWidth;
        that.$refs.top.style.fontSize = that.width / 18 + "px";
      });
    });
  },
  mounted() {
    this.$nextTick(() => {
      if (this.title === "图片") {
        this.show = false;
        this.$refs.top.style.top = 50 + "px";
      } else if (this.title === "笑话") {
        this.show = true;
        this.$refs.top.style.overflow = "visible";
      }
      let scroll = new BScroll(this.$refs.top, {});
      this.height =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.$refs.top.style.height = this.height - 45 + "px";
    });
  },
  beforeDestroy() {}
};
</script>
<style scoped lang='less'>
@import "../basestyle/style.less";
.show-enter,
.show-leave-to {
  opacity: 0;
}
.show-enter-active,
.show-leave-active {
  transition: all 0.5s;
}
.answer-box {
  .posa;
  background-color: @baseGray;
  overflow: hidden;
  .back-box {
    position: absolute;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    top: 5px;
    left: 20px;
    border: 10px solid transparent;
    z-index: 15;
    .back {
      display: inline-block;
      background-color: red;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
  .title {
    text-align: center;
    padding: 5px;
    background: #008cff;
    height: 40px;
    font-size: 20px;
    line-height: 50px;
  }
  .item {
    position: absolute;
    top: 150px;
    text-align: center;
    width: 100%;
    .item-box {
      .text {
        box-sizing: border-box;
        text-align: center;
        display: inline-block;
        width: 95%;
        padding: 30px 10px;
        background-color: white;
        border-radius: 10px;
        margin: 5px 5px;
        box-shadow: 0 0 100px 1px black;
      }
      .pic {
        box-sizing: border-box;
        text-align: center;
        display: inline-block;
        width: 95%;
        padding: 10px 10px;
        background-color: white;
        border-radius: 10px;
        margin: 5px 5px;
        font-size: 20px;
        box-shadow: 0 0 100px 1px black;
        img {
          width: 100%;
        }
      }
    }
    .none {
      width: 100%;
      background-color: white;

      .item {
        box-sizing: border-box;
        border: 5px solid @baseGray;
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        background-color: white;
      }
    }
  }
}
</style>