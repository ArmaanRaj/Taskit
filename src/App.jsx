import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';

function App() {
  //tester area starts

  //tester area end 
  //state area starts
  const [count, setCount] = useState(0)
  const [todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true);
  //state area starts
  //function area starts

  useEffect(() => {
    let todos_string = localStorage.getItem("Todos");
    if (todos_string) {
      let todos = JSON.parse(localStorage.getItem("Todos"));
      setTodos(todos);
    }
  }, [])

  const savetolocal = (params) => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  }

  const toggleFinish = () => {
    setShowFinished(!ShowFinished);
  }


  const handleAdd = () => {
    //setTodos([...Todos, {id : uuidv4(),  text: todo, isCompleted: false }]);
    let newTodos = [...Todos];
    Todos.push(
      {
        id: uuidv4(),
        text: todo,
        isCompleted: false
      })
    savetolocal();
    setTodo("");
  }

  const handleDelete = (e) => {
    let id = e.target.name;
    let newTodos = [];
    for (let i = 0; i < Todos.length; i++) {
      if (Todos[i].id != id) newTodos.push(Todos[i]);
    }
    setTodos(newTodos);
    savetolocal();
  }

  const handleEdit = (e) => {
    if (todo != "") {
      console.log("should be  calling");
      handleAdd();
    }
    let id = e.target.name;
    let index = -1
    for (let i = 0; i < Todos.length; i++) if (Todos[i].id == id) index = i;
    setTodo(Todos[index].text);
    handleDelete(e);
    savetolocal();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = -1;
    for (let i = 0; i < Todos.length; i++) if (Todos[i].id == id) index = i;
    //console.log("status before is : " + Todos[index].isCompleted) ; 
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos);
    savetolocal();
  }

  //function area ends 
  return (
    <>
      <div className='mx-10 my-10  max-h-screen'>
        <Navbar />
        <div className="container my-5 mx-auto rounded-xl bg-cyan-200 h-screen p-5 ">
          <div className="addTodo">
            <h1 className='text-lg font-bold text-center'>Add a Todo</h1>
            <input onChange={handleChange} value={todo} className='mr-9 my-3 w-full rounded-xl h-12' type="text" />
            <button onClick={handleAdd} className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-5 w-full'  >Save</button>
          </div>
          <div className='flex-col mt-4 relative h-3/4 overflow-y-scroll'>
            <input onChange={toggleFinish} type="checkbox" checked={ShowFinished} /> Show finished
            <h2 className='text-lg font-bold mr-4 text-center my-3'>Your Todos</h2>
            <div className='todos'>
              {Todos.map(item => {
                return (ShowFinished || item.isCompleted == false) && (
                  <div key={item.id} className="todo flex my-5  justify-between w-full">
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.text}</div>
                    <div className="buttons">
                      <button name={item.id} onClick={handleDelete} className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' >Delete</button>
                      <button name={item.id} onClick={(e) => {
                        handleEdit(e);
                      }} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Edit</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
