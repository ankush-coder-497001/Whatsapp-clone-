const multer = require('multer')
const path =require('path')
const {v4:uuidv4} = require('uuid')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    const uniqname = uuidv4()
    cb(null,uniqname+path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
module.exports =upload;