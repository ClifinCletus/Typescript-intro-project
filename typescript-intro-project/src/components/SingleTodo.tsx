import React,{useState,useRef,useEffect} from 'react'
import {Todo} from './modeltodo'
import  {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import {Draggable} from 'react-beautiful-dnd'
import './styles.css'


interface Props{
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
}
const SingleTodo:React.FC<Props> = ({todo,todos,setTodos,index}) => {
    const [edit,setEdit] = useState<boolean>(false) //if to edit the data or not 
    const [editTodo,setEditTodo] = useState<string>(todo.todo) //edited todo content.initiially contains the initial todo value
    //hence, here when the edit icon is clicked then the input element is shown and the content in input is assigend value as this, hence shows the current content of the todo.

const inputRef = useRef<HTMLInputElement>(null);
   
useEffect(()=>{ 
    //used to automatically focus the input when the edit changes(hence, when we click edit no change to manually put mouse there and edit, automatically comes pointer there)
    //use ? as it must be null(as initialized null and may not be properly assigned to the ref)
   inputRef.current?.focus();
},[edit])
    


    const handleDone = (id: number) => { 
        //toggle the isDone to true as needed by clicking on icon
        setTodos(
            todos.map((todoItem) =>
                todoItem.id === id ? { ...todoItem, isDone: !todoItem.isDone } : todoItem
            )
        );
    }

    const handleDelete = (id:number) =>
    { //delete fn
        setTodos(todos.filter((todo)=> todo.id !== id))
    }
    
    const handleEdit = (e:React.FormEvent, id: number) =>
    {
        e.preventDefault();

        setTodos(
            todos.map((todo)=> todo.id === id ? {...todo,todo: editTodo} : todo)
        )

        setEdit(false)
    }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}> 
     {
        (provided,snapshot)=>(
           <form className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`} onSubmit={(e)=>handleEdit(e,todo.id)} //if its been dragging, add a style
           ref={provided.innerRef}
           {...provided.draggableProps}
           {...provided.dragHandleProps}>
       { //if edit is true then show the input element there in place of the todo value, else show the real or striked todo
        edit ? (
            <input ref={inputRef} value={editTodo} onChange={(e)=>setEditTodo(e.target.value)}//edits the selected todo
            className='todos__single--text'/>
        ): //if isDone true, then strike, else normal show. s for strike tag
            todo.isDone?( <s className="todos__single--text">{todo.todo}</s>):(
                 <span className="todos__single--text">{todo.todo}</span>
            )
        }
       
        <div> {/*icons*/}
        <span className='icon' 
        onClick={()=>{
            if(!edit && !todo.isDone){ //if currently the todo is not done and the edit is not enabled, then enable the edit
                setEdit(!edit)
            }
        }}>
            <AiFillEdit/>
        </span>
        <span className='icon' onClick={()=> handleDelete(todo.id)}>
            <AiFillDelete/>
        </span>
        <span className='icon' onClick={()=> handleDone(todo.id)}>
            <MdDone/>
        </span>
        </div>
    </form>
        )
     }
    </Draggable>
    
  )
}

export default SingleTodo