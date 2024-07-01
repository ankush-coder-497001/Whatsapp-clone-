import { useContext, useEffect, useState } from "react";
import { MYcontext } from "../ContextProvider";
import Profile from "./Profile";
import Person from "./PersonBar";
import axios from 'axios'
import Chatting from "./chatting";

const ChatPage = ()=>{
  const [text,settext] = useState("")
  const{person} = useContext(MYcontext)
  const {LoginUser} = useContext(MYcontext);
  const [showprofile,setshowprofile] = useState(false)
  const [alluser,setalluser] = useState([])
  const [MYdata,setMYdata] = useState();
  const {socket} = useContext(MYcontext);
  const [ActiveUser , setActiveUser] = useState([])

  useEffect(()=>{
    setMYdata(JSON.parse(localStorage.getItem("MYDATA")))
  },[])


  useEffect(()=>{
axios.get('http://localhost:9001/User/alluser').then((res)=>{
  const filteredData = res.data.filter(item=>item.name.toLowerCase().includes(text.toLowerCase()))
  setalluser(filteredData);
})
  },[text])

  const onOpenProfile = ()=>{
    setshowprofile(!showprofile)
  }

  useEffect(()=>{
socket.current?.emit('adduser',LoginUser)
socket.current?.on('getallUser',(alluser)=>{
  setActiveUser(alluser)
})
  },[LoginUser])

  return(
    <>
    {showprofile &&  <Profile MYdata={MYdata}></Profile>}

  <div class="flex bg-gray-900 text-white"  >
    <div class="w-1/4 HH bg-gray-800">
  <div class="flex items-center justify-between p-4">
    <span class="text-lg font-bold">  WhatsApp</span>
    <img class={`aspect-square rounded-full object-cover cursor-pointer ${showprofile && `border-4 border-sky-500`}`} onClick={onOpenProfile} height={50} width={50}  src={`${MYdata?.picture}`}/>

  </div>
      
      <div class="p-4">
        <h2 class="text-xl font-bold">Chats</h2>
        <div class="relative mt-4">
          <input class="flex h-10 border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full pl-10 pr-4 py-2 bg-gray-700 rounded-md" placeholder="Search or start a new chat" type="text" onChange={e=>settext(e.target.value)}   /><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-2 left-2 h-6 w-6"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          </div>
          </div>
      
      
      
 <div class="overflow-y-auto h-[calc(100vh-160px)] p-4 space-y-4">

  {alluser.filter(item=>item.sub!=MYdata.sub).map((user)=>(
<Person  key={user._id} user={user}  />  
  ))}
 </div></div>
 
 <div class="flex-1 flex flex-col items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-20 w-20 text-gray-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    <h2 class="text-2xl font-bold mt-4">WhatsApp created By Ankush </h2><p class="text-gray-400 mt-2 text-center">Send and receive messages without keeping your phone online.<br/>this website is made by using react,nodejs & socket.io.</p>
    {person.picture &&  <Chatting ActiveUser={ActiveUser} person = {person} />}

    </div></div>
    </>
  )
}

export default ChatPage;