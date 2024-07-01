const express = require('express')
const router = express.Router();
const UserModel = require('../Modals/UserModel.')

router.post('/Login',async (req,res)=>{
try {
  const sub = req.body.sub
const user = await UserModel.findOne({sub})
if(user){
  res.status(200).json(user)
  return;
}
const newuser = new UserModel(req.body)
await newuser.save();
res.status(200).json(newuser)  
} catch (error) {
  res.status(500).json(error.message);
}

})

//showuser

router.get('/showUser/:name',async (req,res)=>{
const name = req.params.name;
try {
  const exist = await UserModel.findOne({name})
  
} catch (error) {
  
}
})

// all user 

router.get('/alluser' , async (req,res)=>{
  try {
    const alluser = await UserModel.find()
    res.json(alluser)
  } catch (error) {
  res.status(500).json(error.message);
  }
})

module.exports = router;