const express =require('express')
const Conversation = require('../Modals/Conversation')
const router  = express.Router()

router.post('/createConver',async (req,res)=>{
  try {
    const senderID = req.body.senderID
    const receaverID = req.body.receaverID

    const exist = await Conversation.findOne({members:{$all:[senderID,receaverID]}})
    if(exist){
      return res.status(200).json(exist)
    }

    const newConversation = new Conversation({
      members:[senderID,receaverID]
    })
    await newConversation.save()
    res.status(200).json(newConversation)
    
  } catch (error) {
    console.log(error.message)
  }
})

router.post('/FindConversation',async (req,res)=>{
  try {
    const senderID = req.body.senderID
    const receaverID = req.body.receaverID
    const conver = await Conversation.findOne({members:{$all:[senderID,receaverID]}})
    res.status(200).json(conver)
  } catch (error) {
    console.log(error.message)
    
  }
})

module.exports=router;