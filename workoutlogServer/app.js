var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(require('./middleware/header')) // draws from created node

app.use('/api/test', function(req, res){
  res.send('Hello World')
})

app.listen(3000, function(){
  console.log("app is open on 3000")
})

var Sequelize = require('sequelize')
var sequelize = new Sequelize('workoutlog', 'postgres', 'Cackler22', {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize.authenticate().then(
  function() {
    console.log('connected to workoutlog postgres database')
  },
  function(err){
    console.log(err)
  }
)


//build a user model in sequelize
var User = sequelize.define('user', {
      username: Sequelize.STRING,
      passwordhash: Sequelize.STRING,
})
User.sync()
//*** below deletes the user table when enabled and top disabled.
// User.sync({force:true})
//*** 
app.use(bodyParser.json())

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
