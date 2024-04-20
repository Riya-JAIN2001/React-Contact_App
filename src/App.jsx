import React from 'react'
import Navbar from './components/Navbar';
import { FiSearch } from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai"
import{useEffect, useState} from "react";
import {collection,getDocs, onSnapshot} from "firebase/firestore"
import {db} from "./config/firebase";
import UseDisclose from './hooks/UseDisclose';
import ContactCard from './components/ContactCard';
import Model from './components/Model';
import Add_DEl_Contact from './components/Add_DEl_Contact';
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Not_Found from './components/Not_Found';
const App = () => {
  const [contacts, setContacts]=useState([]);
  const {isOpen,onClose, onOpen}=UseDisclose();
  
  useEffect(()=>{
    const getContacts=async()=>{
try{
 const contactsRef=collection(db,"contacts");
 const contactsSnapshot=await getDocs(contactsRef);

 onSnapshot(contactsRef,(snapshot)=>{
  const contactLists=snapshot.docs.map((doc)=>{
    return{
      id:doc.id,
      ...doc.data()
  
    }
  });
   setContacts(contactLists);
   return contactLists;
  
 })
 
 
}catch(error){
console.log(error)
}
    }
   getContacts();
  
  },[])
 const filterCont =(e)=>{
  const value=e.target.value;
  const contactsRef=collection(db,"contacts");
 

 onSnapshot(contactsRef,(snapshot)=>{
  const contactLists=snapshot.docs.map((doc)=>{
    return{
      id:doc.id,
      ...doc.data()
  
    }
  });

  const filteredContact=contactLists.filter((contact)=>
  contact.name.toLowerCase().includes(value.toLowerCase()))
   setContacts(filteredContact);


   return filteredContact;
  
 })
 }
  return (
    <>
    <div  className=' mx-auto max-w-[370px] px-4 '>
      <Navbar/>
      <div className='flex gap-2'>
      <div className='flex flex-grow relative items-center'>
      <FiSearch  className='text-white ml-1 text-3xl absolute'/>
        <input onChange={filterCont} type="text" 

         className=' flex-grow h-10 border bg-transparent
          border-white rounded-md pl-9 text-white'/>
        </div>
        <div>
          <AiFillPlusCircle onClick={onOpen}  className='text-5xl cursor-pointer text-white'/>
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        {
         contacts.length<=0 ? ( <Not_Found/>):contacts.map((contact)=> (
            <ContactCard key={contact.id}
            contact={contact} />
          
           ) )
        }
      </div>
        </div>
        
      <Add_DEl_Contact isOpen={isOpen} onClose={onClose}/> 
        <ToastContainer
        position='bottum-center'
        />
        </>
  )
}

export default App;