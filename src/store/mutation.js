import * as type from './mutationType'
let mutation = {
	[type.SET_ID](state,id){
		state.id = id
	},
	[type.SET_IDTEXT](state,idText){
		state.idText = idText
	},
	[type.SET_PAGE](state,page){
		state.page = page
	},
	[type.SET_GUESSTEXT](state,guessText){
		state.guessText = guessText
	},
	[type.SET_GUESSANSWER](state,guessAnswer){
		state.guessAnswer = guessAnswer
	},
	[type.SET_GUESSMAX](state,guessMax){
		state.guessMax = guessMax
	},
	[type.SET_HAPPYTEXT](state,happyText){
		state.happyText = happyText
	},
	[type.SET_HAPPYANSWER](state,happyAnswer){
		state.happyAnswer = happyAnswer
	}
	
}
export default mutation