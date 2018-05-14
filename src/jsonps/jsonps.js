import jsonp from 'jsonp'

function ajax (url,success,err){
	let xml = new  XMLHttpRequest();
	xml.open('GET',url,true);
	xml.send()
	xml.onreadystatechange = function(){
		if (xml.readyState === 4 && xml.status === 200) {
			success(JSON.parse(xml.responseText))
		}else{
			err(JSON.parse(xml.responseText))
		}
	}
}
// 获取最新笑话
export function getNewHappy(page,pagesize){
	let url = `http://v.juhe.cn/joke/content/text.php?page =${page}&pagesize=${pagesize}&key=f6b9f43c13ea23b565d571ac2d8047f1`
	return new Promise((reslove,reject)=>{
		jsonp(url,{},(err,data)=>{
			if (!err) {
				reslove(data)
			}else{
				reject(err)
			}
		})
	})
}

// 获取最新图片
export function getNewPic(page,pagesize){
	let url = `http://v.juhe.cn/joke/img/text.php?page =${page}&pagesize=${pagesize}&key=f6b9f43c13ea23b565d571ac2d8047f1`
	return new Promise((reslove,reject)=>{
		jsonp(url,{},(err,data)=>{
			if (!err) {
				reslove(data)
			}else{
				reject(err)
			}
		})
	})
}

// 获取随机笑话
export function getRandomHappy(){
	let url = `http://v.juhe.cn/joke/randJoke.php?key=f6b9f43c13ea23b565d571ac2d8047f1`
	return new Promise((reslove,reject)=>{
		jsonp(url,{},(err,data)=>{
			if (!err) {
				reslove(data)
			}else{
				reject(err)
			}
		})
	}) 
}

//..................分割线(以上先不用)...............................
// 获取谜语类型
export function getGuessType(){
	let url = `https://route.showapi.com/151-3?showapi_appid=61360&showapi_sign=6ca7f466876e4b7290013bbc30712583` 
	return new Promise((reslove,reject)=>{
		let xml = new  XMLHttpRequest();
		xml.open('GET',url,true);
		xml.send()
		xml.onreadystatechange = function(){
		if (xml.readyState === 4 && xml.status === 200) {
			reslove(JSON.parse(xml.responseText))
		}else if(xml.readyState === 4 && xml.status === 404){
			reject(err)
		}
	}		
	})
}

// 根据类型获取谜语
export function getGuess(typeId,page){
	let url = `https://route.showapi.com/151-4?showapi_appid=61360&showapi_sign=6ca7f466876e4b7290013bbc30712583&typeId=${typeId}&page=${page}`
	return new Promise((reslove,reject)=>{
		let xml = new  XMLHttpRequest();
		xml.open('GET',url,true);
		xml.send()
		xml.onreadystatechange = function(){
		if (xml.readyState === 4 && xml.status === 200) {
			reslove(JSON.parse(xml.responseText))
		}else if(xml.readyState === 4 && xml.status === 404){
			reject(err)
		}
	}
	})
}


// 获取随机谜语
export function getRandomGuess(){
	let url = ` https://route.showapi.com/151-2?showapi_appid=61360&showapi_sign=6ca7f466876e4b7290013bbc30712583`
	return new Promise((reslove,reject)=>{
		let xml = new  XMLHttpRequest();
		xml.open('GET',url,true);
		xml.send()
		xml.onreadystatechange = function(){
		if (xml.readyState === 4 && xml.status === 200) {
			reslove(JSON.parse(xml.responseText))
		}else if(xml.readyState === 4 && xml.status === 404){
			reject(err)
		}
	}
	})
}

// 获取笑话
export function getHappy(text,page){
	if (text === '笑话') {
		var url = `https://route.showapi.com/341-1?showapi_appid=61360&showapi_sign=6ca7f466876e4b7290013bbc30712583&page=${page}`
	}else if(text === '图片'){
		var url = `https://route.showapi.com/341-2?showapi_appid=61360&showapi_sign=6ca7f466876e4b7290013bbc30712583&page=${page}`
	}
	return new Promise((reslove,reject)=>{
			let xml = new XMLHttpRequest()
			xml.open('GET',url,true)
			xml.send()
			xml.onreadystatechange = function(){
				if (xml.readyState === 4 && xml.status === 200 ) {
					reslove(JSON.parse(xml.responseText))
				}else if(xml.readyState === 4 && xml.status === 404){
					reject(err)
				}
			}
		})
}