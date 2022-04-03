import ToDoList from './ToDoList'

export default ({data}) => {        
        return (
        <div className="">
                <div className="h-8 bg-black"></div>
                {data.map(d => (<ToDoList key={d.id} data={d} />)) }
        </div>
        )
}
