import { createContext, useEffect, useRef, useState } from "react";
import io from 'socket.io-client'
export const MYcontext = createContext(null)

const Myprovider = ({children})=>{
  const [LoginUser , setLoginUser] = useState({})
  const [person,setperson] = useState({})
  const [connection,setconnection]=useState({})
  const [latest,setlatest] = useState(true)
  const socket = useRef()

  useEffect(()=>{
 socket.current = io('http://localhost:7001')
  },[])
  return(
<MYcontext.Provider value={{
// pass the stats here 
LoginUser,
setLoginUser,
person,
setperson,
connection,
setconnection,
socket,
latest,
setlatest
}}>
{children}
</MYcontext.Provider>

  )
}

export default Myprovider;