import Link from "next/dist/client/link"

export default function Todo({data}) {
          
    return (
      <div className="flex justify-center flex-col px-20">
        <Link href={`/`}>Home </Link>
        <table class="table-auto">
            <thead></thead>
            <tbody className="border-2">           
                <tr><td>Title : </td><td><h2 className="font-bold">{data.title}</h2></td></tr>
                <tr><td>Content : </td><td><p className="italic text-xs">{data.body}</p></td></tr>
                <tr><td><button className="text-white bg-blue-600 rounded-full text-xm">Check</button></td></tr>
            </tbody>
        </table>
      </div>
    )
  }


  // This gets called on every request
export async function getServerSideProps(context) {
    // const router = useRouter()
    const { id } = context.query
    // Fetch data from external API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
}
  