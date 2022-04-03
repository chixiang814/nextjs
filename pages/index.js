import Head from 'next/head'
import ToDoContainer from '../components/ToDoContainer'
import styles from '../styles/Home.module.css'

export default function Home({data}) {
  return (
    <div className="px-20">
      <Head>
        <title>To Do List App</title>
        <meta name="description" content='To Do List App' />
      </Head>
      
      <main className={styles.main}>
        <h2 className="font-bold text-5xl italic">To Do List</h2>
        <ToDoContainer data={data} />
      </main>
    </div>
  )
}


export async function getStaticProps(context) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await res.json()

  return {
    props: {
            data
    }, // will be passed to the page component as props
  }
}