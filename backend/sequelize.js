const Sequelize = require('sequelize')
const UserModel = require('./models/user') 

const sequelize = new Sequelize('rnstack', 'rnstack', 'rnstack', {
  host: process.env.DB_URL,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
}