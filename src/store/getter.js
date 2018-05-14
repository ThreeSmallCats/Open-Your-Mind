
let getters = {
	getId : function(state){
		return state.id
	},
	getIdText : function(state){
		return state.idText
	},
	getPage : function(state){
		return state.page
	},
	getGuessText : function(state){
		return state.guessText
	},
	getGuessAnswer : function(state){
		return state.guessAnswer
	},
	getGuessMax :function(state){
		return state.guessMax
	},
	getHappyText : function(state){
		return state.happyText
	},
	getHappyAnswer : function(state){
		return state.happyAnswer
	}
}
export default getters