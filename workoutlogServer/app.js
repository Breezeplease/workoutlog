var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var sequelize = require('./db.js')
var User = sequelize.import(__dirname + '\\models\\user.js')


User.sync()
//*** below deletes the user table when enabled and top disabled.
// User.sync({force:true})
//*** 

app.use(bodyParser.json())
app.use(require('./middleware/header')) // draws from created node
app.use('/api/user', require('./routes/user'))
app.use('/api/test', function(req, res){
  res.send('Hello World')
})

app.listen(3000, function(){
  console.log("app is open on 3000")
})
