const mongoose = require('mongoose')
const ConverSchema = new mongoose.Schema({
  members:{
    type:Array
  },
  LatestMessage:{
    type:String
  }
},
{
  timestamps:true
})

module.exports = mongoose.model('Conversation',ConverSchema);