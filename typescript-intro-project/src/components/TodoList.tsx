import React from 'react'
import {Todo} from './modeltodo'
import SingleTodo from './SingleTodo';
import './styles.css'
import {Droppable} from 'react-beautiful-dnd'



interface Props{
    todos: Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[];
    setCompletedTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
  return (
    <div className="container">
      {/* Active Tasks Droppable */}
      <Droppable droppableId="TodosList">
        {/*droppableId is used to uniquely identify the area for droppable */}
        {(provided, snapshot) => ( //provided is used to make the droppable area identify and being able to control that area as probable by the react
          <div
            className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} //if dragging them to this place, do another style to that container
            ref={provided.innerRef} //used to do the work of provided
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => ( //index is used to track which of the sinle todo is been dragged
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder} {/* here provides an empty placeholder for it to properly move around (athinte oru area randidathum create cheyyum, hence ath avide vaykan), hence provides an empty space to drop it down. */}
          </div>
        )}
      </Droppable> 
      {/* Completed Tasks Droppable */}
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
               index = {index}
                todo={todo}
                todos={completedTodos}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TodoList