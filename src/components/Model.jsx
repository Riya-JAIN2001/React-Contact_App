import React from 'react';
import {createPortal} from "react-dom";
import { AiOutlineClose } from 'react-icons/ai'

const Model = ({onClose,isOpen,children}) => {
  return  createPortal(
    <>
    
    {
    isOpen && (<div onClick={onClose} 
    className=' grid place-items-center backdrop-blur h-screen w-screen z-40 absolute top-0'>
        <div className=' m-auto z-50 relative min-h-[200px] p-4  min-w-[80%] bg-white'>
    <div className='flex justify-end '>
     <AiOutlineClose onClick={onClose} className='text-2xl  self-end'/>
    </div>
    {children}
     </div>
     </div>)}
    </>
 ,document.getElementById("modal-root") )
}

export default Model