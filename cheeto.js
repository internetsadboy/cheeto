#! /usr/bin/env node

var tlds = require('fs').readFileSync('./tlds.txt', 'utf8').split('\n')
	, tlds_url = 'http://data.iana.org/TLD/tlds-alpha-by-domain.txt'
	, parse = require('url').parse
	, request = require('request')
	, fs = require('fs')

if(process.argv[2] === 'update') {
	var tld = new tld()
	tld.update()
}

function tld() {
	if(!(this instanceof tld)) return new tld()
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
			var numTlds = body.length - 1
			body = body.join('\n')
			fs.writeFile('tlds.txt', body.toLowerCase(), function(err) {
				if(err) throw err
				console.log('tlds.txt updated')
				console.log(numTlds+' tlds')
			})
		})
	}
}

exports.tld = tld