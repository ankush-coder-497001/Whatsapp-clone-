import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from 'react';
import { MYcontext } from '../ContextProvider';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios'



const LoginPage = ()=>{
  const navigate = useNavigate()
const {setLoginUser} = useContext(MYcontext)
const {setlatest} = useContext(MYcontext)
const {latest} = useContext(MYcontext)

  
 const LoginSuccess =  (res)=>{
  const DecodeData = jwtDecode(res.credential)
  try {
    axios.post("http://localhost:9001/User/Login",DecodeData).then((res)=>{
    localStorage.setItem("MYDATA",JSON.stringify(res.data))
    setLoginUser(res.data)
    setlatest(!latest)
    navigate('/chatpage')
    })
   
 } catch (error) {
console.log(error)
 }

}


const LoginFailed=()=>{
  console.log("Login failed")
}

  return(
    <>

<div class="bg-gray-100 min-h-screen flex flex-col items-center">
  <header class="bg-[#25D366] w-full py-4 flex items-center justify-center">
    <div class="flex items-center space-x-2">
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
        class="h-6 w-6"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      <h1 class="text-white text-lg font-semibold">WHATSAPP WEB</h1>
    </div>
  </header>
  <main class="bg-white mt-6 p-6 rounded-lg shadow-md max-w-4xl w-full">
    <div class="flex items-center space-x-4 p-4 border rounded-lg">
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
        class="h-12 w-12"
      >
        <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
      </svg>
      <div class="flex-1">
        <h2 class="text-lg font-semibold">Download WhatsApp for Windows</h2>
        <p class="text-gray-500">Get calling, screen sharing and a faster experience with the new Windows app.</p>
      </div>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#25D366] text-white">
        Get the app
      </button>
    </div>
    <div class="flex mt-8">
      <div class="flex-1">
        <h2 class="text-2xl font-semibold">Use WhatsApp on your computer</h2>
        <ol class="mt-4 space-y-2 text-gray-700">
          <li>1. Open WhatsApp on your phone</li>
          <li>
            2. Tap <strong>Menu</strong>{" "}
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
              class="inline h-4 w-4"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>{" "}
            on Android, or <strong>Settings</strong>{" "}
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
              class="inline h-4 w-4"
            >
              <path d="M6 3h12l4 6-10 13L2 9Z"></path>
              <path d="M11 3 8 9l4 13 4-13-3-6"></path>
              <path d="M2 9h20"></path>
            </svg>{" "}
            on iPhone
          </li>
          <li>
            3. Tap <strong>Linked devices</strong> and then <strong>Link a device</strong>
          </li>
          <li>4. Point your phone at this screen to capture the QR code</li>
        </ol>
        <div class="mt-4 border-t pt-2">
   
        </div>
      </div>
      <div class="ml-8">
        <img
          src="data:image/png;base64,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"
          alt="QR Code"
          class="w-48 h-48"
          width="200"
          height="200"
          style={{aspectRatio: "200 / 200", objectFit: "cover"}}
        />
      </div>
      <div class="googlebaba">
      <GoogleLogin
  onSuccess={LoginSuccess}
  onError={LoginFailed}
/>;
      </div>
    </div>
  </main>
</div>
    </>
  )
}

export default LoginPage;