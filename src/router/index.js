import Vue from 'vue'
import Router from 'vue-router'
// import About from 'components/about'
// import Happy from 'components/happy'
// import Guess from 'components/guess'
// import ShowGuess from 'components/showGuess'
// import ShowGuessOnly from 'components/showGuessOnly'
// import ShowText from 'components/showText'
// import ShowTextOnly from 'components/showTextOnly'
Vue.use(Router)

const About = (resolve) =>{
	import('components/about').then((module)=>{
		resolve(module)
	})
}
const Happy = (resolve) =>{
	import('components/happy').then((module)=>{
		resolve(module)
	})
}
const Guess = (resolve) =>{
	import('components/guess').then((module)=>{
		resolve(module)
	})
}
const ShowGuess = (resolve) =>{
	import('components/showGuess').then((module)=>{
		resolve(module)
	})
}
const ShowGuessOnly = (resolve) =>{
	import('components/showGuessOnly').then((module)=>{
		resolve(module)
	})
}
const ShowText = (resolve) =>{
	import('components/showText').then((module)=>{
		resolve(module)
	})
}
const ShowTextOnly = (resolve) =>{
	import('components/showTextOnly').then((module)=>{
		resolve(module)
	})
}
export default new Router({
	mode:'history',
	routes:[
	{
		path:'/',
		redirect:'/about',
	},
	{
		path:'/about',
		component:About,
	},
	{
		path:'/happy',
		component:Happy,
		children:[
						{
							path : 'showText',
							component: ShowText,
							children:[
								{
									path:'showTextOnly',
									component:ShowTextOnly
								}
							]
						}
					]
	},
	{
		path:'/guess',
		component:Guess,
		children:[
			{
				path:'showGuess',
				component:ShowGuess,
				children:[
					{
						path : 'showGuessOnly',
						component: ShowGuessOnly
					}
						]
			}
		]
	},
	
	]
})
