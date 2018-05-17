export function pages(type){
		let obj = types(type)
		let max = obj.max
		let multiple = obj.multiple
		let oldpage = parseInt(Math.random()*multiple)
		if (oldpage === 0) {
			oldpage = 1
		}
		return two(oldpage,max)
	}


function two(oldpage,max){
	if (oldpage<=max) {
		return {oldpage,max}
	}else{
		oldpage = parseInt(oldpage/2)
		return two(oldpage,max)
	}
}

function types (type){
	switch(type){
		case 'gxmy' : return {max : 49 , multiple : 100};
		case 'zmmy' : return {max : 206 , multiple : 1000};
		case 'cymy' : return {max : 107 , multiple : 1000};
		case 'dwmy' : return {max : 75 , multiple : 100};
		case 'aqmy' : return {max : 20 , multiple : 100};
		case 'dmmy' : return {max : 105 , multiple : 1000};
		case 'rmmy' : return {max : 61 , multiple : 100};
		case 'dimmy' : return {max : 8 , multiple : 10};
		case 'cy' : return {max : 68 , multiple : 100};
		case 'dgmy' : return {max : 56 , multiple : 100};
		case 'ry' : return {max : 34 , multiple : 100};
		case 'etmy' : return {max : 0 , multiple : 0};
		case 'wpmy' : return {max : 58 , multiple : 100};
		case 'zwmy' : return {max : 55 , multiple : 100};
		case 'jmmy' : return {max : 60 , multiple : 100};
		case 'sbmy' : return {max : 41 , multiple : 100};
		case 'symy' : return {max : 45 , multiple : 100};
		case 'ypmy' : return {max : 31 , multiple : 100};
		case 'yymy' : return {max : 22 , multiple : 100};
		case 'ysmy' : return {max : 27 , multiple : 100};
		case 'cwmy' : return {max : 49 , multiple : 100};
		case 'qtmy' : return {max : 46 , multiple : 100};
		case 'miyujingxuan' : return {max : 0 , multiple : 0};
		case 'njmy' : return {max : 46 , multiple : 100};
		case 'zlmy' : return {max : 44 , multiple : 100};
		case '图片' : return {max : 16 , multiple : 100};
		case '笑话' : return {max : 469 , multiple : 1000};
	}
}
