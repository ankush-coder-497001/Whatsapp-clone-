import { FaCloudDownloadAlt } from "react-icons/fa";
import {Mediadownload} from './utils'
const Sender = ({getTime,item,scroll})=>{
  return(
    <>
    {
      item.type==='text'?
      <div ref={scroll} className="flex justify-end">
             <div className="bg-[#005c4b] p-2 rounded-md max-w-[70%]">
               <div className="text-sm">
              {item.text}
               </div>
               <div className="text-xs text-right text-gray-400 mt-1">{getTime(item.createdAt)}</div>
            </div>
           </div>
           :
           item.text.includes("pdf")?
      <div ref={scroll} className="flex justify-end">
           <div className="bg-[#005c4b] flex p-2 rounded-md max-w-[30%]">
           <img src='pdflogo.png' className="max-w-[20%] " alt="" />
           <p className="para">
            {item.text.split('/').pop()}
           </p>
           <div className="text-xs text-right text-gray-400 mt-1">{getTime(item.createdAt)}</div>
             <FaCloudDownloadAlt onClick={e=>Mediadownload(e,item.text)} className="cursor-pointer" style={{height:'40px',width:'40px',}} />
             </div>
             </div>
           :
      <div ref={scroll}   className="flex justify-end">

           <div className="bg-[#005c4b] p-2 rounded-md max-w-[30%]">
                    <img src={item.text} className="max-w-[100%] " alt="" />
                    <div  className="text-xs text-right text-gray-400 mt-1">{getTime(item.createdAt)}</div>
                      <FaCloudDownloadAlt onClick={e=>Mediadownload(e,item.text)} className="cursor-pointer" style={{height:'40px',width:'40px',}} />
                      </div>
                      </div>
    }
    </>
  )                                                                                           
}                                           

export default Sender;


    // item.type==='text'?  
    //   <div className="flex justify-end">
    //           <div className="bg-[#005c4b] p-2 rounded-md max-w-[70%]">
    //             <div className="text-sm">
    //              {item.text}
    //             </div>
    //             <div className="text-xs text-right text-gray-400 mt-1">{getTime(item.createdAt)}</div>
    //           </div>
    //         </div>:
            
    //         item.text.includes('.png')?
    //           <div className="bg-[#005c4b] p-2 rounded-md max-w-[30%]">
    //          <img src={item.text} className="max-w-[100%] " alt="" />
    //           </div>
    //           :<div></div>
