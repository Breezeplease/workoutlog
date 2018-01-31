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

var User = sequelize.import('./models/user.js')

module.exports=sequelize