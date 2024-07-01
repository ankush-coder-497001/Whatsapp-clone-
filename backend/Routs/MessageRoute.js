const express = require('express')
const Message = require('../Modals/Message')
const Conversation = require('../Modals/Conversation')
const router = express.Router()

router.post("/createMessage",async (req,res)=>{
  try {
    const newMessage = new Message(req.body)
    await newMessage.save()
    await Conversation.findByIdAndUpdate(req.body.ConversationID,{LatestMessage:req.body.text})
    res.status(200).json('message created')
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.get('/findMyConversation/:id',async (req,res)=>{
  try {
    const Data = await Message.find({ConversationID:req.params.id})
    res.status(200).json(Data)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

module.exports = router