exports.randomColor = function() {
	var color = ['yellow','white','cyan','magenta','red','green','blue','rainbow','black','greyBG','blackBG','yellowBG','redBG','greenBG','blueBG','cyanBG','magentaBG']
  return color[Math.floor((Math.random()*color.length))];
}
		
exports.abcColor = function(ch) {
	var abc = {
		'a':'magenta',
		'b':'yellow',
		'c':'green',
		'd':'yellowBG',
		'e':'white',
		'f':'cyan',
		'g':'blackBG',
		'h':'rainbow',
		'i':'green',
		'j':'redBG',
		'k':'cyanBG',
		'l':'rainbow',
		'm':'greenBG',
		'n':'magenta',
		'o':'white',
		'p':'black',
		'q':'yellowBG',
		'r':'cyan',
		's':'redBG',
		't':'blue',
		'u':'white',
		'v':'yellow',
		'w':'blackBG',
		'x':'green',
		'y':'greyBG',
		'z':'cyan'
	}
	return abc[ch]
}

