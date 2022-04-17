import Head from 'next/head'
import ToDoContainer from '../components/ToDoContainer'
import Pagination from '../components/Pagination'
import {useState, useCallback} from "react"
import { useRouter } from 'next/dist/client/router'
import Submit from '../components/Submit'


export default function Home({initData, totalPosts}) {
  const [data, setData] = useState(initData);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postLimit = 5;
  const router = useRouter();

  const setTitleHandler = useCallback((elem)=>{
    setTitle(elem.target.value)
  }, [setTitle])

  const setContentHandler = useCallback((elem)=>{
    setContent(elem.target.value)
  },[setContent])

  const deleteHandler = async (id) => {
    const response = await fetch('http://localhost:3000/api/post',{
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: {
        'Content-Type' : 'appication/json'
      }
    })
    router.push("/")
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
      
      <main>
        <h2 className="font-bold text-5xl italic">To Do List</h2>
        <Submit title={title} content={content} setTitleHandler={setTitleHandler} setContentHandler={setContentHandler} />
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