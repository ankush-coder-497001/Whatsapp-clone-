import { useContext } from "react";
import { MYcontext } from "../ContextProvider";
import { useNavigate } from "react-router-dom";

export default function Profile({MYdata}) {
  const navigate = useNavigate()
const OnlogOut = ()=>{
  localStorage.removeItem("MYDATA");
navigate('/')
}


  return (
    
    <div class="bg-black text-white h-96 w-64   absolute p-6 flex flex-col gap-6 z-50">
      <div class="flex flex-col items-center gap-3">
        <span class="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-4 border-[#2b2b2b]">
          <img class="aspect-square h-full w-full" src={`${MYdata.picture}`} />
        </span>
        <div class="text-lg font-medium">{MYdata.name}</div>
      </div>
      <nav class="flex flex-col gap-2">
        <a class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#2b2b2b] transition-colors" onClick={OnlogOut} rel="ugc">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Logout
        </a>
    

        <a class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#2b2b2b] transition-colors" rel="ugc">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Settings
        </a>
      </nav>
    </div>
  )
}



