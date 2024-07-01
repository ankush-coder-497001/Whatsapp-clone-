const express = require('express')
const router  = express.Router()
const upload = require('../multer')

const url = 'http://localhost:9001'
let filename ;
router.post('/uploadFile',upload.single('file'),async (req,res)=>{
  try {
    if(!req.file){
      return res.status(404).json('file not found')
    }
    filename = req.file.filename;
    return res.status(200).json(`${url}/file/${req.file.filename}`)
  } catch (error) {
    res.status(500).json(error.message)
  }


})


module.exports =router