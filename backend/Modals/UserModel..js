const mongoose = require('mongoose')
const UserSchema  = new mongoose.Schema({
email:{
  type:String,
  required:true,
},
name:{
type:String,
require:true
},
picture:{
type:String,
default:"https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
},
sub:{
  type:String,
  required:true
}
})

module.exports = mongoose.model('User' , UserSchema)