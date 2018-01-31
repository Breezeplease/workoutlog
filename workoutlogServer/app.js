var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var sequelize = require('./db.js')
var User = sequelize.import('./models/user.js')

User.sync()
//*** below deletes the user table when enabled and top disabled.
// User.sync({force:true})
//*** 

app.use(bodyParser.json())

app.use(require('./middleware/header')) // draws from created node

app.use('/api/test', function(req, res){
  res.send('Hello World')
})

app.listen(3000, function(){
  console.log("app is open on 3000")
})

app.post('/api/user', function(req, res) {
  var user = req.body.user.username
  var pass = req.body.user.password //HASH = unreadable
  //Need to create a user object and use sequelize to put that user into our database.
  User.create({
    username: user,
    passwordhash: ""
  }).then(
    //Sequelize is going to return the object it created from database.
    function createSuccess(user){
      res.json({
        user: user,
        message: 'create'
      })
    },
    function createError(err){
      res.send(500, err.message)
    }
  )
})
