import React from "react"

export default React.memo(({title, content, setTitleHandler, setContentHandler}) => {
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/api/post', {
          method: 'POST',
          body: JSON.stringify({title, content}),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
    
        const data = await response.json()
        Router.push("/")
      }
    return (
    <form className='my-2' onSubmit={onSubmitHandler}> 
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={title} id="title" type="text" placeholder="Insert Title..." onChange={setTitleHandler} />
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={content} id="content" type="text" placeholder="Insert Content..." onChange={setContentHandler} />
        <button className='rounded bg-blue-700 text-white p-2 my-2 hover:bg-blue-900'>Insert</button>
    </form>
  )
})