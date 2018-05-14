<template>
<div class="guess-all" ref="guessAll"  >

	<div class='guess-big-box' ref='big'>
		<div class='wrap' ref='wrap' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)' >
			<div class='guess-box' ref="box" :data-Id='item.id' v-for='item in typeId' @click='idBus(item.id,item.name)' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
				{{item.name}}
			</div>
		</div>
	<transition name='go-to-showguess'>
		<router-view></router-view>
	</transition>
	</div> 
</div>
</template>
<script>
import { getGuessType } from "jsonps/jsonps";
import BScroll from "better-scroll";
import { pages } from "api/page";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      typeId: [],
      id: "",
      idText: "",
      page: "",
      guessMax: "",
      startX: "",
      startY: "",
      endX: "",
      endY: "",
      distanceX: "",
      distanceY: ""
    };
  },
  methods: {
    ...mapMutations({
      setId: "SET_ID",
      setIdText: "SET_IDTEXT",
      setPage: "SET_PAGE",
      setGuessMax: "SET_GUESSMAX"
    }),
    idBus(id, name) {
      this.page = pages(id).oldpage;
      this.guessMax = pages(id).max;
      this.setId(id);
      this.setIdText(name);
      this.setPage(this.page);
      this.setGuessMax(this.guessMax);
      this.$router.push({ path: "/guess/showGuess" });
    },
    refreshGuessBox() {
      this.width = this.$refs.box[0].offsetWidth;
      let length = this.$refs.box.length;
      let arr = this.$refs.box;
      for (let i = 0; i < length; i++) {
        arr[i].style.height = this.width + "px";
        arr[i].style.lineHeight = this.width + "px";
        arr[i].style.fontSize = this.width / 6 + "px";
      }
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
          console.log("left go");
          this.left();
        } else if (this.distanceX < -20) {
          console.log("right go");
          this.right();
        }
      }
    },
    left() {
      this.$router.replace({ path: "/about" });
    },
    right() {
      this.$router.replace({ path: "/happy" });
    }
  },
  created() {
    getGuessType().then(res => {
      this.typeId = res.showapi_res_body.typeList;
      this.$nextTick(() => {
        this.refreshGuessBox();
      });
    });
  },
  mounted() {
    let guessBigBox = document.querySelector(".guess-big-box");
    this.scroll = new BScroll(guessBigBox, {
      click: true
    });
    let that = this;
    this.height =
      document.documentElement.clientHeight || document.body.clientHeight;
    this.$refs.big.style.height = this.height - 51 + "px";
    window.addEventListener("resize", function() {
      that.scroll.refresh();
      that.refreshGuessBox();
      that.height =
        document.documentElement.clientHeight || document.body.clientHeight;

      that.$refs.big.style.height = that.height - 51 + "px";
    });
  },
  beforeDestroy() {
    // 解决第一次点击无效解决方案
    // 可以用两页面的生命周期看出来原因
    // 将事件写在销毁前是因为，要在showGuess页面先生成监听，然后再触发事件，不然会在第一次的点击会无效
    // let msg = {
    // 	id : this.id,
    // 	idText : this.idText
    // }
    // console.log('组1销毁且发送参数')
    // Bus.$emit('idBuss',msg)
  }
};
</script>
<style scoped lang='less'>
@import "../basestyle/style.less";
.go-to-showguess-enter,
.go-to-showguess-leave-to {
  transform: translateX(100%);
}
.go-to-showguess-enter-active,
.go-to-showguess-leave-active {
  transition: all 0.5s;
}
.guess-all {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50px;
  z-index: 1;
  .guess-big-box {
    position: absolute;
    text-align: center;
    overflow: hidden;
    width: 100%;
    margin-top: 5px;
    .guess-box {
      box-sizing: border-box;
      display: inline-block;
      margin: 5px;
      width: 46%;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 5px 0 black;
    }
  }
}
</style>