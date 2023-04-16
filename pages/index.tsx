import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { use, useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [datas , setDatas] = useState([]);
  const [editMode , setEditMode]=useState(false)
  const [inputData , setInputData]=useState({
    id:'',
    title: ''
  })

  // console.log(inputData)
  // const baseUrl = 'http://localhost:3000/api/post'
  const url = 'http://localhost:3000/api/post/getpost'
  // const createdata= `${baseUrl}/createpost`
  // const getdata = `${url}/getpost`
  console.log()
  const fetchData = async()=>{
    const respose= await fetch(url)
    const json = await respose.json()
    setDatas(json)
    console.log(datas)
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  const handleSubmit= async(e:React.FormEvent)=>{
   e.preventDefault()
   if(editMode){
    handleUpdateData()
   } else{
   const response = await fetch('http://localhost:3000/api/post/createpost',{
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body : JSON.stringify({title:inputData.title})
   })
   const json= await response.json()
   console.log(json)
   setInputData({
    id:'',
    title: ''
  })
  fetchData()
}
  }

  const handleEdit=(id:string , title:string)=>{
   console.log(id,title)
   setInputData({id ,title})
   setEditMode(true)
  }

  const handleUpdateData= async()=>{
    const response = await fetch('http://localhost:3000/api/post/updatepost',{
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body : JSON.stringify({id:inputData.id,
      title: inputData.title})
   })
   const json= await response.json()
   console.log(json)
  setInputData({
    id:'',
    title: ''
  })
  setEditMode(false)
  fetchData()
  }
  const handleDelete=async(id:string)=>{
     const response = await fetch('http://localhost:3000/api/post/deletepost',{
      method : "POST",
      headers :{"Content-type":"application/json"},
      body : JSON.stringify({id})
     })
     const json = await response.json()
     console.log(json)
     fetchData()
  }
  return (
    <main className="h-screen w-full bg-black text-white ">
      <div className='flex items-center justify-center'>
      <form onSubmit={handleSubmit}>
        <input className='text-black' value={inputData.title || ""} type='text' placeholder='enter your title'onChange={(e)=>{setInputData({...inputData,title:e.target.value})}}/>
        <button className="rounded p-2 bg-green-500" type='submit'>save</button>
      </form>
      
      </div>
      
      <h1 className='flex items-center justify-center p-3 '> {datas && <p> you have {datas.length} : data</p>} </h1>
    {datas && datas.map(({id,title})=>{ 
      return (
        <div className='flex flex-col items-center mt-3' key={id}>
          <div className='flex'>
          <p className='p-2 bg-white text-black'>{title}</p>
          <button className="rounded p-2 bg-blue-500" onClick={()=> handleEdit(id,title)}>edit</button>
          <button className='rounded p-2 bg-red-500' onClick={()=> handleDelete(id)}>delete</button>
          </div>
          
        </div>
      )
    })}
    </main>
  )
}
