import { useState,useEffect} from 'react'
import Navabr from './components/Navabr'
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
  
    if(todoString){
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS = (params) => {
    localStorage.setItem('todos',JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelet = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id!==id
    })
    setTodos(newTodos);
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false }])
    setTodo('')
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleChekbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
    <Navabr/>   
      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]: md:w-[35%]'>
        <h1>iTask-Manager your todos at one Place</h1>
        <div className='addTodo my-5 flex flex-col gap-4'>
          <h2 className='text-2xl font-bold'>Add Todo</h2>
          <div className='flex'>
            <input type="text" onChange={handleChange} value={todo} className='w-full rounded-full px-5 py1' />
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type='checkbox' checked={showFinished} />
        <label htmlFor="show" className='mx-2'>ShowFinished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>YourTodos</h2>
        <div className='todos'>
          {todos.length === 0 && <div className='m-5'>No todos-display</div>}
          {todos.map(item => {
            return (showFinished || !item.isComplete) && <div key={item.id} className={'todo flex my-3 justify-between'}>
              <div className='flex gap-5'>
                <input type="checkbox" name={item.id} onChange={handleChekbox} checked={item.isComplete} id='' />
                <div className={item.isComplete ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className='buttons flex h-full'>
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelet(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete/></button>
              </div>
            </div>
          })}
        </div>
    </div>
    </>
  )
}

export default App
