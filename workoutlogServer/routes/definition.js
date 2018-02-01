var router = require('express').Router()
var sequelize = require('../db')
var User = sequelize.import('../models/user.js')
var Definition = sequelize.import('../models/definition.js')

router.post('/', function(req, res){
  var desctription = req.body.definition.desc
  var logType = req.body.definition.type
  var owner = req.user.id

  Definition.create({
    desctription: desctription,
    logType: logType,
    owner: owner
  }).then(
    function createSuccess(definition){
      res.json({
        definition:definition
      })
    },
    function createError(err){
      res.send(500, err.message)
    }
  )
})

router.get('/', function(req, res) {
  var userid = req.user.id
  Definition
  .findAll({
    where:{owner: userid}
  })
  .then(
    //success
    function findAllSuccess(data){
      res.json(data)
    },
    //failure
    function findAllError(err){
      res.send(500, err.message)
    }
  )
})
module.exports = router