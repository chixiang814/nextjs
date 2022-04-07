import ToDoList from './ToDoList'

export default ({data, deleteHandler}) => {        
        return (
        <div>
                <div className="h-8 bg-black"></div>
                {data.map(d => (<ToDoList key={d.id} data={d} deleteHandler={deleteHandler} />)) }
        </div>
        )
}
