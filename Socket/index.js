const {Server} = require('socket.io')

const io = new Server(7001,{
  cors: {
    origin:'http://localhost:5173'
  }
})

let AllUser = []

io.on('connection',(socket)=>{
  const socketId = socket.id

  socket.on('adduser',(userdata)=>{
   !AllUser.some(user=>user?.sub==userdata?.sub) && AllUser.push({...userdata,socketId})
   io.emit('getallUser',AllUser)
  })
  socket.on('disconnect',()=>{
    AllUser = AllUser.filter(user=>user.socketId!=socketId);
  })
  socket.on('sendmessage',(data)=>{
    const user = getUser(data) 
    io.to(user?.socketId).emit('getMessage',data)
  })
})

const getUser = (data)=>{
 return AllUser.find(user=>user.sub=== data.receaverID)
}