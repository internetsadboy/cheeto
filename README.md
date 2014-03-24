# cheeto

1. returns and or validates top level domains
2. command line utility that lists and filters [icann.org](http://data.iana.org/TLD/tlds-alpha-by-domain.txt) tlds alphabetically

![](./images/cheetos-pusheen.gif?raw=true)


# installation

    npm install cheeto

# usage

```javascript
var cheeto = require('./cheeto').cheeto() 
console.log(cheeto.get('http://npmjs.org')) // org
console.log(cheeto.isValid('http://nodeschool.io')) // true
console.log(cheeto.isValid(['is','http://heroku.com','http://ghost.net','cropdust'])) // [1,1,1,0]
```

# command line
<code>cheeto list</code> will **return** all [icann.org](http://data.iana.org/TLD/tlds-alpha-by-domain.txt) recognized **tlds**

<code>cheeto char</code> will **return** all tlds that *start* with **char** -- e.g. <code>char d</code> returns all tlds that start with 'd'

<code>cheeto update</code> will **crawl** [icann.org](http://data.iana.org/TLD/tlds-alpha-by-domain.txt) and **add** any *new* tlds. It also **logs** some relevant data to the console.
