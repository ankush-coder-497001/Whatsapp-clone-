const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
  ConversationID:{
    type:String
  },
  receaverID:{
    type:String
  },
  senderID:{
    type:String
  },
  text:{
    type:String
  },
  type:{
    type:String
  }
},
{timestamps:true}
)

module.exports = mongoose.model('MESSAGE',MessageSchema);