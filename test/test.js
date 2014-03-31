var cheeto = require('../cheeto').cheeto()
var test = require('tape')

test('cheeto tlds', function(t) {
  t.plan(4)
  t.deepEqual(cheeto.get('http://npmjs.org'), 'org')
  t.deepEqual(cheeto.isValid('http://nodeschool.io'), true)
  t.deepEqual(cheeto.isValid('ghost'), false)
  t.deepEqual(cheeto.isValid(['is','http://heroku.com','http://beepboop.net','cropdust']), [1,1,1,0])
})
