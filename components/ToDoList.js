// import { useRouter } from 'next/router'
import Link from 'next/link'

export default ({data}) => {
    return (
        <Link href={`/todo?id=${data.id}`}>
            <div className="group hover:bg-gray-600 border-black border-b-0 last:border-b-2 border-2 py-2 px-2 hover:cursor-pointer" >
                <p className="font-bold">{data.title}</p>
                <p className="px-5 italic text-xs">{data.body}</p>
                {/* <button className="rounded-full text-white text-xs */}
                                     {/* bg-blue-400 hover:bg-blue-800  */}
                                    {/* w-20" >Check</button> */}
            </div>
        </Link>
        )
}