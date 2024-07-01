import { useEffect, useState } from "react"
import UserChat from "./UserChat"
import Sender from "./SenderChat"

const MyChat = ({item,scroll})=>{

//   const  getTime = (time)=>{
// const hour = new Date(time).getHours()
// const minuts = new Date(time).getMinutes()
// return `${hour < 10 ? '0' + hour : hour}:${minuts < 10 ? '0' + minuts : minuts}`;
//   }

  
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

  const [MYDATA , setMYDATA] = useState()
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("MYDATA"))
    setMYDATA(data)
      },[])
  return(
    <>
    {
      item.senderID===MYDATA?.sub ?
            <Sender scroll={scroll} getTime={getTime} item={item}  />
            :
            <UserChat scroll={scroll} getTime={getTime} item={item} />
}
    </>
  )
}

export default MyChat;