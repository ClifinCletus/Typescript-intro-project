import React from 'react'
import {Todo} from './modeltodo'
import SingleTodo from './SingleTodo';
import './styles.css'


interface Props{
    todos: Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList:React.FC <Props> = ({todos,setTodos}) => {
  return (
    <div className='todos'>
        {todos.map((todo)=> (
            <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/> //passing the todos and setTodos to update,delete,set as done/not done etc in the each element in todo as needed
        ))}

    </div>
  )
}

export default TodoList