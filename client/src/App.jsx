
import './App.css'
import Myprovider from './ContextProvider';
import LoginPage from './components/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import ChatPage from './components/chatpage';
const router = createBrowserRouter([
    {path:'/',element:<LoginPage/>},
    {path:'/chatpage',element:<ChatPage/>}
  
])
function App() {
  
const clientId = '1046636492820-ktpur0eabq6958j5o28c0utgmou5pf3e.apps.googleusercontent.com'
  return (
<>
<GoogleOAuthProvider clientId={clientId}>
  <Myprovider>
    <RouterProvider router={router}>
    </RouterProvider>
  </Myprovider>
</GoogleOAuthProvider>
</>
  )
}

export default App
