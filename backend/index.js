const express = require('express')
const app = express()
const http = require('http')
const MainServer = http.createServer(app)
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser')
const DataBase = require('./DataBase')
const UserRouter = require('./Routs/UserRouter')
const ConversationRouter = require('./Routs/Conver')
const MessageRouter = require('./Routs/MessageRoute')
const UploadRoute = require('./Routs/upload')
const path = require('path')
const fs = require('fs')


app.use(bodyParser.json())
app.use(cors())
app.use('/User',UserRouter)
app.use('/Chat',ConversationRouter)
app.use('/message',MessageRouter)
app.use('/Upload',UploadRoute)


app.use(express.static('public'));

// Route to display the file or image based on the parameter
app.get('/file/:name', (req, res) => {
    const fileName = req.params.name;
    const filePath = path.join(__dirname, 'public', fileName);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});




const port = process.env.PORT || 9000
MainServer.listen(port,()=>{console.log(`server is running on port ${port}`)})