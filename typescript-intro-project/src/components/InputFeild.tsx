import React,{useRef} from 'react'
import './styles.css'

interface Props{
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>; //copied by hovering over it on where it is present(here in app.tsx)
    handleAdd: (e: React.FormEvent) => void; //as it is a fn which return nothing
}

const InputFeild = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null) //used to set the background back to normal color after the active of the input. previously on active, we have set the everything except it as some light black, so to remove it can use this.
  
    return (
    <div>
        <form
          className='input'
          onSubmit={(e) => {
            handleAdd(e);
            inputRef.current && inputRef.current.blur(); //this would automatically remove the focus from the element if not in focus (known) and hence remove the backhround things
          }}
        >
            <input type="text" 
            ref={inputRef}  //added ref in input tag
            placeholder='Enter a task' className='input_box'
            value={todo} onChange= {(e) => setTodo(e.target.value)} />
            <button className='input_submit' type="submit">Go</button>
        </form>
    </div>
  )
}

export default InputFeild