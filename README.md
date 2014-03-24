# cheeto

1. returns and or validates top level domains
2. command line utility that lists and filters [icann.org](http://data.iana.org/TLD/tlds-alpha-by-domain.txt) tlds alphabetically

![](./cheetos-pusheen.gif?raw=true)


# installation

    npm install cheeto

# usage

```javascript
var tld = require('./cheeto').tld() 
console.log(tld.get('http://npmjs.org')) // org
console.log(tld.isValid('http://nodeschool.io')) // true
console.log(tld.isValid(['is','http://nodejs.org','http://beepboop.net','cropdust'])) // [1,1,1,0]
```

# command line

    cheeto list 
![](./images/cheeto-list-a.png?raw=true)
.
.
.
![](./images/cheeto-list-z.png?raw=true)
