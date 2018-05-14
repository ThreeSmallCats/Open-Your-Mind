<template>
	<div class="answer-box" @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
		<div class="back-box" @click='back'>
			<div class='back' ></div>
		</div>
		<div class="title">
			{{title}}
		</div>
		<div class="item" ref='item' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
			<div class='text' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
				{{text}}
			</div>
			<div class="answer" ref='answer' @click='show = !show' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
				<transition name='show'>
				<div class='shadow' ref='shadow' v-show='show' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)' >
					点击
				</div>
				</transition>
				{{answer}}
			</div>
		</div>
		
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      answer: "",
      title: "",
      text: "",
      show: true,
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
      this.$router.push({ path: "/guess/showGuess" });
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
      this.$router.replace({ path: "/guess/showGuess" });
    }
  },
  computed: {
    ...mapGetters(["getGuessText", "getGuessAnswer", "getIdText"])
  },
  created() {
    this.answer = this.getGuessAnswer;
    this.text = this.getGuessText;
    this.title = this.getIdText;
    this.width =
      document.documentElement.clientWidth || document.body.clientWidth;
    this.$nextTick(() => {
      this.$refs.item.style.fontSize = this.width / 18 + "px";
      this.$refs.shadow.style.lineHeight =
        this.$refs.shadow.clientHeight + "px";
    });
  },
  mounted() {
    let that = this;
    window.addEventListener("resize", function() {
      that.width =
        document.documentElement.clientWidth || document.body.clientWidth;
      that.$refs.item.style.fontSize = that.width / 18 + "px";
      that.$refs.shadow.style.lineHeight =
        that.$refs.shadow.clientHeight + "px";
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
  .back-box {
    position: absolute;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    top: 5px;
    left: 20px;
    border: 10px solid transparent;
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
    .text {
      box-sizing: border-box;
      text-align: center;
      display: inline-block;
      width: 95%;
      padding: 30px 10px;
      background-color: white;
      border-radius: 10px;
      margin: 5px 5px;
      // font-size:20px;
      box-shadow: 0 0 100px 1px black;
    }
    .answer {
      position: relative;
      display: inline-block;
      width: 50%;
      background-color: red;
      padding: 10px;
      border-radius: 10px;
      margin-top: 100px;
      // font-size:20px;
      .shadow {
        .posa;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: black;
        color: white;
        box-shadow: 0 0 100px 1px black;
      }
    }
  }
}
</style>