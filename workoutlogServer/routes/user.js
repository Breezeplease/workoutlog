var router = require('express').Router()
var sequelize = require('../db')
var User = sequelize.import('../models/user.js')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

router.post('/', function(req, res) {
  var user = req.body.user.username
  var pass = req.body.user.password //HASH = unreadable
  //Need to create a user object and use sequelize to put that user into our database.
  User.create({
    username: user,
    passwordhash: bcrypt.hashSync(pass, 10)
  }).then(
    //Sequelize is going to return the object it created from database.
    function createSuccess(user){
      var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
      res.json({
        user: user,
        message: 'created',
        sessionToken: token
      })
    },
    function createError(err){
      res.send(500, err.message)
    }
  )
})

module.exports = router