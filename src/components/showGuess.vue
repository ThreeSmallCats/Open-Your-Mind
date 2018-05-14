<template>
	<div class='show-guess' ref='showGuess'>
		<div class='guess-list-box'  ref='guessListBox'>	
			<div class='guess-list' v-if='guessList.length>0' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)' >
				<div class="list" v-for='item in guessList' @click='answers(item.title,item.answer)' @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
					{{item.title}}
				</div>
				<div class='more' @click.self='more' ref='more'>
					more
				</div>
			</div>
			<loading @showLoad='showLoad' v-else v-show='show'></loading>
			<div class='none' v-if='!show'  @touchstart.self='tStart($event)' @touchend.self='tEnd($event)'>
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
			{{idText}}
		</div>
	<transition name='go-to-only'>		
	<router-view></router-view>	
	</transition>
	</div>
</template>
<script>
import { getGuess } from "jsonps/jsonps";
import BScroll from "better-scroll";
import loading from "./loading";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      startX: "",
      startY: "",
      endX: "",
      endY: "",
      distanceX: "",
      distanceY: "",
      id: "",
      arrGuess: [],
      page: 1,
      guessList: [],
      idText: "",
      title: "",
      answer: "",
      show: 1,
      moreArr: [
        "哈哈哈~",
        "天真，还以为真有啊",
        "你又点啊，没有啦",
        "呵呵呵~~",
        "好吧~你点多5下就可以了",
        "5",
        "4",
        "3",
        "2",
        "1",
        "厉害 -_-!  你还真点啊",
        "好吧~你点多一下我就告诉你方法",
        "既然你诚心诚意的点了",
        "我们就大发慈悲的告诉你",
        "为了防止世界被破坏",
        "为了守护世界的和平",
        "贯彻爱与真实的邪恶",
        "可爱又迷人的正派角色",
        "Three！",
        "Small！",
        "Cats！",
        "我们是穿梭在银河中的xxx队",
        "白洞、白色的明天正等著我们！",
        "就是这样喵！"
      ],
      index: 0
    };
  },
  components: {
    loading
  },
  computed: {
    ...mapGetters(["getId", "getIdText", "getPage"])
  },
  methods: {
    ...mapMutations({
      setGuessText: "SET_GUESSTEXT",
      setGuessAnswer: "SET_GUESSANSWER"
    }),
    back() {
      this.$router.push({ path: "/guess" });
    },
    answers(title, answer) {
      this.setGuessText(title);
      this.setGuessAnswer(answer);

      this.$router.push({ path: "/guess/showGuess/showGuessOnly" });
    },
    showLoad(num) {
      this.show = num;
    },
    more() {
      let con = this.moreArr[this.index];
      if (this.index >= 23) {
        this.index = 23;
        this.$refs.more.innerText = con;
      } else {
        this.index = this.index + 1;
        this.$refs.more.innerText = con;
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
          return;
        } else if (this.distanceX < -20) {
          this.right();
        }
      }
    },
    right() {
      this.$router.replace({ path: "/guess" });
    }
  },
  created() {
    this.id = this.getId;
    this.idText = this.getIdText;
    this.page = this.getPage;
    getGuess(this.id, this.page).then(res => {
      this.guessList = res.showapi_res_body.pb.contentlist;
      this.$nextTick(() => {
        let guessListBox = this.$refs.guessListBox;
        this.scroll = new BScroll(guessListBox, {});
        this.height =
          document.documentElement.clientHeight || document.body.clientHeight;
        this.width =
          document.documentElement.clientWidth || document.body.clientWidth;
        this.$refs.guessListBox.style.fontSize = this.width / 18 + "px";
        this.$refs.guessListBox.style.height = this.height - 45 + "px";
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
      that.$refs.guessListBox.style.fontSize = that.width / 18 + "px";
      that.$refs.guessListBox.style.height = that.height - 45 + "px";
    });
  },
  beforeDestroy() {
    // let msg = {
    // 	title : this.title,
    // 	answer : this.answer
    // }
    // Bus.$emit('answer',msg)
    // // 解决多次点击后会发生多次返回结果
    // // 解决方案1
    // // 因为事件监听不会因为组件销毁而销毁，需要手动销毁
    // // 方案2
    // // 用$once而不用$on，前者是只监听一次后销毁监听
    // Bus.$off('idBuss')
  }
};
</script>
<style scoped lang='less'>
@import "../basestyle/style.less";
.go-to-only-enter,
.go-to-only-leave-to {
  transform: translateX(100%);
}
.go-to-only-enter-active,
.go-to-only-leave-active {
  transition: all 0.5s;
}
.show-guess {
  .posf;
  background-color: @baseGray;
  z-index: 2;
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
  .guess-list-box {
    position: absolute;
    top: 50px;
    width: 100%;
    overflow: hidden;
    .guess-list {
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
        // font-size:20px;
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