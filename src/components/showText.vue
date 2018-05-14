<template>
	<div class="showText">
		<div class='showText-box' ref='showTextBox' >
			<div class="showText-box-list" v-if='text.length>0'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
				<div class="list" v-for='(item,index) in text' @click='showTextOnly(index)' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)' >
					{{item.title}}
					
				</div>
				<div class='more' @click.self='more' ref='more'>
					more
				</div>
			</div>
			<loading @showLoad='showLoad' v-else v-show='hide'></loading>
			<div class='none' v-if='!hide'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
				<div class='item'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
					让您失望了~~~~<br>
					这里什么都<br>没有~<br>请返回-_-!
				</div>
			</div>
		</div>
		<div class="back-box" @click='back'>
			<div class='back' ></div>
		</div>
		<div class="title">
			{{happyText}}
		</div>
		<transition name='go-to-showTextOnly'>
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
import loading from "components/loading";
import { mapGetters, mapMutations } from "vuex";
import { pages } from "api/page";
import { getHappy } from "jsonps/jsonps";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      hide: 1,
      happyText: "",
      page: "",
      text: [],
      url: "",
      show: false,
      moreArr: [
        "我就知道你会点的",
        "首先听我讲个故事",
        "从前有座山",
        "山上有座庙",
        "庙里有个老和尚和一个小和尚",
        "有一天,老和尚对小和尚说",
        "从前有座山",
        "山上有座庙",
        "庙里有个老和尚和一个小和尚",
        "有一天,老和尚对小和尚说",
        "从前有座山",
        "山上有座庙",
        "庙里有个老和尚和一个小和尚",
        "有一天,老和尚对小和尚说",
        "从前有座山",
        "..........",
        "zzzzzz",
        "zzzzzz",
        "zzzzzz",
        "不要点啦~人家刚刚睡着呢—_—! ",
        "你说~你想干啥",
        "先保持冷静",
        "不要砸手机~它是无辜的",
        "你点多一下我就更新",
        "天真",
        "没有",
        "再见"
      ],
      index: 0
    };
  },
  computed: {
    ...mapGetters(["getHappyText"])
  },
  components: {
    loading
  },
  methods: {
    ...mapMutations({
      setHappyAnswer: "SET_HAPPYANSWER"
    }),
    back() {
      this.$router.push({ path: "/happy" });
    },
    showTextOnly(index) {
      if (this.text[index].text) {
        var happyAnswer = this.text[index].text;
      } else if (this.text[index].img) {
        var happyAnswer = this.text[index].img;
      }
      this.setHappyAnswer(happyAnswer);
      this.$router.push({ path: "/happy/showText/showTextOnly" });
    },
    more() {
      let con = this.moreArr[this.index];
      if (this.index >= 26) {
        this.index = 26;
        this.$refs.more.innerText = con;
      } else {
        this.index = this.index + 1;
        this.$refs.more.innerText = con;
      }
    },
    showLoad(num) {
      this.hide = num;
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
      this.$router.replace({ path: "/happy" });
    }
  },
  created() {
    this.happyText = this.getHappyText;
    this.page = pages(this.happyText).oldpage;
    getHappy(this.happyText, this.page).then(res => {
      this.text = res.showapi_res_body.contentlist;
      this.$nextTick(() => {
        let showTextBox = this.$refs.showTextBox;
        this.scroll = new BScroll(showTextBox, {
          click: true
        });
        this.width =
          document.documentElement.clientWidth || document.body.clientWidth;
        this.height =
          document.documentElement.clientHeight || document.body.clientHeight;
        this.$refs.showTextBox.style.fontSize = this.width / 18 + "px";
        this.$refs.showTextBox.style.height = this.height - 45 + "px";
      });
    });
  },
  mounted() {
    let that = this;
    window.addEventListener("resize", function() {
      that.scroll.refresh();
      that.width =
        document.documentElement.clientWidth || document.body.clientWidth;
      that.height =
        document.documentElement.clientHeight || document.body.clientHeight;
      that.$refs.showTextBox.style.fontSize = that.width / 18 + "px";
      that.$refs.showTextBox.style.height = that.height - 45 + "px";
    });
  }
};
</script>
<style scoped lang='less'>
@import "../basestyle/style.less";
.go-to-showTextOnly-enter,
.go-to-showTextOnly-leave-to {
  transform: translateX(100%);
}
.go-to-showTextOnly-enter-active,
.go-to-showTextOnly-leave-active {
  transition: all 0.5s;
}
.showText {
  .posf;
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
  .showText-box {
    position: absolute;
    top: 50px;
    width: 100%;
    overflow: hidden;
    .showText-box-list {
      text-align: center;
      padding: 10px 0 20px 0;
      .list {
        box-sizing: border-box;
        text-align: center;
        display: inline-block;
        width: 95%;
        padding: 10px 10px;
        background-color: white;
        border-radius: 10px;
        margin: 5px 5px;
        box-shadow: 0 0 5px 0 black;
      }
      .more {
        display: inline-block;
        width: 50%;
        background-color: red;
        padding: 10px;
        margin-top: 10px;
        border-radius: 10px;
      }
    }
    .none {
      margin-top: 10px;
      width: 100%;
      text-align: center;
      .item {
        display: inline-block;
        background-color: white;
        width: 95%;
        padding: 120px 0;
        font-size: 30px;
        border-radius: 10px;
      }
    }
  }
}
</style>