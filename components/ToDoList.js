import Link from 'next/link'

export default ({data, deleteHandler}) => {
    return (        
            <div className="group border-black border-b-0 last:border-b-2 border-2 py-2 px-2 flex flex-col" >
                <Link href={`/todo?id=${data.id}`}>
                    <p className="font-bold hover:cursor-pointer hover:underline">{data.title}</p>
                </Link>
                <p className="px-5 italic text-xs">{data.body}</p>
                <button className='bg-red-500 text-white rounded hover:bg-red-900 w-20 ml-auto' onClick={()=>deleteHandler(data.id)}> Delete </button>
            </div>
        )
}