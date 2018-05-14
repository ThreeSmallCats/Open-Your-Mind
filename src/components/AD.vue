<template>
	<div class='ad'>
		<div class='OYM' ref='OYM'>
			<div>
				open
			</div>
			<div>
				Y
			</div>
			<div>
				Mind
			</div>
		</div>
	</div>
</template>
<script>
export default {
  date() {
    return {};
  },
  methods: {
    getHeight() {
      this.height =
        document.documentElement.clientHeight || document.body.clientHeight;
    },
    getWidth() {
      this.width =
        document.documentElement.clientWidth || document.body.clientWidth;
    },
    getOYMHeight() {
      this.OYMHeight = this.$refs.OYM.offsetHeight;
    },
    setOYMTextFontSize() {
      this.$refs.OYM.style.fontSize = Math.ceil(this.width / 6) + "px";
    },
    setADPaddingTop() {
      this.$refs.OYM.parentNode.style.paddingTop =
        this.height / 2 - this.OYMHeight / 2 + "px";
    }
  },
  mounted: function() {
    let that = this;
    this.setOYMTextFontSize();
  },
  created() {
    this.getHeight();
    this.getWidth();
    this.$nextTick(() => {
      this.getOYMHeight();
      this.setADPaddingTop();
    });
    // 没有必要监听因为只显示一次
    // window.addEventListener('resize',() =>{
    // 	this.getHeight();
    // 	this.getWidth();
    // 	this.setAll()
    // })
  }
};
</script>

<style scoped lang='less'>
@import "../basestyle/style.less";
.ad {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: @baseWhite;
  text-align: center;
  z-index: 100;
  .OYM {
    display: inline-block;
    div {
      text-align: center;
    }
  }
}
</style>