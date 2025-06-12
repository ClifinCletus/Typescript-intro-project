import { useState } from 'react'
import './App.css'
import InputFeild from './components/InputFeild'
import {Todo} from './components/modeltodo'
import TodoList from './components/TodoList'

const App:React.FC = () => {

  const [todo,setTodo] = useState<string>(''); /* just for the basic todo <string></string>*/ 
  const [todos,setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) =>{ //to set the todo on the button click (on submit)
    e.preventDefault();

    if(todo){ //setting todo and adding the id as as the date.now to get a correct id
      setTodos([...todos,{id: Date.now(), todo, isDone: false}])
      setTodo(''); //after setting, emptied todo
    }

  }

  console.log(todo);

  return (
    <div className="App">
      <span className="heading"> Taskify</span>

      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/> {/*to input the todo */}
      <TodoList todos={todos} setTodos={setTodos}/> {/*to add the todos to screen as list items*/}
    </div>
  )
}

export default App
