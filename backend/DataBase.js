const mongoose = require('mongoose')
require('dotenv').config()
const DB = process.env.DATABASE
mongoose.connect(DB)

mongoose.connection.once('open',()=>{
  console.log('connected to database')
})


mongoose.connection.on('error',()=>{
  console.log('error connecting to database')
})

module.exports = mongoose;