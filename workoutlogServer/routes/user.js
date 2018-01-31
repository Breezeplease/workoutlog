var router = require('express').Router()
var sequelize = require('../db')
var User = sequelize.import('../models/user.js')

router.post('/api', function(req, res) {
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

module.exports = router