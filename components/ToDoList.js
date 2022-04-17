import Link from 'next/link'
import { useState, useCallback } from 'react'
import { Router } from 'next/router'

export default ({data, deleteHandler}) => {
    const initialTitle = data.title
    const initialContent = data.body

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(initialTitle)
    const [content, setContent] = useState(initialContent)

    const editModeHandler = (on) => {
        setEditMode(on);
    }
    
    const setTitleHandler = useCallback((elem)=>{
        setTitle(elem.target.value)
      }, [setTitle])
    
    const setContentHandler = useCallback((elem)=>{
        setContent(elem.target.value)
    },[setContent])

    const updateHandler = async () => {
        const response = await fetch('http://localhost:3000/api/post',{
          method: 'PUT',
          body: JSON.stringify({
              id: data.id, 
              data:{
                title,
                content
              }}),
          headers: {
            'Content-Type' : 'appication/json'
          }
        })
        console.log(data.id, title, content)
        setEditMode((old)=>!old)
      }
    
    const cancelUpdateHandler = () => {
        setTitle(initialTitle)
        setContent(initialContent)
        setEditMode(false)
    } 

    return (        
            <div className="group border-black border-b-0 last:border-b-2 border-2 py-2 px-2 flex flex-col" >
                {/* <Link href={`/todo?id=${data.id}`}> */}
                    {!editMode && <p className="font-bold hover:cursor-pointer hover:underline">{title}</p>}
                    {editMode && <>Title : <input className="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setTitleHandler(e)} value={title} id="title" type="text" placeholder="Insert Title..." /></>}
                {/* </Link> */}
                {!editMode && <p className="px-5 italic text-xs">{content}</p>}
                {editMode && <>Content: <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={content} onChange={(e)=>setContentHandler(e)} id="content" type="text" placeholder="Insert Content..." /></>}
                <div className="flex justify-end ml-auto">
                    {!editMode && <button className='bg-red-500 text-white rounded hover:bg-red-900 w-20 ml-auto mr-2' onClick={()=>deleteHandler(data.id)}> Delete </button>}
                    {!editMode && <button className="bg-green-500 text-white rounded hover:bg-green-900 w-20 ml-auto mr-2" onClick={()=>editModeHandler(true)}>Edit</button>}
                    {editMode && <button className="bg-blue-500 text-white rounded hover:bg-blue-900 w-20 mr-2 mt-2" onClick={()=>updateHandler()}>Done</button>}
                    {editMode && <button className="bg-red-500 text-white rounded hover:bg-red-900 w-20 mt-2" onClick={cancelUpdateHandler}>Cancel</button>}
                </div>
            </div>
        )
}