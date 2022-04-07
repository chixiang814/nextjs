import Head from 'next/head'
import ToDoContainer from '../components/ToDoContainer'
import Pagination from '../components/Pagination'
import {useState} from "react"
import Router from 'next/router'

export default function Home({initData, totalPosts}) {
  const [data, setData] = useState(initData);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postLimit = 5;

  const setTitleHandler = (elem)=>{
    setTitle(elem.target.value)
  }

  const setContentHandler = (elem)=>{
    setContent(elem.target.value)
  }

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

  const deleteHandler = async (id) => {
    const response = await fetch('http://localhost:3000/api/post',{
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: {
        'Content-Type' : 'appication/json'
      }
    })
    Router.push("/")
  }

  const fetchData = async(page, pageFront) => {
    const pageIndex = page - 1;
    const res = await fetch(`http://localhost:3000/api/post?pageIndex=${pageIndex}`)
    const data = await res.json()
    setData(data.message)
    setCurrentPage(page) 
  }

  return (
    <div className="px-20">
      <Head>
        <title>To Do List App</title>
        <meta name="description" content='To Do List App' />
      </Head>
      
      <main className="" onSubmit={onSubmitHandler}>
        <h2 className="font-bold text-5xl italic">To Do List</h2>
        <form className='my-2' > 
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={title} id="title" type="text" placeholder="Insert Title..." onChange={setTitleHandler} />
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={content} id="content" type="text" placeholder="Insert Content..." onChange={setContentHandler} />
          <button className='rounded bg-blue-700 text-white p-2 my-2 hover:bg-blue-900'>Insert</button>
        </form>
      
        <ToDoContainer data={data} deleteHandler={deleteHandler} />
        <Pagination 
          postsPerPage={postLimit}
          totalPosts={totalPosts}
          paginateFront={()=>fetchData(currentPage+1, true)}
          paginateBack={()=>fetchData(currentPage-1, false)}
          currentPage={currentPage}
        />
      </main>
    </div>
  )
}


export async function getStaticProps(context) {
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  // const data = await res.json()
  const res = await fetch("http://localhost:3000/api/post?pageIndex=0")
  const data = await res.json()
  // const totalPost =

  return {
    props: {
            initData:data.message,
            totalPosts:data.totalPosts
    }, // will be passed to the page component as props
  }
}