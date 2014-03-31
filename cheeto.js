#! /usr/bin/env node

var tlds = require('fs').readFileSync(__dirname+'/tlds.txt', 'utf8').split('\n')
  , tlds_url = 'http://data.iana.org/TLD/tlds-alpha-by-domain.txt'
  , parse = require('url').parse
  , colors = require('colors')
  , request = require('request')
  , utils = require('./utils')
  , fs = require('fs')

// command line args handling
if(process.argv.length > 2) {
  var cheeto = new cheeto()
  if(process.argv[2] === 'update') {
    cheeto.update()
  } else if(process.argv[2] === 'list') {	
    cheeto.list()
  } else if(process.argv[2].length === 1) {
    cheeto.filter(process.argv[2]) 
  }
}

// cheeto constructor
// get returns tld of a url or [urls]
// isValid returns boolean that indicates if tld(s) exists
// update crawls icann.org and updates 'tlds.txt'
// list logs tlds to console (cssified)
// filter logs tlds that match the char arg
function cheeto() {
  if(!(this instanceof cheeto)) return new cheeto()
  this.get = function(url) {
    if(typeof url !== 'object') {
      return parse(url).host.split('.')[1]	
    } else {
      var results = []
      for(var i = 0; i < url.length; i++) {
        results[i] = ''
	if(!parse(url[i]).host) throw new Error('invalid url "'+url[i]+'"')
        var temp = parse(url[i]).host.split('.')[1]	
	for(var j in tlds) {
	  if(temp === tlds[j]) results[i] = temp
	}
      }
      return results
    }
  }
  this.isValid = function(url) {
    if(typeof url !== 'object') {
      if(parse(url).host) url = parse(url).host.split('.')[1]
      for(var i in tlds) {
	if(url === tlds[i]) return true
      }
      return false
    } else {
      var results = []
      for(var i = 0; i < url.length; i++) {
	results[i] = 0
	var temp 
	if(parse(url[i]).host) temp = parse(url[i]).host.split('.')[1]	
	else temp = url[i]
	for(var j in tlds) {
	  if(temp === tlds[j]) results[i] = 1
	}
      }
    }
    return results
  }
  this.update = function() {
    request(tlds_url, function(err, res, body) {
      if(err) throw err
      body = body.split('\n')
      body.pop()
      var numTlds = body.length - 1 // first element (non-tld)
      body = body.join('\n')
      fs.writeFile(__dirname+'/tlds.txt', body.toLowerCase(), function(err) {
	if(err) throw err
	console.log('file'.green+' '+'tlds.txt'.underline+' updated')
	console.log('tlds'.green+' '+numTlds)
	console.log('src'.green+'  '+tlds_url)
      })
    })
  }
  this.list = function() {
    var strm = fs.createReadStream(__dirname+'/tlds.txt')
    var tlds = ''
    strm.on('data', function(d) {
      tlds += d
    })
    strm.on('end', function() {
      tlds = tlds.split('\n')
      tlds.shift()
      for(var i in tlds) {
	if(tlds[i].charAt(0) !== 'y') {
	  tlds[i] = tlds[i][utils.abcColor(tlds[i].charAt(0))]	
	}
      }
      tlds = tlds.join('\n')
      console.log(tlds)
    })
  }
  this.filter = function(ch) {
    var results = []
    var clr = utils.randomColor()
    for(var i in tlds) {
      if(ch === tlds[i].charAt(0)) {
        results.push(tlds[i][clr])
      } 
    }
    console.log(results.join('\n'))
  }
}

exports.cheeto = cheeto