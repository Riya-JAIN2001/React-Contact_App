import React from 'react'
import Model from './Model'
import {Field, Formik, Form, ErrorMessage} from 'formik'
import { db} from '../config/firebase'
import { collection, updateDoc } from 'firebase/firestore'
import { addDoc,doc } from 'firebase/firestore'
import {toast} from "react-toastify"
import * as Yup from "yup";
const schemaValidation=Yup.object().shape({
    name:Yup.string().required("Name Please"),
    email:Yup.string().email("Invalid Email").required("Email Please"),
})


const Add_DEl_Contact = ({isOpen,onClose , isUpdate,contact}) => {
 const addContact= async (contact)=>{
    try{
   const contactRef=collection(db,"contacts");
   await addDoc(contactRef,contact)
   toast.success("Added Successfully")
   onClose()
    }catch(error){
        console.log(error)
    }
 };

 const updateContact= async (contact,id)=>{
    try{
   const contactRef=doc(db,"contacts",id);
   await updateDoc(contactRef,contact)
   toast.success("Updated Successfully")
   onClose()
    }catch(error){
        console.log(error)
    }
 };
  return (
    <div>
        <Model isOpen={isOpen} onClose={onClose}>

     <Formik
     validationSchema={schemaValidation}
     initialValues={isUpdate? {
        name:contact.name,
        email:contact.email,
      }:{
        name:"",
        email:"",
    }
}
     
     onSubmit={(values)=>{
        console.log(values);
        isUpdate?
        updateContact(values,contact.id):
        addContact(values);
     }}
     >
        <Form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1 '>
            <label htmlFor="name"> Name</label>
            <Field   name="name" className="border h-10"/>
            <div className='text-xs text-red-500'> <ErrorMessage name="name"/></div>
            </div>
            <div className='flex flex-col gap-1 '>
            <label htmlFor="email"> Email</label>
            <Field type="email" name="email" className="border h-10"/>
            <div className='text-xs text-red-500'> <ErrorMessage name="email"/></div>

            </div>
            <button className=' border bg-orange px-3 py-1.5 self-end'>{isUpdate ? "update": "add"} contact</button>
        </Form>
     </Formik>

        </Model>

    </div>
  )
}

export default Add_DEl_Contact