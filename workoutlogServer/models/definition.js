module.exports = function(sequelize, DataTypes) {
  //with define, the first argument represents a column in the db table
  return sequelize.define('definition',{
    description: DataTypes.STRING,
    logType: DataTypes.STRING,
    owner: DataTypes.INTEGER
  },{
    
  })
}