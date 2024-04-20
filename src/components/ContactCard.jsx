import { deleteDoc,doc } from 'firebase/firestore';
import React from 'react'
import {HiOutlineUserCircle} from "react-icons/hi";
import {IoMdTrash} from "react-icons/io";
import{RiEditCircleLine} from "react-icons/ri";
import { db } from '../config/firebase';
import Add_DEl_Contact from './Add_DEl_Contact';
import { useState } from 'react';
import UseDisclose from '../hooks/UseDisclose';
import {toast} from "react-toastify"
const ContactCard = ({contact}) => {
    const {isOpen,onClose, onOpen,}=UseDisclose();
  
    


 const deleteContact= async(id)=>{
    try {
        await deleteDoc(doc(db,"contacts",id))
        toast.success("Deleted Successfully")
        
    } catch (error) {
        console.log(error)
        
    }
 }


  return (
    <>
    <div   className='bg-yellow rounded-lg justify-between p-2 flex items-center'>
            <div className='flex gap-1 ml-1'>
              <HiOutlineUserCircle className='text-4xl text-orange '/>
            <div className=''>
              <h2 className='text-medium'>{contact.name}</h2>
              <p className='text-sm'>{contact.email}</p>
            </div></div>
            <div className='flex text-3xl'>
              <RiEditCircleLine onClick={onOpen} className='curser-pointer' />
              <IoMdTrash onClick={()=>deleteContact(contact.id)} className='text-orange curser-pointer'/>
            </div>
          </div>
          <Add_DEl_Contact  contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
          </>
            
  )
}

export default ContactCard