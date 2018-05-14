<template>
  <div id="app">
  	<transition name='show'>
	<a-d v-if='show'></a-d> 
	</transition>
	<top-nav></top-nav>
	<transition name='home'>
		<router-view></router-view>
	</transition>
  </div>
</template>

<script>
import AD from 'components/AD'
import topNav from 'components/topNav'
export default {
	data(){
		return {
			show:true
		}
	},
	methods:{
		
	},
	mounted(){

			let that = this
			setTimeout(function(){
				return that.show = false
			},2000)
		
	},
	components : {
		AD,
		topNav,
	}
}
</script>

<style  scoped lang='less'>
@import "basestyle/style.less";
.home-enter,.home-leave-to{
	transform:translateX(100%)
}
.home-enter-active,.home-leave-active{
	transition : all 0.5s;
}
	.show-enter,.show-leave-to{
		opacity: 0;
	}
	.show-enter-active,.show-leave-active{
		transition: all 1s;
	}
	#app{
		.posa;
		background-color: @baseGray;
		overflow: hidden;
	}
</style>
                                                  