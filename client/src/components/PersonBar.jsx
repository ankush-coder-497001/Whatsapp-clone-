import { useContext, useEffect, useState } from "react";
import { MYcontext } from "../ContextProvider";
import axios from "axios";

const Person = ({user})=>{
  const {setconnection} = useContext(MYcontext)
  const [MYDATA , setMYDATA] = useState()
  const [conver,setconver] = useState({})
  const {setperson} = useContext(MYcontext);
  const {latest} = useContext(MYcontext);
  const [latestme,setlatestmes] = useState({})
  const showperson=()=>{
    setperson(user)
    setconver({senderID:MYDATA.sub,receaverID:user.sub})
  }

useEffect(()=>{
  setMYDATA(JSON.parse(localStorage.getItem("MYDATA")))
},[])

  useEffect(()=>{
    axios.post('http://localhost:9001/Chat/createConver',conver).then((res)=>{
      setconnection(res.data)
    })  
  },[conver])


  useEffect(()=>{
  axios.post('http://localhost:9001/Chat/FindConversation',{senderID:MYDATA?.sub,receaverID:user.sub}).then((res)=>{
    setlatestmes(res.data)
  })
  
  },[latest,conver,MYDATA])

    
  function getTime(timestamp) {
    // Create a new Date object from the timestamp
    let date = new Date(timestamp);

    // Extract hours and minutes from the date
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Formatting the hours and minutes to ensure they have two digits
    if (hours < 10) {
        hours = '0' + hours;  // Adding leading zero if hours is a single digit
    }
    if (minutes < 10) {
        minutes = '0' + minutes;  // Adding leading zero if minutes is a single digit
    }

    // Return the formatted time as a string
    return hours + ':' + minutes;
}

  return(
    <>
        
        <div onClick={showperson} class="flex items-center space-x-4 cursor-pointer"><span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
          {/* //profile */}
      <img class="aspect-square h-full w-full" alt="SQ TEAM" src={user.picture}/>
      {/* //name */}
      </span><div class="flex-1"><div class="flex justify-between"><span class="font-bold">{user.name}</span>
      {/* date */}
      <span class="text-sm 
      text-gray-400">{getTime(latestme?.updatedAt)}</span></div><div class="flex justify-between overflow-hidden">
        {/* //message */}
        <span class="text-sm text-gray-400">{latest?.LatestMessage?.includes('localhost') ? 'Media:' :latestme?.LatestMessage}</span>
        {/* //icon */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="12" x2="12" y1="17" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg> */}
        
        </div></div></div>
    <hr />
    </>
  )
}

export default Person;