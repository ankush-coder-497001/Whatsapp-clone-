import { BsEmojiGrin } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { LuSend } from "react-icons/lu";
import { IoMdCloseCircle } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from "react";
import { MYcontext } from "../ContextProvider";
import axios from 'axios'
import MyChat from "./mychat";
import UserChat from "./UserChat";




const Chatting = ({person,ActiveUser})=>{
  const chat = useRef()
  const{connection} = useContext(MYcontext)
const [conversation , setconversation] = useState({})
  const {setperson} = useContext(MYcontext);
  const [message,setmessage] = useState()
  const[MyConversation,setMyConversation] = useState([])
const[response,setresponse] = useState()
const[mydata,setmydata] = useState({})
const [file,setfile] = useState()
const [fileURL,setfileURL] = useState("")
const scroll = useRef()
const {socket} = useContext(MYcontext);
const {setlatest} = useContext(MYcontext);
const {latest} = useContext(MYcontext);
const [socketMessage,setsocketMessage] = useState()

const fetchMydata = ()=>{
const data = JSON.parse(localStorage.getItem("MYDATA"))
setmydata(data)
}


//finding converstion...
useEffect(()=>{
  fetchMydata()
axios.post('http://localhost:9001/Chat/FindConversation',{senderID:mydata?.sub,receaverID:person.sub}).then((res)=>{
  setconversation(res.data)
})

},[person,connection])

  const closeChatBar = ()=>{
    setperson({})
  }

//message creation .....

const sendmessage=  ()=>{
  let messageObj={}
  if(!file){
   messageObj = {
     text:message,
     type:"text",
     senderID:mydata.sub,
     receaverID:person.sub,
     ConversationID:conversation?._id
    }
  }else{
    messageObj =  {
      text:fileURL.data,
      type:"file",
      senderID:mydata.sub,
      receaverID:person.sub,
      ConversationID:conversation?._id
     }
  }

  socket.current.emit('sendmessage',messageObj)

   axios.post('http://localhost:9001/message/createMessage',messageObj).then((res)=>{
    setresponse(res)
  })
  chat.current.value=""
  setlatest(!latest)
}

//converstion creation .....

useEffect(()=>{
  try {
    axios.get(`http://localhost:9001/message/findMyConversation/${conversation?._id}`).then(res=>setMyConversation(res.data))
  } catch (error) {
    console.log(error)
  }
},[conversation,response])

//files sending  handling................

const handleFile=(e)=>{
chat.current.value=e.target.files[0].name
setfile(e.target.files[0])
}

useEffect(()=>{
try {
  const data = new FormData()
  data.append('name',file.name);
  data.append('file',file)
  axios.post('http://localhost:9001/Upload/uploadFile',data).then((res)=>setfileURL(res))
} catch (error) {
  console.log(error)
}
},[file])

//scroll 

useEffect(()=>{
scroll.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
},[MyConversation])

//get message from socket .io

useEffect(()=>{
socket.current.on('getMessage',(data)=>{
  setsocketMessage({
    ...data,
    createdAt:Date.now()
  })
})
},[])
useEffect(()=>{
socketMessage && conversation?.members?.includes(socketMessage.senderID) && 
setMyConversation(prev=>[...prev,socketMessage])

},[socketMessage,conversation])

//notification

useEffect(()=>{
  Notification.requestPermission();
socketMessage && new Notification('New Message',{
  body:socketMessage?.text
})
},[socketMessage,conversation])

  return(
    <>
      <div className="w-[75%] top-0 h-full absolute flex flex-col">
        <div className="flex items-center justify-between p-4 bg-[#202c33]">
          <div className="flex items-center gap-4">
          <img class={`aspect-square rounded-full object-cover cursor-pointer`}  height={40} width={40}  src={person.picture}/>
            <div>
              <div className="font-bold">{person.name}</div>
              <div className="status">{ActiveUser?.find(user=>user.sub===person.sub) ? 'online' : 'offline'}</div>
            </div>
          </div>
     <div className="close cursor-pointer" onClick={closeChatBar}>
     <IoMdCloseCircle style={{height:'25px',width:'25px'}} />

     </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-[#0b141a]">
          <div className="space-y-4">
            {MyConversation.map((item)=>(
              <MyChat scroll = {scroll}  key={item._id} item={item} />
            ))}
         
          </div>
        </div>
        <div className="p-4 flex gap-10	 bg-[#202c33]">
          <div className="emoji  cursor-pointer" >
        <BsEmojiGrin style={{height:'25px',width:'25px'}} />
          </div>
          <div className="attchment  cursor-pointer">
            <label htmlFor="fileInput">
        <ImAttachment class="cursor-pointer" style={{height:'25px',width:'25px'}} />
        <input onChange={(e)=>{handleFile(e)}} type="file" id="fileInput" class="hidden" />
            </label>
          </div>
          <input ref={chat} onChange={e=>{setmessage(e.target.value)}} type="text"   placeholder="Type a message" className="w-[80%] h-10   rounded-lg bg-[#2a3942] border-none text-white" />
          <div className="send cursor-pointer">
          <LuSend onClick={sendmessage} style={{height:'25px',width:'25px'}} />
          </div>

        </div>
      </div>
    </>
  )
}

export default Chatting;