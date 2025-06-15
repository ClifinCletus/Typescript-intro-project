import { useState } from 'react'
import './App.css'
import InputFeild from './components/InputFeild'
import {Todo} from './components/modeltodo'
import TodoList from './components/TodoList'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

const App:React.FC = () => {
  const [todo,setTodo] = useState<string>(''); 
  const [todos,setTodos] = useState<Todo[]>([])
  const [completedTodos,setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) =>{
    e.preventDefault();
    if(todo){ 
      setTodos([...todos,{id: Date.now(), todo, isDone: false}])
      setTodo(''); 
    }
  }

  const onDragEnd = (result: DropResult) => {
    //result  contains source from where we are taking the todo, destination is to where i dropperd it, can somehow also drop it in source, in plain space or in the correct destination where we need it(found using Id) . so to find it uses this. 
    const { source, destination } = result;

    // If dropped outside a droppable area, do nothing
    if (!destination) return;

    // If dropped in the same position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }


    let add;
    let active = todos; //contains all todos in todoslist
    let complete = completedTodos; //contains all completed todos
    // we are using these to manipulate the todos and then this changes would be added to todos, completedTodos rather than directy manipulating it.


    // Remove item from source
    if (source.droppableId === "TodosList") {
      //todos ile todo aan source engil avidenn  remove it
      add = active[source.index];
      active.splice(source.index, 1); //removing that todo from array
    } else { //if it was from completeTodos, removed from there
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    // here destination means, to where we are dragged it and added to(from activetasks to completetasks or reverse) . then we would manipulate the arrays and add/remove it.
     
    // Add item to destination
    if (destination.droppableId === "TodosList") {
      //todos il aan destination engil add to todos
      active.splice(destination.index, 0, add);
    } else {
      //if completedTodos is destination, add to there
      complete.splice(destination.index, 0, add);
    }

    // Update state
    setCompletedTodos(complete);
    setTodos(active);
  };

  console.log(todo);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className="heading"> Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList
      todos={todos}
      setTodos={setTodos}
      completedTodos = {completedTodos}
      setCompletedTodos = {setCompletedTodos}
      />
    </div>
    </DragDropContext>
  )
}

export default App